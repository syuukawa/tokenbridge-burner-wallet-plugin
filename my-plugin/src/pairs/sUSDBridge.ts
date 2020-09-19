import { Mediator } from '@poanet/tokenbridge-bw-exchange'
import { Stake, xStake } from '../index'
import BN from 'bn.js'
import { EstimateReturn, ValueTypes } from '@burner-wallet/exchange'
import HomeStakeMediatorAbi from '../abis/HomeStakeMediatorAbi'
import { fromWei, toBN } from 'web3-utils'
import { sUSD, xsUSD } from '../index'

// Mediator contract address at the Sokol
const homeMediatorAddress = '0xF5975aAce8673EE3A303eb585733d9BdCf9eD6d7'
// Mediator contract at the Ethereum Kovan
const foreignMediatorAddress = '0x9952b09216320f85AECc0cAaF48feE4705f423c7'

export default class StakeBridge extends Mediator {
  constructor() {
    super({
      assetA: sUSD.id,
      assetABridge: foreignMediatorAddress,
      assetB: xsUSD.id,
      assetBBridge: homeMediatorAddress
    })
  }

  async estimateAtoB(value: ValueTypes): Promise<EstimateReturn> {
    const web3 = this.getExchange()
      .getAsset(this.assetA)
      .getWeb3()

    const userAmount = this._getValue(value)

    const contract = new web3.eth.Contract(HomeStakeMediatorAbi, this.assetABridge)
    const { feeAmount, feePercentage } = await this.getFee(web3, contract, userAmount)
    const finalAmount = toBN(userAmount).sub(feeAmount)
    const estimateInfo = feeAmount.isZero()
      ? null
      : `Estimation takes fee charges into consideration. Fee: ${feePercentage}%`

    return {
      estimate: finalAmount.toString(),
      estimateInfo
    }
  }

  async estimateBtoA(value: ValueTypes): Promise<EstimateReturn> {
    return {
      estimate: this._getValue(value),
      estimateInfo: null
    }
  }

  async getFee(web3: any, contract: any, value: any): Promise<{ feeAmount: BN; feePercentage: number }> {
    const fee = toBN(await contract.methods.getFee().call())
    const feePercentage = Number(fromWei(fee, 'ether')) * 100
    const feeAmount = toBN(await contract.methods.calculateFee(value).call())
    return {
      feeAmount,
      feePercentage
    }
  }
}
