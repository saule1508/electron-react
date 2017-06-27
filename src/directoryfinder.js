import React from 'react';
const {dialog } = require('electron').remote;

const STYLE = {
  'invalid' : {'color' : 'red'}
}
const getFile = () => {
    return dialog.showOpenDialog({properties: ['openDirectory']});
}


export default class DirectoryFinder extends React.Component {

  constructor(props){
    super(props);    
    this._dialog = this._dialog.bind(this);
  }

  _dialog(evt){
    if (evt){
      evt.preventDefault();
    }
    let myFile = getFile();
    this.props.onChange(myFile[0]);
  }

  componentDidMount() {
    /*
    if (! this.props.directory){
      this._dialog();
    }
    */
  }

  render() {
    return (<div className="card">
      <div className="card-block">
        <h4>1. select source</h4>
        <form>
          <div className="form-group">
              <input type="text" className="form-control" 
                placeholder="Select source directory" value={this.props.directory.name || ''} disabled/>              
              {(this.props.directory.name && ! this.props.directory.isValid) ? 
                  (<p style={STYLE.invalid}>Not a valid directory</p>) : ''}
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this._dialog}>
                Change
              </button>
          </div>
        </form>
      </div>
    </div>);
  }
}
