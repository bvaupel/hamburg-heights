//
// parallaxGallery
//
(function($) {
	//
	// plugin definition
	//
	$.fn.parallaxGallery = function(options) {
		//debug(this);
		// build main options before element iteration
		var opts = $.extend({}, $.fn.parallaxGallery.defaults, options),
			cssprefix = '';

		if( $.browser.webkit ) cssprefix = '-webkit-';
		if( $.browser.mozilla ) cssprefix = '-moz-';
		if( $.browser.opera ) cssprefix = '-o-';

		if( !Modernizr && !Modernizr.csstransitions ) {
			opts.transitions = false;
		}
		
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this),
				$frame = $( opts.frame, this ),
				$container = $( opts.container, this )
				$items = $( opts.items, this ),
				$nav = $( opts.nav, this ),
				data = $this.data('parallaxGallery'),
				parallax = $this.hasClass('parallax'),
				autoplay = $this.hasClass('autogallery'),
				active = false;
				animating = false,
				timer = false,
				data = {};

			$nav.click(function( e ){
				jump( getPos( '#' + this.href.split('#').pop() ) );
				e.preventDefault();
			});
			
			$this.bind('prev',function(e){
				prev();
			}).bind('next',function(e){
				next();
			}).bind('goto',jump);

			if( opts.transitions && parallax ) {
				data.images = new Array();
				for ( i=0; i <= $items.length-1 ; i++ ) {
					data.images[i] = $items.eq(i).find( opts.skew );
				}
			};

			function next() {
				var pos = ( active+1 < $items.length ) ? active+1 : 0 ;
				jump( pos );
			};
			
			function prev() {
				var pos = ( active == 0 ) ? $items.length-1 : active-1 ;
				jump( pos );
			};
			
			function jump( pos ) {

				if( !animating ) {

					animating = true;
	
					var $target = $items.eq(pos),
						target_ID = '#'+$target.attr('id'),
						viewport = $frame.width(),
						offset = (pos * viewport)*-1,
						step =  pos-active,
						dir = ( step > 0 ) ? 1 : -1 ;
	
					
					//console.log('viewport: '+viewport+' dir:'+dir);
					if( pos != active ) {
						if( opts.transitions && parallax ) {
							var delay;
							for ( i=0; i <= $items.length-1 ; i++ ) {
								delay = 1;
								if( i == active ) {
									data.images[i].each(function(){
										setTransition( $(this), { offset: delay*viewport*dir*-1, duration: opts.duration/opts.factor } );
										delay++;
									});
								} else if ( i == pos ) {
									//console.log('pos: '+pos+' active: '+active+' i:'+i);
									data.images[i].each(function(){
										var $img = $(this);
										setTransition( $img, { offset: delay*viewport*dir, duration: 0 } );
										setTimeout(function(){
											setTransition( $img, { offset: 0, duration: opts.duration*opts.factor } );
										},10);
										delay++;
									});
								} else {
									data.images[i].each(function(){
										setTransition( $(this), { offset: 0, duration: 0 } );
									});
								}
							}
						}
					}

					setTransition( $container, { offset: offset, duration: opts.duration });
	
					$items.eq(active).removeClass('active');
					$target.addClass('active');
	
					$nav
						.filter('.active')
							.removeClass('active')
						.end()
						.filter('[href$=' + target_ID + ']')
							.addClass('active');
					
					active = pos;
					
					if( autoplay ) {
						clear();
						timer = setTimeout(next, opts.interval);
					}
					
					setTimeout(function(){
						animating = false;
					}, opts.duration );

				}
				
			};
			
			function setTransition( $elem, o ) {
				$elem.css({
					'-webkit-transition-property': 'initial',
					'-webkit-transition-delay': 'initial',
					'-webkit-transition-timing-function': 'cubic-bezier(0.25, 0, 0.25, 1)',
					'-webkit-transition-duration': o.duration+'ms',
					'-webkit-transform': 'translate3d(' + o.offset + 'px, 0, 0)',
				});
			};
			
			function setAnimation( $elem, o ) {
				$elem.animate({
					scrollLeft: o.offset*-1
				}, o.duration);
			}
			
			function getPos( elem ) {
				return $items.index( $( elem ) );
			};

			function clear() {
				clearTimeout(timer);
			};

			function init() {
				
				setTransition( $container, { offset: $frame.width(), duration: 0 });

				setTimeout(function(){
					jump( 0 );
				},10);
				
			};
			
			init();
		});
	};
	//
	// plugin defaults
	//
	$.fn.parallaxGallery.defaults = {
		frame: '.frame',
		container: '.slides',
		items: '.slide',
		skew: '.skew',
		nav: '.simple-nav a',
		duration: 500,
		factor: 1.5,
		interval: 6000,
		transitions: true
	};
//
// end of closure
//
})(jQuery);