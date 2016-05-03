<?php
	global $WM;
	$NODE = $this->node;
?>
							<div class="mod">
								<div class="teaser highlight-white dropshadow padding-left padding-right padding-top padding-bottom">
									<p class="box-headline-contact"><?php $this->dump($NODE->Kicker); ?></p>
									<h4 class="box-kicker green"><?php $this->dump($NODE->Headline); ?></h4>
									<p class="box-details"><?php $this->dump($NODE->Exzerpt); ?></p>
									<p class="box-number"><?php $this->dump($NODE->Phone); ?></p>
									<?php if(has_node($NODE->Adress)) : ?><p class="box-adress"><?php $this->dump($NODE->Adress); ?></p><?php endif; ?>
									<div class="box-more"><a href="<?php echo $this->url( strip($NODE->More['href']) );?>" ><?php $this->dump($NODE->More); ?></a></div>
								</div>
							</div>