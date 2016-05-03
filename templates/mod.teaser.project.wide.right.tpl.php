<?php
	global $WM;
	$NODE = $this->node;
?>
							
								<a href="<?php echo $this->url($NODE['href']); ?>">
									<div class="row margin-bottom-double teaser-project dropshadow highlight-white ">
									<div class="info col4of10" style="height:264px;">
										<div class="mod margin-top">
											<div class="padding-left padding-top padding-right">
												<p class=""><?php $this->dump($NODE->Location); ?></p>

												<h2 class=" headline"><?php $this->dump($NODE->Headline); ?></h2>
											
												<p class=" description"><?php $this->dump($NODE->Description); ?></p>

												<div class="dividing-rule-top-dotted"></div>
											</div>
										</div>
									</div>
									<div class="preview col3of10">
										<div class="mod">
											<div class="hover"></div>
											<img class="stretch" src="<?php echo $this->url($NODE->Image); ?>">
										</div>
									</div>
									</div>
								</a>
							<!-- /.mod.teaser.project.wide -->
