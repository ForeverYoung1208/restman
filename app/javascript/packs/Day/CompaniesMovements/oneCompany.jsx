import React from "react"
import PropTypes from "prop-types"
import Gcomment from "./gcomment"
import {EditMovement} from "./EditMovement/editMovement"
import {CommentsBlock} from "./commentsBlock"

export class OneCompany extends React.Component{
	constructor(props){
		super(props)
	}

	sumMovsByCurrency = (currency = 'UAH', allMovs) => {
		let income = 0, outcome = 0
		let sum = 0
		if (allMovs && allMovs.length>0){
			income = allMovs.reduce( (sum, m) =>  (m.direction=='Income' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
			outcome = allMovs.reduce( (sum, m) =>  (m.direction=='Outcome' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
		}
	  return {income: income, outcome:outcome}
	}

	companyAccountsSaldo = (allAccounts) =>{
		const sumByCurr = (curr)=>{
			return(
				allAccounts.filter(a => (a.currency.name_int == curr)&&(a.company_id == this.props.company.id))
					.reduce( (sum, a) => sum+=parseFloat(a.saldo_on_date), 0)
			)
		}
		return{
			uah: sumByCurr('UAH'),
			usd: sumByCurr('USD'),
			eur: sumByCurr('EUR'),
		}

	}


	
	render(){
		const {company, movements, isGrouped, voc, loadingMovementsIds} = this.props
		const saldo_on_date = this.companyAccountsSaldo(voc.accsList)
		const commentsWrapper = (direction) => {
			return(
					isGrouped ? <Gcomment
												movements={movements} 
												company_id={company.id}
												direction={direction}
												loadingMovementsIds={loadingMovementsIds}
											/> 
										: <CommentsBlock 
												movements={movements} 
												voc={{...this.props.voc, company_id: company.id}}
												direction={direction}
												loadingMovementsIds={loadingMovementsIds}
											/> 
			)
		}

		return(

			<tr >
				<td className="i-text">{	company.code_name}, (id: {company.id})</td>

				<td>{saldo_on_date.uah}</td>
				<td>{saldo_on_date.usd}</td>
				<td>{saldo_on_date.eur}</td>

				<td>{this.sumMovsByCurrency('UAH', movements).income}</td>
				<td>{this.sumMovsByCurrency('USD', movements).income}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).income}</td>
				<td className="i-text">
					{	commentsWrapper('Income')	}

				</td>


				<td>{this.sumMovsByCurrency('UAH', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('USD', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">
					{	commentsWrapper('Outcome')	}
				</td>
				
				<td>UAH</td>
				<td>USD</td>
				<td>EUR</td>


			</tr>

		)

	}

}

OneCompany.propTypes = {
	company: PropTypes.object.isRequired,
// code_name: "ISR"
// group_id: 1
// id: 1

	movements: PropTypes.array,
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
// currency: 'UAH'
	isGrouped: PropTypes.bool.isRequired,
	voc: PropTypes.object.isRequired,
	loadingMovementsIds: PropTypes.array.isRequired

}

