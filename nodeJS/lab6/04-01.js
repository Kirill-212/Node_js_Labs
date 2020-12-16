
var http = require('http')
var url = require('url')
var fs = require('fs')
var data= require('./m04-01.js')


var db = new data.DB();

db.on('GET',(req,res)=>{console.log('DB GET');res.end(JSON.stringify(db.get()));});
db.on('POST',(req,res)=>{console.log('DB POST');req.on('data',data=>{
	let r= JSON.parse(data);
	db.post(r);
	res.end(JSON.stringify(r));
});
});
db.on('PUT',(req,res)=>{console.log('DB PUT');req.on('data',data=>{
	let r=JSON.parse(data);
	console.log(r.index+'|||');
	db.put(r.index,r.name,r.bday);
	res.end(JSON.stringify(r));
});
});
db.on('DELETE',(req,res)=>{console.log('DB DELETE');req.on('data',data=>{
	let r= JSON.parse(data);
	console.log(r.index);
	db.delete(r.index,1);
	res.end(JSON.stringify(r));});
});
db.on('COMMIT',()=>{db.commit();})



console.log("write:");
flag=false;
var sdx;
var sdx_new;
let timerId;
let ssTimer;
var ssTimeout;
var startTime;
var endTime;
var countReq=0;
var countCom=0;
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () =>{
time=0
let chunk = null;
while((chunk = process.stdin.read()) != null){
	time=Number(chunk.trim().slice(3, chunk.trim().length));
	if(chunk.trim().length===2 && chunk.trim()==='sd'){
		clearTimeout(sdx);	
		timerId.ref();
		ssTimer.ref();
		ssTimeout.ref();
		clearTimeout(sdx_new);
		console.log('sd clear');
		flag=false;
	}
	else if(flag && chunk.trim().slice(0, 2)==='sd'){
		timerId.unref();
		ssTimer.unref();
		ssTimeout.unref();
		clearTimeout(sdx);
		flag=false;
		console.log(chunk.trim().slice(0, 2)+'|command|'+flag);
		console.log(time+'|time');
		 sdx_new= setTimeout((p1)=>{
		console.log('server disconnect 2');
		process.exit(0);
		},Number(time),'sdx_new');
	}
	else if(chunk.trim().slice(0, 2)==='sd'){
		flag=true;
		console.log(chunk.trim().slice(0, 2)+'|command|'+flag);	
		console.log(time+'|time');
		 sdx= setTimeout((p1)=>{
		console.log('server disconnect 1');
		process.exit(0);
		},time,'sdx');
	}
	else if(chunk.trim().slice(0, 2)==='sc'){
		if(chunk.trim().length===2){
			clearInterval(timerId);
			console.log('Clear sc');
		}
		else{
			timerId = setInterval(() => {db.emit('COMMIT') 
				if(!fl){
			countCom+=1;
			}
		}, time);
		}

	}
	else if(chunk.trim().slice(0, 2)==='ss'){
		if(chunk.trim().length===2){
			clearInterval(ssTimer);
			clearTimeout(ssTimeout);
			console.log('ss clear');
		}
		else{
			 startTime=new Date;
			 countReq=0;
			 countCom=0;
		ssTimer = setInterval(() => statistics(time), 0);

		}
	}

 
}
});

var jsonsend={'start':0,'finish':0,'request':0,'commit':0};
fl=true;
function statistics(t){
	if(fl){
	ssTimeout= setTimeout((p1)=>{
			endTime=new Date;
		jsonsend={'start':startTime,'finish':endTime,'request':countReq,'commit':countCom};

		console.log('ssTimer clear');
		clearInterval(ssTimer);
		console.log(JSON.stringify(jsonsend));
		fl=true;

		},t,'ssTimeout');
	fl=false;
	}
//	console.log('stat');
}



http.createServer(function(request,respone){

	if (url.parse(request.url).pathname==='/'){
		let html = fs.readFileSync('./04-001.html');
		respone.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		respone.end(html);
	}
	else if(url.parse(request.url).pathname==='/api/db'){
		db.emit(request.method,request,respone);
		if(!fl){
			countReq+=1;
		}
	}
	else if(url.parse(request.url).pathname==='/api/ss'){
		respone.writeHead(200,{'Content-Type':'application/json'});
			console.log(jsonsend);
			console.log(JSON.stringify(jsonsend));
		respone.end(JSON.stringify(jsonsend));
	}
	
	
}).listen(3000);
console.log('server started');