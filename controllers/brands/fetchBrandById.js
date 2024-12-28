const AWS = require('aws-sdk')

async function fetchBrandById(req,res) {
    const brandId = req.params.brandId
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: 'brands',   // Replace with your table name
            Key: {
              'brandId':  brandId      
            }
          };
          const brand = dynamoDB.get(params, function (error, data) {
            if (error || !data.Item) {
                res.status(500).send(
                    {
                        success:'false',
                        error:error,
                        message:'Error Fetching the Brand By ID'
                    }
                )
            } else {
                res.status(200).send(
                    {
                        success:'true',
                        message:'Brand Fetched Successfully by ID',
                        brand:data.Item
                    }
                )
            }
          });

    } catch (error) {
        res.status(500).send(
            {
                success:'false',
                message:'Error Fetching the brand by ID',
                error
            }
        )
    }
}

module.exports = fetchBrandById