import React from "react"

TableHead = function (props){
	const {banks} = props
  return(
  	<thead>
  		<tr> 
	  		{	banks.map(bank => (
  				<th> bank.name_int </th>
  			))}  			
  		</tr>
  		

  		TODO  !!!! UNDER CONSTRUCTION HERE

  		<tr>
	  		<th rowSpan="2" className="c1">Код компанії</th>
	  		<th colSpan="3" className="clong">Вх. залишок</th>

  			<th colSpan="3" className="clong">Отримано</th>

				<th rowSpan="2" className="cshort">Примітки
					

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

export class CompaniesMovements extends React.Component{
	constructor(props){
		super(props)
	}

	// clear export buffer before update
	// buffer information will be re-gathered in child elements 
	// during new render process
	componentWillUpdate = () => {
		this.props.voc.clearExportBuffer()
	}

	handleMGroupClick = () => {
		this.props.mGroupClick();
	}	
	

	render(){
		const {date, 
			companies, 
			allMovements,
			isGrouped,
			voc,
			loadingMovementsIds,
			editingMovementsIds, 
			companyGroupName} = this.props

		const companiesSelectedIds = companies.map(c=>c.id)
		return(
			<div className='table-responsive'>
				<table className="table movements-table">
					<TableHead
						isGrouped={isGrouped}
						mGroupClick={this.handleMGroupClick}

					/>
					<tbody>
						{ 
							companies.map( (c) => 
								(<OneCompany 
									key={c.id} 
									company={c} 
									movements={allMovements.filter( m => m.company_id == c.id)} 
									isGrouped={isGrouped}
									voc={voc}
									date={date}
									loadingMovementsIds={loadingMovementsIds}
									editingMovementsIds={editingMovementsIds}
								/>) 
							) 
						}

						<Total
							movements={allMovements}
							voc={voc}
							companiesSelectedIds = {companiesSelectedIds}
						/>

						

						<tr>
							<td colSpan="15" className="text-center">
								{isGrouped ? 
									<ExportToXls
										movements={allMovements.filter(m => companiesSelectedIds.find(c_id => c_id == m.company_id))}
										voc={voc}
										date={date}
										companyGroupName={companyGroupName}
										companiesSelectedIds = {companies.map(c=>c.id)}
									/>
									: 'Експорт можливий тільки якщо катерорії приміток згорнуті '
								}
							</td>	
						</tr>

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
	voc:PropTypes.object.isRequired,
	loadingMovementsIds: PropTypes.array.isRequired,
	editingMovementsIds: PropTypes.array.isRequired,
}