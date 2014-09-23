function Circle (obj,spX,spY) {
	this.obj = obj;
	this.iSpeedX = spX;
	this.iSpeedY = spY;
}

/***************************就这样一直反弹******************************/
Circle.prototype.clMove = function() {
	var _this = this;

	clearInterval(this.obj.timer);
	this.obj.timer = setInterval(function () {

		//_this.iSpeedY += 3; //这个加速度一定要放最前面
				
		var left = _this.iSpeedX + _this.obj.offsetLeft;
		var top = _this.iSpeedY + _this.obj.offsetTop;
		var disX =  document.documentElement.clientWidth - _this.obj.offsetWidth;
		var disY = document.documentElement.clientHeight - _this.obj.offsetHeight;

		if(top >= disY){
			_this.iSpeedY *= -1;
			top = disY;
		}
		else if (top <= 0) {
			_this.iSpeedY *= -1;
			top = 0;
		}
	  if (left >= disX) {
			_this.iSpeedX *= -1;
			left = disX;
		}	
		else if(left <= 0){
			_this.iSpeedX *= -1;
			left = 0;
		}
		_this.obj.style.left = left  + 'px';
		_this.obj.style.top = top  + 'px';

	},30);
};


/**************************现在来玩下js的继承*******************************/

function RbCircle (obj,spX,spY,fric) {
	//调用父类构造函数
	Circle.call(this,obj,spX,spY);

	//添加属性
	this.fric = fric;
}

//复制父类属性
for(var attr in Circle.prototype){
	RbCircle.prototype[attr]=Circle.prototype[attr];
}


//加个摩擦力，好让它停下来
RbCircle.prototype.clMove = function() {
	var _this = this;

	clearInterval(this.obj.timer);
	this.obj.timer = setInterval(function () {

		_this.iSpeedY += 3; //这个加速度一定要放最前面
				
		var left = _this.iSpeedX + _this.obj.offsetLeft;
		var top = _this.iSpeedY + _this.obj.offsetTop;
		var disX =  document.documentElement.clientWidth - _this.obj.offsetWidth;
		var disY = document.documentElement.clientHeight - _this.obj.offsetHeight;

				  //iSpeedY += 3; //放这里最后会,y方向速度到不了零了..这尼玛的bug

		if(top >= disY){

			_this.iSpeedY *= -_this.fric;   //减速
			_this.iSpeedX *= _this.fric;
			top = disY;
		}
		else if (top <= 0) {
			_this.iSpeedY *= -_this.fric;
			_this.iSpeedX *= _this.fric;
			top = 0;
		}
	  if (left >= disX) {
			_this.iSpeedX *= -_this.fric;
			//_this.iSpeedY *= _this.fric;
			left = disX;
		}	
		else if(left <= 0){
			_this.iSpeedX *= -_this.fric;
			//_thisiSpeedY *= _this.fric;
			left = 0;
		}

		if (Math.abs(_this.iSpeedY) < 1) {  //速度够小
			_this.iSpeedY = 0;
		}
		if (Math.abs(_this.iSpeedX) < 1) {
			_this.iSpeedX = 0;
		}

		if (_this.iSpeedX == 0 && _this.iSpeedY == 0 && top == disY) {
			clearInterval(_this.obj.timer);
		};

		_this.obj.style.left = left  + 'px';
		_this.obj.style.top = top  + 'px';

	},30);
};


/***********************继续继承*********************/

function DragCircle (obj,spX,spY,fric) {
	RbCircle.call(this,obj,spX,spY,fric);
}

for(var attr in RbCircle.prototype){
	DragCircle.prototype[attr] = RbCircle.prototype[attr];
}

/*********************************加个拖拽**************************************/
DragCircle.prototype.fnDrag = function() {
	var lastX = 0;
	var lastY = 0;
	var _this = this;

	this.obj.onmousedown = function (ev) {
		var oEvent = ev || window.event;

		//计算鼠标点击物体的距离
		var disX = oEvent.clientX - _this.obj.offsetLeft;
		var disY = oEvent.clientY - _this.obj.offsetTop;


		if (_this.obj.setCapture) {          //是否是IE,捕获事件
			_this.obj.setCapture();
		 	_this.obj.onmousemove = mouseMove;
		  _this.obj.onmouseup = mouseUp;
		  
	  }else{
	  	document.onmousemove = mouseMove;
	  	document.onmouseup = mouseUp;
	  }

		function mouseMove (ev) {
			var oEvent2 = ev || window.event;

			//计算移动后物体的位置
			var left = oEvent2.clientX - disX;
			var top = oEvent2.clientY - disY;

			//物体与屏幕之间的最大距离
			var iMaxDisX = document.documentElement.clientWidth - _this.obj.offsetWidth;
			var iMaxDisY = document.documentElement.clientHeight - _this.obj.offsetHeight;

			if (left < 0) {
				left = 0;
			}
			else if(left > iMaxDisX){
				left = iMaxDisX;
			}
			if (top < 0) {
				top = 0;
			}
			else if (top > iMaxDisY ) {
				top = iMaxDisY;
			}


			_this.obj.style.left = left + 'px';
			_this.obj.style.top = top + 'px';

			_this.iSpeedX = left - lastX;
			_this.iSpeedY = top - lastY;
			
			lastX = left;
			lastY = top;
		}


	  function mouseUp() {
			
			this.onmousemove = null;
			this.onmouseup = null;

			_this.clMove(_this.obj,_this.iSpeedX,_this.iSpeedY);

			if (_this.obj.releaseCapture) {  //IE，消除捕获事件

				_this.obj.releaseCapture();
			}

		};
		clearInterval(_this.obj.timer);
		return false;  //阻止默认事件,旧版火狐的一个Bug
	};
};
