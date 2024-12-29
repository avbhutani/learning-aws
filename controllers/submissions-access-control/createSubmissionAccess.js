// Lambda function - To create the submission Access for the user that has paid for that particular content.

const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function createSubmissionAccess(req,res) {
    const submissionId = req.params.submissionId 
    const accessId = req.body.accessId // extract from JWT 

    try {
        const params = {
            TableName:'submissions-access',
            Item: {
                'submissionId':submissionId,
                accessId
            }
        }

        await dynamoDB.put(params).promise()
        res.status(200).send(
            {
                success:'true',
                message:'New Submission Access Created Successfully!'
            }
        )
    }
    catch(error) {
        res.status(500).send(
            {
                success:'false',
                message:'Error Creating New Submission Access',
                error
            }
        )
    }
}

module.exports = createSubmissionAccess