import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"


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
						<div className="custom-control custom-checkbox">
						    <input 
							    type="checkbox" 
							    className="custom-control-input" 
							    id="is-movs-grouped" 
							    checked={isGrouped} 
							    onChange={this.handleMGroupClick} 
						    />
						    <label className="custom-control-label" htmlFor="is-movs-grouped">Згорнуті категорії</label>
						</div>

					</th>

	  			<th colSpan="3" className="clong">Витрачено</th>

		  		<th rowSpan="2" className="cshort">Примітки
						<div className="custom-control custom-checkbox">
						    <input 
							    type="checkbox" 
							    className="custom-control-input" 
							    id="is-movs-grouped2" 
							    checked={isGrouped} 
							    onChange={this.handleMGroupClick} 
						    />
						    <label className="custom-control-label" htmlFor="is-movs-grouped2">Згорнуті категорії</label>
						</div>


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
								/>) 
							) 
						}
					</tbody>
				</table>
			</div>	
		)

	}

}

CompaniesMovements.Proptypes = {
	companies: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired,
	allMovements: PropTypes.array.isRequired,
	isGrouped:PropTypes.bool.isRequired,
	mGroupClick:PropTypes.func.isRequired
}