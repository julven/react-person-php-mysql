let ListPages = ({listState, listSetter}) => {

	let { useContext, useEffect, useState} = React
	let { Link, useNavigate } = ReactRouterDOM
	let { server, changeUrl } = useContext(ContextServices)	


	let loadMore = () => {

		let newPage = listState.pages[ listState.pages.length - 1] + 1
		let newPages = [...listState.pages, newPage]
		// console.log(newPage, newPages)
		listSetter.setPages(newPages)
		listSetter.setPage(newPages[newPages.length - 1])

	}

	let goto = (page) => {
		listSetter.setPage(page)
	}

	let getList = async (data) => {
		let statement = await query.getList(data);
		let resp = await server(statement)
		// console.log(resp.length)
		listSetter.setList(resp)

		if(resp.length == 0) {
			
			let last = listState.pages[listState.pages.length - 1];

			listSetter.setPage(listState.page - 1)
			listSetter.setPages(listState.pages.filter( i => i !== last))
			listSetter.setEnd(true)
		}
	}


	useEffect( () => {
		console.log(listState.pages, listState.page)
		changeUrl(listState);
		getList(listState);
	}, [listState.page])

	return (
		<div className="d-flex ">
			<p className="align-self-center me-2">Page(s): </p>
			<ul className="pagination pagination-sm d-flex flex-wrap" onClick={e=>e.preventDefault()}> 
			  
			    { listState.pages.map( x => (

			    	<li className={"page-item "+(x == listState.page && "active")} key={x}>
			    		
			    		{ x == listState.page ?
			    			 <span className="page-link">{x}</span>
			    			:
			    			<a onClick={()=>goto(x)}className="page-link" href="#/">{x}</a>
			    		}
			    	</li>

			    ))

			    }
			    <li className="page-item">
			    	<a onClick={loadMore} 
			    	className={"page-link "+(listState.end?"disabled": "")} href="#/">{listState.end? "end": "more..."}</a>
			    </li>
			</ul>

		</div>
	)
}

ListPages = withConnect(ListPages)