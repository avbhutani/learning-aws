// Function to create the winner for the particular duel

const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function createDuelWinner(req,res) 
{
    const duelId = req.params.duelId
    const creatorId = req.body.creatorId

    try {
        const params = {
            TableName:'duel-winners',
            Item: {
                'duelId':duelId,
                creatorId
            },
            ConditionExpression:'attribute_not_exists(duelId) AND attribute_not_exists(creatorId)'
        }
        await dynamoDB.put(params).promise()
        return res.status(200).send(
            {
                success:'true',
                message:'Winner for the Duel Created Successfully!'
            }
        )
    }
    catch(error) {
        return res.status(500).send(
            {
                success:'false',
                message:'Error Creating New Winner for the Duel',
                error
            }
        )
    }
}

module.exports = createDuelWinner