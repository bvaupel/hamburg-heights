/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/

$(function(){

	$('.fadegallery').fadeGallery();
	$('.parallax-background').parallaxBackground();

});

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
		nav: '.simple-nav a',
		duration: 750,
		interval: 6500,
		start: 0
	};
//
// end of closure
//
})(jQuery);

//
// parallaxBackground
//
(function($) {
	//
	// plugin definition
	//
	$.fn.parallaxBackground = function(options) {
		// build main options before element iteration
		var $window = $(window),
			opts = $.extend({}, $.fn.parallaxBackground.defaults, options),
			items = new Array();
		
		// iterate and reformat each matched element
		this.each(function() {
			var $this = $(this),
				offset = parseInt( $this.css('backgroundPosition').split(' ')[1] );
				item = {};
			item.elem = $this;
			item.ratio = opts.ratio;
			item.offset = ( !isNaN(offset) ) ? offset : opts.offset;
			items.push( item );
		});
		$window.scroll(function() {
			//console.time('scroll-loop');
			var scrollY = -$window.scrollTop();
			for( i=0; i < items.length; i++ ) {
				var newY = scrollY / items[i].ratio + items[i].offset;
				items[i].elem.css('backgroundPosition', '50% '+ newY +'px');
			}
			//console.timeEnd('scroll-loop');
		});
		
		return this;
	};
	//
	// plugin defaults
	//
	$.fn.parallaxBackground.defaults = {
		offset: 0,
		ratio: 4
	};
//
// end of closure
//
})(jQuery);