import React from 'react';
const {spawn} = require('child_process');
const os = require('os');
import DirectoryFinder from './directoryfinder'
import Inventory from './inventory'
import SoftwareContent from './softwarecontent'
import { validateDirectory, readContent, validateInventory } from './api/index.js'

export default class App extends React.Component {

  constructor(props){
    super(props);
    this._changeDir = this._changeDir.bind(this);
    this.state = {
      'directory': {
        'name': null, 'isValid': null
      },
      'content': {
        'error': null,
        'doc': null
      },
      'inventory': {
        'hostname': os.hostname(),
        'ip': '127.0.0.1',
        'isValid': null
      }
    }
  }

  _changeDir(dir){
    console.log(dir);
    let isValid = validateDirectory(dir); 
    this.setState({'directory': 
        {'name': dir, 'isValid': isValid}
      });
    if (isValid){
      let content = readContent(dir);
      this.setState({'content': content});
    }
  }

  _changeInventory(inv){
    console.log('changed inv');
    this.setState({inventory: inv});
  }

  componentDidMount() {
    /*
    let ls = spawn('ls', ['-lh', '/usr']);
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    */
    console.log(this.state);

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2>EVS Xone installer</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Inventory onChange={this._changeInventory} inventory={this.state.inventory} />
          </div>
        </div>
        <div className="row" style={{'marginTop': 10}}>
          <div className="col-md-6">        
            <DirectoryFinder onChange={this._changeDir} directory={this.state.directory} />
          </div>
        </div>
        <div className="row" style={{'marginTop': 10}}>
          <div className="col-md-12">        
            <SoftwareContent content={this.state.content.doc} />
          </div>
        </div>        
      </div>);
  }
}
