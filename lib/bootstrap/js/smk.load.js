	(function ($) {
		 window.Tuy = window.Tuy || {};  //命名空间
		 Tuy.load = {};
		 Tuy.load.show = function(img,title){
					var $bjbox = $('<div class="showbjbox"></div>');
					var $popup = $('<div class="openboxs-mask zoomInDown"></div>');

					var $showModSuc = $('<span class="tip-dialog"><img src="'+ img + '"/></br>' +title+'</span>');
					//$showModSuc.html('<div id="circularG"><div id="circularG_1" class="circularG"></div><div id="circularG_2" class="circularG"></div><div id="circularG_3" class="circularG"></div><div id="circularG_4" class="circularG"></div><div id="circularG_5" class="circularG"></div><div id="circularG_6" class="circularG"></div><div id="circularG_7" class="circularG"></div><div id="circularG_8" class="circularG"></div></div>'+)
					//$showModSuc.html('11')
					var nums = $("body").find(".openboxs-mask");
					if(nums.length == 0){
						$("body").append($bjbox).append($popup);
						$popup.append($showModSuc);
					};		
		 }	 	 	 
		 Tuy.load.hide = function(){
					$(".openboxs-mask,.showbjbox").remove();	
		 }	 	 
	})(jQuery, window);
	
	