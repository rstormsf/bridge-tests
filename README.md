# Script to test poa-bridge

.env
```
HOME_RPC_URL=https://sokol.poa.network
HOME_BRIDGE_ADDRESS=0xaCB940c6D5F65563cF339bF1Eb29DD333E2ad561

FOREIGN_RPC_URL=https://kovan.infura.io/mew
FOREIGN_BRIDGE_ADDRESS=0x39dc8D7b624D82aacfbD46da5a97761001b3D111

POA20_ADDRESS=0x1D3F981DEC22D88f8deB9d1cFb127D88f5b67eb9

SENDER_ADDRESS=0x..
SENDER_PRIVATE_KEY=4ec...
```

Deposits:
`TIMES=1 node deposits.js`

Withdrawals:
`TIMES=2 node withdrawals.js`
