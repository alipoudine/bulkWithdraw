import { Signer, ethers } from "ethers";
import {
  Config,
  Wallet,
  CustomError,
  SendingTokenInvoice,
  SendingInvoice,
} from "./types";
import fs from "fs";
import path from "path";
import { HDWallet } from "./twcore";

const ERC20Path = path.resolve(
  __dirname,
  "./../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"
);
const ERC20 = JSON.parse(fs.readFileSync(ERC20Path, "utf8"));

const BulkWithdrawPath = path.resolve(
  __dirname,
  "./../artifacts/contracts/BulkWithdraw.sol/BulkWithdraw.json"
);

const BULKWITHDRAW = JSON.parse(fs.readFileSync(BulkWithdrawPath, "utf8"));

const MAX_UINT256 = ethers.MaxUint256;

/**
 * Represents a class for bulk withdrawing ERC20 tokens from a contract.
 */
export class BulkWithdraw {
  /**
   * The configuration object for the contract and provider details.
   */
  private config: Config;

  /**
   * The ethers provider object for interacting with the blockchain.
   */
  private provider: ethers.Provider;

  /**
   * The ethers contract object for interacting with the contract.
   */
  private contract: ethers.Contract;

  /**
   * Creates an instance of BulkWithdraw.
   * @param config - The configuration object for the contract and provider details.
   */
  constructor(config: Config) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(this.config.providerURL);
    this.contract = new ethers.Contract(
      this.config.contract,
      BULKWITHDRAW.abi,
      this.provider
    );
  }

  /**
   * Deploys the contract and initializes the BulkWithdraw module.
   * @param config - The configuration object.
   * @param hdWallet - The HD wallet object.
   * @param gasPrice - The gas price.
   * @param gasLimit - The gas limit.
   * @returns A Promise that resolves with a new instance of the BulkWithdraw module.
   * @throws An error if the contract deployment and module initialization fails.
   */
  static async deployContractAndInitialize(
    config: Config,
    hdWallet: HDWallet,
    gasPrice: string,
    gasLimit: string
  ): Promise<BulkWithdraw> {
    const provider = new ethers.JsonRpcProvider(config.providerURL);

    let newPrv = hdWallet.getDerivedKey(
      config.ownerWallet.coinType,
      config.ownerWallet.account,
      config.ownerWallet.change,
      config.ownerWallet.index
    );
    let privateKey = "";
    newPrv.data().forEach((element: any) => {
      privateKey +=
        element.toString(16).length > 1
          ? element.toString(16)
          : "0" + element.toString(16);
    });

    let wallet = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(
      BULKWITHDRAW.abi,
      BULKWITHDRAW.bytecode,
      wallet
    );
    const deployTx = await factory.getDeployTransaction({
      gasPrice: gasPrice,
      gasLimit: gasLimit,
    });

    const tx = await wallet.sendTransaction(deployTx);

    const receipt = await tx.wait();

    if (receipt && receipt.contractAddress) {
      return new BulkWithdraw({
        chainId: config.chainId,
        ownerWallet: config.ownerWallet,
        providerURL: config.providerURL,
        contract: config.contract,
      });
    }
    throw new Error("Failed to deploy contract and initialize module");
  }

  /**
   * Checks if the given token address exists in the contract.
   * @param tokenAddress - The address of the ERC20 token to check.
   * @returns A boolean indicating if the token exists in the contract.
   */
  async checkTokenExistInContract(tokenAddress: string): Promise<boolean> {
    const tokenId = await this.contract.getTokenByAddress(tokenAddress);
    if (tokenId) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the wallet has enough allowance for the contract to withdraw the given amount of tokens.
   * @param walletAddress - The address of the wallet to check.
   * @param tokenAddress - The address of the ERC20 token to check.
   * @param amount - The amount of tokens to check.
   * @returns A boolean indicating if the wallet has enough allowance for the contract to withdraw the given amount of tokens.
   */
  async checkWalletAllowance(
    walletAddress: string,
    tokenAddress: string,
    amount: bigint
  ): Promise<boolean> {
    const erc20Contract = new ethers.Contract(
      tokenAddress,
      ERC20.abi,
      this.provider
    );
    const allowance = await erc20Contract.allowance(
      walletAddress,
      this.config.contract
    );
    return allowance > amount;
  }

  /**
   * Checks if the wallet has enough balance of the given token.
   * @param walletAddress - The address of the wallet to check.
   * @param tokenAddress - The address of the ERC20 token to check.
   * @param amount - The amount of tokens to check.
   * @returns A boolean indicating if the wallet has enough balance of the given token.
   */
  async checkWalletTokenBalance(
    walletAddress: string,
    tokenAddress: string,
    amount: bigint
  ): Promise<boolean> {
    const erc20Contract = new ethers.Contract(
      tokenAddress,
      ERC20.abi,
      this.provider
    );
    const balance = await erc20Contract.balanceOf(walletAddress);
    return balance > amount;
  }

  /**
   * Sets the maximum allowance for the contract to withdraw the given token from the wallet.
   * @param hdWallet - The HDWallet object for signing the transaction.
   * @param walletParams - The wallet parameters object for the wallet to set the allowance for.
   * @param tokenAddress - The address of the ERC20 token to set the allowance for.
   */
  async setMaxAllowance(
    hdWallet: HDWallet,
    walletParams: Wallet,
    tokenAddress: string
  ): Promise<void> {
    const signer = this.getEtherSigner(hdWallet, walletParams);
    const erc20Contract = new ethers.Contract(
      tokenAddress,
      ERC20.abi,
      this.provider
    ).connect(signer);
    const transaction = await erc20Contract.approve(
      this.config.contract,
      MAX_UINT256
    );
    await transaction.wait();
  }

  /**
   * Processes the given invoices by sending the specified amount of Ether to the contract and then
   * calling the `etherBulkTransferAmounts` function on the contract instance.
   * @param hdWallet - The HD wallet to use for signing the transaction.
   * @param amount - The amount of Ether to send to the contract.
   * @param sendingInvoices - An array of `SendingInvoice` objects to pass to the `etherBulkTransferAmounts` function.
   */
  async processInvoices(
    hdWallet: HDWallet,
    amount: bigint,
    sendingInvoices: SendingInvoice[]
  ) {
    const signer = this.getEtherSigner(hdWallet, this.config.ownerWallet);

    // Sum the invoice amounts
    let totalAmount = BigInt(0);
    for (const invoice of sendingInvoices) {
      totalAmount += invoice.amount;
    }

    // Check if the total amount is greater than the contract balance plus the amount parameter
    const contractBalance = await this.provider.getBalance(
      this.config.contract
    );
    if (totalAmount > contractBalance + amount) {
      throw new Error("Insufficient funds in contract to process invoices");
    }

    // if(amount > BigInt(0)) {
    //   const tx = await signer.sendTransaction({
    //     to: this.config.contract,
    //     value: amount,
    //   });
    //   await tx.wait();
    // }

    let contractInstance = await this.contract.connect(signer);
    await contractInstance.etherBulkTransferAmounts(sendingInvoices, {
      value: amount,
      nonce: await this.provider.getTransactionCount(
        await signer.getAddress(),
        "latest"
      ),
    });
  }

  /**
   * Processes the given sending invoices and withdraws the tokens from the wallets to the receiver addresses.
   * @param hdWallet - The HDWallet object for signing the transaction.
   * @param sendingTokenInvoices - The array of sending invoices to process.
   * @returns An array of custom errors encountered during the processing of the sending invoices.
   */
  async processTokenInvoices(
    hdWallet: HDWallet,
    sendingTokenInvoices: SendingTokenInvoice[]
  ): Promise<CustomError[]> {
    const errors: CustomError[] = [];
    let invoices = [];

    for (const invoice of sendingTokenInvoices) {
      // generate wallet address from trust wallet core: invoice.wallet.address
      const sender = this.getEtherSigner(hdWallet, invoice.wallet);

      // 1. Check ERC20 token of each sending invoice exists in BulkWithdrawContract
      if (!(await this.checkTokenExistInContract(invoice.tokenAddress))) {
        errors.push({
          code: "TOKEN_NOT_IN_CONTRACT",
          message: `Token ${invoice.tokenAddress} is not in the contract.`,
        });
        continue;
      }

      // 2. Compare wallet token balance with requested amount of token to be sent
      if (
        !(await this.checkWalletTokenBalance(
          await sender.getAddress(),
          invoice.tokenAddress,
          invoice.amount
        ))
      ) {
        errors.push({
          code: "INSUFFICIENT_BALANCE",
          message: `Insufficient balance in wallet ${invoice.wallet.account} for token ${invoice.tokenAddress}.`,
        });
      }

      // 3. Check wallet allowance to withdrawer contract
      if (
        !(await this.checkWalletAllowance(
          await sender.getAddress(),
          invoice.tokenAddress,
          invoice.amount
        ))
      ) {
        errors.push({
          code: "INSUFFICIENT_ALLOWANCE",
          message: `Insufficient allowance for wallet ${invoice.wallet.account} to contract.`,
        });
      }

      invoices.push({
        token: await this.contract.getTokenByAddress(invoice.tokenAddress),
        sender: await sender.getAddress(),
        receiver: invoice.receiver,
        amount: invoice.amount,
      });
    }

    // 4. All the validation must be done, if there was any error, send them back in the requested format.
    if (errors.length > 0) {
      return errors;
    }

    const signer = this.getEtherSigner(hdWallet, this.config.ownerWallet);
    let contractInstance = await this.contract.connect(signer);
    await contractInstance.erc20sMultiOriginBulkTransferAmounts(invoices);

    return errors;
  }

  /**
   * Gets the ethers signer object for the given HDWallet and wallet parameters.
   * @param hdWallet - The HDWallet object for signing the transaction.
   * @param wallet - The wallet parameters object for the wallet to get the signer for.
   * @returns The ethers signer object for the given HDWallet and wallet parameters.
   */
  getEtherSigner(hdWallet: HDWallet, wallet: Wallet): Signer {
    let newPrv = hdWallet.getDerivedKey(
      wallet.coinType,
      wallet.account,
      wallet.change,
      wallet.index
    );
    let privateKey = "";
    newPrv.data().forEach((element: any) => {
      privateKey +=
        element.toString(16).length > 1
          ? element.toString(16)
          : "0" + element.toString(16);
    });

    return new ethers.Wallet(privateKey, this.provider);
  }
}
