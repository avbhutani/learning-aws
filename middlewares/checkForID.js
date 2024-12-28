async function checkForID(req,res,next) {
    const brandId = req.params.brandId 
    if(!brandId) {
        return res.status(400).send(
            {
                success:'false',
                message:'Provide a Valid ID!'
            }
        )
    }
    else next()
}

module.exports = checkForID