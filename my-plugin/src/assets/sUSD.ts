import { BridgeableERC20Asset } from '@poanet/tokenbridge-bw-exchange'

export default new BridgeableERC20Asset({
  //Ethereum Kovan
  id: 'susd', //internal id of the asset
  name: 'MAIN on kovan', //displayed name of the asset
  network: '42', //chain id (ethereum Kovan)
  address: '0x41c16473b12211892c813f52815f700440471aa0', //token contract address
  bridgeModes: ['erc-to-erc-amb']
})
