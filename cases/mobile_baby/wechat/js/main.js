        function getId(el){
		  return document.getElementById(el);
		}
		
		
		var c = getId('c'), //可滚动区域
		    v = getId('v'), //vcr
			f = getId('f'), //iframe
			a = getId('a'), //消息音效
			call = getId('calling'), //
			ring = getId('ring'), //来电音效
			load = getId('load'), //load
			scale = v.offsetHeight/v.offsetWidth,
		    main = getId('main'), //main
			main_width,
			w_height;

		function init(x){
			var x = x||127
			main_width = parseInt(main.offsetWidth);	
			w_height = 	window.innerHeight;	
			v.style.height = w_height+'px'; 
			f.style.height = w_height+'px'; 
			call.style.height = w_height+'px';
			c.style.height=window.innerHeight-x+'px';//计算可视区域高度		
		}
        init();
		var resizeTimer = null;
		window.onresize=function(){
			if (resizeTimer) {
			clearTimeout(resizeTimer)
			}
			resizeTimer = setTimeout(function(){
             init();
			}, 200);
		}		
		
		//angular begin
        var helooApp = angular.module('helooApp',['ngSanitize']); //先把应用定义成一个模块名
		helooApp.controller('Chat',function($scope,$timeout){ //主控制器
		
		angular.element(window).bind('load', function() {  //loading等待页面
		      $timeout(function(){
				  var body=document.getElementsByTagName("body")[0];
				  body.childNodes[1].setAttribute('class','none');
				  main.style.visibility = 'visible';
				  body.removeChild(body.childNodes[1]);	
				  $timeout(function(){ $scope.addNew()},1000);
					v.addEventListener("ended",function(evt) {
					   f.style.display = 'block';
                       v.style.display = 'none';					   
					   document.title='angelababy请我去参加婚礼，我残忍的拒绝了。。。';
					});
			},2000);
         }); 
		
		
          var time = 2500,//聊天间隔时间	
              //href = 'http://wap.koudaitong.com/v2/feature/1f6fmrt95',	 //跳转地址
			  user = nickname, //微信用户名
			  me = '@'+nickname, 
			  
              oDate = new Date(),
              i = 0,	  
		      chats = [
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:'大家有时间来参加我和晓明哥的婚礼吗？',no:true,time:3000},
				  
		   {   img:'wechat/images/dc.png',
			   name:'邓超',
			   p:'大家好，我是angelababy，这是我出生以来第一次大婚，蹲请邓超作为我的伴娘！！！',no:true},				  
				  
		   {   img:'wechat/images/wzl.png',
			   name:'王祖蓝',
			   p:'简直就是完美',no:true},	
			   
		   {   img:'wechat/images/wzl.png',
			   name:'王祖蓝',
			   p:'<img class="huge" src="wechat/images/wanmei.png" />',no:true,time:300},				   
				  
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:'<img src="wechat/images/emo01.png" />',no:true},	
				  
		   {   img:'wechat/images/xm.png',
			   name:'黄晓明',
			   p:'<img src="wechat/images/emo08.gif" />@孙俪，牵走。。。',no:true},	
				  
		   {   img:'wechat/images/zk.png',
			   name:'郑恺',
			   p:'<img src="wechat/images/emo06.png" />我去是不是不太合适。。。',no:true,time:3000},				  
				  
		   {   img:'wechat/images/my.png',
			   name:'马云',
			   p:'梦想总是要有的，万一实现了呢？',no:true},	
				  
		   {   img:'wechat/images/dlj.png',
			   name:'衣品天成杜立江',
			   p:'<img class="huge" src="wechat/images/emo09.gif" />',no:true},	
				  
		   {   img:'wechat/images/dlj.png',
			   name:'衣品天成杜立江',
			   p:'@马云',no:true,time:300},	
			   
		   {   img:'wechat/images/zk.png',
			   name:'郑恺',
			   p:'有道理，我去！我去！',no:true},	
		   {   welcome:'郑恺被移出Baby&晓明婚礼嘉宾群',is:true},					  
		   {   img:'wechat/images/my.png',
			   name:'马云',
			   p:'。。。',no:true},	
				  
		   {   img:'wechat/images/lc.png',
			   name:'李晨',
			   p:'。。。',no:true,time:300},	
		   {   img:'wechat/images/ch.png',
			   name:'陈赫',
			   p:'。。。',no:true,time:300},
		   {   img:'wechat/images/lh.png',
			   name:'鹿晗',
			   p:'。。。',no:true,time:300},	
				  
		   {   img:'wechat/images/dc.png',
			   name:'邓超',
			   p:'谁特么踢了我兄弟！我要和他拼命',no:true},	
			   
		   {   img:'wechat/images/xm.png',
			   name:'黄晓明',
			   p:'<img class="huge" src="wechat/images/hb.png" />',no:true},	

		   {   img:'wechat/images/dc.png',
			   name:'邓超',
			   p:'<img src="wechat/images/emo10.gif" />晓明哥Ｖ５！晓明哥吉祥！',no:true},				   
				  
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:me+'，我和晓明哥的婚礼你来的吧？',no:true},	
		
		   {   img:'wechat/images/wsc.png',
			   name:'王思聪',
			   p:me+' 来吧！份子钱我出！',no:true},					  
				  
		   {   img:'wechat/images/my.png',
			   name:'马云',
			   p:'呵呵。。。',no:true},	
			   
           {   img:userlogo,name:user,p:'来。。。',no:true,me:true,time:3000},	
		   
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:me+'，真的来吗？<img src="wechat/images/emo05.png" />',no:true},					  
           {   img:userlogo,name:user,p:'哎呀！我可能要去冰岛猎海豹，来不了了！',no:true,me:true},				  
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:'不来吗？好伤心。。。。。。<img src="wechat/images/emo04.png" />',no:true},					  
				  
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:'我要去发泄！我要去狂欢！我要去参加party！我要去买衣服！<img src="wechat/images/emo07.png" /><img src="wechat/images/emo07.png" /><img src="wechat/images/emo07.png" />',no:true},					  
				  
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:me+'你必须跟我一起去！！！',no:true},	
			   
           {   img:userlogo,name:user,p:'这个。。。',no:true,me:true},				   
		   
		   {   img:'wechat/images/baby.png',
			   name:'Angelababay',
			   p:'last',no:true,time:3000}	   		   
		  ];
		  
		  $scope.chats = [];
		  $scope.chat = true;
		  $scope.foot = true;  
		  $scope.keyboard_ = true;
		  $scope.time = oDate.getHours()+':'+ (oDate.getMinutes() < 10 ? '0' : '')+ oDate.getMinutes() ;
		  $scope.welcome = me+'被邀请加入Baby&晓明婚礼嘉宾群';
		  $scope.addNew = function(){ //添加聊天语句
			if(chats[i]!=undefined){
				$scope.chats.push(chats[i]);
				a.play(); //声音伴随
			}			
			i++;
			if(i !== 24 && i !== 22  && i < chats.length+1 ){
				window.setTimeout(function(){
					
					var time_
					if(chats[i]['time'] != undefined){
					 time_ = chats[i]['time']
					}
					else{
					 time_ = time;
					}
					console.log('time:'+time_+'i:'+i+'@@'+chats[i]['p']+'##scroll');
					
					$timeout(function(){ $scope.addNew()},time_);
					if(i==29){
					   $timeout(function(){ $scope.go();$scope.foot = false;},time);
                       $scope.addNew = function(){};					   
					}
					c.scrollTop = c.scrollHeight+42-c.clientHeight;
				},0);
			}
			else {
			    c.scrollTop = c.scrollHeight+42-c.clientHeight;
				$scope.keyboard = true;
				$scope.keyboard_ = true;
				$timeout(function(){$scope.foot = false;
				var borderHeight = document.getElementById('keyboard_').offsetHeight;
				$scope.scroll(borderHeight);	
				c.style.height=window.innerHeight-borderHeight-127+'px';
				$scope.send={position:'absolute',right:borderHeight*61/488+'px',bottom:borderHeight*94/488+'px',width:borderHeight*148/488+'px',height:borderHeight*70/488+'px'};
				
				if(i==22){
				    //已经写不出递归了，现在整个人已经懵了
					$timeout(function(){$scope.text = '来';
					$timeout(function(){$scope.text = '来。';
					$timeout(function(){$scope.text = '来。。';
					$timeout(function(){$scope.text = '来。。。';
					$scope.dot = true;
					},200);
					},200);
					},200); 
					},900);				
				}
				else{
                    
                    //已经写不出递归了，现在整个人已经懵了					
					$timeout(function(){$scope.text = '哎';
					$timeout(function(){$scope.text = '哎呀';
					$timeout(function(){$scope.text = '哎呀！';
					$timeout(function(){$scope.text = '哎呀！我可';
					$timeout(function(){$scope.text = '哎呀！我可能';
					$timeout(function(){$scope.text = '哎呀！我可能要';	
					$timeout(function(){$scope.text = '哎呀！我可能要去';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎海';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎海豹';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎海豹，来';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎海豹，来不';
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎海豹，来不了';						
					$timeout(function(){$scope.text = '哎呀！我可能要去冰岛猎海豹，来不了了！';
					$scope.dot = true;
					},100);
					},100);
					},100); 
					},100);
					},100);
					},100); 
					},100);
					},100);
					},100); 
					},100);
					},100);
					},100); 
					},100);
					},100);
					},100); 					
					},900);						
				}
				},0);
			}
		  };
		  
		  $scope.scroll = function(x){ //滚动条伴随聊天滚动事件
		            var x = x||42;
					window.setTimeout(function(){
					 c.scrollTop = c.scrollHeight+x-c.clientHeight;
					});		  
		  }
		  
		  $scope.refuse = function(){ //发送文字
		          $scope.keyboard_ = false;
				  $scope.foot = true;
            	  //$scope.chats.push({img:'other.png',name:'派单员',p:'来不了了!',no:true,me:true});
				  $scope.text = '';
				  window.setTimeout(function(){
					c.scrollTop = c.scrollHeight+42-c.clientHeight;	
					init(87);
					//$timeout(function(){ $scope.addNew()},Math.floor(Math.random()*3000)); //测试使用随机延时来增加趣味性，实际使用应该改成time参数
				  });	
				  /*
                  $timeout(function(){ 
				  $scope.chats.push( {img:'baby.png',name:'Angelababay',p:'不来吗？好伤心．．．．．．<img src="wechat/images/emo04.png" />，我要去发泄<img src="wechat/images/emo07.png" />！我要去狂欢<img src="wechat/images/emo07.png" />！我要去参加party<img src="wechat/images/emo07.png" />！我要去买衣服<img src="wechat/images/emo07.png" />'+me+'你必须陪我一起去！！！',no:true});
				  	a.play(); //声音伴随
					$scope.scroll();
					$timeout(function(){
					 $scope.chats.push({img:'other.png',name:'派单员',p:'这个．．．一定要去吗？',no:true,me:true});
				  	 a.play(); //声音伴随
					 $scope.scroll();					 
					 
					 $timeout(function(){ $scope.go();$scope.foot = false;},time);			
					},time);		
							
				  },time);	
*/
                  $timeout(function(){ $scope.addNew();},100);
				  	
                  				  
		  }			  
		  
		  $scope.go = function(){ //来电方法
		          $scope.keyboard_ = false;
            	  $scope.dialog = false;
				  $scope.chat = false;
				  $scope.call = true;
				  ring.play();
		  }
		  
		  $scope.yes = function(){ //参加婚礼方法跳转 
		          $scope.keyboard_ = false;
				  $scope.show = true;
		          ring.pause();
            	  $scope.call = false;
				  v.play();
				  //location.href='video.html'
				 
				  
		  }	
		  
          $scope.close = function(){ //关闭视频聊天
			  $scope.chat = true;
			  $scope.foot = true;
			  $scope.show = false;	
              v.onended = null;		  
		  }	
		});	
		
