// JavaScript Document
(function() {
	//var Alert = this.Alert || (this.Alert = {});
//	var $ = this.$ || this.jQuery;

	showAlert = function(textCon, fn) {
		// 生成提示框
		var $bjbox = $('<div class="showbjbox"></div>');
		var $popup = $('<div class="openboxs"></div>');
		var $yes_btn = $('<a href="#" class="ui-btn">确定</a>');
		var $no_btn = $('<a href="#" class="ui-btn no_btn ">取消</a>');
		var $btnBox = $('<div class="btn-box"></div>');
		var $showModSuc = $('<span class="tip-dialog">' + textCon + '</span>');
		var nums = $("body").find(".showbjbox");
		if(nums.length == 0){
			$("body").append($bjbox).append($popup);
			$popup.append($showModSuc);
			$btnBox.append($no_btn).append($yes_btn);
			$popup.append($btnBox);
		};
		$('.tip-dialog').text(textCon);
		$yes_btn.bind('click', function(event) {
			event.stopPropagation();
			$popup.hide();
			$bjbox.hide();
			if ($.isFunction(fn)) {
				fn();
			}
		});
		$no_btn.bind('click', function(event) {
			event.stopPropagation();
			$popup.hide();
			$bjbox.hide();
		});
		$bjbox.click(function(event){
			event.stopPropagation();
			$popup.hide();
			$bjbox.hide();
		});
		$popup.click(function(event){
			event.stopPropagation();
			$popup.show();
			$bjbox.show();
		});
		$(".showbjbox, .openboxs").show();
		//$popup.show();	
	};
	
	showWarn = function(textCon) {
		// 生成提示框
		var $popup = $('<div class="openboxs-warn"></div>');
		var $no_btn = $('<i class="nos_btn "></i>');
		var $btnBox = $('<div class="btn-box"></div>');
		var $showModSuc = $('<span class="tip-dialog">' + textCon + '</span>');
		var nums = $("body").find(".openboxs-warn");
		if(nums.length == 0){
			$("body").append($popup);
			$popup.append($showModSuc);
			$btnBox.append($no_btn);
			$popup.append($btnBox);
		};
		$('.tip-dialog').text(textCon);
		$no_btn.bind('click', function(event) {
			event.stopPropagation();
			$popup.hide();
		});
		
		$(".openboxs-warn").show();
		//$popup.show();	
	};
	
	showMask = function(textCon) {
		// 生成Load框
		var $bjbox = $('<div class="showbjbox1"></div>');
		var $popup = $('<div class="openboxs-mask"></div>');

		var $showModSuc = $('<span class="tip-dialog"><img src="../images/loading.gif">' + textCon + '</span>');
		var nums = $("body").find(".openboxs-mask");
		if(nums.length == 0){
			$("body").append($bjbox).append($popup);
			$popup.append($showModSuc);
		};
		//$('.tip-dialog').text(textCon);
		
		$(".openboxs-warn").show();
		//$popup.show();	
	};
	removeMask = function() {
		// 清除load框
		$(".openboxs-mask,.showbjbox1").remove();
		//$popup.show();	
	};
	
	/*showCode = function(textCon,img) {
		// 生成
		var $bjbox = $('<div class="showbjbox2 hide"></div>');
		var $popup = $('<div class="openboxs-code hide"></div>');
		var $no_btn = $('<i class="nos_btn "></i>');
		var $showModSuc = $('<span class="tip-dialog">'+ img + textCon +'</span>');
		var nums = $("body").find(".openboxs-code");
		if(nums.length == 0){
			$("body").append($bjbox).append($popup);
			$popup.append($showModSuc);
			$popup.append($no_btn);
		};

		$no_btn.bind('click', function(event) {
			event.stopPropagation();
			$popup.hide();
			$bjbox.hide();
		});
		
		//$popup.show();	
	};*/


	//this.Alert = Alert;
})(this);


