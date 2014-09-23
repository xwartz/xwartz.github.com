function getStyle(obj, attr) {
		if(obj.currentStyle) {
			//IE
			return obj.currentStyle[attr];
		}	else	{
			//FF
			return getComputedStyle(obj, false)[attr];
		}
	}

	function fnMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			
			var bStop = true;
			for(var attr in json){
				/*取当前值*/
				var iCur = 0;

				if (attr == 'opacity') {
					iCur = parseInt(parseFloat(getStyle(obj,attr)) * 100);
				}else{
					iCur = parseInt(getStyle(obj,attr));
				}

				/*设置速度*/
				var iSpeed = (json[attr] - iCur) / 8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

				/*检测停止*/
				if (iCur != json[attr]) {
					bStop = false;
				}
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}

			if (bStop) {
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		},30);
}
