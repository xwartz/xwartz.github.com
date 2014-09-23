window.onload = function () {
	var oSlide = document.getElementById('slide');
	var aBtn = oSlide.getElementsByTagName('a');
	var oImg = document.getElementById('img');
	var aLi = oImg.getElementsByTagName('li');

	var speed = -1;
	var timer = null;

	oImg.innerHTML += oImg.innerHTML;   //增加一倍高度，帮助图片结束切换回去
	oImg.style.height = aLi[0].offsetHeight * aLi.length + 'px';   //获取整个图片高度

	function move(){
		if(oImg.offsetTop < -oImg.offsetHeight / 2){
			oImg.style.top = 0 + 'px';
		}
		if(oImg.offsetTop > 0){
			oImg.style.top = -oImg.offsetHeight / 2 + 'px';
		}
		oImg.style.top = oImg.offsetTop + speed + 'px';
	}
	
	timer = timer = setInterval(move,100);  //初始滚动
	aBtn[0].onmouseover = function () {
		speed = -1;	
	}
	
	//向下滚动
	aBtn[1].onmouseover = function () {
		speed = 1;
	}
	
	oImg.onmouseover = function () {
		clearInterval(timer);
	}
	oImg.onmouseout = function () {
		timer = setInterval(move,100);
	}

};