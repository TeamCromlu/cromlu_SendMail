var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var parsero = require('body-parser');
var emailTemplates = require('email-templates');
var jade = require('jade');
var Hogan = require('hogan.js');
var fs = require('fs');

// get file
var template = fs.readFileSync('./views/mail_1.hjs','utf-8');
// compile template
var compiledTemplate = Hogan.compile(template);

router.post('/send', handleSayHello); // handle the route at yourdomain.com/sayHello


function handleSayHello(req, res) {
	// var fn = jade.compile('')

    var transporter = nodemailer.createTransport(smtpTransport({
	    service : 'Gmail',//mail.cromlu.com
	    auth: {
	        user: 'cromlu.web@gmail.com',
	        pass: 'cromlu1221'
		    }
		})
	);


	var mailOptions = {
	    from: 'Cromlu  <web@cromlu.com>', // sender address
	    to: req.body.email + ', ' +'cromlu.web@gmail.com', // list of receivers
	    subject: '' + req.body.nombre + ' Bienvenido a Cromlu :)', // Subject line
	    html: compiledTemplate.render({
	    	name : req.body.nombre,
	    	mensaje: req.body.autor //el req autor jala del formulario y pega en mensaje en todos
	    	// el mensaje es el saludo el autor del mail asi esta en los templates como mensaje
	    })   
	    // render templte
	};

	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.render('error_Mensaje');
	        // res.send("mensaje no envio: " , error )
	    }
	    console.log('Message sent: ' + info);
	    // res.send('mensaje enviado :D');
	    res.render('send_ok', { name: req.body.nombre, email : req.body.email, tipo: req.body.tipo })
	});
}

// Mail testing usuarios directo
router.get('/preview', function (req, res){
  res.render('tem_mail-test')
});

// Mail Marketing
router.get('/preview_0', function (req, res){
  res.render('mail_invitacion')
});

// Mails del proceso
router.get('/preview_1', function (req, res){
  res.render('mail_1')
});

router.get('/preview_2', function (req, res){
  res.render('mail_2')
});

router.get('/preview_3', function (req, res){
  res.render('mail_3')
});

router.get('/preview_4', function (req, res){
  res.render('mail_4')
});

router.get('/preview_5', function (req, res){
  res.render('mail_5')
});

router.get('/preview_6', function (req, res){
  res.render('mail_6')
});





module.exports = router;
