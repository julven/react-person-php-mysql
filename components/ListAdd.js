let ListAdd = () => {
	let { useContext, useEffect, useState } = React
	let { useNavigate } = ReactRouterDOM
	let {server, randomPerson, validate} = useContext(ContextServices);
	let navigate = useNavigate();

	let [form, setForm] = useState({
		react_person_list_fname: "",
		react_person_list_lname: "",
		react_person_list_gender: "",
		react_person_list_status:  "",
		react_person_list_bday:  ""
	})

	let fieldChange =e=> {

		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}

	let getRandomPerson = async () => {

		let resp = await randomPerson();
		setForm({
			...form,
			...resp,
		})
	}

	let addPerson = async () => {

		let field = [
			form.react_person_list_fname,
			form.react_person_list_lname,
			form.react_person_list_gender,
			form.react_person_list_status,
			form.react_person_list_bday,
		]

		let valid = validate(field)
		console.log(valid)

		if(!valid) {
			alert("all fields must not be empty!");
			return;
		}

		let statement = await query.listAddPerson(form)

		// console.log(JSON.stringify(statement))

		let resp  = await server(statement);

		if(resp.insert_id > 0) {
			setForm({
				react_person_list_fname: "",
				react_person_list_lname: "",
				react_person_list_gender: "",
				react_person_list_status:  "",
				react_person_list_bday:  ""
			})
			alert("new person successfully added!")
			return
		}

		else {
			alert("failed to add new person...")
			return;
		}
	}

	useEffect( () => {
		console.log(form)
	}, [form])

	return (
		<div>
		<h4>Add Person</h4>
			<div className="row justify-content-center">

				<ListForm type="add" form={form} fieldChange={fieldChange}/>

				<div className="text-end mt-3 d-grid gap-2 d-sm-block"> 
					<button onClick={() => navigate(-1)}
					className="btn btn-outline-secondary me-1">Back</button>
					<button onClick={getRandomPerson}
					className="btn btn-outline-primary me-1">Autofill</button>
					<button  onClick={addPerson}
					className="btn btn-primary">Submit</button>

				</div>
			</div>

			
		</div>
	)
}