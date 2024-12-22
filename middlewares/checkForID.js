async function checkForID(req,res,next) {
    const id = req.params.id 
    if(!id) {
        return res.status(400).send(
            {
                success:'false',
                message:'Not a valid ID'
            }
        )
    }
    else next()
}

module.exports = checkForID