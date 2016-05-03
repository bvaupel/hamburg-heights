<?php
	// set SITE
	define( 'SITE_PATH', dirname( __FILE__ ) . '/' );
	define( 'SITE_NAME', end(explode('/', dirname( __FILE__ ))) );
	// Load Webman
	require_once('../webman/wm.php');
?>