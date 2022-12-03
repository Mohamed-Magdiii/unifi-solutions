const { CONSTANTS } = require("../common");
const {todoService} = require('../service')
const addTodo = async ()=>{
        for (let index = 0; index < CONSTANTS.TODOS.length; index++) {
          const todo = CONSTANTS.TODOS[index];
          const checkTodo = await todoService.findOne({ todo: todo.todo });
          if (!checkTodo) {
            await todoService.create(todoService);
          }
        } 
}