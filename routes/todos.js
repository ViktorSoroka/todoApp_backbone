var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/todo-model');
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
    console.log("Connected!");
    //var newUser = new userModel({status: 'complete', description: 'aaaaaaaaaa'});
    //newUser.save();
});

//mongoose.connect('mongodb://localhost:27017');
mongoose.connect('mongodb://todo_user:qwerty@ds027698.mongolab.com:27698/todos');
//* GET users listing. */

router.route('/')
    .get(function (req, res, next) {
        userModel.find(function (err, matched_users) {
            if (!err) {
                res.json(matched_users);
            } else {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }
        })
    })
    .post(function (req, res, next) {
        var newUser = new userModel(req.body);

        newUser.save(function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }
            res.json(user);
        });
    });

router.route('/:id')
    .get(function (req, res, next) {
        userModel.findById(req.params.id, function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }

            res.json(user);
        });
    })
    .delete(function (req, res, next) {
        userModel.findById(req.params.id, function (err, user) {
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            user.remove(function (err, user) {
                if (!err) {
                    res.json(user);
                    console.log("article removed");
                } else {
                    res.statusCode = 500;
                    console.error('Internal error(%d): %s', res.statusCode, err.message);
                    res.send({error: 'Server error'});
                }
            });
        });
    })
    .put(function (req, res, next) {
        userModel.findById(req.params.id, function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }
            user.set(req.body);

            // save the user
            user.save(function (err, editeduser) {
                if (err) {
                    res.statusCode = 500;
                    console.error('Internal error(%d): %s', res.statusCode, err.message);
                    res.send({error: 'Server error'});
                }
                res.json(editeduser);
            });
        });
    });

module.exports = router;