const express = require('express')
const app = express()
require('dotenv').config()

const api = require('./api')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api' , api)

// connecting to sql server

app.listen(process.env.PORT || 6900 , 'localhost' , err => {
    if(!err) console.log("server is running : 6900")
} )