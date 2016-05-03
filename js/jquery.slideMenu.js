/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/

$(function(){
		
		$('.globalmenu').slideMenu();

});

/* 
	Author: Christian Hermann Quinders
*/
//
// create closure
//
(function($) {
	//
	// plugin definition
	//
	$.fn.slideMenu = function(options) {
		
		// build main options before element iteration
		var opts = $.extend({}, $.fn.slideMenu.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this),
				$items = $( opts.items, this ),
				$spacer = $( opts.spacer, this );
			
			$items.mouseover(function(e){
				var $that = $(this),
					$submenu = $that.find( opts.submenu );
				
				$that
					.children()
						.filter('a')
						.stop()
						.animate({
							backgroundPosition:'(50% -7px)'
						}, opts.duration/opts.ratio );
				
				$spacer
					.stop()
					.animate({
						height: $submenu.height()
					}, opts.duration );
				
				$submenu
					.stop()
					.animate({
						marginTop: 0
					}, opts.duration , function() {
						$submenu.animate({
							opacity: 1
						}, opts.duration/opts.ratio );
					});
				
			}).mouseout(function(e){
				var $that = $(this),
					$submenu = $that.find( opts.submenu );
				
				$that
					.children()
						.filter('a')
						.stop()
						.animate({
							backgroundPosition:'(50% 0px)'
						}, opts.duration/opts.ratio );
				
				$spacer
					.stop()
					.animate({
						height: 0
					}, opts.duration );
				
				$submenu
					.stop()
					.animate({
						marginTop: $submenu.height()*-1,
						opacity: 0
					}, opts.duration );
				
			});
			
			function init() {
				$this
					.find( opts.submenu )
					.each(function(){
						$t = $(this);
						$t.css({
							marginTop: -1*$t.height() +'px',
							opacity: 0
						});
					})
					.parent()
						.css( 'visibility', 'visible' );
			}
			
			init();
			
		});
	};
	//
	// plugin defaults
	//
	$.fn.slideMenu.defaults = {
		items: '.slideout',
		submenu: '.submenu ul',
		spacer: '.spacer',
		duration: 250,
		ratio: 2.5
	};
//
// end of closure
//
})(jQuery);