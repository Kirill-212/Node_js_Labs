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
 	transporter.sendMail(message,(err,info)=>{
 		if(err) return console.log(err);
 		console.log('Email sent:',info);
 	})
 }

 module.exports=mailer;

