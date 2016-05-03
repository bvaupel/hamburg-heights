<?php
	global $WM;
	$NODE = $this->node;
?>
							<div class="row margin-bottom-double teaser-project">
								<a href="<?php echo $this->url($NODE['href']); ?>">

									<div class="preview col3of10">
										<div class="mod">
											<div class="hover"></div>
											<img class="stretch" src="<?php echo $this->url($NODE->Image); ?>">
										</div>
									</div>
									
									<div class="info col4of10 highlight-green flush-left push-right" style="height:264px;">
										<div class="mod margin-top">
											<div class="padding-left padding-top padding-right">
												<p class="white "><?php $this->dump($NODE->Location); ?></p>

												<h2 class="white headline"><?php $this->dump($NODE->Headline); ?></h2>
											
												<p class="white description"><?php $this->dump($NODE->Description); ?></p>

												<div class="dividing-rule-top-dotted border-white"></div>
											</div>
										</div>
									</div>
								</a>
							</div><!-- /.mod.teaser.project.wide -->
