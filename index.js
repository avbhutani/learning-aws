const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fetchBrandById = require('./controllers/fetchBrandById')
const createNewBrand = require('./controllers/createNewBrand')
const deleteBrand = require('./controllers/deleteBrand')
const updateBrand = require('./controllers/updateBrand')
const checkForID = require('./middlewares/checkForID')
const checkEmail = require('./middlewares/checkEmail')
const createNewCreator = require('./controllers/createNewCreator')
const creatorQueryByEmail = require('./controllers/creatorQueryByEmail')

require('dotenv').config()
require('./config')
app.use(cors())
app.use(bodyParser.json())

// ? question mark denotes 0 can also be the occurence number for that particular brandID,
// that is the brandID can be empty!
// create a new brand.
app.post('/brands',createNewBrand)


app.get('/brands/:id?',checkForID,fetchBrandById)
app.put('/brands/:id?',checkForID,updateBrand)
app.delete('/brands/:id?',checkForID,deleteBrand)

app.post('/creators',checkEmail,createNewCreator)
app.post('/creators/search',creatorQueryByEmail)
app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening at ${process.env.PORT || 4000}`)
})