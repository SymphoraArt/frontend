(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "webLocalStorage",
    ()=>webLocalStorage
]);
const webLocalStorage = {
    async getItem (key) {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                return localStorage.getItem(key);
            }
        } catch  {
        // ignore
        }
        return null;
    },
    async removeItem (key) {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem(key);
        }
    },
    async setItem (key, value) {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem(key, value);
            }
        } catch  {
        // ignore
        }
    }
}; //# sourceMappingURL=webStorage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_RPC_URL",
    ()=>DEFAULT_RPC_URL,
    "getServiceKey",
    ()=>getServiceKey,
    "getThirdwebBaseUrl",
    ()=>getThirdwebBaseUrl,
    "getThirdwebDomains",
    ()=>getThirdwebDomains,
    "setServiceKey",
    ()=>setServiceKey,
    "setThirdwebDomains",
    ()=>setThirdwebDomains
]);
const DEFAULT_RPC_URL = "rpc.thirdweb.com";
const DEFAULT_SOCIAL_URL = "social.thirdweb.com";
const DEFAULT_IN_APP_WALLET_URL = "embedded-wallet.thirdweb.com";
const DEFAULT_PAY_URL = "pay.thirdweb.com";
const DEFAULT_STORAGE_URL = "storage.thirdweb.com";
const DEFAULT_BUNDLER_URL = "bundler.thirdweb.com";
const DEFAULT_ANALYTICS_URL = "c.thirdweb.com";
const DEFAULT_INSIGHT_URL = "insight.thirdweb.com";
const DEFAULT_ENGINE_CLOUD_URL = "engine.thirdweb.com";
const DEFAULT_BRIDGE_URL = "bridge.thirdweb.com";
let domains = {
    analytics: DEFAULT_ANALYTICS_URL,
    bridge: DEFAULT_BRIDGE_URL,
    bundler: DEFAULT_BUNDLER_URL,
    engineCloud: DEFAULT_ENGINE_CLOUD_URL,
    inAppWallet: DEFAULT_IN_APP_WALLET_URL,
    insight: DEFAULT_INSIGHT_URL,
    pay: DEFAULT_PAY_URL,
    rpc: DEFAULT_RPC_URL,
    social: DEFAULT_SOCIAL_URL,
    storage: DEFAULT_STORAGE_URL
};
const setThirdwebDomains = (DomainOverrides)=>{
    domains = {
        analytics: DomainOverrides.analytics ?? DEFAULT_ANALYTICS_URL,
        bridge: DomainOverrides.bridge ?? DEFAULT_BRIDGE_URL,
        bundler: DomainOverrides.bundler ?? DEFAULT_BUNDLER_URL,
        engineCloud: DomainOverrides.engineCloud ?? DEFAULT_ENGINE_CLOUD_URL,
        inAppWallet: DomainOverrides.inAppWallet ?? DEFAULT_IN_APP_WALLET_URL,
        insight: DomainOverrides.insight ?? DEFAULT_INSIGHT_URL,
        pay: DomainOverrides.pay ?? DEFAULT_PAY_URL,
        rpc: DomainOverrides.rpc ?? DEFAULT_RPC_URL,
        social: DomainOverrides.social ?? DEFAULT_SOCIAL_URL,
        storage: DomainOverrides.storage ?? DEFAULT_STORAGE_URL
    };
};
const getThirdwebDomains = ()=>{
    return domains;
};
const getThirdwebBaseUrl = (service)=>{
    const origin = domains[service];
    if (origin.startsWith("localhost")) {
        return `http://${origin}`;
    }
    return `https://${origin}`;
};
let serviceKey = null;
const setServiceKey = (key)=>{
    serviceKey = key;
};
const getServiceKey = ()=>{
    return serviceKey;
}; //# sourceMappingURL=domains.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/version.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = "5.116.1"; //# sourceMappingURL=version.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */ __turbopack_context__.s([
    "LruMap",
    ()=>LruMap
]);
class LruMap extends Map {
    constructor(size){
        super();
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxSize = size;
    }
    get(key) {
        const value = super.get(key);
        if (super.has(key) && value !== undefined) {
            this.delete(key);
            super.set(key, value);
        }
        return value;
    }
    set(key, value) {
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
            const firstKey = this.keys().next().value;
            if (firstKey) {
                this.delete(firstKey);
            }
        }
        return this;
    }
} //# sourceMappingURL=lru.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/detect-platform.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectOS",
    ()=>detectOS,
    "detectPlatform",
    ()=>detectPlatform
]);
const operatingSystemRules = [
    [
        "iOS",
        /iP(hone|od|ad)/
    ],
    [
        "Android OS",
        /Android/
    ],
    [
        "BlackBerry OS",
        /BlackBerry|BB10/
    ],
    [
        "Windows Mobile",
        /IEMobile/
    ],
    [
        "Amazon OS",
        /Kindle/
    ],
    [
        "Windows 3.11",
        /Win16/
    ],
    [
        "Windows 95",
        /(Windows 95)|(Win95)|(Windows_95)/
    ],
    [
        "Windows 98",
        /(Windows 98)|(Win98)/
    ],
    [
        "Windows 2000",
        /(Windows NT 5.0)|(Windows 2000)/
    ],
    [
        "Windows XP",
        /(Windows NT 5.1)|(Windows XP)/
    ],
    [
        "Windows Server 2003",
        /(Windows NT 5.2)/
    ],
    [
        "Windows Vista",
        /(Windows NT 6.0)/
    ],
    [
        "Windows 7",
        /(Windows NT 6.1)/
    ],
    [
        "Windows 8",
        /(Windows NT 6.2)/
    ],
    [
        "Windows 8.1",
        /(Windows NT 6.3)/
    ],
    [
        "Windows 10",
        /(Windows NT 10.0)/
    ],
    [
        "Windows ME",
        /Windows ME/
    ],
    [
        "Windows CE",
        /Windows CE|WinCE|Microsoft Pocket Internet Explorer/
    ],
    [
        "Open BSD",
        /OpenBSD/
    ],
    [
        "Sun OS",
        /SunOS/
    ],
    [
        "Chrome OS",
        /CrOS/
    ],
    [
        "Linux",
        /(Linux)|(X11)/
    ],
    [
        "Mac OS",
        /(Mac_PowerPC)|(Macintosh)/
    ],
    [
        "QNX",
        /QNX/
    ],
    [
        "BeOS",
        /BeOS/
    ],
    [
        "OS/2",
        /OS\/2/
    ]
];
function detectPlatform() {
    if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        // react-native
        return "mobile";
    }
    if (typeof navigator !== "undefined") {
        return "browser";
    }
    return "node";
}
function detectOS(ua) {
    for(let ii = 0, count = operatingSystemRules.length; ii < count; ii++){
        const [os, regex] = operatingSystemRules[ii];
        const match = regex.exec(ua);
        if (match) {
            return os;
        }
    }
    return null;
} //# sourceMappingURL=detect-platform.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/jwt/is-jwt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isJWT",
    ()=>isJWT
]);
function isJWT(str) {
    return str.split(".").length === 3;
} //# sourceMappingURL=is-jwt.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/process.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// You must use typeof process !== "undefined" instead of just "process"
__turbopack_context__.s([
    "IS_DEV",
    ()=>IS_DEV,
    "IS_TEST",
    ()=>IS_TEST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const IS_DEV = typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && (("TURBOPACK compile-time value", "development") === "development" || ("TURBOPACK compile-time value", "development") === "test");
const IS_TEST = typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "development") === "test"; //# sourceMappingURL=process.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IS_THIRDWEB_URL_CACHE",
    ()=>IS_THIRDWEB_URL_CACHE,
    "getClientFetch",
    ()=>getClientFetch,
    "getPlatformHeaders",
    ()=>getPlatformHeaders,
    "isThirdwebUrl",
    ()=>isThirdwebUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/version.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/detect-platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$jwt$2f$is$2d$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/jwt/is-jwt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/process.js [app-client] (ecmascript)");
;
;
;
;
;
;
const DEFAULT_REQUEST_TIMEOUT = 60000;
function getClientFetch(client, ecosystem) {
    /**
     * @internal
     */ async function fetchWithHeaders(url, init) {
        const { requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT, useAuthToken, ...restInit } = init || {};
        let headers = restInit.headers ? new Headers(restInit.headers) : typeof url === "object" ? url.headers : undefined;
        const urlString = typeof url === "string" ? url : url.url;
        // check if we are making a request to a thirdweb service (we don't want to send any headers to non-thirdweb services)
        if (isThirdwebUrl(urlString)) {
            if (!headers) {
                headers = new Headers();
            }
            // auth token if secret key === jwt
            const authToken = useAuthToken && client.secretKey && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$jwt$2f$is$2d$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJWT"])(client.secretKey) ? client.secretKey : undefined;
            // secret key if secret key !== jwt
            const secretKey = client.secretKey && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$jwt$2f$is$2d$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJWT"])(client.secretKey) ? client.secretKey : undefined;
            const clientId = client.clientId;
            if (authToken && isBundlerUrl(urlString)) {
                headers.set("authorization", `Bearer ${authToken}`);
                if (client.teamId) {
                    headers.set("x-team-id", client.teamId);
                }
                if (clientId) {
                    headers.set("x-client-id", clientId);
                }
            } else if (authToken && !isPayUrl(urlString) && !isInAppWalletUrl(urlString)) {
                headers.set("authorization", `Bearer ${authToken}`);
                // if we have a specific teamId set, add it to the request headers
                if (client.teamId) {
                    headers.set("x-team-id", client.teamId);
                }
            } else {
                // only set secret key or client id if we are NOT using the auth token!
                if (secretKey) {
                    headers.set("x-secret-key", secretKey);
                }
                if (clientId) {
                    headers.set("x-client-id", clientId);
                }
            }
            if (ecosystem) {
                headers.set("x-ecosystem-id", ecosystem.id);
                if (ecosystem.partnerId) {
                    headers.set("x-ecosystem-partner-id", ecosystem.partnerId);
                }
            }
            // this already internally caches
            for (const [key, value] of getPlatformHeaders()){
                headers.set(key, value);
            }
            const serviceKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getServiceKey"])();
            if (serviceKey) {
                headers.set("x-service-api-key", serviceKey);
            }
        }
        let controller;
        let abortTimeout;
        if (requestTimeoutMs) {
            controller = new AbortController();
            abortTimeout = setTimeout(()=>{
                controller?.abort("timeout");
            }, requestTimeoutMs);
        }
        return fetch(url, {
            ...restInit,
            headers,
            signal: controller?.signal
        }).finally(()=>{
            if (abortTimeout) {
                clearTimeout(abortTimeout);
            }
        });
    }
    return fetchWithHeaders;
}
// NOTE: these all start with "." because we want to make sure we don't match (for example) "otherthirdweb.com"
const THIRDWEB_DOMAINS = [
    ".thirdweb.com",
    ".ipfscdn.io",
    // dev domains
    ".thirdweb.dev",
    ".thirdweb-dev.com",
    ".thirdwebstorage-dev.com"
];
const IS_THIRDWEB_URL_CACHE = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](4096);
function isThirdwebUrl(url) {
    if (IS_THIRDWEB_URL_CACHE.has(url)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return IS_THIRDWEB_URL_CACHE.get(url);
    }
    try {
        const { hostname } = new URL(url);
        try {
            // special case for localhost in development only
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_DEV"]) {
                if (hostname === "localhost") {
                    IS_THIRDWEB_URL_CACHE.set(url, true);
                    return true;
                }
            }
        } catch  {}
        const is = THIRDWEB_DOMAINS.some((domain)=>hostname.endsWith(domain));
        IS_THIRDWEB_URL_CACHE.set(url, is);
        return is;
    } catch  {
        IS_THIRDWEB_URL_CACHE.set(url, false);
        return false;
    }
}
function isPayUrl(url) {
    try {
        const { hostname } = new URL(url);
        // pay service hostname always starts with "pay."
        return hostname.startsWith("pay.");
    } catch  {
        return false;
    }
}
function isInAppWalletUrl(url) {
    try {
        const { hostname } = new URL(url);
        // in app wallet service hostname always starts with "in-app-wallet." or "embedded-wallet."
        return hostname.startsWith("in-app-wallet.") || hostname.startsWith("embedded-wallet.");
    } catch  {
        return false;
    }
}
function isBundlerUrl(url) {
    try {
        const { hostname } = new URL(url);
        return hostname.endsWith(".bundler.thirdweb.com") || hostname.endsWith(".bundler.thirdweb-dev.com");
    } catch  {
        return false;
    }
}
const SDK_NAME = "unified-sdk";
let previousPlatform;
function getPlatformHeaders() {
    if (previousPlatform) {
        return previousPlatform;
    }
    let os = null;
    if (typeof navigator !== "undefined") {
        os = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectOS"])(navigator.userAgent);
    }
    let bundleId;
    if (typeof globalThis !== "undefined" && "Application" in globalThis) {
        // shims use wallet connect RN module which injects Application info in globalThis
        // biome-ignore lint/suspicious/noExplicitAny: get around globalThis typing
        bundleId = globalThis.Application.applicationId;
    }
    previousPlatform = Object.entries({
        "x-sdk-name": SDK_NAME,
        "x-sdk-os": os ? parseOs(os) : "unknown",
        "x-sdk-platform": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectPlatform"])(),
        "x-sdk-version": __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
        ...bundleId ? {
            "x-bundle-id": bundleId
        } : {}
    });
    return previousPlatform;
}
/**
 * @internal
 */ function parseOs(os) {
    const osLowerCased = os.toLowerCase();
    if (osLowerCased.startsWith("win")) {
        return "win";
    }
    // we do NOT use the lowercase here
    switch(os){
        case "Mac OS":
            return "mac";
        case "iOS":
            return "ios";
        case "Android OS":
            return "android";
        default:
            // if we somehow fall through here, just replace all spaces with underscores and send it
            return osLowerCased.replace(/\s/gi, "_");
    }
} //# sourceMappingURL=fetch.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCache",
    ()=>getCache,
    "withCache",
    ()=>withCache
]);
// copy of: https://github.com/wevm/viem/blob/6cf2c3b5fe608bce9c828af867dfaa65103753a6/src/utils/promise/withCache.ts
// with slight adjustments made to comply with our linting rules
// TODO: explore extracting this from viem and instead having a separate general purpose library for this kind of thing
// alternatively viem could maybe export this helpful util
// TODO: explore using a LRU cache instead of a Map
const promiseCache = /*#__PURE__*/ new Map();
const responseCache = /*#__PURE__*/ new Map();
function getCache(cacheKey) {
    const buildCache = (cacheKey_, cache)=>({
            clear: ()=>cache.delete(cacheKey_),
            get: ()=>cache.get(cacheKey_),
            set: (data)=>cache.set(cacheKey_, data)
        });
    const promise = buildCache(cacheKey, promiseCache);
    const response = buildCache(cacheKey, responseCache);
    return {
        clear: ()=>{
            promise.clear();
            response.clear();
        },
        promise,
        response
    };
}
async function withCache(fn, { cacheKey, cacheTime = Number.POSITIVE_INFINITY }) {
    const cache = getCache(cacheKey);
    // If a response exists in the cache, and it's not expired, return it
    // and do not invoke the promise.
    // If the max age is 0, the cache is disabled.
    const response = cache.response.get();
    if (response && cacheTime > 0) {
        const age = Date.now() - response.created.getTime();
        if (age < cacheTime) {
            return response.data;
        }
    }
    let promise = cache.promise.get();
    if (!promise) {
        promise = fn();
        // Store the promise in the cache so that subsequent invocations
        // will wait for the same promise to resolve (deduping).
        cache.promise.set(promise);
    }
    try {
        const data = await promise;
        // Store the response in the cache so that subsequent invocations
        // will return the same response.
        cache.response.set({
            created: new Date(),
            data
        });
        return data;
    } finally{
        // Clear the promise cache so that subsequent invocations will
        // invoke the promise again.
        cache.promise.clear();
    }
} //# sourceMappingURL=withCache.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CUSTOM_CHAIN_MAP",
    ()=>CUSTOM_CHAIN_MAP,
    "cacheChains",
    ()=>cacheChains,
    "convertApiChainToChain",
    ()=>convertApiChainToChain,
    "convertLegacyChain",
    ()=>convertLegacyChain,
    "convertViemChain",
    ()=>convertViemChain,
    "defineChain",
    ()=>defineChain,
    "getCachedChain",
    ()=>getCachedChain,
    "getCachedChainIfExists",
    ()=>getCachedChainIfExists,
    "getChainDecimals",
    ()=>getChainDecimals,
    "getChainMetadata",
    ()=>getChainMetadata,
    "getChainNativeCurrencyName",
    ()=>getChainNativeCurrencyName,
    "getChainSymbol",
    ()=>getChainSymbol,
    "getInsightEnabledChainIds",
    ()=>getInsightEnabledChainIds,
    "getRpcUrlForChain",
    ()=>getRpcUrlForChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-client] (ecmascript)");
;
;
;
const CUSTOM_CHAIN_MAP = new Map();
function defineChain(options) {
    const RPC_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
    if (typeof options === "number") {
        return {
            id: options,
            rpc: `https://${options}.${RPC_URL}`
        };
    }
    if (isViemChain(options)) {
        return convertViemChain(options);
    }
    if (isLegacyChain(options)) {
        return convertLegacyChain(options);
    }
    // otherwise if it's not a viem chain, continue
    let rpc = options.rpc;
    if (!rpc) {
        rpc = `https://${options.id}.${RPC_URL}`;
    }
    const chain = {
        ...options,
        rpc
    };
    CUSTOM_CHAIN_MAP.set(options.id, chain);
    return chain;
}
function cacheChains(chains) {
    for (const chain of chains){
        CUSTOM_CHAIN_MAP.set(chain.id, chain);
    }
}
function getCachedChain(id) {
    if (CUSTOM_CHAIN_MAP.has(id)) {
        return CUSTOM_CHAIN_MAP.get(id);
    }
    const RPC_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
    const chain = {
        id: id,
        rpc: `https://${id}.${RPC_URL}`
    };
    return chain;
}
function getCachedChainIfExists(id) {
    return CUSTOM_CHAIN_MAP.get(id);
}
function isLegacyChain(chain) {
    return "rpc" in chain && Array.isArray(chain.rpc) && "slug" in chain;
}
function convertLegacyChain(legacyChain) {
    const RPC_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
    return {
        blockExplorers: legacyChain?.explorers?.map((explorer)=>({
                apiUrl: explorer.url,
                name: explorer.name,
                url: explorer.url
            })),
        faucets: legacyChain.faucets ? [
            ...legacyChain.faucets
        ] : undefined,
        icon: legacyChain.icon,
        id: legacyChain.chainId,
        name: legacyChain.name,
        nativeCurrency: {
            decimals: legacyChain.nativeCurrency.decimals,
            name: legacyChain.nativeCurrency.name,
            symbol: legacyChain.nativeCurrency.symbol
        },
        rpc: legacyChain.rpc[0] ?? `https://${legacyChain.chainId}.${RPC_URL}`,
        testnet: legacyChain.testnet ? true : undefined
    };
}
function isViemChain(chain) {
    return "rpcUrls" in chain && !("rpc" in chain);
}
function convertViemChain(viemChain) {
    const RPC_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
    return {
        blockExplorers: viemChain?.blockExplorers ? Object.values(viemChain?.blockExplorers).map((explorer)=>{
            return {
                apiUrl: explorer.apiUrl,
                name: explorer.name,
                url: explorer.url
            };
        }) : [],
        id: viemChain.id,
        name: viemChain.name,
        nativeCurrency: {
            decimals: viemChain.nativeCurrency.decimals,
            name: viemChain.nativeCurrency.name,
            symbol: viemChain.nativeCurrency.symbol
        },
        rpc: viemChain.rpcUrls.default.http[0] ?? `https://${viemChain.id}.${RPC_URL}`,
        testnet: viemChain.testnet ? true : undefined
    };
}
function getRpcUrlForChain(options) {
    const baseRpcUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
    // if the chain is just a number, construct the RPC URL using the chain ID and client ID
    if (typeof options.chain === "number") {
        return `https://${options.chain}.${baseRpcUrl}/${options.client.clientId}`;
    }
    const { rpc } = options.chain;
    // add on the client ID to the RPC URL if it's a thirdweb URL
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isThirdwebUrl"])(rpc)) {
        const rpcUrl = new URL(options.chain.rpc.replace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_RPC_URL"], baseRpcUrl));
        if (rpcUrl.pathname === "/" || rpcUrl.pathname.startsWith("/$")) {
            rpcUrl.pathname = `/${options.client.clientId}`;
        }
        return rpcUrl.toString();
    }
    return rpc;
}
async function getChainSymbol(chain) {
    if (!chain.nativeCurrency?.symbol) {
        return getChainMetadata(chain).then((data)=>data.nativeCurrency.symbol).catch(()=>{
            // if we fail to fetch the chain data, return "ETH" as a fallback
            return "ETH";
        });
    }
    // if we have a symbol, return it
    return chain.nativeCurrency.symbol;
}
async function getChainDecimals(chain) {
    if (!chain.nativeCurrency?.decimals) {
        return getChainMetadata(chain).then((data)=>data.nativeCurrency.decimals).catch(()=>{
            // if we fail to fetch the chain data, return 18 as a fallback (most likely it's 18)
            return 18;
        });
    }
    // if we have decimals, return it
    return chain.nativeCurrency.decimals;
}
async function getChainNativeCurrencyName(chain) {
    if (!chain.nativeCurrency?.name) {
        return getChainMetadata(chain).then((data)=>data.nativeCurrency.name).catch(()=>{
            // if we fail to fetch the chain data, return 18 as a fallback (most likely it's 18)
            return "ETH";
        });
    }
    // if we have a name, return it
    return chain.nativeCurrency.name;
}
function getChainMetadata(chain) {
    const chainId = chain.id;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        try {
            const res = await fetch(`https://api.thirdweb.com/v1/chains/${chainId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch chain data for chainId ${chainId}. ${res.status} ${res.statusText}`);
            }
            const response = await res.json();
            if (response.error) {
                throw new Error(`Failed to fetch chain data for chainId ${chainId}`);
            }
            if (!response.data) {
                throw new Error(`Failed to fetch chain data for chainId ${chainId}`);
            }
            const data = response.data;
            return createChainMetadata(chain, data);
        } catch  {
            return createChainMetadata(chain);
        }
    }, {
        cacheKey: `chain:${chainId}`,
        cacheTime: 5 * 60 * 1000
    });
}
async function getInsightEnabledChainIds() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const res = await fetch(`https://api.thirdweb.com/v1/chains/services?service=insight`);
        if (!res.ok) {
            throw new Error(`Failed to fetch services. ${res.status} ${res.statusText}`);
        }
        const response = await res.json();
        return Object.keys(response.data).map((chainId)=>Number(chainId));
    }, {
        cacheKey: `chain:insight-enabled`,
        cacheTime: 24 * 60 * 60 * 1000
    });
}
function convertApiChainToChain(apiChain) {
    return {
        blockExplorers: apiChain.explorers?.map((explorer)=>{
            return {
                apiUrl: explorer.url,
                name: explorer.name,
                url: explorer.url
            };
        }),
        faucets: apiChain.faucets ? [
            ...apiChain.faucets
        ] : undefined,
        icon: apiChain.icon,
        id: apiChain.chainId,
        name: apiChain.name,
        nativeCurrency: apiChain.nativeCurrency,
        rpc: apiChain.rpc[0] || "",
        testnet: apiChain.testnet === true ? true : undefined
    };
}
function createChainMetadata(chain, data) {
    const nativeCurrency = chain.nativeCurrency ? {
        ...data?.nativeCurrency,
        ...chain.nativeCurrency
    } : data?.nativeCurrency;
    return {
        ...data,
        chain: data?.chain || chain.name || "",
        chainId: chain.id || data?.chainId || -1,
        explorers: chain.blockExplorers?.map((e)=>({
                name: e.name,
                standard: "EIP3091",
                url: e.url
            })) || data?.explorers,
        icon: chain.icon || data?.icon,
        name: chain.name || data?.name || "",
        nativeCurrency: {
            decimals: nativeCurrency?.decimals || 18,
            name: nativeCurrency?.name || "",
            symbol: nativeCurrency?.symbol || ""
        },
        rpc: chain.rpc ? [
            chain.rpc
        ] : data?.rpc || [
            ""
        ],
        shortName: data?.shortName || chain.name || "",
        slug: data?.slug || chain.name || "",
        stackType: data?.stackType || "",
        testnet: chain.testnet || data?.testnet || false
    };
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/computedStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create a readonly store whose value is computed from other stores
 * @param computation - The function to compute the value of the store
 * @param dependencies - The stores it depends on
 * @example
 * ```ts
 * const foo = computed(() => bar.getValue() + baz.getValue(), [bar, baz]);
 * ```
 * @returns A store object
 */ __turbopack_context__.s([
    "computedStore",
    ()=>computedStore
]);
function computedStore(// pass the values of the dependencies to the computation function
computation, // biome-ignore lint/suspicious/noExplicitAny: library function that accepts any store type
dependencies) {
    const listeners = new Set();
    let value = computation();
    const notify = ()=>{
        for (const listener of listeners){
            listener();
        }
    };
    const setValue = (newValue)=>{
        value = newValue;
        notify();
    };
    // when any of the dependencies change, recompute the value and set it
    for (const store of dependencies){
        store.subscribe(()=>{
            setValue(computation());
        });
    }
    return {
        getValue () {
            return value;
        },
        subscribe (listener) {
            listeners.add(listener);
            return ()=>{
                listeners.delete(listener);
            };
        }
    };
} //# sourceMappingURL=computedStore.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/effect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Run a function whenever dependencies change
 * @param effectFn - Side effect function to run
 * @param dependencies - The stores it depends on
 * @param runOnMount - Whether to run the effect function immediately or not
 * @example
 * ```ts
 * const foo = computed(() => bar.getValue() + baz.getValue(), [bar, baz]);
 * ```
 * @returns A function to stop listening to changes in the dependencies
 */ __turbopack_context__.s([
    "effect",
    ()=>effect
]);
function effect(// pass the values of the dependencies to the computation function
effectFn, // biome-ignore lint/suspicious/noExplicitAny: library function that accepts any store type
dependencies, runOnMount = true) {
    if (runOnMount) {
        effectFn();
    }
    // when any of the dependencies change, recompute the value and set it
    const unsubscribeList = dependencies.map((store)=>{
        return store.subscribe(()=>{
            effectFn();
        });
    });
    return ()=>{
        for (const fn of unsubscribeList){
            fn();
        }
    };
} //# sourceMappingURL=effect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create a reactive value store
 * @param initialValue - The initial value to store
 * @example
 * ```ts
 * const store = createStore(0);
 * ```
 * @returns A store object
 * @internal
 */ __turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
function createStore(initialValue) {
    const listeners = new Set();
    let value = initialValue;
    const notify = ()=>{
        for (const listener of listeners){
            listener();
        }
    };
    return {
        getValue () {
            return value;
        },
        setValue (newValue) {
            if (newValue === value) {
                return;
            }
            value = newValue;
            notify();
        },
        subscribe (listener) {
            listeners.add(listener);
            return ()=>{
                listeners.delete(listener);
            };
        }
    };
} //# sourceMappingURL=store.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Stringify a JSON object and convert all bigint values to string
 *
 * If you are getting this error: "Exception: Do not know how to serialize a BigInt",
 * you probably can use this function to parse the data.
 * Because bigint is not an accepted value of the JSON format.
 *
 * @returns An object with all bigint values converted to string
 * @example
 * ```ts
 * import { stringify } from "thirdweb/utils";
 * const obj = { tokenId: 0n };
 * const str = stringify(obj); // "{"tokenId":"0"}"
 * ```
 * @utils
 */ __turbopack_context__.s([
    "stringify",
    ()=>stringify
]);
function stringify(// biome-ignore lint/suspicious/noExplicitAny: JSON.stringify signature
value, // biome-ignore lint/suspicious/noExplicitAny: JSON.stringify signature
replacer, space) {
    const res = JSON.stringify(value, (key, value_)=>{
        const value__ = typeof value_ === "bigint" ? value_.toString() : value_;
        return typeof replacer === "function" ? replacer(key, value__) : value__;
    }, space);
    return res;
} //# sourceMappingURL=json.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/walletStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteConnectParamsFromStorage",
    ()=>deleteConnectParamsFromStorage,
    "getSavedConnectParamsFromStorage",
    ()=>getSavedConnectParamsFromStorage,
    "saveConnectParamsToStorage",
    ()=>saveConnectParamsToStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
const CONNECT_PARAMS_MAP_KEY = "tw:connected-wallet-params";
async function saveConnectParamsToStorage(storage, walletId, params) {
    // params must be stringifiable
    if (!isStringifiable(params)) {
        throw new Error("given params are not stringifiable");
    }
    const currentValueStr = await storage.getItem(CONNECT_PARAMS_MAP_KEY);
    let value;
    if (currentValueStr) {
        try {
            value = JSON.parse(currentValueStr);
        } catch  {
            value = {};
        }
        value[walletId] = params;
    } else {
        value = {
            [walletId]: params
        };
    }
    storage.setItem(CONNECT_PARAMS_MAP_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(value));
}
async function deleteConnectParamsFromStorage(storage, walletId) {
    const currentValueStr = await storage.getItem(CONNECT_PARAMS_MAP_KEY);
    let value;
    if (currentValueStr) {
        try {
            value = JSON.parse(currentValueStr);
        } catch  {
            value = {};
        }
        delete value[walletId];
        storage.setItem(CONNECT_PARAMS_MAP_KEY, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(value));
    }
}
async function getSavedConnectParamsFromStorage(storage, walletId) {
    const valueStr = await storage.getItem(CONNECT_PARAMS_MAP_KEY);
    if (!valueStr) {
        return null;
    }
    try {
        const value = JSON.parse(valueStr);
        if (value?.[walletId]) {
            return value[walletId];
        }
        return null;
    } catch  {
        return null;
    }
}
function isStringifiable(value) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(value);
        return true;
    } catch  {
        return false;
    }
} //# sourceMappingURL=walletStorage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks if the given wallet is an ecosystem wallet.
 *
 * @param {Wallet | string} wallet - The wallet or wallet ID to check.
 * @returns {boolean} True if the wallet is an ecosystem wallet, false otherwise.
 * @internal
 */ __turbopack_context__.s([
    "isEcosystemWallet",
    ()=>isEcosystemWallet
]);
function isEcosystemWallet(wallet) {
    return typeof wallet === "string" ? wallet.startsWith("ecosystem.") : wallet.id.startsWith("ecosystem.");
} //# sourceMappingURL=is-ecosystem-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/is-smart-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasSponsoredTransactionsEnabled",
    ()=>hasSponsoredTransactionsEnabled,
    "isSmartWallet",
    ()=>isSmartWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)");
