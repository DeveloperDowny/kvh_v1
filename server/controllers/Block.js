require('dotenv').config();

const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
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
        return { status: 1, msg: "Added to database" }
    } catch (e) {
        return { status: 0, msg: e };
    }
}
const checkCurrencyInCSV = async (currency, filename)  => {
    return new Promise((resolve, reject) => {
        const filePath = __dirname + '/../currency_list/' + filename;
        const currencies = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                currencies.push(row.currency_code);
            })
            .on('end', () => { 
                resolve(currencies.includes(currency));
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
class BlockController {
    constructor() { }

    checkBlockchainAddress(address) {
        console.log("Address: ", address);
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
            const nw = this.checkBlockchainAddress(id);
            console.log("test", nw);
            const previousTransaction = await Transactions.findOne({ addr: id }).sort({ date: -1 });
            console.log("Previous Transactions: ", previousTransaction);
            if (previousTransaction) {
                console.log("in prev");
                if (Date.now() - previousTransaction.date < 120000) {
                    // console.log("Previous Transactions: ", previousTransaction);
                    console.log("sending prev");
                    return res.status(200).json({ dbStatus, message: "Successfully Retrieved old", network: nw, data: previousTransaction })
                } else {
                    console.log("deleting prev");
                    var prevTitle = previousTransaction.title;
                    var prevFlag = previousTransaction.flag;
                    await previousTransaction.deleteOne();
                }
            }
            //retrive normal transaction list for trons
            // res
            // balance: 
            // txs: []
            if (nw === 'tron') {
                let data = await axios.get(`https://services.tokenview.io/vipapi/trx/address/${id}?apikey=${process.env.vTOKEN}`)
                transaction = { addr: id, network: nw, source: 0, data: data.data.data, flag: prevFlag || flag, title: prevTitle || title, date: Date.now() };
                if (data.data.code !== 1) {
                    // alternative tron api
                    let data = await axios.get(`https://api.trongrid.io/v1/accounts/${id}/transactions`);
                    transaction = { addr: id, network: nw, source: 2, data: data.data.data, flag: prevFlag || flag, title: prevTitle || title, date: Date.now() };
                    // return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: data.data})
                }
                dbStatus = await addTransaction(transaction);
                return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: transaction.data })
            }

            else if (nw === 'xmr') {
                // https://localmonero.co/blocks/api
            }


            // test for generalized data rather than lots of txs
            // https://services.tokenview.io/vipapi/{lowercase-coin-abbr}/address/{address}?apikey={apikey}
            else if (nw === 'eth') {
                let data = await axios.get(`https://services.tokenview.io/vipapi/${nw}/address/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);

                let firstTx = await axios.get(`https://services.tokenview.io/vipapi/firsttx/${nw}/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);
                firstTx = firstTx.data.data.time;


                // no last tx api for eth
                data.data.data.first = firstTx;
                transaction = { addr: id, network: nw, source: 0, data: data.data.data, flag: prevFlag || flag, title: prevTitle || title, date: Date.now() };
                console.log("time", firstTx);

                dbStatus = await addTransaction(transaction);
                return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: transaction })

                // return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: transaction })
            }
            else if (nw === 'btc') {
                let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);
                let ndata = data.data.data[0]
                ndata.balance = parseFloat(ndata.receive) + parseFloat(ndata.spend);

                transaction = { addr: id, network: nw, source: 0, data: ndata, flag: prevFlag || flag, title: prevTitle || title, date: Date.now() };

                dbStatus = await addTransaction(transaction);
                return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: transaction })
            }

            // let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);
            // transaction = {addr:id, network:nw, source:0, data:data.data.data, flag:prevFlag || flag, title:prevTitle || title, date:Date.now()};
            // if (data.data.code !== 1) {
            //     // https://blockchain.info/rawaddr/
            //     // let data = await axios.get(`https://blockchain.info/rawaddr/${id}`);
            //     // console.log("test2",data);

            //     // try using etherscan if nw is eth and tokenview fails

            //     if (nw === "eth") {
            //         data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.eTOKEN}`);
            //         // console.log("etherscan", data);
            //         transaction = {addr:id, network:nw, source:1, data:data.data.result, flag:prevFlag || flag, title:prevTitle || title, date:Date.now()};
            //     }
            // }

            // dbStatus = await addTransaction(transaction);                
            // return res.status(200).json({ dbStatus, message: "Successfully Retrieved", network: nw, data: transaction.data });
            // else if(nw === 'btc') {
            //     // https://services.tokenview.io/vipapi/address/btc/bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj/1/50?apikey=3fzm9zalWMCc8m8cqZhU
            //     let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);
            //     let ndata = data.data.data[0]
            //     ndata.balance = parseFloat(ndata.receive) + parseFloat(ndata.spend);
            //     return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: ndata })
            // }

            // let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);


            // console.log("tkv, ether",data.data);
            // if (data.data.code !== 1) {
            //     // https://blockchain.info/rawaddr/
            //     // let data = await axios.get(`https://blockchain.info/rawaddr/${id}`);

            //     if (nw === "eth") {
            //         data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.eTOKEN}`);
            //         // console.log("etherscan", data);
            //         return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: data.data.result });
            //     }
            // }


            else {
                return res.status(200).json({ message: "Address Incorrect", network: nw });
            }
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
            const previousTransaction = await Transactions.findOne({ addr: id }).sort({ date: -1 });
            if (!previousTransaction) {
                return res.status(400).json({ message: "No transaction found", previousTransaction: previousTransaction });
            }
            previousTransaction.title = title;
            await previousTransaction.save();
            return res.status(200).json({ message: "Successfully changed title", previousTransaction: previousTransaction });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    }

    getRisk = async (req, res) => {
        console.log("risk")
        try {
            const address = req.params.id;

            if (!address) {
                return res.status(404).json({ error: 'Address not valid' });
            }

            const nw = this.checkBlockchainAddress(address);
            let payload = {};
            if (nw === "eth") {
                payload = {
                    ethAddresses: [address],
                };

            }
            else if (nw === "btc") {
                payload = {
                    btcAddresses: [address],
                };
            }

            else {
                return res.status(404).json({ error: 'Only for ETH and BTC networks' });
            }
            console.log(`${nw}address: ${address}`);

            const url = 'https://risk.charybdis.januus.io/';


            const axiosConfig = {
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: payload,
            };

            const response = await axios(axiosConfig);
            const jsonResponse = response.data;

            res.status(200).json(jsonResponse);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                res.status(400).json({ error: 'RequestedNullReport' });
            } else if (error.response && error.response.status === 500) {
                res.status(500).json({ error: 'EndPointException' });
            } else {
                console.error('Error fetching risk report:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    };

    getExchangeRate = async (req, res) => {
        try {
            let { from_currency, to_currency } = req.params;
            from_currency = from_currency.toUpperCase();
            to_currency = to_currency.toUpperCase();


            // Check if both currencies are present in their respective CSV files
            const isFromCurrencyValid = await checkCurrencyInCSV(from_currency, 'digital_currency_list.csv');
            const isToCurrencyValid = await checkCurrencyInCSV(to_currency, 'physical_currency_list.csv');

            if (!isFromCurrencyValid || !isToCurrencyValid) {
                return res.status(400).json({ error: "Invalid currency selection" });
            }

            const data = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${process.env.aTOKEN}`)
            return res.status(200).json(data.data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "An error occurred" });
        }
    };
};



module.exports = BlockController;