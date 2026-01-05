(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConstantsUtil",
    ()=>ConstantsUtil,
    "MELD_PUBLIC_KEY",
    ()=>MELD_PUBLIC_KEY,
    "ONRAMP_PROVIDERS",
    ()=>ONRAMP_PROVIDERS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
const SECURE_SITE = // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
(typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_SECURE_SITE_ORIGIN'] : undefined) || 'https://secure.walletconnect.org';
const ONRAMP_PROVIDERS = [
    {
        label: 'Meld.io',
        name: 'meld',
        feeRange: '1-2%',
        url: 'https://meldcrypto.com',
        supportedChains: [
            'eip155',
            'solana'
        ]
    }
];
const MELD_PUBLIC_KEY = 'WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU';
const ConstantsUtil = {
    FOUR_MINUTES_MS: 240_000,
    TEN_SEC_MS: 10_000,
    FIVE_SEC_MS: 5_000,
    THREE_SEC_MS: 3_000,
    ONE_SEC_MS: 1_000,
    SECURE_SITE,
    SECURE_SITE_DASHBOARD: `${SECURE_SITE}/dashboard`,
    SECURE_SITE_FAVICON: `${SECURE_SITE}/images/favicon.png`,
    SOLANA_NATIVE_TOKEN_ADDRESS: 'So11111111111111111111111111111111111111111',
    RESTRICTED_TIMEZONES: [
        'ASIA/SHANGHAI',
        'ASIA/URUMQI',
        'ASIA/CHONGQING',
        'ASIA/HARBIN',
        'ASIA/KASHGAR',
        'ASIA/MACAU',
        'ASIA/HONG_KONG',
        'ASIA/MACAO',
        'ASIA/BEIJING',
        'ASIA/HARBIN'
    ],
    SWAP_SUGGESTED_TOKENS: [
        'ETH',
        'UNI',
        '1INCH',
        'AAVE',
        'SOL',
        'ADA',
        'AVAX',
        'DOT',
        'LINK',
        'NITRO',
        'GAIA',
        'MILK',
        'TRX',
        'NEAR',
        'GNO',
        'WBTC',
        'DAI',
        'WETH',
        'USDC',
        'USDT',
        'ARB',
        'BAL',
        'BICO',
        'CRV',
        'ENS',
        'MATIC',
        'OP'
    ],
    SWAP_POPULAR_TOKENS: [
        'ETH',
        'UNI',
        '1INCH',
        'AAVE',
        'SOL',
        'ADA',
        'AVAX',
        'DOT',
        'LINK',
        'NITRO',
        'GAIA',
        'MILK',
        'TRX',
        'NEAR',
        'GNO',
        'WBTC',
        'DAI',
        'WETH',
        'USDC',
        'USDT',
        'ARB',
        'BAL',
        'BICO',
        'CRV',
        'ENS',
        'MATIC',
        'OP',
        'METAL',
        'DAI',
        'CHAMP',
        'WOLF',
        'SALE',
        'BAL',
        'BUSD',
        'MUST',
        'BTCpx',
        'ROUTE',
        'HEX',
        'WELT',
        'amDAI',
        'VSQ',
        'VISION',
        'AURUM',
        'pSP',
        'SNX',
        'VC',
        'LINK',
        'CHP',
        'amUSDT',
        'SPHERE',
        'FOX',
        'GIDDY',
        'GFC',
        'OMEN',
        'OX_OLD',
        'DE',
        'WNT'
    ],
    BALANCE_SUPPORTED_CHAINS: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA
    ],
    SEND_PARAMS_SUPPORTED_CHAINS: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM
    ],
    SWAP_SUPPORTED_NETWORKS: [
        // Ethereum'
        'eip155:1',
        // Arbitrum One'
        'eip155:42161',
        // Optimism'
        'eip155:10',
        // ZKSync Era'
        'eip155:324',
        // Base'
        'eip155:8453',
        // BNB Smart Chain'
        'eip155:56',
        // Polygon'
        'eip155:137',
        // Gnosis'
        'eip155:100',
        // Avalanche'
        'eip155:43114',
        // Fantom'
        'eip155:250',
        // Klaytn'
        'eip155:8217',
        // Aurora
        'eip155:1313161554'
    ],
    NAMES_SUPPORTED_CHAIN_NAMESPACES: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM
    ],
    ONRAMP_SUPPORTED_CHAIN_NAMESPACES: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA
    ],
    PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA
    ],
    ACTIVITY_ENABLED_CHAIN_NAMESPACES: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM
    ],
    NATIVE_TOKEN_ADDRESS: {
        eip155: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        solana: 'So11111111111111111111111111111111111111111',
        polkadot: '0x',
        bip122: '0x',
        cosmos: '0x',
        sui: '0x',
        stacks: '0x'
    },
    CONVERT_SLIPPAGE_TOLERANCE: 1,
    CONNECT_LABELS: {
        MOBILE: 'Open and continue in the wallet app',
        WEB: 'Open and continue in the wallet app'
    },
    SEND_SUPPORTED_NAMESPACES: [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA
    ],
    DEFAULT_REMOTE_FEATURES: {
        swaps: [
            '1inch'
        ],
        onramp: [
            'meld'
        ],
        email: true,
        socials: [
            'google',
            'x',
            'discord',
            'farcaster',
            'github',
            'apple',
            'facebook'
        ],
        activity: true,
        reownBranding: true,
        multiWallet: false,
        emailCapture: false,
        payWithExchange: false,
        payments: false,
        reownAuthentication: false
    },
    DEFAULT_REMOTE_FEATURES_DISABLED: {
        email: false,
        socials: false,
        swaps: false,
        onramp: false,
        activity: false,
        reownBranding: false,
        emailCapture: false,
        reownAuthentication: false
    },
    DEFAULT_FEATURES: {
        receive: true,
        send: true,
        emailShowWallets: true,
        connectorTypeOrder: [
            'walletConnect',
            'recent',
            'injected',
            'featured',
            'custom',
            'external',
            'recommended'
        ],
        analytics: true,
        allWallets: true,
        legalCheckbox: false,
        smartSessions: false,
        collapseWallets: false,
        walletFeaturesOrder: [
            'onramp',
            'swaps',
            'receive',
            'send'
        ],
        connectMethodsOrder: undefined,
        pay: false,
        reownAuthentication: false
    },
    DEFAULT_SOCIALS: [
        'google',
        'x',
        'farcaster',
        'discord',
        'apple',
        'github',
        'facebook'
    ],
    DEFAULT_ACCOUNT_TYPES: {
        bip122: 'payment',
        eip155: 'smartAccount',
        polkadot: 'eoa',
        solana: 'eoa'
    },
    ADAPTER_TYPES: {
        UNIVERSAL: 'universal',
        SOLANA: 'solana',
        WAGMI: 'wagmi',
        ETHERS: 'ethers',
        ETHERS5: 'ethers5',
        BITCOIN: 'bitcoin'
    },
    SIWX_DEFAULTS: {
        signOutOnDisconnect: true
    }
}; //# sourceMappingURL=ConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorageUtil",
    ()=>StorageUtil
]);
/* eslint-disable no-console */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-client] (ecmascript)");
;
const StorageUtil = {
    // Cache expiry in milliseconds
    cacheExpiry: {
        portfolio: 30000,
        nativeBalance: 30000,
        ens: 300000,
        identity: 300000,
        transactionsHistory: 15000,
        tokenPrice: 15000,
        // 7 Days
        latestAppKitVersion: 604_800_000
    },
    isCacheExpired (timestamp, cacheExpiry) {
        return Date.now() - timestamp > cacheExpiry;
    },
    getActiveNetworkProps () {
        const namespace = StorageUtil.getActiveNamespace();
        const caipNetworkId = StorageUtil.getActiveCaipNetworkId();
        const stringChainId = caipNetworkId ? caipNetworkId.split(':')[1] : undefined;
        // eslint-disable-next-line no-nested-ternary
        const chainId = stringChainId ? isNaN(Number(stringChainId)) ? stringChainId : Number(stringChainId) : undefined;
        return {
            namespace,
            caipNetworkId,
            chainId
        };
    },
    setWalletConnectDeepLink ({ name, href }) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DEEPLINK_CHOICE, JSON.stringify({
                href,
                name
            }));
        } catch  {
            console.info('Unable to set WalletConnect deep link');
        }
    },
    getWalletConnectDeepLink () {
        try {
            const deepLink = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DEEPLINK_CHOICE);
            if (deepLink) {
                return JSON.parse(deepLink);
            }
        } catch  {
            console.info('Unable to get WalletConnect deep link');
        }
        return undefined;
    },
    deleteWalletConnectDeepLink () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DEEPLINK_CHOICE);
        } catch  {
            console.info('Unable to delete WalletConnect deep link');
        }
    },
    setActiveNamespace (namespace) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_NAMESPACE, namespace);
        } catch  {
            console.info('Unable to set active namespace');
        }
    },
    setActiveCaipNetworkId (caipNetworkId) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID, caipNetworkId);
            StorageUtil.setActiveNamespace(caipNetworkId.split(':')[0]);
        } catch  {
            console.info('Unable to set active caip network id');
        }
    },
    getActiveCaipNetworkId () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID);
        } catch  {
            console.info('Unable to get active caip network id');
            return undefined;
        }
    },
    deleteActiveCaipNetworkId () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID);
        } catch  {
            console.info('Unable to delete active caip network id');
        }
    },
    deleteConnectedConnectorId (namespace) {
        try {
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnectorIdKey"])(namespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(key);
        } catch  {
            console.info('Unable to delete connected connector id');
        }
    },
    setAppKitRecent (wallet) {
        try {
            const recentWallets = StorageUtil.getRecentWallets();
            const exists = recentWallets.find((w)=>w.id === wallet.id);
            if (!exists) {
                recentWallets.unshift(wallet);
                if (recentWallets.length > 2) {
                    recentWallets.pop();
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLETS, JSON.stringify(recentWallets));
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLET, JSON.stringify(wallet));
            }
        } catch  {
            console.info('Unable to set AppKit recent');
        }
    },
    getRecentWallets () {
        try {
            const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLETS);
            return recent ? JSON.parse(recent) : [];
        } catch  {
            console.info('Unable to get AppKit recent');
        }
        return [];
    },
    getRecentWallet () {
        try {
            const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLET);
            return recent ? JSON.parse(recent) : null;
        } catch  {
            console.info('Unable to get AppKit recent');
        }
        return null;
    },
    deleteRecentWallet () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLET);
        } catch  {
            console.info('Unable to delete AppKit recent');
        }
    },
    setConnectedConnectorId (namespace, connectorId) {
        try {
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnectorIdKey"])(namespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(key, connectorId);
        } catch  {
            console.info('Unable to set Connected Connector Id');
        }
    },
    getActiveNamespace () {
        try {
            const activeNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_NAMESPACE);
            return activeNamespace;
        } catch  {
            console.info('Unable to get active namespace');
        }
        return undefined;
    },
    getConnectedConnectorId (namespace) {
        if (!namespace) {
            return undefined;
        }
        try {
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnectorIdKey"])(namespace);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(key);
        } catch (e) {
            console.info('Unable to get connected connector id in namespace', namespace);
        }
        return undefined;
    },
    setConnectedSocialProvider (socialProvider) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL, socialProvider);
        } catch  {
            console.info('Unable to set connected social provider');
        }
    },
    getConnectedSocialProvider () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL);
        } catch  {
            console.info('Unable to get connected social provider');
        }
        return undefined;
    },
    deleteConnectedSocialProvider () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL);
        } catch  {
            console.info('Unable to delete connected social provider');
        }
    },
    getConnectedSocialUsername () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL_USERNAME);
        } catch  {
            console.info('Unable to get connected social username');
        }
        return undefined;
    },
    getStoredActiveCaipNetworkId () {
        const storedCaipNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID);
        const networkId = storedCaipNetworkId?.split(':')?.[1];
        return networkId;
    },
    setConnectionStatus (status) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTION_STATUS, status);
        } catch  {
            console.info('Unable to set connection status');
        }
    },
    getConnectionStatus () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTION_STATUS);
        } catch  {
            return undefined;
        }
    },
    getConnectedNamespaces () {
        try {
            const namespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_NAMESPACES);
            if (!namespaces?.length) {
                return [];
            }
            return namespaces.split(',');
        } catch  {
            return [];
        }
    },
    setConnectedNamespaces (namespaces) {
        try {
            const uniqueNamespaces = Array.from(new Set(namespaces));
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_NAMESPACES, uniqueNamespaces.join(','));
        } catch  {
            console.info('Unable to set namespaces in storage');
        }
    },
    addConnectedNamespace (namespace) {
        try {
            const namespaces = StorageUtil.getConnectedNamespaces();
            if (!namespaces.includes(namespace)) {
                namespaces.push(namespace);
                StorageUtil.setConnectedNamespaces(namespaces);
            }
        } catch  {
            console.info('Unable to add connected namespace');
        }
    },
    removeConnectedNamespace (namespace) {
        try {
            const namespaces = StorageUtil.getConnectedNamespaces();
            const index = namespaces.indexOf(namespace);
            if (index > -1) {
                namespaces.splice(index, 1);
                StorageUtil.setConnectedNamespaces(namespaces);
            }
        } catch  {
            console.info('Unable to remove connected namespace');
        }
    },
    getTelegramSocialProvider () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].TELEGRAM_SOCIAL_PROVIDER);
        } catch  {
            console.info('Unable to get telegram social provider');
            return null;
        }
    },
    setTelegramSocialProvider (socialProvider) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].TELEGRAM_SOCIAL_PROVIDER, socialProvider);
        } catch  {
            console.info('Unable to set telegram social provider');
        }
    },
    removeTelegramSocialProvider () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].TELEGRAM_SOCIAL_PROVIDER);
        } catch  {
            console.info('Unable to remove telegram social provider');
        }
    },
    getBalanceCache () {
        let cache = {};
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].PORTFOLIO_CACHE);
            cache = result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get balance cache');
        }
        return cache;
    },
    removeAddressFromBalanceCache (caipAddress) {
        try {
            const cache = StorageUtil.getBalanceCache();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].PORTFOLIO_CACHE, JSON.stringify({
                ...cache,
                [caipAddress]: undefined
            }));
        } catch  {
            console.info('Unable to remove address from balance cache', caipAddress);
        }
    },
    getBalanceCacheForCaipAddress (caipAddress) {
        try {
            const cache = StorageUtil.getBalanceCache();
            const balanceCache = cache[caipAddress];
            // We want to discard cache if it's older than the cache expiry
            if (balanceCache && !this.isCacheExpired(balanceCache.timestamp, this.cacheExpiry.portfolio)) {
                return balanceCache.balance;
            }
            StorageUtil.removeAddressFromBalanceCache(caipAddress);
        } catch  {
            console.info('Unable to get balance cache for address', caipAddress);
        }
        return undefined;
    },
    updateBalanceCache (params) {
        try {
            const cache = StorageUtil.getBalanceCache();
            cache[params.caipAddress] = params;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].PORTFOLIO_CACHE, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update balance cache', params);
        }
    },
    getNativeBalanceCache () {
        let cache = {};
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].NATIVE_BALANCE_CACHE);
            cache = result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get balance cache');
        }
        return cache;
    },
    removeAddressFromNativeBalanceCache (caipAddress) {
        try {
            const cache = StorageUtil.getBalanceCache();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].NATIVE_BALANCE_CACHE, JSON.stringify({
                ...cache,
                [caipAddress]: undefined
            }));
        } catch  {
            console.info('Unable to remove address from balance cache', caipAddress);
        }
    },
    getNativeBalanceCacheForCaipAddress (caipAddress) {
        try {
            const cache = StorageUtil.getNativeBalanceCache();
            const nativeBalanceCache = cache[caipAddress];
            // We want to discard cache if it's older than the cache expiry
            if (nativeBalanceCache && !this.isCacheExpired(nativeBalanceCache.timestamp, this.cacheExpiry.nativeBalance)) {
                return nativeBalanceCache;
            }
            console.info('Discarding cache for address', caipAddress);
            StorageUtil.removeAddressFromBalanceCache(caipAddress);
        } catch  {
            console.info('Unable to get balance cache for address', caipAddress);
        }
        return undefined;
    },
    updateNativeBalanceCache (params) {
        try {
            const cache = StorageUtil.getNativeBalanceCache();
            cache[params.caipAddress] = params;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].NATIVE_BALANCE_CACHE, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update balance cache', params);
        }
    },
    getEnsCache () {
        let cache = {};
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ENS_CACHE);
            cache = result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get ens name cache');
        }
        return cache;
    },
    getEnsFromCacheForAddress (address) {
        try {
            const cache = StorageUtil.getEnsCache();
            const ensCache = cache[address];
            // We want to discard cache if it's older than the cache expiry
            if (ensCache && !this.isCacheExpired(ensCache.timestamp, this.cacheExpiry.ens)) {
                return ensCache.ens;
            }
            StorageUtil.removeEnsFromCache(address);
        } catch  {
            console.info('Unable to get ens name from cache', address);
        }
        return undefined;
    },
    updateEnsCache (params) {
        try {
            const cache = StorageUtil.getEnsCache();
            cache[params.address] = params;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ENS_CACHE, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update ens name cache', params);
        }
    },
    removeEnsFromCache (address) {
        try {
            const cache = StorageUtil.getEnsCache();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ENS_CACHE, JSON.stringify({
                ...cache,
                [address]: undefined
            }));
        } catch  {
            console.info('Unable to remove ens name from cache', address);
        }
    },
    getIdentityCache () {
        let cache = {};
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].IDENTITY_CACHE);
            cache = result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get identity cache');
        }
        return cache;
    },
    getIdentityFromCacheForAddress (address) {
        try {
            const cache = StorageUtil.getIdentityCache();
            const identityCache = cache[address];
            // We want to discard cache if it's older than the cache expiry
            if (identityCache && !this.isCacheExpired(identityCache.timestamp, this.cacheExpiry.identity)) {
                return identityCache.identity;
            }
            StorageUtil.removeIdentityFromCache(address);
        } catch  {
            console.info('Unable to get identity from cache', address);
        }
        return undefined;
    },
    updateIdentityCache (params) {
        try {
            const cache = StorageUtil.getIdentityCache();
            cache[params.address] = {
                identity: params.identity,
                timestamp: params.timestamp
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].IDENTITY_CACHE, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update identity cache', params);
        }
    },
    removeIdentityFromCache (address) {
        try {
            const cache = StorageUtil.getIdentityCache();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].IDENTITY_CACHE, JSON.stringify({
                ...cache,
                [address]: undefined
            }));
        } catch  {
            console.info('Unable to remove identity from cache', address);
        }
    },
    clearAddressCache () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].PORTFOLIO_CACHE);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].NATIVE_BALANCE_CACHE);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ENS_CACHE);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].IDENTITY_CACHE);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].HISTORY_TRANSACTIONS_CACHE);
        } catch  {
            console.info('Unable to clear address cache');
        }
    },
    setPreferredAccountTypes (accountTypes) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].PREFERRED_ACCOUNT_TYPES, JSON.stringify(accountTypes));
        } catch  {
            console.info('Unable to set preferred account types', accountTypes);
        }
    },
    getPreferredAccountTypes () {
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].PREFERRED_ACCOUNT_TYPES);
            if (!result) {
                return {};
            }
            return JSON.parse(result);
        } catch  {
            console.info('Unable to get preferred account types');
        }
        return {};
    },
    setConnections (connections, chainNamespace) {
        try {
            const existingConnections = StorageUtil.getConnections();
            const existing = existingConnections[chainNamespace] ?? [];
            const connectorConnectionMap = new Map();
            for (const conn of existing){
                connectorConnectionMap.set(conn.connectorId, {
                    ...conn
                });
            }
            for (const conn of connections){
                const existingConn = connectorConnectionMap.get(conn.connectorId);
                const isAuth = conn.connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
                if (existingConn && !isAuth) {
                    const existingAddrs = new Set(existingConn.accounts.map((a)=>a.address.toLowerCase()));
                    const newAccounts = conn.accounts.filter((a)=>!existingAddrs.has(a.address.toLowerCase()));
                    existingConn.accounts.push(...newAccounts);
                } else {
                    connectorConnectionMap.set(conn.connectorId, {
                        ...conn
                    });
                }
            }
            const dedupedConnections = {
                ...existingConnections,
                [chainNamespace]: Array.from(connectorConnectionMap.values())
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTIONS, JSON.stringify(dedupedConnections));
        } catch (error) {
            console.error('Unable to sync connections to storage', error);
        }
    },
    getConnections () {
        try {
            const connectionsStorage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTIONS);
            if (!connectionsStorage) {
                return {};
            }
            return JSON.parse(connectionsStorage);
        } catch (error) {
            console.error('Unable to get connections from storage', error);
            return {};
        }
    },
    deleteAddressFromConnection ({ connectorId, address, namespace }) {
        try {
            const connections = StorageUtil.getConnections();
            const namespaceConnections = connections[namespace] ?? [];
            const connectionMap = new Map(namespaceConnections.map((conn)=>[
                    conn.connectorId,
                    conn
                ]));
            const connector = connectionMap.get(connectorId);
            if (connector) {
                const updatedAccounts = connector.accounts.filter((acc)=>acc.address.toLowerCase() !== address.toLowerCase());
                if (updatedAccounts.length === 0) {
                    connectionMap.delete(connectorId);
                } else {
                    connectionMap.set(connectorId, {
                        ...connector,
                        accounts: connector.accounts.filter((acc)=>acc.address.toLowerCase() !== address.toLowerCase())
                    });
                }
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTIONS, JSON.stringify({
                ...connections,
                [namespace]: Array.from(connectionMap.values())
            }));
        } catch  {
            console.error(`Unable to remove address "${address}" from connector "${connectorId}" in namespace "${namespace}"`);
        }
    },
    getDisconnectedConnectorIds () {
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DISCONNECTED_CONNECTOR_IDS);
            if (!result) {
                return {};
            }
            return JSON.parse(result);
        } catch  {
            console.info('Unable to get disconnected connector ids');
        }
        return {};
    },
    addDisconnectedConnectorId (connectorId, chainNamespace) {
        try {
            const currentDisconnectedConnectorIds = StorageUtil.getDisconnectedConnectorIds();
            const disconnectedConnectorIdsByNamespace = currentDisconnectedConnectorIds[chainNamespace] ?? [];
            disconnectedConnectorIdsByNamespace.push(connectorId);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
                ...currentDisconnectedConnectorIds,
                [chainNamespace]: Array.from(new Set(disconnectedConnectorIdsByNamespace))
            }));
        } catch  {
            console.error(`Unable to set disconnected connector id "${connectorId}" for namespace "${chainNamespace}"`);
        }
    },
    removeDisconnectedConnectorId (connectorId, chainNamespace) {
        try {
            const currentDisconnectedConnectorIds = StorageUtil.getDisconnectedConnectorIds();
            let disconnectedConnectorIdsByNamespace = currentDisconnectedConnectorIds[chainNamespace] ?? [];
            disconnectedConnectorIdsByNamespace = disconnectedConnectorIdsByNamespace.filter((id)=>id.toLowerCase() !== connectorId.toLowerCase());
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
                ...currentDisconnectedConnectorIds,
                [chainNamespace]: Array.from(new Set(disconnectedConnectorIdsByNamespace))
            }));
        } catch  {
            console.error(`Unable to remove disconnected connector id "${connectorId}" for namespace "${chainNamespace}"`);
        }
    },
    isConnectorDisconnected (connectorId, chainNamespace) {
        try {
            const currentDisconnectedConnectorIds = StorageUtil.getDisconnectedConnectorIds();
            const disconnectedConnectorIdsByNamespace = currentDisconnectedConnectorIds[chainNamespace] ?? [];
            return disconnectedConnectorIdsByNamespace.some((id)=>id.toLowerCase() === connectorId.toLowerCase());
        } catch  {
            console.info(`Unable to get disconnected connector id "${connectorId}" for namespace "${chainNamespace}"`);
        }
        return false;
    },
    getTransactionsCache () {
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].HISTORY_TRANSACTIONS_CACHE);
            return result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get transactions cache');
        }
        return {};
    },
    getTransactionsCacheForAddress ({ address, chainId = '' }) {
        try {
            const cache = StorageUtil.getTransactionsCache();
            const transactionsCache = cache[address]?.[chainId];
            // We want to discard cache if it's older than the cache expiry
            if (transactionsCache && !this.isCacheExpired(transactionsCache.timestamp, this.cacheExpiry.transactionsHistory)) {
                return transactionsCache.transactions;
            }
            StorageUtil.removeTransactionsCache({
                address,
                chainId
            });
        } catch  {
            console.info('Unable to get transactions cache');
        }
        return undefined;
    },
    updateTransactionsCache ({ address, chainId = '', timestamp, transactions }) {
        try {
            const cache = StorageUtil.getTransactionsCache();
            cache[address] = {
                ...cache[address],
                [chainId]: {
                    timestamp,
                    transactions
                }
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].HISTORY_TRANSACTIONS_CACHE, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update transactions cache', {
                address,
                chainId,
                timestamp,
                transactions
            });
        }
    },
    removeTransactionsCache ({ address, chainId }) {
        try {
            const cache = StorageUtil.getTransactionsCache();
            const addressCache = cache?.[address] || {};
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [chainId]: _removed, ...updatedChainData } = addressCache;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].HISTORY_TRANSACTIONS_CACHE, JSON.stringify({
                ...cache,
                [address]: updatedChainData
            }));
        } catch  {
            console.info('Unable to remove transactions cache', {
                address,
                chainId
            });
        }
    },
    getTokenPriceCache () {
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].TOKEN_PRICE_CACHE);
            return result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get token price cache');
        }
        return {};
    },
    getTokenPriceCacheForAddresses (addresses) {
        try {
            const cache = StorageUtil.getTokenPriceCache();
            const tokenPriceCache = cache[addresses.join(',')];
            if (tokenPriceCache && !this.isCacheExpired(tokenPriceCache.timestamp, this.cacheExpiry.tokenPrice)) {
                return tokenPriceCache.tokenPrice;
            }
            StorageUtil.removeTokenPriceCache(addresses);
        } catch  {
            console.info('Unable to get token price cache for addresses', addresses);
        }
        return undefined;
    },
    updateTokenPriceCache (params) {
        try {
            const cache = StorageUtil.getTokenPriceCache();
            cache[params.addresses.join(',')] = {
                timestamp: params.timestamp,
                tokenPrice: params.tokenPrice
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].TOKEN_PRICE_CACHE, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update token price cache', params);
        }
    },
    removeTokenPriceCache (addresses) {
        try {
            const cache = StorageUtil.getTokenPriceCache();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].TOKEN_PRICE_CACHE, JSON.stringify({
                ...cache,
                [addresses.join(',')]: undefined
            }));
        } catch  {
            console.info('Unable to remove token price cache', addresses);
        }
    },
    /* ----- AppKit Latest Version ------------------------- */ getLatestAppKitVersion () {
        try {
            const result = this.getLatestAppKitVersionCache();
            const version = result?.version;
            if (version && !this.isCacheExpired(result.timestamp, this.cacheExpiry.latestAppKitVersion)) {
                return version;
            }
            return undefined;
        } catch  {
            console.info('Unable to get latest AppKit version');
        }
        return undefined;
    },
    getLatestAppKitVersionCache () {
        try {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].LATEST_APPKIT_VERSION);
            return result ? JSON.parse(result) : {};
        } catch  {
            console.info('Unable to get latest AppKit version cache');
        }
        return {};
    },
    updateLatestAppKitVersion (params) {
        try {
            const cache = StorageUtil.getLatestAppKitVersionCache();
            cache.timestamp = params.timestamp;
            cache.version = params.version;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].LATEST_APPKIT_VERSION, JSON.stringify(cache));
        } catch  {
            console.info('Unable to update latest AppKit version on local storage', params);
        }
    }
}; //# sourceMappingURL=StorageUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoreHelperUtil",
    ()=>CoreHelperUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
