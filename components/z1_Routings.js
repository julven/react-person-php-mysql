let Routings = ({adminState, adminSetter}) => {
	let {Routes, Route, Outlet, Navigate, useLocation} = ReactRouterDOM;
	let { useEffect, useState } = React;
	let location = useLocation();

	let [initLink] = useState(location.pathname)

	useEffect( () => {
		// console.log({initLink})
	}, [initLink])

	let NavGuard = () => {


		return (
			<div>
			{ adminState.logged ?
				
				<Outlet />

				:

				<Navigate to="/login" replace/>

			}
			</div>
		)
	}

	let AdminLogged = ({children}) => {

		return (
			adminState.logged ?
				<Navigate to={initLink != "/login" ? initLink : "/admin"}/>
			:
			<div>
				{children}
			</div>

		)
	}

	return(
		<div>
			<Routes>
				<Route exact path="/" element={<Home />}/>
				<Route path="/list" element={<List />}>	
					<Route index element={<ListMain />}/>
					<Route path="search/:search" element={<ListMain />}>					
						<Route path="gender/:gender" element={<ListMain />}>					
							<Route path="status/:status" element={<ListMain />}>
								<Route path="filter/:filter" element={<ListMain />}>
									<Route path="page/:page" element={<ListMain />}/>
								</Route>
							</Route>
						</Route>
					</Route>
					<Route path="view/:id" element={<ListView />}/>
					<Route  element={<NavGuard />}>
						<Route path="add" element={<ListAdd />}/>
						<Route path="edit/:id" element={<ListEdit />}/>
					</Route>
				</Route>
				<Route path="/login" element={<AdminLogged><AdminLogin /></AdminLogged>}/>
				<Route  element={<NavGuard />}>
					<Route path="/admin" element={<Admin />} >
						<Route index element={<AdminAccount />}/>
						<Route exact path="password" element={<AdminPassword />}/>
					</Route>
				</Route>
				<Route path="*" element={<p>not found</p>}/>
			</Routes>

		</div>	

	)
}

Routings = withConnect(Routings)