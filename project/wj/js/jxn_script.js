$(function(){
	/*jxn*/
	/*轮播效果*/
	$('.swiper-container').iosSlider({
				autoSlide:false,//  true 自动滚动 
				scrollbar:true,
				snapToChildren: true,//
				desktopClickDrag: true,//
				scrollbarLocation: 'top',
				scrollbarMargin: '10px 10px 0 10px',
				scrollbarBorderRadius: '0',
				responsiveSlideWidth: true,
				navSlideSelector: $('.iosSliderButtons .button'),
				autoSlideTimer:1500,
				infiniteSlider: true,
				onSlideChange: slideContentChange
			});
			
	//调节轮换的速度
	function slideContentChange(args) {
		$(args.sliderObject).parent().find('.iosSliderButtons .button').removeClass('selected');
		$(args.sliderObject).parent().find('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
	}
	
	var statusConfig = 0; //1--表示点击了“批量配置”按钮； 0--表示未点击“批量配置”按钮；
	
	/*取轮播区域的高度*/
	/*
		header--32
		footer--100
		5--多5像素备用 
		con高度 = 屏幕高度-132
	*/
	var windowHei = $(window).height();
	var actualConHei = windowHei-32-100-5;
	var actualLiHei = (actualConHei-9*2-8*2-20-4)/2;
	var actualDivHei = actualLiHei-(20+9)-18;
	
	$("#j_wj_con").height(actualConHei); //con的高度
	$("#j_wj_con li").height(actualLiHei); //li的高度
	$("#j_wj_con li div").height(actualDivHei);//div的高度
	
	$("#j_wj_con .swiper-container").height(actualConHei);
	
	/*点击li选中*/
	$("#j_wj_con li").click(function(){
		if(statusConfig = 1){
			var $img_check = $(this).find("h3 i img.img_check");
			var $img_nocheck = $(this).find("h3 i img.img_nocheck");
			if($img_check.is(':hidden')){
				$img_check.css("display","inline-block");
				$img_nocheck.css("display","none");
			}else{
				$img_check.css("display","none");
				$img_nocheck.css("display","inline-block");
			}
		}
	});
	
	//轮播图圆点居中
	var turnPlayBtnNum = $("#j_wj_con .iosSliderButtons .button").length;
	var btnMarginLeft = turnPlayBtnNum*(8+4)+10;
	$("#j_wj_con .iosSliderButtons").css('margin-left',-btnMarginLeft/2);
	
	//闪退
	$("#j_wj_yjpz").click(function(){
		$('.j_wj_tips').fadeIn(500).delay(1000).fadeOut(500)
	});
})

/*点击批量配置*/
function lotConfig(id){
	var btnConfigText = $("#"+id+" span").html();
	if( btnConfigText == '批量配置'){
		$("#"+id+" span").html('取消配置');
		//中间
		$("#j_wj_con li").addClass("current");
		$("#j_wj_con li h3 i").css('display','inline-block'); //这里是inline-block
		//底部
		$("#j_wj_foottop").show();
		$("#j_wj_footbot").removeClass("j_wj_ftb_noclick");
		$("#j_wj_footbot").addClass("j_wj_ftb_click");
		
		statusConfig = 1;
		
	}else{
		$("#"+id+" span").html('批量配置');
		//中间
		$("#j_wj_con li").removeClass("current");
		$("#j_wj_con li h3 i").css('display','none');
		//底部
		$("#j_wj_foottop").hide();
		$("#j_wj_footbot").removeClass("j_wj_ftb_click");
		$("#j_wj_footbot").addClass("j_wj_ftb_noclick");
		
		statusConfig = 0;
		
	}
}