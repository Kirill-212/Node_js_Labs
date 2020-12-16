
url='./static';



function Stat(sfn='/static') {
	this.STATIC_FOLDER=sfn;
	let pathStatic=(fn)=>{console.log('PATH->/static'+fn); return url;}
	this.writeHTTP404=(res)=>{
	res.statusCode=404;
	res.statusMessage='Resourse not found';
	res.end('Resourse not found');
	console.log('Error');
}
this.writeHTTP404=(res)=>{
	res.statusCode=404;
	res.statusMessage='Resourse not found';
	res.end('Resourse not found');
	console.log('Error');
	url='./static';
}
let fs=require('fs');
let pipeFile=(req,res,headers)=>{
	console.log(url);
	res.writeHead(200,headers);
	fs.createReadStream(pathStatic(url)).pipe(res);
	url='./static';
}
this.isStatic =(ext,fn)=>{let reg =new RegExp('^/[a-zA-Z0-9]+.'+ext+'$');
url='./static';
console.log(reg.test(fn)+'|'+ext+'|'+fn);url=url+'/'+fn;console.log(url+'|is static');return reg.test(fn);};
this.sendFile=(req,res,headers)=>{
	fs.access(url,fs.constants.R_OK,err=>{
		console.log(url+'|send');
		if(err)this.writeHTTP404(res);
		else pipeFile(req,res,headers);
	});
}
}


module.exports=(parm)=>{return new Stat(parm);}