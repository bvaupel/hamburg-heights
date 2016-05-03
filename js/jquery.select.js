/* 
	Author: Christian Hermann Quinders
*/

$(function(){

	$('.fn-select').select();

});


//
// create closure
//
(function($) {
	//
	// plugin definition
	//
	$.fn.select = function(options) {
		
		// build main options before element iteration
		var opts = $.extend({}, $.fn.select.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var 
				$this = $(this),
				$label = $( opts.label, this ),
				$options = $( opts.options, this ),
				$trigger = $this.parent().find( opts.trigger );
				
			$label.click(function(e){
				toggleSelect();
				e.preventDefault();
			});
			
			if( opts.submit ) {
				$options.click(function(e) {
					$label.html( $(this).html() );
					toggleSelect();
					e.preventDefault();
				});
				
				$trigger.click(function(e){
					var target = $label.find('a').attr('href');
					console.log( target );
					if( target != '#' ) {
						window.location.href = target;
					}
					e.preventDefault();
				});
			}
			
			function toggleSelect() {
				$this.toggleClass('fn-select-expanded');
			}
			
			function init() {
				$label.html( $options.filter('.selected').html() );
			}
			
			init();
			
		});
	};
	//
	// plugin defaults
	//
	$.fn.select.defaults = {
		label: '.fn-select-label',
		options: '.select-option',
		trigger: '.fn-select-trigger',
		submit: true
	};
//
// end of closure
//
})(jQuery);