var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3("ws://localhost:8546")

var conf = require("./config.json")
const account1 = conf.PUB1 
const account2 = conf.PUB2 
const privKey1 = Buffer.from(conf.PRIV1, 'hex')
const privKey2 = Buffer.from(conf.PRIV2, 'hex')


const contractABI = conf.CONTRACT_ABI 
const contractAddress = conf.CONTRACT_ADDR 


var contract = new web3.eth.Contract(contractABI, contractAddress)


web3.eth.getTransactionCount(account1, (err, count) => {

  const txObject = {
    nonce: web3.utils.toHex(count),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: contract.methods.transfer(account2, 1000).encodeABI() 
  }


  const tx = new Tx(txObject)
  tx.sign(privKey1)


  const serializedTxn = tx.serialize()
  const raw = '0x' + serializedTxn.toString('hex')


  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash: ', txHash)
  }) 

})



//getting the balance
contract.methods.balanceOf(account2).call((err, balance) => { 
  console.log({err, balance})
})


