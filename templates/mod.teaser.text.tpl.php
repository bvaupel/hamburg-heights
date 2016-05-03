<?php
	global $WM;
	$NODE = $this->node;
	$MORE = $NODE->More;
	
?>
							<<?php if( has_attr( 'href', $NODE ) ) : ?>a href="<?php echo $this->url($NODE['href']); echo $NODE['parameter']; echo $NODE['hash']; ?>"<?php else: ?>div<?php endif; echo $this->attrClass($NODE).$this->attributes($NODE); ?>>
                            	<?php if( has_node( $NODE->Figure ) ): ?><figure<?php echo $this->attrClass($NODE->Figure).$this->attributes($NODE->Figure); ?>>
                            		<img src="<?php echo $this->url($NODE->Figure->Image); ?>"<?php echo $this->attrClass( $NODE->Figure->Image ).$this->attributes($NODE->Figure->Image); ?>>
                            		<?php if( has_node( $NODE->Figure->Caption ) ): ?><figcaption<?php echo $this->attrClass( $NODE->Figure->Caption ).$this->attributes($NODE->Figure->Caption); ?>><?php $this->dump($NODE->Figure->Caption); ?></figcaption><?php endif; ?>

                            	</figure><?php endif; ?>

								<?php $this->dump($NODE->Copy); ?>

								<<?php if( has_attr( 'href', $MORE ) ) : ?>a href="<?php echo $this->url($MORE['href']); echo $MORE['parameter']; echo $MORE['hash']; ?>"<?php else: ?>div<?php endif; echo $this->attrClass($MORE).$this->attributes($MORE); ?>>
									<?php $this->dump($MORE); ?>
								</<?php if( has_attr( 'href', $MORE) ) : ?>a<?php else: ?>div<?php endif; ?>>

							</<?php if( has_attr( 'href', $NODE) ) : ?>a<?php else: ?>div<?php endif; ?>><!-- /.mod.teaser.text -->