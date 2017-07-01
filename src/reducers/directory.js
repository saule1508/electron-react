// @flow
import {  
  VALIDATE_DIRECTORY, VALIDATE_DIRECTORY_SUCCESS, VALIDATE_DIRECTORY_FAILURE } from '../actions/directory';


export default function directory(state = {name: '',isValid: false,error: null}, action) {
  switch (action.type) {
    case VALIDATE_DIRECTORY:
      return Object.assign({}, state, {name: action.payload, isValid: null, error: null});
    case VALIDATE_DIRECTORY_SUCCESS:
      return Object.assign({}, state, { name: action.payload,isValid: true });
    case VALIDATE_DIRECTORY_FAILURE:
      return Object.assign({}, state, { isValid: false, error: action.payload });
    default:
      return state;
  }
}
