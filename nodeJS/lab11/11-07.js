const rpcWebSocketServer = require("rpc-websockets").Server;

let server = new rpcWebSocketServer({ port: 5000, host: "localhost" });

server.register("notifyA", (params) => console.log("notifyA", params)).public();
server.register("notifyB", (params) => console.log("notifyB", params)).public();
server.register("notifyC", (params) => console.log("notifyC", params)).public();