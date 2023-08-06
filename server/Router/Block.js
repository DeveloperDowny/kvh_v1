const express = require("express");
// blockchain router
const blockR = express.Router();

let blockC = require("../controllers/Block");

blockC = new blockC();

blockR.get("/:id", blockC.test);
blockR.post("/title/:id", blockC.changeTitle);

module.exports = blockR;

