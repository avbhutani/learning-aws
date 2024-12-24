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

require('dotenv').config()
require('./config')
app.use(cors())
app.use(bodyParser.json())

// ? question mark denotes 0 can also be the occurence number for that particular brandID,
// that is the brandID can be empty!
// create a new brand.

// brands routes
app.post('/brands',createNewBrand)
app.get('/brands/:id?',checkForID,fetchBrandById)
app.put('/brands/:id?',checkForID,updateBrand)
app.delete('/brands/:id?',checkForID,deleteBrand)
app.post('/brands/search',brandQueryByEmail)

// creator routes
app.post('/creators',checkEmail,existingCreator,createNewCreator)
app.post('/creators/search',creatorQueryByEmail)


// duel routes
app.post('/duel',createDuel)

app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening at ${process.env.PORT || 4000}`)
})