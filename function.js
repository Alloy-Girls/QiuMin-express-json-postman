var fs = require("fs");
var maxId = 0;
function addObject(primaryData, newData) {
    newData.forEach(function (object) {
        primaryData.push(object);
    })
}

function addId(Array) {
    var intId = 1;
    for (var i = 0; i < Array.length; i++) {
        if (!Array[i].id) {////////////记住这个这个坑, !0 也为 真啊,所以id值为从0开始,我这样用就是一个坑
            if (i == 0) {
                Array[i].id = intId;
                maxId = Array[i].id;
            }
            else {
                maxId += 1;
                Array[i].id = maxId;
            }
        }
    }
}

//输入有多余的属性 -> 只取需要的属性
//输入缺失的属性 -> 返回 401
//输入数据类型错误 -> 返回401

function errSolve(input) {
    var endInput = [];
    var temp = [];
    var errobj = {};
    for (var i = 0; i < input.length; i++) {
        if (input[i].barcode && input[i].name && input[i].unit && input[i].price) {
            var obj = {};
            obj.barcode = input[i].barcode;
            obj.name = input[i].name;
            obj.unit = input[i].unit;
            obj.price = input[i].price;
            endInput.push(obj);
        }
        else {
            temp.push(i + ",");
        }
    }
    if (temp[0]) {
        errobj.err = "401" + "(详情:第" + temp + "条数据缺失属性或者数据类型错误!)";
    }
    errobj.input = endInput;
    return errobj;
}


function insertData(req, res) {
    var jsonData = fs.readFileSync("./data.json");
    data = JSON.parse(jsonData);
    var errobj = errSolve(req.body);
    addObject(data, errobj.input);
    console.log(data);
    addId(data);
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if (err) {
            res.send("ERROR:" + err);
        }
        else if (errobj.err) {
            res.send(errobj.err + "其他数据插入成功!");
        }
        else {
            res.send("200　插入成功！");
        }
    });
}

function deleteData(req, res) {
    var Data = JSON.parse(fs.readFileSync('./data.json'));
    for (var i = 0; i < Data.length; i++) {
        if (Data[i].id === parseInt(req.params.id)) {
            Data.splice(i, 1);
            fs.writeFileSync("./data.json", JSON.stringify(Data));
            res.send("201  删除成功!");
        }
    }
    if (i === Data.length) {
        res.send("404");
    }
}

function findOne(req, res) {
    var Data = JSON.parse(fs.readFileSync('data.json'));
    Data.forEach(function (elementObj) {
        if (elementObj.id === parseInt(req.params.id)) {
            res.send(elementObj);
            return;
        }
    });
    res.send("404");
}

function findAll(req, res) {
    var Data = JSON.parse(fs.readFileSync("./data.json"));
    res.send(Data);
}

function putError(input) {
    var inputObj = {};
    if (input.barcode && input.name && input.unit && input.price) {
        var obj = {};
        obj.barcode = input.barcode;
        obj.name = input.name;
        obj.unit = input.unit;
        obj.price = input.price;
        inputObj.obj = obj;
    }
    if (!inputObj.obj) {
        inputObj.err = "401  sorry,你输入的属性不足或者数据类型不正确!";
    }
    return inputObj;

}


function updateData(req, res) {
    var Data = JSON.parse(fs.readFileSync("./data.json"));
    var inputObj = putError(req.body);
    if (inputObj.obj) {
        for (var i = 0; i < Data.length; i++) {
            if (Data[i].id === parseInt(req.params.id)) {
                var temp = Data[i].id;
                Data[i] = inputObj.obj;
                Data[i].id = temp;
                fs.writeFileSync("./data.json", JSON.stringify(Data));
                res.send(Data[i]);
            }
        }
        if (i === Data.length) {
            res.send("404");
        }
    }
    else {
        res.send(inputObj.err);
    }
}


exports.addId = addId;
exports.insertData = insertData;
exports.deleteData = deleteData;
exports.findOne = findOne;
exports.findAll = findAll;
exports.updateData = updateData;
