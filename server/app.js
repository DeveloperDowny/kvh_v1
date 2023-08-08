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
app.use(express.urlencoded({ extended: true }));

const baseR = express.Router();
app.use("/api", baseR);

baseR.use("/explore", require("./Router/Block"));
app.use("/auth", require("./Router/Auth"));
baseR.use("/market", require("./Router/Market"));

// app.use("/auth", require("./Router/Auth"));
// app.use("/api", auth, require("./Router/Auth"));
// app.use("/users", auth, require("./Router/Users"));

fetchAddressInfo = async (address, network) => {
  if (address === undefined){
    return;
  }
  const addressInfo = await axios.get(`https://services.tokenview.io/vipapi/${network}/address/${address.toLowerCase()}?apikey=${process.env.vTOKEN}`);
  return addressInfo.data.data;
}

processTransaction = async (transaction) => {
  const processedTx = { ...transaction };
  const txs = transaction;

  const updatedTxs = [];
  console.log("txs", txs)
  for (const tx of txs) {
      // const fromInfo = await fetchAddressInfo(tx.from, 'eth');
      if (tx.to === undefined) {
      return 
      } 
      const toInfo = await fetchAddressInfo(tx.to, 'eth');
      // tx.fromInfo = fromInfo;
      tx.toInfo = toInfo;
      updatedTxs.push(tx);

      // Recursively call the processTransaction function for each address
      // await processTransaction(tx.from);
      await processTransaction(tx.to);
  }

  processedTx.txs = updatedTxs;
  return processedTx;
}


//call recusrsively
createNestedJSON = async (id) => {
  try {
    if(id === undefined) {
      return ;
    }
  const nw = "eth";
  const data = await axios.get(`https://services.tokenview.io/vipapi/${nw}/address/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);
  const firstTx = await axios.get(`https://services.tokenview.io/vipapi/firsttx/${nw}/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);
  const firstTxTime = firstTx.data.data.time;
  const processedTxs = await processTransaction(data.data.data.txs);

  const transaction = {
      addr: id,
      network: nw,
      data: {
          ...data.data.data,
          first: firstTxTime,
          txs: processedTxs,
      } 
  };

  // Save the transaction JSON to a file
  fs.writeFileSync('transaction.json', JSON.stringify(transaction, null, 2));
  }catch(e){
      console.log('Error saving transaction', e);
}
}

createNestedJSON("0xebfe7a29ea17acb5f6f437e659bd2d472deedc54")
const PORT = 5000;
app.listen(PORT, () => {
  // console.clear()
  console.log(`Server@http://localhost:${PORT}`);
});
