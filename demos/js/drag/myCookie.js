/*cookie
* author: xiang
*/

/*******************************************************
* setCookie()，接收三个参数:名称，对应的值，有效期
* 更改oDate时间，通过expires设置到期时间
*********************************************************/
function setCookie (name,value,date) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + date);

	document.cookie = name + '=' + value + ';expires = ' + oDate;
}

/************************************************************
* getCookie(),接收一个参数:名称
* 将本页获得cookie,分割成数组,通过比较数组值,返回找到的值,否则返回空
********************************************************/

function getCookie(name) {
	//获取的cookie是以分号加空格分隔的，username=name; password=***
	var cookieArr = document.cookie.split('; ');

	for (var i = 0, len = cookieArr.length; i < len; i++) {
		//继续分割cookie,['username','name']
		var nameArr = cookieArr[i].split('=');

		if(name == nameArr[0]){
				return nameArr[1];
		}
	}
	return ' ';
}

/************************************
* 删除指定cookie,removeCookie()
* 设置对应cookie有效期为已经过期
********************************************/

function removeCookie (name) {
	setCookie(name,' ',-1);
}