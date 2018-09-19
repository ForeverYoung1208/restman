import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


const CompaniesSelect = () =>	{


  componentDidMount = () => {
  	const getCompaniesUrl = '/companies/index.json'
		const myHeaders = new Headers({
			'Content-Type': 'application/json'
		});

    this._requestCompaniesList = fetch(
			url,
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
				this.setState({cards: resj})
			}
		)
			




    // loadMyAsyncData().then(
    //   externalData => {
    //     this._asyncRequest = null;
    //     this.setState({externalData});
    //   }
    // );
  }	

}