;
function isSmartWallet(activeWallet) {
    if (!activeWallet) {
        return false;
    }
    if (activeWallet.id === "smart") {
        return true;
    }
    if (activeWallet.id === "inApp" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(activeWallet)) {
        const options = activeWallet.getConfig();
        if (options && "smartAccount" in options && options.smartAccount) {
            return true;
        }
        if (options?.executionMode) {
            const execMode = options.executionMode;
            return execMode.mode === "EIP4337" || execMode.mode === "EIP7702";
        }
    }
    return false;
}
function hasSponsoredTransactionsEnabled(wallet) {
    if (!wallet) {
        return false;
    }
    let sponsoredTransactionsEnabled = false;
    if (wallet && wallet.id === "smart") {
        const options = wallet.getConfig();
        if ("sponsorGas" in options) {
            sponsoredTransactionsEnabled = options.sponsorGas;
        }
        if ("gasless" in options) {
            sponsoredTransactionsEnabled = options.gasless;
        }
    }
    if (wallet && (wallet.id === "inApp" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(wallet))) {
        const options = wallet.getConfig();
        if (options && "smartAccount" in options && options.smartAccount) {
            const smartOptions = options.smartAccount;
            if ("sponsorGas" in smartOptions) {
                sponsoredTransactionsEnabled = smartOptions.sponsorGas;
            }
            if ("gasless" in smartOptions) {
                sponsoredTransactionsEnabled = smartOptions.gasless;
            }
        }
        if (options?.executionMode) {
            const execMode = options.executionMode;
            if (execMode.mode === "EIP4337") {
                const smartOptions = execMode.smartAccount;
                if (smartOptions && "sponsorGas" in smartOptions) {
                    sponsoredTransactionsEnabled = smartOptions.sponsorGas;
                }
                if (smartOptions && "gasless" in smartOptions) {
                    sponsoredTransactionsEnabled = smartOptions.gasless;
                }
            }
            if (execMode.mode === "EIP7702") {
                sponsoredTransactionsEnabled = execMode.sponsorGas || false;
            }
        }
    }
    return sponsoredTransactionsEnabled;
} //# sourceMappingURL=is-smart-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "track",
    ()=>track
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
async function track({ client, ecosystem, data }) {
    const fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const event = {
        source: "sdk",
        ...data
    };
    return fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("analytics")}/event`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(event),
        method: "POST"
    }).catch(()=>{});
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/connect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trackConnect",
    ()=>trackConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/index.js [app-client] (ecmascript)");
;
async function trackConnect(args) {
    const { client, ecosystem, walletType, walletAddress, chainId } = args;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])({
        client,
        data: {
            action: "connect",
            chainId,
            source: "connectWallet",
            walletAddress,
            walletType
        },
        ecosystem
    });
} //# sourceMappingURL=connect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHex",
    ()=>isHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
;
function isHex(value, options = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](value, options);
} //# sourceMappingURL=is-hex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToBytes",
    ()=>boolToBytes,
    "hexToBytes",
    ()=>hexToBytes,
    "numberToBytes",
    ()=>numberToBytes,
    "stringToBytes",
    ()=>stringToBytes,
    "toBytes",
    ()=>toBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
;
;
function toBytes(value, opts = {}) {
    switch(typeof value){
        case "number":
        case "bigint":
            return numberToBytes(value, opts);
        case "boolean":
            return boolToBytes(value, opts);
        default:
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value)) {
                return hexToBytes(value, opts);
            }
            return stringToBytes(value, opts);
    }
}
function boolToBytes(value, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromBoolean"](value, opts);
}
function hexToBytes(hex_, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromHex"](hex_, opts);
}
function numberToBytes(value, opts) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](value, opts);
}
function stringToBytes(value, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"](value, opts);
} //# sourceMappingURL=to-bytes.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToHex",
    ()=>boolToHex,
    "fromHex",
    ()=>fromHex,
    "hexToBigInt",
    ()=>hexToBigInt,
    "hexToBool",
    ()=>hexToBool,
    "hexToNumber",
    ()=>hexToNumber,
    "hexToString",
    ()=>hexToString,
    "hexToUint8Array",
    ()=>hexToUint8Array,
    "numberToHex",
    ()=>numberToHex,
    "padHex",
    ()=>padHex,
    "stringToHex",
    ()=>stringToHex,
    "toHex",
    ()=>toHex,
    "uint8ArrayToHex",
    ()=>uint8ArrayToHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
;
;
function padHex(hex_, options = {}) {
    const { dir, size = 32 } = options;
    if (size === null) {
        return hex_;
    }
    if (dir === "right") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["padRight"](hex_, size);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["padLeft"](hex_, size);
}
function hexToString(hex, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"](hex, opts);
}
function hexToBigInt(hex, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](hex, opts);
}
function hexToNumber(hex, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNumber"](hex, opts);
}
function hexToBool(hex, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBoolean"](hex, opts);
}
function hexToUint8Array(hex, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"](hex, opts);
}
function fromHex(hex, toOrOpts) {
    const opts = typeof toOrOpts === "string" ? {
        to: toOrOpts
    } : toOrOpts;
    switch(opts.to){
        case "number":
            return hexToNumber(hex, opts);
        case "bigint":
            return hexToBigInt(hex, opts);
        case "string":
            return hexToString(hex, opts);
        case "boolean":
            return hexToBool(hex, opts);
        default:
            return hexToUint8Array(hex, opts);
    }
}
function boolToHex(value, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromBoolean"](value, opts);
}
function uint8ArrayToHex(value, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromBytes"](value, opts);
}
function numberToHex(value_, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](value_, opts);
}
function stringToHex(value_, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"](value_, opts);
}
function toHex(value, opts = {}) {
    switch(typeof value){
        case "number":
        case "bigint":
            return numberToHex(value, opts);
        case "string":
            return stringToHex(value, opts);
        case "boolean":
            return boolToHex(value, opts);
        default:
            return uint8ArrayToHex(value, opts);
    }
} //# sourceMappingURL=hex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
;
;
function keccak256(value, to) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak_256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToUint8Array"])(value) : value);
    if (to === "bytes") {
        return bytes;
    }
    // default fall through to hex
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(bytes);
} //# sourceMappingURL=keccak256.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checksumAddress",
    ()=>checksumAddress,
    "getAddress",
    ()=>getAddress,
    "isAddress",
    ()=>isAddress,
    "shortenAddress",
    ()=>shortenAddress,
    "shortenHex",
    ()=>shortenHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js [app-client] (ecmascript)");
;
;
;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const IS_ADDRESS_CACHE = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](4096);
function isAddress(address) {
    if (IS_ADDRESS_CACHE.has(address)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return IS_ADDRESS_CACHE.get(address);
    }
    const result = ADDRESS_REGEX.test(address) && (address.toLowerCase() === address || checksumAddress(address) === address);
    IS_ADDRESS_CACHE.set(address, result);
    return result;
}
function checksumAddress(address) {
    const hexAddress = address.substring(2).toLowerCase();
    const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToBytes"])(hexAddress), "bytes");
    const address_ = hexAddress.split("");
    for(let i = 0; i < 40; i += 2){
        // biome-ignore lint/style/noNonNullAssertion: TODO
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
            // biome-ignore lint/style/noNonNullAssertion: TODO
            address_[i] = address_[i].toUpperCase();
        }
        // biome-ignore lint/style/noNonNullAssertion: TODO
        if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
            // biome-ignore lint/style/noNonNullAssertion: TODO
            address_[i + 1] = address_[i + 1].toUpperCase();
        }
    }
    return `0x${address_.join("")}`;
}
function getAddress(address) {
    if (!isAddress(address)) {
        throw new Error(`Invalid address: ${address}`);
    }
    return checksumAddress(address);
}
function shortenAddress(address, length = 4) {
    const _address = getAddress(address);
    return shortenHex(_address, length);
}
function shortenHex(hex, length = 4) {
    return `${hex.slice(0, length + 2)}...${hex.slice(-length)}`;
} //# sourceMappingURL=address.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContract",
    ()=>getContract
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
;
function getContract(options) {
    if (!options.client) {
        throw new Error(`getContract validation error - invalid client: ${options.client}`);
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(options.address)) {
        throw new Error(`getContract validation error - invalid address: ${options.address}`);
    }
    if (!options.chain || !options.chain.id) {
        throw new Error(`getContract validation error - invalid chain: ${options.chain}`);
    }
    return options;
} //# sourceMappingURL=contract.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/any-evm/zksync/isZkSyncChain.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks whether the given chain is part of the zksync stack
 * @param chain
 * @chain
 */ __turbopack_context__.s([
    "isZkSyncChain",
    ()=>isZkSyncChain
]);
async function isZkSyncChain(chain) {
    if (chain.id === 1337 || chain.id === 31337) {
        return false;
    }
    // check known zksync chain-ids first
    if (chain.id === 324 || chain.id === 300 || chain.id === 302 || chain.id === 11124 || chain.id === 282 || chain.id === 388 || chain.id === 4654 || chain.id === 333271 || chain.id === 37111 || chain.id === 978658 || chain.id === 531050104 || chain.id === 4457845 || chain.id === 2741 || chain.id === 240 || chain.id === 555271 || chain.id === 61166 || chain.id === 555272) {
        return true;
    }
    // fallback to checking the stack on rpc
    try {
        const { getChainMetadata } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript, async loader)");
        const chainMetadata = await getChainMetadata(chain);
        return chainMetadata.stackType === "zksync_stack";
    } catch  {
        // If the network check fails, assume it's not a ZkSync chain
        return false;
    }
} //# sourceMappingURL=isZkSyncChain.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getCode.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Retrieves the bytecode of a smart contract at the specified address.
 * @param request - The EIP1193 request function.
 * @param params - The parameters for the eth_getCode method.
 * @returns A promise that resolves to the bytecode of the smart contract.
 * @rpc
 * @example
 * ```ts
 * import { getRpcClient, eth_getCode } from "thirdweb/rpc";
 * const rpcRequest = getRpcClient({ client, chain });
 * const bytecode = await eth_getCode(rpcRequest, {
 *  address: "0x...",
 * });
 * ```
 */ __turbopack_context__.s([
    "eth_getCode",
    ()=>eth_getCode
]);
async function eth_getCode(request, params) {
    return request({
        method: "eth_getCode",
        params: [
            params.address,
            params.blockTag || "latest"
        ]
    });
} //# sourceMappingURL=eth_getCode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/fetch-rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchRpc",
    ()=>fetchRpc,
    "fetchSingleRpc",
    ()=>fetchSingleRpc
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
async function fetchRpc(rpcUrl, client, options) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client)(rpcUrl, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(options.requests),
        headers: {
            ...client.config?.rpc?.fetch?.headers,
            "Content-Type": "application/json"
        },
        keepalive: client.config?.rpc?.fetch?.keepalive,
        method: "POST",
        requestTimeoutMs: options.requestTimeoutMs ?? client.config?.rpc?.fetch?.requestTimeoutMs
    });
    if (!response.ok) {
        const error = await response.text().catch(()=>null);
        throw new Error(`RPC request failed with status ${response.status} - ${response.statusText}: ${error || "unknown error"}`);
    }
    return await response.json();
}
async function fetchSingleRpc(rpcUrl, client, options) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client)(rpcUrl, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(options.request),
        headers: {
            ...client.config?.rpc?.fetch?.headers || {},
            "Content-Type": "application/json"
        },
        keepalive: client.config?.rpc?.fetch?.keepalive,
        method: "POST",
        requestTimeoutMs: options.requestTimeoutMs ?? client.config?.rpc?.fetch?.requestTimeoutMs
    });
    if (!response.ok) {
        const error = await response.text().catch(()=>null);
        throw new Error(`RPC request failed with status ${response.status} - ${response.statusText}: ${error || "unknown error"}`);
    }
    return await response.json();
} //# sourceMappingURL=fetch-rpc.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRpcClient",
    ()=>getRpcClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$fetch$2d$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/fetch-rpc.js [app-client] (ecmascript)");
;
;
;
const RPC_CLIENT_MAP = new WeakMap();
/**
 * @internal
 */ function getRpcClientMap(client) {
    if (RPC_CLIENT_MAP.has(client)) {
        return RPC_CLIENT_MAP.get(client);
    }
    const rpcClientMap = new Map();
    RPC_CLIENT_MAP.set(client, rpcClientMap);
    return rpcClientMap;
}
/**
 * @internal
 */ function rpcRequestKey(request) {
    return `${request.method}:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(request.params)}`;
}
const DEFAULT_MAX_BATCH_SIZE = 100;
// default to no timeout (next tick)
const DEFAULT_BATCH_TIMEOUT_MS = 0;
function getRpcClient(options) {
    const rpcClientMap = getRpcClientMap(options.client);
    const rpcUrl = options.chain.rpc;
    if (rpcClientMap.has(rpcUrl)) {
        return rpcClientMap.get(rpcUrl);
    }
    const rpcClient = (()=>{
        // we can do this upfront because it cannot change later
        const rpcUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcUrlForChain"])({
            chain: options.chain,
            client: options.client
        });
        const batchSize = // look at the direct options passed
        options.config?.maxBatchSize ?? // look at the client options
        options.client.config?.rpc?.maxBatchSize ?? // use defaults
        DEFAULT_MAX_BATCH_SIZE;
        const batchTimeoutMs = // look at the direct options passed
        options.config?.batchTimeoutMs ?? // look at the client options
        options.client.config?.rpc?.batchTimeoutMs ?? DEFAULT_BATCH_TIMEOUT_MS;
        // inflight requests
        // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
        const inflightRequests = new Map();
        let pendingBatch = [];
        let pendingBatchTimeout = null;
        /**
         * Sends the pending batch of requests.
         * @internal
         */ function sendPendingBatch() {
            // clear the timeout if any
            if (pendingBatchTimeout) {
                clearTimeout(pendingBatchTimeout);
                pendingBatchTimeout = null;
            }
            // prepare the requests array (we know the size)
            const requests = new Array(pendingBatch.length);
            const activeBatch = pendingBatch.slice().map((inflight, index)=>{
                // assign the id to the request
                inflight.request.id = index;
                // also assign the jsonrpc version
                inflight.request.jsonrpc = "2.0";
                // assign the request to the requests array (so we don't have to map it again later)
                requests[index] = inflight.request;
                return inflight;
            });
            // reset pendingBatch to empty
            pendingBatch = [];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$fetch$2d$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchRpc"])(rpcUrl, options.client, {
                requests,
                requestTimeoutMs: options.config?.requestTimeoutMs
            }).then((responses)=>{
                activeBatch.forEach((inflight, index)=>{
                    // Handle the inflight request promise for each response.
                    const response = responses[index];
                    // No response.
                    if (!response) {
                        inflight.reject(new Error(`RPC Error from ${rpcUrl}:\nrequests: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(requests)}\nresponses: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(responses)}`));
                    } else if (response instanceof Error) {
                        inflight.reject(response);
                    } else if ("error" in response) {
                        inflight.reject(response.error);
                    } else if (typeof response === "string") {
                        inflight.reject(new Error(response));
                    } else if (response.method === "eth_subscription") {
                        inflight.reject("Subscriptions not supported yet");
                    } else {
                        inflight.resolve(response.result);
                    }
                });
            }).catch((err)=>{
                // http call failed, reject all inflight requests
                for (const inflight of activeBatch){
                    inflight.reject(err);
                }
            }).finally(()=>{
                // Clear the inflight requests map so any new requests are re-fetched.
                inflightRequests.clear();
            });
        }
        // shortcut everything if we do not need to batch
        if (batchSize === 1) {
            return async (request)=>{
                // we can hard-code the id and jsonrpc version
                // we also mutate the request object here to avoid copying it
                // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
                request.id = 1;
                // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
                request.jsonrpc = "2.0";
                const rpcResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$fetch$2d$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchSingleRpc"])(rpcUrl, options.client, {
                    request: request,
                    requestTimeoutMs: options.config?.requestTimeoutMs
                });
                if (!rpcResponse) {
                    throw new Error("No response");
                }
                if ("error" in rpcResponse) {
                    throw rpcResponse.error;
                }
                return rpcResponse.result;
            };
        }
        return async (request)=>{
            const requestKey = rpcRequestKey(request);
            // if the request for this key is already inflight, return the promise directly
            if (inflightRequests.has(requestKey)) {
                // biome-ignore lint/style/noNonNullAssertion: the `has` check ensures this is defined
                return inflightRequests.get(requestKey);
            }
            // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
            let resolve;
            // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
            let reject;
            // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
            const promise = new Promise((resolve_, reject_)=>{
                resolve = resolve_;
                reject = reject_;
            });
            inflightRequests.set(requestKey, promise);
            // @ts-expect-error - they *are* definitely assigned within the promise constructor
            pendingBatch.push({
                reject,
                request,
                requestKey,
                resolve
            });
            if (batchSize > 1) {
                // if there is no timeout, set one
                if (!pendingBatchTimeout) {
                    pendingBatchTimeout = setTimeout(sendPendingBatch, batchTimeoutMs);
                }
                // if the batch is full, send it
                if (pendingBatch.length >= batchSize) {
                    sendPendingBatch();
                }
            } else {
                sendPendingBatch();
            }
            return promise;
        };
    })();
    rpcClientMap.set(rpcUrl, rpcClient);
    return rpcClient;
} //# sourceMappingURL=rpc.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/get-bytecode.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBytecode",
    ()=>getBytecode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getCode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getCode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
;
;
const BYTECODE_CACHE = new WeakMap();
function getBytecode(contract) {
    if (BYTECODE_CACHE.has(contract)) {
        return BYTECODE_CACHE.get(contract);
    }
    const prom = (async ()=>{
        const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])(contract);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getCode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_getCode"])(rpcRequest, {
            address: contract.address,
            blockTag: "latest"
        });
        if (result === "0x") {
            BYTECODE_CACHE.delete(contract);
        }
        return result;
    })();
    BYTECODE_CACHE.set(contract, prom);
    return prom;
} //# sourceMappingURL=get-bytecode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isContractDeployed",
    ()=>isContractDeployed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$get$2d$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/get-bytecode.js [app-client] (ecmascript)");
;
// we use a weak set to cache *if* a contract *is* deployed
// aka: we add it to this set if it's deployed, and only if it is deployed
// instead of using a map with: true only (because we only want to cache if it's deployed)
const cache = new WeakSet();
async function isContractDeployed(contract) {
    if (cache.has(contract)) {
        // it's only in there if it's deployed
        return true;
    }
    // this already dedupes requests for the same contract
    const bytecode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$get$2d$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytecode"])(contract);
    const isDeployed = bytecode !== "0x";
    // if it's deployed, we add it to the cache
    if (isDeployed) {
        cache.add(contract);
    }
    return isDeployed;
} //# sourceMappingURL=is-contract-deployed.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/tiny-emitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Creates an emitter object that allows subscribing to events and emitting events.
 * @returns An emitter object with `subscribe` and `emit` methods.
 * @template TEmitter - The type of the emitter.
 * @example
 * ```ts
 * const emitter = createEmitter<{
 *  event1: string;
 * event2: number;
 * }>();
 *
 * emitter.subscribe("event1", (data) => {
 * console.log(data); // "hello"
 * });
 *
 * emitter.emit("event1", "hello");
 * ```
 */ __turbopack_context__.s([
    "createEmitter",
    ()=>createEmitter
]);
function createEmitter() {
    const subsribers = new Map();
    return {
        emit (event, data) {
            const subscribers = subsribers.get(event);
            if (subscribers) {
                for (const cb of subscribers){
                    cb(data);
                }
            }
        },
        subscribe (event, cb) {
            if (!subsribers.has(event)) {
                subsribers.set(event, new Set([
                    cb
                ]));
            } else {
                subsribers.get(event)?.add(cb);
            }
            return ()=>{
                const subscribers = subsribers.get(event);
                if (subscribers) {
                    subscribers.delete(cb);
                }
            };
        }
    };
} //# sourceMappingURL=tiny-emitter.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWalletEmitter",
    ()=>createWalletEmitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$tiny$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/tiny-emitter.js [app-client] (ecmascript)");
;
function createWalletEmitter() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$tiny$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmitter"])();
} //# sourceMappingURL=wallet-emitter.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ACCOUNT_FACTORY_V0_6",
    ()=>DEFAULT_ACCOUNT_FACTORY_V0_6,
    "DEFAULT_ACCOUNT_FACTORY_V0_7",
    ()=>DEFAULT_ACCOUNT_FACTORY_V0_7,
    "DUMMY_SIGNATURE",
    ()=>DUMMY_SIGNATURE,
    "ENTRYPOINT_ADDRESS_v0_6",
    ()=>ENTRYPOINT_ADDRESS_v0_6,
    "ENTRYPOINT_ADDRESS_v0_7",
    ()=>ENTRYPOINT_ADDRESS_v0_7,
    "MANAGED_ACCOUNT_GAS_BUFFER",
    ()=>MANAGED_ACCOUNT_GAS_BUFFER,
    "TokenPaymaster",
    ()=>TokenPaymaster,
    "getDefaultAccountFactory",
    ()=>getDefaultAccountFactory,
    "getDefaultBundlerUrl",
    ()=>getDefaultBundlerUrl,
    "getEntryPointVersion",
    ()=>getEntryPointVersion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
;
;
const DUMMY_SIGNATURE = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
const DEFAULT_ACCOUNT_FACTORY_V0_6 = "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00";
const DEFAULT_ACCOUNT_FACTORY_V0_7 = "0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb";
const ENTRYPOINT_ADDRESS_v0_6 = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; // v0.6
const ENTRYPOINT_ADDRESS_v0_7 = "0x0000000071727De22E5E9d8BAf0edAc6f37da032"; // v0.7
const MANAGED_ACCOUNT_GAS_BUFFER = 50000n;
const TokenPaymaster = {
    BASE_USDC: {
        balanceStorageSlot: 9n,
        chainId: 8453,
        paymasterAddress: "0x2222f2738BE6bB7aA0Bfe4AEeAf2908172CF5539",
        tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    },
    CELO_CUSD: {
        balanceStorageSlot: 9n,
        chainId: 42220,
        paymasterAddress: "0x3feA3c5744D715ff46e91C4e5C9a94426DfF2aF9",
        tokenAddress: "0x765DE816845861e75A25fCA122bb6898B8B1282a"
    },
    LISK_LSK: {
        balanceStorageSlot: 9n,
        chainId: 1135,
        paymasterAddress: "0x9eb8cf7fBa5ed9EeDCC97a0d52254cc0e9B1AC25",
        tokenAddress: "0xac485391EB2d7D88253a7F1eF18C37f4242D1A24"
    }
};
const getDefaultAccountFactory = (entryPointAddress)=>{
    const version = getEntryPointVersion(entryPointAddress || ENTRYPOINT_ADDRESS_v0_6);
    if (version === "v0.7") {
        return DEFAULT_ACCOUNT_FACTORY_V0_7;
    }
    return DEFAULT_ACCOUNT_FACTORY_V0_6;
};
const getDefaultBundlerUrl = (chain)=>{
    const domain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().bundler;
    if (domain.startsWith("localhost:")) {
        return `http://${domain}/v2?chain=${chain.id}`;
    }
    return `https://${chain.id}.${domain}/v2`;
};
const getEntryPointVersion = (address)=>{
    const checksummedAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address);
    if (checksummedAddress === ENTRYPOINT_ADDRESS_v0_6) {
        return "v0.6";
    }
    if (checksummedAddress === ENTRYPOINT_ADDRESS_v0_7) {
        return "v0.7";
    }
    throw new Error("Unknown paymaster version");
}; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/smart-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "smartWallet",
    ()=>smartWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/connect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/any-evm/zksync/isZkSyncChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function smartWallet(createOptions) {
    const emitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletEmitter"])();
    let account;
    let adminAccount;
    let chain;
    let lastConnectOptions;
    return {
        autoConnect: async (options)=>{
            const { connectSmartAccount: connectSmartWallet } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript, async loader)");
            const [connectedAccount, connectedChain] = await connectSmartWallet(options, createOptions);
            // set the states
            lastConnectOptions = options;
            account = connectedAccount;
            chain = connectedChain;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: "smart"
            });
            // return account
            return account;
        },
        connect: async (options)=>{
            const { connectSmartAccount } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript, async loader)");
            const [connectedAccount, connectedChain] = await connectSmartAccount(options, createOptions);
            // set the states
            adminAccount = options.personalAccount;
            lastConnectOptions = options;
            account = connectedAccount;
            chain = connectedChain;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: "smart"
            });
            // return account
            emitter.emit("accountChanged", account);
            return account;
        },
        disconnect: async ()=>{
            if (account) {
                const { disconnectSmartAccount } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript, async loader)");
                await disconnectSmartAccount(account);
            }
            account = undefined;
            adminAccount = undefined;
            chain = undefined;
            emitter.emit("disconnect", undefined);
        },
        getAccount: ()=>account,
        getAdminAccount: ()=>adminAccount,
        getChain () {
            if (!chain) {
                return undefined;
            }
            chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChainIfExists"])(chain.id) || chain;
            return chain;
        },
        getConfig: ()=>createOptions,
        id: "smart",
        subscribe: emitter.subscribe,
        switchChain: async (newChain)=>{
            if (!lastConnectOptions) {
                throw new Error("Cannot switch chain without a previous connection");
            }
            const isZksyncChain = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isZkSyncChain"])(newChain);
            if (!isZksyncChain) {
                // check if factory is deployed
                const factory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
                    address: createOptions.factoryAddress || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAccountFactory"])(createOptions.overrides?.entrypointAddress),
                    chain: newChain,
                    client: lastConnectOptions.client
                });
                const isDeployed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContractDeployed"])(factory);
                if (!isDeployed) {
                    throw new Error(`Factory contract not deployed on chain: ${newChain.id}`);
                }
            }
            const { connectSmartAccount } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript, async loader)");
            const [connectedAccount, connectedChain] = await connectSmartAccount({
                ...lastConnectOptions,
                chain: newChain
            }, {
                ...createOptions,
                chain: newChain
            });
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            emitter.emit("accountChanged", connectedAccount);
            emitter.emit("chainChanged", connectedChain);
        }
    };
} //# sourceMappingURL=smart-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/manager/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConnectionManager",
    ()=>createConnectionManager,
    "getLastConnectedChain",
    ()=>getLastConnectedChain,
    "getStoredActiveWalletId",
    ()=>getStoredActiveWalletId,
    "getStoredConnectedWalletIds",
    ()=>getStoredConnectedWalletIds,
    "handleSmartWalletConnection",
    ()=>handleSmartWalletConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$computedStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/computedStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/effect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/walletStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$is$2d$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/is-smart-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/smart-wallet.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const CONNECTED_WALLET_IDS = "thirdweb:connected-wallet-ids";
