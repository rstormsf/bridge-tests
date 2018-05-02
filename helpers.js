require('dotenv').config();
const fs = require('fs')
const Web3 = require('web3');
const Web3Utils = require('web3-utils')
const Tx = require('ethereumjs-tx');
const fetch = require('node-fetch');

async function getNonce({web3, address}){
  try {
    return await web3.eth.getTransactionCount(address);
  } catch(e){
    console.error("Wasn't able to get nonce from foreign", e)
  }
}

async function getGasPrices(type){
  try {
    const response = await fetch('https://gasprice.poa.network/');
    const json = await response.json()
    return json[type]
  } catch(e) {
    console.error("Gas Price API is not available", e)
    return GAS_PRICE_FALLBACK;
  }
}

async function sendRawTx(url, signedData){
  const request = await fetch(url, {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: "2.0", 
      method: "eth_sendRawTransaction",
      params: [signedData],
      id: 1
    })
  });
  const json = await request.json()
  console.log(json)

}

async function sendTx({data, nonce, privateKey, value, gasLimit, to, rpcUrl}){
  try {
    privateKey = Buffer.from(privateKey, 'hex')
    // let gasPrice = await getGasPrices(GAS_PRICE_SPEED_TYPE);
    const rawTx = {
      data,
      value: Web3Utils.toHex(Web3Utils.toWei(value)),
      nonce: Web3Utils.toHex(nonce),
      gasPrice: Web3Utils.toHex(Web3Utils.toWei('1', 'gwei')),
      gasLimit:  Web3Utils.toHex(gasLimit),
      to: to,
    }
    const tx = new Tx(rawTx);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    sendRawTx(rpcUrl, '0x' + serializedTx.toString('hex'))
  } catch(e) {
    console.error(e)
  }
}

module.exports = {
  sendTx,
  getNonce
};