import React, { Component } from 'react'
import PropTypes from 'prop-types';


const SoftComponent = ({name, content, idx, rpm_versions, image_versions }) => {
  console.log('in SoftComponent, dumping image_versions');
  console.log(image_versions);
    let collapsedClass = idx === 1 ? "panel-collapse collapse in" : "panel-collapse collapse";
    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={`heading${idx}`}>
          <h4 className="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${idx}`} aria-expanded="true" aria-controls={`#collapse${idx}`}>
              {name}
            </a>
          </h4>
        </div>

        <div id={`collapse${idx}`} className={collapsedClass} role="tabpanel" aria-labelledby={`heading${idx}`}>
          <div className="card-block">
            <SoftComponentContent yaml={content} 
                rpm_versions={rpm_versions} 
                image_versions={image_versions} />        
          </div>
        </div>
      </div>
    )
}

const SoftComponentContent = ( { yaml, rpm_versions, image_versions } ) => {
  let cmpTypes = [];
  let cmpLists = [];
  for (var i in yaml){
    if (yaml.hasOwnProperty(i)){
      let cmpType = i;
      let el = yaml[cmpType];
      cmpTypes.push(cmpType);
      for (var j in el){
        if (el.hasOwnProperty(j)){
          let fileName = el[j].file;
          let cmp = {name: j, file: fileName, type: cmpType};
          if (cmpType === 'docker'){
            cmp.image = el[j].name;
            cmp.version = el[j].tag;
            if (image_versions[cmp.image]){
              console.log(' got image_versions for %s',cmp.image);
              cmp.prodVersion = image_versions[cmp.image].tag;
            } else {
              console.log(' no image_versions for %s',cmp.image);
            }
          }
          if (cmpType === 'rpm' || cmpType === 'tar'){
            cmp.version = fileName.substr(fileName.indexOf(".") + 1).slice(0,-4); 
            if (rpm_versions[j]){
              cmp.prodVersion = rpm_versions[j];
            }
          }

          cmpLists.push(cmp);
        }
      }
      
    }
  }
  //console.log(cmpLists);

  return (
    <div>
      <table className="table table-inverse">
        <thead>
          <tr>
            <th>Name</th><th>Current</th><th>Available</th><th>Type</th>
          </tr>
        </thead>
        <tbody>
          {cmpLists.map((el,idx)=>{
            let rowClass;
            if (el.prodVersion && el.prodVersion < el.version){
              rowClass='success';
            }
            if (el.prodVersion && el.prodVersion > el.version){
              rowClass='danger';
            }

            return (
              <tr key={idx} className={rowClass} >
                <td>{el.name}</td><td>{el.prodVersion || ''}</td><td>{el.version || ''}</td><td>{el.type}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}


class SoftwareContent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchImageVersions();
    let cmps = this.props.doc.components;
    for (var i in cmps){
      if (cmps.hasOwnProperty(i) && cmps[i].hasOwnProperty('rpm')){
        console.log(' doing i');
        for (var j in cmps[i].rpm){
          if (cmps[i]['rpm'].hasOwnProperty(j)){
            this.props.fetchRPMVersions(cmps[i]['rpm'][j].name);
          }
        }
      }    
    }
  }

  render(){

    let { components, product } = this.props.doc;
    let cmpList = [];
    for (var i in components){
      if (components.hasOwnProperty(i)){
        cmpList.push(i);
      }
    }

    return (
      <div>
        <h4>Review software to update</h4>
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          {cmpList.map((el,idx) => {
            return (
              <SoftComponent idx={idx} key={el} name={el} content={components[el]} 
                rpm_versions={this.props.rpm_versions} 
                image_versions={this.props.image_versions} />        
              )
            })
          }
        </div>
      </div>
    )
  }
}

SoftwareContent.propTypes = {
  'doc': PropTypes.object.isRequired,
  'error': PropTypes.string,
  'rpm_versions': PropTypes.object,
  'image_versions': PropTypes.object,
  fetchRPMVersions: PropTypes.func.isRequired,
  fetchImageVersions: PropTypes.func.isRequired
}

export default SoftwareContent
