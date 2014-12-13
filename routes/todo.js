var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://meceap.devdb.local:27017/todo');

// model
var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});

var respondAll = function (res) {
    Todo.find(function (err, todos) {
        if (err)
            res.send(err);

        res.json(todos);
    })
};


/* GET todo page. */

router.get('/', function (req, res) {
    res.render('todo/index', {title: 'Todo'});
});

// get all todos
router.get('/api/todos', function (req, res) {
    respondAll(res);
});


// post a new todo
router.post('/api/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        respondAll(res);
    })
});

router.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);
        respondAll(res);
    })
});


module.exports = router;