(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-EMSAO3AI.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__export",
    ()=>__export,
    "__require",
    ()=>__require,
    "config",
    ()=>config
]);
var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x)=>("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.z : "TURBOPACK unreachable")(function(x) {
    if ("TURBOPACK compile-time truthy", 1) return /*TURBOPACK member replacement*/ __turbopack_context__.z.apply(this, arguments);
    //TURBOPACK unreachable
    ;
});
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// src/types/shared/evm/config.ts
var config = {
    "84532": {
        usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        usdcName: "USDC"
    },
    "8453": {
        usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        usdcName: "USD Coin"
    },
    "43113": {
        usdcAddress: "0x5425890298aed601595a70AB815c96711a31Bc65",
        usdcName: "USD Coin"
    },
    "43114": {
        usdcAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        usdcName: "USD Coin"
    },
    "4689": {
        usdcAddress: "0xcdf79194c6c285077a58da47641d4dbe51f63542",
        usdcName: "Bridged USDC"
    },
    // solana devnet
    "103": {
        usdcAddress: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        usdcName: "USDC"
    },
    // solana mainnet
    "101": {
        usdcAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        usdcName: "USDC"
    },
    "1328": {
        usdcAddress: "0x4fcf1784b31630811181f670aea7a7bef803eaed",
        usdcName: "USDC"
    },
    "1329": {
        usdcAddress: "0xe15fc38f6d8c56af07bbcbe3baf5708a2bf42392",
        usdcName: "USDC"
    },
    "137": {
        usdcAddress: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
        usdcName: "USD Coin"
    },
    "80002": {
        usdcAddress: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
        usdcName: "USDC"
    },
    "3338": {
        usdcAddress: "0xbbA60da06c2c5424f03f7434542280FCAd453d10",
        usdcName: "USDC"
    },
    "2741": {
        usdcAddress: "0x84a71ccd554cc1b02749b35d22f684cc8ec987e1",
        usdcName: "Bridged USDC"
    },
    "11124": {
        usdcAddress: "0xe4C7fBB0a626ed208021ccabA6Be1566905E2dFc",
        usdcName: "Bridged USDC"
    },
    "1514": {
        usdcAddress: "0xF1815bd50389c46847f0Bda824eC8da914045D14",
        usdcName: "Bridged USDC"
    },
    "41923": {
        usdcAddress: "0x12a272A581feE5577A5dFa371afEB4b2F3a8C2F8",
        usdcName: "Bridged USDC (Stargate)"
    },
    "324705682": {
        usdcAddress: "0x2e08028E3C4c2356572E096d8EF835cD5C6030bD",
        usdcName: "Bridged USDC (SKALE Bridge)"
    }
};
;
 //# sourceMappingURL=chunk-EMSAO3AI.mjs.map
}),
"[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-K4TZLEOT.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getERC20Balance",
    ()=>getERC20Balance,
    "getUSDCBalance",
    ()=>getUSDCBalance,
    "getUsdcAddress",
    ()=>getUsdcAddress,
    "getUsdcAddressForChain",
    ()=>getUsdcAddressForChain,
    "getUsdcChainConfigForChain",
    ()=>getUsdcChainConfigForChain,
    "getVersion",
    ()=>getVersion,
    "usdcABI",
    ()=>usdcABI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-EMSAO3AI.mjs [app-client] (ecmascript)");
