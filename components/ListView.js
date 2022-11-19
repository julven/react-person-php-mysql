let ListView = ({adminState}) => {

	let { useEffect, useContext, useState } = React
	let {useParams, useNavigate} = ReactRouterDOM
	let param = useParams()
	let navigate = useNavigate();
	let { server, listLink, time } = useContext(ContextServices)



	let [info, setInfo] = useState({})
	let [load, setLoad] = useState(true)

	let getPerson = async (id) => {

		let statement = await query.getPerson(id)

		let resp = await server(statement)

		console.log(resp)
		if(resp.length == 0) {
			navigate("/list")
			return;
		}

		setInfo(resp[0])
		setLoad(false)

	}

	let deletePerson = async (id) => {

		let conf = window.confirm("delete this person?")

		if(!conf) return;

		let statement = await query.deletePerson(id)
		// console.log(statement)
		// return
		let resp = await server(statement)

		if(resp.affected_rows > 0) {
			alert("person successfully deleted!");
			navigate(-1);
			return;
		}
		alert("person was not found...");
		return;
	}


	useEffect( () => {

		console.log({view: listLink})
		// console.log(param)
		if("id" in param && !isNaN(param.id)) {
			let newId = Math.ceil(Math.abs(Number(param.id)))
			getPerson(newId)

		}
		else navigate("/list")


	}, [])

	if(load) return (
		<div>loading...</div>
	)
	return (
		<div className="row justify-content-center">
		<h3>Person Information</h3>
			<div className="col-12 col-sm-8 col-md-6 col-lg-4">
				
				<p 
					className="mb-2"> ID: {info.react_person_list_id}<br/>
					Added: {time(info.react_person_list_date_added, 2)}
				</p>
				<hr/>
				<div className="mb-0 ">
					<p className="text-muted mb-0 ">First Name</p>
					<p className="fs-4 mb-0  text-capitalize">{info.react_person_list_fname}</p>
				</div>

				<div className="mb-0 ">
					<p className="text-muted mb-0">Last Name</p>
					<p className="fs-4 mb-0  text-capitalize">{info.react_person_list_lname}</p>
				</div>

				<div className="mb-0 ">
					<div className="row">
						<div className="col-6">
							<p className="text-muted mb-0">Birthday</p>
							<p className="fs-4 mb-0  text-capitalize">{time(info.react_person_list_bday, 1)}</p>
						</div>
						<div className="col-6">
							<p className="text-muted mb-0">Status</p>
							<p className="fs-4 mb-0  text-capitalize">{info.react_person_list_status}</p>
						</div>
					</div>
					
				</div>

				<div className="mb-0 ">
					<p className="text-muted mb-0">Gender</p>
					<p className="fs-4  text-capitalize">{info.react_person_list_gender}</p>
				</div>
				<hr/>
				<div className="text-end d-grid gap-2 d-sm-block ">
					<button className="btn btn-outline-primary me-1"
					onClick={()=>navigate(-1)}>Back</button>
					{adminState.logged &&
						<button onClick={e => {deletePerson(info.react_person_list_id)}}
						className="btn btn-danger me-1">Delete</button>}
				</div>
				
			</div>
		</div>
	)
}

ListView = withConnect(ListView)