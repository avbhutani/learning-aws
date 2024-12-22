const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid'); 

// Create a new brand with the credentials provided over the frontend 

// all of these fields are weakly typed and can accept anything, so anything, 
// if it is being received from the frontend, then it needds to be sured, that
// all the data is typed checked before receiving it in the frontend.
async function createNewBrand(req,res) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {brandName,email,brandWebsite,socialMediaAccounts} = req.body
    const brand = {
        email: email,
        brandName:brandName || null,
        brandWebsite: brandWebsite || null,
        socialMediaAccounts:socialMediaAccounts || []
    }
    const params = {
        TableName:'brands',
        Item: {
            'id':uuidv4(),
            ...brand
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