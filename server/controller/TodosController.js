const TodoModel = require("../models/TodoModel")
const UserModel = require("../models/UserModel")
const getPagination = require("../utils/getPagination")
const getSortQuery = require("../utils/getSortQuery")
const formatterValidationExpressResult = require("./validation/formatterValidationExpressResult")

class TodosController {
    async getUserTodos(req,res) {
        try {
            const { userId } = req.params
            const searchQuery = req.query.query || ''
            const page = req.query.page || 1
            const sortQuery = req.query.sort || 'id:1'
            const limitQuery = parseInt(req.query.limit) || 20

            const sort = await getSortQuery(sortQuery)
            const pagesToSkip = await getPagination({currPage:page, limitQuery})

            const user = await UserModel.findById(userId)

            const userTodos = await TodoModel.aggregate([
                {
                    $match:{userId:user._id, title:{$regex:searchQuery, $options:'i'}}
                },
                {
                    $skip:pagesToSkip
                },
                {
                    $limit:limitQuery
                },
                {
                    $sort:sort
                }
            ])
            const xtotalCount = await TodoModel.find({userId:user._id}).countDocuments()

            return res.setHeader("x-total-count",xtotalCount).status(200).json({data:userTodos, headers:res.getHeaders()})

        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async addNewTodo(req,res) {
        try {
            const validationResult = await formatterValidationExpressResult(req,res)

            if(!validationResult) {
                const { userId, id, title, completed } = req.body

                const newTodo = await TodoModel.create({userId, id, title, completed})

                return res.status(200).json(newTodo)
            }
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }

    async completeTodo(req,res) {
        try {
            const { todoId } = req.params
            const completedTodo = await TodoModel.findOneAndUpdate({id:parseInt(todoId)}, {$set:{completed:true}})
            

            return res.status(200).json(completedTodo)
        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
}

module.exports = new TodosController()