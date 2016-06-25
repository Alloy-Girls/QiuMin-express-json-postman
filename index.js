var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var fileOperate = require("./fileOperate");
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
