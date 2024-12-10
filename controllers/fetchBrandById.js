const AWS = require('aws-sdk')

async function fetchBrandById(req,res) {
    const brandID = req.params.brandID
    console.log(brandID)
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: 'brands',   // Replace with your table name
            Key: {
              'brandID':  brandID      
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
        
    }
}

module.exports = fetchBrandById