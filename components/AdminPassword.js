let AdminPassword = ({adminState}) => {

	let { useEffect, useState, useContext} = React;
	let {server} = useContext(ContextServices)

	let [form, setForm] = useState({
		old: "",
		now: "",
		conf: ""
	})

	let fieldChange = e => {


		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}

	let update = async () => {
		console.log(form)
		let { old, now, conf} = form;

		if(old.length < 5 || now.length < 5 || conf.length < 5) {
			alert("all fields must have a minimum of 4 letters")
			return;
		}

		if(conf !== now) {
			alert("Confirmed password did not match")
			return;
		}
		let { react_person_admin_id } = adminState;
		

		let statement = await query.adminCheckPassword({
			react_person_admin_id,
			react_person_admin_password: form.old
		});

		// console.log(statement)
		let resp = await server(statement)

		// console.log(resp)

		if(resp[0].password_match < 1) {
			alert("old password is incorrect!")
			return;
		}

		let statement2 = await query.adminChangePassword({conf: form.conf, id: react_person_admin_id});
		let resp2 = await server(statement2);
		console.log({resp2})
		if(resp2.affected_rows > 0) {
			setForm({
				old: "",
				now: "",
				conf: ""
			})
			alert("password successfully updated")
			return;
		}
		else alert("nothing has changed")
	}


	useEffect(() => {

	}, [])

	return(
		<div className="row justify-content-center">
			<div className="col-12 col-sm-8 col-md-6 col-lg-4">
				<h4>Password</h4>
				<div className="mb-1">
				  <label  className="form-label mb-0">Old Password</label>
				  <input value={form.old} name="old"
				  onChange={e=>fieldChange(e)}
				  type="password" className="form-control" />
				</div>

				<div className="mb-1">
				  <label  className="form-label mb-0">New Password</label>
				  <input value={form.now} name="now"
				  onChange={e=>fieldChange(e)}
				  type="password" className="form-control" />
				</div>

				<div className="mb-1">
				  <label  className="form-label mb-0">Confirm</label>
				  <input value={form.conf} name="conf"
				  onChange={e=>fieldChange(e)}
				  type="password" className="form-control" />
				</div>

				<div className="text-end mt-3"> 
					<button onClick={update}
					className="btn btn-primary">Update</button>
				</div>
				
			</div>
		</div>

	)
}

AdminPassword = withConnect(AdminPassword)