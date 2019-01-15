import React from "react"
import PropTypes from "prop-types"
import Gcomment from "./gcomment"
import {accountsSaldo, sumMovsByCurrency} from "./oneCompany"


export class Total extends React.Component{
	constructor(props){
		super(props)
	}


	render(){


		let saldo_on_date = {
			UAH:{begin:1, end:2},
			USD:{begin:1, end:2},
			EUR:{begin:1, end:2},
		}

		const {movements, voc} = this.props

		return(
			<tr >
				<td className="i-text">	Загалом</td>

				<td>{saldo_on_date.UAH.begin}</td>
				<td>{saldo_on_date.USD.begin}</td>
				<td>{saldo_on_date.EUR.begin}</td>

				<td>{sumMovsByCurrency('UAH', movements).income}</td>
				<td>{sumMovsByCurrency('USD', movements).income}</td>
				<td>{sumMovsByCurrency('EUR', movements).income}</td>
				<td className="i-text">
					<Gcomment
						movements={movements.filter(m => m.direction=="Income")} 
						voc={voc}
					/> 
				</td>


				<td>{sumMovsByCurrency('UAH', movements).outcome}</td>
				<td>{sumMovsByCurrency('USD', movements).outcome}</td>
				<td>{sumMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">
					<Gcomment 
						movements={movements.filter(m => m.direction=="Outcome")} 
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

}
