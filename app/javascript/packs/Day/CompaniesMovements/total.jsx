import React from "react"
import PropTypes from "prop-types"
import Gcomment from "./gcomment"
import {accountsSaldo, sumMovsByCurrency} from "./oneCompany"


export class Total extends React.Component{
	constructor(props){
		super(props)
	}


	render(){


		// let saldo_on_date = {
		// 	UAH:{begin:1, end:2},
		// 	USD:{begin:1, end:2},
		// 	EUR:{begin:1, end:2},
		// }

		const {movements, voc, companiesSelectedIds} = this.props
		const movementsCounted = movements.filter(m=> companiesSelectedIds.includes(m.company_id))
		const company ={id:'total', codeName:'total'}

		//calculate saldo on all accounts by all companies 

		const saldo_on_date = accountsSaldo(
			voc.accsList.filter(a=> companiesSelectedIds.includes(a.company_id)), 
			movementsCounted
		)

		//calculate saldo on deposit accounts (acc_type_id==2) by all companies and send them to buffer as 'total:
		const all_deposits_on_date = accountsSaldo(voc.accsList.filter(a => a.acc_type_id == '2' ),	movements) 
		voc.addToExportBufer( company, 'depo_uah', all_deposits_on_date.UAH.end)
		voc.addToExportBufer( company, 'depo_usd', all_deposits_on_date.USD.end)
		voc.addToExportBufer( company, 'depo_eur', all_deposits_on_date.EUR.end)
		console.log(all_deposits_on_date)



		return(
			<tr className='movementsTotal'>
				<td className="i-text">	Загалом</td>

				<td>{voc.addToExportBufer( company, 'in_uah', saldo_on_date.UAH.begin )}</td>
				<td>{voc.addToExportBufer( company, 'in_usd', saldo_on_date.USD.begin )}</td>
				<td>{voc.addToExportBufer( company, 'in_eur', saldo_on_date.EUR.begin )}</td>


				<td>{voc.addToExportBufer( company, 'income_uah', sumMovsByCurrency('UAH', movementsCounted).income )}</td>
				<td>{voc.addToExportBufer( company, 'income_usd', sumMovsByCurrency('USD', movementsCounted).income )}</td>
				<td>{voc.addToExportBufer( company, 'income_eur', sumMovsByCurrency('EUR', movementsCounted).income )}</td>
				<td className="i-text">
					<Gcomment
						company={{id:'total', companyCodeName:'total'}}
						direction={'Income'}
						movements={movementsCounted.filter(m => m.direction=="Income")} 
						voc={voc}
					/> 
				</td>


				<td>{voc.addToExportBufer( company, 'outcome_uah', sumMovsByCurrency('UAH', movementsCounted).outcome )}</td>
				<td>{voc.addToExportBufer( company, 'outcome_usd', sumMovsByCurrency('USD', movementsCounted).outcome )}</td>
				<td>{voc.addToExportBufer( company, 'outcome_eur', sumMovsByCurrency('EUR', movementsCounted).outcome )}</td>

				<td className="i-text">
					<Gcomment 
						company={{id:'total', companyCodeName:'total'}}
						direction={'Outcome'}
						movements={movementsCounted.filter(m => m.direction=="Outcome")} 
						voc={voc}
					/> 
				</td>
				

				<td>{voc.addToExportBufer( company, 'out_uah', saldo_on_date.UAH.end )}</td>
				<td>{voc.addToExportBufer( company, 'out_usd', saldo_on_date.USD.end )}</td>
				<td>{voc.addToExportBufer( company, 'out_eur', saldo_on_date.EUR.end )}</td>


			</tr>
		)
	}
}
Total.propTypes = {
	movements: PropTypes.array.isRequired,
	voc:PropTypes.object.isRequired,
	companiesSelectedIds: PropTypes.array.isRequired,

}
