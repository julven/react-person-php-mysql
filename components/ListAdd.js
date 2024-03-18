let ListAdd = () => {
	let { useContext, useEffect, useState, useRef } = React
	let { useNavigate } = ReactRouterDOM
	let {server, randomPerson, validate, uploadImage, generateImage} = useContext(ContextServices);
	let navigate = useNavigate();

	let [form, setForm] = useState({
		react_person_list_fname: "",
		react_person_list_lname: "",
		react_person_list_gender: "",
		react_person_list_status:  "",
		react_person_list_bday:  ""
	})
	let [image, setImage] = useState("")
	let upload = useRef(null)

	let fieldChange =e=> {

		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}

	let getRandomPerson = async () => {

		
		let resp = await randomPerson();
		setForm({
			...form,
			...resp,
		})
		let result = await generateImage();

		setImage(result)
	}

	let addPerson = async () => {

		let field = [
			form.react_person_list_fname,
			form.react_person_list_lname,
			form.react_person_list_gender,
			form.react_person_list_status,
			form.react_person_list_bday,
		]

		let valid = validate(field)
		console.log(valid)

		if(!valid) {
			alert("all fields must not be empty!");
			return;
		}

		let statement = await query.listAddPerson(form)

		// console.log(JSON.stringify(statement))

		let resp  = await server(statement);

		if(resp.insert_id > 0) {
			setForm({
				react_person_list_fname: "",
				react_person_list_lname: "",
				react_person_list_gender: "",
				react_person_list_status:  "",
				react_person_list_bday:  ""
			})


			if(image) {
				server({upload: {
					react_person_list: "",
					id: resp.insert_id,
					image64: image
				}}).then(resp => {
					setImage("")
				})
			}

			alert("new person successfully added!")
			return
		}

		else {
			alert("failed to add new person...")
			return;
		}
	}

	let handleUploadImage = async (e) => {

		let result =  await uploadImage(e.target.files[0])
		console.log(result)
		setImage(result)
		
		
	}

	

	useEffect( () => {
		console.log(form)
	}, [form])

	return (
		<div>
		<h4>Add Person</h4>

			<div className="row justify-content-center">
				<div className="col-12 col-sm-8 col-md-6 col-lg-4">
					Photo
					<div className="border" style={{width: 100, height: 100, marginBottom: 5}}>

						<img src={image} className="rounded float-start" style={{width: "100%"}}/>
					</div>
					<input type="file" accept="image/*" hidden ref="upload" ref={upload} onChange={handleUploadImage}/>
					<button className="btn btn-sm btn-primary" style={{width: 100}} onClick={() => upload.current.click()}>Upload</button>
					

				</div>	
			</div>
			<div className="row justify-content-center">
				
				<ListForm type="add" form={form} fieldChange={fieldChange}/>
				
				<div className="text-end mt-3 d-grid gap-2 d-sm-block"> 
					<button onClick={() => navigate(-1)}
					className="btn btn-outline-secondary me-1">Back</button>
					<button onClick={getRandomPerson}
					className="btn btn-outline-primary me-1">Autofill</button>
					<button  onClick={addPerson}
					className="btn btn-primary">Submit</button>

				</div>
			</div>

			
		</div>
	)
}