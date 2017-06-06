
// -----------------------------------------------	
		// 属性
		// 	len
		// 	color
		// 	speed
		// 	time
		// 方法
		//  sence
		// 	move   获取字符
		// 	drop		
		// 	restar
		//  next
// -----------------------------------------------------------------------------------------------------------------------------		
	function snake(){
		// this.len=;
		// this.color=;
		this.sence=document.getElementsByClassName("sence")[0];
		this.she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		this.flag={"0_0":true,"0_1":true,"0_2":true};
		this.dir=39;
	}
	snake.prototype={
		play:function(){
			this.drawLine();
			this.drawSnake();
			this.keyDown();
			this.goon();
			this.dropFood();
		},
		drawLine:function(){
			for(var i=0;i<20;i++){
				for(var j=0;j<20;j++){
					var divs=document.createElement("div");
					divs.classList.add("block");
					divs.id=i+"_"+j;
					this.sence.appendChild(divs);
				}
			}
		},
		drawSnake:function(){
			for(var i=0;i<this.she.length;i++){
				var divss=document.getElementById(this.she[i].x+"_"+this.she[i].y);
				divss.style.background="red";
			}
		},
		keyDown:function(){
			self=this;
			document.onkeydown=function(e){
				var key=e.keyCode;
				if(Math.abs(self.dir-key)==2){
					return;
				}
				self.dir=key;
			}
		},
		goon:function(){
			var self=this;
			self.tt=setInterval(function(){
				if(self.dir==39){
					var oldtou=self.she[self.she.length-1]
					var newtou={x:oldtou.x,y:oldtou.y+1}
				}else if(self.dir==40){
					var oldtou=self.she[self.she.length-1]
					var newtou={x:oldtou.x+1,y:oldtou.y}
				}else if(self.dir==37){
					var oldtou=self.she[self.she.length-1]
					var newtou={x:oldtou.x,y:oldtou.y-1}
				}else if(self.dir==38){
					var oldtou=self.she[self.she.length-1]
					var newtou={x:oldtou.x-1,y:oldtou.y}
				}
				if(newtou.x<0||newtou.x>19||newtou.y<0||newtou.y>19||self.flag[newtou.x+"_"+newtou.y]){
					alert("你输了");
					clearInterval(self.tt);
					return ;
				}
				if(newtou.x==self.food.x&&newtou.y==self.food.y){
					self.she.push(newtou);
					self.flag[newtou.x+"_"+newtou.y]=true;
					self.dropFood();
					self.drawSnake();
				}else{
					self.she.push(newtou);
					self.flag[newtou.x+"_"+newtou.y]=true;
					var weiba=self.she[0];
					document.getElementById(weiba.x+"_"+weiba.y).style.background="#fff";
					self.she.shift();
					delete self.flag[weiba.x+"_"+weiba.y]
					self.drawSnake();
				}	
			},100)			
		},
		dropFood:function(){
			var xx=Math.floor(Math.random()*20);
			var yy=Math.floor(Math.random()*20);
			while(this.flag[xx+"_"+yy]){
				var xx=Math.floor(Math.random*20);
				var yy=Math.floor(Math.random*20);
			}
			document.getElementById(xx+"_"+yy).style.background="green";
			this.food={x:xx,y:yy}
		}
	}
	
// -----------------------------------------------------------------------------------------------------------------------------	

// 降序排列
// function PaixvDown(arr){
// 	var num=0;
// 	for(var i=0;i<arr.length;i++){
// 		for(var j=i+1;j<arr.length;j++){
// 			if(arr[i]<arr[j]){
// 				num=arr[i];
// 				arr[i]=arr[j];
// 				arr[j]=num;
// 			}
// 		}
// 	}
// 	return arr;
// }
// var arr=[2,5,7,2,4];
// PaixvDown(arr)