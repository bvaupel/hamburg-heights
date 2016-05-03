<?php
	global $WM;
	$NODE = $this->node;
?>

							<a href="<?php echo $this->url($NODE['href']); ?>" class="mod">
								<div class="highlight-white dropshadow">
								
									<div class="preview">
										<div class="hover"></div>
										<img class="stretch" src="<?php echo $this->url($NODE->Image); ?>">	
									</div>
								

								<div class="info padding-left padding-right padding-top-half" style="min-height:215px">

										<div class="dividing-rule-top-dotted"></div>
											<div class="box-headline-box">
												<h2 class="box-headline-projects padding-bottom-headline padding-top-half green"><?php $this->dump($NODE->Headline); ?></h2>
											</div>
										<div class="dividing-rule-top-dotted"></div>

										<h2 class="box-kicker padding-top padding-bottom"><?php $this->dump($NODE->Kicker); ?></h2>

								</div>
							</div>
							</a><!-- /.mod.teaser.section -->
