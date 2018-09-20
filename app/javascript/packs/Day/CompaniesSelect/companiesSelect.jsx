import React from 'react'
import PropTypes from 'prop-types'

import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'


export class CompaniesSelect extends React.Component{
	constructor(props){
		super(props)
	}

  componentDidMount = () => {
  	const getCompaniesUrl = '/companies.json'
		const myHeaders = new Headers({
			'Content-Type': 'application/json'
		});

    this._requestCompaniesList = fetch(
			getCompaniesUrl,
			{
				method: 'GET',
				headers: myHeaders
				// body: JSON.stringify(payload),
				// credentials: "same-origin"
			})
			.then( res => {
				return res.json()
			})
			.then( resj => {
				console.log( resj )
				// this.setState({cards: resj})
			}
		)
    // loadMyAsyncData().then(
    //   externalData => {
    //     this._asyncRequest = null;
    //     this.setState({externalData});
    //   }
    // );
  }	
  render(){
  	return(
  		<div>


  			
  		</div>

  	)
  }

}