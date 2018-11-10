var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3("ws://localhost:8546")

const account1 = process.env.PUB1
const account2 = process.env.PUB2

const privKey1 = Buffer.from(process.env.PRIV1, 'hex')
const privKey2 = Buffer.from(process.env.PRIV2, 'hex')


web3.eth.getBalance(account1, (err, bal) => {
  console.log('account1 balance: ',  web3.utils.fromWei(bal, 'ether'))
})


var txCount = 111
web3.eth.getBalance(account2, (err, bal) => {
  console.log('account2 balance: ',  web3.utils.fromWei(bal, 'ether'))
})



web3.eth.getTransactionCount(account1, (err, count) => {
  txCount = count
})


// Build the txn
const txObject = {
  nonce: web3.utils.toHex(txCount),
  to: account2,
  value: web3.utils.toHex('0.01', 'ether'),
  gasLimit: web3.utils.toHex(21000),
  gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
}

console.log('txObject: ')
console.log(txObject)

// Sign the txn
const tx = new Tx(txObject)
tx.sign(privKey1)


//serialize txn
const serializedTxn = tx.serialize()
const raw = '0x' + serializedTxn.toString('hex')

console.log('serialized: ')
console.log(serializedTxn)

console.log('raw: ')
console.log(raw)


// Broadcast the txn
web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  console.log('txHash: ', txHash)
})



