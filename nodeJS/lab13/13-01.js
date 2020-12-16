const net=new require('net');
let HOST='0.0.0.0';
let PORT=2000;


net.createServer((sock)=>{
	console.log('Server Connected '+sock.remoteAddress+':'+sock.remotePort);


	sock.on('data',(data)=>{
		console.log('Server data :'+sock.remoteAddress+':'+data);
		sock.write('Echo:'+data);
		//sock.write(data+'\0');		
	})

	sock.on('close',(data)=>{
		console.log('Server closed:'+sock.remoteAddress+'--'+sock.remotePort);
	})
	sock.on('error',()=>{
		console.log('sock error');
	})
}).listen(PORT,HOST);

console.log('TCP-server  '+HOST+'____'+PORT);

