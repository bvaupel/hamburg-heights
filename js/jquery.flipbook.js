/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/




//
// create closure
//
(function($) {
	//
	// plugin definition
	//
	$.fn.flipthrough = function(options) {
		// console.log("flipthrough");
		// build main options before element iteration
		var opts = $.extend({}, $.fn.flipthrough.defaults, options),
			instance = 1;
		
		// iterate and reformat each matched element
		return this.each(function() {
			var 
				$this = $(this),
				o = $.extend({}, opts, $this.data()),
				$parent = $('<div>'),
				$dragger = $('<div>'),
				$progressBg = $('<div></div>'),
				$progressBar = $('<div></div>'),
				$overlay = $('<div></div>'),
				dragEvents = {},
				sensibility = (o.sensibility) ? o.sensibility : o.cycle * 0.036,
				imgList = [],
				imgArr = [],
				stripes = 0,
				cache = [],
				oHeight = $this.height(),
				oWidth = $this.width(),
				totalProgress = 0,
				loaded = false,
				tempIndex = 0,
				currentIndex = 0,
				rotateAxis = 0,
				rotateToIndex = 0,
				rotateToTime = 0,
				rotateToCounter = 0,
				rotateToDistance = 0,
				rotateToInterval = null,
				refX = 0,
				saveDistance = 0,
				rotate = false,
				poster = ( $this.data('poster') ) ? $this.data('poster') : false ,
				$hotspotParent = $this.siblings( o.hotspotParent ),
				hasHotspots = ( $hotspotParent.length > 0 ),
				hotspotsIdPrefix = 'hotspot-' + instance,
				hotspotAxesClass = ['hotspot-axis-0','hotspot-axis-1','hotspot-axis-2','hotspot-axis-3'];
			
			//console.log("o.suffix > " + o.suffix);
			
			for ( var x=0; x<o.frames; x++ ) {
				if (x<10) {
					x = '00'+x;
				} else if (x<100) {
					x = '0'+x;
				}
				imgList.push($this.attr('data-src') + x  + o.suffix);	
			}
			
			if (o.direction == 'backward') {
				imgList.reverse();
			}
			
			for ( var x=1; x<=o.cycle; x++ ) {
				for ( var y=0; y<imgList.length; y++ ) {
					imgArr.push(imgList[y]);
				}
			}

			stripes	= $this.width()/imgList.length;
			rotateAxis = imgArr.length/8;
			
			
			
			
			/** LOADER **/
			$parent.css({width:'100%', height:'100%', overflow:'hidden', position:'relative'});
			$this.wrap($parent).css({position:'relative',top:0,left:0});
			$parent = $this.parent();

			$progressBg.css({width:$this.parent().width()-200, height:3, backgroundColor:'grey', position:'absolute','bottom':60,left:100 }).addClass('progressBg');
			$progressBar.css({width:0, height:3, backgroundColor:'white', position:'absolute','bottom':60,left:100 }).data('progress',0).addClass('progressBar');
			var loadWidth = $this.parent().width()-200;
			
			if ( poster ) {
				$overlay.append('<img src="' + poster + '">');
			}
			$overlay.css({cursor:'wait', width:$parent.width(), height:'100%',  position:'absolute', top:0, left:0 }).addClass('overlay');

			//Nasty overlay capturing all the events :P
			$overlay.click(function(e) { e.preventDefault(); e.stopPropagation(); });
			$overlay.mousedown(function(e) { e.preventDefault(); e.stopPropagation(); });

			$dragger.css({height:'100%', width:'100%', backgroundColor:'none', position:'absolute', top:'0', left:'0'});
			$dragger.addClass("dragger");
			$parent.append($dragger);
			
			$parent.append($overlay).append($progressBg).append($progressBar);
			
			$this.css({cursor:'all-scroll'});

			$.each(imgList, function(index, record) {
				var $o = $('<img>').attr('src',record).load(function() {
					if (index>tempIndex) {
						tempIndex = index;
						//$(this).attr('src', $(this).attr('src'))
					}	
					totalProgress++;
					var newWidth = (totalProgress/imgList.length)*loadWidth;
					//console.log("newWidth  > " + newWidth );
					$progressBar.stop(true,true).animate({width:newWidth},250);
					if (totalProgress == imgList.length-1) {
						loaded = true;
						if(!o.touch){
							$dragger.remove();
						}
						if ( poster ) {
							$this.css({ visibility: 'visible'});
							$parent.find('.progressBar, .progressBg').remove()
							$parent.find('.overlay').delay(150).fadeOut(1000, function () {
								$(this).remove();
								// dragger für IPod hinzufügen
								if ( hasHotspots ) {
									showHotspots();
								}
							});
						} else {
							$parent.find('.overlay, .progressBar, .progressBg').remove();
							if ( hasHotspots ) {
								showHotspots();
							}
						}
					}
				});
				cache.push($o); 
			});

			if ( hasHotspots ) {
				initHotspots();
			}

			// iterate over hotspots an build css for different axes positions
			function initHotspots() {
				var theHead = document.getElementsByTagName('head')[0],
					cssNode = document.createElement('style'),
					hotspotsCSS = '',
					tmpHotspots = $hotspotParent.find( o.hotspot ),
					hotspotsAmount = tmpHotspots.length,
					axesCount = hotspotAxesClass.length;
				
				hideHotspots();
				
				for ( var s = 0; s < hotspotsAmount; s++ ) {
					var theHotspot = tmpHotspots.eq(s),
						theHotspotPos = theHotspot.data('position'),
						theHotspotId = hotspotsIdPrefix + '-' + s;
					
					// reset hotspot
					theHotspot.removeAttr('style').attr( 'id', theHotspotId );
					
					for ( var a = 0; a < axesCount; a++ ) {
						var theAxis = axesCount[a],
							thePos = theHotspotPos[a];
						hotspotsCSS += ' .' + hotspotAxesClass[a] + ' #' + theHotspotId + ' { left: ' + thePos.x + 'px; top: ' + thePos.y + 'px; }';
					}
				}
				
				// add styles to head cross browser
				cssNode.setAttribute('type', 'text/css');
				theHead.appendChild(cssNode);
				if (cssNode.styleSheet) { // IE
					cssNode.styleSheet.cssText = hotspotsCSS;
				} else { // the world
					cssNode.appendChild(document.createTextNode(hotspotsCSS));
				}
				
			}
			
			function showHotspots() {
				var caxis = Math.round(currentIndex/rotateAxis);
				
				if (caxis == 0) {
					caxis = 4-1;
				} else if (caxis <= 4) {
					caxis = caxis-1;
				} else if (caxis > 4) {
					caxis = caxis-4-1;
				}
				$hotspotParent.removeClass( hotspotAxesClass.join(' ') ).addClass( hotspotAxesClass[caxis] ).stop().show(); //fadeTo(400,1);
			}
			
			function hideHotspots() {
				$hotspotParent.stop().hide(); //fadeTo(0,0);
			}
			
			function rotateInViewport(newDistance) {
				var newIndex = currentIndex + newDistance;
				
					//console.log("newIndex >  " + newIndex);
				
				if(o.oneWay) { 
					if (newIndex < 0) { newIndex = 0; }
					if(newIndex > imgArr.length/o.cycle-1) newIndex = imgArr.length/o.cycle - 1; 
				}
				
				if (newIndex < 0) { newIndex = imgArr.length+newIndex; }
				
				//console.log("newIndex >  " + newIndex);
				
				newIndex = newIndex % imgArr.length;
				
				if (newIndex == currentIndex) {
					return;
				}
				
				$this.attr('src', imgArr[newIndex]);
				tempIndex = newIndex;
			}
			
			function rotateToPosition(targetPosition) {
				tempIndex = currentIndex;
				rotateToTime = Math.abs(currentIndex-targetPosition); 
				rotateToCounter = 0; 
				rotateToDistance = targetPosition-currentIndex;
				rotateToInterval = setInterval(rotateTo, o.rotateToSpeed);
			}
			
			function rotateTo() {
				  if (rotate == false) {
					var intIndex;
					
					if ( Math.abs(rotateToDistance) > 1 ) {
						intIndex = Math.round(easeOutQuad(rotateToCounter, tempIndex, rotateToDistance, rotateToTime));
					} else {
						intIndex = currentIndex+rotateToDistance;
					}
					
					if (intIndex != currentIndex ){
						$this.attr('src', imgArr[intIndex]);
						currentIndex = intIndex;
					}
				  	
					rotateToCounter = rotateToCounter + 1;
				  	
					if (rotateToCounter >= rotateToTime) {
						tempIndex = currentIndex;
					 	clearInterval(rotateToInterval);
					 	if ( hasHotspots ) {
							showHotspots();
						}
					}
				}
				else {
					clearInterval(rotateToInterval);
					if ( hasHotspots ) {
						showHotspots();
					}
				}
			}
			
			// t: current time, b: begInnIng value, c: change In value, d: duration
			function easeOutExpo (t, b, c, d) {
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			}
			
			function easeOutQuad (t, b, c, d) {
				return -c *(t/=d)*(t-2) + b;	
			}
			
			
			// build drag handlers
			function doStart(e) {
				$that = $(this);
				
				if( !o.touch ) {
					$(document.body).bind('mouseup mouseleave',function(e) {
						$that.trigger('mouseup');
					});
					e.preventDefault();
				} else {
				
					
				
				}
				
				if ( hasHotspots ) {
					hideHotspots();
				}
				
				if(!o.touch){
					refX = e.pageX;
				}
				else{
					// nothing because starts everytime at 0;	
				}
				
				saveDistance = 0;
				rotate = true;
				
			}
			
			function doDrag(e) {
				
				if (rotate == true)
				{	
					var distance = 0;
					if(!o.touch){
						distance = (e.pageX > 0) ? e.pageX - refX : e.pageX + refX ;
						e.preventDefault();
					}else{
						distance = $dragger.position().left;
					}
					distance = Math.floor(distance*sensibility);
					//console.log(distance + " > " + saveDistance);
					if(distance != saveDistance) {
						saveDistance = distance;
						rotateInViewport(distance);
					}
					
				}
				
			}
			
			function doStop(e) {
				
				if( !o.touch ) {
					$(document.body).unbind('mouseup mouseleave');
					e.preventDefault();
				}
				$dragger.css({left:0});
				rotate = false;
				currentIndex = tempIndex;
				if ( hasHotspots ) {
					rotateToPosition(Math.round(currentIndex/rotateAxis)*rotateAxis);
				}
				if(o.oneWay) {
					rotateToPosition(0);
				}
				
			}
			
			if ( !o.touch ) {
				
				$(this).mousedown(doStart).mousemove(doDrag).mouseup(doStop);
				
			} else {

				$dragger.touch({axis:"x", range_x: [-928, 928*2] , range_y:[0, 0],  start:doStart, stop:doStop, drag:doDrag});
				
			
			}
		
		});
		
		// increment trough each instance
		instance++;
	};
	
	//
	// plugin defaults
	//
	$.fn.flipthrough.defaults = {
		suffix: '.jpg',
		touch: false,
		frames: 100,
		hotspotParent: '.labelspots',
		hotspot: '.spot',
		cycle: 1,
		direction: 'forward',
		sensibility: false,
		oneWay: false, 
		rotateToSpeed: 40
		
	};

//
// end of closure
//
})(jQuery);


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
	$.fn.flipthroughReplace = function(options) {
		
		// build main options before element iteration
		var opts = $.extend({}, $.fn.flipthroughReplace.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var 
				that = $(this),
				o = $.extend({}, opts, that.data());
			
			//console.log(o);
			that.on(o.event, function (e) {
				var parent = $(o.target).parents(o.parent),
					newVr = '<img class="flipthrough" id="' + o.target.replace('#','') + '" src="' + o.path + o.src + '000.jpg" data-src="' + o.path + o.src + '">';
				$(o.target).parent().remove();
				parent.prepend(newVr).find(o.target).flipthrough(o.options);
				//console.log(newVr);
			});
			
		});
	};
	//
	// plugin defaults
	//
	$.fn.flipthroughReplace.defaults = {
		path: '/',
		event: 'click',
		parent: '.flipbook',
		target: '.flipbook',
		options: {}
	};
//
// end of closure
//
})(jQuery);
