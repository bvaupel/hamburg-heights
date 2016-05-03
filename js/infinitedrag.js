/*
 * jQuery Infinite Drag
 * Version 0.3
 * Copyright (c) 2010 Ian Li (http://ianli.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * Requires:
 * jQuery	http://jquery.com
 *
 * Reference:
 * http://ianli.com/infinitedrag/ for Usage
 *
 * Versions:
 * 0.3 - modified by Daniel Kremin for CADMAN
 * 0.2 - Added move.
 * 0.1 - Initial implementation.
 */

$(function(){

	$('.infinitedrag').infinitedrag({
		width: 200,
		height: 200,
		start_col: 0,
		start_row: 0
	});

});


//
// create closure
//
(function($) {
	//
	// plugin definition
	//
	$.fn.infinitedrag = function(options) {
		
		// build main options before element iteration
		var opts = $.extend({}, $.fn.infinitedrag.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this);
			
			var $draggable = $this.find(opts.dragger);
			var $tiles =  $this.find(opts.tiles);
			var $legend = $this.find(opts.legend);
			var $self = $draggable[0];
			opts.range_col = [$this.data("left"), $this.data("right")];
			opts.range_row = [$this.data("top"), $this.data("bottom")];
			opts.start_col = $this.data("startleft");
			opts.start_row = $this.data("starttop");
			
			$legend.find("li").click(function(e) {
				$this.toggleClass( 'show-' + $(this).data('target') );
				e.preventDefault();
			})
			
			var $viewport = $draggable.parent();
				$draggable.css({
					position: "relative",
					cursor: "move"
				});
			var overlays = $draggable.data('overlay').split(",");
			
				// Only X or Y axis
				if (opts.axis == "x") {
					opts.range_row = [opts.start_row, opts.start_row];
				} else if (opts.axis == "y") {
					opts.range_col = [opts.start_col, opts.start_col];
				}
			
			
				// Creates the tile at (i, j).
				function create_tile(i, j) {

					if (i < opts.range_col[0] || opts.range_col[1] < i) {
						return;
					} else if (j < opts.range_row[0] || opts.range_row[1] < j) {
						return;
					}
					
					grid[i][j] = true;
					var x = i * opts.width;
					var y = j * opts.height;
					var $e = $tiles.append('<div></div>');
		
					var $new_tile = $e.children(":last");
					$new_tile.attr({
						"class": opts.class_name,
						"data-col": i,
						"data-row": j
					}).css({
						position: "absolute",
						left: x,
						top: y,
						width: opts.width,
						height: opts.height,
					});
		
					opts.oncreate($new_tile, i, j);
				};
			
				// Updates the containment box wherein the draggable can be dragged.
				var update_containment = function() {

					// Update viewport info.
					viewport_width = $viewport.width(),
					viewport_height = $viewport.height(),
					viewport_cols = Math.ceil(viewport_width / opts.width),
					viewport_rows = Math.ceil(viewport_height / opts.height);
					
					// Create containment box.
					var half_width = opts.width / 2,
						half_height = opts.height / 2,
						viewport_offset = $viewport.offset(),
						viewport_draggable_width = viewport_width - opts.width,
						viewport_draggable_height = viewport_height - opts.height;
					
					var containment = [
						(-opts.range_col[1] * opts.width) + viewport_offset.left + viewport_draggable_width,
						(-opts.range_row[1] * opts.height) + viewport_offset.top + viewport_draggable_height,
						(-opts.range_col[0] * opts.width) + viewport_offset.left,
						(-opts.range_row[0] * opts.height) + viewport_offset.top
					];
					
					$draggable.draggable("option", "containment", containment);
				};
			
			
				var update_tiles = function() {
					var $this = $draggable;
					var $parent = $this.parent();
		
					// Problem with .position() in Chrome/WebKit:
					// 		var pos = $(this).position();
					// So, we compute it ourselves.
					var pos = {
						left: $this.offset().left - $parent.offset().left,
						top: $this.offset().top - $parent.offset().top
					}
		
					var visible_left_col = Math.ceil(-pos.left / opts.width) - 1,
						visible_top_row = Math.ceil(-pos.top / opts.height) - 1;
		
					for (var i = visible_left_col; i <= visible_left_col + viewport_cols; i++) {
						for (var j = visible_top_row; j <= visible_top_row + viewport_rows; j++) {
							if (grid[i] === undefined) {
								grid[i] = {};
							} else if (grid[i][j] === undefined) {
								create_tile(i, j);
							}
						}
					}
				};
				
				var fill_tile = function($element, i, j) {
					
					$element.append('<div class="layer plan"><img src="'+$draggable.data('path')+i+'_'+j+'_map.jpg"></div>');
					for(var o=0; o<overlays.length-1; o++){
						$element.append('<div class="layer '+overlays[o]+'"><img src="'+$draggable.data('path')+i+'_'+j+'_map_'+overlays[o]+'.png"></div>');
					}
					
				}
			
				// Public Methods
				//-----------------
				
				$self.draggable = function() {
					return $draggable;
				};
				
				$self.disabled = function(value) {
					if (value === undefined) {
						return $draggable;
					}
					
					$draggable.draggable("option", "disabled", value);
					
					$draggable.css({ cursor: (value) ? "default" : "move" });
				};
				
				$self.move = function(col, row) {
					var offset = $draggable.offset();
					var move = {
						left: col * opts.width,
						top: row * opts.height
					};
					
					var new_offset = {
						left: offset.left - move.left,
						top: offset.top - move.top
					};
					
					if (opts.axis == "x") {
						new_offset.top = offset.top;
					} else if (opts.axis == "y") {
						new_offset.left = offset.left;
					}
					
					var containment = $draggable.draggable("option", "containment");
					
					if (containment[0] <= new_offset.left && new_offset.left <= containment[2]
						&& containment[1] <= new_offset.top && new_offset.top <= containment[3]) {
						$draggable.offset(new_offset);
						update_tiles();	
					} else {
						// Don't let the tile go beyond the right edge.
						if (new_offset.left < containment[0]) {
							new_offset.left = containment[0];
						}
						
						// Don't let the tile go beyond the left edge.
						if (new_offset.left > containment[2]) {
							new_offset.left = containment[2];
						}
						
						$draggable.offset(new_offset);
						update_tiles();
					}
				};
				
				$self.center = function(col, row) {
					var x = opts.width * col,
						y = opts.height * row,
						half_width = opts.width / 2,
						half_height = opts.height / 2,
						half_vw_width = $viewport.width() / 2,
						half_vw_height = $viewport.height() / 2,
						offset = $draggable.offset();
						
					var new_offset = { 
						left: -x - (half_width - half_vw_width), 
						top: -y - (half_height - half_vw_height)
					};
					
					if (opts.axis == "x") {
						new_offset.top = offset.top;
					} else if (opts.axis == "y") {
						new_offset.left = offset.left;
					}
					
					$draggable.offset(new_offset);
					
					update_tiles();
				};
		
				// Setup
				//--------
				
				opts.oncreate = fill_tile;
				
				var viewport_width = $viewport.width(),
					viewport_height = $viewport.height(),
					viewport_cols = Math.ceil(viewport_width / opts.width),
					viewport_rows = Math.ceil(viewport_height / opts.height);
		
				$draggable.offset({
					left: $viewport.offset().left - (opts.start_col * opts.width),
					top: $viewport.offset().top - (opts.start_row * opts.height)
				});
		
				var grid = {};
				for (var i = opts.start_col, m = opts.start_col + viewport_cols; i < m && (opts.range_col[0] <= i && i <= opts.range_col[1]); i++) {
					grid[i] = {}
					for (var j = opts.start_row, n = opts.start_row + viewport_rows; j < n && (opts.range_row[0] <= j && j <= opts.range_row[1]); j++) {
						create_tile(i, j);
					}
				}
				
				// Handle resize of window.
				$(window).resize(function() {
					// HACK:
					// Update the containment when the window is resized
					// because the containment boundaries depend on the offset of the viewport.
					update_containment();
				});
				
				// The drag event handler.
				opts.drag = function(e, ui) {
					update_tiles();
				};
				
				$draggable.draggable(opts);
				
				update_containment();
			
		});
	};
	
	
	//
	// plugin defaults
	//
	$.fn.infinitedrag.defaults = {
		axis: "",
		class_name: "_tile",
		legend: ".legend",
		dragger: ".drag",
		tiles: ".tiles",
		width: 200,
		height: 200,
		start_col: 0,
		start_row: 0,
		range_col: [-3, 14],
		range_row: [-1, 9]
	};

//
// end of closure
//
})(jQuery);
