const rpcWSS=require('rpc-websockets').Server

let A=0;
let B=0;
let C=0;
let server=new rpcWSS({port:5000,host:'localhost'});


server.event('A');
server.event('B');
server.event('C');


setInterval(()=>server.emit('A',{countA:2*(++A)}),1000);
setInterval(()=>server.emit('B',{countB:A-(++B)}),2000);
setInterval(()=>server.emit('C',{countC:B+(++C)}),3000);