

window.onload = function(){


$("ul.l").children("li").children("a").click(function(){ 
$(this).parent("li").children("dl").slideToggle("slow");
//alert("dd");

}
);






function NbeportSlide(boxClass,numClass,picClass,activeClass,timeSlide,auto,Width,Height){
    var boxClass = "."+boxClass;
    var numClass = "."+numClass;
    var picClass = "."+picClass;
	var s  = "."+ activeClass;
	//var w = parseInt($(boxClass).css("width"));
	//var w = document.getElementById("newsP").style.width;

	//var h = $(boxClass).height();

	//alert(w);
	var imgs = $(boxClass).find('img');
	var imgL = imgs.length;
	var pics = $(boxClass).find(picClass).find('li');
	var picL = $(boxClass).find(picClass).find('li').length;
	
	for(var i =0;i<imgL;i++){//遍历，给每个img设置宽度和高度
	imgs.eq(i).width(Width);//图片宽度
	imgs.eq(i).height(Height);	////图片高度
	}
	//alert(imgs.eq(0).width());
	if(auto==true) autokey=false;
	if(auto==false) autokey=true;//判断鼠标位置，当鼠标在新闻图片上的时候，停止自动事件函数

    $(numClass).children('li').click(function(){   //添加序号点击事件
//    autokey=false;
 //   if(auto=='') autokey=false;
	if(auto==true) autokey=false;
	if(auto==false) autokey=true;
    var p =$(numClass).children('li').index($(this));
    $(numClass).children('li').removeClass(activeClass);
    $(this).addClass(activeClass);
	
	$(picClass).children('li').hide();
	$(picClass).children('li').eq(p).fadeIn(200);
	
  });  
  
    $(".pic").mouseover(function(){  autokey=true;});  //这里是始终的，无论true还是false，鼠标在图片上，图片都不滚动。鼠标移到新闻图片上面，给auto赋值true，即图片不自动滚动
    $(".pic").mouseout(function(){ autokey=false;if(auto==false) autokey=true;});  //鼠标移出新闻图片    ，给auto赋值false，图片恢复自动滚动

    var MyTime = setInterval(function(){
		  if(autokey) return;	//判断auto的值，如果为true，直接返回，放弃本次循环时间，等待下一个时间点，如果还是为true，继续返回。                 
	       var L = $(numClass).children('li').length-1;
		   var p = $(numClass).children('li').index($(s));
		   if(p==L){p=-1;}
		  // var m ="'"+action+"'";
		   $(numClass).children('li').eq(p+1).trigger("click")		 
		   
	    } , timeSlide);

}//函数结尾
/***********图片滚动创建完毕*********************/
/** 参数使用说明
   function NbeportSlide(boxClass,numClass,picClass,activeClass,timeSlide,auto,Width,Height)

记住这里的容器必须为类，即class！！！！
boxClass：放新闻滚动的这个容器div名字：如"box",
numClass：序号容器：如"num"
picClass：图片展示容器，图片一张一张滚动：
activeClass：当前状态的序号样式
timeSlide：定时滚动
auto：是否定时滚动
Width:容器宽度（内部图片）
Height:容器高度（内部图片）
****/



 NbeportSlide("show","num","pic","cur",2000,true,613,250); 	

	  

/*	  
 
   function Scrol0(){
    var n=26;
    var nL='#'+arguments[0];
    var m=arguments.length;	
	var mL = arguments[1].length;
	var x = arguments[1];

	  $(nL).append("<em class='m2'><i class='x' ></i></em>");
    for(var i =1;i<mL-1;i++)  {
      $(nL).append("<em class='m'><i class='x' ></i></em>");
     }$(nL).append("<em class='m3'><i class='x' ></i></em>");
      for(var i =0;i<mL;i++)  {	
      $(nL).find("i").eq(i).animate({top:"-" +x.charAt(i)*n+"px"},3000);
  }

 }
*/ 
   function Scrol0(m){
      
    //var nSpan = $(m);

		var nSpan = $("table").find(m);
     	var nNum =  nSpan.attr("nbeportNum");




    //var nNum = $(this).attr("nbeportNum");
    var n=26;
   // var nL='#'+arguments[0];
    //var m=arguments.length;	
	var mL = nNum.length;
	//alert(nNum);
	if(nNum==''){nNum ="00";mL = nNum.length;}
	
	
	if(mL==1){
	   nNum =0+nNum;
	   mL = nNum.length;
	    
    }
	
	//var x = arguments[1];
	  nSpan.append("<em class='m2'><i class='x' ></i></em>");
    for(var i =1;i<mL-1;i++)  {
      nSpan.append("<em class='m'><i class='x' ></i></em>");
     }
	 
	 
	 nSpan.append("<em class='m3'><i class='x' ></i></em>");
      for(var i =0;i<mL;i++)  {	
      nSpan.find("i").eq(i).animate({top:"-" +nNum.charAt(i)*n+"px"},3000);
  }

 }

/* 这里是三个滚动数据的函数设置,昨天加班终于把这块做成动态了，而且把报文数量也整合成字符串形式啦！*/	


/*
Scrol0("d1",3,4,5,6,9,9);
Scrol0("d2",3,4,5,6,6,9,9);
Scrol0("d3",3,4,5,6,6);


*/
/* 这里是三个滚动数据的函数设置  end*/	
//alert($('.nbeportScr').scrollTop());
//alert( $('.nbeportScr1').height());

function nbeportScroll(mm){
 var n = '#'+mm;
  var speed=20;
  // alert( $('.nbeportScr2').html());

 var xval =  $(n).children('.nbeportScr1').html();
 var xchild = $(n).children('.nbeportScr1').children('li');
 var xlength =(xchild.length)*25+(xchild.length)*2;
 //alert (xlength);	

 $(n).children('.nbeportScr2').html(xval);
   var m=0;
 //     $('.nbeportScr').scrollTop(30);
   function Marquee(){
   
   if($(n).scrollTop()==xlength){
   $(n).scrollTop(0);
   m=0;}
   else{
   m++;
   $(n).scrollTop(m);
   }
   }
 //  alert(demo1.offsetHeight);
   var MyMar;
   $(n).parent(".panel").mouseout(function() {clearInterval(MyMar)});
   $(n).parent(".panel").mouseover(function() {MyMar=setInterval(Marquee,speed)})


}
 

 
nbeportScroll('nbeportScra');
nbeportScroll('nbeportScrb');
nbeportScroll('nbeportScrc');
nbeportScroll('nbeportScrd');

function NbeportTips(father,son){

   $(father).find(son).mouseover(function(){
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
   }).mouseout(function(){
    $('#tip').remove();
   }).mousemove(function(e){
      $('#tip').css({"top":(e.pageY-70)+"px","left":(e.pageX-30)+"px"})
   })   
   }
  NbeportTips('.leftlayout','.btn_gray,.btn') 
Scrol0("#d1");
Scrol0("#d2");
Scrol0("#d3");

}


  

