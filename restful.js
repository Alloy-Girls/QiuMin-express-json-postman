var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var router = express();
router.listen(3000);
router.use(bodyParser.json());//解析前端获得的字符串
var operation = require("./function.js");
fs.exists("./data.json", function (exists) {
    if (!exists) {
        fs.open("./data.json", "a", function (err, fd) {
            if (err) {
                console.log("文件不存在,创建不成功!");
            }
            else {
                fs.writeFileSync("./data.json", JSON.stringify([]));
            }

        });
    }
});

router.post('/products', operation.insertData);
router.delete('/products/:id', operation.deleteData);
router.get('/products/:id', operation.findOne);
router.get('/products', operation.findAll);
router.put('/products/:id', operation.updateData);









