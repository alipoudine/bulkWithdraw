import { CoinType, PrivateKey, StoredKeyEncryption } from "../wallet-core";
export declare enum WalletType {
    Mnemonic = "mnemonic",
    PrivateKey = "privateKey",
    WatchOnly = "watchOnly",
    Hardware = "hardware"
}
export declare enum Error {
    WalletNotFound = "wallet not found",
    AccountNotFound = "account not found",
    InvalidPassword = "invalid password",
    InvalidMnemonic = "invalid mnemonic",
    InvalidJSON = "invalid JSON",
    InvalidKey = "invalid key"
}
export interface ActiveAccount {
    address: string;
    coin: number;
    publicKey: string;
    derivationPath: string;
    extendedPublicKey?: string;
}
export interface Wallet {
    id: string;
    type: WalletType;
    name: string;
    version: number;
    activeAccounts: ActiveAccount[];
}
export interface IKeyStore {
    hasWallet(id: string): Promise<boolean>;
    load(id: string): Promise<Wallet>;
    loadAll(): Promise<Wallet[]>;
    import(mnemonic: string, name: string, password: string, coins: CoinType[], encryption: StoredKeyEncryption): Promise<Wallet>;
    importKey(key: Uint8Array, name: string, password: string, coin: CoinType, encryption: StoredKeyEncryption): Promise<Wallet>;
    importWallet(wallet: Wallet): Promise<void>;
    addAccounts(id: string, password: string, coins: CoinType[]): Promise<Wallet>;
    getKey(id: string, password: string, account: ActiveAccount): Promise<PrivateKey>;
    delete(id: string, password: string): Promise<void>;
    export(id: string, password: string): Promise<string | Uint8Array>;
}
export interface IStorage {
    get(id: string): Promise<Wallet>;
    set(id: string, wallet: Wallet): Promise<void>;
    loadAll(): Promise<Wallet[]>;
    delete(id: string, password: string): Promise<void>;
}
