<?php
	$NODE = $this->node;
?>

							<article<?php echo $this->attrClass($NODE).$this->attributes($NODE); ?>>
								<?php if( has_node($NODE->Exzerpt) ): ?><div<?php echo $this->attrClass($NODE->Exzerpt).$this->attributes($NODE->Exzerpt); ?>><?php $this->dump($NODE->Exzerpt); ?></div><?php endif; ?>

								<?php if( has_node($NODE->Copy) ): ?><div<?php echo $this->attrClass($NODE->Copy).$this->attributes($NODE->Copy); ?>><?php $this->dump($NODE->Copy); ?></div><?php endif; ?>

								<?php if( has_node($NODE->More) ): ?><div<?php echo $this->attrClass($NODE->More).$this->attributes($NODE->More); ?>><?php $this->dump($NODE->More); ?></div><?php endif; ?>

							</article><!-- /.mod.article -->
