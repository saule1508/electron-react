import React from 'react';
import { Provider } from 'react-redux'
import AppContainer from './appcontainer';
import configureStore from './store/configureStore'

import $ from "jquery"
window.jQuery = $;
global.Tether = require('tether');
require('bootstrap');

const store=configureStore();
console.log(store);

class Main extends React.Component{

	render(){
		return(	

	  	<Provider store={store}>
	  		<AppContainer />
	  	</Provider>
	  )
	 }
 }

 export default Main