/*碰撞检测*/
	function cdTest (obj1,obj2) {
	  //obj1
		var left1 = obj1.offsetLeft;
		var right1 = obj1.offsetLeft + obj1.offsetWidth;
		var top1 = obj1.offsetTop;
		var bottom1 = obj1.offsetTop + obj1.offsetHeight;

		//obj2
		var left2 = obj2.offsetLeft;
		var right2 = obj2.offsetLeft + obj2.offsetWidth;
		var top2 = obj2.offsetTop;
		var bottom2 = obj2.offsetTop + obj2.offsetHeight;

		//是否碰到
		if (right1 < left2 || left1 > right2 || top1 > bottom2 || bottom1 < top2) {
			return false;
		} else{
			return true;
		}
	}

	/*计算两者距离*/
	function getDis (obj1,obj2) {
		var disX = obj1.offsetLeft - obj2.offsetLeft;
		var disY = obj1.offsetTop - obj2.offsetTop;

		return Math.sqrt( Math.pow(disX,2) + Math.pow(disY,2) );
	}

	/*查找最近的*/
	function findNearest (oCur,aTotal) {
		var iMin = 9999999;
		var oNearest = null;

		for (var i = 0; i < aTotal.length; i++) {
			if(oCur == aTotal[i]) //跳过自身比较
				continue;

			if ( cdTest(oCur,aTotal[i]) ) {
				//有碰到就计算距离
				var dis = getDis(oCur,aTotal[i]);
				if (dis < iMin) {
					iMin = dis;
					oNearest = aTotal[i];
				}
			}
		}
		return oNearest;
	}


	//获取样式表样式
	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			//IE
			return obj.currentStyle[attr];
		}	else	{
			//FF
			return getComputedStyle(obj, false)[attr];
		}
	}

	//移动
	function startMove(obj,json){
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
		}
	},30);
}