const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function getCreatorsOfDuel(req,res) {
    const duelId = req.params.duelId 
    try {
        const params = {
            TableName: 'duel-creator',
            KeyConditionExpression: 'duelId = :duelId',
            ExpressionAttributeValues: {
              ':duelId': duelId,  
            },
        };
        const data = await dynamoDB.query(params).promise()
        if(data.Items.length > 0)
        {    return res.status(200).send(
                {
                    success:'true',
                    message:'Creators Fetched Successfully!',
                    data: data.Items
                }
            )
        }
        else if(data.Items.length === 0) {
            return res.status(400).send(
                {
                    success:'false',
                    message:'No Creators in the duel'
                }
            )
        }
    }
    catch(error) {
        return res.status(500).send(
            {
                success:'false',
                message:'Not able to fetch the creators for the duel.',
                error
            }
        )
    }
}


module.exports = getCreatorsOfDuel