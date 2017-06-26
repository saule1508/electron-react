import React from 'react';
const {spawn} = require('child_process');
import DirectoryFinder from './directoryfinder'

export default class App extends React.Component {

  constructor(props){
    super(props);
    this._changeDir = this._changeDir.bind(this);
    this.state = {'directory': null}
  }
  _changeDir(dir){
    console.log(dir);
    this.setState({'directory': dir});
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
    return (<div className="row">
      <div className="col-md-12">
        <h2>EVS Xone installer</h2>
        <DirectoryFinder onChange={this._changeDir} directory={this.state.directory} />
      </div>
    </div>);
  }
}
