const net=require('net');


let HOST='0.0.0.0';
let PORT1=40000;
let PORT2=50000;
let buffer = new Buffer.alloc(4);

let h=(n)=>{
	return (sock)=>{
		console.log('Connected '+n+'|'+sock.remoteAddress+'|'+sock.remotePort);
		sock.on('data',(data)=>{
			console.log('DATA '+n+'|'+sock.remoteAddress+'|'+ data.readInt32LE());
			sock.write('Echo '+data.readInt32LE());
		})
		sock.on('close',(data)=>{
			console.log('close');
		})
	}
}


net.createServer(h(PORT1)).listen(PORT1,HOST).on('listening',()=>{
	console.log(PORT1+'|'+HOST);
})
net.createServer(h(PORT2)).listen(PORT2,HOST).on('listening',()=>{
	console.log(PORT2+'|'+HOST);
})
