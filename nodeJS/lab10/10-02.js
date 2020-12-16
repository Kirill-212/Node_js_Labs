const WebSocket=require('ws');


const ws=new WebSocket('ws://localhost:4000/wsserver');


ws.on('open',()=>{
	let k=0;
	console.log('socket.onopen');
			setInterval(()=>{
				ws.send('10-01-client: '+(++k));
			},3000);
			setTimeout(()=>{
				ws.close()
			},25000);
			ws.onclose=(e)=>{
				console.log('Close||'+e);
			};
			ws.onmessage=(e)=>{
				console.log(e.data);
			};
			ws.onerror=function(error) {
				console.log(error.message);
			};
})