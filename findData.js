var fileOperate = require("./fileOperate");
function findOne(req, res) {
    var data = fileOperate.readFile();
    for (var i = 0 in data) {
        if (parseInt(req.params.id) === data[i].id) {
            res.status(200).send(data[i]);
            return true;
        }
    }
    res.status(404).end();
}

function findAll(req, res) {
    var data = fileOperate.readFile();
    res.send(data);
}

exports.findAll = findAll;
exports.findOne = findOne;

