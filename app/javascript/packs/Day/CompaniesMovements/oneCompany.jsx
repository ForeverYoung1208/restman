import React from "react"
import PropTypes from "prop-types"
import Moment from 'moment'

import Gcomment from "./gcomment"
import {CommentsBlock} from "./commentsBlock"
import SignCompany from "./SignCompany/signCompany"
import {dotDateFormat, roundDisp} from "../../i-services"


export function sumMovsByCurrency(currency = 'UAH', allMovs){
	let income = 0, outcome = 0
	let sum = 0
	if (allMovs && allMovs.length>0){
		income = allMovs.reduce( (sum, m) =>  (m.direction=='Income' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
		outcome = allMovs.reduce( (sum, m) =>  (m.direction=='Outcome' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
	}
  return {
  	income: parseFloat(income).toFixed(2), 
  	outcome: parseFloat(outcome).toFixed(2),
  	change: parseFloat(income)-parseFloat(outcome)
  }
}



// counts saldo on all given allAccounts(using each account.saldo_on_date property) by given company (if given),
// using all given movements 
// (regardless of dates of account saldo's and movements) so take care of it)

export function accountsSaldo(allAccounts, movements, company=null){
	let depositDetail=''

	let accountsIds=[]

	function sumByCurr(curr){

		// cbn (CurrentBankName) this var will be used to determine if bank has chagged during reduce iterations
		let cbn

		const begin = allAccounts
				// filter out only given company and currency
				.filter(a => (a.currency.name_int == curr)&&(company ? a.company_id == company.id : true))
				// sort by deposit term ASC
				.sort((a1,a2)=> {
					if (a1.term>a2.term){return 1}
					if (a1.term<a2.term){return -1}
						return 0
				})
				// build information on deposits and calculate total sum trough all filtered accounts
				// and store account IDs
				.reduce( (sum, a) => {
					accountsIds.push(a.id)

					depositDetail+= a.bank.name==cbn ? '' : a.bank.name  //add bank name only if it's new
						+': ' + roundDisp(parseFloat(a.saldo_on_date) + sumMovsByCurrency(curr, movements.filter(m=>m.account_id==a.id)).change)
						+' '+ curr + ' до ' + dotDateFormat(a.term) + `(${a.interest}); `

					// remember current bank name
					cbn = a.bank.name

					return sum+=parseFloat(a.saldo_on_date)
				}, 0)
		
		const movs = sumMovsByCurrency(curr, movements.filter(m=>accountsIds.includes(m.account_id)) )
		const end = parseFloat(begin) + parseFloat(movs.income) - parseFloat(movs.outcome)
		return({begin:begin.toFixed(2), end: end.toFixed(2)})
	}

	return{
		UAH: sumByCurr('UAH'),
		USD: sumByCurr('USD'),
		EUR: sumByCurr('EUR'),
		depositDetail: depositDetail,
	}
}

export function DepositInfo(props){
	return(
		<React.Fragment>
			<td colSpan="4" className="deposit">{
				props.depositDetail.length >1 ? `У т.ч. депозити у ${props.depositDetail}` :''
			}</td>
			<td colSpan="11" className="deposit"></td>
		</React.Fragment>		
	)
}

export class OneCompany extends React.Component{
	constructor(props){
		super(props)
	}

		
	render(){
		const {company, movements, isGrouped, voc, loadingMovementsIds, editingMovementsIds, date} = this.props


		//calculate saldo on deposit accounts (acc_type_id==2) of current company and send them to buffer:
		const deposits_on_date = accountsSaldo(voc.accsList.filter(a => a.acc_type_id == '2' ),	movements, company) 
		voc.addToExportBufer( company, 'depo_uah', deposits_on_date.UAH.end)
		voc.addToExportBufer( company, 'depo_usd', deposits_on_date.USD.end)
		voc.addToExportBufer( company, 'depo_eur', deposits_on_date.EUR.end)

		// TODO: make deposit details per account with actual rests (___including__today's__) ????
		// console.log({[company.id]:deposits_on_date.depositDetail})
		voc.addToExportBufer( company, 'depo_detail', deposits_on_date.depositDetail)


		//calculate saldo by all accounts of current company:
		const saldo_on_date = accountsSaldo(voc.accsList,	movements, company)




		//prepare comments to render:
		const commentsWrapper = (direction) => {
			return(
					isGrouped ? <Gcomment
												company={company}
												direction={direction}
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
			<React.Fragment>

				<tr >
					<td className="i-text">
						{	company.code_name}, (id: {company.id})
						<SignCompany 
							company={company}
							movementsToSign= {movements.filter( m=> m.company_id == company.id) }
							voc={voc}
							log = {`${company.code_name} signed:${Moment(Date.now()).format('DD.MM.YYYY hh:mm')}, `+
											`r_d:${date} `+
											` UAH.begin:${saldo_on_date.UAH.begin}, USD.begin:${saldo_on_date.USD.begin},`+ 
											`EUR.begin:${saldo_on_date.EUR.begin}, UAH.end:${saldo_on_date.UAH.end},`+
											`USD.end:${saldo_on_date.USD.end}, EUR.end:${saldo_on_date.EUR.end}`
										}
						></SignCompany>
					</td>
					


					<td>{voc.addToExportBufer( company, 'in_uah', saldo_on_date.UAH.begin) }</td>
					<td>{voc.addToExportBufer( company, 'in_usd', saldo_on_date.USD.begin) }</td>
					<td>{voc.addToExportBufer( company, 'in_eur', saldo_on_date.EUR.begin) }</td>

					<td>{ voc.addToExportBufer( company, 'income_uah', sumMovsByCurrency('UAH', movements).income )}</td>
					<td>{ voc.addToExportBufer( company, 'income_usd', sumMovsByCurrency('USD', movements).income )}</td>
					<td>{ voc.addToExportBufer( company, 'income_eur', sumMovsByCurrency('EUR', movements).income )}</td>
					<td className="i-text">
						{	commentsWrapper('Income')	}

					</td>


					<td>{ voc.addToExportBufer( company, 'outcome_uah', sumMovsByCurrency('UAH', movements).outcome )}</td>
					<td>{ voc.addToExportBufer( company, 'outcome_usd', sumMovsByCurrency('USD', movements).outcome )}</td>
					<td>{ voc.addToExportBufer( company, 'outcome_eur', sumMovsByCurrency('EUR', movements).outcome )}</td>


					<td className="i-text">
						{	commentsWrapper('Outcome')	}
					</td>
					
					<td>{voc.addToExportBufer( company, 'out_uah', saldo_on_date.UAH.end) }</td>
					<td>{voc.addToExportBufer( company, 'out_usd', saldo_on_date.USD.end) }</td>
					<td>{voc.addToExportBufer( company, 'out_eur', saldo_on_date.EUR.end) }</td>

				</tr>
				<tr className="deposit">
					<DepositInfo depositDetail={deposits_on_date.depositDetail} />
				</tr>
			</React.Fragment>
		)

	}

}

OneCompany.propTypes = {
	company: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired,

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


// JUST BACKUP
// export function accountsSaldo(allAccounts, movements, company=null){
// 	function sumByCurr(curr){
// 		const begin = allAccounts.filter(a => (a.currency.name_int == curr)&&(company ? a.company_id == company.id : true))
// 				.reduce( (sum, a) => sum+=parseFloat(a.saldo_on_date), 0)
// 		const movs = sumMovsByCurrency(curr, movements )
// 		const end = parseFloat(begin) + parseFloat(movs.income) - parseFloat(movs.outcome)
// 		return({begin:begin.toFixed(2), end: end.toFixed(2)})
// 	}

// 	return{
// 		UAH: sumByCurr('UAH'),
// 		USD: sumByCurr('USD'),
// 		EUR: sumByCurr('EUR'),
// 		comment:'',
// 	}
// }