require('dotenv').config();
const fs = require('fs')

const {web3Home} = require('./web3');
const {getNonce, sendTx} = require('./helpers');

const {
  SENDER_ADDRESS,
  SENDER_PRIVATE_KEY,
  HOME_BRIDGE_ADDRESS,
  HOME_RPC_URL,
  TIMES,
  LOCAL_NONCE
} = process.env;
const localNonceFile = require('./home_nonce.json')

async function main() {
  let nonce = LOCAL_NONCE ? localNonceFile.nonce : await getNonce({web3: web3Home, address: SENDER_ADDRESS });
  
  for(var i = 0; i < TIMES; i++ ){
    sendTx({
      data: '0x',
      nonce: nonce,
      privateKey: SENDER_PRIVATE_KEY,
      value: '0.5',
      gasLimit: '300000',
      to: HOME_BRIDGE_ADDRESS,
      rpcUrl: HOME_RPC_URL,
      gasPrice: '1'
    })
    nonce += 1;
  }
  fs.writeFileSync('./home_nonce.json', JSON.stringify({
    nonce,
  }) ,null,4);
}
main();