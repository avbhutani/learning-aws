const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function getDuelByBrand(req,res) {
    const brandId = req.body.brandId  // fetch the brandId from the JWT 

    try {
        const params = {
            TableName: 'duels', // Replace with your table name
            IndexName: 'brandId-index',  // Replace with your GSI name
            KeyConditionExpression: 'brandId = :brandId', // GSI partition key
            ExpressionAttributeValues: {
                ':brandId': brandId
            }
        };
        const result = await dynamoDB.query(params).promise()
        if(result.Items.length === 0) {
            return res.status(200).send(
                {
                    success:'true',
                    message:'No Duels Exist for the Brand!'
                }
            )
        } 
        return res.status(200).send(
            {
                success:'true',
                message:'Duels for the Brand Fetched Successfully!',
                result
            }
        )
    }
    catch(error) {
        res.status(500).send(
            {
                success:'true',
                message:'Error Getting Duels for the particular Brand',
                error
            }
        )
    }
}

module.exports = getDuelByBrand