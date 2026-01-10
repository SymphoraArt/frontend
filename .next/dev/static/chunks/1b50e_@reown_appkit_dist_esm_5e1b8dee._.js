(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineChain",
    ()=>defineChain
]);
function defineChain(chain) {
    return {
        formatters: undefined,
        fees: undefined,
        serializers: undefined,
        ...chain
    };
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solana.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "solana",
    ()=>solana
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const solana = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    name: 'Solana',
    network: 'solana-mainnet',
    nativeCurrency: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Solscan',
            url: 'https://solscan.io'
        }
    },
    testnet: false,
    chainNamespace: 'solana',
    caipNetworkId: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    deprecatedCaipNetworkId: 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ'
}); //# sourceMappingURL=solana.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaDevnet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "solanaDevnet",
    ()=>solanaDevnet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const solanaDevnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    name: 'Solana Devnet',
    network: 'solana-devnet',
    nativeCurrency: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Solscan',
            url: 'https://solscan.io'
        }
    },
    testnet: true,
    chainNamespace: 'solana',
    caipNetworkId: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    deprecatedCaipNetworkId: 'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K'
}); //# sourceMappingURL=solanaDevnet.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaTestnet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "solanaTestnet",
    ()=>solanaTestnet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const solanaTestnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
    name: 'Solana Testnet',
    network: 'solana-testnet',
    nativeCurrency: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Solscan',
            url: 'https://solscan.io'
        }
    },
    testnet: true,
    chainNamespace: 'solana',
    caipNetworkId: 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z'
}); //# sourceMappingURL=solanaTestnet.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solana.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaDevnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaTestnet.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/bitcoin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bitcoin",
    ()=>bitcoin,
    "bitcoinSignet",
    ()=>bitcoinSignet,
    "bitcoinTestnet",
    ()=>bitcoinTestnet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const bitcoin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '000000000019d6689c085ae165831e93',
    caipNetworkId: 'bip122:000000000019d6689c085ae165831e93',
    chainNamespace: 'bip122',
    name: 'Bitcoin',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    }
});
const bitcoinTestnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '000000000933ea01ad0ee984209779ba',
    caipNetworkId: 'bip122:000000000933ea01ad0ee984209779ba',
    chainNamespace: 'bip122',
    name: 'Bitcoin Testnet',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    testnet: true
});
const bitcoinSignet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '00000008819873e925422c1ff0f99f7c',
    caipNetworkId: 'bip122:00000008819873e925422c1ff0f99f7c',
    chainNamespace: 'bip122',
    name: 'Bitcoin Signet',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    testnet: true
}); //# sourceMappingURL=bitcoin.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// -- Networks ---------------------------------------------------------------
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$bitcoin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/bitcoin.js [app-client] (ecmascript)");
// -- Utils ------------------------------------------------------------------
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_METHODS",
    ()=>DEFAULT_METHODS,
    "WcHelpersUtil",
    ()=>WcHelpersUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solana.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaDevnet.js [app-client] (ecmascript)");
;
;
;
const DEFAULT_METHODS = {
    solana: [
        'solana_signMessage',
        'solana_signTransaction',
        'solana_requestAccounts',
        'solana_getAccounts',
        'solana_signAllTransactions',
        'solana_signAndSendTransaction'
    ],
    eip155: [
        'eth_accounts',
        'eth_requestAccounts',
        'eth_sendRawTransaction',
        'eth_sign',
        'eth_signTransaction',
        'eth_signTypedData',
        'eth_signTypedData_v3',
        'eth_signTypedData_v4',
        'eth_sendTransaction',
        'personal_sign',
        'wallet_switchEthereumChain',
        'wallet_addEthereumChain',
        'wallet_getPermissions',
        'wallet_requestPermissions',
        'wallet_registerOnboarding',
        'wallet_watchAsset',
        'wallet_scanQRCode',
        // EIP-5792
        'wallet_getCallsStatus',
        'wallet_showCallsStatus',
        'wallet_sendCalls',
        'wallet_getCapabilities',
        // EIP-7715
        'wallet_grantPermissions',
        'wallet_revokePermissions',
        //EIP-7811
        'wallet_getAssets'
    ],
    bip122: [
        'sendTransfer',
        'signMessage',
        'signPsbt',
        'getAccountAddresses'
    ]
};
const WcHelpersUtil = {
    RPC_ERROR_CODE: {
        USER_REJECTED: 5000,
        USER_REJECTED_METHODS: 5002
    },
    getMethodsByChainNamespace (chainNamespace) {
        return DEFAULT_METHODS[chainNamespace] || [];
    },
    createDefaultNamespace (chainNamespace) {
        return {
            methods: this.getMethodsByChainNamespace(chainNamespace),
            events: [
                'accountsChanged',
                'chainChanged'
            ],
            chains: [],
            rpcMap: {}
        };
    },
    applyNamespaceOverrides (baseNamespaces, overrides) {
        if (!overrides) {
            return {
                ...baseNamespaces
            };
        }
        const result = {
            ...baseNamespaces
        };
        const namespacesToOverride = new Set();
        if (overrides.methods) {
            Object.keys(overrides.methods).forEach((ns)=>namespacesToOverride.add(ns));
        }
        if (overrides.chains) {
            Object.keys(overrides.chains).forEach((ns)=>namespacesToOverride.add(ns));
        }
        if (overrides.events) {
            Object.keys(overrides.events).forEach((ns)=>namespacesToOverride.add(ns));
        }
        if (overrides.rpcMap) {
            Object.keys(overrides.rpcMap).forEach((chainId)=>{
                const [ns] = chainId.split(':');
                if (ns) {
                    namespacesToOverride.add(ns);
                }
            });
        }
        namespacesToOverride.forEach((ns)=>{
            if (!result[ns]) {
                result[ns] = this.createDefaultNamespace(ns);
            }
        });
        if (overrides.methods) {
            Object.entries(overrides.methods).forEach(([ns, methods])=>{
                if (result[ns]) {
                    result[ns].methods = methods;
                }
            });
        }
        if (overrides.chains) {
            Object.entries(overrides.chains).forEach(([ns, chains])=>{
                if (result[ns]) {
                    result[ns].chains = chains;
                }
            });
        }
        if (overrides.events) {
            Object.entries(overrides.events).forEach(([ns, events])=>{
                if (result[ns]) {
                    result[ns].events = events;
                }
            });
        }
        if (overrides.rpcMap) {
            const processedNamespaces = new Set();
            Object.entries(overrides.rpcMap).forEach(([chainId, rpcUrl])=>{
                const [ns, id] = chainId.split(':');
                if (!ns || !id || !result[ns]) {
                    return;
                }
                if (!result[ns].rpcMap) {
                    result[ns].rpcMap = {};
                }
                if (!processedNamespaces.has(ns)) {
                    result[ns].rpcMap = {};
                    processedNamespaces.add(ns);
                }
                result[ns].rpcMap[id] = rpcUrl;
            });
        }
        return result;
    },
    createNamespaces (caipNetworks, configOverride) {
        const defaultNamespaces = caipNetworks.reduce((acc, chain)=>{
            const { id, chainNamespace, rpcUrls } = chain;
            const rpcUrl = rpcUrls.default.http[0];
            if (!acc[chainNamespace]) {
                acc[chainNamespace] = this.createDefaultNamespace(chainNamespace);
            }
            const caipNetworkId = `${chainNamespace}:${id}`;
            // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
            const namespace = acc[chainNamespace];
            namespace.chains.push(caipNetworkId);
            // Workaround for wallets that only support deprecated Solana network ID
            switch(caipNetworkId){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solana"].caipNetworkId:
                    namespace.chains.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solana"].deprecatedCaipNetworkId);
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solanaDevnet"].caipNetworkId:
                    namespace.chains.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solanaDevnet"].deprecatedCaipNetworkId);
                    break;
                default:
            }
            if (namespace?.rpcMap && rpcUrl) {
                namespace.rpcMap[id] = rpcUrl;
            }
            return acc;
        }, {});
        return this.applyNamespaceOverrides(defaultNamespaces, configOverride);
    },
    resolveReownName: async (name)=>{
        const wcNameAddress = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnsController"].resolveName(name);
        const networkNameAddresses = Object.values(wcNameAddress?.addresses) || [];
        return networkNameAddresses[0]?.address || false;
    },
    getChainsFromNamespaces (namespaces = {}) {
        return Object.values(namespaces).flatMap((namespace)=>{
            const chains = namespace.chains || [];
            const accountsChains = namespace.accounts.map((account)=>{
                const [chainNamespace, chainId] = account.split(':');
                return `${chainNamespace}:${chainId}`;
            });
            return Array.from(new Set([
                ...chains,
                ...accountsChains
            ]));
        });
    },
    isSessionEventData (data) {
        return typeof data === 'object' && data !== null && 'id' in data && 'topic' in data && 'params' in data && typeof data.params === 'object' && data.params !== null && 'chainId' in data.params && 'event' in data.params && typeof data.params.event === 'object' && data.params.event !== null;
    },
    isUserRejectedRequestError (error) {
        try {
            if (typeof error === 'object' && error !== null) {
                const objErr = error;
                const hasCode = typeof objErr['code'] === 'number';
                const hasUserRejectedMethods = hasCode && objErr['code'] === WcHelpersUtil.RPC_ERROR_CODE.USER_REJECTED_METHODS;
                const hasUserRejected = hasCode && objErr['code'] === WcHelpersUtil.RPC_ERROR_CODE.USER_REJECTED;
                return hasUserRejectedMethods || hasUserRejected;
            }
            return false;
        } catch  {
            return false;
        }
    },
    isOriginAllowed (currentOrigin, allowedPatterns, defaultAllowedOrigins) {
        for (const pattern of [
            ...allowedPatterns,
            ...defaultAllowedOrigins
        ]){
            if (pattern.includes('*')) {
                // Convert wildcard pattern to regex, escape special chars, replace *, match whole string
                const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
                const regexString = `^${escapedPattern.replace(/\\\*/gu, '.*')}$`;
                const regex = new RegExp(regexString, 'u');
                if (regex.test(currentOrigin)) {
                    return true;
                }
            } else {
                /**
                 * There are some cases where pattern is getting just the origin, where using new URL(pattern).origin will throw an error
                 * thus we a try catch to handle this case
                 */ try {
                    if (new URL(pattern).origin === currentOrigin) {
                        return true;
                    }
                } catch (e) {
                    if (pattern === currentOrigin) {
                        return true;
                    }
                }
            }
        }
        // No match found
        return false;
    },
    listenWcProvider ({ universalProvider, namespace, onConnect, onDisconnect, onAccountsChanged, onChainChanged, onDisplayUri }) {
        if (onConnect) {
            universalProvider.on('connect', ()=>{
                const accounts = WcHelpersUtil.getWalletConnectAccounts(universalProvider, namespace);
                onConnect(accounts);
            });
        }
        if (onDisconnect) {
            universalProvider.on('disconnect', ()=>{
                onDisconnect();
            });
        }
        if (onAccountsChanged) {
            /*
             * In multichain scenario - every adapter will listen to accountsChanged event
             * so make sure to call `onAccountsChanged` only on the namespace that actually has accounts changed
             */ universalProvider.on('accountsChanged', (accounts)=>{
                try {
                    const allAccounts = universalProvider.session?.namespaces?.[namespace]?.accounts || [];
                    const defaultChain = universalProvider.rpcProviders?.[namespace]?.getDefaultChain();
                    const parsedAccounts = accounts.map((account)=>{
                        const caipAccount = allAccounts.find((acc)=>acc.includes(`${namespace}:${defaultChain}:${account}`));
                        if (!caipAccount) {
                            return undefined;
                        }
                        const { chainId, chainNamespace } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(caipAccount);
                        return {
                            address: account,
                            chainId,
                            chainNamespace
                        };
                    }).filter((account)=>account !== undefined);
                    // Emit accountsChanged event only if there are accounts
                    if (parsedAccounts.length > 0) {
                        onAccountsChanged(parsedAccounts);
                    }
                } catch (error) {
                    console.warn('Failed to parse accounts for namespace on accountsChanged event', namespace, accounts, error);
                }
            });
        }
        if (onChainChanged) {
            universalProvider.on('chainChanged', (chainId)=>{
                onChainChanged(chainId);
            });
        }
        if (onDisplayUri) {
            universalProvider.on('display_uri', (uri)=>{
                onDisplayUri(uri);
            });
        }
    },
    getWalletConnectAccounts (universalProvider, namespace) {
        const accountsAdded = new Set();
        const accounts = universalProvider?.session?.namespaces?.[namespace]?.accounts?.map((account)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(account)).filter(({ address })=>{
            if (accountsAdded.has(address.toLowerCase())) {
                return false;
            }
            accountsAdded.add(address.toLowerCase());
            return true;
        });
        if (accounts && accounts.length > 0) {
            return accounts;
        }
        return [];
    }
}; //# sourceMappingURL=HelpersUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/connections/ConnectionManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectionManager",
    ()=>ConnectionManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/utils.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/bitcoin/BitcoinConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
