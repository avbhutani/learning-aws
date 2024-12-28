async function createBrandDuel(req,res) 
{
    // *** LAMBDA Function Trigger - Trigger brand-duel on duels table **** 

    // get the brandId as well as the duelId from the duels table.
    // as it would have the creatorId mentioned as well as the duelId mentioned.
    // just update them then in the duel-brand table.
    
    const AWS = require('aws-sdk')
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    const {brandId,duelId} = req.body

    try {
        const params = {
            TableName:'brand-duel',
            Item: {
                'brandId':brandId,
                duelId
            },
            ConditionExpression:'attribute_not_exists(duelId) AND attribute_not_exists(creatorId)'
        }
        await dynamoDB.put(params).promise()
        res.status(200).send(
            {
                success:'true',
                message:'Brand Duel Table Updated Successfully!'
            }
        )
    }
    catch(error) {
        res.status(500).send(
            {
                success:'false',
                message:'Not able to update brand-duel table'
            }
        )
    }
    
}


module.exports = createBrandDuel