(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/AppApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$smart$2d$wallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/smart-wallets.mjs [app-client] (ecmascript)");
;
class r {
    getConfig() {
        return this._privyInternal.config;
    }
    async getSmartWalletConfig() {
        return this._smartWalletConfig || (this._smartWalletConfig = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$smart$2d$wallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetSmartWalletConfig"], {
            params: {
                app_id: this.appId
            }
        })), this._smartWalletConfig;
    }
    get appId() {
        return this._privyInternal.appId;
    }
    constructor(t){
        this._privyInternal = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Token.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Token",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/jose/dist/browser/util/decode_jwt.js [app-client] (ecmascript)");
;
class t {
    static parse(e) {
        try {
            return new t(e);
        } catch (e) {
            return null;
        }
    }
    get subject() {
        return this._decoded.sub;
    }
    get expiration() {
        return this._decoded.exp;
    }
    get issuer() {
        return this._decoded.iss;
    }
    get audience() {
        return this._decoded.aud;
    }
    isExpired(e = 0) {
        return Date.now() >= 1e3 * (this.expiration - e);
    }
    constructor(t){
        this.value = t, this._decoded = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJwt"](t);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/CrossAppApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$cross$2d$app$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/cross-app.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Token.mjs [app-client] (ecmascript)");
;
;
;
class t {
    async updateOnCrossAppAuthentication(r, e) {
        let s = e.access_token, o = t.providerAccessTokenStorageKey(r);
        await this._storage.put(o, s);
    }
    async getProviderAccessToken(r) {
        let s = t.providerAccessTokenStorageKey(r), o = await this._storage.get(s);
        if ("string" != typeof o) return null;
        try {
            if (new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Token"](o).isExpired()) throw Error("JWT is expired");
            return o;
        } catch  {
            return await this._storage.del(s), null;
        }
    }
    async getCrossAppConnections() {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$cross$2d$app$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetCrossAppConnections"], {
            params: {
                app_id: this._privyInternal.appId
            }
        });
    }
    constructor(r, e){
        this._privyInternal = r, this._storage = e;
    }
}
t.providerAccessTokenStorageKey = (r)=>`privy:cross-app:${r}`;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/DelegatedWalletsApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/wallet-api.mjs [app-client] (ecmascript)");
;
class t {
    async revoke() {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletsRevoke"], {});
    }
    constructor(r){
        this._privyInternal = r;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MoonpayApiError",
    ()=>o,
    "PrivyApiError",
    ()=>r,
    "PrivyClientError",
    ()=>e,
    "createErrorFormatter",
    ()=>s,
    "errorIndicatesMfaCanceled",
    ()=>c
]);
class r extends Error {
    constructor({ error: r, code: e }){
        super(r), this.error = r, this.code = e;
    }
}
class e extends Error {
    constructor({ error: r, code: e }){
        super(r), this.code = e, this.error = r;
    }
}
class o extends Error {
    constructor({ error: r, code: e, response: o }){
        super(r), this.code = e, this.error = r, this.response = o;
    }
}
const s = (o)=>(s)=>o[s instanceof r || s instanceof e ? s.code : "unknown_error"] ?? o.default;
function c(r) {
    return r && "object" == typeof r && "code" in r && "mfa_canceled" === r.code;
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/unified-wallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isUnifiedWallet",
    ()=>e
]);
const e = (e)=>!!e.id && "privy-v2" === e.recovery_method;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedBitcoinWalletProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedBitcoinWalletProvider",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/unified-wallet.mjs [app-client] (ecmascript)");
;
;
class r {
    async sign({ message: e }) {
        return await this.request({
            method: "sign",
            params: {
                message: new TextDecoder("utf8").decode(e)
            }
        });
    }
    async signTransaction({ psbt: e }) {
        return await this.request({
            method: "signTransaction",
            params: {
                psbt: e
            }
        });
    }
    async request(r) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(this._account)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            code: "unsupported_wallet_type",
            error: "Bitcoin wallet providers are only supported for on-device execution and this app uses TEE execution. Use the useSignRawHash hook from @privy-io/expo/extended-chains to sign over a hash with this wallet. Learn more at https://docs.privy.io/recipes/tee-wallet-migration-guide"
        });
        if (!await this._privyInternal.getAccessTokenInternal()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Missing access token",
            code: "attempted_rpc_call_before_logged_in"
        });
        return this.handleIFrameRpc(r);
    }
    async handleIFrameRpc(t) {
        try {
            let e = await this._privyInternal.getAccessTokenInternal();
            if (!e) throw Error("Missing access token. User must be authenticated.");
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", {
                method: t.method,
                address: this._account.address
            }), (await this._proxy.rpcWallet({
                accessToken: e,
                request: t,
                entropyId: this._entropyId,
                entropyIdVerifier: this._entropyIdVerifier,
                hdWalletIndex: this._account.wallet_index,
                chainType: this._account.chain_type
            })).response.data;
        } catch (r) {
            console.error(r);
            let s = r instanceof Error ? r.message : "Unable to make wallet request";
            throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", {
                method: t.method,
                address: this._account.address,
                error: s
            }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                code: "embedded_wallet_request_error",
                error: s
            });
        }
    }
    toJSON() {
        return `PrivyEmbeddedBitcoinProvider { address: '${this._account.address}', request: [Function] }`;
    }
    constructor({ proxy: e, privyInternal: t, account: r, entropyId: s, entropyIdVerifier: a }){
        this._proxy = e, this._privyInternal = t, this._account = r, this._entropyId = s, this._entropyIdVerifier = a;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/types.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivyIframeErrorTypes",
    ()=>t,
    "SUPPORTED_JSON_RPC_METHODS",
    ()=>e,
    "isSupportedRpcMethod",
    ()=>i,
    "isSupportedSolanaRpcMethod",
    ()=>s
]);
const e = [
    "eth_sign",
    "eth_populateTransactionRequest",
    "eth_signTransaction",
    "personal_sign",
    "eth_signTypedData_v4",
    "csw_signUserOperation",
    "secp256k1_sign"
], i = (i)=>e.includes(i);
let n = [
    "signMessage"
];
const s = (e)=>n.includes(e), t = [
    "error",
    "invalid_request_arguments",
    "wallet_not_on_device",
    "invalid_recovery_pin",
    "insufficient_funds",
    "mfa_timeout",
    "missing_or_invalid_mfa",
    "mfa_verification_max_attempts_reached"
];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedProviderError",
    ()=>d,
    "PrivyConnectorError",
    ()=>i,
    "PrivyEmbeddedWalletErrorCode",
    ()=>r,
    "PrivyError",
    ()=>s,
    "PrivyIframeError",
    ()=>o,
    "PrivyProviderRpcError",
    ()=>N,
    "ProviderErrors",
    ()=>n,
    "ProviderRpcError",
    ()=>a,
    "errorIndicatesMaxMfaRetries",
    ()=>c,
    "errorIndicatesMfaRateLimit",
    ()=>T,
    "errorIndicatesMfaTimeout",
    ()=>l,
    "errorIndicatesMfaVerificationFailed",
    ()=>u,
    "errorIndicatesRecoveryIsNeeded",
    ()=>E,
    "isPrivyIframeError",
    ()=>_
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/types.mjs [app-client] (ecmascript)");
;
var t, r = ((t = {}).MISSING_OR_INVALID_PRIVY_APP_ID = "missing_or_invalid_privy_app_id", t.MISSING_OR_INVALID_PRIVY_ACCOUNT_ID = "missing_or_invalid_privy_account_id", t.INVALID_DATA = "invalid_data", t.LINKED_TO_ANOTHER_USER = "linked_to_another_user", t.ALLOWLIST_REJECTED = "allowlist_rejected", t.OAUTH_USER_DENIED = "oauth_user_denied", t.UNKNOWN_AUTH_ERROR = "unknown_auth_error", t.USER_EXITED_AUTH_FLOW = "exited_auth_flow", t.MUST_BE_AUTHENTICATED = "must_be_authenticated", t.UNKNOWN_CONNECT_WALLET_ERROR = "unknown_connect_wallet_error", t.GENERIC_CONNECT_WALLET_ERROR = "generic_connect_wallet_error", t.CLIENT_REQUEST_TIMEOUT = "client_request_timeout", t.INVALID_CREDENTIALS = "invalid_credentials", t);
class s extends Error {
    toString() {
        return `${this.type}${this.privyErrorCode ? `-${this.privyErrorCode}` : ""}: ${this.message}${this.cause ? ` [cause: ${this.cause}]` : ""}`;
    }
    constructor(e, t, r){
        super(e), t instanceof Error && (this.cause = t), this.privyErrorCode = r;
    }
}
class a extends s {
    constructor(e, t, r){
        super(e), this.type = "provider_error", this.code = t, this.data = r;
    }
}
class o extends Error {
    constructor(e, t){
        super(t), this.type = e;
    }
}
class i extends s {
    constructor(e, t, r){
        super(e, t, r), this.type = "connector_error";
    }
}
class d extends Error {
    constructor(e, t, r){
        super(e), this.code = t, this.data = r;
    }
}
const n = {
    UNKNOWN_ERROR: {
        eipCode: 0,
        message: "Unknown error",
        detail: "Unknown error",
        retryable: !0
    },
    E4001_DEFAULT_USER_REJECTED_REQUEST: {
        eipCode: 4001,
        message: "User Rejected Request",
        detail: "The user rejected the request.",
        default: !0,
        retryable: !0
    },
    E4100_DEFAULT_UNAUTHORIZED: {
        eipCode: 4100,
        message: "Unauthorized",
        detail: "The requested method and/or account has not been authorized by the user.",
        default: !0,
        retryable: !1
    },
    E4200_DEFAULT_UNSUPPORTED_METHOD: {
        eipCode: 4200,
        message: "Unsupported Method",
        detail: "The Provider does not support the requested method.",
        default: !0,
        retryable: !1
    },
    E4900_DEFAULT_DISCONNECTED: {
        eipCode: 4900,
        message: "Disconnected",
        detail: "The Provider is disconnected from all chains.",
        default: !0,
        retryable: !0
    },
    E4901_DEFAULT_CHAIN_DISCONNECTED: {
        eipCode: 4901,
        message: "Chain Disconnected",
        detail: "The Provider is not connected to the requested chain.",
        default: !0,
        retryable: !0
    },
    E32700_DEFAULT_PARSE_ERROR: {
        eipCode: -32700,
        message: "Parse error",
        detail: "Invalid JSON",
        default: !0,
        retryable: !1
    },
    E32600_DEFAULT_INVALID_REQUEST: {
        eipCode: -32600,
        message: "Invalid request",
        detail: "JSON is not a valid request object",
        default: !0,
        retryable: !1
    },
    E32601_DEFAULT_METHOD_NOT_FOUND: {
        eipCode: -32601,
        message: "Method not found",
        detail: "Method does not exist",
        default: !0,
        retryable: !1
    },
    E32602_DEFAULT_INVALID_PARAMS: {
        eipCode: -32602,
        message: "Invalid params",
        detail: "Invalid method parameters",
        default: !0,
        retryable: !1
    },
    E32603_DEFAULT_INTERNAL_ERROR: {
        eipCode: -32603,
        message: "Internal error",
        detail: "Internal JSON-RPC error",
        default: !0,
        retryable: !0
    },
    E32000_DEFAULT_INVALID_INPUT: {
        eipCode: -32e3,
        message: "Invalid input",
        detail: "Missing or invalid parameters",
        default: !0,
        retryable: !1
    },
    E32001_DEFAULT_RESOURCE_NOT_FOUND: {
        eipCode: -32001,
        message: "Resource not found",
        detail: "Requested resource not found",
        default: !0,
        retryable: !1
    },
    E32002_DEFAULT_RESOURCE_UNAVAILABLE: {
        eipCode: -32002,
        message: "Resource unavailable",
        detail: "Requested resource not available",
        default: !0,
        retryable: !0
    },
    E32003_DEFAULT_TRANSACTION_REJECTED: {
        eipCode: -32003,
        message: "Transaction rejected",
        detail: "Transaction creation failed",
        default: !0,
        retryable: !0
    },
    E32004_DEFAULT_METHOD_NOT_SUPPORTED: {
        eipCode: -32004,
        message: "Method not supported",
        detail: "Method is not implemented",
        default: !0,
        retryable: !1
    },
    E32005_DEFAULT_LIMIT_EXCEEDED: {
        eipCode: -32005,
        message: "Limit exceeded",
        detail: "Request exceeds defined limit",
        default: !0,
        retryable: !1
    },
    E32006_DEFAULT_JSON_RPC_VERSION_NOT_SUPPORTED: {
        eipCode: -32006,
        message: "JSON-RPC version not supported",
        detail: "Version of JSON-RPC protocol is not supported",
        default: !0,
        retryable: !1
    },
    E32002_CONNECTION_ALREADY_PENDING: {
        eipCode: -32002,
        message: "Connection request already pending",
        detail: "Don’t see your wallet? Check your other browser windows.",
        retryable: !1
    },
    E32002_REQUEST_ALREADY_PENDING: {
        eipCode: -32002,
        message: "Resource request already pending",
        detail: "Don’t see your wallet? Check your other browser windows.",
        retryable: !1
    },
    E32002_WALLET_LOCKED: {
        eipCode: -32002,
        message: "Wallet might be locked",
        detail: "Don’t see your wallet? Check your other browser windows.",
        retryable: !1
    },
    E4001_USER_REJECTED_REQUEST: {
        eipCode: 4001,
        message: "Signature rejected",
        detail: "Please try signing again.",
        retryable: !0
    }
};
function _(t) {
    let r = t.type;
    return "string" == typeof r && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyIframeErrorTypes"].includes(r);
}
function E(e) {
    return _(e) && "wallet_not_on_device" === e.type;
}
function l(e) {
    return _(e) && "mfa_timeout" === e.type;
}
function u(e) {
    return _(e) && "missing_or_invalid_mfa" === e.type;
}
function c(e) {
    return _(e) && "mfa_verification_max_attempts_reached" === e.type;
}
function T(e) {
    return _(e) && e.message.includes("code 429");
}
class N extends a {
    constructor(e){
        super(e.message, e.code, e.data);
        let t = Object.values(n).find((t)=>t.eipCode === e.code);
        this.details = t || n.UNKNOWN_ERROR, -32002 === e.code && (e.message?.includes("already pending for origin") ? e.message?.includes("wallet_requestPermissions") ? this.details = n.E32002_CONNECTION_ALREADY_PENDING : this.details = n.E32002_REQUEST_ALREADY_PENDING : e.message?.includes("Already processing") && e.message.includes("eth_requestAccounts") && (this.details = n.E32002_WALLET_LOCKED));
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/create.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/wallet-api.mjs [app-client] (ecmascript)");
;
async function t(t, { request: o }) {
    return await t.fetchPrivyRoute(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletCreate"], {
        body: o
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletCreate.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "walletCreate",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/create.mjs [app-client] (ecmascript)");
;
;
async function e({ context: e, chainType: i }) {
    return {
        wallet: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])(e, {
            request: {
                chain_type: i,
                owner_id: void 0
            }
        })
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/utils/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getJsonRpcEndpointFromChain",
    ()=>o,
    "getPublicClient",
    ()=>p,
    "throwIfInvalidRecoveryUpgradePath",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)");
;
;
;
const p = (p, i, c, s)=>{
    let l = Number(p), n = i.find((r)=>r.id === l);
    if (!n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyConnectorError"](`Unsupported chainId ${p}`, 4901);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(o(n, c, s.appId)),
        chain: n
    });
}, o = (r, e, p)=>{
    let o, i = r.id, c = Number(r.id);
    if (r.rpcUrls.privyWalletOverride && r.rpcUrls.privyWalletOverride.http[0]) o = r.rpcUrls.privyWalletOverride.http[0];
    else if (e.rpcUrls && e.rpcUrls[c]) o = e.rpcUrls[c];
    else if (r.rpcUrls.privy?.http[0]) {
        let e = new URL(r.rpcUrls.privy.http[0]);
        e.searchParams.append("privyAppId", p), o = e.toString();
    } else o = r.rpcUrls.public?.http[0] ? r.rpcUrls.public.http[0] : r.rpcUrls.default?.http[0];
    if (!o) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyConnectorError"](`No RPC url found for ${i}`);
    return o;
};
function i({ currentRecoveryMethod: r, upgradeToRecoveryMethod: e }) {
    switch(r){
        case "privy":
        case "user-passcode":
        case "recovery-encryption-key":
            return !0;
        case "icloud":
        case "google-drive":
            if (r === e) throw Error("Cannot upgrade to the existing cloud platform");
            return !0;
        default:
            throw Error("Unknown recovery method");
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/sleep.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sleep",
    ()=>e
]);
function e(e) {
    return new Promise((t)=>{
        setTimeout(()=>{
            t();
        }, e);
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EventCallbackQueue.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventCallbacksQueue",
    ()=>e
]);
class e {
    enqueue(e, a) {
        this.callbacks[e] = a;
    }
    dequeue(e, a) {
        let r = this.callbacks[a];
        if (!r) throw Error(`cannot dequeue ${e} event: no event found for id ${a}`);
        switch(delete this.callbacks[a], e){
            case "privy:iframe:ready":
            case "privy:wallets:create":
            case "privy:user-signer:sign":
            case "privy:wallets:add":
            case "privy:wallets:set-recovery":
            case "privy:wallets:connect":
            case "privy:wallets:recover":
            case "privy:wallets:rpc":
            case "privy:wallet:create":
            case "privy:wallet:connect":
            case "privy:wallet:recover":
            case "privy:wallet:rpc":
            case "privy:solana-wallet:create":
            case "privy:solana-wallet:create-additional":
            case "privy:solana-wallet:connect":
            case "privy:solana-wallet:recover":
            case "privy:solana-wallet:rpc":
            case "privy:delegated-actions:consent":
            case "privy:mfa:verify":
            case "privy:mfa:init-enrollment":
            case "privy:mfa:submit-enrollment":
            case "privy:mfa:unenroll":
            case "privy:mfa:clear":
                return r;
            default:
                throw Error(`invalid wallet event type ${e}`);
        }
    }
    constructor(){
        this.callbacks = {};
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/withMfa.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withMfa",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)");
;
;
async function r(r1, t, i, a, n = !1, o, c) {
    let m = n, s = async (o)=>{
        if (m) {
            o === (n ? 0 : 1) ? a() : i.current?.reject(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyIframeError"]("missing_or_invalid_mfa", "MFA verification failed, retry."));
            let m = await new Promise((r, a)=>{
                t.current = {
                    resolve: r,
                    reject: a
                }, setTimeout(()=>{
                    let r = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyIframeError"]("mfa_timeout", "Timed out waiting for MFA code");
                    i.current?.reject(r), a(r);
                }, c);
            });
            return await r1(m);
        }
        return await r1();
    }, f = null;
    for(let e = 0; e < o; e++)try {
        f = await s(e), i.current?.resolve(void 0);
        break;
    } catch (e) {
        if ("missing_or_invalid_mfa" !== e.type) throw i.current?.resolve(void 0), e;
        m = !0;
    }
    if (null === f) {
        let r = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyIframeError"]("mfa_verification_max_attempts_reached", "Max MFA verification attempts reached");
        throw i.current?.reject(r), r;
    }
    return f;
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedWalletProxy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_WALLET_PROXY_TIMEOUT_MS",
    ()=>o,
    "EmbeddedWalletProxy",
    ()=>h
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$sleep$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/sleep.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EventCallbackQueue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EventCallbackQueue.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$withMfa$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/withMfa.mjs [app-client] (ecmascript)");
;
;
;
;
;
var a;
const o = 15e3;
let s = (a = 0, ()=>"id-" + a++), n = (e, t)=>"bigint" == typeof t ? t.toString() : t, l = async (e, { ms: t, msg: i })=>{
    let r, a = new Promise((e, a)=>{
        r = setTimeout(()=>{
            a(Error(i));
        }, t ?? 15e3);
    });
    try {
        return await Promise.race([
            e,
            a
        ]);
    } finally{
        void 0 !== r && clearTimeout(r);
    }
}, m = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EventCallbackQueue$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventCallbacksQueue"];
class h {
    invokeWithMfa(e, t) {
        return l((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$withMfa$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withMfa"])((i)=>l(this.waitForReady().then(()=>e(i)), {
                msg: t.timeoutMsg,
                ms: t.timeoutMs
            }), this.mfa.rootPromise, this.mfa.submitPromise, ()=>this.mfa.emit("mfaRequired"), t.mfaAlwaysRequired ?? !1, 4, 3e5), {
            msg: "Operation reached timeout: MFA verification",
            ms: 126e4
        });
    }
    reload() {
        return this.ready = !1, this._embeddedWalletMessagePoster.reload();
    }
    ping(e = 15e3) {
        return l(this.invoke("privy:iframe:ready", {}), {
            msg: "Ping reached timeout",
            ms: e
        });
    }
    create(e) {
        return l(this.waitForReady().then(()=>this.invoke("privy:wallet:create", e)), {
            msg: "Operation reached timeout: create"
        });
    }
    rpc(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:wallet:rpc", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: rpc"
        });
    }
    createSolana(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:solana-wallet:create", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: create",
            timeoutMs: 6e4
        });
    }
    createAdditionalSolana(e) {
        return l(this.waitForReady().then(()=>this.invoke("privy:solana-wallet:create-additional", e)), {
            msg: "Operation reached timeout: create"
        });
    }
    solanaRpc(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:solana-wallet:rpc", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: solana-rpc"
        });
    }
    delegateWallets(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:delegated-actions:consent", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: delegated-actions:consent"
        });
    }
    verifyMfa(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:mfa:verify", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: mfa:verify",
            mfaAlwaysRequired: !0
        });
    }
    initEnrollMfa(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:mfa:init-enrollment", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: mfa:init-enrollment"
        });
    }
    submitEnrollMfa(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:mfa:submit-enrollment", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: mfa:submit-enrollment"
        });
    }
    unenrollMfa(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:mfa:unenroll", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: mfa:unenroll",
            mfaAlwaysRequired: !0
        });
    }
    clearMfa(e) {
        return l(this.waitForReady().then(()=>this.invoke("privy:mfa:clear", e)), {
            msg: "Operation reached timeout: mfa:clear"
        });
    }
    createWallet(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:wallets:create", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: create",
            timeoutMs: 6e4
        });
    }
    signWithUserSigner(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:user-signer:sign", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: user-signer:sign"
        });
    }
    addWallet(e) {
        return l(this.waitForReady().then(()=>this.invoke("privy:wallets:add", e)), {
            msg: "Operation reached timeout: wallets:add"
        });
    }
    setRecovery(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:wallets:set-recovery", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: wallets:set-recovery",
            timeoutMs: 6e4
        });
    }
    connect(e) {
        return l(this.waitForReady().then(()=>this.invoke("privy:wallets:connect", e)), {
            msg: "Operation reached timeout: wallets:connect"
        });
    }
    recover(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:wallets:recover", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: wallets:recover",
            timeoutMs: 6e4
        });
    }
    rpcWallet(e) {
        return this.invokeWithMfa((t)=>this.invoke("privy:wallets:rpc", {
                ...t,
                ...e
            }), {
            timeoutMsg: "Operation reached timeout: wallets:rpc"
        });
    }
    handleEmbeddedWalletMessages(e) {
        if (!e.event.startsWith("privy:")) return void console.warn(`Unsupported event type: ${e.event}`);
        let { reject: t, resolve: r } = m.dequeue(e.event, e.id);
        return void 0 !== e.error ? t(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyIframeError"](e.error.type, e.error.message)) : r(e.data);
    }
    waitForReady() {
        return this.ready ? Promise.resolve() : new Promise(async (t, i)=>{
            for(; !this.ready;)this.invoke("privy:iframe:ready", {}).then(()=>{
                this.ready = !0, t();
            }).catch(i), await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$sleep$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(150);
        });
    }
    invoke(e, t) {
        let i = ((e, t)=>`${e}${JSON.stringify(t, n)}`)(e, t);
        if ("privy:wallet:create" === e || "privy:solana-wallet:create" === e) {
            let e = this.cache.get(i);
            if (e) return e;
        }
        let r = new Promise((i, r)=>{
            let a = s();
            m.enqueue(a, {
                resolve: i,
                reject: r
            }), this._embeddedWalletMessagePoster.postMessage(JSON.stringify({
                id: a,
                event: e,
                data: t
            }), "*");
        }).finally(()=>{
            this.cache.delete(i);
        });
        return this.cache.set(i, r), r;
    }
    constructor(e, t){
        this.ready = !1, this.cache = new Map, this._embeddedWalletMessagePoster = e, this.mfa = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/encodings.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytesToHex",
    ()=>e,
    "isHexEncoded",
    ()=>t,
    "utf8ToBytes",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
const t = (t)=>/^0x[0-9a-fA-F]*$/.test(t), f = (t)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t, "utf8"), e = (t)=>`0x${t.toString("hex")}`;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/generate-authorization-signature.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateAuthorizationSignature",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
;
;
async function i(i, o) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(o);
    if (void 0 === t) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
        error: "Failed to prepare the payload for signing",
        code: "invalid_input"
    });
    let a = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t).toString("base64"), { signature: n } = await i({
        message: a
    });
    return {
        signature: n
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/rpc.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/wallet-api.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$generate$2d$authorization$2d$signature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/generate-authorization-signature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
;
;
;
;
async function t(t, i, { wallet_id: e, ...o }) {
    let p = {
        version: 1,
        url: t.getCompiledPath(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletRpc"], {
            params: {
                wallet_id: e
            }
        }),
        method: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletRpc"].method,
        headers: {
            "privy-app-id": t.app.appId
        },
        body: {
            ...o
        }
    }, { signature: m } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$generate$2d$authorization$2d$signature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAuthorizationSignature"])(i, p);
    return await t.fetchPrivyRoute(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletRpc"], {
        body: o,
        params: {
            wallet_id: e
        },
        headers: {
            "privy-authorization-signature": m
        }
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/wallet-api-eth-transaction.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toWalletApiUnsignedEthTransaction",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/encodings.mjs [app-client] (ecmascript)");
;
function t(t) {
    return {
        from: t.from,
        to: t.to ?? void 0,
        nonce: n(t.nonce),
        chain_id: n(t.chainId),
        data: function(t) {
            if (void 0 !== t) return "string" == typeof t ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHexEncoded"])(t) ? t : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utf8ToBytes"])(t)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(Uint8Array.from(t)));
        }(t.data),
        value: n(t.value),
        type: t.type,
        gas_limit: n(t.gasLimit),
        gas_price: n(t.gasPrice),
        max_fee_per_gas: n(t.maxFeePerGas),
        max_priority_fee_per_gas: n(t.maxPriorityFeePerGas)
    };
}
function n(t) {
    if ("number" == typeof t || "bigint" == typeof t) {
        return `0x${BigInt(t).toString(16)}`;
    }
    if ("string" == typeof t) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHexEncoded"])(t) ? t : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utf8ToBytes"])(t));
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/wallet-api-eth-typed-data.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toWalletApiTypedData",
    ()=>e
]);
function e(e) {
    return "string" == typeof e && (e = JSON.parse(e)), {
        types: e.types,
        primary_type: String(e.primaryType),
        domain: e.domain,
        message: e.message
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletRpc.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "walletRpc",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/encodings.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/rpc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$wallet$2d$api$2d$eth$2d$transaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/wallet-api-eth-transaction.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$wallet$2d$api$2d$eth$2d$typed$2d$data$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/wallet-api-eth-typed-data.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
async function i({ context: i, account: o, rpcRequest: c }) {
    switch(c.chainType){
        case "ethereum":
            return async function({ context: i, account: o, rpcRequest: c }) {
                switch(c.method){
                    case "personal_sign":
                        {
                            let [e] = c.params, t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"])(i, i.signRequest, {
                                chain_type: "ethereum",
                                method: "personal_sign",
                                wallet_id: o.id,
                                params: e.startsWith("0x") ? {
                                    message: e.slice(2),
                                    encoding: "hex"
                                } : {
                                    message: e,
                                    encoding: "utf-8"
                                }
                            });
                            if ("personal_sign" !== t.method) throw Error("Unable to sign message");
                            return {
                                data: t.data.signature
                            };
                        }
                    case "eth_signTransaction":
                        {
                            let [e] = c.params, t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"])(i, i.signRequest, {
                                chain_type: "ethereum",
                                method: "eth_signTransaction",
                                wallet_id: o.id,
                                params: {
                                    transaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$wallet$2d$api$2d$eth$2d$transaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toWalletApiUnsignedEthTransaction"])(e)
                                }
                            });
                            if ("eth_signTransaction" !== t.method) throw Error("Unable to sign transaction");
                            return {
                                data: t.data.signed_transaction
                            };
                        }
                    case "eth_signTypedData_v4":
                        {
                            let [, e] = c.params, t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"])(i, i.signRequest, {
                                chain_type: "ethereum",
                                method: c.method,
                                wallet_id: o.id,
                                params: {
                                    typed_data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$wallet$2d$api$2d$eth$2d$typed$2d$data$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toWalletApiTypedData"])(e)
                                }
                            });
                            if ("eth_signTypedData_v4" !== t.method) throw Error("Unable to sign typed data");
                            return {
                                data: t.data.signature
                            };
                        }
                    case "eth_sign":
                        {
                            let [, n] = c.params, r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"])(i, i.signRequest, {
                                chain_type: "ethereum",
                                method: "secp256k1_sign",
                                wallet_id: o.id,
                                params: {
                                    hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHexEncoded"])(n) ? n : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utf8ToBytes"])(n))
                                }
                            });
                            if ("secp256k1_sign" !== r.method) throw Error("Unable to sign message");
                            return {
                                data: r.data.signature
                            };
                        }
                    case "secp256k1_sign":
                        {
                            let [n] = c.params, r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"])(i, i.signRequest, {
                                chain_type: "ethereum",
                                method: "secp256k1_sign",
                                wallet_id: o.id,
                                params: {
                                    hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHexEncoded"])(n) ? n : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$encodings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utf8ToBytes"])(n))
                                }
                            });
                            if ("secp256k1_sign" !== r.method) throw Error("Unable to sign message");
                            return {
                                data: r.data.signature
                            };
                        }
                    case "csw_signUserOperation":
                    case "eth_sendTransaction":
                    case "eth_populateTransactionRequest":
                        throw Error(`This wallet does not support the method: ${c.method}`);
                }
            }({
                context: i,
                account: o,
                rpcRequest: c.request
            });
        case "solana":
            return async function({ context: e, account: t, rpcRequest: a }) {
                if ("signMessage" === a.method) {
                    let { message: n } = a.params, r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$rpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"])(e, e.signRequest, {
                        chain_type: "solana",
                        method: "signMessage",
                        wallet_id: t.id,
                        params: {
                            message: n,
                            encoding: "base64"
                        }
                    });
                    if ("signMessage" !== r.method) throw Error("Unable to sign message");
                    return {
                        data: r.data.signature
                    };
                }
            }({
                context: i,
                account: o,
                rpcRequest: c.request
            });
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedWalletProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedWalletProvider",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$ethereum$2f$dist$2f$esm$2f$to$2d$viem$2d$transaction$2d$serializable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/ethereum/dist/esm/to-viem-transaction-serializable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/unified-wallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletRpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletRpc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
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
let d = new Set([
    "eth_sign",
    "personal_sign",
    "eth_signTypedData_v4",
    "csw_signUserOperation",
    "secp256k1_sign"
]);
class l extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"] {
    async request(e) {
        if (d.has(e.method)) return this.handleIFrameRpc(e);
        switch(e.method){
            case "eth_accounts":
            case "eth_requestAccounts":
                return this._account.address ? [
                    this._account.address
                ] : [];
            case "eth_chainId":
                return `0x${this._chainId.toString(16)}`;
            case "wallet_switchEthereumChain":
                return this.handleSwitchEthereumChain(e);
            case "eth_estimateGas":
                return this.handleEstimateGas(e);
            case "eth_signTransaction":
                {
                    let t = e.params?.[0];
                    return this.handleSignTransaction(t);
                }
            case "eth_sendTransaction":
                {
                    let t = e.params?.[0];
                    return this.handleSendTransaction(t);
                }
            case "eth_populateTransactionRequest":
                {
                    let t = e.params?.[0];
                    return this.handlePopulateTransaction(t);
                }
            default:
                return this.handleJsonRpc(e);
        }
    }
    ensureChainId(e) {
        let t = {
            chainId: this._chainId,
            ...e
        };
        return this.internalSwitchEthereumChain(t.chainId), t;
    }
    internalSwitchEthereumChain(e) {
        e && Number(e) !== this._chainId && (this._chainId = Number(e), this._client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicClient"])(this._chainId, this._chains, {
            rpcUrls: []
        }, {
            appId: this._privyInternal.appId
        }), this.emit("chainChanged", e));
    }
    async handlePopulateTransaction(e) {
        let t = this.ensureChainId(e), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$ethereum$2f$dist$2f$esm$2f$to$2d$viem$2d$transaction$2d$serializable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toViemTransactionSerializable"])(t), { type: s, ...n } = await this._client.prepareTransactionRequest({
            account: t.from ?? this._account.address,
            ...i
        });
        return {
            ...n,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$ethereum$2f$dist$2f$esm$2f$to$2d$viem$2d$transaction$2d$serializable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STRING_TO_NUMBER_TXN_TYPE"][s]
        };
    }
    async handleSignTransaction(e) {
        let r = {
            ...e
        };
        for (let e of Object.keys(r)){
            let a = r[e];
            a && "bigint" == typeof a && (r[e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(a));
        }
        return await this.handleIFrameRpc({
            method: "eth_signTransaction",
            params: [
                r
            ]
        });
    }
    async handleSendTransaction(e) {
        let t = await this.handlePopulateTransaction(e), r = await this.handleSignTransaction(t);
        return await this.handleJsonRpc({
            method: "eth_sendRawTransaction",
            params: [
                r
            ]
        });
    }
    async handleEstimateGas(e) {
        if (!e.params || !Array.isArray(e.params)) throw Error("Invalid params for eth_estimateGas");
        let t = e.params?.[0], a = this.ensureChainId(t), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$ethereum$2f$dist$2f$esm$2f$to$2d$viem$2d$transaction$2d$serializable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toViemTransactionSerializable"])(a);
        return await this._client.estimateGas({
            account: a.from ?? this._account.address,
            ...i
        });
    }
    handleSwitchEthereumChain(e) {
        let t;
        if (!e.params || !Array.isArray(e.params)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedProviderError"](`Invalid params for ${e.method}`, 4200);
        if ("string" == typeof e.params[0]) t = e.params[0];
        else {
            if (!("chainId" in e.params[0]) || "string" != typeof e.params[0].chainId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedProviderError"](`Invalid params for ${e.method}`, 4200);
            t = e.params[0].chainId;
        }
        this.internalSwitchEthereumChain(t);
    }
    async handleIFrameRpc(e) {
        try {
            let t = await this._privyInternal.getAccessTokenInternal();
            if (!t) throw Error("Missing privy token. User must be logged in");
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", {
                method: e.method,
                address: this._account.address
            });
            let r = this._account;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(r)) {
                let { data: a } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletRpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletRpc"])({
                    context: {
                        app: this._appApi,
                        fetchPrivyRoute: (...e)=>this._privyInternal.fetch(...e),
                        getCompiledPath: (...e)=>this._privyInternal.getPath(...e),
                        signRequest: ({ message: e })=>this._walletProxy.signWithUserSigner({
                                accessToken: t,
                                message: e
                            })
                    },
                    account: r,
                    rpcRequest: {
                        chainType: "ethereum",
                        request: e
                    }
                });
                return a;
            }
            try {
                await this._walletProxy.connect({
                    entropyId: this._entropyId,
                    entropyIdVerifier: this._entropyIdVerifier,
                    accessToken: t
                });
            } catch (e) {
                let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorIndicatesRecoveryIsNeeded"])(e);
                if (r && "privy" === this._account.recovery_method) await this._walletProxy.recover({
                    entropyId: this._entropyId,
                    entropyIdVerifier: this._entropyIdVerifier,
                    accessToken: t
                });
                else {
                    if (!r || !this._onNeedsRecovery) throw e;
                    {
                        let e;
                        await new Promise(async (t, r)=>{
                            e = setTimeout(()=>r(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                                    code: "embedded_wallet_recovery_error",
                                    error: "User-owned recovery timed out"
                                })), 12e4), await this._onNeedsRecovery?.({
                                recoveryMethod: this._account.recovery_method,
                                onRecovered: ()=>t(!0)
                            });
                        }).finally(()=>clearTimeout(e));
                    }
                }
            }
            return (await this._walletProxy.rpcWallet({
                accessToken: t,
                request: e,
                entropyId: this._entropyId,
                entropyIdVerifier: this._entropyIdVerifier,
                hdWalletIndex: this._account.wallet_index,
                chainType: "ethereum"
            })).response.data;
        } catch (t) {
            console.error(t);
            let r = t instanceof Error ? t.message : "Unable to make wallet request";
            throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", {
                method: e.method,
                address: this._account.address,
                error: r
            }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                code: "embedded_wallet_request_error",
                error: r
            });
        }
    }
    async handleJsonRpc(e) {
        return this._client.request(e);
    }
    toJSON() {
        return `PrivyEIP1193Provider { address: '${this._account.address}', chainId: ${this._chainId}, request: [Function] }`;
    }
    constructor({ walletProxy: e, privyInternal: t, account: r, entropyId: a, entropyIdVerifier: i, chains: s, onNeedsRecovery: n, chainId: o = s[0].id, appApi: h }){
        super(), this._walletProxy = e, this._privyInternal = t, this._account = r, this._entropyId = a, this._entropyIdVerifier = i, this._chainId = o, this._chains = s, this._onNeedsRecovery = n, this._client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicClient"])(o, s, {
            rpcUrls: []
        }, {
            appId: h.appId
        }), this._appApi = h;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/solana/isVersionedTransaction.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isVersionedTransaction",
    ()=>n
]);
function n(n) {
    return "version" in n;
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/solana/getWalletPublicKeyFromTransaction.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWalletPublicKeyFromTransaction",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$isVersionedTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/solana/isVersionedTransaction.mjs [app-client] (ecmascript)");
;
function e(e, t) {
    let n = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$isVersionedTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVersionedTransaction"])(e) ? e.message : e.compileMessage()).staticAccountKeys.find((o)=>o.toBase58() === t);
    if (!n) throw Error(`Transaction does not contain public key ${t}`);
    return n;
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedSolanaWalletProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedSolanaWalletProvider",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$getWalletPublicKeyFromTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/solana/getWalletPublicKeyFromTransaction.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$isVersionedTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/solana/isVersionedTransaction.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/unified-wallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletRpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletRpc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
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
class i {
    async request(t) {
        if (!await this._privyInternal.getAccessTokenInternal()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Missing access token",
            code: "attempted_rpc_call_before_logged_in"
        });
        switch(t.method){
            case "signAndSendTransaction":
                return await this.handleSignAndSendTransaction(t);
            case "signTransaction":
                return await this.handleSignTransaction(t);
            default:
                return await this.handleIFrameRpc(t);
        }
    }
    get _publicKey() {
        return this._account.address;
    }
    async connectAndRecover(t) {
        if ("privy-v2" !== this._account.recovery_method) try {
            await this._proxy.connect({
                entropyId: this._entropyId,
                entropyIdVerifier: this._entropyIdVerifier,
                accessToken: t
            });
        } catch (r) {
            let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorIndicatesRecoveryIsNeeded"])(r);
            if (a && "privy" === this._account.recovery_method) await this._proxy.recover({
                entropyId: this._entropyId,
                entropyIdVerifier: this._entropyIdVerifier,
                accessToken: t
            });
            else {
                if (!a || !this._onNeedsRecovery) throw r;
                {
                    let t;
                    await new Promise(async (r, a)=>{
                        t = setTimeout(()=>a(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                                code: "embedded_wallet_recovery_error",
                                error: "User-owned recovery timed out"
                            })), 12e4), await this._onNeedsRecovery?.({
                            recoveryMethod: this._account.recovery_method,
                            onRecovered: ()=>r(!0)
                        });
                    }).finally(()=>clearTimeout(t));
                }
            }
        }
    }
    async signMessageRpc(e, t) {
        let r = this._account;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(r)) return (await this._proxy.rpcWallet({
            accessToken: t,
            request: e,
            chainType: "solana",
            hdWalletIndex: this._account.wallet_index,
            entropyId: this._entropyId,
            entropyIdVerifier: this._entropyIdVerifier
        })).response.data;
        {
            let { data: a } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletRpc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletRpc"])({
                context: {
                    app: this._app,
                    fetchPrivyRoute: (...e)=>this._privyInternal.fetch(...e),
                    getCompiledPath: (...e)=>this._privyInternal.getPath(...e),
                    signRequest: ({ message: e })=>this._proxy.signWithUserSigner({
                            accessToken: t,
                            message: e
                        })
                },
                account: r,
                rpcRequest: {
                    chainType: "solana",
                    request: e
                }
            });
            return {
                signature: a
            };
        }
    }
    async handleIFrameRpc(t) {
        try {
            let e = await this._privyInternal.getAccessTokenInternal();
            if (!e) throw Error("Missing privy token. User must be logged in");
            return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", {
                method: t.method,
                address: this._account.address
            }), await this.connectAndRecover(e), await this.signMessageRpc(t, e);
        } catch (r) {
            console.error(r);
            let a = r instanceof Error ? r.message : "Unable to make wallet request";
            throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", {
                method: t.method,
                address: this._account.address,
                error: a
            }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                code: "embedded_wallet_request_error",
                error: a
            });
        }
    }
    async handleSignAndSendTransaction(a) {
        try {
            let e = await this._privyInternal.getAccessTokenInternal();
            if (!e) throw Error("Missing privy token. User must be logged in");
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", {
                method: a.method,
                address: this._account.address
            }), await this.connectAndRecover(e);
            let { transaction: s, connection: n, options: i } = a.params, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$getWalletPublicKeyFromTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletPublicKeyFromTransaction"])(s, this._account.address), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$isVersionedTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVersionedTransaction"])(s) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(s.message.serialize()) : s.serializeMessage(), { signature: d } = await this.signMessageRpc({
                method: "signMessage",
                params: {
                    message: c.toString("base64")
                }
            }, e);
            return s.addSignature(o, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(d, "base64")), {
                signature: await n.sendRawTransaction(s.serialize(), i)
            };
        } catch (t) {
            console.error(t);
            let r = t instanceof Error ? t.message : "Unable to make wallet request";
            throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", {
                method: a.method,
                address: this._account.address,
                error: r
            }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                code: "embedded_wallet_request_error",
                error: r
            });
        }
    }
    async handleSignTransaction(a) {
        try {
            let e = await this._privyInternal.getAccessTokenInternal();
            if (!e) throw Error("Missing privy token. User must be logged in");
            this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_started", {
                method: a.method,
                address: this._account.address
            }), await this.connectAndRecover(e);
            let { transaction: s } = a.params, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$getWalletPublicKeyFromTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletPublicKeyFromTransaction"])(s, this._account.address), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$solana$2f$isVersionedTransaction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVersionedTransaction"])(s) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(s.message.serialize()) : s.serializeMessage(), { signature: o } = await this.signMessageRpc({
                method: "signMessage",
                params: {
                    message: i.toString("base64")
                }
            }, e);
            return s.addSignature(n, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(o, "base64")), {
                signedTransaction: s
            };
        } catch (t) {
            console.error(t);
            let r = t instanceof Error ? t.message : "Unable to make wallet request";
            throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_rpc_failed", {
                method: a.method,
                address: this._account.wallet_index,
                error: r
            }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                code: "embedded_wallet_request_error",
                error: r
            });
        }
    }
    toJSON() {
        return `PrivyEmbeddedSolanaProvider { address: '${this._account.address}', request: [Function] }`;
    }
    constructor({ proxy: e, privyInternal: t, account: r, entropyId: a, entropyIdVerifier: s, onNeedsRecovery: n, app: i }){
        this._proxy = e, this._privyInternal = t, this._account = r, this._entropyId = a, this._entropyIdVerifier = s, this._onNeedsRecovery = n, this._app = i;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/EmbeddedWalletApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/default-supported-chains.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$dedupe$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/dedupe-supported-chains.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedBitcoinWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedBitcoinWalletProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletCreate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/stack/walletCreate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/unified-wallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedWalletProxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedWalletProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedSolanaWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/EmbeddedSolanaWalletProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
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
class y {
    setMessagePoster(e) {
        this._proxy = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedWalletProxy"](e, this._mfaPromises), this._mfa.setProxy(this._proxy);
    }
    async signWithUserSigner(e) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        let r = await this._privyInternal.getAccessTokenInternal();
        if (!r) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "User must be logged in to sign a message with the user signer",
            code: "user_signer_sign_error"
        });
        let { signature: o } = await this._proxy.signWithUserSigner({
            accessToken: r,
            message: e.message
        });
        return {
            signature: o
        };
    }
    async add(e) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        if ("user-controlled-server-wallets-only" === this._privyInternal.config?.embedded_wallet_config.mode) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletCreate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletCreate"])({
            context: {
                app: this._appApi,
                fetchPrivyRoute: (...e)=>this._privyInternal.fetch(...e),
                getCompiledPath: (...e)=>this._privyInternal.getPath(...e)
            },
            chainType: e.chainType
        });
        else {
            let r = await this._privyInternal.getAccessTokenInternal();
            if (!r) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                error: "User must be logged in to create an embedded wallet",
                code: "embedded_wallet_creation_error"
            });
            await this._proxy.addWallet({
                accessToken: r,
                ...e
            });
        }
        let { user: r } = await this._privyInternal.refreshSession();
        return {
            user: r
        };
    }
    async getBitcoinProvider({ wallet: e, entropyId: r, entropyIdVerifier: t, recoveryPassword: i, recoveryAccessToken: d, recoverySecretOverride: a }) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        if (!await this._privyInternal.getAccessTokenInternal()) throw Error("User must be logged in to create an embedded wallet");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(e) || await this._load({
            entropyId: r,
            entropyIdVerifier: t,
            wallet: e,
            recoveryPassword: i,
            recoveryAccessToken: d,
            recoverySecretOverride: a
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedBitcoinWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedBitcoinWalletProvider"]({
            account: e,
            privyInternal: this._privyInternal,
            proxy: this._proxy,
            entropyId: r,
            entropyIdVerifier: t
        });
    }
    async create({ password: e, recoveryMethod: r, recoveryToken: o, recoveryKey: i, recoverySecretOverride: a, iCloudRecordNameOverride: s, solanaAccount: n, skipCallbacks: c }) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        if ("user-controlled-server-wallets-only" === this._privyInternal.config?.embedded_wallet_config.mode) {
            if (r && !r.startsWith("privy")) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                error: "User-controlled server wallets do not support custom recovery methods",
                code: "embedded_wallet_creation_error"
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletCreate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletCreate"])({
                context: {
                    app: this._appApi,
                    fetchPrivyRoute: (...e)=>this._privyInternal.fetch(...e),
                    getCompiledPath: (...e)=>this._privyInternal.getPath(...e)
                },
                chainType: "ethereum"
            });
        } else {
            let t;
            if (t = r || (e ? "user-passcode" : "privy"), e && "string" != typeof e) throw Error("Invalid recovery password, must be a string");
            if ("privy" === t && this._privyInternal.config?.embedded_wallet_config.require_user_password_on_create) throw Error("Password not provided yet is required by App configuration");
            let d = await this._privyInternal.getAccessTokenInternal();
            if (!d) throw Error("User must be logged in to create an embedded wallet");
            let { address: c } = await this._proxy.create({
                accessToken: d,
                recoveryMethod: t,
                recoveryKey: i,
                recoveryPassword: e,
                recoveryAccessToken: o,
                recoverySecretOverride: a,
                iCloudRecordNameOverride: s,
                solanaAddress: n?.address
            });
            if (!c) throw Error("Failed to create wallet");
        }
        return await this._privyInternal.refreshSession(c);
    }
    async createSolana(e) {
        if (!this._proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_creation_error"
        });
        if ("user-controlled-server-wallets-only" === this._privyInternal.config?.embedded_wallet_config.mode) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$stack$2f$walletCreate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletCreate"])({
            context: {
                app: this._appApi,
                fetchPrivyRoute: (...e)=>this._privyInternal.fetch(...e),
                getCompiledPath: (...e)=>this._privyInternal.getPath(...e)
            },
            chainType: "solana"
        });
        else {
            let r = await this._privyInternal.getAccessTokenInternal();
            if (!r) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                error: "User must be logged in to create an embedded wallet",
                code: "embedded_wallet_creation_error"
            });
            e?.ethereumAccount && await this.getProvider(e.ethereumAccount);
            let { publicKey: o } = await this._proxy.createSolana({
                accessToken: r,
                ethereumAddress: e?.ethereumAccount?.address
            });
            if (!o) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                error: "Failed to create wallet",
                code: "embedded_wallet_creation_error"
            });
        }
        return await this._privyInternal.refreshSession();
    }
    async delegateWallets({ delegatedWallets: e, rootWallet: r }) {
        if (!this._proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_creation_error"
        });
        let o = await this._privyInternal.getAccessTokenInternal();
        if (!o) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "User must be logged in to create an embedded wallet",
            code: "embedded_wallet_creation_error"
        });
        await this._proxy.delegateWallets({
            accessToken: o,
            delegatedWallets: e,
            rootWallet: r
        });
    }
    async getProvider(e, r, t, o, i) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(e) || await this._load({
            wallet: e,
            entropyId: e.address,
            entropyIdVerifier: "ethereum-address-verifier",
            recoveryPassword: r,
            recoveryKey: i,
            recoveryAccessToken: t,
            recoverySecretOverride: o
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedWalletProvider"]({
            account: e,
            entropyId: e.address,
            entropyIdVerifier: "ethereum-address-verifier",
            privyInternal: this._privyInternal,
            chains: this._chains,
            walletProxy: this._proxy,
            appApi: this._appApi
        });
    }
    async getEthereumProvider({ wallet: e, entropyId: r, entropyIdVerifier: t, recoveryPassword: o, recoveryAccessToken: i, recoverySecretOverride: d, recoveryKey: a, onNeedsRecovery: n }) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        if (!await this._privyInternal.getAccessTokenInternal()) throw Error("User must be logged in to create an embedded wallet");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(e) || (!n || o || i || d || a) && await this._load({
            entropyId: r,
            entropyIdVerifier: t,
            wallet: e,
            recoveryPassword: o,
            recoveryAccessToken: i,
            recoverySecretOverride: d,
            recoveryKey: a
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedWalletProvider"]({
            account: e,
            entropyId: r,
            entropyIdVerifier: "ethereum-address-verifier",
            privyInternal: this._privyInternal,
            chains: this._chains,
            walletProxy: this._proxy,
            onNeedsRecovery: n,
            appApi: this._appApi
        });
    }
    async getSolanaProvider(e, r, o, i, d, a, n) {
        if (!this._proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_webview_not_loaded"
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(e) || (!n || i || d || a) && await this._load({
            wallet: e,
            entropyId: r,
            entropyIdVerifier: o,
            recoveryPassword: i,
            recoveryAccessToken: d,
            recoverySecretOverride: a
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedSolanaWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedSolanaWalletProvider"]({
            account: e,
            privyInternal: this._privyInternal,
            proxy: this._proxy,
            entropyId: r,
            entropyIdVerifier: o,
            onNeedsRecovery: n,
            app: this._appApi
        });
    }
    async setRecovery(e) {
        let { wallet: r, ...o } = e;
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$unified$2d$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnifiedWallet"])(r)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "This wallet does not support setting recovery methods",
            code: "unsupported_recovery_method"
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["throwIfInvalidRecoveryUpgradePath"])({
            currentRecoveryMethod: r.recovery_method,
            upgradeToRecoveryMethod: "icloud-native" === o.recoveryMethod ? "icloud" : o.recoveryMethod
        }), await this._load("solana" === r.chain_type ? {
            wallet: r,
            entropyId: r.address,
            entropyIdVerifier: "solana-address-verifier"
        } : {
            wallet: r,
            entropyId: r.address,
            entropyIdVerifier: "ethereum-address-verifier"
        });
        let i = await this._privyInternal.getAccessTokenInternal();
        if (!i) throw Error("User must be logged in to interact with embedded wallets");
        let d = r.recovery_method;
        this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_set_recovery_started", {
            address: r.address,
            target_recovery_method: o.recoveryMethod,
            existing_recovery_method: d
        });
        try {
            let e;
            if ("user-passcode" === o.recoveryMethod) e = {
                recoveryMethod: "user-passcode",
                recoveryPassword: o.password
            };
            else if ("google-drive" === o.recoveryMethod) e = {
                recoveryMethod: "google-drive",
                recoveryAccessToken: o.recoveryAccessToken
            };
            else if ("icloud" === o.recoveryMethod) e = {
                recoveryMethod: "icloud",
                recoveryAccessToken: o.recoveryAccessToken
            };
            else if ("icloud-native" === o.recoveryMethod) e = {
                recoveryMethod: "icloud-native",
                iCloudRecordNameOverride: o.iCloudRecordNameOverride,
                recoverySecretOverride: o.recoverySecretOverride
            };
            else if ("recovery-encryption-key" === o.recoveryMethod) e = {
                recoveryMethod: "recovery-encryption-key",
                recoveryKey: o.recoveryKey
            };
            else {
                if ("privy" !== o.recoveryMethod) throw Error(`Unknown recovery method: ${o.recoveryMethod}`);
                e = {
                    recoveryMethod: "privy"
                };
            }
            await this._proxy.setRecovery({
                accessToken: i,
                entropyId: r.address,
                entropyIdVerifier: "solana" === r.chain_type ? "solana-address-verifier" : "ethereum-address-verifier",
                ...e
            }), this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_set_recovery_completed", {
                address: r.address,
                target_recovery_method: o.recoveryMethod,
                existing_recovery_method: d
            });
            let { user: t } = await this._privyInternal.refreshSession();
            return {
                user: t,
                provider: "ethereum" !== r.chain_type ? null : new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedWalletProvider"]({
                    account: r,
                    entropyId: r.address,
                    entropyIdVerifier: "ethereum-address-verifier",
                    privyInternal: this._privyInternal,
                    chains: this._chains,
                    walletProxy: this._proxy,
                    appApi: this._appApi
                })
            };
        } catch (e) {
            throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_set_recovery_failed", {
                address: r.address,
                recovery_method: r.recovery_method,
                error: e instanceof Error ? e.message : "Unable to recover wallet"
            }), e;
        }
    }
    getURL() {
        let e = new URL(`${this._privyInternal.baseUrl}/apps/${this._privyInternal.appId}/embedded-wallets`);
        return this._privyInternal.caid && e.searchParams.append("caid", this._privyInternal.caid), this._privyInternal.appClientId && e.searchParams.append("client_id", this._privyInternal.appClientId), e.href;
    }
    get chains() {
        return this._chains;
    }
    onMessage(e) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        return this._proxy.handleEmbeddedWalletMessages(e);
    }
    reload() {
        this._proxy ? this._proxy.reload() : console.warn("Attempted to reload proxy before initialized");
    }
    async ping(e) {
        try {
            if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
            return await this._proxy.ping(e), !0;
        } catch (e) {
            return console.error(e), !1;
        }
    }
    async _load({ entropyId: e, entropyIdVerifier: r, wallet: t, recoveryPassword: o, recoveryKey: d, recoveryAccessToken: a, recoverySecretOverride: s }) {
        if (!this._proxy) throw Error("Embedded wallet proxy not initialized");
        let n = await this._privyInternal.getAccessTokenInternal();
        if (!n) throw Error("User must be logged in to interact with embedded wallets");
        try {
            return await this._proxy.connect({
                accessToken: n,
                entropyId: e,
                entropyIdVerifier: r
            }), e;
        } catch (c) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorIndicatesRecoveryIsNeeded"])(c)) try {
                if ("privy" === t.recovery_method) {
                    this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    });
                    let o = await this._proxy.recover({
                        accessToken: n,
                        entropyId: e,
                        entropyIdVerifier: r
                    });
                    return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    }), o.entropyId;
                }
                if ("user-passcode" === t.recovery_method && o) {
                    this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    });
                    let i = await this._proxy.recover({
                        accessToken: n,
                        recoveryPassword: o,
                        entropyId: e,
                        entropyIdVerifier: r
                    });
                    return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    }), i.entropyId;
                }
                if ([
                    "google-drive",
                    "icloud"
                ].includes(t.recovery_method) && a) {
                    this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    });
                    let o = await this._proxy.recover({
                        accessToken: n,
                        recoveryAccessToken: a,
                        entropyId: e,
                        entropyIdVerifier: r
                    });
                    return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    }), o.entropyId;
                }
                if ("icloud" === t.recovery_method && s) {
                    this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", {
                        address: t.address,
                        recovery_method: "icloud-native"
                    });
                    let o = await this._proxy.recover({
                        accessToken: n,
                        recoverySecretOverride: s,
                        entropyId: e,
                        entropyIdVerifier: r
                    });
                    return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", {
                        address: t.address,
                        recovery_method: "icloud-native"
                    }), o.entropyId;
                }
                if ("recovery-encryption-key" === t.recovery_method && d) {
                    this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_started", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    });
                    let o = await this._proxy.recover({
                        accessToken: n,
                        recoveryKey: d,
                        entropyId: e,
                        entropyIdVerifier: r
                    });
                    return this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_completed", {
                        address: t.address,
                        recovery_method: t.recovery_method
                    }), o.entropyId;
                }
            } catch (r) {
                throw this._privyInternal.createAnalyticsEvent("embedded_wallet_sdk_recovery_failed", {
                    address: t.address,
                    recovery_method: t.recovery_method,
                    error: r instanceof Error ? r.message : `Unable to recover wallet: ${e}`
                }), r;
            }
            throw c;
        }
    }
    constructor(t, o, i, d, a, s){
        if (this._chains = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUPPORTED_CHAINS"]), this._privyInternal = t, o && (this._proxy = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$EmbeddedWalletProxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedWalletProxy"](o, a), d.setProxy(this._proxy)), i) {
            let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$dedupe$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dedupeSupportedChains"])(i);
            this._chains = e;
        }
        this._mfa = d, this._mfaPromises = a, this._appApi = s;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/MfaPromises.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
