(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/exports/features.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=features.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConstantsUtil",
    ()=>ConstantsUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const ConstantsUtil = {
    WC_NAME_SUFFIX: '.reown.id',
    WC_NAME_SUFFIX_LEGACY: '.wcn.id',
    BLOCKCHAIN_API_RPC_URL: 'https://rpc.walletconnect.org',
    PULSE_API_URL: 'https://pulse.walletconnect.org',
    W3M_API_URL: 'https://api.web3modal.org',
    CONNECTOR_ID: {
        WALLET_CONNECT: 'walletConnect',
        INJECTED: 'injected',
        WALLET_STANDARD: 'announced',
        COINBASE: 'coinbaseWallet',
        COINBASE_SDK: 'coinbaseWalletSDK',
        SAFE: 'safe',
        LEDGER: 'ledger',
        OKX: 'okx',
        EIP6963: 'eip6963',
        AUTH: 'ID_AUTH'
    },
    CONNECTOR_NAMES: {
        AUTH: 'Auth'
    },
    AUTH_CONNECTOR_SUPPORTED_CHAINS: [
        'eip155',
        'solana'
    ],
    LIMITS: {
        PENDING_TRANSACTIONS: 99
    },
    CHAIN: {
        EVM: 'eip155',
        SOLANA: 'solana',
        POLKADOT: 'polkadot',
        BITCOIN: 'bip122'
    },
    CHAIN_NAME_MAP: {
        eip155: 'EVM Networks',
        solana: 'Solana',
        polkadot: 'Polkadot',
        bip122: 'Bitcoin',
        cosmos: 'Cosmos',
        sui: 'Sui',
        stacks: 'Stacks'
    },
    ADAPTER_TYPES: {
        BITCOIN: 'bitcoin',
        SOLANA: 'solana',
        WAGMI: 'wagmi',
        ETHERS: 'ethers',
        ETHERS5: 'ethers5'
    },
    USDT_CONTRACT_ADDRESSES: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
        '0x919C1c267BC06a7039e03fcc2eF738525769109c',
        '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
        '0x55d398326f99059fF775485246999027B3197955',
        '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
    ],
    SOLANA_SPL_TOKEN_ADDRESSES: {
        SOL: 'So11111111111111111111111111111111111111112'
    },
    HTTP_STATUS_CODES: {
        SERVER_ERROR: 500,
        TOO_MANY_REQUESTS: 429,
        SERVICE_UNAVAILABLE: 503,
        FORBIDDEN: 403
    },
    UNSUPPORTED_NETWORK_NAME: 'Unknown Network',
    SECURE_SITE_SDK_ORIGIN: (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_SECURE_SITE_ORIGIN'] : undefined) || 'https://secure.walletconnect.org',
    REMOTE_FEATURES_ALERTS: {
        MULTI_WALLET_NOT_ENABLED: {
            DEFAULT: {
                displayMessage: 'Multi-Wallet Not Enabled',
                debugMessage: 'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com.'
            },
            CONNECTIONS_HOOK: {
                displayMessage: 'Multi-Wallet Not Enabled',
                debugMessage: 'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnections hook.'
            },
            CONNECTION_HOOK: {
                displayMessage: 'Multi-Wallet Not Enabled',
                debugMessage: 'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnection hook.'
            }
        }
    },
    IS_DEVELOPMENT: typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && ("TURBOPACK compile-time value", "development") === 'development'
}; //# sourceMappingURL=ConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SafeLocalStorage",
    ()=>SafeLocalStorage,
    "SafeLocalStorageKeys",
    ()=>SafeLocalStorageKeys,
    "getSafeConnectorIdKey",
    ()=>getSafeConnectorIdKey,
    "isSafe",
    ()=>isSafe
]);
const SafeLocalStorageKeys = {
    WALLET_ID: '@appkit/wallet_id',
    WALLET_NAME: '@appkit/wallet_name',
    SOLANA_WALLET: '@appkit/solana_wallet',
    SOLANA_CAIP_CHAIN: '@appkit/solana_caip_chain',
    ACTIVE_CAIP_NETWORK_ID: '@appkit/active_caip_network_id',
    CONNECTED_SOCIAL: '@appkit/connected_social',
    CONNECTED_SOCIAL_USERNAME: '@appkit-wallet/SOCIAL_USERNAME',
    RECENT_WALLETS: '@appkit/recent_wallets',
    RECENT_WALLET: '@appkit/recent_wallet',
    DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',
    ACTIVE_NAMESPACE: '@appkit/active_namespace',
    CONNECTED_NAMESPACES: '@appkit/connected_namespaces',
    CONNECTION_STATUS: '@appkit/connection_status',
    SIWX_AUTH_TOKEN: '@appkit/siwx-auth-token',
    SIWX_NONCE_TOKEN: '@appkit/siwx-nonce-token',
    TELEGRAM_SOCIAL_PROVIDER: '@appkit/social_provider',
    NATIVE_BALANCE_CACHE: '@appkit/native_balance_cache',
    PORTFOLIO_CACHE: '@appkit/portfolio_cache',
    ENS_CACHE: '@appkit/ens_cache',
    IDENTITY_CACHE: '@appkit/identity_cache',
    PREFERRED_ACCOUNT_TYPES: '@appkit/preferred_account_types',
    CONNECTIONS: '@appkit/connections',
    DISCONNECTED_CONNECTOR_IDS: '@appkit/disconnected_connector_ids',
    HISTORY_TRANSACTIONS_CACHE: '@appkit/history_transactions_cache',
    TOKEN_PRICE_CACHE: '@appkit/token_price_cache',
    RECENT_EMAILS: '@appkit/recent_emails',
    LATEST_APPKIT_VERSION: '@appkit/latest_version'
};
function getSafeConnectorIdKey(namespace) {
    if (!namespace) {
        throw new Error('Namespace is required for CONNECTED_CONNECTOR_ID');
    }
    return `@appkit/${namespace}:connected_connector_id`;
}
const SafeLocalStorage = {
    setItem (key, value) {
        if (isSafe() && value !== undefined) {
            localStorage.setItem(key, value);
        }
    },
    getItem (key) {
        if (isSafe()) {
            return localStorage.getItem(key) || undefined;
        }
        return undefined;
    },
    removeItem (key) {
        if (isSafe()) {
            localStorage.removeItem(key);
        }
    },
    clear () {
        if (isSafe()) {
            localStorage.clear();
        }
    }
};
function isSafe() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
} //# sourceMappingURL=SafeLocalStorage.js.map
}),
"[project]/Desktop/frontend/node_modules/proxy-compare/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "affectedToPathList",
    ()=>affectedToPathList,
    "createProxy",
    ()=>createProxy,
    "getUntracked",
    ()=>getUntracked,
    "isChanged",
    ()=>isChanged,
    "markToTrack",
    ()=>markToTrack,
    "replaceNewProxy",
    ()=>replaceNewProxy,
    "trackMemo",
    ()=>trackMemo
]);
/* eslint @typescript-eslint/no-explicit-any: off */ // symbols
const TRACK_MEMO_SYMBOL = Symbol();
const GET_ORIGINAL_SYMBOL = Symbol();
// properties
const AFFECTED_PROPERTY = 'a';
const IS_TARGET_COPIED_PROPERTY = 'f';
const PROXY_PROPERTY = 'p';
const PROXY_CACHE_PROPERTY = 'c';
const TARGET_CACHE_PROPERTY = 't';
const HAS_KEY_PROPERTY = 'h';
const ALL_OWN_KEYS_PROPERTY = 'w';
const HAS_OWN_KEY_PROPERTY = 'o';
const KEYS_PROPERTY = 'k';
// function to create a new bare proxy
let newProxy = (target, handler)=>new Proxy(target, handler);
// get object prototype
const getProto = Object.getPrototypeOf;
const objectsToTrack = new WeakMap();
// check if obj is a plain object or an array
const isObjectToTrack = (obj)=>obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
// check if it is object
const isObject = (x)=>typeof x === 'object' && x !== null;
// Properties that are both non-configurable and non-writable will break
// the proxy get trap when we try to return a recursive/child compare proxy
// from them. We can avoid this by making a copy of the target object with
// all descriptors marked as configurable, see `copyTargetObject`.
// See: https://github.com/dai-shi/proxy-compare/pull/8
const needsToCopyTargetObject = (obj)=>Object.values(Object.getOwnPropertyDescriptors(obj)).some((descriptor)=>!descriptor.configurable && !descriptor.writable);
// Make a copy with all descriptors marked as configurable.
const copyTargetObject = (obj)=>{
    if (Array.isArray(obj)) {
        // Arrays need a special way to copy
        return Array.from(obj);
    }
    // For non-array objects, we create a new object keeping the prototype
    // with changing all configurable options (otherwise, proxies will complain)
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    Object.values(descriptors).forEach((desc)=>{
        desc.configurable = true;
    });
    return Object.create(getProto(obj), descriptors);
};
const createProxyHandler = (origObj, isTargetCopied)=>{
    const state = {
        [IS_TARGET_COPIED_PROPERTY]: isTargetCopied
    };
    let trackObject = false; // for trackMemo
    const recordUsage = (type, key)=>{
        if (!trackObject) {
            let used = state[AFFECTED_PROPERTY].get(origObj);
            if (!used) {
                used = {};
                state[AFFECTED_PROPERTY].set(origObj, used);
            }
            if (type === ALL_OWN_KEYS_PROPERTY) {
                used[ALL_OWN_KEYS_PROPERTY] = true;
            } else {
                let set = used[type];
                if (!set) {
                    set = new Set();
                    used[type] = set;
                }
                set.add(key);
            }
        }
    };
    const recordObjectAsUsed = ()=>{
        trackObject = true;
        state[AFFECTED_PROPERTY].delete(origObj);
    };
    const handler = {
        get (target, key) {
            if (key === GET_ORIGINAL_SYMBOL) {
                return origObj;
            }
            recordUsage(KEYS_PROPERTY, key);
            return createProxy(Reflect.get(target, key), state[AFFECTED_PROPERTY], state[PROXY_CACHE_PROPERTY], state[TARGET_CACHE_PROPERTY]);
        },
        has (target, key) {
            if (key === TRACK_MEMO_SYMBOL) {
                recordObjectAsUsed();
                return true;
            }
            recordUsage(HAS_KEY_PROPERTY, key);
            return Reflect.has(target, key);
        },
        getOwnPropertyDescriptor (target, key) {
            recordUsage(HAS_OWN_KEY_PROPERTY, key);
            return Reflect.getOwnPropertyDescriptor(target, key);
        },
        ownKeys (target) {
            recordUsage(ALL_OWN_KEYS_PROPERTY);
            return Reflect.ownKeys(target);
        }
    };
    if (isTargetCopied) {
        handler.set = handler.deleteProperty = ()=>false;
    }
    return [
        handler,
        state
    ];
};
const getOriginalObject = (obj)=>// unwrap proxy
    obj[GET_ORIGINAL_SYMBOL] || // otherwise
    obj;
