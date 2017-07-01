import { connect } from 'react-redux'
import { initInventory, setInventory } from '../actions/inventory'
import Inventory from './inventory'

const mapStateToProps = (state) => {
	return {
		inventory: state.inventory
	}
} 

const mapDispatchToProps = (dispatch) => ({
	getInventory: () => {
		return dispatch(initInventory());
	},
	setInventory: (inv) => {
		return dispatch(setInventory(inv));
	},

});

export default connect(mapStateToProps,mapDispatchToProps)(Inventory);
