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

/*== 使用正则检测查找字符串中出现次数最多的字母和次数 ==*/
function searchMaxStr(){
	var str = 'dsfagfasssssfffagff';
	var arr = str.split("");
	str = arr.sort().join("");
	
	var index = 0;
	var value = '';

	var re = /(\w)\1+/g;
	str.replace(re,function($0,$1){
		if(index < $0.length){
			index = $0.length;
			value = $1;
		}
	});
	console.log("出现次数最多的是：" + value + "次数是：" + index);
}


/*== 面向对象写选项卡切换 ==*/
function Tab(id){
	this.oParent = document.getElementById(id);
	this.aInput = this.oParent.getElementsByTagName("input");
	this.aDiv = this.oParent.getElementsByTagName("div");
	this.iNow = 0;
}
Tab.prototype.init = function (){
	var _this = this;
	for(var i = 0; i < this.aInput.length; i++){
		this.aInput[i].index = i;
		this.aInput[i].onclick = function (){
			 _this.change(this);
		};
	}
}
Tab.prototype.change = function (obj){
	for(var j = 0; j < this.aInput.length; j++){
		this.aDiv[j].style.display = 'none';
		this.aInput[j].className = '';
	}
	this.aDiv[obj.index].style.display = 'block';
	obj.className = 'active';
}

Tab.prototype.autoPlay = function (){
	var _this = this;
	setInterval(function (){
		if(_this.iNow == _this.aInput.length - 1){
			_this.iNow = 0;
		}else{
			_this.iNow ++ ;
		}
		for(var j = 0; j < _this.aInput.length; j++){
			_this.aDiv[j].style.display = 'none';
			_this.aInput[j].className = '';
		}
		_this.aDiv[_this.iNow].style.display = 'block';
		_this.aInput[_this.iNow].className = 'active';
		
	},2000);
}

/*== 面向对象写  拖拽 切换 ==*/
function Drag(){
	this.oDrag = null;
	this.disX = 0;
	this.disY = 0;
}

Drag.prototype.init = function (id,toDown,toUp){
	var _this = this;
	this.oDrag = document.getElementById(id);
	this.oDrag.onmousedown = function(ev){
		var ev = ev || window.event; //ev是事件才有的，所以应该写在这儿，firefox
		if(toDown) toDown();
		_this.fnDown(ev);
		document.onmousemove = function (ev){
			var ev = ev || window.event;
			_this.fnMove(ev);
		};
		document.onmouseup = function (){
			if(toUp) toUp();
			_this.fnUp();
		};
		return false; //阻止默认事件，也应该写在事件内部，chrome
	};
}

Drag.prototype.fnDown = function (ev){
	var _this = this;
	this.disX = ev.clientX - this.oDrag.offsetLeft;
	this.disY = ev.clientY - this.oDrag.offsetTop;

	if(this.oDrag.setCapture){
		this.oDrag.setCapture();
	}
}

Drag.prototype.fnMove = function (ev){
	this.oDrag.style.left = ev.clientX - this.disX + 'px';
	this.oDrag.style.top = ev.clientY - this.disY + 'px';
}

Drag.prototype.fnUp = function (){
	document.onmousemove = null;
	document.onmouseup =  null;
	if(this.relaseCapture){
		this.relaseCapture();
	}
}

/*== 拷贝继承-- ==*/
function ChildDrag(id){
	Drag.call(this,id);
}
extend(ChildDrag.prototype, Drag.prototype);

ChildDrag.prototype.fnMove = function (ev){ //改写子类方法，限制范围
	var L = ev.clientX - this.disX;
	var T = ev.clientY - this.disY;
	if(L < 0){
		L = 0;
	}else if(L > document.documentElement.clientWidth - this.oDrag.offsetWidth){
		L = document.documentElement.clientWidth - this.oDrag.offsetWidth;
	}

	if(T < 0){
		T = 0;
	}else if(T > document.documentElement.clientHeight - this.oDrag.offsetHeight){
		T = document.documentElement.clientHeight - this.oDrag.offsetHeight;
	}

	this.oDrag.style.left = L + 'px';
	this.oDrag.style.top = T + 'px';
}

/*== 把一个对象拷贝赋值给另一个对象 ==*/
function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] =  obj2[attr];
	}
}

/*== 弹窗组件 ==*/
function Dialog(){
	this.oDiaglog = null;
	this.settings = {
		w: 300,
		h: 300,
		pos: 'center',
		title: ''
	}
}
Dialog.prototype.init = function (obj){
	extend(this.settings, obj);
	this.create();
	this.fnClose();
}
Dialog.prototype.create = function (){
	this.oDiaglog = document.createElement('div');
	this.oDiaglog.className = 'dialog';
	this.oDiaglog.innerHTML = '<div class="title"><span>'+ this.settings.title +'</span><span class="close">X</span></div><div class="con"></div>';
	document.body.appendChild(this.oDiaglog);

	this.setData();
}
Dialog.prototype.setData = function (){
	this.oDiaglog.style.width = this.settings.w + 'px';
	this.oDiaglog.style.height = this.settings.h + 'px';

	if(this.settings.pos == 'center'){
		this.oDiaglog.style.left = (viewWith()- this.oDiaglog.offsetWidth ) /2 + 'px';
		this.oDiaglog.style.top = (viewHeight() - this.oDiaglog.offsetHeight ) /2 + 'px';
	}
	else if(this.settings.pos == 'right'){
		this.oDiaglog.style.left = (viewWith()- this.oDiaglog.offsetWidth )  + 'px';
		this.oDiaglog.style.top = (viewHeight() - this.oDiaglog.offsetHeight )  + 'px';
	}
}
Dialog.prototype.fnClose = function (){
	var oClose = this.oDiaglog.getElementsByTagName("span")[1];
	var _this = this;
	oClose.onclick = function (){
		document.body.removeChild(_this.oDiaglog);
	}
}


function viewWith(){
	return document.documentElement.clientWidth;
}
function viewHeight(){
	return document.documentElement.clientHeight; 
}







