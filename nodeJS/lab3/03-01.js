var http = require('http');
var fs = require('fs');
global.state='norm';

	console.log("write:");
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () =>{

let chunk = null;
while((chunk = process.stdin.read()) != null){
if(chunk.trim() == 'exit' ){
console.log('exit');
process.exit(0);
}
 if(chunk.trim() === 'norm'){
	console.log('reg|'+state+'-->norm');
status = "norm";
}
 if(chunk.trim() === 'idle'){

		
		console.log('reg|'+state+'-->idle');
		state='idle';
	
	
}
if(chunk.trim() === 'test'){
	
		
		console.log('reg|'+state+'-->test');
		state='test';
	
}
 if(chunk.trim() === 'stop'){

		console.log('reg|'+state+'-->stop');
		state='stop';
	
}
}
});

// norm->stop->test->idle
http.createServer(function (request, response){
	response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
	response.end('<!DOCTYPE html><html><head></head><body><p>'+state+'</p></body></html>');
	console.log('отправлен');
}).listen(3000);
//console.log('Прослушивание порта 3000');




 
