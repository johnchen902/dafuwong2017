var express = require("express");
var app = express();
var port = 9487;
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var start_controller = require("./controller.js");

app.use(express.static(path.join(__dirname, 'view')));

start_controller(io);
	
http.listen(port, function(){
	console.log('listening on *:'+port);
});

