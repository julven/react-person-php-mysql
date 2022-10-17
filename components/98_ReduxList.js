
let reduxListState = {
	list: [],
	page: 1,
	pages: [1],
	search: "",
	status: "",
	filter: "",
	gender: "",
	test: "",
	end: false,
	summary: {}
}

let reduxListReducer = (state = reduxListState, {type, payload}) => {
	switch(type) {
		case "test": 
			
			return state = {...state, test: payload || "test"}
		
		case "SET_LIST" : return state = { ...state, list: payload }
		
		case "SET_PAGE": return state = { ...state, page: payload }

		case "SET_PAGES": return state = { ...state, pages: payload }	

		case "SET_SEARCH": return state = { ...state, search: payload }	

		case "SET_FILTER": return state = { ...state, filter: payload }

		case "SET_STATUS": return state = { ...state, status: payload }

		case "SET_GENDER": return state = { ...state, gender: payload }

		case "SET_END": return state = { ...state, end: payload }

		case "RESET" : return state = {
			...state,
			search: "",
			filter: "",
			status: "",
			gender: "",
			end: false
		}

		case "RESET_PAGE" : return state = {
			...state,
			page: 1,
			pages: [1],
			end: false
		}

		case "SET_SUMMARY" : return state = { ...state, summary: payload }

		default: return state;
	}
}

let reduxListContext = React.createContext();
let reduxListStore = Redux.createStore(reduxListReducer)

let mapReduxList = {
	stateToProps: state => {

		return {listState: state}
	},
	dispatchToProps: dispatch => {

		return {
			listSetter: {
				test:   () => {   dispatch({type: "test", payload: null})},
				setList: data => {dispatch({type: "SET_LIST", payload: data})},
				setPage: data => {dispatch({type: "SET_PAGE", payload: data})},
				setPages: data => {dispatch({type: "SET_PAGES", payload: data})},
				setSearch: data => {dispatch({type: "SET_SEARCH", payload: data})} ,
				setFilter: data => {dispatch({type: "SET_FILTER", payload: data})},
				setStatus: data => {dispatch({type: "SET_STATUS", payload: data})},
				setGender: data => {dispatch({type: "SET_GENDER", payload: data})},
				setEnd: data => {dispatch({type: "SET_END", payload: data})},
				reset: () => {dispatch({type: "RESET"})},
				resetPage: () => {dispatch({type: "RESET_PAGE"})},
				setSummary: data => {dispatch({type: "SET_SUMMARY", payload: data})},
			}
		}
	}
}


const listConnect = ReactRedux.connect(
		mapReduxList.stateToProps, mapReduxList.dispatchToProps, null, {context: reduxListContext}
	);