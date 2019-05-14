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
		const saldo_on_date = accountsSaldo(
			voc.accsList.filter(a=> companiesSelectedIds.includes(a.company_id)), 
			movementsCounted
		)

		return(
			<tr className='movementsTotal'>
				<td className="i-text">	Загалом</td>

				<td>{saldo_on_date.UAH.begin}</td>
				<td>{saldo_on_date.USD.begin}</td>
				<td>{saldo_on_date.EUR.begin}</td>

				<td>{sumMovsByCurrency('UAH', movementsCounted).income}</td>
				<td>{sumMovsByCurrency('USD', movementsCounted).income}</td>
				<td>{sumMovsByCurrency('EUR', movementsCounted).income}</td>
				<td className="i-text">
					<Gcomment
						movements={movementsCounted.filter(m => m.direction=="Income")} 
						voc={voc}
					/> 
				</td>


				<td>{sumMovsByCurrency('UAH', movementsCounted).outcome}</td>
				<td>{sumMovsByCurrency('USD', movementsCounted).outcome}</td>
				<td>{sumMovsByCurrency('EUR', movementsCounted).outcome}</td>
				<td className="i-text">
					<Gcomment 
						movements={movementsCounted.filter(m => m.direction=="Outcome")} 
						voc={voc}
					/> 
				</td>
				
				<td>{saldo_on_date.UAH.end}</td>
				<td>{saldo_on_date.USD.end}</td>
				<td>{saldo_on_date.EUR.end}</td>



			</tr>
		)
	}
}
Total.propTypes = {
	movements: PropTypes.array.isRequired,
	voc:PropTypes.object.isRequired,
	companiesSelectedIds: PropTypes.array.isRequired,

}
