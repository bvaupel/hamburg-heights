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
			$win = $(window),
			$body = $('body'),
			$doc = $(document),
			$overlayMask = $('<div id="overlay-mask" class="overlay-mask"></div>'),
			$overlayBox = $('<div id="overlay-box" class="overlay-box"><div class="overlay-content"></div><a class="overlay-close" href="#"></a></div>'),
			$overlayContent = $overlayBox.find('.overlay-content'),
			$overlayNav = $('<a rel="prev" class="overlay-nav prev"></a><a rel="next" class="overlay-nav next"></a>'),
			imgRegExp = /\.(jpg|gif|png|bmp|jpeg)$/i,
			videoRegExp = /\.(mp4|ogv|ogg|webm)$/i,
			inlineParent = null,
			selectedArray = new Array(),
			selectedIndex = 0;

		return this.each(function() {

			$(this).bind('click',function(e) {
				var $this = $(this),
					href = $this.attr('href'),
					rel = $this.attr('rel') || '';

				// single item
				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);
				
				// item set
				} else {
					selectedArray = $('a[rel=' + rel + '], area[rel=' + rel + ']');
					selectedIndex = selectedArray.index( this );
					
					$overlayBox.append(
						$overlayNav.bind('click', function() {
							
							if ( $(this).attr('rel') == 'next' ) {
								selectedIndex = ( selectedIndex+1 < selectedArray.length ) ? selectedIndex+1 : 0 ;
							} else {
								selectedIndex = ( selectedIndex == 0 ) ? selectedArray.length-1 : selectedIndex-1 ;
							}
							load_href( $(selectedArray[selectedIndex]).attr('href') );
						})
					);
				}
				
				show();
				load_href( href );
				
				e.preventDefault();
			});

		});
		
		//
		// private functions
		//
		
		// load href
		function load_href( href ) {
			//console.log( href );
			$overlayBox.addClass('loading');
			// is inline element
			if ( href.match(/#/) ) {
				var url = window.location.href.split('#')[0],
					target = href.replace(url,'');
				if (target == '#') return;
				var $target = $(target);
				inlineParent = $(target).parent();
				reveal( inlineParent.html() );
				inlineParent.empty();
			// is image
			} else if ( href.match(imgRegExp) ) {
				load_image( href );
			// is video
			} else if ( href.match(videoRegExp) ) {
				load_video( href );
			// is ajax
			} else {
				load_ajax( href );
			}
		};
		
		// load image from href into overlayBox
		function load_image( href ) {
			var image = new Image();
			image.onload = function() {
				reveal( '<img src="' + image.src + '">' );
			}
			image.src = href;
		};
		
		// load video from href into overlayBox
		function load_video( href ) {
			var data = {};
			/*var video = '<video width="' + data.width + '" height="' + data.height + '" controls="controls" preload="autoplay" poster="' + data.poster + '">
				<source type="video/mp4" src="' + href + '" />
				<object width="928" height="523" type="application/x-shockwave-flash" data="/wm/release-gq/js/libs/mediaelement/flashmediaelement.swf">
					<param name="movie" value="/wm/release-gq/js/libs/mediaelement/flashmediaelement.swf" />
					<param name="flashvars" value="controls=true&poster=/wm/release-gq/sites/gerling-quartier/media/pages/quarter_video/Gerling_Quartier_Hauptfilm_IF_928x522_poster.jpg&file=media/pages/quarter_video/Gerling_Quartier_Hauptfilm_IF_928x522.mp4" />
					<img src="/wm/release-gq/sites/gerling-quartier/media/pages/quarter_video/Gerling_Quartier_Hauptfilm_IF_928x522_poster.jpg" width="" height="" title="">
				</object>
			</video>'*/
		};
		
		// load content from href via ajax
		function load_ajax( href ) {
			$.get( href, function(data) {
				console.log(data);
				reveal(data)
			});
		};
		
		// append overlayCurtain and overlayContent to the DOM
		function show() {
			$body.append(
				$overlayMask.css({
					height: $doc.height()
				}).hide().fadeIn( opts.duration ).bind('click', hide )
			).append(
				$overlayBox.css({
					width: opts.initSize,
					height: opts.initSize,
					top:	getPageScroll()[1] + getPageHeight()/2 - opts.initSize/2,
					left:	$win.width()/2 - opts.initSize/2
				}).hide().fadeIn( opts.duration )
			);
			$overlayBox.find('.overlay-close').bind('click', function(e) {
				hide();
				e.preventDefault();
			});
			$doc.bind('keydown', keypress);
			$win.resize(function() {
				$overlayBox.css({
					left: ($win.width()/2) - ($overlayContent.width()/2+opts.padding)
				});
				$overlayMask.css({
					height: $doc.height()
				});
			});
		};
		
		// append content to overlayBox
		function reveal( html ) {
			//console.log($overlayBox.height() + ' ' + $overlayContent.height() );
			//console.log($overlayBox[0].style.height);
			$overlayBox.css({ height: $overlayBox.height() });
			$overlayContent.hide().html( html );
			draw(function(){
				$overlayBox.removeClass('loading').css({ height: 'auto' });
				$overlayContent.fadeIn( opts.duration );
			});
		};
		
		function draw( callback ) {
			callback = ( $.isFunction(callback) ) ? callback : function(){} ;
			if ( $overlayBox.height() == $overlayContent.height() && $overlayBox.width() == $overlayContent.width() ) {
				callback();
			} else {
				//console.log('redraw');
				$overlayBox.animate({
					top: getPageScroll()[1] + getPageHeight()/2 - $overlayContent.height()/2-opts.padding,
					left: ($win.width()/2) - ($overlayContent.width()/2+opts.padding),
					width: $overlayContent.width(),
					height: $overlayContent.height()
				}, opts.duration, callback );
			}
		};
		
		// getPageScroll() by quirksmode.com
		function getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) { // all other Explorers
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;
			}
			return new Array(xScroll,yScroll);
		}
	
		// Adapted from getPageSize() by quirksmode.com
		function getPageHeight() {
			var windowHeight;
			if (self.innerHeight) {	// all except Explorer
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		}
		
		// listen for keypresses and handle the event
		function keypress(e) {
			//console.log(e.keyCode);
			if (e.keyCode == 27) hide();
		};
		
		// hide and remove the overlayBox from DOM
		function hide() {
			$doc.unbind('keydown', keypress);
			$win.unbind('resize');
			if( inlineParent ) {
				inlineParent.append( $overlayContent.html() );
				inlineParent = null;
			}
			if( $overlayBox.find('.overlay-nav').length != 0 ) {
				$overlayNav.unbind('click').remove();
			}
			$overlayBox.fadeOut( opts.duration/2, function(){
				$(this).remove().find('.overlay-close').unbind('click');
				$overlayContent.empty();
			});
			$overlayMask.fadeOut( opts.duration/2, function(){
				$(this).unbind('click').remove();
			});
		};
		
	};
	//
	// plugin defaults
	//
	$.fn.overlayBox.defaults = {
		padding: 40,
		initSize: 100,
		duration: 400,
		opacity: 1,
		onClose: function(){}
	};
//
// end of closure
//
})(jQuery);
