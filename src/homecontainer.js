import { connect } from 'react-redux'
import { validateInventory } from './actions/inventory'
import App from './app'

const mapStateToProps = (state) => {
	return {
		inventory: state.inventory
	}
} 

const mapDispatchToProps = (dispatch) => ({
	validateInventory: (inv) => {
		return dispatch(validateInventory(inv));
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
