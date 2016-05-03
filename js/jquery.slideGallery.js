/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/

$(function(){

	$('.slidegallery').slideGallery();

});

//
// fadeGallery
//
(function($) {
	//
	// plugin definition
	//
	$.fn.slideGallery = function(options) {
		//debug(this);
		// build main options before element iteration
		var opts = $.extend({}, $.fn.slideGallery.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this),
				$frame = $( opts.frame, this ),
				$items = $( opts.items, this ),
				$nav = $( opts.nav, this ),
				autoplay = $this.hasClass('autogallery'),
				active = 0,
				timer = false;

			$nav.click(function( e ){
				jump( getPos( '#' + this.href.split('#').pop() ) );
				e.preventDefault();
			});
			
			$(opts.prev, this).click(function(e){
				prev();
				e.preventDefault();
			});
			
			$(opts.next, this).click(function(e){
				next();
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

				if( active === pos ) {
					return;
				}

				var $active = $items.eq(active),
					$target = $items.eq(pos),
					target_ID = '#'+$target.attr('id');

				$frame.stop().scrollTo( $target, opts.duration, {
					
					onAfter: function () {
						$nav
							.filter('.active')
								.removeClass('active')
							.end()
							.filter('[href$=' + target_ID + ']')
								.addClass('active');
					}
				});
				
				active = pos;
				
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
				$nav.eq( opts.start ).addClass('active');
				jump( opts.start );
				if( autoplay ) {
					clear();
					timer = setTimeout(next, opts.interval);
				}
			}
			
			init();

		});
	};
	//
	// plugin defaults
	//
	$.fn.slideGallery.defaults = {
		frame: '.frame',
		items: '.slide',
		nav: '.js-slidegallery-nav a',
		prev: '.js-slidegallery-arrows .prev a',
		next: '.js-slidegallery-arrows .next a',
		duration: 800,
		interval: 6500,
		start: 0
	};
//
// end of closure
//
})(jQuery);