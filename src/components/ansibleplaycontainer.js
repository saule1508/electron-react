import { connect } from 'react-redux'
import Ansibleplay from './ansibleplay'
import { writeInventory } from '../actions/inventory'

const mapStateToProps = (state) => {
	return {
		inventory: state.inventory,
    directory : state.directory,
    content : state.content
	}
} 

const mapDispatchToProps = (dispatch) => ({
  writeInventory: () => {
    return dispatch(writeInventory());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Ansibleplay);
