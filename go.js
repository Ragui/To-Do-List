var express = require('express');
var app = express();
 
var http = require('http');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/Project'));
app.use(express.static(__dirname + '/public'));
var fs = require('fs');



function user(name,mail,pass,aaa){
	this.name=name;
	this.mail=mail;
	this.pass=pass;
	this.aaa=aaa;
}

app.get('/', function (req, res) {
    res.sendFile( __dirname+ "/Project/" + "account.html" );
});

app.get('/SignIn', function (req, res) {
    res.sendFile( __dirname+ "/Project/" + "account.html" );
});

app.post('/logo', function (req, res) {
    res.sendFile( __dirname+ "/Project/" + "login.html" );
});

app.post('/LogIn', function (req, res) {
	var users=[];
    var file_content = fs.readFileSync(__dirname +'/Project/users.json');
    var content = JSON.parse(file_content);
    users = content;
	var name=req.body.nom;
	var mail=req.body.mail;
	var pass=req.body.mot;
	var x=new user(name,mail,pass);
	var dialog = require('dialog');
	users.push(x);
	content=users;
	fs.writeFileSync(__dirname+'/Project/users.json',JSON.stringify(content,null,4));
	fs.writeFile(__dirname+'/Project/'+mail+'.json'," ");
	var str = fs.readFileSync(__dirname+'/Project/project.html');
	fs.writeFile(__dirname+'/Project/'+mail+'.html',str);
    res.sendFile( __dirname+ "/Project/" + "login.html" );
});



var mail;
app.post('/home', function (req, res) {
	mail = req.body.username;
    res.sendFile( __dirname+ "/Project/" + mail+".html");
	console.log("Home: "+mail);
	app.post('/load', function (req, res) {
		console.log("load: "+mail);
        res.send(mail);
    });
});

	app.post('/ho', function (req, res) {
		var mail2 = req.body.mail;
		console.log("ho: "+mail2);
	    fs.writeFile(__dirname+'/Project/'+mail2+'.json',req.body.newdata);
        res.sendFile( __dirname+ "/Project/" + "project.html" );
    });




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});



