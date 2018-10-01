import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

export class CompanyMovements extends React.Component{
	constructor(props){
		super(props)
    fetch('/movements.json',
			{	method: 'GET',
				headers: {'Content-Type': 'application/json'}
			})
			.then( res => {
				return res.json()
			})
			.then( resj => {
				console.log( resj)
				this.state = ({
					movements: [...resj]
				});
			}
		)

	}

	ComponentDidMount = () => {

	  
	}
	

	render(){
		return(
			<div className='col-md-12'>

				{ 
					this.props.companies.map( (c) => (<OneCompany key={c.id} company={c} />) ) 
				}
				{this.props.date}


			</div>	
		)

	}

}

CompanyMovements.Proptypes = {
	companies: PropTypes.array.isRequired

}