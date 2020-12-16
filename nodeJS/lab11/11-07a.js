const rpcWebSocketClient = (WebSocket = require("rpc-websockets").Client);

let webSocket = new rpcWebSocketClient("ws://localhost:5000");

let k = 0;
webSocket.on("open", () => {

	let input = process.stdin;
	input.setEncoding('utf-8');
	process.stdout.write('> ');
	input.on('data', data => {
		txt='';
		txt=data.slice(0, -1).toString();
		if( txt.includes('A')){
			console.log('a');
setInterval(() => webSocket.notify("notifyA", { n: ++k, x: 1, y: 2 }), 5000);

		}
		else if(txt.includes('B')){
			console.log('b');
setInterval(() => webSocket.notify("notifyB", { n: ++k, x: 1, y: 2 }), 10000);

		}
		else if(txt.includes('C')){
			console.log('c');
setInterval(() => webSocket.notify("notifyC", { n: ++k, x: 1, y: 2 }), 15000);

		}
    process.stdout.write('> ');
	});
// setInterval(() => webSocket.notify("notifyA", { n: ++k, x: 1, y: 2 }), 5000);
// setInterval(() => webSocket.notify("notifyB", { n: ++k, x: 1, y: 2 }), 10000);
// setInterval(() => webSocket.notify("notifyC", { n: ++k, x: 1, y: 2 }), 15000);
});