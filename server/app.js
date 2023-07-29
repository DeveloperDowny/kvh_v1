const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

require("./db/conn");
const User = require("./models/Schema");
const auth = require("./middlewares/auth");
// const { default: auth } = require("./middlewares/auth");

app.use(express.json());
app.use("/auth", require("./Router/Auth"));
app.use("/api", auth, require("./Router/Auth"));
app.use("/users", auth, require("./Router/Users"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is runnig at port no http://localhost:${PORT}`);
});
