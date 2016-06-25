var fileOperate = require("./fileOperate");
var maxId = 0;
function getAttributes(input) {
    var correctInput = {};
    correctInput.id = ++maxId;
    correctInput.barcode = input.barcode;
    correctInput.name = input.name;
    correctInput.unit = input.unit;
    correctInput.price = input.price;
    return correctInput;
}

function judgeType(input) {
    if (typeof(input.barcode) === "string" && typeof(input.name) === "string" &&
        typeof(input.unit) === "string" && typeof(input.price) === "number") {
        var correctInput = getAttributes(input);
        return correctInput;
    }
    if (typeof(input.barcode) === "string" && typeof(input.name) === "string" &&
        typeof(input.unit) === "string" && typeof(input.price) === "number") {
        var correctInput = getAttributes(input);
        return correctInput;
    }
    return false;
}

function insertData(req, res, next) {
    var data = fileOperate.readFile();
    var correctInput;
    correctInput = judgeType(req.body);
    if (!correctInput) {
        res.status(400).end();
        return false;
    }
    data.push(correctInput);
    fileOperate.writeFile(data,next);
    res.status(200).send(data[data.length - 1]);
}
 

exports.judgeType = judgeType;
exports.insertData = insertData;
exports.insertData = insertData;
