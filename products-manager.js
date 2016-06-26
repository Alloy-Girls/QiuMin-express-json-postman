var fileOperate = require("./file-operate");
var nextId = require("./next-id");
function getAttributes(input) {
    var  correctInput = {
        "id": nextId(),
        "barcode": input.barcode,
        "name": input.name,
        "unit": input.unit,
        "price": input.price
    };
    return correctInput;
}

function judgeType(input) {
    if (typeof(input.barcode) === "string" && typeof(input.name) === "string" &&
        typeof(input.unit) === "string" && typeof(input.price) === "number") {
        var correctInput = getAttributes(input);
        return correctInput;
    }
    return false;
}

function insertData(item, next) {
    var data = fileOperate.readFile();
    var correctInput;
    correctInput = judgeType(item);
    if (!correctInput) {
        return false;
    }
    data.push(correctInput);
    fileOperate.writeFile(data, next);
    return data;
}


function deleteData(id, next) {
    var data = fileOperate.readFile();
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(id)) {
            data.splice(i, 1);
            fileOperate.writeFile(data, next);
            return true;
        }
    }
    return false;
}

function findOne(id) {
    var data = fileOperate.readFile();
    for (var i = 0 in data) {
        if (parseInt(id) === data[i].id) {

            return data[i];
        }
    }
    return false;
}

function findAll() {
    var datas = fileOperate.readFile();
    return datas;
}

function copyData(element, id) {
    var updateInput = {};
    updateInput.id = id;
    updateInput.barcode = element.barcode;
    updateInput.name = element.name;
    updateInput.unit = element.unit;
    updateInput.price = element.price;
    return updateInput;
}

function updateData(res,id, item, next) {
    var data = fileOperate.readFile();
    var correctInput = judgeType(item);
    if (!correctInput) {
        res.status(400).end();
    }
    else {
        for (var i = 0 in data) {
            if (data[i].id === parseInt(id)) {
                data[i] = copyData(item, parseInt(id));
                fileOperate.writeFile(data, next);
                return data[i];
            }
        }
        return false;
    }
}

module.exports = {
    insertData: insertData,
    updateData: updateData,
    deleteData: deleteData,
    findOne: findOne,
    findAll: findAll
};
 