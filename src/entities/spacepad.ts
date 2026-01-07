export interface Tier {
  tier: number
  tierAllocation: number
  requiredPower?: number
}

export interface SpaceRound {
  round: number
  tiers: Tier[]
  ratioToCapToken: number
  hideCounter?: boolean
  finalResult?: number
  declarationStartBlock: number
  declarationEndBlock: number
  participationStartBlock: number
  participationEndBlock: number
}

export interface SpacePad {
  sponsored?: boolean
  fullProjectName: string
  shortProjectName: string
  projectSymbol: string
  rounds: SpaceRound[]
}

export interface RequiredField {
  name: string
  requiredValue: string | number | number[]
}

export enum RequiredFieldType {
  EMAIL = 'email',
  CHAIN_ID = 'chainId',
  WALLET = 'wallet'
}



