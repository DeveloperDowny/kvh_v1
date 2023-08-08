const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const app = express();
app.use(cors());

require("./db/Conn");
const User = require("./models/UserSchema");
const auth = require("./middlewares/auth");
// const { default: auth } = require("./middlewares/auth");

app.use(express.json());

const baseR = express.Router();
app.use("/api", baseR);

baseR.use("/explore", require("./Router/Block"));
app.use("/auth", require("./Router/Auth"));
baseR.use("/market",require("./Router/Market"));

app.post("/webhook", (req, res) => {
  console.log(req.body)
  return res.status(200).json("ok")
})

const PORT = 5000;
app.listen(PORT, () => {
  // console.clear()
  console.log(`Server@http://localhost:${PORT}`);
});
