const ContextServices = React.createContext();

let ContextServicesProvider = (props) => {


	// let {useLocation} = ReactRouterDOM;
	let { useState, useEffect } = React;
	let SERVER_URL = "http://localhost/react-person-php-mysql/server.php";
	// let SERVER_URL = "https://julven.epizy.com/reactperson/server.php";
	// let location = useLocation();
	let [listLink, setListLink] = useState("/list")


	useEffect( () => {
		// console.log(props)
	}, [])

	let server = data => {

		let form = new FormData();

		form.append("data", JSON.stringify(data));

		let request = {
			method: "POST",
			body: form
		};

		if("react_person_admin_token" in props.adminState) {
			request = { 
				...request, 
				headers: new Headers( {
					"token" : props.adminState['react_person_admin_token'],
					"id": props.adminState['react_person_admin_id']
				} )
			}
		} 

		return new Promise( (resolve, reject) => {
			fetch(SERVER_URL, request)
			.then(resp => resp.text())
			.then(resp => {
				
	
				console.log(resp);
				
				if(resp == "error_expired_token") props.adminSetter.logout();
				
				try{
					resolve(JSON.parse(resp))

				}catch(err) {
					console.log(err)
					
					
					resolve(false)
				}
				
			}).catch( err  => {
				reject({error: err})
			})
		})
	}

	let validate = (data) => {

		let valid = true

		data.forEach( (x, i) => {

			if(x == "" || x == undefined || x == null) valid = false
		})

		return valid
	}

	let randomPerson = async () => {
		let person = await fetch('https://randomuser.me/api/?nat=us,au,gb')

		person = await person.json();

		// console.log(person.results[0])

		let status = ['single', 'married', 'divorced', 'widowed', 'deceased']

		return {
			react_person_list_fname: person.results[0].name.first,
			react_person_list_lname: person.results[0].name.last,
			react_person_list_gender: person.results[0].gender,
			react_person_list_status: status[Math.floor(Math.random()*status.length)],
			react_person_list_bday: person.results[0].dob.date.split("T")[0]
		}
	}

	let changeUrl = (listState) => {
		let { search, gender, status, filter, page} = listState;

		let link = `#/list/search/${
			search == ""? "_" : search
		}/gender/${
			gender == ""? "_" : gender
		}/status/${
			status == ""? "_" : status
		}/filter/${
			filter == ""? "_" : filter
		}/page/${
			page
		}`
		window.history.pushState({}, "", link)
		return link
	}

	

	let uploadImage =  async (img) => {

		// console.log(img)
		let reader = new FileReader()
		
		return new Promise( resolve => {
			reader.onload = e => {
				// setImage(e.target.result)
				let tempImg = document.createElement("img")
				tempImg.onload = () => {
					let canvas = document.createElement("canvas")
					canvas.height = 100;
					canvas.width = 100;
					var ctx = canvas.getContext("2d")
					ctx.drawImage(tempImg, 0, 0, 100,100)
					var dataURL = canvas.toDataURL(img.type)
					resolve(dataURL);
					canvas.remove()
					tempImg.remove()
				}
				tempImg.src = e.target.result

			} 

			reader.readAsDataURL(img)
		})

	}

	let generateImage = async () => {
		// console.log("test")

		let result = await new Promise( resolve => {
			server({generate: {react_person_list: {}}}).then( resp => {


				// console.log(resp)
				// return
				let img64 = "data:image/jpeg;base64,"+resp.image;


				let file = new File(
					[Uint8Array.from(btoa(img64), m => m.codePointAt(0))],
					"falseperson.jpeg",
					{type : "image/jpeg"}
					)
				// console.log(file);

				resolve({img64, file});
				

			})
		})

		
		let result2 = await new Promise(resolve => {
			let tempImg = document.createElement("img")
			tempImg.onload = () => {
				let canvas = document.createElement("canvas")
				canvas.height = 100;
				canvas.width = 100;
				var ctx = canvas.getContext("2d")
				ctx.drawImage(tempImg, 0, 0, 100,100)
				var dataURL = canvas.toDataURL(result.file.type)
				resolve(dataURL)
				canvas.remove()
				tempImg.remove()
			}
			tempImg.src = result.img64
		})
		
		// console.log(result2)
		return result2
		
	}

	let time = (value, type) => {

		if(type == 1)return moment(value).format("MMM D, YYYY");
		if(type == 2)return moment(value).format("MMM D, YYYY h:mm a")
	}

	let test = () => {
		return "test"
	}

	return (
		<ContextServices.Provider value={{
			test,
			server,
			validate,
			randomPerson,
			changeUrl,
			listLink,
			setListLink,
			time,
			uploadImage,
			generateImage
		}}>
			{ props.children }
		</ContextServices.Provider>
	)
}

ContextServicesProvider = withConnect(ContextServicesProvider);