var http = require('http');
var url = require('url');
var fs = require('fs');
let stat=require('./m07-01.js')('./static');

let http_handler=(req,res)=>{
	if(req.method==='GET'){
		console.log(req.url+'|url');
		if (url.parse(req.url).pathname==='/'){
		let html = fs.readFileSync('index.html');
		res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		res.end(html);
		}else{
			console.log(req.url+'|||req.url');
	 if(stat.isStatic('html',req.url)) stat.sendFile(req,res,{'Content-Type':'text/html;charset=utf-8'});
	else if(stat.isStatic('css',req.url))stat.sendFile(req,res,{'Content-Type':'text/css;charset=utf-8'});
	else if(stat.isStatic('js',req.url))stat.sendFile(req,res,{'Content-Type':'text/css;charset=utf-8'});
	else if(stat.isStatic('png',req.url))stat.sendFile(req,res,{'Content-Type':'image/png'});
	else if(stat.isStatic('docx',req.url))stat.sendFile(req,res,{'Content-Type':'application/msword'});
	else if(stat.isStatic('json',req.url))stat.sendFile(req,res,{'Content-Type':'application/json'});
	else if(stat.isStatic('xml',req.url))stat.sendFile(req,res,{'Content-Type':'application/xml'});
	else if(stat.isStatic('mp4',req.url))stat.sendFile(req,res,{'Content-Type':'video/mp4'});
	else stat.writeHTTP404(res);
}
}else{
stat.writeHTTP405(res);
}
};

let server=http.createServer();
server.listen(3000,(v)=>{console.log('server running')})
.on('error',(e)=>{console.log('server.listen:error',e.code)})
.on('request',http_handler);



