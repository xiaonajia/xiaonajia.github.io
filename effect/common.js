/*
	toTwo(n): 
		将 0~9 转换成 00~09 ;

	getStyle(obj,attr): 
		获取 对象的 CSS 属性；

	doMove(obj,attr,target,step,endFn):
		某个对象移动 target 目标点， step步长

	getTime():
		获取时间，eg: "100000" ==> 10:00:00

	twinkleImg(oImg,firstImg,secImg):
		图片闪烁

	autoPlayClock(id):
		时间效果1


*/


/* 0~9 ==> 00~09 补零 */
function toTwo(n){
	return (n < 10) ? '0' + n : '' + n;
}

/*==获取css属性==*/
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//对象移动
function doMove(obj,attr,target,step,ms,endFn){
	clearInterval(obj.timer);
	step = ( parseInt(getStyle(obj,attr)) < target ) ? step : -step ;
	obj.timer = setInterval(function (){
		var speed = parseInt(getStyle(obj,attr)) + step;
		if(speed > target && step > 0 || speed < target && step < 0){ 
			speed =  target;
		}
		obj.style[attr] = speed + 'px';
		if(speed == target){
			clearInterval(obj.timer);
			endFn && endFn();
		}
	},ms);
}

/*== 获取时间 ==*/
function getTime(){
	var oDate = new Date();
	var time = 	toTwo(oDate.getHours()) 
				+ toTwo(oDate.getMinutes()) 
				+ toTwo(oDate.getSeconds());
	return time;
}

//图片闪烁
function twinkleImg(oImg,firstImg,secImg){
	for(var i = 0; i < oImg.length; i++){
		oImg[i]["src"] = firstImg;
	}
	setTimeout(function (){
		for(var i = 0; i < oImg.length; i++){
			oImg[i]["src"] = secImg;
		}
	},500);
}

/*== 时钟效果1 ==*/
function autoPlayClock(id){
	var oClock = document.getElementById(id);
	oClock.timer = null;

	autoPlay();
	clearInterval(oClock.timer);
	oClock.timer = setInterval(function(){
		autoPlay();
	},1000);

	function autoPlay(){
		var oDate = new Date();
		var str = 	toTwo(oDate.getHours()) +
					':' +
					toTwo(oDate.getMinutes()) +
					':' +
					toTwo(oDate.getSeconds());
		var dateStr = '';
		for(var i = 0; i < str.length; i++){
			dateStr += '<img src="img/'+ ((i==2 || i==5) ? 10 : str.charAt(i)) +'.png" />';
		}
		oClock.innerHTML = dateStr;
	}
}

/*== 时钟效果2--滑动 ==*/
function slidePlayClock(id){
	var oClock = document.getElementById(id);
	var aDivs = oClock.getElementsByTagName("div");
	var colonImg = oClock.querySelectorAll("li>img");
	var oldTime = getTime();
	oClock.timer = null;

	for(var i=0; i<aDivs.length; i++){ //初始化显示
		aDivs[i].getElementsByTagName("img")[0].src = 'img/' + oldTime[i] +'.png';
	}

	clearInterval(oClock.timer);
	oClock.timer = setInterval(function(){
		slidePlay();
	},1000);

	function slidePlay(){
		var str = getTime();

		for(var n = 0; n < str.length; n++){
			if(oldTime[n] !== str[n]){
				slide(n,str);
			}
		}

		oldTime = str;
		twinkleImg(colonImg,"img/10.png","img/11.png");
	}

	function slide(n,time){
		var aImgs = aDivs[n].getElementsByTagName("img");
		aImgs[1].src = 'img/'+time[n]+'.png'; 
		doMove(aDivs[n],'top',-50,5,50,function(){
			aImgs[0].src = 'img/'+time[n]+'.png';  
			aDivs[n].style.top = '';
		});
	}
}


/*===
	待完成：
		1-- 动态创建出效果2需要的元素，使用时，不用在页面上再去写对应的 css 和 html; -- 需要看完 DOM
		2-- for 循环中 i 的取值，以及作用域和闭包，以下两段代码，需要再仔细思考

			for(var i = 0; i < str.length; i++){
				var aImgs = aDivs[i].getElementsByTagName("img");
				aImgs[1].src = 'img/'+str[i]+'.png'; 
				var n = i;
				doMove(aDivs[n],'top',-50,5,function(){
					console.log(n);
					aImgs[0].src = 'img/'+str[n]+'.png';  
					aDivs[n].style.top = '';
				});
			}
			
			
			for(var n = 0; n < str.length; n++){
				if(oldTime[n] !== str[n]){
					slide(n,str);
				}
			}
			function slide(i,str){
				var aImgs = aDivs[i].getElementsByTagName("img");
				aImgs[1].src = 'img/'+str[i]+'.png'; 
				doMove(aDivs[i],'top',-50,5,50,function(){
					aImgs[0].src = 'img/'+str[i]+'.png';  
					aDivs[i].style.top = '';
				});
			}

===*/