const Web3 = require('web3')
const web3 = new Web3("ws://localhost:8546")


//get the latest gas price for the network
web3.eth.getGasPrice().then((result) => {
  console.log(web3.utils.fromWei(result, 'ether'))
})


//hashing, sha3(string), keccak256(string)
console.log(web3.utils.sha3('1234'))

//randomness, randomHex(len)
console.log(web3.utils.randomHex(32))


//underscorejs library
const _ = web3.utils._ 


//looping through keys and values
_.each({key1: 'val1', key2: 'val2'}, (val, key) => {
  console.log(key)
})






