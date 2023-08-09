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



baseR.use("/explore", require("./Router/Block"));
app.use("/auth", require("./Router/Auth"));
baseR.use("/market", require("./Router/Market"));

// app.use("/fixed_label", (req, res, next) => {
//   // Allow requests from any origin
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Allow the following HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   // Allow these headers to be sent
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// }, require("./Router/Test"));


// app.use((req, res, next) => {
//   // Allow requests from any origin

//   res.header('Access-Control-Allow-Origin', '*');
//   // Allow the following HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   // Allow these headers to be sent
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


const PORT = 5000;
app.listen(PORT, () => {
  // console.clear()
  console.log(`Server@http://localhost:${PORT}`);
});
