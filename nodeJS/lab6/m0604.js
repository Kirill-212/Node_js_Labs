const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kellie.morissette28@ethereal.email',
        pass: 'UnPeQcbrhbDfpQusHE'
    }
	},

);
    
 const mailer=message=>{
 			
 	 		Message={
 	 			from:'Mailer Test <kirya.bolvako@mail.ru>',
		 to:"kirya.bolvako@mail.ru",
		 subject:message,
		 text:message
 	 		}
 	transporter.sendMail(Message,(err,info)=>{
 		console.log(Message);
 		if(err) return console.log(err);
 		console.log('Email sent:',info);
 	})
 }

 module.exports=mailer;