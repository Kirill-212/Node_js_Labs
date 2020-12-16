const buffer=require('buffer');
const udp=require('dgram');
const client=udp.createSocket('udp4');
const PORT=2000;



client.on('message',(msg,info)=>{
	console.log(msg.toString());
	console.log(msg.length+'|'+info.address+'|'+info.port);
})

let data=Buffer.from('Client:message 01\0');
client.send(data,PORT,'localhost',(err)=>{
	if(err)client.close();
	else{
		console.log('message send');
	}
})

let data1=Buffer.from('Hello ');
let data2=Buffer.from('Wordl');

client.send([data1,data2],PORT,'localhost',(err)=>{
	if(err)client.close();
	else{
		console.log('message send');
	}
})