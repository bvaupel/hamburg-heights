/* 
	Author: Daniel Kremin, Christian Hermann Quinders
*/

$(function(){

	$('.flipthrough').flipthrough({cycle:2, direction:'backward'});

});


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
		var opts = $.extend({}, $.fn.flipthrough.defaults, options);
		
		// iterate and reformat each matched element
		return this.each(function() {
			var 
				$this = $(this),
				$parent = $("<div>"),
				$progressBg = $("<div></div>"),
				$progressBar = $("<div></div>"),
				$overlay = $("<div></div>"),
				sensibility = (opts.sensibility) ? opts.sensibility : opts.cycle * 0.036,
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
				refX = 0,
				saveDistance = 0,
				rotate = false;
				
			
				for (var x=0; x<=99; x++){
					if(x<10) x = "00"+x;
					else if(x<100) x = "0"+x;
					imgList.push($this.attr('data-src') + x + ".jpg");	
				}	
				if (opts.direction == "backward") imgList.reverse();
				
				for (var x=1; x<=opts.cycle; x++){
					for (var y=0; y<imgList.length; y++){
						imgArr.push(imgList[y]);
					}
				}
				
				stripes	= $this.width()/imgList.length ;
			
		/** LOADER **/
			$parent.css({width:"100%", height:"100%", overflow:"hidden", position:"relative"});
			$this.wrap($parent).css({position:"relative",top:0,left:0});
			$parent = $this.parent();
		
			$progressBg.css({width:$this.width()-200, height:3, backgroundColor:"grey", position:"absolute","bottom":60,left:100 }).addClass("progressBg");
			$progressBar.css({width:0, height:3, backgroundColor:"white", position:"absolute","bottom":60,left:100 }).data("progress",0).addClass("progressBar");
			var loadWidth = $progressBg.width();
		
			$overlay.css({cursor:"wait", width:$parent.width(), height:"100%",  position:"absolute","top":0,left:0 }).addClass("overlay");
		
			//Nasty overlay capturing all the events :P
			$overlay.click(function(e) { e.preventDefault(); e.stopPropagation(); });
			$overlay.mousedown(function(e) { e.preventDefault(); e.stopPropagation(); });
	
			$parent.append($overlay).append($progressBg).append($progressBar);
			$this.css({cursor:"all-scroll"});
	
			$.each(imgList, function(index, record) {
				var $o = $("<img>").attr("src",record).load(function() {
					if (index>tempIndex) {
						tempIndex = index;
						$this.attr("src", $(this).attr("src"))
					}	
					totalProgress++;
					var newWidth = (totalProgress/imgList.length)*loadWidth;
					$progressBar.stop(true,true).animate({width:newWidth},250);
					if (totalProgress == imgList.length-1)
					{	loaded = true;
						$parent.find(".overlay, .progressBar, .progressBg").remove();
					}
				});
				cache.push($o); 
			});
	
			function rotateInViewport(newDistance) {
				
					var newIndex = currentIndex + newDistance;
						//console.log(newIndex);
						if (newIndex < 0) {
							newIndex = imgArr.length+newIndex;
						}
						
						newIndex = newIndex % imgArr.length;
						
						if (newIndex == currentIndex)
							return;
						$this.attr("src", imgArr[newIndex]);
						tempIndex = newIndex;		
			}
			
			$this.mousemove(function(evt) {
				evt.preventDefault();
				if (rotate == true)
				{	
					if (evt.preventDefault) evt.preventDefault();
					
					var distance = (evt.pageX > 0) ? evt.pageX - refX : evt.pageX + refX ;
						distance = Math.floor(distance*sensibility);
						
					if(distance != saveDistance){
						saveDistance = distance;
						rotateInViewport(distance);
					}
				}	
			})
			
			$this.mousedown(function(e) {
					e.preventDefault(); 
					
					refX = e.pageX;
					saveDistance = 0;
					rotate = true;
					
					$("body").mouseup(function(e) {
						e.preventDefault();
						rotate = false;
						currentIndex = tempIndex;
						$("body").unbind("mouseup");
					}); 	
			});	
		});
	};
	
	
	//
	// plugin defaults
	//
	$.fn.flipthrough.defaults = {
		cycle: 1,
		direction: 'forward',
		sensibility: false
		
	};

//
// end of closure
//
})(jQuery);