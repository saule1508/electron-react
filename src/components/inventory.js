import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Inventory extends Component{
  
  constructor(props){
    super(props);
    this.handleIPChange = this.handleIPChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
  }

  componentDidMount(){
    if (! this.props.inventory.hostname){
      this.props.getInventory();
    }
  }

  handleIPChange(evt){
    this.props.setInventory({'ip': evt.target.value,'hostname': this.props.inventory.hostname});
  }

  handleHostChange(evt){
    this.props.setInventory({'ip': this.props.inventory.ip,'hostname': evt.target.value});
  }

  render(){
    let {hostname,ip} = this.props.inventory;
    return (
      <div>
        <h4>Target server</h4>
        <div className="panel">
          <div className="panel-body">
            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="hostname">Hostname</label>
                  <input type="text" 
                        className="form-control"
                        id="hostname" 
                        aria-describedby="hostnameHelp" 
                        placeholder="Enter hostname"
                        value={hostname}
                        onChange={this.handleHostChange}
                        />
                  <small id="hostnameHelp" className="form-text text-muted">The result of the hostname command</small>
                </div>
                <div className="form-group col-md-6">                
                  <label htmlFor="IPaddress">IP address</label>
                  <input 
                        type="text" 
                        className="form-control" 
                        id="IP address" 
                        value={ip}
                        onChange={this.handleIPChange}
                        aria-describedby="IPHelp" placeholder="Enter IP or 127.0.0.1 for local install" />
                  <small id="IPHelp" className="form-text text-muted">set to 127.0.0.1 when working locally</small>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      )
  }

}

Inventory.propTypes = {
  'setInventory' : PropTypes.func.isRequired,
  'inventory': PropTypes.shape({
    hostname: PropTypes.string,
    ip: PropTypes.string,
    isValid: PropTypes.bool,
    error: PropTypes.string
  })
}

export default Inventory
