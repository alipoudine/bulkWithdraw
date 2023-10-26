import { initWasm } from "@trustwallet/wallet-core";
import { BaseContract, Signer } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { BulkWithdraw } from "./../src/index";
import dotenv from "dotenv";
import { SendingInvoice } from "../src/types";

dotenv.config();

// Contract test variables
const MAX_UINT256 = ethers.MaxUint256;
type Contracts = {
  [key: string]: {
    id: number;
    contract: BaseContract;
    total: string;
    amount: string;
    signer: Signer;
  };
};
let contracts: Contracts;
let receivers: Signer[];

// Module test variables
let bulkWithdraw: BulkWithdraw;
let walletCore;
let coinType;
let anyAddress;

/**
 * Deploys the BulkWithdraw contract using the provided signer and returns the deployed contract instance.
 * @param signer - The signer to use for deploying the contract.
 * @returns The deployed BulkWithdraw contract instance.
 */
async function deployBulkWithdraw(signer: Signer) {
  const BulkWithdraw = await ethers.getContractFactory("BulkWithdraw", signer);
  const bulkWithdraw = await BulkWithdraw.deploy();

  contracts.bulkWithdraw = {
    id: 0,
    contract: bulkWithdraw,
    total: "0",
    amount: "0",
    signer,
  };
}

/**
 * Deploys a new token contract and adds it to the bulkWithdraw contract also give approval to bulkWithdraw contract for test.
 * @param signer - The signer to use for the contract deployment and token approval.
 * @param name - The name of the token.
 * @param symbol - The symbol of the token.
 * @param total - The total supply of the token.
 * @param decimals - The number of decimal places for the token.
 * @param amount - The amount of the token to use for testing.
 */
async function deployToken(
  signer: Signer,
  name: string,
  symbol: string,
  total: string,
  decimals: number,
  amount: string
) {
  const Token = await ethers.getContractFactory("Token", signer);
  const token = await Token.deploy(name, symbol, total, decimals);

  let tx = await contracts.bulkWithdraw.contract
    .connect(contracts.bulkWithdraw.signer)
    .addToken(await token.getAddress());

  await token
    .connect(signer)
    .approve(
      await contracts.bulkWithdraw.contract.getAddress(),
      MAX_UINT256.toString()
    );

  const receipt = await tx.wait();

  contracts[symbol] = {
    id: parseInt(receipt.logs[0].args[0]),
    contract: token,
    total: total,
    amount: amount,
    signer,
  };
}

/**
 * Initializes the HDWallet with the given mnemonic and seed passphrase.
 * @returns {Promise<void>}
 */
async function initializeWalletCore() {
  const { CoinType, HDWallet, AnyAddress } = await initWasm();
  coinType = CoinType;
  anyAddress = AnyAddress;

  walletCore = HDWallet.createWithMnemonic(
    process.env.USER_WALLET_MNEMONIC ? process.env.USER_WALLET_MNEMONIC : "",
    process.env.USER_WALLET_SEED_PASSPHRASE
      ? process.env.USER_WALLET_SEED_PASSPHRASE
      : ""
  );
}

/**
 * Generates a Trust Wallet address for a given account, change and index.
 * @param account - The account number.
 * @param change - The change number.
 * @param index - The index number.
 * @returns The generated Trust Wallet address.
 */
function generateTrustWalletAddress(
  account: number,
  change: number,
  index: number
): string {
  let newPrv = walletCore.getDerivedKey(
    coinType.ethereum,
    account,
    change,
    index
  );
  let newPub = newPrv.getPublicKey(coinType.ethereum);
  let rawAddr = anyAddress.createWithPublicKey(newPub, coinType.ethereum);

  let address = rawAddr.description();
  return address;
}

/**
 * Returns a signer object for Ethereum using the provided account, change and index.
 * @param account - The account number.
 * @param change - The change number.
 * @param index - The index number.
 * @returns A signer object for Ethereum.
 */
function getEtherSigner(
  account: number,
  change: number,
  index: number
): Signer {
  let newPrv = walletCore.getDerivedKey(
    coinType.ethereum,
    account,
    change,
    index
  );
  let privateKey = "";
  newPrv.data().forEach((element: any) => {
    privateKey +=
      element.toString(16).length > 1
        ? element.toString(16)
        : "0" + element.toString(16);
  });

  let provider = new ethers.JsonRpcProvider(
    process.env.PROVIDER_URL ? process.env.PROVIDER_URL : ""
  );

  return new ethers.Wallet(privateKey, provider);
}

