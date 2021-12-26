const express = require('express')
const app = express()
const session = require('express-session')
const router = express.Router()


app.use(session({
    secret: 'this is something secure key for setting secure sesssion',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

require('./connection');

router
    .post('/login', (req, res) => {
        console.log(req.body)
        sess = req.session
        res.status(200).send(req.body)
    })

    .get('/login', (req, res) => {
        sess = req.session
        sess.userdata = { name: 'sanket', age: "sanket" }
        console.log(sess.userdata)
        res.send(sess.userdata)
    })

    .get('/isloggedin', (req, res) => {
        sess = req.session
        sess.userdata.isloggedin = true;
        console.log(sess.userdata)
        res.send(sess.userdata)
    })

    .post('/signup', function (req, res) {
        const { password, c_password } = req.body
        if (password == c_password) {
            const { name, email, password, phone } = req.body
            let key = '';
            key += Math.random().toString(36).substring(2)
            key += "-" + Math.random().toString(36).substring(2)
            key += "-" + Math.random().toString(36).substring(2)
            mysqli.query(`insert into userdatas (name , email , password , phone , pass_key) values('${name}' , '${email}' , '${password}' , '${phone}' , '${key}')`, (err, result) => {
                if (err) {
                    const response = { status: 'error', msg: 'Email already exists , please login' }
                    res.send(response)
                    console.log("email exists")
                }
                else {
                    const response = { status: 'success', msg: 'Your account has been created successfully' }
                    res.send(response)
                    console.log("account created")
                }

            })
        }
        else {
            const data = { status: "error", msg: "Password do not matches" }
            console.log(data)
            res.send(data)
        }
    })

module.exports = router