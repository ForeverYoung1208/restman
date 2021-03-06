import React from 'react'
import ReactDOM from 'react-dom'

import { Day } from './Day/day'
  
if ( $('meta[name=psj]').attr('controller')=='movements'){

  // class MovementApp extends React.Component {
  // PureComponent doesn't updates component if no props and no state changes

  class MovementApp extends React.Component {	
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

}