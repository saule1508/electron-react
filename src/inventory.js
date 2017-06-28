import React, { Component } from 'react'

class Inventory extends Component{
  constructor(props){
    super(props);
    this.state = {'hostname': this.props.inventory.hostname, 'ip': this.props.inventory.ip}
    this._submit = this._submit.bind(this);
    this.handleIPChange = this.handleIPChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
  }
  _submit(){
    this.props.onChange({hostname: this.state.hostame, ip: this.state.ip})
  }

  handleIPChange(evt){
    this.setState({'ip': evt.target.value});
  }

  handleHostChange(evt){
    this.setState({'hostname': evt.target.value});
  }

  render(){
    return (
      <div className="card">
        <div className="card-block">
          <h4>1. target</h4>
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
              <div className="row" style={{'marginTop': 10}}>
                <div className="col-12">
                  <button type="submit" className="btn btn-default" onClick={this._submit}>Submit</button>
                </div>
              </div>
          </form>
        </div>
      </div>
      )
  }

}

export default Inventory