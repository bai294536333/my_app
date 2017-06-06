
// -----------------------------------------------	
		// 属性
		// 	letterArr
		// 	len
		// 	speed
		// 	hp
		// 方法
		//  play
		// 	getLetter   获取字符
		// 	move		
		// 	key
// -----------------------------------------------------------------------------------------------------------------------------		
	function game(){
		// 1浏览器宽度 2数组A-Z字母A-Z图片 3每关卡字母个数 4下落速度 5生命值 6得分 7数组当前页面暂存个数 8通关个数 
		// 9页面div自定义属性 10生命文本对象 11得分文本对象 12数组-暂存div位置
		// this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		this.letterArr=[
			["A","img/A.png"],
			["B","img/B.png"],
			["C","img/C.png"],
			["D","img/D.png"],
			["E","img/E.png"],
			["F","img/F.png"],
			["G","img/G.png"],
			["H","img/H.png"],
			["I","img/I.png"],
			["J","img/J.png"],
			["K","img/K.png"],
			["L","img/L.png"],
			["M","img/M.png"],
			["N","img/N.png"],
			["O","img/O.png"],
			["P","img/P.png"],
			["Q","img/Q.png"],
			["R","img/R.png"],
			["S","img/S.png"],
			["T","img/T.png"],
			["U","img/U.png"],
			["V","img/V.png"],
			["W","img/W.png"],
			["X","img/X.png"],
			["Y","img/Y.png"],
			["Z","img/Z.png"],
		]	
		this.len=5;
		this.speed=5;
		this.hp=10;
		this.restore=0;
		this.currentArr=[];
		this.guan=10;
		this.hpObj=document.getElementsByTagName('div')[0].getElementsByTagName('span')[0];
		this.restoreObj=document.getElementsByTagName('div')[1].getElementsByTagName('span')[0];
		this.positionArr=[];
		this.GG=1;
		this.GGObj=document.getElementsByTagName('div')[2].getElementsByTagName('span')[0];
		this.GGObj.innerHTML=1;
	}	
// -----------------------------------------------------------------------------------------------------------------------------	
	game.prototype={
		play:function(){
			this.getLetter();
			this.move();
			this.key();
		},
		getLetter:function(){
			var self=this;
			for(var i=0;i<this.len;i++){
				this.getRandom();
			}
		},
		getRandom:function(){
			var self=this;
			// 创建随机下标
			var random=Math.floor(Math.random()*this.letterArr.length);
			// 判断下一次随机下标是否重复
			// while(this.checkRepeat(this.letterArr[random][0],this.currentArr)){
			// 	random=Math.floor(Math.random()*this.letterArr.length);	
			// }
			while(flags()){
				var random=Math.floor(Math.random()*this.letterArr.length);
			}
			function flags(){
				for(var j=0;j<self.currentArr.length;j++){
					if(self.letterArr[random][0]==self.currentArr[j].getAttribute('markup')){
						return true;
					} 
				}	
				return false;			
			}
			// 页面中创建新div 设置自定义属性
			var div=document.createElement("div");
			div.setAttribute('markup',this.letterArr[random][0]);
			// 获取随机出现位置 并且位置不叠加 创建新数组保存位置-用来比较产生新不重叠位置
			var tops=Math.random()*50+30;
			var lefts=Math.floor(Math.random()*900+200);
			while(this.checkPosition(lefts,this.positionArr)){
				lefts=Math.floor(Math.random()*900+200);
			}
			this.positionArr.push({minx:lefts,maxx:lefts+80});
			// 设置div样式-宽高A-Z字体大小颜色 定位top
			div.style.cssText="width:80px;height:80px;position:absolute;top:"+tops+"px;left:"+lefts+"px;z-index: 2;";
			div.innerHTML="<img src='"+this.letterArr[random][1]+"' height=80px width=80px>";
			document.body.appendChild(div)
			this.currentArr.push(div);	
		},
		checkPosition:function(lefts,arr){
			for(var i=0;i<arr.length;i++){
				if(!(arr[i].maxx<lefts||lefts+80<arr[i].minx)){
					return true;
				}
			}
			return false;
		},
		checkRepeat:function(char,arr){
			for(var i=0;i<arr.length;i++){
				if(char==arr[i].getAttribute("markup")){
					return true;
				}
				return false;
			}
		},
		move:function(){
			var self=this;
			this.t=setInterval(function(){
				for(var i=0;i<self.currentArr.length;i++){
					var tops=self.currentArr[i].offsetTop;
					self.currentArr[i].style.top=tops+self.speed+"px";
					if(tops>=500){
						self.hp--
						self.hpObj.innerHTML=self.hp;
						if(self.hp==0){
							var flag=confirm("GameOver!,是否要继续?");
							if(flag){
								self.chongX();
								return;
							}else{
								close()
							}
						}
						document.body.removeChild(self.currentArr[i]);
						self.currentArr.splice(i,1);
						self.positionArr.splice(i,1);
					}
					if(self.currentArr.length<self.len){
						self.getRandom();
					}
				}
			},60)
		},
		key:function(){
			var self=this;
			document.onkeydown=function(e){
				var keys=String.fromCharCode(e.keyCode);
				for(var i=0;i<self.currentArr.length;i++){
					if(keys==self.currentArr[i].getAttribute("markup")){
						document.body.removeChild(self.currentArr[i]);
						self.currentArr.splice(i,1);
						self.positionArr.splice(i,1);
						self.restore++;
						self.restoreObj.innerHTML=self.restore;
						if(self.restore==self.guan){
							self.GG++
							self.GGObj.innerHTML=self.GG;
							alert("恭喜你进入下一关");
							self.next();
						}
					}
				}
				if(self.currentArr.length<self.len){
					self.getRandom();
				}
			}
		},
		chongX:function(){
			clearInterval(this.t);
			this.len=5;
			this.speed=5;
			this.hp=10;
			this.restore=0;
			this.hpObj.innerHTML=10;
			this.restoreObj.innerHTML=0;
			for(var i=0;i<this.currentArr.length;i++){
				document.body.removeChild(this.currentArr[i]);
			}
			
			this.positionArr=[];
			this.currentArr=[];
			this.play();
		},
		next:function(){
			clearInterval(this.t);
			this.len++;
			this.speed++;
			this.hp=10;
			this.restore=0;
			this.hpObj.innerHTML=10;
			this.restoreObj.innerHTML=0;
			for(var i=0;i<this.currentArr.length;i++){
				document.body.removeChild(this.currentArr[i]);
			}
			this.positionArr=[];
			this.currentArr=[];
			this.play();
		}
	}
// -----------------------------------------------------------------------------------------------------------------------------	