const LAST_ACTIVE_EOA_ID = "thirdweb:active-wallet-id";
const LAST_ACTIVE_CHAIN = "thirdweb:active-chain";
function createConnectionManager(storage) {
    // stores
    // active wallet/account
    const activeWalletStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(undefined);
    const activeAccountStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(undefined);
    const activeWalletChainStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(undefined);
    const activeWalletConnectionStatusStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])("unknown");
    const definedChainsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(new Map());
    // update global cachedChains when defined Chains store updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cacheChains"])([
            ...definedChainsStore.getValue().values()
        ]);
    }, [
        definedChainsStore
    ]);
    // change the active chain object to use the defined chain object
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effect"])(()=>{
        const chainVal = activeWalletChainStore.getValue();
        if (!chainVal) {
            return;
        }
        const definedChain = definedChainsStore.getValue().get(chainVal.id);
        if (!definedChain || definedChain === chainVal) {
            return;
        }
        // update active chain store
        activeWalletChainStore.setValue(definedChain);
    }, [
        definedChainsStore,
        activeWalletChainStore
    ]);
    // other connected accounts
    const walletIdToConnectedWalletMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(new Map());
    const isAutoConnecting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(false);
    const connectedWallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$computedStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computedStore"])(()=>{
        return Array.from(walletIdToConnectedWalletMap.getValue().values());
    }, [
        walletIdToConnectedWalletMap
    ]);
    // actions
    const addConnectedWallet = (wallet)=>{
        const oldValue = walletIdToConnectedWalletMap.getValue();
        if (oldValue.has(wallet.id)) {
            return;
        }
        const newValue = new Map(oldValue);
        newValue.set(wallet.id, wallet);
        walletIdToConnectedWalletMap.setValue(newValue);
    };
    const removeConnectedWallet = (wallet)=>{
        const oldValue = walletIdToConnectedWalletMap.getValue();
        const newValue = new Map(oldValue);
        newValue.delete(wallet.id);
        walletIdToConnectedWalletMap.setValue(newValue);
    };
    const onWalletDisconnect = (wallet)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteConnectParamsFromStorage"])(storage, wallet.id);
        removeConnectedWallet(wallet);
        // if disconnecting the active wallet
        if (activeWalletStore.getValue() === wallet) {
            storage.removeItem(LAST_ACTIVE_EOA_ID);
            activeAccountStore.setValue(undefined);
            activeWalletChainStore.setValue(undefined);
            activeWalletStore.setValue(undefined);
            activeWalletConnectionStatusStore.setValue("disconnected");
        }
    };
    const disconnectWallet = (wallet)=>{
        onWalletDisconnect(wallet);
        wallet.disconnect();
    };
    // handle the connection logic, but don't set the wallet as active
    const handleConnection = async (wallet, options)=>{
        const account = wallet.getAccount();
        if (!account) {
            throw new Error("Cannot set a wallet without an account as active");
        }
        const activeWallet = await (async ()=>{
            if (options?.accountAbstraction && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$is$2d$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSmartWallet"])(wallet)) {
                return await handleSmartWalletConnection(wallet, options.client, options.accountAbstraction, onWalletDisconnect);
            } else {
                return wallet;
            }
        })();
        await storage.setItem(LAST_ACTIVE_EOA_ID, wallet.id);
        // add personal wallet to connected wallets list even if it's not the active one
        addConnectedWallet(wallet);
        if (options?.setWalletAsActive !== false) {
            handleSetActiveWallet(activeWallet);
        }
        wallet.subscribe("accountChanged", async ()=>{
            // We reimplement connect here to prevent memory leaks
            const newWallet = await handleConnection(wallet, options);
            options?.onConnect?.(newWallet, connectedWallets.getValue());
        });
        return activeWallet;
    };
    const connect = async (wallet, options)=>{
        // connectedWallet can be either wallet or smartWallet
        const connectedWallet = await handleConnection(wallet, options);
        options?.onConnect?.(connectedWallet, connectedWallets.getValue());
        return connectedWallet;
    };
    const handleSetActiveWallet = (activeWallet)=>{
        const account = activeWallet.getAccount();
        if (!account) {
            throw new Error("Cannot set a wallet without an account as active");
        }
        // also add it to connected wallets if it's not already there
        addConnectedWallet(activeWallet);
        // update active states
        activeWalletStore.setValue(activeWallet);
        activeAccountStore.setValue(account);
        activeWalletChainStore.setValue(activeWallet.getChain());
        activeWalletConnectionStatusStore.setValue("connected");
        // setup listeners
        const onAccountsChanged = (newAccount)=>{
            activeAccountStore.setValue(newAccount);
        };
        const unsubAccounts = activeWallet.subscribe("accountChanged", onAccountsChanged);
        const unsubChainChanged = activeWallet.subscribe("chainChanged", (chain)=>activeWalletChainStore.setValue(chain));
        const unsubDisconnect = activeWallet.subscribe("disconnect", ()=>{
            handleDisconnect();
        });
        const handleDisconnect = ()=>{
            onWalletDisconnect(activeWallet);
            unsubAccounts();
            unsubChainChanged();
            unsubDisconnect();
        };
    };
    const setActiveWallet = async (activeWallet)=>{
        handleSetActiveWallet(activeWallet);
        // do not set smart wallet as last active EOA
        if (activeWallet.id !== "smart") {
            await storage.setItem(LAST_ACTIVE_EOA_ID, activeWallet.id);
        }
    };
    // side effects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effect"])(()=>{
        const _chain = activeWalletChainStore.getValue();
        if (_chain) {
            storage.setItem(LAST_ACTIVE_CHAIN, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(_chain));
        } else {
            storage.removeItem(LAST_ACTIVE_CHAIN);
        }
    }, [
        activeWalletChainStore
    ], false);
    // save last connected wallet ids to storage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effect"])(async ()=>{
        const accounts = connectedWallets.getValue();
        const ids = accounts.map((acc)=>acc?.id).filter((c)=>!!c);
        storage.setItem(CONNECTED_WALLET_IDS, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(Array.from(new Set([
            ...ids
        ]))));
    }, [
        connectedWallets
    ], false);
    const switchActiveWalletChain = async (chain)=>{
        const wallet = activeWalletStore.getValue();
        if (!wallet) {
            throw new Error("No active wallet found");
        }
        if (!wallet.switchChain) {
            throw new Error("Wallet does not support switching chains");
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$is$2d$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSmartWallet"])(wallet)) {
            // also switch personal wallet
            const personalWalletId = await getStoredActiveWalletId(storage);
            if (personalWalletId) {
                const personalWallet = connectedWallets.getValue().find((w)=>w.id === personalWalletId);
                if (personalWallet) {
                    await personalWallet.switchChain(chain);
                    await wallet.switchChain(chain);
                    // reset the active wallet as switch chain recreates a new smart account
                    handleSetActiveWallet(wallet);
                    return;
                }
            }
            // If we couldn't find the personal wallet, just switch the smart wallet
            await wallet.switchChain(chain);
            handleSetActiveWallet(wallet);
        } else {
            await wallet.switchChain(chain);
        }
        // for wallets that dont implement events, just set it manually
        activeWalletChainStore.setValue(wallet.getChain());
    };
    function defineChains(chains) {
        const currentMapVal = definedChainsStore.getValue();
        // if all chains to be defined are already defined, no need to update the definedChains map
        const allChainsSame = chains.every((c)=>{
            const definedChain = currentMapVal.get(c.id);
            // basically a deep equal check
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(definedChain) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(c);
        });
        if (allChainsSame) {
            return;
        }
        const newMapVal = new Map(currentMapVal);
        for (const c of chains){
            newMapVal.set(c.id, c);
        }
        definedChainsStore.setValue(newMapVal);
    }
    return {
        activeAccountStore,
        activeWalletChainStore,
        activeWalletConnectionStatusStore,
        activeWalletStore,
        addConnectedWallet,
        connect,
        connectedWallets,
        defineChains,
        disconnectWallet,
        handleConnection,
        isAutoConnecting,
        removeConnectedWallet,
        setActiveWallet,
        switchActiveWalletChain
    };
}
async function getStoredConnectedWalletIds(storage) {
    try {
        const value = await storage.getItem(CONNECTED_WALLET_IDS);
        if (value) {
            return JSON.parse(value);
        }
        return [];
    } catch  {
        return [];
    }
}
async function getStoredActiveWalletId(storage) {
    try {
        const value = await storage.getItem(LAST_ACTIVE_EOA_ID);
        if (value) {
            return value;
        }
    } catch  {}
    return null;
}
async function getLastConnectedChain(storage) {
    try {
        const value = await storage.getItem(LAST_ACTIVE_CHAIN);
        if (value) {
            return JSON.parse(value);
        }
    } catch  {}
    return null;
}
const handleSmartWalletConnection = async (eoaWallet, client, options, onWalletDisconnect)=>{
    const signer = eoaWallet.getAccount();
    if (!signer) {
        throw new Error("Cannot set a wallet without an account as active");
    }
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smartWallet"])(options);
    await wallet.connect({
        chain: options.chain,
        client: client,
        personalAccount: signer
    });
    // Disconnect the active wallet when the EOA disconnects if it the active wallet is a smart wallet
    const disconnectUnsub = eoaWallet.subscribe("disconnect", ()=>{
        handleDisconnect();
    });
    const handleDisconnect = ()=>{
        disconnectUnsub();
        onWalletDisconnect(wallet);
    };
    return wallet;
}; //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionReceipt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_getTransactionReceipt",
    ()=>eth_getTransactionReceipt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$formatters$2f$transactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/formatters/transactionReceipt.js [app-client] (ecmascript)");
;
async function eth_getTransactionReceipt(request, params) {
    const receipt = await request({
        method: "eth_getTransactionReceipt",
        params: [
            params.hash
        ]
    });
    if (!receipt) {
        throw new Error("Transaction receipt not found.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$formatters$2f$transactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTransactionReceipt"])(receipt);
} //# sourceMappingURL=eth_getTransactionReceipt.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/sleep.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Delay an async thread
 * @param ms Sleep time in millisecond
 * @internal
 */ __turbopack_context__.s([
    "sleep",
    ()=>sleep
]);
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
} //# sourceMappingURL=sleep.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_blockNumber.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_blockNumber",
    ()=>eth_blockNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
async function eth_blockNumber(request) {
    const blockNumberHex = await request({
        method: "eth_blockNumber"
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(blockNumberHex);
} //# sourceMappingURL=eth_blockNumber.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/watchBlockNumber.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "watchBlockNumber",
    ()=>watchBlockNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$sleep$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/sleep.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_blockNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_blockNumber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
;
;
;
const MAX_POLL_DELAY = 5000; // 5 seconds
const DEFAULT_POLL_DELAY = 1000; // 1 second
const MIN_POLL_DELAY = 500; // 500 milliseconds
const DEFAULT_OVERPOLL_RATIO = 2; // poll twice as often as the average block time by default
const SLIDING_WINDOW_SIZE = 10; // always keep track of the last 10 block times
/**
 * TODO: document
 * @internal
 */ function getAverageBlockTime(blockTimes) {
    // left-pad the blocktimes Array with the DEFAULT_POLL_DELAY
    while(blockTimes.length < SLIDING_WINDOW_SIZE){
        blockTimes.unshift(DEFAULT_POLL_DELAY);
    }
    const sum = blockTimes.reduce((acc, blockTime)=>acc + blockTime, 0);
    return sum / blockTimes.length;
}
/**
 * TODO: document
 * @internal
 */ function createBlockNumberPoller(client, chain, overPollRatio, onError) {
    let subscribers = [];
    let blockTimesWindow = [];
    let isActive = false;
    let lastBlockNumber;
    let lastBlockAt;
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    /**
     * TODO: document
     * @internal
     */ async function poll() {
        // stop polling if there are no more subscriptions
        if (!isActive) {
            return;
        }
        try {
            const blockNumber = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_blockNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_blockNumber"])(rpcRequest);
            if (!lastBlockNumber || blockNumber > lastBlockNumber) {
                let newBlockNumbers = [];
                if (lastBlockNumber) {
                    for(let i = lastBlockNumber + 1n; i <= blockNumber; i++){
                        newBlockNumbers.push(BigInt(i));
                    }
                } else {
                    newBlockNumbers = [
                        blockNumber
                    ];
                }
                lastBlockNumber = blockNumber;
                const currentTime = Date.now();
                if (lastBlockAt) {
                    // if we skipped a block we need to adjust the block time down to that level
                    const blockTime = (currentTime - lastBlockAt) / newBlockNumbers.length;
                    blockTimesWindow.push(blockTime);
                    blockTimesWindow = blockTimesWindow.slice(-SLIDING_WINDOW_SIZE);
                }
                lastBlockAt = currentTime;
                // for all new blockNumbers...
                for (const b of newBlockNumbers){
                    // ... call all current subscribers
                    for (const subscriberCallback of subscribers){
                        subscriberCallback(b);
                    }
                }
            }
        } catch (err) {
            if (onError) {
                onError(err);
            } else {
                console.error(`[watchBlockNumber]: Failed to poll for latest block number: ${err}`);
            }
        }
        const currentApproximateBlockTime = getAverageBlockTime(blockTimesWindow);
        // make sure we never poll faster than our minimum poll delay or slower than our maximum poll delay
        const pollDelay = Math.max(MIN_POLL_DELAY, Math.min(MAX_POLL_DELAY, Math.max(MIN_POLL_DELAY, currentApproximateBlockTime)));
        // sleep for the pollDelay for this chain (divided by the overPollRatio, which defaults to 2)
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$sleep$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(pollDelay / (overPollRatio ?? DEFAULT_OVERPOLL_RATIO));
        // poll again
        poll();
    }
    // return the "subscribe" function
    return function subscribe(callBack, initialBlockNumber) {
        subscribers.push(callBack);
        // if we are currently not active -> start polling
        if (!isActive) {
            lastBlockNumber = initialBlockNumber;
            isActive = true;
            poll();
        }
        // return the "unsubscribe" function (meaning the caller can unsubscribe)
        return function unSubscribe() {
            // filter out the callback from the subscribers
            subscribers = subscribers.filter((fn)=>fn !== callBack);
            // if the new subscribers Array is empty (aka we were the last subscriber) -> stop polling
            if (subscribers.length === 0) {
                lastBlockNumber = undefined;
                lastBlockAt = undefined;
                isActive = false;
            }
        };
    };
}
const existingPollers = new Map();
function watchBlockNumber(opts) {
    const { client, chain, onNewBlockNumber, overPollRatio, latestBlockNumber, onError } = opts;
    const chainId = chain.id;
    // if we already have a poller for this chainId -> use it.
    let poller = existingPollers.get(chainId);
    // otherwise create a new poller
    if (!poller) {
        poller = createBlockNumberPoller(client, chain, overPollRatio, onError);
        // and store it for later use
        existingPollers.set(chainId, poller);
    }
    // subscribe to the poller and return the unSubscribe function to the caller
    return poller(onNewBlockNumber, latestBlockNumber);
} //# sourceMappingURL=watchBlockNumber.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/wait-for-tx-receipt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForReceipt",
    ()=>waitForReceipt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$watchBlockNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/watchBlockNumber.js [app-client] (ecmascript)");
;
;
;
const DEFAULT_MAX_BLOCKS_WAIT_TIME = 100;
const map = new Map();
function waitForReceipt(options) {
    const { transactionHash, chain, client } = options;
    const chainId = chain.id;
    const key = `${chainId}:tx_${transactionHash}`;
    const maxBlocksWaitTime = options.maxBlocksWaitTime ?? DEFAULT_MAX_BLOCKS_WAIT_TIME;
    if (map.has(key)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return map.get(key);
    }
    const promise = new Promise((resolve, reject)=>{
        if (!transactionHash) {
            reject(new Error("Transaction has no transactionHash to wait for, did you execute it?"));
        }
        const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
            chain,
            client
        });
        // start at -1 because the first block doesn't count
        let blocksWaited = -1;
        const unwatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$watchBlockNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchBlockNumber"])({
            chain: chain,
            client: client,
            onNewBlockNumber: async ()=>{
                blocksWaited++;
                if (blocksWaited >= maxBlocksWaitTime) {
                    unwatch();
                    reject(new Error(`Transaction receipt for ${transactionHash} not found after ${maxBlocksWaitTime} blocks`));
                    return;
                }
                try {
                    const receipt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_getTransactionReceipt"])(request, {
                        hash: transactionHash
                    });
                    // stop the polling
                    unwatch();
                    // resolve the top level promise with the receipt
                    resolve(receipt);
                } catch  {
                // noop, we'll try again on the next blocks
                }
            }
        });
    // remove the promise from the map when it's done (one way or the other)
    }).finally(()=>{
        map.delete(key);
    });
    map.set(key, promise);
    return promise;
} //# sourceMappingURL=wait-for-tx-receipt.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/type-guards.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks if a value is an object.
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 * @internal
 */ __turbopack_context__.s([
    "isObject",
    ()=>isObject,
    "isObjectWithKeys",
    ()=>isObjectWithKeys,
    "isRecord",
    ()=>isRecord,
    "isString",
    ()=>isString
]);
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isString(value) {
    return typeof value === "string";
}
function isObjectWithKeys(value, keys = []) {
    return isObject(value) && keys.every((key)=>key in value);
}
function isRecord(value, guards) {
    const keyGuard = guards?.key ?? isString;
    const valueGuard = guards?.value ?? isString;
    return isObject(value) && !Array.isArray(value) && Object.entries(value).every(([k, v])=>keyGuard(k) && valueGuard(v));
} //# sourceMappingURL=type-guards.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBaseTransactionOptions",
    ()=>isBaseTransactionOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/type-guards.js [app-client] (ecmascript)");
;
function isBaseTransactionOptions(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectWithKeys"])(value, [
        "__contract"
    ]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectWithKeys"])(value.__contract, [
        "address",
        "chain"
    ]) && typeof value.__contract.address === "string";
} //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/structuralSharing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "structuralSharing",
    ()=>structuralSharing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
;
/** Forked from https://github.com/epoberezkin/fast-deep-equal */ // biome-ignore lint/suspicious/noExplicitAny: This function by nature takes any object
function deepEqual(a, b) {
    if (a === b) return true;
    if (a && b && typeof a === "object" && typeof b === "object") {
        if (a.constructor !== b.constructor) return false;
        let length;
        let i;
        if (Array.isArray(a) && Array.isArray(b)) {
            length = a.length;
            if (length !== b.length) return false;
            for(i = length; i-- !== 0;)if (!deepEqual(a[i], b[i])) return false;
            return true;
        }
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        const keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for(i = length; i-- !== 0;)// biome-ignore lint/style/noNonNullAssertion: We know its there
        if (!Object.hasOwn(b, keys[i])) return false;
        for(i = length; i-- !== 0;){
            const key = keys[i];
            if (key && !deepEqual(a[key], b[key])) return false;
        }
        return true;
    }
    // true if both NaN, false otherwise
    // biome-ignore lint/suspicious/noSelfCompare: TODO
    return a !== a && b !== b;
}
function structuralSharing(oldData, newData) {
    if (deepEqual(oldData, newData)) {
        return oldData;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceEqualDeep"])(oldData, newData);
} //# sourceMappingURL=structuralSharing.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectionManagerCtx",
    ()=>ConnectionManagerCtx,
    "useConnectionManager",
    ()=>useConnectionManager,
    "useConnectionManagerCtx",
    ()=>useConnectionManagerCtx
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const ConnectionManagerCtx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useConnectionManager() {
    const connectionManager = useConnectionManagerCtx("useConnectionManager");
    if (!connectionManager) {
        throw new Error("useConnectionManager must be used within a <ThirdwebProvider> Provider");
    }
    return connectionManager;
}
function useConnectionManagerCtx(hookname) {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ConnectionManagerCtx);
    if (!manager) {
        throw new Error(`${hookname} must be used within <ThirdwebProvider>`);
    }
    return manager;
} //# sourceMappingURL=connection-manager.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/invalidateWalletBalance.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invalidateWalletBalance",
    ()=>invalidateWalletBalance
]);
function invalidateWalletBalance(queryClient, chainId) {
    queryClient.invalidateQueries({
        queryKey: chainId ? [
            "walletBalance",
            chainId
        ] : [
            "walletBalance"
        ]
    });
    queryClient.invalidateQueries({
        queryKey: chainId ? [
            "internal_account_balance",
            chainId
        ] : [
            "internal_account_balance"
        ]
    });
    queryClient.invalidateQueries({
        queryKey: chainId ? [
            "nfts",
            chainId
        ] : [
            "nfts"
        ]
    });
    queryClient.invalidateQueries({
        queryKey: chainId ? [
            "tokens",
            chainId
        ] : [
            "tokens"
        ]
    });
} //# sourceMappingURL=invalidateWalletBalance.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/RootElementContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SetRootElementContext",
    ()=>SetRootElementContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const SetRootElementContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(()=>{}); //# sourceMappingURL=RootElementContext.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/thirdweb-provider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThirdwebProviderCore",
    ()=>ThirdwebProviderCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/wait-for-tx-receipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/type-guards.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$structuralSharing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/structuralSharing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$invalidateWalletBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/invalidateWalletBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$RootElementContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/RootElementContext.js [app-client] (ecmascript)");
