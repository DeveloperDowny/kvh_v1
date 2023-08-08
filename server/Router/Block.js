const express = require("express");
// blockchain router
const blockR = express.Router();

let blockC = require("../controllers/Block");

blockC = new blockC();

blockR.get("/:id", blockC.test);
blockR.post("/title/:id", blockC.changeTitle);
blockR.get("/search/:title/:id", blockC.searchTitle);
blockR.get("/risk/:id", blockC.getRisk);
blockR.get("/exchange/:from_currency/:to_currency", blockC.getExchangeRate);
blockR.get("/set/webhookUrl", blockC.setWebhookUrl);
blockR.get("/get/webhookUrl", blockC.getWebhookUrl);
blockR.get("/addAddress/:id", blockC.addTrackingAddr);
blockR.get("/showAddrList/:nw", blockC.showTrackedAddresses);


module.exports = blockR;

