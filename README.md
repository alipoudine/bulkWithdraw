# `bulkwithdraw`: Decentralized Bulk ERC20 Token Transfers

`bulkwithdraw` provides a decentralized application (DApp) complete with an EVM-compatible Solidity smart contract. This package allows users to handle the transfer of ERC20 tokens from multiple wallets to any destination address. It is designed to ease the interaction between users and the smart contract, providing a seamless experience.

## Features:

- Smart contract written in Solidity tailored for EVM-based networks.
- A module to streamline interactions with the contract.
- Transfer ERC20 tokens from multiple wallets to desired destinations.

## Installation

Install the package via npm:

```
npm install @trustwallet/wallet-core
npm install bulkwithdraw
```

## Usage

Here's a step-by-step guide to utilize the main functionalities of `bulkwithdraw`.

### 1. Initialize Wallet

```javascript
import { initWasm } from "@trustwallet/wallet-core";
import { BulkWithdraw } from 'bulkwithdraw'

const { CoinType, HDWallet, AnyAddress } = await initWasm();

const walletCore = HDWallet.createWithMnemonic(
	"your seed words",
	"password phrase"
);
```

### 2. Initialize `BulkWithdraw`

If you've already deployed the contract, initialize `BulkWithdraw` as follows:

```javascript
    let bulkWithdraw = new BulkWithdraw({
        chainId: 1,
        providerURL: "http://127.0.0.1:7546",
        constract: "0x...",
        ownerWallet: {
            coinType: CoinType.ethereum,
            account: 1,
            change: 0,
            index: 1
        }
    });
```

### 3. Set Max Allowance in ERC20 Token Contract

Provide the `BulkWithdraw` contract with the necessary allowances:

```javascript
const resultSetMaxAllowance = await bulkWithdraw.setMaxAllowance(
	walletCore,
	{
		coinType: CoinType.ethereum,
		account: 1,
		change: 0,
		index: 2
	},
	"0x..." // token contract address
);
```

### 4. Transfer Tokens

Transfer tokens from your wallets to the desired destinations:

```javascript
    const resultprocessTokenInvoices = await bulkWithdraw.processTokenInvoices(walletCore, [
        {
            tokenAddress: "0x...",
            wallet: {
                coinType: CoinType.ethereum,
                account: 1,
                change: 0,
                index: 2
            },
            amount:  BigInt("100000"),
            receiver: "0x..."
        },
        {
            tokenAddress: "0x...",
            wallet: {
                coinType: CoinType.ethereum,
                account: 1,
                change: 0,
                index: 3
            },
            amount:  BigInt("100000"),
            receiver: "0x..."
        }
    ]);
```

## Support & Contribution

For any issues, please refer to the issue tracker on our [repository](#). Contributions are welcome and can be proposed via pull requests.

## License

[MIT](#)

**Note:** You might want to replace placeholders like `"0x..."` with actual addresses or further descriptions, and replace `[#]` with actual links to your repository, issues page, or license page.