;
;
;
const CoreHelperUtil = {
    isMobile () {
        if (this.isClient()) {
            return Boolean(window?.matchMedia && typeof window.matchMedia === 'function' && window.matchMedia('(pointer:coarse)')?.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent));
        }
        return false;
    },
    checkCaipNetwork (network, networkName = '') {
        return network?.caipNetworkId.toLocaleLowerCase().includes(networkName.toLowerCase());
    },
    isAndroid () {
        if (!this.isMobile()) {
            return false;
        }
        const ua = window?.navigator.userAgent.toLowerCase();
        return CoreHelperUtil.isMobile() && ua.includes('android');
    },
    isIos () {
        if (!this.isMobile()) {
            return false;
        }
        const ua = window?.navigator.userAgent.toLowerCase();
        return ua.includes('iphone') || ua.includes('ipad');
    },
    isSafari () {
        if (!this.isClient()) {
            return false;
        }
        const ua = window?.navigator.userAgent.toLowerCase();
        return ua.includes('safari');
    },
    isClient () {
        return typeof window !== 'undefined';
    },
    isPairingExpired (expiry) {
        return expiry ? expiry - Date.now() <= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].TEN_SEC_MS : true;
    },
    isAllowedRetry (lastRetry, differenceMs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ONE_SEC_MS) {
        return Date.now() - lastRetry >= differenceMs;
    },
    copyToClopboard (text) {
        navigator.clipboard.writeText(text);
    },
    isIframe () {
        try {
            return window?.self !== window?.top;
        } catch (e) {
            return false;
        }
    },
    isSafeApp () {
        if (CoreHelperUtil.isClient() && window.self !== window.top) {
            try {
                const ancestor = window?.location?.ancestorOrigins?.[0];
                const safeAppUrl = 'https://app.safe.global';
                if (ancestor) {
                    const ancestorUrl = new URL(ancestor);
                    const safeUrl = new URL(safeAppUrl);
                    return ancestorUrl.hostname === safeUrl.hostname;
                }
            } catch  {
                return false;
            }
        }
        return false;
    },
    getPairingExpiry () {
        return Date.now() + __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].FOUR_MINUTES_MS;
    },
    getNetworkId (caipAddress) {
        return caipAddress?.split(':')[1];
    },
    getPlainAddress (caipAddress) {
        return caipAddress?.split(':')[2];
    },
    async wait (milliseconds) {
        return new Promise((resolve)=>{
            setTimeout(resolve, milliseconds);
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debounce (func, timeout = 500) {
        let timer = undefined;
        return (...args)=>{
            function next() {
                func(...args);
            }
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(next, timeout);
        };
    },
    isHttpUrl (url) {
        return url.startsWith('http://') || url.startsWith('https://');
    },
    formatNativeUrl (appUrl, wcUri, universalLink = null) {
        if (CoreHelperUtil.isHttpUrl(appUrl)) {
            return this.formatUniversalUrl(appUrl, wcUri);
        }
        let safeAppUrl = appUrl;
        let safeUniversalLink = universalLink;
        if (safeAppUrl) {
            if (!safeAppUrl.includes('://')) {
                safeAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '');
                safeAppUrl = `${safeAppUrl}://`;
            }
            if (!safeAppUrl.endsWith('/')) {
                safeAppUrl = `${safeAppUrl}/`;
            }
        }
        if (safeUniversalLink && !safeUniversalLink?.endsWith('/')) {
            safeUniversalLink = `${safeUniversalLink}/`;
        }
        // Android deeplinks in tg context require the uri to be encoded twice
        if (this.isTelegram() && this.isAndroid()) {
            // eslint-disable-next-line no-param-reassign
            wcUri = encodeURIComponent(wcUri);
        }
        const encodedWcUrl = encodeURIComponent(wcUri);
        return {
            redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
            redirectUniversalLink: safeUniversalLink ? `${safeUniversalLink}wc?uri=${encodedWcUrl}` : undefined,
            href: safeAppUrl
        };
    },
    formatUniversalUrl (appUrl, wcUri) {
        if (!CoreHelperUtil.isHttpUrl(appUrl)) {
            return this.formatNativeUrl(appUrl, wcUri);
        }
        let safeAppUrl = appUrl;
        if (!safeAppUrl.endsWith('/')) {
            safeAppUrl = `${safeAppUrl}/`;
        }
        const encodedWcUrl = encodeURIComponent(wcUri);
        return {
            redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
            href: safeAppUrl
        };
    },
    getOpenTargetForPlatform (target) {
        if (target === 'popupWindow') {
            return target;
        }
        // Only '_blank' deeplinks work in Telegram context
        if (this.isTelegram()) {
            // But for social login, we need to load the page in the same context
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getTelegramSocialProvider()) {
                return '_top';
            }
            return '_blank';
        }
        return target;
    },
    openHref (href, target, features) {
        window?.open(href, this.getOpenTargetForPlatform(target), features || 'noreferrer noopener');
    },
    returnOpenHref (href, target, features) {
        return window?.open(href, this.getOpenTargetForPlatform(target), features || 'noreferrer noopener');
    },
    isTelegram () {
        return typeof window !== 'undefined' && // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Boolean(window.TelegramWebviewProxy) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Boolean(window.Telegram) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Boolean(window.TelegramWebviewProxyProto));
    },
    isPWA () {
        if (typeof window === 'undefined') {
            return false;
        }
        const isStandaloneDisplayMode = window?.matchMedia && typeof window.matchMedia === 'function' ? window.matchMedia('(display-mode: standalone)')?.matches : false;
        const isIOSStandalone = window?.navigator?.standalone;
        return Boolean(isStandaloneDisplayMode || isIOSStandalone);
    },
    async preloadImage (src) {
        const imagePromise = new Promise((resolve, reject)=>{
            const image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.crossOrigin = 'anonymous';
            image.src = src;
        });
        return Promise.race([
            imagePromise,
            CoreHelperUtil.wait(2000)
        ]);
    },
    parseBalance (balance, symbol) {
        let formattedBalance = '0.000';
        if (typeof balance === 'string') {
            const number = Number(balance);
            if (!isNaN(number)) {
                const formattedValue = (Math.floor(number * 1000) / 1000).toFixed(3);
                if (formattedValue) {
                    formattedBalance = formattedValue;
                }
            }
        }
        const [valueString, decimalsString] = formattedBalance.split('.');
        const value = valueString || '0';
        const decimals = decimalsString || '000';
        const formattedText = `${value}.${decimals}${symbol ? ` ${symbol}` : ''}`;
        return {
            formattedText,
            value,
            decimals,
            symbol
        };
    },
    getApiUrl () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].W3M_API_URL;
    },
    getBlockchainApiUrl () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].BLOCKCHAIN_API_RPC_URL;
    },
    getAnalyticsUrl () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].PULSE_API_URL;
    },
    getUUID () {
        if (crypto?.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, (c)=>{
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseError (error) {
        if (typeof error === 'string') {
            return error;
        } else if (typeof error?.issues?.[0]?.message === 'string') {
            return error.issues[0].message;
        } else if (error instanceof Error) {
            return error.message;
        }
        return 'Unknown error';
    },
    sortRequestedNetworks (approvedIds, requestedNetworks = []) {
        const approvedIndexMap = {};
        if (requestedNetworks && approvedIds) {
            approvedIds.forEach((id, index)=>{
                approvedIndexMap[id] = index;
            });
            requestedNetworks.sort((a, b)=>{
                const indexA = approvedIndexMap[a.id];
                const indexB = approvedIndexMap[b.id];
                if (indexA !== undefined && indexB !== undefined) {
                    return indexA - indexB;
                } else if (indexA !== undefined) {
                    return -1;
                } else if (indexB !== undefined) {
                    return 1;
                }
                return 0;
            });
        }
        return requestedNetworks;
    },
    calculateBalance (array) {
        let sum = 0;
        for (const item of array){
            sum += item.value ?? 0;
        }
        return sum;
    },
    formatTokenBalance (number) {
        const roundedNumber = number.toFixed(2);
        const [dollars, pennies] = roundedNumber.split('.');
        return {
            dollars,
            pennies
        };
    },
    isAddress (address, chain = 'eip155') {
        switch(chain){
            case 'eip155':
                if (!/^(?:0x)?[0-9a-f]{40}$/iu.test(address)) {
                    return false;
                } else if (/^(?:0x)?[0-9a-f]{40}$/iu.test(address) || /^(?:0x)?[0-9A-F]{40}$/iu.test(address)) {
                    return true;
                }
                return false;
            case 'solana':
                return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(address);
            default:
                return false;
        }
    },
    uniqueBy (arr, key) {
        const set = new Set();
        return arr.filter((item)=>{
            const keyValue = item[key];
            if (set.has(keyValue)) {
                return false;
            }
            set.add(keyValue);
            return true;
        });
    },
    generateSdkVersion (adapters, platform, version) {
        const hasNoAdapters = adapters.length === 0;
        const adapterNames = hasNoAdapters ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ADAPTER_TYPES.UNIVERSAL : adapters.map((adapter)=>adapter.adapterType).join(',');
        return `${platform}-${adapterNames}-${version}`;
    },
    // eslint-disable-next-line max-params
    createAccount (namespace, address, type, publicKey, path) {
        return {
            namespace,
            address,
            type,
            publicKey,
            path
        };
    },
    isCaipAddress (address) {
        if (typeof address !== 'string') {
            return false;
        }
        const sections = address.split(':');
        const namespace = sections[0];
        return sections.filter(Boolean).length === 3 && namespace in __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN_NAME_MAP;
    },
    getAccount (account) {
        if (!account) {
            return {
                address: undefined,
                chainId: undefined
            };
        }
        if (typeof account === 'string') {
            return {
                address: account,
                chainId: undefined
            };
        }
        return {
            address: account.address,
            chainId: account.chainId
        };
    },
    isMac () {
        const ua = window?.navigator.userAgent.toLowerCase();
        return ua.includes('macintosh') && !ua.includes('safari');
    },
    formatTelegramSocialLoginUrl (url) {
        const valueToInject = `--${encodeURIComponent(window?.location.href)}`;
        const paramToInject = 'state=';
        const parsedUrl = new URL(url);
        if (parsedUrl.host === 'auth.magic.link') {
            const providerParam = 'provider_authorization_url=';
            const providerUrl = url.substring(url.indexOf(providerParam) + providerParam.length);
            const resultUrl = this.injectIntoUrl(decodeURIComponent(providerUrl), paramToInject, valueToInject);
            return url.replace(providerUrl, encodeURIComponent(resultUrl));
        }
        return this.injectIntoUrl(url, paramToInject, valueToInject);
    },
    injectIntoUrl (url, key, appendString) {
        // Find the position of "key" e.g. "state=" in the URL
        const keyIndex = url.indexOf(key);
        if (keyIndex === -1) {
            throw new Error(`${key} parameter not found in the URL: ${url}`);
        }
        // Find the position of the next "&" after "key"
        const keyEndIndex = url.indexOf('&', keyIndex);
        const keyLength = key.length;
        // If there is no "&" after key, it means "key" is the last parameter
        // eslint-disable-next-line no-negated-condition
        const keyParamEnd = keyEndIndex !== -1 ? keyEndIndex : url.length;
        // Extract the part of the URL before the key value
        const beforeKeyValue = url.substring(0, keyIndex + keyLength);
        // Extract the current key value
        const currentKeyValue = url.substring(keyIndex + keyLength, keyParamEnd);
        // Extract the part of the URL after the key value
        const afterKeyValue = url.substring(keyEndIndex);
        // Append the new string to the key value
        const newKeyValue = currentKeyValue + appendString;
        // Reconstruct the URL with the appended key value
        const newUrl = beforeKeyValue + newKeyValue + afterKeyValue;
        return newUrl;
    }
}; //# sourceMappingURL=CoreHelperUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FetchUtil",
    ()=>FetchUtil
]);
async function fetchData(...args) {
    const response = await fetch(...args);
    if (!response.ok) {
        // Create error object and reject if not a 2xx response code
        const err = new Error(`HTTP status code: ${response.status}`, {
            cause: response
        });
        throw err;
    }
    return response;
}
class FetchUtil {
    constructor({ baseUrl, clientId }){
        this.baseUrl = baseUrl;
        this.clientId = clientId;
    }
    async get({ headers, signal, cache, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'GET',
            headers,
            signal,
            cache
        });
        return response.json();
    }
    async getBlob({ headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'GET',
            headers,
            signal
        });
        return response.blob();
    }
    async post({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'POST',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    async put({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'PUT',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    async delete({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'DELETE',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    createUrl({ path, params }) {
        const url = new URL(path, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value])=>{
                if (value) {
                    url.searchParams.append(key, value);
                }
            });
        }
        if (this.clientId) {
            url.searchParams.append('clientId', this.clientId);
        }
        return url;
    }
    sendBeacon({ body, ...args }) {
        const url = this.createUrl(args);
        return navigator.sendBeacon(url.toString(), body ? JSON.stringify(body) : undefined);
    }
} //# sourceMappingURL=FetchUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/OptionsUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OptionsUtil",
    ()=>OptionsUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
;
;
;
const OptionsUtil = {
    getFeatureValue (key, features) {
        const optionValue = features?.[key];
        if (optionValue === undefined) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES[key];
        }
        return optionValue;
    },
    filterSocialsByPlatform (socials) {
        if (!socials || !socials.length) {
            return socials;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isTelegram()) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isIos()) {
                return socials.filter((s)=>s !== 'google');
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMac()) {
                return socials.filter((s)=>s !== 'x');
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isAndroid()) {
                return socials.filter((s)=>![
                        'facebook',
                        'x'
                    ].includes(s));
            }
        }
        return socials;
    },
    isSocialsEnabled () {
        return Array.isArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.socials) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.socials.length > 0 || Array.isArray(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.socials) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.socials.length > 0;
    },
    isEmailEnabled () {
        return Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.email || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.email);
    }
}; //# sourceMappingURL=OptionsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OptionsController",
    ()=>OptionsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$OptionsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/OptionsUtil.js [app-client] (ecmascript)");
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    features: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES,
    projectId: '',
    sdkType: 'appkit',
    sdkVersion: 'html-wagmi-undefined',
    defaultAccountTypes: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_ACCOUNT_TYPES,
    enableNetworkSwitch: true,
    experimental_preferUniversalLinks: false,
    remoteFeatures: {},
    enableMobileFullScreen: false
});
const OptionsController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    setOptions (options) {
        Object.assign(state, options);
    },
    setRemoteFeatures (remoteFeatures) {
        if (!remoteFeatures) {
            return;
        }
        const newRemoteFeatures = {
            ...state.remoteFeatures,
            ...remoteFeatures
        };
        state.remoteFeatures = newRemoteFeatures;
        if (state.remoteFeatures?.socials) {
            state.remoteFeatures.socials = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$OptionsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsUtil"].filterSocialsByPlatform(state.remoteFeatures.socials);
        }
        if (state.features?.pay) {
            state.remoteFeatures.email = false;
            state.remoteFeatures.socials = false;
        }
    },
    setFeatures (features) {
        if (!features) {
            return;
        }
        if (!state.features) {
            state.features = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES;
        }
        const newFeatures = {
            ...state.features,
            ...features
        };
        state.features = newFeatures;
        if (state.features?.pay && state.remoteFeatures) {
            state.remoteFeatures.email = false;
            state.remoteFeatures.socials = false;
        }
    },
    setProjectId (projectId) {
        state.projectId = projectId;
    },
    setCustomRpcUrls (customRpcUrls) {
        state.customRpcUrls = customRpcUrls;
    },
    setAllWallets (allWallets) {
        state.allWallets = allWallets;
    },
    setIncludeWalletIds (includeWalletIds) {
        state.includeWalletIds = includeWalletIds;
    },
    setExcludeWalletIds (excludeWalletIds) {
        state.excludeWalletIds = excludeWalletIds;
    },
    setFeaturedWalletIds (featuredWalletIds) {
        state.featuredWalletIds = featuredWalletIds;
    },
    setTokens (tokens) {
        state.tokens = tokens;
    },
    setTermsConditionsUrl (termsConditionsUrl) {
        state.termsConditionsUrl = termsConditionsUrl;
    },
    setPrivacyPolicyUrl (privacyPolicyUrl) {
        state.privacyPolicyUrl = privacyPolicyUrl;
    },
    setCustomWallets (customWallets) {
        state.customWallets = customWallets;
    },
    setIsSiweEnabled (isSiweEnabled) {
        state.isSiweEnabled = isSiweEnabled;
    },
    setIsUniversalProvider (isUniversalProvider) {
        state.isUniversalProvider = isUniversalProvider;
    },
    setSdkVersion (sdkVersion) {
        state.sdkVersion = sdkVersion;
    },
    setMetadata (metadata) {
        state.metadata = metadata;
    },
    setDisableAppend (disableAppend) {
        state.disableAppend = disableAppend;
    },
    setEIP6963Enabled (enableEIP6963) {
        state.enableEIP6963 = enableEIP6963;
    },
    setDebug (debug) {
        state.debug = debug;
    },
    setEnableWalletGuide (enableWalletGuide) {
        state.enableWalletGuide = enableWalletGuide;
    },
    setEnableAuthLogger (enableAuthLogger) {
        state.enableAuthLogger = enableAuthLogger;
    },
    setEnableWallets (enableWallets) {
        state.enableWallets = enableWallets;
    },
    setPreferUniversalLinks (preferUniversalLinks) {
        state.experimental_preferUniversalLinks = preferUniversalLinks;
    },
    setSIWX (siwx) {
        if (siwx) {
            for (const [key, isVal] of Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].SIWX_DEFAULTS)){
                /*
                 * Only writes when siwx[key] is null or undefined
                 * (use ||= if you only want to check “falsy”, not recommended here)
                 */ siwx[key] ??= isVal;
            }
        }
        state.siwx = siwx;
    },
    setConnectMethodsOrder (connectMethodsOrder) {
        state.features = {
            ...state.features,
            connectMethodsOrder
        };
    },
    setWalletFeaturesOrder (walletFeaturesOrder) {
        state.features = {
            ...state.features,
            walletFeaturesOrder
        };
    },
    setSocialsOrder (socialsOrder) {
        state.remoteFeatures = {
            ...state.remoteFeatures,
            socials: socialsOrder
        };
    },
    setCollapseWallets (collapseWallets) {
        state.features = {
            ...state.features,
            collapseWallets
        };
    },
    setEnableEmbedded (enableEmbedded) {
        state.enableEmbedded = enableEmbedded;
    },
    setAllowUnsupportedChain (allowUnsupportedChain) {
        state.allowUnsupportedChain = allowUnsupportedChain;
    },
    setManualWCControl (manualWCControl) {
        state.manualWCControl = manualWCControl;
    },
    setEnableNetworkSwitch (enableNetworkSwitch) {
        state.enableNetworkSwitch = enableNetworkSwitch;
    },
    setEnableMobileFullScreen (enableMobileFullScreen) {
        state.enableMobileFullScreen = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile() && enableMobileFullScreen;
    },
    setEnableReconnect (enableReconnect) {
        state.enableReconnect = enableReconnect;
    },
    setDefaultAccountTypes (defaultAccountType = {}) {
        Object.entries(defaultAccountType).forEach(([namespace, accountType])=>{
            if (accountType) {
                // @ts-expect-error - Keys are validated by the param type
                state.defaultAccountTypes[namespace] = accountType;
            }
        });
    },
    setUniversalProviderConfigOverride (universalProviderConfigOverride) {
        state.universalProviderConfigOverride = universalProviderConfigOverride;
    },
    getUniversalProviderConfigOverride () {
        return state.universalProviderConfigOverride;
    },
    getSnapshot () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(state);
    }
}; //# sourceMappingURL=OptionsController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SnackController",
    ()=>SnackController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
