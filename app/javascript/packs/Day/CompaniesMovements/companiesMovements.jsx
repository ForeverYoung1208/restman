import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

const GroupCheckbox = (props) => {
	return(
		<div className="custom-control custom-checkbox">
	    <input 
		    type="checkbox" 
		    className="custom-control-input" 
		    id="is-movs-grouped" 
		    checked={props.checked} 
		    onChange={props.onChange} 
	    />
	    <label className="custom-control-label" htmlFor="is-movs-grouped">Згорнути категорії</label>
		</div>	
	)

}

export class TableHead extends React.Component{
	constructor(props){
		super(props)
	}	


	handleMGroupClick = () => {
		this.props.mGroupClick();
	}	

	render(){
		let {isGrouped} = this.props

	  return(
	  	<thead>
	  		<tr>
		  		<th rowSpan="2" className="c1">Код компанії</th>
		  		<th colSpan="3" className="clong">Вх. залишок</th>

	  			<th colSpan="3" className="clong">Отримано</th>

					<th rowSpan="2" className="cshort">Примітки
						
						<GroupCheckbox checked={isGrouped} onChange={this.handleMGroupClick} />

					</th>

	  			<th colSpan="3" className="clong">Витрачено</th>

		  		<th rowSpan="2" className="cshort">Примітки
						<GroupCheckbox checked={isGrouped} onChange={this.handleMGroupClick} />

		  		</th>
		  		<th colSpan="3" className="clong">Вих. залишок</th>

		  	</tr>

				<tr >

					<th>UAH</th>
					<th>USD</th>
					<th>EUR</th>

					<th>UAH</th>
					<th>USD</th>
					<th>EUR</th>

					<th>UAH</th>
					<th>USD</th>
					<th>EUR</th>
					
					<th>UAH</th>
					<th>USD</th>
					<th>EUR</th>

				</tr>

	  	</thead>
	  )
	}
}

export class CompaniesMovements extends React.Component{
	constructor(props){
		super(props)
	}

	handleMGroupClick = () => {
		this.props.mGroupClick();
	}	
	

	render(){
		return(
			<div className='table-responsive'>
				<table className="table movements-table">
					<TableHead
						isGrouped={this.props.isGrouped}
						mGroupClick={this.handleMGroupClick}

					/>
					<tbody>
						{ 
							this.props.companies.map( (c) => 
								(<OneCompany 
									key={c.id} 
									company={c} 
									movements={this.props.allMovements.filter( m => m.company_id == c.id)} 
									isGrouped={this.props.isGrouped}
									voc={this.props.voc}
								/>) 
							) 
						}
					</tbody>
				</table>
			</div>	
		)

	}

}

CompaniesMovements.propTypes = {
	companies: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired,
	allMovements: PropTypes.array.isRequired,
	isGrouped:PropTypes.bool.isRequired,
	mGroupClick:PropTypes.func.isRequired,
	voc:PropTypes.object.isRequired
}