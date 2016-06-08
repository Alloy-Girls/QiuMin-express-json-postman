var fs = require("fs");
maxId = 0;
function addId(Array) {
    var intId = 1;
    for (var i = 0; i < Array.length; i++) {
        if (!Array[i].id) {
            if (i == 0) {
                Array[i].id = intId;
                maxId = Array[i].id;
            }
            else {
                maxId += 1;
                Array[i].id = maxId;
            }
        }
    }
}


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

function judgeFormat(input) {
    if (typeof(input) != "object") {
        return;
    }
    return input;
}

function judgeType(input) {
    if (!judgeFormat(input)) {
        return;
    }
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

function sortData(data) {
    for (var i = 0; i < data.length; i++) {
        var dataObj = {};
        dataObj.id = data[i].id;
        dataObj.barcode = data[i].barcode;
        dataObj.name = data[i].name;
        dataObj.unit = data[i].unit;
        dataObj.price = data[i].price;
        data[i] = dataObj;
    }
}

function insertData(req, res) {
    var data = JSON.parse(fs.readFileSync("./data.json"));
    var correctInput;
    // console.log(req.body);
    if (req.body != "{}") {
        correctInput = judgeType(req.body);
        if (!correctInput) {
            res.status(400).end();
            return;
        }
    }
    else{
        correctInput = req.body;
    }
    data.push(correctInput);
    addId(data);
    sortData(data);
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
