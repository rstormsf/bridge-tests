require('dotenv').config();
const Web3 = require('web3');
const Web3Utils = require('web3-utils')
const Tx = require('ethereumjs-tx');
const fetch = require('node-fetch');

const HOME_RPC_URL = process.env.HOME_RPC_URL;
const FOREIGN_RPC_URL = process.env.FOREIGN_RPC_URL;

const homeProvider = new Web3.providers.HttpProvider(HOME_RPC_URL);
const web3Home = new Web3(homeProvider);

const foreignProvider = new Web3.providers.HttpProvider(FOREIGN_RPC_URL);
const web3Foreign = new Web3(foreignProvider);

module.exports = {
  web3Home,
  web3Foreign,
  Web3Utils
}