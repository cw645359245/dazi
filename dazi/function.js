// getClass(classname)
// 获取指定拥有指定类名元素的集合 
// classname  指定的类名


// 思路
  
//   -判断浏览器
//      document.getElementsByClassName
//   -true
//    直接用document。getElementsByClassName()
//    false
//    已知方法来模拟：从所用的元素当中筛选className=指定的类名
//     classname   obj.className


function getClass(classname,ranger){
	ranger=ranger===undefined?document:ranger;
	if (document.getElementsByClassName){
		return ranger.getElementsByClassName(classname)
	}else{
		var all=ranger.getElementsByTagName("*");
		var newr=[]
		for (var i=0;i<all.length;i++){
			var flag=checkClass(all[i].className,classname);
			if(flag){
				newr.push(all[i]);
			}
		}
		return newr;
	}
}







// checkClass(str,value)
// 检测str里面包含value
// str：类名 value:指定classname
// 包含true  否则false
// str









function checkClass(str,value){
	var arr=str.split(' ');
	for (var i=0;i<arr.length;i++){
		if (arr[i]==value) {
			return  true;
		}

	}
	return   false;

}

















  // 一、判断select首字符
   //      .     1通过类名
   //       #    通过id
   //   符合标签名  通过标签名


function $(select,range){
   if(typeof(select)=="string"){
    // 字符串
	  range=range===undefined?document:range;
    var first=select.charAt(0);
       if (first==".") {
    	return getClass(select.slice(1),range)
       }
        else if (first=="#") {
    	return  range.getElementById(select.slice(1))
       }
     else if (/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)) {
        return range.getElementsByTagName(select);
     }else if( /^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
        return   document.createElement(select,slice(1,-1))
     }
   } else if(typeof(select)=="function"){
  
    // 函数
      // window.onload=function(){
      // select();
      // }
      addEvent(window,'load',select)
   }
}




/*setText(obj,value)
设置或者是获取obj的文本
obj:指定的对象
value：设置文本
思路：
一、判断value
   进行文本设置
   获取文本 
二 、判断浏览器
三、设置

obj.innerText(text Content)=value;
四、获取
 */






function setText(obj,value){
    if (value) {
    	// 设置
       if (obj.innerText) {
       	obj.innerText=value;
       }else{
       	obj.textContent=value;
       }
    }else{
    	// 获取
    	 if (obj.innerText) {
       	return obj.innerText;
       }else{
       	  return obj.textContent;
       }

    }
}

















/*获取某一个指定的对象的某一个样式
getStyle(obj,attr)
obj:指定的对象
attr:指定的样式
思路：
一 、
getComputedStyle(obj,null).attr
 obj.currentStyle.属性*/

function getStyle(obj,attr){
	if (getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}
	else{
		return  obj.currentStyle[attr];

	}
}


/*思路；
 getChilds(0bj,type  )
获取obj的元素节点的集合
obj:指定对象
type：有意义的文本和元素节点
 1获取所有子节点
 2、筛选节点类型*/

function getChilds(obj,type){
    type=type||false;
      var childs=obj.childNodes;
      var arr=[];
      if (type){
      // 文本和元素
        for (var i=0;i<childs.length;i++){
        if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.trim().length!=0)){
          arr.push(childs[i]);
        }
       }
      return arr;
    }else{
      // 元素节点
       for (var i=0;i<childs.length;i++){
          if(childs[i].nodeType==1){
             arr.push(childs[i]);
          }
        }  
       return arr;
    }  
}
/*获取第一个节点*/

function firstChild(obj,type){
  return getChilds(obj,type)[0];
}

/*获取最后一个节点*/
function lastChild(obj,type){
  var  child=getChilds(obj,type);
 return  child[child.length-1]

}
/*获取随机的一个节点*/
function randomChild(obj,num){
     var  child=getChilds(obj)[num]
     return child;
} 















// 获取下一个元素节点

/*获取下一个兄弟元素(元素节点)
1、获取obj的兄弟元素next
2、判断next是否是一个元素节点
3、更新next=next.nextsibling
*/
function getNext(obj){
  var next=obj.nextSibling;
  if (next===null) {
    return false;
  }
 while(next.nodeType==3||next.nodeType==8){
      next=next.nextSibling;
      if (next===null) {
        return false
      }
 }

 return next;


}







// 获取上一个元素的节点


function getPrevious(obj){
  var previous=obj.previousSibling;
  if (previous===null) {
    return false;
  }
 while(previous.nodeType==3||previous.nodeType==8){
      previous=previous.previousSibling;
      if (previous===null) {
        return false;
      }
 }

 return previous;


}




