import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 56,
  BSCTESTNET = 97
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// Contract addresses by chain
export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xC2D8d27F3196D9989aBf366230a47384010440c0',
  [ChainId.BSCTESTNET]: '0x4325a60915e4964B39922a7EFCb83C4a5B6a1AC5'
}

export const MASTERCHEF_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x3A0a988D680dBBB02DECBfd35F9E0676B4bEc292',
  [ChainId.BSCTESTNET]: '0xf34CA3A71Cd10D19F5E869275Cd2d3044142A1fC'
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27',
  [ChainId.BSCTESTNET]: '0x8D0c01c0D07B1Df2c149d67269a068773bbD85b8'
}

// Legacy export for backward compatibility (uses MAINNET by default)
export const FACTORY_ADDRESS_LEGACY = FACTORY_ADDRESS[ChainId.MAINNET]

export const INIT_CODE_HASH = '0x2e3f108b8526ff1faa4d526bb84210fc5a2bfc5aad2f62207d7964554a5d029d'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _998 = JSBI.BigInt(998)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
