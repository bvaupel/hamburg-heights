$(function(){
		
		$('a.overlay').overlayBox();
		
});

//
// overlayBox
//
(function($) {
	//
	// plugin definition
	//
	$.fn.overlayBox = function(options) {

		var opts = $.extend({}, $.fn.overlayBox.defaults, options),
			$this = $(this),
			$win = $(window),
			$body = $('body'),
			$doc = $(document),
			$curtain = $('<div class="overlay-curtain"></div>'),
			imgRegExp = /\.(jpg|gif|png|bmp|jpeg)$/i,
			active = false;

		return this.each(function() {
			console.log("overlay");
			$(this).click(function(e){
				var $that = $(this),
					href = $that.attr('href'),
					rel = $that.attr('rel');
				
				if( href != '' ) {
					
					//Append the overlay to the document body
					$body.append($curtain.click(function() { 
						overlayHide();
					}));

					if( href.match(imgRegExp) ) {
						var image = new Image();
						image.src = href;
						
						
						$active = $('<div class="overlay-content"><a class="overlay-close" href="#"></a></div>').append(image);
						
						$body.append(
							$active.hide()
						);
						
						//Set the css and fade in our overlay
						$curtain.css({
							width: $doc.width(),
							height: $doc.height(),
							opacity: opts.opacity
						}).fadeIn( opts.duration );
						
						$active.css({
							top: $body.scrollTop()+($win.height()/2)-($active.height()/2),
							left: '50%',
							marginLeft: (990/2)*-1
						}).fadeIn( opts.duration ).find('.overlay-close').click(function(e){
								overlayHide();
								e.preventDefault();
							});
						
					}
					
					//Activate a listener 
					$doc.keydown(handleEscape);
					
					e.preventDefault();
				}
			});

		});

		// Our function for hiding the modalbox
		function overlayHide() {
			$doc.unbind("keydown", handleEscape);
			var remove = function() { 
				$(this).remove(); 
			}
			$active.fadeOut( opts.duration, remove );
			$curtain.fadeOut( opts.duration, remove );
		}

		// Our function that listens for escape key.
		function handleEscape(e) {
			if (e.keyCode == 27) {
				overlayHide();
			}
		}

	};
	//
	// plugin defaults
	//
	$.fn.overlayBox.defaults = {
		duration: 150,
		opacity: 0.2
	};
//
// end of closure
//
})(jQuery);