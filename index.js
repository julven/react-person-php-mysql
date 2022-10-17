console.log(window.history)



const Root = ReactDOM.createRoot(document.getElementById('app'));
Root.render(
	<ReactRouterDOM.HashRouter>
		<ReactRedux.Provider store={reduxAdminStore} context={reduxAdminContext}>
			<ReactRedux.Provider store={reduxListStore} context={reduxListContext}>
				<ContextServicesProvider>
					<App />
				</ContextServicesProvider>
			</ReactRedux.Provider>
		</ReactRedux.Provider>
	</ReactRouterDOM.HashRouter>
)