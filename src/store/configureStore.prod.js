// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(thunk);

function configureStore() {
  return createStore(rootReducer, {}, enhancer);
}

export default { configureStore };
