// JavaScript Document
$(function(){


//产品点击进入详情页
$('.hot_list li,.product li').bind('click',function(){
//window.open($(this).attr('productlink'))
try{
if($(this).attr('productlink')=='')   //当属性值为空时报错，目前只丢出空值错误。
throw "Err1"
if(typeof ($(this).attr('productlink'))=='string')
throw "Success"
}
catch(e){
if(e=="Err1")
alert('亲，没有对应的详情页')
if(e=="Success")
location.href=$(this).attr('productlink')
}
});




//--------地区选择--------------//
	elementHover("#J_area-box",null,"areaHover");//加载主菜单js
	elementHover("#J_area-box .area-item",null,"subareaHover");	
function elementHover(ele,eleShow,hover){
	$(ele).hover(
		function(){
			$(this).addClass(hover);
			$(eleShow).fadeIn("slow");
		},
		function(){
			$(this).removeClass(hover);
			$(eleShow).fadeOut("slow");
		}
	);
}

})

/*******/
//resizeWindow();
$(window).bind("resize", resizeWindow);
        function resizeWindow(e){
            var newWindowWidth = $(window).width();
			var box = ".menu";
			//var boxH = boxHight($(box));
            if(newWindowWidth > 300){
				$(box).each(function() {
					var infobox = $(this).find(".infoBox");
					var menuW = $(this).width();
					var j = $(infobox).length;
					
					$(infobox).each(function() {
							$(this).css("height","auto");
						}); //重设高度
					
					if( j > 1){ //一行有多个BOX时动行
						var boxH;
						$(infobox).each(function() {
							var spv = 5; //水平间距
							var borderWidth = 0; //边框宽度x2
							var w = (menuW - spv * (j-1)) / j - borderWidth;
							$(this).width(w);
							
							if($(this).index() > 0){
								$(this).addClass("spmg--left");
							}//加间距
							
							var k = $(infobox).first().height();
							boxH = $(this).height() > k ? $(this).height() : k;
						});
						
						$(infobox).each(function() {
							$(this).height(boxH);
						}); //重设高度
					}
                });
				//resetAside();
			}
			else{
				$(box).find(".infoBox").each(function() {
				$(this).css('width','30%')
						//$(this).css({"width":"auto","height":"auto"}).removeClass("spmg--left");
				});
				//resetAside();
			}
        }