;
class r extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"] {
    constructor(){
        super(), this.rootPromise = {
            current: null
        }, this.submitPromise = {
            current: null
        };
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/allSettled.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allSettled",
    ()=>e
]);
const e = Promise.allSettled.bind(Promise) ?? ((e)=>Promise.all(e.map((e)=>e.then((e)=>({
                status: "fulfilled",
                value: e
            })).catch((e)=>({
                status: "rejected",
                reason: e
            })))));
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Session.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Session",
    ()=>k
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/jose/dist/browser/util/base64url.js [app-client] (ecmascript) <export * as base64url>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Token.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$allSettled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/allSettled.mjs [app-client] (ecmascript)");
;
;
;
;
;
let o = "privy:token", n = "privy-token", a = "privy:pat", _ = "privy:refresh_token", h = "privy-refresh-token", g = "privy:id-token", l = "privy-id-token", c = "privy-session";
class k extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"] {
    set isUsingServerCookies(e) {
        this._isUsingServerCookies = e;
    }
    async getCustomerAccessToken() {
        let e = await this._storage.get(o);
        try {
            return "string" == typeof e ? new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Token"](e).value : null;
        } catch (e) {
            return console.error(e), await this.destroyLocalState({
                reason: "getToken_error"
            }), null;
        }
    }
    async getPrivyAccessToken() {
        let e = await this._storage.get(a);
        try {
            return "string" == typeof e ? new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Token"](e).value : null;
        } catch (e) {
            return console.error(e), await this.destroyLocalState({
                reason: "getToken_error"
            }), null;
        }
    }
    async getRefreshToken() {
        let e = await this._storage.get(_);
        return "string" == typeof e ? e : null;
    }
    async getIdentityToken() {
        let e = await this._storage.get(g);
        return "string" == typeof e ? e : null;
    }
    get mightHaveServerCookies() {
        try {
            let e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(c);
            return void 0 !== e && e.length > 0;
        } catch (e) {
            console.error(e);
        }
        return !1;
    }
    hasRefreshCredentials(e, t) {
        return this.mightHaveServerCookies || "string" == typeof e && "string" == typeof t;
    }
    tokenIsActive(e) {
        if (!e) return !1;
        let t = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Token"].parse(e);
        return null !== t && !t.isExpired(30);
    }
    async destroyLocalState(e) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$allSettled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allSettled"])([
            this._storage.del(o),
            this._storage.del(_),
            this._storage.del(g),
            this._storage.del(this.GUEST_CREDENTIAL_STORAGE_KEY)
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(n), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(h), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(l), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(c), e?.reason && this.emit("storage_cleared", {
            reason: e.reason
        });
    }
    async storeCustomerAccessToken(e) {
        if ("string" == typeof e) {
            let t = await this._storage.get(o);
            if (await this._storage.put(o, e), !this._isUsingServerCookies) {
                let t = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Token"].parse(e)?.expiration;
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(n, e, {
                    sameSite: "Strict",
                    secure: !0,
                    expires: t ? new Date(1e3 * t) : void 0
                });
            }
            t !== e && this.emit("token_stored", {
                cookiesEnabled: this._isUsingServerCookies
            });
        } else {
            let e = await this._storage.get(o);
            await this._storage.del(o), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(n), null !== e && this.emit("token_cleared", {
                reason: "set_with_non_string_value"
            });
        }
    }
    async storePrivyAccessToken(e) {
        "string" == typeof e ? await this._storage.put(a, e) : await this._storage.del(a);
    }
    async storeRefreshToken(e) {
        "string" == typeof e ? (await this._storage.put(_, e), this._isUsingServerCookies || (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(c, "t", {
            sameSite: "Strict",
            secure: !0,
            expires: 30
        }), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(h, e, {
            sameSite: "Strict",
            secure: !0,
            expires: 30
        })), this.emit("refresh_token_stored", {
            cookiesEnabled: this._isUsingServerCookies
        })) : (await this._storage.del(_), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(h), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(c), this.emit("refresh_token_cleared", {
            reason: "set_with_non_string_value"
        }));
    }
    async updateWithTokensResponse(e) {
        let t = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$allSettled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allSettled"])([
            this.storeCustomerAccessToken(e.token),
            this.storePrivyAccessToken(e.privy_access_token),
            this.storeRefreshToken(e.refresh_token),
            this.storeIdentityToken(e.identity_token),
            this.processOAuthTokens(e.oauth_tokens)
        ])).filter((e)=>"rejected" === e.status);
        t.length > 0 && this.emit("error_storing_tokens", t.map((e)=>String(e.reason)).join(", "));
    }
    async processOAuthTokens(e) {
        e && this.emit("oauth_tokens_granted", e);
    }
    async storeIdentityToken(e) {
        if ("string" == typeof e) {
            let t = await this._storage.get(g);
            if (await this._storage.put(g, e), !this._isUsingServerCookies) {
                let t = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Token$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Token"].parse(e)?.expiration;
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(l, e, {
                    sameSite: "Strict",
                    secure: !0,
                    expires: t ? new Date(1e3 * t) : void 0
                });
            }
            t !== e && this.emit("identity_token_stored", {
                cookiesEnabled: this._isUsingServerCookies
            });
        } else {
            let e = await this._storage.get(g);
            await this._storage.del(g), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(l), null !== e && this.emit("identity_token_cleared", {
                reason: "set_with_non_string_value"
            });
        }
    }
    async getOrCreateGuestCredential() {
        let e = this._storage.get(this.GUEST_CREDENTIAL_STORAGE_KEY);
        if (e && "string" == typeof e) return e;
        let s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__["base64url"].encode(crypto.getRandomValues(new Uint8Array(32)));
        return await this._storage.put(this.GUEST_CREDENTIAL_STORAGE_KEY, s), s;
    }
    constructor(e){
        super(), this._isUsingServerCookies = !1, this._storage = e.storage, this.GUEST_CREDENTIAL_STORAGE_KEY = `privy:guest:${e.appId}`;
    }
}
k.events = [
    "storage_cleared",
    "token_cleared",
    "refresh_token_cleared",
    "identity_token_cleared",
    "token_stored",
    "refresh_token_stored",
    "identity_token_stored",
    "oauth_tokens_granted",
    "error_storing_tokens"
];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/toAbortSignalTimeout.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>t
]);
var t = (t)=>{
    let e = new AbortController;
    return setTimeout(()=>e.abort(), t), e.signal;
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/toSearchParams.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toSearchParams",
    ()=>r
]);
function r(r) {
    let n = new URLSearchParams;
    for(let t in r)null != r[t] && n.append(t, String(r[t]));
    return Array.from(n).length ? "?" + n.toString() : "";
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/noop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "noop",
    ()=>o
]);
const o = ()=>{};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/logger.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toConsoleLogger",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/noop.mjs [app-client] (ecmascript)");
;
let o = {
    NONE: Number.NEGATIVE_INFINITY,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: Number.POSITIVE_INFINITY
};
const r = ({ level: r } = {
    level: "ERROR"
})=>({
        get level () {
            return r;
        },
        error: o[r] >= o.ERROR ? console.error : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"],
        warn: o[r] >= o.WARN ? console.warn : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"],
        info: o[r] >= o.INFO ? console.info : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"],
        debug: o[r] >= o.DEBUG ? console.debug : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]
    });
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/PrivyInternal.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivyInternal",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$fetch$2d$retry$2f$dist$2f$fetch$2d$retry$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/fetch-retry/dist/fetch-retry.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$api$2d$base$2f$dist$2f$esm$2f$constants$2f$error$2d$codes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/api-base/dist/esm/constants/error-codes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/types.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$apps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/apps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$analytics$2d$events$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/analytics-events.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$sessions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/sessions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Session$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Session.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$toAbortSignalTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/toAbortSignalTimeout.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$toSearchParams$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/toSearchParams.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$logger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/logger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
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
let p = "privy:caid";
class u {
    setCallbacks(e) {
        this.callbacks = {
            ...this.callbacks,
            ...e
        };
    }
    get isReady() {
        return !!this._config;
    }
    get config() {
        return this._config;
    }
    get caid() {
        return this._analyticsId;
    }
    async _initialize() {
        if (this.isReady) this.callbacks?.setIsReady?.(!0);
        else {
            if (!await this.isStorageAccessible()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
                code: "storage_error",
                error: "Unable to access storage"
            });
            this._config = await this.getAppConfig(), this._config?.custom_api_url && (this.baseUrl = this._config.custom_api_url, this.session.isUsingServerCookies = !0), this.callbacks?.setIsReady?.(!0), this._sdkVersion.startsWith("react-auth:") || this.createAnalyticsEvent("sdk_initialize", {});
        }
    }
    getPath(e, { params: t, query: s }) {
        return `${this.baseUrl}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPathWithParams"])(e.path, t)}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$toSearchParams$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSearchParams"])(s)}`;
    }
    async fetch(e, { body: t, params: s, query: i, headers: r, onRequest: a = this._beforeRequest.bind(this) }) {
        let n = new Request(this.getPath(e, {
            params: s,
            query: i
        }), {
            method: e.method,
            body: JSON.stringify(t),
            headers: r
        }), o = await a(n), c = await this._fetch(n, o), l = await c.json();
        if (c.status > 299) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyApiError"](l);
        return l;
    }
    async _beforeRequestWithoutInitialize(e) {
        let t = await this.session.getPrivyAccessToken() ?? await this.session.getCustomerAccessToken(), s = new Headers(e.headers);
        s.set("privy-app-id", this.appId), this.appClientId && s.set("privy-client-id", this.appClientId), s.set("privy-client", this._sdkVersion), t && s.set("Authorization", `Bearer ${t}`), s.set("Content-Type", "application/json"), s.set("Accept", "application/json");
        let i = await this._getOrGenerateClientAnalyticsId();
        return i && s.set("privy-ca-id", i), this.nativeAppIdentifier && s.set("x-native-app-identifier", this.nativeAppIdentifier), {
            signal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$toAbortSignalTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(2e4),
            headers: s,
            credentials: "include"
        };
    }
    async beforeRequestWithoutRefresh(e) {
        return await this._initialize(), this._beforeRequestWithoutInitialize(e);
    }
    async _beforeRequest(e) {
        return await this._initialize(), await this.getAccessTokenInternal(), this.beforeRequestWithoutRefresh(e);
    }
    async getAppConfig() {
        return await this.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$apps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppConfig"], {
            params: {
                app_id: this.appId
            },
            onRequest: this._beforeRequestWithoutInitialize.bind(this)
        });
    }
    async _getOrGenerateClientAnalyticsId() {
        if (this._analyticsId) return this._analyticsId;
        try {
            let e = await this._storage.get(p);
            if ("string" == typeof e && e.length > 0) return this._analyticsId = e, e;
        } catch (e) {
            this.logger.error("Unable to load clientId", e);
        }
        try {
            this._analyticsId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        } catch (e) {
            this.logger.error("Unable to generate uuidv4", e);
        }
        if (this._analyticsId) {
            try {
                await this._storage.put(p, this._analyticsId);
            } catch (e) {
                this.logger.error(`Unable to store clientId: ${this._analyticsId}`, e);
            }
            return this._analyticsId;
        }
    }
    async destroyClientAnalyticsId() {
        try {
            return await this._storage.del(p);
        } catch (e) {
            this.logger.error("Unable to delete clientId", e);
        }
    }
    async createAnalyticsEvent(e, t) {
        try {
            await this.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$analytics$2d$events$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalyticsEvent"], {
                body: {
                    event_name: e,
                    client_id: await this._getOrGenerateClientAnalyticsId(),
                    payload: t
                },
                onRequest: this.beforeRequestWithoutRefresh.bind(this)
            });
        } catch (e) {}
    }
    async refreshSession(e = !1) {
        if (!await this.isStorageAccessible()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            code: "storage_error",
            error: "Unable to access storage"
        });
        let t = await this.session.getRefreshToken() ?? void 0, s = t ?? "key", i = this._cache.get(s);
        if (i) return this.logger.debug("[privy:refresh] found in-flight session refresh request, deduping"), await i;
        let r = this._refreshSession(t, e);
        this._cache.set(s, r);
        try {
            return await r;
        } finally{
            this._cache.delete(s);
        }
    }
    async _refreshSession(e, t) {
        let i = await this.session.getCustomerAccessToken();
        if (!this.session.hasRefreshCredentials(i, e ?? null)) throw this.logger.debug("[privy:refresh] missing tokens, skipping request"), await this._initialize(), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyApiError"]({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$api$2d$base$2f$dist$2f$esm$2f$constants$2f$error$2d$codes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyErrorCode"].MISSING_OR_INVALID_TOKEN,
            error: "No tokens found in storage"
        });
        try {
            this.logger.debug(`[privy:refresh] fetching: ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$sessions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RefreshSession"].path}`);
            let s = await this.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$sessions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RefreshSession"], {
                body: {
                    refresh_token: e
                },
                onRequest: this.beforeRequestWithoutRefresh.bind(this)
            }), i = s.session_update_action;
            return this.logger.debug(`[privy:refresh] response: ${i}`), t || this.callbacks?.setUser?.(s.user), "set" === i && (await this.session.updateWithTokensResponse(s), this.logger.debug("[privy:refresh] tokens stored")), "clear" === i && (await this.session.destroyLocalState(), this.logger.debug("[privy:refresh] tokens cleared"), t || this.callbacks?.setUser?.(null)), "ignore" === i && s.token && (await this.session.storeCustomerAccessToken(s.token), await this.session.storePrivyAccessToken(s.privy_access_token), this.logger.debug("[privy:refresh] access token stored"), s.identity_token && (this.logger.debug("[privy:refresh] identity token stored"), await this.session.storeIdentityToken(s.identity_token))), this.logger.debug("[privy:refresh] returning response"), s;
        } catch (e) {
            throw this.logger.debug(`[privy:refresh] error: ${e.message ?? "unknown error"}`), e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyApiError"] && e.code === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$api$2d$base$2f$dist$2f$esm$2f$constants$2f$error$2d$codes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyErrorCode"].MISSING_OR_INVALID_TOKEN && (await this.session.destroyLocalState(), t || this.callbacks?.setUser?.(null)), e;
        }
    }
    async getAccessToken() {
        let [e, t] = await Promise.all([
            this.session.getCustomerAccessToken(),
            this.session.getRefreshToken()
        ]);
        if (!this.session.tokenIsActive(e) && this.session.hasRefreshCredentials(e, t)) {
            let t = await this.refreshSession(), s = await this.session.getCustomerAccessToken();
            return t.token || this.logger.debug("[privy:getAccessToken] expected token received null"), t.token === e && this.logger.debug("[privy:getAccessToken] expected new token in response received existing"), s === e && this.logger.debug("[privy:getAccessToken] expected new token in storage received existing"), t.token ?? s;
        }
        return e;
    }
    async getAccessTokenInternal() {
        let e = await this.getAccessToken();
        return await this.session.getPrivyAccessToken() ?? e;
    }
    async getIdentityToken() {
        return await this.session.getIdentityToken();
    }
    async isStorageAccessible() {
        try {
            let e = `privy:__storage__test-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])()}`, s = "blobby";
            await this._storage.put(e, s);
            let i = await this._storage.get(e);
            return await this._storage.del(e), i === s;
        } catch (e) {
            return this.logger.error(e), !1;
        }
    }
    constructor(t){
        this._sdkVersion = "js-sdk-core:0.58.5", this._cache = new Map, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$logger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toConsoleLogger"])({
            level: t.logLevel ?? "ERROR"
        }), this._storage = t.storage, this._analyticsId = null, this._getOrGenerateClientAnalyticsId(), this.baseUrl = t.baseUrl ?? "https://auth.privy.io", this.appId = t.appId, this.appClientId = t.appClientId, this._sdkVersion = t.sdkVersion ?? this._sdkVersion, this.callbacks = t.callbacks, this.nativeAppIdentifier = t.nativeAppIdentifier, this.session = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Session$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Session"]({
            storage: this._storage,
            isUsingServerCookies: !1,
            appId: t.appId
        }), this._fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$fetch$2d$retry$2f$dist$2f$fetch$2d$retry$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(globalThis.fetch, {
            retries: 3,
            retryDelay: (e)=>3 ** e * 500,
            retryOn: [
                408,
                409,
                425,
                500,
                502,
                503,
                504
            ]
        }), this.session.on("error_storing_tokens", (e)=>{
            this.createAnalyticsEvent("error_updating_tokens_in_storage", {
                reason: e
            });
        });
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/UserApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$terms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/terms.mjs [app-client] (ecmascript)");
;
class t {
    async get() {
        let { user: r } = await this._privyInternal.refreshSession();
        return {
            user: r
        };
    }
    async acceptTerms() {
        return {
            user: await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$terms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AcceptTermsOnUser"], {})
        };
    }
    constructor(r){
        this._privyInternal = r;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/embedded-wallets.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isEmbeddedWalletAccount",
    ()=>e
]);
const e = (e)=>"wallet" === e.type && "privy" === e.wallet_client_type && "embedded" === e.connector_type;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedEthereumWallets.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllUserEmbeddedEthereumWallets",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$embedded$2d$wallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/embedded-wallets.mjs [app-client] (ecmascript)");
;
const t = (t)=>t ? t.linked_accounts.filter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$embedded$2d$wallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmbeddedWalletAccount"]).filter((e)=>"ethereum" === e.chain_type).sort((e, t)=>e.wallet_index - t.wallet_index) : [];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getUserEmbeddedEthereumWallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserEmbeddedEthereumWallet",
    ()=>l,
    "getUserEmbeddedWallet",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedEthereumWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedEthereumWallets.mjs [app-client] (ecmascript)");
