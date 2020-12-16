var http = require('http');
var url = require('url');
var fs = require('fs');
const xml = require("xml-parse");
const dir='C:/ycheba/3course1sem/nodeJS/lab8/static';
var mp = require('multiparty');




// const express = require("express");

// const app = express();
// // Set up the app...
// const server = app.listen(3000);
url1='./static';

let server=http.createServer();
let http_handler=(req,res)=>{
	if(req.method==='GET'){
		if(req.url=='/connection'){
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			res.end('<h1>'+server.keepAliveTimeout +'</h1>');
		}
		else if(url.parse(req.url).pathname==='/'){
			let html = fs.readFileSync('./08-09.html');
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			res.end(html);
		}
		else if(req.url.indexOf('/connection')==0){
			server.keepAliveTimeout=parseInt(url.parse(req.url, true).query.set);
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			res.end('<h1>server.keepAliveTimeout  set='+server.keepAliveTimeout
				+'</h1>');
		}
		else if(url.parse(req.url).pathname==='/formparameter'){
			let html = fs.readFileSync('./08-09.html');
		res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		res.end(html);
		}
		else if(req.url=='/headers'){
			result='';
			result2='';
			for(key in req.headers)result+=key+'|'+req.headers[key];
			res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
  	 		var str = JSON.stringify(res.getHeaders());
			res.end('<h1>RES:' +str
				+'</h1><h1>REQ:'+result +'</h1>');
			console.log(req.headers);
			console.log(res.getHeaders());
		}
		else if(req.url.indexOf('/parameter')==0 && url.parse(req.url, true).query ){


			if(req.url.indexOf('/parameter/')==0){
				x=parseInt(url.parse(req.url).pathname.split('/')[2]);
			y=parseInt(url.parse(req.url).pathname.split('/')[3]);
			console.log(x+'||'+y);
			if(isNaN(parseInt(url.parse(req.url).pathname.split('/')[2]))||
				isNaN(url.parse(req.url).pathname.split('/')[3])){
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('<h1>'+url.parse(req.url).pathname+'</h1>');
			}
			else{
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('<h1>'+(x+y)+'|'+(x-y)+'|'+(x*y)+'|'+(x/y)+'</h1>');
			}
			}
			x=parseInt(url.parse(req.url, true).query.x);
			y=parseInt(url.parse(req.url, true).query.y);
			console.log(x+'|'+y);
			console.log(!isNaN(parseInt(url.parse(req.url, true).query.y)));
						console.log(!isNaN(parseInt(url.parse(req.url, true).query.x)));
			if(isNaN(parseInt(url.parse(req.url, true).query.y))||
				isNaN(parseInt(url.parse(req.url, true).query.x))){
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('<h1>Error</h1>');
			}
			else{
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('<h1>'+(x+y)+'|'+(x-y)+'|'+(x*y)+'|'+(x/y)+'</h1>');
			}

		}
		else if(url.parse(req.url).pathname==='/close'){
			close();
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('<h1>server close</h1>');
		}
		else if(url.parse(req.url).pathname==='/upload'){
			let html = fs.readFileSync('./web.html');
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			res.end(html);
		}
		else if(url.parse(req.url).pathname==='/socket'){
			console.log(req.connection.remoteAddress);
			console.log(req.connection.remotePort);
			console.log(req.connection.localAddress);
			console.log(req.connection.localPort);
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('<h1>'+req.connection.remoteAddress+'|'+req.connection.remotePort+'|'+req.connection.localAddress+'|'+req.connection.localPort+'</h1>');
		}
		else if(url.parse(req.url).pathname==='/req-data'){
			let pdata=[]
		req.on('data',data=>{
		pdata.push(data);
		console.log('______________');
		console.log(pdata);
		console.log('______________');
		});
		res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		res.end();
		}
		else if(req.url.indexOf('/resp-status')==0){
			console.log(url.parse(req.url, true).query.code);
			console.log(url.parse(req.url, true).query.mess);		
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			res.end('<h1>'+url.parse(req.url, true).query.code+'='+url.parse(req.url, true).query.mess+'</h1>');
		}
		else if(url.parse(req.url).pathname==='/files'){
			count=0;
			fs.readdir(dir,(err,files)=>{
				count=files.length;
				console.log(files.length);
				res.setHeader('X-static-files-count',count);
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('');

			})		

		 }
		 else if(req.url.indexOf('/files')==0){
		 	console.log(url.parse(req.url).pathname.split('/'));
			x=url.parse(req.url).pathname.split('/')[2];
			try{
				fs.readdir(dir,(err,files)=>{
				console.log(files);
				for(i=0;i<files.length;i++){
					if(files[i].indexOf(x)==0)
						{
				const filePath = "./static/" +x;
   				 // смотрим, есть ли такой файл
    				fs.access(filePath, fs.constants.R_OK, err => {
        			// если произошла ошибка - отправляем статусный код 404
        			if(err){
            res.statusCode = 404;
            res.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(res);
        }
      });
					}
				}
			})		

			}
			catch(err){
				console.log(err);
			}	
			//res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			//res.end('<h1>'+url.parse(req.url, true).query.code+'='+url.parse(req.url, true).query.mess+'</h1>');
		}
		// console.log(url.parse(req.url, true));
		// console.log(url.parse(req.url, true).query.set);
		// console.log(req.url.indexOf('/connection'));
	}
	else if(req.method==='POST'){
		 if(url.parse(req.url).pathname==='/formparameter'){
			console.log(req);
		}
		else if(url.parse(req.url).pathname==='/upload'){
			let result='';
			let form = new mp.Form({uploadDir:"./static"});
			
			
form.on("field", (name, value) => {
console.log("---field---");
console.log(name, value);
result += `<br>---${name} = ${value}`;
});

form.on("file", (name, file) => {
console.log("---file---");
console.log(name, file);
result += `<br>---${name} = ${file.originalFilename} : ${file.path}`;
});

form.on("error", (err) => {
console.log("---error---");
console.log(name, file);
res.end("Form error");
});

form.on("close", () => {
console.log("---close---");
res.end(result);
});

form.parse(req);		
		}
		else if(url.parse(req.url).pathname==='/json'){
		let	json=''
		let send;
			req.on('data',data=>{
				json+=data;
		send={"__comment":JSON.parse(json)["__comment"],
		"x_plus_y":(JSON.parse(json)["x"]+JSON.parse(json)["y"]),
		"Concatination_s_o":JSON.parse(json)["s"]+": "+JSON.parse(json)["o"]["surname"]+","+JSON.parse(json)["o"]["name"]
		,"Length_m":JSON.parse(json)["m"].length};
		console.log(send);
				res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(send));
		});

		}
		else if(url.parse(req.url).pathname==='/xml'){
		let	json=''
		let send;
			req.on('data',data=>{
				json+=data;
				//console.log(json);
		var xmlDoc = new xml.DOM(xml.parse(json));
		var root = xmlDoc.document.getElementsByTagName("x").length;
		var root_x=0;
		for(i=0;i<root;i++){
			root_x+=parseInt(xmlDoc.document.getElementsByTagName("x")[i].attributes.value);
		}		
		console.log(root_x);
		var root_ = xmlDoc.document.getElementsByTagName("m").length;
		root_m="";
		for(i=0;i<root_;i++){
			root_m=root_m+xmlDoc.document.getElementsByTagName("m")[i].attributes.value;
		}
		console.log(root_m);
		res.writeHead(200,{'Content-Type':'application/xml'});
		res.end('<response id="33" request="'+xmlDoc.document.getElementsByTagName("request")[0].attributes["id"]+
			'"><sum element="x" result="'+root_x+'"/><concat element="m" result="'+root_m+'"/></request>');
		});

		}

	}
};




function close() {
	console.log('server close ');
	setTimeout(() => 		process.exit(0), 10000).ref;
}
server.on('request',http_handler);
server.on('error',(e)=>{console.log(e.code)})
server.listen(3000);