"use client";
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
function ThirdwebProviderCore(props) {
    const [el, setEl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThirdwebProviderCore.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    mutations: {
                        onSettled: {
                            "ThirdwebProviderCore.useState": (data, _error, variables)=>{
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBaseTransactionOptions"])(variables)) {
                                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectWithKeys"])(data, [
                                        "transactionHash"
                                    ]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectWithKeys"])(variables, [
                                        "client",
                                        "chain"
                                    ])) {
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitForReceipt"])({
                                            chain: variables.chain,
                                            client: variables.client,
                                            transactionHash: data.transactionHash
                                        }).catch({
                                            "ThirdwebProviderCore.useState": (e)=>{
                                                // swallow errors for receipts, but log
                                                console.error("[Transaction Error]", e);
                                            }
                                        }["ThirdwebProviderCore.useState"]).then({
                                            "ThirdwebProviderCore.useState": ()=>{
                                                return Promise.all([
                                                    queryClient.invalidateQueries({
                                                        queryKey: // invalidate any readContract queries for this chainId:contractAddress
                                                        [
                                                            "readContract",
                                                            variables.__contract?.chain.id || variables.chain.id,
                                                            variables.__contract?.address || variables.to
                                                        ]
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$invalidateWalletBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invalidateWalletBalance"])(queryClient, variables.__contract?.chain.id || variables.chain.id)
                                                ]);
                                            }
                                        }["ThirdwebProviderCore.useState"]);
                                    }
                                }
                            }
                        }["ThirdwebProviderCore.useState"]
                    },
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000,
                        structuralSharing: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$structuralSharing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["structuralSharing"]
                    }
                }
            })
    }["ThirdwebProviderCore.useState"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionManagerCtx"].Provider, {
        value: props.manager,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$RootElementContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SetRootElementContext"].Provider, {
                    value: setEl,
                    children: props.children
                }),
                el
            ]
        })
    });
} //# sourceMappingURL=thirdweb-provider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/providers/thirdweb-provider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThirdwebProvider",
    ()=>ThirdwebProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$manager$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/manager/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$thirdweb$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/thirdweb-provider.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function ThirdwebProvider(props) {
    const connectionManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ThirdwebProvider.useMemo[connectionManager]": ()=>props.connectionManager || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$manager$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConnectionManager"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"])
    }["ThirdwebProvider.useMemo[connectionManager]"], [
        props.connectionManager
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$thirdweb$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThirdwebProviderCore"], {
        manager: connectionManager,
        children: props.children
    });
} //# sourceMappingURL=thirdweb-provider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useSetActiveWallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSetActiveWallet",
    ()=>useSetActiveWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-client] (ecmascript)");
"use client";
;
function useSetActiveWallet() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useSetActiveWallet");
    return manager.setActiveWallet;
} //# sourceMappingURL=useSetActiveWallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "getErrorDetails",
    ()=>getErrorDetails,
    "isInsufficientFundsError",
    ()=>isInsufficientFundsError
]);
function isInsufficientFundsError(error) {
    if (!error) return false;
    const errorMessage = typeof error === "string" ? error : error?.message || error?.data?.message || "";
    const message = errorMessage.toLowerCase();
    // Common patterns for insufficient funds errors
    return message.includes("insufficient funds") || message.includes("insufficient balance") || message.includes("insufficient") && (message.includes("native") || message.includes("gas")) || // Common error codes from various wallets/providers
    error?.code === "INSUFFICIENT_FUNDS" || error?.reason === "insufficient funds";
}
function getErrorDetails(error) {
    if (!error) return {
        message: "Unknown error"
    };
    const message = typeof error === "string" ? error : error?.message || error?.data?.message || String(error);
    const code = error?.code || error?.reason;
    return {
        code,
        message
    };
} //# sourceMappingURL=helpers.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trackInsufficientFundsError",
    ()=>trackInsufficientFundsError,
    "trackTransaction",
    ()=>trackTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/index.js [app-client] (ecmascript)");
;
;
;
async function trackTransaction(args) {
    return trackTransactionEvent({
        ...args,
        action: "transaction:sent"
    });
}
/**
 * @internal
 */ function trackTransactionEvent(args) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])({
        client: args.client,
        data: {
            action: args.action,
            chainId: args.chainId,
            clientId: args.client.clientId,
            contractAddress: args.contractAddress,
            errorCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(args.error),
            functionName: args.functionName,
            gasPrice: args.gasPrice,
            transactionHash: args.transactionHash,
            walletAddress: args.walletAddress,
            walletType: args.walletType
        },
        ecosystem: args.ecosystem
    });
}
async function trackInsufficientFundsError(args) {
    const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getErrorDetails"])(args.error);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])({
        client: args.client,
        data: {
            action: "transaction:insufficient_funds",
            chainId: args.chainId,
            clientId: args.client.clientId,
            contractAddress: args.contractAddress,
            errorCode: errorDetails.code ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(errorDetails.code) : undefined,
            errorMessage: errorDetails.message,
            functionName: args.functionName,
            requiredAmount: args.requiredAmount?.toString(),
            transactionValue: args.transactionValue?.toString(),
            userBalance: args.userBalance?.toString(),
            walletAddress: args.walletAddress
        },
        ecosystem: args.ecosystem
    });
} //# sourceMappingURL=transaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseTypedData",
    ()=>parseTypedData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
;
function parseTypedData(typedData) {
    const domain = typedData.domain;
    if (domain?.chainId !== undefined && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](domain.chainId)) {
        typedData.domain = {
            ...typedData.domain,
            chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNumber"](typedData.domain.chainId)
        };
    }
    return typedData;
} //# sourceMappingURL=parse-typed-data.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/get-calls-status.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCallsStatus",
    ()=>getCallsStatus,
    "toGetCallsStatusResponse",
    ()=>toGetCallsStatusResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
async function getCallsStatus({ wallet, client, id }) {
    const account = wallet.getAccount();
    if (!account) {
        throw new Error(`Failed to get call status, no account found for wallet ${wallet.id}`);
    }
    const chain = wallet.getChain();
    if (!chain) {
        throw new Error(`Failed to get call status, no chain found for wallet ${wallet.id}`);
    }
    if (account.getCallsStatus) {
        return account.getCallsStatus({
            id,
            chain,
            client
        });
    }
    throw new Error(`Failed to get call status, wallet ${wallet.id} does not support EIP-5792`);
}
const receiptStatuses = {
    "0x0": "reverted",
    "0x1": "success"
};
function toGetCallsStatusResponse(response) {
    const [status, statusCode] = (()=>{
        const statusCode = response.status;
        if (statusCode >= 100 && statusCode < 200) return [
            "pending",
            statusCode
        ];
        if (statusCode >= 200 && statusCode < 300) return [
            "success",
            statusCode
        ];
        if (statusCode >= 300 && statusCode < 700) return [
            "failure",
            statusCode
        ];
        // @ts-expect-error: for backwards compatibility
        if (statusCode === "CONFIRMED") return [
            "success",
            200
        ];
        // @ts-expect-error: for backwards compatibility
        if (statusCode === "PENDING") return [
            "pending",
            100
        ];
        return [
            undefined,
            statusCode
        ];
    })();
    return {
        ...response,
        atomic: response.atomic,
        // @ts-expect-error: for backwards compatibility
        chainId: response.chainId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToNumber"])(response.chainId) : undefined,
        receipts: response.receipts?.map((receipt)=>({
                ...receipt,
                blockNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(receipt.blockNumber),
                gasUsed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(receipt.gasUsed),
                status: receiptStatuses[receipt.status]
            })) ?? [],
        status,
        statusCode,
        version: response.version
    };
} //# sourceMappingURL=get-calls-status.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/get-capabilities.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get the capabilities of a wallet based on the [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) specification.
 *
 *  This function is dependent on the wallet's support for EIP-5792, but will not throw.
 * **The returned object contains a `message` field detailing any issues with the wallet's support for EIP-5792.**
 *
 * @param {GetCapabilitiesOptions} options
 * @param {Wallet} options.wallet - The wallet to get the capabilities of.
 * @returns {Promise<GetCapabilitiesResult>} - A promise that resolves to the capabilities of the wallet based on the [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) spec.
 * @beta
 * @example
 * ```ts
 * import { getCapabilities } from "thirdweb/wallets/eip5792";
 *
 * const wallet = createWallet("com.coinbase.wallet");
 * const capabilities = await getCapabilities({ wallet });
 * ```
 *
 * @extension EIP5792
 */ __turbopack_context__.s([
    "getCapabilities",
    ()=>getCapabilities,
    "toGetCapabilitiesResult",
    ()=>toGetCapabilitiesResult
]);
async function getCapabilities({ wallet, chainId }) {
    const account = wallet.getAccount();
    if (!account) {
        return {
            message: `Can't get capabilities, no account connected for wallet: ${wallet.id}`
        };
    }
    if (account.getCapabilities) {
        return account.getCapabilities({
            chainId
        });
    }
    throw new Error(`Failed to get capabilities, wallet ${wallet.id} does not support EIP-5792`);
}
function toGetCapabilitiesResult(result, chainIdFilter) {
    const capabilities = {};
    for (const [chainId, capabilities_] of Object.entries(result)){
        capabilities[Number(chainId)] = {};
        const capabilitiesCopy = {};
        for (const [key, value] of Object.entries(capabilities_)){
            capabilitiesCopy[key] = value;
        }
        capabilities[Number(chainId)] = capabilitiesCopy;
    }
    return typeof chainIdFilter === "number" ? {
        [chainIdFilter]: capabilities[chainIdFilter]
    } : capabilities;
} //# sourceMappingURL=get-capabilities.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encode",
    ()=>encode,
    "getDataFromTx",
    ()=>getDataFromTx,
    "getExtraCallDataFromTx",
    ()=>getExtraCallDataFromTx
]);
const encodeWeakMap = new WeakMap();
async function encode(transaction) {
    if (encodeWeakMap.has(transaction)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return encodeWeakMap.get(transaction);
    }
    const promise = (async ()=>{
        const [data, extraData, { concatHex }] = await Promise.all([
            getDataFromTx(transaction),
            getExtraCallDataFromTx(transaction),
            __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js [app-client] (ecmascript, async loader)")
        ]);
        if (extraData) {
            return concatHex([
                data,
                extraData
            ]);
        }
        return data;
    })();
    encodeWeakMap.set(transaction, promise);
    return promise;
}
async function getDataFromTx(transaction) {
    if (transaction.data === undefined) {
        return "0x";
    }
    if (typeof transaction.data === "function") {
        const data = await transaction.data();
        if (!data) {
            return "0x";
        }
        return data;
    }
    return transaction.data;
}
async function getExtraCallDataFromTx(transaction) {
    if (!transaction.extraCallData) {
        return undefined;
    }
    if (typeof transaction.extraCallData === "function") {
        const extraData = await transaction.extraCallData();
        if (!extraData) return undefined;
        if (!extraData.startsWith("0x")) {
            throw Error("Invalid extra calldata - must be a hex string");
        }
        if (extraData === "0x") {
            return undefined;
        }
        return extraData;
    }
    if (!transaction.extraCallData.startsWith("0x")) {
        throw Error("Invalid extra calldata - must be a hex string");
    }
    return transaction.extraCallData;
} //# sourceMappingURL=encode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Resolves a possibly asynchronous value.
 * If the value is a function that returns a promise, it will be awaited and the resolved value will be returned.
 * Otherwise, the value itself will be returned.
 *
 * @param value - The value to resolve.
 * @returns A promise that resolves to the resolved value.
 * @internal
 */ __turbopack_context__.s([
    "resolvePromisedValue",
    ()=>resolvePromisedValue
]);
async function resolvePromisedValue(value) {
    // @ts-expect-error - this works fine, but TS doesn't like it since 5.8
    return typeof value === "function" ? await value() : value;
} //# sourceMappingURL=resolve-promised-value.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/send-calls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendCalls",
    ()=>sendCalls,
    "toProviderCallParams",
    ()=>toProviderCallParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
;
;
;
;
async function sendCalls(options) {
    const { wallet, chain } = options;
    const account = wallet.getAccount();
    if (!account) {
        throw new Error(`Cannot send calls, no account connected for wallet: ${wallet.id}`);
    }
    const firstCall = options.calls[0];
    if (!firstCall) {
        throw new Error("No calls to send");
    }
    const callChain = firstCall.chain || chain;
    if (wallet.getChain()?.id !== callChain.id) {
        await wallet.switchChain(callChain);
    }
    // check internal implementations
    if (account.sendCalls) {
        const { wallet: _, ...optionsWithoutWallet } = options;
        const result = await account.sendCalls(optionsWithoutWallet);
        return {
            ...result,
            wallet
        };
    }
    throw new Error(`Cannot send calls, wallet ${wallet.id} does not support EIP-5792`);
}
async function toProviderCallParams(options, account) {
    const firstCall = options.calls[0];
    if (!firstCall) {
        throw new Error("No calls to send");
    }
    const { calls, capabilities, version = "2.0.0", chain = firstCall.chain } = options;
    const preparedCalls = await Promise.all(calls.map(async (call)=>{
        const { to, value } = call;
        if (to === undefined && call.data === undefined) {
            throw new Error("Cannot send call, `to` or `data` must be provided.");
        }
        const [_to, _data, _value] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(to),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(call),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(value)
        ]);
        if (_to) {
            return {
                data: _data,
                to: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(_to),
                value: typeof _value === "bigint" || typeof _value === "number" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(_value) : undefined
            };
        }
        return {
            data: _data,
            to: undefined,
            value: undefined
        };
    }));
    const injectedWalletCallParams = [
        {
            // see: https://eips.ethereum.org/EIPS/eip-5792#wallet_sendcalls
            atomicRequired: options.atomicRequired ?? false,
            calls: preparedCalls,
            capabilities,
            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(chain.id),
            from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
            version
        }
    ];
    return {
        callParams: injectedWalletCallParams,
        chain
    };
} //# sourceMappingURL=send-calls.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/chains.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// TODO - move this to chains subfolder
/**
 * Remove client id from RPC url for given chain
 * @internal
 */ __turbopack_context__.s([
    "getValidPublicRPCUrl",
    ()=>getValidPublicRPCUrl
]);
function getValidPublicRPCUrl(chain) {
    return getValidChainRPCs(chain).map((rpc)=>{
        try {
            const url = new URL(rpc);
            // remove client id from url
            if (url.hostname.endsWith(".thirdweb.com")) {
                url.pathname = "";
                url.search = "";
            }
            return url.toString();
        } catch  {
            return rpc;
        }
    });
}
// TODO - move this to chains/
/**
 * Get valid RPCs for given chain
 * @internal
 */ function getValidChainRPCs(chain, clientId, mode = "http") {
    const processedRPCs = [];
    for (const rpc of chain.rpc){
        // exclude RPC if mode mismatch
        if (mode === "http" && !rpc.startsWith("http")) {
            continue;
        }
        if (mode === "ws" && !rpc.startsWith("ws")) {
            continue;
        }
        // Replace API_KEY placeholder with value
        // biome-ignore lint/suspicious/noTemplateCurlyInString: this is valid
        if (rpc.includes("${THIRDWEB_API_KEY}")) {
            if (clientId) {
                processedRPCs.push(// biome-ignore lint/suspicious/noTemplateCurlyInString: this is what the string to replace looks like in this case
                rpc.replace("${THIRDWEB_API_KEY}", clientId) + (typeof globalThis !== "undefined" && "APP_BUNDLE_ID" in globalThis ? `/?bundleId=${globalThis.APP_BUNDLE_ID}` : ""));
            } else {
                // if no client id, let it through with empty string
                // if secretKey is present, it will be used in header
                // if none are passed, will have reduced access
                // biome-ignore lint/suspicious/noTemplateCurlyInString: this is what the string to replace looks like in this case
                processedRPCs.push(rpc.replace("${THIRDWEB_API_KEY}", ""));
            }
        } else if (rpc.includes("${")) {
        // do nothing (just don't add it to the list)
        } else {
            processedRPCs.push(rpc);
        }
    }
    if (processedRPCs.length === 0) {
        throw new Error(`No RPC available for chainId "${chain.chainId}" with mode ${mode}`);
    }
    return processedRPCs;
} //# sourceMappingURL=chains.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/normalizeChainId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeChainId",
    ()=>normalizeChainId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
