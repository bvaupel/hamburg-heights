//
// fadeGallery
//
(function($) {
	//
	// plugin definition
	//
	$.fn.fadeGallery = function(options) {
		//debug(this);
		// build main options before element iteration
		var opts = $.extend({}, $.fn.fadeGallery.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this),
				$frame = $( opts.frame, this ),
				$items = $( opts.items, this ),
				$nav = $( opts.nav, this ),
				autoplay = $this.hasClass('autogallery'),
				active = 0,
				animating = false,
				timer = false;

			$nav.click(function( e ){
				jump( getPos( '#' + this.href.split('#').pop() ) );
				e.preventDefault();
			});
			
			$this.bind('prev',function(e){
				prev();
			}).bind('next',function(e){
				next();
			}).bind('goto',jump);

			function next() {
				var pos = ( active+1 < $items.length ) ? active+1 : 0 ;
				jump( pos );
			};
			
			function prev() {
				var pos = ( active == 0 ) ? $items.length-1 : active-1 ;
				jump( pos );
			};
			
			function jump( pos ) {

				if( !animating && active != pos ) {

					animating = true;
	
					var $active = $items.eq(active),
						$target = $items.eq(pos),
						target_ID = '#'+$target.attr('id');

					var video = $active.find('video');
					if ( video.length > 0 ) {
						//console.log('video pause');
						video[0].player.pause();
					}
					
					$target
						.addClass('animating')
						.fadeIn( opts.duration, function() {
							
							$active.removeClass('active').hide();
							$(this).removeClass('animating').addClass('active');
							
							animating = false;
						});
					
					$nav
						.filter('.active')
							.removeClass('active')
						.end()
						.filter('[href$=' + target_ID + ']')
							.addClass('active');

					active = pos;

				}
				
				if( autoplay ) {
					clear();
					timer = setTimeout(next, opts.interval);
				}
				
			};
			
			function getPos( elem ) {
				return $items.index( $( elem ) );
			};

			function clear() {
				clearTimeout(timer);
			};
			
			function init() {
				$items.not('.active').hide();
				$nav.eq( opts.start ).addClass('active');
				jump( opts.start );
			}
			
			init();

		});
	};
	//
	// plugin defaults
	//
	$.fn.fadeGallery.defaults = {
		frame: '.frame',
		items: '.slide',
		nav: '.js-gallery-nav a',
		duration: 750,
		interval: 6500,
		start: 0
	};
//
// end of closure
//
})(jQuery);