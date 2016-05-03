<?php
	global $WM;
	$NODE = $this->node;
?>

				<article<?php echo $this->attrClass( array( 'article', $NODE ) ); ?>>
					<div class="content">
					<?php
						foreach( $NODE->children() as $CHILD ) {
							$this->node = $CHILD;
							$this->display( get_tpl( $CHILD )  );
						}
					?>

					</div>

				</article><!-- /.article -->
