import React from 'react';
const {dialog } = require('electron').remote;

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
    if (! this.props.directory){
      this._dialog();
    }
  }

  render() {
    return (<div className="row">
      <div className="col-md-12">
        <h3>Directory</h3>
        <form className="form-inline">
          <div className="form-group col-md-1">
              <p className="form-control">
                {this.props.directory}
              </p>
          </div>
          <div className="form-group col-md-1">
              <button className="btn btn-default" onClick={this._dialog}>
                Change
              </button>
          </div>
        </form>
      </div>
    </div>);
  }
}
