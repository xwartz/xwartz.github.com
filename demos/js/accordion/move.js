	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			//IE
			return obj.currentStyle[attr];
		}	else	{
			//FF
			return getComputedStyle(obj, false)[attr];
		}
	}

	function fnMove (obj,iTarget) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			var iCur = parseInt(getStyle(obj,'width'));

			var iSpeed = (iTarget - iCur) / 5;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if(iCur == iTarget){
				clearInterval(obj.timer);
			}else{
				obj.style.width = iCur + iSpeed + 'px';
			}
		},30);
	}