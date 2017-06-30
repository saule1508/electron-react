import React from 'react';
const {spawn} = require('child_process');
const os = require('os');
import DirectoryFinder from './components/directoryfinder'
import Inventory from './components/inventory'
import SoftwareContent from './components/softwarecontent'
import { validateDirectory, readContent, validateInventory } from './api/index.js'
import Navigator from './components/navigator'

export default class App extends React.Component {

  constructor(props){
    super(props);
    this._changeDir = this._changeDir.bind(this);
    this._changeInventory = this._changeInventory.bind(this);
    this._previous = this._previous.bind(this);
    this._next = this._next.bind(this);

    this.state = {
      'step': 1,
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
      console.log(content);
      this.setState({'content': content, 'step': 3});
    }
  }

  _changeInventory(inv){
    this.setState({inventory: Object.assign({},inv)});
  }

  _validateInventory(inv){
    let isValid = validateInventory(inv);
    this.setState({inventory: Object.assign({},inv, {isValid: isValid})});
    if (isValid){
      this.setState({'step': 2});      
    }
  }

  _previous(){
    console.log('previous %d', this.state.step);
    if (this.state.step > 1){
      this.setState({'step': this.state.step - 1})
    }
  }

  _next(){
    if (this.state.step === 1){
      // validate the inventory

    }
    if (this.state.step < 4){
      this.setState({'step': this.state.step + 1})
    }
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
        <div className="row" style={{'marginTop': 10, 'marginBottom': 20}} >
          <Navigator prev={this._previous} next={this._next} step={this.state.step} />
        </div>
        <div className="row" hidden={this.state.step !== 1} >
          <div className="col-md-6">
            <Inventory onChange={this._changeInventory} inventory={this.state.inventory} />
          </div>
        </div>
        <div className="row" style={{'marginTop': 10}} hidden={this.state.step !== 2} >
          <div className="col-md-6">        
            <DirectoryFinder onChange={this._changeDir} directory={this.state.directory} />
          </div>
        </div>
        {(this.state.step === 3) && (
          <div className="row" style={{'marginTop': 10}} >
            <div className="col-md-12">        
              <SoftwareContent content={this.state.content} />
            </div>
          </div>        
        )}
      </div>
      );
  }
}