;
// src/types/shared/evm/erc20PermitABI.ts
var usdcABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "Approval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "authorizer",
                type: "address"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            }
        ],
        name: "AuthorizationCanceled",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "authorizer",
                type: "address"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            }
        ],
        name: "AuthorizationUsed",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_account",
                type: "address"
            }
        ],
        name: "Blacklisted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newBlacklister",
                type: "address"
            }
        ],
        name: "BlacklisterChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "burner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "Burn",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newMasterMinter",
                type: "address"
            }
        ],
        name: "MasterMinterChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "minter",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "Mint",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "minter",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "minterAllowedAmount",
                type: "uint256"
            }
        ],
        name: "MinterConfigured",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "oldMinter",
                type: "address"
            }
        ],
        name: "MinterRemoved",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [],
        name: "Pause",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAddress",
                type: "address"
            }
        ],
        name: "PauserChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newRescuer",
                type: "address"
            }
        ],
        name: "RescuerChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "Transfer",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_account",
                type: "address"
            }
        ],
        name: "UnBlacklisted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [],
        name: "Unpause",
        type: "event"
    },
    {
        inputs: [],
        name: "CANCEL_AUTHORIZATION_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "PERMIT_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "spender",
                type: "address"
            }
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "authorizer",
                type: "address"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            }
        ],
        name: "authorizationState",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address"
            }
        ],
        name: "blacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "blacklister",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "authorizer",
                type: "address"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8"
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }
        ],
        name: "cancelAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "authorizer",
                type: "address"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
            }
        ],
        name: "cancelAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "minter",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "minterAllowedAmount",
                type: "uint256"
            }
        ],
        name: "configureMinter",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "currency",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "decrement",
                type: "uint256"
            }
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "increment",
                type: "uint256"
            }
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "tokenName",
                type: "string"
            },
            {
                internalType: "string",
                name: "tokenSymbol",
                type: "string"
            },
            {
                internalType: "string",
                name: "tokenCurrency",
                type: "string"
            },
            {
                internalType: "uint8",
                name: "tokenDecimals",
                type: "uint8"
            },
            {
                internalType: "address",
                name: "newMasterMinter",
                type: "address"
            },
            {
                internalType: "address",
                name: "newPauser",
                type: "address"
            },
            {
                internalType: "address",
                name: "newBlacklister",
                type: "address"
            },
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "newName",
                type: "string"
            }
        ],
        name: "initializeV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "lostAndFound",
                type: "address"
            }
        ],
        name: "initializeV2_1",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accountsToBlacklist",
                type: "address[]"
            },
            {
                internalType: "string",
                name: "newSymbol",
                type: "string"
            }
        ],
        name: "initializeV2_2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address"
            }
        ],
        name: "isBlacklisted",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "isMinter",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "masterMinter",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "minter",
                type: "address"
            }
        ],
        name: "minterAllowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "nonces",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pauser",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
            }
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8"
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validAfter",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validBefore",
                type: "uint256"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
            }
        ],
        name: "receiveWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validAfter",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validBefore",
                type: "uint256"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8"
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }
        ],
        name: "receiveWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "minter",
                type: "address"
            }
        ],
        name: "removeMinter",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "tokenContract",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "rescueERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "rescuer",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validAfter",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validBefore",
                type: "uint256"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
            }
        ],
        name: "transferWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validAfter",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "validBefore",
                type: "uint256"
            },
            {
                internalType: "bytes32",
                name: "nonce",
                type: "bytes32"
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8"
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }
        ],
        name: "transferWithAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address"
            }
        ],
        name: "unBlacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newBlacklister",
                type: "address"
            }
        ],
        name: "updateBlacklister",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newMasterMinter",
                type: "address"
            }
        ],
        name: "updateMasterMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newPauser",
                type: "address"
            }
        ],
        name: "updatePauser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newRescuer",
                type: "address"
            }
        ],
        name: "updateRescuer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "version",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "pure",
        type: "function"
    }
];
// src/shared/evm/usdc.ts
function getUsdcAddress(client) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"][client.chain.id.toString()].usdcAddress;
}
function getUsdcAddressForChain(chainId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"][chainId.toString()].usdcAddress;
}
function getUsdcChainConfigForChain(chainId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"][chainId.toString()];
}
var versionCache = null;
async function getVersion(client) {
    if (versionCache !== null) {
        return versionCache;
    }
    const version = await client.readContract({
        address: getUsdcAddress(client),
        abi: usdcABI,
        functionName: "version"
    });
    versionCache = version;
    return versionCache;
}
async function getUSDCBalance(client, address) {
    const chainId = client.chain.id;
    const usdc = getUsdcChainConfigForChain(chainId);
    if (!usdc) {
        return 0n;
    }
    const balance = await client.readContract({
        address: usdc.usdcAddress,
        abi: usdcABI,
        functionName: "balanceOf",
        args: [
            address
        ]
    });
    return balance;
}
// src/shared/evm/erc20.ts
async function getERC20Balance(client, erc20Address, address) {
    const balance = await client.readContract({
        address: erc20Address,
        abi: usdcABI,
        functionName: "balanceOf",
        args: [
            address
        ]
    });
    return balance;
}
;
 //# sourceMappingURL=chunk-K4TZLEOT.mjs.map
}),
"[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-3EQVFRKV.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Base64EncodedRegex",
    ()=>Base64EncodedRegex,
    "ChainIdToNetwork",
    ()=>ChainIdToNetwork,
    "DiscoveredResourceSchema",
    ()=>DiscoveredResourceSchema,
    "ErrorReasons",
    ()=>ErrorReasons,
    "EvmNetworkToChainId",
    ()=>EvmNetworkToChainId,
    "ExactEvmPayloadAuthorizationSchema",
    ()=>ExactEvmPayloadAuthorizationSchema,
    "ExactEvmPayloadSchema",
    ()=>ExactEvmPayloadSchema,
    "ExactSvmPayloadSchema",
    ()=>ExactSvmPayloadSchema,
    "HTTPRequestStructureSchema",
    ()=>HTTPRequestStructureSchema,
    "ListDiscoveryResourcesRequestSchema",
    ()=>ListDiscoveryResourcesRequestSchema,
    "ListDiscoveryResourcesResponseSchema",
    ()=>ListDiscoveryResourcesResponseSchema,
    "NetworkSchema",
    ()=>NetworkSchema,
    "PaymentPayloadSchema",
    ()=>PaymentPayloadSchema,
    "PaymentRequirementsSchema",
    ()=>PaymentRequirementsSchema,
    "RequestStructureSchema",
    ()=>RequestStructureSchema,
    "SettleRequestSchema",
    ()=>SettleRequestSchema,
    "SettleResponseSchema",
    ()=>SettleResponseSchema,
    "SupportedEVMNetworks",
    ()=>SupportedEVMNetworks,
    "SupportedPaymentKindSchema",
    ()=>SupportedPaymentKindSchema,
    "SupportedPaymentKindsResponseSchema",
    ()=>SupportedPaymentKindsResponseSchema,
    "SupportedSVMNetworks",
    ()=>SupportedSVMNetworks,
    "SvmNetworkToChainId",
    ()=>SvmNetworkToChainId,
    "VerifyRequestSchema",
    ()=>VerifyRequestSchema,
    "VerifyResponseSchema",
    ()=>VerifyResponseSchema,
    "authorizationTypes",
    ()=>authorizationTypes,
    "computeRoutePatterns",
    ()=>computeRoutePatterns,
    "createConnectedClient",
    ()=>createConnectedClient2,
    "createSigner",
    ()=>createSigner2,
    "decodeTransactionFromPayload",
    ()=>decodeTransactionFromPayload,
    "decodeXPaymentResponse",
    ()=>decodeXPaymentResponse,
    "evm_exports",
    ()=>evm_exports,
    "facilitatorRequestSchema",
    ()=>facilitatorRequestSchema,
    "findMatchingPaymentRequirements",
    ()=>findMatchingPaymentRequirements,
    "findMatchingRoute",
    ()=>findMatchingRoute,
    "getDefaultAsset",
    ()=>getDefaultAsset,
    "getNetworkId",
    ()=>getNetworkId,
    "getRpcClient",
    ()=>getRpcClient,
    "getRpcSubscriptions",
    ()=>getRpcSubscriptions,
    "getTokenPayerFromTransaction",
    ()=>getTokenPayerFromTransaction,
    "isAccount",
    ()=>isAccount,
    "isEvmSignerWallet",
    ()=>isEvmSignerWallet,
    "isMultiNetworkSigner",
    ()=>isMultiNetworkSigner,
    "isSignerWallet",
    ()=>isSignerWallet,
    "isSvmSignerWallet",
    ()=>isSvmSignerWallet,
    "moneySchema",
    ()=>moneySchema,
    "processPriceToAtomicAmount",
    ()=>processPriceToAtomicAmount,
    "safeBase64Decode",
    ()=>safeBase64Decode,
    "safeBase64Encode",
    ()=>safeBase64Encode,
    "schemes",
    ()=>schemes,
    "settleResponseFromHeader",
    ()=>settleResponseFromHeader,
    "settleResponseHeader",
    ()=>settleResponseHeader,
    "signAndSimulateTransaction",
    ()=>signAndSimulateTransaction,
    "signTransactionWithSigner",
    ()=>signTransactionWithSigner,
    "svm_exports",
    ()=>svm_exports,
    "svm_exports2",
    ()=>svm_exports2,
    "toJsonSafe",
    ()=>toJsonSafe,
    "x402ResponseSchema",
    ()=>x402ResponseSchema,
    "x402Versions",
    ()=>x402Versions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$K4TZLEOT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-K4TZLEOT.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-EMSAO3AI.mjs [app-client] (ecmascript)");
