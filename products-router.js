var express = require('express');
var bodyParser = require('body-parser');
var productsManager = require('./products-manager');
var router = express.Router();
router.use(bodyParser.json());

router.post('/', function (req, res, next) {
    var data = productsManager.insertData(req.body, next);
    if (data) {
        res.status(200).send(data[data.length - 1]);
    }
    else {
        res.status(400).end();
    }
});

router.delete('/:id', function (req, res, next) {
    var remove = productsManager.deleteData(req.params.id, next);
    if (remove) {
        res.status(204).end();
    }
    else {
        res.status(404).end();
    }
});

router.get('/:id', function (req, res) {
    var item = productsManager.findOne(req.params.id);
    if (item) {
        res.status(200).send(item);
    }
    else {
        res.status(404).end();
    }
});

router.get('/', function (req, res) {
    var datas = productsManager.findAll();
    res.send(datas);
});

router.put('/:id', function (req, res, next) {
    var item = productsManager.updateData(res,req.params.id, req.body, next);
    if (item) {
        res.status(200).send(item);
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;