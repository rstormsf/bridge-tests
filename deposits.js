require('dotenv').config();
const fs = require('fs')

const {web3Home} = require('./web3');
const {getNonce, sendTx} = require('./helpers');

const {
  SENDER_ADDRESS,
  SENDER_PRIVATE_KEY,
  HOME_BRIDGE_ADDRESS,
  HOME_RPC_URL,
  TIMES
} = process.env;
async function main() {
  let nonce = await getNonce({web3: web3Home, address: SENDER_ADDRESS });
  for(var i = 0; i < TIMES; i++ ){
    sendTx({
      data: '0x',
      nonce,
      privateKey: SENDER_PRIVATE_KEY,
      value: '0.5',
      gasLimit: '51000',
      to: HOME_BRIDGE_ADDRESS,
      rpcUrl: HOME_RPC_URL
    })
    nonce += 1;
  }
}
main();