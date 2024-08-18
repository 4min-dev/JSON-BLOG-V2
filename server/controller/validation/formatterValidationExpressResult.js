const { validationResult } = require("express-validator")

function formatterValidationExpressResult(req,res) {
    const userDataValidationResult = validationResult.withDefaults({
        formatter:(error) => {
            return {
                message:error.msg
            }
        }
    })(req).array()

    if(userDataValidationResult.length > 0) {
        return res.status(400).json({message:userDataValidationResult})
    } else {
        return false
    }
}


module.exports = formatterValidationExpressResult