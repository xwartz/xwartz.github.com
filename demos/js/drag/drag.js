window.onload = function ()
	{
		var oDiv = document.getElementById('box');
		var x = getCookie('x');
		var y = getCookie('y');
		
		//x,y 是字符串
		if(x && y){
			oDiv.style.left = x + 'px';
			oDiv.style.top = y + 'px';
		}
		
		oDiv.onmousedown = function(ev){
			var oEvent = ev || event;
			var disX = oEvent.clientX - oDiv.offsetLeft;
			var disY = oEvent.clientY - oDiv.offsetTop;

			//alert(disX+ ','+disY);
			document.onmousemove = function (ev) {
				var oEvent2 = ev || event;
				var oLeft = oEvent2.clientX - disX;//左边距==offsetLeft
				var oTop = oEvent2.clientY - disY;
				
				//判断是否移出窗口

				if(oLeft < 0){
					oLeft = 0;
				}
				else if(oLeft > document.documentElement.clientWidth - oDiv.offsetWidth){
					oLeft = document.documentElement.clientWidth - oDiv.offsetWidth;
				}

				if(oTop < 0){
					oTop = 0;
				}
				else if(oTop > document.documentElement.clientHeight - oDiv.offsetHeight){
					oTop = document.documentElement.clientHeight - oDiv.offsetHeight;
				}
				
				//重新设置位置
				oDiv.style.left = oLeft + 'px';
				oDiv.style.top = oTop + 'px';
			};
			document.onmouseup = function () {

				//保存位置坐标
				setCookie('x',oDiv.offsetLeft,1);
				setCookie('y',oDiv.offsetTop,1);

				document.onmousemove = null;
				document.onmouseup = null;

			};
			//阻止默认事件,解决旧版FF bug
			return false;
		};
	};