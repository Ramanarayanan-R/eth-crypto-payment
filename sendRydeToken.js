const Web3 = require('web3')

const Tx = require('ethereumjs-tx').Transaction

const Web3js = new Web3('https://ropsten.infura.io/v3/6c788638f2d446a6be19c68b275a29a5')

//let tokenAddress = '0xe0957c7d7d0a8da56a0df7b4fc17a3c78638ec4e' // Rydeum contract address
let tokenAddress = '0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6' // KNC contract address


let contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},
{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],
"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},
{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],
"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],
"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],
"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner",
"type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},
{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},
{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]


async function sendRydeToken(amountG, toAddressG, fromAddressG, privateKeyG) {

  try {

console.log("sending")
    let fromAddress = fromAddressG // The rider wallet address from where the cryptotoken is sent.
    let privateKey = Buffer.from(privateKeyG, 'hex') // The privatekey of the rider wallet address.

    let contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

    //let toAddress = '0x4c93a5590d6372af3e1c9be3954c39c590e60038' // where to send it  
    let toAddress = toAddressG

    // 1e18 === 1 Rydeum Token
    let amount = Web3js.utils.toHex(amountG * 1e18)
    count = await Web3js.eth.getTransactionCount(fromAddress)

    let rawTransaction = {
      'from': fromAddress,
      'gasPrice': Web3js.utils.toHex(200 * 1e9),
      'gasLimit': Web3js.utils.toHex(230000),
      'to': tokenAddress,
      'value': 0x0,
      'data': contract.methods.transfer(toAddress, amount).encodeABI(),
      'nonce': Web3js.utils.toHex(count)
    }
    let transaction = new Tx(rawTransaction, { chain: 'ropsten', hardfork: 'petersburg' })
    transaction.sign(privateKey)
    const Thash = Web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
    return Thash;
  }
  catch (err) {
    console.log("AV:sendRydeToken:");
    console.log(err);
  }


}
exports.sendRydeToken = sendRydeToken
