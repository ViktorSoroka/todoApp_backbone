var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todoModel = require('../models/todo-model');
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
    console.log("Connected!");
    //var newTodos = new todoModel({status: 'complete', description: 'aaaaaaaaaa'});
    //newTodos.save();
});

//mongoose.connect('mongodb://localhost:27017');
mongoose.connect('mongodb://todo_user:qwerty@ds027698.mongolab.com:27698/todos');
//* GET todos listing. */
router.route('/')
    .get(function (req, res, next) {
        var query = todoModel.find()
            .count(function (err, count) {

                query.skip(req.query.perPage * (req.query.offset - 1))
                    .limit(req.query.perPage)
                    .exec('find', function (err, matched_todos) {
                        if (!err) {
                            res.json({
                                collection: matched_todos,
                                total: count,
                                offset: +req.query.offset
                            });
                        } else {
                            res.statusCode = 500;
                            console.error('Internal error(%d): %s', res.statusCode, err.message);
                            res.send({error: 'Server error'});
                        }
                    });
            })
    })
    .post(function (req, res, next) {
        var todo = new todoModel(req.body);

        todo.save(function (err, todo) {
            if (err) {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }
            res.json(todo);
        });
    });

router.route('/:id')
    .get(function (req, res, next) {
        todoModel.findById(req.params.id, function (err, todo) {
            if (err) {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }

            res.json(todo);
        });
    })
    .delete(function (req, res, next) {
        todoModel.findById(req.params.id, function (err, todo) {
            if (!todo) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            todo.remove(function (err, todo) {
                if (!err) {
                    res.json(todo);
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
        todoModel.findById(req.params.id, function (err, todo) {
            if (err) {
                res.statusCode = 500;
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                res.send({error: 'Server error'});
            }
            todo.set(req.body);

            // save the user
            todo.save(function (err, edited_todo) {
                if (err) {
                    res.statusCode = 500;
                    console.error('Internal error(%d): %s', res.statusCode, err.message);
                    res.send({error: 'Server error'});
                }
                res.json(edited_todo);
            });
        });
    });

router.route('/page/:page')
    .get(function (req, res, next) {
        var query = todoModel.find()
            .count(function (err, count) {

                query.skip(req.query.perPage * (req.params.page - 1))
                    .limit(req.query.perPage)
                    .exec('find', function (err, matched_todos) {
                        if (!err) {
                            res.json({
                                collection: matched_todos,
                                total: count,
                                offset: +req.params.page
                            });
                        } else {
                            res.statusCode = 500;
                            console.error('Internal error(%d): %s', res.statusCode, err.message);
                            res.send({error: 'Server error'});
                        }
                    });
            })
    });


module.exports = router;