let Home = ({adminState, listState, listSetter}) => {

	let { useState, useEffect, useContext } = React
	let { Link } = ReactRouterDOM
	let { server, time } = useContext(ContextServices)
	let [load, setLoad] = useState(true)

	let getSummary = async () => {

		let statement =  await query.listSummary()

		let resp = await server(statement)

		listSetter.setSummary(resp[0])
		// console.log(resp)
		setLoad(false)
	}

	useEffect( () => {
		// console.log(Object.keys(listState.summary).length)
		getSummary()

	}, [])

	return(
		<div className="row justify-content-center">
		<h3>Home</h3>

			{ adminState.logged &&
			<div className="col-12 col-sm-6 col-md-5 col-lg-4">
				<h4>Account Summary</h4>
				<hr className="mt-0"/>
				<table className="table table-sm table-borderless">
					<tbody >
						<tr>
							<td>Username</td>
							<td className="text-capitalize">{adminState.react_person_admin_username}</td>
						</tr>
						<tr>
							<td>First Name</td>
							<td className="text-capitalize">{adminState.react_person_admin_fname}</td>
						</tr>
						<tr>
							<td>Last Name</td>
							<td className="text-capitalize">{adminState.react_person_admin_lname}</td>
						</tr>
						<tr>
							<td>Birthday</td>
							<td className="text-capitalize">{time(adminState.react_person_admin_bday, 1)}</td>
						</tr>
						<tr>
							<td>Gender</td>
							<td className="text-capitalize">{adminState.react_person_admin_gender}</td>
						</tr>
						<tr>
							<td colSpan="2" ><Link to="/admin">view</Link></td>
						</tr>
					</tbody>
				</table>
				<hr className="mt-0"/>
			</div>	}

			<div className="col-12 col-sm-6 col-md-5 col-lg-4">
				<h4>List Summary</h4>
				<hr className="mt-0"/>
				{ !load &&
				<table className="table table-sm table-borderless">
					<tbody>
						<tr>
							<td>Total</td>
							<td>{listState.summary.total}</td>
						</tr>
						<tr>
							<td>Male</td>
							<td>{listState.summary.male}</td>
						</tr>
						<tr>
							<td>Female</td>
							<td>{listState.summary.female}</td>
						</tr>
						<tr>
							<td>Single</td>
							<td>{listState.summary.single}</td>
						</tr>
						<tr>
							<td>Married</td>
							<td>{listState.summary.married}</td>
						</tr>
						<tr>
							<td>Divorced</td>
							<td>{listState.summary.divorced}</td>
						</tr>
						<tr>
							<td>Widowed</td>
							<td>{listState.summary.widowed}</td>
						</tr>
						<tr>
							<td>Deceased</td>
							<td>{listState.summary.deceased}</td>
						</tr>
						<tr>
							<td colSpan="2" ><Link to="/list">view</Link></td>
						</tr>
					</tbody>
				</table>
				}
				<hr className="mt-0"/>
			</div>
		</div>

	)
}

Home = withConnect(Home)