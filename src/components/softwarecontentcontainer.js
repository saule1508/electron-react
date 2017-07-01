import { connect } from 'react-redux'
import SoftwareContent from './softwarecontent'

const mapStateToProps = (state) => {
	return {
		doc: state.content.doc,
    error: state.content.error
	}
} 

export default connect(mapStateToProps)(SoftwareContent);