// src/types/shared/money.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
// src/types/shared/evm/wallet.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/decorators/public.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$avalancheFuji$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/avalancheFuji.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sei$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/sei.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$seiTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/seiTestnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$polygon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/polygon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$polygonAmoy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/polygonAmoy.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$peaq$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/peaq.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$avalanche$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/avalanche.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$iotexTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/iotexTestnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$iotex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/iotex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/abstract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$abstractTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/abstractTestnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$story$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/story.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$eduChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/chains/definitions/eduChain.js [app-client] (ecmascript)");
// src/types/shared/evm/wallet.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$decorators$2f$eip712$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/zksync/decorators/eip712.js [app-client] (ecmascript)");
// src/shared/svm/wallet.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/signers/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$scure$2f$base$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@scure/base/lib/esm/index.js [app-client] (ecmascript)");
// src/shared/svm/rpc.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/rpc/dist/index.browser.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/rpc-types/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$subscriptions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/rpc-subscriptions/dist/index.browser.mjs [app-client] (ecmascript) <locals>");
// src/shared/svm/transaction.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transactions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/transactions/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$codecs$2d$strings$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/codecs-strings/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/transaction-messages/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana-program/token/dist/src/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana-program/token-2022/dist/src/index.mjs [app-client] (ecmascript)");
;
;
;
var moneySchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().transform((x)=>x.replace(/[^0-9.-]+/g, "")),
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
]).pipe(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(1e-4).max(999999999));
;
var NetworkSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "abstract",
    "abstract-testnet",
    "base-sepolia",
    "base",
    "avalanche-fuji",
    "avalanche",
    "iotex",
    "solana-devnet",
    "solana",
    "sei",
    "sei-testnet",
    "polygon",
    "polygon-amoy",
    "peaq",
    "story",
    "educhain",
    "skale-base-sepolia"
]);
var SupportedEVMNetworks = [
    "abstract",
    "abstract-testnet",
    "base-sepolia",
    "base",
    "avalanche-fuji",
    "avalanche",
    "iotex",
    "sei",
    "sei-testnet",
    "polygon",
    "polygon-amoy",
    "peaq",
    "story",
    "educhain",
    "skale-base-sepolia"
];
var EvmNetworkToChainId = /* @__PURE__ */ new Map([
    [
        "abstract",
        2741
    ],
    [
        "abstract-testnet",
        11124
    ],
    [
        "base-sepolia",
        84532
    ],
    [
        "base",
        8453
    ],
    [
        "avalanche-fuji",
        43113
    ],
    [
        "avalanche",
        43114
    ],
    [
        "iotex",
        4689
    ],
    [
        "sei",
        1329
    ],
    [
        "sei-testnet",
        1328
    ],
    [
        "polygon",
        137
    ],
    [
        "polygon-amoy",
        80002
    ],
    [
        "peaq",
        3338
    ],
    [
        "story",
        1514
    ],
    [
        "educhain",
        41923
    ],
    [
        "skale-base-sepolia",
        324705682
    ]
]);
var SupportedSVMNetworks = [
    "solana-devnet",
    "solana"
];
var SvmNetworkToChainId = /* @__PURE__ */ new Map([
    [
        "solana-devnet",
        103
    ],
    [
        "solana",
        101
    ]
]);
var ChainIdToNetwork = Object.fromEntries([
    ...SupportedEVMNetworks,
    ...SupportedSVMNetworks
].map((network)=>[
        EvmNetworkToChainId.get(network),
        network
    ]));
