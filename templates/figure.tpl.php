<?php
	global $WM;
	$NODE = $this->node;
?>

				<figure<?php echo $this->attrClass( array( 'figure', $NODE ) ); ?>>
					<?php
						$IMAGE = ( count($NODE->Image) > 0 ) ? $NODE->Image : false;
						if( $IMAGE ) :
							$SIZE = getimagesize( strip($IMAGE) );
							$RATIO = $SIZE[1]/$SIZE[0];
					?><img<?php echo $this->attrClass( $IMAGE ); ?> data-ratio="<?php echo $RATIO; ?>" src="<?php echo $this->url($IMAGE); ?>"><?php
						endif;
					?>

					<div class="slant top"></div>
					<div class="slant bottom"></div>
				</figure><!-- /.figure -->
