const WebSocket=require('ws');

const ws =new WebSocket('ws://localhost:5000');

ws.on('open',()=>{
	ws.on('message',(data)=>{
		console.log(JSON.parse(data));
	});
	ws.send(JSON.stringify({client:'hello1',timestamp:new Date().toISOString()}));
})