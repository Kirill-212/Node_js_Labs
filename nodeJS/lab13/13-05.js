var net = require('net'),
    JsonSocket = require('json-socket');

var PORT1 = 9838;
let HOST='0.0.0.0';
let label=(pfx,port,sock)=>{
    return pfx+sock.remoteAddress+'|'+sock.remotePort;
};


let connections=new Map();
let buffer = Buffer.alloc(4);
num =0;
let server=net.createServer((sock)=>{
    sock.id=(new Date()).toISOString();
    connections.set(sock.id,{comment:num});
    server.getConnections((e,c)=>{
        if(!e){
            console.log(label('CONNECTED',PORT1,sock)+c);
            for(let [key,value] of connections){
                console.log(key,value.comment);
            }
        }
    })
    sock.on('data',(data)=>{
         connections.get(sock.id)['comment']+=data.readInt32LE();
    console.log(data.readInt32LE());
    buffer.writeInt32LE(connections.get(sock.id)['comment'], 0);
        sock.write(buffer);
})

sock.on('close',(data)=>{
    console.log(label('CLOSED',PORT1,sock)+sock.id);
    connections.delete(sock.id);
})

sock.on('error',(e)=>{
    console.log(label('ERROR',PORT1,sock)+' '+e);
    connections.delete(sock.id);
})
}).listen(PORT1,HOST);

