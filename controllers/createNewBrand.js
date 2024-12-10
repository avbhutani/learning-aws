const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid'); 

// Create a new brand with the credentials provided over the frontend 
async function createNewBrand(req,res) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {brandName,brandWebsite,socialMediaAccounts} = req.body
    const params = {
        TableName:'brands',
        Item: {
            'brandID':uuidv4(),
            brandName,
            brandWebsite,
            socialMediaAccounts:[socialMediaAccounts]
        }
    }
    dynamoDB.put(params,(error,data)=> {
        if(!error) {
            return res.status(200).send(
                {
                    success:'true',
                    message:'Inserted Item Successfully!'
                }
            )
        }
        else {
            return res.status(500).send(
                {
                    success:'false',
                    error,
                    message:'Error Inserting Item in Database!'
                }
            )
        }
    })
}

module.exports = createNewBrand