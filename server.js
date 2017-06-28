var express = require('express');
var port = 9487;
var path = require('path');
var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var start_controller = require("./Controller.js");

app.use(express.static(path.join(__dirname, 'view')));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/view/main.html');
});

start_controller(io);

http.listen(port, function(){
	console.log('listening on *:'+port);
});

