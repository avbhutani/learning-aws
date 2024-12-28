// Fetch the duel by IDs

async function fetchDuelById(req,res) {
    const AWS = require('aws-sdk')
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const id = req.params.id 

    try {
        const params = {
            TableName: 'duels',   // Replace with your table name
            Key: {
              'id':  id      
            }
        };
        const fetchedDuel = await dynamoDB.get(params).promise()
        console.log(fetchedDuel)
        res.status(200).send(
            {
                success:'true',
                message:'Duel Details Fetched Successfully!',
                fetchedDuel
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success:'false',
                message:'Not Able to Fetch Duel!',
                error
            }
        )
    }
}


module.exports = fetchDuelById