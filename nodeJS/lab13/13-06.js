const net = require('net');

let HOST = '127.0.0.1';
let PORT = 9838;

let client = new net.Socket();
let buffer = new Buffer.alloc(4);
let timerId=null;


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

number=0;

client.connect(PORT, HOST, () => {
	rl.question("input your number? ", function(answer) {
 
 	 number=answer;

 	 rl.close();
		});
    console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);
		timerId=setInterval(()=>{
		client.write((buffer.writeInt32LE(parseInt(number),0),buffer))
		},2000);
		setTimeout(()=>{
			clearInterval(timerId);client.end();
		},30000);
		});


client.on('data', data => {
    console.log(`Client data: ${data.readInt32LE()}`);
});

client.on('close', () => {
    console.log('Client closed');
});

client.on('error', (e) => {
    console.log('Client error: ', e);
});

// let timerId=null;
// timerId=setInterval(()=>{
// 	client.write((buf.writeInt32LE(k++,0),buf))
// },2000);
// setTimeout(()=>{
// 	clearInterval(timerId);client.end();
// })

	
