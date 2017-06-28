import React, { Component } from 'react'

class SoftwareContent extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props.content);
  }
  render(){
    return (
      <h4>Review software to install</h4>
    )
  }
}

export default SoftwareContent