//
// jQuery Touch Plugin
//
(function($) {
	//
	// plugin definition
	//
	$.fn.touch = function(options) {

		// build main options before element iteration
		var opts = $.extend({}, $.fn.touch.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			// default variables
			var
				self = this,
				$self = $(this),
				$viewport = $self.parent(),
				_offX = null,
				_offY = null,
				_dragx = ( opts.axis == 'y' ) ? false : true ,
				_dragy = ( opts.axis == 'x' ) ? false : true ,
				_dragging = false,
				_animate = opts.animate,
				_width = 0,
				_height = 0,
				_left = 0,
				_top = 0,
				_xspeed = 0,
				_yspeed = 0,
				_viewport_width = $viewport.width(),
				_viewport_height = $viewport.height(),
				_boundX = [ -opts.range_x[1] + _viewport_width, -opts.range_x[0] ],
				_boundY = [ -opts.range_y[1] + _viewport_height, -opts.range_y[0] ];
				
				
			
			// add eventhandlers
			this.ontouchstart = touchstart;
			this.ontouchend = touchend;
			this.ontouchmove = touchmove;
			
			//
			// private functions
			//
			
			function touchstart(e) {
				_xspeed = 0;
				_yspeed = 0;
				_viewport_width = $viewport.width();
				_viewport_height = $viewport.height();
				
				_boundX[0] = -opts.range_x[1] + _viewport_width;
				_boundY[0] = -opts.range_y[1] + _viewport_height;
				
				console.log('_boundX[0]: '+_boundX[0]+' _boundX[1]: '+_boundX[1]);
				console.log('_viewport_height: '+_viewport_height+' _viewport_width: '+_viewport_width);
				
				$(e.changedTouches).each(function(){
					var _tmpLeft = parseInt($self.css('left')),
						_tmpTop = parseInt($self.css('top')),
						curLeft = (_tmpLeft == 'auto') ? this.pageX : _tmpLeft,
						curTop = (_tmpTop == 'auto') ? this.pageY : _tmpTop;
					
					//console.log('start');
					
					if( !_dragging ){
						_offX = this.pageX - _tmpLeft;
						_offY = this.pageY - _tmpTop;
						_left = (e.pageX - curLeft);
						_top = (e.pageY - curTop);
						_dragging = [_left,_top];
					}
				});
				
				// call start callback
				opts.start();
			};
	
			function touchmove(e){
				
				
				if(_dragging && _animate) {
					var _tmpLeft = parseInt($self.css('left')),
						_tmpTop = parseInt($self.css('top')),
						_lastleft = ( isNaN(_tmpLeft) ) ? 0 : _tmpLeft,
						_lasttop = ( isNaN(_tmpTop) ) ? 0 : _tmpTop ;
				}
				
				$(e.changedTouches).each(function(){
					
					e.preventDefault();
					
					var _newX = this.pageX - _offX,
						_newY = this.pageY - _offY;
					
					if ( !opts.range_x ) {
						_left = _newX;
					} else {
						if		( _newX >= _boundX[0] && _newX <= _boundX[1] )	_left = _newX;
						else if	( _newX > _boundX[1] )							_left = _boundX[1];
						else if	( _newX < _boundX[0] )							_left = _boundX[0];
					}
					
					if ( !opts.range_y ) {
						_top = _newY;
					} else {
						if		( _newY >= _boundY[0] && _newY <= _boundY[1] )	_top = _newY;
						else if	( _newY > _boundY[1] )							_top = _boundY[1];
						else if	( _newY < _boundY[0] )							_top = _boundY[0];
					}
					
					//console.log('left: ' +_left+ ' top: '+_top)
					
					if( _dragging ) {
						
						if(_animate){
							_xspeed = Math.round((_xspeed + Math.round( _left - _lastleft))/1.5);
							_yspeed = Math.round((_yspeed + Math.round( _top - _lasttop))/1.5);
						}
						
						if(_dragx || _dragy) self.style.position = 'absolute';
						if(_dragx) self.style.left = _left+'px';
						if(_dragy) self.style.top = _top+'px';
						
						
					}
				});
				
				// call drag callback
				opts.drag();
			};
	
			function touchend(e) {
				$(e.changedTouches).each(function() {
					if( !e.targetTouches.length ) {
						_dragging = false;
						if( _animate ) {
							var _tmpLeft = parseInt($self.css('left')),
								_tmpTop = parseInt($self.css('top'));
							
							_left = (_tmpLeft == 'auto') ? this.pageX : _tmpLeft;
							_top = (_tmpTop == 'auto') ? this.pageY : _tmpTop;
							
							var animx = (_dragx) ? (_left+_xspeed)+'px' : _left+'px';
							var animy = (_dragy) ? (_top+_yspeed)+'px' : _top+'px';
							
							if( _dragx || _dragy ) $self.animate({ left: animx, top: animy }, 'fast');
						}
					}
				});
				
				// call stop callback
				opts.stop();
			};
			
			// call create callback
			opts.create();
		});
		
	};

	//
	// plugin defaults
	//
	$.fn.touch.defaults = {
		animate: false,
		axis:'',
		range_x:null,
		range_y:null,
		create:function(){},
		start:function(){},
		drag:function(){},
		stop:function(){}
	};
//
// end of closure
//
})(jQuery);
