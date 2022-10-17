const query = {

	login: async (data) => {
		let statement = {
			login: "",
			read: {
				react_person_admin: [
					"select * from react_person_admin where "+
					"react_person_admin_username = ? and react_person_admin_password = ?",
					"ss",
					[data['user'], data['pass']]

				]
			}
		}

		return statement;
	},
	adminUpdate: async (data) => {
		let {
			react_person_admin_fname,
			react_person_admin_lname,
			react_person_admin_bday,
			react_person_admin_gender,
			react_person_admin_id
		} = data;
		let statement = {
			edit: {
				react_person_admin: [
					"update react_person_admin set react_person_admin_fname = ?, "+
					"react_person_admin_lname = ?, react_person_admin_bday = ?, "+
					"react_person_admin_gender = ? where react_person_admin_id = ?",
					"ssssi",
					[
						react_person_admin_fname,
						react_person_admin_lname,
						react_person_admin_bday,
						react_person_admin_gender,
						react_person_admin_id
					]

				]
			}
		}

		return statement;
	},
	adminCheckPassword : async (data) => {
		let statement = {
			read: {
				react_person_admin: [
					"select count(*) as password_match from react_person_admin "+
					"where react_person_admin_password = ? and react_person_admin_id = ?",
					"si",
					[data.react_person_admin_password, data.react_person_admin_id]
				]
			}
		}

		return statement;
	},
	adminChangePassword: async (data) => {

		let statement = {
			edit: {
				react_person_admin: [
					"update react_person_admin set react_person_admin_password = ? "+
					"where react_person_admin_id = ?",
					"si",
					[data.conf, data.id]
				]
			}
		}

		return statement;
	},
	listAddPerson: async (data) => {
		let {
			react_person_list_fname,
			react_person_list_lname,
			react_person_list_bday,
			react_person_list_gender,
			react_person_list_status
		} = data;
		let statement = {
			write: {
				react_person_list: [
					"insert into react_person_list ( react_person_list_fname, "+
					"react_person_list_lname, react_person_list_bday, "+
					"react_person_list_gender, react_person_list_status) values (?,?,?,?,?)",
					"sssss",
					[
						react_person_list_fname,
						react_person_list_lname,
						react_person_list_bday,
						react_person_list_gender,
						react_person_list_status
					]
				]
			}
		}

		return statement;
	},
	getList: async (data) => {

		let filter = "(`react_person_list_fname` like ? OR `react_person_list_lname` like ?) ";
		let values = [
			`${data.gender}%`, 
			`${data.status}%`, 
			`%${data.search}%`, 
			`%${data.search}%`, 
			(data.page - 1) * 10
		];
		let types = "ssssi";
		let [a, b, c, d, e] = values;
		if (data.filter == 'fname') { 
			filter = "`react_person_list_fname` like ? ";		
			values = [a, b, c, e];
			types = "sssi"
		}
		else if (data.filter == 'lname') {
			filter = "`react_person_list_lname` like ? ";
			values = [a, b, d, e];
			types = "sssi"
		}

		let statement = {
			read: {
				react_person_list: [
					"SELECT * FROM `react_person_list` WHERE "+
					"`react_person_list_gender` like ? AND "+
					"`react_person_list_status` like ? AND "+ 
					filter+
					"ORDER BY react_person_list_date_added DESC limit ?,10",
					types,
					values
				]
			}
		}

		return statement
	},
	getPerson: async id => {
		let statement = {
			read: {
				react_person_list: [
					"select * from react_person_list where react_person_list_id = ?",
					"i",
					[id]
				]
			}
		}

		return statement
	},
	updatePerson : async (data) => {
		let statement = {
			edit: {
				react_person_list: [
					"update react_person_list set `react_person_list_fname` = ?, "+
					"`react_person_list_lname` = ?, `react_person_list_bday` = ?, "+
					"`react_person_list_gender` = ?, `react_person_list_status`= ? "+
					"where react_person_list_id = ?",
					"sssssi",
					[
						data.react_person_list_fname,
						data.react_person_list_lname,
						data.react_person_list_bday,
						data.react_person_list_gender,
						data.react_person_list_status,
						data.react_person_list_id
					]
				]
			}
		}

		return statement
	},
	listSummary: async () => {
		let statement = {
			read: {
				react_person_list: [
					"select count(*) as total, "+
					"count(case when react_person_list_status = 'single' then 1 end) as single, "+
					"count(case when react_person_list_status = 'married' then 1 end) as married, "+
					"count(case when react_person_list_status = 'divorced' then 1 end) as divorced, "+
					"count(case when react_person_list_status = 'widowed' then 1 end) as widowed, "+
					"count(case when react_person_list_status = 'deceased' then 1 end) as deceased, "+
					"count(case when react_person_list_gender = 'male' then 1 end) as male, "+
					"count(case when react_person_list_gender = 'female' then 1 end) as female "+
					"from react_person_list",
					"",
					[]

				]
			}
		}

		return statement
	}
}