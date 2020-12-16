var http = require('http');
var url = require('url');
var fs = require('fs');
var async = require('async');
var path = require('path');
function getFiles (dirPath, callback) {

    fs.readdir(dirPath, function (err, files) {
        if (err) return callback(err);

        var filePaths = [];
        async.eachSeries(files, function (fileName, eachCallback) {
            var filePath = path.join(dirPath, fileName);

            fs.stat(filePath, function (err, stat) {
                if (err) return eachCallback(err);

                if (stat.isDirectory()) {
                    getFiles(filePath, function (err, subDirFiles) {
                        if (err) return eachCallback(err);

                        filePaths = filePaths.concat(subDirFiles);
                        eachCallback(null);
                    });

                } else {
                    if (stat.isFile() && /\.txt$/.test(filePath)) {
                        filePaths.push(filePath);
                    }

                    eachCallback(null);
                }
            });
        }, function (err) {
            callback(err, filePaths);
        });

    });
}



let http_handler=(req,res)=>{
	if(req.method==='GET'){
		json='';
		if (url.parse(req.url).pathname==='/'){
			fs.readFile('StudentList.json',(e,data)=>{
				if(e)console.log(e);
				else {
					txt='';
					txt=data.toString('utf8');
					console.log(txt.toString());

					console.log(json);
					res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify(JSON.parse(txt)));
				}
			})	
		}
		else if(url.parse(req.url).pathname==='/backup'){
			try{
				fs.readdir('./',(err,files)=>{
				console.log(files);
				res.writeHead(200,{'Content-Type':'application/json'});
			res.end(JSON.stringify({message:'completed',files:files}));
							})		

							}
							catch(err){
								console.log(err);
					}	
			// res.writeHead(200,{'Content-Type':'application/json'});
			// res.end(JSON.stringify({message:'completed'}));
		}
		else if(req.url.indexOf('/')==0){
			result='';
			console.log(url.parse(req.url).pathname.split('/')[1]);
			txt='';
			fs.readFile('StudentList.json',(e,data)=>{
				if(e)console.log(e);
				else {
					txt+=data.toString('utf8');6
					for(i=0;i<JSON.parse(txt).length;i++){
						console.log(JSON.parse(txt)[i]['id']);
						console.log(url.parse(req.url).pathname.split('/')[1]);
						console.log(JSON.parse(txt)[i]['id']==url.parse(req.url).pathname.split('/')[1]);
						if(JSON.parse(txt)[i]['id']==url.parse(req.url).pathname.split('/')[1]){
							console.log(JSON.parse(txt)[i]);
							result=JSON.parse(txt)[i];
							console.log(result);
							res.writeHead(200,{'Content-Type':'application/json'});
							res.end(JSON.stringify(result));
						}
					}
					send={"error":2,"message":"студент с id равным "+url.parse(req.url).pathname.split('/')[1]+
					" не найден"};
					res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify(send));

					//console.log(txt);
					//res.writeHead(200,{'Content-Type':'application/json'});
					//res.end(JSON.stringify(JSON.parse(json)["__comment"]));
				}
			})
		}
	}
	else if(req.method==='POST'){
		if (url.parse(req.url).pathname==='/'){
			txt='';
			json='';
			fs.readFile('StudentList.json',(e,data)=>{
				if(e)console.log(e);
				else {
					txt+=data.toString('utf8');
					req.on('data',data=>{
						json+=data;
						for(i=0;i<JSON.parse(txt).length;i++){
						if(JSON.parse(txt)[i]['id']==JSON.parse(json)['id']){
							send={"error":3,"message":"студент с id равным "+JSON.parse(json)['id']+
							" уже есть"};
							res.writeHead(200,{'Content-Type':'application/json'});
							res.end(JSON.stringify(send));
						}
					}
					result=JSON.parse(txt);
					result.push(JSON.parse(json));
					fs.writeFile('StudentList.json',JSON.stringify(result),(e)=>{
						if(e)throw e;
						console.log('write in file completed');
					})
					res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify(JSON.parse(json)));
						
					});
				}
			})	
		}
		else if(url.parse(req.url).pathname==='/backup'){
			var date=new Date();
			str=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+'-'+
			date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds();
			console.log(str);
			setTimeout(()=>{
				fs.copyFile('StudentList.json',str+'_StudentList.json',(e)=>{
				if(e)console.log(e);
				else console.log('file copy complited');
			})
			res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify({message:'completed'}));
			},2000);
			//console.log(new Date(year,month,date,hours,minutes,seconds));
			
		}
	}
	else if(req.method==='PUT'){
		if (url.parse(req.url).pathname==='/'){
			txt='';
			json='';
			fs.readFile('StudentList.json',(e,data)=>{
				if(e)console.log(e);
				else {
					txt+=data.toString('utf8');
					req.on('data',data=>{
						json+=data;
						for(i=0;i<JSON.parse(txt).length;i++){
						if(JSON.parse(txt)[i]['id']==JSON.parse(json)['id']){
						result=JSON.parse(txt);
						result[i]=JSON.parse(json);
						fs.writeFile('StudentList.json',JSON.stringify(result),(e)=>{
						if(e)throw e;
						console.log('write in file completed');
					})
					res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify(JSON.parse(json)));
						}
					}
							send={"error":4,"message":"студент с id равным "+JSON.parse(json)['id']+
							" не найден"};
							res.writeHead(200,{'Content-Type':'application/json'});
							res.end(JSON.stringify(send));
						
					});
				}
			})	
		}
	}
	else if(req.method==='DELETE'){
		if(req.url.indexOf('/backup')==0){
			try{
				fs.readdir('./',(err,files)=>{
				console.log(files);
				for(i=0;i<files.length;i++){
					console.log(files[i]);
					if(files[i].includes('.json') && files[i].includes('_StudentList.json'))
						{

							var d=new Date(files[i].slice(0,4),files[i].slice(5,7),files[i].slice(8,10));
							var d2=new Date(url.parse(req.url).pathname.split('/')[2].slice(0,4),url.parse(req.url).pathname.split('/')[2].slice(4,6),url.parse(req.url).pathname.split('/')[2].slice(6,8));
							console.log(d+'|'+d2);
							console.log(files[i].slice(0,4)+'|'+url.parse(req.url).pathname.split('/')[2].slice(0,4));
							console.log(files[i].slice(5,7)+'|'+url.parse(req.url).pathname.split('/')[2].slice(4,6));
							console.log(files[i].slice(8,10)+'|'+url.parse(req.url).pathname.split('/')[2].slice(6,8));
							if(d2<d){
								fs.unlink('./'+files[i],(e)=>{
									if(e)console.log(e);
									else console.log('file delete');
								})
							}
							//var d=new Date(files[i].slice(0,3))
						//console.log(files[i].slice(0,4)+'|'+files[i].slice(5,6)+'|'+files[i].slice(7,9));
					}
				}
				res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify({message:'completed'}));
			})		

			}
			catch(err){
				console.log(err);
			}	
			//console.log(url.parse(req.url).pathname.split('/')[2]);
		}
		else if(req.url.indexOf('/')==0){
			result='';
			txt='';
			fs.readFile('StudentList.json',(e,data)=>{
				if(e)console.log(e);
				else {
					txt+=data.toString('utf8');6
					for(i=0;i<JSON.parse(txt).length;i++){
						if(JSON.parse(txt)[i]['id']==url.parse(req.url).pathname.split('/')[1]){
						result=JSON.parse(txt);
						send=JSON.parse(txt)[i];
						result.splice(i,1);
						console.log(result)
						fs.writeFile('StudentList.json',JSON.stringify(result),(e)=>{
						if(e)throw e;
						console.log('write in file completed');
					})
					res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify(send));
						}
					}
					send={"error":2,"message":"студент с id равным "+url.parse(req.url).pathname.split('/')[1]+
					" не найден"};
					res.writeHead(200,{'Content-Type':'application/json'});
					res.end(JSON.stringify(send));
					//console.log(txt);
					//res.writeHead(200,{'Content-Type':'application/json'});
					//res.end(JSON.stringify(JSON.parse(json)["__comment"]));
				}
			})
		}

	}
};

let server=http.createServer();
server.listen(3000,(v)=>{console.log('server running')})
.on('error',(e)=>{console.log('server.listen:error',e.code)})
.on('request',http_handler);



