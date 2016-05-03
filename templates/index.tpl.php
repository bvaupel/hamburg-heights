<?php
	global $WM;
?><!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="<?php echo $this->eprint($this->lang); ?>"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="<?php echo $this->eprint($this->lang); ?>"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="<?php echo $this->eprint($this->lang); ?>"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="<?php echo $this->eprint($this->lang); ?>"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title><?php $this->eprint($this->title); ?></title>

	<meta name="HandheldFriendly" content="true">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<meta name="author" content="<?php $this->eprint($this->author); ?>">
	<meta name="description" content="<?php $this->eprint($this->description); ?>">
	<meta name="keywords" content="<?php $this->eprint($this->keywords); ?>">

	<link rel="shortcut icon" href="<?php $this->eprint($this->root); ?>media/favicon.ico">
	<link rel="apple-touch-icon" href="<?php $this->eprint($this->root); ?>media/apple-touch-icon.png">

	<link type="text/css" rel="stylesheet" href="http://fast.fonts.com/cssapi/2dec00d2-4ed5-495a-8ecd-809288981970.css"/>
	<link rel="stylesheet" href="<?php $this->eprint($this->root); ?>js/libs/mediaelement/mediaelementplayer.css">
	<link rel="stylesheet" href="<?php $this->eprint($this->root); ?>css/core.css">
	<link rel="stylesheet" href="<?php $this->eprint($this->root); ?>css/style.css">
	
	<script src="<?php echo $this->eprint($this->root); ?>js/libs/modernizr-2.0.6.min.js"></script>

	

</head>
<body<?php echo $this->attrClass($WM['PAGE']['CONTENT']).$this->attributes($WM['PAGE']['CONTENT']); ?>>

	<div class="page">
		<?php display('Header'); ?>

		<?php display('Content'); ?>

		<?php display('Footer'); ?>

	</div><!-- /.page -->

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?php $this->eprint($this->root); ?>js/libs/jquery-1.7.1.min.js"><\/script>')</script>
	
	<script src="<?php $this->eprint($this->root); ?>js/jquery.touch.js"></script>
	<script src="<?php $this->eprint($this->root); ?>js/jquery.dragPanel.js"></script>
	<script src="<?php $this->eprint($this->root); ?>js/jquery.fadeGallery.js"></script>
	<script src="<?php $this->eprint($this->root); ?>js/jquery.overlayBox.js"></script>
	<script src="<?php $this->eprint($this->root); ?>js/jquery.flipbook.js"></script>
	<script src="<?php $this->eprint($this->root); ?>js/script.js"></script>
	
	<?php if( isset( $WM['SITE']['META']['GOOGLEANALYTICS'] ) ): ?><script>
		window._gaq = [['_setAccount','<?php echo $this->eprint(strval($WM['SITE']['META']['GOOGLEANALYTICS'])); ?>'],['_trackPageview'],['_trackPageLoadTime']];
		Modernizr.load({
			load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
		});
	</script><?php endif; ?>

	<!--[if lt IE 7 ]>
		<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
		<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
	<![endif]-->

</body>
</html>