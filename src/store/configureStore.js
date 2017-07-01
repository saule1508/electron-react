import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
// @flow
/*
const configureStore = () => {
	console.log(process.env);
	const isDevMode = process.execPath.match(/[\\/]electron/);
	console.log(isDevMode);
	return {inventory: 'test'}
}
*/
const initialState = {};

const isDevMode = process.execPath.match(/[\\/]electron/);

function configureStore() {
  const middleware = [];
  const enhancers = [];
  let enhancer;
  let store;
  // Thunk Middleware
  middleware.push(thunk);

  if (isDevMode){
  // Logging Middleware
	  const logger = createLogger({
	    level: 'info',
	    collapsed: true
	  });
  	middleware.push(logger);
	  // Redux DevTools Configuration
  	// If Redux DevTools Extension is installed use it, otherwise use Redux compose
  	/* eslint-disable no-underscore-dangle */
  	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    	: compose;
  	/* eslint-enable no-underscore-dangle */

 		enhancers.push(applyMiddleware(...middleware));
  	// Apply Middleware & Compose Enhancers
  	//enhancer = composeEnhancers(...enhancers);
  	enhancer = compose(...enhancers);
  	// Create Store
  	store = createStore(rootReducer, initialState,enhancer);

  	if (module.hot) {
    	module.hot.accept('../reducers', () =>
      	store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    	);
  	}
  } else {
  	enhancer = applyMiddleware(thunk);
  	store=createStore(rootReducer,initialState,enhancer);
  }

  return store;

}

export default configureStore ;


/*
if (! isDevMode ) {
	configureStore 
  module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev'); // eslint-disable-line global-require
}
*/
