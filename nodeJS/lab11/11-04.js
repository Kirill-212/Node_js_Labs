const WebSocket=require('ws');
const wss=new WebSocket.Server({port:5000,host:'localhost'});
let k=0;
wss.on('connection',(ws)=>{
	client={};
	ws.on('message',(data)=>{
		k=k+1;
		client=JSON.parse(data);
		console.log(client['client']);
		console.log(JSON.parse(data));
		ws.send(JSON.stringify({Server:k,client:client['client'],timestamp:new Date().toISOString()}));
	});
	
	
})