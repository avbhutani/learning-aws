const AWS = require('aws-sdk')

async function deleteBrand(req,res) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const brandID = req.params.id 
    try {
        const params = {
            TableName:'brands',
            Key: {
                brandID
            }
        }
        await dynamoDB.delete(params).promise();
        return res.status(200).send(
            {
                success:'true',
                message:'Brand Deleted Successfully!'
            }
        )
    }
    catch(error) {
        console.log(error)
        res.status(500).send(
            {
                success:'false',
                message:'Error Deleting Brand.',
                error
            }
        )
    }
}

module.exports = deleteBrand