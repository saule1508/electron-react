import React, { Component } from 'react'
import PropTypes from 'prop-types';


const SoftComponent = ({name, content, idx }) => {
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
            <SoftComponentContent yaml={content} />        
          </div>
        </div>
      </div>
    )
}

const SoftComponentContent = ( { yaml } ) => {
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
            cmp.version = el[j].tag;
          }
          if (cmpType === 'rpm' || cmpType === 'tar'){
            cmp.version = fileName.substr(fileName.indexOf(".") + 1).slice(0,-4); 
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
            <th>Name</th><th>Version</th><th>Type</th>
          </tr>
        </thead>
        <tbody>
          {cmpLists.map((el,idx)=>{
            return (
              <tr key={idx}>
                <td>{el.name}</td><td>{el.version || ''}</td><td>{el.type}</td>
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
      if (cmps.hasOwnProperty(i) && i.type === 'rpm'){
        this.props.fetchRPMVersions(i.name);
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
              <SoftComponent idx={idx} key={el} name={el} content={components[el]} />        
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
  'rpms_versions': PropTypes.object,
  'images_versions': PropTypes.object
}

export default SoftwareContent