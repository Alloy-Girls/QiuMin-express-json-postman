var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var router = express();
router.listen(3000);
router.use(bodyParser.json());//解析前端获得的字符串
var operation = require("./function.js");
// var maxId = [];

var data = [
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
    },
    {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
    }
];

var addData = [{
    barcode: 'ITEM000004',
    name: '电池',
    unit: '个',
    price: 2.00
},
    {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
    }];


operation.addId(data);
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









