let Admin = () => {

	let { Outlet, useNavigate} = ReactRouterDOM
	let { useEffect, useState } = React

	let navigate = useNavigate()

	

	let changeTab = (link) => {

		navigate(link)
	}



	return(
		<div>
		<h2>Admin</h2>
			<nav className="nav"onClick={e=>e.preventDefault()}>
			  <a className="nav-link "href="#/" onClick={() => changeTab("/admin")}>Account</a>
			  <a className="nav-link " href="#/" onClick={() => changeTab("/admin/password")}>Password</a>
			</nav>
			<hr className="mt-0 mb-3"/>
			<Outlet />
		</div>

	)
}