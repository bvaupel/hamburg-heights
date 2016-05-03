<?php
	global $WM;
	$NODE = $this->node;
	$has_children = (count($NODE->children()) > 0);
	$href = (has_attr('href', $NODE)) ? strip($NODE['href']) : false;
	$active = '';
	if ($href) {
		if ($href == $WM['PAGE']['META']['NAME']) {
			$active = 'active';
		} elseif (count($NODE->xpath(".//Item[@href='".$WM['PAGE']['META']['NAME']."']")) > 0) {
			$active = 'active';
		}
	}
	$title = (!$has_children) ? strip($NODE) : '' ;
	if (has_attr('title', $NODE)) {
		$title = strip($NODE['title']);
	} elseif ($href) {
		$title_tmp = get_page_title($href);
		$title = ($title_tmp != '') ? $title_tmp : $title;
	}
	$continue = true;
	if ($has_children && has_attr('continue-on', $NODE)) {
		$continue = (strip($NODE['continue-on']) == $active);
	}
?><li<?php echo $this->attrClass(array($NODE, $active)).$this->attributes($NODE); ?>><?php
	// if node has href open link tag
	if ($href):
		?><a href="<?php echo $this->url($href); ?>"><?php
	endif; 
	// echo the title
	echo $title;
	// if node has href close link tag
	if ($href):
		?></a><?php
	endif;
	// if there are children then parse on
	if ($has_children && $continue):
		echo display_children($NODE);
	endif;
?></li><!-- /.item -->