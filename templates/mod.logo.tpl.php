<?php
	$NODE = $this->node;
?>

							<b<?php echo $this->attrClass($NODE).$this->attributes($NODE); ?>>
								<<?php if ( has_attr( 'href', $NODE->Headline) ) : ?>a href="<?php echo $this->url( strip($NODE->Headline['href']) ); ?>"<?php else: ?>span<?php endif; echo $this->attrClass($NODE->Headline).$this->attributes($NODE->Headline); ?>><?php echo strip($NODE->Headline); ?></<?php if ( has_attr( 'href', $NODE->Headline) ) : ?>a<?php else: ?>span<?php endif; ?>>
							</b><!-- /.mod.logo -->
