var fs = require("fs");
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

function updateData(req, res) {
    var data = JSON.parse(fs.readFileSync("./data.json"));
    var correctInput = judgeType.judgeType(req.body);
    if (!correctInput) {
        res.status(400).end();
    }
    else {
        for (var i = 0 in data) {
            console.log(req.params.id);
            if (data[i].id === parseInt(req.params.id)) {
                data[i] = copyData(req.body, req.params.id);
                fs.writeFileSync("./data.json", JSON.stringify(data));
                res.status(200).send(data[i]);
                return true;
            }
        }
        res.status(404).end();
    }
}

module.exports = updateData;