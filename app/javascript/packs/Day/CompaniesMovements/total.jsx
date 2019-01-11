import React from "react"
import PropTypes from "prop-types"


export class Total extends React.Component{
	constructor(props){
		super(props)
	}

	sumMovsByCurrency  = (a,b)=>	{
		return{income:10, outcome:20}
	}

	render(){
		let saldo_on_date = {
			uah:{begin:1, end:2},
			usd:{begin:1, end:2},
			eur:{begin:1, end:2},
		}
		let movements = 1


		return(
			<tr >
				<td className="i-text">	company.code_name, (id: company.id)</td>

				<td>{saldo_on_date.uah.begin}</td>
				<td>{saldo_on_date.usd.begin}</td>
				<td>{saldo_on_date.eur.begin}</td>

				<td>{this.sumMovsByCurrency('UAH', movements).income}</td>
				<td>{this.sumMovsByCurrency('USD', movements).income}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).income}</td>
				<td className="i-text">
						{this.allComments('Income')}

				</td>


				<td>{this.sumMovsByCurrency('UAH', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('USD', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">
						{this.allComments('Outcome')}
				</td>
				
				<td>{saldo_on_date.uah.end}</td>
				<td>{saldo_on_date.usd.end}</td>
				<td>{saldo_on_date.eur.end}</td>



			</tr>
		)
	}
}