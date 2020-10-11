'use strict';

var express = require('express');
var app = express();
var sendRydeToken = require('./sendRydeToken.js')
var path = require('path');
var gen = require('./gen.js')
var price = require('./priceAPI.js')


app.get('/send', async function (req, res) {
    try {
        const amountG = req.query.amount
        const DaddressG = req.query.Daddress
        const OaddressG = req.query.Oaddress
        const RaddressG = req.query.Raddress
        const fromAddress = req.query.fromAddress
        const fromPrivateKey = req.query.fromPrivateKey


        // default percentage values for driver and operator if they are absent from api call.
        let DPercent = 60
        let OPercent = 20
        let RPercent;
        if (typeof req.query.DPercent != 'undefined') {
            DPercent = Number(req.query.DPercent)
        }

        if (typeof req.query.OPercent != 'undefined') {
            OPercent = Number(req.query.OPercent)
        }

        if (typeof req.query.RPercent != 'undefined') {
            RPercent = Number(req.query.RPercent)
        }

        RPercent = Math.round(100 - OPercent - DPercent)
        const hash1 = await sendRydeToken.sendRydeToken(Number(amountG) * DPercent / 100, DaddressG, fromAddress, fromPrivateKey);
        console.log(hash1)
        const hash2 = await sendRydeToken.sendRydeToken(Number(amountG) * OPercent / 100, OaddressG, fromAddress, fromPrivateKey);
        console.log(hash2)
        const hash3 = await sendRydeToken.sendRydeToken(Number(amountG) * RPercent / 100, RaddressG, fromAddress, fromPrivateKey);
        console.log(hash3)
        res.json({ hash1, etherscan1: "https://" + "ropsten." + "etherscan.io/tx/" + hash1.transactionHash, hash2, etherscan2: "https://" + "ropsten." + "etherscan.io/tx/" + hash2.transactionHash, hash3, etherscan3: "https://" + "ropsten." + "etherscan.io/tx/" + hash3.transactionHash })
    }
    catch (err) {
        console.log("AV:send:");
        console.log(err);
    }
});


app.get('/createAdd', function (req, res) {

    let ethWallet = gen.genAddress()
    res.json({ ethWallet })

});

app.get('/price', async function (req, res) {

    let priceR = await price.priceAPI()
    
    res.json({ priceR })

});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(3000);
