// @flow
import { combineReducers } from 'redux'
import inventory from './inventory'
import directory from './directory'
import content from './content'

const rootReducer = combineReducers({
	inventory,
  directory,
  content
}); 

export default rootReducer
