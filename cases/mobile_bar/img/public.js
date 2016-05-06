//游戏核心代码 begin

var checkStickLong = {
  init: function() {

  },
  check: function() {
    var self = this;

      self.oldHeight = parseInt($(".wall").eq(0).css('height'));
      self.newHeight = parseInt($(".wall").eq(1).css('height'));
      self.newWidth = parseInt($(".wall").eq(1).css('width'));
      self.newMargin = parseInt($(".wall").eq(1).css('left')) -screenWidth*.19

	
	

    var stickLong = this.getWidthNumber($(".stick").css('width'));
    var minLong = Math.sqrt(Math.pow((Math.abs(self.oldHeight - self.newHeight)), 2) + Math.pow(self.newMargin, 2));
	
	
	
    if (self.oldHeight > self.newHeight) {
      var maxLong = Math.sqrt(Math.pow((self.oldHeight - self.newHeight), 2) + Math.pow((self.newMargin + self.newWidth), 2));
      if (stickLong < maxLong && stickLong > minLong) {
        self.corner = -180 * Math.asin((Math.abs(self.oldHeight - self.newHeight) / stickLong)) / (Math.PI);
      }
      if (stickLong > maxLong) {
		
        self.corner = -180 * Math.asin((Math.abs(self.oldHeight - self.newHeight) / maxLong)) / (Math.PI);
		  console.log('角度:'+self.corner)
      }
      if (stickLong < minLong) {
        self.corner = -90
      }
    } else {
      var maxLong = Math.sqrt(Math.pow(Math.abs(self.oldHeight - self.newHeight) * (self.newMargin + self.newWidth) / self.newMargin, 2) + Math.pow((self.newMargin + self.newWidth), 2));
      if (stickLong < minLong && stickLong >= self.newMargin) {
		
          self.corner = 180 * Math.acos((self.newMargin / stickLong)) / (Math.PI);
      }
      else if (stickLong < self.newMargin) {
		 
          self.corner = -90
      }
	  else{
		  console.log('能够着~');
		  console.log(self.newMargin,minLong);
		  self.corner = 180 * Math.acos((self.newMargin / minLong)) / (Math.PI);
	  }
	  
    }
    self.maxLong = maxLong;
    self.minLong = minLong;
	
//	$('#debug').html('墙1高度：'+self.oldHeight+'   墙2高度：'+self.newHeight+'   墙2宽度：'+self.newWidth+'   墙间距：'+self.newMargin+'   杆子长度:'+stickLong+'   最大长度:'+maxLong)
	
    $('.stick').css('transition', '.6s');
	console.log(self.corner)
	if(!self.corner){
		//self.corner = -90;
	}
    $('.stick').css('transform', 'rotate(' + ( - self.corner) + 'deg)');
    setTimeout(function() {
      if (stickLong < maxLong && stickLong > minLong) {
        self.run();
        setTimeout(function() {
          self.getPoint();
          self.getNewWall();
        },
        1600);
      } else if (stickLong > maxLong) {
        clearBind();
        self.getDown();
      } else {
        clearBind();
        self.getDown();
      }
    },
    600);
  },
  run: function() {
    var self = this;
    $(".stickMan img").attr({
      'src': 'img/stick.gif'
    });
    var stickLong = self.getWidthNumber($(".stick").css('width'));
    var moveNumber = stickLong * self.newMargin / self.minLong;
    var bottom = self.oldHeight + (stickLong * (self.newHeight - self.oldHeight) / self.minLong);
    if (self.oldHeight > self.newHeight) {
      bottom = self.newHeight;
      moveNumber = Math.sqrt(Math.pow(stickLong, 2) - Math.pow((self.oldHeight - self.newHeight), 2));
    }
    $(".stickMan").css({
      'bottom': self.oldHeight + 'px',
      'left': screenWidth * .1 + 'px'
    });
    $(".stickMan").css('-webkit-transition', 'all .9s');
    $(".stickMan").css({
      left: '+=' + moveNumber + 'px',
      bottom: bottom + 'px'
    });
    setTimeout(function() {
      $(".stickMan").css('-webkit-transition', 'all .6s');
      $(".stickMan").css({
        left: self.getWidthNumber($(".wall").eq(1).css('left')) + self.getWidthNumber($(".wall").eq(1).css('width')) - screenWidth * 0.15 + 'px',
        bottom: self.newHeight -screenWidth*0.02 + 'px'
      })
    },
    900);
    $("body").css('background-position-x', '-' + (point + 1) * 50 + 'px').css('-webkit-transition', 'all 1.5s ease-in-out');
    setTimeout(function() {
      $(".stickMan").css('-webkit-transition', 'all 0s');
      $(".stickMan img").attr({
        'src': 'img/stick_stand.gif'
      });
    },
    1600);
  },
  getDown: function() {
    $(".stickMan img").attr({
      'src': 'img/stick.gif'
    });
    var self = this;
    var stickLong = self.getWidthNumber($(".stick").css('width'));
    var moveNumber = stickLong * (self.newMargin + self.newWidth) / self.maxLong;
    var bottom = self.oldHeight - (stickLong * (self.oldHeight - self.newHeight) / (self.oldHeight <= self.newHeight ? self.minLong: self.maxLong));
    var t1 = 1500;
    if (self.corner == -90) {
      $(".stickMan").css('-webkit-transition', 'all .2s');
      $(".stickMan").css({
        left: '+=5px'
      });
      t1 = 300;
    } else {
      if (self.oldHeight <= self.newHeight && stickLong < self.minLong && stickLong >= self.newMargin) {
        moveNumber = self.newMargin;
        bottom = self.oldHeight + Math.sqrt(Math.pow(stickLong, 2) - Math.pow(self.newMargin, 2));
      }
      $(".stickMan").css('-webkit-transition', 'all 1.5s');
      $(".stickMan").css({
        left: '+=' + moveNumber + 'px',
        bottom: bottom + 'px'
      });
    }
    setTimeout(function() {
      $(".stickMan img").attr({
        'src': 'img/down.gif'
      });
      $(".stickMan").css('-webkit-transition', 'all 0s');
    },
    t1);
    setTimeout(function() {
      $('.stick').css('transform', 'rotate(90deg)');
      $(".stickMan").css('-webkit-transition', 'all .5s');
      $(".stickMan").css({
        bottom: '-200px'
      });
    },
    t1 + 500);
    $("body").css('background-position-x', '-' + (point + 1) * 50 + 'px').css('-webkit-transition', 'all 1.5s ease-in-out');
    setTimeout(function() {
      $(".stickMan img").attr({
        'src': 'img/stick.gif'  //建议增加一个人物满血复活gif来增加游戏趣味性
      });
      self.showResult();
    },
    t1 + 800);
  },
  getPoint: function() {
    point++;
    $(".point").addClass('bounceIn').html(point);
    setTimeout(function() {
      $(".point").removeClass('bounceIn');
    },
    500);
  },
  getNewWall: function() {
    this.setNewWall();
    setTimeout(this.resetWall, 250);
  },
  resetWall: function() {
    addBind();
    $('.wall').eq(0).remove();
    $('.init').eq(0).removeClass('init');
  },
  getWidthNumber: function(ele) {
    if (ele) {
      var WidthNumber = ele.substr(0, ele.length - 2);
      WidthNumber = Number(WidthNumber);
      return WidthNumber;
    }
  },
  wallArr: ['img/wall/z1.png', 'img/wall/z2.png','img/wall/q1.png', 'img/wall/q2.png', 'img/wall/q3.png'],
  difficultyObj:{easy:25,hard:10,veryHard:5},
  setNewWall: function() {
    var self = this;
    var newWallSpacing = Math.random() * 55 + 23;
    var newWall = self.wallArr[Math.floor(Math.random() * self.wallArr.length)];
	
    var newWallWidth = Math.random()*Math.min(70-newWallSpacing,35) + self.difficultyObj[level];
    var tpl = '<img class="wall new init" src="' + newWall + '" style="width:' + newWallWidth + '%;left:100%;height:auto;background:none"></img>';
    $("#main").append(tpl);
	$(".wall").last().bind('load',function(){
		if($(".wall").last().height() > screenHeight*.4){
		//	alert('大啦！！')
			var height = $(".wall").last().height();
			var width = $(".wall").last().width();
			$(".wall").last().height(screenHeight*.35);
			$(".wall").last().width(screenHeight*.35*width/height);
		}
		$(".wall").last().onload = null;
    var moveNumber = self.getWidthNumber($(".wall").eq(1).css('left')) + self.getWidthNumber($(".wall").eq(1).css('width')) - screenWidth * 0.2;
    var moveStick = moveNumber + self.getWidthNumber($(".wall").eq(1).css('width')) - screenWidth * 0.2;
    $(".wall").eq(0).css({
      left: -moveNumber + 'px'
    });
    $(".wall").eq(1).css({
      left: getWidthNumber($(".wall").eq(1).css('left'))-moveNumber + 'px'
    });	
    $(".wall").eq(2).css({
      left: newWallSpacing + '%'
    });
    $('.stick').css('transition', '0');
    $(".stick").css({
      left: '-=' + moveNumber + 'px',
      bottom: parseInt($(".wall").eq(1).css('height')) -2 + 'px'
    });
    $(".stickMan").css('-webkit-transition', 'all .2s');
    $(".stickMan").css({
      left: '-=' + moveNumber + 'px'
    });		
	});

	


	

  },
  angle: function(start, end) {
    var diff_x = end.x - start.x,
    diff_y = end.y - start.y;
    return 180 * Math.atan(diff_y / diff_x) / (Math.PI);
  },
  showResult: function() {
    $(".point,.tips").css('display', 'none');
    $(".newPoint").html(point);
    $(".gameOver").css('display', 'block');
    this.setBestPoint();
	
  },
  setBestPoint: function() {

    var bestPoint = window.sessionStorage.getItem('stickManPoint');
    if (!bestPoint) {
      bestPoint = point;
      window.sessionStorage.setItem('stickManPoint', point);
    } else if (bestPoint < point) {
      bestPoint = point;
      window.sessionStorage.setItem('stickManPoint', point);
    }
    $(".bestPoint").html(bestPoint);
	   document.title = '我居然获得了'+bestPoint+'分!比买火车票简单狠多啊啊啊！'
    shareToWeixin();
  }
};

