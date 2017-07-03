import React from 'react';
import { Provider } from 'react-redux'
import AppContainer from './appcontainer';
import configureStore from './store/configureStore'


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