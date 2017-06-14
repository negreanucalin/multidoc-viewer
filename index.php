<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Multidoc</title>
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
      <!-- inject:js -->
      <script src="dist/scripts/vendor.min.js?v=1497431479"></script>
      <script src="dist/scripts/scripts.min.js?v=1497431479"></script>
      <!-- endinject -->
      <!-- inject:css -->
	  <link rel="stylesheet" href="dist/styles/styles.min.css?v=1497431479">
	  <!-- endinject -->
  </head>
  
  <body ng-app="multidoc">
	  <div class ="container-fluid">
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div ui-view="header"></div>
		</nav>

		<div class="top-60">
			<div ui-view="navigation"></div>
			<div ui-view="content"></div>
		</div>
	  </div>
	  <div ui-view="footer"></div>

  </body>
</html>