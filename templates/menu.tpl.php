<?php
	$NODE = $this->node;
?>

			<nav<?php echo $this->attrClass($NODE).$this->attributes($NODE); ?>>
				<?php echo display_children($NODE); ?>

			</nav><!-- /.menu -->