;
;
const l = (l)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedEthereumWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllUserEmbeddedEthereumWallets"])(l).find((e)=>0 === e.wallet_index) ?? null, t = l;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedSolanaWallets.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllUserEmbeddedSolanaWallets",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$embedded$2d$wallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/embedded-wallets.mjs [app-client] (ecmascript)");
;
const t = (t)=>t ? t.linked_accounts.filter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$embedded$2d$wallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmbeddedWalletAccount"]).filter((e)=>"solana" === e.chain_type).sort((e, t)=>e.wallet_index - t.wallet_index) : [];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getUserEmbeddedSolanaWallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserEmbeddedSolanaWallet",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedSolanaWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedSolanaWallets.mjs [app-client] (ecmascript)");
;
;
const l = (l)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedSolanaWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllUserEmbeddedSolanaWallets"])(l).find((e)=>0 === e.wallet_index) ?? null;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/shouldCreateEmbeddedEthWallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "shouldCreateEmbeddedEthWallet",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedEthereumWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedEthereumWallets.mjs [app-client] (ecmascript)");
;
;
const t = (t, l)=>!("off" === l || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedEthereumWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllUserEmbeddedEthereumWallets"])(t).length > 0 || t.linked_accounts.filter((e)=>"wallet" === e.type && "ethereum" === e.chain_type).length > 0 && "all-users" !== l);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/shouldCreateEmbeddedSolWallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "shouldCreateEmbeddedSolWallet",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedSolanaWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getAllUserEmbeddedSolanaWallets.mjs [app-client] (ecmascript)");
;
;
const l = (l, t)=>!("off" === t || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getAllUserEmbeddedSolanaWallets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllUserEmbeddedSolanaWallets"])(l).length > 0 || l.linked_accounts.filter((e)=>"wallet" === e.type && "solana" === e.chain_type).length > 0 && "all-users" !== t);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maybeCreateWalletOnLogin",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getUserEmbeddedEthereumWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getUserEmbeddedEthereumWallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getUserEmbeddedSolanaWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getUserEmbeddedSolanaWallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$shouldCreateEmbeddedEthWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/shouldCreateEmbeddedEthWallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$shouldCreateEmbeddedSolWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/shouldCreateEmbeddedSolWallet.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const o = async (o, a, l)=>{
    let u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$shouldCreateEmbeddedEthWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldCreateEmbeddedEthWallet"])(a.user, l?.ethereum?.createOnLogin ?? "off"), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$shouldCreateEmbeddedSolWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldCreateEmbeddedSolWallet"])(a.user, l?.solana?.createOnLogin ?? "off");
    if (u && i) {
        let t = await o.create({
            recoveryMethod: "privy",
            skipCallbacks: !0
        });
        return {
            ...await o.createSolana({
                ethereumAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getUserEmbeddedEthereumWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserEmbeddedEthereumWallet"])(t.user) ?? void 0
            }),
            is_new_user: a.is_new_user,
            oauth_tokens: a.oauth_tokens
        };
    }
    return u ? {
        ...await o.create({
            recoveryMethod: "privy",
            solanaAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getUserEmbeddedSolanaWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserEmbeddedSolanaWallet"])(a.user) ?? void 0
        }),
        is_new_user: a.is_new_user,
        oauth_tokens: a.oauth_tokens
    } : i ? {
        ...await o.createSolana({
            ethereumAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getUserEmbeddedEthereumWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserEmbeddedEthereumWallet"])(a.user) ?? void 0
        }),
        is_new_user: a.is_new_user,
        oauth_tokens: a.oauth_tokens
    } : a;
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/CustomProviderApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$custom$2d$jwt$2d$account$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/custom-jwt-account.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class s {
    async syncWithToken(s, l, r) {
        let d = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$custom$2d$jwt$2d$account$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomJWTAuthenticate"], {
            body: {
                token: s,
                mode: r
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(d);
        let i = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, d, l?.embedded);
        return this._privyInternal.callbacks?.setUser?.(i.user), i;
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/EmailApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/passwordless.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class a {
    async sendCode(t, s) {
        return this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessInit"], {
            body: {
                email: t,
                token: s
            }
        });
    }
    async loginWithCode(e, s, i, r) {
        let a = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessAuthenticate"], {
            body: {
                email: e,
                code: s,
                mode: i
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(a);
        let l = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, a, r?.embedded);
        return this._privyInternal.callbacks?.setUser?.(l.user), l;
    }
    async linkWithCode(e, t) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessLink"], {
            body: {
                email: e,
                code: t
            }
        });
        let i = await this._privyInternal.refreshSession();
        return {
            user: i.user,
            identity_token: i.identity_token
        };
    }
    async updateEmail({ oldEmailAddress: e, newEmailAddress: t, code: s }) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessUpdate"], {
            body: {
                oldAddress: e,
                newAddress: t,
                code: s
            }
        });
        let r = await this._privyInternal.refreshSession();
        return {
            user: r.user,
            identity_token: r.identity_token
        };
    }
    async unlink(e) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessUnlink"], {
            body: {
                address: e
            }
        });
        let t = await this._privyInternal.refreshSession();
        return {
            user: t.user,
            identity_token: t.identity_token
        };
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/FarcasterApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/farcaster.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class n {
    async initializeAuth({ relyingParty: t, redirectUrl: r, token: i }) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterInit"], {
            body: {
                relying_party: t,
                redirect_url: r,
                token: i
            }
        });
    }
    async getFarcasterStatus({ channel_token: e }) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterStatus"], {
            headers: {
                "farcaster-channel-token": e
            }
        });
    }
    async authenticate({ channel_token: e, message: t, signature: i, fid: s, mode: n }, l) {
        let d = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterAuthenticate"], {
            body: {
                channel_token: e,
                message: t,
                signature: i,
                fid: s,
                mode: n
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(d);
        let o = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, d, l?.embedded);
        return this._privyInternal.callbacks?.setUser?.(o.user), o;
    }
    async link({ channel_token: e, message: t, signature: r, fid: s }) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterLink"], {
            body: {
                channel_token: e,
                message: t,
                signature: r,
                fid: s
            }
        });
        let a = await this._privyInternal.refreshSession();
        return {
            user: a.user,
            identity_token: a.identity_token
        };
    }
    async unlink({ fid: e }) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterUnlink"], {
            body: {
                fid: e
            }
        });
        let t = await this._privyInternal.refreshSession();
        return {
            user: t.user,
            identity_token: t.identity_token
        };
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/FarcasterV2Api.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/farcaster.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class i {
    async initializeAuth() {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterV2Init"], {
            body: {}
        });
    }
    async authenticate({ message: e, signature: i, fid: a }, l) {
        let r = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$farcaster$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FarcasterV2Authenticate"], {
            body: {
                message: e,
                signature: i,
                fid: a
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(r);
        let d = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, r, l?.embedded);
        return this._privyInternal.callbacks?.setUser?.(d.user), d;
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/GuestApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$guest$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/guest.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class s {
    async create(s) {
        let l = await this._privyInternal.session.getOrCreateGuestCredential(), r = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$guest$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuestAuthenticate"], {
            body: {
                guest_credential: l
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(r);
        let a = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, r, s?.embedded);
        return this._privyInternal.callbacks?.setUser?.(a.user), a;
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/pkce.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CODE_VERIFIER_KEY",
    ()=>n,
    "STATE_CODE_KEY",
    ()=>t,
    "createCodeVerifier",
    ()=>i,
    "createHashBuffer",
    ()=>r,
    "createStateCode",
    ()=>c,
    "deriveCodeChallengeFromCodeVerifier",
    ()=>u,
    "randomBytes",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/jose/dist/browser/util/base64url.js [app-client] (ecmascript) <export * as base64url>");
;
const t = "privy:state_code", n = "privy:code_verifier";
async function r(e, t) {
    let n = (new TextEncoder).encode(e);
    return new Uint8Array(await t("SHA-256", n));
}
function o(e) {
    return crypto.getRandomValues(new Uint8Array(e));
}
function i() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__["base64url"].encode(o(36));
}
function c() {
    return i();
}
async function u({ codeVerifier: t, method: n = "S256", digest: o = crypto.subtle.digest.bind(crypto.subtle) }) {
    if ("S256" != n) return t;
    {
        let n = await r(t, o);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__["base64url"].encode(n);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/OAuthApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>m
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$oauth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/oauth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/pkce.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
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
class m {
    async generateURL(t, i) {
        let s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCodeVerifier"])(), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStateCode"])(), h = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveCodeChallengeFromCodeVerifier"])({
            codeVerifier: s,
            digest: this._crypto?.digest
        });
        return await Promise.all([
            this._storage.put(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"], s),
            this._storage.put(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"], r)
        ]), this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$oauth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OAuthInit"], {
            body: {
                redirect_to: i,
                provider: t,
                code_challenge: h,
                state_code: r
            }
        });
    }
    async loginWithCode(e, i, s, a, o, l) {
        let [m, p] = await Promise.all([
            this._storage.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"]),
            this._storage.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"])
        ]);
        if (p !== i) throw this._privyInternal.createAnalyticsEvent("possible_phishing_attempt", {
            flow: "oauth",
            provider: s,
            storedStateCode: p ?? "",
            returnedStateCode: i ?? ""
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            code: "pkce_state_code_mismatch",
            error: "Unexpected auth flow. This may be a phishing attempt."
        });
        let _ = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$oauth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OAuthAuthenticate"], {
            body: {
                authorization_code: e,
                code_type: a,
                state_code: p,
                code_verifier: m,
                mode: o
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(_);
        let c = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, _, l?.embedded);
        return await Promise.all([
            this._storage.del(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"]),
            this._storage.del(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"])
        ]), this._privyInternal.callbacks?.setUser?.(c.user), c;
    }
    async linkWithCode(e, t, s, a) {
        let [o, l] = await Promise.all([
            this._storage.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"]),
            this._storage.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"])
        ]);
        if (l !== t) throw this._privyInternal.createAnalyticsEvent("possible_phishing_attempt", {
            flow: "oauth",
            provider: s,
            storedStateCode: l ?? "",
            returnedStateCode: t ?? ""
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            code: "pkce_state_code_mismatch",
            error: "Unexpected auth flow. This may be a phishing attempt."
        });
        let h = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$oauth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OAuthLink"], {
            body: {
                authorization_code: e,
                code_type: a,
                state_code: l,
                code_verifier: o
            }
        });
        await this._privyInternal.session.processOAuthTokens(h.oauth_tokens);
        let m = await this._privyInternal.refreshSession();
        return await Promise.all([
            this._storage.del(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"]),
            this._storage.del(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"])
        ]), {
            user: m.user,
            identity_token: m.identity_token
        };
    }
    async unlink(e, t) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$oauth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OAuthUnlink"], {
            body: {
                provider: e,
                subject: t
            }
        });
        let i = await this._privyInternal.refreshSession();
        return {
            user: i.user,
            identity_token: i.identity_token
        };
    }
    constructor(e, t, i, s){
        this._privyInternal = e, this._embedded = t, this._storage = i, this._crypto = s;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/PasskeyApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/passkey.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class o {
    async generateRegistrationOptions(t) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasskeyLinkInit"], {
            body: {
                relying_party: t
            }
        });
    }
    async generateAuthenticationOptions(e) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasskeyAuthenticateInit"], {
            body: {
                relying_party: e
            }
        });
    }
    async generateSignupOptions(e) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasskeyRegisterInit"], {
            body: {
                relying_party: e
            }
        });
    }
    async loginWithPasskey(e, t, s, n) {
        let i = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasskeyAuthenticate"], {
            body: {
                relying_party: s,
                challenge: t,
                authenticator_response: this._transformAuthenticationResponseToSnakeCase(e)
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(i);
        let o = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, i, n?.embedded);
        return this._privyInternal.callbacks?.setUser?.(o.user), o;
    }
    async signupWithPasskey(e, t, s) {
        let a = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasskeyRegister"], {
            body: {
                relying_party: t,
                authenticator_response: this._transformRegistrationResponseToSnakeCase(e)
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(a);
        let i = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, a, s?.embedded);
        return this._privyInternal.callbacks?.setUser?.(i.user), i;
    }
    async linkWithPasskey(e, t) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasskeyLink"], {
            body: {
                relying_party: t,
                authenticator_response: this._transformRegistrationResponseToSnakeCase(e)
            }
        });
        let s = await this._privyInternal.refreshSession();
        return {
            user: s.user,
            identity_token: s.identity_token
        };
    }
    _transformRegistrationResponseToSnakeCase(e) {
        return {
            type: e.type,
            id: e.id,
            raw_id: e.rawId,
            response: {
                client_data_json: e.response.clientDataJSON,
                attestation_object: e.response.attestationObject,
                authenticator_data: e.response.authenticatorData || void 0,
                transports: e.response.transports || void 0,
                public_key: e.response.publicKey || void 0,
                public_key_algorithm: e.response.publicKeyAlgorithm || void 0
            },
            authenticator_attachment: e.authenticatorAttachment || void 0,
            client_extension_results: {
                app_id: e.clientExtensionResults.appid || void 0,
                cred_props: e.clientExtensionResults.credProps || void 0,
                hmac_create_secret: e.clientExtensionResults.hmacCreateSecret || void 0
            }
        };
    }
    _transformAuthenticationResponseToSnakeCase(e) {
        return {
            type: e.type,
            id: e.id,
            raw_id: e.rawId,
            response: {
                signature: e.response.signature,
                client_data_json: e.response.clientDataJSON,
                authenticator_data: e.response.authenticatorData,
                user_handle: e.response.userHandle || void 0
            },
            authenticator_attachment: e.authenticatorAttachment || void 0,
            client_extension_results: {
                app_id: e.clientExtensionResults.appid || void 0,
                cred_props: e.clientExtensionResults.credProps || void 0,
                hmac_create_secret: e.clientExtensionResults.hmacCreateSecret || void 0
            }
        };
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/PhoneApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/passwordless-sms.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class o {
    async sendCode(t, r) {
        return this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessSmsInit"], {
            body: {
                phoneNumber: t,
                token: r
            }
        });
    }
    async loginWithCode(e, r, i, n) {
        let o = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessSmsAuthenticate"], {
            body: {
                phoneNumber: e,
                code: r,
                mode: i
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(o);
        let a = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, o, n?.embedded);
        return this._privyInternal.callbacks?.setUser?.(a.user), a;
    }
    async linkWithCode(e, t) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessSmsLink"], {
            body: {
                phoneNumber: e,
                code: t
            }
        });
        let i = await this._privyInternal.refreshSession();
        return {
            user: i.user,
            identity_token: i.identity_token
        };
    }
    async updatePhone({ oldPhoneNumber: e, newPhoneNumber: t, code: r }) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessSmsUpdate"], {
            body: {
                old_phone_number: e,
                new_phone_number: t,
                code: r
            }
        });
        let n = await this._privyInternal.refreshSession();
        return {
            user: n.user,
            identity_token: n.identity_token
        };
    }
    async unlink(e) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasswordlessSmsUnlink"], {
            body: {
                phoneNumber: e
            }
        });
        let t = await this._privyInternal.refreshSession();
        return {
            user: t.user,
            identity_token: t.identity_token
        };
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SiweApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/siwe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class r {
    async unlinkWallet(t) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiweUnlink"], {
            body: {
                address: t
            }
        });
        let i = await this._privyInternal.refreshSession();
        return {
            user: i.user,
            identity_token: i.identity_token
        };
    }
    async linkWithSiwe(e, i, n) {
        let s = i || this._wallet, r = n || this._preparedMessage;
        if (!s) throw Error("A wallet must be provided in the init step or as an argument to linkWithSiwe");
        if (!r) throw Error("A message must be generated and signed before being used to link a wallet to privy");
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiweLink"], {
            body: {
                message: r,
                signature: e,
                chainId: s.chainId,
                walletClientType: s.walletClientType ?? null,
                connectorType: s.connectorType ?? null
            }
        });
        let a = await this._privyInternal.refreshSession();
        return {
            user: a.user,
            identity_token: a.identity_token
        };
    }
    async loginWithSiwe(e, t, n, r, a) {
        let l = t || this._wallet, o = n || this._preparedMessage;
        if (!l) throw Error("A wallet must be provided in the init step or as an argument to loginWithSiwe");
        if (!o) throw Error("A message must be generated and signed before being used to login to privy with a wallet");
        let d = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiweAuthenticate"], {
            body: {
                signature: e,
                message: o,
                chainId: l.chainId,
                walletClientType: l.walletClientType ?? null,
                connectorType: l.connectorType ?? null,
                mode: r
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(d);
        let h = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, d, a?.embedded);
        return this._privyInternal.callbacks?.setUser?.(h.user), h;
    }
    async init(e, t, i) {
        var s;
        this._wallet = e;
        let { nonce: r } = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiweInit"], {
            body: {
                address: e.address
            }
        }), a = `${(s = {
            chainId: e.chainId.toString().replace("eip155:", ""),
            address: e.address,
            issuedAt: (new Date).toISOString(),
            statement: "By signing, you are proving you own this wallet and logging in. This does not initiate a transaction or cost any fees.",
            domain: t,
            nonce: r,
            uri: i
        }).domain} wants you to sign in with your Ethereum account:\n${s.address}\n\n${s.statement}\n\nURI: ${s.uri}\nVersion: 1\nChain ID: ${s.chainId}\nNonce: ${s.nonce}\nIssued At: ${s.issuedAt}\nResources:\n- https://privy.io`;
        return this._preparedMessage = a, {
            nonce: r,
            message: a
        };
    }
    constructor(e, t){
        this._wallet = void 0, this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SiwsApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siws$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/siws.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/maybeCreateWalletOnLogin.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class r {
    async unlink({ address: t }) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siws$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiwsUnlink"], {
            body: {
                address: t
            }
        });
        let s = await this._privyInternal.refreshSession();
        return {
            user: s.user,
            identity_token: s.identity_token
        };
    }
    async link({ message: e, signature: s, walletClientType: l, connectorType: n }) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siws$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiwsLink"], {
            body: {
                message: e,
                signature: s,
                walletClientType: l ?? null,
                connectorType: n ?? null
            }
        });
        let r = await this._privyInternal.refreshSession();
        return {
            user: r.user,
            identity_token: r.identity_token
        };
    }
    async login({ mode: e, message: t, signature: l, walletClientType: r, connectorType: i, opts: a }) {
        let d = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siws$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiwsAuthenticate"], {
            body: {
                signature: l,
                message: t,
                walletClientType: r ?? null,
                connectorType: i ?? null,
                mode: e
            }
        });
        await this._privyInternal.session.updateWithTokensResponse(d);
        let o = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$maybeCreateWalletOnLogin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeCreateWalletOnLogin"])(this._embedded, d, a?.embedded);
        return this._privyInternal.callbacks?.setUser?.(o.user), o;
    }
    async fetchNonce({ address: e }) {
        let { nonce: t } = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siws$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiwsInit"], {
            body: {
                address: e
            }
        });
        return {
            nonce: t
        };
    }
    constructor(e, t){
        this._privyInternal = e, this._embedded = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SmartWalletApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/siwe.mjs [app-client] (ecmascript)");
;
class e {
    async link(t, e, i, s) {
        await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiweLinkSmartWallet"], {
            body: {
                message: t,
                signature: e,
                smart_wallet_type: i,
                smart_wallet_version: s
            }
        });
        let a = await this._privyInternal.refreshSession();
        return {
            user: a.user,
            identity_token: a.identity_token
        };
    }
    async init(n) {
        var e;
        let { nonce: i } = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$siwe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiweInit"], {
            body: {
                address: n.address
            }
        });
        return {
            nonce: i,
            message: `${(e = {
                chainId: n.chainId.toString().replace("eip155:", ""),
                address: n.address,
                issuedAt: (new Date).toISOString(),
                statement: "By signing, you are proving you own this wallet and logging in. This does not initiate a transaction or cost any fees.",
                domain: "privy.io",
                uri: "https://auth.privy.io",
                nonce: i
            }).domain} wants you to sign in with your Ethereum account:\n${e.address}\n\n${e.statement}\n\nURI: ${e.uri}\nVersion: 1\nChain ID: ${e.chainId}\nNonce: ${e.nonce}\nIssued At: ${e.issuedAt}\nResources:\n- https://privy.io`
        };
    }
    constructor(n){
        this._privyInternal = n;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/AuthApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$sessions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/sessions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$CustomProviderApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/CustomProviderApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$EmailApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/EmailApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$FarcasterApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/FarcasterApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$FarcasterV2Api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/FarcasterV2Api.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$GuestApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/GuestApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$OAuthApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/OAuthApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$PasskeyApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/PasskeyApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$PhoneApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/PhoneApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$SiweApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SiweApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$SiwsApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SiwsApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$SmartWalletApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/SmartWalletApi.mjs [app-client] (ecmascript)");
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
;
;
;
;
;
;
class d {
    async logout(e) {
        try {
            let e = await this._privyInternal.session.getRefreshToken() ?? void 0;
            await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$sessions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logout"], {
                body: {
                    refresh_token: e
                }
            });
        } catch (t) {
            console.warn("Error destroying session");
        }
        await Promise.all([
            this._privyInternal.session.destroyLocalState({
                reason: "logout"
            }),
            this._privyInternal.destroyClientAnalyticsId(),
            e?.userId && this._mfa.clearMfa({
                userId: e.userId
            })
        ]), this._privyInternal.callbacks?.setUser?.(null);
    }
    constructor(t, d, y, u, j){
        this._privyInternal = t, this._mfa = j, this.customProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$CustomProviderApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.phone = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$PhoneApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.email = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$EmailApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.oauth = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$OAuthApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d, y, u), this.guest = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$GuestApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.siwe = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$SiweApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.siws = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$SiwsApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.smartWallet = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$SmartWalletApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal), this.passkey = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$PasskeyApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.farcaster = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$FarcasterApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d), this.farcasterV2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$FarcasterV2Api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, d);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/CoinbaseOnRampApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$coinbase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/coinbase.mjs [app-client] (ecmascript)");
