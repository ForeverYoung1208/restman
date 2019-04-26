import React from "react"
import PropTypes from "prop-types"
import Gcomment from "./gcomment"
import {CommentsBlock} from "./commentsBlock"
import SignCompany from "./SignCompany/signCompany"

import {roundFin} from "../../i-services"



export const sumMovsByCurrency = (currency = 'UAH', allMovs) => {
	let income = 0, outcome = 0
	let sum = 0
	if (allMovs && allMovs.length>0){
		income = allMovs.reduce( (sum, m) =>  (m.direction=='Income' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
		outcome = allMovs.reduce( (sum, m) =>  (m.direction=='Outcome' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
	}
  return {income: parseFloat(income).toFixed(2), outcome: parseFloat(outcome).toFixed(2)}
}

// counts saldo on all given allAccounts(using each account.saldo_on_date property) by given company (if given),
// before movements (.begin) property and after movements (.end property) using all given movements 
// (regardless of dates of account saldo's and movements) so take care of it)
export const accountsSaldo = (allAccounts, movements, company=null) =>{
	const sumByCurr = (curr)=>{
		const begin = allAccounts.filter(a => (a.currency.name_int == curr)&&(company ? a.company_id == company.id : true))
				.reduce( (sum, a) => sum+=parseFloat(a.saldo_on_date), 0)
		const movs = sumMovsByCurrency(curr, movements )
		const end = parseFloat(begin) + parseFloat(movs.income) - parseFloat(movs.outcome)
		return({begin:begin.toFixed(2), end: end.toFixed(2)})
	}

	return{
		UAH: sumByCurr('UAH'),
		USD: sumByCurr('USD'),
		EUR: sumByCurr('EUR'),
	}
}


export class OneCompany extends React.Component{
	constructor(props){
		super(props)
	}

		
	render(){
		const {company, movements, isGrouped, voc, loadingMovementsIds, editingMovementsIds} = this.props
		const saldo_on_date = accountsSaldo(voc.accsList,	movements, company)

		const commentsWrapper = (direction) => {
			return(
					isGrouped ? <Gcomment
												movements={movements.filter(m => m.direction == direction)} 
												voc={voc}
											/> 
										: <CommentsBlock 
												movements={movements} 
												voc={voc}
												company={company}
												direction={direction}
												loadingMovementsIds={loadingMovementsIds}
												editingMovementsIds={editingMovementsIds}
											/> 
			)
		}

		return(

			<tr >
				<td className="i-text">
					{	company.code_name}, (id: {company.id})
					<SignCompany 
						movementsToSign= {movements.filter( m=> m.company_id == company.id) }
						voc={voc}
					></SignCompany>
				</td>
				


				<td>{saldo_on_date.UAH.begin}</td>
				<td>{saldo_on_date.USD.begin}</td>
				<td>{saldo_on_date.EUR.begin}</td>

				<td>{sumMovsByCurrency('UAH', movements).income}</td>
				<td>{sumMovsByCurrency('USD', movements).income}</td>
				<td>{sumMovsByCurrency('EUR', movements).income}</td>
				<td className="i-text">
					{	commentsWrapper('Income')	}

				</td>


				<td>{sumMovsByCurrency('UAH', movements).outcome}</td>
				<td>{sumMovsByCurrency('USD', movements).outcome}</td>
				<td>{sumMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">
					{	commentsWrapper('Outcome')	}
				</td>
				
				<td>{saldo_on_date.UAH.end}</td>
				<td>{saldo_on_date.USD.end}</td>
				<td>{saldo_on_date.EUR.end}</td>



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
	loadingMovementsIds: PropTypes.array.isRequired,
	editingMovementsIds: PropTypes.array.isRequired,

}

