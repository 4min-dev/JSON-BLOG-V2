const { Router } = require("express");
const TodosController = require("../controller/TodosController");
const TodosMiddleware = require("../middleware/TodosMiddleware");

const todosRouter = new Router()

todosRouter.get(`/getUserTodos/:userId`, TodosController.getUserTodos)
todosRouter.post('/addNewTodo', TodosMiddleware.addNewTodoMiddleware(), TodosController.addNewTodo)
todosRouter.put(`/completeTodo/:todoId`, TodosController.completeTodo)

module.exports = todosRouter