var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../Models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err) return next(err);

    res.json(users)
  });
});

/* GET SINGLE User BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* SAVE User */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* UPDATE User */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* DELETE User */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;
