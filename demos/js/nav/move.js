var left = 0;

function fnMove (obj,iTarget) {
	var iSpeed = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {

	iSpeed += (iTarget - obj.offsetLeft) / 5;
	iSpeed *= 0.7;

	left += iSpeed;

	if (Math.abs(iSpeed) < 1 && Math.abs(iTarget - left) < 1) {
		clearInterval(obj.timer);
		obj.style.left = iTarget + 'px';
	} else{
			obj.style.left = left + 'px';
		}
		
	},30);
	
}