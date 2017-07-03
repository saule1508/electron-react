import React from 'react';
import PropTypes from 'prop-types'
const { dialog } = require('electron').remote;
const { app } = require('electron').remote;


const STYLE = {
  'invalid' : {'color' : 'red'},
  'valid' : {'color' : 'green'}
}

const getFile = (defaultDir) => {
  return dialog.showOpenDialog({title: 'Package location', defaultPath: defaultDir,properties: ['openDirectory']});
}


class DirectoryFinder extends React.Component {

  constructor(props){
    super(props);    
    this._dialog = this._dialog.bind(this);
  }

  _dialog(evt){
    if (evt){
      evt.preventDefault();
    }
    let myFile = getFile(this.props.name || app.getAppPath());
    if (myFile){
      this.props.validateDirectory(myFile[0]);
    }
  }
  /*
  componentDidMount() {
    
    if (! this.props.name){
      getFile(app.getAppPath());
    }
  }
  */

  render() {
    let { name, isValid } = this.props;
    let formClass = name && ! isValid ? 'has-danger' : 'has-sucess';
    return (
      <div>
        <h4>Directory with upgrade package</h4>
        <div className="panel">
          <div className="panel-body">
            <form className={formClass}>
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" className="form-control" 
                      placeholder="Select source directory" value={name || ''} disabled/>              
                    {(name && ! isValid) ? 
                        (<p className="form-control-static"style={STYLE.invalid}>Not a valid directory</p>) : ''}
                    {(name && isValid) ? 
                        (<p className="form-control-static"style={STYLE.valid}>Directory is valid</p>) : ''}
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-default" onClick={this._dialog}>
                      Change
                    </button>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>);
  }
}

DirectoryFinder.propTypes = {
  name: PropTypes.string,
  isValid: PropTypes.bool,
  validateDirectory: PropTypes.func.isRequired
}

export default DirectoryFinder
