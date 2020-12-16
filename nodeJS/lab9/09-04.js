var http=require('http');
var query=require('querystring');

let parms=query.stringify({x:3,y:4,s:'xxx'});
let path='/json?'+parms;
console.log(parms);
console.log(path);

let options={
	host:'localhost',
	path:path,
	port:3000,
	method:'POST',
	headers:{
		'content-type':'application/json','accept':'application/json'
	}
}

const req=http.request(options,(res)=>{
	console.log(req.method);
	console.log(res.statusCode);
	console.log(res.statusMessage);
	console.log(res.socket.remoteAddress);
	console.log(res.socket.remotePort);
	console.log(res.headers);
	let data= ' ';
res.on('data',(chunk)=>{
	console.log(data+=chunk.toString('utf8'));
});

res.on('end',()=>{
	console.log(data);
	console.log(JSON.parse(data));
});
});

req.on('error',(e)=>{
	console.log(e.message);
});
req.end();
