// JavaScript Document

	$(function(){
		
				
		/*点击客户名称,显示下拉菜单*/
		$("#customName").click(function(){
			$("#myC_droplist").show();
		});
		/*点击下拉菜单的值，显示到客户名称中*/
		$("#myC_droplist ul li").click(function(e){
			var dropListAddText = $("#customName span").html();
			var dropListText = $(this).html();
			$("#customName span").html(dropListText);
			$(this).html(dropListAddText);
			$("#myC_droplist").hide();
		});
		/*点击其他区域,关闭下拉菜单*/
		$("#resultSet").click(function(e){
			$("#myC_droplist").hide();
		});
		
		
		/*搜索框*/
		/*$(".myC_searleftr input").focus(function(){
			$(".myC_searleft").css("width","85%");
			$(".myC_searright").show();
			var inputTextLen = $(".myC_searleftr input").val().length;
			if(inputTextLen>0){
				$(".myC_searleftr img").show();
			}
		});*/
		
		/*搜索框*/
		$(".myC_searleftr input").bind('input propertychange', function(){
			$(".myC_searleft").css("width","85%");
			$(".myC_searright").show();
			var inputTextLen = $(".myC_searleftr input").val().length;
			if(inputTextLen>0){
				$(".myC_searleftr img").show();
			}else{
				$(".myC_searleftr img").hide();
				$(".myC_searleft").css("width","100%");
				$(".myC_searright").hide();
			}
		}); 
		/*点击小叉号--清空input框内*/
		$(".myC_searleftr img").click(function(){
			$(".myC_searleftr input").val('');
			$(".myC_searleftr img").hide();
			$(".myC_searleft").css("width","100%");
			$(".myC_searright").hide();
		});
		
		
		/*性别--选中哪个，哪个为字为红色*/
		$(".gendarRadio input:checked").parent().next().css("color","#ff7e0b");
		$(".gendarRadio input[type='radio']").click(function(){
			$(".gendarRadio input").parent().next().css("color","#666666");
			$(".gendarRadio input:checked").parent().next().css("color","#ff7e0b");
		});
		
		
		/*调用日期方法*/
		var currYear = (new Date()).getFullYear();	
		var opt={};
		opt.date = {preset : 'date'};
		opt.default = {
			theme: 'android-ics light', //皮肤样式
			display: 'modal', //显示方式 
			mode: 'scroller', //日期选择模式
			lang:'zh',
			startYear:currYear - 100, //开始年份
			endYear:currYear //结束年份
		};
		$("#birthDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		
	})
	
	
	/*展开详情 -- id 为最外层li的id号*/
	function checkDetail(id){
		var $detail = $("#"+id+" .myCc_zkwrap");
		if($detail.is(":hidden")){
			$detail.show();
			$("#"+id+" .myCc_litop h2 i").hide();
		}else{
			$detail.hide();
			$("#"+id+" .myCc_litop h2 i").show();
		}
	}
	
	/*关闭详情*/
	function closeDetail(id){
		var $detail = $("#"+id+" .myCc_zkwrap");
		$detail.hide();
		$("#"+id+" .myCc_litop h2 i").show();
	}
	
	/*第二层展开详情 -- id 为最外层li的id号*/
	function checkDetailDetail(id){
		var $detail = $("#"+id+" .myBusconDetailDetail");
		if($detail.is(":hidden")){
			$detail.show();
		}else{
			$detail.hide();
		}
	}
	
	/*关闭第二层详情*/
	function closeDetailDetail(id){
		var $detail = $("#"+id+" .myBusconDetailDetail");
		$detail.hide();
	}
	
	
	/*显示蒙层*/
	function ShowDiv(show_div,bg_div,id){
		document.getElementById(show_div).style.display='block';
		document.getElementById(bg_div).style.display='block' ;
		var bgdiv = document.getElementById(bg_div);
		bgdiv.style.width = document.body.scrollWidth;
		bgdiv.style.height = $(document).height();
		$("#"+bg_div).height($(document).height());
		$("#"+id+" .myCc_litopr .img_add").hide();
	};
	
	/*关闭蒙层*/
	function CloseDiv(show_div,bg_div,id){
		document.getElementById(show_div).style.display='none';
		document.getElementById(bg_div).style.display='none';
		
		$("#"+id+" .myCc_litopr .img_add").show();
	};
	
	/*点击蒙层区域，关闭蒙层*/
	function closeDivAll(){
		$("#fade").hide();
		$(".myC_mc").hide();
		$(".img_add").show();
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	