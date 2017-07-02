import React, { Component } from 'react'


const SoftComponent = ({name, content, idx }) => {
    let collapsedClass = idx === 1 ? "collapse collapse show" : "collapse";
    return (
      <div className="card">
        <div className="card-header" role="tab" id={`heading${idx}`}>
          <h5 className="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${idx}`} aria-expanded="true" aria-controls={`#collapse${idx}`}>
              {name}
            </a>
          </h5>
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
  console.log(cmpLists);

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
  

  render(){

    console.log(this.props.doc);
    let { components, product } = this.props.doc;
    let cmpList = [];
    for (var i in components){
      if (components.hasOwnProperty(i)){
        cmpList.push(i);
      }
    }

    return (
      <div id="accordion" role="tablist" aria-multiselectable="true">
        {cmpList.map((el,idx) => {
          return (
            <SoftComponent idx={idx} key={el} name={el} content={components[el]} />        
            )
          })
        }
      </div>
    )
  }
}

export default SoftwareContent