;
function normalizeChainId(chainId) {
    if (typeof chainId === "number") {
        return chainId;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(chainId)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToNumber"])(chainId);
    }
    if (typeof chainId === "bigint") {
        return Number(chainId);
    }
    return Number.parseInt(chainId, 10);
} //# sourceMappingURL=normalizeChainId.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/platform.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowser",
    ()=>isBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function isReactNative() {
    return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
}
function isNode() {
    return typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions !== "undefined" && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node !== "undefined";
}
function isBrowser() {
    return !isReactNative() && !isNode();
} //# sourceMappingURL=platform.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Constants for most common wallets
__turbopack_context__.s([
    "COINBASE",
    ()=>COINBASE,
    "METAMASK",
    ()=>METAMASK,
    "NON_SEARCHABLE_WALLETS",
    ()=>NON_SEARCHABLE_WALLETS,
    "RAINBOW",
    ()=>RAINBOW,
    "ZERION",
    ()=>ZERION
]);
const COINBASE = "com.coinbase.wallet";
const METAMASK = "io.metamask";
const RAINBOW = "me.rainbow";
const ZERION = "io.zerion.wallet";
const NON_SEARCHABLE_WALLETS = [
    "inApp",
    "embedded",
    "smart",
    "xyz.abs"
]; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/url.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "formatExplorerAddressUrl",
    ()=>formatExplorerAddressUrl,
    "formatExplorerTxUrl",
    ()=>formatExplorerTxUrl,
    "formatNativeUrl",
    ()=>formatNativeUrl,
    "formatUniversalUrl",
    ()=>formatUniversalUrl,
    "formatWalletConnectUrl",
    ()=>formatWalletConnectUrl,
    "isHttpUrl",
    ()=>isHttpUrl
]);
function isHttpUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}
function formatUniversalUrl(appUrl, wcUri) {
    if (!isHttpUrl(appUrl)) {
        return formatNativeUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.endsWith("/")) {
        safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
        href: safeAppUrl,
        redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`
    };
}
function formatNativeUrl(appUrl, wcUri) {
    if (isHttpUrl(appUrl)) {
        return formatUniversalUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.includes("://")) {
        safeAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
        safeAppUrl = `${safeAppUrl}://`;
    }
    if (!safeAppUrl.endsWith("/")) {
        safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
        href: safeAppUrl,
        redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`
    };
}
function formatWalletConnectUrl(appUrl, wcUri) {
    return isHttpUrl(appUrl) ? formatUniversalUrl(appUrl, wcUri) : formatNativeUrl(appUrl, wcUri);
}
function formatExplorerTxUrl(explorerUrl, txHash) {
    return `${explorerUrl.endsWith("/") ? explorerUrl : `${explorerUrl}/`}tx/${txHash}`;
}
function formatExplorerAddressUrl(explorerUrl, address) {
    return `${explorerUrl.endsWith("/") ? explorerUrl : `${explorerUrl}/`}address/${address}`;
} //# sourceMappingURL=url.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/web/isMobile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isMobile",
    ()=>isMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/detect-platform.js [app-client] (ecmascript)");
;
/**
 * @internal
 */ function isAndroid() {
    // can only detect if useragent is defined
    if (typeof navigator === "undefined") {
        return false;
    }
    const os = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectOS"])(navigator.userAgent);
    return os ? os.toLowerCase().includes("android") : false;
}
/**
 * @internal
 */ function isIOS() {
    // can only detect if useragent is defined
    if (typeof navigator === "undefined") {
        return false;
    }
    const os = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectOS"])(navigator.userAgent);
    return os ? os.toLowerCase().includes("ios") || os.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 : false;
}
/**
 * @internal
 */ function hasTouchScreen() {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return false;
    }
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || // @ts-expect-error - msMaxTouchPoints is IE specific
    navigator.msMaxTouchPoints > 0;
}
/**
 * @internal
 */ function hasMobileAPIs() {
    if (typeof window === "undefined") {
        return false;
    }
    return "orientation" in window || "onorientationchange" in window;
}
function isMobile() {
    // Primary signal: OS detection via user agent
    const isMobileOS = isAndroid() || isIOS();
    if (isMobileOS) {
        return true;
    }
    // Secondary signal: catch edge cases like webviews with modified user agents
    // Both touch capability AND mobile-specific APIs must be present to avoid
    // false positives on touch-enabled desktops
    if (hasTouchScreen() && hasMobileAPIs()) {
        return true;
    }
    const isMobileViewport = typeof window !== "undefined" && window.innerWidth < 640;
    if (isMobileViewport) {
        return true;
    }
    return false;
} //# sourceMappingURL=isMobile.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/web/openWindow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "openWindow",
    ()=>openWindow
]);
function openWindow(uri) {
    const isInsideIframe = window !== window.top;
    if (isInsideIframe) {
        window.open(uri);
    } else {
        if (uri.startsWith("http")) {
            // taken from for https://github.com/rainbow-me/rainbowkit/
            // Using 'window.open' causes issues on iOS in non-Safari browsers and
            // WebViews where a blank tab is left behind after connecting.
            // This is especially bad in some WebView scenarios (e.g. following a
            // link from Twitter) where the user doesn't have any mechanism for
            // closing the blank tab.
            // For whatever reason, links with a target of "_blank" don't suffer
            // from this problem, and programmatically clicking a detached link
            // element with the same attributes also avoids the issue.
            const link = document.createElement("a");
            link.href = uri;
            link.target = "_blank";
            link.rel = "noreferrer noopener";
            link.click();
        } else {
            window.location.href = uri;
        }
    }
} //# sourceMappingURL=openWindow.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWalletInfo",
    ()=>getWalletInfo
]);
// This file is auto-generated by the `scripts/wallets/generate.ts` script.
// Do not modify this file manually.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)");
;
async function getWalletInfo(id, image) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(id)) {
        const { getEcosystemWalletInfo } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-info.js [app-client] (ecmascript, async loader)");
        return image ? getEcosystemWalletInfo(id).then((info)=>info.image_id) : getEcosystemWalletInfo(id);
    }
    switch(id){
        case "smart":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/smart/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/smart/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "inApp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/inApp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/inApp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "walletConnect":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/walletConnect/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/walletConnect/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "embedded":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/embedded/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/embedded/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "adapter":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/adapter/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/adapter/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.metamask":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.metamask/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.metamask/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.trustwallet.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trustwallet.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trustwallet.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zerion.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zerion.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zerion.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.okex.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.okex.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.okex.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.binance.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.binance.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.binance.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitget.web3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitget.web3/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitget.web3/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.safepal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safepal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safepal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.tokenpocket":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.tokenpocket/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.tokenpocket/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.uniswap":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.uniswap/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.uniswap/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bestwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bestwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bestwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ledger":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ledger/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ledger/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bybit":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bybit/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bybit/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.elrond.maiar.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.elrond.maiar.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.elrond.maiar.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.fireblocks":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fireblocks/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fireblocks/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.crypto.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crypto.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crypto.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitcoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitcoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitcoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bifrostwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bifrostwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bifrostwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "im.token":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/im.token/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/im.token/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.1inch.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.1inch.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.1inch.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.blockchain.login":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blockchain.login/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blockchain.login/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "global.safe":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/global.safe/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/global.safe/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitpay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "jp.co.rakuten-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/jp.co.rakuten-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/jp.co.rakuten-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.arculus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.arculus/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.arculus/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.ctrl":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.ctrl/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.ctrl/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.roninchain.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.roninchain.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.roninchain.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wemixplay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemixplay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemixplay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.haha":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.haha/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.haha/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.hashpack.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hashpack.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hashpack.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.rainbow":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.rainbow/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.rainbow/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "id.co.pintu":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.co.pintu/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.co.pintu/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.exodus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.exodus/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.exodus/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wigwam.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wigwam.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wigwam.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tangem":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tangem/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tangem/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ag.jup":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ag.jup/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ag.jup/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.blackfort":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.blackfort/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.blackfort/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ibvm":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ibvm/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ibvm/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bee":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bee/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bee/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kraken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kraken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kraken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.magiceden.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.magiceden.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.magiceden.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.hot-labs.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.hot-labs.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.hot-labs.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dcentwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dcentwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dcentwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.avacus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.avacus/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.avacus/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kucoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kucoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kucoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.keplr":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keplr/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keplr/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.mathwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mathwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mathwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.yowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.internetmoney":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.internetmoney/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.internetmoney/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.opera":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opera/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opera/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.backpack":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.backpack/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.backpack/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.robinhood.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.robinhood.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.robinhood.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.socios.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.socios.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.socios.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.chain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.chain/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.chain/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.core.extension":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.core.extension/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.core.extension/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.huddln":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.huddln/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.huddln/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.joeywallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.joeywallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.joeywallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "so.onekey.app.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/so.onekey.app.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/so.onekey.app.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.flowfoundation.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flowfoundation.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flowfoundation.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.wombat":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.wombat/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.wombat/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pk.modular":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pk.modular/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pk.modular/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.subwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.subwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.subwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.argent":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.argent/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.argent/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.kabila":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.kabila/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.kabila/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.mewwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mewwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mewwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.sabay.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sabay.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sabay.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.loopring.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.loopring.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.loopring.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.tokoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tokoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tokoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.klipwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.klipwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.klipwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.novawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.novawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.novawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.thorwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thorwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thorwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.zengo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zengo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zengo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.oasys-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.oasys-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.oasys-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.fastex.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fastex.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fastex.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.cvl":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.cvl/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.cvl/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitso":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitso/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitso/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.cypherhq":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cypherhq/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cypherhq/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.valoraapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.valoraapp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.valoraapp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.leapwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.leapwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.leapwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.everspace":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.everspace/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.everspace/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.atomicwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.atomicwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.atomicwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.coca":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.coca/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.coca/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.kriptomat":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kriptomat/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kriptomat/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "money.unstoppable":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.unstoppable/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.unstoppable/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.uniultra.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.uniultra.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.uniultra.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.oxalus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.oxalus/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.oxalus/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ullapay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ullapay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ullapay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tomi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tomi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tomi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.frontier.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.frontier.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.frontier.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coldwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coldwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coldwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.krystal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.krystal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.krystal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.over":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.over/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.over/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.creditcoin.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.creditcoin.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.creditcoin.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.gooddollar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.gooddollar/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.gooddollar/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.monarchwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.monarchwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.monarchwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "tech.okto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.okto/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.okto/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.alephium":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.alephium/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.alephium/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.mtpelerin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mtpelerin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mtpelerin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.burritowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.burritowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.burritowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.enjin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.enjin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.enjin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.veworld":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.veworld/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.veworld/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.family.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.family.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.family.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.localtrade.lab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.localtrade.lab/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.localtrade.lab/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ellipal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ellipal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ellipal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.xcapit":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.xcapit/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.xcapit/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.gemwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "dev.auroracloud":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/dev.auroracloud/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/dev.auroracloud/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.zeal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.zeal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.zeal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.compasswallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.compasswallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.compasswallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coin98":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coin98/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coin98/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.linen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.linen/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.linen/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coolbitx.cwsapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coolbitx.cwsapp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coolbitx.cwsapp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.nabox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nabox/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nabox/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.noone":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.noone/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.noone/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.walletnow":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.walletnow/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.walletnow/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.withpaper":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.withpaper/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.withpaper/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.haqq":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.haqq/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.haqq/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ricewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ricewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ricewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.openwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.openwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.openwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.okse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.okse/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.okse/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.koalawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.koalawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.koalawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.aktionariat":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.aktionariat/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.aktionariat/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cakewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cakewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cakewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.paybolt":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paybolt/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paybolt/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.plasma-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.plasma-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.plasma-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.purewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.purewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.purewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "my.mone":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/my.mone/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/my.mone/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.bytebank":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bytebank/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bytebank/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.yusetoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yusetoken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yusetoken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.optowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.optowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.optowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ethermail":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethermail/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethermail/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.beewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.beewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.beewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.foxwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.foxwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.foxwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.pionewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pionewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pionewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "it.airgap":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/it.airgap/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/it.airgap/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.holdstation":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.holdstation/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.holdstation/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.thepulsewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thepulsewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thepulsewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.abra":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.abra/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.abra/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.keyring":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keyring/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keyring/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.premanft":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.premanft/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.premanft/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.miraiapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.miraiapp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.miraiapp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.timelesswallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.timelesswallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.timelesswallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "social.halo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.halo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.halo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.iopay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.iopay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.iopay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.bitizen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bitizen/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bitizen/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.ultimate":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ultimate/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ultimate/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.fizzwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.fizzwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.fizzwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.nightly":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nightly/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nightly/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinomi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinomi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinomi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.stickey":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.stickey/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.stickey/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.uptn.dapp-web":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.uptn.dapp-web/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.uptn.dapp-web/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.pundi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.pundi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.pundi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.coinstats":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.coinstats/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.coinstats/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.nicegram":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nicegram/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nicegram/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.harti":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.harti/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.harti/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "fi.pillar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.pillar/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.pillar/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.hbwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.hbwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.hbwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.dttd":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.dttd/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.dttd/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zelcore":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelcore/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelcore/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tellaw":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tellaw/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tellaw/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.trusteeglobal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trusteeglobal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trusteeglobal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "is.callback":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/is.callback/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/is.callback/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.bladewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bladewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bladewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.summonersarena":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.summonersarena/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.summonersarena/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitpie":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpie/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpie/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.ixo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.ixo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.ixo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.gateweb3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.gateweb3/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.gateweb3/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.unstoppabledomains":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unstoppabledomains/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unstoppabledomains/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.cosmostation":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cosmostation/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cosmostation/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.sequence":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.sequence/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.sequence/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.ammer":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ammer/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ammer/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "us.binance":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/us.binance/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/us.binance/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.thetatoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thetatoken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thetatoken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.freedom":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.freedom/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.freedom/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.muza":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.muza/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.muza/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.neopin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.neopin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.neopin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.neonwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neonwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neonwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.ryipay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ryipay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ryipay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.saakuru.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saakuru.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saakuru.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.dota168":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dota168/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dota168/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.legacynetwork":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legacynetwork/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legacynetwork/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coininn":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coininn/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coininn/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.hyperpay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hyperpay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hyperpay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.safemoon":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safemoon/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safemoon/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.easy":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.easy/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.easy/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.myabcwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.myabcwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.myabcwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.secuxtech":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.secuxtech/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.secuxtech/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.wallet3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallet3/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallet3/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.midoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.midoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.midoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "id.competence":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.competence/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.competence/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "llc.besc":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/llc.besc/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/llc.besc/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.onto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.onto/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.onto/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "baby.smart":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/baby.smart/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/baby.smart/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.klever":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.klever/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.klever/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.beexo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.beexo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.beexo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ivirse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ivirse/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ivirse/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.alphawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alphawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alphawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ch.dssecurity":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ch.dssecurity/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ch.dssecurity/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.concordium":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.concordium/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.concordium/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.gemspocket":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemspocket/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemspocket/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zkape":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zkape/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zkape/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.unitywallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unitywallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unitywallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.pitaka":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pitaka/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pitaka/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.saitamatoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saitamatoken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saitamatoken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.crossmint":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crossmint/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crossmint/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.status":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.status/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.status/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.mugambo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mugambo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mugambo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.shido":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.shido/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.shido/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.meld.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.meld.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.meld.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.authentrend":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.authentrend/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.authentrend/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.paliwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paliwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paliwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.talken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.talken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.talken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.fintoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.fintoken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.fintoken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.fizen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.fizen/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.fizen/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "vc.uincubator.api":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/vc.uincubator.api/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/vc.uincubator.api/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.unagi.unawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.unagi.unawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.unagi.unawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ambire":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ambire/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ambire/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.armana.portal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.armana.portal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.armana.portal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.x9wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.x9wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.x9wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.kigo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kigo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kigo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kryptogo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kryptogo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kryptogo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.getcogni":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.getcogni/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.getcogni/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.wallacy":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallacy/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallacy/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "one.mixin.messenger":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/one.mixin.messenger/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/one.mixin.messenger/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.tucop":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.tucop/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.tucop/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kresus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kresus/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kresus/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.sinum":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.sinum/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.sinum/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.soulswap.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.soulswap.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.soulswap.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ballet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ballet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ballet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.shapeshift":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.shapeshift/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.shapeshift/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.nash":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nash/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nash/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "money.keychain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.keychain/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.keychain/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.getclave":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getclave/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getclave/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bettatrade":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bettatrade/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bettatrade/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.pockie":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pockie/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pockie/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "online.puzzle":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/online.puzzle/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/online.puzzle/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.voltage":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.voltage/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.voltage/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.mrhb":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.mrhb/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.mrhb/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.echooo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.echooo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.echooo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.trustasset":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trustasset/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trustasset/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.nonbank":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nonbank/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nonbank/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.tradestrike":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tradestrike/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tradestrike/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.dfinnwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.dfinnwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.dfinnwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.legionnetwork":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legionnetwork/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legionnetwork/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ripio":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ripio/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ripio/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "inc.tomo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/inc.tomo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/inc.tomo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.komet.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.komet.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.komet.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.guardiianwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.guardiianwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.guardiianwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.rezor":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.rezor/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.rezor/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.utorg":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.utorg/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.utorg/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.zypto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zypto/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zypto/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.fxwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fxwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fxwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tastycrypto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tastycrypto/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tastycrypto/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "live.superex":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/live.superex/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/live.superex/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.alpha-u.wallet.web":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.alpha-u.wallet.web/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.alpha-u.wallet.web/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.trinity-tech":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trinity-tech/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trinity-tech/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.universaleverything":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.universaleverything/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.universaleverything/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "gg.indi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/gg.indi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/gg.indi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.thirdweb":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.thirdweb/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.thirdweb/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.poolsmobility.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.poolsmobility.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.poolsmobility.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.roam.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.roam.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.roam.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.gamic":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.gamic/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.gamic/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.m1nty":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.m1nty/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.m1nty/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.buzz-up":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.buzz-up/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.buzz-up/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.catecoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.catecoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.catecoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.hootark":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hootark/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hootark/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coincircle":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coincircle/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coincircle/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.copiosa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.copiosa/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.copiosa/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ttmwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ttmwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ttmwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.bharatbox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bharatbox/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bharatbox/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.dosi.vault":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.dosi.vault/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.dosi.vault/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.qubic.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.qubic.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.qubic.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.spatium":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.nufinetes":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nufinetes/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nufinetes/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.swopme":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.swopme/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.swopme/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "land.liker":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/land.liker/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/land.liker/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dolletwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dolletwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dolletwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.gayawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gayawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gayawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.shinobi-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.shinobi-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.shinobi-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.azcoiner":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.azcoiner/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.azcoiner/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.passwallet.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.passwallet.app/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.passwallet.app/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.bonuz":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.bonuz/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.bonuz/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinex.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinex.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinex.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.xverse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.xverse/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.xverse/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinsdo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinsdo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinsdo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.flash-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flash-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flash-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.nodle":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nodle/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nodle/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.vgxfoundation":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.vgxfoundation/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.vgxfoundation/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.arianee":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.arianee/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.arianee/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.trustkeys":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.trustkeys/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.trustkeys/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ozonewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ozonewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ozonewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.konio":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.konio/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.konio/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.owallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.owallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.owallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zelus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelus/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelus/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.myrenegade":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.myrenegade/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.myrenegade/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.clingon":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.clingon/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.clingon/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.icewal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.icewal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.icewal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.maxwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.maxwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.maxwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.streakk":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.streakk/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.streakk/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.pandoshi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pandoshi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pandoshi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.porta":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.porta/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.porta/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.earthwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.earthwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.earthwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.up":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.up/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.up/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.spatium.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.adftechnology":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.adftechnology/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.adftechnology/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.opz":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opz/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opz/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.wallypto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallypto/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallypto/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.reown":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.kelp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.kelp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.kelp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.xellar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.xellar/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.xellar/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.qoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.qoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.qoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.daffione":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.daffione/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.daffione/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.passpay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.passpay/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.passpay/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bscecowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bscecowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bscecowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "fun.tobi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fun.tobi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fun.tobi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "technology.obvious":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.obvious/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.obvious/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.liberawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.liberawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.liberawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.caesiumlab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.caesiumlab/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.caesiumlab/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "trade.flooz.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/trade.flooz.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/trade.flooz.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.greengloryglobal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.greengloryglobal/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.greengloryglobal/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kriptonio":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kriptonio/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kriptonio/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitnovo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitnovo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitnovo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.get-verso":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.get-verso/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.get-verso/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kaxaa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kaxaa/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kaxaa/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.pltwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pltwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pltwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.apollox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.apollox/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.apollox/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.pierwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pierwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pierwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.shefi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.shefi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.shefi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.orion":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.orion/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.orion/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "nl.greenhood.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/nl.greenhood.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/nl.greenhood.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.helixid":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.helixid/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.helixid/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.gridlock":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.gridlock/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.gridlock/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.keeper-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keeper-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keeper-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.webauth":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.webauth/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.webauth/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wemix":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemix/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemix/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.scramberry":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.scramberry/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.scramberry/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bmawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bmawallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bmawallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.lifedefi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.lifedefi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.lifedefi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ready":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ready/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ready/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.amazewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.amazewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.amazewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "technology.jambo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.jambo/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.jambo/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.didwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.didwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.didwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "fi.dropmate":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.dropmate/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.dropmate/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.edge":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.edge/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.edge/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.banksocial":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.banksocial/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.banksocial/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.obliowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.obliowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.obliowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.ecoinwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ecoinwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ecoinwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.3swallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.3swallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.3swallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ipmb":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ipmb/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ipmb/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.qubetics":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.qubetics/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.qubetics/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.hacken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.hacken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.hacken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.imem":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.imem/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.imem/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.astrox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.astrox/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.astrox/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.purechain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.purechain/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.purechain/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ethos":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethos/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethos/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.prettygood.x":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.prettygood.x/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.prettygood.x/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.revelator.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.revelator.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.revelator.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.lif3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lif3/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lif3/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.broearn":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.broearn/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.broearn/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.blocto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.blocto/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.blocto/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.girin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.girin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.girin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.plena":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.plena/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.plena/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "zone.bitverse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/zone.bitverse/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/zone.bitverse/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.saify":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saify/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saify/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.plutope":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.plutope/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.plutope/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.alicebob":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alicebob/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alicebob/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.islamicoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.islamicoin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.islamicoin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dokwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dokwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dokwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.paraswap":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.paraswap/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.paraswap/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.nestwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.nestwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.nestwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.w3wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.w3wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.w3wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cryptnox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptnox/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptnox/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.hippowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hippowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hippowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dextrade":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dextrade/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dextrade/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ukiss":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ukiss/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ukiss/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.bimwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bimwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bimwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.dropp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.dropp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.dropp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.tofee":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.tofee/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.tofee/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.reown.docs":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.docs/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.docs/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.certhis":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.certhis/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.certhis/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.payperless":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.payperless/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.payperless/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.safecryptowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safecryptowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safecryptowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tiduswallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tiduswallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tiduswallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.herewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.herewallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.herewallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.rktechworks":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.rktechworks/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.rktechworks/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.sinohope":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sinohope/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sinohope/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.fncy":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.fncy/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.fncy/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.dgg":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.dgg/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.dgg/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.cyber.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.cyber.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.cyber.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pub.dg":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pub.dg/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pub.dg/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.reown.appkit-lab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.appkit-lab/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.appkit-lab/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.moonstake":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.moonstake/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.moonstake/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.mpcvault.broswerplugin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mpcvault.broswerplugin/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mpcvault.broswerplugin/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.altme":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.altme/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.altme/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.clot":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.clot/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.clot/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.talkapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.talkapp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.talkapp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "social.gm2":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.gm2/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.gm2/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "digital.minerva":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/digital.minerva/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/digital.minerva/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.stasis":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.stasis/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.stasis/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cryptokara":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptokara/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptokara/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.peakdefi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.peakdefi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.peakdefi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.xucre":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xucre/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xucre/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.example.subdomain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.example.subdomain/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.example.subdomain/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.transi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.transi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.transi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.panaroma":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.panaroma/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.panaroma/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.spotonchain.platform":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.spotonchain.platform/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.spotonchain.platform/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.omni":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.omni/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.omni/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.humbl":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.humbl/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.humbl/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "id.plumaa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.plumaa/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.plumaa/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.filwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.filwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.filwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "money.snowball":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.snowball/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.snowball/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ennowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ennowallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ennowallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.safematrix":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safematrix/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safematrix/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.assure":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.assure/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.assure/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.neftipedia":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neftipedia/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neftipedia/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.goldbit":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.goldbit/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.goldbit/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coingrig":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coingrig/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coingrig/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.xfun":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xfun/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xfun/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.antiersolutions":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.antiersolutions/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.antiersolutions/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.itoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.itoken/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.itoken/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cardstack":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cardstack/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cardstack/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.slavi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.slavi/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.slavi/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "tech.defiantapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.defiantapp/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.defiantapp/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.xenea":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xenea/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xenea/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.superhero.cordova":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.superhero.cordova/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.superhero.cordova/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.kgen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kgen/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kgen/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.r0ar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.r0ar/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.r0ar/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.dailychain.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dailychain.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dailychain.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.freighter":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.freighter/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.freighter/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.ab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ab/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ab/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.walletverse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.walletverse/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.walletverse/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.berasig":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.berasig/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.berasig/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.phantom":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.phantom/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.phantom/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinbase.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinbase.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinbase.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.rabby":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.rabby/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.rabby/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.hinkal.walletconnect":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.hinkal.walletconnect/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.hinkal.walletconnect/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.brave.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.brave.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.brave.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.moongate.one":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.moongate.one/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.moongate.one/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "tech.levain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.levain/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.levain/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.enkrypt":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.enkrypt/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.enkrypt/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.scramble":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.scramble/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.scramble/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.finoa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.finoa/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.finoa/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.walletconnect.com":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.walletconnect.com/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.walletconnect.com/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.blazpay.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blazpay.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blazpay.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.getjoin.prd":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getjoin.prd/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getjoin.prd/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.talisman":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.talisman/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.talisman/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "eu.flashsoft.clear-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/eu.flashsoft.clear-wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/eu.flashsoft.clear-wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.berasig":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.berasig/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.berasig/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wallet.reown":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wallet.reown/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wallet.reown/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.blanqlabs.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blanqlabs.wallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blanqlabs.wallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.lootrush":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lootrush/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lootrush/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.dawnwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.dawnwallet/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.dawnwallet/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.abs":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.abs/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.abs/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "sh.frame":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/sh.frame/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/sh.frame/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.useglyph":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.useglyph/image.js [app-client] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.useglyph/index.js [app-client] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        default:
            {
                throw new Error(`Wallet with id ${id} not found`);
            }
    }
} //# sourceMappingURL=getWalletInfo.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coinbaseWalletSDK",
    ()=>coinbaseWalletSDK
]);
/**
 * internal helper functions
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/connect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js [app-client] (ecmascript)");
;
;
;
;
function coinbaseWalletSDK(args) {
    const { createOptions } = args;
    const emitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletEmitter"])();
    let account;
    let chain;
    function reset() {
        account = undefined;
        chain = undefined;
    }
    let handleDisconnect = async ()=>{};
    let handleSwitchChain = async (newChain)=>{
        chain = newChain;
    };
    const unsubscribeChainChanged = emitter.subscribe("chainChanged", (newChain)=>{
        chain = newChain;
    });
    const unsubscribeDisconnect = emitter.subscribe("disconnect", ()=>{
        reset();
        unsubscribeChainChanged();
        unsubscribeDisconnect();
    });
    emitter.subscribe("accountChanged", (_account)=>{
        account = _account;
    });
    return {
        autoConnect: async (options)=>{
            const { autoConnectCoinbaseWalletSDK } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-web.js [app-client] (ecmascript, async loader)");
            const provider = await args.providerFactory();
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await autoConnectCoinbaseWalletSDK(options, emitter, provider);
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]
            });
            // return account
            return account;
        },
        connect: async (options)=>{
            const { connectCoinbaseWalletSDK } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-web.js [app-client] (ecmascript, async loader)");
            const provider = await args.providerFactory();
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await connectCoinbaseWalletSDK(options, emitter, provider);
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]
            });
            // return account
            return account;
        },
        disconnect: async ()=>{
            reset();
            await handleDisconnect();
        },
        getAccount: ()=>account,
        getChain () {
            if (!chain) {
                return undefined;
            }
            chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChainIfExists"])(chain.id) || chain;
            return chain;
        },
        getConfig: ()=>createOptions,
        id: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"],
        onConnectRequested: async ()=>{
            if (args.onConnectRequested) {
                const provider = await args.providerFactory();
                return args.onConnectRequested?.(provider);
            }
        },
        subscribe: emitter.subscribe,
        switchChain: async (newChain)=>{
            await handleSwitchChain(newChain);
        }
    };
} //# sourceMappingURL=coinbase-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/defaultDappMetadata.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultAppMetadata",
    ()=>getDefaultAppMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/platform.js [app-client] (ecmascript)");
;
function getDefaultAppMetadata() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"])()) {
        return {
            description: "thirdweb powered dApp",
            logoUrl: "https://thirdweb.com/favicon.ico",
            name: "thirdweb powered dApp",
            url: "https://thirdweb.com"
        };
    }
    const { protocol, hostname, port } = window.location;
    let baseUrl = `${protocol}//${hostname}`;
    // Add the port if it's not the default HTTP or HTTPS port
    if (port && port !== "80" && port !== "443") {
        baseUrl += `:${port}`;
    }
    const logoUrl = `${baseUrl}/favicon.ico`;
    return {
        description: window.document.title || "thirdweb powered dApp",
        logoUrl,
        name: window.document.title || "thirdweb powered dApp",
        url: baseUrl
    };
} //# sourceMappingURL=defaultDappMetadata.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "showCoinbasePopup",
    ()=>showCoinbasePopup
]);
async function showCoinbasePopup(provider) {
    // biome-ignore lint/suspicious/noExplicitAny: based on the latest CB SDK - scary but works
    await provider?.communicator?.waitForPopupLoaded?.();
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-web.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoConnectCoinbaseWalletSDK",
    ()=>autoConnectCoinbaseWalletSDK,
    "connectCoinbaseWalletSDK",
    ()=>connectCoinbaseWalletSDK,
    "getCoinbaseWebProvider",
    ()=>getCoinbaseWebProvider,
    "isCoinbaseSDKWallet",
    ()=>isCoinbaseSDKWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TypedData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$calls$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/get-calls-status.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$capabilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/get-capabilities.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$send$2d$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/send-calls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/chains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/defaultDappMetadata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/normalizeChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$coinbase$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/utils.js [app-client] (ecmascript)");
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
// Need to keep the provider around because it keeps a single popup window connection behind the scenes
// this should be ok since all the creation options are provided at build time
let _provider;
async function getCoinbaseWebProvider(options) {
    if (!_provider) {
        let CoinbaseWalletSDK = (await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@coinbase/wallet-sdk/dist/index.js [app-client] (ecmascript, async loader)")).default;
        // Workaround for Vite dev import errors
        // https://github.com/vitejs/vite/issues/7112
        if (typeof CoinbaseWalletSDK !== "function" && typeof CoinbaseWalletSDK.default === "function") {
            CoinbaseWalletSDK = CoinbaseWalletSDK.default;
        }
        // @ts-expect-error This import error is not visible to TypeScript
        const client = new CoinbaseWalletSDK({
            appChainIds: options?.chains ? options.chains.map((c)=>c.id) : undefined,
            appLogoUrl: options?.appMetadata?.logoUrl || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().logoUrl,
            appName: options?.appMetadata?.name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().name
        });
        const provider = client.makeWeb3Provider(options?.walletConfig);
        _provider = provider;
        return provider;
    }
    return _provider;
}
function isCoinbaseSDKWallet(wallet) {
    return wallet.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"];
}
function createAccount({ provider, address, client }) {
    const account = {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
        onTransactionRequested: async ()=>{
            // make sure to show the coinbase popup BEFORE doing any transaction preprocessing
            // otherwise the popup might get blocked in safari
            // but only if using cb smart wallet (web based)
            if (window.localStorage) {
                // this is the local storage key for the signer type in the cb web sdk
                // value can be "scw" (web) or "walletlink" (mobile wallet)
                const signerType = window.localStorage.getItem("-CBWSDK:SignerConfigurator:SignerType");
                if (signerType === "scw") {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$coinbase$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showCoinbasePopup"])(provider);
                }
            }
        },
        async sendTransaction (tx) {
            const transactionHash = await provider.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        accessList: tx.accessList,
                        data: tx.data,
                        from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
                        gas: tx.gas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.gas) : undefined,
                        to: tx.to,
                        value: tx.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.value) : undefined
                    }
                ]
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                chainId: tx.chainId,
                client: client,
                contractAddress: tx.to ?? undefined,
                gasPrice: tx.gasPrice,
                transactionHash,
                walletAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
                walletType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]
            });
            return {
                transactionHash
            };
        },
        async signMessage ({ message }) {
            if (!account.address) {
                throw new Error("Provider not setup");
            }
            const messageToSign = (()=>{
                if (typeof message === "string") {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(message.raw);
                }
                return message.raw;
            })();
            const res = await provider.request({
                method: "personal_sign",
                params: [
                    messageToSign,
                    account.address
                ]
            });
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](res)) {
                throw new Error("Invalid signature returned");
            }
            return res;
        },
        async signTypedData (typedData) {
            if (!account.address) {
                throw new Error("Provider not setup");
            }
            const { domain, message, primaryType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTypedData"])(typedData);
            const types = {
                EIP712Domain: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractEip712DomainTypes"](domain),
                ...typedData.types
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"]({
                domain,
                message,
                primaryType,
                types
            });
            const stringifiedData = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serialize"]({
                domain: domain ?? {},
                message,
                primaryType,
                types
            });
            const res = await provider.request({
                method: "eth_signTypedData_v4",
                params: [
                    account.address,
                    stringifiedData
                ]
            });
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](res)) {
                throw new Error("Invalid signed payload returned");
            }
            return res;
        },
        sendCalls: async (options)=>{
            try {
                const { callParams, chain } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$send$2d$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toProviderCallParams"])(options, account);
                const callId = await provider.request({
                    method: "wallet_sendCalls",
                    params: callParams
                });
                if (callId && typeof callId === "object" && "id" in callId) {
                    return {
                        chain,
                        client,
                        id: callId.id
                    };
                }
                return {
                    chain,
                    client,
                    id: callId
                };
            } catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]} errored calling wallet_sendCalls, with error: ${error instanceof Error ? error.message : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(error)}`);
                }
                throw error;
            }
        },
        async getCallsStatus (options) {
            try {
                const rawResponse = await provider.request({
                    method: "wallet_getCallsStatus",
                    params: [
                        options.id
                    ]
                });
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$calls$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGetCallsStatusResponse"])(rawResponse);
            } catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]} does not support wallet_getCallsStatus, reach out to them directly to request EIP-5792 support.`);
                }
                throw error;
            }
        },
        async getCapabilities (options) {
            const chainId = options.chainId;
            try {
                const result = await provider.request({
                    method: "wallet_getCapabilities",
                    params: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address)
                    ]
                });
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$capabilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGetCapabilitiesResult"])(result, chainId);
            } catch (error) {
                if (/unsupport|not support|not available/i.test(error.message)) {
                    return {
                        message: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]} does not support wallet_getCapabilities, reach out to them directly to request EIP-5792 support.`
                    };
                }
                throw error;
            }
        }
    };
    return account;
}
function onConnect(address, chain, provider, emitter, client) {
    const account = createAccount({
        address,
        client,
        provider
    });
    async function disconnect() {
        provider.removeListener("accountsChanged", onAccountsChanged);
        provider.removeListener("chainChanged", onChainChanged);
        provider.removeListener("disconnect", onDisconnect);
        await provider.disconnect();
    }
    async function onDisconnect() {
        disconnect();
        emitter.emit("disconnect", undefined);
    }
    function onAccountsChanged(accounts) {
        if (accounts[0]) {
            const newAccount = createAccount({
                address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(accounts[0]),
                client,
                provider
            });
            emitter.emit("accountChanged", newAccount);
            emitter.emit("accountsChanged", accounts);
        } else {
            onDisconnect();
        }
    }
    function onChainChanged(newChainId) {
        const newChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(newChainId));
        emitter.emit("chainChanged", newChain);
    }
    // subscribe to events
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    provider.on("disconnect", onDisconnect);
    return [
        account,
        chain,
        onDisconnect,
        (newChain)=>switchChainCoinbaseWalletSDK(provider, newChain)
    ];
}
async function connectCoinbaseWalletSDK(options, emitter, provider) {
    const accounts = await provider.request({
        method: "eth_requestAccounts"
    });
    if (!accounts[0]) {
        throw new Error("No accounts found");
    }
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(accounts[0]);
    const connectedChainId = await provider.request({
        method: "eth_chainId"
    });
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(connectedChainId);
    let chain = options.chain && options.chain.id === chainId ? options.chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId);
    // Switch to chain if provided
    if (chainId && options?.chain && chainId !== options?.chain.id) {
        await switchChainCoinbaseWalletSDK(provider, options.chain);
        chain = options.chain;
    }
    return onConnect(address, chain, provider, emitter, options.client);
}
async function autoConnectCoinbaseWalletSDK(options, emitter, provider) {
    // connected accounts
    const addresses = await provider.request({
        method: "eth_accounts"
    });
    const address = addresses[0];
    if (!address) {
        throw new Error("No accounts found");
    }
    const connectedChainId = await provider.request({
        method: "eth_chainId"
    });
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(connectedChainId);
    const chain = options.chain && options.chain.id === chainId ? options.chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId);
    return onConnect(address, chain, provider, emitter, options.client);
}
async function switchChainCoinbaseWalletSDK(provider, chain) {
    // check if chain is already connected
    const connectedChainId = await provider.request({
        method: "eth_chainId"
    });
    const connectedChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(connectedChainId));
    if (connectedChain?.id === chain.id) {
        // chain is already connected, no need to switch
        return;
    }
    const chainIdHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(chain.id);
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: chainIdHex
                }
            ]
        });
    } catch (error) {
        const apiChain = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain);
        // Indicates chain is not added to provider
        // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
        if (error?.code === 4902) {
            // try to add the chain
            await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        blockExplorerUrls: apiChain.explorers?.map((x)=>x.url) || [],
                        chainId: chainIdHex,
                        chainName: apiChain.name,
                        nativeCurrency: apiChain.nativeCurrency,
                        rpcUrls: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidPublicRPCUrl"])(apiChain)
                    }
                ]
            });
        }
    }
} //# sourceMappingURL=coinbase-web.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-auth-options.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEcosystemInfo",
    ()=>getEcosystemInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-client] (ecmascript)");
;
;
async function getEcosystemInfo(walletId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const res = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/2024-05-05/ecosystem-wallet`, {
            headers: {
                "x-ecosystem-id": walletId
            }
        });
        const data = await res.json();
        if (!data || data.code === "UNAUTHORIZED") {
            throw new Error(data.message || `Could not find ecosystem wallet with id ${walletId}, please check your ecosystem wallet configuration.`);
        }
        // siwe is the auth option in the backend, but we want to use wallet as the auth option in the frontend
        if (data.authOptions?.includes("siwe")) {
            data.authOptions = data.authOptions.filter((o)=>o !== "siwe");
            data.authOptions.push("wallet");
        }
        return data;
    }, {
        cacheKey: `ecosystem-wallet-options-${walletId}`,
        cacheTime: 1000 * 60 * 5
    });
} //# sourceMappingURL=get-ecosystem-wallet-auth-options.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/in-app-core.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInAppWallet",
    ()=>createInAppWallet,
    "getOrCreateInAppWalletConnector",
    ()=>getOrCreateInAppWalletConnector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/connect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$get$2d$ecosystem$2d$wallet$2d$auth$2d$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-auth-options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js [app-client] (ecmascript)");