const createProxy = (obj, affected, proxyCache, targetCache)=>{
    if (!isObjectToTrack(obj)) return obj;
    let targetAndCopied = targetCache && targetCache.get(obj);
    if (!targetAndCopied) {
        const target = getOriginalObject(obj);
        if (needsToCopyTargetObject(target)) {
            targetAndCopied = [
                target,
                copyTargetObject(target)
            ];
        } else {
            targetAndCopied = [
                target
            ];
        }
        targetCache === null || targetCache === void 0 ? void 0 : targetCache.set(obj, targetAndCopied);
    }
    const [target, copiedTarget] = targetAndCopied;
    let handlerAndState = proxyCache && proxyCache.get(target);
    if (!handlerAndState || handlerAndState[1][IS_TARGET_COPIED_PROPERTY] !== !!copiedTarget) {
        handlerAndState = createProxyHandler(target, !!copiedTarget);
        handlerAndState[1][PROXY_PROPERTY] = newProxy(copiedTarget || target, handlerAndState[0]);
        if (proxyCache) {
            proxyCache.set(target, handlerAndState);
        }
    }
    handlerAndState[1][AFFECTED_PROPERTY] = affected;
    handlerAndState[1][PROXY_CACHE_PROPERTY] = proxyCache;
    handlerAndState[1][TARGET_CACHE_PROPERTY] = targetCache;
    return handlerAndState[1][PROXY_PROPERTY];
};
const isAllOwnKeysChanged = (prevObj, nextObj)=>{
    const prevKeys = Reflect.ownKeys(prevObj);
    const nextKeys = Reflect.ownKeys(nextObj);
    return prevKeys.length !== nextKeys.length || prevKeys.some((k, i)=>k !== nextKeys[i]);
};
const isChanged = (prevObj, nextObj, affected, cache, isEqual = Object.is)=>{
    if (isEqual(prevObj, nextObj)) {
        return false;
    }
    if (!isObject(prevObj) || !isObject(nextObj)) return true;
    const used = affected.get(getOriginalObject(prevObj));
    if (!used) return true;
    if (cache) {
        const hit = cache.get(prevObj);
        if (hit === nextObj) {
            return false;
        }
        // for object with cycles
        cache.set(prevObj, nextObj);
    }
    let changed = null;
    for (const key of used[HAS_KEY_PROPERTY] || []){
        changed = Reflect.has(prevObj, key) !== Reflect.has(nextObj, key);
        if (changed) return changed;
    }
    if (used[ALL_OWN_KEYS_PROPERTY] === true) {
        changed = isAllOwnKeysChanged(prevObj, nextObj);
        if (changed) return changed;
    } else {
        for (const key of used[HAS_OWN_KEY_PROPERTY] || []){
            const hasPrev = !!Reflect.getOwnPropertyDescriptor(prevObj, key);
            const hasNext = !!Reflect.getOwnPropertyDescriptor(nextObj, key);
            changed = hasPrev !== hasNext;
            if (changed) return changed;
        }
    }
    for (const key of used[KEYS_PROPERTY] || []){
        changed = isChanged(prevObj[key], nextObj[key], affected, cache, isEqual);
        if (changed) return changed;
    }
    if (changed === null) throw new Error('invalid used');
    return changed;
};
const trackMemo = (obj)=>{
    if (isObjectToTrack(obj)) {
        return TRACK_MEMO_SYMBOL in obj;
    }
    return false;
};
const getUntracked = (obj)=>{
    if (isObjectToTrack(obj)) {
        return obj[GET_ORIGINAL_SYMBOL] || null;
    }
    return null;
};
const markToTrack = (obj, mark = true)=>{
    objectsToTrack.set(obj, mark);
};
const affectedToPathList = (obj, affected, onlyWithValues)=>{
    const list = [];
    const seen = new WeakSet();
    const walk = (x, path)=>{
        var _a, _b, _c;
        if (seen.has(x)) {
            // for object with cycles
            return;
        }
        if (isObject(x)) {
            seen.add(x);
        }
        const used = isObject(x) && affected.get(getOriginalObject(x));
        if (used) {
            (_a = used[HAS_KEY_PROPERTY]) === null || _a === void 0 ? void 0 : _a.forEach((key)=>{
                const segment = `:has(${String(key)})`;
                list.push(path ? [
                    ...path,
                    segment
                ] : [
                    segment
                ]);
            });
            if (used[ALL_OWN_KEYS_PROPERTY] === true) {
                const segment = ':ownKeys';
                list.push(path ? [
                    ...path,
                    segment
                ] : [
                    segment
                ]);
            } else {
                (_b = used[HAS_OWN_KEY_PROPERTY]) === null || _b === void 0 ? void 0 : _b.forEach((key)=>{
                    const segment = `:hasOwn(${String(key)})`;
                    list.push(path ? [
                        ...path,
                        segment
                    ] : [
                        segment
                    ]);
                });
            }
            (_c = used[KEYS_PROPERTY]) === null || _c === void 0 ? void 0 : _c.forEach((key)=>{
                if (!onlyWithValues || 'value' in (Object.getOwnPropertyDescriptor(x, key) || {})) {
                    walk(x[key], path ? [
                        ...path,
                        key
                    ] : [
                        key
                    ]);
                }
            });
        } else if (path) {
            list.push(path);
        }
    };
    walk(obj);
    return list;
};
const replaceNewProxy = (fn)=>{
    newProxy = fn;
};
}),
"[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVersion",
    ()=>getVersion,
    "proxy",
    ()=>proxy,
    "ref",
    ()=>ref,
    "snapshot",
    ()=>snapshot,
    "subscribe",
    ()=>subscribe,
    "unstable_getInternalStates",
    ()=>unstable_getInternalStates,
    "unstable_replaceInternalFunction",
    ()=>unstable_replaceInternalFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/proxy-compare/dist/index.js [app-client] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("Desktop/frontend/node_modules/valtio/esm/vanilla.mjs")}`;
    }
};
;
const isObject = (x)=>typeof x === "object" && x !== null;
const canProxyDefault = (x)=>isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
const createSnapshotDefault = (target, version)=>{
    const cache = snapCache.get(target);
    if ((cache == null ? void 0 : cache[0]) === version) {
        return cache[1];
    }
    const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markToTrack"])(snap, true);
    snapCache.set(target, [
        version,
        snap
    ]);
    Reflect.ownKeys(target).forEach((key)=>{
        if (Object.getOwnPropertyDescriptor(snap, key)) {
            return;
        }
        const value = Reflect.get(target, key);
        const { enumerable } = Reflect.getOwnPropertyDescriptor(target, key);
        const desc = {
            value,
            enumerable,
            // This is intentional to avoid copying with proxy-compare.
            // It's still non-writable, so it avoids assigning a value.
            configurable: true
        };
        if (refSet.has(value)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markToTrack"])(value, false);
        } else if (proxyStateMap.has(value)) {
            const [target2, ensureVersion] = proxyStateMap.get(value);
            desc.value = createSnapshotDefault(target2, ensureVersion());
        }
        Object.defineProperty(snap, key, desc);
    });
    return Object.preventExtensions(snap);
};
const createHandlerDefault = (isInitializing, addPropListener, removePropListener, notifyUpdate)=>({
        deleteProperty (target, prop) {
            const prevValue = Reflect.get(target, prop);
            removePropListener(prop);
            const deleted = Reflect.deleteProperty(target, prop);
            if (deleted) {
                notifyUpdate([
                    "delete",
                    [
                        prop
                    ],
                    prevValue
                ]);
            }
            return deleted;
        },
        set (target, prop, value, receiver) {
            const hasPrevValue = !isInitializing() && Reflect.has(target, prop);
            const prevValue = Reflect.get(target, prop, receiver);
            if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
                return true;
            }
            removePropListener(prop);
            if (isObject(value)) {
                value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUntracked"])(value) || value;
            }
            const nextValue = !proxyStateMap.has(value) && canProxy(value) ? proxy(value) : value;
            addPropListener(prop, nextValue);
            Reflect.set(target, prop, nextValue, receiver);
            notifyUpdate([
                "set",
                [
                    prop
                ],
                value,
                prevValue
            ]);
            return true;
        }
    });
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const snapCache = /* @__PURE__ */ new WeakMap();
const versionHolder = [
    1
];
const proxyCache = /* @__PURE__ */ new WeakMap();
let objectIs = Object.is;
let newProxy = (target, handler)=>new Proxy(target, handler);
let canProxy = canProxyDefault;
let createSnapshot = createSnapshotDefault;
let createHandler = createHandlerDefault;
function proxy(baseObject = {}) {
    if (!isObject(baseObject)) {
        throw new Error("object required");
    }
    const found = proxyCache.get(baseObject);
    if (found) {
        return found;
    }
    let version = versionHolder[0];
    const listeners = /* @__PURE__ */ new Set();
    const notifyUpdate = (op, nextVersion = ++versionHolder[0])=>{
        if (version !== nextVersion) {
            checkVersion = version = nextVersion;
            listeners.forEach((listener)=>listener(op, nextVersion));
        }
    };
    let checkVersion = version;
    const ensureVersion = (nextCheckVersion = versionHolder[0])=>{
        if (checkVersion !== nextCheckVersion) {
            checkVersion = nextCheckVersion;
            propProxyStates.forEach(([propProxyState])=>{
                const propVersion = propProxyState[1](nextCheckVersion);
                if (propVersion > version) {
                    version = propVersion;
                }
            });
        }
        return version;
    };
    const createPropListener = (prop)=>(op, nextVersion)=>{
            const newOp = [
                ...op
            ];
            newOp[1] = [
                prop,
                ...newOp[1]
            ];
            notifyUpdate(newOp, nextVersion);
        };
    const propProxyStates = /* @__PURE__ */ new Map();
    const addPropListener = (prop, propValue)=>{
        const propProxyState = !refSet.has(propValue) && proxyStateMap.get(propValue);
        if (propProxyState) {
            if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && propProxyStates.has(prop)) {
                throw new Error("prop listener already exists");
            }
            if (listeners.size) {
                const remove = propProxyState[2](createPropListener(prop));
                propProxyStates.set(prop, [
                    propProxyState,
                    remove
                ]);
            } else {
                propProxyStates.set(prop, [
                    propProxyState
                ]);
            }
        }
    };
    const removePropListener = (prop)=>{
        var _a;
        const entry = propProxyStates.get(prop);
        if (entry) {
            propProxyStates.delete(prop);
            (_a = entry[1]) == null ? void 0 : _a.call(entry);
        }
    };
    const addListener = (listener)=>{
        listeners.add(listener);
        if (listeners.size === 1) {
            propProxyStates.forEach(([propProxyState, prevRemove], prop)=>{
                if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && prevRemove) {
                    throw new Error("remove already exists");
                }
                const remove = propProxyState[2](createPropListener(prop));
                propProxyStates.set(prop, [
                    propProxyState,
                    remove
                ]);
            });
        }
        const removeListener = ()=>{
            listeners.delete(listener);
            if (listeners.size === 0) {
                propProxyStates.forEach(([propProxyState, remove], prop)=>{
                    if (remove) {
                        remove();
                        propProxyStates.set(prop, [
                            propProxyState
                        ]);
                    }
                });
            }
        };
        return removeListener;
    };
    let initializing = true;
    const handler = createHandler(()=>initializing, addPropListener, removePropListener, notifyUpdate);
    const proxyObject = newProxy(baseObject, handler);
    proxyCache.set(baseObject, proxyObject);
    const proxyState = [
        baseObject,
        ensureVersion,
        addListener
    ];
    proxyStateMap.set(proxyObject, proxyState);
    Reflect.ownKeys(baseObject).forEach((key)=>{
        const desc = Object.getOwnPropertyDescriptor(baseObject, key);
        if ("value" in desc && desc.writable) {
            proxyObject[key] = baseObject[key];
        }
    });
    initializing = false;
    return proxyObject;
}
function getVersion(proxyObject) {
    const proxyState = proxyStateMap.get(proxyObject);
    return proxyState == null ? void 0 : proxyState[1]();
}
function subscribe(proxyObject, callback, notifyInSync) {
    const proxyState = proxyStateMap.get(proxyObject);
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && !proxyState) {
        console.warn("Please use proxy object");
    }
    let promise;
    const ops = [];
    const addListener = proxyState[2];
    let isListenerActive = false;
    const listener = (op)=>{
        ops.push(op);
        if (notifyInSync) {
            callback(ops.splice(0));
            return;
        }
        if (!promise) {
            promise = Promise.resolve().then(()=>{
                promise = void 0;
                if (isListenerActive) {
                    callback(ops.splice(0));
                }
            });
        }
    };
    const removeListener = addListener(listener);
    isListenerActive = true;
    return ()=>{
        isListenerActive = false;
        removeListener();
    };
}
function snapshot(proxyObject) {
    const proxyState = proxyStateMap.get(proxyObject);
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && !proxyState) {
        console.warn("Please use proxy object");
    }
    const [target, ensureVersion] = proxyState;
    return createSnapshot(target, ensureVersion());
}
function ref(obj) {
    refSet.add(obj);
    return obj;
}
function unstable_getInternalStates() {
    return {
        proxyStateMap,
        refSet,
        snapCache,
        versionHolder,
        proxyCache
    };
}
function unstable_replaceInternalFunction(name, fn) {
    switch(name){
        case "objectIs":
            objectIs = fn(objectIs);
            break;
        case "newProxy":
            newProxy = fn(newProxy);
            break;
        case "canProxy":
            canProxy = fn(canProxy);
            break;
        case "createSnapshot":
            createSnapshot = fn(createSnapshot);
            break;
        case "createHandler":
            createHandler = fn(createHandler);
            break;
        default:
            throw new Error("unknown function");
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deepClone",
    ()=>deepClone,
    "devtools",
    ()=>devtools,
    "proxyMap",
    ()=>proxyMap,
    "proxySet",
    ()=>proxySet,
    "subscribeKey",
    ()=>subscribeKey,
    "watch",
    ()=>watch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs")}`;
    }
};
;
function subscribeKey(proxyObject, key, callback, notifyInSync) {
    let prevValue = proxyObject[key];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(proxyObject, ()=>{
        const nextValue = proxyObject[key];
        if (!Object.is(prevValue, nextValue)) {
            callback(prevValue = nextValue);
        }
    }, notifyInSync);
}
let currentCleanups;
function watch(callback, options) {
    let alive = true;
    const cleanups = /* @__PURE__ */ new Set();
    const subscriptions = /* @__PURE__ */ new Map();
    const cleanup = ()=>{
        if (alive) {
            alive = false;
            cleanups.forEach((clean)=>clean());
            cleanups.clear();
            subscriptions.forEach((unsubscribe)=>unsubscribe());
            subscriptions.clear();
        }
    };
    const revalidate = async ()=>{
        if (!alive) {
            return;
        }
        cleanups.forEach((clean)=>clean());
        cleanups.clear();
        const proxiesToSubscribe = /* @__PURE__ */ new Set();
        const parent = currentCleanups;
        currentCleanups = cleanups;
        try {
            const promiseOrPossibleCleanup = callback((proxyObject)=>{
                proxiesToSubscribe.add(proxyObject);
                if (alive && !subscriptions.has(proxyObject)) {
                    const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(proxyObject, revalidate, options == null ? void 0 : options.sync);
                    subscriptions.set(proxyObject, unsubscribe);
                }
                return proxyObject;
            });
            const couldBeCleanup = promiseOrPossibleCleanup && promiseOrPossibleCleanup instanceof Promise ? await promiseOrPossibleCleanup : promiseOrPossibleCleanup;
            if (couldBeCleanup) {
                if (alive) {
                    cleanups.add(couldBeCleanup);
                } else {
                    cleanup();
                }
            }
        } finally{
            currentCleanups = parent;
        }
        subscriptions.forEach((unsubscribe, proxyObject)=>{
            if (!proxiesToSubscribe.has(proxyObject)) {
                subscriptions.delete(proxyObject);
                unsubscribe();
            }
        });
    };
    if (currentCleanups) {
        currentCleanups.add(cleanup);
    }
    revalidate();
    return cleanup;
}
const DEVTOOLS = Symbol();
function devtools(proxyObject, options) {
    const { enabled, name = "", ...rest } = options || {};
    let extension;
    try {
        extension = (enabled != null ? enabled : (__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
    } catch (e) {}
    if (!extension) {
        if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && enabled) {
            console.warn("[Warning] Please install/enable Redux devtools extension");
        }
        return;
    }
    let isTimeTraveling = false;
    const devtools2 = extension.connect({
        name,
        ...rest
    });
    const unsub1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(proxyObject, (ops)=>{
        const action = ops.filter(([_, path])=>path[0] !== DEVTOOLS).map(([op, path])=>`${op}:${path.map(String).join(".")}`).join(", ");
        if (!action) {
            return;
        }
        if (isTimeTraveling) {
            isTimeTraveling = false;
        } else {
            const snapWithoutDevtools = Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
            delete snapWithoutDevtools[DEVTOOLS];
            devtools2.send({
                type: action,
                updatedAt: /* @__PURE__ */ new Date().toLocaleString()
            }, snapWithoutDevtools);
        }
    });
    const unsub2 = devtools2.subscribe((message)=>{
        var _a, _b, _c, _d, _e, _f;
        if (message.type === "ACTION" && message.payload) {
            try {
                Object.assign(proxyObject, JSON.parse(message.payload));
            } catch (e) {
                console.error("please dispatch a serializable value that JSON.parse() and proxy() support\n", e);
            }
        }
        if (message.type === "DISPATCH" && message.state) {
            if (((_a = message.payload) == null ? void 0 : _a.type) === "JUMP_TO_ACTION" || ((_b = message.payload) == null ? void 0 : _b.type) === "JUMP_TO_STATE") {
                isTimeTraveling = true;
                const state = JSON.parse(message.state);
                Object.assign(proxyObject, state);
            }
            proxyObject[DEVTOOLS] = message;
        } else if (message.type === "DISPATCH" && ((_c = message.payload) == null ? void 0 : _c.type) === "COMMIT") {
            devtools2.init((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
        } else if (message.type === "DISPATCH" && ((_d = message.payload) == null ? void 0 : _d.type) === "IMPORT_STATE") {
            const actions = (_e = message.payload.nextLiftedState) == null ? void 0 : _e.actionsById;
            const computedStates = ((_f = message.payload.nextLiftedState) == null ? void 0 : _f.computedStates) || [];
            isTimeTraveling = true;
            computedStates.forEach(({ state }, index)=>{
                const action = actions[index] || "No action found";
                Object.assign(proxyObject, state);
                if (index === 0) {
                    devtools2.init((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
                } else {
                    devtools2.send(action, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
                }
            });
        }
    });
    devtools2.init((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
    return ()=>{
        unsub1();
        unsub2 == null ? void 0 : unsub2();
    };
}
const { proxyStateMap: proxyStateMap$1, snapCache: snapCache$1 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unstable_getInternalStates"])();
const isProxy$1 = (x)=>proxyStateMap$1.has(x);
const isProxyMap = (obj)=>{
    return Symbol.toStringTag in obj && obj[Symbol.toStringTag] === "Map" && proxyStateMap$1.has(obj);
};
function proxyMap(entries) {
    const initialData = [];
    let initialIndex = 0;
    const indexMap = /* @__PURE__ */ new Map();
    const snapMapCache = /* @__PURE__ */ new WeakMap();
    const registerSnapMap = ()=>{
        const cache = snapCache$1.get(vObject);
        const latestSnap = cache == null ? void 0 : cache[1];
        if (latestSnap && !snapMapCache.has(latestSnap)) {
            const clonedMap = new Map(indexMap);
            snapMapCache.set(latestSnap, clonedMap);
        }
    };
    const getMapForThis = (x)=>snapMapCache.get(x) || indexMap;
    if (entries) {
        if (typeof entries[Symbol.iterator] !== "function") {
            throw new TypeError("proxyMap:\n	initial state must be iterable\n		tip: structure should be [[key, value]]");
        }
        for (const [key, value] of entries){
            indexMap.set(key, initialIndex);
            initialData[initialIndex++] = value;
        }
    }
    const vObject = {
        data: initialData,
        index: initialIndex,
        epoch: 0,
        get size () {
            if (!isProxy$1(this)) {
                registerSnapMap();
            }
            const map = getMapForThis(this);
            return map.size;
        },
        get (key) {
            const map = getMapForThis(this);
            const index = map.get(key);
            if (index === void 0) {
                this.epoch;
                return void 0;
            }
            return this.data[index];
        },
        has (key) {
            const map = getMapForThis(this);
            this.epoch;
            return map.has(key);
        },
        set (key, value) {
            if (!isProxy$1(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const index = indexMap.get(key);
            if (index === void 0) {
                indexMap.set(key, this.index);
                this.data[this.index++] = value;
            } else {
                this.data[index] = value;
            }
            this.epoch++;
            return this;
        },
        delete (key) {
            if (!isProxy$1(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const index = indexMap.get(key);
            if (index === void 0) {
                return false;
            }
            delete this.data[index];
            indexMap.delete(key);
            this.epoch++;
            return true;
        },
        clear () {
            if (!isProxy$1(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            this.data.length = 0;
            this.index = 0;
            this.epoch++;
            indexMap.clear();
        },
        forEach (cb) {
            this.epoch;
            const map = getMapForThis(this);
            map.forEach((index, key)=>{
                cb(this.data[index], key, this);
            });
        },
        *entries () {
            this.epoch;
            const map = getMapForThis(this);
            for (const [key, index] of map){
                yield [
                    key,
                    this.data[index]
                ];
            }
        },
        *keys () {
            this.epoch;
            const map = getMapForThis(this);
            for (const key of map.keys()){
                yield key;
            }
        },
        *values () {
            this.epoch;
            const map = getMapForThis(this);
            for (const index of map.values()){
                yield this.data[index];
            }
        },
        [Symbol.iterator] () {
            return this.entries();
        },
        get [Symbol.toStringTag] () {
            return "Map";
        },
        toJSON () {
            return new Map(this.entries());
        }
    };
    const proxiedObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])(vObject);
    Object.defineProperties(proxiedObject, {
        size: {
            enumerable: false
        },
        index: {
            enumerable: false
        },
        epoch: {
            enumerable: false
        },
        data: {
            enumerable: false
        },
        toJSON: {
            enumerable: false
        }
    });
    Object.seal(proxiedObject);
    return proxiedObject;
}
const { proxyStateMap, snapCache } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unstable_getInternalStates"])();
const maybeProxify = (x)=>typeof x === "object" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
        x
    }).x : x;
const isProxy = (x)=>proxyStateMap.has(x);
const isProxySet = (obj)=>{
    return Symbol.toStringTag in obj && obj[Symbol.toStringTag] === "Set" && proxyStateMap.has(obj);
};
function proxySet(initialValues) {
    const initialData = [];
    const indexMap = /* @__PURE__ */ new Map();
    let initialIndex = 0;
    const snapMapCache = /* @__PURE__ */ new WeakMap();
    const registerSnapMap = ()=>{
        const cache = snapCache.get(vObject);
        const latestSnap = cache == null ? void 0 : cache[1];
        if (latestSnap && !snapMapCache.has(latestSnap)) {
            const clonedMap = new Map(indexMap);
            snapMapCache.set(latestSnap, clonedMap);
        }
    };
    const getMapForThis = (x)=>snapMapCache.get(x) || indexMap;
    if (initialValues) {
        if (typeof initialValues[Symbol.iterator] !== "function") {
            throw new TypeError("not iterable");
        }
        for (const value of initialValues){
            if (!indexMap.has(value)) {
                const v = maybeProxify(value);
                indexMap.set(v, initialIndex);
                initialData[initialIndex++] = v;
            }
        }
    }
    const vObject = {
        data: initialData,
        index: initialIndex,
        epoch: 0,
        get size () {
            if (!isProxy(this)) {
                registerSnapMap();
            }
            return indexMap.size;
        },
        has (value) {
            const map = getMapForThis(this);
            const v = maybeProxify(value);
            this.epoch;
            return map.has(v);
        },
        add (value) {
            if (!isProxy(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const v = maybeProxify(value);
            if (!indexMap.has(v)) {
                indexMap.set(v, this.index);
                this.data[this.index++] = v;
                this.epoch++;
            }
            return this;
        },
        delete (value) {
            if (!isProxy(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const v = maybeProxify(value);
            const index = indexMap.get(v);
            if (index === void 0) {
                return false;
            }
            delete this.data[index];
            indexMap.delete(v);
            this.epoch++;
            return true;
        },
        clear () {
            if (!isProxy(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            this.data.length = 0;
            this.index = 0;
            this.epoch++;
            indexMap.clear();
        },
        forEach (cb) {
            this.epoch;
            const map = getMapForThis(this);
            map.forEach((index)=>{
                cb(this.data[index], this.data[index], this);
            });
        },
        *values () {
            this.epoch;
            const map = getMapForThis(this);
            for (const index of map.values()){
                yield this.data[index];
            }
        },
        keys () {
            this.epoch;
            return this.values();
        },
        *entries () {
            this.epoch;
            const map = getMapForThis(this);
            for (const index of map.values()){
                const value = this.data[index];
                yield [
                    value,
                    value
                ];
            }
        },
        toJSON () {
            return new Set(this.values());
        },
        [Symbol.iterator] () {
            return this.values();
        },
        get [Symbol.toStringTag] () {
            return "Set";
        },
        intersection (other) {
            this.epoch;
            const otherSet = proxySet(other);
            const resultSet = proxySet();
            for (const value of this.values()){
                if (otherSet.has(value)) {
                    resultSet.add(value);
                }
            }
            return proxySet(resultSet);
        },
        union (other) {
            this.epoch;
            const resultSet = proxySet();
            const otherSet = proxySet(other);
            for (const value of this.values()){
                resultSet.add(value);
            }
            for (const value of otherSet){
                resultSet.add(value);
            }
            return proxySet(resultSet);
        },
        difference (other) {
            this.epoch;
            const resultSet = proxySet();
            const otherSet = proxySet(other);
            for (const value of this.values()){
                if (!otherSet.has(value)) {
                    resultSet.add(value);
                }
            }
            return proxySet(resultSet);
        },
        symmetricDifference (other) {
            this.epoch;
            const resultSet = proxySet();
            const otherSet = proxySet(other);
            for (const value of this.values()){
                if (!otherSet.has(value)) {
                    resultSet.add(value);
                }
            }
            for (const value of otherSet.values()){
                if (!this.has(value)) {
                    resultSet.add(value);
                }
            }
            return proxySet(resultSet);
        },
        isSubsetOf (other) {
            this.epoch;
            const otherSet = proxySet(other);
            return this.size <= other.size && [
                ...this.values()
            ].every((value)=>otherSet.has(value));
        },
        isSupersetOf (other) {
            this.epoch;
            const otherSet = proxySet(other);
            return this.size >= other.size && [
                ...otherSet
            ].every((value)=>this.has(value));
        },
        isDisjointFrom (other) {
            this.epoch;
            const otherSet = proxySet(other);
            return [
                ...this.values()
            ].every((value)=>!otherSet.has(value));
        }
    };
    const proxiedObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])(vObject);
    Object.defineProperties(proxiedObject, {
        size: {
            enumerable: false
        },
        data: {
            enumerable: false
        },
        index: {
            enumerable: false
        },
        epoch: {
            enumerable: false
        },
        toJSON: {
            enumerable: false
        }
    });
    Object.seal(proxiedObject);
    return proxiedObject;
}
const isObject = (x)=>typeof x === "object" && x !== null;
let defaultRefSet;
const getDefaultRefSet = ()=>{
    if (!defaultRefSet) {
        defaultRefSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unstable_getInternalStates"])().refSet;
    }
    return defaultRefSet;
};
function deepClone(obj, getRefSet = getDefaultRefSet) {
    if (!isObject(obj) || getRefSet().has(obj)) {
        return obj;
    }
    if (isProxySet(obj)) {
        return proxySet([
            ...obj
        ]);
    }
    if (isProxyMap(obj)) {
        return proxyMap([
            ...obj.entries()
        ]);
    }
    const baseObject = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    Reflect.ownKeys(obj).forEach((key)=>{
        baseObject[key] = deepClone(obj[key], getRefSet);
    });
    return baseObject;
}
;
}),
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
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVAILABLE_NAMESPACES",
    ()=>AVAILABLE_NAMESPACES,
    "NetworkUtil",
    ()=>NetworkUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
const NetworkUtil = {
    caipNetworkIdToNumber (caipnetworkId) {
        return caipnetworkId ? Number(caipnetworkId.split(':')[1]) : undefined;
    },
    parseEvmChainId (chainId) {
        return typeof chainId === 'string' ? this.caipNetworkIdToNumber(chainId) : chainId;
    },
    getNetworksByNamespace (networks, namespace) {
        return networks?.filter((network)=>network.chainNamespace === namespace) || [];
    },
    getFirstNetworkByNamespace (networks, namespace) {
        return this.getNetworksByNamespace(networks, namespace)[0];
    },
    getNetworkNameByCaipNetworkId (caipNetworks, caipNetworkId) {
        if (!caipNetworkId) {
            return undefined;
        }
        const caipNetwork = caipNetworks.find((network)=>network.caipNetworkId === caipNetworkId);
        if (caipNetwork) {
            return caipNetwork.name;
        }
        const [namespace] = caipNetworkId.split(':');
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN_NAME_MAP?.[namespace] || undefined;
    }
};
const AVAILABLE_NAMESPACES = [
    'eip155',
    'solana',
    'polkadot',
    'bip122',
    'cosmos',
    'sui',
    'stacks'
]; //# sourceMappingURL=NetworkUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParseUtil",
    ()=>ParseUtil
]);
const ParseUtil = {
    validateCaipAddress (address) {
        if (address.split(':')?.length !== 3) {
            throw new Error('Invalid CAIP Address');
        }
        return address;
    },
    parseCaipAddress (caipAddress) {
        const parts = caipAddress.split(':');
        if (parts.length !== 3) {
            throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
        }
        const [chainNamespace, chainId, address] = parts;
        if (!chainNamespace || !chainId || !address) {
            throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
        }
        return {
            chainNamespace: chainNamespace,
            chainId: chainId,
            address
        };
    },
    parseCaipNetworkId (caipNetworkId) {
        const parts = caipNetworkId.split(':');
        if (parts.length !== 2) {
            throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
        }
        const [chainNamespace, chainId] = parts;
        if (!chainNamespace || !chainId) {
            throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
        }
        return {
            chainNamespace: chainNamespace,
            chainId: chainId
        };
    }
}; //# sourceMappingURL=ParseUtil.js.map
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
"[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LOG_LEVEL",
    ()=>DEFAULT_LOG_LEVEL,
    "SECURE_SITE_SDK",
    ()=>SECURE_SITE_SDK,
    "SECURE_SITE_SDK_VERSION",
    ()=>SECURE_SITE_SDK_VERSION,
    "W3mFrameConstants",
    ()=>W3mFrameConstants,
    "W3mFrameRpcConstants",
    ()=>W3mFrameRpcConstants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_SDK_URL = 'https://secure.walletconnect.org/sdk';
const SECURE_SITE_SDK = (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_SECURE_SITE_SDK_URL'] : undefined) || DEFAULT_SDK_URL;
const DEFAULT_LOG_LEVEL = (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_DEFAULT_LOG_LEVEL'] : undefined) || 'error';
const SECURE_SITE_SDK_VERSION = (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_SECURE_SITE_SDK_VERSION'] : undefined) || '4';
const W3mFrameConstants = {
    APP_EVENT_KEY: '@w3m-app/',
    FRAME_EVENT_KEY: '@w3m-frame/',
    RPC_METHOD_KEY: 'RPC_',
    STORAGE_KEY: '@appkit-wallet/',
    SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
    EMAIL_LOGIN_USED_KEY: 'EMAIL_LOGIN_USED_KEY',
    LAST_USED_CHAIN_KEY: 'LAST_USED_CHAIN_KEY',
    LAST_EMAIL_LOGIN_TIME: 'LAST_EMAIL_LOGIN_TIME',
    EMAIL: 'EMAIL',
    PREFERRED_ACCOUNT_TYPE: 'PREFERRED_ACCOUNT_TYPE',
    SMART_ACCOUNT_ENABLED: 'SMART_ACCOUNT_ENABLED',
    SMART_ACCOUNT_ENABLED_NETWORKS: 'SMART_ACCOUNT_ENABLED_NETWORKS',
    SOCIAL_USERNAME: 'SOCIAL_USERNAME',
    APP_SWITCH_NETWORK: '@w3m-app/SWITCH_NETWORK',
    APP_CONNECT_EMAIL: '@w3m-app/CONNECT_EMAIL',
    APP_CONNECT_DEVICE: '@w3m-app/CONNECT_DEVICE',
    APP_CONNECT_OTP: '@w3m-app/CONNECT_OTP',
    APP_CONNECT_SOCIAL: '@w3m-app/CONNECT_SOCIAL',
    APP_GET_SOCIAL_REDIRECT_URI: '@w3m-app/GET_SOCIAL_REDIRECT_URI',
    APP_GET_USER: '@w3m-app/GET_USER',
    APP_SIGN_OUT: '@w3m-app/SIGN_OUT',
    APP_IS_CONNECTED: '@w3m-app/IS_CONNECTED',
    APP_GET_CHAIN_ID: '@w3m-app/GET_CHAIN_ID',
    APP_RPC_REQUEST: '@w3m-app/RPC_REQUEST',
    APP_UPDATE_EMAIL: '@w3m-app/UPDATE_EMAIL',
    APP_UPDATE_EMAIL_PRIMARY_OTP: '@w3m-app/UPDATE_EMAIL_PRIMARY_OTP',
    APP_UPDATE_EMAIL_SECONDARY_OTP: '@w3m-app/UPDATE_EMAIL_SECONDARY_OTP',
    APP_AWAIT_UPDATE_EMAIL: '@w3m-app/AWAIT_UPDATE_EMAIL',
    APP_SYNC_THEME: '@w3m-app/SYNC_THEME',
    APP_SYNC_DAPP_DATA: '@w3m-app/SYNC_DAPP_DATA',
    APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: '@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS',
    APP_INIT_SMART_ACCOUNT: '@w3m-app/INIT_SMART_ACCOUNT',
    APP_SET_PREFERRED_ACCOUNT: '@w3m-app/SET_PREFERRED_ACCOUNT',
    APP_CONNECT_FARCASTER: '@w3m-app/CONNECT_FARCASTER',
    APP_GET_FARCASTER_URI: '@w3m-app/GET_FARCASTER_URI',
    APP_RELOAD: '@w3m-app/RELOAD',
    APP_RPC_ABORT: '@w3m-app/RPC_ABORT',
    FRAME_SWITCH_NETWORK_ERROR: '@w3m-frame/SWITCH_NETWORK_ERROR',
    FRAME_SWITCH_NETWORK_SUCCESS: '@w3m-frame/SWITCH_NETWORK_SUCCESS',
    FRAME_CONNECT_EMAIL_ERROR: '@w3m-frame/CONNECT_EMAIL_ERROR',
    FRAME_CONNECT_EMAIL_SUCCESS: '@w3m-frame/CONNECT_EMAIL_SUCCESS',
    FRAME_CONNECT_DEVICE_ERROR: '@w3m-frame/CONNECT_DEVICE_ERROR',
    FRAME_CONNECT_DEVICE_SUCCESS: '@w3m-frame/CONNECT_DEVICE_SUCCESS',
    FRAME_CONNECT_OTP_SUCCESS: '@w3m-frame/CONNECT_OTP_SUCCESS',
    FRAME_CONNECT_OTP_ERROR: '@w3m-frame/CONNECT_OTP_ERROR',
    FRAME_CONNECT_SOCIAL_SUCCESS: '@w3m-frame/CONNECT_SOCIAL_SUCCESS',
    FRAME_CONNECT_SOCIAL_ERROR: '@w3m-frame/CONNECT_SOCIAL_ERROR',
    FRAME_CONNECT_FARCASTER_SUCCESS: '@w3m-frame/CONNECT_FARCASTER_SUCCESS',
    FRAME_CONNECT_FARCASTER_ERROR: '@w3m-frame/CONNECT_FARCASTER_ERROR',
    FRAME_GET_FARCASTER_URI_SUCCESS: '@w3m-frame/GET_FARCASTER_URI_SUCCESS',
    FRAME_GET_FARCASTER_URI_ERROR: '@w3m-frame/GET_FARCASTER_URI_ERROR',
    FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: '@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS',
    FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: '@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR',
    FRAME_GET_USER_SUCCESS: '@w3m-frame/GET_USER_SUCCESS',
    FRAME_GET_USER_ERROR: '@w3m-frame/GET_USER_ERROR',
    FRAME_SIGN_OUT_SUCCESS: '@w3m-frame/SIGN_OUT_SUCCESS',
    FRAME_SIGN_OUT_ERROR: '@w3m-frame/SIGN_OUT_ERROR',
    FRAME_IS_CONNECTED_SUCCESS: '@w3m-frame/IS_CONNECTED_SUCCESS',
    FRAME_IS_CONNECTED_ERROR: '@w3m-frame/IS_CONNECTED_ERROR',
    FRAME_GET_CHAIN_ID_SUCCESS: '@w3m-frame/GET_CHAIN_ID_SUCCESS',
    FRAME_GET_CHAIN_ID_ERROR: '@w3m-frame/GET_CHAIN_ID_ERROR',
    FRAME_RPC_REQUEST_SUCCESS: '@w3m-frame/RPC_REQUEST_SUCCESS',
    FRAME_RPC_REQUEST_ERROR: '@w3m-frame/RPC_REQUEST_ERROR',
    FRAME_SESSION_UPDATE: '@w3m-frame/SESSION_UPDATE',
    FRAME_UPDATE_EMAIL_SUCCESS: '@w3m-frame/UPDATE_EMAIL_SUCCESS',
    FRAME_UPDATE_EMAIL_ERROR: '@w3m-frame/UPDATE_EMAIL_ERROR',
    FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: '@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS',
    FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: '@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR',
    FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: '@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS',
    FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: '@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR',
    FRAME_SYNC_THEME_SUCCESS: '@w3m-frame/SYNC_THEME_SUCCESS',
    FRAME_SYNC_THEME_ERROR: '@w3m-frame/SYNC_THEME_ERROR',
    FRAME_SYNC_DAPP_DATA_SUCCESS: '@w3m-frame/SYNC_DAPP_DATA_SUCCESS',
    FRAME_SYNC_DAPP_DATA_ERROR: '@w3m-frame/SYNC_DAPP_DATA_ERROR',
    FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: '@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS',
    FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: '@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR',
    FRAME_INIT_SMART_ACCOUNT_SUCCESS: '@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS',
    FRAME_INIT_SMART_ACCOUNT_ERROR: '@w3m-frame/INIT_SMART_ACCOUNT_ERROR',
    FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: '@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS',
    FRAME_SET_PREFERRED_ACCOUNT_ERROR: '@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR',
    FRAME_READY: '@w3m-frame/READY',
    FRAME_RELOAD_SUCCESS: '@w3m-frame/RELOAD_SUCCESS',
    FRAME_RELOAD_ERROR: '@w3m-frame/RELOAD_ERROR',
    FRAME_RPC_ABORT_SUCCESS: '@w3m-frame/RPC_ABORT_SUCCESS',
    FRAME_RPC_ABORT_ERROR: '@w3m-frame/RPC_ABORT_ERROR',
    RPC_RESPONSE_TYPE_ERROR: 'RPC_RESPONSE_ERROR',
    RPC_RESPONSE_TYPE_TX: 'RPC_RESPONSE_TRANSACTION_HASH',
    RPC_RESPONSE_TYPE_OBJECT: 'RPC_RESPONSE_OBJECT'
};
const W3mFrameRpcConstants = {
    SAFE_RPC_METHODS: [
        'eth_accounts',
        'eth_blockNumber',
        'eth_call',
        'eth_chainId',
        'eth_estimateGas',
        'eth_feeHistory',
        'eth_gasPrice',
        'eth_getAccount',
        'eth_getBalance',
        'eth_getBlockByHash',
        'eth_getBlockByNumber',
        'eth_getBlockReceipts',
        'eth_getBlockTransactionCountByHash',
        'eth_getBlockTransactionCountByNumber',
        'eth_getCode',
        'eth_getFilterChanges',
        'eth_getFilterLogs',
        'eth_getLogs',
        'eth_getProof',
        'eth_getStorageAt',
        'eth_getTransactionByBlockHashAndIndex',
        'eth_getTransactionByBlockNumberAndIndex',
        'eth_getTransactionByHash',
        'eth_getTransactionCount',
        'eth_getTransactionReceipt',
        'eth_getUncleCountByBlockHash',
        'eth_getUncleCountByBlockNumber',
        'eth_maxPriorityFeePerGas',
        'eth_newBlockFilter',
        'eth_newFilter',
        'eth_newPendingTransactionFilter',
        'eth_sendRawTransaction',
        'eth_syncing',
        'eth_uninstallFilter',
        'wallet_getCapabilities',
        'wallet_getCallsStatus',
        'eth_getUserOperationReceipt',
        'eth_estimateUserOperationGas',
        'eth_getUserOperationByHash',
        'eth_supportedEntryPoints',
        'wallet_getAssets'
    ],
    NOT_SAFE_RPC_METHODS: [
        'personal_sign',
        'eth_signTypedData_v4',
        'eth_sendTransaction',
        'solana_signMessage',
        'solana_signTransaction',
        'solana_signAllTransactions',
        'solana_signAndSendTransaction',
        'wallet_sendCalls',
        'wallet_grantPermissions',
        'wallet_revokePermissions',
        'eth_sendUserOperation'
    ],
    GET_CHAIN_ID: 'eth_chainId',
    RPC_METHOD_NOT_ALLOWED_MESSAGE: 'Requested RPC call is not allowed',
    RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: 'Action not allowed',
    ACCOUNT_TYPES: {
        EOA: 'eoa',
        SMART_ACCOUNT: 'smartAccount'
    }
}; //# sourceMappingURL=W3mFrameConstants.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getW3mThemeVariables",
    ()=>getW3mThemeVariables
]);
function getW3mThemeVariables(themeVariables, themeType) {
    if (themeType === 'light') {
        return {
            '--w3m-accent': themeVariables?.['--w3m-accent'] || 'hsla(231, 100%, 70%, 1)',
            '--w3m-background': '#fff'
        };
    }
    return {
        '--w3m-accent': themeVariables?.['--w3m-accent'] || 'hsla(230, 100%, 67%, 1)',
        '--w3m-background': '#202020'
    };
} //# sourceMappingURL=ThemeUtil.js.map
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
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ErrorUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorUtil",
    ()=>ErrorUtil,
    "ProviderRpcError",
    ()=>ProviderRpcError,
    "UserRejectedRequestError",
    ()=>UserRejectedRequestError
]);
const ErrorUtil = {
    RPC_ERROR_CODE: {
        USER_REJECTED_REQUEST: 4001
    },
    PROVIDER_RPC_ERROR_NAME: {
        PROVIDER_RPC: 'ProviderRpcError',
        USER_REJECTED_REQUEST: 'UserRejectedRequestError'
    },
    isRpcProviderError (error) {
        try {
            if (typeof error === 'object' && error !== null) {
                const objErr = error;
                const hasMessage = typeof objErr['message'] === 'string';
                const hasCode = typeof objErr['code'] === 'number';
                return hasMessage && hasCode;
            }
            return false;
        } catch  {
            return false;
        }
    },
    isUserRejectedMessage (message) {
        return message.toLowerCase().includes('user rejected') || message.toLowerCase().includes('user cancelled') || message.toLowerCase().includes('user canceled');
    },
    isUserRejectedRequestError (error) {
        if (ErrorUtil.isRpcProviderError(error)) {
            const isUserRejectedCode = error.code === ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_REQUEST;
            return isUserRejectedCode || ErrorUtil.isUserRejectedMessage(error.message);
        }
        if (error instanceof Error) {
            return ErrorUtil.isUserRejectedMessage(error.message);
        }
        return false;
    }
};
class ProviderRpcError extends Error {
    constructor(cause, options){
        super(options.message, {
            cause
        });
        this.name = ErrorUtil.PROVIDER_RPC_ERROR_NAME.PROVIDER_RPC;
        this.code = options.code;
    }
}
class UserRejectedRequestError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_REQUEST,
            message: 'User rejected the request'
        });
        this.name = ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
    }
} //# sourceMappingURL=ErrorUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/big.js/big.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Big",
    ()=>Big,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/*
 *  big.js v6.2.2
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2024 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */ /************************************** EDITABLE DEFAULTS *****************************************/ // The default values below must be integers within the stated ranges.
/*
   * The maximum number of decimal places (DP) of the results of operations involving division:
   * div and sqrt, and pow with negative exponents.
   */ var DP = 20, /*
   * The rounding mode (RM) used when rounding to the above decimal places.
   *
   *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
   *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
   *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
   *  3  Away from zero.                                  (ROUND_UP)
   */ RM = 1, // The maximum value of DP and Big.DP.
MAX_DP = 1E6, // The maximum magnitude of the exponent argument to the pow method.
MAX_POWER = 1E6, /*
   * The negative exponent (NE) at and beneath which toString returns exponential notation.
   * (JavaScript numbers: -7)
   * -1000000 is the minimum recommended exponent value of a Big.
   */ NE = -7, /*
   * The positive exponent (PE) at and above which toString returns exponential notation.
   * (JavaScript numbers: 21)
   * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
   */ PE = 21, /*
   * When true, an error will be thrown if a primitive number is passed to the Big constructor,
   * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
   * primitive number without a loss of precision.
   */ STRICT = false, /**************************************************************************************************/ // Error messages.
NAME = '[big.js] ', INVALID = NAME + 'Invalid ', INVALID_DP = INVALID + 'decimal places', INVALID_RM = INVALID + 'rounding mode', DIV_BY_ZERO = NAME + 'Division by zero', // The shared prototype object.
P = {}, UNDEFINED = void 0, NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
/*
 * Create and return a Big constructor.
 */ function _Big_() {
    /*
   * The Big constructor and exported function.
   * Create and return a new instance of a Big number object.
   *
   * n {number|string|Big} A numeric value.
   */ function Big(n) {
        var x = this;
        // Enable constructor usage without new.
        if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);
        // Duplicate.
        if (n instanceof Big) {
            x.s = n.s;
            x.e = n.e;
            x.c = n.c.slice();
        } else {
            if (typeof n !== 'string') {
                if (Big.strict === true && typeof n !== 'bigint') {
                    throw TypeError(INVALID + 'value');
                }
                // Minus zero?
                n = n === 0 && 1 / n < 0 ? '-0' : String(n);
            }
            parse(x, n);
        }
        // Retain a reference to this Big constructor.
        // Shadow Big.prototype.constructor which points to Object.
        x.constructor = Big;
    }
    Big.prototype = P;
    Big.DP = DP;
    Big.RM = RM;
    Big.NE = NE;
    Big.PE = PE;
    Big.strict = STRICT;
    Big.roundDown = 0;
    Big.roundHalfUp = 1;
    Big.roundHalfEven = 2;
    Big.roundUp = 3;
    return Big;
}
/*
 * Parse the number or string value passed to a Big constructor.
 *
 * x {Big} A Big number instance.
 * n {number|string} A numeric value.
 */ function parse(x, n) {
    var e, i, nl;
    if (!NUMERIC.test(n)) {
        throw Error(INVALID + 'number');
    }
    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;
    // Decimal point?
    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');
    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {
        // Determine exponent.
        if (e < 0) e = i;
        e += +n.slice(i + 1);
        n = n.substring(0, i);
    } else if (e < 0) {
        // Integer.
        e = n.length;
    }
    nl = n.length;
    // Determine leading zeros.
    for(i = 0; i < nl && n.charAt(i) == '0';)++i;
    if (i == nl) {
        // Zero.
        x.c = [
            x.e = 0
        ];
    } else {
        // Determine trailing zeros.
        for(; nl > 0 && n.charAt(--nl) == '0';);
        x.e = e - i - 1;
        x.c = [];
        // Convert string to array of digits without leading/trailing zeros.
        for(e = 0; i <= nl;)x.c[e++] = +n.charAt(i++);
    }
    return x;
}
/*
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */ function round(x, sd, rm, more) {
    var xc = x.c;
    if (rm === UNDEFINED) rm = x.constructor.RM;
    if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
        throw Error(INVALID_RM);
    }
    if (sd < 1) {
        more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
        xc.length = 1;
        if (more) {
            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            x.e = x.e - sd + 1;
            xc[0] = 1;
        } else {
            // Zero.
            xc[0] = x.e = 0;
        }
    } else if (sd < xc.length) {
        // xc[sd] is the digit after the digit that may be rounded up.
        more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);
        // Remove any digits after the required precision.
        xc.length = sd;
        // Round up?
        if (more) {
            // Rounding up may mean the previous digit has to be rounded up.
            for(; ++xc[--sd] > 9;){
                xc[sd] = 0;
                if (sd === 0) {
                    ++x.e;
                    xc.unshift(1);
                    break;
                }
            }
        }
        // Remove trailing zeros.
        for(sd = xc.length; !xc[--sd];)xc.pop();
    }
    return x;
}
/*
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */ function stringify(x, doExponential, isNonzero) {
    var e = x.e, s = x.c.join(''), n = s.length;
    // Exponential notation?
    if (doExponential) {
        s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;
    // Normal notation.
    } else if (e < 0) {
        for(; ++e;)s = '0' + s;
        s = '0.' + s;
    } else if (e > 0) {
        if (++e > n) {
            for(e -= n; e--;)s += '0';
        } else if (e < n) {
            s = s.slice(0, e) + '.' + s.slice(e);
        }
    } else if (n > 1) {
        s = s.charAt(0) + '.' + s.slice(1);
    }
    return x.s < 0 && isNonzero ? '-' + s : s;
}
// Prototype/instance methods
/*
 * Return a new Big whose value is the absolute value of this Big.
 */ P.abs = function() {
    var x = new this.constructor(this);
    x.s = 1;
    return x;
};
/*
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */ P.cmp = function(y) {
    var isneg, x = this, xc = x.c, yc = (y = new x.constructor(y)).c, i = x.s, j = y.s, k = x.e, l = y.e;
    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
    // Signs differ?
    if (i != j) return i;
    isneg = i < 0;
    // Compare exponents.
    if (k != l) return k > l ^ isneg ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l;
    // Compare digit by digit.
    for(i = -1; ++i < j;){
        if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }
    // Compare lengths.
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};
/*
 * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */ P.div = function(y) {
    var x = this, Big = x.constructor, a = x.c, b = (y = new Big(y)).c, k = x.s == y.s ? 1 : -1, dp = Big.DP;
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
        throw Error(INVALID_DP);
    }
    // Divisor is zero?
    if (!b[0]) {
        throw Error(DIV_BY_ZERO);
    }
    // Dividend is 0? Return +-0.
    if (!a[0]) {
        y.s = k;
        y.c = [
            y.e = 0
        ];
        return y;
    }
    var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, p = dp + (q.e = x.e - y.e) + 1; // precision of the result
    q.s = k;
    k = p < 0 ? 0 : p;
    // Create version of divisor with leading zero.
    bz.unshift(0);
    // Add zeros to make remainder as long as divisor.
    for(; rl++ < bl;)r.push(0);
    do {
        // n is how many times the divisor goes into current remainder.
        for(n = 0; n < 10; n++){
            // Compare divisor and remainder.
            if (bl != (rl = r.length)) {
                cmp = bl > rl ? 1 : -1;
            } else {
                for(ri = -1, cmp = 0; ++ri < bl;){
                    if (b[ri] != r[ri]) {
                        cmp = b[ri] > r[ri] ? 1 : -1;
                        break;
                    }
                }
            }
            // If divisor < remainder, subtract divisor from remainder.
            if (cmp < 0) {
                // Remainder can't be more than 1 digit longer than divisor.
                // Equalise lengths using divisor with extra leading zero?
                for(bt = rl == bl ? b : bz; rl;){
                    if (r[--rl] < bt[rl]) {
                        ri = rl;
                        for(; ri && !r[--ri];)r[ri] = 9;
                        --r[ri];
                        r[rl] += 10;
                    }
                    r[rl] -= bt[rl];
                }
                for(; !r[0];)r.shift();
            } else {
                break;
            }
        }
        // Add the digit n to the result array.
        qc[qi++] = cmp ? n : ++n;
        // Update the remainder.
        if (r[0] && cmp) r[rl] = a[ai] || 0;
        else r = [
            a[ai]
        ];
    }while ((ai++ < al || r[0] !== UNDEFINED) && k--)
    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {
        // There can't be more than one zero.
        qc.shift();
        q.e--;
        p--;
    }
    // Round?
    if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
    return q;
};
/*
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */ P.eq = function(y) {
    return this.cmp(y) === 0;
};
/*
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */ P.gt = function(y) {
    return this.cmp(y) > 0;
};
/*
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */ P.gte = function(y) {
    return this.cmp(y) > -1;
};
/*
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */ P.lt = function(y) {
    return this.cmp(y) < 0;
};
/*
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */ P.lte = function(y) {
    return this.cmp(y) < 1;
};
/*
 * Return a new Big whose value is the value of this Big minus the value of Big y.
 */ P.minus = P.sub = function(y) {
    var i, j, t, xlty, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    // Signs differ?
    if (a != b) {
        y.s = -b;
        return x.plus(y);
    }
    var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
    // Either zero?
    if (!xc[0] || !yc[0]) {
        if (yc[0]) {
            y.s = -b;
        } else if (xc[0]) {
            y = new Big(x);
        } else {
            y.s = 1;
        }
        return y;
    }
    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if (a = xe - ye) {
        if (xlty = a < 0) {
            a = -a;
            t = xc;
        } else {
            ye = xe;
            t = yc;
        }
        t.reverse();
        for(b = a; b--;)t.push(0);
        t.reverse();
    } else {
        // Exponents equal. Check digit by digit.
        j = ((xlty = xc.length < yc.length) ? xc : yc).length;
        for(a = b = 0; b < j; b++){
            if (xc[b] != yc[b]) {
                xlty = xc[b] < yc[b];
                break;
            }
        }
    }
    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
        t = xc;
        xc = yc;
        yc = t;
        y.s = -y.s;
    }
    /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
   * needs to start at yc.length.
   */ if ((b = (j = yc.length) - (i = xc.length)) > 0) for(; b--;)xc[i++] = 0;
    // Subtract yc from xc.
    for(b = i; j > a;){
        if (xc[--j] < yc[j]) {
            for(i = j; i && !xc[--i];)xc[i] = 9;
            --xc[i];
            xc[j] += 10;
        }
        xc[j] -= yc[j];
    }
    // Remove trailing zeros.
    for(; xc[--b] === 0;)xc.pop();
    // Remove leading zeros and adjust exponent accordingly.
    for(; xc[0] === 0;){
        xc.shift();
        --ye;
    }
    if (!xc[0]) {
        // n - n = +0
        y.s = 1;
        // Result must be zero.
        xc = [
            ye = 0
        ];
    }
    y.c = xc;
    y.e = ye;
    return y;
};
/*
 * Return a new Big whose value is the value of this Big modulo the value of Big y.
 */ P.mod = function(y) {
    var ygtx, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    if (!y.c[0]) {
        throw Error(DIV_BY_ZERO);
    }
    x.s = y.s = 1;
    ygtx = y.cmp(x) == 1;
    x.s = a;
    y.s = b;
    if (ygtx) return new Big(x);
    a = Big.DP;
    b = Big.RM;
    Big.DP = Big.RM = 0;
    x = x.div(y);
    Big.DP = a;
    Big.RM = b;
    return this.minus(x.times(y));
};
/*
 * Return a new Big whose value is the value of this Big negated.
 */ P.neg = function() {
    var x = new this.constructor(this);
    x.s = -x.s;
    return x;
};
/*
 * Return a new Big whose value is the value of this Big plus the value of Big y.
 */ P.plus = P.add = function(y) {
    var e, k, t, x = this, Big = x.constructor;
    y = new Big(y);
    // Signs differ?
    if (x.s != y.s) {
        y.s = -y.s;
        return x.minus(y);
    }
    var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
    // Either zero?
    if (!xc[0] || !yc[0]) {
        if (!yc[0]) {
            if (xc[0]) {
                y = new Big(x);
            } else {
                y.s = x.s;
            }
        }
        return y;
    }
    xc = xc.slice();
    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if (e = xe - ye) {
        if (e > 0) {
            ye = xe;
            t = yc;
        } else {
            e = -e;
            t = xc;
        }
        t.reverse();
        for(; e--;)t.push(0);
        t.reverse();
    }
    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
        t = yc;
        yc = xc;
        xc = t;
    }
    e = yc.length;
    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for(k = 0; e; xc[e] %= 10)k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    if (k) {
        xc.unshift(k);
        ++ye;
    }
    // Remove trailing zeros.
    for(e = xc.length; xc[--e] === 0;)xc.pop();
    y.c = xc;
    y.e = ye;
    return y;
};
/*
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of Big.DP decimal places using rounding
 * mode Big.RM.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */ P.pow = function(n) {
    var x = this, one = new x.constructor('1'), y = one, isneg = n < 0;
    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
        throw Error(INVALID + 'exponent');
    }
    if (isneg) n = -n;
    for(;;){
        if (n & 1) y = y.times(x);
        n >>= 1;
        if (!n) break;
        x = x.times(x);
    }
    return isneg ? one.div(y) : y;
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or Big.RM if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.prec = function(sd, rm) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
        throw Error(INVALID + 'precision');
    }
    return round(new this.constructor(this), sd, rm);
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or Big.RM if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.round = function(dp, rm) {
    if (dp === UNDEFINED) dp = 0;
    else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
        throw Error(INVALID_DP);
    }
    return round(new this.constructor(this), dp + this.e + 1, rm);
};
/*
 * Return a new Big whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */ P.sqrt = function() {
    var r, c, t, x = this, Big = x.constructor, s = x.s, e = x.e, half = new Big('0.5');
    // Zero?
    if (!x.c[0]) return new Big(x);
    // Negative?
    if (s < 0) {
        throw Error(NAME + 'No square root');
    }
    // Estimate.
    s = Math.sqrt(+stringify(x, true, true));
    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
        c = x.c.join('');
        if (!(c.length + e & 1)) c += '0';
        s = Math.sqrt(c);
        e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
        r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
    } else {
        r = new Big(s + '');
    }
    e = r.e + (Big.DP += 4);
    // Newton-Raphson iteration.
    do {
        t = r;
        r = half.times(t.plus(x.div(t)));
    }while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''))
    return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
};
/*
 * Return a new Big whose value is the value of this Big times the value of Big y.
 */ P.times = P.mul = function(y) {
    var c, x = this, Big = x.constructor, xc = x.c, yc = (y = new Big(y)).c, a = xc.length, b = yc.length, i = x.e, j = y.e;
    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;
    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) {
        y.c = [
            y.e = 0
        ];
        return y;
    }
    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;
    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
        c = xc;
        xc = yc;
        yc = c;
        j = a;
        a = b;
        b = j;
    }
    // Initialise coefficient array of result with zeros.
    for(c = new Array(j = a + b); j--;)c[j] = 0;
    // Multiply.
    // i is initially xc.length.
    for(i = b; i--;){
        b = 0;
        // a is yc.length.
        for(j = a + i; j > i;){
            // Current sum of products at this digit position, plus carry.
            b = c[j] + yc[i] * xc[j - i - 1] + b;
            c[j--] = b % 10;
            // carry
            b = b / 10 | 0;
        }
        c[j] = b;
    }
    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;
    else c.shift();
    // Remove trailing zeros.
    for(i = c.length; !c[--i];)c.pop();
    y.c = c;
    return y;
};
/*
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.toExponential = function(dp, rm) {
    var x = this, n = x.c[0];
    if (dp !== UNDEFINED) {
        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throw Error(INVALID_DP);
        }
        x = round(new x.constructor(x), ++dp, rm);
        for(; x.c.length < dp;)x.c.push(0);
    }
    return stringify(x, true, !!n);
};
/*
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */ P.toFixed = function(dp, rm) {
    var x = this, n = x.c[0];
    if (dp !== UNDEFINED) {
        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throw Error(INVALID_DP);
        }
        x = round(new x.constructor(x), dp + x.e + 1, rm);
        // x.e may have changed if the value is rounded up.
        for(dp = dp + x.e + 1; x.c.length < dp;)x.c.push(0);
    }
    return stringify(x, false, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Omit the sign for negative zero.
 */ P[Symbol.for('nodejs.util.inspect.custom')] = P.toJSON = P.toString = function() {
    var x = this, Big = x.constructor;
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
};
/*
 * Return the value of this Big as a primitve number.
 */ P.toNumber = function() {
    var n = +stringify(this, true, true);
    if (this.constructor.strict === true && !this.eq(n.toString())) {
        throw Error(NAME + 'Imprecise conversion');
    }
    return n;
};
/*
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or Big.RM if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.toPrecision = function(sd, rm) {
    var x = this, Big = x.constructor, n = x.c[0];
    if (sd !== UNDEFINED) {
        if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
            throw Error(INVALID + 'precision');
        }
        x = round(new Big(x), sd, rm);
        for(; x.c.length < sd;)x.c.push(0);
    }
    return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Include the sign for negative zero.
 */ P.valueOf = function() {
    var x = this, Big = x.constructor;
    if (Big.strict === true) {
        throw Error(NAME + 'valueOf disallowed');
    }
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
};
var Big = _Big_();
const __TURBOPACK__default__export__ = Big;
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NumberUtil",
    ()=>NumberUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/big.js/big.mjs [app-client] (ecmascript)");
;
const NumberUtil = {
    bigNumber (value) {
        if (!value) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](value);
    },
    multiply (a, b) {
        if (a === undefined || b === undefined) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0);
        }
        const aBigNumber = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](a);
        const bBigNumber = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](b);
        return aBigNumber.times(bBigNumber);
    },
    toFixed (value, decimals = 2) {
        if (value === undefined || value === '') {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0).toFixed(decimals);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](value).toFixed(decimals);
    },
    formatNumberToLocalString (value, decimals = 2) {
        if (value === undefined || value === '') {
            return '0.00';
        }
        if (typeof value === 'number') {
            return value.toLocaleString('en-US', {
                maximumFractionDigits: decimals,
                minimumFractionDigits: decimals,
                roundingMode: 'floor'
            });
        }
        return parseFloat(value).toLocaleString('en-US', {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
            roundingMode: 'floor'
        });
    },
    parseLocalStringToNumber (value) {
        if (value === undefined || value === '') {
            return 0;
        }
        const sanitizedValue = value.replace(/,/gu, '');
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](sanitizedValue).toNumber();
    }
}; //# sourceMappingURL=NumberUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/erc20.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "erc20ABI",
    ()=>erc20ABI
]);
const erc20ABI = [
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: '_to',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: '_from',
                type: 'address'
            },
            {
                name: '_to',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ]
    }
]; //# sourceMappingURL=erc20.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/swap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "swapABI",
    ()=>swapABI
]);
const swapABI = [
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    }
]; //# sourceMappingURL=swap.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/usdt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usdtABI",
    ()=>usdtABI
]);
const usdtABI = [
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: []
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'sender',
                type: 'address'
            },
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ]
    }
]; //# sourceMappingURL=usdt.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ContractUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractUtil",
    ()=>ContractUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$erc20$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/erc20.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$swap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/swap.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$usdt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/usdt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
