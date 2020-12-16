var util = require('util');
var ee = require('events');

var db_date=[
{
id:1,name:'ded',bday:'2000-0-0'
},
{
id:2,name:'cletka',bday:'2000-0-0'	
},
{
id:3,name:'med',bday:'2010-0-0'
}
];


function DB(){
	this.get=()=>{console.log('hello');return db_date;};
	this.post=(r)=>{db_date.push(r);};
	this.delete=(pos,col)=>{db_date.splice(pos,col);};
	this.put=(pos,newname,newbday)=>{db_date[pos].name=newname;db_date[pos].bday=newbday;};
}


util.inherits(DB,ee.EventEmitter);

exports.DB=DB;