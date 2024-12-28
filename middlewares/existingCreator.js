async function existingCreator(req,res,next) 
{
    const { creatorEmail } = req.body;
    const AWS = require('aws-sdk');
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    try {
        const params = {
            TableName: 'creators',
            IndexName: 'creatorEmail-index',  // Updated GSI name
            KeyConditionExpression: '#creatorEmail = :creatorEmail',  // Updated key condition
            ExpressionAttributeNames: {
                '#creatorEmail': 'creatorEmail'  // Updated GSI partition key
            },
            ExpressionAttributeValues: {
                ':creatorEmail': creatorEmail  // Updated value placeholder
            }
            // The projection can also be specified for restricted access.
        };
        const data = await dynamoDB.query(params).promise();  // Using async/await for cleaner code
        console.log(data.Items)
        if(data.Items.length > 0)
        {    
            return res.status(400).send(
                {
                    success:'false',
                    message:'You are already a creator!'
                }
            )
        }
        else next()
    } catch (error) {
        res.status(500).send(
            {
                success:'false',
                message:'Server Error!',
                error
            }
        )
    }
}

module.exports = existingCreator