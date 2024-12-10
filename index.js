const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fetchBrandById = require('./controllers/fetchBrandById')
const createNewBrand = require('./controllers/createNewBrand')
require('dotenv').config()
require('./config')
app.use(cors())
app.use(bodyParser.json())



app.get('/brands/:brandID',fetchBrandById)
app.post('/brands',createNewBrand)

app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening at ${process.env.PORT || 4000}`)
})