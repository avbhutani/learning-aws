async function existingCreator(req,res,next) 
{
    const { email } = req.body;
    const AWS = require('aws-sdk');
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    try {
        const params = {
            TableName: 'creators',
            IndexName: 'email-index',  // The name of your GSI
            KeyConditionExpression: '#email = :email',  // Correct Key condition
            ExpressionAttributeNames: {
                '#email': 'email'  // The GSI partition key
            },
            ExpressionAttributeValues: {
                ':email': email  // Correct value placeholder
            } 
        // the projection can also be specified for restricted access.
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