;
;
;
;
;
const connectorCache = new Map();
async function getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem) {
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
        clientId: client.clientId,
        ecosystem,
        partialSecretKey: client.secretKey?.slice(0, 5)
    });
    if (connectorCache.has(key)) {
        return connectorCache.get(key);
    }
    const connector = await connectorFactory(client);
    connectorCache.set(key, connector);
    return connector;
}
function createInAppWallet(args) {
    const { createOptions: _createOptions, connectorFactory, ecosystem } = args;
    const walletId = ecosystem ? ecosystem.id : "inApp";
    const emitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletEmitter"])();
    let createOptions = _createOptions;
    let account;
    let adminAccount; // Admin account if smartAccountOptions were provided with connection
    let chain;
    let client;
    let authToken = null;
    const resolveSmartAccountOptionsFromEcosystem = async (options)=>{
        if (ecosystem) {
            const ecosystemOptions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$get$2d$ecosystem$2d$wallet$2d$auth$2d$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEcosystemInfo"])(ecosystem.id);
            const smartAccountOptions = ecosystemOptions?.smartAccountOptions;
            if (smartAccountOptions) {
                const executionMode = ecosystemOptions.smartAccountOptions.executionMode;
                if (executionMode === "EIP7702") {
                    createOptions = {
                        ...createOptions,
                        executionMode: {
                            mode: "EIP7702",
                            sponsorGas: smartAccountOptions.sponsorGas
                        }
                    };
                } else {
                    // default to 4337
                    const { defaultChainId } = ecosystemOptions.smartAccountOptions;
                    const preferredChain = options?.chain ?? (defaultChainId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(defaultChainId) : undefined);
                    if (!preferredChain) {
                        throw new Error(`A chain must be provided either via 'chain' in connect options or 'defaultChainId' in ecosystem configuration. Please pass it via connect() or update the ecosystem configuration.`);
                    }
                    createOptions = {
                        ...createOptions,
                        smartAccount: {
                            chain: preferredChain,
                            factoryAddress: smartAccountOptions.accountFactoryAddress,
                            sponsorGas: smartAccountOptions.sponsorGas
                        }
                    };
                }
            }
        }
    };
    return {
        autoConnect: async (options)=>{
            const { autoConnectInAppWallet } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/index.js [app-client] (ecmascript, async loader)");
            const connector = await getOrCreateInAppWalletConnector(options.client, connectorFactory, ecosystem);
            await resolveSmartAccountOptionsFromEcosystem();
            const { account: connectedAccount, chain: connectedChain, adminAccount: _adminAccount } = await autoConnectInAppWallet(options, createOptions, connector);
            // set the states
            client = options.client;
            account = connectedAccount;
            adminAccount = _adminAccount;
            chain = connectedChain;
            try {
                authToken = await connector.storage.getAuthCookie();
            } catch (error) {
                console.error("Failed to retrieve auth token:", error);
                authToken = null;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                chainId: chain.id,
                client: options.client,
                ecosystem,
                walletAddress: account.address,
                walletType: walletId
            });
            // return only the account
            return account;
        },
        connect: async (options)=>{
            const { connectInAppWallet } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/index.js [app-client] (ecmascript, async loader)");
            const connector = await getOrCreateInAppWalletConnector(options.client, connectorFactory, ecosystem);
            await resolveSmartAccountOptionsFromEcosystem();
            const { account: connectedAccount, chain: connectedChain, adminAccount: _adminAccount } = await connectInAppWallet(options, createOptions, connector);
            // set the states
            client = options.client;
            account = connectedAccount;
            adminAccount = _adminAccount;
            chain = connectedChain;
            try {
                authToken = await connector.storage.getAuthCookie();
            } catch (error) {
                console.error("Failed to retrieve auth token:", error);
                authToken = null;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                chainId: chain.id,
                client: options.client,
                ecosystem,
                walletAddress: account.address,
                walletType: walletId
            });
            // return only the account
            return account;
        },
        disconnect: async ()=>{
            // If no client is assigned, we should be fine just unsetting the states
            if (client) {
                const connector = await getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem);
                const result = await connector.logout();
                if (!result.success) {
                    throw new Error("Failed to logout");
                }
            }
            account = undefined;
            adminAccount = undefined;
            chain = undefined;
            authToken = null;
            emitter.emit("disconnect", undefined);
        },
        getAccount: ()=>account,
        getAdminAccount: ()=>adminAccount,
        getAuthToken: ()=>authToken,
        getChain () {
            if (!chain) {
                return undefined;
            }
            chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChainIfExists"])(chain.id) || chain;
            return chain;
        },
        getConfig: ()=>createOptions,
        id: walletId,
        subscribe: emitter.subscribe,
        switchChain: async (newChain)=>{
            if ((createOptions?.smartAccount || createOptions?.executionMode?.mode === "EIP4337") && client && account) {
                // if account abstraction is enabled, reconnect to smart account on the new chain
                const { autoConnectInAppWallet } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/index.js [app-client] (ecmascript, async loader)");
                const connector = await getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem);
                await resolveSmartAccountOptionsFromEcosystem({
                    chain: newChain
                });
                const { account: connectedAccount, chain: connectedChain, adminAccount: _adminAccount } = await autoConnectInAppWallet({
                    chain: newChain,
                    client
                }, createOptions, connector);
                adminAccount = _adminAccount;
                account = connectedAccount;
                chain = connectedChain;
            } else {
                // if not, simply set the new chain
                chain = newChain;
            }
            emitter.emit("chainChanged", newChain);
        }
    };
} //# sourceMappingURL=in-app-core.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/ecosystem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ecosystemWallet",
    ()=>ecosystemWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$wallet$2f$in$2d$app$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/in-app-core.js [app-client] (ecmascript)");
;
function ecosystemWallet(...args) {
    const [ecosystemId, createOptions] = args;
    const ecosystem = {
        id: ecosystemId,
        partnerId: createOptions?.partnerId
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$wallet$2f$in$2d$app$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInAppWallet"])({
        connectorFactory: async (client)=>{
            const { InAppWebConnector } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/web-connector.js [app-client] (ecmascript, async loader)");
            return new InAppWebConnector({
                client,
                ecosystem,
                storage: createOptions?.storage
            });
        },
        createOptions: {
            auth: {
                ...createOptions?.auth,
                options: []
            },
            partnerId: ecosystem.partnerId
        },
        ecosystem
    });
} //# sourceMappingURL=ecosystem.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/in-app.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inAppWallet",
    ()=>inAppWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$wallet$2f$in$2d$app$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/in-app-core.js [app-client] (ecmascript)");
;
function inAppWallet(createOptions) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$wallet$2f$in$2d$app$2d$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInAppWallet"])({
        connectorFactory: async (client)=>{
            const { InAppWebConnector } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/web-connector.js [app-client] (ecmascript, async loader)");
            return new InAppWebConnector({
                client,
                passkeyDomain: createOptions?.auth?.passkeyDomain,
                storage: createOptions?.storage
            });
        },
        createOptions
    });
} //# sourceMappingURL=in-app.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/create-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWallet",
    ()=>createWallet,
    "walletConnect",
    ()=>walletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/connect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$isMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/web/isMobile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$openWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/web/openWindow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$coinbase$2f$coinbase$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$coinbase$2f$coinbase$2d$web$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-web.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$ecosystem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/ecosystem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$in$2d$app$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/in-app.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/smart-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js [app-client] (ecmascript)");
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
function createWallet(...args) {
    const [id, creationOptions] = args;
    switch(true){
        /**
         * SMART WALLET
         */ case id === "smart":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$smart$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["smartWallet"])(creationOptions);
            }
        /**
         * IN-APP WALLET
         */ case id === "embedded" || id === "inApp":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$in$2d$app$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inAppWallet"])(creationOptions);
            }
        /**
         * ECOSYSTEM WALLET
         */ case (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(id):
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$ecosystem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ecosystemWallet"])(...args);
        /**
         * COINBASE WALLET VIA SDK
         * -> if no injected coinbase found, we'll use the coinbase SDK
         */ case id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"]:
            {
                const options = creationOptions;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$coinbase$2f$coinbase$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coinbaseWalletSDK"])({
                    createOptions: options,
                    onConnectRequested: async (provider)=>{
                        // on the web, make sure to show the coinbase popup IMMEDIATELY on connection requested
                        // otherwise the popup might get blocked in safari
                        // TODO awaiting the provider is fast only thanks to preloading that happens in our components
                        // these probably need to actually imported / created synchronously to be used headless properly
                        const { showCoinbasePopup } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/utils.js [app-client] (ecmascript, async loader)");
                        return showCoinbasePopup(provider);
                    },
                    providerFactory: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$coinbase$2f$coinbase$2d$web$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoinbaseWebProvider"])(options)
                });
            }
        /**
         * WALLET CONNECT AND INJECTED WALLETS + walletConnect standalone
         */ default:
            {
                const emitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletEmitter"])();
                let account;
                let chain;
                let unsubscribeChain;
                function reset() {
                    account = undefined;
                    chain = undefined;
                }
                let handleDisconnect = async ()=>{};
                const unsubscribeDisconnect = emitter.subscribe("disconnect", ()=>{
                    reset();
                    unsubscribeChain?.();
                    unsubscribeDisconnect();
                });
                emitter.subscribe("accountChanged", (_account)=>{
                    account = _account;
                });
                let handleSwitchChain = async ()=>{
                    throw new Error("Not implemented yet");
                };
                // on mobile, deeplink to the wallet app for session handling
                const sessionHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$isMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobile"])() ? (uri)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$openWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"])(uri) : undefined;
                const wallet = {
                    autoConnect: async (options)=>{
                        const { injectedProvider } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-client] (ecmascript, async loader)");
                        // injected wallet priority for autoConnect
                        if (id !== "walletConnect" && injectedProvider(id)) {
                            const { autoConnectEip1193Wallet } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/index.js [app-client] (ecmascript, async loader)");
                            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await autoConnectEip1193Wallet({
                                chain: options.chain,
                                client: options.client,
                                emitter,
                                id: id,
                                provider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInjectedProvider"])(id)
                            });
                            // set the states
                            account = connectedAccount;
                            chain = connectedChain;
                            handleDisconnect = doDisconnect;
                            handleSwitchChain = doSwitchChain;
                            unsubscribeChain = emitter.subscribe("chainChanged", (newChain)=>{
                                chain = newChain;
                            });
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                                chainId: chain.id,
                                client: options.client,
                                walletAddress: account.address,
                                walletType: id
                            });
                            // return account
                            return account;
                        }
                        if (options && "client" in options) {
                            const { autoConnectWC } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/controller.js [app-client] (ecmascript, async loader)");
                            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await autoConnectWC(options, emitter, wallet.id, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"], sessionHandler);
                            // set the states
                            account = connectedAccount;
                            chain = connectedChain;
                            handleDisconnect = doDisconnect;
                            handleSwitchChain = doSwitchChain;
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                                chainId: chain.id,
                                client: options.client,
                                walletAddress: account.address,
                                walletType: id
                            });
                            // return account
                            return account;
                        }
                        throw new Error("Failed to auto connect");
                    },
                    connect: async (options)=>{
                        async function wcConnect(wcOptions) {
                            const { connectWC } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/controller.js [app-client] (ecmascript, async loader)");
                            let qrOverlay;
                            try {
                                const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await connectWC({
                                    ...wcOptions,
                                    walletConnect: {
                                        ...wcOptions.walletConnect,
                                        onDisplayUri: wcOptions.walletConnect?.onDisplayUri || (async (uri)=>{
                                            // Check if we're in a browser environment
                                            if (typeof window !== "undefined" && typeof document !== "undefined") {
                                                // on mobile, open the wallet app via deeplink
                                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$isMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMobile"])()) {
                                                    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletInfo"])(id);
                                                    const mobileAppLink = walletInfo.mobile.native || walletInfo.mobile.universal;
                                                    if (mobileAppLink) {
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$openWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletConnectUrl"])(mobileAppLink, uri).redirect);
                                                    } else {
                                                        // on android, wc:// links show the app picker
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$web$2f$openWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"])(uri);
                                                    }
                                                    return;
                                                } else {
                                                    try {
                                                        const { createQROverlay } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/qr-overlay.js [app-client] (ecmascript, async loader)");
                                                        // Clean up any existing overlay
                                                        if (qrOverlay) {
                                                            qrOverlay.destroy();
                                                        }
                                                        // Create new QR overlay
                                                        qrOverlay = createQROverlay(uri, {
                                                            theme: wcOptions.walletConnect?.qrModalOptions?.themeMode ?? "dark",
                                                            qrSize: 280,
                                                            showCloseButton: true,
                                                            onCancel: ()=>{
                                                                wcOptions.walletConnect?.onCancel?.();
                                                            }
                                                        });
                                                    } catch (error) {
                                                        console.error("Failed to create QR overlay:", error);
                                                    }
                                                }
                                            }
                                        })
                                    }
                                }, emitter, wallet.id, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"], sessionHandler);
                                // Clean up QR overlay on successful connection
                                if (qrOverlay) {
                                    qrOverlay.destroy();
                                    qrOverlay = undefined;
                                }
                                // set the states
                                account = connectedAccount;
                                chain = connectedChain;
                                handleDisconnect = doDisconnect;
                                handleSwitchChain = doSwitchChain;
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                                    chainId: chain.id,
                                    client: wcOptions.client,
                                    walletAddress: account.address,
                                    walletType: id
                                });
                                return account;
                            } catch (error) {
                                // Clean up QR overlay on connection error
                                if (qrOverlay) {
                                    qrOverlay.destroy();
                                    qrOverlay = undefined;
                                }
                                throw error;
                            }
                        }
                        if (id === "walletConnect") {
                            const { client, chain: _chain, ...walletConnectOptions } = options;
                            return wcConnect({
                                chain: _chain,
                                client,
                                walletConnect: {
                                    ...walletConnectOptions
                                }
                            });
                        }
                        // prefer walletconnect over injected if explicitely passing walletConnect options
                        const forceWalletConnectOption = options && "walletConnect" in options;
                        const { injectedProvider } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-client] (ecmascript, async loader)");
                        if (injectedProvider(id) && !forceWalletConnectOption) {
                            const { connectEip1193Wallet } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/index.js [app-client] (ecmascript, async loader)");
                            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await connectEip1193Wallet({
                                chain: options.chain,
                                client: options.client,
                                emitter,
                                id: id,
                                provider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInjectedProvider"])(id)
                            });
                            // set the states
                            account = connectedAccount;
                            chain = connectedChain;
                            handleDisconnect = doDisconnect;
                            handleSwitchChain = doSwitchChain;
                            unsubscribeChain = emitter.subscribe("chainChanged", (newChain)=>{
                                chain = newChain;
                            });
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                                chainId: chain.id,
                                client: options.client,
                                walletAddress: account.address,
                                walletType: id
                            });
                            // return account
                            return account;
                        }
                        if (options && "client" in options) {
                            return wcConnect(options);
                        }
                        throw new Error("Failed to connect");
                    },
                    // these get overridden in connect and autoConnect
                    disconnect: async ()=>{
                        reset();
                        await handleDisconnect();
                    },
                    getAccount: ()=>account,
                    getChain () {
                        if (!chain) {
                            return undefined;
                        }
                        chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChainIfExists"])(chain.id) || chain;
                        return chain;
                    },
                    getConfig: ()=>args[1],
                    id,
                    subscribe: emitter.subscribe,
                    switchChain: async (c)=>{
                        // TODO: this should actually throw an error if the chain switch fails
                        // but our useSwitchActiveWalletChain hook currently doesn't handle this
                        try {
                            await handleSwitchChain(c);
                            chain = c;
                        } catch (e) {
                            console.error("Error switching chain", e);
                        }
                    }
                };
                return wallet;
            }
    }
}
function walletConnect() {
    return createWallet("walletConnect");
} //# sourceMappingURL=create-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInstalledWalletProviders",
    ()=>getInstalledWalletProviders,
    "getInstalledWallets",
    ()=>getInstalledWallets,
    "injectedProvider",
    ()=>injectedProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$mipd$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/mipd/dist/esm/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/platform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$create$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/create-wallet.js [app-client] (ecmascript)");
