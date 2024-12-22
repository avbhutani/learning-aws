const AWS = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid'); 

// Create a new brand with the credentials provided over the frontend 

// all of these fields are weakly typed and can accept anything, so anything, 
// if it is being received from the frontend, then it needds to be sured, that
// all the data is typed checked before receiving it in the frontend.
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

    // this method puts the data onto the database and takes in a callback that can be executed
    // once the method is executed.
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
                    message:'Error Inserting Item in Database!',
                    error
                }
            )
        }
    })
}

module.exports = createNewBrand