/**
 * Initializes the BulkWithdraw module with the provided configuration.
 * @returns {Promise<void>}
 */
async function initializeBulkWithdrawModule() {
  bulkWithdraw = new BulkWithdraw({
    chainId: process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 1,
    providerURL: process.env.PROVIDER_URL ? process.env.PROVIDER_URL : "",
    contract: await contracts.bulkWithdraw.contract.getAddress(),
    ownerWallet: {
      coinType: coinType.ethereum,
      account: process.env.USER_WALLET_ACCOUNT
        ? parseInt(process.env.USER_WALLET_ACCOUNT)
        : 1,
      change: process.env.USER_WALLET_CHANGE
        ? parseInt(process.env.USER_WALLET_CHANGE)
        : 0,
      index: process.env.USER_WALLET_INDEX
        ? parseInt(process.env.USER_WALLET_INDEX)
        : 1,
    },
  });
}

/**
 * Initializes the test environment by deploying contracts, creating wallets, and initializing the bulk withdraw module.
 * @returns {Promise<void>}
 */
async function initialize() {
  contracts = {};
  receivers = [];
  const [signer, signer1, signer2, signer3, signer4, signer5, signer6] =
    await ethers.getSigners();

  await initializeWalletCore();
  receivers = [signer5, signer6];

  const walletParams = {
    coinType: coinType.ethereum,
    account: process.env.USER_WALLET_ACCOUNT
      ? parseInt(process.env.USER_WALLET_ACCOUNT)
      : 1,
    change: process.env.USER_WALLET_CHANGE
      ? parseInt(process.env.USER_WALLET_CHANGE)
      : 0,
    index: process.env.USER_WALLET_INDEX
      ? parseInt(process.env.USER_WALLET_INDEX)
      : 1,
  };

  let address = generateTrustWalletAddress(
    walletParams.account,
    walletParams.change,
    walletParams.index
  );

  let hotwallet = getEtherSigner(
    walletParams.account,
    walletParams.change,
    walletParams.index
  );

  const tx = await signer.sendTransaction({
    to: address,
    value: ethers.parseEther("10").toString(),
  });
  await tx.wait();

  await deployBulkWithdraw(hotwallet);

  await deployToken(
    signer1,
    "Tether USD",
    "USDT",
    "10000000000000000",
    6,
    "10000000"
  );

  await deployToken(
    signer2,
    "USD Coin",
    "USDC",
    "10000000000000000",
    6,
    "10000000"
  );

  await deployToken(
    signer3,
    "Dai Stablecoin",
    "DAI",
    "10000000000000000000000000000",
    18,
    "10000000000000"
  );

  await deployToken(
    signer4,
    "Frax",
    "FRAX",
    "10000000000000000000000000000",
    18,
    "10000000000000"
  );

  await initializeBulkWithdrawModule();
}

