
$(document).ready(function(){

 $(".title").children(".pre,.nex").bind("mouseenter",function(){
 //	 $(this).css("background-color","#f8f8f8");
  $(".title").children(".pre").clearQueue();   
$(this).animate({width: '100px'},100);
$(this).children("span").css("display","block");
//$(this).children("span").css("display","block");

//  $(this).css("width", '100px');


 });
 
 
 
  $(".title").children(".pre,.nex").bind("mouseleave",
  function(){
  $(this).children("span").css("display","none");
  $(this).animate({width: '54px'});
  $(this).css("background-color","#fff");  

 });
   $(".title").children(".pre").bind("click",
     function()
	 {
	  $(".title").children(".box1").animate({left: '0'}, 1000,function(){$(".title").children(".pre").hide()});
	  $(".title").children(".box2").animate({left: '982'}, 1000);
	  $(".title").children(".box3").animate({left: '982'}, 1000);
	  $(".title").children(".box4").animate({left: '982'}, 1000);
	  $(".title").children(".box5").animate({left: '982'}, 1000);
	 
     });



      $(".title").children(".box1").children("a.a1,a.a2,a.a3,a.a4,a.a5").mouseover(
	  function(){$(this).animate({opacity: '0.6'}, "fast").animate({opacity: '1'}, 500);
	  $(this).css("color","#000")	  
	  });
	  
	  $(".title").children(".box1").children("a.a1").click(
	  function(){  
	  $(".title").children(".box1").animate({left: '-982'}, 1000);
	  $(".title").children(".box2").animate({left: '0'}, 1000,function(){ $(".title").children(".pre").show();}); 
	 
	  });
	  	  
		  $(".title").children(".box1").children("a.a3").click(
	  function(){  
	  $(".title").children(".box1").animate({left: '-982'}, 1000);
	  $(".title").children(".box5").animate({left: '0'}, 1000,function(){ $(".title").children(".pre").show();}); 
	 
	  });	 
	  
	  $(".title").children(".box1").children("a.a4").click(
	  function(){  
	  $(".title").children(".box1").animate({left: '-982'}, 1000);
	  $(".title").children(".box3").animate({left: '0'}, 1000,function(){ $(".title").children(".pre").show();}); 
	 
	  });	  
	  
	  $(".title").children(".box1").children("a.a5").click(
	  function(){  
	  $(".title").children(".box1").animate({left: '-982'}, 1000);
	  $(".title").children(".box4").animate({left: '0'}, 1000,function(){ $(".title").children(".pre").show();}); 
	 
	  });	 	  
	  
	  
  function Scrol(p1,p2,p3,p4,p5,p6,p7){
	  var n=22.7;
	  var k1 ="-" +p1*n+"px"
	  var k2 ="-" +p2*n+"px"
	  var k3 ="-" +p3*n+"px"
	  var k4 ="-" +p4*n+"px"
	  var k5 ="-" +p5*n+"px"
	  var k6 ="-" +p6*n+"px"
	  var k7 ="-" +p7*n+"px"
      $("i").eq(0).animate({top:k1},3000);
	  $("i").eq(1).animate({top:k2},3000);
      $("i").eq(2).animate({top:k3},3000);
      $("i").eq(3).animate({top:k4},3000);
 $("i").eq(4).animate({top:k5},3000); 
 $("i").eq(5).animate({top:k6},3000);
 $("i").eq(6).animate({top:k7},3000); 	 

 }
   function Scrol2(p1,p2,p3,p4,p5,p6,p7){
	  var n=22.7;
	  var k1 ="-" +p1*n+"px"
	  var k2 ="-" +p2*n+"px"
	  var k3 ="-" +p3*n+"px"
	  var k4 ="-" +p4*n+"px"
	  var k5 ="-" +p5*n+"px"
	  var k6 ="-" +p6*n+"px"
	  var k7 ="-" +p7*n+"px"
      $("i").eq(7).animate({top:k1},3000);
	  $("i").eq(8).animate({top:k2},3000);
      $("i").eq(9).animate({top:k3},3000);
      $("i").eq(10).animate({top:k4},3000);
 $("i").eq(11).animate({top:k5},3000); 
 $("i").eq(12).animate({top:k6},3000);
 $("i").eq(13).animate({top:k7},3000); 	 

 }
    function Scrol3(p1,p2,p3,p4,p5,p6,p7){
	  var n=22.7;
	  var k1 ="-" +p1*n+"px"
	  var k2 ="-" +p2*n+"px"
	  var k3 ="-" +p3*n+"px"
	  var k4 ="-" +p4*n+"px"
	  var k5 ="-" +p5*n+"px"
	  var k6 ="-" +p6*n+"px"
	  var k7 ="-" +p7*n+"px"
      $("i").eq(14).animate({top:k1},3000);
	  $("i").eq(15).animate({top:k2},3000);
      $("i").eq(16).animate({top:k3},3000);
      $("i").eq(17).animate({top:k4},3000);
 $("i").eq(18).animate({top:k5},3000); 
 $("i").eq(19).animate({top:k6},3000);
 $("i").eq(20).animate({top:k7},3000); 	 

 }


function Changeway(){

    $(".ship").children("a").eq(0).animate({left: '0px',top: '0px'}, "slow");
	$(".ship").children("em").eq(0).animate({left: '220px'}, "slow");
	
	
    $(".ship").children("a").eq(1).animate({left: '350px',top: '0px'}, "slow");
	$(".ship").children("em").eq(1).animate({left: '580px'}, "slow");
	
    $(".ship").children("a").eq(2).animate({left: '750px',top: '0px'}, "slow");


	$(".ship").children("em").eq(2).animate({left: '800px',top: '80px'}, "slow");	
	$(".ship").children("a").eq(3).animate({left: '750px',top: '150px'}, "slow");
	
    $(".ship").children("em").eq(3).animate({left: '800px',top: '220px'}, "slow");
    $(".ship").children("a").eq(4).animate({left: '750px',top: '280px'}, "slow");
	
	$(".ship").children("a").eq(5).animate({left: '350px',top: '280px'}, "slow");
    $(".ship").children("em").eq(4).animate({left: '580px',top: '280px'}, "slow");
	
	$(".ship").children("a").eq(6).animate({left: '0px',top: '280px'}, "slow");
	$(".ship").children("em").eq(5).animate({left: '220px',top: '280px'}, "slow");
	
}	
	 Changeway();
	
/* 这里是三个滚动数据的函数设置*/	
	
Scrol(3,4,5,6,7,9,1); Scrol2(3,4,5,6,7,9,7); Scrol3(3,4,5,6,7,9,5); 
/* 这里是三个滚动数据的函数设置  end*/	

function Changeposition(){
      
    var really = $(".ship").children("em").css("display");
   if(really=="block"){
    $(".ship").children("a").css("line-height","36px");
    $(".ship").children("em").css("display","none");

    $(".ship").children("a").animate({height: "36px"},"fast");
    $(".ship").children("a").eq(0).animate({left: '0px',top: '-30'}, "slow");	
    $(".ship").children("a").eq(1).animate({left: '0px',top: '30'}, "slow");	
    $(".ship").children("a").eq(2).animate({left: '0px',top: '90'}, "slow");
	$(".ship").children("a").eq(3).animate({left: '0px',top: '150'}, "slow");
    $(".ship").children("a").eq(4).animate({left: '0px',top: '210px'}, "slow");	
	$(".ship").children("a").eq(5).animate({left: '0px',top: '270px'}, "slow");	
	$(".ship").children("a").eq(6).animate({left: '0px',top: '330px'}, "slow",function(){    $(".ship").children(".dot").fadeIn(10,function(){$(".ship").children(".rightcontent").fadeIn(200);});});
}

}








$(".ship").children("a").click(function(){


 
   $(".ship").css("background-image","none");
   var p = $(".ship").children("a").index($(this));
   $(".ship").children("a").addClass("small");
   $(this).removeClass("small");$(this).addClass("active");
   Changeposition();

 });
 

 
  $(".static").click(function(){
      
      $(".ship").children("a").removeClass("small");
	  $(".ship").children("a").removeClass("active");
     
     $(".ship").children(".dot").hide();
     $(".ship").children(".rightcontent").hide() ;
	 $(".ship").children("a").animate({height: "55px"},"fast");
	  $(".ship").children("a").css("line-height","55px");
      Changeway();
	  $(".ship").children("em").show(200);
	  $(".ship").css("background-image","");

  });
	 
	 
});