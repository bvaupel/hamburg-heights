<?php
	global $WM;
	$NODE = $this->node;
?>

							<<?php if( has_attr( 'href', $NODE) ) : ?>a href="<?php echo $this->url( strval($NODE['href']) ); ?>"<?php else: ?>div<?php endif; echo $this->attrClass( array( 'mod teaser', $NODE));?>>

								<img src="<?php echo $this->url($NODE->Image); ?>" alt="">
								<h2<?php echo $this->attrClass( $NODE->Headline );?>><?php echo strval($NODE->Headline); ?></h2>

								<?php if( strval($NODE->Exzerpt) != '' ) : ?><p<?php echo $this->attrClass( $NODE->Exzerpt );?>><?php $this->eprint(strval($NODE->Exzerpt)); ?></p><?php endif; ?>

								<?php if( strval($NODE->More) != '' ) : ?><p<?php echo $this->attrClass( $NODE->More );?>><span class="icon-arrow details"><?php $this->eprint(strval($NODE->More)); ?></span></p><?php endif; ?>

							</<?php if( has_attr( 'href', $NODE) ) : ?>a<?php else: ?>div<?php endif; ?>><!-- /.mod.teaser.category -->