let Navbar = ({adminState, adminSetter}) => {

	let {Link } = ReactRouterDOM;
	let { useEffect } = React


	useEffect(() => {
		console.log(adminState)
	}, [])

	let logout = (e) => {
		e.preventDefault();
		adminSetter.logout();
		// navigate("/")
	}

	return (
	

		<nav className="navbar navbar-expand-sm bg-primary ">
		  <div className="container ">
		    <a className="navbar-brand text-white" href="#/" >Navbar</a>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
		      <div className="navbar-nav ms-auto ">
		        	<Link className="nav-link text-white"  to="/">Home</Link> 
					<Link className="nav-link text-white" to="/list">List</Link> 
					{ adminState.logged ? 
						<div className="d-flex ">
							<Link className="nav-link text-white" to="/admin">Admin</Link> 
							<a href="#/"  className="nav-link text-white" onClick={e => logout(e)}>Logout</a>
						</div>
						:
						<div>
							<Link className="nav-link text-white" to="/login">Login</Link>
						</div>
					}
					
		      </div>
		    </div>
		  </div>
		</nav>

	)
}

Navbar = withConnect(Navbar)