;
;
;
;
// if we're in the browser -> create the store once immediately
const mipdStore = /* @__PURE__ */ (()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$platform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"])() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$mipd$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])() : undefined)();
function injectedProvider(walletId) {
    const injectedProviderDetail = getInstalledWalletProviders().find((p)=>p.info.rdns === walletId);
    return injectedProviderDetail?.provider;
}
function getInstalledWallets() {
    const providers = getInstalledWalletProviders();
    const walletIds = providers.map((provider)=>provider.info.rdns);
    return walletIds.map((w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$create$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWallet"])(w));
}
/**
 * Get Injected Provider Details for given wallet ID (rdns)
 * @internal
 */ function getMIPDStore() {
    if (!mipdStore) {
        return undefined;
    }
    return mipdStore;
}
function getInstalledWalletProviders() {
    const providers = getMIPDStore()?.getProviders() || [];
    for (const provider of providers){
        // Map io.metamask.mobile to io.metamask rdns to fix double entry issue in MetaMask mobile browser
        if (provider.info.rdns === "io.metamask.mobile") {
            provider.info.rdns = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METAMASK"];
            break;
        }
    }
    return providers;
} //# sourceMappingURL=mipdStore.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoConnectEip1193Wallet",
    ()=>autoConnectEip1193Wallet,
    "connectEip1193Wallet",
    ()=>connectEip1193Wallet,
    "getInjectedProvider",
    ()=>getInjectedProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Authorization.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/typedData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/promise/withTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$calls$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/get-calls-status.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$capabilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/get-capabilities.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$send$2d$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/send-calls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/chains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/normalizeChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$mipdStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-client] (ecmascript)");
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
function getInjectedProvider(walletId) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$mipdStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injectedProvider"])(walletId);
    if (!provider) {
        throw new Error(`No injected provider found for wallet: "${walletId}"`);
    }
    return provider;
}
async function connectEip1193Wallet({ id, provider, emitter, client, chain }) {
    let addresses;
    const retries = 3;
    let attempts = 0;
    // retry 3 times, some providers take a while to return accounts on connect
    while(!addresses?.[0] && attempts < retries){
        try {
            addresses = await provider.request({
                method: "eth_requestAccounts"
            });
        } catch (e) {
            console.error(e);
            if (extractErrorMessage(e)?.toLowerCase()?.includes("rejected")) {
                throw e;
            }
            await new Promise((resolve)=>setTimeout(resolve, 500));
        }
        attempts++;
    }
    const addr = addresses?.[0];
    if (!addr) {
        throw new Error("Failed to connect to wallet, no accounts available");
    }
    // use the first account
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(addr);
    // get the chainId the provider is on
    const chainId = await provider.request({
        method: "eth_chainId"
    }).then(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"]).catch((e)=>{
        throw new Error("Error reading chainId from provider", e);
    });
    let connectedChain = chain && chain.id === chainId ? chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId);
    try {
        // if we want a specific chainId and it is not the same as the provider chainId, trigger switchChain
        // we check for undefined chain ID since some chain-specific wallets like Abstract will not send a chain ID on connection
        if (chain && typeof chain.id !== "undefined" && chain.id !== chainId) {
            await switchChain(provider, chain);
            connectedChain = chain;
        }
    } catch  {
        console.warn(`Error switching to chain ${chain?.id} - defaulting to wallet chain (${chainId})`);
    }
    return onConnect({
        address,
        chain: connectedChain,
        client,
        emitter,
        id,
        provider
    });
}
async function autoConnectEip1193Wallet({ id, provider, emitter, client, chain }) {
    // connected accounts
    const addresses = await provider.request({
        method: "eth_accounts"
    });
    const addr = addresses[0];
    if (!addr) {
        throw new Error("Failed to connect to wallet, no accounts available");
    }
    // use the first account
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(addr);
    // get the chainId the provider is on
    const chainId = await provider.request({
        method: "eth_chainId"
    }).then(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"]);
    const connectedChain = chain && chain.id === chainId ? chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId);
    return onConnect({
        address,
        chain: connectedChain,
        client,
        emitter,
        id,
        provider
    });
}
function createAccount({ provider, address, client, id }) {
    const account = {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
        async sendTransaction (tx) {
            const gasFees = tx.gasPrice ? {
                gasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.gasPrice)
            } : {
                maxFeePerGas: tx.maxFeePerGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.maxFeePerGas) : undefined,
                maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.maxPriorityFeePerGas) : undefined
            };
            const params = [
                {
                    ...gasFees,
                    from: this.address,
                    gas: tx.gas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.gas) : undefined,
                    nonce: tx.nonce ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.nonce) : undefined,
                    to: tx.to ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(tx.to) : undefined,
                    data: tx.data,
                    value: tx.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.value) : undefined,
                    authorizationList: tx.authorizationList ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRpcList"](tx.authorizationList) : undefined,
                    accessList: tx.accessList,
                    ...tx.eip712
                }
            ];
            try {
                const transactionHash = await provider.request({
                    method: "eth_sendTransaction",
                    // @ts-expect-error - overriding types here
                    params
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                    chainId: tx.chainId,
                    client,
                    contractAddress: tx.to ?? undefined,
                    gasPrice: tx.gasPrice,
                    transactionHash,
                    walletAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
                    walletType: id
                });
                return {
                    transactionHash
                };
            } catch (error) {
                // Track insufficient funds errors
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInsufficientFundsError"])(error)) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackInsufficientFundsError"])({
                        chainId: tx.chainId,
                        client,
                        contractAddress: tx.to || undefined,
                        error,
                        transactionValue: tx.value,
                        walletAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address)
                    });
                }
                throw error;
            }
        },
        async signMessage ({ message }) {
            if (!account.address) {
                throw new Error("Provider not setup");
            }
            const messageToSign = (()=>{
                if (typeof message === "string") {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(message.raw);
                }
                return message.raw;
            })();
            return await provider.request({
                method: "personal_sign",
                params: [
                    messageToSign,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address)
                ]
            });
        },
        async signAuthorization (authorization) {
            const payload = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSignPayload"](authorization);
            let signature;
            try {
                signature = await provider.request({
                    method: "eth_sign",
                    params: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
                        payload
                    ]
                });
            } catch  {
                // fallback to secp256k1_sign, some providers don't support eth_sign
                signature = await provider.request({
                    // @ts-expect-error - overriding types here
                    method: "secp256k1_sign",
                    params: [
                        payload
                    ]
                });
            }
            if (!signature) {
                throw new Error("Failed to sign authorization");
            }
            const parsedSignature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromHex"](signature);
            return {
                ...authorization,
                ...parsedSignature
            };
        },
        async signTypedData (typedData) {
            if (!provider || !account.address) {
                throw new Error("Provider not setup");
            }
            const parsedTypedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTypedData"])(typedData);
            const { domain, message, primaryType } = parsedTypedData;
            const types = {
                EIP712Domain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypesForEIP712Domain"])({
                    domain
                }),
                ...parsedTypedData.types
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateTypedData"])({
                domain,
                message,
                primaryType,
                types
            });
            const stringifiedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeTypedData"])({
                domain: domain ?? {},
                message,
                primaryType,
                types
            });
            return await provider.request({
                method: "eth_signTypedData_v4",
                params: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
                    stringifiedData
                ]
            });
        },
        async watchAsset (asset) {
            const result = await provider.request({
                method: "wallet_watchAsset",
                params: asset
            }, {
                retryCount: 0
            });
            return result;
        },
        async sendCalls (options) {
            try {
                const { callParams, chain } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$send$2d$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toProviderCallParams"])(options, account);
                const callId = await provider.request({
                    method: "wallet_sendCalls",
                    params: callParams
                });
                if (callId && typeof callId === "object" && "id" in callId) {
                    return {
                        chain,
                        client,
                        id: callId.id
                    };
                }
                return {
                    chain,
                    client,
                    id: callId
                };
            } catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${id} errored calling wallet_sendCalls, with error: ${error instanceof Error ? error.message : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(error)}`);
                }
                throw error;
            }
        },
        async getCallsStatus (options) {
            try {
                const rawResponse = await provider.request({
                    method: "wallet_getCallsStatus",
                    params: [
                        options.id
                    ]
                });
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$calls$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGetCallsStatusResponse"])(rawResponse);
            } catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${id} does not support wallet_getCallsStatus, reach out to them directly to request EIP-5792 support.`);
                }
                throw error;
            }
        },
        async getCapabilities (options) {
            const chainIdFilter = options.chainId;
            try {
                const result = await provider.request({
                    method: "wallet_getCapabilities",
                    params: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
                        chainIdFilter ? [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(chainIdFilter)
                        ] : undefined
                    ]
                });
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$get$2d$capabilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGetCapabilitiesResult"])(result, chainIdFilter);
            } catch (error) {
                if (/unsupport|not support|not available/i.test(error.message)) {
                    return {
                        message: `${id} does not support wallet_getCapabilities, reach out to them directly to request EIP-5792 support.`
                    };
                }
                throw error;
            }
        }
    };
    return account;
}
/**
 * Call this method when the wallet provider is connected or auto connected
 * @internal
 */ async function onConnect({ provider, address, chain, emitter, client, id }) {
    const account = createAccount({
        address,
        client,
        id,
        provider
    });
    async function disconnect() {
        provider.removeListener("accountsChanged", onAccountsChanged);
        provider.removeListener("chainChanged", onChainChanged);
        provider.removeListener("disconnect", onDisconnect);
        // Experimental support for MetaMask disconnect
        // https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md
        try {
            // Adding timeout as not all wallets support this method and can hang
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$promise$2f$withTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTimeout"])(()=>provider.request({
                    method: "wallet_revokePermissions",
                    params: [
                        {
                            eth_accounts: {}
                        }
                    ]
                }), {
                timeout: 100
            });
        } catch  {}
    }
    async function onDisconnect() {
        disconnect();
        emitter.emit("disconnect", undefined);
    }
    function onAccountsChanged(accounts) {
        if (accounts[0]) {
            const newAccount = createAccount({
                address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(accounts[0]),
                client,
                id,
                provider
            });
            emitter.emit("accountChanged", newAccount);
            emitter.emit("accountsChanged", accounts);
        } else {
            onDisconnect();
        }
    }
    function onChainChanged(newChainId) {
        const newChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(newChainId));
        emitter.emit("chainChanged", newChain);
    }
    if (provider.on) {
        provider.on("accountsChanged", onAccountsChanged);
        provider.on("chainChanged", onChainChanged);
        provider.on("disconnect", onDisconnect);
    }
    return [
        account,
        chain,
        onDisconnect,
        (newChain)=>switchChain(provider, newChain)
    ];
}
/**
 * @internal
 */ async function switchChain(provider, chain) {
    const hexChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(chain.id);
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: hexChainId
                }
            ]
        });
    } catch  {
        // if chain does not exist, add the chain
        const apiChain = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain);
        await provider.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    blockExplorerUrls: apiChain.explorers?.map((x)=>x.url),
                    chainId: hexChainId,
                    chainName: apiChain.name,
                    nativeCurrency: apiChain.nativeCurrency,
                    rpcUrls: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValidPublicRPCUrl"])(apiChain)
                }
            ]
        });
    }
}
function extractErrorMessage(e) {
    if (e instanceof Error) {
        return e.message;
    }
    if (typeof e === "string") {
        return e;
    }
    if (typeof e === "object" && e !== null) {
        return JSON.stringify(e);
    }
    return String(e);
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/from-eip1193.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromProvider",
    ()=>fromProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/connect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js [app-client] (ecmascript)");
;
;
;
;
;
function fromProvider(options) {
    const id = options.walletId ?? "adapter";
    const emitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$emitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletEmitter"])();
    let account;
    let chain;
    let provider;
    const getProvider = async (params)=>{
        provider = typeof options.provider === "function" ? await options.provider(params) : options.provider;
        return provider;
    };
    const unsubscribeChain = emitter.subscribe("chainChanged", (newChain)=>{
        chain = newChain;
    });
    function reset() {
        account = undefined;
        chain = undefined;
    }
    let handleDisconnect = async ()=>{};
    const unsubscribeDisconnect = emitter.subscribe("disconnect", ()=>{
        reset();
        unsubscribeChain();
        unsubscribeDisconnect();
    });
    emitter.subscribe("accountChanged", (_account)=>{
        account = _account;
    });
    let handleSwitchChain = async (c)=>{
        await provider?.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](c.id)
                }
            ]
        });
    };
    return {
        autoConnect: async (connectOptions)=>{
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autoConnectEip1193Wallet"])({
                chain: connectOptions.chain,
                client: connectOptions.client,
                emitter,
                id,
                provider: await getProvider({
                    chainId: connectOptions.chain?.id
                })
            });
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            emitter.emit("onConnect", connectOptions);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                client: connectOptions.client,
                walletAddress: account.address,
                walletType: id
            });
            // return account
            return account;
        },
        connect: async (connectOptions)=>{
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectEip1193Wallet"])({
                chain: connectOptions.chain,
                client: connectOptions.client,
                emitter,
                id,
                provider: await getProvider({
                    chainId: connectOptions.chain?.id
                })
            });
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            emitter.emit("onConnect", connectOptions);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackConnect"])({
                client: connectOptions.client,
                walletAddress: account.address,
                walletType: id
            });
            // return account
            return account;
        },
        disconnect: async ()=>{
            reset();
            await handleDisconnect();
            emitter.emit("disconnect", undefined);
        },
        getAccount: ()=>account,
        getChain () {
            if (!chain) {
                return undefined;
            }
            chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChainIfExists"])(chain.id) || chain;
            return chain;
        },
        getConfig: ()=>undefined,
        id,
        subscribe: emitter.subscribe,
        switchChain: async (c)=>{
            await handleSwitchChain(c);
            emitter.emit("chainChanged", c);
        }
    };
} //# sourceMappingURL=from-eip1193.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/op-gas-fee-reducer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Via: https://twitter.com/0xjustadev/status/1758973668011434062
 *
 * Increases the gas fee value to the nearest power of 2.
 * If the value is already a power of 2 or 0, it returns the value as is.
 * Otherwise, it finds the highest power of 2 that is bigger than the given value.
 * @param value - The gas fee value to be "rounded up".
 * @returns The *increased* gas value which will result in a lower L1 gas fee, overall reducing the gas fee.
 * @internal
 */ __turbopack_context__.s([
    "roundUpGas",
    ()=>roundUpGas
]);
function roundUpGas(value) {
    if (value === 0n || (value & value - 1n) === 0n) {
        return value;
    }
    // Find the highest set bit by shifting until the value is 0.
    let highestBit = 1n;
    while(value > 0n){
        value >>= 1n;
        highestBit <<= 1n;
    }
    return highestBit;
} //# sourceMappingURL=op-gas-fee-reducer.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ipfs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findIPFSCidFromUri",
    ()=>findIPFSCidFromUri,
    "getBaseUriFromBatch",
    ()=>getBaseUriFromBatch,
    "resolveScheme",
    ()=>resolveScheme,
    "uploadOrExtractURIs",
    ()=>uploadOrExtractURIs
]);
const DEFAULT_GATEWAY = "https://{clientId}.ipfscdn.io/ipfs/{cid}";
function resolveScheme(options) {
    if (options.uri.startsWith("ipfs://")) {
        const gateway = options.client.config?.storage?.gatewayUrl ?? DEFAULT_GATEWAY;
        const clientId = options.client.clientId;
        const cid = findIPFSCidFromUri(options.uri);
        let bundleId;
        if (typeof globalThis !== "undefined" && "Application" in globalThis) {
            // shims use wallet connect RN module which injects Application info in globalThis
            // biome-ignore lint/suspicious/noExplicitAny: get around globalThis typing
            bundleId = globalThis.Application.applicationId;
        }
        // purposefully using SPLIT here and not replace for CID to avoid cases where users don't know the schema
        // also only splitting on `/ipfs` to avoid cases where people pass non `/` terminated gateway urls
        return `${gateway.replace("{clientId}", clientId).split("/ipfs")[0]}/ipfs/${cid}${bundleId ? `?bundleId=${bundleId}` : ""}`;
    }
    if (options.uri.startsWith("http")) {
        return options.uri;
    }
    throw new Error(`Invalid URI scheme, expected "ipfs://" or "http(s)://"`);
}
function findIPFSCidFromUri(uri) {
    if (!uri.startsWith("ipfs://")) {
        // do not touch URIs that are not ipfs URIs
        return uri;
    }
    // first index of `/Qm` or `/bafy` in the uri (case insensitive)
    const firstIndex = uri.search(/\/(Qm|baf)/i);
    // we start one character after the first `/` to avoid including it in the CID
    return uri.slice(firstIndex + 1);
}
async function uploadOrExtractURIs(files, client, startNumber) {
    if (isUriList(files)) {
        return files;
    }
    if (isMetadataList(files)) {
        const { upload } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/upload.js [app-client] (ecmascript, async loader)");
        const uris = await upload({
            client,
            files,
            rewriteFileNames: {
                fileStartNumber: startNumber || 0
            }
        });
        return Array.isArray(uris) ? uris : [
            uris
        ];
    }
    throw new Error("Files must all be of the same type (all URI or all FileOrBufferOrString)");
}
function getBaseUriFromBatch(uris) {
    uris = Array.isArray(uris) ? uris : [
        uris
    ];
    const [base, ...rest] = uris.map((uri)=>{
        // remove query parameters
        [uri] = uri.split("?");
        // remove fragments
        [uri] = uri.split("#");
        // if the URI ends with a `/`, remove it
        if (uri.endsWith("/")) {
            uri = uri.slice(0, -1);
        }
        // remove the last part of the URI & add the trailing `/`
        return `${uri.split("/").slice(0, -1).join("/")}/`;
    });
    if (!base) {
        throw new Error("Batch of URIs is empty");
    }
    if (rest.some((uri)=>uri !== base)) {
        throw new Error("All URIs in the batch must have the same base URI");
    }
    return base;
}
function isUriList(metadatas) {
    return metadatas.every((m)=>typeof m === "string");
}
function isMetadataList(metadatas) {
    return metadatas.every((m)=>typeof m !== "string");
} //# sourceMappingURL=ipfs.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "randomBytesBuffer",
    ()=>randomBytesBuffer,
    "randomBytesHex",
    ()=>randomBytesHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
function randomBytesHex(length = 32) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(randomBytesBuffer(length));
}
function randomBytesBuffer(length = 32) {
    return globalThis.crypto.getRandomValues(new Uint8Array(length));
} //# sourceMappingURL=random.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/mock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToMockStorage",
    ()=>addToMockStorage,
    "getFromMockStorage",
    ()=>getFromMockStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-client] (ecmascript)");
