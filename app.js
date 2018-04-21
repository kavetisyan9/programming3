var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public"));

app.get("/", function(req, res){
   res.redirect("public");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

