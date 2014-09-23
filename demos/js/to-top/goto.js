	   /*获取样式表里的样式*/
			function getStyle(obj, attr) {
			if(obj.currentStyle) {
				//IE
				return obj.currentStyle[attr];
			}	else	{
				//FF
				return getComputedStyle(obj, false)[attr];
			}
		}
		
		/*回到顶部*/
		function toTop (obj) {
			clearInterval(obj.timer2);
			obj.timer2 = setInterval(function () {
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var speed = Math.floor(-scrollTop / 7);

				if (scrollTop == 0) {
					clearInterval(obj.timer2);
					
				} else{
					obj.bSys = true;
					document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
				}
			},30);
		}

	 /*toTop按钮跟随滑动*/
	  function go (obj) {
	  	clearInterval(obj.timer);
	  	obj.timer = setInterval(function () {
	  		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	    	var t = parseInt((document.documentElement.clientHeight - obj.offsetHeight) / 2);
	    	var iCur = parseInt(getStyle(obj,'top'));
	    	var iTarget = scrollTop + t;

	    	var iSpeed = (iTarget - iCur) / 7;
	    	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  //取整

	    	if (iCur == iTarget) {
	    		clearInterval(obj.timer);
	    	}else{
	    		obj.style.top = iCur + iSpeed + 'px';
	    	}
	  	},30);
	  }