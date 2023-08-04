const express = require("express");
const cors = require("cors");
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

// app.use("/auth", require("./Router/Auth"));
// app.use("/api", auth, require("./Router/Auth"));
// app.use("/users", auth, require("./Router/Users"));



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server@http://localhost:${PORT}`);
});
