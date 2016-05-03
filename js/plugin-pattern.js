/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/

$(function(){

	$('.slider').slider();

});


//
// create closure
//
(function($) {
	//
	// plugin definition
	//
	$.fn.slider = function(options) {
		//debug(this);
		// build main options before element iteration
		var opts = $.extend({}, $.fn.slider.defaults, options);
		if( Modernizr && Modernizr.csstransitions ) {
			console.log('transitions');
			
		} else {
			console.log('transform');
		}
		// iterate and reformat each matched element
		return this.each(function() {
			var 
				$this = $(this),
				$frame = $( opts.frame, this ),
				$container = $( opts.container, this )
				$items = $( opts.items, this ),
				$nav = $( opts.nav, this ),
				active = 0;
			
			$nav.click(function( e ){
				jump( $items.index( $( $(this).attr('href') ) ) );
				e.preventDefault();
			});
			
			function jump( pos, elem ) {
				//console.log( pos );
				var viewport = $frame.width(),
					offset = (pos * viewport)*-1;

				$container.css({
					'-webkit-transition-timing-function': 'cubic-bezier(0.25, 0, 0.25, 1)',
					'-webkit-transition-duration': opts.duration+'ms',
					'-webkit-transform': 'translate3d(' + offset + 'px, 0px, 0px)'
				});

				// $frame.animate({
// 					scrollLeft: offset*-1
// 				}, opts.duration );
				
				$nav.find('.active').removeClass('active');
			}

			jump();
		});
	};
	//
	// private function for debugging
	//
	function debug($obj) {
		if (window.console && window.console.log)
			window.console.log('hilight selection count: ' + $obj.size());
	};
	//
	// plugin defaults
	//
	$.fn.slider.defaults = {
		frame: '.frame',
		container: '.slides',
		items: '.slide',
		nav: '.simple-nav a',
		duration: 500
	};
//
// end of closure
//
})(jQuery);