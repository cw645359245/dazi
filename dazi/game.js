








function game(){
	this.cw=document.documentElement.clientWidth;
	this.letterArr=[['A','img/a.jpg'],['B','img/b.jpg'],['C',"img/c.jpg"],['D',"img/d.jpg"],['F',"img/f.jpg"],['G',"img/g.jpg"],['H',"img/h.jpg"],['I',"img/i.jpg"],['J',"img/j.jpg"],['K',"img/k.jpg"],['L',"img/l.jpg"],['M',"img/m.jpg"],['N',"img/n.jpg"],['O',"img/o.jpg"],['P',"img/p.jpg"],['Q',"img/q.jpg"],['R',"img/r.jpg"],['S',"img/s.jpg"],['T',"img/t.jpg"],['U',"img/u.jpg"],
['V',"img/v.jpg"],['W',"img/w.jpg"],['X',"img/x.jpg"],['Y',"img/y.jpg"],['Z',"img/z.jpg"]]
    this.len=5;
    this.speed=5;
    this.hp=10;
    this.next=0;
    this.score=0;
    this.guans=10;
    this.hpobj=document.getElementsByClassName('hp')[0];
	this.scoreobj=document.getElementsByClassName('score')[0];
	this.currentArr=[];
    this.positionArr=[];
}


game.prototype={
	play:function(){
		this.getletter();
		this.move();
		this.key();
	},
	getletter:function(){
	     for(var i=0;i<this.len;i++){
	     	this.getRandom();
	     }
    },
	getRandom:function(){

	// for(var i=0;i<this.len;i++){
			var random=Math.floor(Math.random()*this.letterArr.length);
			while(this.repeat(this.letterArr[random][0],this.currentArr)){
				random=Math.floor(Math.random()*this.letterArr.length);
			}
			var div=document.createElement('div');
			div.setAttribute("index",this.letterArr[random][0]);
			var  tops=Math.random()*80+20
			var  lefts=100+(this.cw-250)*Math.random();
			while(this.checkPosition(lefts,this.positionArr,100)){
				lefts=100+(this.cw-250)*Math.random();
			}
			this.positionArr.push({minx:lefts,maxx:lefts+100});
			div.style.cssText="width:50px;height:50px;background:#475157;line-height:50px;text-align:center;font-size:20px;color:white;position:absolute;left:"+lefts+"px;top:"+tops+"px";
            // div.innerHTML=this.letterArr[random];
            div.innerHTML="<img src="+this.letterArr[random][1]+">"
            document.body.appendChild(div);
            this.currentArr.push(div)
		// }

		},
		repeat:function(char,arr){
			for(var i=0;i<arr.length;i++){
				if (char==arr[i].getAttribute("index")) {
					return true;
				}
			}
			return false;
		},
		checkPosition:function(lefts,arr,widths){
			for(var i=0;i<arr.length;i++){
				if(!(arr[i].maxx+10<lefts||lefts+widths+10<arr[i].minx)){
					return true;
				}
			}
			return false;
		},
	move:function(){
		self=this;
		self.t=setInterval(function(){
			for(var i=0;i<self.currentArr.length;i++){
				var tops=self.currentArr[i].offsetTop;
				self.currentArr[i].style.top=tops+self.speed+'px';
				if(tops>600){
					document.body.removeChild(self.currentArr[i])
					self.currentArr.splice(i,1);
					self.positionArr.splice(i,1);
					self.hp--;
					self.hpobj.innerHTML=self.hp;
					if(self.hp==0){
						var flag=confirm("游戏结束是否重新开始");
						if(flag){
							self.restore();
						}else{
							close();
						}
					}
				}
				if(self.currentArr.length<self.len){
					self.getRandom();
				}
				// if(self.currentArr.length<self.len){
				// 	var random=Math.floor(Math.random()*self.letterArr.length);
				// 	var div=document.createElement('div');
				// 	var  tops=Math.random()*80+20+'px'
				// 	var  lefts=Math.random()*800+200+'px';
				// 	div.style.cssText="width:50px;height:50px;background:#F7C69C;line-height:50px;text-align:center;font-size:20px;color:white;position:absolute;left:"+lefts+"px;top:"+tops+"px";
    //        			 div.innerHTML=self.letterArr[random];
    //         		document.body.appendChild(div);
    //         		self.currentArr.push(div)
				// }
			}
		},100)
	},
	key:function(){
		self=this;
		document.onkeydown=function(e){
			var keys=String.fromCharCode(e.keyCode);
			for(var i=0;i<self.currentArr.length;i++){
				if(keys==self.currentArr[i].getAttribute("index")){
					document.body.removeChild(self.currentArr[i])
					self.currentArr.splice(i,1);
					self.positionArr.splice(i,1);
					self.score++;
					self.scoreobj.innerHTML=self.score;
					if(self.score==self.guans){
							self.guan();

					}

				}
			}
			if(self.currentArr.length<self.len){
				self.getRandom();
					// var random=Math.floor(Math.random()*self.letterArr.length);
					// var div=document.createElement('div');
					// var  tops=Math.random()*80+20+'px';
					// var  lefts=Math.random()*800+200+'px';
					// div.style.cssText="width:50px;height:50px;background:#F0B5B2;line-height:50px;text-align:center;font-size:20px;color:white;position:absolute;left:"+lefts+";top:"+tops+"";
     //       			 div.innerHTML=self.letterArr[random];
     //        		document.body.appendChild(div);
     //        		self.currentArr.push(div)
			}
		}
	},
	restore:function(){
		clearInterval(this.t);
		for(var i=0;i<this.currentArr.length;i++){
			document.body.removeChild(this.currentArr[i]);
		}
		 this.len=5;
	    this.speed=5;
	    this.hp=10;
	    // this.next=0;
	    this.score=0;
	    this.currentArr=[];
	    this.positionArr=[];
	    // this.guans=10;
	    this.hpobj=document.getElementsByClassName('hp')[0];
		this.scoreobj=document.getElementsByClassName('score')[0];
		
	    this.hpobj.innerHTML=this.hp;
		this.score.innerHTML=this.score;
	    this.play();
},

guan:function(){
		clearInterval(this.t);
		for(var i=0;i<this.currentArr.length;i++){
			document.body.removeChild(this.currentArr[i]);
		}

		// this.len=5;
		this.len++;
		// this.speed=5;
		this.speed++;
		this.guans+=10;
		this.next++;
		this.hp=10;
		this.score=0;
		// this.score++;
		this.currentArr=[];
		this.positionArr=[];
		this.hpobj=document.getElementsByClassName('hp')[0];
		this.scoreobj=document.getElementsByClassName('score')[0];
		this.hpobj.innerHTML=this.hp;
		this.score.innerHTML=0;
		this.play();
	}


}