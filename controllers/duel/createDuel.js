const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid'); 
async function duelCreation(body,expiryTime) {
    // fetch the brandId from the JWT
    const brandId = body.brandId // basically for the brand that created it
    // Also a GSI
    
    const duel = {
        brandId,
        prizeAmount: body.prizeAmount || 0,
        currentSubmissions: 0,
        submissionLimit: body.submissionLimit || 25,
        nicheCategories: body.nicheCategories && body.nicheCategories.length > 0 ? body.nicheCategories : undefined,
        videoDuration: body.videoDuration || 30,
        contentType: body.contentType || 'organic',
        contentScript: body.contentScript && body.contentScript.length > 0 ? body.contentScript : undefined,
        contentBrief: body.contentBrief && body.contentBrief.length > 0 ?  body.contentBrief : undefined,
        contentExamples: body.contentExamples && body.contentExamples.length > 0 ? body.contentExamples : undefined, // Images
        usefulAssets: body.usefulAssets && body.usefulAssets.length > 0 ? body.usefulAssets : undefined, // Images
        currentStatus: 'active',  // can be only ['active','inactive']
        endTime: expiryTime, // 
        currentWinners: 0
      };
      
      // Remove undefined fields to avoid storing empty attributes in DynamoDB
    for (const key in duel) {
        if (duel[key] === undefined) {
            delete duel[key];
        }
    }
    return duel
}

async function createDuel(req,res) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const expiryTime = currentTime + 30 * 24 * 60 * 60; // Add 30 days
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    // fetch the user id from the JWT token and then store it in the variable
    /* // do it here.
     The creator ID basically says the creator that is creating the particular duel.
    //     */ 
    //    const creatorID = req.body.creatorID // fetch it from JWT
   
   

    try {
        const duel = await duelCreation(req.body,expiryTime)
        const params = {
            TableName:'duels',
            Item: {
                'duelId':uuidv4(),
                ...duel
            }
        }
        await dynamoDB.put(params).promise()
        res.status(200).send(
            {
                success:'true',
                message:'Created Duel Successfully!'
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success:'false',
                message:'Failed to Create Duel!',
                error
            }
        )
    }
}

module.exports = createDuel