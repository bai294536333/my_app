

// -------------------------------------------------------
// 获取指定类名元素的集合1 getClass(classname,ranger)
	function getClass(classname,ranger){
		ranger= ranger===undefined?document:ranger;
		// ranger=ranger||document;
		// ranger= ranger?ranger:document;
		if(document.getElementsByclassName){
			return ranger.getElementsByclassName(classname);
		}else{
			var newarr=[];
			var all=ranger.getElementsByTagName("*")
			for(i=0;i<all.length;i++){
				var flag=checkClass(all[i].className,classname)
				if(flag){
					newarr.push(all[i])
				}
			}
			return newarr;
		}
	}
// -------------------------------------------------------
// 获取指定类名元素的集合2 checkClass(str,values)
	function checkClass(str,values){
		var narr=str.split(" ");
		for(var i=0;i<narr.length;i++){
			if(narr[i]==values){
				return true;
			}
		}
		return false;
	}
// -------------------------------------------------------
// 获取指定对象的集合 $(select,range)
	function $(select,range){
		if(typeof(select)=="string"){
			// 字符串 获取元素
			range= range===undefined?document:range;
			var first=select.charAt(0);
			if(first=="."){
				return getClass(select.slice(1),range)
			}else if(first=="#"){
				return range.getElementById(select.slice(1))
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
				return range.getElementsByTagName(select)
			}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
				return document.createElement(select.slice(1,-1))
			}
		}else if(typeof(select)=="function"){
			// 函数 window.onload
			// window.onload=function(){
			// 	select();
			// }
			addEvent(window,"load",select)
		}	
		
	}
// -------------------------------------------------------
// 获取指定对象样式 getStyle(obj,attr)
	function getStyle(obj,attr){
		if(window.getComputedStyle){
				return getComputedStyle(obj,null)[attr];
			}else{
				return obj.currentStyle[attr];
			}
	}
// -------------------------------------------------------
// 进行设置或者获取obj文本 setText(obj,value)
	function setText(obj,value){
		if(value){
			if(obj.innerText){
				return obj.innerText=value;
			}else{
				return obj.textContent=value;
			}
		}else{
			if(obj.innerText){
				return obj.innerText;
			}else{
				return obj.textContent;
			}
		}
	}
// -------------------------------------------------------
// 获取子节点 getChilds(obj,type)
	// obj:指定的元素
	// type:获取类型 有意义文本/元素节点
	function getChilds(obj,type){
		type=type||false;
		// type=type?type:false;
		var childs=obj.childNodes;
		var arr=[];
		if(type){
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.trim().length!=0)){
					arr.push(childs[i]);
				}
			}
			return arr;
		}else{
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1){
					arr.push(childs[i]);
				}
			}
			return arr;
		}
	}
