
let reduxAdminState = {
	logged: false
	
}

let reduxAdminReducer = (state = reduxAdminState, {type, payload}) => {
	switch(type) {
		case "test": 
			console.log("admin test")
		
		case "ADMIN_LOGIN": 
			return state = { ...state, ...payload ,logged: true}	
		
		case "ADMIN_LOGOUT": 
			return state = { logged: false }
		case "ADMIN_SET": 
			console.log({["ADMIN_SET"]: payload})
			return state = {
				...state, 
				...payload
			}
		
		default: return state;
	}
}

let reduxAdminContext = React.createContext();
let reduxAdminStore = Redux.createStore(reduxAdminReducer)

let mapReduxAdmin = {
	stateToProps: state => {

		return {adminState: state}
	},
	dispatchToProps: dispatch => {

		return {
			adminSetter: {
				test: () => { dispatch({type: "test", payload: null})},
				login: (data) => { dispatch({type: "ADMIN_LOGIN", payload: data})},
				logout: () => { dispatch({type: "ADMIN_LOGOUT", payload: null})},
				adminSet: data => { dispatch({type: "ADMIN_SET", payload: data})}
			}
		}
	}
}

const adminConnect = ReactRedux.connect(
		mapReduxAdmin.stateToProps, mapReduxAdmin.dispatchToProps, null, {context: reduxAdminContext}
	);