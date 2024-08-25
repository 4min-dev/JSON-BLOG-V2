const { Router } = require("express");
const TodosController = require("../controller/TodosController");

const todosRouter = new Router()

todosRouter.get(`/getUserTodos/:userId`, TodosController.getUserTodos)

module.exports = todosRouter