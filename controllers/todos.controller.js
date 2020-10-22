const errorHandler = require('../middleware/errorWrapper');
// const Todo  = require('../models/todo.model');
const todos = [
    {
        id:1,
        name:'Wake up at 9 AM'
    },
    {
        id:2,
        name: 'Drink a coffie'
    },
    {
        id:3, 
        name: 'Have breakfast'
    }
]
let biggestId = 3; //  just given from DB
 
exports.getTodos = errorHandler( (req, res) => {
    if(!todos){
        throw { status: 500, msg: 'Problems with DataBase' };
    } else {
        res.status(200).json({
            success: true,
            error: "",
            data: todos
        });
    }
});

exports.createTodo = errorHandler( async (req, res) => {
    const name = req.body.name.trim();
    if(!name){
        throw {status: 400, msg: "Todo can\'t be empty"};
    } else {
        const todo = {
            id: ++biggestId,
            name: name
        }
        todos.push(todo);
        res.status(201).json({
            success: true,
            error: "",
            data: todo
        }); 
    } 
});

exports.deleteTodo = errorHandler( (req, res) => {
    const delIndex = todos.findIndex((todo) => todo.id == req.params.id);
    if (delIndex == -1) { 
        throw { status: 404, msg: "ToDo not found." };
    } else {
        todos.splice(delIndex, 1);
        res.status(200).json({
            success: true,
            error: "",
        });
    }
});

exports.getTodo = errorHandler( (req, res) => {
    const todoIndex = todos.findIndex((item) => item.id == req.params.id);
    if(todoIndex == -1) {
        throw { status: 404, msg: "ToDo not found" };
    } else {
        const todo = todos[todoIndex];
        res.status(200).json({
            success: true,
            error: "",
            data: todo
        }); 
    }
});


exports.updateTodo = errorHandler( (req, res) => {
    const name = req.body.name.trim();
    const todoIndex = todos.findIndex((item) => item.id == req.params.id);
    if (todoIndex == -1) {
        throw { status: 404, msg: "ToDo not found" };
    } else if (!name) {
        throw { status: 400, msg: "Bad Request" };
    } else {
        todos[todoIndex].name = name
        res.status(201).json({
            success: true,
            error: "",
        });
    }
});
