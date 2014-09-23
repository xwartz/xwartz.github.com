window.onload = function(){

		var oUl = document.getElementById("images");
		var oImages = oUl.getElementsByTagName("ul")[0];
		var oLi = oImages.getElementsByTagName("li");
		var speed = -5;
		
	  oImages.innerHTML = oImages.innerHTML + oImages.innerHTML;
		oImages.style.width = oLi[0].offsetWidth * oLi.length + "px";

		function move(){
			if(oImages.offsetLeft < -oImages.offsetWidth / 2){
				oImages.style.left = "0";
			}
			//向右滑动的情况
			if(oImages.offsetLeft > 0){
				oImages.style.left = -oImages.offsetWidth / 2 + "px";
			}
			oImages.style.left = oImages.offsetLeft + speed + "px";
		}

		
		var timer = setInterval(move,100);

		oImages.onmouseover = function(){
			clearInterval(timer);
		}
		oImages.onmouseout = function(){
			timer = setInterval(move,100);
		}
		document.getElementById("btnLeft").onclick = function(){
			speed = -5;
		}
		document.getElementById("btnRight").onclick = function(){
			speed = 5;
		}
}