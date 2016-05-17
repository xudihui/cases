  angular.module('app', ['ngSanitize']);  
  function caseDetail($scope) {
$scope.games = [   //dataModel
		{"id": "g01",
		 "href": "mobile_bar",
		 "name": "撑杆游戏",
		 "lib": "Jq",	
		 "time": "2015/12/05"
		 },
		{"id": "g02",
		 "href": "mobile_baby",
		 "name": "Angelababy婚礼活动",
		 "lib": "Angular",	
		 "time": "2015/10/07"
		 },
		{"id": "g03",
		 "href": "mobile_ace",
		 "name": "ACE宣传活动",
		 "lib": "CSS3",	
		 "time": "2016/01/07"
		 },
		{"id": "g04",
		 "href": "mobile_valentine",
		 "name": "情人节约会活动",
		 "lib": "Angular",	
		 "time": "2016/02/14"
		 }			 
		];	  
 $scope.mobis = [   //dataModel
		{"id": "a01",
		 "href": "mobile_superflyer/html",
		 "name": "超级派单员",
		 "lib": "Jq",	
		 "time": "2015/06/30"
		 },
		{"id": "a02",
		 "href": "mobile_smk01",
		 "name": "杭州市民卡2.2",
		 "lib": "Bt、Jq",	
		 "time": "2015/04/29"
		 },
		{"id": "a03",
		 "href": "mobile_smk04/app.html#/index",
		 "name": "惠民理财",
		 "lib": "AngularJs、Jq",	
		 "time": "2015/05/15"
		 },
		{"id": "a04",
		 "href": "mobile_smk03",
		 "name": "窝里快购活动页面",
		 "lib": "Jq",	
		 "time": "2015/07/02"
		 },
		{"id": "a05",
		 "href": "mobile_smk02",
		 "name": "杭州发布",
		 "lib": "Bt、Jq",	
		 "time": "2015/03/10"
		 },
		{"id": "a06",
		 "href": "mobile_climb",
		 "name": "宁波登山俱乐部",
		 "lib": "Jq",	
		 "time": "2014/12/22"
		 },
		{"id": "a07",
		 "href": "mobile_hisupplier",
		 "name": "海商网",
		 "lib": "Jq",	
		 "time": "2014/08/02"
		 },
		{"id": "a09",
		 "href": "mobile_smk05",
		 "name": "杭州通优惠",
		 "lib": "Jq",	
		 "time": "2015/08/30"
		 },	
		{"id": "a10",
		 "href": "mobile_smk06",
		 "name": "杭州市民卡2.4",
		 "lib": "Framework7",	
		 "time": "2016/04/29"
		 },
		{"id": "a11",
		 "href": "smk_prolocutor/html",
		 "name": "代言人店铺",
		 "lib": "Bt",	
		 "time": "2016/01/29"
		 },			 
		];
	  $scope.pcs = [   //dataModel
		{"id": "p01",
		 "href": "http://www.nbeport.com/",
		 "name": "宁波电子口岸门户",
		 "ui": "月亮鱼",	
		 "ue": "shirley",
		 "ps": "2012年最满意的metro作品",	
		 "time": "2012/12/10"
		 },
		 /*
		{"id": "p02",
		 "href": "pc_climb/index.php",
		 "name": "宁波登山协会门户网站",
		 "ui": "岳莎莉",	
		 "ue": "tuy",
		 "ps": "乐道科技合作",	
		 "time": "2015/01/10"
		 },
		 */
		{"id": "p03",
		 "href": "http://www.nblijinggroup.com/",
		 "name": "宁波沥景路面优化项目",
		 "ui": "tuy",	
		 "ue": "tuy",	
		  "ps": "古特科技合作",	
		 "time": "2014/11/20"
		 },
		{"id": "p04",
		 "href": "http://wiki.nbeport.com/ued/ued!doIndexList.do?flag=1",
		 "name": "wiki知识分享平台",
		 "ui": "tuy",	
		 "ue": "shirley",	
		  "ps": "ILD的UED平台",	
		 "time": "2013/12/05"
		 },
		{"id": "p05",
		 "href": "http://www.edfamily.com/",
		 "name": "益德e熟",
		 "ui": "岳莎莉",	
		 "ue": "tuy",	
		  "ps": "乐道科技合作",	
		 "time": "2014/05/10"
		 },
		{"id": "p07",
		 "href": "http://www.kjb2c.com/",
		 "name": "跨境贸易电子商务",
		 "ui": "女巫",	
		 "ue": "tuy",	
		 "ps": "参与ILD初探市场化",	 
		 "time": "2014/01/20"
		 
		 
		 },
		{"id": "p06",
		 "href": "http://jhxd56.4plmarket.com/",
		 "name": "金华公共订舱平台",
		 "ui": "月亮鱼",	
		 "ue": "shirley",	
		 "time": "2013/07/17"
		 },
		{"id": "p08",
		 "href": "pc_datacenter/index.php",
		 "name": "数据中心",
		 "ui": "王夫人",	
		 "ue": "shirley",	
		 "time": "2013/11/10"
		 },	
		{"id": "p09",
		 "href": "http://www.56nb.org",
		 "name": "智慧物流平台",
		 "ui": "女巫",	
		 "ue": "shirley",	
		 "time": "2014/01/20"
		 },
		{"id": "p10",
		 "href": "pc_publicapply/index.html",
		 "name": "公共订舱服务平台",
		 "ui": "女巫",	
		 "ue": "shirley",	
		 "ps": "第一次跟前任百度UE合作项目",
		 "time": "2013/10/17"
		 },
		{"id": "p11",
		 "href": "http://www.nbcsky.com/",
		 "name": "宁波市城市客运管理局",
		 "ui": "运管内部员工",	
		 "ue": "无",	
		 "ps": "毕业后的第一个项目",	
		 "time": "2012/07/22"
		 }				 
		];

		$scope.orderProp = '-time'; //默认按照时间正序排练
		$scope.orderAdd = function(){
		    $scope.orderProp = 'time' 
		}
		$scope.orderReduce = function(){
		    $scope.orderProp = '-time' 
		}		
    }


