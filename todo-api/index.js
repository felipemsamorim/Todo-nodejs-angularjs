const express = require('express')
const json = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv-safe').config({allowEmptyValues:true})
app.use(json())
app.use(cors())
const config = process.env
require('./database/sequelize')
require('./routes')(app)
app.listen(config.PORT,() => console.log('ok'))