async function brandQueryByEmail(req,res) 
{
    try {
        const { email } = req.body;
        const AWS = require('aws-sdk');
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        
        const params = {
            TableName: 'brands',
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
        console.log('Query results:', data.Items);
        if(data.Items.length > 0)
            return res.status(200).send(data.Items);
        else 
            return res.status(400).send(
        {
            success:'false',
            message:'Brand with this Email does not exist!'
        }
        )
    }
    catch(error) {
        res.status(500).send(
            {
                success:'false',
                message:'Not able to query the DB!',
                error
            }
        )
    }
}

module.exports = brandQueryByEmail