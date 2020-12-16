var http = require('http');
var url = require('url');
var fs = require('fs');
const sql=require('mssql');
var config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    options: {
		database: 'node',
		encrypt: false,
		"enableArithAbort": true
	}
};

connectionPool = new sql.ConnectionPool(config).connect().then(pool => {
            console.log('Connected to MSSQL')
            return pool
        }).catch(err => console.log('Connection Failed: ', err));






json=''
function	get_Faculties(){
        return this.connectionPool.then(pool => pool.request().query('use node;Select * FROM FACULTY'))
    }
function    get_Pulpits(){
        return this.connectionPool.then(pool => pool.request().query('use node;Select * FROM PULPIT'))
    }
 function   get_Subjects(){
        return this.connectionPool.then(pool => pool.request().query('use node;Select * FROM SUBJECT'))
    }
 function   get_Auditoriums_Types(){
        return this.connectionPool.then(pool => pool.request().query('use node;Select * FROM AUDITORIUM_TYPE'))
    }
 function   get_Auditorims(){
        return this.connectionPool.then(pool => pool.request().query('use node;Select * FROM AUDITORIUM'))
    }

let processing_result=(err,result)=>{
	if(err)console.log(err.code+'|'+err.originalError.info.message);
	else{
		let str='';
		json='[';
		for(let i = 0;i<result.rowsAffected[0];i++){
			json+='{';
			for(key in result.recordset[i]){
				json+='"'+key+'"'+':'+'"'+result.recordset[i][key]+'"'+',';
				json = json.replace(',}','}');
			}
			json+='},';
			console.log('00000___');
		}
		json+=']';
		json = json.replace(',]',']');
		json = json.replace(',}','}');
		return json;

	}
}


 function post_Faculties(faculty, faculty_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('use node;INSERT FACULTY(FACULTY, FACULTY_NAME) values(@faculty , @faculty_name)');
        });
    }

   function  post_Pulpits(pulpit, pulpit_name, faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('use node;INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) values(@pulpit , @pulpit_name, @faculty)');
        });
    }

  function   post_Subjects(subject, subject_name, pulpit){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('use node;INSERT SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values(@subject , @subject_name, @pulpit)');
        });
    }

  function   post_Auditoriums_Types(auditorium_type, auditorium_typename){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('use node;INSERT AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values(@auditorium_type , @auditorium_typename)');
        });
    }

   function  post_Auditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('use node;INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)' +
                             ' values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)');
        });
    }


function put_Faculties(faculty, faculty_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('use node;UPDATE FACULTY SET FACULTY_NAME = @faculty_name WHERE FACULTY = @faculty');
        });
    }

  function  put_Pulpits(pulpit, pulpit_name, faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('use node;UPDATE PULPIT SET PULPIT_NAME = @pulpit_name, FACULTY = @faculty WHERE PULPIT = @pulpit');
        });
    }

  function  put_Subjects(subject, subject_name, pulpit){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('use node;UPDATE SUBJECT SET SUBJECT_NAME = @subject_name, PULPIT = @pulpit WHERE SUBJECT = @subject');
        });
    }

  function  put_Auditoriums_Types(auditorium_type, auditorium_typename){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('use node;UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = @auditorium_typename WHERE AUDITORIUM_TYPE = @auditorium_type');
        });
    }

  function  put_Auditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('use node;UPDATE AUDITORIUM SET AUDITORIUM_NAME = @auditorium_name, AUDITORIUM_CAPACITY = @auditorium_capacity, AUDITORIUM_TYPE =  @auditorium_type' +
                    ' WHERE AUDITORIUM = @auditorium');
        });
    }


function delete_Faculties(faculty_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('use node;DELETE FROM FACULTY WHERE FACULTY_NAME = @faculty_name');
        });
    }

 function   delete_Pulpits(pulpit_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .query('use node;DELETE FROM PULPIT WHERE PULPIT_NAME = @pulpit_name');
        });
    }

function    delete_Subjects(subject_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject_name', sql.NVarChar, subject_name)
                .query('use node;DELETE FROM SUBJECT WHERE SUBJECT_NAME = @subject_name');
        });
    }

function    delete_Auditoriums_Types(auditorium_typename){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('use node;DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPENAME = @auditorium_typename');
        });
    }

 function   delete_Auditoriums(auditorium_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .query('use node;DELETE FROM AUDITORIUM WHERE AUDITORIUM_NAME = @auditorium_name');
        });
    }

let txt = '';

