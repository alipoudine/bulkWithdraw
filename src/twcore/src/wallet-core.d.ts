// Copyright © 2017-2023 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.
//
// This is a GENERATED FILE, changes made here WILL BE LOST.
//
export class AnySigner {
    static sign(data: Uint8Array | Buffer, coin: CoinType): Uint8Array;
    static plan(data: Uint8Array | Buffer, coin: CoinType): Uint8Array;
    static supportsJSON(coin: CoinType): boolean;
}
export namespace HexCoding {
    export function decode(hex: string): Uint8Array;
    export function encode(buffer: Uint8Array | Buffer): string;
}
// Copyright © 2017-2023 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.

export class BitcoinSigHashTypeExt {
    static isSingle(type: BitcoinSigHashType): boolean;
    static isNone(type: BitcoinSigHashType): boolean;
}

export class CoinTypeExt {
    static blockchain(coin: CoinType): Blockchain;
    static purpose(coin: CoinType): Purpose;
    static curve(coin: CoinType): Curve;
    static xpubVersion(coin: CoinType): HDVersion;
    static xprvVersion(coin: CoinType): HDVersion;
    static hrp(coin: CoinType): HRP;
    static p2pkhPrefix(coin: CoinType): number;
    static p2shPrefix(coin: CoinType): number;
    static staticPrefix(coin: CoinType): number;
    static chainId(coin: CoinType): string;
    static slip44Id(coin: CoinType): number;
    static ss58Prefix(coin: CoinType): number;
    static publicKeyType(coin: CoinType): PublicKeyType;
    static validate(coin: CoinType, address: string): boolean;
    static derivationPath(coin: CoinType): string;
    static derivationPathWithDerivation(coin: CoinType, derivation: Derivation): string;
    static deriveAddress(coin: CoinType, privateKey: PrivateKey): string;
    static deriveAddressFromPublicKey(coin: CoinType, publicKey: PublicKey): string;
}