!function(){
    var longStick;
    var shortStick;
    var screenWidth = window.screenWidth = document.documentElement.clientWidth;
	var screenHeight = window.screenHeight = document.documentElement.clientHeight;
    point = 0;
    var speed = "5%";
	$('body').width(screenWidth).height(screenHeight)
    function touchSatrtFunc(evt) {
		if(point>=2){
			$(".tips").hide();
		}
    	evt.preventDefault();
   		document.addEventListener('touchend', touchEndFunc, false);
    	initStick();
    	getLong();
    	document.removeEventListener('touchstart', touchSatrtFunc, false);
    }
    function getLong() {
		if(point>5){
				speed="5%";	
			}
    	longStick = setInterval(function() {
			
    		var stickWidth = getWidthNumber($('.stick').css('width'));
    		if(stickWidth<=screenWidth){
    			$('.stick').css({width:'+='+speed});
    		}else{
    			clearInterval(longStick);
    			getShort();
    		}
    	},50);
    }
    function getShort() {
		if(point>5){
			speed="10%";	
		}
    	shortStick = setInterval(function() {
			
    		var stickWidth = getWidthNumber($('.stick').css('width'));
    		if(stickWidth>0){
    			$('.stick').css({width:'-='+speed});
    		}else{
    			clearInterval(shortStick);
    			getLong();
    		}
    	},50);
    }
    window.getWidthNumber = function(ele){
   		if (ele) {
   			var WidthNumber = ele.substr(0,ele.length-2);
   			WidthNumber = Number(WidthNumber);
   			return WidthNumber;
   		}
    }
    function touchEndFunc(evt) {
	    
    	clearBind();
    	evt.preventDefault();
    	clearInterval(longStick);
    	clearInterval(shortStick);
    	setTimeout(function(){
    	   checkStickLong.check();
    	},200);
    }
    function touchMoveFunc(evt){
    	evt.preventDefault();
    }
    function initStick() {
    	$(".stick").css({'transition':'0','transform':'rotate(-90deg)','width':'0','left':'19%'});
    }
    checkStickLong.init();
   	window.init = function(){

   		$(".stick").css({'transform-origin':'0 0','transform':'rotate(-90deg)'});
   		addBind();
   		document.addEventListener('touchmove', touchMoveFunc, false);
   		$(".again").click(function(){
   			$(".gameOver").css('display','none');
   			$(".point,.tips").css('display','block');
   			point = 0;
			speed="5%";
   			$(".point").html(point);
			checkStickLong.getNewWall();
			setTimeout(function(){$(".stickMan").css({'left':screenWidth*.08+'px','bottom':$(".wall").first().height() -screenWidth*0.02+'px'});addBind();},430)
   			setTimeout(function(){$(".stickMan img").attr({'src':'img/stick_stand.gif'});},230)
   			$("body").css('background-position-x', '0');
			$(".shouji").css({"left":"0%"});
   		});
   		$(".share").click(function(){
   			$("#mask").css('display','block');
   		});
   		$("#mask").click(function(){
   			$("#mask").css('display','none');
   		});
   		
   	}
   	window.addBind = function() {
   		document.addEventListener('touchstart', touchSatrtFunc, false);  
   	}
   	window.clearBind = function() {
   		document.removeEventListener('touchstart', touchSatrtFunc, false);
   		document.removeEventListener('touchend', touchEndFunc, false);
   	}
   	
   	function orientationChange() {
    switch(window.orientation) {

    　　case 0: 
            addBind();
            $("body").css('transform','');
            break;

    　　case -90: 
            clearBind();
            alert("游戏要竖屏玩哟！！！");
            $("body").css('transform','rotate(90deg)');

            break;

    　　case 90:   
            clearBind();
            alert("游戏要竖屏玩哟！！！");
            $("body").css('transform','rotate(-90deg)');
            break;

    　　case 180:   
            addBind();
            $("body").css('transform','rotate(0deg)');
        　　break;

    }
   }

   window.onload = function(){
         setTimeout(function(){
			 $('#caseBlanche').fadeOut(200);
			 $('#playboard').fadeIn(300);
			 $('body').removeClass('loadbefore');
			 init();
			 orientationChange();
			 window.onorientationchange = orientationChange;
			 shareToWeixin();  		  
		 },1500)
   }
}();
//游戏核心代码 end







