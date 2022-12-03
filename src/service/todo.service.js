const { TodoModel } = require("../model");
const Cruds = require("./Cruds");

class TodoService extends Cruds{
    
}

module.exports = new TodoService(TodoModel.Model, TodoModel.Schema)