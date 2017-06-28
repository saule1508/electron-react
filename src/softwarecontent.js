import React, { Component } from 'react'

const DockerImages = ({images}) => {
    
    let img = [];
    for (var i in images){
      if (images.hasOwnProperty(i)){
        console.log(images[i].name + ':' + images[i].tag);
        img.push(<tr key={images[i].name}>
            <td>{images[i].name}</td>
            <td>{images[i].tag}</td>
            <td>{images[i].id}</td>
          </tr>)
      }
    }
    console.log(img);
    return (
      <div>
        <h6>Docker images</h6>
        
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Name</th><th>Tag</th><th>Id</th>
            </tr>
          </thead>
          <tbody>
          {img}
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
    //console.log(this.props.content);
  }

  render(){
    return (
      <div>
        <h4>Review software to install</h4>
        <DockerImages images={this.props.content} /> 
      </div>
    )
  }
}

export default SoftwareContent