<?php
date_default_timezone_set("Asia/Manila");
$client = [];


if (!function_exists('getallheaders')) {

    function getallheaders() {
        $headers = [];
       foreach ($_SERVER as $name => $value) {
           if (substr($name, 0, 5) == 'HTTP_') {
               $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
           }
       }
       return $headers;
    }
}


if(isset($_POST['data'])) {
	$client = json_decode($_POST['data'], true);

	if(isset($client['login'])) {
		login($client['read']['react_person_admin']);
	}

	else if(isset($client['auth'])) {
		// print_r(['id'=>getallheaders()['id'], 'token' => getallheaders()['token']]);
		// return;
		authenticate(['id'=>getallheaders()['id'], 'token' => getallheaders()['token']], true);
	}
	// else if () {
		
	// }
	else {
		query_statement($client);
	}
}



// print_r(getallheaders());
// $auth = ['token' => getallheaders()['token'], 'id' => getallheaders()['id']];
// authenticate($auth);

// print_r($client['read']['react_person_admin']);
// 



return;

function create_connection () {
	$connection = new mysqli(
		"localhost", 
		"root",
		"",
		"reactperson",

		//  "sql307.epizy.com",
        // "epiz_32791845",
        // "30x2FgPRxBTa",
        // "epiz_32791845_reactperson"
	);

	if($connection->connect_error) {
		die("no database connection: ".$connection->connect_error);
	}

	return $connection;
}

function query_execute($statement, $con) {
	$query = $con->prepare($statement[0]);
	if($statement[1] != "") $query->bind_param($statement[1], ...$statement[2]);
	$query->execute();
	return $query;
}

function login ($login) {
	$connection = create_connection();

	$query = query_execute($login, $connection );
	$result = $query->get_result();
	$data = $result->fetch_assoc();

	if($result->num_rows > 0) {
		$random = substr(md5(mt_rand()), 0, 7);
		$expire = date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s')) + 60*30);

		query_execute([
			"update react_person_admin set react_person_admin_token = ?, react_person_admin_token_expire = ? where react_person_admin_id = ?",
			"ssi",
			[$random, $expire, $data['react_person_admin_id']]
		], $connection );

		$data["react_person_admin_token"] = $random;
		unset($data['react_person_admin_password']);
		unset($data['react_person_admin_token_expire']);

		echo json_encode($data);
		// print_r($data);
		return;
	}
	else {
		echo "error_wrong_username_password";
		die();
	}
}

function authenticate($auth, $cheking) {
	$connection = create_connection();
	$query = query_execute([
		"select * from react_person_admin where react_person_admin_id = ? and react_person_admin_token = ?",
		"is",
		[$auth['id'], $auth['token']]
	],$connection );
	$result = $query->get_result();
	if($result->num_rows > 0) {
		$data = $result->fetch_assoc();
		$date_expire = strtotime(date($data['react_person_admin_token_expire']));
		$date_now = strtotime(date('Y-m-d H:i:s'));

		if($date_expire > $date_now) {
			$new_expire = date('Y-m-d H:i:s',$date_now + 60*30);
			
			query_execute([
				"update react_person_admin set react_person_admin_token_expire = ? where react_person_admin_id = ?",
				"si",
				[ $new_expire, $auth["id"]]
			], $connection );
			$connection->close();
	

			if($cheking) {
				unset($data['react_person_admin_token_expire']);
				unset($data['react_person_admin_password']);
				echo json_encode($data);
				return;
			}
		}
		else {
			echo "error_expired_token";
			die();
		}
	}
	else {
		echo "error_unauthorized";
		die();
	}

}

function statement_check ($statement, $word) {

	$statement = strtolower($statement);
	$valid = true;
	$words = array_diff(["select", "update", "delete", "insert"], [$word]);

	foreach ($words as $value) {
		if(strpos($statement, $value)) $valid = false;
	}

	return $valid;
}


function query_read($data, $sensitive) {
	if(!statement_check($data[0], "select")) {
		echo "error_read_statement_only";
		die();
	}
	$connection = create_connection();
	$query = query_execute($data, $connection);
	$result = $query->get_result();
	$resp = [];
	while ($row = $result->fetch_assoc()) {
		// code...
		if($sensitive) {
			unset($row["react_person_admin_password"]);
			unset($row["react_person_admin_token_expire"]);
		} 
		$resp[] = $row;
	}

	echo json_encode($resp);
	return;
}

function query_write($data) {
	if(!statement_check($data[0], "insert")) {
		echo "error_write_statement_only";
		die();
	}
	$connection = create_connection();
	$query = query_execute($data, $connection);
	echo json_encode(["insert_id"=>$connection->insert_id]);
	return;
}

function query_edit($data) {
	if(!statement_check($data[0], "update")) {
		echo "error_edit_statement_only";
		die();
	}
	$connection = create_connection();
	$query = query_execute($data, $connection);
	echo json_encode(["affected_rows"=>$query->affected_rows]);
	return;
}

function query_delete($data) {
	if(!statement_check($data[0], "delete")) {
		echo "error_delete_statement_only";
		die();
	}
	$connection = create_connection();
	$query = query_execute($data, $connection);
	echo json_encode(["affected_rows"=>$query->affected_rows]);
	return;
}

function upload_image ($id, $image64) {


	$path_file = "images/img_".$id.".jpeg";

	file_put_contents($path_file, file_get_contents($image64));

	$statement = "UPDATE react_person_list set react_person_list_image = ? where react_person_list_id = ?";
	$connection = create_connection();
	$query = $connection->prepare($statement);
	$query->bind_param("si", $path_file, $id);
	$query->execute();
	echo json_encode(["path" => $path_file]);
	

}

function generate_image () {
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => 'https://thispersondoesnotexist.com/',
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => '',
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 0,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => 'GET',
	));

	$response = curl_exec($curl);

	$image = base64_encode($response);

	curl_close($curl);
	echo json_encode(["image" => $image]);


	
}


function query_statement($client) {
// 


	$type = array_keys($client)[0];
	$table = array_keys($client[$type])[0];

	if($type == "read") {
		$sensitive = false;

		if($table == "react_person_admin") $sensitive = true;
		query_read($client['read'][$table], $sensitive);
	} 
	else if(isset(getallheaders()['id']) && isset(getallheaders()['token'])) {

		$auth = ['id'=>getallheaders()['id'], 'token' => getallheaders()['token']];
		authenticate($auth, null);
		if($type == "write") query_write($client['write'][$table]);

		else if($type == "edit") query_edit($client['edit'][$table]);	 
	
		else if ($type == "delete") query_delete($client['delete'][$table]);

		else if($type == "generate") generate_image();

		else if($type == "upload") upload_image($client["upload"]["id"],$client["upload"]["image64"]);
		 
		else {
			echo "error_unknown_statement";
			die();
		}
	}

	else {
		echo "error_unauthorized";
		die ();
	}

	

}


?>