export class HDVersionExt {
    static isPublic(version: HDVersion): boolean;
    static isPrivate(version: HDVersion): boolean;
}
export class AES {
    static encryptCBC(key: Uint8Array | Buffer, data: Uint8Array | Buffer, iv: Uint8Array | Buffer, mode: AESPaddingMode): Uint8Array;
    static decryptCBC(key: Uint8Array | Buffer, data: Uint8Array | Buffer, iv: Uint8Array | Buffer, mode: AESPaddingMode): Uint8Array;
    static encryptCTR(key: Uint8Array | Buffer, data: Uint8Array | Buffer, iv: Uint8Array | Buffer): Uint8Array;
    static decryptCTR(key: Uint8Array | Buffer, data: Uint8Array | Buffer, iv: Uint8Array | Buffer): Uint8Array;
}
export class AESPaddingMode {
    value: number;
    static zero: AESPaddingMode;
    static pkcs7: AESPaddingMode;
}
export class Account {
    static create(address: string, coin: CoinType, derivation: Derivation, derivationPath: string, publicKey: string, extendedPublicKey: string): Account;
    address(): string;
    coin(): CoinType;
    derivation(): Derivation;
    derivationPath(): string;
    publicKey(): string;
    extendedPublicKey(): string;
    delete(): void;
}
export class AnyAddress {
    static equal(lhs: AnyAddress, rhs: AnyAddress): boolean;
    static isValid(string: string, coin: CoinType): boolean;
    static isValidBech32(string: string, coin: CoinType, hrp: string): boolean;
    static isValidSS58(string: string, coin: CoinType, ss58Prefix: number): boolean;
    static createWithString(string: string, coin: CoinType): AnyAddress;
    static createBech32(string: string, coin: CoinType, hrp: string): AnyAddress;
    static createSS58(string: string, coin: CoinType, ss58Prefix: number): AnyAddress;
    static createWithPublicKey(publicKey: PublicKey, coin: CoinType): AnyAddress;
    static createWithPublicKeyDerivation(publicKey: PublicKey, coin: CoinType, derivation: Derivation): AnyAddress;
    static createBech32WithPublicKey(publicKey: PublicKey, coin: CoinType, hrp: string): AnyAddress;
    static createSS58WithPublicKey(publicKey: PublicKey, coin: CoinType, ss58Prefix: number): AnyAddress;
    static createWithPublicKeyFilecoinAddressType(publicKey: PublicKey, filecoinAddressType: FilecoinAddressType): AnyAddress;
    description(): string;
    coin(): CoinType;
    data(): Uint8Array;
    delete(): void;
}
export class AsnParser {
    static ecdsaSignatureFromDer(encoded: Uint8Array | Buffer): Uint8Array;
}
export class Barz {
    static getCounterfactualAddress(input: Uint8Array | Buffer): string;
    static getInitCode(factory: string, publicKey: PublicKey, verificationFacet: string, salt: number): Uint8Array;
    static getFormattedSignature(signature: Uint8Array | Buffer, challenge: Uint8Array | Buffer, authenticatorData: Uint8Array | Buffer, clientDataJSON: string): Uint8Array;
}
export class Base32 {
    static decodeWithAlphabet(string: string, alphabet: string): Uint8Array;
    static decode(string: string): Uint8Array;
    static encodeWithAlphabet(data: Uint8Array | Buffer, alphabet: string): string;
    static encode(data: Uint8Array | Buffer): string;
}
export class Base58 {
    static encode(data: Uint8Array | Buffer): string;
    static encodeNoCheck(data: Uint8Array | Buffer): string;
    static decode(string: string): Uint8Array;
    static decodeNoCheck(string: string): Uint8Array;
}
export class Base64 {
    static decode(string: string): Uint8Array;
    static decodeUrl(string: string): Uint8Array;
    static encode(data: Uint8Array | Buffer): string;
    static encodeUrl(data: Uint8Array | Buffer): string;
}
export class BitcoinAddress {
    static equal(lhs: BitcoinAddress, rhs: BitcoinAddress): boolean;
    static isValid(data: Uint8Array | Buffer): boolean;
    static isValidString(string: string): boolean;
    static createWithString(string: string): BitcoinAddress;
    static createWithData(data: Uint8Array | Buffer): BitcoinAddress;
    static createWithPublicKey(publicKey: PublicKey, prefix: number): BitcoinAddress;
    description(): string;
    prefix(): number;
    keyhash(): Uint8Array;
    delete(): void;
}
export class BitcoinFee {
    static calculateFee(data: Uint8Array | Buffer, satVb: string): string;
}
export class BitcoinMessageSigner {
    static signMessage(privateKey: PrivateKey, address: string, message: string): string;
    static verifyMessage(address: string, message: string, signature: string): boolean;
}
export class BitcoinScript {
    static equal(lhs: BitcoinScript, rhs: BitcoinScript): boolean;
    static buildPayToPublicKey(pubkey: Uint8Array | Buffer): BitcoinScript;
    static buildPayToPublicKeyHash(hash: Uint8Array | Buffer): BitcoinScript;
    static buildPayToScriptHash(scriptHash: Uint8Array | Buffer): BitcoinScript;
    static buildPayToWitnessPubkeyHash(hash: Uint8Array | Buffer): BitcoinScript;
    static buildPayToWitnessScriptHash(scriptHash: Uint8Array | Buffer): BitcoinScript;
    static buildBRC20InscribeTransfer(ticker: string, amount: string, pubkey: Uint8Array | Buffer): Uint8Array;
    static buildOrdinalNftInscription(mimeType: string, payload: Uint8Array | Buffer, pubkey: Uint8Array | Buffer): Uint8Array;
    static lockScriptForAddress(address: string, coin: CoinType): BitcoinScript;
    static lockScriptForAddressReplay(address: string, coin: CoinType, blockHash: Uint8Array | Buffer, blockHeight: number): BitcoinScript;
    static hashTypeForCoin(coinType: CoinType): number;
    static create(): BitcoinScript;
    static createWithData(data: Uint8Array | Buffer): BitcoinScript;
    static createCopy(script: BitcoinScript): BitcoinScript;
    size(): number;
    data(): Uint8Array;
    scriptHash(): Uint8Array;
    isPayToScriptHash(): boolean;
    isPayToWitnessScriptHash(): boolean;
    isPayToWitnessPublicKeyHash(): boolean;
    isWitnessProgram(): boolean;
    matchPayToPubkey(): Uint8Array;
    matchPayToPubkeyHash(): Uint8Array;
    matchPayToScriptHash(): Uint8Array;
    matchPayToWitnessPublicKeyHash(): Uint8Array;
    matchPayToWitnessScriptHash(): Uint8Array;
    encode(): Uint8Array;
    delete(): void;
}
export class BitcoinSigHashType {
    value: number;
    static all: BitcoinSigHashType;
    static none: BitcoinSigHashType;
    static single: BitcoinSigHashType;
    static fork: BitcoinSigHashType;
    static forkBTG: BitcoinSigHashType;
}
export class Blockchain {
    value: number;
    static bitcoin: Blockchain;
    static ethereum: Blockchain;
    static vechain: Blockchain;
    static tron: Blockchain;
    static icon: Blockchain;
    static binance: Blockchain;
    static ripple: Blockchain;
    static tezos: Blockchain;
    static nimiq: Blockchain;
    static stellar: Blockchain;
    static aion: Blockchain;
    static cosmos: Blockchain;
    static theta: Blockchain;
    static ontology: Blockchain;
    static zilliqa: Blockchain;
    static ioTeX: Blockchain;
    static eos: Blockchain;
    static nano: Blockchain;
    static nuls: Blockchain;
    static waves: Blockchain;
    static aeternity: Blockchain;
    static nebulas: Blockchain;
    static fio: Blockchain;
    static solana: Blockchain;
    static harmony: Blockchain;
    static near: Blockchain;
    static algorand: Blockchain;
    static iost: Blockchain;
    static polkadot: Blockchain;
    static cardano: Blockchain;
    static neo: Blockchain;
    static filecoin: Blockchain;
    static multiversX: Blockchain;
    static oasisNetwork: Blockchain;
    static decred: Blockchain;
    static zcash: Blockchain;
    static groestlcoin: Blockchain;
    static thorchain: Blockchain;
    static ronin: Blockchain;
    static kusama: Blockchain;
    static zen: Blockchain;
    static bitcoinDiamond: Blockchain;
    static verge: Blockchain;
    static nervos: Blockchain;
    static everscale: Blockchain;
    static aptos: Blockchain;
    static nebl: Blockchain;
    static hedera: Blockchain;
    static theOpenNetwork: Blockchain;
    static sui: Blockchain;
}
export class Cardano {
    static minAdaAmount(tokenBundle: Uint8Array | Buffer): number;
    static outputMinAdaAmount(toAddress: string, tokenBundle: Uint8Array | Buffer, coinsPerUtxoByte: string): string;
    static getStakingAddress(baseAddress: string): string;
    static getByronAddress(publicKey: PublicKey): string;
}
export class CoinType {
    value: number;
    static aeternity: CoinType;
    static aion: CoinType;
    static binance: CoinType;
    static bitcoin: CoinType;
    static bitcoinCash: CoinType;
    static bitcoinGold: CoinType;
    static callisto: CoinType;
    static cardano: CoinType;
    static cosmos: CoinType;
    static pivx: CoinType;
    static dash: CoinType;
    static decred: CoinType;
    static digiByte: CoinType;
    static dogecoin: CoinType;
    static eos: CoinType;
    static wax: CoinType;
    static ethereum: CoinType;
    static ethereumClassic: CoinType;
    static fio: CoinType;
    static goChain: CoinType;
    static groestlcoin: CoinType;
    static icon: CoinType;
    static ioTeX: CoinType;
    static kava: CoinType;
    static kin: CoinType;
    static litecoin: CoinType;
    static monacoin: CoinType;
    static nebulas: CoinType;
    static nuls: CoinType;
    static nano: CoinType;
    static near: CoinType;
    static nimiq: CoinType;
    static ontology: CoinType;
    static poanetwork: CoinType;
    static qtum: CoinType;
    static xrp: CoinType;
    static solana: CoinType;
    static stellar: CoinType;
    static tezos: CoinType;
    static theta: CoinType;
    static thunderCore: CoinType;
    static neo: CoinType;
    static tomoChain: CoinType;
    static tron: CoinType;
    static veChain: CoinType;
    static viacoin: CoinType;
    static wanchain: CoinType;
    static zcash: CoinType;
    static firo: CoinType;
    static zilliqa: CoinType;
    static zelcash: CoinType;
    static ravencoin: CoinType;
    static waves: CoinType;
    static terra: CoinType;
    static terraV2: CoinType;
    static harmony: CoinType;
    static algorand: CoinType;
    static kusama: CoinType;
    static polkadot: CoinType;
    static filecoin: CoinType;
    static multiversX: CoinType;
    static bandChain: CoinType;
    static smartChainLegacy: CoinType;
    static smartChain: CoinType;
    static tbinance: CoinType;
    static oasis: CoinType;
    static polygon: CoinType;
    static thorchain: CoinType;
    static bluzelle: CoinType;
    static optimism: CoinType;
    static zksync: CoinType;
    static arbitrum: CoinType;
    static ecochain: CoinType;
    static avalancheCChain: CoinType;
    static xdai: CoinType;
    static fantom: CoinType;
    static cryptoOrg: CoinType;
    static celo: CoinType;
    static ronin: CoinType;
    static osmosis: CoinType;
    static ecash: CoinType;
    static iost: CoinType;
    static cronosChain: CoinType;
    static smartBitcoinCash: CoinType;
    static kuCoinCommunityChain: CoinType;
    static bitcoinDiamond: CoinType;
    static boba: CoinType;
    static syscoin: CoinType;
    static verge: CoinType;
    static zen: CoinType;
    static metis: CoinType;
    static aurora: CoinType;
    static evmos: CoinType;
    static nativeEvmos: CoinType;
    static moonriver: CoinType;
    static moonbeam: CoinType;
    static kavaEvm: CoinType;
    static klaytn: CoinType;
    static meter: CoinType;
    static okxchain: CoinType;
    static stratis: CoinType;
    static komodo: CoinType;
    static nervos: CoinType;
    static everscale: CoinType;
    static aptos: CoinType;
    static nebl: CoinType;
    static hedera: CoinType;
    static secret: CoinType;
    static nativeInjective: CoinType;
    static agoric: CoinType;
    static ton: CoinType;
    static sui: CoinType;
    static stargaze: CoinType;
    static polygonzkEVM: CoinType;
    static juno: CoinType;
    static stride: CoinType;
    static axelar: CoinType;
    static crescent: CoinType;
    static kujira: CoinType;
    static ioTeXEVM: CoinType;
    static nativeCanto: CoinType;
    static comdex: CoinType;
    static neutron: CoinType;
    static sommelier: CoinType;
    static fetchAI: CoinType;
    static mars: CoinType;
    static umee: CoinType;
    static coreum: CoinType;
    static quasar: CoinType;
    static persistence: CoinType;
    static akash: CoinType;
    static noble: CoinType;
    static scroll: CoinType;
    static rootstock: CoinType;
    static thetaFuel: CoinType;
    static confluxeSpace: CoinType;
    static acala: CoinType;
    static acalaEVM: CoinType;
    static opBNB: CoinType;
    static neon: CoinType;
    static base: CoinType;
    static sei: CoinType;
    static linea: CoinType;
}
export class CoinTypeConfiguration {
    static getSymbol(type: CoinType): string;
    static getDecimals(type: CoinType): number;
    static getTransactionURL(type: CoinType, transactionID: string): string;
    static getAccountURL(type: CoinType, accountID: string): string;
    static getID(type: CoinType): string;
    static getName(type: CoinType): string;
}
export class Curve {
    value: number;
    static secp256k1: Curve;
    static ed25519: Curve;
    static ed25519Blake2bNano: Curve;
    static curve25519: Curve;
    static nist256p1: Curve;
    static ed25519ExtendedCardano: Curve;
    static starkex: Curve;
}

