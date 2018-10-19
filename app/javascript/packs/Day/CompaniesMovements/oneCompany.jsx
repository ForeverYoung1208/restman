import React from "react"
import PropTypes from "prop-types"

export class OneCompany extends React.Component{
	constructor(props){
		super(props)
		console.log(props)

	}


	
	render(){
		const {company, movements} = this.props
		return(
			<div className="row">
				<div className="col-md-1">{	company.code_name} (id: {company.id})</div>
				<div className="col-md-2">{ movements.map( m => m.comment) }</div>

				<hr className="my-hr-left col-md-12 align-center"/>

			</div>	
		)

	}

}

OneCompany.Proptypes = {
	company: PropTypes.object.isRequired,
// code_name: "ISR"
// group_id: 1
// id: 1

	movements: PropTypes.array
// account_id: 1
// comment: "Some comment"
// company_id: 1
// created_at: "2018-09-27T19:29:15.000Z"
// day_id: 1
// deleted_at: null
// direction: "Income"
// group_id: 1
// id: 1
// last_editor_id: 1
// log: "log here"
// updated_at: "2018-09-27T19:29:15.000Z"
// value: "1010.23"

}

