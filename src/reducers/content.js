// @flow
import {  
  READ_CONTENT_SUCCESS, READ_CONTENT_FAILURE } from '../actions/content';


export default function content(state = {doc: null,isValid: null,error: null}, action) {
  switch (action.type) {
    case READ_CONTENT_SUCCESS:
      return Object.assign({}, state, { doc: action.payload,error: null });
    case READ_CONTENT_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
}
