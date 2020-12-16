// var http = require('http');

// http.createServer(function (request, response){
// response.writeHead(200, {'Content-Type': 'text/html'})
// response.end('<h1>Hello World</h1>');
// }).listen(3000);
// console.log('Прослушивание порта 3000');


var http = require('http');

http.createServer(function (request, response){
	let b = '';
	request.on('data',str=>{b+=str;console.log('data',b);})
	response.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	request.on('end',()=>response.end(
		'<!DOCTYPE html><html><head></head>'+
		'<body>'+
		'<h1>Структура запроса</h1>'+
		'<h2>метод:'+request.method+'</h2>'+
		'<h2>uri:'+request.url+'</h2>'+
		'<h2>версия:'+request.httpVersion+'</h2>'+
		'<h2>'+'Заголовки</h2>'+
		h(request)+
		'<h2>тело:'+b+'</h2></body></html>'
		))


}).listen(3000);
console.log('Прослушивание порта 3000');