//分享到微信

function shareToWeixin(){
WeixinApi.ready(function(Api) {

                // 微信分享的数据
                var desc = '哎哟，不错哦！！！！';
                var bestPoint = window.sessionStorage.getItem('stickManPoint');
                if(!bestPoint||bestPoint==0){
                	desc ='哎哟，不错哦！！！！';
                } else {
					if(bestPoint>=40){
						desc ='我居然获得了'+bestPoint+'分！去和和商城分享比拼喽！';
					}else if(bestPoint<40){
						desc ='我才得了'+bestPoint+'分！还需要继续努力哦！';
					}
                }
				/*
                var wxData = {
                    "appId": wxcfdc424062594fbe, // 服务号可以填写appId
                    "imgUrl" : 'http://smartmercado.com/wxsc/puzzle/img/img/paolu.jpg',
                    "link" : 'http://smartmercado.com/wxsc/puzzle/img/index.html',
                    "desc" : desc,
                    "title" : desc
                };
*/
                // 分享的回调
                var wxCallbacks = {
                    // 收藏操作是否触发回调，默认是开启的
                    favorite : false,

                    // 分享操作开始之前
                    ready : function() {
                        // 你可以在这里对分享的数据进行重组
                        //alert("准备分享");
                    },
                    // 分享被用户自动取消
                    cancel : function(resp) {
                        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                        //alert("分享被取消，msg=" + resp.err_msg);
                    },
                    // 分享失败了
                    fail : function(resp) {
                        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                        //alert("分享失败，msg=" + resp.err_msg);
                    },
                    // 分享成功
                    confirm : function(resp) {
                        // 分享成功了，我们是不是可以做一些分享统计呢？
                        //alert("分享成功，msg=" + resp.err_msg);
                        $("#mask").css('display','none');
                    },
                    // 整个分享过程结束
                    all : function(resp,shareTo) {
                        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                        //alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
                    }
                };

                // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
                Api.shareToFriend(wxData, wxCallbacks);

                // 点击分享到朋友圈，会执行下面这个代码
                Api.shareToTimeline(wxData, wxCallbacks);

                // 点击分享到腾讯微博，会执行下面这个代码
                Api.shareToWeibo(wxData, wxCallbacks);

                // iOS上，可以直接调用这个API进行分享，一句话搞定
                Api.generalShare(wxData,wxCallbacks);

                // 有可能用户是直接用微信“扫一扫”打开的，这个情况下，optionMenu是off状态
                // 为了方便用户测试，我先来trigger show一下
                //var elOptionMenu = document.getElementById('optionMenu');
                //elOptionMenu.click(); // 先隐藏
                //elOptionMenu.click(); // 再显示
            });
} 