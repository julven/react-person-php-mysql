let ListForm = ({form, fieldChange}) => {

	let { useEffect, useState } = React

	

	useEffect( () => {
		console.log(form)
	}, [])



	return (
		
			<div className="col-12 col-sm-8 col-md-6 col-lg-4">
		
			
				<div className="mb-1">
				  <label  className="form-label mb-0">First Name</label>
				  <input onChange={e=>fieldChange(e)}
				  value={form.react_person_list_fname}
				  name="react_person_list_fname"
				  type="text" className="form-control" />
				</div>

				<div className="mb-1">
				  <label  className="form-label mb-0">Last Name</label>
				  <input  onChange={e=>fieldChange(e)}
				  value={form.react_person_list_lname}
				  name="react_person_list_lname"
				  type="text" className="form-control" />
				</div>

				<div className="mb-1" style={{maxWidth:'200px'}}>
				  <label  className="form-label mb-0">Birthday</label>
				  <input  onChange={e=>fieldChange(e)}
				  value={form.react_person_list_bday}
				  name="react_person_list_bday"
				  type="date" className="form-control" />
				</div>

				<div>	
					<label className="form-label mb-0">Gender</label>
					<div className="d-flex">
						 <input onChange={e=>fieldChange(e)}
						 checked={form.react_person_list_gender == "male"}
						 className="form-check-input mx-2" type="radio" 
						 name="react_person_list_gender" value="male"/> male
						 <input   onChange={e=>fieldChange(e)}
						 checked={form.react_person_list_gender == "female"}
						 className="form-check-input mx-2" type="radio" 
						 name="react_person_list_gender" value="female"/> female
					</div>
				</div>

				<div style={{maxWidth:'200px'}}>
					<label className="form-label mb-0">Status</label>
					<select onChange={e=>fieldChange(e)} value={form.react_person_list_status}
					className="form-select" name="react_person_list_status">
				  
					  <option value="single">Single</option>
					  <option value="married">Married</option>
					  <option value="divorced">Divorced</option>
					  <option value="widowed">Widowed</option>
					  <option value="deceased">Deceased</option>
					</select>
				</div>
				

				
				
			</div>
		

	)
}