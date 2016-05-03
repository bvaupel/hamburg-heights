/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/

$(function(){

	$('.slider').parallaxGallery();

});


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
		var opts = $.extend({}, $.fn.parallaxGallery.defaults, options);
		
		//	if( Modernizr && Modernizr.csstransitions ) {
		//		console.log('transitions');
		//	} else {
		//		console.log('transform');
		//	}

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
					data.images[i] = $items.eq(i).find('img');
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
	
					// Animate with jQuery
					//	$frame.animate({
					//		scrollLeft: offset*-1
					//	}, opts.duration );
	
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
			
			/*
			function setTransitionAlt( $elem, o, callback ) {

				console.log($elem);
				callback = ( callback ) ? callback : function(){} ;
				$elem.css({
					'-webkit-transition-property': 'initial',
					'-webkit-transition-delay': 'initial',
					'-webkit-transition-timing-function': 'cubic-bezier(0.25, 0, 0.25, 1)',
					'-webkit-transition-duration': o.duration+'ms',
					'-webkit-transform': 'translate3d(' + o.offset + 'px, 0, 0)',
				}).one( 'webkitTransitionEnd', callback );
			}
			*/
			
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
			$curtain = $('<div id="overlay-curtain"></div>'),
			imgRegExp = '/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i',
			active = false;

		return this.each(function() {

			$(this).click(function(e){

				//Append the overlay to the document body
				$body.append($curtain.click(function() { 
					overlayHide();
				}))

				//Set the css and fade in our overlay
				$curtain.css({
					width: $doc.width(),
					height: $doc.height(),
					opacity: 0.2
				}).fadeIn( opts.duration );

				var $that = $(this),
					href = $that.attr('href'),
					rel = $that.attr('rel');

				if( href.match(imgRegExp) ) {
					
					active = $('<div class=""></div>');
					
					/*
						.fadeIn( opts.duration )
						.css({'top': boxY+'px', 'left': boxX+'px' })
						.find('a.overlay-close')
							.click(function(e){
								overlayHide();
								e.preventDefault();
							});
					*/
				}

				e.preventDefault();

				//Activate a listener 
				$doc.keydown(handleEscape);

			});

		});
		
		function loadImage() {
			
		}

		// Our function for hiding the modalbox
		function overlayHide() {
			$doc.unbind("keydown", handleEscape);
			var remove = function() { 
				$(this).remove(); 
			}
			active.fadeOut( opts.duration );
			overlay.fadeOut( opts.duration, remove );
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
		duration: 150
	};
//
// end of closure
//
})(jQuery);