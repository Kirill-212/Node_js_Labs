const WebSocket = require('ws');

function noop() {
}

function heartbeat() {
this.isAlive = true;
}

const wss = new WebSocket.Server({
host: 'localhost',
port: 4000
});

wss.on('connection', function connection(ws) {
let message_number = 0;

console.log('Connection');

ws.isAlive = true;
ws.on('pong', heartbeat);

setInterval(() => {
console.log('server: send');
ws.send(`11-03-server: ${++message_number}`)
}, 15000)});


const interval = setInterval(function ping() {
let online_count = 0;

wss.clients.forEach(function each(ws) {
if (ws.isAlive === false) return ws.terminate();
online_count++;
ws.isAlive = false;
ws.ping(noop);
});
console.log(online_count);
}, 5000);

wss.on('close', function close() {
clearInterval(interval);
});