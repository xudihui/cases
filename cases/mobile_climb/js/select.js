;
/**
 *
 * @param
 * @author xudihui
 */
 
 var isIE=navigator.userAgent.indexOf("MSIE")!=-1;var isIE6=isIE&&!window.XMLHttpRequest;var isIE7=isIE&&navigator.appVersion.match(/7./i)=="7.";  //判断IE版本，在IE低版本中要进行特殊交互
(function($){
	var _SELECT_COUNTER = 0 ;
    $.fn.extend({
        mSelect: function (opts){
        	opts = $.extend({     		
    			
    		}, opts || {});
            return this.each(function(idx, it){
                var _this = this, o = $(this);
                if (o.attr("created")) 
                    return;
                o.attr("created", true);
                
                var noborder = o.hasClass("noborder");
               
                o.hide();
                var selectId = ((this.name || this.id) + '__jQSelect' + idx || '__jQSelect' + idx) + (++_SELECT_COUNTER);
                selectId = selectId.replace(/\./g,"_");
			    var container = $('<div id="' + selectId + '" class="dropdown' + ( o.prop("disabled") ? " disabled_select" : '' )  + '" tabindex="0"></div>');
			   
                var containerList = $('<div class="lc"><div id="' + selectId + '" class="dropdown" tabindex="0"></div></div>');
                if(opts.type == 'list'){
                	o.wrap(containerList);
                }else{
                	o.wrap(container);
                }
                if(_this.selectedIndex>=0){
                	var text = _this.options[_this.selectedIndex].text;
                }else{
                	var text = "";
                }
                var sel = $('<div class="dropselectbox" id="'+selectId+'"></div>');
                var h4 = $('<h4 title="' + text + (noborder ? '" class="noborder"' : '"') + '>' + text + '</h4>');
                h4.attr('reset',o.attr('reset'));
                sel.append(h4);
                o.after(sel);
                var ul = $("#ul" + selectId);
                var iframe = $("<iframe class='select-iframe' style='max-height:115px;'></iframe>");
                var ulShadow = $("#ulShadow" + selectId);
                if(opts.type == 'list'){
	                sel.hover(function(){
	             		$(this).addClass("hover");
	             	},
	             	function(){
	             		if(ul.length == 0 || ul.css("display") == "none"){
	             			$(this).removeClass("hover");
	             		}
	             	})
                }
                if (o.prop("disabled")) {
                    h4.addClass("disabled");
                    //return;  不能直接return，要让事件继续绑定上去。
                }
                h4.bind("click.mSelect", function(evt){  //click.mSelect是click的一个命名空间，到时候也可以卸载click.mSelect这个单独的点击事件。
                	if($(this).hasClass("disabled")) {
                		return false;
                	}
                    if (evt) {
                        evt.stopPropagation();
                    }
                    else {
                        window.event.cancelBubble = true;
                    }
                    // $(".edit-select
                    // ul").hide();
                    if(opts.type == 'list'){
                    	$(this).parent().addClass("hover");
                    }
                    if (ul.length > 0) {
                        if (ul.css("display") == "none") {
                            $("body").trigger("click.select");
                        	ulShadow.show();
                        	ulShadow.css({
                        		"left" :sel.position().left+4, //+ 9,
                        		"top" :sel.position().top + 32, //+ (isIE7 ? 75 : 77)
                        		"z-index" : 11
                        	});
                        	ul.show();
                        	iframe.height(ul.outerHeight());
							iframe.width(ul.outerWidth());
                        	iframe.show();
                        	if(opts.type == 'list'){
                        		ul.css({
                        			"left" : sel.position().left, //+ 9,
                        			"top" : sel.position().top + 27 //+ (isIE7 ? 75 : 77)
                        		});
								iframe.css({
                            		"left" : sel.position().left,
									"top" : sel.position().top + 27
                            	});
                            }else{
                            	ul.css({
                            		"left" : sel.offset().left, //+ 9,
                            		"top" : sel.offset().top + 27 //+ (isIE7 ? 75 : 77)
                            	});
                            	iframe.css({
                            		"left" : sel.offset().left, 
                            		"top" : sel.offset().top + 27
                            	});
                            }
							var minWidth = h4[0].offsetWidth - 2; // 4为ul的padding + borde所占宽度
							if(ul.width() < minWidth || isIE6){
								if(opts.type != 'list'){
									ul.width(minWidth);
									iframe.width(minWidth + 4);
								}
							}else if(isIE7){
								$('li',ul).width(ul.width()-20); // 20为li的padding right
							}else if( (ul.offset().left + ul.width()) > $('body').width()){
								ul.width($('body').width()-ul.offset().left);
								iframe.width($('body').width()-ul.offset().left + 8);
							}
							h4.parent().addClass("hover");
							/*
							if(opts.type == 'list'){
								//iframe.width( iframe.width() + 3 );
								iframe.height( iframe.height() + 3 );
							}
							*/
                        }
                        else {
                            $("body").trigger("click.select");
                        }
                    }
                    else {
                        $("body").trigger("click.select");
                        if(opts.type == 'list'){
                        	ul = $('<ul id="ul' + selectId + '"' + (noborder ? ' class="lc edit-select-box noborder"' : ' class="lc edit-select-box"' ) + '></ul>');
							if ( opts.expandFunc ) {
								ul.append( '<li expand="true" class="select-expand">显示全部</li>' );
							}
                        	ulShadow = $('<div id="ulShadow' + selectId + '"' + (noborder ? ' class="shadow-mask noborder"' : ' class="shadow-mask"' ) + '></div>');
                        	ul.width("135px");
                        	ulShadow.width("139px");
                        	ulShadow.height(26*_this.options.length + _this.options.length + 5);
                         	sel.append(ul);
                    		//sel.append(ulShadow);
                    		ul.css({
                        		"left" : sel.position().left, //+ 9,
                        		"top" : sel.position().top + 27, //+ (isIE7 ? 75 : 77)
                        		"padding-bottom":"4px",
                        		"background-color" :"#fff" // F1F1F1
                        	});
                    		ulShadow.css({
                        		"left" : sel.position().left+4, //+ 9,
                        		"top" : sel.position().top + 32, //+ (isIE7 ? 75 : 77)
                        		"z-index" : 11
                        	});
							ul.after(iframe);
							iframe.css({
								"z-index": 200,
								"max-height":'none',
                        		"left" : sel.position().left,
                        		"top" : sel.position().top + 27
                        	});
                        }else{
                        	ul = $('<ul style="max-height:110px;" id="ul' + selectId + '"' + ( noborder ? ' class="edit-select-box noborder"' : ' class="edit-select-box"' ) + '></ul>');
                        	//ul.width(h4.width() - (noborder ? 2 : 0) );
                        	$("body").append(ul);
                        	$("body").append(iframe);
							ul.css({
                        		"left" : sel.offset().left, //+ 9,
                        		"top" : sel.offset().top + 27 //+ (isIE7 ? 75 : 77)
                        	});
							iframe.css({
                        		"left" : sel.offset().left,
                        		"top" : sel.offset().top + 27
                        	});
                        }
                        //if(isIE6 || isIE7){
                        	
                        	
                       // }
//                        else
//                        	sel.append(ul);
                        
                        for (var i = 0; i < _this.options.length; i++) {
						    var value = $('option',o).eq(i).attr('value'); //必须给select设置value，通过value去给li设置value_属性,尝试过给li使用value属性，但是通过$去获取li的value时始终为0，所以使用value_属性。
                            var li = $('<li idx="' +
                            i + '" value_="'+ value +
                            '">' +
                            _this.options[i].text +
                            '</li>');
                            ul.append(li);
                        }

						
						//统一把事件模式更改为事件代理，绑定未来元素。
						ul.delegate('li','mouseover',function(e){
							$(this).addClass("over");
						});		
							
						ul.delegate('li','mouseout',function(e){

							$(this).removeClass("over");						
						});							

						ul.delegate('li[expand=true]','click',function(){
						  opts.expandFunc();
						})
						
						ul.delegate('li[expand!=true]','click',function(e){
                            if (e) {
								e.stopPropagation();
							}
							else {
								window.event.cancelBubble = true;
							}
							h4.parent().removeClass("hover");
							ul.hide();
							iframe.hide();
							ulShadow.hide();
							//当且仅当 li的属性value_跟上一次选中的select的option的value不一致时，才会触发trigger；假如value跟value_属性一致，那么即使他们的文本不一致，也不会触发change事件，以属性value为准，字面量无效。
							if(o.find('option:selected').attr('value') != $(this).attr('value_')){ 
								_this.options[$(this).attr("idx")].selected = true;
								o.trigger("change");
								h4.text($(this).text()).attr('title',$(this).text());
							}						
						});
                        ul.show(); 
                        iframe.height(ul.outerHeight());
                        iframe.width(ul.outerWidth());
                        iframe.show();
                        ulShadow.show(); 
						//var minWidth = h4.width() - (noborder ? 2 : 0);
						var minWidth = h4[0].offsetWidth - 2; // 4为ul的padding + borde所占宽度
						if(ul.width() < minWidth || isIE6){
							if(opts.type != 'list'){
								ul.width(minWidth);
								iframe.width(minWidth + 4);
							}
						}else if(isIE7){
							$('li',ul).width(ul.width()-20); // 20为li的padding right
						}else if( (ul.offset().left + ul.width()) > $('body').width()){
							ul.width($('body').width()-ul.offset().left);
						}
                        if(isIE6 && ul.height() > 180){
                        	if(opts.type != 'list'){
	                        	ul.height(180);
	                        	iframe.height(182);
                        	}
                        }  

                        $("body").bind("click.select", function(e){
                            ul.hide();
                            iframe.hide();
                            ulShadow.hide();
                            if(h4.parent().hasClass("hover")){
                            	h4.parent().removeClass("hover")
                            }
                        });
						/*
						if(opts.type == 'list'){
							iframe.width( iframe.width() + 3 );
							iframe.height( iframe.height() + 3 );
						}
						*/
                    }
                });
				 $(window).resize(function(){ul.hide();iframe.hide();ulShadow.hide();});
            });
        } ,
        //给非源生的select框动态赋值
        addOption: function(text,value,index){
			var _this = this[0];
			var o = $(this);
            var y = document.createElement('option');
            function addOpt(){
				y.text = text;
				y.value = value;
				if(index == null || index == undefined || index == ''){
					try{
						_this.add(y,null); // standards compliant
					}catch(ex){
						_this.add(y); // IE only
					}
				} else if(index >= 0){
					var sel=_this.options[index]; 
					_this.add(y,sel);
				} 
            }
            var selectId = ((_this.name || _this.id) + '__jQSelect'|| '__jQSelect');
            selectId = selectId.replace(/\./g,"_");

			var h4 = $('div.dropselectbox[id^="'+selectId+'"] h4');
			var ul = $('ul[id^="ul'+selectId+'"]:last');
           /* if(o.find('option').length==0){
				o.html('<option value=""></option>');
				h4.html('');
				ul.html('<li value_=""></li>');
            }
          */
			if(ul != null || ul != undefined || ul != ''){
                addOpt();
				var li = $('<li value_="' + value + '">' + text + '</li>');
				if(index == null || index == undefined || index == ''){
					ul.append(li);
				}else{
					$('li[expand!=true]:eq('+ index +')',ul).before( li );
				}	
				$('li[expand!=true]',ul).each( function( index ){
					this.setAttribute( 'idx', index );
				})	
			}
        },
        //动态删除非源生的select框的值
		removeOption: function(n){
        	var _this = this[0];
			var len = _this.options.length;
			var selectId = ((_this.name || _this.id) + '__jQSelect'|| '__jQSelect');
            selectId = selectId.replace(/\./g,"_");
			var h4 = $('div.dropselectbox[id^="'+selectId+'"] h4');
			var ul = $('ul[id^="ul'+selectId+'"]:last');
			if(n === null || n === undefined || parseInt(n,10)===undefined){
				//删除所有option
				if (len > 0){
					for(var i=0;i<len;i++){
						_this.remove(0);
						$('li[expand!=true]:eq('+ 0 +')',ul).remove();
					}				
				}
				h4.text('');
			}else{
				var n = parseInt(n,10);
				if(_this.selectedIndex == n){
					h4.text('');
				}
				_this.remove(n);
				$('li[expand!=true]:eq('+ n +')',ul).remove();
			}
			ul.next('iframe').height(ul.height() + 2);
        },
        //根据value值删除option
        delOption:function(val){
        	$(this).removeOption($("option[value='"+ val +"']",this).index());
        },
        //删除全部option
        delAllOption:function(config){  
        	var _this = this[0];
			var selectId = ((_this.name || _this.id) + '__jQSelect'|| '__jQSelect');
            selectId = selectId.replace(/\./g,"_");
			var h4 = $('div.dropselectbox[id^="'+selectId+'"] h4');
			var ul = $('ul[id^="ul'+selectId+'"]:last');
        	if(config == null || config == undefined || config == ''){
        		var blankOption = true;
        	}
        	else{
        		var blankOption = config.blankOption;
        	}
        	while($(this).find('option').length>0){
        		$(this).removeOption(0)
        	}
        	if(blankOption){
        		$(this).html('<option value="">请选择</option>');
				h4.html('请选择');
				ul.html('<li value_="">请选择</li>');
        	}
        	return this;
        },
        //给select动态赋值
        setValue: function(value){
        	var _this = this[0];
			var selectId = ((_this.name || _this.id) + '__jQSelect'|| '__jQSelect');
            selectId = selectId.replace(/\./g,"_");
			var h4 = $('div.dropselectbox[id^="'+selectId+'"] h4');
			var options = _this.options;
			var len = options.length;
			var existFlag = false;
			for(var i=0;i<len;i++){
				var v = $(options[i]).attr("value");
				if( v === value){
					existFlag = true;
					var text = $(options[i]).text();
					options[i].selected = true;
					break;
				}
			}
			if(!existFlag) {
				h4.text("");
			}else{
				h4.text(text);
			}
        },
        
        disabledSelect : function() {
        	 var selectId = ((this[0].name || this[0].id) + '__jQSelect'|| '__jQSelect').replace(/\./g,"_");
        	 $('div.dropselectbox[id^="'+selectId+'"] h4').addClass("disabled");
        	 $('div.dropselectbox[id^="'+selectId+'"]').addClass("disabled_select");
        },
        
        unDisabledSelect : function() {
    		var selectId = ((this[0].name || this[0].id) + '__jQSelect'|| '__jQSelect').replace(/\./g,"_");
    		$('div.dropselectbox[id^="'+selectId+'"] h4').removeClass("disabled");
    		$('div.dropselectbox[id^="'+selectId+'"]').parent().removeClass("disabled_select");
			$('div.dropselectbox[id^="'+selectId+'"]').removeClass("disabled_select");
			
        },
        
        /**
         * 清空弹出区域
         */
        clearSelectMenu: function(selectId, selectZindex){
            if (selectId != undefined) {
                selectZindex = selectZindex || 'auto';
                $('*[id="' + selectId + '"] ul').empty().hide();
                $('*[id="' + selectId + '"] h4').removeClass("over").removeClass("current");
                $('*[id="' + selectId + '"]').css({
                    'z-index': selectZindex
                });
            }
        },
        /**
         * 给弹出层赋值
         */
        setSelectValue: function(sID){
            var content = [];
            $.each($('*[id="' + sID + '"] option'), function(i){
                content.push("<li class='FixSelectBrowser'>" +
                $(this).text() +
                "</li>");
            });
            content = content.join('');
            $('*[id="' + sID + '"] ul').html(content);
            $('*[id="' + sID + '"] h4').html($('*[id="' + sID + '"] option:selected').text());
            $('*[id="' + sID + '"] li').eq($('*[id="' + sID + '"] select')[0].selectedIndex).addClass("over").addClass("selectedli");
        },
        /**
         * 键盘选择
         */
        keyDown: function(sID, selectIndex){
            var $obj = $('*[id="' + sID + '"] select');
            $obj[0].selectedIndex = selectIndex;
            $obj.change();
            $('*[id="' + sID + '"] li:eq(' + selectIndex + ')').toggleClass("over");
            $('*[id="' + sID + '"] h4').html($('*[id="' + sID + '"] option:selected').text());
        }
    });
    var types = ['DOMMouseScroll', 'mousewheel'];
    $.event.special.mousewheel = {
        setup: function(){
            if (this.addEventListener) {
                for (var i = types.length; i;) 
                    this.addEventListener(types[--i], handler, false);
            }
            else {
                this.onmousewheel = handler;
            }
        },
        teardown: function(){
            if (this.removeEventListener) {
                for (var i = types.length; i;) 
                    this.removeEventListener(types[--i], handler, false);
            }
            else {
                this.onmousewheel = null;
            }
        }
    };
    $.fn.extend({
        mousewheel: function(fn){
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        
        unmousewheel: function(fn){
            return this.unbind("mousewheel", fn);
        }
    });
    
    /**
     * 不同浏览器的处理事件
     */
    function handler(event){
        var args = [].slice.call(arguments, 1), delta = 0, returnValue = true;
        event = $.event.fix(event || window.event);
        event.type = "mousewheel";
        // IE: event.wheelDelta,这个值，一旦你往上滚动一次鼠标，他就是120，如果你要是往下滚动一次，那么它的值就是-120。
        // FF: event.detail,这个值，一旦你往上滚动一次鼠标，他就是-3，如果你要是往下滚动一次，那么它的值就是3。
        if (event.wheelDelta) 
            delta = event.wheelDelta / 120; // IE或者Opera
        if (event.detail) 
            delta = -event.detail / 3; // 兼容Firfox
        args.unshift(event, delta);
        return $.event.handle.apply(this, args);
    }
    
    $(function(){
        $(".edit-select").mSelect();
    });
})(jQuery);

