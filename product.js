/**********************/
//当鼠标悬停在商品小图片时
//修改显示的中等大小图片
/**********************/
var iconList = document.getElementById('icon_list');
var imgList = iconList.getElementsByTagName('img');
for(var i=0; i<imgList.length; i++){
	imgList[i].onmouseover = changeMediumImage;
}
function changeMediumImage(){  //当鼠标悬停在小图片上时更改中等产品图片
	//console.log( this.src );   //.....\product-s1.jpg
	var dotIndex = this.src.lastIndexOf('.');
	var mediumSrc = this.src.substring(0, dotIndex) + '-m'+ this.src.substring(dotIndex);
	//console.log( mediumSrc);		//....\product-s1-m.jpg
	document.getElementById('mediumImg').src=mediumSrc;
}

/********************************/
//小图预览区域的图片轮换
/********************************/
const LIWIDTH = 62;
var moveCount = 0; //移动次数
document.getElementById('btBack').onclick = function(){
	if(this.className == 'backward_disabled'){
		return;
	}
	moveCount--;
	iconList.style.left = moveCount * LIWIDTH * (-1) + 'px';
	//只要后退了一次，前进按钮必然可以启用了
	document.getElementById('btForward').className = 'forward';
	if(moveCount <= 0){  //已到最左边一张
		this.className = 'backward_disabled';
	} 
};
document.getElementById('btForward').onclick = function(){
	if(this.className == 'forward_disabled'){
		return;   //若当前按钮已是禁用状态，直接退出函数
	}
	moveCount++;
	iconList.style.left = moveCount * LIWIDTH * (-1) + 'px';

	//只要前进了一次，后退按钮必然可以启用了
	document.getElementById('btBack').className = 'backward';

	if(moveCount >= imgList.length-5){  //已到最右边一张
		this.className = 'forward_disabled';
	}
};


/*****************************/
//让产品中等大小图片上方的遮罩层随着鼠标移动而移动
/*****************************/
var mask = document.getElementById('mask'); //可显示的175x175的半透明遮罩层
var superMask = document.getElementById('superMask'); //完全透明的350x350的遮罩层
var largeDiv = document.getElementById('largeDiv');//显示产品大图的区块
superMask.onmousemove = function(){
	/***控制半透明遮罩层***/
	var left = event.offsetX - 175/2;
	left = left>0? left : 0;	//遮罩层距离父元素左边最小距离
	left = left<175?left : 175; //遮罩层距离父元素左边最大距离
	var top = event.offsetY - 175/2; 
	top = top>0? top : 0; //遮罩层距离父元素上边最小距离
	top = top<175?top : 175; //遮罩层距离父元素上边最大距离
	mask.style.left = left + 'px';
	mask.style.top = top + 'px';

	/***控制大图预览区***/
	largeDiv.style.backgroundPositionX = left*2*(-1)+'px';
	largeDiv.style.backgroundPositionY = top*2*(-1)+'px';
}
superMask.onmouseover = function(){
	mask.style.display = 'block';
	/**获取大图，将其当做largeDiv的背景图片**/
	var mediumSrc = document.getElementById('mediumImg').src; 
	//....\product-s1-m.jpg
	var dotIndex = mediumSrc.lastIndexOf('.');
	var largeSrc = mediumSrc.substring(0, dotIndex-1)+
		'l'+
		mediumSrc.substring(dotIndex);
	//console.log( largeSrc ); 
	//....\product-s1-l.jpg
	largeDiv.style.backgroundImage = 'url('+largeSrc+')';
	largeDiv.style.display = 'block';
}
superMask.onmouseout = function(){
	mask.style.display = 'none';
	largeDiv.style.display = 'none';
}
