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
<div id="accordion" role="tablist" aria-multiselectable="true">
  <div className="card">
    <div className="card-header" role="tab" id="headingOne">
      <h5 className="mb-0">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Live pam core
        </a>
      </h5>
    </div>

    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
      <div className="card-block">
        Lpc images        
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" role="tab" id="headingTwo">
      <h5 className="mb-0">
        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          SXEngine
        </a>
      </h5>
    </div>
    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div className="card-block">
        SXEngine rpm
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" role="tab" id="headingThree">
      <h5 className="mb-0">
        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Xone
        </a>
      </h5>
    </div>
    <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
      <div className="card-block">
        xone rpm        
      </div>
    </div>
  </div>
</div>    )
  }
}

export default SoftwareContent