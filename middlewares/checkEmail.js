const zod = require('zod')

async function checkEmail(req,res,next) {
    
    const emailSchema = zod.string().email()
    const {email} = req.body
    if(!email) {
        return res.status(400).send(
            {
                success:'false',
                message:'Please Provide Email!'
            }
        )
    }
    try {
        emailSchema.parse(email)
        next()
    } catch (error) {
        return res.status(400).send(
            {
                success:'false',
                message:'Invalid Email!',
                error
            }
        )
    }
}

module.exports = checkEmail