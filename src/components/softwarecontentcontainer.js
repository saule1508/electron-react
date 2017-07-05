import { connect } from 'react-redux'
import SoftwareContent from './softwarecontent'
import { fetchRPMVersions, fetchImageVersions } from '../actions/versions'

const mapStateToProps = (state) => {
	return {
		doc: state.content.doc,
    error: state.content.error,
    rpms_versions: state.versions.rpms,
    images_versions: state.versions.images
	}
} 

const mapDispatchToProps = (dispatch) => ({
  fetchRPMVersions: () => {
    return dispatch(fetchRPMVersions());
  },
  fetchImageVersions: () => {
    return dispatch(fetchImageVersions());
  },

});

export default connect(mapStateToProps,mapDispatchToProps)(SoftwareContent);
