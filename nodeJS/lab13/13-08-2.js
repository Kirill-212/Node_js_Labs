const net=require('net');

const HOST='127.0.0.1';
const PORT=process.argv[2]? process.argv[2]:40000;
let buffer = new Buffer.alloc(4);
let client =new net.Socket();
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
number=0;
client.connect(PORT,HOST,()=>{
		rl.question("input your number? ", function(answer) {
 
 	 number=answer;

 	 rl.close();
		});
	console.log('Client connected|'+client.remotePort);
	let k=0;
	timerId=setInterval(()=>{
		client.write((buffer.writeInt32LE(parseInt(number),0),buffer))
	},1000);
	setTimeout(()=>{
		clearInterval(timerId);client.end();
	},30000)
});


client.on('data',(data)=>{
	console.log(data.toString());
})
.on('close',()=>{	console.log('close');})
.on('error',(e)=>{
	console.log(e);
})