const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../models/Schema");
router.get("/", (req, res) => {
  console.log("Received a GET HTTP method");
  res.send(`Hello world from the server rotuer js`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill data properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "already exits" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords doesnt match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  // return res.json({ message: "user signed in successfully" });
  // TODO if successfull then send jwt token
  if (!email || !password) {
    return res.status(400).json({ error: "plz fill data properly" });
  }
  try {
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      res.status(400).json({ error: "user error" });
    } else {
      console.log(userLogin);
      const secretKey = "your_secret_key"; // Replace with your own secret key

      // privilige 0 for superadmin 1 for admin 2 for user
      // currently hardcoded to 2, change it later []
      // TODO
      const token = jwt.sign({ uid: userLogin._id, privilege: 2 }, secretKey, {
        expiresIn: "24h",
      });
      res.json({
        message: "user signed in successfully",
        token: token,
        name: userLogin.name,
        uid: userLogin._id,
        privilege: 2,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

// sign jwt and return []
