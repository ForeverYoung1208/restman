import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'reactstrap'
import { Button, ButtonGroup } from 'reactstrap'


export class CompaniesSelect extends React.Component{
	constructor(props){
		super(props)
	}



  render(){
  	const {compList} = this.props.voc
  	return(
  		<div >
  			<span className="p-2">Компанії:</span>
        <ButtonGroup>
  				{compList.map( (g) => ( 
	          <Button 
	          	className="p-2"
	          	key = {g.id} 
	          	color="light" 
	          	onClick={() => this.props.onCompanyClick(g)} 
	          	active={this.props.cSelected.includes(g)}
	          > 
		          {g.code_name}
	          </Button>
  				))}
        </ButtonGroup>
  		</div>

  	)
  }

}
CompaniesSelect.propTypes = {
	onCompanyClick: PropTypes.func.isRequired,
	cSelected: PropTypes.array.isRequired,
	voc: PropTypes.object.isRequired
}