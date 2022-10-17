let ListMain = ({listSetter, listState, adminState}) => {

	let { Link, useParams, useLocation } = ReactRouterDOM
	let { useEffect, useState, useContext,  } = React
	let param = useParams()
	let location = useLocation();
	let { server, setListLink, listLink } = useContext(ContextServices)

	let getList = async (data) => {
		let statement = await query.getList(data);
		let resp = await server(statement)
		// console.log(resp)
		listSetter.setList(resp)
	}

	useEffect( () => {
		
		let newPage = 1
		let newPages = []
		let newSearch =  ""
		let newFilter =  ""
		let newStatus =  ""
		let newGender =  ""

		if("page" in param && !isNaN(param.page)) {
			newPage =Math.ceil( Math.abs(Number(param.page)))
			
			for(var i = 1; i <= newPage; i ++) {
				newPages.push(i)
			}
			listSetter.setPage(newPage)
			listSetter.setPages(newPages)
		}
		if("search" in param) {
			newSearch = param.search == "_" ? "" : param.search
			listSetter.setSearch( newSearch)
		}
		if("filter" in param) {
			newFilter = param.filter == "_" ? "" : param.filter
			listSetter.setFilter( newFilter)
		}
		if("status" in param) {
			newStatus = param.status == "_" ? "" : param.status
			listSetter.setStatus( newStatus)
		}
		if("gender" in param) {
			newGender = param.gender == "_" ? "" : param.gender
			listSetter.setGender( newGender)
		}

		getList({
			search: newSearch,
			filter: newFilter,
			status: newStatus,
			gender: newGender,
			page: newPage,
		})
		
		// listSetter.test()
	


	}, [])

	useEffect(() => {
		// console.log(listState, adminState)
		console.log(location.pathname)
	}, [listLink])
	useEffect(() => {
		
		return () => {
			setListLink(location.pathname)
		}
	}, [])

	return (
		<div className="row justify-content-center">
			<h3>List</h3>
			<div className="col-12 col-sm-10 col-md-8 col-lg-6">
				
				<ListSearch />
				<div className="table-responsive">
					<table className="table ">
						<thead>
							<tr>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody className="table-group-divider">
						{
							listState.list.map( x => (
								<tr key={x.react_person_list_id}>
									<td>{x.react_person_list_id}</td>
									<td>{x.react_person_list_fname}</td>
									<td>{x.react_person_list_lname}</td>
									<td title={"/list/view/"+x.react_person_list_id}>
										<Link to={"/list/view/"+x.react_person_list_id}>view</Link> 
										{adminState.logged && 
											<Link className="ms-2" to={"/list/edit/"+x.react_person_list_id}>edit</Link>
										}
									</td>
								</tr>

							))
						}
							
							
						</tbody>
					</table>
				</div>
				<ListPages />

			</div>
		</div>
	)
}

ListMain = withConnect(ListMain)