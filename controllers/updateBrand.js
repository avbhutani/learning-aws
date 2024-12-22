const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); 

async function updateBrand(req, res) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const brandID = req.params.id; // The brandID to update
    const { brandName, brandWebsite, socialMediaAccounts } = req.body;

    const params = {
        TableName: 'brands',
        Key: { brandID }, // Specify the key (partition key) for the item
        UpdateExpression: 'SET brandName = :brandName, brandWebsite = :brandWebsite, socialMediaAccounts = :socialMediaAccounts',
        ExpressionAttributeValues: {
            ':brandName': brandName,
            ':brandWebsite': brandWebsite,
            ':socialMediaAccounts': socialMediaAccounts,
        },
        ReturnValues: 'UPDATED_NEW', // Returns the updated attributes
    };

    try {
        const result = await dynamoDB.update(params).promise();
        console.log('Updated successfully:', result);

        res.status(200).send({
            success: 'true',
            message: 'Updated Brand Successfully!',
            updatedAttributes: result.Attributes,
        });
    } catch (error) {
        console.error('Update failed:', error);

        res.status(500).send({
            success: 'false',
            message: 'Could Not Update the Brand Information!',
            error: error.message,
        });
    }
}

module.exports = updateBrand;
