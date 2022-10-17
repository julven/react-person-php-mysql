let ListSearch = ({listState, listSetter, adminState}) => {

	let { useContext, useEffect, useState} = React
	let { Link } = ReactRouterDOM
	let { server, changeUrl } = useContext(ContextServices)	


	
	let setGender = (value) => {
		listSetter.resetPage()
		listSetter.setGender(value)
	}

	let setFilter = (value) => {
		listSetter.resetPage()
		listSetter.setFilter(value)
	}

	let setStatus = (value) => {
		listSetter.resetPage()
		listSetter.setStatus(value)
	}

	let reset = (e) => {
		e.preventDefault();
		listSetter.reset()
		listSetter.resetPage()
		search();
	}

	let search = async (click) => {

		listSetter.setLoad(true)
		// console.log({listState})

		let { search, gender, status, filter, page} = listState

		let statement = await query.getList({ search, gender, status, filter, page})

		// console.log(statement)
		let resp = await server(statement)
		console.log(resp)
		if(click) listSetter.resetPage()
		listSetter.setList(resp)

		listSetter.setLoad(false)

	}



	useEffect( () => {
		changeUrl(listState)
	}, [listState.page, listState.search])

	useEffect( () => {
		search();

	}, [listState.filter, listState.gender, listState.status])

	return (
		<div>
			<div className="mb-1 d-flex mt-3 ">

				 <input name="search" value={listState.search}
				 onChange={e=>listSetter.setSearch(e.target.value)}
				 placeholder="search..."
				 type="text" className="form-control" />
				<button className="btn btn-primary ms-1" onClick={()=>search(true)}>Find</button>
				{adminState.logged &&
					<Link className="btn btn-outline-primary ms-1" to="/list/add">Add</Link>
				}
				
			</div>
			<div className="d-flex flex-wrap">

				<div className="dropdown me-2" onClick={e=>e.preventDefault()}>
					Filter: <span> </span>
				  <a className=" dropdown-toggle " href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				  	{listState.filter == "" ? "Any" : listState.filter == "fname" ? "First Name" : "Last Name"}
				  </a>

				  <ul className="dropdown-menu" >
				   	<li><a onClick={()=>setFilter("")} className="dropdown-item" href="#/">Any</a></li>
				    <li><a onClick={()=>setFilter("fname")} className="dropdown-item" href="#/">First Name</a></li>
				    <li><a onClick={()=>setFilter("lname")} className="dropdown-item" href="#/">Last Name</a></li>
				    
				  </ul>
				</div>

				<div className="dropdown me-2" onClick={e=>e.preventDefault()}>
					Gender: <span> </span>
				  <a className=" dropdown-toggle text-capitalize" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				  	{listState.gender == "" ? "Any" : listState.gender}
				  </a>

				  <ul className="dropdown-menu" >
				   	<li><a onClick={()=>setGender("")} className="dropdown-item" href="#/">Any</a></li>
				    <li><a onClick={()=>setGender("male")} className="dropdown-item" href="#/">Male</a></li>
				    <li><a onClick={()=>setGender("female")} className="dropdown-item" href="#/">Female</a></li>
				    
				  </ul>
				</div>
				
				<div className="dropdown me-2" onClick={e=>e.preventDefault()}>
					Status: <span> </span>
				  <a className=" dropdown-toggle text-capitalize" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				  	{listState.status == "" ? "any" : listState.status}
				  </a>

				  <ul className="dropdown-menu" >
				   	<li><a onClick={()=>setStatus("")} className="dropdown-item" href="#/">Any</a></li>
				    <li><a onClick={()=>setStatus("single")} className="dropdown-item" href="#/">Single</a></li>
				    <li><a onClick={()=>setStatus("married")} className="dropdown-item" href="#/">Married</a></li>
				    <li><a onClick={()=>setStatus("divorced")} className="dropdown-item" href="#/">Divorced</a></li>
				    <li><a onClick={()=>setStatus("widowed")} className="dropdown-item" href="#/">Widowed</a></li>
				    <li><a onClick={()=>setStatus("deceased")} className="dropdown-item" href="#/">Deceased</a></li>
				  </ul>
				</div>

				<a onClick={e=>reset(e)} href="#/" className="badge bg-primary">Reset</a>
			</div>

		</div>
	)
}

ListSearch = withConnect(ListSearch)