// JavaScript Document
$(function(){
    window.LeDao = {} //命名空间
	
	LeDao.init = function(){
		if($('a.home').length > 0){
		   $('a.home').bind('click',function(){
			   location.href='index.html';
		   })
		}
		if($('a.exit').length > 0){
		   $('a.exit').bind('click',function(){
			   location.href='index.html';
		   })
		}
		if($('a.return').length > 0){
		   $('a.return').bind('click',function(){
			   history.go(-1);
		   })
		}
	}
    LeDao.init()


})


