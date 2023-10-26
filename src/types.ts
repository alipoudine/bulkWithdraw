import { CoinType } from "./twcore";

export interface Wallet {
  coinType: CoinType;
  account: number;
  change: number;
  index: number;
}

export interface Config {
  chainId: number;
  providerURL: string;
  contract: string;
  ownerWallet: Wallet;
}

export interface CustomError {
  code: string;
  message: string;
}

export interface SendingInvoice {
  amount: bigint;
  receiver: string;
}

export interface TokenInvoiceParams {
  token: number;
  receiver: string;
  sender: string;
  amount: bigint;
}

export interface SendingTokenInvoice {
  wallet: Wallet;
  tokenAddress: string;
  amount: bigint;
  receiver: string;
}
