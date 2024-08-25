const TodoModel = require("../models/TodoModel")
const UserModel = require("../models/UserModel")
const getSortQuery = require("../utils/getSortQuery")

class TodosController {
    async getUserTodos(req,res) {
        try {
            const { userId } = req.params
            const sortQuery = req.query.sort || 'id:1'
            const searchQuery = req.query.query || ''
            const limitQuery = parseInt(req.query.limit) || 20

            const sort = await getSortQuery(sortQuery)

            const user = await UserModel.findById(userId)

            const userTodos = await TodoModel.aggregate([
                {
                    $match: {userId:user._id, title:{$regex: searchQuery, $options:'i'}}
                },
                {
                    $sort:sort
                },
                {
                    $limit:limitQuery
                }
            ])
            const xtotalCount = await TodoModel.countDocuments()

            return res.setHeader("x-total-count",xtotalCount).status(200).json({data:userTodos, headers:res.getHeaders()})

        } catch (error) {
            return res.status(500).json({message:error})
        }
    }
}

module.exports = new TodosController()