declare function describeCurve(value: Curve): string;

export class DataVector {
    static create(): DataVector;
    static createWithData(data: Uint8Array | Buffer): DataVector;
    size(): number;
    add(data: Uint8Array | Buffer): void;
    get(index: number): Uint8Array;
    delete(): void;
}
export class Derivation {
    value: number;
    static default: Derivation;
    static custom: Derivation;
    static bitcoinSegwit: Derivation;
    static bitcoinLegacy: Derivation;
    static bitcoinTestnet: Derivation;
    static litecoinLegacy: Derivation;
    static solanaSolana: Derivation;
}
export class DerivationPath {
    static create(purpose: Purpose, coin: number, account: number, change: number, address: number): DerivationPath;
    static createWithString(string: string): DerivationPath;
    purpose(): Purpose;
    coin(): number;
    account(): number;
    change(): number;
    address(): number;
    description(): string;
    indexAt(index: number): DerivationPathIndex;
    indicesCount(): number;
    delete(): void;
}
export class DerivationPathIndex {
    static create(value: number, hardened: boolean): DerivationPathIndex;
    value(): number;
    hardened(): boolean;
    description(): string;
    delete(): void;
}
export class Ethereum {
    static eip2645GetPath(ethAddress: string, layer: string, application: string, index: string): string;
}
export class EthereumAbi {
    static encode(fn: EthereumAbiFunction): Uint8Array;
    static decodeOutput(fn: EthereumAbiFunction, encoded: Uint8Array | Buffer): boolean;
    static decodeCall(data: Uint8Array | Buffer, abi: string): string;
    static encodeTyped(messageJson: string): Uint8Array;
}
export class EthereumAbiFunction {
    static createWithString(name: string): EthereumAbiFunction;
    getType(): string;
    addParamUInt8(val: number, isOutput: boolean): number;
    addParamUInt16(val: number, isOutput: boolean): number;
    addParamUInt32(val: number, isOutput: boolean): number;
    addParamUInt64(val: number, isOutput: boolean): number;
    addParamUInt256(val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamUIntN(bits: number, val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamInt8(val: number, isOutput: boolean): number;
    addParamInt16(val: number, isOutput: boolean): number;
    addParamInt32(val: number, isOutput: boolean): number;
    addParamInt64(val: number, isOutput: boolean): number;
    addParamInt256(val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamIntN(bits: number, val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamBool(val: boolean, isOutput: boolean): number;
    addParamString(val: string, isOutput: boolean): number;
    addParamAddress(val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamBytes(val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamBytesFix(size: number, val: Uint8Array | Buffer, isOutput: boolean): number;
    addParamArray(isOutput: boolean): number;
    getParamUInt8(idx: number, isOutput: boolean): number;
    getParamUInt64(idx: number, isOutput: boolean): number;
    getParamUInt256(idx: number, isOutput: boolean): Uint8Array;
    getParamBool(idx: number, isOutput: boolean): boolean;
    getParamString(idx: number, isOutput: boolean): string;
    getParamAddress(idx: number, isOutput: boolean): Uint8Array;
    addInArrayParamUInt8(arrayIdx: number, val: number): number;
    addInArrayParamUInt16(arrayIdx: number, val: number): number;
    addInArrayParamUInt32(arrayIdx: number, val: number): number;
    addInArrayParamUInt64(arrayIdx: number, val: number): number;
    addInArrayParamUInt256(arrayIdx: number, val: Uint8Array | Buffer): number;
    addInArrayParamUIntN(arrayIdx: number, bits: number, val: Uint8Array | Buffer): number;
    addInArrayParamInt8(arrayIdx: number, val: number): number;
    addInArrayParamInt16(arrayIdx: number, val: number): number;
    addInArrayParamInt32(arrayIdx: number, val: number): number;
    addInArrayParamInt64(arrayIdx: number, val: number): number;
    addInArrayParamInt256(arrayIdx: number, val: Uint8Array | Buffer): number;
    addInArrayParamIntN(arrayIdx: number, bits: number, val: Uint8Array | Buffer): number;
    addInArrayParamBool(arrayIdx: number, val: boolean): number;
    addInArrayParamString(arrayIdx: number, val: string): number;
    addInArrayParamAddress(arrayIdx: number, val: Uint8Array | Buffer): number;
    addInArrayParamBytes(arrayIdx: number, val: Uint8Array | Buffer): number;
    addInArrayParamBytesFix(arrayIdx: number, size: number, val: Uint8Array | Buffer): number;
    delete(): void;
}
export class EthereumAbiValue {
    static encodeBool(value: boolean): Uint8Array;
    static encodeInt32(value: number): Uint8Array;
    static encodeUInt32(value: number): Uint8Array;
    static encodeInt256(value: Uint8Array | Buffer): Uint8Array;
    static encodeUInt256(value: Uint8Array | Buffer): Uint8Array;
    static encodeAddress(value: Uint8Array | Buffer): Uint8Array;
    static encodeString(value: string): Uint8Array;
    static encodeBytes(value: Uint8Array | Buffer): Uint8Array;
    static encodeBytesDyn(value: Uint8Array | Buffer): Uint8Array;
    static decodeUInt256(input: Uint8Array | Buffer): string;
    static decodeValue(input: Uint8Array | Buffer, type: string): string;
    static decodeArray(input: Uint8Array | Buffer, type: string): string;
}
export class EthereumChainID {
    value: number;
    static ethereum: EthereumChainID;
    static classic: EthereumChainID;
    static rootstock: EthereumChainID;
    static poa: EthereumChainID;
    static opbnb: EthereumChainID;
    static tfuelevm: EthereumChainID;
    static vechain: EthereumChainID;
    static callisto: EthereumChainID;
    static tomochain: EthereumChainID;
    static polygon: EthereumChainID;
    static okc: EthereumChainID;
    static thundertoken: EthereumChainID;
    static cfxevm: EthereumChainID;
    static gochain: EthereumChainID;
    static base: EthereumChainID;
    static meter: EthereumChainID;
    static celo: EthereumChainID;
    static linea: EthereumChainID;
    static scroll: EthereumChainID;
    static wanchain: EthereumChainID;
    static cronos: EthereumChainID;
    static optimism: EthereumChainID;
    static xdai: EthereumChainID;
    static smartbch: EthereumChainID;
    static fantom: EthereumChainID;
    static boba: EthereumChainID;
    static kcc: EthereumChainID;
    static zksync: EthereumChainID;
    static heco: EthereumChainID;
    static acalaevm: EthereumChainID;
    static metis: EthereumChainID;
    static polygonzkevm: EthereumChainID;
    static moonbeam: EthereumChainID;
    static moonriver: EthereumChainID;
    static ronin: EthereumChainID;
    static kavaevm: EthereumChainID;
    static iotexevm: EthereumChainID;
    static klaytn: EthereumChainID;
    static avalanchec: EthereumChainID;
    static evmos: EthereumChainID;
    static arbitrum: EthereumChainID;
    static smartchain: EthereumChainID;
    static neon: EthereumChainID;
    static aurora: EthereumChainID;
}
export class EthereumMessageSigner {
    static signTypedMessage(privateKey: PrivateKey, messageJson: string): string;
    static signTypedMessageEip155(privateKey: PrivateKey, messageJson: string, chainId: number): string;
    static signMessage(privateKey: PrivateKey, message: string): string;
    static signMessageImmutableX(privateKey: PrivateKey, message: string): string;
    static signMessageEip155(privateKey: PrivateKey, message: string, chainId: number): string;
    static verifyMessage(pubKey: PublicKey, message: string, signature: string): boolean;
}
export class FIOAccount {
    static createWithString(string: string): FIOAccount;
    description(): string;
    delete(): void;
}
export class FilecoinAddressConverter {
    static convertToEthereum(filecoinAddress: string): string;
    static convertFromEthereum(ethAddress: string): string;
}
export class FilecoinAddressType {
    value: number;
    static default: FilecoinAddressType;
    static delegated: FilecoinAddressType;
}
export class GroestlcoinAddress {
    static equal(lhs: GroestlcoinAddress, rhs: GroestlcoinAddress): boolean;
    static isValidString(string: string): boolean;
    static createWithString(string: string): GroestlcoinAddress;
    static createWithPublicKey(publicKey: PublicKey, prefix: number): GroestlcoinAddress;
    description(): string;
    delete(): void;
}
export class HDVersion {
    value: number;
    static none: HDVersion;
    static xpub: HDVersion;
    static xprv: HDVersion;
    static ypub: HDVersion;
    static yprv: HDVersion;
    static zpub: HDVersion;
    static zprv: HDVersion;
    static vpub: HDVersion;
    static vprv: HDVersion;
    static tpub: HDVersion;
    static tprv: HDVersion;
    static ltub: HDVersion;
    static ltpv: HDVersion;
    static mtub: HDVersion;
    static mtpv: HDVersion;
    static ttub: HDVersion;
    static ttpv: HDVersion;
    static dpub: HDVersion;
    static dprv: HDVersion;
    static dgub: HDVersion;
    static dgpv: HDVersion;
}
export class HDWallet {
    static getPublicKeyFromExtended(extended: string, coin: CoinType, derivationPath: string): PublicKey;
    static create(strength: number, passphrase: string): HDWallet;
    static createWithMnemonic(mnemonic: string, passphrase: string): HDWallet;
    static createWithMnemonicCheck(mnemonic: string, passphrase: string, check: boolean): HDWallet;
    static createWithEntropy(entropy: Uint8Array | Buffer, passphrase: string): HDWallet;
    seed(): Uint8Array;
    mnemonic(): string;
    entropy(): Uint8Array;
    getMasterKey(curve: Curve): PrivateKey;
    getKeyForCoin(coin: CoinType): PrivateKey;
    getAddressForCoin(coin: CoinType): string;
    getAddressDerivation(coin: CoinType, derivation: Derivation): string;
    getKey(coin: CoinType, derivationPath: string): PrivateKey;
    getKeyDerivation(coin: CoinType, derivation: Derivation): PrivateKey;
    getKeyByCurve(curve: Curve, derivationPath: string): PrivateKey;
    getDerivedKey(coin: CoinType, account: number, change: number, address: number): PrivateKey;
    getExtendedPrivateKey(purpose: Purpose, coin: CoinType, version: HDVersion): string;
    getExtendedPublicKey(purpose: Purpose, coin: CoinType, version: HDVersion): string;
    getExtendedPrivateKeyAccount(purpose: Purpose, coin: CoinType, derivation: Derivation, version: HDVersion, account: number): string;
    getExtendedPublicKeyAccount(purpose: Purpose, coin: CoinType, derivation: Derivation, version: HDVersion, account: number): string;
    getExtendedPrivateKeyDerivation(purpose: Purpose, coin: CoinType, derivation: Derivation, version: HDVersion): string;
    getExtendedPublicKeyDerivation(purpose: Purpose, coin: CoinType, derivation: Derivation, version: HDVersion): string;
    delete(): void;
}
export class HRP {
    value: number;
    static unknown: HRP;
    static bitcoin: HRP;
    static litecoin: HRP;
    static viacoin: HRP;
    static groestlcoin: HRP;
    static digiByte: HRP;
    static monacoin: HRP;
    static syscoin: HRP;
    static verge: HRP;
    static cosmos: HRP;
    static bitcoinCash: HRP;
    static bitcoinGold: HRP;
    static ioTeX: HRP;
    static nervos: HRP;
    static zilliqa: HRP;
    static terra: HRP;
    static cryptoOrg: HRP;
    static kava: HRP;
    static oasis: HRP;
    static bluzelle: HRP;
    static bandChain: HRP;
    static multiversX: HRP;
    static secret: HRP;
    static agoric: HRP;
    static binance: HRP;
    static ecash: HRP;
    static thorchain: HRP;
    static bitcoinDiamond: HRP;
    static harmony: HRP;
    static cardano: HRP;
    static qtum: HRP;
    static stratis: HRP;
    static nativeInjective: HRP;
    static osmosis: HRP;
    static terraV2: HRP;
    static coreum: HRP;
    static nativeCanto: HRP;
    static sommelier: HRP;
    static fetchAI: HRP;
    static mars: HRP;
    static umee: HRP;
    static quasar: HRP;
    static persistence: HRP;
    static akash: HRP;
    static noble: HRP;
    static sei: HRP;
    static stargaze: HRP;
    static nativeEvmos: HRP;
    static juno: HRP;
    static tbinance: HRP;
    static stride: HRP;
    static axelar: HRP;
    static crescent: HRP;
    static kujira: HRP;
    static comdex: HRP;
    static neutron: HRP;
}

declare function describeHRP(value: HRP): string;

export class Hash {
    static sha1(data: Uint8Array | Buffer): Uint8Array;
    static sha256(data: Uint8Array | Buffer): Uint8Array;
    static sha512(data: Uint8Array | Buffer): Uint8Array;
    static sha512_256(data: Uint8Array | Buffer): Uint8Array;
    static keccak256(data: Uint8Array | Buffer): Uint8Array;
    static keccak512(data: Uint8Array | Buffer): Uint8Array;
    static sha3_256(data: Uint8Array | Buffer): Uint8Array;
    static sha3_512(data: Uint8Array | Buffer): Uint8Array;
    static ripemd(data: Uint8Array | Buffer): Uint8Array;
    static blake256(data: Uint8Array | Buffer): Uint8Array;
    static blake2b(data: Uint8Array | Buffer, size: number): Uint8Array;
    static blake2bPersonal(data: Uint8Array | Buffer, personal: Uint8Array | Buffer, outlen: number): Uint8Array;
    static groestl512(data: Uint8Array | Buffer): Uint8Array;
    static sha256SHA256(data: Uint8Array | Buffer): Uint8Array;
    static sha256RIPEMD(data: Uint8Array | Buffer): Uint8Array;
    static sha3_256RIPEMD(data: Uint8Array | Buffer): Uint8Array;
    static blake256Blake256(data: Uint8Array | Buffer): Uint8Array;
    static blake256RIPEMD(data: Uint8Array | Buffer): Uint8Array;
    static groestl512Groestl512(data: Uint8Array | Buffer): Uint8Array;
}
export class LiquidStaking {
    static buildRequest(input: Uint8Array | Buffer): Uint8Array;
}
export class Mnemonic {
    static isValid(mnemonic: string): boolean;
    static isValidWord(word: string): boolean;
    static suggest(prefix: string): string;
}
export class NEARAccount {
    static createWithString(string: string): NEARAccount;
    description(): string;
    delete(): void;
}
export class NervosAddress {
    static equal(lhs: NervosAddress, rhs: NervosAddress): boolean;
    static isValidString(string: string): boolean;
    static createWithString(string: string): NervosAddress;
    description(): string;
    codeHash(): Uint8Array;
    hashType(): string;
    args(): Uint8Array;
    delete(): void;
}
export class PBKDF2 {
    static hmacSha256(password: Uint8Array | Buffer, salt: Uint8Array | Buffer, iterations: number, dkLen: number): Uint8Array;
    static hmacSha512(password: Uint8Array | Buffer, salt: Uint8Array | Buffer, iterations: number, dkLen: number): Uint8Array;
}
export class PrivateKey {
    static isValid(data: Uint8Array | Buffer, curve: Curve): boolean;
    static create(): PrivateKey;
    static createWithData(data: Uint8Array | Buffer): PrivateKey;
    static createCopy(key: PrivateKey): PrivateKey;
    data(): Uint8Array;
    getPublicKey(coinType: CoinType): PublicKey;
    getPublicKeyByType(pubkeyType: PublicKeyType): PublicKey;
    getPublicKeySecp256k1(compressed: boolean): PublicKey;
    getPublicKeyNist256p1(): PublicKey;
    getPublicKeyEd25519(): PublicKey;
    getPublicKeyEd25519Blake2b(): PublicKey;
    getPublicKeyEd25519Cardano(): PublicKey;
    getPublicKeyCurve25519(): PublicKey;
    getSharedKey(publicKey: PublicKey, curve: Curve): Uint8Array;
    sign(digest: Uint8Array | Buffer, curve: Curve): Uint8Array;
    signAsDER(digest: Uint8Array | Buffer): Uint8Array;
    signZilliqaSchnorr(message: Uint8Array | Buffer): Uint8Array;
    delete(): void;
}
export class PrivateKeyType {
    value: number;
    static default: PrivateKeyType;
    static cardano: PrivateKeyType;
}
export class PublicKey {
    static isValid(data: Uint8Array | Buffer, type: PublicKeyType): boolean;
    static recover(signature: Uint8Array | Buffer, message: Uint8Array | Buffer): PublicKey;
    static createWithData(data: Uint8Array | Buffer, type: PublicKeyType): PublicKey;
    isCompressed(): boolean;
    compressed(): PublicKey;
    uncompressed(): PublicKey;
    data(): Uint8Array;
    keyType(): PublicKeyType;
    description(): string;
    verify(signature: Uint8Array | Buffer, message: Uint8Array | Buffer): boolean;
    verifyAsDER(signature: Uint8Array | Buffer, message: Uint8Array | Buffer): boolean;
    verifyZilliqaSchnorr(signature: Uint8Array | Buffer, message: Uint8Array | Buffer): boolean;
    delete(): void;
}
export class PublicKeyType {
    value: number;
    static secp256k1: PublicKeyType;
    static secp256k1Extended: PublicKeyType;
    static nist256p1: PublicKeyType;
    static nist256p1Extended: PublicKeyType;
    static ed25519: PublicKeyType;
    static ed25519Blake2b: PublicKeyType;
    static curve25519: PublicKeyType;
    static ed25519Cardano: PublicKeyType;
    static starkex: PublicKeyType;
}
export class Purpose {
    value: number;
    static bip44: Purpose;
    static bip49: Purpose;
    static bip84: Purpose;
    static bip1852: Purpose;
}
export class RippleXAddress {
    static equal(lhs: RippleXAddress, rhs: RippleXAddress): boolean;
    static isValidString(string: string): boolean;
    static createWithString(string: string): RippleXAddress;
    static createWithPublicKey(publicKey: PublicKey, tag: number): RippleXAddress;
    description(): string;
    tag(): number;
    delete(): void;
}
export class SS58AddressType {
    value: number;
    static polkadot: SS58AddressType;
    static kusama: SS58AddressType;
}
export class SegwitAddress {
    static equal(lhs: SegwitAddress, rhs: SegwitAddress): boolean;
    static isValidString(string: string): boolean;
    static createWithString(string: string): SegwitAddress;
    static createWithPublicKey(hrp: HRP, publicKey: PublicKey): SegwitAddress;
    description(): string;
    hrp(): HRP;
    witnessVersion(): number;
    witnessProgram(): Uint8Array;
    delete(): void;
}
export class SolanaAddress {
    static createWithString(string: string): SolanaAddress;
    description(): string;
    defaultTokenAddress(tokenMintAddress: string): string;
    delete(): void;
}
export class StarkExMessageSigner {
    static signMessage(privateKey: PrivateKey, message: string): string;
    static verifyMessage(pubKey: PublicKey, message: string, signature: string): boolean;
}
export class StarkWare {
    static getStarkKeyFromSignature(derivationPath: DerivationPath, signature: string): PrivateKey;
}
export class StellarMemoType {
    value: number;
    static none: StellarMemoType;
    static text: StellarMemoType;
    static id: StellarMemoType;
    static hash: StellarMemoType;
    static return: StellarMemoType;
}
export class StellarPassphrase {
    value: number;
    static stellar: StellarPassphrase;
    static kin: StellarPassphrase;
}

declare function describeStellarPassphrase(value: StellarPassphrase): string;

export class StellarVersionByte {
    value: number;
    static accountID: StellarVersionByte;
    static seed: StellarVersionByte;
    static preAuthTX: StellarVersionByte;
    static sha256Hash: StellarVersionByte;
}
export class StoredKey {
    static load(path: string): StoredKey;
    static importPrivateKey(privateKey: Uint8Array | Buffer, name: string, password: Uint8Array | Buffer, coin: CoinType): StoredKey;
    static importPrivateKeyWithEncryption(privateKey: Uint8Array | Buffer, name: string, password: Uint8Array | Buffer, coin: CoinType, encryption: StoredKeyEncryption): StoredKey;
    static importHDWallet(mnemonic: string, name: string, password: Uint8Array | Buffer, coin: CoinType): StoredKey;
    static importHDWalletWithEncryption(mnemonic: string, name: string, password: Uint8Array | Buffer, coin: CoinType, encryption: StoredKeyEncryption): StoredKey;
    static importJSON(json: Uint8Array | Buffer): StoredKey;
    static createLevel(name: string, password: Uint8Array | Buffer, encryptionLevel: StoredKeyEncryptionLevel): StoredKey;
    static createLevelAndEncryption(name: string, password: Uint8Array | Buffer, encryptionLevel: StoredKeyEncryptionLevel, encryption: StoredKeyEncryption): StoredKey;
    static create(name: string, password: Uint8Array | Buffer): StoredKey;
    static createEncryption(name: string, password: Uint8Array | Buffer, encryption: StoredKeyEncryption): StoredKey;
    identifier(): string;
    name(): string;
    isMnemonic(): boolean;
    accountCount(): number;
    encryptionParameters(): string;
    account(index: number): Account;
    accountForCoin(coin: CoinType, wallet: HDWallet): Account;
    accountForCoinDerivation(coin: CoinType, derivation: Derivation, wallet: HDWallet): Account;
    addAccountDerivation(address: string, coin: CoinType, derivation: Derivation, derivationPath: string, publicKey: string, extendedPublicKey: string): void;
    addAccount(address: string, coin: CoinType, derivationPath: string, publicKey: string, extendedPublicKey: string): void;
    removeAccountForCoin(coin: CoinType): void;
    removeAccountForCoinDerivation(coin: CoinType, derivation: Derivation): void;
    removeAccountForCoinDerivationPath(coin: CoinType, derivationPath: string): void;
    store(path: string): boolean;
    decryptPrivateKey(password: Uint8Array | Buffer): Uint8Array;
    decryptMnemonic(password: Uint8Array | Buffer): string;
    privateKey(coin: CoinType, password: Uint8Array | Buffer): PrivateKey;
    wallet(password: Uint8Array | Buffer): HDWallet;
    exportJSON(): Uint8Array;
    fixAddresses(password: Uint8Array | Buffer): boolean;
    delete(): void;
}
export class StoredKeyEncryption {
    value: number;
    static aes128Ctr: StoredKeyEncryption;
    static aes128Cbc: StoredKeyEncryption;
    static aes192Ctr: StoredKeyEncryption;
    static aes256Ctr: StoredKeyEncryption;
}
export class StoredKeyEncryptionLevel {
    value: number;
    static default: StoredKeyEncryptionLevel;
    static minimal: StoredKeyEncryptionLevel;
    static weak: StoredKeyEncryptionLevel;
    static standard: StoredKeyEncryptionLevel;
}
export class THORChainSwap {
    static buildSwap(input: Uint8Array | Buffer): Uint8Array;
}
export class TezosMessageSigner {
    static formatMessage(message: string, url: string): string;
    static inputToPayload(message: string): string;
    static signMessage(privateKey: PrivateKey, message: string): string;
    static verifyMessage(pubKey: PublicKey, message: string, signature: string): boolean;
}
export class TransactionCompiler {
    static buildInput(coinType: CoinType, from: string, to: string, amount: string, asset: string, memo: string, chainId: string): Uint8Array;
    static preImageHashes(coinType: CoinType, txInputData: Uint8Array | Buffer): Uint8Array;
    static compileWithSignatures(coinType: CoinType, txInputData: Uint8Array | Buffer, signatures: DataVector, publicKeys: DataVector): Uint8Array;
    static compileWithSignaturesAndPubKeyType(coinType: CoinType, txInputData: Uint8Array | Buffer, signatures: DataVector, publicKeys: DataVector, pubKeyType: PublicKeyType): Uint8Array;
}
export class TronMessageSigner {
    static signMessage(privateKey: PrivateKey, message: string): string;
    static verifyMessage(pubKey: PublicKey, message: string, signature: string): boolean;
}
export class WebAuthn {
    static getPublicKey(attestationObject: Uint8Array | Buffer): PublicKey;
    static getRSValues(signature: Uint8Array | Buffer): Uint8Array;
    static reconstructOriginalMessage(authenticatorData: Uint8Array | Buffer, clientDataJSON: Uint8Array | Buffer): Uint8Array;
}
export interface WalletCore {
    AnySigner: typeof AnySigner;
    HexCoding: typeof HexCoding;
    BitcoinSigHashTypeExt: typeof BitcoinSigHashTypeExt;
    CoinTypeExt: typeof CoinTypeExt;
    HDVersionExt: typeof HDVersionExt;
    AES: typeof AES;
    AESPaddingMode: typeof AESPaddingMode;
    Account: typeof Account;
    AnyAddress: typeof AnyAddress;
    AsnParser: typeof AsnParser;
    Barz: typeof Barz;
    Base32: typeof Base32;
    Base58: typeof Base58;
    Base64: typeof Base64;
    BitcoinAddress: typeof BitcoinAddress;
    BitcoinFee: typeof BitcoinFee;
    BitcoinMessageSigner: typeof BitcoinMessageSigner;
    BitcoinScript: typeof BitcoinScript;
    BitcoinSigHashType: typeof BitcoinSigHashType;
    Blockchain: typeof Blockchain;
    Cardano: typeof Cardano;
    CoinType: typeof CoinType;
    CoinTypeConfiguration: typeof CoinTypeConfiguration;
    Curve: typeof Curve;
    DataVector: typeof DataVector;
    Derivation: typeof Derivation;
    DerivationPath: typeof DerivationPath;
    DerivationPathIndex: typeof DerivationPathIndex;
    Ethereum: typeof Ethereum;
    EthereumAbi: typeof EthereumAbi;
    EthereumAbiFunction: typeof EthereumAbiFunction;
    EthereumAbiValue: typeof EthereumAbiValue;
    EthereumChainID: typeof EthereumChainID;
    EthereumMessageSigner: typeof EthereumMessageSigner;
    FIOAccount: typeof FIOAccount;
    FilecoinAddressConverter: typeof FilecoinAddressConverter;
    FilecoinAddressType: typeof FilecoinAddressType;
    GroestlcoinAddress: typeof GroestlcoinAddress;
    HDVersion: typeof HDVersion;
    HDWallet: typeof HDWallet;
    HRP: typeof HRP;
    Hash: typeof Hash;
    LiquidStaking: typeof LiquidStaking;
    Mnemonic: typeof Mnemonic;
    NEARAccount: typeof NEARAccount;
    NervosAddress: typeof NervosAddress;
    PBKDF2: typeof PBKDF2;
    PrivateKey: typeof PrivateKey;
    PrivateKeyType: typeof PrivateKeyType;
    PublicKey: typeof PublicKey;
    PublicKeyType: typeof PublicKeyType;
    Purpose: typeof Purpose;
    RippleXAddress: typeof RippleXAddress;
    SS58AddressType: typeof SS58AddressType;
    SegwitAddress: typeof SegwitAddress;
    SolanaAddress: typeof SolanaAddress;
    StarkExMessageSigner: typeof StarkExMessageSigner;
    StarkWare: typeof StarkWare;
    StellarMemoType: typeof StellarMemoType;
    StellarPassphrase: typeof StellarPassphrase;
    StellarVersionByte: typeof StellarVersionByte;
    StoredKey: typeof StoredKey;
    StoredKeyEncryption: typeof StoredKeyEncryption;
    StoredKeyEncryptionLevel: typeof StoredKeyEncryptionLevel;
    THORChainSwap: typeof THORChainSwap;
    TezosMessageSigner: typeof TezosMessageSigner;
    TransactionCompiler: typeof TransactionCompiler;
    TronMessageSigner: typeof TronMessageSigner;
    WebAuthn: typeof WebAuthn;
    describeCurve: typeof describeCurve;
    describeHRP: typeof describeHRP;
    describeStellarPassphrase: typeof describeStellarPassphrase;
}
