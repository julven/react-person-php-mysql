let ListEdit = ({listState}) => {

	let { useEffect, useState, useContext, useRef} = React
	let { server, validate, listLink, time, uploadImage,generateImage } = useContext(ContextServices)
	let { useNavigate, useParams } = ReactRouterDOM
	let navigate = useNavigate()
	let param = useParams()
	let upload = useRef(null)
	

	let [ id, setId] = useState(null)
	let [form, setForm] = useState({})
	let [newImage, setNewImage] = useState(false)
	let [load, setLoad] = useState(true)

	let fieldChange = (e) => {

		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}

	let getPerson = async (id) => {

		let statemet = await query.getPerson(id)

		let resp = await server(statemet)

		console.log(resp)
		if(resp.length == 0) {
			navigate("/list")
			return;
		}

		setForm(resp[0])
		setLoad(false)

	}

	let updatePerson = async() => {
		let data = [
			form.react_person_list_fname,
			form.react_person_list_lname,
			form.react_person_list_bday,
			form.react_person_list_gender,
			form.react_person_list_status
		];

		let valid = validate(data)

		if(!valid) {
			alert("all fields must not be empty!")
			return
		}

		console.log(form)

		let statemet = await query.updatePerson(form)

		let resp = await server(statemet)

		console.log(resp)

		if(newImage) {
			
			server({upload: {
					react_person_list: "",
					id: form.react_person_list_id,
					image64: form.react_person_list_image
				}}).then(resp => {
					setNewImage(false)
				})
		}

		if(resp.affected_rows > 0 || newImage) {
			alert("person info successfuly updated!");
			return
		}

		alert("nothing has changed...")

	}

	let handleUploadImage = async e => {
		let result =  await uploadImage(e.target.files[0])
		console.log(result)
		setForm({...form, react_person_list_image: result})
	}

	let handleGenerateImage = async () => {
		let result = await generateImage();

		setForm({...form, react_person_list_image: result})
		setNewImage(true)
	}

	useEffect( () => {

		if("id" in param && !isNaN(param.id)) {

			let newId = Math.ceil(Math.abs(Number(param.id)))
			// console.log(newId)
			getPerson(newId)

		}
		else navigate("/list")

	}, [])

	useEffect(() => {
		console.log({edit: listLink})
	}, [form])


	if(load) return (<p>loading...</p>)
	return (
		<div>
			<h4>Edit Person</h4>
			<div className="row justify-content-center">
				<div className="col-12 col-sm-8 col-md-6 col-lg-4">
					<p 
						className="mb-2"> ID: {form.react_person_list_id}<br/>
						Added: {time(form.react_person_list_date_added, 2)}
					</p>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12 col-sm-8 col-md-6 col-lg-4">
					Photo
					<div className="border" style={{width: 100, height: 100, marginBottom: 5}}>

						<img src={form.react_person_list_image} className="rounded float-start" style={{width: "100%"}}/>
					</div>
					<input type="file" accept="image/*" hidden ref="upload" ref={upload} onChange={handleUploadImage}/>
					
						<button className="btn btn-sm btn-primary mb-1" style={{width: 100}} onClick={() => upload.current.click()}>Upload</button>
						
					<br/>
					
					<button className="btn btn-sm btn-outline-secondary" style={{width: 100}} onClick={() => {handleGenerateImage()}}>Autofill</button>
				</div>	
			</div>
			<div className="row justify-content-center">
				
				<ListForm form={form} fieldChange={fieldChange}/>

				<div className="text-end mt-3 "> 
					
					<button onClick={()=>navigate(-1)}
					className="btn btn-outline-secondary me-1">Back</button>


					<button onClick={updatePerson}
					className="btn btn-primary ">Update</button>

				</div>
			</div>

			
		</div>
	)
}

ListEdit = withConnect(ListEdit)