;
;
// src/types/shared/custom-chains/eip155-324705682.ts
var skaleBaseSepolia = {
    id: 324705682,
    name: "SKALE Base Sepolia",
    nativeCurrency: {
        name: "Credits",
        symbol: "CREDITS",
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: [
                "https://base-sepolia-testnet.skalenodes.com/v1/jubilant-horrible-ancha"
            ]
        }
    },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: "https://base-sepolia-testnet-explorer.skalenodes.com",
            apiUrl: "https://base-sepolia-testnet-explorer.skalenodes.com/api"
        }
    }
};
;
;
function createConnectedClient(network) {
    const chain = getChainFromNetwork(network);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
        chain,
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
    }).extend(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicActions"]);
}
function createClientSepolia() {
    return createConnectedClient("base-sepolia");
}
function createClientAvalancheFuji() {
    return createConnectedClient("avalanche-fuji");
}
function createSigner(network, privateKey) {
    const chain = getChainFromNetwork(network);
    const walletClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletClient"])({
        chain,
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(),
        account: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(privateKey)
    });
    if (isZkStackChain(chain)) {
        return walletClient.extend(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicActions"]).extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$decorators$2f$eip712$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eip712WalletActions"])());
    }
    return walletClient.extend(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicActions"]);
}
function createSignerSepolia(privateKey) {
    return createSigner("base-sepolia", privateKey);
}
function createSignerAvalancheFuji(privateKey) {
    return createSigner("avalanche-fuji", privateKey);
}
function isSignerWallet(wallet) {
    return typeof wallet === "object" && wallet !== null && "chain" in wallet && "transport" in wallet;
}
function isAccount(wallet) {
    const w = wallet;
    return typeof wallet === "object" && wallet !== null && typeof w.address === "string" && typeof w.type === "string" && // Check for essential signing capabilities
    typeof w.sign === "function" && typeof w.signMessage === "function" && typeof w.signTypedData === "function" && // Check for transaction signing (required by LocalAccount)
    typeof w.signTransaction === "function";
}
function getChainFromNetwork(network) {
    if (!network) {
        throw new Error("NETWORK environment variable is not set");
    }
    switch(network){
        case "abstract":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abstract"];
        case "abstract-testnet":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$abstractTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abstractTestnet"];
        case "base":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"];
        case "base-sepolia":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"];
        case "avalanche":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$avalanche$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalanche"];
        case "avalanche-fuji":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$avalancheFuji$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalancheFuji"];
        case "sei":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sei$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sei"];
        case "sei-testnet":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$seiTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seiTestnet"];
        case "polygon":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$polygon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygon"];
        case "polygon-amoy":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$polygonAmoy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygonAmoy"];
        case "peaq":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$peaq$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["peaq"];
        case "story":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$story$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["story"];
        case "educhain":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$eduChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eduChain"];
        case "iotex":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$iotex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iotex"];
        case "iotex-testnet":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$iotexTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iotexTestnet"];
        case "skale-base-sepolia":
            return skaleBaseSepolia;
        default:
            throw new Error(`Unsupported network: ${network}`);
    }
}
var ZKSTACK_CHAIN_IDS = /* @__PURE__ */ new Set([
    2741,
    // Abstract Mainnet
    11124
]);
function isZkStackChain(chain) {
    return ZKSTACK_CHAIN_IDS.has(chain.id);
}
;
;
;
var DEVNET_RPC_URL = "https://api.devnet.solana.com";
var MAINNET_RPC_URL = "https://api.mainnet-beta.solana.com";
var DEVNET_WS_URL = "wss://api.devnet.solana.com";
var MAINNET_WS_URL = "wss://api.mainnet-beta.solana.com";
function createDevnetRpcClient(url) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSolanaRpc"])(url ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devnet"])(url) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devnet"])(DEVNET_RPC_URL));
}
function createMainnetRpcClient(url) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSolanaRpc"])(url ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"])(url) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"])(MAINNET_RPC_URL));
}
function getRpcClient(network, url) {
    if (network === "solana-devnet") {
        return createDevnetRpcClient(url);
    } else if (network === "solana") {
        return createMainnetRpcClient(url);
    } else {
        throw new Error("Invalid network");
    }
}
function getRpcSubscriptions(network, url) {
    if (network === "solana-devnet") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$subscriptions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSolanaRpcSubscriptions"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devnet"])(url ? httpToWs(url) : DEVNET_WS_URL));
    } else if (network === "solana") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$subscriptions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSolanaRpcSubscriptions"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$rpc$2d$types$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"])(url ? httpToWs(url) : MAINNET_WS_URL));
    } else {
        throw new Error("Invalid network");
    }
}
function httpToWs(url) {
    if (url.startsWith("http")) {
        return url.replace("http", "ws");
    }
    return url;
}
// src/shared/svm/wallet.ts
function createSvmConnectedClient(network) {
    if (!SupportedSVMNetworks.find((n)=>n === network)) {
        throw new Error(`Unsupported SVM network: ${network}`);
    }
    return getRpcClient(network);
}
async function createSignerFromBase58(privateKey) {
    const bytes = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$scure$2f$base$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base58"].decode(privateKey);
    if (bytes.length === 64) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createKeyPairSignerFromBytes"])(bytes);
    }
    if (bytes.length === 32) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createKeyPairSignerFromPrivateKeyBytes"])(bytes);
    }
    throw new Error(`Unexpected key length: ${bytes.length}. Expected 32 or 64 bytes.`);
}
function isSignerWallet2(wallet) {
    return typeof wallet === "object" && wallet !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTransactionSigner"])(wallet);
}
// src/types/shared/wallet.ts
function createConnectedClient2(network) {
    if (SupportedEVMNetworks.find((n)=>n === network)) {
        return createConnectedClient(network);
    }
    if (SupportedSVMNetworks.find((n)=>n === network)) {
        return createSvmConnectedClient(network);
    }
    throw new Error(`Unsupported network: ${network}`);
}
function createSigner2(network, privateKey) {
    if (SupportedEVMNetworks.find((n)=>n === network)) {
        return Promise.resolve(createSigner(network, privateKey));
    }
    if (SupportedSVMNetworks.find((n)=>n === network)) {
        return createSignerFromBase58(privateKey);
    }
    throw new Error(`Unsupported network: ${network}`);
}
function isEvmSignerWallet(wallet) {
    return isSignerWallet(wallet) || isAccount(wallet);
}
function isSvmSignerWallet(wallet) {
    return isSignerWallet2(wallet);
}
function isMultiNetworkSigner(wallet) {
    return "evm" in wallet && "svm" in wallet;
}
// src/types/shared/evm/index.ts
var evm_exports = {};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__export"])(evm_exports, {
    authorizationPrimaryType: ()=>authorizationPrimaryType,
    authorizationTypes: ()=>authorizationTypes,
    config: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"],
    createClientAvalancheFuji: ()=>createClientAvalancheFuji,
    createClientSepolia: ()=>createClientSepolia,
    createConnectedClient: ()=>createConnectedClient,
    createSigner: ()=>createSigner,
    createSignerAvalancheFuji: ()=>createSignerAvalancheFuji,
    createSignerSepolia: ()=>createSignerSepolia,
    getChainFromNetwork: ()=>getChainFromNetwork,
    isAccount: ()=>isAccount,
    isSignerWallet: ()=>isSignerWallet,
    isZkStackChain: ()=>isZkStackChain,
    usdcABI: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$K4TZLEOT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usdcABI"]
});
// src/types/shared/evm/eip3009.ts
var authorizationTypes = {
    TransferWithAuthorization: [
        {
            name: "from",
            type: "address"
        },
        {
            name: "to",
            type: "address"
        },
        {
            name: "value",
            type: "uint256"
        },
        {
            name: "validAfter",
            type: "uint256"
        },
        {
            name: "validBefore",
            type: "uint256"
        },
        {
            name: "nonce",
            type: "bytes32"
        }
    ]
};
var authorizationPrimaryType = "TransferWithAuthorization";
// src/types/shared/svm/index.ts
var svm_exports = {};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__export"])(svm_exports, {
    SvmAddressRegex: ()=>SvmAddressRegex
});
// src/types/shared/svm/regex.ts
var SvmAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
;
// src/shared/base64.ts
var Base64EncodedRegex = /^[A-Za-z0-9+/]*={0,2}$/;
function safeBase64Encode(data) {
    if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
        return globalThis.btoa(data);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(data).toString("base64");
}
function safeBase64Decode(data) {
    if (typeof globalThis !== "undefined" && typeof globalThis.atob === "function") {
        return globalThis.atob(data);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(data, "base64").toString("utf-8");
}
// src/types/verify/x402Specs.ts
var EvmMaxAtomicUnits = 18;
var EvmAddressRegex = /^0x[0-9a-fA-F]{40}$/;
var MixedAddressRegex = /^0x[a-fA-F0-9]{40}|[A-Za-z0-9][A-Za-z0-9-]{0,34}[A-Za-z0-9]$/;
var HexEncoded64ByteRegex = /^0x[0-9a-fA-F]{64}$/;
var EvmSignatureRegex = /^0x[0-9a-fA-F]+$/;
var schemes = [
    "exact"
];
var x402Versions = [
    1
];
var ErrorReasons = [
    "insufficient_funds",
    "invalid_exact_evm_payload_authorization_valid_after",
    "invalid_exact_evm_payload_authorization_valid_before",
    "invalid_exact_evm_payload_authorization_value",
    "invalid_exact_evm_payload_signature",
    "invalid_exact_evm_payload_undeployed_smart_wallet",
    "invalid_exact_evm_payload_recipient_mismatch",
    "invalid_exact_svm_payload_transaction",
    "invalid_exact_svm_payload_transaction_amount_mismatch",
    "invalid_exact_svm_payload_transaction_create_ata_instruction",
    "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee",
    "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset",
    "invalid_exact_svm_payload_transaction_instructions",
    "invalid_exact_svm_payload_transaction_instructions_length",
    "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction",
    "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction",
    "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high",
    "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked",
    "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked",
    "invalid_exact_svm_payload_transaction_fee_payer_included_in_instruction_accounts",
    "invalid_exact_svm_payload_transaction_fee_payer_transferring_funds",
    "invalid_exact_svm_payload_transaction_not_a_transfer_instruction",
    "invalid_exact_svm_payload_transaction_receiver_ata_not_found",
    "invalid_exact_svm_payload_transaction_sender_ata_not_found",
    "invalid_exact_svm_payload_transaction_simulation_failed",
    "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata",
    "invalid_network",
    "invalid_payload",
    "invalid_payment_requirements",
    "invalid_scheme",
    "invalid_payment",
    "payment_expired",
    "unsupported_scheme",
    "invalid_x402_version",
    "invalid_transaction_state",
    "invalid_x402_version",
    "settle_exact_svm_block_height_exceeded",
    "settle_exact_svm_transaction_confirmation_timed_out",
    "unsupported_scheme",
    "unexpected_settle_error",
    "unexpected_verify_error"
];
var isInteger = (value)=>Number.isInteger(Number(value)) && Number(value) >= 0;
var hasMaxLength = (maxLength)=>(value)=>value.length <= maxLength;
var EvmOrSvmAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(EvmAddressRegex).or(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(SvmAddressRegex));
var mixedAddressOrSvmAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(MixedAddressRegex).or(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(SvmAddressRegex));
var PaymentRequirementsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    scheme: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(schemes),
    network: NetworkSchema,
    maxAmountRequired: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine(isInteger),
    resource: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    mimeType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    outputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    payTo: EvmOrSvmAddress,
    maxTimeoutSeconds: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    asset: mixedAddressOrSvmAddress,
    extra: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
var ExactEvmPayloadAuthorizationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    from: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(EvmAddressRegex),
    to: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(EvmAddressRegex),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine(isInteger).refine(hasMaxLength(EvmMaxAtomicUnits)),
    validAfter: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine(isInteger),
    validBefore: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine(isInteger),
    nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(HexEncoded64ByteRegex)
});
var ExactEvmPayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    signature: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(EvmSignatureRegex),
    authorization: ExactEvmPayloadAuthorizationSchema
});
var ExactSvmPayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    transaction: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(Base64EncodedRegex)
});
var PaymentPayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().refine((val)=>x402Versions.includes(val)),
    scheme: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(schemes),
    network: NetworkSchema,
    payload: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        ExactEvmPayloadSchema,
        ExactSvmPayloadSchema
    ])
});
var x402ResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().refine((val)=>x402Versions.includes(val)),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(ErrorReasons).optional(),
    accepts: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(PaymentRequirementsSchema).optional(),
    payer: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(MixedAddressRegex).optional()
});
var HTTPVerbsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
    "HEAD"
]);
var HTTPRequestStructureSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("http"),
    method: HTTPVerbsSchema,
    queryParams: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional(),
    bodyType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "json",
        "form-data",
        "multipart-form-data",
        "text",
        "binary"
    ]).optional(),
    bodyFields: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    headerFields: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
var RequestStructureSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
    HTTPRequestStructureSchema
]);
var DiscoveredResourceSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    resource: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "http"
    ]),
    x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().refine((val)=>x402Versions.includes(val)),
    accepts: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(PaymentRequirementsSchema),
    lastUpdated: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
var SettleRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    paymentPayload: PaymentPayloadSchema,
    paymentRequirements: PaymentRequirementsSchema
});
var VerifyRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    paymentPayload: PaymentPayloadSchema,
    paymentRequirements: PaymentRequirementsSchema
});
var VerifyResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    isValid: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    invalidReason: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(ErrorReasons).optional(),
    payer: EvmOrSvmAddress.optional()
});
var SettleResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    errorReason: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(ErrorReasons).optional(),
    payer: EvmOrSvmAddress.optional(),
    transaction: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(MixedAddressRegex),
    network: NetworkSchema
});
var ListDiscoveryResourcesRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    offset: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
});
var ListDiscoveryResourcesResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().refine((val)=>x402Versions.includes(val)),
    items: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(DiscoveredResourceSchema),
    pagination: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        offset: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        total: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    })
});
var SupportedPaymentKindSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().refine((val)=>x402Versions.includes(val)),
    scheme: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(schemes),
    network: NetworkSchema,
    extra: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
var SupportedPaymentKindsResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    kinds: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(SupportedPaymentKindSchema)
});
;
// src/shared/json.ts
function toJsonSafe(data) {
    if (typeof data !== "object") {
        throw new Error("Data is not an object");
    }
    function convert(value) {
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            return Object.fromEntries(Object.entries(value).map(([key, val])=>[
                    key,
                    convert(val)
                ]));
        }
        if (Array.isArray(value)) {
            return value.map(convert);
        }
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    }
    return convert(data);
}
// src/shared/network.ts
function getNetworkId(network) {
    if (EvmNetworkToChainId.has(network)) {
        return EvmNetworkToChainId.get(network);
    }
    if (SvmNetworkToChainId.has(network)) {
        return SvmNetworkToChainId.get(network);
    }
    throw new Error(`Unsupported network: ${network}`);
}
// src/shared/middleware.ts
function computeRoutePatterns(routes) {
    const normalizedRoutes = Object.fromEntries(Object.entries(routes).map(([pattern, value])=>[
            pattern,
            typeof value === "string" || typeof value === "number" ? {
                price: value,
                network: "base-sepolia"
            } : value
        ]));
    return Object.entries(normalizedRoutes).map(([pattern, routeConfig])=>{
        const [verb, path] = pattern.includes(" ") ? pattern.split(/\s+/) : [
            "*",
            pattern
        ];
        if (!path) {
            throw new Error(`Invalid route pattern: ${pattern}`);
        }
        return {
            verb: verb.toUpperCase(),
            pattern: new RegExp(`^${path.replace(/[$()+.?^{|}]/g, "\\$&").replace(/\*/g, ".*?").replace(/\[([^\]]+)\]/g, "[^/]+").replace(/\//g, "\\/")}$`, "i"),
            config: routeConfig
        };
    });
}
function findMatchingRoute(routePatterns, path, method) {
    let normalizedPath;
    try {
        const pathWithoutQuery = path.split(/[?#]/)[0];
        const decodedPath = decodeURIComponent(pathWithoutQuery);
        normalizedPath = decodedPath.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/(.+?)\/+$/, "$1");
    } catch  {
        return void 0;
    }
    const matchingRoutes = routePatterns.filter(({ pattern, verb })=>{
        const matchesPath = pattern.test(normalizedPath);
        const upperMethod = method.toUpperCase();
        const matchesVerb = verb === "*" || upperMethod === verb;
        const result = matchesPath && matchesVerb;
        return result;
    });
    if (matchingRoutes.length === 0) {
        return void 0;
    }
    const matchingRoute = matchingRoutes.reduce((a, b)=>b.pattern.source.length > a.pattern.source.length ? b : a);
    return matchingRoute;
}
function getDefaultAsset(network) {
    const chainId = getNetworkId(network);
    const usdc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$K4TZLEOT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsdcChainConfigForChain"])(chainId);
    if (!usdc) {
        throw new Error(`Unable to get default asset on ${network}`);
    }
    return {
        address: usdc.usdcAddress,
        decimals: 6,
        eip712: {
            name: usdc.usdcName,
            version: "2"
        }
    };
}
function processPriceToAtomicAmount(price, network) {
    let maxAmountRequired;
    let asset;
    if (typeof price === "string" || typeof price === "number") {
        const parsedAmount = moneySchema.safeParse(price);
        if (!parsedAmount.success) {
            return {
                error: `Invalid price (price: ${price}). Must be in the form "$3.10", 0.10, "0.001", ${parsedAmount.error}`
            };
        }
        const parsedUsdAmount = parsedAmount.data;
        asset = getDefaultAsset(network);
        maxAmountRequired = (parsedUsdAmount * 10 ** asset.decimals).toString();
    } else {
        maxAmountRequired = price.amount;
        asset = price.asset;
    }
    return {
        maxAmountRequired,
        asset
    };
}
function findMatchingPaymentRequirements(paymentRequirements, payment) {
    return paymentRequirements.find((value)=>value.scheme === payment.scheme && value.network === payment.network);
}
function decodeXPaymentResponse(header) {
    const decoded = safeBase64Decode(header);
    return JSON.parse(decoded);
}
// src/shared/svm/index.ts
var svm_exports2 = {};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__export"])(svm_exports2, {
    createDevnetRpcClient: ()=>createDevnetRpcClient,
    createMainnetRpcClient: ()=>createMainnetRpcClient,
    createSignerFromBase58: ()=>createSignerFromBase58,
    createSvmConnectedClient: ()=>createSvmConnectedClient,
    decodeTransactionFromPayload: ()=>decodeTransactionFromPayload,
    getRpcClient: ()=>getRpcClient,
    getRpcSubscriptions: ()=>getRpcSubscriptions,
    getTokenPayerFromTransaction: ()=>getTokenPayerFromTransaction,
    isSignerWallet: ()=>isSignerWallet2,
    signAndSimulateTransaction: ()=>signAndSimulateTransaction,
    signTransactionWithSigner: ()=>signTransactionWithSigner
});
;
;
;
function decodeTransactionFromPayload(svmPayload) {
    try {
        const base64Encoder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$codecs$2d$strings$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBase64Encoder"])();
        const transactionBytes = base64Encoder.encode(svmPayload.transaction);
        const transactionDecoder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transactions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTransactionDecoder"])();
        return transactionDecoder.decode(transactionBytes);
    } catch (error) {
        console.error("error", error);
        throw new Error("invalid_exact_svm_payload_transaction");
    }
}
function getTokenPayerFromTransaction(transaction) {
    const compiled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompiledTransactionMessageDecoder"])().decode(transaction.messageBytes);
    const staticAccounts = compiled.staticAccounts ?? [];
    const instructions = compiled.instructions ?? [];
    for (const ix of instructions){
        const programIndex = ix.programAddressIndex;
        const programAddress = staticAccounts[programIndex].toString();
        if (programAddress === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ADDRESS"].toString() || programAddress === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_2022_PROGRAM_ADDRESS"].toString()) {
            const accountIndices = ix.accountIndices ?? [];
            if (accountIndices.length >= 4) {
                const ownerIndex = accountIndices[3];
                const ownerAddress = staticAccounts[ownerIndex].toString();
                if (ownerAddress) return ownerAddress;
            }
        }
    }
    return "";
}
async function signAndSimulateTransaction(signer, transaction, rpc) {
    const signedTransaction = await signTransactionWithSigner(signer, transaction);
    const base64EncodedTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transactions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBase64EncodedWireTransaction"])(signedTransaction);
    const simulateTxConfig = {
        sigVerify: true,
        replaceRecentBlockhash: false,
        commitment: "confirmed",
        encoding: "base64",
        accounts: void 0,
        innerInstructions: void 0,
        minContextSlot: void 0
    };
    const simulateResult = await rpc.simulateTransaction(base64EncodedTransaction, simulateTxConfig).send();
    return simulateResult;
}
async function signTransactionWithSigner(signer, transaction) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTransactionModifyingSigner"])(signer)) {
        const [modifiedTransaction] = await signer.modifyAndSignTransactions([
            transaction
        ]);
        if (!modifiedTransaction) {
            throw new Error("transaction_signer_failed_to_return_transaction");
        }
        return modifiedTransaction;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTransactionPartialSigner"])(signer)) {
        const [signatures] = await signer.signTransactions([
            transaction
        ]);
        if (!signatures) {
            throw new Error("transaction_signer_failed_to_return_signatures");
        }
        return mergeTransactionSignatures(transaction, signatures);
    }
    throw new Error("transaction_signer_must_support_offline_signing");
}
function mergeTransactionSignatures(transaction, signatures) {
    return Object.freeze({
        ...transaction,
        signatures: Object.freeze({
            ...transaction.signatures,
            ...signatures
        })
    });
}
// src/types/verify/facilitator.ts
var facilitatorRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    paymentHeader: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    paymentRequirements: PaymentRequirementsSchema
});
function settleResponseHeader(response) {
    return safeBase64Encode(JSON.stringify(response));
}
function settleResponseFromHeader(header) {
    const decoded = safeBase64Decode(header);
    return JSON.parse(decoded);
}
;
 //# sourceMappingURL=chunk-3EQVFRKV.mjs.map
}),
"[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-SQV4BQTM.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAndSignPayment",
    ()=>createAndSignPayment,
    "createPayment",
    ()=>createPayment,
    "createPaymentHeader",
    ()=>createPaymentHeader,
    "createPaymentHeader2",
    ()=>createPaymentHeader2,
    "decodePayment",
    ()=>decodePayment,
    "encodePayment",
    ()=>encodePayment,
    "preparePaymentHeader",
    ()=>preparePaymentHeader,
    "signPaymentHeader",
    ()=>signPaymentHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-3EQVFRKV.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-EMSAO3AI.mjs [app-client] (ecmascript)");
