var fs = require("fs");
function findOne(req, res) {
    var Data = JSON.parse(fs.readFileSync('data.json'));
    for (var i in Data) {
        if (parseInt(req.params.id) === Data[i].id) {
            res.status(204).send(Data[i]);
            return;
        }

    }
    res.status(404).end();
}

function findAll(req, res) {
    var Data = JSON.parse(fs.readFileSync("./data.json"));
    res.send(Data);
}


exports.findAll = findAll;
exports.findOne =findOne;

