# Script to test poa-bridge

.env
```
HOME_RPC_URL=https://sokol.poa.network
HOME_BRIDGE_ADDRESS=0x4404cfA3C0087FDbEa2F3B73dFb0889E3b917A1f

FOREIGN_RPC_URL=http://174.138.57.135:8646
FOREIGN_BRIDGE_ADDRESS=0x46BcE2C84b04701c4D8061AA052F0CD99829a7f2

POA20_ADDRESS=0x19FB04Bf7B787C4e147b1cE909Ec4dD6b51921aE

SENDER_ADDRESS=0xd14de4c642743245b268539ef232f64bfa6aec74
SENDER_PRIVATE_KEY=8..d

NEW_VALIDATOR=0xdbcbf626192475e368e0601dc06d5fb669563c63
SET_REQUIRED_SIGNATURES_VALUE=2
```

Deposits:
`TIMES=1 node deposits.js`

Withdrawals:
`TIMES=2 node withdrawals.js`
