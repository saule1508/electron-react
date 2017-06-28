import React from 'react';
const {dialog } = require('electron').remote;
const {app} = require('electron').remote;


const STYLE = {
  'invalid' : {'color' : 'red'}
}
const getFile = () => {
  
  
  return dialog.showOpenDialog({title: 'Package location', defaultPath: app.getAppPath(),properties: ['openDirectory']});
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
    let formClass = this.props.directory.name && ! this.props.directory.isValid ? 'has-danger' : 'has-sucess';
    return (<div className="card">
      <div className="card-block">
        <h4>2. select directory with upgrade package</h4>
        <form className={formClass}>
            <div className="row">
              <div className="col-6">
                <input type="text" className="form-control" 
                  placeholder="Select source directory" value={this.props.directory.name || ''} disabled/>              
                {(this.props.directory.name && ! this.props.directory.isValid) ? 
                    (<p className="form-control-static"style={STYLE.invalid}>Not a valid directory</p>) : ''}
              </div>
              <div className="col-2">
                <button type="submit" className="btn btn-default" onClick={this._dialog}>
                  Change
                </button>
              </div>
            </div>
        </form>
      </div>
    </div>);
  }
}
