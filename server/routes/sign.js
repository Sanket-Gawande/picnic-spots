const express = require("express");
const app = express();
const router = express.Router();
const mysqli = require("../database/connection");
const user_id_generator = require("../utils/id_generator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router
  .post("/login", (req, res) => {
    const { email, password_string } = req.body;
    if (!email || !password_string) {
      res.status(400).json({ status: "error", msg: "All fields are required" });
      return;
    }
    mysqli.query(
      `select user_token , password from userdata where email = '${email}'`,
      (error, result) => {
        if (error) {
          res.json({ status: "error", message: error.code });
        } else {
          if (result.length == 0) {
            res.json({
              status: "error",
              message:
                "Your email is not registered with us , invalid credential ",
            });
          } else {
            const { password, userid } = result[0];
            const validate_password = bcryptjs.compareSync(
              password_string,
              password
            );

            if (!validate_password) {
              res.json({
                status: "error",
                message: "You have entered wrong password",
              });
              return;
            }

            if (validate_password) {
              res.json({
                user_token: result[0].user_token,
                status: "success",
                msg: "logged in",
              });
            }
          }
        }
      }
    );
  })

  .post("/signup", function (req, res) {
    const { password, c_password, name, email, phone } = req.body;
    console.log(req.body);
    if (!email || !name || !phone || !password) {
      res.status(400).json({ status: "error", msg: "All fields are required" });
      return;
    }
    if (password === c_password) {
      const { name, email, password, phone } = req.body;
      const password_hash = bcryptjs.hashSync(password, 10);
      
      // user_id_generator is utility function generates and return a random "-" seperated  string
      const key = user_id_generator();
      const user_token = jwt.sign({ _id: key }, process.env.JWT_SECRET);
      mysqli.query(
        `insert into userdata (name , email , password , phone, user_token , userid) values('${name}' , '${email}' , '${password_hash}' , '${phone}' , '${user_token}', '${key}')`,
        (err, result) => {
          if (err) {
            res.json({
              status: "error",
              msg: "Email already exists , please login",
              err,
            });
          } else {
            res.json({
              status: "success",
              msg: "Your account has been created successfully",
              user_token,
            });
          }
        }
      );
    } else {
      res.json({ status: "error", msg: "Password do not matches" });
    }
  })

  .post("/session/user", (req, res) => {
    const { userid } = req.body;
    console.log(session);
  });
module.exports = router;
