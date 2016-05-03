(function($) {
	//
	// plugin definition
	//
	$.fn.dragPanel = function(options) {
		
		// build main options before element iteration
		var opts = $.extend(true, {}, $.fn.dragPanel.defaults, options);
		
		// iterate matched elements
		return this.each(function() {
			// Use $self to reduce confusion about this.
			var $self = $(this),
				$draggable = $self.find( opts.drag_class ),
				$viewport = $draggable.parent(),
				$tiles = opts.wrap_tiles ? $draggable.find( opts.wrap_tiles ) : $draggable ,
				draggable_data = $draggable.data(),
				tile_data = {};
				
			// build tile data
			tile_data.path = ( draggable_data.path && draggable_data.path != '' ) ? draggable_data.path : null;
			tile_data.layers = ( draggable_data.overlay && draggable_data.overlay != '' ) ? draggable_data.overlay.split(',') : null;
			
			//console.log(tile_data);
			
			// extend options from html5 data attribute
			opts.tiles.range_col[0] = ( $self.data('left') ) ? $self.data('left') : opts.tiles.range_col[0];
			opts.tiles.range_col[1] = ( $self.data('right') ) ? $self.data('right') : opts.tiles.range_col[1];
			opts.tiles.range_row[0] = ( $self.data('top') ) ? $self.data('top') : opts.tiles.range_row[0];
			opts.tiles.range_row[1] = ( $self.data('bottom') ) ? $self.data('bottom') : opts.tiles.range_row[1];
			opts.tiles.start_col = ( $self.data('startleft') ) ? $self.data('startleft') : opts.tiles.start_col;
			opts.tiles.start_row = ( $self.data('starttop') ) ? $self.data('starttop') : opts.tiles.start_row;
			
			$draggable.css({
				position: 'relative',
				cursor: 'move'
			});
			
			// Override tile options based on draggable options.
			if (opts.draggable.axis == 'x') {
				opts.tiles.range_row = [opts.tiles.start_row, opts.tiles.start_row];
			} else if (opts.draggable.axis == 'y') {
				opts.tiles.range_col = [opts.tiles.start_col, opts.tiles.start_col];
			}
			
			// Creates the tile at (i, j).
			function create_tile(i, j) {
				if (i < opts.tiles.range_col[0] || opts.tiles.range_col[1] < i) {
					return;
				} else if (j < opts.tiles.range_row[0] || opts.tiles.range_row[1] < j) {
					return;
				}
				
				grid[i][j] = true;
				var x = i * opts.tiles.width;
				var y = j * opts.tiles.height;
				var $e = $tiles.append('<div></div>');
				
				
				
				var $new_tile = $e.children(':last');
				$new_tile.attr({
					'class': opts.tiles.class_name,
					'data-col': i,
					'data-row': j
				}).css({
					position: 'absolute',
					left: x,
					top: y,
					width: opts.tiles.width,
					height: opts.tiles.height
				});
	
				opts.tiles.oncreate($new_tile, i, j, tile_data);
			};
			
			// Updates the containment box wherein the draggable can be dragged.
			var update_containment = function() {
				// Update viewport info.
				viewport_width = $viewport.width(),
				viewport_height = $viewport.height(),
				viewport_cols = Math.ceil(viewport_width / opts.tiles.width),
				viewport_rows = Math.ceil(viewport_height / opts.tiles.height);
				
				// Create containment box.
				var half_width = opts.tiles.width / 2,
					half_height = opts.tiles.height / 2,
					viewport_offset = $viewport.offset(),
					viewport_draggable_width = viewport_width - opts.tiles.width,
					viewport_draggable_height = viewport_height - opts.tiles.height;
				
				var containment = [
					(-opts.tiles.range_col[1] * opts.tiles.width) + viewport_offset.left + viewport_draggable_width,
					(-opts.tiles.range_row[1] * opts.tiles.height) + viewport_offset.top + viewport_draggable_height,
					(-opts.tiles.range_col[0] * opts.tiles.width) + viewport_offset.left,
					(-opts.tiles.range_row[0] * opts.tiles.height) + viewport_offset.top,
				];
				
				//console.log("containment > " + containment[0] + " " + containment[1] + " " + containment[2] + " " + containment[3]);
				
//$draggable.draggable('option', 'containment', containment);
				
			};
			
			var update_tiles = function() {
				var $this = $draggable;
				var $parent = $this.parent();
	
				// Problem with .position() in Chrome/WebKit:
				// 		var pos = $(this).position();
				// So, we compute it ourselves.
				var pos = {
					left: $draggable.offset().left - $viewport.offset().left,
					top: $draggable.offset().top - $viewport.offset().top
				}
				
				var visible_left_col = Math.ceil(-pos.left / opts.tiles.width) - 1,
					visible_top_row = Math.ceil(-pos.top / opts.tiles.height) - 1;
	
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
			
			
			// Public Methods
			//-----------------
			
			$self.draggable = function() {
				return $draggable;
			};
			
			$self.disabled = function(value) {
				if (value === undefined) {
					return $draggable;
				}
				
				$draggable.draggable('option', 'disabled', value);
				
				$draggable.css({ cursor: (value) ? 'default' : 'move' });
			};
			
			$self.center = function(col, row) {
				
				var x = opts.tiles.width * col,
					y = opts.tiles.height * row,
					half_width = opts.tiles.width / 2,
					half_height = opts.tiles.height / 2,
					half_vw_width = $viewport.width() / 2,
					half_vw_height = $viewport.height() / 2,
					offset = $draggable.offset();
					
				var new_offset = { 
					left: -x - (half_width - half_vw_width), 
					top: -y - (half_height - half_vw_height)
				};
				
				if (opts.draggable.axis == 'x') {
					new_offset.top = offset.top;
				} else if (opts.draggable.axis == 'y') {
					new_offset.left = offset.left;
				}
				console.log("center > left > " + new_offset.left + " > top > " + new_offset.top);
				//$draggable.offset(new_offset);
				$draggable.css({'left': new_offset.left, 'top' :new_offset.top  });
				
				update_tiles();
			};
	
			// Setup
			//--------
			
			var viewport_width = $viewport.width(),
				viewport_height = $viewport.height(),
			
				viewport_cols = Math.ceil(viewport_width / opts.tiles.width),
				viewport_rows = Math.ceil(viewport_height / opts.tiles.height);
			
			
			/*$draggable.css({'left': - (opts.tiles.start_col * opts.tiles.width), 'top': - (opts.tiles.start_row * opts.tiles.height)});*/
			$draggable.offset({
				left: $viewport.offset().left - (opts.tiles.start_col * opts.tiles.width),
				top: $viewport.offset().top - (opts.tiles.start_row * opts.tiles.height)
			});
	
			var grid = {};
			for (var i = opts.tiles.start_col, m = opts.tiles.start_col + viewport_cols; i < m && (opts.tiles.range_col[0] <= i && i <= opts.tiles.range_col[1]); i++) {
				grid[i] = {}
				for (var j = opts.tiles.start_row, n = opts.tiles.start_row + viewport_rows; j < n && (opts.tiles.range_row[0] <= j && j <= opts.tiles.range_row[1]); j++) {
					create_tile(i, j);
				}
			}
			
			// The drag event handler.
			opts.draggable.drag = function(e, ui) {
				update_tiles();
			};
			
			opts.draggable.start = function(e, ui) {
			
			};
			
			opts.draggable.range_x = [ opts.tiles.range_col[0]*opts.tiles.width, (opts.tiles.range_col[1]+1)*opts.tiles.width ];
			opts.draggable.range_y = [ opts.tiles.range_row[0]*opts.tiles.height, (opts.tiles.range_row[1]+1)*opts.tiles.height ];
			
			if ( !opts.touch ) {
				$draggable.dragObject(opts.draggable);
			} else {
				$draggable.touch(opts.draggable);
			}
			
			// init legend
			if( opts.legend ) {
				$self.find( opts.legend ).click(function(e) {
					$self.toggleClass( 'show-' + $(this).data('target') );
					e.preventDefault();
				});
			}
			
			// init
			update_containment();
		});
	};
	
	//
	// defaults
	//
	$.fn.dragPanel.defaults = {
		drag_class: '.drag',
		wrap_tiles: '.tiles',
		legend: false,
		touch: false,
		tiles: {
			class_name: '_tile',
			width: 100,
			height: 100,
			start_col: 0,
			start_row: 0,
			range_col: [-1000000, 1000000],
			range_row: [-1000000, 1000000],
			oncreate: function($element, i, j, data) {
				
				// default create function
				if ( data.path ) {
					var node = '';
					node += '<div class="layer plan"><img src="' + data.path + i + '_' + j + '_map.jpg"></div>';
					if( data.layers ) {
						var omax = data.layers.length;
						for(var o=0; o<omax; o++) {
							node += '<div class="layer ' + data.layers[o] + '"><img src="' + data.path + i + '_' + j + '_map_' + data.layers[o] + '.png"></div>';
						}
					}
					$element.append( node );
				} else {
					$element.text(i + ',' + j);
				}
			}
		},
		draggable: {}
	};
	
})(jQuery);

$(function(){

	$('.infinitedrag').dragPanel({
		touch: Modernizr.touch,
		legend: '.legend li',
		tiles: {
			width: 200,
			height: 200,
			range_col: [-3,14],
			range_row: [-1,9]
		}
	});

});