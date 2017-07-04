import React, { Component } from 'react';
import PropTypes from 'prop-types'
const {spawn} = require('child_process');


class AnsiblePlayConsole extends Component {

  constructor(props){
    super(props);
    this.state = {'stdout': '', 'stderr': ''};
  }

  componentDidMount(){
    let ansible = spawn('ansible-playbook', ['-i', this.props.inventoryFile,`--extra-vars={stage_dir=${this.props.contentDirectory}}`,
      'xone_upgrade.yml'], {cwd: `/evs-software/${this.props.product.name}`});
    ansible.stdout.on('data', (data) => {
      this.setState({stdout: `${this.state.stdout}\n${data}`});
    });
    ansible.stderr.on('data', (data) => {
      this.setState({sterr: `${this.state.stderr}\n${data}`});
    });

    ansible.on('close', (code) => {
      this.setState({stdout: `${this.state.stdout}\n$child process exited with code ${code}`});
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
      </div>
    )
  }

}

AnsiblePlayConsole.propTypes = {
  inventoryFile: PropTypes.string.isRequired,
  contentDirectory: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired
}

export default AnsiblePlayConsole