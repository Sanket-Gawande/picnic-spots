const express = require('express')
const session = require('express-session')
const multer = require('multer')
const app = express()
require('dotenv').config()
// importing add places end point api
const addplaces = require('./addplaces')
const signupinapi = require('./sign')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api' , signupinapi)
// route for adding place
app.use('/api', addplaces)

// session session middle ware
app.use(session({
    secret : "this is something secret ",
    resave : false,
    saveUninitialized: false,
}))

/* ---------------------------------------------------*/

// setting multer middle ware for file uploading profile picture
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'userProfiles')
    },
    filename : (req , file , cb) => {
        cb(null , Math.random().toString(36).substring(2) + "_" + file.originalname)
    }
})
const profilemw = multer({
    storage : storage
})

/* ------------------------------------------------*/


app.get('/login', (req, res) => {
   const sess = req.session
    sess.userdata = { name: 'sanket', age: 88 }
    console.log(sess.userdata)
    res.send(sess.userdata)
})

app.post('/senddata', profilemw.single('file')  , (req, res) => {
   const sess = req.session
    if(!sess.userdata){
        console.log('you are not logged in')
    }
    res.send({1 : req.body , 2 : req.file})
})

app.get('/isloggedin', (req, res) => {
   const sess = req.session
    sess.userdata.isloggedin = true;
    console.log(sess.userdata)
    res.send(sess.userdata)
})

app.listen(process.env.PORT || 6900 , 'localhost' , err => {
    if(!err) console.log("server is running : 6900")
} )

const bcryptjs = require('bcryptjs')
const str = "this is my password";
const hash = bcryptjs.hashSync(str , 10)
console.log(hash)
const result = bcryptjs.compareSync(str , hash)
console.log(result)