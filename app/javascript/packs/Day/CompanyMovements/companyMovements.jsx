import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

export class CompanyMovements extends React.Component{
	constructor(props){
		super(props)
		this.state = ({
			allMovements: [],
			allAccounts:[]
		});
	}

	componentDidMount = () => {
    fetch('/movements.json',
			{	method: 'GET',
				headers: {'Content-Type': 'application/json'}
			})
			.then( res => {
				return res.json()
			})
			.then( resj => {
				console.log(resj)
				this.setState({
					allMovements: [...resj]
				});
			}
		)		

	  
	}
	

	render(){
		return(
			<div className='col-md-12'>

				{ 
					this.props.companies.map( (c) => 
						(<OneCompany 
							key={c.id} 
							company={c} 
							movements={this.state.allMovements.filter( m => m.company_id == c.id)} 
							accounts={this.state.allAccounts} 
						/>) 
					) 
				}
				{this.props.date}


			</div>	
		)

	}

}

CompanyMovements.Proptypes = {
	companies: PropTypes.array.isRequired

}