;
class a {
    async initOnRampSession(r) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$coinbase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoinbaseOnRampInit"], {
            body: r
        });
    }
    async getStatus(t) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$coinbase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoinbaseOnRampStatus"], {
            query: {
                partnerUserId: t
            }
        });
    }
    constructor(t){
        this._privyInternal = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/funding/moonpay.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MoonpayEnvironments",
    ()=>o,
    "chainToMoonpayCurrency",
    ()=>p,
    "fundingMethodToMoonpayPaymentMethod",
    ()=>E,
    "isSupportedChainIdForMoonpay",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/mainnet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/arbitrum.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/base.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/polygon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/avalanche.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$celo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/celo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimism$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/optimism.mjs [app-client] (ecmascript)");
;
const o = {
    prod: {
        url: "https://api.moonpay.com/v1",
        key: "pk_live_hirbpu0cVcLHrjktC9l7fbc9ctjv0SL"
    },
    sandbox: {
        url: "https://api.moonpay.com/v1",
        key: "pk_test_fqWjXZMSFwloh7orvJsRfjiUHXJqFzI"
    }
};
let d = new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygon"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalanche"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$celo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["celo"].id
]), u = new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimism$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimism"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygon"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalanche"].id
]);
function s(e, r) {
    switch(r){
        case "native-currency":
            return d.has(e);
        case "USDC":
            return u.has(e);
        default:
            return console.warn("Unknown asset passed to MoonPay Onramp"), !1;
    }
}
function p(c, o) {
    switch(c){
        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"].id:
            return "native-currency" === o ? "ETH_ARBITRUM" : "USDC_ARBITRUM";
        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalanche"].id:
            return "native-currency" === o ? "AVAX_CCHAIN" : "USDC_CCHAIN";
        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id:
            return "native-currency" === o ? "ETH_BASE" : "USDC_BASE";
        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$celo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["celo"].id:
            return "CELO_CELO";
        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygon"].id:
            return "native-currency" === o ? "MATIC_POLYGON" : "USDC_POLYGON";
        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id:
            return "native-currency" === o ? "ETH_ETHEREUM" : "USDC_ETHEREUM";
        default:
            return console.warn(`Chain ${c} not supported by Moonpay, defaulting to Ethereum mainnet`), "ETH_ETHEREUM";
    }
}
function E(e) {
    switch(e){
        case "card":
        case "payment-request":
            return "credit_debit_card";
        default:
            throw Error(`Unsupported Moonpay funding method ${e}`);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/MoonpayOnRampApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$fetch$2d$retry$2f$dist$2f$fetch$2d$retry$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/fetch-retry/dist/fetch-retry.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$moonpay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/moonpay.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$funding$2f$moonpay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/funding/moonpay.mjs [app-client] (ecmascript)");
;
;
;
;
;
class i {
    async sign(t) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$moonpay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoonpayOnRampSign"], {
            body: t
        });
    }
    async getTransactionStatus({ transactionId: r, useSandbox: i }) {
        let { url: n, key: s } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$funding$2f$moonpay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoonpayEnvironments"][i ? "sandbox" : "prod"], e = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$fetch$2d$retry$2f$dist$2f$fetch$2d$retry$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(fetch, {
            retries: 3,
            retryDelay: 500
        })(`${n}/transactions/ext/${r}?apiKey=${s}`);
        if (!e.ok) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoonpayApiError"]({
            error: `Failed to fetch transaction status for Transaction ${r}`,
            code: "failed_to_fetch_moonpay_transaction_status",
            response: e
        });
        let c = await e.json();
        return Array.isArray(c) ? c.at(0) : void 0;
    }
    constructor(t){
        this._privyInternal = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/FundingApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$funding$2f$CoinbaseOnRampApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/CoinbaseOnRampApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$funding$2f$MoonpayOnRampApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/MoonpayOnRampApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$fetch$2d$retry$2f$dist$2f$fetch$2d$retry$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/fetch-retry/dist/fetch-retry.umd.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
class i {
    constructor(i){
        this.moonpay = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$funding$2f$MoonpayOnRampApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i), this.coinbase = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$funding$2f$CoinbaseOnRampApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaPasskeyApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$mfa$2d$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/mfa-passkey.mjs [app-client] (ecmascript)");
;
class r {
    async generateAuthenticationOptions(r) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$mfa$2d$passkey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MfaPasskeyInit"], {
            body: r
        });
    }
    constructor(t){
        this._privyInternal = t;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaSmsApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$mfa$2d$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/mfa-passwordless-sms.mjs [app-client] (ecmascript)");
;
class t {
    async sendCode(t) {
        return await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$mfa$2d$passwordless$2d$sms$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MfaPasswordlessSmsInit"], {
            body: t
        });
    }
    constructor(r){
        this._privyInternal = r;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$mfa$2f$MfaPasskeyApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaPasskeyApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$mfa$2f$MfaSmsApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaSmsApi.mjs [app-client] (ecmascript)");
;
;
;
;
class i {
    setProxy(e) {
        this.proxy = e;
    }
    async getAccessTokenInternal() {
        let t = await this.privyInternal.getAccessTokenInternal();
        if (!t) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Missing access token",
            code: "attempted_rpc_call_before_logged_in"
        });
        return t;
    }
    async verifyMfa() {
        if (!this.proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_webview_not_loaded"
        });
        return await this.proxy.verifyMfa({
            accessToken: await this.getAccessTokenInternal()
        });
    }
    async initEnrollMfa(t) {
        if (!this.proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_webview_not_loaded"
        });
        return await this.proxy.initEnrollMfa({
            ...t,
            accessToken: await this.getAccessTokenInternal()
        });
    }
    async submitEnrollMfa(t) {
        if (!this.proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_webview_not_loaded"
        });
        let r = await this.proxy.submitEnrollMfa({
            ...t,
            accessToken: await this.getAccessTokenInternal()
        });
        return await this.privyInternal.refreshSession(), r;
    }
    async unenrollMfa(t) {
        if (!this.proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_webview_not_loaded"
        });
        let r = await this.proxy.unenrollMfa({
            method: t,
            accessToken: await this.getAccessTokenInternal()
        });
        return await this.privyInternal.refreshSession(), r;
    }
    async clearMfa(t) {
        if (!this.proxy) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            error: "Embedded wallet proxy not initialized",
            code: "embedded_wallet_webview_not_loaded"
        });
        return await this.proxy.clearMfa(t);
    }
    constructor(e, i){
        this.proxy = i, this.privyInternal = e, this.sms = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$mfa$2f$MfaSmsApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](e), this.passkey = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$mfa$2f$MfaPasskeyApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](e);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryICloudApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/recovery.mjs [app-client] (ecmascript)");
