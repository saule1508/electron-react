import React, { Component } from 'react';
import PropTypes from 'prop-types'
const {spawn} = require('child_process');


class AnsiblePlayConsole extends Component {

  constructor(props){
    super(props);
    this.state = {'stdout': '', 'stderr': '', error: ''};
  }

  componentDidMount(){
    let ansible = spawn('ansible-playbook', ['-i', this.props.inventoryFile,
      '--extra-vars',`stage_dir="${this.props.contentDirectory}"`,
      'xone-upgrade.yml'], {cwd: `/evs-software/${this.props.product.name}/ansible`});
    
    // let ansible = spawn('ansible-playbook', ['--help'], {cwd: `/evs-software/${this.props.product.name}/ansible`});
    ansible.stdout.on('data', (data) => {
      this.setState({stdout: `${this.state.stdout}\n${data.toString()}`});
    });
    ansible.stderr.on('data', (data) => {
      this.setState({sterr: `${this.state.stderr}\n${data.toString()}`});
    });

    ansible.on('close', (code) => {
      this.setState({stdout: `${this.state.stdout}\n$child process exited with code ${code}`});
    });      
    ansible.on('error', (error) => {
      console.log(error.toString());
      this.setState({error: `Oh no...we got an error :-(.error: ${error.toString()}\n`});
    });      
  }

  render(){
    return (
      <div className="panel panel-default">
        <div>
          <pre>
            {this.state.stdout}
          </pre>
        </div>
        <div>
          <pre>
            {this.state.stderr}
          </pre>
        </div>
        {this.state.error && (
          <div className="alert alert-danger">
            {this.state.error}
          </div>
          )
        }
      </div>
    )
  }

}

AnsiblePlayConsole.propTypes = {
  inventoryFile: PropTypes.string.isRequired,
  contentDirectory: PropTypes.string.isRequired,
  product: PropTypes.shape({name: PropTypes.string.isRequired, version: PropTypes.number.isRequired}).isRequired
}

export default AnsiblePlayConsole
