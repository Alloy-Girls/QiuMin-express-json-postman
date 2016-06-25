var fileOperate = require("./fileOperate");
var judgeType = require("./addData");

function copyData(element, id) {
    var updateInput = {};
    updateInput.id = id;
    updateInput.barcode = element.barcode;
    updateInput.name = element.name;
    updateInput.unit = element.unit;
    updateInput.price = element.price;
    return updateInput;
}

function updateData(req, res, next) {
    var data = fileOperate.readFile();
    var correctInput = judgeType.judgeType(req.body);
    if (!correctInput) {
        res.status(400).end();
    }
    else {
        for (var i = 0 in data) {
            if (data[i].id === parseInt(req.params.id)) {
                data[i] = copyData(req.body, parseInt(req.params.id));
                fileOperate.writeFile(data, next);
                res.status(200).send(data[i]);
                return true;
            }
        }
        res.status(404).end();
    }
}

module.exports = updateData;