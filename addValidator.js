require('dotenv').config();
const fs = require('fs')
const assert = require('assert');

const {web3Foreign, web3Home, Web3Utils} = require('./web3');
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
  NEW_VALIDATOR,
  NETWORK,
  HOME_RPC_URL,
  HOME_BRIDGE_ADDRESS
} = process.env;

async function main() {
  let RPC_URL, BRIDGE_ADDRESS, web3
  switch(NETWORK) {
    case 'home':
      RPC_URL = HOME_RPC_URL;
      BRIDGE_ADDRESS = HOME_BRIDGE_ADDRESS;
      web3 = web3Home
      break;
    case 'foreign':
      RPC_URL = FOREIGN_RPC_URL;
      BRIDGE_ADDRESS = FOREIGN_BRIDGE_ADDRESS;
      web3 = web3Foreign
      break;
    default:
      throw new Error('specify NETWORK!');
  }
  let bridge = new web3.eth.Contract(FOREIGN_ABI, BRIDGE_ADDRESS);
  const validatorsAddress = await bridge.methods.validatorContract().call();
  let validatorContract = new web3.eth.Contract(VALIDATOR_ABI, validatorsAddress);
  const owner = await validatorContract.methods.owner().call()
  assert.equal(owner.toLowerCase(), SENDER_ADDRESS.toLowerCase(), 'Sender address is not the owner');
  let nonce = await getNonce({web3, address: SENDER_ADDRESS });
  const data = validatorContract.methods.addValidator(NEW_VALIDATOR).encodeABI();
  
    sendTx({
      data,
      nonce,
      privateKey: SENDER_PRIVATE_KEY,
      value: '0',
      gasLimit: '251000',
      to: validatorsAddress,
      rpcUrl: RPC_URL,
      gasPrice: '21'

    })
  
}
main();