const net=new require('net');
let HOST='127.0.0.1';
let PORT=2000;


let client=new net.Socket();

client.connect(PORT,HOST,()=>{
	console.log('Client connected->'+client.remoteAddress+'||'+client.remotePort);
		setTimeout(()=>{
client.write('hello server\0');
client.end();
	},5000)
		setTimeout(()=>{client.end();},10000);
	
	client.on('data',(data)=>{
		console.log('Client data::'+data.toString());
		//client.write('hello server');
		//client.destroy();
	});
	client.on('close',()=>{
		console.log('client close');
	})

	client.on('error',()=>{
		console.log('client error');
	})
})