const send = require('./m0603.js');


var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function(request,respone){

	if (url.parse(request.url).pathname==='/'){
		let html = fs.readFileSync('./04-001.html');
		respone.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		respone.end(html);
	}
	else if(url.parse(request.url).pathname==='/send'){
		
		request.on('data',data=>{
		 r= JSON.parse(data);
		 	console.log(r);
		 const message={
		 	from:'Mailer Test <'+r.From+'>',
		 	to:r.To,
		 	subject:r.Message,
		 	text:r.Message
		 }
		 send(message);
	});
	}

	
	
}).listen(3000);
console.log('server started');





