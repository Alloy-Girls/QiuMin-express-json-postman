var fs = require("fs");

function createFile() {
    fs.exists("./data.json", function (exists) {
        if (!exists) {
            fs.open("./data.json", "a", function (err, fd) {
                if (err) {
                    console.log("file not exist,create failing!");
                }
                else {
                    fs.writeFileSync("./data.json", JSON.stringify([]));
                }
            });
        }
    });
}

function writeFile(data, next) {
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if (err)
            return next(err);
    });
}

function readFile() {
    var data = JSON.parse(fs.readFileSync('data.json'));
     return data;
}

module.exports = {
    createFile: createFile,
    writeFile: writeFile,
    readFile: readFile
};