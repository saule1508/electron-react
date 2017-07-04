import React from 'react'
import PropTypes from 'prop-types'
import AnsiblePlayConsole from './ansibleplayconsole'

import { writeInventory } from '../api/index'

class AnsiblePlay extends React.Component{
  constructor(props){
    super(props);
    this.state = {'stdout': '', 'stderr': '', error: null, started: false}
    this._submit = this._submit.bind(this);
  }

  componentDidMount(){
    console.log(this.props);
    this.props.writeInventory().then(()=>{
      console.log('wrote inventory');
    });
  }

  _submit(){
    console.log('go ansible');
    this.setState({started: true})
  }

  render(){
    
    let { product } = this.props.content.doc;
    let { hostname, ip } = this.props.inventory;
    return (
      <div>
        <h4>Update of {product.name} version {product.version}</h4>
        <div className="panel">
          <div className="panel-body">
            <p>
              Target host for install is {ip} ({hostname})
            </p>
            <p>
              Do you want to upgrade {product.name} to {product.version} ?
            </p>
            <p>
              <button className="btn btn-primary" onClick={this._submit}>Submit</button>
            </p>
            {this.state.started && (
              <AnsiblePlayConsole inventoryFile={this.props.inventory.inventoryFile} contentDirectory={this.props.directory.name} 
                product={product} />
              )}
          </div>
        </div>
      </div>
    )
  }
}


AnsiblePlay.propTypes = {
  inventory: PropTypes.object.isRequired,
  directory: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
}

export default AnsiblePlay
