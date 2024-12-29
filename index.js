const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fetchBrandById = require('./controllers/brands/fetchBrandById')
const createNewBrand = require('./controllers/brands/createNewBrand')
const deleteBrand = require('./controllers/brands/deleteBrand')
const updateBrand = require('./controllers/brands/updateBrand')
const checkForID = require('./middlewares/checkForID')
const checkEmail = require('./middlewares/checkEmail')
const createNewCreator = require('./controllers/creators/createNewCreator')
const creatorQueryByEmail = require('./controllers/creators/creatorQueryByEmail')
const existingCreator = require('./middlewares/existingCreator')
const brandQueryByEmail = require('./controllers/brands/brandQueryByEmail')
const createDuel = require('./controllers/duel/createDuel')
const fetchDuelById = require('./controllers/duel/fetchDuelById')
const createBrandDuel = require('./controllers/brand-duel/createBrandDuel')
const createDuelCreator = require('./controllers/duel-creator/createDuelCreator')
const createSubmission = require('./controllers/submissions/createSubmission')
const createSubmissionAccess = require('./controllers/submissions-access-control/createSubmissionAccess')
const checkSubmissionAccess = require('./controllers/submissions-access-control/checkSubmissionAccess')
const getDuelByBrand = require('./controllers/duel/getDuelByBrand')
const createDuelWinner = require('./controllers/duel-winners/createDuelWinner')
const getCreatorsOfDuel = require('./controllers/duel/getCreatorsOfDuel')

require('dotenv').config()
require('./config')
app.use(cors())
app.use(bodyParser.json())

// ? question mark denotes 0 can also be the occurence number for that particular brandID,
// that is the brandID can be empty!
// create a new brand.

// brands routes
app.post('/brands',createNewBrand)
app.get('/brands/:brandId?',checkForID,fetchBrandById)
app.put('/brands/:brandId?',checkForID,updateBrand)
app.delete('/brands/:brandId?',checkForID,deleteBrand)
app.post('/brands/search',brandQueryByEmail)

// creator routes
app.post('/creators',existingCreator,createNewCreator)
app.post('/creators/search',creatorQueryByEmail)

// duel routes
app.post('/duels',createDuel)
app.post('/duel/creator',createDuelCreator)
app.post('/duel/:duelId/submission',createSubmission) // create a new submission for the duel
app.get('/duel/:id',fetchDuelById)
app.get('/duels/:brandId',getDuelByBrand)
app.post('/duel/:duelId/winners',createDuelWinner)
app.get('/duel/:duelId/creators',getCreatorsOfDuel) // can get the creators for the particular duel

// submission Routes
app.get('/submissions/:submissionId/access',checkSubmissionAccess)
app.post('/submissions/:submissionId/access',createSubmissionAccess)
// brand-duel updates
// app.post('/brands/duel',createBrandDuel)
// no need for this


app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening at ${process.env.PORT || 4000}`)
})