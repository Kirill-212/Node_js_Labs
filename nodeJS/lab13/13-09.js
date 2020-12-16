const udp=require('dgram');
const PORT=2000;

let servr=udp.createSocket('udp4');

servr.on('error',(err)=>{
	console.log(err);
	servr.close();
})

servr.on('message',(msg,info)=>{
	console.log(msg.toString());
	console.log(msg.length+'|'+info.address+'|'+info.port);
	servr.send('Echo:'+msg,info.port,info.address,(err)=>{
		if(err){
			servr.close();
		}
		else{
			console.log('send completed');
		}
	})
})

servr.on('listening',()=>{

	console.log(servr.address().port);
	console.log(servr.address().address);
	console.log(servr.address().family);
})

servr.on('close',()=>{
	console.log('server close');
})

servr.bind(PORT);