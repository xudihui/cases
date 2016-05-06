// JavaScript Document
$(function(){
      window.LeDao = window.LeDao || {}//命名空间
	
	   LeDao.init = function(){

	  }
		
	  LeDao.Id = function(el){
	  return document.getElementById(el);
	  }
	  LeDao.TimeDuce = function(time){   //李总，这里time格式如下：'2015/09/20 00:00:00'
		time = time || '2016/12/20 00:00:00';
		var fn = function(){
		var End= new Date(time);
		var Now = new Date();
		var t =End.getTime() - Now.getTime();
		var d=0,h=0,m=0,s=0;
		if(t>=0){
		  d=Math.floor(t/1000/60/60/24);
		  h=Math.floor(t/1000/60/60%24);
		  m=Math.floor(t/1000/60%60);
		  s=Math.floor(t/1000%60);
		}
		LeDao.Id('d').innerHTML = d + "天";
		LeDao.Id('h').innerHTML = h + "时";
		LeDao.Id('m').innerHTML = m + "分";
		LeDao.Id('s').innerHTML = s + "秒";  
	  }
	  setInterval(fn,0);
	  }	
      LeDao.init();


})


