var http = require('http');
var url = require('url');
var fs = require('fs');


let factorial = (n) => {return (n < 2?n:n*factorial(n-1));}
let fib=(n)=>{return(n<2?n:fib(n-1)+fib(n-2));}

function Fib(n,cb){
	this.fn=n;
	this.ffib=factorial;
	this.fcb=cb
	this.calc=()=>{process.nextTick(()=>{this.fcb(null,this.ffib(this.fn));});}
}


http.createServer(function(request,response){
	console.log(request.url);
	let rc= JSON.stringify({k:0,fib:0});


	if(url.parse(request.url).pathname==='/fib'){
		console.log(require.url);
		if(typeof url.parse(request.url,true).query.k!='undefined'){


			let k=parseInt(url.parse(request.url,true).query.k);


			if(Number.isInteger(k)){
			response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
			let fib=new Fib(k,(err,result)=>{response.end(JSON.stringify({k:k,fib:result}));});
			fib.calc();

			console.log('отправлен');
			}
		}
	}
	else if(url.parse(request.url).pathname==='/'){
		let html=fs.readFileSync('03-04.html');
		response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
			response.end(html);
	}else{
		response.end(rc);
	}
}).listen(3000);