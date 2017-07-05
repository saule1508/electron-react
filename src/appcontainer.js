import { connect } from 'react-redux'
import { validateInventory, writeInventory } from './actions/inventory'
import { readContent } from './actions/content'
import App from './app'

const mapStateToProps = (state) => {
	return {
		inventory: state.inventory,
    directory: state.directory,
    content: state.content
	}
} 

const mapDispatchToProps = (dispatch) => ({
	validateInventory: (inv) => {
		return dispatch(validateInventory(inv));
	},
  writeInventory: () => {
    return dispatch(writeInventory());
  },
  readContent: (directory) => {
    return dispatch(readContent(directory))
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
