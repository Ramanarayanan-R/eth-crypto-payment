var fetch = require("node-fetch");

const TOKEN_ADDRESS = "0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6"

async function toETH() {
    // Querying the API sell_rate endpoint. QTY is fixed as 1 here
    let ratesRequest = await fetch(
        "https://ropsten-api.kyber.network/sell_rate?id=" +
        TOKEN_ADDRESS +
        "&qty=1"
    );
    // Parsing the output
    let rates = await ratesRequest.json();
    let dstQty = Number(rates.data[0].dst_qty[0]);

    return dstQty
}


async function toUSD() {
    let Pjson = await fetch("https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD")
    let Pprice = await Pjson.json()
    let price = Number(Pprice[0]['price_usd'])
    return price
}

async function priceAPI() {
    let ethPrice = await toETH();
    let usdPrice = await toUSD();
    let price = ethPrice * usdPrice
    // console.log(price)
    return price
}

exports.priceAPI = priceAPI