;
;
;
// -- Constants ----------------------------------------- //
const DEFAULT_STATE = Object.freeze({
    message: '',
    variant: 'success',
    svg: undefined,
    open: false,
    autoClose: true
});
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    ...DEFAULT_STATE
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    showLoading (message, options = {}) {
        this._showMessage({
            message,
            variant: 'loading',
            ...options
        });
    },
    showSuccess (message) {
        this._showMessage({
            message,
            variant: 'success'
        });
    },
    showSvg (message, svg) {
        this._showMessage({
            message,
            svg
        });
    },
    showError (message) {
        const errorMessage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].parseError(message);
        this._showMessage({
            message: errorMessage,
            variant: 'error'
        });
    },
    hide () {
        state.message = DEFAULT_STATE.message;
        state.variant = DEFAULT_STATE.variant;
        state.svg = DEFAULT_STATE.svg;
        state.open = DEFAULT_STATE.open;
        state.autoClose = DEFAULT_STATE.autoClose;
    },
    _showMessage ({ message, svg, variant = 'success', autoClose = DEFAULT_STATE.autoClose }) {
        if (state.open) {
            state.open = false;
            setTimeout(()=>{
                state.message = message;
                state.variant = variant;
                state.svg = svg;
                state.open = true;
                state.autoClose = autoClose;
            }, 150);
        } else {
            state.message = message;
            state.variant = variant;
            state.svg = svg;
            state.open = true;
            state.autoClose = autoClose;
        }
    }
};
const SnackController = controller; //# sourceMappingURL=SnackController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockchainApiController",
    ()=>BlockchainApiController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const DEFAULT_OPTIONS = {
    purchaseCurrencies: [
        {
            id: '2b92315d-eab7-5bef-84fa-089a131333f5',
            name: 'USD Coin',
            symbol: 'USDC',
            networks: [
                {
                    name: 'ethereum-mainnet',
                    display_name: 'Ethereum',
                    chain_id: '1',
                    contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                },
                {
                    name: 'polygon-mainnet',
                    display_name: 'Polygon',
                    chain_id: '137',
                    contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                }
            ]
        },
        {
            id: '2b92315d-eab7-5bef-84fa-089a131333f5',
            name: 'Ether',
            symbol: 'ETH',
            networks: [
                {
                    name: 'ethereum-mainnet',
                    display_name: 'Ethereum',
                    chain_id: '1',
                    contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                },
                {
                    name: 'polygon-mainnet',
                    display_name: 'Polygon',
                    chain_id: '137',
                    contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                }
            ]
        }
    ],
    paymentCurrencies: [
        {
            id: 'USD',
            payment_method_limits: [
                {
                    id: 'card',
                    min: '10.00',
                    max: '7500.00'
                },
                {
                    id: 'ach_bank_account',
                    min: '10.00',
                    max: '25000.00'
                }
            ]
        },
        {
            id: 'EUR',
            payment_method_limits: [
                {
                    id: 'card',
                    min: '10.00',
                    max: '7500.00'
                },
                {
                    id: 'ach_bank_account',
                    min: '10.00',
                    max: '25000.00'
                }
            ]
        }
    ]
};
// -- Helpers ------------------------------------------- //
const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getBlockchainApiUrl();
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    clientId: null,
    api: new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
        baseUrl,
        clientId: null
    }),
    supportedChains: {
        http: [],
        ws: []
    }
});
const BlockchainApiController = {
    state,
    async get (request) {
        const { st, sv } = BlockchainApiController.getSdkProperties();
        const projectId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId;
        const params = {
            ...request.params || {},
            st,
            sv,
            projectId
        };
        return state.api.get({
            ...request,
            params
        });
    },
    getSdkProperties () {
        const { sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        return {
            st: sdkType || 'unknown',
            sv: sdkVersion || 'unknown'
        };
    },
    async isNetworkSupported (networkId) {
        if (!networkId) {
            return false;
        }
        try {
            if (!state.supportedChains.http.length) {
                await BlockchainApiController.getSupportedNetworks();
            }
        } catch (e) {
            return false;
        }
        return state.supportedChains.http.includes(networkId);
    },
    async getSupportedNetworks () {
        try {
            const supportedChains = await BlockchainApiController.get({
                path: 'v1/supported-chains'
            });
            state.supportedChains = supportedChains;
            return supportedChains;
        } catch  {
            return state.supportedChains;
        }
    },
    async fetchIdentity ({ address }) {
        const identityCache = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getIdentityFromCacheForAddress(address);
        if (identityCache) {
            return identityCache;
        }
        const result = await BlockchainApiController.get({
            path: `/v1/identity/${address}`,
            params: {
                sender: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress) : undefined
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateIdentityCache({
            address,
            identity: result,
            timestamp: Date.now()
        });
        return result;
    },
    async fetchTransactions ({ account, cursor, signal, cache, chainId }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                data: [],
                next: undefined
            };
        }
        const transactionsCache = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getTransactionsCacheForAddress({
            address: account,
            chainId
        });
        if (transactionsCache) {
            return transactionsCache;
        }
        const result = await BlockchainApiController.get({
            path: `/v1/account/${account}/history`,
            params: {
                cursor,
                chainId
            },
            signal,
            cache
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateTransactionsCache({
            address: account,
            chainId,
            timestamp: Date.now(),
            transactions: result
        });
        return result;
    },
    async fetchSwapQuote ({ amount, userAddress, from, to, gasPrice }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                quotes: []
            };
        }
        return BlockchainApiController.get({
            path: `/v1/convert/quotes`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                amount,
                userAddress,
                from,
                to,
                gasPrice
            }
        });
    },
    async fetchSwapTokens ({ chainId }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                tokens: []
            };
        }
        return BlockchainApiController.get({
            path: `/v1/convert/tokens`,
            params: {
                chainId
            }
        });
    },
    async fetchTokenPrice ({ addresses }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                fungibles: []
            };
        }
        const tokenPriceCache = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getTokenPriceCacheForAddresses(addresses);
        if (tokenPriceCache) {
            return tokenPriceCache;
        }
        const result = await state.api.post({
            path: '/v1/fungible/price',
            body: {
                currency: 'usd',
                addresses,
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateTokenPriceCache({
            addresses,
            timestamp: Date.now(),
            tokenPrice: result
        });
        return result;
    },
    async fetchSwapAllowance ({ tokenAddress, userAddress }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                allowance: '0'
            };
        }
        return BlockchainApiController.get({
            path: `/v1/convert/allowance`,
            params: {
                tokenAddress,
                userAddress
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    async fetchGasPrice ({ chainId }) {
        const { st, sv } = BlockchainApiController.getSdkProperties();
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            throw new Error('Network not supported for Gas Price');
        }
        return BlockchainApiController.get({
            path: `/v1/convert/gas-price`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                chainId,
                st,
                sv
            }
        });
    },
    async generateSwapCalldata ({ amount, from, to, userAddress, disableEstimate }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            throw new Error('Network not supported for Swaps');
        }
        return state.api.post({
            path: '/v1/convert/build-transaction',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                amount,
                eip155: {
                    slippage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONVERT_SLIPPAGE_TOLERANCE
                },
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                from,
                to,
                userAddress,
                disableEstimate
            }
        });
    },
    async generateApproveCalldata ({ from, to, userAddress }) {
        const { st, sv } = BlockchainApiController.getSdkProperties();
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            throw new Error('Network not supported for Swaps');
        }
        return BlockchainApiController.get({
            path: `/v1/convert/build-approve`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                userAddress,
                from,
                to,
                st,
                sv
            }
        });
    },
    async getBalance (address, chainId, forceUpdate) {
        const { st, sv } = BlockchainApiController.getSdkProperties();
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Token Balance Unavailable');
            return {
                balances: []
            };
        }
        const caipAddress = `${chainId}:${address}`;
        const cachedBalance = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getBalanceCacheForCaipAddress(caipAddress);
        if (cachedBalance) {
            return cachedBalance;
        }
        const balance = await BlockchainApiController.get({
            path: `/v1/account/${address}/balance`,
            params: {
                currency: 'usd',
                chainId,
                forceUpdate,
                st,
                sv
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateBalanceCache({
            caipAddress,
            balance,
            timestamp: Date.now()
        });
        return balance;
    },
    async lookupEnsName (name) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                addresses: {},
                attributes: []
            };
        }
        return BlockchainApiController.get({
            path: `/v1/profile/account/${name}`,
            params: {
                apiVersion: '2'
            }
        });
    },
    async reverseLookupEnsName ({ address }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return [];
        }
        const sender = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData()?.address;
        return BlockchainApiController.get({
            path: `/v1/profile/reverse/${address}`,
            params: {
                sender,
                apiVersion: '2'
            }
        });
    },
    async getEnsNameSuggestions (name) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                suggestions: []
            };
        }
        return BlockchainApiController.get({
            path: `/v1/profile/suggestions/${name}`,
            params: {
                zone: 'reown.id'
            }
        });
    },
    async registerEnsName ({ coinType, address, message, signature }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                success: false
            };
        }
        return state.api.post({
            path: `/v1/profile/account`,
            body: {
                coin_type: coinType,
                address,
                message,
                signature
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    async generateOnRampURL ({ destinationWallets, partnerUserId, defaultNetwork, purchaseAmount, paymentAmount }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return '';
        }
        const response = await state.api.post({
            path: `/v1/generators/onrampurl`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
            },
            body: {
                destinationWallets,
                defaultNetwork,
                partnerUserId,
                defaultExperience: 'buy',
                presetCryptoAmount: purchaseAmount,
                presetFiatAmount: paymentAmount
            }
        });
        return response.url;
    },
    async getOnrampOptions () {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                paymentCurrencies: [],
                purchaseCurrencies: []
            };
        }
        try {
            const response = await BlockchainApiController.get({
                path: `/v1/onramp/options`
            });
            return response;
        } catch (e) {
            return DEFAULT_OPTIONS;
        }
    },
    async getOnrampQuote ({ purchaseCurrency, paymentCurrency, amount, network }) {
        try {
            const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
            if (!isSupported) {
                return null;
            }
            const response = await state.api.post({
                path: `/v1/onramp/quote`,
                params: {
                    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
                },
                body: {
                    purchaseCurrency,
                    paymentCurrency,
                    amount,
                    network
                }
            });
            return response;
        } catch (e) {
            // Mocking response as 1:1 until endpoint is ready
            return {
                networkFee: {
                    amount,
                    currency: paymentCurrency.id
                },
                paymentSubtotal: {
                    amount,
                    currency: paymentCurrency.id
                },
                paymentTotal: {
                    amount,
                    currency: paymentCurrency.id
                },
                purchaseAmount: {
                    amount,
                    currency: paymentCurrency.id
                },
                quoteId: 'mocked-quote-id'
            };
        }
    },
    async getSmartSessions (caipAddress) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return [];
        }
        return BlockchainApiController.get({
            path: `/v1/sessions/${caipAddress}`
        });
    },
    async revokeSmartSession (address, pci, signature) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                success: false
            };
        }
        return state.api.post({
            path: `/v1/sessions/${address}/revoke`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
            },
            body: {
                pci,
                signature
            }
        });
    },
    setClientId (clientId) {
        state.clientId = clientId;
        state.api = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
            baseUrl,
            clientId
        });
    }
}; //# sourceMappingURL=BlockchainApiController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/MobileWallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CUSTOM_DEEPLINK_WALLETS",
    ()=>CUSTOM_DEEPLINK_WALLETS,
    "MobileWalletUtil",
    ()=>MobileWalletUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
;
;
const CUSTOM_DEEPLINK_WALLETS = {
    PHANTOM: {
        id: 'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
        url: 'https://phantom.app'
    },
    SOLFLARE: {
        id: '1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79',
        url: 'https://solflare.com'
    },
    COINBASE: {
        id: 'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        url: 'https://go.cb-w.com'
    },
    /*
     * Got details from their npm package:
     * https://www.npmjs.com/package/@binance/w3w-utils?activeTab=code
     * https://developers.binance.com/docs/binance-w3w/evm-compatible-provider#getdeeplink
     */ BINANCE: {
        id: '2fafea35bb471d22889ccb49c08d99dd0a18a37982602c33f696a5723934ba25',
        appId: 'yFK5FCqYprrXDiVFbhyRx7',
        deeplink: 'bnc://app.binance.com/mp/app',
        url: 'https://app.binance.com/en/download'
    }
};
const MobileWalletUtil = {
    /**
     * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
     *
     * @param {string} id - The id of the wallet.
     * @param {ChainNamespace} namespace - The namespace of the chain.
     */ handleMobileDeeplinkRedirect (id, namespace) {
        /**
         * Universal Links requires explicit user interaction to open the wallet app.
         * Previously we've been calling this with the life-cycle methods in the Solana clients by listening the SELECT_WALLET event of EventController.
         * But this breaks the UL functionality for some wallets like Phantom.
         */ const href = window.location.href;
        const encodedHref = encodeURIComponent(href);
        if (id === CUSTOM_DEEPLINK_WALLETS.PHANTOM.id && !('phantom' in window)) {
            const protocol = href.startsWith('https') ? 'https' : 'http';
            const host = href.split('/')[2];
            const encodedRef = encodeURIComponent(`${protocol}://${host}`);
            window.location.href = `${CUSTOM_DEEPLINK_WALLETS.PHANTOM.url}/ul/browse/${encodedHref}?ref=${encodedRef}`;
        }
        if (id === CUSTOM_DEEPLINK_WALLETS.SOLFLARE.id && !('solflare' in window)) {
            window.location.href = `${CUSTOM_DEEPLINK_WALLETS.SOLFLARE.url}/ul/v1/browse/${encodedHref}?ref=${encodedHref}`;
        }
        if (namespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA) {
            if (id === CUSTOM_DEEPLINK_WALLETS.COINBASE.id && !('coinbaseSolana' in window)) {
                window.location.href = `${CUSTOM_DEEPLINK_WALLETS.COINBASE.url}/dapp?cb_url=${encodedHref}`;
            }
        }
        /*
         * Binance Web3 Wallet doesn't support WalletConnect for Bitcoin.
         * For now we use their deeplink to open the in-app browser instead.
         */ if (namespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.BITCOIN) {
            if (id === CUSTOM_DEEPLINK_WALLETS.BINANCE.id && !('binancew3w' in window)) {
                const activeCaipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
                const startPagePath = window.btoa('/pages/browser/index');
                const startPageQuery = window.btoa(`url=${encodedHref}&defaultChainId=${activeCaipNetwork?.id ?? 1}`);
                const deeplink = new URL(CUSTOM_DEEPLINK_WALLETS.BINANCE.deeplink);
                deeplink.searchParams.set('appId', CUSTOM_DEEPLINK_WALLETS.BINANCE.appId);
                deeplink.searchParams.set('startPagePath', startPagePath);
                deeplink.searchParams.set('startPageQuery', startPageQuery);
                const universalLink = new URL(CUSTOM_DEEPLINK_WALLETS.BINANCE.url);
                universalLink.searchParams.set('_dp', window.btoa(deeplink.toString()));
                window.location.href = universalLink.toString();
            }
        }
    }
}; //# sourceMappingURL=MobileWallet.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TelemetryController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TelemetryController",
    ()=>TelemetryController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
// -- Constants ----------------------------------------- //
const DEFAULT_STATE = Object.freeze({
    enabled: true,
    events: []
});
const api = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
    baseUrl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAnalyticsUrl(),
    clientId: null
});
// Rate limiting constants
const MAX_ERRORS_PER_MINUTE = 5;
const ONE_MINUTE_MS = 60 * 1000;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    ...DEFAULT_STATE
});
const TelemetryController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    async sendError (error, category) {
        if (!state.enabled) {
            return;
        }
        // Check rate limiting using events array
        const now = Date.now();
        const recentErrors = state.events.filter((event)=>{
            const eventTime = new Date(event.properties.timestamp || '').getTime();
            return now - eventTime < ONE_MINUTE_MS;
        });
        if (recentErrors.length >= MAX_ERRORS_PER_MINUTE) {
            // Exit silently
            return;
        }
        const errorEvent = {
            type: 'error',
            event: category,
            properties: {
                errorType: error.name,
                errorMessage: error.message,
                stackTrace: error.stack,
                timestamp: new Date().toISOString()
            }
        };
        state.events.push(errorEvent);
        try {
            if (typeof window === 'undefined') {
                return;
            }
            const { projectId, sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
            await api.post({
                path: '/e',
                params: {
                    projectId,
                    st: sdkType,
                    sv: sdkVersion || 'html-wagmi-4.2.2'
                },
                body: {
                    eventId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getUUID(),
                    url: window.location.href,
                    domain: window.location.hostname,
                    timestamp: new Date().toISOString(),
                    props: {
                        type: 'error',
                        event: category,
                        errorType: error.name,
                        errorMessage: error.message,
                        stackTrace: error.stack
                    }
                }
            });
        } catch  {
        // Do nothing
        }
    },
    enable () {
        state.enabled = true;
    },
    disable () {
        state.enabled = false;
    },
    clearEvents () {
        state.events = [];
    }
}; //# sourceMappingURL=TelemetryController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppKitError",
    ()=>AppKitError,
    "withErrorBoundary",
    ()=>withErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TelemetryController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TelemetryController.js [app-client] (ecmascript)");
