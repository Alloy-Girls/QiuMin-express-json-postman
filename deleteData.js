var fileOperate = require("./fileOperate");

function deleteData(req, res, next) {
    var data = fileOperate.readFile();
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            data.splice(i, 1);
            fileOperate.writeFile(data, next);
            res.status(204).end();
            return true;
        }
    }
    res.status(404).end();
}

module.exports = deleteData;