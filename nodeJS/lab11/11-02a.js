const fs=require('fs');
const WebSocket=require('ws');


const ws=new WebSocket('ws://localhost:5000/download');

ws.on('open',()=>{
	const duplex=WebSocket.createWebSocketStream(ws,{encoding:'utf8'});
	let wfile=fs.createWriteStream('./11-02.txt');
	duplex.pipe(wfile);
})