/*把一个特点元素newnode插到指定元素pnode的后面*/
// 把nnode插入到pnode兄弟元素的前面
// sibling
// parent.insertBefore(nnode,phode)
// 插入一个元素的后面
function insertAfter(nnode,pnode){
    var sibling=getChilds(pnode);
    if (sibling) {
        parent.insertBefore(nnode,sibling)
    }else{
        var parent=pnode.parentNode;
        parent.appendChild(nnode);
    }
}
// 插入到父元素最后一个节点的后面
function appendAfter(parent,nnode){
       parent.appendChild(nnode)
}
// 插入到父元素第一个节点的前面
function appendBefore(parent,nnode){
    var first=firstChild(parent);
    parent.insertBefore(nnode,first);
}




// banner节点轮播
/*var  ggao=$('.ggao')[0];
 nLunbo(ggao,2);
  function nLunbo(obj,num){
   
var  dianleft=$('.dian1',obj)[0]
var  dianright=$('.dian2',obj)[0]
 var Boxs=$('.Boxs',obj)[0];
 var sons=$('.sons',Boxs);
 var nwidth=parseInt(getStyle(sons[0],'width'))+parseInt(getStyle(sons[0],'borderRight'));
  Boxs.style.width=nwidths*sons.length;
 var time=setInterval(Lmove,3000);
  var nflag=true;
   obj.onmouseover=function(){
      clearInterval(time);
    }
    obj.onmouseout=function(){
      time=setInterval(Lmove,3000)
    }
    dianright.onclick=function(){
      Rmove();
    }
    dianleft.onclick=function(){
      Lmove();
    }


    dianright.onclick=function(){
      
      if(nflag){
       Rmove();
      } 
      nflag=false;
    
      
           
    }
     dianleft.onclick=function(){
      if(nflag){
        Lmove();
      }
      nflag=false;
      
      
    }


 function Lmove(){
  animate(Boxs,{left:-num*nwidth},function(){
    for (var i=0;i<num;i++){
      var first=firstChild(Boxs);
      Boxs.appendChild(first);
      Boxs.style.left=0;
     } 
      nflag=true;
  })
 }
 function Rmove(){
     for (i=0;i<num;i++){
   var last=lastChild(Boxs);
     appendBefore(Boxs,last);
   Boxs.style.left=-num*nwidth+'px';
   }
   animate(Boxs,{left:0},function(){
      nflag=true;
   })
 }


}
*/



// 线条函数

Node.prototype.xian=function(){
  var left=$('.left',this)[0]
  var right=$('.right',this)[0]
  var top=$('.top',this)[0]
  var bottom=$('.bottom',this)[0]
  this.onmouseover=function(){
    animate(left,{height:this.offsetHeight})
    animate(top,{width:this.offsetWidth})
    animate(right,{height:this.offsetHeight})
    animate(bottom,{width:this.offsetWidth})
  }
  this.onmouseout=function(){
    animate(left,{height:0})
    animate(top,{width:0})
    animate(right,{height:0})
    animate(bottom,{width:0})
  }
  
}




// getEvent(obj,type,fn)

// obj:指定的对象；
// type：事件类型  click   mouseover
// fn：事件处理程序






// 添加
function addEvent(obj,type,fn){
  if(obj.addEventListener){
     obj.addEventListener(type,fn,false)
  }else{
    obj.attachEvent('on'+type,fn);
  }
}

// 删除

function removeEvent(obj,type,fn){
  if(obj.addEventListener){
     obj.removeEventListener(type,fn,false)
  }else{
    obj.detachEvent('on'+type,fn);
  }
}






// 指定的样式
 var divs=document.getElementsByTagName('div');
   ccc(divs,{width:'300px',height:'500px','background-color':'red'})

  
 function ccc(obj,arrobj){
  // for(var i=0;i<obj.length;i++){
  //   for(var j in arrobj){
  //     obj[i].style[j]=arrobj[j]
  //   }
  // }

    each(obj,function(i,v){
      for (var j in arrobj){
        v.style[j]=arrobj[j]
      }
    })
 }   


 function click(obj,fn){
  each(obj,function(i,v){
    v.onclick=function(){
      fn();
    }
  })
 }



// 文本

function html(obj,text){
   each(obj,function(i,v){
     v.textContent=text;
   })
}





// 循环

function each(obj,callback){
    for(var i=0;i<obj.length;i++){
      callback(i,obj[i])

    }
}




