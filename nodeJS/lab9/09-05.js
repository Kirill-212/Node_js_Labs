var http=require('http');
var xmlbuilder=require('xmlbuilder');
var parseString=require('xml2js').parseString;
let path='/xml';
let xmldoc=xmlbuilder.create('student').att('faculty','IT').att('speciality','POIT');
xmldoc.ele('student').att('id','1').att('name','Name').att('bday','2000-00-00')
.up().ele('student').att('id','2').att('name','Name2').att('bday','2000-01-01')
.txt('died')
.up().ele('student').att('id','3').att('name','Name3').att('bday','2001-02-02');
let options={
	host:'localhost',
	path:path,
	port:3000,
	method:'POST',
	headers:{
		'content-type':'text/xml','accept':'text/xml'
	}
}

const req=http.request(options,(res)=>{
	console.log(req.method);
	console.log(res.statusCode);
	console.log(res.statusMessage);
	console.log(res.socket.remoteAddress);
	console.log(res.socket.remotePort);
	console.log(res.headers);
	let data= ' ';
res.on('data',(chunk)=>{
	console.log(data+=chunk.toString('utf8'));
});

res.on('end',()=>{
	parseString(data,(err,str)=>{
		if(err)console.log('error');
		else{
			console.log(str);
			console.log(str.result);
		}
	})
});
});

req.on('error',(e)=>{
	console.log(e.message);
});
req.end(xmldoc.toString({pretty:true}));
