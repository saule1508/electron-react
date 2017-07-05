import { connect } from 'react-redux'
import SoftwareContent from './softwarecontent'
import { fetchRPMVersions, fetchImageVersions } from '../actions/versions'

const mapStateToProps = (state) => {
	return {
		doc: state.content.doc,
    error: state.content.error,
    rpm_versions: state.versions.rpm.list,
    image_versions: state.versions.image.list
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
