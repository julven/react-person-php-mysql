let List = () => {

	let { Outlet, Link } = ReactRouterDOM

	return(
		<div>
			{/*<Link to="/list/add">add</Link> |
			<Link to="/list/view/99"> view</Link> |
			<Link to="/list/edit/99"> edit</Link>*/}
			<Outlet />
		</div>
	)
}