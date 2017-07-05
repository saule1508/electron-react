// @flow
import { combineReducers } from 'redux'
import {  
  FETCH_IMAGEVERSIONS_SUCCESS, FETCH_IMAGEVERSIONS_FAILURE,
  FETCH_RPMVERSIONS_SUCCESS, FETCH_RPMVERSIONS_FAILURE } from '../actions/versions';

const RPM_INIT_STATE = {
  list: {},
  error: null,
  isLoading: false
}

const DOCKER_INIT_STATE = {
  list: {},
  error: null,
  isLoading: false
}

const rpm = (state = RPM_INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_RPMVERSIONS_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case FETCH_RPMVERSIONS_SUCCESS:
      let newList = Object.assign({},state.list,action.payload);
      return Object.assign({}, state, { list: newList });
    default:
      return state;
  }
}

const image = (state = DOCKER_INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_IMAGEVERSIONS_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case FETCH_IMAGEVERSIONS_SUCCESS:
      let newList = Object.assign({},state.list,action.payload);
      return Object.assign({}, state, { list: newList });
    default:
      return state;
  }
}

export default combineReducers({
  rpm,
  image
})
