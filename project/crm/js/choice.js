// JavaScript Document
	
	
	$(function(){
		
		/*调用日期方法*/
		var currYear = (new Date()).getFullYear();	
		var opt={};
		opt.date = {preset : 'date'};
		opt.default = {
			theme: 'android-ics light', //皮肤样式
			display: 'modal', //显示方式 
			mode: 'scroller', //日期选择模式
			lang:'zh',
			startYear:currYear - 10, //开始年份
			endYear:currYear + 10 //结束年份
		};
		$("#startDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		$("#endDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		/*转保费开始和结束日期*/
		$("#zbfStartDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		$("#zbfEndDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		/*受理开始和结束日期*/
		$("#slStartDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		$("#slEndDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		/*纳入KPI开始和结束日期*/
		$("#nrKPIStartDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		$("#nrKPIEndDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		/*统计开始和结束日期*/
		$("#tjStartDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		$("#tjEndDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		/*承保开始和结束日期*/
		$("#cbStartDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		$("#cbEndDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		
		/*动态添加控件的宽度*/
		settable();
		
		/*“本月本季度”切换*/
		$(".ch_header_li ul li").click(function(){
			$(".ch_header_li ul li").removeClass("current");
			$(this).addClass("current");
		});	
		
		/*“渠道”切换*/
		$(".ch_header_qdrig li").click(function(){
			$(".ch_header_qdrig li").removeClass("current");
			$(this).addClass("current");
		});	
		
	});
		
	$(window).resize(function(){
		settable();
	})
	function settable(){
		
		/*日期input宽度*/
		var tw=$(window).width();
		var dateInpWidth = (tw-20-24)/2;
		$('.cheadate_div1').css({
			'width':dateInpWidth
		});
		$('.cheadate_div3').css({
			'width':dateInpWidth
		});
		
		/*渠道宽度*/
		var qudaoWidth = tw-10-50;
		$('.ch_header_qdrig').css({
			'width':qudaoWidth
		});
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	