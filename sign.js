const { urlencoded } = require('express')
const express = require('express')
const { UCS2_GENERAL_MYSQL500_CI } = require('mysql/lib/protocol/constants/charsets')
const app = express()
const router = express.Router()


const mysql = require('mysql')
const mysqli = mysql.createConnection({
    host : "localhost",
    user : "root" ,
    password : '',
    database : 'places-app'
})
mysqli.connect(err => {
    if(err) console.log(err)
    else console.log("Connected to sql server")
})

router
    .post('/login' , (req , res) => {
    console.log(req.body)
    res.status(200).send(req.body)
    })

    .post('/signup' , (req, res) => {
       const {password , c_password} = req.body
           if(password == c_password){
           const {name , email  , password , phone } = req.body
           let key = '';
            key+= Math.random().toString(36).substring(2)
            key+= "-"+Math.random().toString(36).substring(2)
            key+= "-"+Math.random().toString(36).substring(2)
           mysqli.query(`insert into userdatas (name , email , password , phone , pass_key) values('${name}' , '${email}' , '${password}' , '${phone}' , '${key}')` , (err , res)=> {
              if(err) console.log(err.sqlMessage)
             else
             {
                 console.log(res)
                }

           })
           res.sendStatus(200).send(req.body)
        }
        else{
            res.status(400).send({
                status : "error",
                massage : "Password do not matches"
            })}
            console.table({
                status : "error",
                massage : "Password do not matches"
            })
        })


module.exports = router