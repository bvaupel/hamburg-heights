/* 
	Author: Christian Hermann Quinders
*/

$(function(){
		
	$('.fadegallery').fadeGallery();
	$('.collapsible').collapsibleContent();
	
	var flipthroughOptions = {
		touch: Modernizr.touch,
		cycle: 4,
		direction: 'backward'
	};
	
	$('.flipthrough').flipthrough(flipthroughOptions);

});



(function($) {
	//
	// plugin definition
	//
	$.fn.collapsibleContent = function(options) {
		
		// build main options before element iteration
		var opts = $.extend({}, $.fn.collapsibleContent.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this),
				$toggle = $( opts.toggle, this ),
				$content = $( opts.content, this );
			
			$content.hide();

			$toggle.click(function(e) {
				if( $content.is(':visible') ) {
					
					console.log('visible ');

					$content.slideUp( opts.duration, 'easeOutQuad', function(){
						$this.removeClass( opts.status );
					});
				} else {
					
					console.log('hidden');
					
					$content.slideDown( opts.duration, 'easeOutQuad', function() {
						$this.addClass( opts.status );
					});
				}
				e.preventDefault();
			});
			
		});
	};
	//
	// plugin defaults
	//
	$.fn.collapsibleContent.defaults = {
		toggle: '.collapsible-toggle',
		content: '.collapsible-content',
		status: 'collapsible-expanded',
		duration: 250
	};
//
// end of closure
//
})(jQuery);


(function($) {
	$.extend( $.easing,
	{
		def: 'easeOutQuad',
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		}
	});
})(jQuery);