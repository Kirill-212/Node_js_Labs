let http = require("http");
let fs = require("fs");

let bound = "Kirill";
let body = `--${bound}\r\n`;
body +=
'Content-Disposition:form-data; name="file"; filename="2.png"\r\n';
body += "Content-Type: application/octet-stream\r\n\r\n";

let options = {
host: "localhost",
path: "/09-07",
port: 3000,
method: "POST",
headers: {
"content-type": "multipart/form-doata; boundary=" + bound,
},
};

const req = http.request(options, (res) => {
let data = "";
res.on("data", (chunk) => {
data += chunk;
});
res.on("end", () => {
console.log("http.request: end: length body =", Buffer.byteLength(data));
console.log("http.request: end: body = \n", data);
});
});

req.write(body);
let stream = new fs.ReadStream("2.png");
stream.on("data", (chunk) => {
req.write(chunk), console.log(Buffer.byteLength(chunk));
});
stream.on("end", () => {
req.end(`\r\n--${bound}--\r\n`);
});