// Trigger for Duel Creator Table Updation 

// user can only be called as register only if he/she uploads the file, 
// and then only the function like this shall be triggered.

async function createDuelCreator(req,res) {
    const AWS = require('aws-sdk')
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const {duelId,creatorId} = req.body
    try {
        const params = {
            TableName:'duel-creator',
            Item: 
            {
                'duelId':duelId,
                creatorId
            },
            ConditionExpression:'attribute_not_exists(duelId) AND attribute_not_exists(creatorId)'
        }
        await dynamoDB.put(params).promise()
        res.status(200).send(
            {
                success:'true',
                message:'Duel Creator Table Updated Successfully!'
            }
        )
    }
    catch(error) {
        res.status(500).send(
            {
                success:'false',
                message:'Not Able to Update Creator Duel Table!'
            }
        )
    } 
}


module.exports = createDuelCreator