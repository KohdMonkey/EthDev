var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3("ws://localhost:8546")

var conf = require("./config.json")

const contractABI = conf.CONTRACT_ABI 
const contractAddress = conf.CONTRACT_ADDR 


var contract = new web3.eth.Contract(contractABI, contractAddress)
contract.methods.name().call((err, result) => {console.log(result)})
contract.methods.symbol().call((err, result) => {console.log(result)})


function processEvents(events) {
  //print number of events and the latest event
  length = events.length
  console.log(length)
  console.log(events[length-1])
}


contract.getPastEvents(
  //'Transfer'
  'AllEvents', 
  {
    fromBlock: 6686000,
    toBlock: 'latest'
  },
  (err, events) => {processEvents(events)} 
)
