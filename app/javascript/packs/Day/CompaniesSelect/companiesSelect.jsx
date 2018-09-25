import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'reactstrap'
import { Button, ButtonGroup } from 'reactstrap'


export class CompaniesSelect extends React.Component{
	constructor(props){
		super(props)
	}



  render(){
  	return(
  		<div>
        <ButtonGroup>
  				{this.props.companiesList.map( (g) => ( 
	          <Button key = {g.id} color="primary" onClick={() => this.props.onCompanyClick(g.id)} active={this.props.cSelected.includes(g.id)}>{g.code_name}</Button>
  				))}
        </ButtonGroup>
  		</div>

  	)
  }

}
CompaniesSelect.Proptypes = {
	onCompanyClick: PropTypes.func,
	cSelected: PropTypes.array,
	companiesList: PropTypes.array
}