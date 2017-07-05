// @flow
import { combineReducers } from 'redux'
import {  
  FETCH_IMAGESVERSIONS_SUCCESS, FETCH_IMAGESVERSIONS_FAILURE,
  FETCH_RPMVERSIONS_SUCCESS, FETCH_RPMVERSIONS_FAILURE } from '../actions/versions';

const RPM_INIT_STATE = {
  rpms: {},
  error: null,
  isLoading: false
}

const DOCKER_INIT_STATE = {
  images: {},
  error: null,
  isLoading: false
}

const rpms = (state = RPM_INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_RPMVERSIONS_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case FETCH_RPMVERSIONS_SUCCESS:
      let newList = Object.assign({},state.rpms,action.payload);
      return Object.assign({}, state, { rpms: newList });
    default:
      return state;
  }
}

const images = (state = DOCKER_INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_IMAGESVERSIONS_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case FETCH_IMAGESVERSIONS_SUCCESS:
      let newList = Object.assign({},state.images,action.payload);
      return Object.assign({}, state, { images: newList });
    default:
      return state;
  }
}

export default combineReducers({
  rpms,
  images
})