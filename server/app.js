const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const app = express();
app.use(cors());

require("./db/Conn");
const User = require("./models/UserSchema");
const AddressTracker = require("./models/AddressTracker");
const auth = require("./middlewares/auth");
// const { default: auth } = require("./middlewares/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const baseR = express.Router();
app.use("/api", (req, res, next) => {
  // Allow requests from any origin
  console.log("test set in req", req.body);

  res.header('Access-Control-Allow-Origin', '*');
  // Allow the following HTTP methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Allow these headers to be sent
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, baseR);


baseR.use("/explore", require("./Router/Block"));
app.use("/auth", require("./Router/Auth"));
baseR.use("/market", require("./Router/Market"));

app.post("/webhook", async (req, res) => {
  console.log("test set", req.body)
  const newAddr = new AddressTracker({ data: req.body })
  await newAddr.save();
  return res.status(200).json("ok")
})


app.use((req, res, next) => {
  // Allow requests from any origin

  res.header('Access-Control-Allow-Origin', '*');
  // Allow the following HTTP methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Allow these headers to be sent
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const PORT = 5000;
app.listen(PORT, () => {
  // console.clear()
  console.log(`Server@http://localhost:${PORT}`);
});
