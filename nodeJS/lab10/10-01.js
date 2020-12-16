



const httpserver = require('http').createServer((req,res)=>{
	if(req.method=='GET' && req.url=='/start'){
		res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
		res.end(require('fs').readFileSync('./10-001.html'));
	}
	res.statusCode=404;
	res.statusMessage='Resourse not found';
	res.end('Resourse not found');
});
httpserver.listen(3000);
console.log('ws server: 3000');


let k=0;
const WebSocket=require('ws');
const wsserver=new WebSocket.Server({port:4000,host:'localhost',path:'/wsserver'})
let txt='';
wsserver.on('connection',(ws)=>{
	ws.on('message',message=>{
		txt=String(message)[message.length-1];
		console.log("message:"+message);
		// console.log(String(message)[message.length-1]);
	})
	setTimeout(()=>{
				wsserver.close();
			
			},25000);
	setInterval(()=>{
		ws.send('10-01-server:'+txt+'->'+(++k));
	},5000)
})

wsserver.on('error',(e)=>{
	console.log(e);
})

console.log(wsserver.options.host+'|'+wsserver.options.port+'|'+wsserver.options.path);