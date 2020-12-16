const MongoClient=require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
const uri="mongodb+srv://123:123@cluster0.68r23.mongodb.net";
constructor();
  function  constructor() {
        
        client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.client = this.client.connect().then(connection => {return connection.db("BSTU")});
        console.log("Connected to MongoDB");
    }

function get_table(tablename){
	return client.then(db=>{
		return db.collection(tablename).find({}).toArray();
	})
}
 function  post_table(tableName, fields,res) {
   
        return this.client
            .then(async db => {

                await db.collection(tableName).insertOne(fields, (err, r) =>{
                    if(err) {
                            return '{error:"error"}'
                    }
                    else {
                        console.log(r.insertedCount);
                    }
                });
               // Console.log(fields);
                return fields;
            });
        

    };
 function  put_table(tableName, fields) {
        return this.client
            .then(async db => {
                console.log(fields['_id']);
                if (!fields['_id']) {
                    throw "error id";
                }
                delete fields._id;
                await db.collection(tableName).updateOne({_id: ObjectId(fields['_id'])}, {$set: fields});
                return fields;
            })
    };

function delete_table(tableName, id) {
        return this.client
            .then(async db => {
                if (!id) {
                    throw 'error ID';
                }       
                await db.collection(tableName).deleteOne({_id: ObjectId(id)});
                return id;
            });
    }

let http_handler=(req,res)=>{
	 res.writeHead(200, {'Content-Type': 'application/json'});
	if(req.method==='GET'){
		if (url.parse(req.url).pathname==='/api/faculties'){
			
					//console.log(get_table('FACYLTY'));
					get_table('FACYLTY').then(records => res.end(JSON.stringify(records)))
                .catch(error => {
                   errors(res, error);
                });
		}
		else if(url.parse(req.url).pathname==='/api/pulpits'){
					get_table('PULPIT').then(records => res.end(JSON.stringify(records)))
                .catch(error => {
                   errors(res, error);
                });
		}
		
	}
	else if(req.method==='POST'){
		if (url.parse(req.url).pathname==='/api/faculties'){
			json='';
			req.on('data', chunk => {
               json += chunk;
            });
            req.on('end', () => {
                json = JSON.parse(json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                post_table('FACYLTY', json,res).then(records => res.end(JSON.stringify(records))).catch(error => {errors(res, error)});
            });
		}
		else if(url.parse(req.url).pathname==='/api/pulpits'){
							json='';
			req.on('data', chunk => {
               json += chunk;
            });
            req.on('end', () => {
                json = JSON.parse(json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                post_table('PULPIT', json,res).then(records => res.end(JSON.stringify(records))).catch(error => {errors(res, error)});
            });
		}
             
	}
	else if(req.method==='PUT'){
	if (url.parse(req.url).pathname==='/api/faculties'){
			json='';
			req.on('data', chunk => {
               json += chunk;
            });
            req.on('end', () => {
                json = JSON.parse(json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                put_table('FACYLTY', json).then(records => res.end(JSON.stringify(records))).catch(error => {errors(res, error)});
            });
		}
		else if(url.parse(req.url).pathname==='/api/pulpits'){
							json='';
			req.on('data', chunk => {
               json += chunk;
            });
            req.on('end', () => {
                json = JSON.parse(json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                put_table('PULPIT', json).then(records => res.end(JSON.stringify(records))).catch(error => {errors(res, error)});
            });
		}
	}
	else if(req.method==='DELETE'){
		if (req.url.indexOf('/api/faculties')==0){
			res.writeHead(200, {'Content-Type': 'application/json'});
            delete_table('FACYLTY', url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(JSON.stringify('{_id:'+records+'}'))
            }).catch(error => {errors(res, error)});
		}
		else if(req.url.indexOf('/api/pulpits')==0){
			res.writeHead(200, {'Content-Type': 'application/json'});
            delete_table('PULPIT', url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(JSON.stringify('{_id:'+records+'}'))
            }).catch(error => {errors(res, error)});
		}
	}
};

let server=http.createServer();
server.listen(3000,(v)=>{console.log('server running')})
.on('error',(e)=>{console.log('server.listen:error',e.code)})
.on('request',http_handler);


function errors(res, error) {
   res.code = 400;
    //res.statusMessage = 'Invalid method';
    res.end(JSON.stringify({error: String(error)}));
    ;
}


