var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

function start(response) {
	console.log('start was called');
	var body =  '<html>'+
						'<head>'+
						'<meta http-equiv="Content-Type" content="text/html; '+
						'charset=UTF-8" />'+
						'</head>'+
						'<body>'+
						'<form action="/upload" method="post" enctype="multipart/form-data">'+
						'<input type="file" name="upload" />'+
						'<input type="submit" value="Submit" />'+ 
	          '</form>'+
	          '</body>'+
	          '</html>';

	  var html = "<html><head></head><body>hello</body></html>";
		response.writeHead(200,{'Content-Type': 'text/html'});
		response.write(body);
		response.end();
}

function upload (response,request) {
	console.log('upload was called');

	var form = new formidable.IncomingForm();
	form.parse(request,function (error,fields,files) {
		// fs.renameSync(files.upload.path,'./tmp/mm.jpg');
		var readStream = fs.createReadStream(files.upload.path);
		var writeStream = fs.createWriteStream('tmp/mm.jpg');

		//node.js 0.6 and earlier can use util.pump
		// util.pump(readStream,writeStream,function () {
		// 	fs.unlinkSync(files.upload.path);
		// });
	  readStream.pipe(writeStream);
	  readStream.on('end',function () {
	  	fs.unlinkSync(files.upload.path);
	  });
		response.writeHead(200,{'Content-Type': 'text/html'});
		response.write('received image:<br /> <img src="/show" />');
		response.end();
	});
}

function show (response) {
	console.log('show was called');
	fs.readFile('tmp/mm.jpg','binary',function (error,file) {
		if (error) {
			response.writeHead(500,{'Content-Type': 'text/plain'});
			response.write(error);
			response.end();
		}else{
			response.writeHead(200,{'Content-Type': 'image/jpg'});
			response.write(file,'binary');
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;