class ConnectionManager {
    constructor(params){
        this.namespace = params.namespace;
    }
    async syncConnections(params) {
        switch(this.namespace){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM:
                await this.syncEVMConnections(params);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA:
                await this.syncSolanaConnections(params);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.BITCOIN:
                await this.syncBitcoinConnections(params);
                break;
            default:
                throw new Error(`Unsupported chain namespace: ${this.namespace}`);
        }
    }
    async syncEVMConnections({ connectors, caipNetworks, universalProvider, onConnection, onListenProvider }) {
        await Promise.all(connectors.filter((c)=>{
            const { hasDisconnected, hasConnected } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].getConnectorStorageInfo(c.id, this.namespace);
            return !hasDisconnected && hasConnected;
        }).map(async (connector)=>{
            if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT) {
                const accounts = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].getWalletConnectAccounts(universalProvider, this.namespace);
                const caipNetwork = caipNetworks.find((n)=>n.chainNamespace === this.namespace && n.id.toString() === accounts[0]?.chainId?.toString());
                if (accounts.length > 0) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map((account)=>({
                                address: account.address
                            })),
                        caipNetwork
                    });
                }
            } else {
                const { accounts, chainId } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorUtil"].fetchProviderData(connector);
                if (accounts.length > 0 && chainId) {
                    const caipNetwork = caipNetworks.find((n)=>n.chainNamespace === this.namespace && n.id.toString() === chainId.toString());
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map((address)=>({
                                address
                            })),
                        caipNetwork
                    });
                    if (connector.provider && connector.id !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH && connector.id !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT) {
                        onListenProvider(connector.id, connector.provider);
                    }
                }
            }
        }));
    }
    async syncSolanaConnections({ connectors, caipNetwork, universalProvider, onConnection, onListenProvider }) {
        await Promise.all(connectors.filter((c)=>{
            const { hasDisconnected, hasConnected } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].getConnectorStorageInfo(c.id, this.namespace);
            return !hasDisconnected && hasConnected;
        }).map(async (connector)=>{
            if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT) {
                const accounts = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].getWalletConnectAccounts(universalProvider, this.namespace);
                if (accounts.length > 0) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map((account)=>({
                                address: account.address
                            })),
                        caipNetwork
                    });
                }
            } else {
                const address = await connector.connect({
                    chainId: caipNetwork?.id
                });
                if (address) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: [
                            {
                                address
                            }
                        ],
                        caipNetwork
                    });
                    onListenProvider(connector.id, connector.provider);
                }
            }
        }));
    }
    async syncBitcoinConnections({ connectors, caipNetwork, universalProvider, onConnection, onListenProvider }) {
        await Promise.all(connectors.filter((c)=>{
            const { hasDisconnected, hasConnected } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].getConnectorStorageInfo(c.id, this.namespace);
            return !hasDisconnected && hasConnected;
        }).map(async (connector)=>{
            if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT) {
                const accounts = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].getWalletConnectAccounts(universalProvider, this.namespace);
                if (accounts.length > 0) {
                    onConnection({
                        connectorId: connector.id,
                        accounts: accounts.map((account)=>({
                                address: account.address
                            })),
                        caipNetwork
                    });
                }
                return;
            }
            const address = await connector.connect();
            const addresses = await connector.getAccountAddresses();
            let accounts = addresses?.map((a)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.BITCOIN, a.address, a.purpose || 'payment', a.publicKey, a.path));
            if (accounts && accounts.length > 1) {
                accounts = [
                    {
                        namespace: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.BITCOIN,
                        publicKey: accounts[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitcoinConstantsUtil"].ACCOUNT_INDEXES.PAYMENT]?.publicKey ?? '',
                        path: accounts[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitcoinConstantsUtil"].ACCOUNT_INDEXES.PAYMENT]?.path ?? '',
                        address: accounts[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitcoinConstantsUtil"].ACCOUNT_INDEXES.PAYMENT]?.address ?? '',
                        type: 'payment'
                    },
                    {
                        namespace: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.BITCOIN,
                        publicKey: accounts[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitcoinConstantsUtil"].ACCOUNT_INDEXES.ORDINAL]?.publicKey ?? '',
                        path: accounts[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitcoinConstantsUtil"].ACCOUNT_INDEXES.ORDINAL]?.path ?? '',
                        address: accounts[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$bitcoin$2f$BitcoinConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitcoinConstantsUtil"].ACCOUNT_INDEXES.ORDINAL]?.address ?? '',
                        type: 'ordinal'
                    }
                ];
            }
            const chain = connector.chains.find((c)=>c.id === caipNetwork?.id) || connector.chains[0];
            if (!chain) {
                throw new Error('The connector does not support any of the requested chains');
            }
            if (address) {
                onListenProvider(connector.id, connector.provider);
                onConnection({
                    connectorId: connector.id,
                    accounts: accounts.map((a)=>({
                            address: a.address,
                            type: a.type,
                            publicKey: a.publicKey,
                            path: a.path
                        })),
                    caipNetwork
                });
            }
        }));
    }
    /**
     * Gets a connection based on provided parameters.
     * If connectorId is provided, returns connection for that specific connector.
     * Otherwise, returns the first available valid connection.
     *
     * @param params - Connection parameters
     * @param params.address - Optional address to filter by
     * @param params.connectorId - Optional connector ID to filter by
     * @param params.connections - List of available connections
     * @param params.connectors - List of available connectors
     * @returns Connection or null if none found
     */ getConnection({ address, connectorId, connections, connectors }) {
        if (connectorId) {
            const connection = connections.find((c)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(c.connectorId, connectorId));
            if (!connection) {
                return null;
            }
            const connector = connectors.find((c)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(c.id, connection.connectorId));
            const account = address ? connection.accounts.find((a)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(a.address, address)) : connection.accounts[0];
            return {
                ...connection,
                account,
                connector
            };
        }
        const validConnection = connections.find((c)=>c.accounts.length > 0 && connectors.some((conn)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(conn.id, c.connectorId)));
        if (validConnection) {
            const [account] = validConnection.accounts;
            const connector = connectors.find((c)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(c.id, validConnection.connectorId));
            return {
                ...validConnection,
                account,
                connector
            };
        }
        return null;
    }
} //# sourceMappingURL=ConnectionManager.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WcConstantsUtil",
    ()=>WcConstantsUtil
]);
const WcConstantsUtil = {
    ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
    ERROR_CODE_DEFAULT: 5000,
    ERROR_INVALID_CHAIN_ID: 32603,
    DEFAULT_ALLOWED_ANCESTORS: [
        'http://localhost:*',
        'https://localhost:*',
        'http://127.0.0.1:*',
        'https://127.0.0.1:*',
        'https://*.pages.dev',
        'https://*.vercel.app',
        'https://*.ngrok-free.app',
        'https://secure-mobile.walletconnect.com',
        'https://secure-mobile.walletconnect.org'
    ]
}; //# sourceMappingURL=ConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/TypesUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=TypesUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$TypesUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/TypesUtil.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletConnectConnector",
    ()=>WalletConnectConnector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
;
;
;
;
;
class WalletConnectConnector {
    constructor({ provider, namespace }){
        this.id = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
        this.name = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorNamesMap[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT];
        this.type = 'WALLET_CONNECT';
        this.imageId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT];
        this.getCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks.bind(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"]);
        this.caipNetworks = this.getCaipNetworks();
        this.provider = provider;
        this.chain = namespace;
    }
    get chains() {
        return this.getCaipNetworks();
    }
    async connectWalletConnect() {
        const isAuthenticated = await this.authenticate();
        if (!isAuthenticated) {
            const caipNetworks = this.getCaipNetworks();
            const universalProviderConfigOverride = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.universalProviderConfigOverride;
            const namespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].createNamespaces(caipNetworks, universalProviderConfigOverride);
            await this.provider.connect({
                optionalNamespaces: namespaces
            });
        }
        return {
            clientId: await this.provider.client.core.crypto.getClientId(),
            session: this.provider.session
        };
    }
    async disconnect() {
        await this.provider.disconnect();
    }
    async authenticate() {
        const chains = this.chains.map((network)=>network.caipNetworkId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].universalProviderAuthenticate({
            universalProvider: this.provider,
            chains,
            methods: OPTIONAL_METHODS
        });
    }
}
const OPTIONAL_METHODS = [
    'eth_accounts',
    'eth_requestAccounts',
    'eth_sendRawTransaction',
    'eth_sign',
    'eth_signTransaction',
    'eth_signTypedData',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
    'eth_sendTransaction',
    'personal_sign',
    'wallet_switchEthereumChain',
    'wallet_addEthereumChain',
    'wallet_getPermissions',
    'wallet_requestPermissions',
    'wallet_registerOnboarding',
    'wallet_watchAsset',
    'wallet_scanQRCode',
    // EIP-5792
    'wallet_getCallsStatus',
    'wallet_sendCalls',
    'wallet_getCapabilities',
    // EIP-7715
    'wallet_grantPermissions',
    'wallet_revokePermissions',
    //EIP-7811
    'wallet_getAssets'
]; //# sourceMappingURL=WalletConnectConnector.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/adapters/ChainAdapterBlueprint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdapterBlueprint",
    ()=>AdapterBlueprint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ErrorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ethers$2f$EthersHelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ethers/EthersHelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connections$2f$ConnectionManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/connections/ConnectionManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const IGNORED_CONNECTOR_IDS_FOR_LISTENER = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT
];
class AdapterBlueprint {
    /**
     * Creates an instance of AdapterBlueprint.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */ constructor(params){
        this.availableConnectors = [];
        this.availableConnections = [];
        this.providerHandlers = {};
        this.eventListeners = new Map();
        this.getCaipNetworks = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(namespace);
        this.getConnectorId = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace);
        if (params) {
            this.construct(params);
        }
        if (params?.namespace) {
            this.connectionManager = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connections$2f$ConnectionManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionManager"]({
                namespace: params.namespace
            });
        }
    }
    /**
     * Initializes the adapter with the given parameters.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */ construct(params) {
        this.projectId = params.projectId;
        this.namespace = params.namespace;
        this.adapterType = params.adapterType;
    }
    /**
     * Gets the available connectors.
     * @returns {Connector[]} An array of available connectors
     */ get connectors() {
        return this.availableConnectors;
    }
    /**
     * Gets the available connections.
     * @returns {Connection[]} An array of available connections
     */ get connections() {
        return this.availableConnections;
    }
    /**
     * Gets the supported networks.
     * @returns {CaipNetwork[]} An array of supported networks
     */ get networks() {
        return this.getCaipNetworks(this.namespace);
    }
    /**
     * Handles the auth connected event.
     * @param {W3mFrameTypes.Responses['FrameGetUserResponse']} user - The user response
     */ onAuthConnected({ accounts, chainId }) {
        const caipNetwork = this.getCaipNetworks().filter((n)=>n.chainNamespace === this.namespace).find((n)=>n.id.toString() === chainId?.toString());
        if (accounts && caipNetwork) {
            this.addConnection({
                connectorId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
                accounts,
                caipNetwork
            });
        }
    }
    /**
     * Sets the auth provider.
     * @param {W3mFrameProvider} authProvider - The auth provider instance
     */ setAuthProvider(authProvider) {
        authProvider.onConnect(this.onAuthConnected.bind(this));
        authProvider.onSocialConnected(this.onAuthConnected.bind(this));
        this.addConnector({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
            type: 'AUTH',
            name: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_NAMES.AUTH,
            provider: authProvider,
            imageId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH],
            chain: this.namespace,
            chains: []
        });
    }
    /**
     * Adds one or more connectors to the available connectors list.
     * @param {...Connector} connectors - The connectors to add
     */ addConnector(...connectors) {
        const connectorsAdded = new Set();
        this.availableConnectors = [
            ...connectors,
            ...this.availableConnectors
        ].filter((connector)=>{
            if (connectorsAdded.has(connector.id)) {
                return false;
            }
            connectorsAdded.add(connector.id);
            return true;
        });
        this.emit('connectors', this.availableConnectors);
    }
    /**
     * Adds connections to the available connections list
     * @param {...Connection} connections - The connections to add
     */ addConnection(...connections) {
        const connectionsAdded = new Set();
        this.availableConnections = [
            ...connections,
            ...this.availableConnections
        ].filter((connection)=>{
            if (connectionsAdded.has(connection.connectorId.toLowerCase())) {
                return false;
            }
            connectionsAdded.add(connection.connectorId.toLowerCase());
            return true;
        });
        this.emit('connections', this.availableConnections);
    }
    /**
     * Deletes a connection from the available connections list
     * @param {string} connectorId - The connector ID of the connection to delete
     */ deleteConnection(connectorId) {
        this.availableConnections = this.availableConnections.filter((c)=>!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(c.connectorId, connectorId));
        this.emit('connections', this.availableConnections);
    }
    /**
     * Clears all connections from the available connections list
     * @param {boolean} emit - Whether to emit the connections event
     */ clearConnections(emit = false) {
        this.availableConnections = [];
        if (emit) {
            this.emit('connections', this.availableConnections);
        }
    }
    setStatus(status, chainNamespace) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('status', status, chainNamespace);
    }
    /**
     * Adds an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
     */ on(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, new Set());
        }
        this.eventListeners.get(eventName)?.add(callback);
    }
    /**
     * Removes an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be removed
     */ off(eventName, callback) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
        }
    }
    /**
     * Removes all event listeners.
     */ removeAllEventListeners() {
        this.eventListeners.forEach((listeners)=>{
            listeners.clear();
        });
    }
    /**
     * Emits an event with the given name and optional data.
     * @template T
     * @param {T} eventName - The name of the event to emit
     * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
     */ emit(eventName, data) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.forEach((callback)=>callback(data));
        }
    }
    /**
     * Connects to WalletConnect.
     * @param {number | string} [_chainId] - Optional chain ID to connect to
     */ async connectWalletConnect(_chainId) {
        try {
            const connector = this.getWalletConnectConnector();
            const result = await connector.connectWalletConnect();
            return {
                clientId: result.clientId
            };
        } catch (err) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].isUserRejectedRequestError(err)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
            }
            throw err;
        }
    }
    /**
     * Switches the network.
     * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
     */ async switchNetwork(params) {
        const { caipNetwork, providerType } = params;
        if (!params.provider) {
            return;
        }
        const provider = 'provider' in params.provider ? params.provider.provider : params.provider;
        if (providerType === 'WALLET_CONNECT') {
            ;
            provider.setDefaultChain(caipNetwork.caipNetworkId);
            return;
        }
        if (provider && providerType === 'AUTH') {
            const authProvider = provider;
            const preferredAccountType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(caipNetwork.chainNamespace);
            await authProvider.switchNetwork({
                chainId: caipNetwork.caipNetworkId
            });
            const user = await authProvider.getUser({
                chainId: caipNetwork.caipNetworkId,
                preferredAccountType
            });
            this.emit('switchNetwork', user);
        }
    }
    getWalletConnectConnector() {
        const connector = this.connectors.find((c)=>c instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectConnector"]);
        if (!connector) {
            throw new Error('WalletConnectConnector not found');
        }
        return connector;
    }
    /**
     * Handles connect event for a specific connector.
     * @param {string[]} accounts - The accounts that changed
     * @param {string} connectorId - The ID of the connector
     */ onConnect(accounts, connectorId) {
        if (accounts.length > 0) {
            const { address, chainId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAccount(accounts[0]);
            const caipNetwork = this.getCaipNetworks().filter((n)=>n.chainNamespace === this.namespace).find((n)=>n.id.toString() === chainId?.toString());
            const connector = this.connectors.find((c)=>c.id === connectorId);
            if (address) {
                this.emit('accountChanged', {
                    address,
                    chainId,
                    connector
                });
                this.addConnection({
                    connectorId,
                    accounts: accounts.map((_account)=>{
                        const { address } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAccount(_account);
                        return {
                            address: address
                        };
                    }),
                    caipNetwork
                });
            }
        }
    }
    /**
     * Handles accounts changed event for a specific connector.
     * @param {string[]} accounts - The accounts that changed
     * @param {string} connectorId - The ID of the connector
     */ onAccountsChanged(accounts, connectorId, disconnectIfNoAccounts = true) {
        if (accounts.length > 0) {
            const { address } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAccount(accounts[0]);
            const connection = this.connectionManager?.getConnection({
                connectorId,
                connections: this.connections,
                connectors: this.connectors
            });
            if (address && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(this.getConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM), connectorId)) {
                this.emit('accountChanged', {
                    address,
                    chainId: connection?.caipNetwork?.id,
                    connector: connection?.connector
                });
            }
            this.addConnection({
                connectorId,
                accounts: accounts.map((_account)=>{
                    const { address } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAccount(_account);
                    return {
                        address: address
                    };
                }),
                caipNetwork: connection?.caipNetwork
            });
        } else if (disconnectIfNoAccounts) {
            this.onDisconnect(connectorId);
        }
    }
    /**
     * Handles disconnect event for a specific connector.
     * @param {string} connectorId - The ID of the connector
     */ onDisconnect(connectorId) {
        this.removeProviderListeners(connectorId);
        this.deleteConnection(connectorId);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(this.getConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM), connectorId)) {
            this.emitFirstAvailableConnection();
        }
        if (this.connections.length === 0) {
            this.emit('disconnect');
        }
    }
    /**
     * Handles chain changed event for a specific connector.
     * @param {string} chainId - The ID of the chain that changed
     * @param {string} connectorId - The ID of the connector
     */ onChainChanged(chainId, connectorId) {
        const formattedChainId = typeof chainId === 'string' && chainId.startsWith('0x') ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ethers$2f$EthersHelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EthersHelpersUtil"].hexStringToNumber(chainId).toString() : chainId.toString();
        const connection = this.connectionManager?.getConnection({
            connectorId,
            connections: this.connections,
            connectors: this.connectors
        });
        const caipNetwork = this.getCaipNetworks().filter((n)=>n.chainNamespace === this.namespace).find((n)=>n.id.toString() === formattedChainId);
        if (connection) {
            this.addConnection({
                connectorId,
                accounts: connection.accounts,
                caipNetwork
            });
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(this.getConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM), connectorId)) {
            this.emit('switchNetwork', {
                chainId: formattedChainId
            });
        }
    }
    /**
     * Listens to provider events for a specific connector.
     * @param {string} connectorId - The ID of the connector
     * @param {Provider | CombinedProvider} provider - The provider to listen to
     */ listenProviderEvents(connectorId, provider) {
        if (IGNORED_CONNECTOR_IDS_FOR_LISTENER.includes(connectorId)) {
            return;
        }
        const accountsChangedHandler = (accounts)=>this.onAccountsChanged(accounts, connectorId);
        const chainChangedHandler = (chainId)=>this.onChainChanged(chainId, connectorId);
        const disconnectHandler = ()=>this.onDisconnect(connectorId);
        if (!this.providerHandlers[connectorId]) {
            provider.on('disconnect', disconnectHandler);
            provider.on('accountsChanged', accountsChangedHandler);
            provider.on('chainChanged', chainChangedHandler);
            this.providerHandlers[connectorId] = {
                provider,
                disconnect: disconnectHandler,
                accountsChanged: accountsChangedHandler,
                chainChanged: chainChangedHandler
            };
        }
    }
    /**
     * Removes provider listeners for a specific connector.
     * @param {string} connectorId - The ID of the connector
     */ removeProviderListeners(connectorId) {
        if (this.providerHandlers[connectorId]) {
            const { provider, disconnect, accountsChanged, chainChanged } = this.providerHandlers[connectorId];
            provider.removeListener('disconnect', disconnect);
            provider.removeListener('accountsChanged', accountsChanged);
            provider.removeListener('chainChanged', chainChanged);
            this.providerHandlers[connectorId] = null;
        }
    }
    /**
     * Emits the first available connection.
     */ emitFirstAvailableConnection() {
        const connection = this.connectionManager?.getConnection({
            connections: this.connections,
            connectors: this.connectors
        });
        if (connection) {
            const [account] = connection.accounts;
            this.emit('accountChanged', {
                address: account?.address,
                chainId: connection.caipNetwork?.id,
                connector: connection.connector
            });
        }
    }
} //# sourceMappingURL=ChainAdapterBlueprint.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/universal-adapter/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniversalAdapter",
    ()=>UniversalAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/bs58/src/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/adapters/ChainAdapterBlueprint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
class UniversalAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdapterBlueprint"] {
    async setUniversalProvider(universalProvider) {
        if (!this.namespace) {
            throw new Error('UniversalAdapter:setUniversalProvider - namespace is required');
        }
        this.addConnector(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectConnector"]({
            provider: universalProvider,
            caipNetworks: this.getCaipNetworks(),
            namespace: this.namespace
        }));
        return Promise.resolve();
    }
    async connect(params) {
        return Promise.resolve({
            id: 'WALLET_CONNECT',
            type: 'WALLET_CONNECT',
            chainId: Number(params.chainId),
            provider: this.provider,
            address: ''
        });
    }
    async disconnect() {
        try {
            const connector = this.getWalletConnectConnector();
            await connector.disconnect();
            this.emit('disconnect');
        } catch (error) {
            console.warn('UniversalAdapter:disconnect - error', error);
        }
        return {
            connections: []
        };
    }
    syncConnections() {
        return Promise.resolve();
    }
    async getAccounts({ namespace }) {
        const provider = this.provider;
        const addresses = provider?.session?.namespaces?.[namespace]?.accounts?.map((account)=>{
            const [, , address] = account.split(':');
            return address;
        }).filter((address, index, self)=>self.indexOf(address) === index) || [];
        return Promise.resolve({
            accounts: addresses.map((address)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(namespace, address, namespace === 'bip122' ? 'payment' : 'eoa'))
        });
    }
    async syncConnectors() {
        return Promise.resolve();
    }
    async getBalance(params) {
        const isBalanceSupported = params.caipNetwork && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].BALANCE_SUPPORTED_CHAINS.includes(params.caipNetwork?.chainNamespace);
        if (!isBalanceSupported || params.caipNetwork?.testnet) {
            return {
                balance: '0.00',
                symbol: params.caipNetwork?.nativeCurrency.symbol || ''
            };
        }
        const accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData();
        if (accountData?.balanceLoading && params.chainId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id) {
            return {
                balance: accountData?.balance || '0.00',
                symbol: accountData?.balanceSymbol || ''
            };
        }
        const balances = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].fetchTokenBalance();
        const balance = balances.find((b)=>b.chainId === `${params.caipNetwork?.chainNamespace}:${params.chainId}` && b.symbol === params.caipNetwork?.nativeCurrency.symbol);
        return {
            balance: balance?.quantity.numeric || '0.00',
            symbol: balance?.symbol || params.caipNetwork?.nativeCurrency.symbol || ''
        };
    }
    async signMessage(params) {
        const { provider, message, address } = params;
        if (!provider) {
            throw new Error('UniversalAdapter:signMessage - provider is undefined');
        }
        let signature = '';
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA) {
            const response = await provider.request({
                method: 'solana_signMessage',
                params: {
                    message: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(new TextEncoder().encode(message)),
                    pubkey: address
                }
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
            signature = response.signature;
        } else {
            signature = await provider.request({
                method: 'personal_sign',
                params: [
                    message,
                    address
                ]
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        }
        return {
            signature
        };
    }
    // -- Transaction methods ---------------------------------------------------
    /**
     *
     * These methods are supported only on `wagmi` and `ethers` since the Solana SDK does not support them in the same way.
     * These function definition is to have a type parity between the clients. Currently not in use.
     */ async estimateGas() {
        return Promise.resolve({
            gas: BigInt(0)
        });
    }
    async sendTransaction() {
        return Promise.resolve({
            hash: ''
        });
    }
    walletGetAssets(_params) {
        return Promise.resolve({});
    }
    async writeContract() {
        return Promise.resolve({
            hash: ''
        });
    }
    emitFirstAvailableConnection() {
        return undefined;
    }
    parseUnits() {
        return 0n;
    }
    formatUnits() {
        return '0';
    }
    async getCapabilities() {
        return Promise.resolve({});
    }
    async grantPermissions() {
        return Promise.resolve({});
    }
    async revokePermissions() {
        return Promise.resolve('0x');
    }
    async syncConnection() {
        return Promise.resolve({
            id: 'WALLET_CONNECT',
            type: 'WALLET_CONNECT',
            chainId: 1,
            provider: this.provider,
            address: ''
        });
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async switchNetwork(params) {
        const { caipNetwork } = params;
        const connector = this.getWalletConnectConnector();
        if (caipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
            try {
                await connector.provider?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(caipNetwork.id)
                        }
                    ]
                });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (switchError) {
                if (switchError.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_CODE_UNRECOGNIZED_CHAIN_ID || switchError.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_INVALID_CHAIN_ID || switchError.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_CODE_DEFAULT || switchError?.data?.originalError?.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_CODE_UNRECOGNIZED_CHAIN_ID) {
                    try {
                        await connector.provider?.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(caipNetwork.id),
                                    rpcUrls: [
                                        caipNetwork?.rpcUrls['chainDefault']?.http
                                    ],
                                    chainName: caipNetwork.name,
                                    nativeCurrency: caipNetwork.nativeCurrency,
                                    blockExplorerUrls: [
                                        caipNetwork.blockExplorers?.default.url
                                    ]
                                }
                            ]
                        });
                    } catch (error) {
                        throw new Error('Chain is not supported');
                    }
                }
            }
        }
        connector.provider.setDefaultChain(caipNetwork.caipNetworkId);
    }
    getWalletConnectProvider() {
        const connector = this.connectors.find((c)=>c.type === 'WALLET_CONNECT');
        const provider = connector?.provider;
        return provider;
    }
} //# sourceMappingURL=client.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/ConfigUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfigUtil",
    ()=>ConfigUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ErrorUtil.js [app-client] (ecmascript)");
