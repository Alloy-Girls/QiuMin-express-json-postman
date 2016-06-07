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
            obj.barcode = String(input[i].barcode);
            obj.name = String(input[i].name);
            obj.unit = String(input[i].unit);
            obj.price = Number(input[i].price);
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

// function format(obj) {
//     var data = {};
//     data.barcode = typeof(obj.barcode);
//     data.name = typeof(obj.name);
//     data.unit = typeof(obj.unit);
//     data.price = typeof(obj.price);
//     console.log(data);
//     return data;
// }
//
// function correctType(typeArrData) {
//     typeArrData.forEach(function (elementObj) {
//         elementObj = format(elementObj);
//         if (elementObj.barcode != 'string') {
//             elementObj.barcode = String(elementObj.barcode);
//         }
//         if (elementObj.name != "string") {
//             elementObj.name = String(elementObj.name);
//         }
//         if (elementObj.unit != "string") {
//             elementObj.unit = String(elementObj.unit);
//         }
//         if (elementObj.price != "number") {
//             // elementObj.price = Number('elementObj.price');
//             elementObj.price = (elementObj.price).valueOf();
//             // elementObj.price = parseInt('elementObj.price');
//         }
//     });
//     console.log(typeArrData);
// }

function insertData(req, res) {
    var jsonData = fs.readFileSync("./data.json");
    data = JSON.parse(jsonData);
    var errobj = errSolve(req.body);
    // correctType(errobj.input);
    addObject(data, errobj.input);
    addId(data);
    fs.writeFile("./data.json", JSON.stringify(data), function (err) {
        if (err) {
            res.send("ERROR:" + err);
        }
        else if (errobj.err) {
            res.status(400).send(data);
        }
        else {
            res.status(200).send(data);
        }
    });
}

function deleteData(req, res) {
    var Data = JSON.parse(fs.readFileSync('./data.json'));
    for (var i = 0; i < Data.length; i++) {
        if (Data[i].id === parseInt(req.params.id)) {
            Data.splice(i, 1);
            fs.writeFileSync("./data.json", JSON.stringify(Data));
            res.status(200).send("删除成功!");
        }
    }
    if (i === Data.length) {
        res.status(400).end();
    }
}

function findOne(req, res) {
    var Data = JSON.parse(fs.readFileSync('data.json'));
    for (var i in Data) {
        if (parseInt(req.params.id) === Data[i].id) {
            res.send(Data[i]);
            return;
        }

    }
    // Data.forEach(function (elementObj) {
    //     if (elementObj.id === parseInt(req.params.id)) {
    //         res.send(elementObj);
    //     }
    // });
    res.status(404).end();
}

function findAll(req, res) {
    var Data = JSON.parse(fs.readFileSync("./data.json"));
    res.send(Data);
}

function putError(input) {
    var inputObj = {};
    if (input.barcode && input.name && input.unit && input.price) {
        var obj = {};
        obj.barcode = String(input.barcode);
        obj.name = String(input.name);
        obj.unit = String(input.unit);
        obj.price = Number(input.price);
        inputObj.obj = obj;
    }
    if (!inputObj.obj) {
        inputObj.err = " sorry,你输入的属性不足或者数据类型不正确!";
    }
    return inputObj;

}

function correctPutType(inputObj) {
    if (typeof(inputObj.barcode) != "string") {
        inputObj.barcode = String(inputObj.barcode);
    }
    if (typeof(inputObj.name) != "string") {
        inputObj.name = String(inputObj.name);
    }
    if (typeof(inputObj.unit) != "string") {
        inputObj.unit = String(inputObj.unit);
    }
    if (typeof(inputObj).price != "number") {
        inputObj.price = Number(inputObj.price);
    }
    return inputObj;
}


function updateData(req, res) {
    var Data = JSON.parse(fs.readFileSync("./data.json"));
    var inputObj = putError(req.body);
    // inputObj.obj = correctPutType(inputObj.obj);
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
            res.status(404).end();
        }
    }
    else {
        res.status(401).send(inputObj.err);
    }
}


exports.addId = addId;
exports.insertData = insertData;
exports.deleteData = deleteData;
exports.findOne = findOne;
exports.findAll = findAll;
exports.updateData = updateData;
