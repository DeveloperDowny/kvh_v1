require('dotenv').config();

const axios = require('axios');



class BlockController {
    constructor() { }

    checkBlockchainAddress(address) {
        console.log(address);
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
            console.log(id);
            // use regex to check if address is valid
            // btc address regex
            const nw = this.checkBlockchainAddress(id);
            console.log("test",nw);

            let data = await axios.get(`https://services.tokenview.io/vipapi/address/${nw}/${id}/1/50?apikey=${process.env.vTOKEN}`);
            console.log(data.data);
            if (data.data.code !== 1) {
                // https://blockchain.info/rawaddr/
                // let data = await axios.get(`https://blockchain.info/rawaddr/${id}`);
                // console.log("test2",data);

                // try using etherscan if nw is eth and tokenview fails

                if (nw === "eth") {
                    data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.eTOKEN}`);
                    // console.log("etherscan", data);
                    return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: data.data.result });
                }
            }


            return res.status(200).json({ message: "Successfully Retrieved", network: nw, data: data.data.data });
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
    }

}

module.exports = BlockController;