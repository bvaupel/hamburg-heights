<?php
	$NODE = $this->node;
?><ul<?php echo $this->attrClass($NODE).$this->attributes($NODE); ?>><?php echo display_children($NODE); ?></ul><!-- /.group -->