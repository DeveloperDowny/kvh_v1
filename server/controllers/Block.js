require('dotenv').config();

const axios = require('axios');
const Transactions = require('../models/TransactionSchema');

// const sources = {
//     "TokenView": 0,
//     "Etherscan": 1,
//     "Trongrid": 2,
// }

const addTransaction = async (transaction) => {
    try {
        // console.log(transaction)
        const transac = new Transactions(transaction);
        await transac.save();
        return {status: 1, msg: "Added to database"}
    }catch (e) {
        return {status: 0, msg: e};
    }
}
class BlockController {
    constructor() { }

    checkBlockchainAddress(address) {
        // console.log("Addres", address);
        const regexes = {
            btc: [
                /^1[a-zA-Z0-9]{25,33}$/,
                /^3[a-zA-Z0-9]{25,33}$/,
                /^bc1[a-zA-Z0-9]{23,42}$/,
                /^bc1p[a-zA-Z0-9]{23,42}$/
            ],
            eth: [
                /^0x[a-fA-F0-9]{40}$/
            ],
            xmr: [
                /^(4|8)[1-9A-Za-z]{94}$/
            ],
            ada: [
                /^Ae2[1-9A-HJ-NP-Za-km-z]+$/,
                /^DdzFF[1-9A-HJ-NP-Za-km-z]+$/,
                /^addr1[a-z0-9]+$/,
                /^stake1[a-z0-9]+$/
            ],
            tron: [
                /^T[A-HJ-NP-Za-km-z1-9]{33}$/
            ],
            sol: [
                /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
            ],
            ton: [
                /^0:[a-z0-9]{64}$/,
                /^[a-zA-Z0-9\-\_]{48}$/,
                /^\w\s\w\s\w$/
            ]
        };

        for (let blockchain in regexes) {
            for (let regex of regexes[blockchain]) {
                if (regex.test(address)) {
                    return blockchain;
                }
            }
        }

        throw new Error('Invalid address');
    }

    test = async (req, res) => {
        var title = "Untitled";
        var dbStatus = {};
        var flag = false;
        var transaction = {};
        try {
            const id = req.params.id;
            // use regex to check if address is valid
            // btc address regex
            const nw = this.checkBlockchainAddress(id);
            console.log("test",nw);
            const previousTransaction = await Transactions.findOne({addr: id}).sort({ date: -1 }); 
            if (previousTransaction) {
                if(Date.now() - previousTransaction.date < 120000){
                // console.log("Previous Transactions: ", previousTransaction);
                return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: previousTransaction.data })
                }else {
                var prevTitle = previousTransaction.title;
                var prevFlag = previousTransaction.flag;    
                await previousTransaction.deleteOne();
            }
            }
            //retrive normal transaction list for trons
            if (nw === 'tron'){
                let data = await axios.get(`https://services.tokenview.io/vipapi/trx/address/${id}?apikey=${process.env.vTOKEN}`)
                transaction = {addr:id, network:nw, source:0, data:data.data.data,flag:prevFlag || flag, title:prevTitle || title, date:Date.now()};
                if(data.data.code !== 1){
                    // alternative tron api
                    let data = await axios.get(`https://api.trongrid.io/v1/accounts/${id}/transactions`);
                    transaction = {addr:id, network:nw, source:2, data:data.data.data, flag:prevFlag || flag, title:prevTitle || title, date:Date.now()};
                    // return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: data.data})
                }
                dbStatus = await addTransaction(transaction);                
                return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: transaction.data })
            }

            if (nw === 'xmr'){

            }

            let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);
            transaction = {addr:id, network:nw, source:0, data:data.data.data, flag:prevFlag || flag, title:prevTitle || title, date:Date.now()};
            if (data.data.code !== 1) {
                // https://blockchain.info/rawaddr/
                // let data = await axios.get(`https://blockchain.info/rawaddr/${id}`);
                // console.log("test2",data);

                // try using etherscan if nw is eth and tokenview fails

                if (nw === "eth") {
                    data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.eTOKEN}`);
                    // console.log("etherscan", data);
                    transaction = {addr:id, network:nw, source:1, data:data.data.result, flag:prevFlag || flag, title:prevTitle || title, date:Date.now()};
                }
            }

            dbStatus = await addTransaction(transaction);                
            return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: transaction.data });
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
    }

    //change transaction title
    changeTitle = async (req, res) => {
        try {
            const id = req.params.id;
            const title = req.body.title;
            const previousTransaction = await Transactions.findOne({addr: id}).sort({ date: -1 }); 
            if(!previousTransaction){
                return res.status(400).json({message: "No transaction found", previousTransaction: previousTransaction});
            }
            previousTransaction.title = title;
            await previousTransaction.save();
            return res.status(200).json({message: "Successfully changed title", previousTransaction: previousTransaction});
        }catch(err){
            return res.status(500).send({message: err.message});
        }
    }
}

module.exports = BlockController;