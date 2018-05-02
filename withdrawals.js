require('dotenv').config();
const fs = require('fs')

const {web3Foreign, Web3Utils} = require('./web3');
const {getNonce, sendTx} = require('./helpers');
const POA20ABI = require('./poa20.abi');

const {
  SENDER_ADDRESS,
  SENDER_PRIVATE_KEY,
  POA20_ADDRESS,
  FOREIGN_BRIDGE_ADDRESS,
  FOREIGN_RPC_URL,
  TIMES
} = process.env;
let poa20 = new web3Foreign.eth.Contract(POA20ABI, POA20_ADDRESS);

async function main() {
  let nonce = await getNonce({web3: web3Foreign, address: SENDER_ADDRESS });
  const data = poa20.methods.transferAndCall(FOREIGN_BRIDGE_ADDRESS, Web3Utils.toWei('0.5'), '0x').encodeABI();
  for(var i = 0; i < TIMES; i++ ){
    sendTx({
      data,
      nonce,
      privateKey: SENDER_PRIVATE_KEY,
      value: '0',
      gasLimit: '251000',
      to: POA20_ADDRESS,
      rpcUrl: FOREIGN_RPC_URL
    })
    nonce += 1;
  }
}
main();