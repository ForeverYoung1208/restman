console.log('Hello from movements_main.jsx ')

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, HashRouter } from 'react-router-dom';

// import Day from './movements_components/day'

class MovementApp extends React.Component {
	render(){
		return(
			<div>
				<h1>MovementApp here </h1>
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