describe("BulkWithdraw contract and module tests", () => {
  before(async () => {
    await initialize();
  });
  // bulkWithdraw contract tests
  describe("BulkWithdraw contract tests", () => {
    it("Should transfer ethers from contract to receivers successfully.", async function () {
      // save balance of receivers berfore ether bulk withdraw
      let receiver0_balance = (
        await receivers[0].provider?.getBalance(await receivers[0].getAddress())
      )?.toString();

      let receiver1_balance = (
        await receivers[1].provider?.getBalance(await receivers[1].getAddress())
      )?.toString();

      // send ethers to contract from owner wallet
      const tx = await contracts.bulkWithdraw.signer.sendTransaction({
        to: await contracts.bulkWithdraw.contract.getAddress(),
        value: ethers.parseEther("0.5").toString(),
      });
      await tx.wait();

      // call ether bulk Withdraw function
      /**
       * An array of objects containing the receiver's address and the amount to be transferred.
       * @typedef {Object} Params
       * @property {string} receiver - The address of the receiver.
       * @property {BigNumber} amount - The amount to be transferred.
       */

      /**
       * An array of Params objects.
       * @type {Params[]}
       */
      let params = [
        {
          receiver: await receivers[0].getAddress(),
          amount: ethers.parseEther("0.1"),
        },
        {
          receiver: await receivers[1].getAddress(),
          amount: ethers.parseEther("0.2"),
        },
      ];

      let bulktx = await contracts.bulkWithdraw.contract
        .connect(contracts.bulkWithdraw.signer)
        .etherBulkTransferAmounts(params, {
          nonce:
            await contracts.bulkWithdraw.signer.provider?.getTransactionCount(
              await contracts.bulkWithdraw.signer.getAddress(),
              "latest"
            ),
        });

      await expect(bulktx).not.to.be.reverted;

      // check receivers balance after ether bulk Withdraw
      let receiver0_current_bal = (
        await receivers[0].provider?.getBalance(await receivers[0].getAddress())
      )?.toString();
      const r0NewBalance: bigint = BigInt(
        receiver0_current_bal ? receiver0_current_bal : "0"
      );
      const r0CalcBalance: bigint =
        BigInt(ethers.parseEther("0.1").toString()) +
        BigInt(receiver0_balance ? receiver0_balance : "0");
      await expect(r0NewBalance).to.be.equal(r0CalcBalance);

      let receiver1_current_bal = (
        await receivers[1].provider?.getBalance(await receivers[1].getAddress())
      )?.toString();
      const r1NewBalance: bigint = BigInt(
        receiver1_current_bal ? receiver1_current_bal : "0"
      );
      const r1CalcBalance: bigint =
        BigInt(ethers.parseEther("0.2").toString()) +
        BigInt(receiver1_balance ? receiver1_balance : "0");
      await expect(r1NewBalance).to.be.equal(r1CalcBalance);
    });

    it("Should transfer tokens from wallet to receivers successfully.", async function () {
      // generate input params of erc20BulkWithdraw function
      let params = [];
      for (let key in contracts) {
        if (key != "bulkWithdraw") {
          params.push({
            token: contracts[key].id,
            receiver: await receivers[0].getAddress(),
            sender: await contracts[key].signer.getAddress(),
            amount: contracts[key].amount,
          });
        }
      }

      // call erc20BulkWithdraw function
      let bulkTokentx = await contracts.bulkWithdraw.contract
        .connect(contracts.bulkWithdraw.signer)
        .erc20sMultiOriginBulkTransferAmounts(params);

      await expect(bulkTokentx).not.to.be.reverted;

      // validate receivers balance after erc20 bulk withdraw
      for (let key in contracts) {
        if (key != "bulkWithdraw") {
          await expect(
            (
              await contracts[key].contract
                .connect(receivers[0])
                .balanceOf(await receivers[0].getAddress())
            ).toString()
          ).to.be.equal(contracts[key].amount);
        }
      }
    });
  });

  // bulkWithdraw module tests
  describe("BulkWithdraw module tests", () => {
    describe("checkTokenExistInContract", () => {
      it("should return true if the token exists in the contract", async () => {
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const result = await bulkWithdraw.checkTokenExistInContract(
          tokenAddress
        );
        expect(result).to.be.true;
      });

      it("should return false if the token does not exist in the contract", async () => {
        const tokenAddress = ethers.ZeroAddress;
        const result = await bulkWithdraw.checkTokenExistInContract(
          tokenAddress
        );
        expect(result).to.be.false;
      });

      it("checks if a token exists in the contract", async () => {
        /**
         * Checks if a token exists in a contract.
         * @param {string} contractAddress - The address of the contract to check.
         * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the token exists in the contract.
         */
        const exists = await bulkWithdraw.checkTokenExistInContract(
          await contracts["USDT"].contract.getAddress()
        );
        expect(exists).to.be.equal(true);
      });

      it("should return error if token does not exist in contract", async function () {
        const invoice = {
          tokenAddress: await contracts.USDT.signer.getAddress(),
          wallet: {
            coinType: coinType.ethereum,
            account: 1,
            change: 0,
            index: 1,
          },
          amount: ethers.parseEther("1"),
          receiver: await receivers[0].getAddress(),
        };

        const result = await bulkWithdraw.processTokenInvoices(walletCore, [
          invoice,
        ]);
        expect(result[0].code).to.equal("TOKEN_NOT_IN_CONTRACT");
      });
    });

    describe("checkWalletAllowance", () => {
      it("should return true if the wallet has enough allowance for the contract to withdraw the given amount of tokens", async () => {
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const amount = BigInt(1000000000000000000);
        const result = await bulkWithdraw.checkWalletAllowance(
          await contracts["USDT"].signer.getAddress(),
          tokenAddress,
          amount
        );
        expect(result).to.be.true;
      });

      it("should return false if the wallet does not have enough allowance for the contract to withdraw the given amount of tokens", async () => {
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const amount = BigInt(100000000000000000000);
        const result = await bulkWithdraw.checkWalletAllowance(
          await contracts["USDC"].signer.getAddress(),
          tokenAddress,
          amount
        );
        expect(result).to.be.false;
      });

      it("checks wallet allowance for a token", async () => {
        const walletAddress = await contracts["USDT"].signer.getAddress();
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const amount = ethers.parseUnits("1000");
        /**
         * Checks if the wallet has sufficient allowance for the given token and amount.
         * @param walletAddress The address of the wallet to check allowance for.
         * @param tokenAddress The address of the token to check allowance for.
         * @param amount The amount of tokens to check allowance for.
         * @returns A Promise that resolves to a boolean indicating whether the wallet has sufficient allowance or not.
         */
        const sufficientAllowance = await bulkWithdraw.checkWalletAllowance(
          walletAddress,
          tokenAddress,
          amount
        );
        expect(sufficientAllowance).to.be.equal(true);
      });
    });

    describe("checkWalletTokenBalance", () => {
      it("should return true if the wallet has enough balance of the given token", async () => {
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const amount = BigInt(1000);
        const result = await bulkWithdraw.checkWalletTokenBalance(
          await contracts["USDT"].signer.getAddress(),
          tokenAddress,
          amount
        );
        expect(result).to.be.true;
      });

      it("should return false if the wallet does not have enough balance of the given token", async () => {
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const amount = BigInt(100000000000000000000);
        const result = await bulkWithdraw.checkWalletTokenBalance(
          await contracts["USDT"].signer.getAddress(),
          tokenAddress,
          amount
        );
        expect(result).to.be.false;
      });

      it("checks wallet token balance", async () => {
        const walletAddress = await contracts["USDT"].signer.getAddress();
        const tokenAddress = await contracts["USDT"].contract.getAddress();
        const amount = ethers.parseUnits("0.000001");
        /**
         * Checks if the wallet has sufficient balance to withdraw the specified amount of tokens.
         * @param walletAddress - The address of the wallet to check the balance of.
         * @param tokenAddress - The address of the token to withdraw.
         * @param amount - The amount of tokens to withdraw.
         * @returns A Promise that resolves to a boolean indicating whether the wallet has sufficient balance.
         */
        const sufficientBalance = await bulkWithdraw.checkWalletTokenBalance(
          walletAddress,
          tokenAddress,
          amount
        );
        expect(sufficientBalance).to.be.equal(true);
      });
    });

    describe("setMaxAllowance", () => {
      it("should set the maximum allowance", async function () {
        const walletParams = {
          coinType: coinType.ethereum,
          account: 1,
          change: 0,
          index: 1,
        };

        let address = generateTrustWalletAddress(
          walletParams.account,
          walletParams.change,
          walletParams.index
        );

        const tx = await contracts.bulkWithdraw.signer.sendTransaction({
          to: address,
          value: ethers.parseEther("0.5").toString(),
        });
        await tx.wait();

        await bulkWithdraw.setMaxAllowance(
          walletCore,
          walletParams,
          await contracts["USDT"].contract.getAddress()
        );

        /**
         * Checks if the wallet has sufficient allowance for a given token and amount.
         * @param {string} address - The address of the wallet to check.
         * @param {string} tokenAddress - The address of the token to check allowance for.
         * @param {bigint} amount - The amount of tokens to check allowance for.
         * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the wallet has sufficient allowance.
         */
        const sufficientAllowance = await bulkWithdraw.checkWalletAllowance(
          address,
          await contracts["USDT"].contract.getAddress(),
          1000000n
        );

        expect(sufficientAllowance).to.be.equal(true);
      });
    });

    describe("processInvoices", () => {
      it("should process the given invoices by sending the specified amount of Ether to the contract and then send them to receivers", async () => {
        let receiver0_balance = (
          await receivers[0].provider?.getBalance(
            await receivers[0].getAddress()
          )
        )?.toString();

        const sendingInvoices: SendingInvoice[] = [
          {
            amount: ethers.parseEther("0.1"),
            receiver: await receivers[0].getAddress(),
          },
        ];
        await bulkWithdraw.processInvoices(
          walletCore,
          ethers.parseEther("0.1"),
          sendingInvoices
        );

        let receiver0_current_bal = (
          await receivers[0].provider?.getBalance(
            await receivers[0].getAddress()
          )
        )?.toString();
        const r0NewBalance: bigint = BigInt(
          receiver0_current_bal ? receiver0_current_bal : "0"
        );
        const r0CalcBalance: bigint =
          BigInt(ethers.parseEther("0.1").toString()) +
          BigInt(receiver0_balance ? receiver0_balance : "0");
        await expect(r0NewBalance).to.be.equal(r0CalcBalance);
      });

      it("should process invoice without errors when all conditions are met", async function () {
        const sendAmount: bigint = BigInt("100000");

        const walletParams = {
          coinType: coinType.ethereum,
          account: 1,
          change: 0,
          index: 7,
        };

        let address = generateTrustWalletAddress(
          walletParams.account,
          walletParams.change,
          walletParams.index
        );

        const tx = await contracts.bulkWithdraw.signer.sendTransaction({
          to: address,
          value: ethers.parseEther("0.5").toString(),
        });
        await tx.wait();

        const transferTx = await contracts.USDT.contract
          .connect(contracts.USDT.signer)
          .transfer(address, "1000000");
        await transferTx.wait();

        /**
         * Defines an invoice object with the necessary information for a bulk withdrawal.
         * @typedef {Object} Invoice
         * @property {string} tokenAddress - The address of the token to be withdrawn.
         * @property {Object} wallet - The wallet parameters for the withdrawal.
         * @property {number} amount - The amount of tokens to be withdrawn.
         * @property {string} receiver - The address of the receiver wallet for the withdrawal.
         */
        const invoice = {
          tokenAddress: await contracts.USDT.contract.getAddress(),
          wallet: walletParams,
          amount: sendAmount,
          receiver: await receivers[0].getAddress(),
        };

        await bulkWithdraw.setMaxAllowance(
          walletCore,
          walletParams,
          await contracts.USDT.contract.getAddress()
        );

        const result = await bulkWithdraw.processTokenInvoices(walletCore, [
          invoice,
        ]);
        expect(result.length).to.be.equal(0);
      });

      it("should process invoices without errors when all conditions are met", async function () {
        const sendAmount: bigint = BigInt("100000");

        const walletParams1 = {
          coinType: coinType.ethereum,
          account: 1,
          change: 0,
          index: 8,
        };

        const walletParams2 = {
          coinType: coinType.ethereum,
          account: 1,
          change: 0,
          index: 9,
        };

        let address1 = generateTrustWalletAddress(
          walletParams1.account,
          walletParams1.change,
          walletParams1.index
        );

        let address2 = generateTrustWalletAddress(
          walletParams2.account,
          walletParams2.change,
          walletParams2.index
        );

        const tx1 = await contracts.bulkWithdraw.signer.sendTransaction({
          to: address1,
          value: ethers.parseEther("0.5").toString(),
        });
        await tx1.wait();

        const tx2 = await contracts.bulkWithdraw.signer.sendTransaction({
          to: address2,
          value: ethers.parseEther("0.5").toString(),
        });
        await tx2.wait();

        const transferTx1 = await contracts.USDT.contract
          .connect(contracts.USDT.signer)
          .transfer(address1, "1000000");
        await transferTx1.wait();

        const transferTx2 = await contracts.USDC.contract
          .connect(contracts.USDC.signer)
          .transfer(address2, "1000000");
        await transferTx2.wait();

        /**
         * Defines an invoice object with the following properties:
         * @param {string} tokenAddress - The address of the token to be withdrawn.
         * @param {WalletParams} wallet - The wallet parameters for the withdrawal.
         * @param {number} amount - The amount of tokens to be withdrawn.
         * @param {string} receiver - The address of the receiver wallet.
         */
        const invoice1 = {
          tokenAddress: await contracts.USDT.contract.getAddress(),
          wallet: walletParams1,
          amount: sendAmount,
          receiver: await receivers[0].getAddress(),
        };

        const invoice2 = {
          tokenAddress: await contracts.USDC.contract.getAddress(),
          wallet: walletParams2,
          amount: sendAmount,
          receiver: await receivers[1].getAddress(),
        };

        await bulkWithdraw.setMaxAllowance(
          walletCore,
          walletParams1,
          await contracts.USDT.contract.getAddress()
        );

        await bulkWithdraw.setMaxAllowance(
          walletCore,
          walletParams2,
          await contracts.USDC.contract.getAddress()
        );

        const result = await bulkWithdraw.processTokenInvoices(walletCore, [
          invoice1,
          invoice2,
        ]);
        expect(result.length).to.be.equal(0);
      });
    });
  });
});
