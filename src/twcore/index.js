"use strict";
// Copyright © 2017-2022 Trust Wallet.
//
// This file is part of Trust. The full Trust copyright notice, including
// terms governing use, modification, and redistribution, is contained in the
// file LICENSE at the root of the source code distribution tree.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyStore = exports.TW = exports.initWasm = void 0;
var Loader = require("./lib/wallet-core");
var core_proto_1 = require("./generated/core_proto");
Object.defineProperty(exports, "TW", { enumerable: true, get: function () { return core_proto_1.TW; } });
var KeyStore = require("./src/keystore");
exports.KeyStore = KeyStore;
exports.initWasm = Loader;
