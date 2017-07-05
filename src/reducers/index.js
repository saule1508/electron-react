// @flow
import { combineReducers } from 'redux'
import inventory from './inventory'
import directory from './directory'
import content from './content'
import versions from './versions'

const rootReducer = combineReducers({
	inventory,
  directory,
  content,
  versions
}); 

export default rootReducer
