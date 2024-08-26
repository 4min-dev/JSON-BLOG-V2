const { check } = require("express-validator");

class TodosMiddleware {
    addNewTodoMiddleware() {
        return [
            check('title','Title cannot be empty').notEmpty()
        ]
    }
}

module.exports = new TodosMiddleware()