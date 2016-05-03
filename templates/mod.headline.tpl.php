<?php
	global $WM;
	$NODE = $this->node;
?>

							<div class="mod">
								
									<div class="dividing-rule-top-dotted"></div>
									
									<h2 class="padding-top-half box-headline"><?php $this->dump($NODE->Headline); ?></h2>
									
									<p class="box-description padding-bottom"><?php if(has_node($NODE->Subline)) : ?><?php $this->dump($NODE->Subline); ?><?php endif; ?></p> 

									<div class="dividing-rule-top-dotted"></div>
									
							</div><!-- /.mod.headline -->
