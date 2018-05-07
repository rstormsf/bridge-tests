require('dotenv').config();
const fs = require('fs')
const assert = require('assert');

const {web3Foreign, Web3Utils} = require('./web3');
const {getNonce, sendTx} = require('./helpers');
const FOREIGN_ABI = require('./abis/foreign.abi');
const VALIDATOR_ABI = require('./abis/validators.abi');

const {
  SENDER_ADDRESS,
  SENDER_PRIVATE_KEY,
  POA20_ADDRESS,
  FOREIGN_BRIDGE_ADDRESS,
  FOREIGN_RPC_URL,
  TIMES,
  NEW_VALIDATOR
} = process.env;
let foreign = new web3Foreign.eth.Contract(FOREIGN_ABI, FOREIGN_BRIDGE_ADDRESS);


async function main() {
  const validatorsAddress = await foreign.methods.validatorContract().call();
  let validatorContract = new web3Foreign.eth.Contract(VALIDATOR_ABI, validatorsAddress);
  const owner = await validatorContract.methods.owner().call()
  assert.equal(owner.toLowerCase(), SENDER_ADDRESS.toLowerCase(), 'Sender address is not the owner');
  let nonce = await getNonce({web3: web3Foreign, address: SENDER_ADDRESS });
  const data = validatorContract.methods.addValidator(NEW_VALIDATOR).encodeABI();
  
    sendTx({
      data,
      nonce,
      privateKey: SENDER_PRIVATE_KEY,
      value: '0',
      gasLimit: '251000',
      to: validatorsAddress,
      rpcUrl: FOREIGN_RPC_URL,
      gasPrice: '21'

    })
  
}
main();