// src/schemes/exact/evm/sign.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
// src/schemes/exact/svm/client.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$functional$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/functional/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/transaction-messages/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/signers/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transactions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana/transactions/dist/index.browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana-program/token-2022/dist/src/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana-program/token/dist/src/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$compute$2d$budget$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@solana-program/compute-budget/dist/src/index.mjs [app-client] (ecmascript)");
;
;
// src/schemes/exact/evm/utils/paymentUtils.ts
function encodePayment(payment) {
    let safe;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedEVMNetworks"].includes(payment.network)) {
        const evmPayload = payment.payload;
        safe = {
            ...payment,
            payload: {
                ...evmPayload,
                authorization: Object.fromEntries(Object.entries(evmPayload.authorization).map(([key, value])=>[
                        key,
                        typeof value === "bigint" ? value.toString() : value
                    ]))
            }
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeBase64Encode"])(JSON.stringify(safe));
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedSVMNetworks"].includes(payment.network)) {
        safe = {
            ...payment,
            payload: payment.payload
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeBase64Encode"])(JSON.stringify(safe));
    }
    throw new Error("Invalid network");
}
function decodePayment(payment) {
    const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeBase64Decode"])(payment);
    const parsed = JSON.parse(decoded);
    let obj;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedEVMNetworks"].includes(parsed.network)) {
        obj = {
            ...parsed,
            payload: parsed.payload
        };
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedSVMNetworks"].includes(parsed.network)) {
        obj = {
            ...parsed,
            payload: parsed.payload
        };
    } else {
        throw new Error("Invalid network");
    }
    const validated = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentPayloadSchema"].parse(obj);
    return validated;
}
;
async function signAuthorization(walletClient, { from, to, value, validAfter, validBefore, nonce }, { asset, network, extra }) {
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNetworkId"])(network);
    const name = extra?.name;
    const version = extra?.version;
    const data = {
        types: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationTypes"],
        domain: {
            name,
            version,
            chainId,
            verifyingContract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(asset)
        },
        primaryType: "TransferWithAuthorization",
        message: {
            from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(from),
            to: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(to),
            value,
            validAfter,
            validBefore,
            nonce
        }
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSignerWallet"])(walletClient)) {
        const signature = await walletClient.signTypedData(data);
        return {
            signature
        };
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAccount"])(walletClient) && walletClient.signTypedData) {
        const signature = await walletClient.signTypedData(data);
        return {
            signature
        };
    } else {
        throw new Error("Invalid wallet client provided does not support signTypedData");
    }
}
function createNonce() {
    const cryptoObj = typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function" ? globalThis.crypto : // Dynamic require is needed to support node.js
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__require"])("crypto").webcrypto;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(cryptoObj.getRandomValues(new Uint8Array(32)));
}
// src/schemes/exact/evm/client.ts
function preparePaymentHeader(from, x402Version, paymentRequirements) {
    const nonce = createNonce();
    const validAfter = BigInt(Math.floor(Date.now() / 1e3) - 600).toString();
    const validBefore = BigInt(Math.floor(Date.now() / 1e3 + paymentRequirements.maxTimeoutSeconds)).toString();
    return {
        x402Version,
        scheme: paymentRequirements.scheme,
        network: paymentRequirements.network,
        payload: {
            signature: void 0,
            authorization: {
                from,
                to: paymentRequirements.payTo,
                value: paymentRequirements.maxAmountRequired,
                validAfter: validAfter.toString(),
                validBefore: validBefore.toString(),
                nonce
            }
        }
    };
}
async function signPaymentHeader(client, paymentRequirements, unsignedPaymentHeader) {
    const { signature } = await signAuthorization(client, unsignedPaymentHeader.payload.authorization, paymentRequirements);
    return {
        ...unsignedPaymentHeader,
        payload: {
            ...unsignedPaymentHeader.payload,
            signature
        }
    };
}
async function createPayment(client, x402Version, paymentRequirements) {
    const from = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSignerWallet"])(client) ? client.account.address : client.address;
    const unsignedPaymentHeader = preparePaymentHeader(from, x402Version, paymentRequirements);
    return signPaymentHeader(client, paymentRequirements, unsignedPaymentHeader);
}
async function createPaymentHeader(client, x402Version, paymentRequirements) {
    const payment = await createPayment(client, x402Version, paymentRequirements);
    return encodePayment(payment);
}
;
;
;
;
async function createPaymentHeader2(client, x402Version, paymentRequirements, config) {
    const paymentPayload = await createAndSignPayment(client, x402Version, paymentRequirements, config);
    return encodePayment(paymentPayload);
}
async function createAndSignPayment(client, x402Version, paymentRequirements, config) {
    const transactionMessage = await createTransferTransactionMessage(client, paymentRequirements, config);
    const signedTransaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$signers$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["partiallySignTransactionMessageWithSigners"])(transactionMessage);
    const base64EncodedWireTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transactions$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBase64EncodedWireTransaction"])(signedTransaction);
    return {
        scheme: paymentRequirements.scheme,
        network: paymentRequirements.network,
        x402Version,
        payload: {
            transaction: base64EncodedWireTransaction
        }
    };
}
async function createTransferTransactionMessage(client, paymentRequirements, config) {
    const rpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])(paymentRequirements.network, config?.svmConfig?.rpcUrl);
    const transferInstructions = await createTransferInstructions(client, paymentRequirements, config);
    const feePayer = paymentRequirements.extra?.feePayer;
    const txToSimulate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$functional$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransactionMessage"])({
        version: 0
    }), (tx2)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$compute$2d$budget$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTransactionMessageComputeUnitPrice"])(1, tx2), // 1 microlamport priority fee
    (tx2)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTransactionMessageFeePayer"])(feePayer, tx2), (tx2)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appendTransactionMessageInstructions"])(transferInstructions, tx2));
    const estimateComputeUnitLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$compute$2d$budget$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateComputeUnitLimitFactory"])({
        rpc
    });
    const estimatedUnits = await estimateComputeUnitLimit(txToSimulate);
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const tx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$functional$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(txToSimulate, (tx2)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prependTransactionMessageInstruction"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$compute$2d$budget$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSetComputeUnitLimitInstruction"])({
            units: estimatedUnits
        }), tx2), (tx2)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2f$transaction$2d$messages$2f$dist$2f$index$2e$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTransactionMessageLifetimeUsingBlockhash"])(latestBlockhash, tx2));
    return tx;
}
async function createTransferInstructions(client, paymentRequirements, config) {
    const { asset, maxAmountRequired: amount, payTo } = paymentRequirements;
    const rpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])(paymentRequirements.network, config?.svmConfig?.rpcUrl);
    const tokenMint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMint"])(rpc, asset);
    const tokenProgramAddress = tokenMint.programAddress;
    if (tokenProgramAddress.toString() !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ADDRESS"].toString() && tokenProgramAddress.toString() !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_2022_PROGRAM_ADDRESS"].toString()) {
        throw new Error("Asset was not created by a known token program");
    }
    const [sourceATA] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findAssociatedTokenPda"])({
        mint: asset,
        owner: client.address,
        tokenProgram: tokenProgramAddress
    });
    const [destinationATA] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findAssociatedTokenPda"])({
        mint: asset,
        owner: payTo,
        tokenProgram: tokenProgramAddress
    });
    const transferIx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$solana$2d$program$2f$token$2d$2022$2f$dist$2f$src$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTransferCheckedInstruction"])({
        source: sourceATA,
        mint: asset,
        destination: destinationATA,
        authority: client,
        amount: BigInt(amount),
        decimals: tokenMint.data.decimals
    }, {
        programAddress: tokenProgramAddress
    });
    return [
        transferIx
    ];
}
;
 //# sourceMappingURL=chunk-SQV4BQTM.mjs.map
}),
"[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-F22J6Y36.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPaymentHeader",
    ()=>createPaymentHeader3,
    "preparePaymentHeader",
    ()=>preparePaymentHeader2,
    "selectPaymentRequirements",
    ()=>selectPaymentRequirements,
    "signPaymentHeader",
    ()=>signPaymentHeader2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-SQV4BQTM.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-3EQVFRKV.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$K4TZLEOT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-K4TZLEOT.mjs [app-client] (ecmascript)");
