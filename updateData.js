var fs = require("fs");
var judgeType = require("./addData");
function updateData(req, res) {
    var data = JSON.parse(fs.readFileSync("./data.json"));
    var correctInput = judgeType.judgeType(req.body);
    if (!correctInput) {
        res.status(400).end();
        return;
    }
    else {
        for (var i in data) {
            if (data[i].id === parseInt(req.params.id)) {
                var temp = data[i].id;
                data[i].id = temp;
                data[i].barcode = correctInput.barcode;
                data[i].name = correctInput.name;
                data[i].unit = correctInput.unit;
                data[i].price = correctInput.price;
                fs.writeFileSync("./data.json", JSON.stringify(data));
                res.status(200).send(data[i]);
            }
        }
        if (i === data.length) {
            res.status(404).end();
        }
    }
}

module.exports = updateData;