let http_handler=(req,res)=>{
	txt='';
	if(req.method==='GET'){
		console.log(req.url+'|url');
		console.log(url.parse(req.url).pathname);
		if (url.parse(req.url).pathname==='/'){
		let html = fs.readFileSync('index.html');
		res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
		res.end(html);
		}
		else if(url.parse(req.url).pathname=='/api/faculties'){
					get_Faculties().then(c=>{
						res.writeHead(200,{'Content-Type':'application/json'});
						res.end(JSON.stringify(c.recordset))
					});
		}
		else if(url.parse(req.url).pathname=='/api/pulpits'){
					get_Pulpits().then(c=>{
						res.writeHead(200,{'Content-Type':'application/json'});
						res.end(JSON.stringify(c.recordset))
					});
		}
		else if(url.parse(req.url).pathname=='/api/subjects'){
					get_Subjects().then(c=>{
						res.writeHead(200,{'Content-Type':'application/json'});
						res.end(JSON.stringify(c.recordset))
					});
		}
		else if(url.parse(req.url).pathname=='/api/auditoriumstypes'){
					get_Auditoriums_Types().then(c=>{
						res.writeHead(200,{'Content-Type':'application/json'});
						res.end(JSON.stringify(c.recordset))
					});
		}
		else if(url.parse(req.url).pathname=='/api/auditorims'){
					get_Auditorims().then(c=>{
						res.writeHead(200,{'Content-Type':'application/json'});
						res.end(JSON.stringify(c.recordset))
					});
		}
	}
	else if(req.method==='POST'){
		txt='';
		console.log(req.url+'|url');
		if(url.parse(req.url).pathname=='/api/faculties'){
			req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                res.writeHead(200, {'Content-Type': 'application/json'});
               post_Faculties(txt.FACULTY, txt.FACULTY_NAME).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/pulpits'){
					req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               post_Pulpits(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/subjects'){
					req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               post_Subjects(txt.SUBJECT, txt.SUBJECT_NAME, txt.PULPIT).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/auditoriumstypes'){
					req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               post_Auditoriums_Types(txt.AUDITORIUM_TYPE, txt.AUDITORIUM_TYPENAME).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/auditorims'){
						req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               post_Auditoriums(txt.AUDITORIUM, txt.AUDITORIUM_NAME, txt.AUDITORIUM_CAPACITY, txt.AUDITORIUM_TYPE).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
	}
	else if(req.method==='PUT'){
		txt='';
		console.log(req.url+'|url');
		if(url.parse(req.url).pathname=='/api/faculties'){
			req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                res.writeHead(200, {'Content-Type': 'application/json'});
               put_Faculties(txt.FACULTY, txt.FACULTY_NAME).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/pulpits'){
					req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               put_Pulpits(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/subjects'){
					req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               put_Subjects(txt.SUBJECT, txt.SUBJECT_NAME, txt.PULPIT).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/auditoriumstypes'){
					req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               put_Auditoriums_Types(txt.AUDITORIUM_TYPE, txt.AUDITORIUM_TYPENAME).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
		else if(url.parse(req.url).pathname=='/api/auditorims'){
						req.on('data', chunk => {
                txt += chunk;
            });
            req.on('end', () => {
                txt = JSON.parse(txt);
                console.log(txt.PULPIT, txt.PULPIT_NAME, txt.FACULTY);
                res.writeHead(200, {'Content-Type': 'application/json'});
               put_Auditoriums(txt.AUDITORIUM, txt.AUDITORIUM_NAME, txt.AUDITORIUM_CAPACITY, txt.AUDITORIUM_TYPE).then(s => {
                    res.end(JSON.stringify(txt))
                }).catch(error => {error400(res, error)});
            });
		}
	}
	else if(req.method==='DELETE'){
		txt='';
		console.log(req.url+'|url');
		if(req.url.indexOf('/api/faculties')==0){
				res.writeHead(200, {'Content-Type': 'text/plain'});
            delete_Faculties(url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(url.parse(req.url).pathname.split('/')[3])
            }).catch(error => {error400(res, error)});
		}
		else if(req.url.indexOf('/api/pulpits')==0){
						res.writeHead(200, {'Content-Type': 'text/plain'});
           delete_Pulpits(url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(url.parse(req.url).pathname.split('/')[3])
            }).catch(error => {error400(res, error)});
		}
		else if(req.url.indexOf('/api/subjects')==0){
					res.writeHead(200, {'Content-Type': 'text/plain'});
            delete_Subjects(url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(url.parse(req.url).pathname.split('/')[3])
            }).catch(error => {error400(res, error)});
		}
		else if(req.url.indexOf('/api/auditoriumstypes')==0){
			console.log(url.parse(req.url).pathname.split('/')[3]);
					res.writeHead(200, {'Content-Type': 'text/plain'});
            delete_Auditoriums_Types(url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(url.parse(req.url).pathname.split('/')[3])
            }).catch(error => {error400(res, error)});
		}
		else if(req.url.indexOf('/api/auditorims')==0){
			console.log(url.parse(req.url).pathname.split('/')[3]);
						res.writeHead(200, {'Content-Type': 'text/plain'});
           delete_Auditoriums(url.parse(req.url).pathname.split('/')[3]).then(records => {
                res.end(url.parse(req.url).pathname.split('/')[3])
            }).catch(error => {error400(res, error)});
		}
	}
};

let server=http.createServer();
server.listen(3000,(v)=>{console.log('server running')})
.on('error',(e)=>{console.log('server.listen:error',e.code)})
.on('request',http_handler);

function error400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'error';
    res.end(JSON.stringify({error: String(error)}));
    ;
}

