var express = require("express");
var app = express();

var fileOperate = require("./file-operate");
fileOperate.createFile();

app.use('/products',require('./products-router'));

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("listen on " + port);
});
