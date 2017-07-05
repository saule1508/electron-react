import { getRPMVersions, getDockerVersions } from '../api/index';

export const FETCH_RPMVERSIONS = 'FETCH_RPMVERSIONS';
export const FETCH_RPMVERSIONS_SUCCESS = 'FETCH_RPMVERSIONS_SUCCESS';
export const FETCH_RPMVERSIONS_FAILURE = 'FETCH_RPMVERSIONS_FAILURE';

export const FETCH_IMAGEVERSIONS = 'FETCH_IMAGEVERSIONS';
export const FETCH_IMAGEVERSIONS_SUCCESS = 'FETCH_IMAGEVERSIONS_SUCCESS';
export const FETCH_IMAGEVERSIONS_FAILURE = 'FETCH_IMAGEVERSIONS_FAILURE';


const fetchRPMVersionsSuccess = (versions) => ({
  type: FETCH_RPMVERSIONS_SUCCESS,
  payload: versions
});

const fetchRPMVersionsFailure = (error) => ({
  type: FETCH_RPMVERSIONS_FAILURE,
  payload: error
});

export const fetchRPMVersions = (component) => {
  return (dispatch,getState) => {
    getRPMVersions(getState().inventory.ip,component)
    .then((data)=>{
      return dispatch(fetchRPMVersionsSuccess(data.result));
    })
    .catch((error)=>{
      return dispatch(fetchRPMVersionsFailure(error));      
    });
  }
}

const fetchImageVersionsSuccess = (versions) => ({
  type: FETCH_IMAGEVERSIONS_SUCCESS,
  payload: versions
});

const fetchImageVersionsFailure = (error) => ({
  type: FETCH_IMAGEVERSIONS_FAILURE,
  payload: error
});

export const fetchImageVersions = (component) => {
  return (dispatch,getState) => {
    getDockerVersions(getState().inventory.ip,component)
    .then((data)=>{
      return dispatch(fetchImageVersionsSuccess(data.result));
    })
    .catch((error)=>{
      return dispatch(fetchImageVersionsFailure(error));      
    });
  }
}