;
class AppKitError extends Error {
    constructor(message, category, originalError){
        super(message);
        this.originalName = 'AppKitError';
        this.name = 'AppKitError';
        this.category = category;
        this.originalError = originalError;
        if (originalError && originalError instanceof Error) {
            this.originalName = originalError.name;
        }
        // Ensure `this instanceof AppKitError` is true, important for custom errors.
        Object.setPrototypeOf(this, AppKitError.prototype);
        let isStackConstructedFromOriginal = false;
        if (originalError instanceof Error && typeof originalError.stack === 'string' && originalError.stack) {
            const originalErrorStack = originalError.stack;
            /**
             * Most error stacks start with "ErrorName: ErrorMessage\n...frames..."
             * We want to take the "...frames..." part.
             */ const firstNewlineIndex = originalErrorStack.indexOf('\n');
            if (firstNewlineIndex > -1) {
                const originalFrames = originalErrorStack.substring(firstNewlineIndex + 1);
                this.stack = `${this.name}: ${this.message}\n${originalFrames}`;
                isStackConstructedFromOriginal = true;
            }
        }
        if (!isStackConstructedFromOriginal) {
            /**
             * If stack was not (or could not be) constructed from originalError,
             * generate a standard stack trace for this AppKitError instance.
             * This will point to where `new AppKitError()` was called.
             */ if (Error.captureStackTrace) {
                Error.captureStackTrace(this, AppKitError);
            } else if (!this.stack) {
                /**
                 * Fallback for environments without Error.captureStackTrace.
                 * `super(message)` might have set a stack.
                 * If `this.stack` is still undefined/empty, provide a minimal one.
                 * Node.js and modern browsers typically set `this.stack` from `super(message)`.
                 */ this.stack = `${this.name}: ${this.message}`;
            }
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(err, defaultCategory) {
    let errMessage = '';
    try {
        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === 'string') {
            errMessage = err;
        } else if (typeof err === 'object' && err !== null) {
            if (Object.keys(err).length === 0) {
                errMessage = 'Unknown error';
            } else {
                errMessage = err?.message || JSON.stringify(err);
            }
        } else {
            errMessage = String(err);
        }
    } catch (_error) {
        errMessage = 'Unknown error';
        // eslint-disable-next-line no-console
        console.error('Error parsing error message', _error);
    }
    const error = err instanceof AppKitError ? err : new AppKitError(errMessage, defaultCategory, err);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TelemetryController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TelemetryController"].sendError(error, error.category);
    throw error;
}
function withErrorBoundary(controller, defaultCategory = 'INTERNAL_SDK_ERROR') {
    const newController = {};
    Object.keys(controller).forEach((key)=>{
        const original = controller[key];
        if (typeof original === 'function') {
            let wrapped = original;
            if (original.constructor.name === 'AsyncFunction') {
                wrapped = async (...args)=>{
                    try {
                        return await original(...args);
                    } catch (err) {
                        return errorHandler(err, defaultCategory);
                    }
                };
            } else {
                wrapped = (...args)=>{
                    try {
                        return original(...args);
                    } catch (err) {
                        return errorHandler(err, defaultCategory);
                    }
                };
            }
            newController[key] = wrapped;
        } else {
            newController[key] = original;
        }
    });
    return newController;
} //# sourceMappingURL=withErrorBoundary.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetController",
    ()=>AssetController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    walletImages: {},
    networkImages: {},
    chainImages: {},
    connectorImages: {},
    tokenImages: {},
    currencyImages: {}
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeNetworkImages (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state.networkImages, ()=>callback(state.networkImages));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    setWalletImage (key, value) {
        state.walletImages[key] = value;
    },
    setNetworkImage (key, value) {
        state.networkImages[key] = value;
    },
    setChainImage (key, value) {
        state.chainImages[key] = value;
    },
    setConnectorImage (key, value) {
        state.connectorImages = {
            ...state.connectorImages,
            [key]: value
        };
    },
    setTokenImage (key, value) {
        state.tokenImages[key] = value;
    },
    setCurrencyImage (key, value) {
        state.currencyImages[key] = value;
    }
};
const AssetController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=AssetController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetUtil",
    ()=>AssetUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
;
;
;
const namespaceImageIds = {
    // Ethereum
    eip155: 'ba0ba0cd-17c6-4806-ad93-f9d174f17900',
    // Solana
    solana: 'a1b58899-f671-4276-6a5e-56ca5bd59700',
    // Polkadot
    polkadot: '',
    // Bitcoin
    bip122: '0b4838db-0161-4ffe-022d-532bf03dba00',
    // Cosmos
    cosmos: '',
    // Sui
    sui: '',
    // Stacks
    stacks: ''
};
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    networkImagePromises: {}
});
const AssetUtil = {
    async fetchWalletImage (imageId) {
        if (!imageId) {
            return undefined;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"]._fetchWalletImage(imageId);
        return this.getWalletImageById(imageId);
    },
    async fetchNetworkImage (imageId) {
        if (!imageId) {
            return undefined;
        }
        const existingImage = this.getNetworkImageById(imageId);
        // Check if the image already exists
        if (existingImage) {
            return existingImage;
        }
        // Check if the promise is already created
        if (!state.networkImagePromises[imageId]) {
            state.networkImagePromises[imageId] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"]._fetchNetworkImage(imageId);
        }
        await state.networkImagePromises[imageId];
        return this.getNetworkImageById(imageId);
    },
    getWalletImageById (imageId) {
        if (!imageId) {
            return undefined;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.walletImages[imageId];
    },
    getWalletImage (wallet) {
        if (wallet?.image_url) {
            return wallet?.image_url;
        }
        if (wallet?.image_id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.walletImages[wallet.image_id];
        }
        return undefined;
    },
    getNetworkImage (network) {
        if (network?.assets?.imageUrl) {
            return network?.assets?.imageUrl;
        }
        if (network?.assets?.imageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.networkImages[network.assets.imageId];
        }
        return undefined;
    },
    getNetworkImageById (imageId) {
        if (!imageId) {
            return undefined;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.networkImages[imageId];
    },
    getConnectorImage (connector) {
        if (connector?.imageUrl) {
            return connector.imageUrl;
        }
        if (connector?.info?.icon) {
            return connector.info.icon;
        }
        if (connector?.imageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.connectorImages[connector.imageId];
        }
        return undefined;
    },
    getChainImage (chain) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.networkImages[namespaceImageIds[chain]];
    },
    getTokenImage (symbol) {
        if (!symbol) {
            return undefined;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.tokenImages[symbol];
    }
}; //# sourceMappingURL=AssetUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventsController",
    ()=>EventsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
// -- Helpers ------------------------------------------- //
const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAnalyticsUrl();
const api = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
    baseUrl,
    clientId: null
});
const excluded = [
    'MODAL_CREATED'
];
// SendBeacon payload limit is 64KB, using 45KB for a safe margin, also 45KB is approx ~200 events which is plenty
const MAX_PENDING_EVENTS_KB = 45;
// Flush events every 10 seconds
const FLUSH_EVENTS_INTERVAL_MS = 1000 * 10;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    timestamp: Date.now(),
    lastFlush: Date.now(),
    reportedErrors: {},
    data: {
        type: 'track',
        event: 'MODAL_CREATED'
    },
    pendingEvents: [],
    subscribedToVisibilityChange: false,
    walletImpressions: []
});
const EventsController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    getSdkProperties () {
        const { projectId, sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        return {
            projectId,
            st: sdkType,
            sv: sdkVersion || 'html-wagmi-4.2.2'
        };
    },
    shouldFlushEvents () {
        const isOverMaxSize = JSON.stringify(state.pendingEvents).length / 1024 > MAX_PENDING_EVENTS_KB;
        const isExpired = state.lastFlush + FLUSH_EVENTS_INTERVAL_MS < Date.now();
        return isOverMaxSize || isExpired;
    },
    _setPendingEvent (payload) {
        try {
            let address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData()?.address;
            if ('address' in payload.data && payload.data.address) {
                address = payload.data.address;
            }
            if (excluded.includes(payload.data.event) || typeof window === 'undefined') {
                return;
            }
            const caipNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork()?.caipNetworkId;
            this.state.pendingEvents.push({
                eventId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getUUID(),
                url: window.location.href,
                domain: window.location.hostname,
                timestamp: payload.timestamp,
                props: {
                    ...payload.data,
                    address,
                    properties: {
                        ...'properties' in payload.data ? payload.data.properties : {},
                        caipNetworkId
                    }
                }
            });
            state.reportedErrors['FORBIDDEN'] = false;
            const shouldFlush = EventsController.shouldFlushEvents();
            // If the pending events are too large, submit them as sendBeacon has a limit of 64KB
            if (shouldFlush) {
                EventsController._submitPendingEvents();
            }
        } catch (err) {
            console.warn('_setPendingEvent', err);
        }
    },
    sendEvent (data) {
        state.timestamp = Date.now();
        state.data = data;
        const MANDATORY_EVENTS = [
            'INITIALIZE',
            'CONNECT_SUCCESS',
            'SOCIAL_LOGIN_SUCCESS'
        ];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.analytics || MANDATORY_EVENTS.includes(data.event)) {
            EventsController._setPendingEvent(state);
        }
        // Calling this function here to make sure document is ready and defined before subscribing to visibility change
        this.subscribeToFlushTriggers();
    },
    /**
     * Adds a wallet impression item to the aggregated list. These are flushed as a single
     * WALLET_IMPRESSION batch in _submitPendingEvents.
     */ sendWalletImpressionEvent (item) {
        state.walletImpressions.push(item);
    },
    _transformPendingEventsForBatch (events) {
        try {
            return events.filter((evt)=>{
                const eventName = evt.props.event;
                return eventName !== 'WALLET_IMPRESSION';
            });
        } catch  {
            return events;
        }
    },
    _submitPendingEvents () {
        state.lastFlush = Date.now();
        if (state.pendingEvents.length === 0 && state.walletImpressions.length === 0) {
            return;
        }
        try {
            const batch = EventsController._transformPendingEventsForBatch(state.pendingEvents);
            if (state.walletImpressions.length) {
                batch.push({
                    eventId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getUUID(),
                    url: window.location.href,
                    domain: window.location.hostname,
                    timestamp: Date.now(),
                    props: {
                        type: 'track',
                        event: 'WALLET_IMPRESSION',
                        items: [
                            ...state.walletImpressions
                        ]
                    }
                });
            }
            api.sendBeacon({
                path: '/batch',
                params: EventsController.getSdkProperties(),
                body: batch
            });
            state.reportedErrors['FORBIDDEN'] = false;
            state.pendingEvents = [];
            state.walletImpressions = [];
        } catch (err) {
            state.reportedErrors['FORBIDDEN'] = true;
        }
    },
    subscribeToFlushTriggers () {
        if (state.subscribedToVisibilityChange) {
            return;
        }
        if (typeof document === 'undefined') {
            return;
        }
        state.subscribedToVisibilityChange = true;
        // Submit pending events when the document is hidden
        document?.addEventListener?.('visibilitychange', ()=>{
            if (document.visibilityState === 'hidden') {
                EventsController._submitPendingEvents();
            }
        });
        // Submit pending events when the document is frozen (triggered on mobile)
        document?.addEventListener?.('freeze', ()=>{
            EventsController._submitPendingEvents();
        });
        // Submit pending events when the window is hidden
        window?.addEventListener?.('pagehide', ()=>{
            EventsController._submitPendingEvents();
        });
        // Submit pending events every 10 seconds
        setInterval(()=>{
            EventsController._submitPendingEvents();
        }, FLUSH_EVENTS_INTERVAL_MS);
    }
}; //# sourceMappingURL=EventsController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiController",
    ()=>ApiController,
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/MobileWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- Helpers ------------------------------------------- //
const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getApiUrl();
const api = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
    baseUrl,
    clientId: null
});
const entries = 40;
const recommendedEntries = 4;
const imageCountToFetch = 20;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    promises: {},
    page: 1,
    count: 0,
    featured: [],
    allFeatured: [],
    recommended: [],
    allRecommended: [],
    wallets: [],
    filteredWallets: [],
    search: [],
    isAnalyticsEnabled: false,
    excludedWallets: [],
    isFetchingRecommendedWallets: false,
    explorerWallets: [],
    explorerFilteredWallets: []
});
const ApiController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    _getSdkProperties () {
        const { projectId, sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        return {
            projectId,
            st: sdkType || 'appkit',
            sv: sdkVersion || 'html-wagmi-4.2.2'
        };
    },
    _filterOutExtensions (wallets) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.isUniversalProvider) {
            return wallets.filter((w)=>Boolean(w.mobile_link || w.desktop_link || w.webapp_link));
        }
        return wallets;
    },
    async _fetchWalletImage (imageId) {
        const imageUrl = `${api.baseUrl}/getWalletImage/${imageId}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setWalletImage(imageId, URL.createObjectURL(blob));
    },
    async _fetchNetworkImage (imageId) {
        const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setNetworkImage(imageId, URL.createObjectURL(blob));
    },
    async _fetchConnectorImage (imageId) {
        const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setConnectorImage(imageId, URL.createObjectURL(blob));
    },
    async _fetchCurrencyImage (countryCode) {
        const imageUrl = `${api.baseUrl}/public/getCurrencyImage/${countryCode}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setCurrencyImage(countryCode, URL.createObjectURL(blob));
    },
    async _fetchTokenImage (symbol) {
        const imageUrl = `${api.baseUrl}/public/getTokenImage/${symbol}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setTokenImage(symbol, URL.createObjectURL(blob));
    },
    _filterWalletsByPlatform (wallets) {
        const walletsLength = wallets.length;
        const filteredWallets = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile() ? wallets?.filter((w)=>{
            if (w.mobile_link || w.webapp_link) {
                return true;
            }
            const customDeeplinkWalletIds = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CUSTOM_DEEPLINK_WALLETS"]).map((wallet)=>wallet.id);
            return customDeeplinkWalletIds.includes(w.id);
        }) : wallets;
        const mobileFilteredOutWalletsLength = walletsLength - filteredWallets.length;
        return {
            filteredWallets,
            mobileFilteredOutWalletsLength
        };
    },
    async fetchProjectConfig () {
        const response = await api.get({
            path: '/appkit/v1/config',
            params: ApiController._getSdkProperties()
        });
        return response.features;
    },
    async fetchAllowedOrigins () {
        try {
            const { allowedOrigins } = await api.get({
                path: '/projects/v1/origins',
                params: ApiController._getSdkProperties()
            });
            return allowedOrigins;
        } catch (error) {
            if (error instanceof Error && error.cause instanceof Response) {
                const status = error.cause.status;
                if (status === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].HTTP_STATUS_CODES.TOO_MANY_REQUESTS) {
                    throw new Error('RATE_LIMITED', {
                        cause: error
                    });
                }
                if (status >= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].HTTP_STATUS_CODES.SERVER_ERROR && status < 600) {
                    throw new Error('SERVER_ERROR', {
                        cause: error
                    });
                }
                return [];
            }
            return [];
        }
    },
    async fetchNetworkImages () {
        const requestedCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        const ids = requestedCaipNetworks?.map(({ assets })=>assets?.imageId).filter(Boolean).filter((imageId)=>!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getNetworkImageById(imageId));
        if (ids) {
            await Promise.allSettled(ids.map((id)=>ApiController._fetchNetworkImage(id)));
        }
    },
    async fetchConnectorImages () {
        const { connectors } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state;
        const ids = connectors.map(({ imageId })=>imageId).filter(Boolean);
        await Promise.allSettled(ids.map((id)=>ApiController._fetchConnectorImage(id)));
    },
    async fetchCurrencyImages (currencies = []) {
        await Promise.allSettled(currencies.map((currency)=>ApiController._fetchCurrencyImage(currency)));
    },
    async fetchTokenImages (tokens = []) {
        await Promise.allSettled(tokens.map((token)=>ApiController._fetchTokenImage(token)));
    },
    async fetchWallets (params) {
        const exclude = params.exclude ?? [];
        const sdkProperties = ApiController._getSdkProperties();
        if (sdkProperties.sv.startsWith('html-core-')) {
            exclude.push(...Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CUSTOM_DEEPLINK_WALLETS"]).map((w)=>w.id));
        }
        const wallets = await api.get({
            path: '/getWallets',
            params: {
                ...ApiController._getSdkProperties(),
                ...params,
                page: String(params.page),
                entries: String(params.entries),
                include: params.include?.join(','),
                exclude: exclude.join(',')
            }
        });
        const { filteredWallets, mobileFilteredOutWalletsLength } = ApiController._filterWalletsByPlatform(wallets?.data);
        return {
            data: filteredWallets || [],
            // Keep original count for display on main page
            count: wallets?.count,
            mobileFilteredOutWalletsLength
        };
    },
    async prefetchWalletRanks () {
        const connectors = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.connectors;
        if (!connectors?.length) {
            return;
        }
        const params = {
            page: 1,
            entries: 20,
            badge: 'certified'
        };
        params.names = connectors.map((c)=>c.name).join(',');
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
            const rdnsCandidates = [
                ...connectors.flatMap((c)=>c.connectors?.map((sc)=>sc.info?.rdns) || []),
                ...connectors.map((c)=>c.info?.rdns)
            ].filter((val)=>typeof val === 'string' && val.length > 0);
            if (rdnsCandidates.length) {
                params.rdns = rdnsCandidates.join(',');
            }
        }
        const { data } = await ApiController.fetchWallets(params);
        state.explorerWallets = data;
        const caipNetworkIds = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworkIds().join(',');
        state.explorerFilteredWallets = data.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
    },
    async fetchFeaturedWallets () {
        const { featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        if (featuredWalletIds?.length) {
            const params = {
                ...ApiController._getSdkProperties(),
                page: 1,
                entries: featuredWalletIds?.length ?? recommendedEntries,
                include: featuredWalletIds
            };
            const { data } = await ApiController.fetchWallets(params);
            const sortedData = [
                ...data
            ].sort((a, b)=>featuredWalletIds.indexOf(a.id) - featuredWalletIds.indexOf(b.id));
            const images = sortedData.map((d)=>d.image_id).filter(Boolean);
            await Promise.allSettled(images.map((id)=>ApiController._fetchWalletImage(id)));
            state.featured = sortedData;
            state.allFeatured = sortedData;
        }
    },
    async fetchRecommendedWallets () {
        try {
            state.isFetchingRecommendedWallets = true;
            const { includeWalletIds, excludeWalletIds, featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
            const exclude = [
                ...excludeWalletIds ?? [],
                ...featuredWalletIds ?? []
            ].filter(Boolean);
            const chains = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworkIds().join(',');
            const params = {
                page: 1,
                entries: recommendedEntries,
                include: includeWalletIds,
                exclude,
                chains
            };
            const { data, count } = await ApiController.fetchWallets(params);
            const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
            const recommendedImages = data.map((d)=>d.image_id).filter(Boolean);
            const recentImages = recent.map((r)=>r.image_id).filter(Boolean);
            await Promise.allSettled([
                ...recommendedImages,
                ...recentImages
            ].map((id)=>ApiController._fetchWalletImage(id)));
            state.recommended = data;
            state.allRecommended = data;
            state.count = count ?? 0;
        } catch  {
        // Catch silently
        } finally{
            state.isFetchingRecommendedWallets = false;
        }
    },
    async fetchWalletsByPage ({ page }) {
        const { includeWalletIds, excludeWalletIds, featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const chains = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworkIds().join(',');
        const exclude = [
            ...state.recommended.map(({ id })=>id),
            ...excludeWalletIds ?? [],
            ...featuredWalletIds ?? []
        ].filter(Boolean);
        const params = {
            page,
            entries,
            include: includeWalletIds,
            exclude,
            chains
        };
        const { data, count, mobileFilteredOutWalletsLength } = await ApiController.fetchWallets(params);
        state.mobileFilteredOutWalletsLength = mobileFilteredOutWalletsLength + (state.mobileFilteredOutWalletsLength ?? 0);
        const images = data.slice(0, imageCountToFetch).map((w)=>w.image_id).filter(Boolean);
        await Promise.allSettled(images.map((id)=>ApiController._fetchWalletImage(id)));
        state.wallets = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].uniqueBy([
            ...state.wallets,
            ...ApiController._filterOutExtensions(data)
        ], 'id').filter((w)=>w.chains?.some((chain)=>chains.includes(chain)));
        state.count = count > state.count ? count : state.count;
        state.page = page;
    },
    async initializeExcludedWallets ({ ids }) {
        const params = {
            page: 1,
            entries: ids.length,
            include: ids
        };
        const { data } = await ApiController.fetchWallets(params);
        if (data) {
            data.forEach((wallet)=>{
                state.excludedWallets.push({
                    rdns: wallet.rdns,
                    name: wallet.name
                });
            });
        }
    },
    async searchWallet ({ search, badge }) {
        const { includeWalletIds, excludeWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const chains = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworkIds().join(',');
        state.search = [];
        const params = {
            page: 1,
            entries: 100,
            search: search?.trim(),
            badge_type: badge,
            include: includeWalletIds,
            exclude: excludeWalletIds,
            chains
        };
        const { data } = await ApiController.fetchWallets(params);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'SEARCH_WALLET',
            properties: {
                badge: badge ?? '',
                search: search ?? ''
            }
        });
        const images = data.map((w)=>w.image_id).filter(Boolean);
        await Promise.allSettled([
            ...images.map((id)=>ApiController._fetchWalletImage(id)),
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].wait(300)
        ]);
        state.search = ApiController._filterOutExtensions(data);
    },
    initPromise (key, fetchFn) {
        const existingPromise = state.promises[key];
        if (existingPromise) {
            return existingPromise;
        }
        return state.promises[key] = fetchFn();
    },
    prefetch ({ fetchConnectorImages = true, fetchFeaturedWallets = true, fetchRecommendedWallets = true, fetchNetworkImages = true, fetchWalletRanks = true } = {}) {
        const promises = [
            fetchConnectorImages && ApiController.initPromise('connectorImages', ApiController.fetchConnectorImages),
            fetchFeaturedWallets && ApiController.initPromise('featuredWallets', ApiController.fetchFeaturedWallets),
            fetchRecommendedWallets && ApiController.initPromise('recommendedWallets', ApiController.fetchRecommendedWallets),
            fetchNetworkImages && ApiController.initPromise('networkImages', ApiController.fetchNetworkImages),
            fetchWalletRanks && ApiController.initPromise('walletRanks', ApiController.prefetchWalletRanks)
        ].filter(Boolean);
        return Promise.allSettled(promises);
    },
    prefetchAnalyticsConfig () {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.analytics) {
            ApiController.fetchAnalyticsConfig();
        }
    },
    async fetchAnalyticsConfig () {
        try {
            const { isAnalyticsEnabled } = await api.get({
                path: '/getAnalyticsConfig',
                params: ApiController._getSdkProperties()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures({
                analytics: isAnalyticsEnabled
            });
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures({
                analytics: false
            });
        }
    },
    filterByNamespaces (namespaces) {
        if (!namespaces?.length) {
            state.featured = state.allFeatured;
            state.recommended = state.allRecommended;
            return;
        }
        const caipNetworkIds = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworkIds().join(',');
        state.featured = state.allFeatured.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
        state.recommended = state.allRecommended.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
        state.filteredWallets = state.wallets.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
    },
    clearFilterByNamespaces () {
        state.filteredWallets = [];
    },
    setFilterByNamespace (namespace) {
        if (!namespace) {
            state.featured = state.allFeatured;
            state.recommended = state.allRecommended;
            return;
        }
        const caipNetworkIds = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworkIds().join(',');
        state.featured = state.allFeatured.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
        state.recommended = state.allRecommended.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
        state.filteredWallets = state.wallets.filter((wallet)=>wallet.chains?.some((chain)=>caipNetworkIds.includes(chain)));
    }
}; //# sourceMappingURL=ApiController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NetworkUtil",
    ()=>NetworkUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
;
;
const NetworkUtil = {
    /**
     * Function to handle the network switch.
     * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
     * @param args.network - The network to switch to.
     * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
     * @returns void
     */ onSwitchNetwork ({ network, ignoreSwitchConfirmation = false }) {
        const currentNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        const currentNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const routerData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.data;
        const isSameNetwork = network.id === currentNetwork?.id;
        if (isSameNetwork) {
            return;
        }
        const isCurrentNamespaceConnected = Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(currentNamespace)?.address);
        const isNextNamespaceConnected = Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(network.chainNamespace)?.address);
        const isDifferentNamespace = network.chainNamespace !== currentNamespace;
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(currentNamespace);
        /**
         * If the network is supported by the auth connector, we don't need to show switch active chain view.
         * But there are some cases like switching from Ethereum to Bitcoin where Bitcoin is not supported by the auth connector and users should connect with another connector.
         */ const isConnectedWithAuth = connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
        const isSupportedForAuthConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS.find((c)=>c === network.chainNamespace);
        /**
         * 1. If the ignoreSwitchConfirmation is set to true, we should switch to the network,
         * 2. If user connected with auth connector and the next network is supported by the auth connector,
         * we should switch to the network without confirmation screen.
         */ if (ignoreSwitchConfirmation || isConnectedWithAuth && isSupportedForAuthConnector) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('SwitchNetwork', {
                ...routerData,
                network
            });
        } else if (/**
         * If user switching to a different namespace and next namespace is not connected, we need to show switch active chain view for confirmation first.
         */ isCurrentNamespaceConnected && isDifferentNamespace && !isNextNamespaceConnected) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('SwitchActiveChain', {
                switchToChain: network.chainNamespace,
                navigateTo: 'Connect',
                navigateWithReplace: true,
                network
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('SwitchNetwork', {
                ...routerData,
                network
            });
        }
    }
}; //# sourceMappingURL=NetworkUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PublicStateController",
    ()=>PublicStateController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    loading: false,
    open: false,
    selectedNetworkId: undefined,
    activeChain: undefined,
    initialized: false
});
const PublicStateController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeOpen (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, 'open', callback);
    },
    set (newState) {
        Object.assign(state, {
            ...state,
            ...newState
        });
    }
}; //# sourceMappingURL=PublicStateController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalController",
    ()=>ModalController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    loading: false,
    loadingNamespaceMap: new Map(),
    open: false,
    shake: false,
    namespace: undefined
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    async open (options) {
        const namespace = options?.namespace;
        const currentNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const isSwitchingNamespace = namespace && namespace !== currentNamespace;
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(options?.namespace)?.caipAddress;
        const hasNoAdapters = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.noAdapters;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].state.wcBasic) {
            // No need to add an await here if we are use basic
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].prefetch({
                fetchNetworkImages: false,
                fetchConnectorImages: false,
                fetchWalletRanks: false
            });
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].prefetch();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setFilterByNamespace(options?.namespace);
        ModalController.setLoading(true, namespace);
        if (namespace && isSwitchingNamespace) {
            const namespaceNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getNetworkData(namespace)?.caipNetwork || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworks(namespace)[0];
            if (namespaceNetwork) {
                if (hasNoAdapters) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].switchActiveNetwork(namespaceNetwork);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('ConnectingWalletConnectBasic');
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].onSwitchNetwork({
                        network: namespaceNetwork,
                        ignoreSwitchConfirmation: true
                    });
                }
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.manualWCControl || hasNoAdapters && !caipAddress) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('AllWallets');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('ConnectingWalletConnectBasic');
            }
        } else if (options?.view) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset(options.view, options.data);
        } else if (caipAddress) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Account');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Connect');
        }
        state.open = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            open: true
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'MODAL_OPEN',
            properties: {
                connected: Boolean(caipAddress)
            }
        });
    },
    close () {
        const isEmbeddedEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded;
        const isConnected = Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress);
        // Only send the event if the modal is open and is about to be closed
        if (state.open) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'MODAL_CLOSE',
                properties: {
                    connected: isConnected
                }
            });
        }
        state.open = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Connect');
        ModalController.clearLoading();
        if (isEmbeddedEnabled) {
            if (isConnected) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('Account');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('Connect');
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
                open: false
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetUri();
    },
    setLoading (loading, namespace) {
        if (namespace) {
            state.loadingNamespaceMap.set(namespace, loading);
        }
        state.loading = loading;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            loading
        });
    },
    clearLoading () {
        state.loadingNamespaceMap.clear();
        state.loading = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            loading: false
        });
    },
    shake () {
        if (state.shake) {
            return;
        }
        state.shake = true;
        setTimeout(()=>{
            state.shake = false;
        }, 500);
    }
};
const ModalController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=ModalController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouterController",
    ()=>RouterController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    view: 'Connect',
    history: [
        'Connect'
    ],
    transactionStack: []
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    pushTransactionStack (action) {
        state.transactionStack.push(action);
    },
    popTransactionStack (status) {
        const action = state.transactionStack.pop();
        if (!action) {
            return;
        }
        const { onSuccess, onError, onCancel } = action;
        switch(status){
            case 'success':
                onSuccess?.();
                break;
            case 'error':
                onError?.();
                RouterController.goBack();
                break;
            case 'cancel':
                onCancel?.();
                RouterController.goBack();
                break;
            default:
        }
    },
    push (view, data) {
        if (view !== state.view) {
            state.view = view;
            state.history.push(view);
            state.data = data;
        }
    },
    reset (view, data) {
        state.view = view;
        state.history = [
            view
        ];
        state.data = data;
    },
    replace (view, data) {
        const lastView = state.history.at(-1);
        const isSameView = lastView === view;
        if (!isSameView) {
            state.view = view;
            state.history[state.history.length - 1] = view;
            state.data = data;
        }
    },
    goBack () {
        const isConnected = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        const isFarcasterView = RouterController.state.view === 'ConnectingFarcaster';
        const shouldReload = !isConnected && isFarcasterView;
        if (state.history.length > 1) {
            state.history.pop();
            const [last] = state.history.slice(-1);
            if (last) {
                const isConnectView = last === 'Connect';
                if (isConnected && isConnectView) {
                    state.view = 'Account';
                } else {
                    state.view = last;
                }
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
        if (state.data?.wallet) {
            state.data.wallet = undefined;
        }
        if (state.data?.redirectView) {
            state.data.redirectView = undefined;
        }
        // Reloading the iframe contentwindow and doing the view animation in the modal causes a small freeze in the transition. Doing these separately fixes that.
        setTimeout(()=>{
            if (shouldReload) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('farcasterUrl', undefined, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
                authConnector?.provider?.reload();
                const optionsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state);
                authConnector?.provider?.syncDappData?.({
                    metadata: optionsState.metadata,
                    sdkVersion: optionsState.sdkVersion,
                    projectId: optionsState.projectId,
                    sdkType: optionsState.sdkType
                });
            }
        }, 100);
    },
    goBackToIndex (historyIndex) {
        if (state.history.length > 1) {
            state.history = state.history.slice(0, historyIndex + 1);
            const [last] = state.history.slice(-1);
            if (last) {
                state.view = last;
            }
        }
    },
    goBackOrCloseModal () {
        if (RouterController.state.history.length > 1) {
            RouterController.goBack();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
    }
};
const RouterController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=RouterController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeController",
    ()=>ThemeController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    themeMode: 'dark',
    themeVariables: {},
    w3mThemeVariables: undefined
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    setThemeMode (themeMode) {
        state.themeMode = themeMode;
        try {
            const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
            if (authConnector) {
                const themeVariables = controller.getSnapshot().themeVariables;
                authConnector.provider.syncTheme({
                    themeMode,
                    themeVariables,
                    w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(themeVariables, themeMode)
                });
            }
        } catch  {
            // eslint-disable-next-line no-console
            console.info('Unable to sync theme to auth connector');
        }
    },
    setThemeVariables (themeVariables) {
        state.themeVariables = {
            ...state.themeVariables,
            ...themeVariables
        };
        try {
            const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
            if (authConnector) {
                const themeVariablesSnapshot = controller.getSnapshot().themeVariables;
                authConnector.provider.syncTheme({
                    themeVariables: themeVariablesSnapshot,
                    w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(state.themeVariables, state.themeMode)
                });
            }
        } catch  {
            // eslint-disable-next-line no-console
            console.info('Unable to sync theme to auth connector');
        }
    },
    getSnapshot () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(state);
    }
};
const ThemeController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=ThemeController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectorController",
    ()=>ConnectorController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/MobileWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
const defaultActiveConnectors = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_NAMESPACES"].map((namespace)=>[
        namespace,
        undefined
    ]));
const defaultFilterByNamespaceMap = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_NAMESPACES"].map((namespace)=>[
        namespace,
        true
    ]));
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    allConnectors: [],
    connectors: [],
    activeConnector: undefined,
    filterByNamespace: undefined,
    activeConnectorIds: defaultActiveConnectors,
    filterByNamespaceMap: defaultFilterByNamespaceMap
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>{
            callback(state);
        });
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    initialize (namespaces) {
        namespaces.forEach((namespace)=>{
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(namespace);
            if (connectorId) {
                ConnectorController.setConnectorId(connectorId, namespace);
            }
        });
    },
    setActiveConnector (connector) {
        if (connector) {
            state.activeConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(connector);
        }
    },
    setConnectors (connectors) {
        const newConnectors = connectors.filter((newConnector)=>!state.allConnectors.some((existingConnector)=>existingConnector.id === newConnector.id && ConnectorController.getConnectorName(existingConnector.name) === ConnectorController.getConnectorName(newConnector.name) && existingConnector.chain === newConnector.chain));
        /**
         * We are reassigning the state of the proxy to a new array of new objects, ConnectorController can cause issues. So it is better to use ref in ConnectorController case.
         * Check more about proxy on https://valtio.dev/docs/api/basic/proxy#Gotchas
         * Check more about ref on https://valtio.dev/docs/api/basic/ref
         */ newConnectors.forEach((connector)=>{
            if (connector.type !== 'MULTI_CHAIN') {
                state.allConnectors.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(connector));
            }
        });
        const enabledNamespaces = ConnectorController.getEnabledNamespaces();
        const connectorsFilteredByNamespaces = ConnectorController.getEnabledConnectors(enabledNamespaces);
        state.connectors = ConnectorController.mergeMultiChainConnectors(connectorsFilteredByNamespaces);
    },
    filterByNamespaces (enabledNamespaces) {
        Object.keys(state.filterByNamespaceMap).forEach((namespace)=>{
            state.filterByNamespaceMap[namespace] = false;
        });
        enabledNamespaces.forEach((namespace)=>{
            state.filterByNamespaceMap[namespace] = true;
        });
        ConnectorController.updateConnectorsForEnabledNamespaces();
    },
    filterByNamespace (namespace, enabled) {
        state.filterByNamespaceMap[namespace] = enabled;
        ConnectorController.updateConnectorsForEnabledNamespaces();
    },
    updateConnectorsForEnabledNamespaces () {
        const enabledNamespaces = ConnectorController.getEnabledNamespaces();
        const enabledConnectors = ConnectorController.getEnabledConnectors(enabledNamespaces);
        const areAllNamespacesEnabled = ConnectorController.areAllNamespacesEnabled();
        state.connectors = ConnectorController.mergeMultiChainConnectors(enabledConnectors);
        if (areAllNamespacesEnabled) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].clearFilterByNamespaces();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].filterByNamespaces(enabledNamespaces);
        }
    },
    getEnabledNamespaces () {
        return Object.entries(state.filterByNamespaceMap).filter(([_, enabled])=>enabled).map(([namespace])=>namespace);
    },
    getEnabledConnectors (enabledNamespaces) {
        return state.allConnectors.filter((connector)=>enabledNamespaces.includes(connector.chain));
    },
    areAllNamespacesEnabled () {
        return Object.values(state.filterByNamespaceMap).every((enabled)=>enabled);
    },
    mergeMultiChainConnectors (connectors) {
        const connectorsByNameMap = ConnectorController.generateConnectorMapByName(connectors);
        const mergedConnectors = [];
        connectorsByNameMap.forEach((keyConnectors)=>{
            const firstItem = keyConnectors[0];
            const isAuthConnector = firstItem?.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
            if (keyConnectors.length > 1 && firstItem) {
                mergedConnectors.push({
                    name: firstItem.name,
                    imageUrl: firstItem.imageUrl,
                    imageId: firstItem.imageId,
                    connectors: [
                        ...keyConnectors
                    ],
                    type: isAuthConnector ? 'AUTH' : 'MULTI_CHAIN',
                    // These values are just placeholders, we don't use them in multi-chain connector select screen
                    chain: 'eip155',
                    id: firstItem?.id || ''
                });
            } else if (firstItem) {
                mergedConnectors.push(firstItem);
            }
        });
        return mergedConnectors;
    },
    generateConnectorMapByName (connectors) {
        const connectorsByNameMap = new Map();
        connectors.forEach((connector)=>{
            const { name } = connector;
            const connectorName = ConnectorController.getConnectorName(name);
            if (!connectorName) {
                return;
            }
            const connectorsByName = connectorsByNameMap.get(connectorName) || [];
            const haveSameConnector = connectorsByName.find((c)=>c.chain === connector.chain);
            if (!haveSameConnector) {
                connectorsByName.push(connector);
            }
            connectorsByNameMap.set(connectorName, connectorsByName);
        });
        return connectorsByNameMap;
    },
    getConnectorName (name) {
        if (!name) {
            return name;
        }
        const nameOverrideMap = {
            'Trust Wallet': 'Trust'
        };
        return nameOverrideMap[name] || name;
    },
    getUniqueConnectorsByName (connectors) {
        const uniqueConnectors = [];
        connectors.forEach((c)=>{
            if (!uniqueConnectors.find((uc)=>uc.chain === c.chain)) {
                uniqueConnectors.push(c);
            }
        });
        return uniqueConnectors;
    },
    addConnector (connector) {
        if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
            const authConnector = connector;
            const optionsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state);
            const themeMode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeMode;
            const themeVariables = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeVariables;
            authConnector?.provider?.syncDappData?.({
                metadata: optionsState.metadata,
                sdkVersion: optionsState.sdkVersion,
                projectId: optionsState.projectId,
                sdkType: optionsState.sdkType
            });
            authConnector?.provider?.syncTheme({
                themeMode,
                themeVariables,
                w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(themeVariables, themeMode)
            });
            ConnectorController.setConnectors([
                connector
            ]);
        } else {
            ConnectorController.setConnectors([
                connector
            ]);
        }
    },
    getAuthConnector (chainNamespace) {
        const activeNamespace = chainNamespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const authConnector = state.connectors.find((c)=>c.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH);
        if (!authConnector) {
            return undefined;
        }
        if (authConnector?.connectors?.length) {
            const connector = authConnector.connectors.find((c)=>c.chain === activeNamespace);
            return connector;
        }
        return authConnector;
    },
    getAnnouncedConnectorRdns () {
        return state.connectors.filter((c)=>c.type === 'ANNOUNCED').map((c)=>c.info?.rdns);
    },
    getConnectorById (id) {
        return state.allConnectors.find((c)=>c.id === id);
    },
    getConnector ({ id, rdns, namespace }) {
        const namespaceToUse = namespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const connectorsByNamespace = state.allConnectors.filter((c)=>c.chain === namespaceToUse);
        return connectorsByNamespace.find((c)=>c.explorerId === id || c.info?.rdns === rdns);
    },
    syncIfAuthConnector (connector) {
        if (connector.id !== 'ID_AUTH') {
            return;
        }
        const authConnector = connector;
        const optionsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state);
        const themeMode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeMode;
        const themeVariables = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeVariables;
        authConnector?.provider?.syncDappData?.({
            metadata: optionsState.metadata,
            sdkVersion: optionsState.sdkVersion,
            sdkType: optionsState.sdkType,
            projectId: optionsState.projectId
        });
        authConnector.provider.syncTheme({
            themeMode,
            themeVariables,
            w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(themeVariables, themeMode)
        });
    },
    /**
     * Returns the connectors filtered by namespace.
     * @param namespace - The namespace to filter the connectors by.
     * @returns ConnectorWithProviders[].
     */ getConnectorsByNamespace (namespace) {
        const namespaceConnectors = state.allConnectors.filter((connector)=>connector.chain === namespace);
        return ConnectorController.mergeMultiChainConnectors(namespaceConnectors);
    },
    canSwitchToSmartAccount (namespace) {
        const isSmartAccountEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].checkIfSmartAccountEnabled();
        return isSmartAccountEnabled && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(namespace) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.EOA;
    },
    selectWalletConnector (wallet) {
        const redirectView = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.data?.redirectView;
        const connector = ConnectorController.getConnector({
            id: wallet.id,
            rdns: wallet.rdns
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileWalletUtil"].handleMobileDeeplinkRedirect(connector?.explorerId || wallet.id, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        if (connector) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('ConnectingExternal', {
                connector,
                wallet,
                redirectView
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('ConnectingWalletConnect', {
                wallet,
                redirectView
            });
        }
    },
    /**
     * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
     * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
     * @returns ConnectorWithProviders[].
     */ getConnectors (namespace) {
        if (namespace) {
            return ConnectorController.getConnectorsByNamespace(namespace);
        }
        return ConnectorController.mergeMultiChainConnectors(state.allConnectors);
    },
    /**
     * Sets the filter by namespace and updates the connectors.
     * @param namespace - The namespace to filter the connectors by.
     */ setFilterByNamespace (namespace) {
        state.filterByNamespace = namespace;
        state.connectors = ConnectorController.getConnectors(namespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].setFilterByNamespace(namespace);
    },
    setConnectorId (connectorId, namespace) {
        if (connectorId) {
            state.activeConnectorIds = {
                ...state.activeConnectorIds,
                [namespace]: connectorId
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedConnectorId(namespace, connectorId);
        }
    },
    removeConnectorId (namespace) {
        state.activeConnectorIds = {
            ...state.activeConnectorIds,
            [namespace]: undefined
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteConnectedConnectorId(namespace);
    },
    getConnectorId (namespace) {
        if (!namespace) {
            return undefined;
        }
        return state.activeConnectorIds[namespace];
    },
    isConnected (namespace) {
        if (!namespace) {
            return Object.values(state.activeConnectorIds).some((id)=>Boolean(id));
        }
        return Boolean(state.activeConnectorIds[namespace]);
    },
    resetConnectorIds () {
        state.activeConnectorIds = {
            ...defaultActiveConnectors
        };
    }
};
const ConnectorController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=ConnectorController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectorControllerUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectorControllerUtil",
    ()=>ConnectorControllerUtil
]);
/* eslint-disable max-depth */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- Constants ------------------------------------------ //
const UPDATE_EMAIL_INTERVAL_MS = 1_000;
const ConnectorControllerUtil = {
    checkNamespaceConnectorId (namespace, connectorId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(namespace) === connectorId;
    },
    isSocialProvider (socialProvider) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_REMOTE_FEATURES.socials.includes(socialProvider);
    },
    connectWalletConnect ({ walletConnect, connector, closeModalOnConnect = true, redirectViewOnModalClose = 'Connect', onOpen, onConnect }) {
        return new Promise((resolve, reject)=>{
            if (walletConnect) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setActiveConnector(connector);
            }
            onOpen?.(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile() && walletConnect);
            if (redirectViewOnModalClose) {
                const unsubscribeModalController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('open', (val)=>{
                    if (!val) {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view !== redirectViewOnModalClose) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace(redirectViewOnModalClose);
                        }
                        unsubscribeModalController();
                        reject(new Error('Modal closed'));
                    }
                });
            }
            const unsubscribeChainController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipAddress', (val)=>{
                if (val) {
                    onConnect?.();
                    if (closeModalOnConnect) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                    }
                    unsubscribeChainController();
                    resolve(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(val));
                }
            });
        });
    },
    connectExternal (connector) {
        return new Promise((resolve, reject)=>{
            const unsubscribeChainController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipAddress', (val)=>{
                if (val) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                    unsubscribeChainController();
                    resolve(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(val));
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].connectExternal(connector, connector.chain).catch(()=>{
                unsubscribeChainController();
                reject(new Error('Connection rejected'));
            });
        });
    },
    connectSocial ({ social, namespace, closeModalOnConnect = true, onOpenFarcaster, onConnect }) {
        const accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace);
        let socialWindow = accountData?.socialWindow;
        let socialProvider = accountData?.socialProvider;
        let isConnectingSocial = false;
        let popupWindow = null;
        const namespaceToUse = namespace || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const unsubscribeChainController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipAddress', (val)=>{
            if (val) {
                if (closeModalOnConnect) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                }
                unsubscribeChainController();
            }
        });
        return new Promise((resolve, reject)=>{
            async function handleSocialConnection(event) {
                if (event.data?.resultUri) {
                    if (event.origin === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].SECURE_SITE_SDK_ORIGIN) {
                        window.removeEventListener('message', handleSocialConnection, false);
                        try {
                            const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector(namespaceToUse);
                            if (authConnector && !isConnectingSocial) {
                                const _accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespaceToUse);
                                if (socialWindow) {
                                    socialWindow.close();
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('socialWindow', undefined, namespaceToUse);
                                    socialWindow = _accountData?.socialWindow;
                                }
                                isConnectingSocial = true;
                                const uri = event.data.resultUri;
                                if (socialProvider) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                                        type: 'track',
                                        event: 'SOCIAL_LOGIN_REQUEST_USER_DATA',
                                        properties: {
                                            provider: socialProvider
                                        }
                                    });
                                }
                                if (socialProvider) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedSocialProvider(socialProvider);
                                    await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].connectExternal({
                                        id: authConnector.id,
                                        type: authConnector.type,
                                        socialUri: uri
                                    }, authConnector.chain);
                                    const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
                                    if (!caipAddress) {
                                        reject(new Error('Failed to connect'));
                                        return;
                                    }
                                    resolve(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(caipAddress));
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                                        type: 'track',
                                        event: 'SOCIAL_LOGIN_SUCCESS',
                                        properties: {
                                            provider: socialProvider
                                        }
                                    });
                                }
                            }
                        } catch (err) {
                            if (socialProvider) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                                    type: 'track',
                                    event: 'SOCIAL_LOGIN_ERROR',
                                    properties: {
                                        provider: socialProvider,
                                        message: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].parseError(err)
                                    }
                                });
                            }
                            reject(new Error('Failed to connect'));
                        }
                    } else if (socialProvider) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                            type: 'track',
                            event: 'SOCIAL_LOGIN_ERROR',
                            properties: {
                                provider: socialProvider,
                                message: 'Untrusted Origin'
                            }
                        });
                    }
                }
            }
            async function connectSocial() {
                if (social) {
                    const _accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespaceToUse);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('socialProvider', social, namespaceToUse);
                    socialProvider = _accountData?.socialProvider;
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                        type: 'track',
                        event: 'SOCIAL_LOGIN_STARTED',
                        properties: {
                            provider: socialProvider
                        }
                    });
                }
                if (socialProvider === 'farcaster') {
                    onOpenFarcaster?.();
                    const unsubscribeModalController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('open', (val)=>{
                        if (!val && social === 'farcaster') {
                            reject(new Error('Popup closed'));
                            onConnect?.();
                            unsubscribeModalController();
                        }
                    });
                    const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
                    if (authConnector) {
                        const _accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespaceToUse);
                        if (!_accountData?.farcasterUrl) {
                            try {
                                const { url } = await authConnector.provider.getFarcasterUri();
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('farcasterUrl', url, namespaceToUse);
                            } catch  {
                                reject(new Error('Failed to connect to farcaster'));
                            }
                        }
                    }
                } else {
                    const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
                    popupWindow = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].returnOpenHref(`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].SECURE_SITE_SDK_ORIGIN}/loading`, 'popupWindow', 'width=600,height=800,scrollbars=yes');
                    try {
                        if (authConnector && socialProvider) {
                            const { uri } = await authConnector.provider.getSocialRedirectUri({
                                provider: socialProvider
                            });
                            if (popupWindow && uri) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('socialWindow', (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(popupWindow), namespaceToUse);
                                socialWindow = accountData?.socialWindow;
                                popupWindow.location.href = uri;
                                const interval = setInterval(()=>{
                                    if (socialWindow?.closed && !isConnectingSocial) {
                                        reject(new Error('Popup closed'));
                                        clearInterval(interval);
                                    }
                                }, 1000);
                                window.addEventListener('message', handleSocialConnection, false);
                            } else {
                                popupWindow?.close();
                                reject(new Error('Failed to initiate social connection'));
                            }
                        }
                    } catch  {
                        reject(new Error('Failed to initiate social connection'));
                        popupWindow?.close();
                    }
                }
            }
            connectSocial();
        });
    },
    connectEmail ({ closeModalOnConnect = true, redirectViewOnModalClose = 'Connect', onOpen, onConnect }) {
        return new Promise((resolve, reject)=>{
            onOpen?.();
            if (redirectViewOnModalClose) {
                const unsubscribeModalController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('open', (val)=>{
                    if (!val) {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view !== redirectViewOnModalClose) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace(redirectViewOnModalClose);
                        }
                        unsubscribeModalController();
                        reject(new Error('Modal closed'));
                    }
                });
            }
            const unsubscribeChainController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipAddress', (val)=>{
                if (val) {
                    onConnect?.();
                    if (closeModalOnConnect) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                    }
                    unsubscribeChainController();
                    resolve(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(val));
                }
            });
        });
    },
    async updateEmail () {
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
        if (!authConnector) {
            throw new Error('No auth connector found');
        }
        if (connectorId !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
            throw new Error('Not connected to email or social');
        }
        const initialEmail = authConnector.provider.getEmail() ?? '';
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
            view: 'UpdateEmailWallet',
            data: {
                email: initialEmail,
                redirectView: undefined
            }
        });
        return new Promise((resolve, reject)=>{
            const interval = setInterval(()=>{
                const newEmail = authConnector.provider.getEmail() ?? '';
                if (newEmail !== initialEmail) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                    clearInterval(interval);
                    unsubscribeModalController();
                    resolve({
                        email: newEmail
                    });
                }
            }, UPDATE_EMAIL_INTERVAL_MS);
            const unsubscribeModalController = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('open', (val)=>{
                if (!val) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view !== 'Connect') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('Connect');
                    }
                    clearInterval(interval);
                    unsubscribeModalController();
                    reject(new Error('Modal closed'));
                }
            });
        });
    },
    canSwitchToSmartAccount (namespace) {
        const isSmartAccountEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].checkIfSmartAccountEnabled();
        return isSmartAccountEnabled && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(namespace) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.EOA;
    }
}; //# sourceMappingURL=ConnectorControllerUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveCaipNetwork",
    ()=>getActiveCaipNetwork,
    "getActiveNetworkTokenAddress",
    ()=>getActiveNetworkTokenAddress,
    "getChainsToDisconnect",
    ()=>getChainsToDisconnect,
    "getPreferredAccountType",
    ()=>getPreferredAccountType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectorControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
;
;
function getChainsToDisconnect(namespace) {
    const namespaces = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys());
    let chains = [];
    if (namespace) {
        chains.push([
            namespace,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(namespace)
        ]);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].checkNamespaceConnectorId(namespace, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT)) {
            namespaces.forEach((ns)=>{
                if (ns !== namespace && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].checkNamespaceConnectorId(ns, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT)) {
                    chains.push([
                        ns,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(ns)
                    ]);
                }
            });
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].checkNamespaceConnectorId(namespace, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH)) {
            namespaces.forEach((ns)=>{
                if (ns !== namespace && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].checkNamespaceConnectorId(ns, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH)) {
                    chains.push([
                        ns,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(ns)
                    ]);
                }
            });
        }
    } else {
        chains = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.entries());
    }
    return chains;
}
function getActiveNetworkTokenAddress() {
    const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace || 'eip155';
    const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id || 1;
    const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].NATIVE_TOKEN_ADDRESS[namespace];
    return `${namespace}:${chainId}:${address}`;
}
function getPreferredAccountType(namespace) {
    const preferredAccountType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace)?.preferredAccountType;
    return preferredAccountType;
}
function getActiveCaipNetwork(chainNamespace) {
    if (chainNamespace) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(chainNamespace)?.networkState?.caipNetwork;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
} //# sourceMappingURL=ChainControllerUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectionControllerUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectionControllerUtil",
    ()=>ConnectionControllerUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
const ConnectionControllerUtil = {
    getConnectionStatus (connection, namespace) {
        const connectedConnectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.activeConnectorIds[namespace];
        const connections = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].getConnections(namespace);
        const isConnectorConnected = Boolean(connectedConnectorId) && connection.connectorId === connectedConnectorId;
        if (isConnectorConnected) {
            return 'connected';
        }
        const isConnectionConnected = connections.some((c)=>c.connectorId.toLowerCase() === connection.connectorId.toLowerCase());
        if (isConnectionConnected) {
            return 'active';
        }
        return 'disconnected';
    },
    excludeConnectorAddressFromConnections ({ connections, connectorId, addresses }) {
        return connections.map((connection)=>{
            const isConnectorMatch = connectorId ? connection.connectorId.toLowerCase() === connectorId.toLowerCase() : false;
            if (isConnectorMatch && addresses) {
                const filteredAccounts = connection.accounts.filter((account)=>{
                    const isAddressIncluded = addresses.some((address)=>address.toLowerCase() === account.address.toLowerCase());
                    return !isAddressIncluded;
                });
                return {
                    ...connection,
                    accounts: filteredAccounts
                };
            }
            return connection;
        });
    },
    excludeExistingConnections (connectorIds, newConnections) {
        const existingConnectorIds = new Set(connectorIds);
        return newConnections.filter((c)=>!existingConnectorIds.has(c.connectorId));
    },
    getConnectionsByConnectorId (connections, connectorId) {
        return connections.filter((c)=>c.connectorId.toLowerCase() === connectorId.toLowerCase());
    },
    getConnectionsData (namespace) {
        const isMultiWalletEnabled = Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.multiWallet);
        const activeConnectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.activeConnectorIds[namespace];
        const connections = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].getConnections(namespace);
        const recentConnections = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].state.recentConnections.get(namespace) ?? [];
        const recentConnectionsWithCurrentActiveConnectors = recentConnections.filter((connection)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorById(connection.connectorId));
        const dedupedRecentConnections = ConnectionControllerUtil.excludeExistingConnections([
            ...connections.map((c)=>c.connectorId),
            ...activeConnectorId ? [
                activeConnectorId
            ] : []
        ], recentConnectionsWithCurrentActiveConnectors);
        if (!isMultiWalletEnabled) {
            return {
                connections: connections.filter((c)=>c.connectorId.toLowerCase() === activeConnectorId?.toLowerCase()),
                recentConnections: []
            };
        }
        return {
            connections,
            recentConnections: dedupedRecentConnections
        };
    }
}; //# sourceMappingURL=ConnectionControllerUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TransactionsController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionsController",
    ()=>TransactionsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    transactions: [],
    transactionsByYear: {},
    lastNetworkInView: undefined,
    loading: false,
    empty: false,
    next: undefined
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    setLastNetworkInView (lastNetworkInView) {
        state.lastNetworkInView = lastNetworkInView;
    },
    async fetchTransactions (accountAddress) {
        if (!accountAddress) {
            throw new Error("Transactions can't be fetched without an accountAddress");
        }
        state.loading = true;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchTransactions({
                account: accountAddress,
                cursor: state.next,
                chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId
            });
            const nonSpamTransactions = TransactionsController.filterSpamTransactions(response.data);
            const sameChainTransactions = TransactionsController.filterByConnectedChain(nonSpamTransactions);
            const filteredTransactions = [
                ...state.transactions,
                ...sameChainTransactions
            ];
            state.loading = false;
            state.transactions = filteredTransactions;
            state.transactionsByYear = TransactionsController.groupTransactionsByYearAndMonth(state.transactionsByYear, sameChainTransactions);
            state.empty = filteredTransactions.length === 0;
            state.next = response.next ? response.next : undefined;
        } catch (error) {
            const activeChainNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'ERROR_FETCH_TRANSACTIONS',
                properties: {
                    address: accountAddress,
                    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                    cursor: state.next,
                    isSmartAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(activeChainNamespace) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to fetch transactions');
            state.loading = false;
            state.empty = true;
            state.next = undefined;
        }
    },
    groupTransactionsByYearAndMonth (transactionsMap = {}, transactions = []) {
        const grouped = transactionsMap;
        transactions.forEach((transaction)=>{
            const year = new Date(transaction.metadata.minedAt).getFullYear();
            const month = new Date(transaction.metadata.minedAt).getMonth();
            const yearTransactions = grouped[year] ?? {};
            const monthTransactions = yearTransactions[month] ?? [];
            // If there's a transaction with the same id, remove the old one
            const newMonthTransactions = monthTransactions.filter((tx)=>tx.id !== transaction.id);
            grouped[year] = {
                ...yearTransactions,
                [month]: [
                    ...newMonthTransactions,
                    transaction
                ].sort((a, b)=>new Date(b.metadata.minedAt).getTime() - new Date(a.metadata.minedAt).getTime())
            };
        });
        return grouped;
    },
    filterSpamTransactions (transactions) {
        return transactions.filter((transaction)=>{
            const isAllSpam = transaction.transfers.every((transfer)=>transfer.nft_info?.flags.is_spam === true);
            return !isAllSpam;
        });
    },
    filterByConnectedChain (transactions) {
        const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId;
        const filteredTransactions = transactions.filter((transaction)=>transaction.metadata.chain === chainId);
        return filteredTransactions;
    },
    clearCursor () {
        state.next = undefined;
    },
    resetTransactions () {
        state.transactions = [];
        state.transactionsByYear = {};
        state.lastNetworkInView = undefined;
        state.loading = false;
        state.empty = false;
        state.next = undefined;
    }
};
const TransactionsController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller, 'API_ERROR'); //# sourceMappingURL=TransactionsController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectionController",
    ()=>ConnectionController
]);
/* eslint-disable no-console */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectionControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectionControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectorControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TransactionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TransactionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    connections: new Map(),
    recentConnections: new Map(),
    isSwitchingConnection: false,
    wcError: false,
    buffering: false,
    status: 'disconnected'
});
// eslint-disable-next-line init-declarations
let wcConnectionPromise;
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    _getClient () {
        return state._client;
    },
    setClient (client) {
        state._client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(client);
    },
    initialize (adapters) {
        const namespaces = adapters.filter((a)=>Boolean(a.namespace)).map((a)=>a.namespace);
        ConnectionController.syncStorageConnections(namespaces);
    },
    syncStorageConnections (namespaces) {
        const storageConnections = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnections();
        const namespacesToSync = namespaces ?? Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys());
        for (const namespace of namespacesToSync){
            const storageConnectionsByNamespace = storageConnections[namespace] ?? [];
            const recentConnectionsMap = new Map(state.recentConnections);
            recentConnectionsMap.set(namespace, storageConnectionsByNamespace);
            state.recentConnections = recentConnectionsMap;
        }
    },
    getConnections (namespace) {
        return namespace ? state.connections.get(namespace) ?? [] : [];
    },
    hasAnyConnection (connectorId) {
        const connections = ConnectionController.state.connections;
        return Array.from(connections.values()).flatMap((_connections)=>_connections).some(({ connectorId: _connectorId })=>_connectorId === connectorId);
    },
    async connectWalletConnect ({ cache = 'auto' } = {}) {
        const isInTelegramOrSafariIos = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isTelegram() || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isSafari() && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isIos();
        if (cache === 'always' || cache === 'auto' && isInTelegramOrSafariIos) {
            if (wcConnectionPromise) {
                await wcConnectionPromise;
                wcConnectionPromise = undefined;
                return;
            }
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isPairingExpired(state?.wcPairingExpiry)) {
                const link = state.wcUri;
                state.wcUri = link;
                return;
            }
            wcConnectionPromise = ConnectionController._getClient()?.connectWalletConnect?.().catch(()=>undefined);
            ConnectionController.state.status = 'connecting';
            await wcConnectionPromise;
            wcConnectionPromise = undefined;
            state.wcPairingExpiry = undefined;
            ConnectionController.state.status = 'connected';
        } else {
            await ConnectionController._getClient()?.connectWalletConnect?.();
        }
    },
    async connectExternal (options, chain, setChain = true) {
        const connectData = await ConnectionController._getClient()?.connectExternal?.(options);
        if (setChain) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveNamespace(chain);
        }
        return connectData;
    },
    async reconnectExternal (options) {
        await ConnectionController._getClient()?.reconnectExternal?.(options);
        const namespace = options.chain || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        if (namespace) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setConnectorId(options.id, namespace);
        }
    },
    async setPreferredAccountType (accountType, namespace) {
        if (!namespace) {
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(true, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
        if (!authConnector) {
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('preferredAccountType', accountType, namespace);
        await authConnector.provider.setPreferredAccount(accountType);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setPreferredAccountTypes(Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains).reduce((acc, [key, _])=>{
            const namespace = key;
            const accountType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(namespace);
            if (accountType !== undefined) {
                ;
                acc[namespace] = accountType;
            }
            return acc;
        }, {}));
        await ConnectionController.reconnectExternal(authConnector);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(false, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'SET_PREFERRED_ACCOUNT_TYPE',
            properties: {
                accountType,
                network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
            }
        });
    },
    async signMessage (message) {
        return ConnectionController._getClient()?.signMessage(message);
    },
    parseUnits (value, decimals) {
        return ConnectionController._getClient()?.parseUnits(value, decimals);
    },
    formatUnits (value, decimals) {
        return ConnectionController._getClient()?.formatUnits(value, decimals);
    },
    updateBalance (namespace) {
        return ConnectionController._getClient()?.updateBalance(namespace);
    },
    async sendTransaction (args) {
        return ConnectionController._getClient()?.sendTransaction(args);
    },
    async getCapabilities (params) {
        return ConnectionController._getClient()?.getCapabilities(params);
    },
    async grantPermissions (params) {
        return ConnectionController._getClient()?.grantPermissions(params);
    },
    async walletGetAssets (params) {
        return ConnectionController._getClient()?.walletGetAssets(params) ?? {};
    },
    async estimateGas (args) {
        return ConnectionController._getClient()?.estimateGas(args);
    },
    async writeContract (args) {
        return ConnectionController._getClient()?.writeContract(args);
    },
    async getEnsAddress (value) {
        return ConnectionController._getClient()?.getEnsAddress(value);
    },
    async getEnsAvatar (value) {
        return ConnectionController._getClient()?.getEnsAvatar(value);
    },
    checkInstalled (ids) {
        return ConnectionController._getClient()?.checkInstalled?.(ids) || false;
    },
    resetWcConnection () {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        state.wcLinking = undefined;
        state.recentWallet = undefined;
        state.status = 'disconnected';
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$TransactionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionsController"].resetTransactions();
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteWalletConnectDeepLink();
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteRecentWallet();
    },
    resetUri () {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        wcConnectionPromise = undefined;
    },
    finalizeWcConnection (address) {
        const { wcLinking, recentWallet } = ConnectionController.state;
        if (wcLinking) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setWalletConnectDeepLink(wcLinking);
        }
        if (recentWallet) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setAppKitRecent(recentWallet);
        }
        if (address) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'CONNECT_SUCCESS',
                address,
                properties: {
                    method: wcLinking ? 'mobile' : 'qrcode',
                    name: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.data?.wallet?.name || 'Unknown',
                    view: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view,
                    walletRank: recentWallet?.order
                }
            });
        }
    },
    setWcBasic (wcBasic) {
        state.wcBasic = wcBasic;
    },
    setUri (uri) {
        state.wcUri = uri;
        state.wcPairingExpiry = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPairingExpiry();
    },
    setWcLinking (wcLinking) {
        state.wcLinking = wcLinking;
    },
    setWcError (wcError) {
        state.wcError = wcError;
        state.buffering = false;
    },
    setRecentWallet (wallet) {
        state.recentWallet = wallet;
    },
    setBuffering (buffering) {
        state.buffering = buffering;
    },
    setStatus (status) {
        state.status = status;
    },
    setIsSwitchingConnection (isSwitchingConnection) {
        state.isSwitchingConnection = isSwitchingConnection;
    },
    async disconnect ({ id, namespace, initialDisconnect } = {}) {
        try {
            await ConnectionController._getClient()?.disconnect({
                id,
                chainNamespace: namespace,
                initialDisconnect
            });
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppKitError"]('Failed to disconnect', 'INTERNAL_SDK_ERROR', error);
        }
    },
    async disconnectConnector ({ id, namespace }) {
        try {
            await ConnectionController._getClient()?.disconnectConnector({
                id,
                namespace
            });
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppKitError"]('Failed to disconnect connector', 'INTERNAL_SDK_ERROR', error);
        }
    },
    setConnections (connections, chainNamespace) {
        const connectionsMap = new Map(state.connections);
        connectionsMap.set(chainNamespace, connections);
        state.connections = connectionsMap;
    },
    async handleAuthAccountSwitch ({ address, namespace }) {
        const accountData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace);
        const smartAccount = accountData?.user?.accounts?.find((c)=>c.type === 'smartAccount');
        const accountType = smartAccount && smartAccount.address.toLowerCase() === address.toLowerCase() && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].canSwitchToSmartAccount(namespace) ? 'smartAccount' : 'eoa';
        await ConnectionController.setPreferredAccountType(accountType, namespace);
    },
    async handleActiveConnection ({ connection, namespace, address }) {
        const connector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorById(connection.connectorId);
        const isAuthConnector = connection.connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
        if (!connector) {
            throw new Error(`No connector found for connection: ${connection.connectorId}`);
        }
        if (!isAuthConnector) {
            const connectData = await ConnectionController.connectExternal({
                id: connector.id,
                type: connector.type,
                provider: connector.provider,
                address,
                chain: namespace
            }, namespace);
            return connectData?.address;
        } else if (isAuthConnector && address) {
            await ConnectionController.handleAuthAccountSwitch({
                address,
                namespace
            });
        }
        return address;
    },
    async handleDisconnectedConnection ({ connection, namespace, address, closeModalOnConnect }) {
        const connector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorById(connection.connectorId);
        const authName = connection.auth?.name?.toLowerCase();
        const isAuthConnector = connection.connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
        const isWCConnector = connection.connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
        if (!connector) {
            throw new Error(`No connector found for connection: ${connection.connectorId}`);
        }
        let newAddress = undefined;
        if (isAuthConnector) {
            if (authName && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].isSocialProvider(authName)) {
                const { address: socialAddress } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].connectSocial({
                    social: authName,
                    closeModalOnConnect,
                    onOpenFarcaster () {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                            view: 'ConnectingFarcaster'
                        });
                    },
                    onConnect () {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('ProfileWallets');
                    }
                });
                newAddress = socialAddress;
            } else {
                const { address: emailAddress } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].connectEmail({
                    closeModalOnConnect,
                    onOpen () {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                            view: 'EmailLogin'
                        });
                    },
                    onConnect () {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('ProfileWallets');
                    }
                });
                newAddress = emailAddress;
            }
        } else if (isWCConnector) {
            const { address: wcAddress } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorControllerUtil"].connectWalletConnect({
                walletConnect: true,
                connector,
                closeModalOnConnect,
                onOpen (isMobile) {
                    const view = isMobile ? 'AllWallets' : 'ConnectingWalletConnect';
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push(view);
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                            view
                        });
                    }
                },
                onConnect () {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('ProfileWallets');
                }
            });
            newAddress = wcAddress;
        } else {
            const connectData = await ConnectionController.connectExternal({
                id: connector.id,
                type: connector.type,
                provider: connector.provider,
                chain: namespace
            }, namespace);
            if (connectData) {
                newAddress = connectData.address;
            }
        }
        if (isAuthConnector && address) {
            await ConnectionController.handleAuthAccountSwitch({
                address,
                namespace
            });
        }
        return newAddress;
    },
    async switchConnection ({ connection, address, namespace, closeModalOnConnect, onChange }) {
        let currentAddress = undefined;
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace)?.caipAddress;
        if (caipAddress) {
            const { address: currentAddressParsed } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(caipAddress);
            currentAddress = currentAddressParsed;
        }
        const status = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectionControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionControllerUtil"].getConnectionStatus(connection, namespace);
        switch(status){
            case 'connected':
            case 'active':
                {
                    const newAddress = await ConnectionController.handleActiveConnection({
                        connection,
                        namespace,
                        address
                    });
                    if (currentAddress && newAddress) {
                        const hasSwitchedAccount = newAddress.toLowerCase() !== currentAddress.toLowerCase();
                        onChange?.({
                            address: newAddress,
                            namespace,
                            hasSwitchedAccount,
                            hasSwitchedWallet: status === 'active'
                        });
                    }
                    break;
                }
            case 'disconnected':
                {
                    const newAddress = await ConnectionController.handleDisconnectedConnection({
                        connection,
                        namespace,
                        address,
                        closeModalOnConnect
                    });
                    if (newAddress) {
                        onChange?.({
                            address: newAddress,
                            namespace,
                            hasSwitchedAccount: true,
                            hasSwitchedWallet: true
                        });
                    }
                    break;
                }
            default:
                throw new Error(`Invalid connection status: ${status}`);
        }
    }
};
const ConnectionController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=ConnectionController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ERC7811Util.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ERC7811Utils",
    ()=>ERC7811Utils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
;
const ERC7811Utils = {
    /**
     * Creates a Balance object from an ERC7811 Asset object
     * @param asset - Asset object to convert
     * @param chainId - Chain ID in CAIP-2 format
     * @returns Balance object
     */ createBalance (asset, chainId) {
        const metadata = {
            name: asset.metadata['name'] || '',
            symbol: asset.metadata['symbol'] || '',
            decimals: asset.metadata['decimals'] || 0,
            value: asset.metadata['value'] || 0,
            price: asset.metadata['price'] || 0,
            iconUrl: asset.metadata['iconUrl'] || ''
        };
        return {
            name: metadata.name,
            symbol: metadata.symbol,
            chainId,
            address: asset.address === 'native' ? undefined : this.convertAddressToCAIP10Address(asset.address, chainId),
            value: metadata.value,
            price: metadata.price,
            quantity: {
                decimals: metadata.decimals.toString(),
                numeric: this.convertHexToBalance({
                    hex: asset.balance,
                    decimals: metadata.decimals
                })
            },
            iconUrl: metadata.iconUrl
        };
    },
    /**
     * Converts a hex string to a Balance object
     * @param hex - Hex string to convert
     * @param decimals - Number of decimals to use
     * @returns Balance object
     */ convertHexToBalance ({ hex, decimals }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(BigInt(hex), decimals);
    },
    /**
     * Converts an address to a CAIP-10 address
     * @param address - Address to convert
     * @param chainId - Chain ID in CAIP-2 format
     * @returns CAIP-10 address
     */ convertAddressToCAIP10Address (address, chainId) {
        return `${chainId}:${address}`;
    },
    /**
     *  Creates a CAIP-2 Chain ID from a chain ID and namespace
     * @param chainId  - Chain ID in hex format
     * @param namespace  - Chain namespace
     * @returns
     */ createCAIP2ChainId (chainId, namespace) {
        return `${namespace}:${parseInt(chainId, 16)}`;
    },
    /**
     * Gets the chain ID in hex format from a CAIP-2 Chain ID
     * @param caip2ChainId - CAIP-2 Chain ID
     * @returns Chain ID in hex format
     */ getChainIdHexFromCAIP2ChainId (caip2ChainId) {
        const parts = caip2ChainId.split(':');
        if (parts.length < 2 || !parts[1]) {
            return '0x0';
        }
        const chainPart = parts[1];
        const parsed = parseInt(chainPart, 10);
        return isNaN(parsed) ? '0x0' : `0x${parsed.toString(16)}`;
    },
    /**
     * Checks if a response is a valid WalletGetAssetsResponse
     * @param response - The response to check
     * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
     */ isWalletGetAssetsResponse (response) {
        // Check if response is an object and has the expected structure
        if (typeof response !== 'object' || response === null) {
            return false;
        }
        // Check if all values are arrays and conform to the expected asset structure
        return Object.values(response).every((value)=>Array.isArray(value) && value.every((asset)=>this.isValidAsset(asset)));
    },
    /**
     * Checks if an asset object is valid.
     * @param asset - The asset object to check.
     * @returns True if the asset is valid, false otherwise.
     */ isValidAsset (asset) {
        return typeof asset === 'object' && asset !== null && typeof asset.address === 'string' && typeof asset.balance === 'string' && (asset.type === 'ERC20' || asset.type === 'NATIVE') && typeof asset.metadata === 'object' && asset.metadata !== null && typeof asset.metadata['name'] === 'string' && typeof asset.metadata['symbol'] === 'string' && typeof asset.metadata['decimals'] === 'number' && typeof asset.metadata['price'] === 'number' && typeof asset.metadata['iconUrl'] === 'string';
    }
}; //# sourceMappingURL=ERC7811Util.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ViemUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViemUtil",
    ()=>ViemUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
// -- Constants ----------------------------------------------------------------
let cachedViemUtils = undefined;
// -- Helpers ------------------------------------------------------------------
async function loadViemUtils() {
    if (!cachedViemUtils) {
        const { createPublicClient, http, defineChain } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/viem/_esm/index.js [app-client] (ecmascript, async loader)");
        cachedViemUtils = {
            createPublicClient,
            http,
            defineChain
        };
    }
    return cachedViemUtils;
}
const ViemUtil = {
    getBlockchainApiRpcUrl (caipNetworkId, projectId) {
        const url = new URL('https://rpc.walletconnect.org/v1/');
        url.searchParams.set('chainId', caipNetworkId);
        url.searchParams.set('projectId', projectId);
        return url.toString();
    },
    async getViemChain (caipNetwork) {
        const { defineChain } = await loadViemUtils();
        const { chainId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipNetworkId(caipNetwork.caipNetworkId);
        return defineChain({
            ...caipNetwork,
            id: Number(chainId)
        });
    },
    async createViemPublicClient (caipNetwork) {
        const { createPublicClient, http } = await loadViemUtils();
        const projectId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId;
        const viemChain = await ViemUtil.getViemChain(caipNetwork);
        if (!viemChain) {
            throw new Error(`Chain ${caipNetwork.caipNetworkId} not found in viem/chains`);
        }
        return createPublicClient({
            chain: viemChain,
            transport: http(ViemUtil.getBlockchainApiRpcUrl(caipNetwork.caipNetworkId, projectId))
        });
    }
}; //# sourceMappingURL=ViemUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/BalanceUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BalanceUtil",
    ()=>BalanceUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/constants/abis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ERC7811Util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ERC7811Util.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ViemUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ViemUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const BalanceUtil = {
    /**
     * Get the balances of the user's tokens. If user connected with Auth provider or and on the EIP155 network,
     * it'll use the `wallet_getAssets` and `wallet_getCapabilities` calls to fetch the balance rather than Blockchain API
     * @param forceUpdate - If true, the balances will be fetched from the server
     * @returns The balances of the user's tokens
     */ async getMyTokensWithBalance (forceUpdate) {
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData()?.address;
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        const isAuthConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId('eip155') === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
        if (!address || !caipNetwork) {
            return [];
        }
        const caipAddress = `${caipNetwork.caipNetworkId}:${address}`;
        const cachedBalance = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getBalanceCacheForCaipAddress(caipAddress);
        if (cachedBalance) {
            return cachedBalance.balances;
        }
        // Extract EIP-155 specific logic
        if (caipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM && isAuthConnector) {
            const eip155Balances = await this.getEIP155Balances(address, caipNetwork);
            if (eip155Balances) {
                return this.filterLowQualityTokens(eip155Balances);
            }
        }
        // Fallback to 1Inch API
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getBalance(address, caipNetwork.caipNetworkId, forceUpdate);
        return this.filterLowQualityTokens(response.balances);
    },
    /**
     * Get the balances of the user's tokens on the EIP155 network using native `wallet_getAssets` and `wallet_getCapabilities` calls
     * @param address - The address of the user
     * @param caipNetwork - The CAIP network
     * @returns The balances of the user's tokens on the EIP155 network
     */ async getEIP155Balances (address, caipNetwork) {
        try {
            const chainIdHex = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ERC7811Util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC7811Utils"].getChainIdHexFromCAIP2ChainId(caipNetwork.caipNetworkId);
            const walletCapabilities = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].getCapabilities(address);
            if (!walletCapabilities?.[chainIdHex]?.['assetDiscovery']?.supported) {
                return null;
            }
            const walletGetAssetsResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].walletGetAssets({
                account: address,
                chainFilter: [
                    chainIdHex
                ]
            });
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ERC7811Util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC7811Utils"].isWalletGetAssetsResponse(walletGetAssetsResponse)) {
                return null;
            }
            const assets = walletGetAssetsResponse[chainIdHex] || [];
            const filteredAssets = assets.map((asset)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ERC7811Util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERC7811Utils"].createBalance(asset, caipNetwork.caipNetworkId));
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateBalanceCache({
                caipAddress: `${caipNetwork.caipNetworkId}:${address}`,
                balance: {
                    balances: filteredAssets
                },
                timestamp: Date.now()
            });
            return filteredAssets;
        } catch (error) {
            return null;
        }
    },
    /**
     * The 1Inch API includes many low-quality tokens in the balance response,
     * which appear inconsistently. This filter prevents them from being displayed.
     */ filterLowQualityTokens (balances) {
        return balances.filter((balance)=>balance.quantity.decimals !== '0');
    },
    async fetchERC20Balance ({ caipAddress, assetAddress, caipNetwork }) {
        const publicClient = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ViemUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViemUtil"].createViemPublicClient(caipNetwork);
        const { address } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(caipAddress);
        const [{ result: name }, { result: symbol }, { result: balance }, { result: decimals }] = await publicClient.multicall({
            contracts: [
                {
                    address: assetAddress,
                    functionName: 'name',
                    args: [],
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["erc20Abi"]
                },
                {
                    address: assetAddress,
                    functionName: 'symbol',
                    args: [],
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["erc20Abi"]
                },
                {
                    address: assetAddress,
                    functionName: 'balanceOf',
                    args: [
                        address
                    ],
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["erc20Abi"]
                },
                {
                    address: assetAddress,
                    functionName: 'decimals',
                    args: [],
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$abis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["erc20Abi"]
                }
            ]
        });
        return {
            name,
            symbol,
            decimals,
            balance: balance && decimals ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(balance, decimals) : '0'
        };
    }
}; //# sourceMappingURL=BalanceUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SwapApiUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwapApiUtil",
    ()=>SwapApiUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$BalanceUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/BalanceUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
;
;
;
;
;
const SwapApiUtil = {
    async getTokenList (caipNetworkId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchSwapTokens({
            chainId: caipNetworkId
        });
        const tokens = response?.tokens?.map((token)=>({
                ...token,
                eip2612: false,
                quantity: {
                    decimals: '0',
                    numeric: '0'
                },
                price: 0,
                value: 0
            })) || [];
        return tokens;
    },
    async fetchGasPrice () {
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        if (!caipNetwork) {
            return null;
        }
        try {
            switch(caipNetwork.chainNamespace){
                case 'solana':
                    // eslint-disable-next-line no-case-declarations
                    const lamportsPerSignature = (await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]?.estimateGas({
                        chainNamespace: 'solana'
                    }))?.toString();
                    return {
                        standard: lamportsPerSignature,
                        fast: lamportsPerSignature,
                        instant: lamportsPerSignature
                    };
                case 'eip155':
                default:
                    return await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchGasPrice({
                        chainId: caipNetwork.caipNetworkId
                    });
            }
        } catch  {
            return null;
        }
    },
    async fetchSwapAllowance ({ tokenAddress, userAddress, sourceTokenAmount, sourceTokenDecimals }) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchSwapAllowance({
            tokenAddress,
            userAddress
        });
        if (response?.allowance && sourceTokenAmount && sourceTokenDecimals) {
            const parsedValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(sourceTokenAmount, sourceTokenDecimals) || 0;
            const hasAllowance = BigInt(response.allowance) >= parsedValue;
            return hasAllowance;
        }
        return false;
    },
    async getMyTokensWithBalance (forceUpdate) {
        const balances = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$BalanceUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BalanceUtil"].getMyTokensWithBalance(forceUpdate);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('tokenBalance', balances, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        return this.mapBalancesToSwapTokens(balances);
    },
    /**
     * Maps the balances from Blockchain API to SwapTokenWithBalance array
     * @param balances
     * @returns SwapTokenWithBalance[]
     */ mapBalancesToSwapTokens (balances) {
        return balances?.map((token)=>({
                ...token,
                address: token?.address ? token.address : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveNetworkTokenAddress"])(),
                decimals: parseInt(token.quantity.decimals, 10),
                logoUri: token.iconUrl,
                eip2612: false
            })) || [];
    },
    async handleSwapError (error) {
        try {
            const cause = error?.cause;
            if (!cause?.json) {
                return undefined;
            }
            const response = await cause.json();
            const reason = response?.reasons?.[0]?.description;
            if (reason?.includes('insufficient liquidity')) {
                return 'Insufficient liquidity';
            }
            return undefined;
        } catch  {
            return undefined;
        }
    }
}; //# sourceMappingURL=SwapApiUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SendController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendController",
    ()=>SendController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ErrorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ContractUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ContractUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$BalanceUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/BalanceUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SwapApiUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    tokenBalances: [],
    loading: false
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    setToken (token) {
        if (token) {
            state.token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(token);
        }
    },
    setTokenAmount (sendTokenAmount) {
        state.sendTokenAmount = sendTokenAmount;
    },
    setReceiverAddress (receiverAddress) {
        state.receiverAddress = receiverAddress;
    },
    setReceiverProfileImageUrl (receiverProfileImageUrl) {
        state.receiverProfileImageUrl = receiverProfileImageUrl;
    },
    setReceiverProfileName (receiverProfileName) {
        state.receiverProfileName = receiverProfileName;
    },
    setNetworkBalanceInUsd (networkBalanceInUSD) {
        state.networkBalanceInUSD = networkBalanceInUSD;
    },
    setLoading (loading) {
        state.loading = loading;
    },
    getSdkEventProperties (error) {
        return {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].parseError(error),
            isSmartAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
            token: state.token?.symbol || '',
            amount: state.sendTokenAmount ?? 0,
            network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
        };
    },
    async sendToken () {
        try {
            SendController.setLoading(true);
            switch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace){
                case 'eip155':
                    await SendController.sendEvmToken();
                    return;
                case 'solana':
                    await SendController.sendSolanaToken();
                    return;
                default:
                    throw new Error('Unsupported chain');
            }
        } catch (err) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].isUserRejectedRequestError(err)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](err);
            }
            throw err;
        } finally{
            SendController.setLoading(false);
        }
    },
    async sendEvmToken () {
        const activeChainNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        if (!activeChainNamespace) {
            throw new Error('SendController:sendEvmToken - activeChainNamespace is required');
        }
        const activeAccountType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(activeChainNamespace);
        if (!SendController.state.sendTokenAmount || !SendController.state.receiverAddress) {
            throw new Error('An amount and receiver address are required');
        }
        if (!SendController.state.token) {
            throw new Error('A token is required');
        }
        if (SendController.state.token?.address) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_INITIATED',
                properties: {
                    isSmartAccount: activeAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: SendController.state.token.address,
                    amount: SendController.state.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
            const { hash } = await SendController.sendERC20Token({
                receiverAddress: SendController.state.receiverAddress,
                tokenAddress: SendController.state.token.address,
                sendTokenAmount: SendController.state.sendTokenAmount,
                decimals: SendController.state.token.quantity.decimals
            });
            if (hash) {
                state.hash = hash;
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_INITIATED',
                properties: {
                    isSmartAccount: activeAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: SendController.state.token.symbol || '',
                    amount: SendController.state.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
            const { hash } = await SendController.sendNativeToken({
                receiverAddress: SendController.state.receiverAddress,
                sendTokenAmount: SendController.state.sendTokenAmount,
                decimals: SendController.state.token.quantity.decimals
            });
            if (hash) {
                state.hash = hash;
            }
        }
    },
    async fetchTokenBalance (onError) {
        state.loading = true;
        const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId;
        const chain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace;
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace)?.caipAddress ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        const address = caipAddress ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress) : undefined;
        if (state.lastRetry && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isAllowedRetry(state.lastRetry, 30 * __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ONE_SEC_MS)) {
            state.loading = false;
            return [];
        }
        try {
            if (address && chainId && chain) {
                const balances = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$BalanceUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BalanceUtil"].getMyTokensWithBalance();
                state.tokenBalances = balances;
                state.lastRetry = undefined;
                return balances;
            }
        } catch (error) {
            state.lastRetry = Date.now();
            onError?.(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Token Balance Unavailable');
        } finally{
            state.loading = false;
        }
        return [];
    },
    fetchNetworkBalance () {
        if (state.tokenBalances.length === 0) {
            return;
        }
        const networkTokenBalances = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].mapBalancesToSwapTokens(state.tokenBalances);
        if (!networkTokenBalances) {
            return;
        }
        const networkToken = networkTokenBalances.find((token)=>token.address === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveNetworkTokenAddress"])());
        if (!networkToken) {
            return;
        }
        state.networkBalanceInUSD = networkToken ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].multiply(networkToken.quantity.numeric, networkToken.price).toString() : '0';
    },
    async sendNativeToken (params) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({});
        const to = params.receiverAddress;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData()?.address;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
        const data = '0x';
        const hash = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].sendTransaction({
            chainNamespace: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
            to,
            address,
            data,
            value: value ?? BigInt(0)
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'SEND_SUCCESS',
            properties: {
                isSmartAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])('eip155') === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                token: SendController.state.token?.symbol || '',
                amount: params.sendTokenAmount,
                network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
                hash: hash || ''
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]._getClient()?.updateBalance('eip155');
        SendController.resetSend();
        return {
            hash
        };
    },
    async sendERC20Token (params) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
            onSuccess () {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('Account');
            }
        });
        const amount = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData()?.address;
        if (address && params.sendTokenAmount && params.receiverAddress && params.tokenAddress) {
            const tokenAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(params.tokenAddress);
            if (!tokenAddress) {
                throw new Error('SendController:sendERC20Token - tokenAddress is required');
            }
            const hash = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].writeContract({
                fromAddress: address,
                tokenAddress,
                args: [
                    params.receiverAddress,
                    amount ?? BigInt(0)
                ],
                method: 'transfer',
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ContractUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContractUtil"].getERC20Abi(tokenAddress),
                chainNamespace: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_SUCCESS',
                properties: {
                    isSmartAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])('eip155') === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: SendController.state.token?.symbol || '',
                    amount: params.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
                    hash: hash || ''
                }
            });
            SendController.resetSend();
            return {
                hash
            };
        }
        return {
            hash: undefined
        };
    },
    async sendSolanaToken () {
        if (!SendController.state.sendTokenAmount || !SendController.state.receiverAddress) {
            throw new Error('An amount and receiver address are required');
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
            onSuccess () {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('Account');
            }
        });
        let tokenMint = undefined;
        if (SendController.state.token && SendController.state.token.address !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].SOLANA_NATIVE_TOKEN_ADDRESS) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isCaipAddress(SendController.state.token.address)) {
                tokenMint = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(SendController.state.token.address);
            } else {
                tokenMint = SendController.state.token.address;
            }
        }
        const hash = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].sendTransaction({
            chainNamespace: 'solana',
            tokenMint,
            to: SendController.state.receiverAddress,
            value: SendController.state.sendTokenAmount
        });
        if (hash) {
            state.hash = hash;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]._getClient()?.updateBalance('solana');
        SendController.resetSend();
    },
    resetSend () {
        state.token = undefined;
        state.sendTokenAmount = undefined;
        state.receiverAddress = undefined;
        state.receiverProfileImageUrl = undefined;
        state.receiverProfileName = undefined;
        state.loading = false;
        state.tokenBalances = [];
    }
};
const SendController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=SendController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChainController",
    ()=>ChainController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$BalanceUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/BalanceUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SendController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SendController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- Constants ----------------------------------------- //
const defaultAccountState = {
    currentTab: 0,
    tokenBalance: [],
    smartAccountDeployed: false,
    addressLabels: new Map(),
    user: undefined,
    preferredAccountType: undefined
};
const networkState = {
    caipNetwork: undefined,
    supportsAllNetworks: true,
    smartAccountEnabledNetworks: []
};
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxyMap"])(),
    activeCaipAddress: undefined,
    activeChain: undefined,
    activeCaipNetwork: undefined,
    noAdapters: false,
    universalAdapter: {
        networkControllerClient: undefined,
        connectionControllerClient: undefined
    },
    isSwitchingNamespace: false
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>{
            callback(state);
        });
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    subscribeAccountStateProp (property, callback, chain) {
        const activeChain = chain || state.activeChain;
        if (!activeChain) {
            return ()=>undefined;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state.chains.get(activeChain)?.accountState || {}, property, callback);
    },
    subscribeChainProp (property, callback, chain) {
        let prev = undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state.chains, ()=>{
            const activeChain = chain || state.activeChain;
            if (activeChain) {
                const nextValue = state.chains.get(activeChain)?.[property];
                if (prev !== nextValue) {
                    prev = nextValue;
                    callback(nextValue);
                }
            }
        });
    },
    initialize (adapters, caipNetworks, clients) {
        const { chainId: activeChainId, namespace: activeNamespace } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveNetworkProps();
        const activeCaipNetwork = caipNetworks?.find((network)=>network.id.toString() === activeChainId?.toString());
        const defaultAdapter = adapters.find((adapter)=>adapter?.namespace === activeNamespace);
        const adapterToActivate = defaultAdapter || adapters?.[0];
        const namespacesFromAdapters = adapters.map((a)=>a.namespace).filter((n)=>n !== undefined);
        /**
         * If the AppKit is in embedded mode (for Demo app), we should get the available namespaces from the adapters.
         */ const namespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded ? new Set([
            ...namespacesFromAdapters
        ]) : new Set([
            ...caipNetworks?.map((network)=>network.chainNamespace) ?? []
        ]);
        if (adapters?.length === 0 || !adapterToActivate) {
            state.noAdapters = true;
        }
        if (!state.noAdapters) {
            state.activeChain = adapterToActivate?.namespace;
            state.activeCaipNetwork = activeCaipNetwork;
            ChainController.setChainNetworkData(adapterToActivate?.namespace, {
                caipNetwork: activeCaipNetwork
            });
            if (state.activeChain) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
                    activeChain: adapterToActivate?.namespace
                });
            }
        }
        namespaces.forEach((namespace)=>{
            const namespaceNetworks = caipNetworks?.filter((network)=>network.chainNamespace === namespace);
            const storedAccountTypes = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getPreferredAccountTypes() || {};
            const defaultTypes = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.defaultAccountTypes,
                ...storedAccountTypes
            };
            ChainController.state.chains.set(namespace, {
                namespace,
                networkState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
                    ...networkState,
                    caipNetwork: namespaceNetworks?.[0]
                }),
                accountState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
                    ...defaultAccountState,
                    preferredAccountType: defaultTypes[namespace]
                }),
                caipNetworks: namespaceNetworks ?? [],
                ...clients
            });
            ChainController.setRequestedCaipNetworks(namespaceNetworks ?? [], namespace);
        });
    },
    removeAdapter (namespace) {
        if (state.activeChain === namespace) {
            const nextAdapter = Array.from(state.chains.entries()).find(([chainNamespace])=>chainNamespace !== namespace);
            if (nextAdapter) {
                const caipNetwork = nextAdapter[1]?.caipNetworks?.[0];
                if (caipNetwork) {
                    ChainController.setActiveCaipNetwork(caipNetwork);
                }
            }
        }
        state.chains.delete(namespace);
    },
    addAdapter (adapter, { networkControllerClient, connectionControllerClient }, caipNetworks) {
        if (!adapter.namespace) {
            throw new Error('ChainController:addAdapter - adapter must have a namespace');
        }
        state.chains.set(adapter.namespace, {
            namespace: adapter.namespace,
            networkState: {
                ...networkState,
                caipNetwork: caipNetworks[0]
            },
            accountState: {
                ...defaultAccountState
            },
            caipNetworks,
            connectionControllerClient,
            networkControllerClient
        });
        ChainController.setRequestedCaipNetworks(caipNetworks?.filter((caipNetwork)=>caipNetwork.chainNamespace === adapter.namespace) ?? [], adapter.namespace);
    },
    addNetwork (network) {
        const chainAdapter = state.chains.get(network.chainNamespace);
        if (chainAdapter) {
            const newNetworks = [
                ...chainAdapter.caipNetworks || []
            ];
            if (!chainAdapter.caipNetworks?.find((caipNetwork)=>caipNetwork.id === network.id)) {
                newNetworks.push(network);
            }
            state.chains.set(network.chainNamespace, {
                ...chainAdapter,
                caipNetworks: newNetworks
            });
            ChainController.setRequestedCaipNetworks(newNetworks, network.chainNamespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].filterByNamespace(network.chainNamespace, true);
        }
    },
    removeNetwork (namespace, networkId) {
        const chainAdapter = state.chains.get(namespace);
        if (chainAdapter) {
            // Check if network being removed is active network
            const isActiveNetwork = state.activeCaipNetwork?.id === networkId;
            // Filter out the network being removed
            const newCaipNetworksOfAdapter = [
                ...chainAdapter.caipNetworks?.filter((network)=>network.id !== networkId) || []
            ];
            // If active network was removed and there are other networks available, switch to first one
            if (isActiveNetwork && chainAdapter?.caipNetworks?.[0]) {
                ChainController.setActiveCaipNetwork(chainAdapter.caipNetworks[0]);
            }
            state.chains.set(namespace, {
                ...chainAdapter,
                caipNetworks: newCaipNetworksOfAdapter
            });
            ChainController.setRequestedCaipNetworks(newCaipNetworksOfAdapter || [], namespace);
            if (newCaipNetworksOfAdapter.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].filterByNamespace(namespace, false);
            }
        }
    },
    setAdapterNetworkState (chain, props) {
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            chainAdapter.networkState = {
                ...chainAdapter.networkState || networkState,
                ...props
            };
            state.chains.set(chain, chainAdapter);
        }
    },
    setChainAccountData (chain, accountProps, _unknown = true) {
        if (!chain) {
            throw new Error('Chain is required to update chain account data');
        }
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            const newAccountState = {
                ...chainAdapter.accountState || defaultAccountState,
                ...accountProps
            };
            state.chains.set(chain, {
                ...chainAdapter,
                accountState: newAccountState
            });
            if (state.chains.size === 1 || state.activeChain === chain) {
                if (accountProps.caipAddress) {
                    state.activeCaipAddress = accountProps.caipAddress;
                }
            }
        }
    },
    setChainNetworkData (chain, networkProps) {
        if (!chain) {
            return;
        }
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            const newNetworkState = {
                ...chainAdapter.networkState || networkState,
                ...networkProps
            };
            state.chains.set(chain, {
                ...chainAdapter,
                networkState: newNetworkState
            });
        }
    },
    // eslint-disable-next-line max-params
    setAccountProp (prop, value, chain, replaceState = true) {
        ChainController.setChainAccountData(chain, {
            [prop]: value
        }, replaceState);
    },
    setActiveNamespace (chain) {
        state.activeChain = chain;
        const newAdapter = chain ? state.chains.get(chain) : undefined;
        const caipNetwork = newAdapter?.networkState?.caipNetwork;
        if (caipNetwork?.id && chain) {
            state.activeCaipAddress = newAdapter?.accountState?.caipAddress;
            state.activeCaipNetwork = caipNetwork;
            ChainController.setChainNetworkData(chain, {
                caipNetwork
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setActiveCaipNetworkId(caipNetwork?.caipNetworkId);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
                activeChain: chain,
                selectedNetworkId: caipNetwork?.caipNetworkId
            });
        }
    },
    setActiveCaipNetwork (caipNetwork) {
        if (!caipNetwork) {
            return;
        }
        const isSameNamespace = state.activeChain === caipNetwork.chainNamespace;
        if (!isSameNamespace) {
            ChainController.setIsSwitchingNamespace(true);
        }
        const newAdapter = state.chains.get(caipNetwork.chainNamespace);
        state.activeChain = caipNetwork.chainNamespace;
        state.activeCaipNetwork = caipNetwork;
        ChainController.setChainNetworkData(caipNetwork.chainNamespace, {
            caipNetwork
        });
        let address = newAdapter?.accountState?.address;
        if (address) {
            state.activeCaipAddress = `${caipNetwork.chainNamespace}:${caipNetwork.id}:${address}`;
        } else if (isSameNamespace && state.activeCaipAddress) {
            const { address: parsedAddress } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(state.activeCaipAddress);
            address = parsedAddress;
            state.activeCaipAddress = `${caipNetwork.caipNetworkId}:${address}`;
        } else {
            state.activeCaipAddress = undefined;
        }
        ChainController.setChainAccountData(caipNetwork.chainNamespace, {
            address,
            caipAddress: state.activeCaipAddress
        });
        // Reset send state when switching networks
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SendController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendController"].resetSend();
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            activeChain: state.activeChain,
            selectedNetworkId: state.activeCaipNetwork?.caipNetworkId
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setActiveCaipNetworkId(caipNetwork.caipNetworkId);
        const isSupported = ChainController.checkIfSupportedNetwork(caipNetwork.chainNamespace);
        if (!isSupported && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableNetworkSwitch && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.allowUnsupportedChain && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].state.wcBasic) {
            ChainController.showUnsupportedChainUI();
        }
    },
    addCaipNetwork (caipNetwork) {
        if (!caipNetwork) {
            return;
        }
        const chain = state.chains.get(caipNetwork.chainNamespace);
        if (chain) {
            chain?.caipNetworks?.push(caipNetwork);
        }
    },
    async switchActiveNamespace (namespace) {
        if (!namespace) {
            return;
        }
        const isDifferentChain = namespace !== ChainController.state.activeChain;
        const caipNetworkOfNamespace = ChainController.getNetworkData(namespace)?.caipNetwork;
        const firstNetworkWithChain = ChainController.getCaipNetworkByNamespace(namespace, caipNetworkOfNamespace?.id);
        if (isDifferentChain && firstNetworkWithChain) {
            await ChainController.switchActiveNetwork(firstNetworkWithChain);
        }
    },
    async switchActiveNetwork (network, { throwOnFailure = false } = {}) {
        const namespace = ChainController.state.activeChain;
        if (!namespace) {
            throw new Error('ChainController:switchActiveNetwork - namespace is required');
        }
        const activeAdapter = ChainController.state.chains.get(namespace);
        const unsupportedNetwork = !activeAdapter?.caipNetworks?.some((caipNetwork)=>caipNetwork.id === state.activeCaipNetwork?.id);
        const networkControllerClient = ChainController.getNetworkControllerClient(network.chainNamespace);
        if (networkControllerClient) {
            try {
                await networkControllerClient.switchCaipNetwork(network);
                if (unsupportedNetwork) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                }
            } catch (error) {
                if (throwOnFailure) {
                    throw error;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SWITCH_NETWORK',
                properties: {
                    network: network.caipNetworkId
                }
            });
        }
    },
    getNetworkControllerClient (chainNamespace) {
        const chain = chainNamespace || state.activeChain;
        if (!chain) {
            throw new Error('ChainController:getNetworkControllerClient - chain is required');
        }
        const chainAdapter = state.chains.get(chain);
        if (!chainAdapter) {
            throw new Error('Chain adapter not found');
        }
        if (!chainAdapter.networkControllerClient) {
            throw new Error('NetworkController client not set');
        }
        return chainAdapter.networkControllerClient;
    },
    getConnectionControllerClient (_chain) {
        const chain = _chain || state.activeChain;
        if (!chain) {
            throw new Error('Chain is required to get connection controller client');
        }
        const chainAdapter = state.chains.get(chain);
        if (!chainAdapter?.connectionControllerClient) {
            throw new Error('ConnectionController client not set');
        }
        return chainAdapter.connectionControllerClient;
    },
    getNetworkProp (key, namespace) {
        const chainNetworkState = state.chains.get(namespace)?.networkState;
        if (!chainNetworkState) {
            return undefined;
        }
        return chainNetworkState[key];
    },
    getRequestedCaipNetworks (chainToFilter) {
        const adapter = state.chains.get(chainToFilter);
        const { approvedCaipNetworkIds = [], requestedCaipNetworks = [] } = adapter?.networkState || {};
        const sortedNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
        const filteredNetworks = sortedNetworks.filter((network)=>network?.id);
        return filteredNetworks;
    },
    getAllRequestedCaipNetworks () {
        const requestedCaipNetworks = [];
        state.chains.forEach((chainAdapter)=>{
            if (!chainAdapter.namespace) {
                throw new Error('ChainController:getAllRequestedCaipNetworks - chainAdapter must have a namespace');
            }
            const caipNetworks = ChainController.getRequestedCaipNetworks(chainAdapter.namespace);
            requestedCaipNetworks.push(...caipNetworks);
        });
        return requestedCaipNetworks;
    },
    setRequestedCaipNetworks (caipNetworks, chain) {
        ChainController.setAdapterNetworkState(chain, {
            requestedCaipNetworks: caipNetworks
        });
        const allRequestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
        const namespaces = allRequestedCaipNetworks.map((network)=>network.chainNamespace);
        const uniqueNamespaces = Array.from(new Set(namespaces));
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].filterByNamespaces(uniqueNamespaces);
    },
    getAllApprovedCaipNetworkIds () {
        const approvedCaipNetworkIds = [];
        state.chains.forEach((chainAdapter)=>{
            if (!chainAdapter.namespace) {
                throw new Error('ChainController:getAllApprovedCaipNetworkIds - chainAdapter must have a namespace');
            }
            const approvedIds = ChainController.getApprovedCaipNetworkIds(chainAdapter.namespace);
            approvedCaipNetworkIds.push(...approvedIds);
        });
        return approvedCaipNetworkIds;
    },
    getActiveCaipNetwork (chainNamespace) {
        if (chainNamespace) {
            return state.chains.get(chainNamespace)?.networkState?.caipNetwork;
        }
        return state.activeCaipNetwork;
    },
    getActiveCaipAddress () {
        return state.activeCaipAddress;
    },
    getApprovedCaipNetworkIds (namespace) {
        const adapter = state.chains.get(namespace);
        const approvedCaipNetworkIds = adapter?.networkState?.approvedCaipNetworkIds || [];
        return approvedCaipNetworkIds;
    },
    async setApprovedCaipNetworksData (namespace) {
        const networkControllerClient = ChainController.getNetworkControllerClient();
        const data = await networkControllerClient?.getApprovedCaipNetworksData();
        ChainController.setAdapterNetworkState(namespace, {
            approvedCaipNetworkIds: data?.approvedCaipNetworkIds,
            supportsAllNetworks: data?.supportsAllNetworks
        });
    },
    checkIfSupportedNetwork (namespace, caipNetworkId) {
        const activeCaipNetworkId = caipNetworkId || state.activeCaipNetwork?.caipNetworkId;
        const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(namespace);
        if (!requestedCaipNetworks.length) {
            return true;
        }
        return requestedCaipNetworks?.some((network)=>network.caipNetworkId === activeCaipNetworkId);
    },
    checkIfSupportedChainId (chainId) {
        if (!state.activeChain) {
            return true;
        }
        const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(state.activeChain);
        return requestedCaipNetworks?.some((network)=>network.id === chainId);
    },
    // Smart Account Network Handlers
    setSmartAccountEnabledNetworks (smartAccountEnabledNetworks, chain) {
        ChainController.setAdapterNetworkState(chain, {
            smartAccountEnabledNetworks
        });
    },
    checkIfSmartAccountEnabled () {
        const networkId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].caipNetworkIdToNumber(state.activeCaipNetwork?.caipNetworkId);
        const activeChain = state.activeChain;
        if (!activeChain || !networkId) {
            return false;
        }
        const smartAccountEnabledNetworks = ChainController.getNetworkProp('smartAccountEnabledNetworks', activeChain);
        return Boolean(smartAccountEnabledNetworks?.includes(Number(networkId)));
    },
    showUnsupportedChainUI () {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
            view: 'UnsupportedChain'
        });
    },
    checkIfNamesSupported () {
        const activeCaipNetwork = state.activeCaipNetwork;
        return Boolean(activeCaipNetwork?.chainNamespace && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(activeCaipNetwork.chainNamespace));
    },
    resetNetwork (namespace) {
        ChainController.setAdapterNetworkState(namespace, {
            approvedCaipNetworkIds: undefined,
            supportsAllNetworks: true
        });
    },
    resetAccount (chain) {
        const chainToWrite = chain;
        if (!chainToWrite) {
            throw new Error('Chain is required to set account prop');
        }
        const currentAccountType = ChainController.state.chains.get(chainToWrite)?.accountState?.preferredAccountType;
        const optionsAccountType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.defaultAccountTypes[chainToWrite];
        state.activeCaipAddress = undefined;
        ChainController.setChainAccountData(chainToWrite, {
            smartAccountDeployed: false,
            currentTab: 0,
            caipAddress: undefined,
            address: undefined,
            balance: undefined,
            balanceSymbol: undefined,
            profileName: undefined,
            profileImage: undefined,
            addressExplorerUrl: undefined,
            tokenBalance: [],
            connectedWalletInfo: undefined,
            preferredAccountType: optionsAccountType || currentAccountType,
            socialProvider: undefined,
            socialWindow: undefined,
            farcasterUrl: undefined,
            user: undefined,
            status: 'disconnected'
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].removeConnectorId(chainToWrite);
    },
    setIsSwitchingNamespace (isSwitchingNamespace) {
        state.isSwitchingNamespace = isSwitchingNamespace;
    },
    getFirstCaipNetworkSupportsAuthConnector () {
        const availableChains = [];
        let firstCaipNetwork = undefined;
        state.chains.forEach((chain)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS.find((ns)=>ns === chain.namespace)) {
                if (chain.namespace) {
                    availableChains.push(chain.namespace);
                }
            }
        });
        if (availableChains.length > 0) {
            const firstAvailableChain = availableChains[0];
            firstCaipNetwork = firstAvailableChain ? state.chains.get(firstAvailableChain)?.caipNetworks?.[0] : undefined;
            return firstCaipNetwork;
        }
        return undefined;
    },
    getAccountData (chainNamespace) {
        const namespace = chainNamespace || state.activeChain;
        if (!namespace) {
            return undefined;
        }
        return ChainController.state.chains.get(namespace)?.accountState;
    },
    getNetworkData (chainNamespace) {
        const namespace = chainNamespace || state.activeChain;
        if (!namespace) {
            return undefined;
        }
        return ChainController.state.chains.get(namespace)?.networkState;
    },
    getCaipNetworkByNamespace (chainNamespace, chainId) {
        if (!chainNamespace) {
            return undefined;
        }
        const chain = ChainController.state.chains.get(chainNamespace);
        const byChainId = chain?.caipNetworks?.find((network)=>network.id === chainId);
        if (byChainId) {
            return byChainId;
        }
        return chain?.networkState?.caipNetwork || chain?.caipNetworks?.[0];
    },
    /**
     * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
     * @param namespace - The namespace to get the requested CaipNetwork IDs for
     * @returns The requested CaipNetwork IDs
     */ getRequestedCaipNetworkIds () {
        const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state.filterByNamespace;
        const chains = namespace ? [
            state.chains.get(namespace)
        ] : Array.from(state.chains.values());
        return chains.flatMap((chain)=>chain?.caipNetworks || []).map((caipNetwork)=>caipNetwork.caipNetworkId);
    },
    getCaipNetworks (namespace) {
        if (namespace) {
            return ChainController.getRequestedCaipNetworks(namespace);
        }
        return ChainController.getAllRequestedCaipNetworks();
    },
    getCaipNetworkById (id, namespace) {
        return controller.getCaipNetworks(namespace).find((n)=>n.id.toString() === id.toString() || n.caipNetworkId.toString() === id.toString());
    },
    setLastConnectedSIWECaipNetwork (network) {
        state.lastConnectedSIWECaipNetwork = network;
    },
    getLastConnectedSIWECaipNetwork () {
        return state.lastConnectedSIWECaipNetwork;
    },
    async fetchTokenBalance (onError) {
        const accountState = ChainController.getAccountData();
        if (!accountState) {
            return [];
        }
        const chainId = ChainController.state.activeCaipNetwork?.caipNetworkId;
        const chain = ChainController.state.activeCaipNetwork?.chainNamespace;
        const caipAddress = ChainController.state.activeCaipAddress;
        const address = caipAddress ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress) : undefined;
        ChainController.setAccountProp('balanceLoading', true, chain);
        if (accountState.lastRetry && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isAllowedRetry(accountState.lastRetry, 30 * __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ONE_SEC_MS)) {
            ChainController.setAccountProp('balanceLoading', false, chain);
            return [];
        }
        try {
            if (address && chainId && chain) {
                const balance = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$BalanceUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BalanceUtil"].getMyTokensWithBalance();
                ChainController.setAccountProp('tokenBalance', balance, chain);
                ChainController.setAccountProp('lastRetry', undefined, chain);
                ChainController.setAccountProp('balanceLoading', false, chain);
                return balance;
            }
        } catch (error) {
            ChainController.setAccountProp('lastRetry', Date.now(), chain);
            onError?.(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Token Balance Unavailable');
        } finally{
            ChainController.setAccountProp('balanceLoading', false, chain);
        }
        return [];
    },
    isCaipNetworkDisabled (network) {
        const networkNamespace = network.chainNamespace;
        const isNextNamespaceConnected = Boolean(ChainController.getAccountData(networkNamespace)?.caipAddress);
        const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
        const shouldSupportAllNetworks = ChainController.getNetworkProp('supportsAllNetworks', networkNamespace) !== false;
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(networkNamespace);
        const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
        const isConnectedWithAuth = connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH && authConnector;
        if (!isNextNamespaceConnected || shouldSupportAllNetworks || isConnectedWithAuth) {
            return false;
        }
        return !approvedCaipNetworkIds?.includes(network.caipNetworkId);
    }
};
const ChainController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=ChainController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertController",
    ()=>AlertController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    message: '',
    variant: 'info',
    open: false
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    open (message, variant) {
        const { debug } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const { code, displayMessage, debugMessage } = message;
        if (displayMessage && debug) {
            state.message = displayMessage;
            state.variant = variant;
            state.open = true;
        }
        if (debugMessage) {
            // eslint-disable-next-line no-console
            console.error(typeof debugMessage === 'function' ? debugMessage() : debugMessage, code ? {
                code
            } : undefined);
        }
    },
    warn (title, description, code) {
        state.open = true;
        state.message = title;
        state.variant = 'warning';
        if (description) {
            console.warn(description, code);
        }
    },
    close () {
        state.open = false;
        state.message = '';
        state.variant = 'info';
    }
};
const AlertController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=AlertController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/EnsUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnsUtil",
    ()=>EnsUtil
]);
const SLIP44_MSB = 0x80000000;
const EnsUtil = {
    convertEVMChainIdToCoinType (chainId) {
        if (chainId >= SLIP44_MSB) {
            throw new Error('Invalid chainId');
        }
        return (SLIP44_MSB | chainId) >>> 0;
    }
}; //# sourceMappingURL=EnsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnsController",
    ()=>EnsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$EnsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/EnsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    suggestions: [],
    loading: false
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    async resolveName (name) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].lookupEnsName(name);
        } catch (e) {
            const error = e;
            throw new Error(error?.reasons?.[0]?.description || 'Error resolving name');
        }
    },
    async isNameRegistered (name) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].lookupEnsName(name);
            return true;
        } catch  {
            return false;
        }
    },
    async getSuggestions (value) {
        try {
            state.loading = true;
            state.suggestions = [];
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getEnsNameSuggestions(value);
            state.suggestions = response.suggestions || [];
            return state.suggestions;
        } catch (e) {
            const errorMessage = EnsController.parseEnsApiError(e, 'Error fetching name suggestions');
            throw new Error(errorMessage);
        } finally{
            state.loading = false;
        }
    },
    async getNamesForAddress (address) {
        try {
            const network = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
            if (!network) {
                return [];
            }
            const cachedEns = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getEnsFromCacheForAddress(address);
            if (cachedEns) {
                return cachedEns;
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].reverseLookupEnsName({
                address
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateEnsCache({
                address,
                ens: response,
                timestamp: Date.now()
            });
            return response;
        } catch (e) {
            const errorMessage = EnsController.parseEnsApiError(e, 'Error fetching names for address');
            throw new Error(errorMessage);
        }
    },
    async registerName (name) {
        const network = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(network?.chainNamespace)?.address;
        const emailConnector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
        if (!network) {
            throw new Error('Network not found');
        }
        if (!address || !emailConnector) {
            throw new Error('Address or auth connector not found');
        }
        state.loading = true;
        try {
            const message = JSON.stringify({
                name,
                attributes: {},
                // Unix timestamp
                timestamp: Math.floor(Date.now() / 1000)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
                onCancel () {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('RegisterAccountName');
                }
            });
            const signature = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].signMessage(message);
            state.loading = false;
            const networkId = network.id;
            if (!networkId) {
                throw new Error('Network not found');
            }
            const coinType = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$EnsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnsUtil"].convertEVMChainIdToCoinType(Number(networkId));
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].registerEnsName({
                coinType,
                address: address,
                signature: signature,
                message
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('profileName', name, network.chainNamespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].updateEnsCache({
                address,
                ens: [
                    {
                        name,
                        registered_at: new Date().toISOString(),
                        updated_at: undefined,
                        addresses: {},
                        attributes: []
                    }
                ],
                timestamp: Date.now()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('RegisterAccountNameSuccess');
        } catch (e) {
            const errorMessage = EnsController.parseEnsApiError(e, `Error registering name ${name}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('RegisterAccountName');
            throw new Error(errorMessage);
        } finally{
            state.loading = false;
        }
    },
    validateName (name) {
        return /^[a-zA-Z0-9-]{4,}$/u.test(name);
    },
    parseEnsApiError (error, defaultError) {
        const ensError = error;
        return ensError?.reasons?.[0]?.description || defaultError;
    }
};
const EnsController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=EnsController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OnRampController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnRampController",
    ()=>OnRampController,
    "USDC_CURRENCY_DEFAULT",
    ()=>USDC_CURRENCY_DEFAULT,
    "USD_CURRENCY_DEFAULT",
    ()=>USD_CURRENCY_DEFAULT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/withErrorBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const USDC_CURRENCY_DEFAULT = {
    id: '2b92315d-eab7-5bef-84fa-089a131333f5',
    name: 'USD Coin',
    symbol: 'USDC',
    networks: [
        {
            name: 'ethereum-mainnet',
            display_name: 'Ethereum',
            chain_id: '1',
            contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        },
        {
            name: 'polygon-mainnet',
            display_name: 'Polygon',
            chain_id: '137',
            contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        }
    ]
};
const USD_CURRENCY_DEFAULT = {
    id: 'USD',
    payment_method_limits: [
        {
            id: 'card',
            min: '10.00',
            max: '7500.00'
        },
        {
            id: 'ach_bank_account',
            min: '10.00',
            max: '25000.00'
        }
    ]
};
const defaultState = {
    providers: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONRAMP_PROVIDERS"],
    selectedProvider: null,
    error: null,
    purchaseCurrency: USDC_CURRENCY_DEFAULT,
    paymentCurrency: USD_CURRENCY_DEFAULT,
    purchaseCurrencies: [
        USDC_CURRENCY_DEFAULT
    ],
    paymentCurrencies: [],
    quotesLoading: false
};
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])(defaultState);
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    setSelectedProvider (provider) {
        if (provider && provider.name === 'meld') {
            const activeChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
            const currency = activeChain === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA ? 'SOL' : 'USDC';
            const address = activeChain ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.get(activeChain)?.accountState?.address ?? '' : '';
            const url = new URL(provider.url);
            url.searchParams.append('publicKey', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MELD_PUBLIC_KEY"]);
            url.searchParams.append('destinationCurrencyCode', currency);
            url.searchParams.append('walletAddress', address);
            url.searchParams.append('externalCustomerId', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId);
            state.selectedProvider = {
                ...provider,
                url: url.toString()
            };
        } else {
            state.selectedProvider = provider;
        }
    },
    setOnrampProviders (providers) {
        if (Array.isArray(providers) && providers.every((item)=>typeof item === 'string')) {
            const validOnramp = providers;
            const newProviders = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONRAMP_PROVIDERS"].filter((provider)=>validOnramp.includes(provider.name));
            state.providers = newProviders;
        } else {
            state.providers = [];
        }
    },
    setPurchaseCurrency (currency) {
        state.purchaseCurrency = currency;
    },
    setPaymentCurrency (currency) {
        state.paymentCurrency = currency;
    },
    setPurchaseAmount (amount) {
        OnRampController.state.purchaseAmount = amount;
    },
    setPaymentAmount (amount) {
        OnRampController.state.paymentAmount = amount;
    },
    async getAvailableCurrencies () {
        const options = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getOnrampOptions();
        state.purchaseCurrencies = options.purchaseCurrencies;
        state.paymentCurrencies = options.paymentCurrencies;
        state.paymentCurrency = options.paymentCurrencies[0] || USD_CURRENCY_DEFAULT;
        state.purchaseCurrency = options.purchaseCurrencies[0] || USDC_CURRENCY_DEFAULT;
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchCurrencyImages(options.paymentCurrencies.map((currency)=>currency.id));
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchTokenImages(options.purchaseCurrencies.map((currency)=>currency.symbol));
    },
    async getQuote () {
        state.quotesLoading = true;
        try {
            const quote = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getOnrampQuote({
                purchaseCurrency: state.purchaseCurrency,
                paymentCurrency: state.paymentCurrency,
                amount: state.paymentAmount?.toString() || '0',
                network: state.purchaseCurrency?.symbol
            });
            state.quotesLoading = false;
            state.purchaseAmount = Number(quote?.purchaseAmount.amount);
            return quote;
        } catch (error) {
            state.error = error.message;
            state.quotesLoading = false;
            return null;
        } finally{
            state.quotesLoading = false;
        }
    },
    resetState () {
        state.selectedProvider = null;
        state.error = null;
        state.purchaseCurrency = USDC_CURRENCY_DEFAULT;
        state.paymentCurrency = USD_CURRENCY_DEFAULT;
        state.purchaseCurrencies = [
            USDC_CURRENCY_DEFAULT
        ];
        state.paymentCurrencies = [];
        state.paymentAmount = undefined;
        state.purchaseAmount = undefined;
        state.quotesLoading = false;
    }
};
const OnRampController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$withErrorBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"])(controller); //# sourceMappingURL=OnRampController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ProviderController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProviderController",
    ()=>ProviderController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)");
