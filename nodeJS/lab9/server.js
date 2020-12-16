var http = require('http');
var url = require('url');
var fs = require('fs');
var xmlbuilder=require('xmlbuilder');
var parseString=require('xml2js').parseString;
const xml = require("xml-parse");
var mp = require('multiparty');
let http_handler=(req,res)=>{
	if(req.method==='GET'){
		console.log(req.url+'|url');
		if (url.parse(req.url).pathname==='/mypath' && !url.parse(req.url, true).query){
		res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		res.end('hello');
		}
		else if (url.parse(req.url).pathname==='/mypath3' ){
		res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		res.end('hello');
		}
		else if(req.url.indexOf('/mypath')==0){
			x=parseInt(url.parse(req.url, true).query.x);
			y=parseInt(url.parse(req.url, true).query.y);
			console.log('server:'+x+'|'+y+'|');
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('server:'+x+'|'+y+'|');
		}
		else if(url.parse(req.url).pathname==='/09-08'){
			console.log('hello');
			let bound = 'Kirill';
            let body = '--' + bound + '--\n' +
                'Content-Disposition:form-data; name="file"; filename="text.txt"\n' +
                'Content-Type:text/plain\n\n' +
                fs.readFileSync('text.txt') +
                `\n--${bound}--\n`
            res.end(body);
		}


			}
	else{
			if(req.url.indexOf('/mypath1')==0){
			x=parseInt(url.parse(req.url, true).query.x);
			y=parseInt(url.parse(req.url, true).query.y);
			s=url.parse(req.url, true).query.s;
			console.log('server:'+x+'|'+y+'|'+s);
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.end('server:'+x+'|'+y+'|'+s);
		}
		else if(req.url.indexOf('/uploadFile')==0){
			let result='';
			req.on('data',(data)=>{
				result+=data;
			})
			req.on('end',()=>{
				res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
				res.write('<h1>uploadFile</h1>');
				res.end(result);
				
			})
		}
		else if(req.url.indexOf('/09-06')==0){
			let dat = '';

                req.on('data', chunk => {
                    dat += chunk;
                });
                req.on('end', () => {

                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    console.log(dat);
                    res.end(dat);
                });
		}
		else if(req.url.indexOf('/json')==0){
			x=parseInt(url.parse(req.url, true).query.x);
			y=parseInt(url.parse(req.url, true).query.y);
			s=url.parse(req.url, true).query.s;
			console.log('server:'+x+'|'+y+'|'+s);
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify({'x':x,'y':y,'s':s}));
		}
		else if(req.url.indexOf('/09-07')==0){
		//	console.log(req);
				let png = '';
                req.on('data', (chunk) => {
                    png += chunk;
                });
                req.on('end', () => {
					console.log(png);
                    res.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});             
                    res.end(png);
                });
		}
		else if(req.url.indexOf('/xml')==0){
			let	json=''
		
			req.on('data',data=>{
				json+=data;
				send='';
				var xmlDoc = new xml.DOM(xml.parse(json));
		var root = xmlDoc.document.getElementsByTagName("student").length;
		var root_x=0;
		console.log(xml.parse(json));
		for(i=0;i<root;i++){
			send+='<student faculti="'+xmlDoc.document.getElementsByTagName("student")[i].attributes["faculty"]+'"">'
			+xmlDoc.document.getElementsByTagName("student")[i].attributes["speciality"]+
			'|'+xmlDoc.document.getElementsByTagName("student")[i].attributes["name"]+'|'+
			xmlDoc.document.getElementsByTagName("student")[i].attributes["bday"]
			+'/<student>';
		}		
		console.log(send);
			//	console.log(json);var xmlDoc = new xml.DOM(xml.parse(json));
				// console.log(xml.parse(json)[0].attributes['faculty']);
				// 				console.log(xml.parse(json).lenght);
				// for(i=0;i<xml.parse(json).lenght;i++){
				// 	send+='<student faculti="'+xml.parse(json)[i].attributes['faculty']+'"">/<student>'
				// }
				console.log(send);
		res.writeHead(200,{'Content-Type':'application/xml'});
		res.end('<response> '+send+' </response>');
		});

		}
}
};

let server=http.createServer();
server.listen(3000,(v)=>{console.log('server running')})
.on('error',(e)=>{console.log('server.listen:error',e.code)})
.on('request',http_handler);



