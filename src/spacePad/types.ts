export interface Address {
  97?: string;
  56: string;
}

export interface Tier {
  tier: number;
  tierSoftCap: number;
  tierHardCap: number;
  tierAllocation: number;
  walletCap: number;
  tierWallet: Address;
  minWalletCap?: number;
  maxWalletCap?: number;
}

export interface SpacePad {
  fullProjectName: string;
  shortProjectName: string;
  projectSymbol: string;
  // BNB or capToken address
  capToken: 'BNB' | string;
  rounds: SpaceRound[];
  sponsored?: boolean;
  private?: boolean;
  contractAddress?: string;
  extensions?: RequiredField[];
  skipWhitelist?: boolean;
}
export interface SpaceRound {
  roundDesc: string;
  round: number;
  ratioToCapToken: number;
  collectedFunds?: number;
  finalResult?: number;
  tiers: Tier[];
  declarationStartBlock: number;
  declarationEndBlock: number;
  participationStartBlock: number;
  participationEndBlock: number;
  hideCounter?: boolean;
}

export enum RequiredFieldType {
  EMAIL = 'email',
  NUMBER = 'number',
  TEXT = 'text',
  BOOLEAN = 'boolean',
  URL = 'url'
}

export interface RequiredField {
  [key: string]: string;
  type: RequiredFieldType;
  requiredValue?: any;
  additionalInfo?: string;
}
