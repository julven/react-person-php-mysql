let ListEdit = ({listState}) => {

	let { useEffect, useState, useContext} = React
	let { server, validate, listLink, time } = useContext(ContextServices)
	let { useNavigate, useParams } = ReactRouterDOM
	let navigate = useNavigate()
	let param = useParams()
	

	let [ id, setId] = useState(null)
	let [form, setForm] = useState({})
	let [load, setLoad] = useState(true)

	let fieldChange = (e) => {

		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}

	let getPerson = async (id) => {

		let statemet = await query.getPerson(id)

		let resp = await server(statemet)

		console.log(resp)
		if(resp.length == 0) {
			navigate("/list")
			return;
		}

		setForm(resp[0])
		setLoad(false)

	}

	let updatePerson = async() => {
		let data = [
			form.react_person_list_fname,
			form.react_person_list_lname,
			form.react_person_list_bday,
			form.react_person_list_gender,
			form.react_person_list_status
		];

		let valid = validate(data)

		if(!valid) {
			alert("all fields must not be empty!")
			return
		}

		console.log(form)

		let statemet = await query.updatePerson(form)

		let resp = await server(statemet)

		console.log(resp)

		if(resp.affected_rows > 0) {
			alert("person info successfuly updated!");
			return
		}

		alert("nothing has changed...")

	}

	useEffect( () => {

		if("id" in param && !isNaN(param.id)) {

			let newId = Math.ceil(Math.abs(Number(param.id)))
			// console.log(newId)
			getPerson(newId)

		}
		else navigate("/list")

	}, [])

	useEffect(() => {
		console.log({edit: listLink})
	}, [form])


	if(load) return (<p>loading...</p>)
	return (
		<div>
			<h4>Edit Person</h4>
			<div className="row justify-content-center">
				<div className="col-12 col-sm-8 col-md-6 col-lg-4">
					<p 
						className="mb-2"> ID: {form.react_person_list_id}<br/>
						Added: {time(form.react_person_list_date_added, 2)}
					</p>
				</div>
			</div>
			<div className="row justify-content-center">
				
				<ListForm form={form} fieldChange={fieldChange}/>

				<div className="text-end mt-3 "> 
					
					<button onClick={()=>navigate(-1)}
					className="btn btn-outline-secondary me-1">Back</button>


					<button onClick={updatePerson}
					className="btn btn-primary ">Update</button>

				</div>
			</div>

			
		</div>
	)
}

ListEdit = withConnect(ListEdit)