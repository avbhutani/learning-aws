async function creatorQueryByEmail(req, res) {
    const { email } = req.body;
    const AWS = require('aws-sdk');
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
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
    
    try {
        const data = await dynamoDB.query(params).promise();  // Using async/await for cleaner code
        console.log('Query results:', data.Items);
        if(data.Items.length > 0)
            return res.status(200).send(data.Items);
        else 
            return res.status(400).send(
        {
            success:'false',
            message:'Creator with this Email does not exist!'
        }
        )
    } catch (err) {
        console.error('Error querying DynamoDB', err);
        res.status(500).send(err);
    }
}

module.exports = creatorQueryByEmail;
