var fs = require("fs");
var judgeType = require("./addData");

function copyData(element) {
    var updateInput = {};
    var temp = element.id;
    updateInput.id = temp;
    updateInput.barcode = element.barcode;
    updateInput.name = element.name;
    updateInput.unit = element.unit;
    updateInput.price = element.price;
    return updateInput;
}

function updateData(req, res) {
    var data = JSON.parse(fs.readFileSync("./data.json"));
    var correctInput = judgeType.judgeType(req.body);
    if (!correctInput) {
        res.status(400).end();
    }
    else {
        for (var i = 0 in data) {
            if (data[i].id === parseInt(req.params.id)) {
                data[i] = copyData(data[i]);
                fs.writeFileSync("./data.json", JSON.stringify(data));
                res.status(200).send(data[i]);
                return true;
            }
        }
            res.status(404).end();
    }
}

module.exports = updateData;