;
let e = class {
    async init(r) {
        return this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecoveryOAuthInitICloud"], {
            body: {
                client_type: r
            }
        });
    }
    async getICloudConfiguration(t) {
        return this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecoveryConfigurationICloud"], {
            body: {
                client_type: t
            }
        });
    }
    constructor(t){
        this._privyInternal = t;
    }
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryOAuthApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/recovery.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/Error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/pkce.mjs [app-client] (ecmascript)");
;
;
;
;
class c {
    async generateURL(e) {
        let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCodeVerifier"])(), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStateCode"])(), _ = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveCodeChallengeFromCodeVerifier"])({
            codeVerifier: r,
            digest: this._crypto?.digest
        });
        return await Promise.all([
            this._storage.put(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"], r),
            this._storage.put(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"], c)
        ]), this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecoveryOAuthInit"], {
            body: {
                redirect_to: e,
                code_challenge: _,
                state_code: c
            }
        });
    }
    async authorize(t, i) {
        let [o, a] = await Promise.all([
            this._storage.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"]),
            this._storage.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"])
        ]);
        if (a !== i) throw this._privyInternal.createAnalyticsEvent("possible_phishing_attempt", {
            flow: "recovery_oauth",
            storedStateCode: a ?? "",
            returnedStateCode: i ?? ""
        }), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$Error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyClientError"]({
            code: "pkce_state_code_mismatch",
            error: "Unexpected auth flow. This may be a phishing attempt."
        });
        let c = await this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecoveryOAuthAuthenticate"], {
            body: {
                authorization_code: t,
                state_code: a,
                code_verifier: o
            }
        });
        return await Promise.all([
            this._storage.del(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CODE_VERIFIER_KEY"]),
            this._storage.del(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$pkce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_CODE_KEY"])
        ]), c;
    }
    constructor(t, e, r){
        this._privyInternal = t, this._storage = e, this._crypto = r;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryApi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/recovery.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$recovery$2f$RecoveryICloudApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryICloudApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$recovery$2f$RecoveryOAuthApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryOAuthApi.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
class i {
    async getRecoveryKeyMaterial(t, e) {
        return this._privyInternal.fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$recovery$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecoveryKeyMaterial"], {
            body: {
                chain_type: e
            },
            params: {
                address: t
            }
        });
    }
    constructor(r, i, o){
        this._privyInternal = r, this.auth = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$recovery$2f$RecoveryOAuthApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, i, o), this.icloudAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$recovery$2f$RecoveryICloudApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/Privy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$AppApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/AppApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$CrossAppApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/CrossAppApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$DelegatedWalletsApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/DelegatedWalletsApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$EmbeddedWalletApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/EmbeddedWalletApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$MfaPromises$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/MfaPromises.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$PrivyInternal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/PrivyInternal.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$UserApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/UserApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$AuthApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/auth/AuthApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$funding$2f$FundingApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/funding/FundingApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$mfa$2f$MfaApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/mfa/MfaApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$recovery$2f$RecoveryApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/client/recovery/RecoveryApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$fetch$2d$retry$2f$dist$2f$fetch$2d$retry$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/fetch-retry/dist/fetch-retry.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
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
class d {
    async initialize() {
        await this._privyInternal._initialize();
    }
    setMessagePoster(e) {
        this.embeddedWallet.setMessagePoster(e);
    }
    addOAuthTokensListener(e) {
        return this._privyInternal.session.on("oauth_tokens_granted", e), {
            unsubscribe: ()=>{
                this._privyInternal.session.removeListener("oauth_tokens_granted", e);
            }
        };
    }
    setCallbacks(e) {
        this._privyInternal.setCallbacks(e);
    }
    getAccessToken() {
        return this._privyInternal.getAccessToken();
    }
    getIdentityToken() {
        return this._privyInternal.getIdentityToken();
    }
    getCompiledPath(e, t) {
        return this._privyInternal.getPath(e, t);
    }
    async fetchPrivyRoute(e, t) {
        return this._privyInternal.fetch(e, t);
    }
    get logger() {
        return this._privyInternal.logger;
    }
    constructor({ clientId: d, ...h }){
        this._privyInternal = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$PrivyInternal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivyInternal"]({
            ...h,
            appClientId: d
        }), this.mfa = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$mfa$2f$MfaApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal), this.mfaPromises = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$MfaPromises$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], this.app = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$AppApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal), this.embeddedWallet = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$EmbeddedWalletApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, h.embeddedWalletMessagePoster, h.supportedChains, this.mfa, this.mfaPromises, this.app), this.user = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$UserApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal), this.auth = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$auth$2f$AuthApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, this.embeddedWallet, h.storage, h.crypto, this.mfa), this.recovery = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$recovery$2f$RecoveryApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, h.storage, h.crypto), this.funding = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$funding$2f$FundingApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal), this.delegated = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$DelegatedWalletsApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal), this.crossApp = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$client$2f$CrossAppApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this._privyInternal, h.storage);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/get-wallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWallet",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/wallet-api.mjs [app-client] (ecmascript)");
