import { Interface } from '@ethersproject/abi'
import { abi as ERC20_ABI } from '@coinswap-libs/periphery/build/BEP20.json'
import ERC20_BYTES32_ABI from './erc20_bytes32.json'

const ERC20_INTERFACE = new Interface(ERC20_ABI)

export default ERC20_INTERFACE
export { ERC20_ABI, ERC20_BYTES32_ABI }