;
const mockStorage = new Map();
async function addToMockStorage(value) {
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytesHex"])();
    // Get the first file from FormData
    const files = value.getAll("file");
    if (!files) {
        throw new Error("No file found in FormData");
    }
    // Read file contents
    return Promise.all(files.map(async (file)=>{
        const text = await file.text();
        let data;
        try {
            // Parse the contents as JSON
            data = JSON.parse(text);
        } catch  {
            throw new Error("File contents must be valid JSON");
        }
        // If file has a name, return key/filename format
        const filename = "name" in file && file.name ? file.name.replace("files/", "") : "";
        //   console.log("mockStorage upload", key, data, filename);
        const hash = `${key}${filename ? `/${filename}` : ""}`;
        mockStorage.set(hash, data);
        return `ipfs://${hash}`;
    }));
}
function getFromMockStorage(key) {
    const data = mockStorage.get(key);
    //   console.log("mockStorage get", key, data);
    return data;
} //# sourceMappingURL=mock.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/download.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "download",
    ()=>download
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ipfs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$mock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/mock.js [app-client] (ecmascript)");
;
;
;
;
async function download(options) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_TEST"]) {
        const hash = options.uri.split("://")[1];
        if (!hash) {
            throw new Error("Invalid hash");
        }
        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$mock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFromMockStorage"])(hash);
        if (data) {
            return {
                json: ()=>Promise.resolve(data),
                ok: true,
                status: 200
            };
        }
    }
    let url;
    if (options.uri.startsWith("ar://")) {
        const { resolveArweaveScheme } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/arweave.js [app-client] (ecmascript, async loader)");
        url = resolveArweaveScheme(options);
    } else {
        url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveScheme"])(options);
    }
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(options.client)(url, {
        headers: options.client.config?.storage?.fetch?.headers,
        keepalive: options.client.config?.storage?.fetch?.keepalive,
        requestTimeoutMs: options.requestTimeoutMs ?? options.client.config?.storage?.fetch?.requestTimeoutMs ?? 60000
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to download file: ${res.status} ${res.statusText} ${error || ""}`);
    }
    return res;
} //# sourceMappingURL=download.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/resolve-abi.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveAbiFromBytecode",
    ()=>resolveAbiFromBytecode,
    "resolveAbiFromContractApi",
    ()=>resolveAbiFromContractApi,
    "resolveCompositeAbi",
    ()=>resolveCompositeAbi,
    "resolveContractAbi",
    ()=>resolveContractAbi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/formatAbi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/chains/definitions/sepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/download.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
;
;
;
;
;
;
function resolveContractAbi(contract, contractApiBaseUrl = "https://contract.thirdweb.com/abi") {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        // if the contract already HAS a user defined we always use that!
        if (contract.abi) {
            return contract.abi;
        }
        // for local chains, we need to resolve the composite abi from bytecode
        if (contract.chain.id === 31337 || contract.chain.id === 1337 || contract.chain.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sepolia"].id // FIXME remove this once contract API handles 7702 delegation
        ) {
            return await resolveCompositeAbi(contract);
        }
        // try to get it from the api
        try {
            return await resolveAbiFromContractApi(contract, contractApiBaseUrl);
        } catch  {
            // if that fails, try to resolve it from the bytecode
            return await resolveCompositeAbi(contract);
        }
    }, {
        cacheKey: `${contract.chain.id}-${contract.address}`,
        cacheTime: 1000 * 60 * 60 * 1
    });
}
async function resolveAbiFromContractApi(// biome-ignore lint/suspicious/noExplicitAny: library function that accepts any contract type
contract, contractApiBaseUrl = "https://contract.thirdweb.com/abi") {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(contract.client)(`${contractApiBaseUrl}/${contract.chain.id}/${contract.address}`);
    const json = await response.json();
    if (!json || json.error) {
        throw new Error(`Failed to resolve ABI from contract API. ${json.error || ""}`);
    }
    return json;
}
async function resolveAbiFromBytecode(// biome-ignore lint/suspicious/noExplicitAny: library function that accepts any contract type
contract) {
    const [{ resolveImplementation }, { extractIPFSUri }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/resolveImplementation.js [app-client] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/extractIPFS.js [app-client] (ecmascript, async loader)")
    ]);
    const { bytecode } = await resolveImplementation(contract);
    if (bytecode === "0x") {
        const { id, name } = contract.chain;
        throw new Error(`Failed to load contract bytecode. Make sure the contract [${contract.address}] exists on the chain [${name || "Unknown Chain"} (chain id: ${id})]`);
    }
    const ipfsUri = extractIPFSUri(bytecode);
    if (!ipfsUri) {
        // just early exit if we can't find an IPFS URI
        return [];
    }
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["download"])({
            client: contract.client,
            uri: ipfsUri
        });
        const json = await res.json();
        // ABI is at `json.output.abi`
        return json.output.abi;
    } catch  {
        // if we can't resolve the ABI from the IPFS URI, return an empty array
        return [];
    }
}
const PLUGINS_ABI = {
    inputs: [],
    name: "getAllPlugins",
    outputs: [
        {
            components: [
                {
                    internalType: "bytes4",
                    name: "functionSelector",
                    type: "bytes4"
                },
                {
                    internalType: "string",
                    name: "functionSignature",
                    type: "string"
                },
                {
                    internalType: "address",
                    name: "pluginAddress",
                    type: "address"
                }
            ],
            internalType: "struct IPluginMap.Plugin[]",
            name: "registered",
            type: "tuple[]"
        }
    ],
    stateMutability: "view",
    type: "function"
};
const BASE_ROUTER_ABI = {
    inputs: [],
    name: "getAllExtensions",
    outputs: [
        {
            components: [
                {
                    components: [
                        {
                            internalType: "string",
                            name: "name",
                            type: "string"
                        },
                        {
                            internalType: "string",
                            name: "metadataURI",
                            type: "string"
                        },
                        {
                            internalType: "address",
                            name: "implementation",
                            type: "address"
                        }
                    ],
                    internalType: "struct IExtension.ExtensionMetadata",
                    name: "metadata",
                    type: "tuple"
                },
                {
                    components: [
                        {
                            internalType: "bytes4",
                            name: "functionSelector",
                            type: "bytes4"
                        },
                        {
                            internalType: "string",
                            name: "functionSignature",
                            type: "string"
                        }
                    ],
                    internalType: "struct IExtension.ExtensionFunction[]",
                    name: "functions",
                    type: "tuple[]"
                }
            ],
            internalType: "struct IExtension.Extension[]",
            name: "allExtensions",
            type: "tuple[]"
        }
    ],
    stateMutability: "view",
    type: "function"
};
const DIAMOND_ABI = {
    inputs: [],
    name: "facets",
    outputs: [
        {
            components: [
                {
                    internalType: "address",
                    name: "facetAddress",
                    type: "address"
                },
                {
                    internalType: "bytes4[]",
                    name: "functionSelectors",
                    type: "bytes4[]"
                }
            ],
            type: "tuple[]"
        }
    ],
    stateMutability: "view",
    type: "function"
};
async function resolveCompositeAbi(contract, rootAbi, resolveSubAbi) {
    const [rootAbi_, pluginPatternAddresses, baseRouterAddresses, modularExtensionAddresses, diamondFacetAddresses] = await Promise.all([
        rootAbi ? rootAbi : resolveAbiFromBytecode(contract),
        // check these all at the same time
        resolvePluginPatternAddresses(contract),
        resolveBaseRouterAddresses(contract),
        resolveModularModuleAddresses(contract),
        resolveDiamondFacetAddresses(contract)
    ]);
    const mergedPlugins = [
        ...new Set([
            ...pluginPatternAddresses,
            ...baseRouterAddresses,
            ...modularExtensionAddresses,
            ...diamondFacetAddresses
        ])
    ];
    // no plugins
    if (!mergedPlugins.length) {
        return rootAbi_;
    }
    // get all the abis for the plugins
    const pluginAbis = await getAbisForPlugins({
        contract,
        plugins: mergedPlugins,
        resolveSubAbi
    });
    // join them together
    return joinAbis({
        pluginAbis,
        rootAbi: rootAbi_
    });
}
async function resolvePluginPatternAddresses(contract) {
    try {
        const { readContract } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript, async loader)");
        const pluginMap = await readContract({
            contract,
            method: PLUGINS_ABI
        });
        // if there are no plugins, return the root ABI
        if (!pluginMap.length) {
            return [];
        }
        // get all the plugin addresses
        return [
            ...new Set(pluginMap.map((item)=>item.pluginAddress))
        ];
    } catch  {
    // no-op, expected because not everything supports this
    }
    return [];
}
async function resolveBaseRouterAddresses(contract) {
    try {
        const { readContract } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript, async loader)");
        const pluginMap = await readContract({
            contract,
            method: BASE_ROUTER_ABI
        });
        // if there are no plugins, return the root ABI
        if (!pluginMap.length) {
            return [];
        }
        // get all the plugin addresses
        return [
            ...new Set(pluginMap.map((item)=>item.metadata.implementation))
        ];
    } catch  {
    // no-op, expected because not everything supports this
    }
    return [];
}
async function resolveModularModuleAddresses(contract) {
    try {
        const { getInstalledModules } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/modules/__generated__/IModularCore/read/getInstalledModules.js [app-client] (ecmascript, async loader)");
        const modules = await getInstalledModules({
            contract
        });
        // if there are no plugins, return the root ABI
        if (!modules.length) {
            return [];
        }
        // get all the plugin addresses
        return [
            ...new Set(modules.map((item)=>item.implementation))
        ];
    } catch  {
    // no-op, expected because not everything supports this
    }
    return [];
}
async function resolveDiamondFacetAddresses(contract) {
    try {
        const { readContract } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript, async loader)");
        const facets = await readContract({
            contract,
            method: DIAMOND_ABI
        });
        // if there are no facets, return the root ABI
        if (!facets.length) {
            return [];
        }
        // get all the plugin addresses
        return facets.map((item)=>item.facetAddress);
    } catch  {
    // no-op, expected because not everything supports this
    }
    return [];
}
async function getAbisForPlugins(options) {
    return Promise.all(options.plugins.map((pluginAddress)=>{
        const newContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
            ...options.contract,
            address: pluginAddress
        });
        // if we have a method passed in that tells us how to resove the sub-api, use that
        if (options.resolveSubAbi) {
            return options.resolveSubAbi(newContract);
        }
        // otherwise default logic
        return resolveAbiFromBytecode(newContract);
    }));
}
function joinAbis(options) {
    let mergedPlugins = options.pluginAbis.flat().filter((item)=>item.type !== "constructor");
    if (options.rootAbi) {
        mergedPlugins = [
            ...options.rootAbi,
            ...mergedPlugins
        ].filter((item)=>item.type !== "fallback" && item.type !== "receive").filter(Boolean);
    }
    // unique by formatting every abi and then throwing them in a set
    // TODO: this may not be super efficient...
    const humanReadableAbi = [
        ...new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAbi"])(mergedPlugins))
    ];
    // finally parse it back out
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbi"])(humanReadableAbi);
} //# sourceMappingURL=resolve-abi.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/extract-error.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractError",
    ()=>extractError,
    "extractErrorResult",
    ()=>extractErrorResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeErrorResult.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$resolve$2d$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/resolve-abi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/process.js [app-client] (ecmascript)");
;
;
;
;
;
;
async function extractError(args) {
    const { error, contract, fromAddress } = args;
    // Track insufficient funds errors during transaction preparation
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInsufficientFundsError"])(error) && contract) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackInsufficientFundsError"])({
            chainId: contract.chain?.id,
            client: contract.client,
            contractAddress: contract.address,
            error,
            walletAddress: fromAddress
        });
    }
    const result = await extractErrorResult({
        contract,
        error
    });
    if (result) {
        return new TransactionError(result, contract);
    }
    return error;
}
async function extractErrorResult(args) {
    const { error, contract } = args;
    if (typeof error === "object") {
        // try to parse RPC error
        const errorObj = error;
        if (errorObj.data) {
            if (errorObj.data !== "0x" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(errorObj.data)) {
                let abi = contract?.abi;
                if (contract && !abi) {
                    abi = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$resolve$2d$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveContractAbi"])(contract).catch(()=>undefined);
                }
                const parsedError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeErrorResult"])({
                    abi,
                    data: errorObj.data
                });
                return `${parsedError.errorName}${parsedError.args ? ` - ${parsedError.args}` : ""}`;
            }
        }
    }
    return `Execution Reverted: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(error)}`;
}
class TransactionError extends Error {
    constructor(reason, contract){
        let message = reason;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_DEV"] && contract) {
            // show more infor in dev
            message = [
                reason,
                "",
                `contract: ${contract.address}`,
                `chainId: ${contract.chain?.id}`
            ].join("\n");
        }
        super(message);
        Object.defineProperty(this, "contractAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chainId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = "TransactionError";
        this.contractAddress = contract?.address;
        this.chainId = contract?.chain?.id;
        this.message = message;
    }
} //# sourceMappingURL=extract-error.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "estimateGas",
    ()=>estimateGas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$formatters$2f$transactionRequest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/formatters/transactionRequest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/op-gas-fee-reducer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$extract$2d$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/extract-error.js [app-client] (ecmascript)");
;
;
;
;
;
;
const cache = new WeakMap();
async function estimateGas(options) {
    // from is:
    // 1. the user specified from address
    // 2. the passed in account address
    // 3. the passed in wallet's account address
    const fromAddress = typeof options.from === "string" ? options.from ?? undefined : options.from?.address ?? options.account?.address;
    const txWithFrom = {
        ...options.transaction,
        from: fromAddress
    };
    if (cache.has(txWithFrom)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return cache.get(txWithFrom);
    }
    const { account } = options;
    const promise = (async ()=>{
        const predefinedGas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.gas);
        // if we have a predefined gas value in the TX -> always use that
        if (predefinedGas !== undefined) {
            return predefinedGas;
        }
        // if the wallet itself overrides the estimateGas function, use that
        if (account?.estimateGas) {
            try {
                let gas = await account.estimateGas(options.transaction);
                if (options.transaction.chain.experimental?.increaseZeroByteCount) {
                    gas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundUpGas"])(gas);
                }
                return gas;
            } catch (error) {
                throw await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$extract$2d$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractError"])({
                    contract: options.transaction.__contract,
                    error,
                    fromAddress
                });
            }
        }
        // load up encode function if we need it
        const { encode } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-client] (ecmascript, async loader)");
        const [encodedData, toAddress, value, authorizationList] = await Promise.all([
            encode(options.transaction),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.to),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.value),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.authorizationList)
        ]);
        // load up the rpc client and the estimateGas function if we need it
        const [{ getRpcClient }, { eth_estimateGas }] = await Promise.all([
            __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript, async loader)"),
            __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_estimateGas.js [app-client] (ecmascript, async loader)")
        ]);
        const rpcRequest = getRpcClient(options.transaction);
        try {
            const formattedTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$formatters$2f$transactionRequest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTransactionRequest"])({
                authorizationList: authorizationList?.map((auth)=>({
                        ...auth,
                        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(auth.address),
                        nonce: Number(auth.nonce),
                        r: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](auth.r),
                        s: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](auth.s)
                    })),
                data: encodedData,
                from: fromAddress ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(fromAddress) : undefined,
                to: toAddress ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(toAddress) : undefined,
                value
            });
            let gas = await eth_estimateGas(rpcRequest, formattedTx);
            if (options.transaction.chain.experimental?.increaseZeroByteCount) {
                gas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundUpGas"])(gas);
            }
            return gas;
        } catch (error) {
            throw await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$extract$2d$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractError"])({
                contract: options.transaction.__contract,
                error,
                fromAddress
            });
        }
    })();
    cache.set(txWithFrom, promise);
    return promise;
} //# sourceMappingURL=estimate-gas.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearTransactionDecorator",
    ()=>clearTransactionDecorator,
    "getTransactionDecorator",
    ()=>getTransactionDecorator,
    "setTransactionDecorator",
    ()=>setTransactionDecorator
]);
let transactionDecorator = null;
function setTransactionDecorator(decoratorFunction) {
    transactionDecorator = decoratorFunction;
}
function clearTransactionDecorator() {
    transactionDecorator = null;
}
function getTransactionDecorator() {
    return transactionDecorator;
} //# sourceMappingURL=config.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/get-transactions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get transactions for a wallet
 * @example
 * ```ts
 * import { Insight } from "thirdweb";
 *
 * const transactions = await Insight.getTransactions({
 *   client,
 *   walletAddress: "0x1234567890123456789012345678901234567890",
 *   chains: [sepolia],
 * });
 * ```
 * @insight
 */ __turbopack_context__.s([
    "getTransactions",
    ()=>getTransactions
]);
async function getTransactions(args) {
    const [{ getV1WalletsByWalletAddressTransactions }, { getThirdwebDomains }, { getClientFetch }, { assertInsightEnabled }, { stringify }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@thirdweb-dev/insight/dist/esm/exports/thirdweb.js [app-client] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/common.js [app-client] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript, async loader)")
    ]);
    await assertInsightEnabled(args.chains);
    const threeMonthsAgoInSeconds = Math.floor((Date.now() - 3 * 30 * 24 * 60 * 60 * 1000) / 1000);
    const { client, walletAddress, chains, queryOptions } = args;
    const defaultQueryOptions = {
        chain: chains.map((chain)=>chain.id),
        filter_block_timestamp_gte: threeMonthsAgoInSeconds,
        limit: 100
    };
    const result = await getV1WalletsByWalletAddressTransactions({
        baseUrl: `https://${getThirdwebDomains().insight}`,
        fetch: getClientFetch(client),
        path: {
            wallet_address: walletAddress
        },
        query: {
            ...defaultQueryOptions,
            ...queryOptions
        }
    });
    if (result.error) {
        throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify(result.error) : "Unknown error"}`);
    }
    return result.data.data || [];
} //# sourceMappingURL=get-transactions.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/transaction-store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTransactionToStore",
    ()=>addTransactionToStore,
    "getPastTransactions",
    ()=>getPastTransactions,
    "getTransactionStore",
    ()=>getTransactionStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$insight$2f$get$2d$transactions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/get-transactions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/reactive/store.js [app-client] (ecmascript)");
;
;
const transactionsByAddress = new Map();
function getTransactionStore(address) {
    const existingStore = transactionsByAddress.get(address);
    if (existingStore) {
        return existingStore;
    }
    const newStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$reactive$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])([]);
    transactionsByAddress.set(address, newStore);
    return newStore;
}
function addTransactionToStore(options) {
    const { address, transactionHash, chainId } = options;
    const tranasctionStore = getTransactionStore(address);
    tranasctionStore.setValue([
        ...tranasctionStore.getValue(),
        {
            chainId,
            transactionHash
        }
    ]);
    transactionsByAddress.set(address, tranasctionStore);
}
async function getPastTransactions(options) {
    const { walletAddress, chain, client } = options;
    const oneMonthsAgoInSeconds = Math.floor((Date.now() - 1 * 30 * 24 * 60 * 60 * 1000) / 1000);
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$insight$2f$get$2d$transactions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTransactions"])({
        chains: [
            chain
        ],
        client,
        queryOptions: {
            filter_block_timestamp_gte: oneMonthsAgoInSeconds,
            limit: 20,
            decode: true
        },
        walletAddress
    });
    return result.map((tx)=>({
            chainId: typeof tx.chain_id === "string" ? Number(tx.chain_id) : tx.chain_id,
            receipt: {
                status: tx.status === 0 ? "failed" : "success",
                to: tx.to_address
            },
            transactionHash: tx.hash,
            decoded: tx.decoded
        }));
} //# sourceMappingURL=transaction-store.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getBlockByNumber.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_getBlockByNumber",
    ()=>eth_getBlockByNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$formatters$2f$block$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/formatters/block.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
;
async function eth_getBlockByNumber(request, params) {
    const blockTag = params.blockTag ?? "latest";
    const includeTransactions = params.includeTransactions ?? false;
    const blockNumberHex = params.blockNumber !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(params.blockNumber) : undefined;
    const block = await request({
        method: "eth_getBlockByNumber",
        params: [
            blockNumberHex || blockTag,
            includeTransactions
        ]
    });
    if (!block) {
        throw new Error("Block not found");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$formatters$2f$block$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBlock"])(block);
} //# sourceMappingURL=eth_getBlockByNumber.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_maxPriorityFeePerGas.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_maxPriorityFeePerGas",
    ()=>eth_maxPriorityFeePerGas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
async function eth_maxPriorityFeePerGas(request) {
    const result = await request({
        method: "eth_maxPriorityFeePerGas"
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(result);
} //# sourceMappingURL=eth_maxPriorityFeePerGas.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Converts a given number of units to a string representation with a specified number of decimal places.
 * @param units - The number of units to convert.
 * @param decimals - The number of decimal places to include in the string representation.
 * @returns The string representation of the converted units.
 * @example
 * ```ts
 * import { toTokens } from "thirdweb/utils";
 * toTokens(1000000000000000000n, 18)
 * // '1'
 * ```
 * @utils
 */ __turbopack_context__.s([
    "fromGwei",
    ()=>fromGwei,
    "toEther",
    ()=>toEther,
    "toTokens",
    ()=>toTokens,
    "toUnits",
    ()=>toUnits,
    "toWei",
    ()=>toWei
]);
function toTokens(units, decimals) {
    // Convert to string once and handle negativity.
    const stringValue = units.toString();
    const prefix = stringValue[0] === "-" ? "-" : "";
    // Abusing that string "-" is truthy
    const absStringValue = prefix ? stringValue.slice(1) : stringValue;
    // Ensure we have enough digits for the fractional part.
    const paddedValue = absStringValue.padStart(decimals + 1, "0");
    const splitIndex = paddedValue.length - decimals;
    // Extract integer and fraction parts directly.
    const integerPart = paddedValue.slice(0, splitIndex) || "0";
    let fractionPart = paddedValue.slice(splitIndex);
    // Manually trim trailing zeros from the fraction part.
    for(let i = fractionPart.length - 1; i >= 0; i--){
        if (fractionPart[i] !== "0") {
            fractionPart = fractionPart.slice(0, i + 1);
            break;
        }
        // check if the next digit is a zero also
        // If all zeros, make fraction part empty
        if (i === 0) {
            fractionPart = "";
        }
    }
    // Construct and return the formatted string.
    return `${prefix}${integerPart}${fractionPart ? `.${fractionPart}` : ""}`;
}
function toEther(wei) {
    return toTokens(wei, 18);
}
function toUnits(tokens, decimals) {
    if (tokens.includes("e")) {
        tokens = Number(tokens).toFixed(decimals);
    }
    let [integerPart, fractionPart = ""] = tokens.split(".");
    const prefix = integerPart.startsWith("-") ? "-" : "";
    if (prefix) {
        integerPart = integerPart.slice(1);
    }
    fractionPart = fractionPart.padEnd(decimals, "0"); // Ensure fraction part is at least 'decimals' long.
    if (decimals === 0) {
        // Check if there's any fraction part that would necessitate rounding up the integer part.
        if (fractionPart[0] && Number.parseInt(fractionPart[0]) >= 5) {
            integerPart = (BigInt(integerPart) + 1n).toString();
        }
        fractionPart = ""; // No fraction part is needed when decimals === 0.
    } else {
        // When decimals > 0, handle potential rounding based on the digit right after the specified decimal places.
        if (fractionPart.length > decimals) {
            const roundingDigit = fractionPart[decimals];
            if (roundingDigit && Number.parseInt(roundingDigit, 10) >= 5) {
                // If rounding is needed, add 1 to the last included digit of the fraction part.
                const roundedFraction = BigInt(fractionPart.substring(0, decimals)) + 1n;
                fractionPart = roundedFraction.toString().padStart(decimals, "0");
                if (fractionPart.length > decimals) {
                    // If rounding the fraction results in a length increase (e.g., .999 -> 1.000), increment the integer part.
                    integerPart = (BigInt(integerPart) + 1n).toString();
                    // Adjust the fraction part if it's longer than the specified decimals due to rounding up.
                    fractionPart = fractionPart.substring(fractionPart.length - decimals);
                }
            } else {
                // If no rounding is necessary, just truncate the fraction part to the specified number of decimals.
                fractionPart = fractionPart.substring(0, decimals);
            }
        }
    // If the fraction part is shorter than the specified decimals, it's already handled by padEnd() above.
    }
    // Combine the integer and fraction parts into the final BigInt representation.
    return BigInt(`${prefix}${integerPart}${fractionPart}`);
}
function toWei(tokens) {
    return toUnits(tokens, 18);
}
function fromGwei(gwei) {
    return toUnits(gwei, 9);
} //# sourceMappingURL=units.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_gasPrice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_gasPrice",
    ()=>eth_gasPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
async function eth_gasPrice(request) {
    const result = await request({
        method: "eth_gasPrice"
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(result);
} //# sourceMappingURL=eth_gasPrice.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/get-gas-price.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGasPrice",
    ()=>getGasPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_gasPrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_gasPrice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
;
;
async function getGasPrice(options) {
    const { client, chain, percentMultiplier } = options;
    const rpcClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    const gasPrice_ = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_gasPrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_gasPrice"])(rpcClient);
    const extraTip = percentMultiplier ? gasPrice_ / BigInt(100) * BigInt(percentMultiplier) : 0n;
    const txGasPrice = gasPrice_ + extraTip;
    return txGasPrice;
} //# sourceMappingURL=get-gas-price.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/fee-data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultGasOverrides",
    ()=>getDefaultGasOverrides,
    "getGasOverridesForTransaction",
    ()=>getGasOverridesForTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getBlockByNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getBlockByNumber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_maxPriorityFeePerGas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_maxPriorityFeePerGas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/get-gas-price.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/op-gas-fee-reducer.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
// for these chains - always force pre eip1559 transactions
const FORCE_GAS_PRICE_CHAIN_IDS = [
    78600,
    2040,
    248,
    9372,
    841,
    842,
    2016,
    9768,
    2442,
    1942999413,
    1952959480,
    994873017,
    19011,
    40875,
    1511670449,
    5464,
    2020,
    2021,
    98866,
    1417429182
];
async function getGasOverridesForTransaction(transaction) {
    // first check for explicit values
    const [maxFeePerGas, maxPriorityFeePerGas, gasPrice, type] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.maxFeePerGas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.maxPriorityFeePerGas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.gasPrice),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.type)
    ]);
    // Exit early if the user explicitly provided enough options
    if (maxFeePerGas !== undefined && maxPriorityFeePerGas !== undefined) {
        return {
            maxFeePerGas,
            maxPriorityFeePerGas
        };
    }
    if (typeof gasPrice === "bigint") {
        return {
            gasPrice
        };
    }
    // If we don't have enough explicit values, get defaults
    const defaultGasOverrides = await getDefaultGasOverrides(transaction.client, transaction.chain, type === "legacy" ? "legacy" : "eip1559");
    if (transaction.chain.experimental?.increaseZeroByteCount) {
        // otherwise adjust each value
        if (defaultGasOverrides.gasPrice) {
            return {
                gasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundUpGas"])(defaultGasOverrides.gasPrice)
            };
        }
        return {
            maxFeePerGas: maxFeePerGas ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundUpGas"])(defaultGasOverrides.maxFeePerGas ?? 0n),
            maxPriorityFeePerGas: maxPriorityFeePerGas ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$op$2d$gas$2d$fee$2d$reducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundUpGas"])(defaultGasOverrides.maxPriorityFeePerGas ?? 0n)
        };
    }
    // return as is
    if (defaultGasOverrides.gasPrice !== undefined) {
        return defaultGasOverrides;
    }
    // Still check for explicit values in case one is provided and not the other
    return {
        maxFeePerGas: maxFeePerGas ?? defaultGasOverrides.maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas ?? defaultGasOverrides.maxPriorityFeePerGas
    };
}
async function getDefaultGasOverrides(client, chain, feeType) {
    // give priority to the transaction fee type over the chain fee type
    const resolvedFeeType = feeType ?? chain.feeType;
    // if chain is configured to force legacy transactions or is in the legacy chain list
    if (resolvedFeeType === "legacy" || FORCE_GAS_PRICE_CHAIN_IDS.includes(chain.id)) {
        return {
            gasPrice: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGasPrice"])({
                chain,
                client,
                percentMultiplier: 10
            })
        };
    }
    const feeData = await getDynamicFeeData(client, chain);
    if (feeData.maxFeePerGas !== null && feeData.maxPriorityFeePerGas !== null) {
        return {
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
        };
    }
    // TODO: resolvedFeeType here could be "EIP1559", but we could not get EIP1559 fee data. should we throw?
    return {
        gasPrice: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGasPrice"])({
            chain,
            client,
            percentMultiplier: 10
        })
    };
}
/**
 * Retrieves dynamic fee data for a given chain.
 * @param client - The Thirdweb client.
 * @param chain - The chain ID.
 * @returns A promise that resolves to the fee data.
 * @internal
 */ async function getDynamicFeeData(client, chain, percentMultiplier = 10) {
    let maxFeePerGas = null;
    let maxPriorityFeePerGas_ = null;
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    const [block, maxPriorityFeePerGas] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getBlockByNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_getBlockByNumber"])(rpcRequest, {
            blockTag: "latest"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_maxPriorityFeePerGas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_maxPriorityFeePerGas"])(rpcRequest).catch(()=>null)
    ]);
    const baseBlockFee = block?.baseFeePerGas;
    const chainId = chain.id;
    // flag chain testnet & flag chain
    if (chainId === 220 || chainId === 1220) {
        // these does not support eip-1559, for some reason even though `eth_maxPriorityFeePerGas` is available?!?
        // return null because otherwise TX break
        return {
            maxFeePerGas: null,
            maxPriorityFeePerGas: null
        };
    // mumbai & polygon
    }
    if (chainId === 80002 || chainId === 137) {
        // for polygon, get fee data from gas station
        maxPriorityFeePerGas_ = await getPolygonGasPriorityFee(chainId);
    } else if (maxPriorityFeePerGas !== null) {
        // prioritize fee from eth_maxPriorityFeePerGas
        maxPriorityFeePerGas_ = maxPriorityFeePerGas;
    }
    if (maxPriorityFeePerGas_ == null || baseBlockFee == null) {
        // chain does not support eip-1559, return null for both
        return {
            maxFeePerGas: null,
            maxPriorityFeePerGas: null
        };
    }
    // add 10% tip to maxPriorityFeePerGas for faster processing
    maxPriorityFeePerGas_ = getPreferredPriorityFee(maxPriorityFeePerGas_, percentMultiplier);
    // eip-1559 formula, doubling the base fee ensures that the tx can be included in the next 6 blocks no matter how busy the network is
    // good article on the subject: https://www.blocknative.com/blog/eip-1559-fees
    maxFeePerGas = baseBlockFee * 2n + maxPriorityFeePerGas_;
    // special cased for Celo gas fees
    if (chainId === 42220 || chainId === 44787 || chainId === 62320) {
        maxPriorityFeePerGas_ = maxFeePerGas;
    }
    return {
        maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas_
    };
}
/**
 * Calculates the preferred priority fee based on the default priority fee per gas and a percent multiplier.
 * @param defaultPriorityFeePerGas - The default priority fee per gas.
 * @param percentMultiplier - The percent multiplier to calculate the extra tip. Default is 10.
 * @returns The total priority fee including the extra tip.
 * @internal
 */ function getPreferredPriorityFee(defaultPriorityFeePerGas, percentMultiplier = 10) {
    const extraTip = defaultPriorityFeePerGas / BigInt(100) * BigInt(percentMultiplier);
    const totalPriorityFee = defaultPriorityFeePerGas + extraTip;
    return totalPriorityFee;
}
/**
 * @internal
 */ function getGasStationUrl(chainId) {
    switch(chainId){
        case 137:
            return "https://gasstation.polygon.technology/v2";
        case 80002:
            return "https://gasstation.polygon.technology/amoy";
    }
}
const MIN_POLYGON_GAS_PRICE = 31n; // 31 gwei
/**
 *
 * @returns The gas price
 * @internal
 */ async function getPolygonGasPriorityFee(chainId) {
    const gasStationUrl = getGasStationUrl(chainId);
    try {
        const data = await (await fetch(gasStationUrl)).json();
        // take the standard speed here, SDK options will define the extra tip
        const priorityFee = data.fast.maxPriorityFee;
        if (priorityFee > 0) {
            const fixedFee = Number.parseFloat(priorityFee).toFixed(9);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(fixedFee, 9);
        }
    } catch (e) {
        console.error("failed to fetch gas", e);
    }
    return MIN_POLYGON_GAS_PRICE;
} //# sourceMappingURL=fee-data.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toSerializableTransaction",
    ()=>toSerializableTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/fee-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/any-evm/zksync/isZkSyncChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
async function toSerializableTransaction(options) {
    // zk chains require a different rpc method for gas estimation and gas fees
    const isZkSync = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isZkSyncChain"])(options.transaction.chain);
    if (isZkSync) {
        const { getZkGasFees } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/send-eip712-transaction.js [app-client] (ecmascript, async loader)");
        const { gas, maxFeePerGas, maxPriorityFeePerGas } = await getZkGasFees({
            from: typeof options.from === "string" // Is this just an address?
             ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(options.from) : options.from !== undefined // Is this an account?
             ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(options.from.address) : undefined,
            transaction: options.transaction
        });
        // passing these values here will avoid re-fetching them below
        options.transaction = {
            ...options.transaction,
            gas,
            maxFeePerGas,
            maxPriorityFeePerGas
        };
    }
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])(options.transaction);
    const chainId = options.transaction.chain.id;
    const from = options.from;
    let [data, nonce, gas, feeData, to, accessList, value, authorizationList, type] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(options.transaction),
        (async ()=>{
            // if the user has specified a nonce, use that
            const resolvedNonce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.nonce);
            if (resolvedNonce !== undefined) {
                return resolvedNonce;
            }
            return from // otherwise get the next nonce (import the method to do so)
             ? await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionCount.js [app-client] (ecmascript, async loader)").then(({ eth_getTransactionCount })=>eth_getTransactionCount(rpcRequest, {
                    address: typeof from === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(from) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(from.address),
                    blockTag: "pending"
                })) : undefined;
        })(),
        // takes the same options as the sendTransaction function thankfully!
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateGas"])({
            ...options,
            from: options.from
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGasOverridesForTransaction"])(options.transaction),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.to),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.accessList),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.value),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.authorizationList),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.type)
    ]);
    const extraGas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(options.transaction.extraGas);
    if (extraGas) {
        gas += extraGas;
    }
    return {
        accessList,
        authorizationList,
        chainId,
        data,
        gas,
        nonce,
        to,
        type,
        value,
        ...feeData
    };
} //# sourceMappingURL=to-serializable-transaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendTransaction",
    ()=>sendTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$transaction$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/transaction-store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)");
;
;
;
async function sendTransaction(options) {
    let { account, transaction, gasless } = options;
    const decorator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTransactionDecorator"])();
    if (decorator) {
        const { account: decoratedAccount, transaction: decoratedTransaction } = await decorator({
            account,
            transaction
        });
        account = decoratedAccount;
        transaction = decoratedTransaction;
    }
    if (account.onTransactionRequested) {
        await account.onTransactionRequested(transaction);
    }
    // if zksync transaction params are set, send with eip712
    if (transaction.eip712) {
        const { sendEip712Transaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/send-eip712-transaction.js [app-client] (ecmascript, async loader)");
        return sendEip712Transaction({
            account,
            transaction
        });
    }
    const serializableTransaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
        from: account,
        transaction: transaction
    });
    // branch for gasless transactions
    if (gasless) {
        // lazy load the gasless tx function because it's only needed for gasless transactions
        const { sendGaslessTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/gasless/send-gasless-transaction.js [app-client] (ecmascript, async loader)");
        return sendGaslessTransaction({
            account,
            gasless,
            serializableTransaction,
            transaction
        });
    }
    const result = await account.sendTransaction(serializableTransaction);
    // Store the transaction
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$transaction$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addTransactionToStore"])({
        address: account.address,
        chainId: transaction.chain.id,
        transactionHash: result.transactionHash
    });
    return {
        ...result,
        chain: transaction.chain,
        client: transaction.client
    };
} //# sourceMappingURL=send-transaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionTypeMap",
    ()=>TransactionTypeMap,
    "prepareTransaction",
    ()=>prepareTransaction
]);
const TransactionTypeMap = {
    eip1559: 1,
    eip2930: 2,
    eip4844: 3,
    eip7702: 4,
    legacy: 0
};
function prepareTransaction(options, info) {
    if (info) {
        // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
        options.__preparedMethod = info.preparedMethod;
        // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
        options.__contract = info.contract;
    }
    return options;
} //# sourceMappingURL=prepare-transaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/to-eip1193.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toProvider",
    ()=>toProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
;
;
;
;
;
;
function toProvider(options) {
    const { chain, client, wallet, connectOverride } = options;
    const rpcClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    return {
        on: wallet.subscribe,
        removeListener: ()=>{
        // should invoke the return fn from subscribe instead
        },
        request: async (request)=>{
            switch(request.method){
                case "eth_sendTransaction":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendTransaction"])({
                            account: account,
                            transaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareTransaction"])({
                                ...request.params[0],
                                chain,
                                client
                            })
                        });
                        return result.transactionHash;
                    }
                case "eth_estimateGas":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateGas"])({
                            account,
                            transaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareTransaction"])({
                                ...request.params[0],
                                chain,
                                client
                            })
                        });
                    }
                case "personal_sign":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        return account.signMessage({
                            message: {
                                raw: request.params[0]
                            }
                        });
                    }
                case "eth_signTypedData_v4":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        const data = JSON.parse(request.params[1]);
                        return account.signTypedData(data);
                    }
                case "eth_accounts":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            return [];
                        }
                        return [
                            account.address
                        ];
                    }
                case "eth_requestAccounts":
                    {
                        const connectedAccount = wallet.getAccount();
                        if (connectedAccount) {
                            return [
                                connectedAccount.address
                            ];
                        }
                        const account = connectOverride ? await connectOverride(wallet) : await wallet.connect({
                            client
                        }).catch((e)=>{
                            console.error("Error connecting wallet", e);
                            return null;
                        });
                        if (!account) {
                            throw new Error("Unable to connect wallet - try passing a connectOverride function");
                        }
                        return [
                            account.address
                        ];
                    }
                case "wallet_switchEthereumChain":
                case "wallet_addEthereumChain":
                    {
                        const data = request.params[0];
                        const chainIdHex = data.chainId;
                        if (!chainIdHex) {
                            throw new Error("Chain ID is required");
                        }
                        // chainId is hex most likely, convert to number
                        const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(chainIdHex) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToNumber"])(chainIdHex) : chainIdHex;
                        const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId);
                        return wallet.switchChain(chain);
                    }
                case "wallet_getCapabilities":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        if (!account.getCapabilities) {
                            throw new Error("Wallet does not support EIP-5792");
                        }
                        const chains = request.params[1];
                        if (chains && Array.isArray(chains)) {
                            const firstChainStr = chains[0];
                            const firstChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(firstChainStr) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToNumber"])(firstChainStr) : Number(firstChainStr);
                            return account.getCapabilities(firstChainId ? {
                                chainId: firstChainId
                            } : {});
                        }
                        return account.getCapabilities({});
                    }
                case "wallet_sendCalls":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        if (!account.sendCalls) {
                            throw new Error("Wallet does not support EIP-5792");
                        }
                        return account.sendCalls({
                            ...request.params[0],
                            chain: chain
                        });
                    }
                case "wallet_getCallsStatus":
                    {
                        const account = wallet.getAccount();
                        if (!account) {
                            throw new Error("Account not connected");
                        }
                        if (!account.getCallsStatus) {
                            throw new Error("Wallet does not support EIP-5792");
                        }
                        return account.getCallsStatus({
                            id: request.params[0],
                            chain: chain,
                            client: client
                        });
                    }
                default:
                    return rpcClient(request);
            }
        }
    };
} //# sourceMappingURL=to-eip1193.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$from$2d$eip1193$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromProvider"],
    "toProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$to$2d$eip1193$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toProvider"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$from$2d$eip1193$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/from-eip1193.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$to$2d$eip1193$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/to-eip1193.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/index.js [app-client] (ecmascript) <export * as EIP1193>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EIP1193",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$adapters$2f$eip1193$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/adapters/eip1193/index.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/sha256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sha256",
    ()=>sha256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@noble/hashes/esm/sha256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
;
;
function sha256(value, to) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToUint8Array"])(value) : value);
    if (to === "bytes") {
        return bytes;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(bytes);
} //# sourceMappingURL=sha256.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/client-id.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeClientIdFromSecretKey",
    ()=>computeClientIdFromSecretKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/sha256.js [app-client] (ecmascript)");
;
;
;
const cache = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](4096);
function computeClientIdFromSecretKey(secretKey) {
    if (cache.has(secretKey)) {
        return cache.get(secretKey);
    }
    // we slice off the leading `0x` and then take the first 32 chars
    const cId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToBytes"])(secretKey)).slice(2, 34);
    cache.set(secretKey, cId);
    return cId;
} //# sourceMappingURL=client-id.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/client/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createThirdwebClient",
    ()=>createThirdwebClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$client$2d$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/client-id.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$jwt$2f$is$2d$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/jwt/is-jwt.js [app-client] (ecmascript)");
;
;
function createThirdwebClient(options) {
    const { clientId, secretKey, ...rest } = options;
    let realClientId = clientId;
    if (secretKey) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$jwt$2f$is$2d$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJWT"])(secretKey)) {
            // when passing a JWT as secret key we HAVE to also have a clientId
            if (!clientId) {
                throw new Error("clientId must be provided when using a JWT secretKey");
            }
        } else {
            // always PREFER the clientId if provided, only compute it from the secretKey if we don't have a clientId passed explicitly
            realClientId = clientId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$client$2d$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeClientIdFromSecretKey"])(secretKey);
        }
    }
    // only path we get here is if we have no secretKey and no clientId
    if (!realClientId) {
        throw new Error("clientId or secretKey must be provided");
    }
    return {
        ...rest,
        clientId: realClientId,
        secretKey
    };
} //# sourceMappingURL=client.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_603a2ee5._.js.map