import React from 'react';
import PropTypes from 'prop-types';
const os = require('os');
import DirectoryFinderContainer from './components/directoryfindercontainer'
import InventoryContainer from './components/inventorycontainer'
import SoftwareContentContainer from './components/softwarecontentcontainer'
import AnsiblePlayContainer from './components/ansibleplaycontainer'
import Navigator from './components/navigator'

class App extends React.Component {

  constructor(props){
    super(props);
    this._previous = this._previous.bind(this);
    this._next = this._next.bind(this);

    this.state = {
      'step': 1
    }
  }

  _validateInventory(inv){
    
    this.props.validateInventory().then(()=>{
      if (this.props.inventory.isValid){
        this.props.writeInventory();
        this.setState({step: this.state.step + 1})
      }
    });
      
  }

  _previous(){
    if (this.state.step > 1){
      this.setState({'step': this.state.step - 1})
    }
  }

  _next(){
    if (this.state.step === 1){
      this._validateInventory();
      return;
    }
    if (this.state.step === 2){
      if (this.props.directory.isValid){
        this.props.readContent(this.props.directory.name).then(()=>{
          this.setState({step: this.state.step + 1})        
        });
      }
      return;
    }

    if (this.state.step < 4){
      this.setState({'step': this.state.step + 1})
    }
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row" style={{'marginTop': 10, 'marginBottom': 20}} >
          <Navigator prev={this._previous} next={this._next} step={this.state.step} />
        </div>
        <div className="row" hidden={this.state.step !== 1} >
          <div className="col-md-6">
            <InventoryContainer  />
          </div>
        </div>
        {(this.state.step === 2) && (
          <div className="row" style={{'marginTop': 10}} hidden={this.state.step !== 2} >
            <div className="col-md-6">        
              <DirectoryFinderContainer />
            </div>
          </div>
        )}
        {(this.state.step === 3) && (
          <div className="row" style={{'marginTop': 10}} >
            <div className="col-md-12">        
              <SoftwareContentContainer  />
            </div>
          </div>        
        )}
        {(this.state.step === 4) && (
          <div className="row" style={{'marginTop': 10}} >
            <div className="col-md-12">        
              <AnsiblePlayContainer  />
            </div>
          </div>        
        )}
      </div>
      );
  }
}

App.propTypes = {
  inventory: PropTypes.object,
  directory: PropTypes.object,
  content: PropTypes.shape({
    doc: PropTypes.object,
    error: PropTypes.string
  })
}

export default App