function NbeportTips(father,son){

	   $(father).find(son).live("mouseover",function(){
		   var $tip=$('<div id="tip"><div class="t_box"><div><s><i></i></s><ul><li>数据状况：<span class="Date"></span></li><li class="w180">联网比例：<span class="per"></span><span class="content"><i id="percent"></i></span></li><li>更新频率：<span class="F"></span></li></ul></div></div></div>');
			  try{
			       var n = ($(this).attr("nbeporPer"))*100;
			       var nDate = $(this).attr("nbeporDate");
			       var nF = $(this).attr("nbeporF");
				   n = n.toFixed(0);
			       var m =(1- $(this).attr("nbeporPer"))*70;
				   if(isNaN(n)) throw "亲爱的电子口岸开发人员，这个百分比属性没有填写，请在当前元素的html标签里加上nbeporPer属性！";
		        }
				catch(err){alert(err)}
			  
			//  alert(m);
				
				
			  $('body').append($tip);  
			  $('.Date').html(nDate);
			  $('.F').html(nF);
			  $('.per').html(n+'%');	 
		      $('#tip').show('fast',function(){
		   
			  $('#percent').animate({right:m},500,function(){  
		      $('.per').css("visibility","visible")
		   
		   })
			  
			  
			  });
		   });
	   
	   $(father).find(son).live("mouseout",function(){
		    $('#tip').remove();
	   });
	   $(father).find(son).live("mousemove",function(e){
		      $('#tip').css({"top":(e.pageY-70)+"px","left":(e.pageX-30)+"px","z-index":"2000"})
	   });		   
		   
	
	
	
	
  
   }