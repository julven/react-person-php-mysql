let App = ({adminState, adminSetter}) => {

	let { useEffect, useContext } = React;
	let {test} = React.useContext(ContextServices)
	let { Outlet } = ReactRouterDOM;
	let { server } = useContext(ContextServices);


	let authenticate = () => {
		try {
			let auth = JSON.parse(window.localStorage.auth);
				
			adminSetter.adminSet({
				react_person_admin_token: auth.token, 
				react_person_admin_id: auth.id
			})

		} catch (err) {
			console.log(err);
		} finally {
			window.localStorage.removeItem('auth');
		}
	}

	useEffect( () => {
		authenticate()
	}, [])

	useEffect( () => {

		if("react_person_admin_token" in adminState && !adminState.logged) {
			console.log(adminState)
			server({auth: ""}).then(resp => {
				console.log(resp)
				if(resp == false) return;

				adminSetter.login(resp)
			})
		}
	}, [adminState])

	window.onbeforeunload = () => {

		if(adminState.logged) {
			window.localStorage.auth = JSON.stringify({
				token: adminState.react_person_admin_token, 
				id: adminState.react_person_admin_id 
			})
		}
			
		
	}

	return (
		<div>
			<Navbar />
			
			<div className="container">
				<Routings />
			</div>	
		</div>
	)
}

App = withConnect(App)