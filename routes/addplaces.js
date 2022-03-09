const express = require('express')
const router = express.Router()
const mysqli = require("../database/connection")

router
    .post('/addplace' , (req ,res) => {
        console.log('api for adding places is running')
        console.log(req.body)
        res.send(req.body)
    })

    .get('/addplace' , (req ,res) => {
        console.log('api for adding places is running')

    })

    module.exports = router