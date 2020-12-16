
var http = require('http')
var url = require('url')
var fs = require('fs')
var data= require('./m04-01.js')


var db = new data.DB();

db.on('GET',(req,res)=>{console.log('DB GET');res.end(JSON.stringify(db.get()));});
db.on('POST',(req,res)=>{console.log('DB POST');req.on('data',data=>{
	let r= JSON.parse(data);
	db.post(r);
	res.end(JSON.stringify(r));
});
});



db.on('PUT',(req,res)=>{console.log('DB PUT');req.on('data',data=>{
	let r=JSON.parse(data);
	console.log(r.index+'|||');
	db.put(r.index,r.name,r.bday);
	res.end(JSON.stringify(r));
});
});

db.on('DELETE',(req,res)=>{console.log('DB DELETE');req.on('data',data=>{
	let r= JSON.parse(data);
	console.log(r.index);
	db.delete(r.index,1);
	res.end(JSON.stringify(r));});
});

http.createServer(function(request,respone){
	if (url.parse(request.url).pathname==='/'){
		let html = fs.readFileSync('./04-001.html');
		respone.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		respone.end(html);
	}
	else if(url.parse(request.url).pathname==='/api/db'){
		db.emit(request.method,request,respone);
	}
}).listen(3000);
console.log('server started');