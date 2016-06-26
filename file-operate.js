var fs = require("fs");
var FILE_NAME = "data.json";
function createFile() {
    fs.exists(FILE_NAME, function (exists) {
        if (!exists) {
            fs.open(FILE_NAME, "a", function (err, fd) {
                if (err) {
                    console.log("file not exist,create failing!");
                }
                else {
                    fs.writeFileSync(FILE_NAME, JSON.stringify([]));
                }
            });
        }
    });
}

function writeFile(data, next) {
    fs.writeFile(FILE_NAME, JSON.stringify(data), function (err) {
        if (err)
            return next(err);
    });
}

function readFile() {
    var data = JSON.parse(fs.readFileSync(FILE_NAME));
     return data;
}

module.exports = {
    createFile: createFile,
    writeFile: writeFile,
    readFile: readFile
};