;
;
const ContractUtil = {
    getERC20Abi: (tokenAddress)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].USDT_CONTRACT_ADDRESSES.includes(tokenAddress)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$usdt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usdtABI"];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$erc20$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["erc20ABI"];
    },
    getSwapAbi: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$swap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swapABI"]
}; //# sourceMappingURL=ContractUtil.js.map
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
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/ReownAuthenticationMessenger.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReownAuthenticationMessenger",
    ()=>ReownAuthenticationMessenger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
;
;
class ReownAuthenticationMessenger {
    constructor(params){
        this.getNonce = params.getNonce;
    }
    async createMessage(input) {
        const params = {
            accountAddress: input.accountAddress,
            chainId: input.chainId,
            version: '1',
            domain: typeof document === 'undefined' ? 'Unknown Domain' : document.location.host,
            uri: typeof document === 'undefined' ? 'Unknown URI' : document.location.href,
            resources: this.resources,
            nonce: await this.getNonce(input),
            issuedAt: this.stringifyDate(new Date()),
            statement: undefined,
            expirationTime: undefined,
            notBefore: undefined
        };
        const methods = {
            toString: ()=>this.stringify(params)
        };
        return Object.assign(params, methods);
    }
    stringify(params) {
        const networkName = this.getNetworkName(params.chainId);
        return [
            `${params.domain} wants you to sign in with your ${networkName} account:`,
            params.accountAddress,
            params.statement ? `\n${params.statement}\n` : '',
            `URI: ${params.uri}`,
            `Version: ${params.version}`,
            `Chain ID: ${params.chainId}`,
            `Nonce: ${params.nonce}`,
            params.issuedAt && `Issued At: ${params.issuedAt}`,
            params.expirationTime && `Expiration Time: ${params.expirationTime}`,
            params.notBefore && `Not Before: ${params.notBefore}`,
            params.requestId && `Request ID: ${params.requestId}`,
            params.resources?.length && params.resources.reduce((acc, resource)=>`${acc}\n- ${resource}`, 'Resources:')
        ].filter((line)=>typeof line === 'string').join('\n').trim();
    }
    getNetworkName(chainId) {
        const requestedNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].getNetworkNameByCaipNetworkId(requestedNetworks, chainId);
    }
    stringifyDate(date) {
        return date.toISOString();
    }
} //# sourceMappingURL=ReownAuthenticationMessenger.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/ReownAuthentication.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReownAuthentication",
    ()=>ReownAuthentication
]);
//
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$ReownAuthenticationMessenger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/ReownAuthenticationMessenger.js [app-client] (ecmascript)");
;
;
;
;
;
;
class ReownAuthentication {
    constructor(params = {}){
        this.otpUuid = null;
        this.listeners = {
            sessionChanged: []
        };
        this.localAuthStorageKey = params.localAuthStorageKey || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].SIWX_AUTH_TOKEN;
        this.localNonceStorageKey = params.localNonceStorageKey || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].SIWX_NONCE_TOKEN;
        this.required = params.required ?? true;
        this.messenger = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$ReownAuthenticationMessenger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReownAuthenticationMessenger"]({
            getNonce: this.getNonce.bind(this)
        });
    }
    async createMessage(input) {
        return this.messenger.createMessage(input);
    }
    async addSession(session) {
        const response = await this.request({
            method: 'POST',
            key: 'authenticate',
            body: {
                data: session.data,
                message: session.message,
                signature: session.signature,
                clientId: this.getClientId(),
                walletInfo: this.getWalletInfo()
            },
            headers: [
                'nonce',
                'otp'
            ]
        });
        this.setStorageToken(response.token, this.localAuthStorageKey);
        this.emit('sessionChanged', session);
        this.setAppKitAccountUser(jwtDecode(response.token));
        this.otpUuid = null;
    }
    async getSessions(chainId, address) {
        try {
            if (!this.getStorageToken(this.localAuthStorageKey)) {
                return [];
            }
            const account = await this.request({
                method: 'GET',
                key: 'me',
                query: {},
                headers: [
                    'auth'
                ]
            });
            if (!account) {
                return [];
            }
            const isSameAddress = account.address.toLowerCase() === address.toLowerCase();
            const isSameNetwork = account.caip2Network === chainId;
            if (!isSameAddress || !isSameNetwork) {
                return [];
            }
            const session = {
                data: {
                    accountAddress: account.address,
                    chainId: account.caip2Network
                },
                message: '',
                signature: ''
            };
            this.emit('sessionChanged', session);
            this.setAppKitAccountUser(account);
            return [
                session
            ];
        } catch  {
            return [];
        }
    }
    async revokeSession(_chainId, _address) {
        return Promise.resolve(this.clearStorageTokens());
    }
    async setSessions(sessions) {
        if (sessions.length === 0) {
            this.clearStorageTokens();
        } else {
            const session = sessions.find((s)=>s.data.chainId === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ChainControllerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveCaipNetwork"])()?.caipNetworkId) || sessions[0];
            await this.addSession(session);
        }
    }
    getRequired() {
        return this.required;
    }
    async getSessionAccount() {
        if (!this.getStorageToken(this.localAuthStorageKey)) {
            throw new Error('Not authenticated');
        }
        return this.request({
            method: 'GET',
            key: 'me',
            body: undefined,
            query: {
                includeAppKitAccount: true
            },
            headers: [
                'auth'
            ]
        });
    }
    async setSessionAccountMetadata(metadata = null) {
        if (!this.getStorageToken(this.localAuthStorageKey)) {
            throw new Error('Not authenticated');
        }
        return this.request({
            method: 'PUT',
            key: 'account-metadata',
            body: {
                metadata
            },
            headers: [
                'auth'
            ]
        });
    }
    on(event, callback) {
        this.listeners[event].push(callback);
        return ()=>{
            this.listeners[event] = this.listeners[event].filter((cb)=>cb !== callback);
        };
    }
    removeAllListeners() {
        const keys = Object.keys(this.listeners);
        keys.forEach((key)=>{
            this.listeners[key] = [];
        });
    }
    async requestEmailOtp({ email, account }) {
        const otp = await this.request({
            method: 'POST',
            key: 'otp',
            body: {
                email,
                account
            }
        });
        this.otpUuid = otp.uuid;
        this.messenger.resources = [
            `email:${email}`
        ];
        return otp;
    }
    confirmEmailOtp({ code }) {
        return this.request({
            method: 'PUT',
            key: 'otp',
            body: {
                code
            },
            headers: [
                'otp'
            ]
        });
    }
    async request({ method, key, query, body, headers }) {
        const { projectId, st, sv } = this.getSDKProperties();
        const url = new URL(`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].W3M_API_URL}/auth/v1/${String(key)}`);
        url.searchParams.set('projectId', projectId);
        url.searchParams.set('st', st);
        url.searchParams.set('sv', sv);
        if (query) {
            Object.entries(query).forEach(([queryKey, queryValue])=>url.searchParams.set(queryKey, String(queryValue)));
        }
        const response = await fetch(url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: Array.isArray(headers) ? headers.reduce((acc, header)=>{
                switch(header){
                    case 'nonce':
                        acc['x-nonce-jwt'] = `Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;
                        break;
                    case 'auth':
                        acc['Authorization'] = `Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;
                        break;
                    case 'otp':
                        if (this.otpUuid) {
                            acc['x-otp'] = this.otpUuid;
                        }
                        break;
                    default:
                        break;
                }
                return acc;
            }, {}) : undefined
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json();
        }
        return null;
    }
    getStorageToken(key) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(key);
    }
    setStorageToken(token, key) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(key, token);
    }
    clearStorageTokens() {
        this.otpUuid = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(this.localAuthStorageKey);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(this.localNonceStorageKey);
        this.emit('sessionChanged', undefined);
    }
    async getNonce() {
        const { nonce, token } = await this.request({
            method: 'GET',
            key: 'nonce'
        });
        this.setStorageToken(token, this.localNonceStorageKey);
        return nonce;
    }
    getClientId() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].state.clientId;
    }
    getWalletInfo() {
        const walletInfo = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountData()?.connectedWalletInfo;
        if (!walletInfo) {
            return undefined;
        }
        if ('social' in walletInfo && 'identifier' in walletInfo) {
            const social = walletInfo['social'];
            const identifier = walletInfo['identifier'];
            return {
                type: 'social',
                social,
                identifier
            };
        }
        const { name, icon } = walletInfo;
        let type = 'unknown';
        switch(walletInfo.type){
            case 'EXTERNAL':
            case 'INJECTED':
            case 'ANNOUNCED':
                type = 'extension';
                break;
            case 'WALLET_CONNECT':
                type = 'walletconnect';
                break;
            default:
                type = 'unknown';
        }
        return {
            type,
            name,
            icon
        };
    }
    getSDKProperties() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"]._getSdkProperties();
    }
    emit(event, data) {
        this.listeners[event].forEach((listener)=>listener(data));
    }
    setAppKitAccountUser(session) {
        const { email } = session;
        if (email) {
            Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN).forEach((chainNamespace)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('user', {
                    email
                }, chainNamespace);
            });
        }
    }
}
/**
 * Decodes a JWT token and returns its payload
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */ function jwtDecode(token) {
    // Split the token into parts
    const parts = token.split('.');
    // Check if the token has the correct format (header.payload.signature)
    if (parts.length !== 3) {
        throw new Error('Invalid token');
    }
    // Decode the payload (second part)
    const payload = parts[1];
    if (typeof payload !== 'string') {
        throw new Error('Invalid token');
    }
    // Convert base64url to base64
    const base64 = payload.replace(/-/gu, '+').replace(/_/gu, '/');
    // Add padding if needed
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    // Decode and parse the JSON
    const decoded = JSON.parse(atob(padded));
    return decoded;
} //# sourceMappingURL=ReownAuthentication.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReownAuthentication",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$ReownAuthentication$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReownAuthentication"],
    "ReownAuthenticationMessenger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$ReownAuthenticationMessenger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReownAuthenticationMessenger"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$ReownAuthentication$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/ReownAuthentication.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$ReownAuthenticationMessenger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/ReownAuthenticationMessenger.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/exports/features.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReownAuthentication",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReownAuthentication"],
    "ReownAuthenticationMessenger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReownAuthenticationMessenger"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$exports$2f$features$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/exports/features.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$features$2f$reown$2d$authentication$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/features/reown-authentication/index.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=1b50e_88c93c25._.js.map