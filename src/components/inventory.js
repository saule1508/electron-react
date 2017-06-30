import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Inventory extends Component{
  constructor(props){
    super(props);
    this.state = {'hostname': this.props.inventory.hostname, 'ip': this.props.inventory.ip}
    this.handleIPChange = this.handleIPChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
  }

  handleIPChange(evt){
    this.setState({'ip': evt.target.value});
    this.props.onChange(this.state);
  }

  handleHostChange(evt){
    this.setState({'hostname': evt.target.value});
    this.props.onChange(this.state);
  }

  render(){
    return (
      <div>
        <h2>Step 1. target server</h2>
        <div className="card">
          <div className="card-block">
            <form>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="hostname">Hostname</label>
                    <input type="text" 
                      className="form-control"
                      id="hostname" 
                      aria-describedby="hostnameHelp" 
                      placeholder="Enter hostname"
                      value={this.state.hostname}
                      onChange={this.handleHostChange}
                      ref={(input)=>{
                        this._hostname = input;
                          }
                        }
                      />
                    <small id="hostnameHelp" className="form-text text-muted">The result of the hostname command</small>
                  </div>
                  <div className="col-6">
                    <label htmlFor="IPaddress">IP address</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="IP address" 
                      value={this.state.ip}
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

Inventory.PropTypes = {
  'onChange' : PropTypes.func.isRequired
}

export default Inventory