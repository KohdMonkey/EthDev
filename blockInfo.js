var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3("ws://localhost:8546")


web3.eth.getBlockNumber().then((latest) => console.log("latest block: " + latest + "\n"))
web3.eth.getBlockTransactionCount('latest').then(console.log)


const blockhash = '0x8fab6792fad4706c291a2f15e81fb285f20fdbecd942f196f09fb551b1140d74'

//get the second transaction
web3.eth.getTransactionFromBlock(blockhash, 2).then(console.log)


//loggin whole block
web3.eth.getBlock(blockhash).then(console.log)


/* get block by hash*/
web3.eth.getBlock(blockhash, true).then((block) => {
  console.log({
    blockHash: block.hash,
    blockNumber: block.number,
    Txn: block.transactions[2]
  })
})


/* get the latest 10 blocks*/
web3.eth.getBlockNumber().then((latest) => {
  for(let i = 0; i < 10; i++) {
    web3.eth.getBlock(latest - i).then((block) => {
      console.log(block.number + " | " + block.hash)
    })
  }
})





