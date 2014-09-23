
function world (argument) {
	console.log('world');
}

function hello (fn) {
	console.log('hello');
	fn();
}

hello(world);