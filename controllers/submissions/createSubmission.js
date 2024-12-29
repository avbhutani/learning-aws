const AWS = require('aws-sdk')
AWS.config.update({region:'us-east-1'}); 
const { v4: uuidv4 } = require('uuid'); 
const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function createSubmission(req,res) {
    const date = new Date()
    const duelId = req.params.duelId
    const {creatorId,paymentLink,review} = req.body // creatorId from JWT

    // Time the submission is created!
    const createdAt = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const newSubmission = {
        creatorId,
        duelId,
        paymentLink,
        review,
        createdAt
    }

    try {
        const params = {
            TableName:'submissions',
            Item: {
                'submissionId': uuidv4(),
                ...newSubmission
            },
            ConditionExpression:'attribute_not_exists(submissionId)'
        }
        await dynamoDB.put(params).promise()
        res.status(200).send(
            {
                success:'true',
                message:'Successfully Created New Submission'
            }
        )
    }
    catch(error) {
        res.status(500).send(
           {
                success:'false',
                message:'Failed to create submission',
                error
           } 
        )
    }
}


module.exports = createSubmission