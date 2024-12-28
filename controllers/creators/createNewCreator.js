const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

async function createNewCreator(req, res) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const reqBody = req.body;
    
    if (!reqBody.creatorEmail) {
        return res.status(400).send({
            success: 'false',
            message: 'creatorEmail is required',
        });
    }

    try {
        const creator = {
            creatorId:uuidv4(),
            creatorEmail: reqBody.creatorEmail,
            creatorImage: reqBody.creatorImage || null,
            creatorName: reqBody.creatorName || null,
            totalSubmissions: 0,
            totalPrize: 0,
            totalParticipatedDuels: 0,
            paymentLink: null,
        };

        const params = {
            TableName: 'creators',
            Item: {
                creatorEmail:reqBody.creatorEmail,
                ...creator,
            },
            ConditionExpression: 'attribute_not_exists(creatorEmail)'
        }
        const savedCreator = await dynamoDB.put(params).promise()
        res.status(200).send({
            success: 'true',
            message: 'Created Creator Successfully!',
            creator:savedCreator
        });
    } catch (error) {
        res.status(500).send({
            success: 'false',
            message: 'Creator Creation Failed!',
            error: error.message || error,
        });
    }
}

module.exports = createNewCreator;
