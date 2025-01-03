const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function checkSubmissionAccess(req,res) {
    const submissionId = req.params.submissionId
    const accessId = req.body.accessId // can be extracted from JWT
    try {
        const params = {
            TableName:'submissions-access',
            Key: {
                'submissionId':submissionId,
                accessId
            }
        }
        const accessStats =  await dynamoDB.get(params).promise()
        if(accessStats.Item){
            res.status(200).send(
            {
                success:'true',
                message:'Access Granted!',
                accessStats
            }
        )
        }
        else {
            res.status(403).send(
                {
                    success:'false',
                    message:'Access Denied!'
                }
            )
        }
        
    }
    catch(error) {
        res.status(500).send(
            {
                success:'false',
                message:'Not able to Check for Authorization!',
                error
            }
        )
    }
}

module.exports = checkSubmissionAccess