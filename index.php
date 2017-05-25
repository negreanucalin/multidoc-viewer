<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	
	 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
      <script type='text/javascript' src="dist/scripts/vendor.min.js"></script>
      <!-- Include all compiled plugins (below), or include individual files as needed -->

	  <script type='text/javascript' src="dist/scripts/scripts.min.js"></script>
	  <link href="dist/styles/styles.min.css" rel="stylesheet">

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