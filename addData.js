var fs = require("fs");
var maxId = 0;
function getAttributes(input) {
    var correctInput = {};
    if (input.barcode && input.name && input.unit && input.price) {
        correctInput.barcode = input.barcode;
        correctInput.name = input.name;
        correctInput.unit = input.unit;
        correctInput.price = input.price;
    }
    return correctInput;
}

function judgeType(input) {
    var attributes = getAttributes(input);
    if (attributes) {
        if (typeof(input.barcode) != "string" || typeof(input.name) != "string"
            || typeof(input.unit) != "string" || typeof(input.price) != "number") {
            return;
        }
    }
    console.log(attributes);
    return attributes;
}

function addId(input) {
        var Obj = {};
        Obj.id = ++maxId;
        Obj.barcode = input.barcode;
        Obj.name = input.name;
        Obj.unit = input.unit;
        Obj.price = input.price;
       return Obj;
}

function insertData(req, res) {
    var data = JSON.parse(fs.readFileSync("./data.json"));
    var correctInput;
        console.log(req.body);
        correctInput = judgeType(req.body);
        if (!correctInput) {
            res.status(400).end();
            return;
        }
    correctInput =  addId(correctInput);
    data.push(correctInput);
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if (err) {
            res.send("ERROR:" + err);
            console.log(err);
        }
        else {
            res.status(200).send(data[data.length - 1]);
        }
    });
}

exports.judgeType = judgeType;
exports.insertData = insertData;