;
;
const CLEAN_PROVIDERS_STATE = {
    eip155: undefined,
    solana: undefined,
    polkadot: undefined,
    bip122: undefined,
    cosmos: undefined,
    sui: undefined,
    stacks: undefined
};
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    providers: {
        ...CLEAN_PROVIDERS_STATE
    },
    providerIds: {
        ...CLEAN_PROVIDERS_STATE
    }
});
const ProviderController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKey"])(state, key, callback);
    },
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>{
            callback(state);
        });
    },
    subscribeProviders (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state.providers, ()=>callback(state.providers));
    },
    setProvider (chainNamespace, provider) {
        if (chainNamespace && provider) {
            state.providers[chainNamespace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(provider);
        }
    },
    getProvider (chainNamespace) {
        if (!chainNamespace) {
            return undefined;
        }
        return state.providers[chainNamespace];
    },
    setProviderId (chainNamespace, providerId) {
        if (providerId) {
            state.providerIds[chainNamespace] = providerId;
        }
    },
    getProviderId (chainNamespace) {
        if (!chainNamespace) {
            return undefined;
        }
        return state.providerIds[chainNamespace];
    },
    reset () {
        state.providers = {
            ...CLEAN_PROVIDERS_STATE
        };
        state.providerIds = {
            ...CLEAN_PROVIDERS_STATE
        };
    },
    resetChain (chainNamespace) {
        state.providers[chainNamespace] = undefined;
        state.providerIds[chainNamespace] = undefined;
    }
}; //# sourceMappingURL=ProviderController.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SIWXUtil",
    ()=>SIWXUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * SIWXUtil holds the methods to interact with the SIWX plugin and must be called internally on AppKit.
 */ let addEmbeddedWalletSessionPromise = null;
