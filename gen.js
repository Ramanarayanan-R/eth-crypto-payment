const Web3 = require('web3')

const Web3js = new Web3('https://ropsten.infura.io/v3/6c788638f2d446a6be19c68b275a29a5')

function genAddress() {

return Web3js.eth.accounts.create()

}

exports.genAddress = genAddress