// -------------------------------------------------------
// 获取下一个兄弟节点 getNext(obj)
	// 获取obj的下一个元素节点
	// 思路:获取obj下个兄弟元素 判断是否为元素节点
	function getNext(obj){
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		while(next.nodeType==3||next.nodeType==8){
		// while(next.nodeType==1){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
// -------------------------------------------------------
// 获取上一个兄弟节点 getPrevious(obj)
	function getPrevious(obj){
		var previous=obj.previousSibling;
		if(previous==null){
			return false;
		}
		while(previous.nodeType==3||previous.nodeType==8){
		// while(next.nodeType!==1){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}
// -------------------------------------------------------
// 获取第一个子节点 firstChild(obj,type)
	// obj 父元素
	// type 有意义的文本元素 ture/false
	function firstChild(obj,type){
		return getChilds(obj,type)[0]
	}
// -------------------------------------------------------
// 获取最后子元素 lastChild(obj)
	function lastChild(obj){
		var childs=getChilds(obj);
		return childs[childs.length-1]
	}
// -------------------------------------------------------
// 获取随机子元素 randomChild(obj,num)
	function randomChild(obj,num){
		var childs=getChilds(obj);
		return Childs[num]
	}
// -------------------------------------------------------
// 特定元素插入到指定元素后面 insertAfter(newnode,pnode)
	// 特定元素 newnode
	// 指定元素 pnode
	function insertAfter(newnode,pnode){
		var sibling=getNext(pnode);
		if(sibling){
			var parent=pnode.parentNode;
			parent.insertBefore(newnode,sibling)
		}else{
			var parent=pnode.parentNode;
			parent.appendChild(newnode);  
		}
	}
// -------------------------------------------------------
// 特定元素插入到父元素最后面 appendAfter(parent,node)
	// panrent 父元素
	// node 要插入元素
	function appendAfter(parent,node){
		parent.appendChild(node);
	}
// -------------------------------------------------------
// 特定元素插入到父元素最前面 appendBefore(parent,node)
	// panrent 父元素
	// node 要插入元素
	function appendBefore(parent,node){
		var first=firstChild(parent);
		parent.insertBefore(node,first)
	}
// -------------------------------------------------------
// 移动滚动广告-封装函数 nodeCarousel(obj,num)
	function nodeCarousel(obj,num){
		var nSon=$(".nSon",obj);
		var nwin=$(".gdgg")[0];
		var nWidths=parseInt(getStyle(nSon[0],"width"))+parseInt(getStyle(nSon[0],"margin-right"));
		
		var newt=setInterval(newMoveL,1500);
	// 左
		function newMoveL(){
			animate(obj,{left:-num*nWidths},function(){
				for(var i=0;i<num;i++){
					var first=firstChild(obj);
					appendAfter(obj,first);
					obj.style.left=0;
					nodeflag=true;
				}
				
			})
		}
	// 右
		function newMoveR(){
			var last=lastChild(obj);
			appendBefore(obj,last);
			for(var i=0;i<num;i++){
				obj.style.left=-num*nWidths+"px";
				animate(obj,{left:0},function(){
					nodeflag=true;
				})
			}
		}
	// 鼠标移入轮播图悬停效果
		nwin.onmouseover=function(){
			clearInterval(newt);
		}
		nwin.onmouseout=function(){
			newt=setInterval(newMoveL,1500);
		}
	// 左右箭头-点击轮播运行一次
		var nodeflag=true;
		var nodeBtnL=$(".nodeBtnL")[0];
		var nodeBtnR=$('.nodeBtnR')[0];
		nodeBtnL.onclick=function(){
			if(!nodeflag){
				return ;
			}
			nodeflag=false;
			newMoveL();
			return false;
		}
		nodeBtnR.onclick=function(){
			if(!nodeflag){
				return ;
			}
			nodeflag=false;
			newMoveR();
			return false;
		}
	}
// -------------------------------------------------------
// 边框线性移动效果-面向对象 xianY()
	Node.prototype.xianY=function(){
		var topT=$(".topT",this)[0]
		var leftL=$(".leftL",this)[0]
		var rightR=$(".rightR",this)[0]
		var bottomB=$(".bottomB",this)[0]
		this.onmouseover=function(){
			animate(topT,{width:this.offsetWidth});
			animate(leftL,{height:this.offsetHeight});
			animate(rightR,{height:this.offsetHeight});
			animate(bottomB,{width:this.offsetWidth});
		}
		this.onmouseout=function(){
			animate(topT,{width:0});
			animate(leftL,{height:0});
			animate(rightR,{height:0});
			animate(bottomB,{width:0});
		}
	}
// -------------------------------------------------------
// 银泰滚动广告-封装函数 bannerCarousel(obj)
	function bannerCarousel(obj){
		var imgBoxTY=$(".imgBoxTY",obj)[0];
		var imgsTY=$("a",imgBoxTY);
		var itemTY=$(".itemTY",obj)[0];
		var lisTY=$("li",itemTY);
		var btnLTY=$(".btnLTY",obj)[0];
		var btnRTY=$(".btnRTY",obj)[0];
		var widthsTY=parseInt(getStyle(obj,"width"))
		for(var i=0;i<imgsTY.length;i++){
			if(i==0){
				continue;
			}
			imgsTY[i].style.left=widthsTY+"px";

		}
		// var tTY=setInterval(moveLTY,1500);
		var nowTY=0;
		var nextTY=0;
		function moveLTY(){
			nextTY++;
			if(nextTY==imgsTY.length){
				nextTY=0;
			}
			lisTY[nowTY].style.background="#6E6E6E";
			lisTY[nextTY].style.background="red";
			imgsTY[nextTY].style.left=widthsTY+"px";
			animate(imgsTY[nowTY],{left:-widthsTY},function(){
					flag=true;
				});
			animate(imgsTY[nextTY],{left:0},function(){
					flag=true;
				});
			nowTY=nextTY;
		}
		function moveRTY(){
			nextTY--;
			if(nextTY<0){
				nextTY=imgsTY.length-1;
			}
			lisTY[nowTY].style.background="#6E6E6E";
			lisTY[nextTY].style.background="red";
			imgsTY[nextTY].style.left=-widthsTY+"px";
			animate(imgsTY[nowTY],{left:widthsTY},function(){
					flag=true;
				});
			animate(imgsTY[nextTY],{left:0},function(){
					flag=true;
				});
			nowTY=nextTY;
		}
		obj.onmouseover=function(){
			// clearInterval(tTY);
			btnLTY.style.opacity="0.7";
			btnRTY.style.opacity="0.7";
		}
		obj.onmouseout=function(){
			// tTY=setInterval(moveLTY,1500);
			btnRTY.style.opacity="0";
			btnLTY.style.opacity="0";
		}
		for(var i=0;i<lisTY.length;i++){
			lisTY[i].index=i;
			lisTY[i].onclick=function(){
				lisTY[nowTY].style.background="#6E6E6E";
				lisTY[this.index].style.background="red";
				if(this.index>nowTY){
					imgsTY[this.index].style.left=widthsTY+"px";
					animate(imgsTY[nowTY],{left:-widthsTY});
					animate(imgsTY[this.index],{left:0});
				}else if(this.index<nowTY){
					imgsTY[this.index].style.left=-widthsTY+"px";
					animate(imgsTY[nowTY],{left:widthsTY});
					animate(imgsTY[this.index],{left:0});
				}
				// if(this.index=now){
				// 	return ;
				// }
				nowTY=this.index;
				nextTY=this.index;
			}
		}
		var flag=true;
		btnRTY.onclick=function(){
			if(!flag){
				return ;
			}
			flag=false;
			moveLTY()
			return false;
		}
		btnLTY.onclick=function(){
			if(!flag){
				return ;
			}
			flag=false;
			moveRTY()
			return false;
		}
	}
// -------------------------------------------------------
// 银泰滚动logo-封装函数 logoCarousel(obj)
	function logoCarousel(obj){
		var GundongBoxTY=$(".GundongBoxTY",obj)[0];
		var imgsLogoS=$("a",GundongBoxTY);
		var btnJL=$(".btnJL",obj)[0];
		var btnJR=$(".btnJR",obj)[0];
		var widthsLogo=parseInt(getStyle(GundongBoxTY,"width"));
		for(var i=0;i<imgsLogoS.length;i++){
			if(i==0){
				continue;
			}
			imgsLogoS[i].style.left=widthsLogo+"px";
		}
		// var tLogo=setInterval(moveLogL,1000);
		var nowL=0;
		var nextL=0;
		function moveLogL(){
			nextL++;
			if(nextL==imgsLogoS.length){
				nextL=0;
			}
			imgsLogoS[nextL].style.left=widthsLogo+"px";
			animate(imgsLogoS[nowL],{left:-widthsLogo});
			animate(imgsLogoS[nextL],{left:0});
			nowL=nextL;
		}
		function moveLogR(){
			nextL--;
			if(nextL<0){
				nextL=imgsLogoS.length-1;
			}
			imgsLogoS[nextL].style.left=-widthsLogo+"px";
			animate(imgsLogoS[nowL],{left:widthsLogo});
			animate(imgsLogoS[nextL],{left:0});
			nowL=nextL;
		}
		btnJL.onclick=function(){
			moveLogL()
		}
		btnJR.onclick=function(){
			moveLogR()
		}
	}
// -------------------------------------------------------
// 同一事件绑定多事件处理程序-兼容性 addEvent(obj,type,fn)
// 同一事件删除多事件处理程序-兼容性 removeEvent(obj,type,fn)
	// type click
	// fn 函数名
	function addEvent(obj,type,fn){
		if(obj.addEventListener){
			obj.addEventListener(type,fn,false);
		}else{
			obj.attachEvent("on"+type,fn);
		}
	}
	function removeEvent(obj,type,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(type,fn,false);
		}else{
			obj.detachEvent("on"+type,fn);
		}

	}
// -------------------------------------------------------
// 用来获取页面中任意元素相对于浏览器坐标 offset(obj);
	// arr[left,top] {left:100,top:100}
	// left:自身offsetleft+定位父元素offsetleft+父元素左边框
	// 1 获取元素 whileparent==body getStyle(obj,"position")
	// 2 数组 本身 +定位父元素 循环 获取left值
	function offset(obj){
		var result={left:0,top:0};
		var parent=obj.parentNode;
		var arr=[];
		arr.push(obj)
		while(parent.nodeName!=="BODY"){
			var flag=getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute";
			if(flag){
				arr.push(parent);
			}
			parent=parent.parentNode;
		}
		// 求值
		for(var i=0;i<arr.length;i++){
			var lefts=arr[i].offsetLeft;
			var tops=arr[i].offsetTop;
			var borderLeft=getStyle(arr[i],"border-left-width")?parseInt(getStyle(arr[i],"border-left-width")):0;
			var borderTop=getStyle(arr[i],"border-top-width")?parseInt(getStyle(arr[i],"border-top-width")):0;
			if (i==0){
				borderLeft=0;
				borderTop=0;
			}
			result.left+=(lefts+borderLeft);
			result.top+=(tops+borderTop);
		}
		return result;
	}
// -------------------------------------------------------
// 鼠标鼠标按下移动-拖拽移动框

	// function drag(obj,option){
	// 	this.obj=obj;
	// 	this.isX=option.isX===undefined?true:option.isX;
	// 	this.isY=option.isY===undefined?true:option.isY;
	// 	this.minX=option.rangeX===undefined?window.innerWidth:option.rangeX[0];
	// 	this.maxX=option.rangeX===undefined?window.innerWidth:option.rangeX[1];
	// 	this.minY=option.rangeY===undefined?window.innerWidth:option.rangeY[0];
	// 	this.maxY=option.rangeY===undefined?window.innerWidth:option.rangeY[1];
	// }
	// drag.prototype={
	// 	play:function(){
	// 		this.dowN()
	// 	}
	// 	dowN:function(){
	// 		this.obj.onmousedown=function(e){
	// 			var e=e||window.event;
	// 			var ox=e.offsetX;
	// 			var oy=e.offsetY;
	// 			document.onmousemove=function(e){
	// 				var self=this;
	// 				var e=e||window.event;
	// 				var cx=e.clientX;
	// 				var cy=e.clientY;
	// 				var lefts=cx-ox-(offset(self.obj).left-self.obj.offsetLeft);
	// 				var tops=cy-oy-(offset(self.obj).top-self.obj.offsetTop);
	// 				if(self.isX){
	// 					if(lefts>=self.maxX){
	// 						lefts=self.maxX;
	// 					}if(lefts<self.minX){
	// 						lefts=self.minX;
	// 					}
	// 					self.obj.style.left=lefts+"px";
	// 				}
	// 				if(self.isY){
	// 					if(tops>=self.maxY){
	// 						tops=self.maxY;
	// 					}if(tops<self.minY){
	// 						tops=self.minY;
	// 					}
	// 					self.obj.style.top=tops+"px";
	// 				}
	// 			}
	// 		}
	// 		self.obj.onmouseup=function(){
	// 			document.onmousemove=null;
	// 			self.obj.onmouseup=null;
	// 		}
	// 	}
	// }
// -------------------------------------------------------
// 鼠标滚轮-上下滚动执行不同函数 mouseWheel(obj,upFn,downFn)
	function mouseWheel(obj,upFn,downFn){
		if(document.attachEvent){
			obj.attachEvent("onmousewheel",fn);
		}else if(document.addEventListener){
			obj.addEventListener("mousewheel",fn,false);
			obj.addEventListener("DOMMouseScroll",fn,false);
		}
		function fn(e){
			e=e||window.event;
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
			if(e.wheelDelta==-120||e.detail==3){
				downFn.call(obj)
			}else if(e.wheelDelta==120||e.detail==-3){
				upFn.call(obj)
			}
		}
	}
// -------------------------------------------------------







