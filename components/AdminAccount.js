let AdminAccount = ({adminSetter, adminState}) => {

	let { useState, useEffect, useContext } = React;
	let { server, validate } =useContext(ContextServices)

	let [form, setForm] = useState({})
	let [load, setLoad] = useState(true)


	let fieldChange = (e) => {
		// console.log(e.target.value, e.target.name)
		setForm({
			...form,
			[ e.target.name ] : e.target.value
		})
	}

	let update = async () => {

		let valid = validate([
				form.react_person_admin_fname,
				form.react_person_admin_lname,
				form.react_person_admin_bday,
				form.react_person_admin_gender,
			]);

		// console.log(valid)
		// return

		if(!valid) {
			alert("all fields must be filled!");
			return;
		}

		let statement = await query.adminUpdate(form)
		// console.log(JSON.stringify(statement))

		let resp = await server(statement)
		console.log(resp)
		if(resp.affected_rows > 0) {
			alert("admin account successfully updated!")

			adminSetter.adminSet(form)
			return;
		}else alert("nothing has changed...")
	}

	useEffect( () => {
		setForm({
			...form,
			...adminState
		})
	}, [])

	useEffect( () => {
		// console.log({form})
		if(load) setLoad(false)
	}, [form])

	if(load) return (<p>loading...</p>);

	else return(

		<div className="row justify-content-center">
			<div className="col-12 col-sm-8 col-md-6 col-lg-4">
				<h4>Account</h4>
				<p className="mb-1">
					Username: {adminState.react_person_admin_username}<br/> 
					ID: {adminState.react_person_admin_id}
				</p>
				<div className="mb-1">
				  <label  className="form-label mb-0">First Name</label>
				  <input value={form.react_person_admin_fname}
				  onChange={e=>fieldChange(e)}
				  name="react_person_admin_fname"
				  type="text" className="form-control" />
				</div>

				<div className="mb-1">
				  <label  className="form-label mb-0">Last Name</label>
				  <input  value={form.react_person_admin_lname}
				  onChange={e=>fieldChange(e)}
				  name="react_person_admin_lname"
				  type="text" className="form-control" />
				</div>

				<div className="mb-1" style={{width: '200px'}}>
				  <label  className="form-label mb-0">Birthday</label>
				  <input  value={form.react_person_admin_bday}
				  onChange={e=>fieldChange(e)}
				  name="react_person_admin_bday"
				  type="date" className="form-control" />
				</div>

				<div>	
					<label>Gender</label>
					<div className="d-flex">
						 <input onChange={e=>fieldChange(e)}
						  checked={form.react_person_admin_gender == "male"}
						 className="form-check-input mx-2" type="radio" 
						 name="react_person_admin_gender" value="male"/> male
						 <input  onChange={e=>fieldChange(e)} 
						 checked={form.react_person_admin_gender == "female"}
						 className="form-check-input mx-2" type="radio" 
						 name="react_person_admin_gender" value="female"/> female
					</div>
				</div>

				<div className="text-end mt-3"> 
					<button onClick={update}
					className="btn btn-primary">Update</button>
				</div>
				
			</div>
		</div>

		



	)
}

AdminAccount = withConnect(AdminAccount)