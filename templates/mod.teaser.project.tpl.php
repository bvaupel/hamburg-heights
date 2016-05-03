<?php
	global $WM;
	$NODE = $this->node;
?>
							
								<a href="<?php echo $this->url($NODE['href']); ?>" class="mod">
									<div class="highlight-green dropshadow">
										<div class="preview">
											
											<div class="hover"></div>

											<img class="stretch" src="<?php echo $this->url($NODE->Image); ?>">

										</div>
										
										<div class="info padding-top-half padding-left padding-right">

											<div class="dividing-rule-top-dotted"></div>
											<div class="box-headline-box">
												<h2 class="box-headline-projects white padding-top-half"><?php $this->dump($NODE->Headline); ?></h2>
											
												<p class="box-description"><?php $this->dump($NODE->Description); ?></p>
											</div>

											<div class="dividing-rule-top-dotted"></div>
											
											<p class="box-location white padding-top"><?php $this->dump($NODE->Location); ?></p>
											
											<h3 class="box-project"><?php $this->dump($NODE->Project); ?></h3>

											<p class="box-details padding-bottom-double"><?php $this->dump($NODE->Details); ?></p>

										</div>
									</div>
								</a><!-- /.mod.teaser.topic -->
