var http = require('http');
var fs = require('fs');


http.createServer( function(request,response){
	if(request.url==='/api/name'){
	let txt = 'Болвако Кирилл';

		
			response.writeHead(200,{'Content-Type':'text/pain;charset=utf-8'});
			response.end(txt);
}
}).listen(3000);
console.log('server running');