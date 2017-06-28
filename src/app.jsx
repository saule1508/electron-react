import React from 'react';
const {spawn} = require('child_process');
import DirectoryFinder from './directoryfinder'
import { validateDirectory, readContent } from './api/index.js'

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

  componentDidMount() {
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

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2>EVS Xone installer</h2>
            <DirectoryFinder onChange={this._changeDir} directory={this.state.directory} />
          </div>
        </div>
      </div>);
  }
}
