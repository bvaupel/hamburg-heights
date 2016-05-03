<?php
	global $WM;
	$NODE = $this->node;
?>

							<div class="mod highlight">

								<div <?php echo $this->attrClass( array( 'info', $NODE ) ); ?>>

									<div class="dividing-rule-top-dotted"></div>
									
									<h1 class="box-headline padding-top-half padding-bottom-double"><?php $this->dump($NODE->Headline); ?></h1>
									
									<div class="padding-bottom">
									
										<div class="dividing-rule-top-dotted"></div>

									</div>
									

									<p><?php $this->dump($NODE->Copy); ?></p>
									
									<?php if( has_attr( 'href', $NODE) ) : ?>
										<div class="box-more">
											<a href="<?php echo $this->url( strval($NODE['href']) ); ?>"><?php $this->dump($NODE->More); ?></a>
										</div>
									<?php endif; ?>

								</div>
							</div><!-- /.mod.article -->
