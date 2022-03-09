const express = require("express");
const router = express.Router();
const mysqli = require("../database/connection");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const app = express();

const random = require("../utils/randomstr");

router.use(
  fileUpload({
    safeFileNames: true,
  })
);

router.post("/getuser", (req, res) => {
  const { token } = req.body;

  const { _id } = jwt.verify(token, process.env.JWT_SECRET);

  mysqli.query(
    `select name,email,joined_on,profile,phone,bio from userdata where userid = '${_id}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result[0]);
      }
    }
  );
});

router.post("/user/update", (req, res) => {
  console.log(req.body)
  const { name, bio, phone } = req.body;
  const randomstr = random();
  let filename;

  file = req.files?.profile;
  if (file) {
    if (["png", "svg", "ebp", "jpg"].includes(file.name.substr(-3))) {
      const ext = file.name.substr(-3) === "svg" ? "svg" : "png";
      filename = `user_${name.trim().split(" ").join("_")}_${randomstr}.${ext}`;

      file.mv(__dirname + "/static/files/" + filename, (err) => {
        if (err) console.log(err);
      });
    }
    else{
    filename = "/user.png";
    }
  }
  if (!file) {
    filename = "/user.png";
  }
  const token = req.headers.userauthtokenstring;
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  mysqli.query(
    `update userdata set name = '${name}' , bio = '${bio}' , phone = '${phone}' , profile = '${filename}' where  userid = '${_id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(401)
          .send({ message: "Something went wrong , please try again ." });
        return;
      }
      if (result) {
        console.log(result);
        // res.send("success")
      }
    }
  );

  // remove after stuff get done
  console.log({ reponse: "yes", token, filename, name, bio, phone, _id });
  res.send("zal update");
});

module.exports = router;