;
;
const FEATURE_KEYS = [
    'email',
    'socials',
    'swaps',
    'onramp',
    'activity',
    'reownBranding',
    'multiWallet',
    'emailCapture',
    'payWithExchange',
    'payments',
    'reownAuthentication'
];
const featureConfig = {
    email: {
        apiFeatureName: 'social_login',
        localFeatureName: 'email',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>{
            if (!apiConfig?.config) {
                return false;
            }
            const config = apiConfig.config;
            return Boolean(apiConfig.isEnabled) && config.includes('email');
        },
        processFallback: (localValue)=>{
            if (localValue === undefined) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.email;
            }
            return Boolean(localValue);
        }
    },
    socials: {
        apiFeatureName: 'social_login',
        localFeatureName: 'socials',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>{
            if (!apiConfig?.config) {
                return false;
            }
            const config = apiConfig.config;
            return Boolean(apiConfig.isEnabled) && config.length > 0 ? config.filter((s)=>s !== 'email') : false;
        },
        processFallback: (localValue)=>{
            if (localValue === undefined) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.socials;
            }
            if (typeof localValue === 'boolean') {
                return localValue ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.socials : false;
            }
            return localValue;
        }
    },
    swaps: {
        apiFeatureName: 'swap',
        localFeatureName: 'swaps',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>{
            if (!apiConfig?.config) {
                return false;
            }
            const config = apiConfig.config;
            return Boolean(apiConfig.isEnabled) && config.length > 0 ? config : false;
        },
        processFallback: (localValue)=>{
            if (localValue === undefined) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.swaps;
            }
            if (typeof localValue === 'boolean') {
                return localValue ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.swaps : false;
            }
            return localValue;
        }
    },
    onramp: {
        apiFeatureName: 'onramp',
        localFeatureName: 'onramp',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>{
            if (!apiConfig?.config) {
                return false;
            }
            const config = apiConfig.config;
            return Boolean(apiConfig.isEnabled) && config.length > 0 ? config : false;
        },
        processFallback: (localValue)=>{
            if (localValue === undefined) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.onramp;
            }
            if (typeof localValue === 'boolean') {
                return localValue ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.onramp : false;
            }
            return localValue;
        }
    },
    activity: {
        apiFeatureName: 'activity',
        localFeatureName: 'history',
        returnType: false,
        isLegacy: true,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>Boolean(apiConfig.isEnabled),
        processFallback: (localValue)=>{
            if (localValue === undefined) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.activity;
            }
            return Boolean(localValue);
        }
    },
    reownBranding: {
        apiFeatureName: 'reown_branding',
        localFeatureName: 'reownBranding',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>Boolean(apiConfig.isEnabled),
        processFallback: (localValue)=>{
            if (localValue === undefined) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.reownBranding;
            }
            return Boolean(localValue);
        }
    },
    emailCapture: {
        apiFeatureName: 'email_capture',
        localFeatureName: 'emailCapture',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>apiConfig.isEnabled && (apiConfig.config ?? []),
        processFallback: (_localValue)=>false
    },
    multiWallet: {
        apiFeatureName: 'multi_wallet',
        localFeatureName: 'multiWallet',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>Boolean(apiConfig.isEnabled),
        processFallback: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.multiWallet
    },
    payWithExchange: {
        apiFeatureName: 'fund_from_exchange',
        localFeatureName: 'payWithExchange',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>Boolean(apiConfig.isEnabled),
        processFallback: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.payWithExchange
    },
    payments: {
        apiFeatureName: 'payments',
        localFeatureName: 'payments',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>Boolean(apiConfig.isEnabled),
        processFallback: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.payments
    },
    reownAuthentication: {
        apiFeatureName: 'reown_authentication',
        localFeatureName: 'reownAuthentication',
        returnType: false,
        isLegacy: false,
        isAvailableOnBasic: false,
        processApi: (apiConfig)=>Boolean(apiConfig.isEnabled),
        processFallback: (localValue)=>{
            if (typeof localValue === 'undefined') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.reownAuthentication;
            }
            return Boolean(localValue);
        }
    }
};
const ConfigUtil = {
    localSettingsOverridden: new Set(),
    getApiConfig (id, apiProjectConfig) {
        return apiProjectConfig?.find((f)=>f.id === id);
    },
    addWarning (localFeatureValue, featureKey) {
        if (localFeatureValue !== undefined) {
            const config = featureConfig[featureKey];
            const warningName = config.isLegacy ? `"features.${config.localFeatureName}" (now "${featureKey}")` : `"features.${featureKey}"`;
            this.localSettingsOverridden.add(warningName);
        }
    },
    processFeature (featureKey, localFeatures, apiProjectConfig, useApi, isBasic) {
        const config = featureConfig[featureKey];
        const localValue = localFeatures[config.localFeatureName];
        if (isBasic && !config.isAvailableOnBasic) {
            return false;
        }
        if (useApi) {
            const apiConfig = this.getApiConfig(config.apiFeatureName, apiProjectConfig);
            if (apiConfig?.config === null) {
                return this.processFallbackFeature(featureKey, localValue);
            }
            if (!apiConfig?.config) {
                return false;
            }
            if (localValue !== undefined) {
                this.addWarning(localValue, featureKey);
            }
            return this.processApiFeature(featureKey, apiConfig);
        }
        return this.processFallbackFeature(featureKey, localValue);
    },
    processApiFeature (featureKey, apiConfig) {
        return featureConfig[featureKey].processApi(apiConfig);
    },
    processFallbackFeature (featureKey, localValue) {
        return featureConfig[featureKey].processFallback(localValue);
    },
    async fetchRemoteFeatures (config) {
        const isBasic = config.basic ?? false;
        const localFeatures = config.features || {};
        this.localSettingsOverridden.clear();
        let apiProjectConfig = null;
        let shouldUseApiConfig = false;
        try {
            apiProjectConfig = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchProjectConfig();
            shouldUseApiConfig = apiProjectConfig !== null && apiProjectConfig !== undefined;
        } catch (e) {
            console.warn('[Reown Config] Failed to fetch remote project configuration. Using local/default values.', e);
        }
        const remoteFeaturesConfig = shouldUseApiConfig && !isBasic ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES_DISABLED;
        try {
            for (const featureKey of FEATURE_KEYS){
                const result = this.processFeature(featureKey, localFeatures, apiProjectConfig, shouldUseApiConfig, isBasic);
                Object.assign(remoteFeaturesConfig, {
                    [featureKey]: result
                });
            }
        } catch (e) {
            console.warn('[Reown Config] Failed to process the configuration from Cloud. Using default values.', e);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES;
        }
        if (shouldUseApiConfig && this.localSettingsOverridden.size > 0) {
            const warningMessage = `Your local configuration for ${Array.from(this.localSettingsOverridden).join(', ')} was ignored because a remote configuration was successfully fetched. Please manage these features via your project dashboard on dashboard.reown.com.`;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open({
                debugMessage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_WARNINGS.LOCAL_CONFIGURATION_IGNORED.debugMessage(warningMessage)
            }, 'warning');
        }
        return remoteFeaturesConfig;
    }
}; //# sourceMappingURL=ConfigUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/client/appkit-base-client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppKitBaseClient",
    ()=>AppKitBaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectionControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectionControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OnRampController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OnRampController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ProviderController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SendController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SendController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/utils.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/CaipNetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ErrorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$LoggerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/LoggerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$SemVerUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/SemVerUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$TokenUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/TokenUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$universal$2d$adapter$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/universal-adapter/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConfigUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/ConfigUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class AppKitBaseClient {
    constructor(options){
        this.chainNamespaces = [];
        this.features = {};
        this.remoteFeatures = {};
        this.reportedAlertErrors = {};
        // -- Public Internal ---------------------------------------------------
        this.getCaipNetwork = (chainNamespace, id)=>{
            if (chainNamespace) {
                const caipNetworkWithId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(chainNamespace)?.find((c)=>c.id === id);
                if (caipNetworkWithId) {
                    return caipNetworkWithId;
                }
                const namespaceCaipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getNetworkData(chainNamespace)?.caipNetwork;
                if (namespaceCaipNetwork) {
                    return namespaceCaipNetwork;
                }
                const requestedCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworks(chainNamespace);
                return requestedCaipNetworks.filter((c)=>c.chainNamespace === chainNamespace)?.[0];
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork || this.defaultCaipNetwork;
        };
        this.getCaipNetworkId = ()=>{
            const network = this.getCaipNetwork();
            if (network) {
                return network.id;
            }
            return undefined;
        };
        this.getCaipNetworks = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworks(namespace);
        this.getActiveChainNamespace = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        this.setRequestedCaipNetworks = (requestedCaipNetworks, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setRequestedCaipNetworks(requestedCaipNetworks, chain);
        };
        this.getApprovedCaipNetworkIds = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllApprovedCaipNetworkIds();
        this.getCaipAddress = (chainNamespace)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace || !chainNamespace) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(chainNamespace)?.accountState?.caipAddress;
        };
        this.setClientId = (clientId)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].setClientId(clientId);
        };
        this.getProvider = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(namespace);
        this.getProviderType = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProviderId(namespace);
        this.getPreferredAccountType = (namespace)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(namespace);
        this.setCaipAddress = (caipAddress, chain, shouldRefresh = false)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('caipAddress', caipAddress, chain, shouldRefresh);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('address', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress), chain, shouldRefresh);
        };
        this.setBalance = (balance, balanceSymbol, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('balance', balance, chain);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('balanceSymbol', balanceSymbol, chain);
        };
        this.setProfileName = (profileName, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('profileName', profileName, chain);
        };
        this.setProfileImage = (profileImage, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('profileImage', profileImage, chain);
        };
        this.setUser = (user, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('user', user, chain);
        };
        this.resetAccount = (chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].resetAccount(chain);
        };
        this.setCaipNetwork = (caipNetwork)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveCaipNetwork(caipNetwork);
        };
        this.setCaipNetworkOfNamespace = (caipNetwork, chainNamespace)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setChainNetworkData(chainNamespace, {
                caipNetwork
            });
        };
        this.setStatus = (status, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('status', status, chain);
            // If at least one namespace is connected, set the connection status
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].isConnected()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectionStatus('connected');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectionStatus('disconnected');
            }
        };
        this.getAddressByChainNamespace = (chainNamespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(chainNamespace)?.address;
        this.setConnectors = (connectors)=>{
            const allConnectors = [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.allConnectors,
                ...connectors
            ];
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setConnectors(allConnectors);
        };
        this.setConnections = (connections, chainNamespace)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnections(connections, chainNamespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setConnections(connections, chainNamespace);
        };
        this.fetchIdentity = (request)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchIdentity(request);
        this.getReownName = (address)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnsController"].getNamesForAddress(address);
        this.getConnectors = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors();
        this.getConnectorImage = (connector)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getConnectorImage(connector);
        this.getConnections = (namespace)=>{
            if (!this.remoteFeatures.multiWallet) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, 'info');
                return [];
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectionControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionControllerUtil"].getConnectionsData(namespace).connections;
        };
        this.getRecentConnections = (namespace)=>{
            if (!this.remoteFeatures.multiWallet) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, 'info');
                return [];
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectionControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionControllerUtil"].getConnectionsData(namespace).recentConnections;
        };
        this.switchConnection = async (params)=>{
            if (!this.remoteFeatures.multiWallet) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, 'info');
                return;
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].switchConnection(params);
        };
        this.deleteConnection = (params)=>{
            if (!this.remoteFeatures.multiWallet) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, 'info');
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteAddressFromConnection(params);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].syncStorageConnections();
        };
        this.setConnectedWalletInfo = (connectedWalletInfo, chain)=>{
            const type = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProviderId(chain);
            const walletInfo = connectedWalletInfo ? {
                ...connectedWalletInfo,
                type
            } : undefined;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('connectedWalletInfo', walletInfo, chain);
        };
        this.getIsConnectedState = ()=>Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress);
        this.addAddressLabel = (address, label, chain)=>{
            const addressLabels = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(chain)?.addressLabels || {};
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('addressLabels', {
                ...addressLabels,
                [address]: label
            }, chain);
        };
        this.removeAddressLabel = (address, chain)=>{
            const addressLabels = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(chain)?.addressLabels || {};
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('addressLabels', {
                ...addressLabels,
                [address]: undefined
            }, chain);
        };
        this.getAddress = (chainNamespace)=>{
            const namespace = chainNamespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace)?.address;
        };
        this.setApprovedCaipNetworksData = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setApprovedCaipNetworksData(namespace);
        this.resetNetwork = (namespace)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].resetNetwork(namespace);
        };
        this.addConnector = (connector)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].addConnector(connector);
        };
        this.resetWcConnection = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
        };
        this.setAddressExplorerUrl = (addressExplorerUrl, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('addressExplorerUrl', addressExplorerUrl, chain);
        };
        this.setSmartAccountDeployed = (isDeployed, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('smartAccountDeployed', isDeployed, chain);
        };
        this.setPreferredAccountType = (preferredAccountType, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('preferredAccountType', preferredAccountType, chain);
        };
        this.setEIP6963Enabled = (enabled)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEIP6963Enabled(enabled);
        };
        this.handleUnsafeRPCRequest = ()=>{
            if (this.isOpen()) {
                // If we are on the modal but there is no transaction stack, close the modal
                if (this.isTransactionStackEmpty()) {
                    return;
                }
                // Check if we need to replace or redirect
                this.redirect('ApproveTransaction');
            } else {
                // If called from outside the modal, open ApproveTransaction
                this.open({
                    view: 'ApproveTransaction'
                });
            }
        };
        this.options = options;
        this.version = options.sdkVersion;
        this.caipNetworks = this.extendCaipNetworks(options);
        this.chainNamespaces = this.getChainNamespacesSet(options.adapters, this.caipNetworks);
        this.defaultCaipNetwork = this.extendDefaultCaipNetwork(options);
        this.chainAdapters = this.createAdapters(options.adapters);
        this.readyPromise = this.initialize(options);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$SemVerUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SemVerUtils"].checkSDKVersion(options.sdkVersion);
    }
    getChainNamespacesSet(adapters, caipNetworks) {
        const adapterNamespaces = adapters?.map((adapter)=>adapter.namespace).filter((namespace)=>Boolean(namespace));
        if (adapterNamespaces?.length) {
            return [
                ...new Set(adapterNamespaces)
            ];
        }
        const networkNamespaces = caipNetworks?.map((network)=>network.chainNamespace);
        return [
            ...new Set(networkNamespaces)
        ];
    }
    async initialize(options) {
        this.initializeProjectSettings(options);
        this.initControllers(options);
        await this.initChainAdapters();
        this.sendInitializeEvent(options);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableReconnect) {
            await this.syncExistingConnection();
            await this.syncAdapterConnections();
        } else {
            await this.unSyncExistingConnection();
        }
        this.remoteFeatures = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConfigUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigUtil"].fetchRemoteFeatures(options);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setRemoteFeatures(this.remoteFeatures);
        if (this.remoteFeatures.onramp) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OnRampController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnRampController"].setOnrampProviders(this.remoteFeatures.onramp);
        }
        // Check allowed origins only if email or social features are enabled
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.email || Array.isArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.socials) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.socials.length > 0) {
            await this.checkAllowedOrigins();
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.reownAuthentication || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.reownAuthentication) {
            const { ReownAuthentication } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/exports/features.js [app-client] (ecmascript, async loader)");
            const currentSIWX = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
            if (!(currentSIWX instanceof ReownAuthentication)) {
                if (currentSIWX) {
                    console.warn('ReownAuthentication option is enabled, SIWX configuration will be overridden.');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSIWX(new ReownAuthentication());
            }
        // If siwx is already configured for ReownAuthentication we keep the current instance
        }
    }
    async openSend(args) {
        const namespaceToUse = args.namespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const caipAddress = this.getCaipAddress(namespaceToUse);
        const chainId = this.getCaipNetwork(namespaceToUse)?.id;
        if (!caipAddress) {
            throw new Error('openSend: caipAddress not found');
        }
        if (chainId?.toString() !== args.chainId.toString()) {
            const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworkById(args.chainId, namespaceToUse);
            if (!caipNetwork) {
                throw new Error(`openSend: caipNetwork with chainId ${args.chainId} not found`);
            }
            await this.switchNetwork(caipNetwork, {
                throwOnFailure: true
            });
        }
        try {
            const symbol = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$TokenUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenUtil"].getTokenSymbolByAddress(args.assetAddress);
            if (symbol) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchTokenImages([
                    symbol
                ]);
            }
        } catch  {
        /* Ignore */ }
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
            view: 'WalletSend',
            data: {
                send: args
            }
        });
        return new Promise((resolve, reject)=>{
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SendController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendController"].subscribeKey('hash', (hash)=>{
                if (hash) {
                    cleanup();
                    resolve({
                        hash
                    });
                }
            });
            const unsubscribeModal = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribe((modal)=>{
                if (!modal.open) {
                    cleanup();
                    reject(new Error('Modal closed'));
                }
            });
            const cleanup = this.createCleanupHandler([
                unsubscribe,
                unsubscribeModal
            ]);
        });
    }
    toModalOptions() {
        function isSwap(options) {
            return options?.view === 'Swap';
        }
        function isSend(options) {
            return options?.view === 'WalletSend';
        }
        return {
            isSwap,
            isSend
        };
    }
    async checkAllowedOrigins() {
        try {
            const allowedOrigins = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchAllowedOrigins();
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isClient()) {
                return;
            }
            const currentOrigin = window.location.origin;
            const isOriginAllowed = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].isOriginAllowed(currentOrigin, allowedOrigins, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].DEFAULT_ALLOWED_ANCESTORS);
            if (!isOriginAllowed) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.ORIGIN_NOT_ALLOWED, 'error');
            }
        } catch (error) {
            if (!(error instanceof Error)) {
                return;
            }
            switch(error.message){
                case 'RATE_LIMITED':
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.RATE_LIMITED_APP_CONFIGURATION, 'error');
                    break;
                case 'SERVER_ERROR':
                    {
                        const originalError = error.cause instanceof Error ? error.cause : error;
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open({
                            displayMessage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.SERVER_ERROR_APP_CONFIGURATION.displayMessage,
                            debugMessage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.SERVER_ERROR_APP_CONFIGURATION.debugMessage(originalError.message)
                        }, 'error');
                        break;
                    }
                default:
                    break;
            }
        }
    }
    createCleanupHandler(unsubscribeFunctions) {
        return ()=>{
            unsubscribeFunctions.forEach((unsubscribe)=>{
                try {
                    unsubscribe();
                } catch  {
                // Ignore cleanup errors
                }
            });
        };
    }
    sendInitializeEvent(options) {
        const { ...optionsCopy } = options;
        delete optionsCopy.adapters;
        delete optionsCopy.universalProvider;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'INITIALIZE',
            properties: {
                ...optionsCopy,
                networks: options.networks.map((n)=>n.id),
                siweConfig: {
                    options: options.siweConfig?.options || {}
                }
            }
        });
    }
    // -- Controllers initialization ---------------------------------------------------
    initControllers(options) {
        this.initializeOptionsController(options);
        this.initializeChainController(options);
        this.initializeThemeController(options);
        this.initializeConnectionController(options);
        this.initializeConnectorController();
    }
    initializeThemeController(options) {
        if (options.themeMode) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeMode(options.themeMode);
        }
        if (options.themeVariables) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeVariables(options.themeVariables);
        }
    }
    initializeChainController(options) {
        if (!this.connectionControllerClient || !this.networkControllerClient) {
            throw new Error('ConnectionControllerClient and NetworkControllerClient must be set');
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].initialize(options.adapters ?? [], this.caipNetworks, {
            connectionControllerClient: this.connectionControllerClient,
            networkControllerClient: this.networkControllerClient
        });
        const network = this.getDefaultNetwork();
        if (network) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveCaipNetwork(network);
        }
    }
    initializeConnectionController(options) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].initialize(options.adapters ?? []);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setWcBasic(options.basic ?? false);
    }
    initializeConnectorController() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].initialize(this.chainNamespaces);
    }
    initializeProjectSettings(options) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setProjectId(options.projectId);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSdkVersion(options.sdkVersion);
    }
    initializeOptionsController(options) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setDebug(options.debug !== false);
        // On by default
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableWalletGuide(options.enableWalletGuide !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableWallets(options.enableWallets !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEIP6963Enabled(options.enableEIP6963 !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableNetworkSwitch(options.enableNetworkSwitch !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableReconnect(options.enableReconnect !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableMobileFullScreen(options.enableMobileFullScreen === true);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableAuthLogger(options.enableAuthLogger !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setCustomRpcUrls(options.customRpcUrls);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableEmbedded(options.enableEmbedded);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setAllWallets(options.allWallets);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setIncludeWalletIds(options.includeWalletIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setExcludeWalletIds(options.excludeWalletIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeaturedWalletIds(options.featuredWalletIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setTokens(options.tokens);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setTermsConditionsUrl(options.termsConditionsUrl);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setPrivacyPolicyUrl(options.privacyPolicyUrl);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setCustomWallets(options.customWallets);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures(options.features);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setAllowUnsupportedChain(options.allowUnsupportedChain);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setUniversalProviderConfigOverride(options.universalProviderConfigOverride);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setPreferUniversalLinks(options.experimental_preferUniversalLinks);
        // Save option in controller
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setDefaultAccountTypes(options.defaultAccountTypes);
        const defaultMetaData = this.getDefaultMetaData();
        if (!options.metadata && defaultMetaData) {
            options.metadata = defaultMetaData;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setMetadata(options.metadata);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setDisableAppend(options.disableAppend);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableEmbedded(options.enableEmbedded);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSIWX(options.siwx);
        this.features = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features ?? {};
        if (!options.projectId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, 'error');
            return;
        }
        const evmAdapter = options.adapters?.find((adapter)=>adapter.namespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM);
        // Set the SIWE client for EVM chains
        if (evmAdapter) {
            if (options.siweConfig) {
                if (options.siwx) {
                    throw new Error('Cannot set both `siweConfig` and `siwx` options');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSIWX(options.siweConfig.mapToSIWX());
            }
        }
    }
    getDefaultMetaData() {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isClient()) {
            return {
                name: document.getElementsByTagName('title')?.[0]?.textContent || '',
                description: document.querySelector('meta[property="og:description"]')?.content || '',
                url: window.location.origin,
                icons: [
                    document.querySelector('link[rel~="icon"]')?.href || ''
                ]
            };
        }
        return null;
    }
    // -- Network Initialization ---------------------------------------------------
    setUnsupportedNetwork(chainId) {
        const namespace = this.getActiveChainNamespace();
        if (namespace) {
            const unsupportedNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].getUnsupportedNetwork(`${namespace}:${chainId}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveCaipNetwork(unsupportedNetwork);
        }
    }
    getDefaultNetwork() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].getCaipNetworkFromStorage(this.defaultCaipNetwork);
    }
    extendCaipNetwork(network, options) {
        const extendedNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetwork(network, {
            customNetworkImageUrls: options.chainImages,
            projectId: options.projectId
        });
        return extendedNetwork;
    }
    extendCaipNetworks(options) {
        const extendedNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetworks(options.networks, {
            customNetworkImageUrls: options.chainImages,
            customRpcUrls: options.customRpcUrls,
            projectId: options.projectId
        });
        return extendedNetworks;
    }
    extendDefaultCaipNetwork(options) {
        const defaultNetwork = options.networks.find((n)=>n.id === options.defaultNetwork?.id);
        const extendedNetwork = defaultNetwork ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetwork(defaultNetwork, {
            customNetworkImageUrls: options.chainImages,
            customRpcUrls: options.customRpcUrls,
            projectId: options.projectId
        }) : undefined;
        return extendedNetwork;
    }
    /**
     * Disconnects a connector with the given namespace and id. If the connector id is not provided, disconnects the adapter (namespace).
     * @param namespace ChainNamespace
     * @param id string
     * @returns
     */ async disconnectConnector(namespace, id) {
        try {
            this.setLoading(true, namespace);
            let disconnectResult = {
                connections: []
            };
            const adapter = this.getAdapter(namespace);
            const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(namespace)?.accountState?.caipAddress;
            /**
             * When the page loaded, the controller doesn't have address yet.
             * To disconnect, we are checking enableReconnect flag to disconnect the namespace.
             */ if ((caipAddress || !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableReconnect) && adapter?.disconnect) {
                disconnectResult = await adapter.disconnect({
                    id
                });
            }
            this.setLoading(false, namespace);
            return disconnectResult;
        } catch (error) {
            this.setLoading(false, namespace);
            throw new Error(`Failed to disconnect chains: ${error.message}`);
        }
    }
    // -- Client Initialization ---------------------------------------------------
    createClients() {
        this.connectionControllerClient = {
            connectWalletConnect: async ()=>{
                const activeChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const adapter = this.getAdapter(activeChain);
                const chainId = this.getCaipNetwork(activeChain)?.id;
                const connections = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].getConnections(activeChain);
                const isMultiWallet = this.remoteFeatures.multiWallet;
                const hasConnections = connections.length > 0;
                if (!adapter) {
                    throw new Error('Adapter not found');
                }
                const result = await adapter.connectWalletConnect(chainId);
                const shouldClose = !hasConnections || !isMultiWallet;
                if (shouldClose) {
                    this.close();
                }
                this.setClientId(result?.clientId || null);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedNamespaces([
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys()
                ]);
                await this.syncWalletConnectAccount();
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].initializeIfEnabled();
            },
            connectExternal: async (params)=>{
                const connectResult = await this.onConnectExternal(params);
                await this.connectInactiveNamespaces(params, connectResult);
                return connectResult ? {
                    address: connectResult.address
                } : undefined;
            },
            reconnectExternal: async ({ id, info, type, provider })=>{
                const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const adapter = this.getAdapter(namespace);
                if (!namespace) {
                    throw new Error('reconnectExternal: namespace not found');
                }
                if (!adapter) {
                    throw new Error('reconnectExternal: adapter not found');
                }
                if (adapter?.reconnect) {
                    await adapter?.reconnect({
                        id,
                        info,
                        type,
                        provider,
                        chainId: this.getCaipNetwork()?.id
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(namespace);
                    this.syncConnectedWalletInfo(namespace);
                }
            },
            disconnectConnector: async (params)=>{
                await this.disconnectConnector(params.namespace, params.id);
            },
            disconnect: async (params)=>{
                const { id: connectorIdParam, chainNamespace, initialDisconnect } = params || {};
                const namespace = chainNamespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const namespaceConnectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace);
                const isAuth = connectorIdParam === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH || namespaceConnectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
                const isWalletConnect = connectorIdParam === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT || namespaceConnectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
                try {
                    const namespaces = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys());
                    let namespacesToDisconnect = chainNamespace ? [
                        chainNamespace
                    ] : namespaces;
                    /*
                     * If the connector is WalletConnect or Auth, disconnect all namespaces
                     * since they share a single connector instance across all adapters
                     */ if (isWalletConnect || isAuth) {
                        namespacesToDisconnect = namespaces;
                    }
                    const disconnectPromises = namespacesToDisconnect.map(async (ns)=>{
                        const currentConnectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(ns);
                        const connectorIdToDisconnect = connectorIdParam || currentConnectorId;
                        const disconnectData = await this.disconnectConnector(ns, connectorIdToDisconnect);
                        if (disconnectData) {
                            if (isAuth) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteConnectedSocialProvider();
                            }
                            disconnectData.connections.forEach((connection)=>{
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addDisconnectedConnectorId(connection.connectorId, ns);
                            });
                        }
                        if (initialDisconnect) {
                            this.onDisconnectNamespace({
                                chainNamespace: ns,
                                closeModal: false
                            });
                        }
                    });
                    const disconnectResults = await Promise.allSettled(disconnectPromises);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SendController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendController"].resetSend();
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].getSIWX()?.signOutOnDisconnect) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].clearSessions();
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setFilterByNamespace(undefined);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].syncStorageConnections();
                    const failures = disconnectResults.filter((result)=>result.status === 'rejected');
                    if (failures.length > 0) {
                        throw new Error(failures.map((f)=>f.reason.message).join(', '));
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                        type: 'track',
                        event: 'DISCONNECT_SUCCESS',
                        properties: {
                            namespace: chainNamespace || 'all'
                        }
                    });
                } catch (error) {
                    throw new Error(`Failed to disconnect chains: ${error.message}`);
                }
            },
            checkInstalled: (ids)=>{
                if (!ids) {
                    return Boolean(window.ethereum);
                }
                return ids.some((id)=>Boolean(window.ethereum?.[String(id)]));
            },
            signMessage: async (message)=>{
                const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!namespace) {
                    throw new Error('signMessage: namespace not found');
                }
                if (!adapter) {
                    throw new Error('signMessage: adapter not found');
                }
                const address = this.getAddress(namespace);
                if (!address) {
                    throw new Error('signMessage: address not found');
                }
                const result = await adapter?.signMessage({
                    message,
                    address,
                    provider: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(namespace)
                });
                return result?.signature || '';
            },
            sendTransaction: async (args)=>{
                const namespace = args.chainNamespace;
                if (!namespace) {
                    throw new Error('sendTransaction: namespace not found');
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].SEND_SUPPORTED_NAMESPACES.includes(namespace)) {
                    const adapter = this.getAdapter(namespace);
                    if (!adapter) {
                        throw new Error('sendTransaction: adapter not found');
                    }
                    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(namespace);
                    const result = await adapter?.sendTransaction({
                        ...args,
                        caipNetwork: this.getCaipNetwork(),
                        provider
                    });
                    return result?.hash || '';
                }
                return '';
            },
            estimateGas: async (args)=>{
                const namespace = args.chainNamespace;
                if (namespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
                    const adapter = this.getAdapter(namespace);
                    if (!adapter) {
                        throw new Error('estimateGas: adapter is required but got undefined');
                    }
                    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(namespace);
                    const caipNetwork = this.getCaipNetwork();
                    if (!caipNetwork) {
                        throw new Error('estimateGas: caipNetwork is required but got undefined');
                    }
                    const result = await adapter?.estimateGas({
                        ...args,
                        provider,
                        caipNetwork
                    });
                    return result?.gas || 0n;
                }
                return 0n;
            },
            getEnsAvatar: async ()=>{
                const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                if (!namespace) {
                    throw new Error('getEnsAvatar: namespace is required but got undefined');
                }
                const address = this.getAddress(namespace);
                if (!address) {
                    throw new Error('getEnsAvatar: address not found');
                }
                await this.syncIdentity({
                    address,
                    chainId: Number(this.getCaipNetwork()?.id),
                    chainNamespace: namespace
                });
                const accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData();
                return accountData?.profileImage || false;
            },
            getEnsAddress: async (name)=>await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].resolveReownName(name),
            writeContract: async (args)=>{
                const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const adapter = this.getAdapter(namespace);
                if (!namespace) {
                    throw new Error('writeContract: namespace is required but got undefined');
                }
                if (!adapter) {
                    throw new Error('writeContract: adapter is required but got undefined');
                }
                const caipNetwork = this.getCaipNetwork();
                const caipAddress = this.getCaipAddress();
                const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(namespace);
                if (!caipNetwork || !caipAddress) {
                    throw new Error('writeContract: caipNetwork or caipAddress is required but got undefined');
                }
                const result = await adapter?.writeContract({
                    ...args,
                    caipNetwork,
                    provider,
                    caipAddress
                });
                return result?.hash;
            },
            parseUnits: (value, decimals)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('parseUnits: adapter is required but got undefined');
                }
                return adapter?.parseUnits({
                    value,
                    decimals
                }) ?? 0n;
            },
            formatUnits: (value, decimals)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('formatUnits: adapter is required but got undefined');
                }
                return adapter?.formatUnits({
                    value,
                    decimals
                }) ?? '0';
            },
            getCapabilities: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('getCapabilities: adapter is required but got undefined');
                }
                return await adapter?.getCapabilities(params);
            },
            grantPermissions: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('grantPermissions: adapter is required but got undefined');
                }
                return await adapter?.grantPermissions(params);
            },
            revokePermissions: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('revokePermissions: adapter is required but got undefined');
                }
                if (adapter?.revokePermissions) {
                    return await adapter.revokePermissions(params);
                }
                return '0x';
            },
            walletGetAssets: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('walletGetAssets: adapter is required but got undefined');
                }
                return await adapter?.walletGetAssets(params) ?? {};
            },
            updateBalance: (namespace)=>{
                const address = this.getAddress(namespace);
                const caipNetwork = this.getCaipNetwork(namespace);
                if (!caipNetwork || !address) {
                    return;
                }
                this.updateNativeBalance(address, caipNetwork?.id, namespace);
            }
        };
        this.networkControllerClient = {
            switchCaipNetwork: async (caipNetwork)=>await this.switchCaipNetwork(caipNetwork),
            // eslint-disable-next-line @typescript-eslint/require-await
            getApprovedCaipNetworksData: async ()=>this.getApprovedCaipNetworksData()
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setClient(this.connectionControllerClient);
    }
    async onConnectExternal(params) {
        const activeChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const namespace = params.chain || activeChain;
        const adapter = this.getAdapter(namespace);
        let shouldUpdateNetwork = true;
        if (params.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_AUTH) {
            const authNamespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS;
            const hasConnectedAuthNamespace = authNamespaces.some((namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH);
            if (hasConnectedAuthNamespace && params.chain !== activeChain) {
                shouldUpdateNetwork = false;
            }
        }
        if (params.chain && params.chain !== activeChain && !params.caipNetwork) {
            const toConnectNetwork = this.getCaipNetworks().find((network)=>network.chainNamespace === params.chain);
            if (toConnectNetwork && shouldUpdateNetwork) {
                this.setCaipNetwork(toConnectNetwork);
            }
        }
        if (!namespace) {
            throw new Error('connectExternal: namespace not found');
        }
        if (!adapter) {
            throw new Error('connectExternal: adapter not found');
        }
        const fallbackCaipNetwork = this.getCaipNetwork(namespace);
        const caipNetworkToUse = params.caipNetwork || fallbackCaipNetwork;
        const res = await adapter.connect({
            id: params.id,
            address: params.address,
            info: params.info,
            type: params.type,
            provider: params.provider,
            socialUri: params.socialUri,
            chainId: params.caipNetwork?.id || fallbackCaipNetwork?.id,
            rpcUrl: params.caipNetwork?.rpcUrls?.default?.http?.[0] || fallbackCaipNetwork?.rpcUrls?.default?.http?.[0]
        });
        if (!res) {
            return undefined;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(namespace);
        this.syncProvider({
            ...res,
            chainNamespace: namespace
        });
        this.setStatus('connected', namespace);
        this.syncConnectedWalletInfo(namespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].removeDisconnectedConnectorId(params.id, namespace);
        return {
            address: res.address,
            connectedCaipNetwork: caipNetworkToUse
        };
    }
    async connectInactiveNamespaces(params, connectResult) {
        const isConnectingToAuth = params.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_AUTH;
        const otherAuthNamespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].getOtherAuthNamespaces(connectResult?.connectedCaipNetwork?.chainNamespace);
        const activeCaipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        const activeAdapter = this.getAdapter(activeCaipNetwork?.chainNamespace);
        const activeProvider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(activeCaipNetwork?.chainNamespace);
        if (isConnectingToAuth) {
            await Promise.all(otherAuthNamespaces.map(async (ns)=>{
                try {
                    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(ns);
                    const caipNetworkToUse = this.getCaipNetwork(ns);
                    const adapter = this.getAdapter(ns);
                    const res = await adapter?.connect({
                        ...params,
                        provider,
                        socialUri: undefined,
                        chainId: caipNetworkToUse?.id,
                        rpcUrl: caipNetworkToUse?.rpcUrls?.default?.http?.[0]
                    });
                    if (res) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(ns);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].removeDisconnectedConnectorId(params.id, ns);
                        this.setStatus('connected', ns);
                        this.syncConnectedWalletInfo(ns);
                    }
                } catch (error) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].warn(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_WARNINGS.INACTIVE_NAMESPACE_NOT_CONNECTED.displayMessage, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_WARNINGS.INACTIVE_NAMESPACE_NOT_CONNECTED.debugMessage(ns, error instanceof Error ? error.message : undefined), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_WARNINGS.INACTIVE_NAMESPACE_NOT_CONNECTED.code);
                }
            }));
            // Make the secure site back to current network after reconnecting the other namespaces
            if (activeCaipNetwork) {
                await activeAdapter?.switchNetwork({
                    caipNetwork: activeCaipNetwork,
                    provider: activeProvider,
                    providerType: params.type
                });
            }
        }
    }
    getApprovedCaipNetworksData() {
        const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProviderId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT) {
            const namespaces = this.universalProvider?.session?.namespaces;
            return {
                /*
                 * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
                 * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
                 * will make it possible to switch to other networks.
                 */ supportsAllNetworks: this.universalProvider?.session?.peer?.metadata.name === 'MetaMask Wallet',
                approvedCaipNetworkIds: this.getChainsFromNamespaces(namespaces)
            };
        }
        return {
            supportsAllNetworks: true,
            approvedCaipNetworkIds: []
        };
    }
    async switchCaipNetwork(caipNetwork) {
        const networkNamespace = caipNetwork.chainNamespace;
        const namespaceAddress = this.getAddressByChainNamespace(caipNetwork.chainNamespace);
        if (namespaceAddress) {
            const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(networkNamespace);
            const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProviderId(networkNamespace);
            if (caipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain) {
                const adapter = this.getAdapter(networkNamespace);
                await adapter?.switchNetwork({
                    caipNetwork,
                    provider,
                    providerType
                });
            } else {
                this.setCaipNetwork(caipNetwork);
                if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT) {
                    this.syncWalletConnectAccount();
                } else {
                    const address = this.getAddressByChainNamespace(networkNamespace);
                    if (address) {
                        this.syncAccount({
                            address,
                            chainId: caipNetwork.id,
                            chainNamespace: networkNamespace
                        });
                    }
                }
            }
        } else {
            this.setCaipNetwork(caipNetwork);
        }
    }
    getChainsFromNamespaces(namespaces = {}) {
        return Object.values(namespaces).flatMap((namespace)=>{
            const chains = namespace.chains || [];
            const accountsChains = namespace.accounts.map((account)=>{
                const { chainId, chainNamespace } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(account);
                return `${chainNamespace}:${chainId}`;
            });
            return Array.from(new Set([
                ...chains,
                ...accountsChains
            ]));
        });
    }
    // -- Adapter Initialization ---------------------------------------------------
    createAdapters(blueprints) {
        this.createClients();
        return this.chainNamespaces.reduce((adapters, namespace)=>{
            const blueprint = blueprints?.find((b)=>b.namespace === namespace);
            if (blueprint) {
                blueprint.construct({
                    namespace,
                    projectId: this.options?.projectId,
                    networks: this.caipNetworks?.filter(({ chainNamespace })=>chainNamespace === namespace)
                });
                adapters[namespace] = blueprint;
            } else {
                adapters[namespace] = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$universal$2d$adapter$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniversalAdapter"]({
                    namespace,
                    networks: this.getCaipNetworks()
                });
            }
            return adapters;
        // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
        }, {});
    }
    async initChainAdapter(namespace) {
        this.onConnectors(namespace);
        this.listenAdapter(namespace);
        await this.chainAdapters?.[namespace].syncConnectors(this.options, this);
        await this.createUniversalProviderForAdapter(namespace);
    }
    async initChainAdapters() {
        await Promise.all(this.chainNamespaces.map(async (namespace)=>{
            await this.initChainAdapter(namespace);
        }));
    }
    onConnectors(chainNamespace) {
        const adapter = this.getAdapter(chainNamespace);
        adapter?.on('connectors', this.setConnectors.bind(this));
    }
    listenAdapter(chainNamespace) {
        const adapter = this.getAdapter(chainNamespace);
        if (!adapter) {
            return;
        }
        const connectionStatus = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectionStatus();
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableReconnect === false) {
            this.setStatus('disconnected', chainNamespace);
        } else if (connectionStatus === 'connected') {
            this.setStatus('connecting', chainNamespace);
        } else if (connectionStatus === 'disconnected') {
            /*
             * Address cache is kept after disconnecting from the wallet
             * but should be cleared if appkit is launched in disconnected state
             */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].clearAddressCache();
            this.setStatus(connectionStatus, chainNamespace);
        } else {
            this.setStatus(connectionStatus, chainNamespace);
        }
        adapter.on('switchNetwork', ({ address, chainId })=>{
            const caipNetwork = this.getCaipNetworks().find((n)=>n.id.toString() === chainId.toString() || n.caipNetworkId.toString() === chainId.toString());
            const isSameNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace;
            const accountAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(chainNamespace)?.accountState?.address;
            if (caipNetwork) {
                const account = isSameNamespace && address ? address : accountAddress;
                if (account) {
                    this.syncAccount({
                        address: account,
                        chainId: caipNetwork.id,
                        chainNamespace
                    });
                }
            } else {
                this.setUnsupportedNetwork(chainId);
            }
        });
        adapter.on('disconnect', ()=>{
            const isMultiWallet = this.remoteFeatures.multiWallet;
            const allConnections = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].state.connections.values()).flat();
            this.onDisconnectNamespace({
                chainNamespace,
                closeModal: !isMultiWallet || allConnections.length === 0
            });
        });
        adapter.on('connections', (connections)=>{
            this.setConnections(connections, chainNamespace);
        });
        adapter.on('pendingTransactions', ()=>{
            const address = this.getAddress(chainNamespace);
            const activeCaipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
            if (!address || !activeCaipNetwork?.id) {
                return;
            }
            this.updateNativeBalance(address, activeCaipNetwork.id, activeCaipNetwork.chainNamespace);
        });
        adapter.on('accountChanged', ({ address, chainId, connector })=>{
            this.handlePreviousConnectorConnection(connector);
            const isActiveChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace;
            if (connector?.provider) {
                this.syncProvider({
                    id: connector.id,
                    type: connector.type,
                    provider: connector?.provider,
                    chainNamespace
                });
                this.syncConnectedWalletInfo(chainNamespace);
            }
            const namespaceNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getNetworkData(chainNamespace)?.caipNetwork?.id;
            const syncAccountChainId = chainId || namespaceNetworkId;
            if (isActiveChain && syncAccountChainId) {
                this.syncAccount({
                    address,
                    chainId: syncAccountChainId,
                    chainNamespace
                });
            } else if (!isActiveChain && syncAccountChainId) {
                this.syncAccountInfo(address, syncAccountChainId, chainNamespace);
                this.syncBalance({
                    address,
                    chainId: syncAccountChainId,
                    chainNamespace
                });
            } else {
                this.syncAccountInfo(address, chainId, chainNamespace);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(chainNamespace);
        });
    }
    /**
     * Checks the incoming connector and handles the previous connection in the connector's namespace, and if necessary (i.e multi-wallet is disabled) disconnects the previous connector
     * @param connector
     */ async handlePreviousConnectorConnection(connector) {
        const namespace = connector?.chain;
        const newConnectorId = connector?.id;
        const currentConnectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace);
        const isMultiWalletEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.multiWallet;
        const hasNewConnectorConnected = currentConnectorId !== newConnectorId;
        const shouldDisconnectPreviousConnector = namespace && newConnectorId && currentConnectorId && hasNewConnectorConnected && !isMultiWalletEnabled;
        try {
            if (shouldDisconnectPreviousConnector) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect({
                    id: currentConnectorId,
                    namespace
                });
            }
        } catch (error) {
            console.warn('Error disconnecting previous connector', error);
        }
    }
    async createUniversalProviderForAdapter(chainNamespace) {
        await this.getUniversalProvider();
        if (this.universalProvider) {
            await this.chainAdapters?.[chainNamespace]?.setUniversalProvider?.(this.universalProvider);
        }
    }
    // -- Connection Sync ---------------------------------------------------
    async syncExistingConnection() {
        await Promise.allSettled(this.chainNamespaces.map((namespace)=>this.syncNamespaceConnection(namespace)));
    }
    async unSyncExistingConnection() {
        try {
            await Promise.allSettled(this.chainNamespaces.map((namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect({
                    namespace,
                    initialDisconnect: true
                })));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error disconnecting existing connections:', error);
        }
    }
    async reconnectWalletConnect() {
        await this.syncWalletConnectAccount();
        const address = this.getAddress();
        if (!this.getCaipAddress()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteRecentWallet();
        }
        const recentWallet = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallet();
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'CONNECT_SUCCESS',
            address,
            properties: {
                method: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile() ? 'mobile' : 'qrcode',
                name: recentWallet?.name || 'Unknown',
                reconnect: true,
                view: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view,
                walletRank: recentWallet?.order
            }
        });
    }
    async syncNamespaceConnection(namespace) {
        try {
            if (namespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isSafeApp()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.SAFE, namespace);
            }
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace);
            this.setStatus('connecting', namespace);
            switch(connectorId){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT:
                    await this.reconnectWalletConnect();
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH:
                    break;
                default:
                    await this.syncAdapterConnection(namespace);
            }
        } catch (err) {
            console.warn("AppKit couldn't sync existing connection", err);
            this.setStatus('disconnected', namespace);
        }
    }
    onDisconnectNamespace(options) {
        const { chainNamespace, closeModal } = options || {};
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].resetAccount(chainNamespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].resetNetwork(chainNamespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].removeConnectedNamespace(chainNamespace);
        const namespaces = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys());
        const namespacesToDisconnect = chainNamespace ? [
            chainNamespace
        ] : namespaces;
        namespacesToDisconnect.forEach((ns)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addDisconnectedConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(ns) || '', ns));
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].removeConnectorId(chainNamespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].resetChain(chainNamespace);
        this.setUser(null, chainNamespace);
        this.setStatus('disconnected', chainNamespace);
        this.setConnectedWalletInfo(null, chainNamespace);
        if (closeModal !== false) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
    }
    async syncAdapterConnections() {
        await Promise.allSettled(this.chainNamespaces.map((namespace)=>{
            const adapter = this.getAdapter(namespace);
            const caipAddress = this.getCaipAddress(namespace);
            const caipNetwork = this.getCaipNetwork(namespace);
            return adapter?.syncConnections({
                connectToFirstConnector: !caipAddress,
                caipNetwork
            });
        }));
    }
    async syncAdapterConnection(namespace) {
        const adapter = this.getAdapter(namespace);
        const caipNetwork = this.getCaipNetwork(namespace);
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace);
        const connectors = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors(namespace);
        const connector = connectors.find((c)=>c.id === connectorId);
        try {
            if (!adapter || !connector) {
                throw new Error(`Adapter or connector not found for namespace ${namespace}`);
            }
            if (!caipNetwork?.id) {
                throw new Error('CaipNetwork not found');
            }
            const connection = await adapter?.syncConnection({
                namespace,
                id: connector.id,
                chainId: caipNetwork.id,
                rpcUrl: caipNetwork?.rpcUrls?.default?.http?.[0]
            });
            if (connection) {
                this.syncProvider({
                    ...connection,
                    chainNamespace: namespace
                });
                await this.syncAccount({
                    ...connection,
                    chainNamespace: namespace
                });
                this.setStatus('connected', namespace);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                    type: 'track',
                    event: 'CONNECT_SUCCESS',
                    address: connection.address,
                    properties: {
                        method: 'browser',
                        name: connector.info?.name || connector.name || 'Unknown',
                        reconnect: true,
                        view: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view,
                        walletRank: undefined
                    }
                });
            } else {
                this.setStatus('disconnected', namespace);
            }
        } catch (e) {
            this.onDisconnectNamespace({
                chainNamespace: namespace,
                closeModal: false
            });
        }
    }
    async syncWalletConnectAccount() {
        const sessionNamespaces = Object.keys(this.universalProvider?.session?.namespaces || {});
        const syncTasks = this.chainNamespaces.map(async (chainNamespace)=>{
            const adapter = this.getAdapter(chainNamespace);
            if (!adapter) {
                return;
            }
            const namespaceAccounts = this.universalProvider?.session?.namespaces?.[chainNamespace]?.accounts || [];
            // We try and find the address for this network in the session object.
            const activeChainId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id;
            const sessionAddress = namespaceAccounts.find((account)=>{
                const { chainId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(account);
                return chainId === activeChainId?.toString();
            }) || namespaceAccounts[0];
            if (sessionAddress) {
                const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].validateCaipAddress(sessionAddress);
                const { chainId, address } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(caipAddress);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].setProviderId(chainNamespace, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT);
                if (this.caipNetworks && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork && adapter.namespace !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
                    const provider = adapter.getWalletConnectProvider({
                        caipNetworks: this.getCaipNetworks(),
                        provider: this.universalProvider,
                        activeCaipNetwork: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].setProvider(chainNamespace, provider);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].setProvider(chainNamespace, this.universalProvider);
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT, chainNamespace);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(chainNamespace);
                await this.syncAccount({
                    address,
                    chainId,
                    chainNamespace
                });
            } else if (sessionNamespaces.includes(chainNamespace)) {
                this.setStatus('disconnected', chainNamespace);
            }
            this.syncConnectedWalletInfo(chainNamespace);
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setApprovedCaipNetworksData(chainNamespace);
        });
        await Promise.all(syncTasks);
    }
    syncProvider({ type, provider, id, chainNamespace }) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].setProviderId(chainNamespace, type);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].setProvider(chainNamespace, provider);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setConnectorId(id, chainNamespace);
    }
    async syncAccount(params) {
        const isActiveNamespace = params.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const networkOfChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworkByNamespace(params.chainNamespace, params.chainId);
        const { address, chainId, chainNamespace } = params;
        const { chainId: activeChainId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveNetworkProps();
        const chainIdToUse = chainId || activeChainId;
        const isUnsupportedNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.name === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME;
        const shouldSupportAllNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getNetworkProp('supportsAllNetworks', chainNamespace);
        this.setStatus('connected', chainNamespace);
        if (isUnsupportedNetwork && !shouldSupportAllNetworks) {
            return;
        }
        if (chainIdToUse) {
            let caipNetwork = this.getCaipNetworks().find((n)=>n.id.toString() === chainIdToUse.toString());
            let fallbackCaipNetwork = this.getCaipNetworks().find((n)=>n.chainNamespace === chainNamespace);
            // If doesn't support all networks, we need to use approved networks
            if (!shouldSupportAllNetworks && !caipNetwork && !fallbackCaipNetwork) {
                // Connection can be requested for a chain that is not supported by the wallet so we need to use approved networks here
                const caipNetworkIds = this.getApprovedCaipNetworkIds() || [];
                const caipNetworkId = caipNetworkIds.find((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipNetworkId(id)?.chainId === chainIdToUse.toString());
                const fallBackCaipNetworkId = caipNetworkIds.find((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipNetworkId(id)?.chainNamespace === chainNamespace);
                caipNetwork = this.getCaipNetworks().find((n)=>n.caipNetworkId === caipNetworkId);
                fallbackCaipNetwork = this.getCaipNetworks().find((n)=>n.caipNetworkId === fallBackCaipNetworkId || 'deprecatedCaipNetworkId' in n && n.deprecatedCaipNetworkId === fallBackCaipNetworkId);
            }
            const network = caipNetwork || fallbackCaipNetwork;
            if (network?.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain) {
                // If the network is unsupported and the user doesn't allow unsupported chains, we show the unsupported chain UI
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableNetworkSwitch && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.allowUnsupportedChain && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.name === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].showUnsupportedChainUI();
                } else {
                    this.setCaipNetwork(network);
                }
            } else if (!isActiveNamespace) {
                if (networkOfChain) {
                    this.setCaipNetworkOfNamespace(networkOfChain, chainNamespace);
                }
            }
            this.syncConnectedWalletInfo(chainNamespace);
            const currentAddress = this.getAddress(chainNamespace);
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(address, currentAddress)) {
                this.syncAccountInfo(address, network?.id, chainNamespace);
            }
            if (isActiveNamespace) {
                await this.syncBalance({
                    address,
                    chainId: network?.id,
                    chainNamespace
                });
            } else {
                await this.syncBalance({
                    address,
                    chainId: networkOfChain?.id,
                    chainNamespace
                });
            }
            this.syncIdentity({
                address,
                chainId,
                chainNamespace
            });
        }
    }
    async syncAccountInfo(address, chainId, chainNamespace) {
        const caipAddress = this.getCaipAddress(chainNamespace);
        const newChainId = chainId || caipAddress?.split(':')[1];
        if (!newChainId) {
            return;
        }
        const newCaipAddress = `${chainNamespace}:${newChainId}:${address}`;
        this.setCaipAddress(newCaipAddress, chainNamespace, true);
        await this.syncIdentity({
            address,
            chainId: newChainId,
            chainNamespace
        });
    }
    async syncReownName(address, chainNamespace) {
        try {
            const registeredWcNames = await this.getReownName(address);
            if (registeredWcNames[0]) {
                const wcName = registeredWcNames[0];
                this.setProfileName(wcName.name, chainNamespace);
            } else {
                this.setProfileName(null, chainNamespace);
            }
        } catch  {
            this.setProfileName(null, chainNamespace);
        }
    }
    syncConnectedWalletInfo(chainNamespace) {
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(chainNamespace);
        const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProviderId(chainNamespace);
        if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_ANNOUNCED || providerType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_INJECTED) {
            if (connectorId) {
                const connectors = this.getConnectors();
                const connector = connectors.find((c)=>{
                    const isConnectorId = c.id === connectorId;
                    const isRdns = c.info?.rdns === connectorId;
                    const hasMultiChainConnector = c.connectors?.some((_c)=>_c.id === connectorId || _c.info?.rdns === connectorId);
                    return isConnectorId || isRdns || Boolean(hasMultiChainConnector);
                });
                if (connector) {
                    const { info, name, imageUrl } = connector;
                    const icon = imageUrl || this.getConnectorImage(connector);
                    this.setConnectedWalletInfo({
                        name,
                        icon,
                        ...info
                    }, chainNamespace);
                }
            }
        } else if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT) {
            const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProvider(chainNamespace);
            if (provider?.session) {
                this.setConnectedWalletInfo({
                    ...provider.session.peer.metadata,
                    name: provider.session.peer.metadata.name,
                    icon: provider.session.peer.metadata.icons?.[0]
                }, chainNamespace);
            }
        } else if (connectorId) {
            if (connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE_SDK || connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE) {
                const connector = this.getConnectors().find((c)=>c.id === connectorId);
                const name = connector?.name || 'Coinbase Wallet';
                const icon = connector?.imageUrl || this.getConnectorImage(connector);
                const info = connector?.info;
                this.setConnectedWalletInfo({
                    ...info,
                    name,
                    icon
                }, chainNamespace);
            }
        }
    }
    async syncBalance(params) {
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].getNetworksByNamespace(this.getCaipNetworks(), params.chainNamespace).find((n)=>n.id.toString() === params.chainId?.toString());
        if (!caipNetwork || !params.chainId) {
            return;
        }
        await this.updateNativeBalance(params.address, params.chainId, params.chainNamespace);
    }
    async ready() {
        await this.readyPromise;
    }
    async updateNativeBalance(address, chainId, namespace) {
        const adapter = this.getAdapter(namespace);
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getCaipNetworkByNamespace(namespace, chainId);
        if (adapter) {
            const balance = await adapter.getBalance({
                address,
                chainId,
                caipNetwork,
                tokens: this.options.tokens
            });
            this.setBalance(balance.balance, balance.symbol, namespace);
            return balance;
        }
        return undefined;
    }
    // -- Universal Provider ---------------------------------------------------
    async initializeUniversalAdapter() {
        const logger = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$LoggerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoggerUtil"].createLogger((error, ...args)=>{
            if (error) {
                this.handleAlertError(error);
            }
            // eslint-disable-next-line no-console
            console.error(...args);
        });
        const universalProviderOptions = {
            projectId: this.options?.projectId,
            metadata: {
                name: this.options?.metadata ? this.options?.metadata.name : '',
                description: this.options?.metadata ? this.options?.metadata.description : '',
                url: this.options?.metadata ? this.options?.metadata.url : '',
                icons: this.options?.metadata ? this.options?.metadata.icons : [
                    ''
                ]
            },
            logger
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setManualWCControl(Boolean(this.options?.manualWCControl));
        this.universalProvider = this.options.universalProvider ?? await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init(universalProviderOptions);
        // Clear the session if we don't want to reconnect on init
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableReconnect === false && this.universalProvider.session) {
            await this.universalProvider.disconnect();
        }
        this.listenWalletConnect();
    }
    listenWalletConnect() {
        if (this.universalProvider) {
            this.chainNamespaces.forEach((namespace)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].listenWcProvider({
                    universalProvider: this.universalProvider,
                    namespace,
                    onDisplayUri: (uri)=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setUri(uri);
                    },
                    onConnect: (accounts)=>{
                        const { address } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAccount(accounts[0]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].finalizeWcConnection(address);
                    },
                    onDisconnect: ()=>{
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.noAdapters) {
                            this.resetAccount(namespace);
                        }
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
                    },
                    onChainChanged: (chainId)=>{
                        const activeNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                        const isCurrentConnectorWalletConnect = activeNamespace && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.activeConnectorIds[activeNamespace] === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
                        if (activeNamespace === namespace && (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.noAdapters || isCurrentConnectorWalletConnect)) {
                            const caipNetwork = this.getCaipNetworks().find((n)=>n.id.toString() === chainId.toString() || n.caipNetworkId.toString() === chainId.toString());
                            const currentCaipNetwork = this.getCaipNetwork();
                            if (!caipNetwork) {
                                this.setUnsupportedNetwork(chainId);
                                return;
                            }
                            if (currentCaipNetwork?.id.toString() !== caipNetwork?.id.toString() && currentCaipNetwork?.chainNamespace === caipNetwork?.chainNamespace) {
                                this.setCaipNetwork(caipNetwork);
                            }
                        }
                    },
                    onAccountsChanged: (accounts)=>{
                        const activeNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                        const isCurrentConnectorWalletConnect = activeNamespace && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.activeConnectorIds[activeNamespace] === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
                        if (activeNamespace === namespace && (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.noAdapters || isCurrentConnectorWalletConnect)) {
                            const account = accounts?.[0];
                            if (account) {
                                this.syncAccount({
                                    address: account.address,
                                    chainId: account.chainId,
                                    chainNamespace: account.chainNamespace
                                });
                            }
                        }
                    }
                });
            });
        }
    }
    createUniversalProvider() {
        if (!this.universalProviderInitPromise && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isClient() && this.options?.projectId) {
            this.universalProviderInitPromise = this.initializeUniversalAdapter();
        }
        return this.universalProviderInitPromise;
    }
    async getUniversalProvider() {
        if (!this.universalProvider) {
            try {
                await this.createUniversalProvider();
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                    type: 'error',
                    event: 'INTERNAL_SDK_ERROR',
                    properties: {
                        errorType: 'UniversalProviderInitError',
                        errorMessage: err instanceof Error ? err.message : 'Unknown',
                        uncaught: false
                    }
                });
                // eslint-disable-next-line no-console
                console.error('AppKit:getUniversalProvider - Cannot create provider', err);
            }
        }
        return this.universalProvider;
    }
    getDisabledCaipNetworks() {
        const approvedCaipNetworkIds = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllApprovedCaipNetworkIds();
        const requestedCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        const sortedNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
        return sortedNetworks.filter((network)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].isCaipNetworkDisabled(network));
    }
    // - Utils -------------------------------------------------------------------
    handleAlertError(error) {
        const matchedUniversalProviderError = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].UniversalProviderErrors).find(([, { message }])=>error.message.includes(message));
        const [errorKey, errorValue] = matchedUniversalProviderError ?? [];
        const { message, alertErrorKey } = errorValue ?? {};
        if (errorKey && message && !this.reportedAlertErrors[errorKey]) {
            const alertError = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS[alertErrorKey];
            if (alertError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(alertError, 'error');
                this.reportedAlertErrors[errorKey] = true;
            }
        }
    }
    getAdapter(namespace) {
        if (!namespace) {
            return undefined;
        }
        return this.chainAdapters?.[namespace];
    }
    createAdapter(blueprint) {
        if (!blueprint) {
            return;
        }
        const namespace = blueprint.namespace;
        if (!namespace) {
            return;
        }
        this.createClients();
        const adapterBlueprint = blueprint;
        adapterBlueprint.namespace = namespace;
        adapterBlueprint.construct({
            namespace,
            projectId: this.options?.projectId,
            networks: this.caipNetworks?.filter(({ chainNamespace })=>chainNamespace === namespace)
        });
        if (!this.chainNamespaces.includes(namespace)) {
            this.chainNamespaces.push(namespace);
        }
        if (this.chainAdapters) {
            this.chainAdapters[namespace] = adapterBlueprint;
        }
    }
    // -- Public -------------------------------------------------------------------
    async open(options) {
        await this.injectModalUi();
        if (options?.uri) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setUri(options.uri);
        }
        const { isSwap, isSend } = this.toModalOptions();
        if (isSwap(options)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                ...options,
                data: {
                    swap: options.arguments
                }
            });
        } else if (isSend(options)) {
            if (options.arguments) {
                return this.openSend(options.arguments);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open(options);
    }
    async close() {
        await this.injectModalUi();
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
    }
    setLoading(loading, namespace) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(loading, namespace);
    }
    async disconnect(chainNamespace) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect({
            namespace: chainNamespace
        });
    }
    getSIWX() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
    }
    // -- review these -------------------------------------------------------------------
    getError() {
        return '';
    }
    getChainId() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id;
    }
    async switchNetwork(appKitNetwork, { throwOnFailure = false } = {}) {
        const network = this.getCaipNetworks().find((n)=>n.id === appKitNetwork.id);
        if (!network) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, 'error');
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].switchActiveNetwork(network, {
            throwOnFailure
        });
    }
    getWalletProvider() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].state.providers[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain] : null;
    }
    getWalletProviderType() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].getProviderId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
    }
    subscribeProviders(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ProviderController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderController"].subscribeProviders(callback);
    }
    getThemeMode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeMode;
    }
    getThemeVariables() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeVariables;
    }
    setThemeMode(themeMode) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeMode(themeMode);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setColorTheme"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeMode);
    }
    setTermsConditionsUrl(termsConditionsUrl) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setTermsConditionsUrl(termsConditionsUrl);
    }
    setPrivacyPolicyUrl(privacyPolicyUrl) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setPrivacyPolicyUrl(privacyPolicyUrl);
    }
    setThemeVariables(themeVariables) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeVariables(themeVariables);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setThemeVariables"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeVariables);
    }
    subscribeTheme(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].subscribe(callback);
    }
    subscribeConnections(callback) {
        if (!this.remoteFeatures.multiWallet) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, 'info');
            return ()=>undefined;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].subscribe(callback);
    }
    getWalletInfo(namespace) {
        if (namespace) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(namespace)?.accountState?.connectedWalletInfo;
        }
        const accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData();
        return accountData?.connectedWalletInfo;
    }
    getAccount(_namespace) {
        const namespace = _namespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector(namespace);
        const accountState = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace);
        const activeConnectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        const connections = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].getConnections(namespace);
        if (!namespace) {
            throw new Error('AppKit:getAccount - namespace is required');
        }
        const allAccounts = connections.flatMap((connection)=>connection.accounts.map(({ address, type, publicKey })=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(namespace, address, type || 'eoa', publicKey)));
        if (!accountState) {
            return undefined;
        }
        return {
            allAccounts,
            caipAddress: accountState.caipAddress,
            address: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(accountState.caipAddress),
            isConnected: Boolean(accountState.caipAddress),
            status: accountState.status,
            embeddedWalletInfo: authConnector && activeConnectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH ? {
                user: accountState.user ? {
                    ...accountState.user,
                    /*
                             * Getting the username from the chain controller works well for social logins,
                             * but Farcaster uses a different connection flow and doesn't emit the username via events.
                             * Since the username is stored in local storage before the chain controller updates,
                             * it's safe to use the local storage value here.
                             */ username: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedSocialUsername()
                } : undefined,
                authProvider: accountState.socialProvider || 'email',
                accountType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(namespace),
                isSmartAccountDeployed: Boolean(accountState.smartAccountDeployed)
            } : undefined
        };
    }
    subscribeAccount(callback, namespace) {
        const updateVal = ()=>{
            const account = this.getAccount(namespace);
            if (!account) {
                return;
            }
            callback(account);
        };
        if (namespace) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeChainProp('accountState', updateVal, namespace);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribe(updateVal);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].subscribe(updateVal);
    }
    subscribeNetwork(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribe(({ activeCaipNetwork })=>{
            callback({
                caipNetwork: activeCaipNetwork,
                chainId: activeCaipNetwork?.id,
                caipNetworkId: activeCaipNetwork?.caipNetworkId
            });
        });
    }
    subscribeWalletInfo(callback, namespace) {
        if (namespace) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeChainProp('accountState', (accountState)=>callback(accountState?.connectedWalletInfo), namespace);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeChainProp('accountState', (accountState)=>callback(accountState?.connectedWalletInfo));
    }
    subscribeShouldUpdateToAddress(callback) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeChainProp('accountState', (accountState)=>callback(accountState?.shouldUpdateToAddress));
    }
    subscribeCaipNetworkChange(callback) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipNetwork', callback);
    }
    getState() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].state;
    }
    getRemoteFeatures() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures;
    }
    subscribeState(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].subscribe(callback);
    }
    subscribeRemoteFeatures(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].subscribeKey('remoteFeatures', callback);
    }
    showErrorMessage(message) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError(message);
    }
    showSuccessMessage(message) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showSuccess(message);
    }
    getEvent() {
        return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].state
        };
    }
    subscribeEvents(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].subscribe(callback);
    }
    replace(route) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace(route);
    }
    redirect(route) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push(route);
    }
    popTransactionStack(status) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].popTransactionStack(status);
    }
    isOpen() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open;
    }
    isTransactionStackEmpty() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.transactionStack.length === 0;
    }
    static getInstance() {
        return this.instance;
    }
    updateFeatures(newFeatures) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures(newFeatures);
    }
    updateRemoteFeatures(newRemoteFeatures) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setRemoteFeatures(newRemoteFeatures);
    }
    updateOptions(newOptions) {
        const currentOptions = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state || {};
        const updatedOptions = {
            ...currentOptions,
            ...newOptions
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setOptions(updatedOptions);
    }
    setConnectMethodsOrder(connectMethodsOrder) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setConnectMethodsOrder(connectMethodsOrder);
    }
    setWalletFeaturesOrder(walletFeaturesOrder) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setWalletFeaturesOrder(walletFeaturesOrder);
    }
    setCollapseWallets(collapseWallets) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setCollapseWallets(collapseWallets);
    }
    setSocialsOrder(socialsOrder) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSocialsOrder(socialsOrder);
    }
    getConnectMethodsOrder() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletUtil"].getConnectOrderMethod(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors());
    }
    /**
     * Adds a network to an existing adapter in AppKit.
     * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
     * @param network - The network configuration to add
     * @throws Error if adapter for namespace doesn't exist
     */ addNetwork(namespace, network) {
        if (this.chainAdapters && !this.chainAdapters[namespace]) {
            throw new Error(`Adapter for namespace ${namespace} doesn't exist`);
        }
        const extendedNetwork = this.extendCaipNetwork(network, this.options);
        if (!this.getCaipNetworks().find((n)=>n.id === extendedNetwork.id)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].addNetwork(extendedNetwork);
        }
    }
    /**
     * Removes a network from an existing adapter in AppKit.
     * @param namespace - The chain namespace the network belongs to
     * @param networkId - The network ID to remove
     * @throws Error if adapter for namespace doesn't exist or if removing last network
     */ removeNetwork(namespace, networkId) {
        if (this.chainAdapters && !this.chainAdapters[namespace]) {
            throw new Error(`Adapter for namespace ${namespace} doesn't exist`);
        }
        const networkToRemove = this.getCaipNetworks().find((n)=>n.id === networkId);
        if (!networkToRemove) {
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].removeNetwork(namespace, networkId);
    }
} //# sourceMappingURL=appkit-base-client.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/client/appkit-core.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppKit",
    ()=>AppKit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2f$appkit$2d$base$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/client/appkit-base-client.js [app-client] (ecmascript)");
;
;
;
// -- Helpers -------------------------------------------------------------------
let isInitialized = false;
class AppKit extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2f$appkit$2d$base$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppKitBaseClient"] {
    // -- Overrides --------------------------------------------------------------
    async open(options) {
        // Only open modal when not connected
        const isConnected = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].isConnected();
        if (!isConnected) {
            await super.open(options);
        }
    }
    async close() {
        await super.close();
        if (this.options.manualWCControl) {
            const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(this.activeChainNamespace)?.address;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].finalizeWcConnection(address);
        }
    }
    async syncIdentity(_request) {
        return Promise.resolve();
    }
    async syncBalance(_params) {
        return Promise.resolve();
    }
    async injectModalUi() {
        if (!isInitialized && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isClient()) {
            await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/basic.js [app-client] (ecmascript, async loader)");
            await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-client] (ecmascript, async loader)");
            const isElementCreated = document.querySelector('w3m-modal');
            if (!isElementCreated) {
                const modal = document.createElement('w3m-modal');
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.disableAppend && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded) {
                    document.body.insertAdjacentElement('beforeend', modal);
                }
            }
            isInitialized = true;
        }
    }
} //# sourceMappingURL=appkit-core.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PACKAGE_VERSION",
    ()=>PACKAGE_VERSION
]);
const PACKAGE_VERSION = '1.8.7'; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/exports/core.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAppKit",
    ()=>createAppKit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2f$appkit$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/client/appkit-core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)");
;
;
function createAppKit(options) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2f$appkit$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppKit"]({
        ...options,
        basic: true,
        sdkVersion: `html-core-${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PACKAGE_VERSION"]}`
    });
}
;
 //# sourceMappingURL=core.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/exports/core.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppKit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2f$appkit$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppKit"],
    "createAppKit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAppKit"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/exports/core.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2f$appkit$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/src/client/appkit-core.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=1b50e_%40reown_appkit_dist_esm_5e1b8dee._.js.map