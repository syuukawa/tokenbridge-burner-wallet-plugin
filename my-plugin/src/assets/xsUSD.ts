import { ERC677Asset } from '@poanet/tokenbridge-bw-exchange'

// import { ERC677Asset } from '@poanet/tokenbridge-bw-exchange'

export default new ERC677Asset({
  id: 'xsusd', //internal id of the asset
  name: 'Main on Sokol', //displayed name of the asset
  network: '77', //chain id (Sokol)
  address: '0xFb53E551d38D404fD78F6d3628067a6f2898008E' //token contract address
  //   0xA5D280De53c2C3E82E647FB7D7e32df19Aa273Cc
})