;
async function r(r, { wallet_id: i }) {
    return await r.fetchPrivyRoute(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletGet"], {
        params: {
            wallet_id: i
        }
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/update-wallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateWallet",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/routes/dist/esm/wallet-api.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$generate$2d$authorization$2d$signature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/wallet-api/generate-authorization-signature.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$canonicalize$2f$lib$2f$canonicalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/canonicalize/lib/canonicalize.js [app-client] (ecmascript)");
;
;
;
;
async function t(t, { wallet_id: i }, e, o) {
    let p = {
        version: 1,
        url: t.getCompiledPath(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletUpdate"], {
            params: {
                wallet_id: i
            }
        }),
        method: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletUpdate"].method,
        headers: {
            "privy-app-id": t.app.appId
        },
        body: o
    }, { signature: m } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$wallet$2d$api$2f$generate$2d$authorization$2d$signature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAuthorizationSignature"])(e, p);
    return await t.fetchPrivyRoute(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$routes$2f$dist$2f$esm$2f$wallet$2d$api$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletUpdate"], {
        params: {
            wallet_id: i
        },
        body: o,
        headers: {
            "privy-authorization-signature": m
        }
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/solana/ConnectedStandardSolanaWallet.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectedStandardSolanaWallet",
    ()=>r
]);
function n(n, t) {
    if (!Object.prototype.hasOwnProperty.call(n, t)) throw TypeError("attempted to use private field on non-instance");
    return n;
}
var t = 0;
function s(n) {
    return "__private_" + t++ + "_" + n;
}
var a = /*#__PURE__*/ s("_wallet"), e = /*#__PURE__*/ s("_account");
class r {
    get standardWallet() {
        return n(this, a)[a];
    }
    get address() {
        return n(this, e)[e].address;
    }
    async disconnect() {
        if (!n(this, a)[a].features["standard:disconnect"]?.disconnect) throw Error("Wallet does not support disconnect");
        await n(this, a)[a].features["standard:disconnect"].disconnect();
    }
    async signMessage(...t) {
        if (!n(this, a)[a].features["solana:signMessage"]?.signMessage) throw Error("Wallet does not support signMessage");
        let s = await n(this, a)[a].features["solana:signMessage"].signMessage(...t.map((t)=>({
                ...t,
                account: n(this, e)[e]
            })));
        return 1 === t.length ? s[0] : [
            ...s
        ];
    }
    async signTransaction(...t) {
        if (!n(this, a)[a].features["solana:signTransaction"]?.signTransaction) throw Error("Wallet does not support signTransaction");
        let s = await n(this, a)[a].features["solana:signTransaction"].signTransaction(...t.map((t)=>({
                ...t,
                account: n(this, e)[e]
            })));
        return 1 === t.length ? s[0] : [
            ...s
        ];
    }
    async signAndSendTransaction(...t) {
        if (!n(this, a)[a].features["solana:signAndSendTransaction"]?.signAndSendTransaction) throw Error("Wallet does not support signAndSendTransaction");
        let s = await n(this, a)[a].features["solana:signAndSendTransaction"].signAndSendTransaction(...t.map((t)=>({
                ...t,
                account: n(this, e)[e]
            })));
        return 1 === t.length ? s[0] : [
            ...s
        ];
    }
    async signAndSendAllTransactions(t) {
        if (!n(this, a)[a].features["solana:signAndSendTransaction"]?.signAndSendTransaction) throw Error("Wallet does not support signAndSendTransaction");
        return [
            ...await n(this, a)[a].features["solana:signAndSendTransaction"].signAndSendTransaction(...t.map((t)=>({
                    ...t,
                    account: n(this, e)[e]
                })))
        ];
    }
    constructor({ wallet: t, account: s }){
        Object.defineProperty(this, a, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, e, {
            writable: !0,
            value: void 0
        }), n(this, a)[a] = t, n(this, e)[e] = s;
    }
}
;
}),
]);

//# sourceMappingURL=1b50e_%40privy-io_js-sdk-core_dist_esm_7d72168b._.js.map