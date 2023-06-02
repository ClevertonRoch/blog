const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')

// eslint-disable-next-line no-unused-vars
// const User = require('./models/UserModels')
// eslint-disable-next-line no-unused-vars
// const Product = require('./models/ProductModels')



app.set('view engine', 'ejs')





app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', routes)





app.listen(8080, ()=>{console.log('Server ok')})