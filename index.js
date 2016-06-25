var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var fileOperate = require("./fileOperate");
app.use(bodyParser.json());

fileOperate.createFile();

app.post('/products', require("./addData").insertData);
app.delete('/product/:id', require("./deleteData"));
app.get('/products/:id', require("./findData").findOne);
app.get('/products', require("./findData").findAll);
app.put('/products/:id', require("./updateData"));

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("listen on " + port);
});
