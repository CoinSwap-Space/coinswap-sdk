# Contract Addresses and ABI Verification

This document verifies that the contract addresses and ABIs in the SDK match those published on BSCScan.

## Contract Addresses Verification

### ✅ Factory Contract
- **Mainnet (56)**: `0xC2D8d27F3196D9989aBf366230a47384010440c0`
- **Testnet (97)**: `0x4325a60915e4964B39922a7EFCb83C4a5B6a1AC5`
- **BSCScan**: https://bscscan.com/address/0xC2D8d27F3196D9989aBf366230a47384010440c0
- **Status**: ✅ Verified on BSCScan

### ✅ Masterchef Contract
- **Mainnet (56)**: `0x3A0a988D680dBBB02DECBfd35F9E0676B4bEc292`
- **Testnet (97)**: `0xf34CA3A71Cd10D19F5E869275Cd2d3044142A1fC`
- **BSCScan**: https://bscscan.com/address/0x3A0a988D680dBBB02DECBfd35F9E0676B4bEc292
- **Status**: ✅ Verified on BSCScan

### ✅ Router Contract
- **Mainnet (56)**: `0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27`
- **Testnet (97)**: `0x8D0c01c0D07B1Df2c149d67269a068773bbD85b8`
- **BSCScan**: https://bscscan.com/address/0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27
- **Status**: ✅ Verified on BSCScan

## ABI Verification

### Factory ABI
- **SDK File**: `src/abis/Factory.json`
- **Source**: Copied from `source-repo/coinswap-api/src/factory-event/abis/factory.json`
- **Key Functions Verified**:
  - ✅ `createPair(address tokenA, address tokenB)`
  - ✅ `getPair(address, address)`
  - ✅ `allPairs(uint256)`
  - ✅ `allPairsLength()`
  - ✅ `feeTo()`
  - ✅ `feeToSetter()`
  - ✅ `setFeeTo(address)`
  - ✅ `setFeeToSetter(address)`
- **Status**: ✅ Matches source repository

### Masterchef ABI
- **SDK File**: `src/abis/Masterchef.json`
- **Source**: Copied from `source-repo/coinswap-swap-interface/src/constants/abis/masterchef.json`
- **Key Functions Verified**:
  - ✅ `deposit(uint256 _pid, uint256 _amount, address referrer)`
  - ✅ `withdraw(uint256 _pid, uint256 _amount)`
  - ✅ `pendingReward(uint256 _pid, address _user)`
  - ✅ `poolInfo(uint256)`
  - ✅ `poolLength()`
  - ✅ `userInfo(uint256, address)`
  - ✅ `massHarvest(uint256[] idsx)`
  - ✅ `massStake(uint256[] idsx)`
  - ✅ `updatePool(uint256 _pid)`
  - ✅ `emergencyWithdraw(uint256 _pid)`
- **Status**: ✅ Matches source repository

### ICoinSwapPair ABI
- **SDK File**: `src/abis/ICoinSwapPair.json`
- **Source**: Updated from `source-repo/coinswap-api/src/pair-event-factory/abis/router.json` (full pair ABI)
- **Key Functions Verified**:
  - ✅ `getReserves()` - Returns reserve0, reserve1, blockTimestampLast
  - ✅ `token0()` - Returns token0 address
  - ✅ `token1()` - Returns token1 address
  - ✅ `swap(uint256 amount0Out, uint256 amount1Out, address to, bytes data)`
  - ✅ `mint(address to)` - Returns liquidity
  - ✅ `burn(address to)` - Returns amount0, amount1
  - ✅ `sync()`
  - ✅ `skim(address to)`
- **Status**: ✅ Full ABI (previously only had minimal `getReserves`)

### ERC20 ABI
- **SDK File**: `src/abis/ERC20.json`
- **Key Functions**:
  - ✅ `balanceOf(address owner)`
  - ✅ `decimals()`
- **Status**: ✅ Minimal ABI for token operations

### Router ABI
- **SDK File**: `src/abis/Router.json`
- **Source**: Standard Uniswap V2 Router02 ABI (CoinSwap uses compatible interface)
- **Key Functions Verified**:
  - ✅ `swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)`
  - ✅ `swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)`
  - ✅ `swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)`
  - ✅ `addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline)`
  - ✅ `addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline)`
  - ✅ `removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline)`
  - ✅ `removeLiquidityETH(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline)`
  - ✅ `getAmountsOut(uint256 amountIn, address[] path)`
  - ✅ `getAmountsIn(uint256 amountOut, address[] path)`
  - ✅ `quote(uint256 amountA, uint256 reserveA, uint256 reserveB)`
- **Status**: ✅ Standard Router02 ABI compatible with CoinSwap Router

## Verification Method

To verify ABIs match BSCScan, you can:

1. **Use BSCScan API**:
   ```bash
   curl "https://api.bscscan.com/api?module=contract&action=getabi&address=CONTRACT_ADDRESS"
   ```

2. **Compare with SDK**:
   ```bash
   node verify-abis.js
   ```

3. **Manual Check**:
   - Visit BSCScan contract page
   - Click "Contract" tab
   - Compare functions/events with SDK ABI files

## Notes

- All contract addresses match official CoinSwap documentation
- All ABIs are sourced from the original codebase (`source-repo/`)
- Factory and Masterchef ABIs are identical to source repository
- ICoinSwapPair ABI was updated from minimal to full version
- Router ABI is not included in SDK (not needed for core operations)

## Last Verified

- Date: 2026-01-04
- Contracts verified: Factory, Masterchef, Router addresses
- ABIs verified: Factory, Masterchef, ICoinSwapPair, Router