;
;
;
// src/client/createPaymentHeader.ts
async function createPaymentHeader3(client, x402Version, paymentRequirements, config) {
    if (paymentRequirements.scheme === "exact") {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedEVMNetworks"].includes(paymentRequirements.network)) {
            const evmClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMultiNetworkSigner"])(client) ? client.evm : client;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEvmSignerWallet"])(evmClient)) {
                throw new Error("Invalid evm wallet client provided");
            }
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPaymentHeader"])(evmClient, x402Version, paymentRequirements);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedSVMNetworks"].includes(paymentRequirements.network)) {
            const svmClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMultiNetworkSigner"])(client) ? client.svm : client;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSvmSignerWallet"])(svmClient)) {
                throw new Error("Invalid svm wallet client provided");
            }
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPaymentHeader2"])(svmClient, x402Version, paymentRequirements, config);
        }
        throw new Error("Unsupported network");
    }
    throw new Error("Unsupported scheme");
}
// src/client/preparePaymentHeader.ts
function preparePaymentHeader2(from, x402Version, paymentRequirements) {
    if (paymentRequirements.scheme === "exact" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedEVMNetworks"].includes(paymentRequirements.network)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preparePaymentHeader"])(from, x402Version, paymentRequirements);
    }
    throw new Error("Unsupported scheme");
}
// src/client/selectPaymentRequirements.ts
function selectPaymentRequirements(paymentRequirements, network, scheme) {
    const broadlyAcceptedPaymentRequirements = paymentRequirements.filter((requirement)=>{
        const isExpectedScheme = !scheme || requirement.scheme === scheme;
        const isExpectedChain = !network || (Array.isArray(network) ? network.includes(requirement.network) : network == requirement.network);
        return isExpectedScheme && isExpectedChain;
    });
    const usdcRequirements = broadlyAcceptedPaymentRequirements.filter((requirement)=>{
        return requirement.asset === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$K4TZLEOT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsdcChainConfigForChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNetworkId"])(requirement.network))?.usdcAddress;
    });
    if (usdcRequirements.length > 0) {
        return usdcRequirements[0];
    }
    if (broadlyAcceptedPaymentRequirements.length > 0) {
        return broadlyAcceptedPaymentRequirements[0];
    }
    return paymentRequirements[0];
}
// src/client/signPaymentHeader.ts
async function signPaymentHeader2(client, paymentRequirements, unsignedPaymentHeader) {
    if (paymentRequirements.scheme === "exact" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupportedEVMNetworks"].includes(paymentRequirements.network)) {
        const evmClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMultiNetworkSigner"])(client) ? client.evm : client;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEvmSignerWallet"])(evmClient)) {
            throw new Error("Invalid evm wallet client provided");
        }
        const signedPaymentHeader = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signPaymentHeader"])(evmClient, paymentRequirements, unsignedPaymentHeader);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodePayment"])(signedPaymentHeader);
    }
    throw new Error("Unsupported scheme");
}
;
 //# sourceMappingURL=chunk-F22J6Y36.mjs.map
}),
"[project]/Desktop/frontend/node_modules/x402/dist/esm/client/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$F22J6Y36$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-F22J6Y36.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$SQV4BQTM$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-SQV4BQTM.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$3EQVFRKV$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-3EQVFRKV.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$K4TZLEOT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-K4TZLEOT.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$EMSAO3AI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/chunk-EMSAO3AI.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
 //# sourceMappingURL=index.mjs.map
}),
]);

//# sourceMappingURL=1b50e_x402_dist_esm_11cf9c32._.js.map