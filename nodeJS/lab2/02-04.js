var http = require('http');
var fs = require('fs');


http.createServer(function(request,response){
	if(request.url==='/api/name'){
		console.log('url11');
		let txt = 'Болвако Кирилл';
			response.writeHead(200,{'Content-Type':'text/pain;charset=utf-8'});
			response.end(txt);
	}
	if(request.url==='/xmlhttprequest'){
	let html = fs.readFileSync('xmlhttprequest.html');
	response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
	response.end(html);
}else{
	console.log('url');
}

}).listen(3000);

console.log('server running')