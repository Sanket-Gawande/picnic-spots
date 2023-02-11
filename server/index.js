const express = require('express')
const multer = require('multer')
const app = express()
var session = require("express-session");
require('dotenv').config()

const addplaces = require('./routes/addplaces')
const path = require("path")
const signupinapi = require('./routes/sign')
const passwordChange = require('./routes/password');
const user = require('./routes/user')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api' , signupinapi)

// api routes
app.use("/api" , passwordChange);
app.use('/api', addplaces)
app.use('/api' ,user)

// static files serving
app.use(express.static( path.join(__dirname,"static")))
app.use(express.static( path.join(__dirname,"routes/static/files")))

// express session
app.use(
    session({
      secret: "evji01ifzkt-589s9dp0vj-mkys5rtdz79-t3zfnj5z4ws",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );



app.listen(process.env.PORT || 6900 , 'localhost' , err => {
    if(!err) console.log("server is running : 6900")
} )