const SIWXUtil = {
    getSIWX () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
    },
    async initializeIfEnabled (caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress()) {
        const siwx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
        if (!(siwx && caipAddress)) {
            return;
        }
        const [namespace, chainId, address] = caipAddress.split(':');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].checkIfSupportedNetwork(namespace, `${namespace}:${chainId}`)) {
            return;
        }
        try {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.emailCapture) {
                const user = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData(namespace)?.user;
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                    view: 'DataCapture',
                    data: {
                        email: user?.email ?? undefined
                    }
                });
                return;
            }
            if (addEmbeddedWalletSessionPromise) {
                await addEmbeddedWalletSessionPromise;
            }
            const sessions = await siwx.getSessions(`${namespace}:${chainId}`, address);
            if (sessions.length) {
                return;
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                view: 'SIWXSignMessage'
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('SIWXUtil:initializeIfEnabled', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_ERROR',
                properties: this.getSIWXEventProperties(error)
            });
            // eslint-disable-next-line no-console
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]._getClient()?.disconnect().catch(console.error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Connect');
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('A problem occurred while trying initialize authentication');
        }
    },
    async requestSignMessage () {
        const siwx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress());
        const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])();
        const client = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]._getClient();
        if (!siwx) {
            throw new Error('SIWX is not enabled');
        }
        if (!address) {
            throw new Error('No ActiveCaipAddress found');
        }
        if (!network) {
            throw new Error('No ActiveCaipNetwork or client found');
        }
        if (!client) {
            throw new Error('No ConnectionController client found');
        }
        try {
            const siwxMessage = await siwx.createMessage({
                chainId: network.caipNetworkId,
                accountAddress: address
            });
            const message = siwxMessage.toString();
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(network.chainNamespace);
            if (connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({});
            }
            const signature = await client.signMessage(message);
            await siwx.addSession({
                data: siwxMessage,
                message,
                signature
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setLastConnectedSIWECaipNetwork(network);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_SUCCESS',
                properties: this.getSIWXEventProperties()
            });
        } catch (error) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'ApproveTransaction') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                    view: 'SIWXSignMessage'
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Error signing message');
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_ERROR',
                properties: this.getSIWXEventProperties(error)
            });
            // eslint-disable-next-line no-console
            console.error('SWIXUtil:requestSignMessage', error);
        }
    },
    async cancelSignMessage () {
        try {
            const siwx = this.getSIWX();
            const isRequired = siwx?.getRequired?.();
            if (isRequired) {
                const lastNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getLastConnectedSIWECaipNetwork();
                if (lastNetwork) {
                    const sessions = await siwx?.getSessions(lastNetwork?.caipNetworkId, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress()) || '');
                    if (sessions && sessions.length > 0) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].switchActiveNetwork(lastNetwork);
                    } else {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect();
                    }
                } else {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect();
                }
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                event: 'CLICK_CANCEL_SIWX',
                type: 'track',
                properties: this.getSIWXEventProperties()
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('SIWXUtil:cancelSignMessage', error);
        }
    },
    async getAllSessions () {
        const siwx = this.getSIWX();
        const allRequestedCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        const sessions = [];
        await Promise.all(allRequestedCaipNetworks.map(async (caipNetwork)=>{
            const session = await siwx?.getSessions(caipNetwork.caipNetworkId, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress()) || '');
            if (session) {
                sessions.push(...session);
            }
        }));
        return sessions;
    },
    async getSessions (args) {
        const siwx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
        let address = args?.address;
        if (!address) {
            const activeCaipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress();
            address = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(activeCaipAddress);
        }
        let network = args?.caipNetworkId;
        if (!network) {
            const activeCaipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork();
            network = activeCaipNetwork?.caipNetworkId;
        }
        if (!(siwx && address && network)) {
            return [];
        }
        return siwx.getSessions(network, address);
    },
    async isSIWXCloseDisabled () {
        const siwx = this.getSIWX();
        if (siwx) {
            const isApproveSignScreen = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'ApproveTransaction';
            const isSiwxSignMessage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'SIWXSignMessage';
            if (isApproveSignScreen || isSiwxSignMessage) {
                return siwx.getRequired?.() && (await this.getSessions()).length === 0;
            }
        }
        return false;
    },
    async authConnectorAuthenticate ({ authConnector, chainId, socialUri, preferredAccountType, chainNamespace }) {
        const siwx = SIWXUtil.getSIWX();
        const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])();
        if (!siwx || !chainNamespace.includes(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) || // Request to input email and sign message when email capture is enabled
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.remoteFeatures?.emailCapture) {
            const result = await authConnector.connect({
                chainId,
                socialUri,
                preferredAccountType
            });
            return {
                address: result.address,
                chainId: result.chainId,
                accounts: result.accounts
            };
        }
        const caipNetwork = `${chainNamespace}:${chainId}`;
        const siwxMessage = await siwx.createMessage({
            chainId: caipNetwork,
            accountAddress: '<<AccountAddress>>'
        });
        // Extract only the serializable data properties for postMessage, toString() is not possible to include in the postMessage
        const siwxMessageData = {
            accountAddress: siwxMessage.accountAddress,
            chainId: siwxMessage.chainId,
            domain: siwxMessage.domain,
            uri: siwxMessage.uri,
            version: siwxMessage.version,
            nonce: siwxMessage.nonce,
            notBefore: siwxMessage.notBefore,
            statement: siwxMessage.statement,
            resources: siwxMessage.resources,
            requestId: siwxMessage.requestId,
            issuedAt: siwxMessage.issuedAt,
            expirationTime: siwxMessage.expirationTime,
            serializedMessage: siwxMessage.toString()
        };
        const result = await authConnector.connect({
            chainId,
            socialUri,
            siwxMessage: siwxMessageData,
            preferredAccountType
        });
        siwxMessageData.accountAddress = result.address;
        siwxMessageData.serializedMessage = result.message || '';
        if (result.signature && result.message) {
            const promise = SIWXUtil.addEmbeddedWalletSession(siwxMessageData, result.message, result.signature);
            await promise;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setLastConnectedSIWECaipNetwork(network);
        return {
            address: result.address,
            chainId: result.chainId,
            accounts: result.accounts
        };
    },
    async addEmbeddedWalletSession (siwxMessageData, message, signature) {
        if (addEmbeddedWalletSessionPromise) {
            return addEmbeddedWalletSessionPromise;
        }
        const siwx = SIWXUtil.getSIWX();
        if (!siwx) {
            return Promise.resolve();
        }
        addEmbeddedWalletSessionPromise = siwx.addSession({
            data: siwxMessageData,
            message,
            signature
        }).finally(()=>{
            addEmbeddedWalletSessionPromise = null;
        });
        return addEmbeddedWalletSessionPromise;
    },
    async universalProviderAuthenticate ({ universalProvider, chains, methods }) {
        const siwx = SIWXUtil.getSIWX();
        const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])();
        const namespaces = new Set(chains.map((chain)=>chain.split(':')[0]));
        if (!siwx || namespaces.size !== 1 || !namespaces.has('eip155')) {
            return false;
        }
        // Ignores chainId and account address to get other message data
        const siwxMessage = await siwx.createMessage({
            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])()?.caipNetworkId || '',
            accountAddress: ''
        });
        const result = await universalProvider.authenticate({
            nonce: siwxMessage.nonce,
            domain: siwxMessage.domain,
            uri: siwxMessage.uri,
            exp: siwxMessage.expirationTime,
            iat: siwxMessage.issuedAt,
            nbf: siwxMessage.notBefore,
            requestId: siwxMessage.requestId,
            version: siwxMessage.version,
            resources: siwxMessage.resources,
            statement: siwxMessage.statement,
            chainId: siwxMessage.chainId,
            methods,
            // The first chainId is what is used for universal provider to build the message
            chains: [
                siwxMessage.chainId,
                ...chains.filter((chain)=>chain !== siwxMessage.chainId)
            ]
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showLoading('Authenticating...', {
            autoClose: false
        });
        const walletInfo = {
            ...result.session.peer.metadata,
            name: result.session.peer.metadata.name,
            icon: result.session.peer.metadata.icons?.[0],
            type: 'WALLET_CONNECT'
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('connectedWalletInfo', walletInfo, Array.from(namespaces)[0]);
        if (result?.auths?.length) {
            const sessions = result.auths.map((cacao)=>{
                const message = universalProvider.client.formatAuthMessage({
                    request: cacao.p,
                    iss: cacao.p.iss
                });
                return {
                    data: {
                        ...cacao.p,
                        accountAddress: cacao.p.iss.split(':').slice(-1).join(''),
                        chainId: cacao.p.iss.split(':').slice(2, 4).join(':'),
                        uri: cacao.p.aud,
                        version: cacao.p.version || siwxMessage.version,
                        expirationTime: cacao.p.exp,
                        issuedAt: cacao.p.iat,
                        notBefore: cacao.p.nbf
                    },
                    message,
                    signature: cacao.s.s,
                    cacao
                };
            });
            try {
                await siwx.setSessions(sessions);
                if (network) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setLastConnectedSIWECaipNetwork(network);
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                    type: 'track',
                    event: 'SIWX_AUTH_SUCCESS',
                    properties: SIWXUtil.getSIWXEventProperties()
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('SIWX:universalProviderAuth - failed to set sessions', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                    type: 'track',
                    event: 'SIWX_AUTH_ERROR',
                    properties: SIWXUtil.getSIWXEventProperties(error)
                });
                // eslint-disable-next-line no-console
                await universalProvider.disconnect().catch(console.error);
                throw error;
            } finally{
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].hide();
            }
        }
        return true;
    },
    getSIWXEventProperties (error) {
        const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        if (!namespace) {
            throw new Error('SIWXUtil:getSIWXEventProperties - namespace is required');
        }
        return {
            network: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
            isSmartAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferredAccountType"])(namespace) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
            message: error ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].parseError(error) : undefined
        };
    },
    async clearSessions () {
        const siwx = this.getSIWX();
        if (siwx) {
            await siwx.setSessions([]);
        }
    }
}; //# sourceMappingURL=SIWXUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ExchangeUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assets",
    ()=>assets,
    "baseSepoliaUSDC",
    ()=>baseSepoliaUSDC,
    "baseUSDC",
    ()=>baseUSDC,
    "formatCaip19Asset",
    ()=>formatCaip19Asset,
    "getApiUrl",
    ()=>getApiUrl,
    "getBuyStatus",
    ()=>getBuyStatus,
    "getExchanges",
    ()=>getExchanges,
    "getPayUrl",
    ()=>getPayUrl,
    "getPaymentAssetsForNetwork",
    ()=>getPaymentAssetsForNetwork
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
const CHAIN_ASSET_INFO_MAP = {
    eip155: {
        native: {
            assetNamespace: 'slip44',
            assetReference: '60'
        },
        defaultTokenNamespace: 'erc20'
    },
    solana: {
        native: {
            assetNamespace: 'slip44',
            assetReference: '501'
        },
        defaultTokenNamespace: 'token'
    }
};
class JsonRpcError extends Error {
}
function getApiUrl() {
    const { sdkType, sdkVersion, projectId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].getSnapshot();
    const url = new URL('https://rpc.walletconnect.org/v1/json-rpc');
    url.searchParams.set('projectId', projectId);
    url.searchParams.set('st', sdkType);
    url.searchParams.set('sv', sdkVersion);
    url.searchParams.set('source', 'fund-wallet');
    return url.toString();
}
async function sendRequest(method, params) {
    const url = getApiUrl();
    const { projectId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].getSnapshot();
    const requestBody = {
        jsonrpc: '2.0',
        id: 1,
        method,
        params: {
            ...params || {},
            projectId
        }
    };
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    if (json.error) {
        throw new JsonRpcError(json.error.message);
    }
    return json;
}
async function getExchanges(params) {
    const response = await sendRequest('reown_getExchanges', params);
    return response.result;
}
async function getPayUrl(params) {
    const response = await sendRequest('reown_getExchangePayUrl', params);
    return response.result;
}
async function getBuyStatus(params) {
    const response = await sendRequest('reown_getExchangeBuyStatus', params);
    return response.result;
}
function formatCaip19Asset(caipNetworkId, asset) {
    const { chainNamespace, chainId } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipNetworkId(caipNetworkId);
    const chainInfo = CHAIN_ASSET_INFO_MAP[chainNamespace];
    if (!chainInfo) {
        throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${chainNamespace}`);
    }
    let assetNamespace = chainInfo.native.assetNamespace;
    let assetReference = chainInfo.native.assetReference;
    if (asset !== 'native') {
        assetNamespace = chainInfo.defaultTokenNamespace;
        assetReference = asset;
    }
    const networkPart = `${chainNamespace}:${chainId}`;
    return `${networkPart}/${assetNamespace}:${assetReference}`;
}
// -- Assets ------------------------------------------------------------------ //
const ethereumETH = {
    network: 'eip155:1',
    asset: 'native',
    metadata: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }
};
const baseETH = {
    network: 'eip155:8453',
    asset: 'native',
    metadata: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }
};
const baseUSDC = {
    network: 'eip155:8453',
    asset: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const baseSepoliaUSDC = {
    network: 'eip155:84532',
    asset: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const baseSepoliaETH = {
    network: 'eip155:84532',
    asset: 'native',
    metadata: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }
};
const ethereumUSDC = {
    network: 'eip155:1',
    asset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const arbitrumUSDC = {
    network: 'eip155:42161',
    asset: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const polygonUSDC = {
    network: 'eip155:137',
    asset: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const solanaUSDC = {
    network: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    asset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const ethereumUSDT = {
    network: 'eip155:1',
    asset: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    metadata: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6
    }
};
const optimismUSDT = {
    network: 'eip155:10',
    asset: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    metadata: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6
    }
};
const arbitrumUSDT = {
    network: 'eip155:42161',
    asset: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    metadata: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6
    }
};
const polygonUSDT = {
    network: 'eip155:137',
    asset: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    metadata: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6
    }
};
const solanaUSDT = {
    network: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    asset: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    metadata: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6
    }
};
const solanaSOL = {
    network: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    asset: 'native',
    metadata: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    }
};
const assets = {
    ethereumETH,
    baseETH,
    baseUSDC,
    baseSepoliaETH,
    ethereumUSDC,
    arbitrumUSDC,
    polygonUSDC,
    solanaUSDC,
    ethereumUSDT,
    optimismUSDT,
    arbitrumUSDT,
    polygonUSDT,
    solanaUSDT,
    solanaSOL
};
function getPaymentAssetsForNetwork(network) {
    return Object.values(assets).filter((asset)=>asset.network === network);
} //# sourceMappingURL=ExchangeUtil.js.map
}),
]);

//# sourceMappingURL=1b50e_%40reown_appkit-controllers_dist_esm_src_17d7a16e._.js.map