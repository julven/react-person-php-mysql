let AdminLogin = ({adminSetter, adminState}) => {

	let { useEffect, useState, useContext } = React;
	let { server } = useContext(ContextServices);

	let [form, setForm] = useState({
		user: "",
		pass: ""
	})


	let login = async (e) => {
	
		let statement = await query.login(form)
		let resp = await server(statement)

		if(resp == false) {
			alert("wrong username or password");
			return;
		}
		adminSetter.login(resp)
	}

	useEffect( () => {
		// console.log(adminState)
	}, [adminState])

	

	return(
		<div>
			<div className="container">
				<div className="row justify-content-center mt-5">
					<div className="col-auto col-sm-7 col-md-6 col-lg-5 ">
						<div className="card shadow-sm" style={{maxWidth: '350px'}}>
							 <div className="card-body">
						    <h5 className="card-title">Admin Login</h5>
						    <div className="mb-1">
							    <label  className="form-label mb-0">Username</label>
							    <input value={form.user} onChange={e=>setForm({...form, user: e.target.value})}
							    type="text" className="form-control" />
							
							  </div>

	  					    <div className="mb-3 ">
							    <label className="form-label mb-0">Password</label>
							    <input  value={form.pass} onChange={e=>setForm({...form, pass: e.target.value})}
							    type="Password" className="form-control"/>
							  
							  </div>
							  <div className="text-end">
							  	<button 
							  	onClick={() => login()}
							  	type="button" className="btn btn-success">Login</button>
							  </div>
							  
						  </div>
						</div>
					</div>
				</div>

			</div>
		</div>

	)
}

AdminLogin = withConnect(AdminLogin)