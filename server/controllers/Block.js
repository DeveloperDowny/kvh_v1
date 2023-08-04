require('dotenv').config();

const axios = require('axios');



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
        try {
            const id = req.params.id;
            // use regex to check if address is valid
            const nw = this.checkBlockchainAddress(id);
            console.log("Network: ",nw);

            //retrive normal transaction list for trons
            // res
                // balance: 
                // txs: []
            if (nw === 'tron'){
                let data = await axios.get(`https://services.tokenview.io/vipapi/trx/address/normal/${id}/1/50?apikey=${process.env.vTOKEN}`);          
                console.log(data.data);
                if(data.data.code !== 1){
                    //alternative tron api
                }
                return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: data.data })
            }

            else if (nw === 'xmr'){
                // https://localmonero.co/blocks/api
            }


            // test for generalized data rather than lots of txs
            // https://services.tokenview.io/vipapi/{lowercase-coin-abbr}/address/{address}?apikey={apikey}
            else if(nw === 'eth') {
                let data = await axios.get(`https://services.tokenview.io/vipapi/${nw}/address/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);

                // https://services.tokenview.io/vipapi/firsttx/{lowercase-coin-abbr}/{address}?apikey={apikey}
                let firstTx = await axios.get(`https://services.tokenview.io/vipapi/firsttx/${nw}/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);
                firstTx = firstTx.data.data.time;



                // no last tx api for eth
                data.data.data.first = firstTx;
                console.log("time",firstTx);

                return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: data.data.data })
            }
            else if(nw === 'btc') {
                // https://services.tokenview.io/vipapi/address/btc/bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj/1/50?apikey=3fzm9zalWMCc8m8cqZhU
                let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);
                let ndata = data.data.data[0]
                ndata.balance = parseFloat(ndata.receive) + parseFloat(ndata.spend);
                return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: ndata })
            }

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
                return res.status(200).json({ message: "Address Incorrect", network: nw});
            }
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
    }

}

module.exports = BlockController;