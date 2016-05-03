<?php
	global $WM;
	$NODE = $this->node;
?>

		<<?php if( has_attr( 'href', $NODE) ) : ?>a href="<?php echo $this->url($NODE['href']); ?>"<?php else: ?>div<?php endif; echo $this->attrClass($NODE).$this->attributes($NODE);?>>

			<div class="preview">
				<div class="hover"></div>
				<img<?php echo $this->attrClass($NODE->Image).$this->attributes($NODE->Image);?> src="<?php echo $this->url($NODE->Image); ?>">
									
			</div>
								
			<div class="info padding-left padding-top">
				
									
				<?php if( has_node($NODE->Headline) ): ?><h2<?php echo $this->attrClass($NODE->Headline).$this->attributes($NODE->Headline);?>><?php $this->dump($NODE->Headline); ?></h2><?php endif; ?>
				<?php if( has_node($NODE->Kicker) ): ?><h3<?php echo $this->attrClass( $NODE->Kicker );?>><?php $this->dump($NODE->Kicker); ?></h3><?php endif; ?>

				<?php if( has_node($NODE->Exzerpt) ): ?><p<?php echo $this->attrClass($NODE->Exzerpt).$this->attributes($NODE->Exzerpt);?>><?php $this->dump($NODE->Exzerpt); ?></p><?php endif; ?>

				<?php if( has_node($NODE->More) ) : ?><p<?php echo $this->attrClass($NODE->More).$this->attributes($NODE->More); ?>><?php $this->dump($NODE->More); ?></p><?php endif; ?>

			</div>
		</<?php if( has_attr( 'href', $NODE) ) : ?>a<?php else: ?>div<?php endif; ?>><!-- /.mod.teaser.topic -->
