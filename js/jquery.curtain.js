		$('.mod_tabs_vertical li')
			.mouseover(function(){
					if(!$(this).hasClass("active")) $(this).css("background-color", "#e5e5e5");
			})
			.mouseout(function(){
				if(!$(this).hasClass("active")) $(this).css("background-color", "#ededed");
			})
			.click(function(){
				event.stopImmediatePropagation();
				// alle ausblenden
				$('.mod_tabs_vertical li').find(".mouse-arrow").stop().animate({backgroundPosition:"(-24px 0px)"}, {duration:00});
				$('.mod_tabs_vertical li').css("background-color", "#ededed");
				$('.mod_tabs_vertical li').removeClass("active");
				
				$(this).addClass("active");
				$(this).css("background-color", "white");
				$(this).find(".mouse-arrow").stop().animate({backgroundPosition:"(-12px 0px)"}, {duration:100});
				$(".mod_tabs_viewer img").attr("src", $(this).find("img").attr("src").split(".")[0]+"_view.png");
			});
			
		/*CURTAIN*/
		
		$('.curtain div').css("width", "50%");
		
		$('.curtain_handle').mousedown(function(e) {
					e.preventDefault();
					$this = $(this);
					$parent = $this.parent();
					var left = $parent.position().left;
					$this.mousemove(function(evt) {
						var off = evt.pageX-left;
						if(off > 0 && off < $parent.width()){
							$this.css("left", off);
							$('.curtain div').css("width", $this.position().left);
						}
					})
					$("body").mouseup(function(e) {
						e.preventDefault();
						$('.curtain_handle').unbind("mousemove");
						$("body").unbind("mouseup");
					}); 	
		});
		
		/* MODULE PLANVIEWER */
		$('.mod_tabs_vertical li').find(".mouse-arrow").css("left", "100%").css("background-position","-24px");
		
		$('.mod_tabs_vertical li:first').addClass("active");
		$('.mod_tabs_vertical li:first').css("background-color", "#fff");
		$('.mod_tabs_vertical li:first').find(".mouse-arrow").stop().animate({backgroundPosition:"(-12px 0px)"}, {duration:200});