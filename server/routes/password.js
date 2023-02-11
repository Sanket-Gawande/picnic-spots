const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const mysqli = require("../database/connection");
const user_id_generator = require("../utils/id_generator");
router.post("/password/change", (req, res) => {
  console.log(req.body);
  try {
    const { _id } = jwt.verify(req.body.userIn, process.env.JWT_SECRET);
    const { oldpassword, newpassword, c_password } = req.body.data;
    if (oldpassword === newpassword) {
      res.json({
        status: "error",
        msg: "New password cant be same as old one",
      });
      return;
    }
    if (newpassword !== c_password) {
      res.status(400).json({ staus: "error", msg: "Password do not matches" });
      return;
    }
    mysqli.query(
      `select password from userdata where userid = '${_id}'`,
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
        const { password } = result[0];
        console.log({ password });
        const passVerification = bcryptjs.compareSync(oldpassword, password);
        if (passVerification) {
          const new_hash = bcryptjs.hashSync(c_password, 10);
          mysqli.query(
            `update userdata set password = '${new_hash}' where userid = '${_id}'`,
            (err, success) => {
              if (err) {
                console.log(err);
                return;
              }
              res.send({
                status: "success",
                msg: "your password has been changed",
                success,
              });
            }
          );
        } else {
          res.status(400).json({
            staus: "error",
            msg: "You have entered wrong old password ",
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ staus: "error", msg: "Something went wrong :(" });
    console.error(err);
  }
});

router.post("/password/reset/:old_id", (req, res) => {
  const { old_id } = req.params;
  const { newpass, confirmpass } = req.body;
  if (newpass !== confirmpass || newpass.length < 1) {
    res.json({ message: "Password do not matches ." });
    return;
  }
  mysqli.query(
    `select name from userdata where userid = '${old_id}'`,
    (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      if (result.length > 0) {
        const password_hash = bcryptjs.hashSync(newpass, 10);
        // user_id_generator is custom utility function generates and return a random "-" seperated  string  
        const _id = user_id_generator();
        const token = jwt.sign({ _id }, process.env.JWT_SECRET);
        mysqli.query(
          `update userdata set userid = '${_id}' , user_token = '${token}' , password = '${password_hash}' where  userid = '${old_id}'`,
          (error, result) => {
            if (error) console.log(error);
            res.send({
              message:
                "Password has been updated successfully , please login .",
            });
          }
        );
      } else {
        res.send({ message: "Invalid link , try resetting password again ." });
      }
    }
  );
});
module.exports = router;
