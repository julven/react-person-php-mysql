
<?php
	$myfile = fopen('compiled.txt', "w");
	$compiled = "";
	$files = array_diff(scandir("components/"), [".", ".."]);

	// print_r($all_files);
	// return;

	// $compiled .= file_get_contents("services.js")."\n";
	foreach ($files as $value) {
		$compiled .= file_get_contents("components/".$value)."\n";
	}
	$compiled .= file_get_contents("index.js")."\n";
	// print_r($compiled);
	// return;

	fwrite($myfile, $compiled);

	$script = "<script type='text/babel'>".$compiled."</script>";


?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>React Person List</title>
	 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
	 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
	 <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
	 <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
	<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
	<script src="https://unpkg.com/history@5/umd/history.development.js" crossorigin></script>
	<script src="https://unpkg.com/react-router@6.3.0/umd/react-router.development.js" crossorigin></script>
	<script src="https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.development.js" crossorigin></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.2/react-redux.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
</head>
<body>
	<div id="app"></div>

	<?php echo $script;?>
</body>
</html>