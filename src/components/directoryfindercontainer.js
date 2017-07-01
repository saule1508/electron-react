import { connect } from 'react-redux'
import {  validateDirectory } from '../actions/directory'
import DirectoryFinder from './directoryfinder'

const mapStateToProps = (state) => {
	return {
		name: state.directory.name,
    isValid: state.directory.isValid
	}
} 

const mapDispatchToProps = (dispatch) => ({
	validateDirectory: (directory) => {
		return dispatch(validateDirectory(directory));
	}

});

export default connect(mapStateToProps,mapDispatchToProps)(DirectoryFinder);
