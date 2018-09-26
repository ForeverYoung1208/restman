console.log('Hello from movements_main.jsx ')

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Day } from './Day/day'

// class MovementApp extends React.Component {
// PureComponent doesn't updates component if no props and no state changes

class MovementApp extends React.PureComponent {	
	render(){
		return(
			<div >
				<Day/>
			</div>
		)
	}
}


document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
  	const app = document.getElementById('app-movements')
  	if (app){
  		ReactDOM.render(
  			<MovementApp/>
  			,app
  		)
  	}
  }
}