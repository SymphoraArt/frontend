(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/inMemoryStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inMemoryStorage",
    ()=>inMemoryStorage
]);
const store = new Map();
const inMemoryStorage = {
    getItem: async (key)=>{
        return store.get(key) ?? null;
    },
    removeItem: async (key)=>{
        store.delete(key);
    },
    setItem: async (key, value)=>{
        store.set(key, value);
    }
}; //# sourceMappingURL=inMemoryStorage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/get-enclave-user-status.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserStatus",
    ()=>getUserStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
;
;
async function getUserStatus({ authToken, client, ecosystem }) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/2024-05-05/accounts`, {
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json"
        },
        method: "GET"
    });
    if (!response.ok) {
        const result = await response.text().catch(()=>{
            return "Unknown error";
        });
        throw new Error(`Failed to get user info: ${result}`);
    }
    return await response.json();
} //# sourceMappingURL=get-enclave-user-status.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/native/helpers/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_SHARE_INDEX",
    ()=>AUTH_SHARE_INDEX,
    "AWS_REGION",
    ()=>AWS_REGION,
    "COGNITO_IDENTITY_POOL_ID",
    ()=>COGNITO_IDENTITY_POOL_ID,
    "DEVICE_SHARE_INDEX",
    ()=>DEVICE_SHARE_INDEX,
    "DEVICE_SHARE_MISSING_MESSAGE",
    ()=>DEVICE_SHARE_MISSING_MESSAGE,
    "ENCLAVE_KMS_KEY_ARN",
    ()=>ENCLAVE_KMS_KEY_ARN,
    "GENERATE_RECOVERY_PASSWORD_LAMBDA_FUNCTION_V1",
    ()=>GENERATE_RECOVERY_PASSWORD_LAMBDA_FUNCTION_V1,
    "GENERATE_RECOVERY_PASSWORD_LAMBDA_FUNCTION_V2",
    ()=>GENERATE_RECOVERY_PASSWORD_LAMBDA_FUNCTION_V2,
    "INVALID_DEVICE_SHARE_MESSAGE",
    ()=>INVALID_DEVICE_SHARE_MESSAGE,
    "RECOVERY_SHARE_INDEX",
    ()=>RECOVERY_SHARE_INDEX,
    "ROUTE_AUTH_COGNITO_ID_TOKEN_V1",
    ()=>ROUTE_AUTH_COGNITO_ID_TOKEN_V1,
    "ROUTE_AUTH_COGNITO_ID_TOKEN_V2",
    ()=>ROUTE_AUTH_COGNITO_ID_TOKEN_V2,
    "ROUTE_AUTH_ENDPOINT_CALLBACK",
    ()=>ROUTE_AUTH_ENDPOINT_CALLBACK,
    "ROUTE_AUTH_JWT_CALLBACK",
    ()=>ROUTE_AUTH_JWT_CALLBACK,
    "ROUTE_COGNITO_IDENTITY_POOL_URL",
    ()=>ROUTE_COGNITO_IDENTITY_POOL_URL,
    "ROUTE_EMBEDDED_WALLET_DETAILS",
    ()=>ROUTE_EMBEDDED_WALLET_DETAILS,
    "ROUTE_GET_USER_SHARES",
    ()=>ROUTE_GET_USER_SHARES,
    "ROUTE_STORE_USER_SHARES",
    ()=>ROUTE_STORE_USER_SHARES,
    "ROUTE_VERIFY_THIRDWEB_CLIENT_ID",
    ()=>ROUTE_VERIFY_THIRDWEB_CLIENT_ID,
    "THIRDWEB_SESSION_NONCE_HEADER",
    ()=>THIRDWEB_SESSION_NONCE_HEADER
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
;
const AUTH_SHARE_ID = 3;
const AUTH_SHARE_INDEX = AUTH_SHARE_ID - 1;
const DEVICE_SHARE_ID = 1;
const DEVICE_SHARE_INDEX = DEVICE_SHARE_ID - 1;
const DEVICE_SHARE_MISSING_MESSAGE = "Missing device share.";
const INVALID_DEVICE_SHARE_MESSAGE = "Invalid private key reconstructed from shares";
const RECOVERY_SHARE_ID = 2;
const RECOVERY_SHARE_INDEX = RECOVERY_SHARE_ID - 1;
const AWS_REGION = "us-west-2";
const THIRDWEB_SESSION_NONCE_HEADER = "x-session-nonce";
const COGNITO_USER_POOL_ID = "us-west-2_UFwLcZIpq";
const COGNITO_IDENTITY_POOL_ID = "us-west-2:2ad7ab1e-f48b-48a6-adfa-ac1090689c26";
const GENERATE_RECOVERY_PASSWORD_LAMBDA_FUNCTION_V1 = "arn:aws:lambda:us-west-2:324457261097:function:recovery-share-password-GenerateRecoverySharePassw-bbE5ZbVAToil";
const GENERATE_RECOVERY_PASSWORD_LAMBDA_FUNCTION_V2 = "arn:aws:lambda:us-west-2:324457261097:function:lambda-thirdweb-auth-enc-key-prod-ThirdwebAuthEncKeyFunction";
const ENCLAVE_KMS_KEY_ARN = "arn:aws:kms:us-west-2:324457261097:key/ccfb9ecd-f45d-4f37-864a-25fe72dcb49e";
// TODO allow overriding domain
const DOMAIN_URL_2023 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet");
const BASE_URL_2023 = `${DOMAIN_URL_2023}/`;
const ROUTE_2023_10_20_API_BASE_PATH = `${BASE_URL_2023}api/2023-10-20`;
const ROUTE_2024_05_05_API_BASE_PATH = `${BASE_URL_2023}api/2024-05-05`;
const ROUTE_EMBEDDED_WALLET_DETAILS = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/embedded-wallet-user-details`;
const ROUTE_COGNITO_IDENTITY_POOL_URL = `cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;
const ROUTE_STORE_USER_SHARES = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/embedded-wallet-shares`;
const ROUTE_GET_USER_SHARES = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/embedded-wallet-shares`;
const ROUTE_VERIFY_THIRDWEB_CLIENT_ID = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/verify-thirdweb-client-id`;
const ROUTE_AUTH_JWT_CALLBACK = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/validate-custom-jwt`;
const ROUTE_AUTH_ENDPOINT_CALLBACK = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/validate-custom-auth-endpoint`;
const ROUTE_AUTH_COGNITO_ID_TOKEN_V1 = `${ROUTE_2023_10_20_API_BASE_PATH}/embedded-wallet/cognito-id-token`;
const ROUTE_AUTH_COGNITO_ID_TOKEN_V2 = `${ROUTE_2024_05_05_API_BASE_PATH}/login/web-token-exchange`; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/native/helpers/errors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorMessages",
    ()=>ErrorMessages,
    "createErrorMessage",
    ()=>createErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
const ErrorMessages = {
    invalidOtp: "Your OTP code is invalid or expired. Please request a new code or try again.",
    missingRecoveryCode: "Missing encryption key for user"
};
const createErrorMessage = (message, error)=>{
    if (error instanceof Error) {
        return `${message}: ${error.message}`;
    }
    return `${message}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(error)}`;
}; //# sourceMappingURL=errors.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/authEndpoint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authEndpoint",
    ()=>authEndpoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/native/helpers/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/native/helpers/errors.js [app-client] (ecmascript)");
;
;
;
;
async function authEndpoint(args) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(args.client, args.ecosystem);
    const res = await clientFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTE_AUTH_ENDPOINT_CALLBACK"], {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            developerClientId: args.client.clientId,
            payload: args.payload
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Custom auth endpoint authentication error: ${error.message}`);
    }
    try {
        const { verifiedToken } = await res.json();
        return {
            storedToken: verifiedToken
        };
    } catch (e) {
        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createErrorMessage"])("Malformed response from post auth_endpoint authentication", e));
    }
} //# sourceMappingURL=authEndpoint.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "socialAuthOptions",
    ()=>socialAuthOptions
]);
const socialAuthOptions = [
    "google",
    "apple",
    "facebook",
    "discord",
    "line",
    "x",
    "tiktok",
    "epic",
    "coinbase",
    "farcaster",
    "telegram",
    "github",
    "twitch",
    "steam"
];
const authOptions = [
    ...socialAuthOptions,
    "guest",
    "backend",
    "email",
    "phone",
    "passkey",
    "wallet"
]; //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/getLoginPath.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLoginCallbackUrl",
    ()=>getLoginCallbackUrl,
    "getLoginUrl",
    ()=>getLoginUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/types.js [app-client] (ecmascript)");
;
;
const getLoginOptionRoute = (option)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authOptions"].includes(option)) {
        throw new Error(`Unknown auth option ${option}`);
    }
    switch(option){
        case "wallet":
            return "siwe";
        default:
            return option;
    }
};
const getLoginUrl = ({ authOption, client, ecosystem, mode = "popup", redirectUrl })=>{
    if (mode === "popup" && redirectUrl) {
        throw new Error("Redirect URL is not supported for popup mode");
    }
    if (mode === "window" && !redirectUrl) {
        throw new Error("Redirect URL is required for window mode");
    }
    const route = getLoginOptionRoute(authOption);
    let baseUrl = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/2024-05-05/login/${route}?clientId=${client.clientId}`;
    if (ecosystem?.partnerId) {
        baseUrl = `${baseUrl}&ecosystemId=${ecosystem.id}&ecosystemPartnerId=${ecosystem.partnerId}`;
    } else if (ecosystem) {
        baseUrl = `${baseUrl}&ecosystemId=${ecosystem.id}`;
    }
    // Always append redirectUrl to the baseUrl if mode is not popup
    if (mode !== "popup") {
        const formattedRedirectUrl = new URL(redirectUrl || window.location.href);
        formattedRedirectUrl.searchParams.set("walletId", ecosystem?.id || "inApp");
        formattedRedirectUrl.searchParams.set("authProvider", authOption);
        baseUrl = `${baseUrl}&redirectUrl=${encodeURIComponent(formattedRedirectUrl.toString())}`;
    }
    return baseUrl;
};
const getLoginCallbackUrl = ({ authOption, client, ecosystem })=>{
    const route = getLoginOptionRoute(authOption);
    let baseUrl = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/2024-05-05/login/${route}/callback?clientId=${client.clientId}`;
    if (ecosystem?.partnerId) {
        baseUrl = `${baseUrl}&ecosystemId=${ecosystem.id}&ecosystemPartnerId=${ecosystem.partnerId}`;
    } else if (ecosystem) {
        baseUrl = `${baseUrl}&ecosystemId=${ecosystem.id}`;
    }
    return baseUrl;
}; //# sourceMappingURL=getLoginPath.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/backend.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "backendAuthenticate",
    ()=>backendAuthenticate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/getLoginPath.js [app-client] (ecmascript)");
;
;
;
async function backendAuthenticate(args) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(args.client, args.ecosystem);
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginUrl"])({
        authOption: "backend",
        client: args.client,
        ecosystem: args.ecosystem
    });
    const res = await clientFetch(`${path}`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            walletSecret: args.walletSecret
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to generate backend account: ${error}`);
    }
    return await res.json();
} //# sourceMappingURL=backend.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/constants/settings.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "AUTH_TOKEN_LOCAL_STORAGE_NAME",
    ()=>AUTH_TOKEN_LOCAL_STORAGE_NAME,
    "DEVICE_SHARE_LOCAL_STORAGE_NAME",
    ()=>DEVICE_SHARE_LOCAL_STORAGE_NAME,
    "GUEST_SESSION_LOCAL_STORAGE_NAME",
    ()=>GUEST_SESSION_LOCAL_STORAGE_NAME,
    "IN_APP_WALLET_PATH",
    ()=>IN_APP_WALLET_PATH,
    "PASSKEY_CREDENTIAL_ID_LOCAL_STORAGE_NAME",
    ()=>PASSKEY_CREDENTIAL_ID_LOCAL_STORAGE_NAME,
    "WALLET_CONNECT_SESSIONS_LOCAL_STORAGE_NAME",
    ()=>WALLET_CONNECT_SESSIONS_LOCAL_STORAGE_NAME,
    "WALLET_USER_DETAILS_LOCAL_STORAGE_NAME",
    ()=>WALLET_USER_DETAILS_LOCAL_STORAGE_NAME,
    "WALLET_USER_ID_LOCAL_STORAGE_NAME",
    ()=>WALLET_USER_ID_LOCAL_STORAGE_NAME
]);
const IN_APP_WALLET_PATH = "/sdk/2022-08-12/embedded-wallet";
const WALLET_USER_DETAILS_LOCAL_STORAGE_NAME = (key)=>`thirdwebEwsWalletUserDetails-${key}`;
const WALLET_USER_ID_LOCAL_STORAGE_NAME = (cliekeytId)=>`thirdwebEwsWalletUserId-${cliekeytId}`;
/**
 * @internal
 */ const AUTH_TOKEN_LOCAL_STORAGE_PREFIX = "walletToken";
const AUTH_TOKEN_LOCAL_STORAGE_NAME = (key)=>{
    return `${AUTH_TOKEN_LOCAL_STORAGE_PREFIX}-${key}`;
};
const PASSKEY_CREDENTIAL_ID_LOCAL_STORAGE_NAME = (key)=>{
    return `passkey-credential-id-${key}`;
};
/**
 * @internal
 */ const DEVICE_SHARE_LOCAL_STORAGE_PREFIX = "a";
const DEVICE_SHARE_LOCAL_STORAGE_NAME = (key, userId)=>`${DEVICE_SHARE_LOCAL_STORAGE_PREFIX}-${key}-${userId}`;
const WALLET_CONNECT_SESSIONS_LOCAL_STORAGE_NAME = (key)=>`walletConnectSessions-${key}`;
const GUEST_SESSION_LOCAL_STORAGE_NAME = (key)=>`thirdweb_guest_session_id_${key}`; //# sourceMappingURL=settings.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/client-scoped-storage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientScopedStorage",
    ()=>ClientScopedStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/constants/settings.js [app-client] (ecmascript)");
;
const data = new Map();
class ClientScopedStorage {
    /**
     * @internal
     */ constructor({ storage, clientId, ecosystem }){
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "storage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.storage = storage;
        this.key = getLocalStorageKey(clientId, ecosystem?.id);
        this.ecosystem = ecosystem;
    }
    async getItem(key) {
        if (this.storage) {
            return this.storage.getItem(key);
        }
        return data.get(key) ?? null;
    }
    async setItem(key, value) {
        if (this.storage) {
            return this.storage.setItem(key, value);
        }
        data.set(key, value);
    }
    async removeItem(key) {
        const item = await this.getItem(key);
        if (this.storage && item) {
            this.storage.removeItem(key);
            return true;
        }
        return false;
    }
    /**
     * @internal
     */ async getWalletConnectSessions() {
        return this.getItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_CONNECT_SESSIONS_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async saveWalletConnectSessions(stringifiedSessions) {
        await this.setItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_CONNECT_SESSIONS_LOCAL_STORAGE_NAME"])(this.key), stringifiedSessions);
    }
    /**
     * @internal
     */ async savePasskeyCredentialId(id) {
        await this.setItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PASSKEY_CREDENTIAL_ID_LOCAL_STORAGE_NAME"])(this.key), id);
    }
    /**
     * @internal
     */ async getPasskeyCredentialId() {
        return this.getItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PASSKEY_CREDENTIAL_ID_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async saveAuthCookie(cookie) {
        await this.setItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_LOCAL_STORAGE_NAME"])(this.key), cookie);
    }
    /**
     * @internal
     */ async getAuthCookie() {
        return this.getItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async removeAuthCookie() {
        return this.removeItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async saveDeviceShare(share, userId) {
        await this.saveWalletUserId(userId);
        await this.setItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEVICE_SHARE_LOCAL_STORAGE_NAME"])(this.key, userId), share);
    }
    /**
     * @internal
     */ async getDeviceShare() {
        const userId = await this.getWalletUserId();
        if (userId) {
            return this.getItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEVICE_SHARE_LOCAL_STORAGE_NAME"])(this.key, userId));
        }
        return null;
    }
    /**
     * @internal
     */ async removeDeviceShare() {
        const userId = await this.getWalletUserId();
        if (userId) {
            return this.removeItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEVICE_SHARE_LOCAL_STORAGE_NAME"])(this.key, userId));
        }
        return false;
    }
    /**
     * @internal
     */ async getWalletUserId() {
        return this.getItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_USER_ID_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async saveWalletUserId(userId) {
        await this.setItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_USER_ID_LOCAL_STORAGE_NAME"])(this.key), userId);
    }
    /**
     * @internal
     */ async removeWalletUserId() {
        return this.removeItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_USER_ID_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async getGuestSessionId() {
        return this.getItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GUEST_SESSION_LOCAL_STORAGE_NAME"])(this.key));
    }
    /**
     * @internal
     */ async saveGuestSessionId(sessionId) {
        await this.setItem((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GUEST_SESSION_LOCAL_STORAGE_NAME"])(this.key), sessionId);
    }
}
const getLocalStorageKey = (clientId, ecosystemId)=>{
    return `${clientId}${ecosystemId ? `-${ecosystemId}` : ""}`;
}; //# sourceMappingURL=client-scoped-storage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/guest.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "guestAuthenticate",
    ()=>guestAuthenticate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/getLoginPath.js [app-client] (ecmascript)");
;
;
;
;
async function guestAuthenticate(args) {
    let sessionId = await args.storage.getGuestSessionId();
    if (!sessionId) {
        sessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytesHex"])(32);
        args.storage.saveGuestSessionId(sessionId);
    }
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(args.client, args.ecosystem);
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginCallbackUrl"])({
        authOption: "guest",
        client: args.client,
        ecosystem: args.ecosystem
    });
    const res = await clientFetch(`${path}`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            sessionId
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to generate guest account: ${res.status} ${res.statusText} ${error}`);
    }
    return await res.json();
} //# sourceMappingURL=guest.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/jwt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customJwt",
    ()=>customJwt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/native/helpers/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/native/helpers/errors.js [app-client] (ecmascript)");
;
;
;
;
async function customJwt(args) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(args.client, args.ecosystem);
    const res = await clientFetch(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTE_AUTH_JWT_CALLBACK"], {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            developerClientId: args.client.clientId,
            jwt: args.jwt
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(`JWT authentication error: ${error.message}`);
    }
    try {
        const { verifiedToken } = await res.json();
        return {
            storedToken: verifiedToken
        };
    } catch (e) {
        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$native$2f$helpers$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createErrorMessage"])("Malformed response from post jwt authentication", e));
    }
} //# sourceMappingURL=jwt.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/linkAccount.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLinkedProfilesInternal",
    ()=>getLinkedProfilesInternal,
    "linkAccount",
    ()=>linkAccount,
    "unlinkAccount",
    ()=>unlinkAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
async function linkAccount({ client, ecosystem, tokenToLink, storage }) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const IN_APP_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet");
    const currentAccountToken = await storage.getAuthCookie();
    if (!currentAccountToken) {
        throw new Error("Failed to link account, no user logged in");
    }
    const headers = {
        Authorization: `Bearer iaw-auth-token:${currentAccountToken}`,
        "Content-Type": "application/json"
    };
    const linkedDetailsResp = await clientFetch(`${IN_APP_URL}/api/2024-05-05/account/connect`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            accountAuthTokenToConnect: tokenToLink
        }),
        headers,
        method: "POST"
    });
    if (!linkedDetailsResp.ok) {
        const body = await linkedDetailsResp.json();
        throw new Error(body.message || "Failed to link account.");
    }
    const { linkedAccounts } = await linkedDetailsResp.json();
    return linkedAccounts ?? [];
}
async function unlinkAccount({ client, ecosystem, profileToUnlink, allowAccountDeletion = false, storage }) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const IN_APP_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet");
    const currentAccountToken = await storage.getAuthCookie();
    if (!currentAccountToken) {
        throw new Error("Failed to unlink account, no user logged in");
    }
    const headers = {
        Authorization: `Bearer iaw-auth-token:${currentAccountToken}`,
        "Content-Type": "application/json"
    };
    const linkedDetailsResp = await clientFetch(`${IN_APP_URL}/api/2024-05-05/account/disconnect`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            allowAccountDeletion,
            details: profileToUnlink.details,
            type: profileToUnlink.type
        }),
        headers,
        method: "POST"
    });
    if (!linkedDetailsResp.ok) {
        const body = await linkedDetailsResp.json();
        throw new Error(body.message || "Failed to unlink account.");
    }
    const { linkedAccounts } = await linkedDetailsResp.json();
    return linkedAccounts ?? [];
}
async function getLinkedProfilesInternal({ client, ecosystem, storage }) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const IN_APP_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet");
    const currentAccountToken = await storage.getAuthCookie();
    if (!currentAccountToken) {
        throw new Error("Failed to get linked accounts, no user logged in");
    }
    const headers = {
        Authorization: `Bearer iaw-auth-token:${currentAccountToken}`,
        "Content-Type": "application/json"
    };
    const linkedAccountsResp = await clientFetch(`${IN_APP_URL}/api/2024-05-05/accounts`, {
        headers,
        method: "GET"
    });
    if (!linkedAccountsResp.ok) {
        const body = await linkedAccountsResp.json();
        throw new Error(body.message || "Failed to get linked accounts.");
    }
    const { linkedAccounts } = await linkedAccountsResp.json();
    return linkedAccounts ?? [];
} //# sourceMappingURL=linkAccount.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/passkeys.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginWithPasskey",
    ()=>loginWithPasskey,
    "registerPasskey",
    ()=>registerPasskey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
function getVerificationPath() {
    return `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/2024-05-05/login/passkey/callback`;
}
function getChallengePath(type, username) {
    return `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/2024-05-05/login/passkey?type=${type}${username ? `&username=${username}` : ""}`;
}
async function registerPasskey(options) {
    if (!options.passkeyClient.isAvailable()) {
        throw new Error("Passkeys are not available on this device");
    }
    const fetchWithId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(options.client, options.ecosystem);
    const generatedName = options.username ?? generateUsername(options.ecosystem);
    // 1. request challenge from  server
    const res = await fetchWithId(getChallengePath("sign-up", generatedName));
    const challengeData = await res.json();
    if (!challengeData.challenge) {
        throw new Error("No challenge received");
    }
    const challenge = challengeData.challenge;
    // 2. initiate registration
    const registration = await options.passkeyClient.register({
        challenge,
        name: generatedName,
        rp: options.rp
    });
    const customHeaders = {};
    if (options.ecosystem?.partnerId) {
        customHeaders["x-ecosystem-partner-id"] = options.ecosystem.partnerId;
    }
    if (options.ecosystem?.id) {
        customHeaders["x-ecosystem-id"] = options.ecosystem.id;
    }
    // 3. send the registration object to the server
    const verifRes = await fetchWithId(getVerificationPath(), {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            authenticatorData: registration.authenticatorData,
            clientData: registration.clientData,
            credential: {
                algorithm: registration.credential.algorithm,
                publicKey: registration.credential.publicKey
            },
            credentialId: registration.credentialId,
            origin: registration.origin,
            rpId: options.rp.id,
            serverVerificationId: challengeData.serverVerificationId,
            type: "sign-up",
            username: generatedName
        }),
        headers: {
            "Content-Type": "application/json",
            ...customHeaders
        },
        method: "POST"
    });
    const verifData = await verifRes.json();
    if (!verifData || !verifData.storedToken) {
        throw new Error(`Error verifying passkey: ${verifData.message ?? "unknown error"}`);
    }
    // 4. store the credentialId in local storage
    await options.storage?.savePasskeyCredentialId(registration.credentialId);
    // 5. returns back the IAW authentication token
    return verifData;
}
async function loginWithPasskey(options) {
    if (!options.passkeyClient.isAvailable()) {
        throw new Error("Passkeys are not available on this device");
    }
    const fetchWithId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(options.client, options.ecosystem);
    // 1. request challenge from  server/iframe
    const [challengeData, credentialId] = await Promise.all([
        fetchWithId(getChallengePath("sign-in")).then((r)=>r.json()),
        options.storage?.getPasskeyCredentialId()
    ]);
    if (!challengeData.challenge) {
        throw new Error("No challenge received");
    }
    const challenge = challengeData.challenge;
    // 2. initiate login
    const authentication = await options.passkeyClient.authenticate({
        challenge,
        credentialId: credentialId ?? undefined,
        rp: options.rp
    });
    const customHeaders = {};
    if (options.ecosystem?.partnerId) {
        customHeaders["x-ecosystem-partner-id"] = options.ecosystem.partnerId;
    }
    if (options.ecosystem?.id) {
        customHeaders["x-ecosystem-id"] = options.ecosystem.id;
    }
    const verifRes = await fetchWithId(getVerificationPath(), {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            authenticatorData: authentication.authenticatorData,
            clientData: authentication.clientData,
            credentialId: authentication.credentialId,
            origin: authentication.origin,
            rpId: options.rp.id,
            serverVerificationId: challengeData.serverVerificationId,
            signature: authentication.signature,
            type: "sign-in"
        }),
        headers: {
            "Content-Type": "application/json",
            ...customHeaders
        },
        method: "POST"
    });
    const verifData = await verifRes.json();
    if (!verifData || !verifData.storedToken) {
        throw new Error(`Error verifying passkey: ${verifData.message ?? "unknown error"}`);
    }
    // 5. store the credentialId in local storage
    await options.storage?.savePasskeyCredentialId(authentication.credentialId);
    // 6. return the auth'd user type
    return verifData;
}
function generateUsername(ecosystem) {
    return `${ecosystem?.id ?? "wallet"}-${new Date().toISOString()}`;
} //# sourceMappingURL=passkeys.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/create-login-message.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create an EIP-4361 & CAIP-122 compliant message to sign based on the login payload
 * @param payload - The login payload containing the necessary information.
 * @returns The generated login message.
 * @internal
 */ __turbopack_context__.s([
    "createLoginMessage",
    ()=>createLoginMessage
]);
function createLoginMessage(payload) {
    const typeField = "Ethereum";
    const header = `${payload.domain} wants you to sign in with your ${typeField} account:`;
    let prefix = [
        header,
        payload.address
    ].join("\n");
    prefix = [
        prefix,
        payload.statement
    ].join("\n\n");
    if (payload.statement) {
        prefix += "\n";
    }
    const suffixArray = [];
    if (payload.uri) {
        const uriField = `URI: ${payload.uri}`;
        suffixArray.push(uriField);
    }
    const versionField = `Version: ${payload.version}`;
    suffixArray.push(versionField);
    if (payload.chain_id) {
        const chainField = `Chain ID: ${payload.chain_id}` || "1";
        suffixArray.push(chainField);
    }
    const nonceField = `Nonce: ${payload.nonce}`;
    suffixArray.push(nonceField);
    const issuedAtField = `Issued At: ${payload.issued_at}`;
    suffixArray.push(issuedAtField);
    const expiryField = `Expiration Time: ${payload.expiration_time}`;
    suffixArray.push(expiryField);
    if (payload.invalid_before) {
        const invalidBeforeField = `Not Before: ${payload.invalid_before}`;
        suffixArray.push(invalidBeforeField);
    }
    if (payload.resources) {
        suffixArray.push([
            "Resources:",
            ...payload.resources.map((x)=>`- ${x}`)
        ].join("\n"));
    }
    const suffix = suffixArray.join("\n");
    return [
        prefix,
        suffix
    ].join("\n");
} //# sourceMappingURL=create-login-message.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/sign-login-payload.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signLoginPayload",
    ()=>signLoginPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$core$2f$create$2d$login$2d$message$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/create-login-message.js [app-client] (ecmascript)");
;
async function signLoginPayload(options) {
    const { payload, account } = options;
    const signature = await account.signMessage({
        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$core$2f$create$2d$login$2d$message$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLoginMessage"])(payload)
    });
    return {
        payload,
        signature
    };
} //# sourceMappingURL=sign-login-payload.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/siwe.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "siweAuthenticate",
    ()=>siweAuthenticate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$core$2f$sign$2d$login$2d$payload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/sign-login-payload.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/getLoginPath.js [app-client] (ecmascript)");
;
;
;
;
;
// wallets that cannot sign with ethereum mainnet, require a specific chain always
const NON_ETHEREUM_WALLETS = [
    "xyz.abs"
];
async function siweAuthenticate(args) {
    const { wallet, client, ecosystem, chain } = args;
    const siweChain = NON_ETHEREUM_WALLETS.includes(wallet.id) ? chain || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(1) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(1); // fallback to mainnet for SIWE for wide wallet compatibility
    // only connect if the wallet doesn't alnready have an account
    const account = wallet.getAccount() || await wallet.connect({
        chain: siweChain,
        client
    });
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const payload = await (async ()=>{
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginUrl"])({
            authOption: "wallet",
            client: args.client,
            ecosystem: args.ecosystem
        });
        const res = await clientFetch(`${path}&address=${account.address}&chainId=${siweChain.id}`);
        if (!res.ok) throw new Error("Failed to generate SIWE login payload");
        return await res.json();
    })();
    const { signature } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$core$2f$sign$2d$login$2d$payload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signLoginPayload"])({
        account,
        payload
    });
    const authResult = await (async ()=>{
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginCallbackUrl"])({
            authOption: "wallet",
            client: args.client,
            ecosystem: args.ecosystem
        });
        const res = await clientFetch(`${path}&signature=${signature}&payload=${encodeURIComponent(payload)}`, {
            body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
                payload,
                signature
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        if (!res.ok) throw new Error("Failed to verify SIWE signature");
        return await res.json();
    })();
    return authResult;
} //# sourceMappingURL=siwe.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sends a raw transaction to the Ethereum network.
 * @param request - The EIP1193 request function.
 * @param signedTransaction - The signed transaction in hex format.
 * @returns A promise that resolves to the transaction hash.
 * @rpc
 * @example
 * ```ts
 * import { getRpcClient, eth_sendRawTransaction } from "thirdweb/rpc";
 * const rpcRequest = getRpcClient({ client, chain });
 * const transactionHash = await eth_sendRawTransaction(rpcRequest, "0x...");
 * ```
 */ __turbopack_context__.s([
    "eth_sendRawTransaction",
    ()=>eth_sendRawTransaction
]);
async function eth_sendRawTransaction(request, signedTransaction) {
    return await request({
        method: "eth_sendRawTransaction",
        params: [
            signedTransaction
        ]
    });
} //# sourceMappingURL=eth_sendRawTransaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-authorization.enclave.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signAuthorization",
    ()=>signAuthorization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
async function signAuthorization({ client, payload, storage }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing message");
    }
    const body = {
        address: payload.address,
        chainId: payload.chainId,
        nonce: Number(payload.nonce)
    };
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/v1/enclave-wallet/sign-authorization`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body),
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId
        },
        method: "POST"
    });
    if (!response.ok) {
        throw new Error(`Failed to sign message - ${response.status} ${response.statusText}`);
    }
    const signedAuthorization = await response.json();
    return signedAuthorization;
} //# sourceMappingURL=sign-authorization.enclave.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-message.enclave.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signMessage",
    ()=>signMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
async function signMessage({ client, payload: { message, isRaw, originalMessage, chainId }, storage }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing message");
    }
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/v1/enclave-wallet/sign-message`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            messagePayload: {
                chainId,
                isRaw,
                message,
                originalMessage
            }
        }),
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId
        },
        method: "POST"
    });
    if (!response.ok) {
        throw new Error(`Failed to sign message - ${response.status} ${response.statusText}`);
    }
    const signedMessage = await response.json();
    return signedMessage;
} //# sourceMappingURL=sign-message.enclave.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-transaction.enclave.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signTransaction",
    ()=>signTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
async function signTransaction({ client, payload, storage }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing transaction");
    }
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/v1/enclave-wallet/sign-transaction`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            transactionPayload: payload
        }),
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId
        },
        method: "POST"
    });
    if (!response.ok) {
        throw new Error(`Failed to sign transaction - ${response.status} ${response.statusText}`);
    }
    const signedTransaction = await response.json();
    return signedTransaction.signature;
} //# sourceMappingURL=sign-transaction.enclave.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-typed-data.enclave.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signTypedData",
    ()=>signTypedData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
async function signTypedData({ client, payload, storage }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing typed data");
    }
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/v1/enclave-wallet/sign-typed-data`, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            ...payload
        }),
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId
        },
        method: "POST"
    });
    if (!response.ok) {
        throw new Error(`Failed to sign typed data - ${response.status} ${response.statusText}`);
    }
    const signedTypedData = await response.json();
    return signedTypedData;
} //# sourceMappingURL=sign-typed-data.enclave.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/enclave-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnclaveWallet",
    ()=>EnclaveWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$get$2d$enclave$2d$user$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/get-enclave-user-status.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$authorization$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-authorization.enclave.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$message$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-message.enclave.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$transaction$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-transaction.enclave.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$typed$2d$data$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/sign-typed-data.enclave.js [app-client] (ecmascript)");
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
class EnclaveWallet {
    constructor({ client, ecosystem, address, storage }){
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "address", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localStorage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.ecosystem = ecosystem;
        this.address = address;
        this.localStorage = storage;
    }
    /**
     * Store the auth token for use
     * @returns `{walletAddress: string }` The user's wallet details
     * @internal
     */ async postWalletSetUp(authResult) {
        await this.localStorage.saveAuthCookie(authResult.storedToken.cookieString);
    }
    /**
     * Gets the current user's details
     * @internal
     */ async getUserWalletStatus() {
        const token = await this.localStorage.getAuthCookie();
        if (!token) {
            return {
                status: "Logged Out"
            };
        }
        const userStatus = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$get$2d$enclave$2d$user$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserStatus"])({
            authToken: token,
            client: this.client,
            ecosystem: this.ecosystem
        });
        if (!userStatus) {
            return {
                status: "Logged Out"
            };
        }
        const wallet = userStatus.wallets[0];
        const authDetails = {
            email: userStatus.linkedAccounts.find((account)=>account.details.email !== undefined)?.details.email,
            phoneNumber: userStatus.linkedAccounts.find((account)=>account.details.phone !== undefined)?.details.phone,
            recoveryShareManagement: "ENCLAVE",
            userWalletId: userStatus.id || ""
        };
        if (!wallet) {
            return {
                authDetails,
                status: "Logged In, Wallet Uninitialized"
            };
        }
        return {
            account: await this.getAccount(),
            authDetails,
            status: "Logged In, Wallet Initialized",
            walletAddress: wallet.address
        };
    }
    /**
     * Returns an account to perform wallet operations
     * @internal
     */ async getAccount() {
        const client = this.client;
        const storage = this.localStorage;
        const address = this.address;
        const ecosystem = this.ecosystem;
        const _signTransaction = async (tx)=>{
            const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
                chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(tx.chainId),
                client
            });
            const transaction = {
                chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(tx.chainId),
                data: tx.data,
                gas: hexlify(tx.gas),
                nonce: hexlify(tx.nonce) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionCount.js [app-client] (ecmascript, async loader)").then(({ eth_getTransactionCount })=>eth_getTransactionCount(rpcRequest, {
                        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(this.address),
                        blockTag: "pending"
                    }))),
                to: tx.to ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(tx.to) : undefined,
                value: hexlify(tx.value)
            };
            if (tx.authorizationList && tx.authorizationList.length > 0) {
                transaction.type = 4;
                transaction.authorizationList = tx.authorizationList;
                transaction.maxFeePerGas = hexlify(tx.maxFeePerGas);
                transaction.maxPriorityFeePerGas = hexlify(tx.maxPriorityFeePerGas);
            } else if (hexlify(tx.maxFeePerGas)) {
                transaction.maxFeePerGas = hexlify(tx.maxFeePerGas);
                transaction.maxPriorityFeePerGas = hexlify(tx.maxPriorityFeePerGas);
                transaction.type = 2;
            } else {
                transaction.gasPrice = hexlify(tx.gasPrice);
                transaction.type = 0;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$transaction$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signTransaction"])({
                client,
                payload: transaction,
                storage
            });
        };
        const account = {
            address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
            async sendTransaction (tx) {
                const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(tx.chainId),
                    client
                });
                const signedTx = await _signTransaction(tx);
                const transactionHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_sendRawTransaction"])(rpcRequest, signedTx);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                    chainId: tx.chainId,
                    client,
                    contractAddress: tx.to ?? undefined,
                    ecosystem,
                    gasPrice: tx.gasPrice,
                    transactionHash,
                    walletAddress: address,
                    walletType: "inApp"
                });
                return {
                    transactionHash
                };
            },
            async signAuthorization (payload) {
                const authorization = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$authorization$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signAuthorization"])({
                    client,
                    payload,
                    storage
                });
                return {
                    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(authorization.address),
                    chainId: Number.parseInt(authorization.chainId),
                    nonce: BigInt(authorization.nonce),
                    r: BigInt(authorization.r),
                    s: BigInt(authorization.s),
                    yParity: Number.parseInt(authorization.yParity)
                };
            },
            async signMessage ({ message, originalMessage, chainId }) {
                const messagePayload = (()=>{
                    if (typeof message === "string") {
                        return {
                            chainId,
                            isRaw: false,
                            message,
                            originalMessage
                        };
                    }
                    return {
                        chainId,
                        isRaw: true,
                        message: typeof message.raw === "string" ? message.raw : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])(message.raw),
                        originalMessage
                    };
                })();
                const { signature } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$message$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signMessage"])({
                    client,
                    payload: messagePayload,
                    storage
                });
                return signature;
            },
            async signTransaction (tx) {
                if (!tx.chainId) {
                    throw new Error("chainId required in tx to sign");
                }
                return _signTransaction({
                    chainId: tx.chainId,
                    ...tx
                });
            },
            async signTypedData (_typedData) {
                const parsedTypedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTypedData"])(_typedData);
                const { signature } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$sign$2d$typed$2d$data$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signTypedData"])({
                    client,
                    payload: parsedTypedData,
                    storage
                });
                return signature;
            },
            sendCalls: async (options)=>{
                const { inAppWalletSendCalls } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
                const firstCall = options.calls[0];
                if (!firstCall) {
                    throw new Error("No calls to send");
                }
                const client = firstCall.client;
                const chain = firstCall.chain || options.chain;
                const id = await inAppWalletSendCalls({
                    account: account,
                    calls: options.calls,
                    chain
                });
                return {
                    chain,
                    client,
                    id
                };
            },
            getCallsStatus: async (options)=>{
                const { inAppWalletGetCallsStatus } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
                return inAppWalletGetCallsStatus(options);
            },
            getCapabilities: async (options)=>{
                return {
                    [options.chainId ?? 1]: {
                        atomic: {
                            status: "unsupported"
                        },
                        paymasterService: {
                            supported: false
                        }
                    }
                };
            }
        };
        return account;
    }
}
function hexlify(value) {
    return value === undefined || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value) ? value : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(value);
} //# sourceMappingURL=enclave-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/utils/iFrameCommunication/IframeCommunicator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IframeCommunicator",
    ()=>IframeCommunicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$sleep$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/sleep.js [app-client] (ecmascript)");
;
const iframeBaseStyle = {
    backgroundColor: "transparent",
    border: "none",
    colorScheme: "light",
    display: "none",
    height: "100%",
    pointerEvents: "all",
    position: "fixed",
    right: "0px",
    top: "0px",
    width: "100%",
    zIndex: "2147483646"
};
// Global var to help track iframe state
const isIframeLoaded = new Map();
class IframeCommunicator {
    /**
     * @internal
     */ constructor({ link, baseUrl, iframeId, container, onIframeInitialize, localStorage, clientId, ecosystem }){
        Object.defineProperty(this, "iframe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "POLLING_INTERVAL_SECONDS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1.4
        });
        Object.defineProperty(this, "iframeBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localStorage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.localStorage = localStorage;
        this.clientId = clientId;
        this.ecosystem = ecosystem;
        this.iframeBaseUrl = baseUrl;
        if (typeof document === "undefined") {
            return;
        }
        container = container ?? document.body;
        // Creating the IFrame element for communication
        let iframe = document.getElementById(iframeId);
        const hrefLink = new URL(link);
        // TODO (ew) - bring back version tracking
        // const sdkVersion = process.env.THIRDWEB_EWS_SDK_VERSION;
        // if (!sdkVersion) {
        //   throw new Error("Missing THIRDWEB_EWS_SDK_VERSION env var");
        // }
        // hrefLink.searchParams.set("sdkVersion", sdkVersion);
        if (!iframe || iframe.src !== hrefLink.href) {
            // ! Do not update the hrefLink here or it'll cause multiple re-renders
            iframe = document.createElement("iframe");
            const mergedIframeStyles = {
                ...iframeBaseStyle
            };
            Object.assign(iframe.style, mergedIframeStyles);
            iframe.setAttribute("id", iframeId);
            iframe.setAttribute("fetchpriority", "high");
            container.appendChild(iframe);
            iframe.src = hrefLink.href;
            // iframe.setAttribute("data-version", sdkVersion);
            // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
            const onIframeLoaded = (event)=>{
                if (event.data.eventType === "ewsIframeLoaded") {
                    window.removeEventListener("message", onIframeLoaded);
                    if (!iframe) {
                        console.warn("thirdweb iFrame not found");
                        return;
                    }
                    this.onIframeLoadHandler(iframe, onIframeInitialize)();
                }
            };
            window.addEventListener("message", onIframeLoaded);
        }
        this.iframe = iframe;
    }
    // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
    async onIframeLoadedInitVariables() {
        return {
            authCookie: await this.localStorage.getAuthCookie(),
            clientId: this.clientId,
            deviceShareStored: await this.localStorage.getDeviceShare(),
            ecosystemId: this.ecosystem?.id,
            partnerId: this.ecosystem?.partnerId,
            walletUserId: await this.localStorage.getWalletUserId()
        };
    }
    /**
     * @internal
     */ onIframeLoadHandler(iframe, onIframeInitialize) {
        return async ()=>{
            const channel = new MessageChannel();
            const promise = new Promise((res, rej)=>{
                // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
                channel.port1.onmessage = (event)=>{
                    const { data } = event;
                    channel.port1.close();
                    if (!data.success) {
                        rej(new Error(data.error));
                    }
                    isIframeLoaded.set(iframe.src, true);
                    if (onIframeInitialize) {
                        onIframeInitialize();
                    }
                    res(true);
                };
            });
            iframe?.contentWindow?.postMessage({
                data: await this.onIframeLoadedInitVariables(),
                eventType: "initIframe"
            }, this.iframeBaseUrl, [
                channel.port2
            ]);
            await promise;
        };
    }
    /**
     * @internal
     */ async call({ procedureName, params, showIframe = false }) {
        if (!this.iframe) {
            throw new Error("Iframe not found. You are likely calling this from the backend where the DOM is not available.");
        }
        while(!isIframeLoaded.get(this.iframe.src)){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$sleep$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(this.POLLING_INTERVAL_SECONDS * 1000);
        }
        if (showIframe) {
            this.iframe.style.display = "block";
            // magic number to let the display render before performing the animation of the modal in
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$sleep$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(0.005 * 1000);
        }
        const channel = new MessageChannel();
        const promise = new Promise((res, rej)=>{
            // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
            channel.port1.onmessage = async (event)=>{
                const { data } = event;
                channel.port1.close();
                if (showIframe) {
                    // magic number to let modal fade out before hiding it
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$sleep$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(0.1 * 1000);
                    if (this.iframe) {
                        this.iframe.style.display = "none";
                    }
                }
                if (!data.success) {
                    rej(new Error(data.error));
                } else {
                    res(data.data);
                }
            };
        });
        this.iframe.contentWindow?.postMessage({
            // Pass the initialization data on every request in case the iframe storage was reset (can happen in some environments such as iOS PWAs)
            data: {
                ...params,
                ...await this.onIframeLoadedInitVariables()
            },
            eventType: procedureName
        }, this.iframeBaseUrl, [
            channel.port2
        ]);
        return promise;
    }
    /**
     * This has to be called by any iframe that will be removed from the DOM.
     * Use to make sure that we reset the global loaded state of the particular iframe.src
     * @internal
     */ destroy() {
        if (this.iframe) {
            isIframeLoaded.delete(this.iframe.src);
        }
    }
} //# sourceMappingURL=IframeCommunicator.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/utils/iFrameCommunication/InAppWalletIframeCommunicator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InAppWalletIframeCommunicator",
    ()=>InAppWalletIframeCommunicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$client$2d$scoped$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/client-scoped-storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/constants/settings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$utils$2f$iFrameCommunication$2f$IframeCommunicator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/utils/iFrameCommunication/IframeCommunicator.js [app-client] (ecmascript)");
;
;
;
;
class InAppWalletIframeCommunicator extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$utils$2f$iFrameCommunication$2f$IframeCommunicator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IframeCommunicator"] {
    /**
     * @internal
     */ constructor({ clientId, baseUrl, ecosystem }){
        super({
            baseUrl,
            clientId,
            container: typeof document === "undefined" ? undefined : document.body,
            ecosystem,
            iframeId: IN_APP_WALLET_IFRAME_ID + (ecosystem?.id || ""),
            link: createInAppWalletIframeLink({
                baseUrl,
                clientId,
                ecosystem,
                path: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$constants$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IN_APP_WALLET_PATH"]
            }).href,
            localStorage: new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$client$2d$scoped$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientScopedStorage"]({
                clientId,
                ecosystem,
                storage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"]
            })
        });
        this.clientId = clientId;
        this.ecosystem = ecosystem;
    }
}
// This is the URL and ID tag of the iFrame that we communicate with
/**
 * @internal
 */ function createInAppWalletIframeLink({ clientId, baseUrl, path, ecosystem, queryParams }) {
    const inAppWalletUrl = new URL(`${path}`, baseUrl);
    if (queryParams) {
        for (const queryKey of Object.keys(queryParams)){
            inAppWalletUrl.searchParams.set(queryKey, queryParams[queryKey]?.toString() || "");
        }
    }
    inAppWalletUrl.searchParams.set("clientId", clientId);
    if (ecosystem?.partnerId !== undefined) {
        inAppWalletUrl.searchParams.set("partnerId", ecosystem.partnerId);
    }
    if (ecosystem?.id !== undefined) {
        inAppWalletUrl.searchParams.set("ecosystemId", ecosystem.id);
    }
    return inAppWalletUrl;
}
const IN_APP_WALLET_IFRAME_ID = "thirdweb-in-app-wallet-iframe"; //# sourceMappingURL=InAppWalletIframeCommunicator.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/generate-wallet.enclave.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateWallet",
    ()=>generateWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
;
;
async function generateWallet({ client, ecosystem, authToken }) {
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client, ecosystem);
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")}/api/v1/enclave-wallet/generate`, {
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId
        },
        method: "POST"
    });
    if (!response.ok) {
        throw new Error(`Failed to generate wallet - ${response.status} ${response.statusText}`);
    }
    const { wallet } = await response.json();
    return wallet;
} //# sourceMappingURL=generate-wallet.enclave.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/abstract-login.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "AbstractLogin",
    ()=>AbstractLogin
]);
class AbstractLogin {
    /**
     * Used to manage the user's auth states. This should not be instantiated directly.
     * @internal
     */ constructor({ baseUrl, querier, preLogin, postLogin, client, ecosystem }){
        Object.defineProperty(this, "LoginQuerier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "preLogin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "postLogin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = baseUrl;
        this.LoginQuerier = querier;
        this.preLogin = preLogin;
        this.postLogin = postLogin;
        this.client = client;
        this.ecosystem = ecosystem;
    }
    /**
     * @internal
     */ async sendEmailLoginOtp({ email }) {
        const result = await this.LoginQuerier.call({
            params: {
                email
            },
            procedureName: "sendThirdwebEmailLoginOtp"
        });
        return result;
    }
    /**
     *
     * @internal
     */ async sendSmsLoginOtp({ phoneNumber }) {
        const result = await this.LoginQuerier.call({
            params: {
                phoneNumber
            },
            procedureName: "sendThirdwebSmsLoginOtp"
        });
        return result;
    }
} //# sourceMappingURL=abstract-login.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/base-login.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseLogin",
    ()=>BaseLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$abstract$2d$login$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/abstract-login.js [app-client] (ecmascript)");
;
class BaseLogin extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$abstract$2d$login$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbstractLogin"] {
    async authenticateWithModal() {
        return this.LoginQuerier.call({
            params: undefined,
            procedureName: "loginWithThirdwebModal",
            showIframe: true
        });
    }
    /**
     * @internal
     */ async loginWithModal() {
        await this.preLogin();
        const result = await this.authenticateWithModal();
        return this.postLogin(result);
    }
    async authenticateWithIframe({ email }) {
        return this.LoginQuerier.call({
            params: {
                email
            },
            procedureName: "loginWithThirdwebModal",
            showIframe: true
        });
    }
    /**
     * @internal
     */ async loginWithIframe({ email }) {
        await this.preLogin();
        const result = await this.authenticateWithIframe({
            email
        });
        return this.postLogin(result);
    }
    async authenticateWithCustomJwt({ encryptionKey, jwt }) {
        if (!encryptionKey || encryptionKey.length === 0) {
            throw new Error("Encryption key is required for custom jwt auth");
        }
        return this.LoginQuerier.call({
            params: {
                encryptionKey,
                jwt
            },
            procedureName: "loginWithCustomJwt"
        });
    }
    /**
     * @internal
     */ async loginWithCustomJwt({ encryptionKey, jwt }) {
        if (!encryptionKey || encryptionKey.length === 0) {
            throw new Error("Encryption key is required for custom jwt auth");
        }
        await this.preLogin();
        const result = await this.authenticateWithCustomJwt({
            encryptionKey,
            jwt
        });
        return this.postLogin(result);
    }
    async authenticateWithCustomAuthEndpoint({ encryptionKey, payload }) {
        return this.LoginQuerier.call({
            params: {
                encryptionKey,
                payload
            },
            procedureName: "loginWithCustomAuthEndpoint"
        });
    }
    /**
     * @internal
     */ async loginWithCustomAuthEndpoint({ encryptionKey, payload }) {
        if (!encryptionKey || encryptionKey.length === 0) {
            throw new Error("Encryption key is required for custom auth");
        }
        await this.preLogin();
        const result = await this.authenticateWithCustomAuthEndpoint({
            encryptionKey,
            payload
        });
        return this.postLogin(result);
    }
    async authenticateWithEmailOtp({ email, otp, recoveryCode }) {
        return this.LoginQuerier.call({
            params: {
                email,
                otp,
                recoveryCode
            },
            procedureName: "verifyThirdwebEmailLoginOtp"
        });
    }
    /**
     * @internal
     */ async loginWithEmailOtp({ email, otp, recoveryCode }) {
        const result = await this.authenticateWithEmailOtp({
            email,
            otp,
            recoveryCode
        });
        return this.postLogin(result);
    }
    async authenticateWithSmsOtp({ phoneNumber, otp, recoveryCode }) {
        return this.LoginQuerier.call({
            params: {
                otp,
                phoneNumber,
                recoveryCode
            },
            procedureName: "verifyThirdwebSmsLoginOtp"
        });
    }
    /**
     * @internal
     */ async loginWithSmsOtp({ phoneNumber, otp, recoveryCode }) {
        const result = await this.authenticateWithSmsOtp({
            otp,
            phoneNumber,
            recoveryCode
        });
        return this.postLogin(result);
    }
} //# sourceMappingURL=base-login.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/iframe-auth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Auth",
    ()=>Auth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$generate$2d$wallet$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/generate-wallet.enclave.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$get$2d$enclave$2d$user$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/get-enclave-user-status.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$base$2d$login$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/base-login.js [app-client] (ecmascript)");
;
;
;
class Auth {
    /**
     * Used to manage the user's auth states. This should not be instantiated directly.
     * @internal
     */ constructor({ client, querier, onAuthSuccess, ecosystem, baseUrl, localStorage }){
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "AuthQuerier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localStorage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onAuthSuccess", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "BaseLogin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.ecosystem = ecosystem;
        this.AuthQuerier = querier;
        this.localStorage = localStorage;
        this.onAuthSuccess = onAuthSuccess;
        this.BaseLogin = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$base$2d$login$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseLogin"]({
            baseUrl,
            client,
            ecosystem,
            postLogin: async (result)=>{
                return this.postLogin(result);
            },
            preLogin: async ()=>{
                await this.preLogin();
            },
            querier: querier
        });
    }
    async preLogin() {
        await this.logout();
    }
    async postLogin({ storedToken, walletDetails }) {
        if (storedToken.shouldStoreCookieString) {
            await this.localStorage.saveAuthCookie(storedToken.cookieString);
        }
        const initializedUser = await this.onAuthSuccess({
            storedToken,
            walletDetails
        });
        return initializedUser;
    }
    async loginWithAuthToken(authToken, recoveryCode) {
        // We don't call logout for backend auth because that is handled on the backend where the iframe isn't available to call. Moreover, logout clears the local storage which isn't applicable for backend auth.
        if (authToken.storedToken.authProvider !== "Backend") {
            await this.preLogin();
        }
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$get$2d$enclave$2d$user$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserStatus"])({
            authToken: authToken.storedToken.cookieString,
            client: this.client,
            ecosystem: this.ecosystem
        });
        if (!user) {
            throw new Error("Cannot login, no user found for auth token");
        }
        // If they're already an enclave wallet, proceed to login
        if (user.wallets.length > 0 && user.wallets[0]?.type === "enclave") {
            return this.postLogin({
                storedToken: authToken.storedToken,
                walletDetails: {
                    walletAddress: user.wallets[0].address
                }
            });
        }
        if (user.wallets.length === 0) {
            // If this is a new ecosystem wallet without an enclave yet, we'll generate an enclave
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$generate$2d$wallet$2e$enclave$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateWallet"])({
                authToken: authToken.storedToken.cookieString,
                client: this.client,
                ecosystem: this.ecosystem
            });
            return this.postLogin({
                storedToken: authToken.storedToken,
                walletDetails: {
                    walletAddress: result.address
                }
            });
        }
        // If this is an existing sharded wallet or in-app wallet, we'll login with the sharded wallet
        const result = await this.AuthQuerier.call({
            params: {
                recoveryCode,
                storedToken: authToken.storedToken
            },
            procedureName: "loginWithStoredTokenDetails"
        });
        return this.postLogin(result);
    }
    /**
     * Used to log the user into their thirdweb wallet on your platform via a myriad of auth providers
     * @example
     * ```typescript
     * const thirdwebInAppWallet = new InAppWalletSdk({clientId: "YOUR_CLIENT_ID", chain: "Polygon"})
     * try {
     *   const user = await thirdwebInAppWallet.auth.loginWithModal();
     *   // user is now logged in
     * } catch (e) {
     *   // User closed modal or something else went wrong during the authentication process
     *   console.error(e)
     * }
     * ```
     * @returns `{{user: InitializedUser}}` An InitializedUser object.
     */ async loginWithModal() {
        return this.BaseLogin.loginWithModal();
    }
    async authenticateWithModal() {
        return this.BaseLogin.authenticateWithModal();
    }
    /**
     * Used to log the user into their thirdweb wallet using email OTP
     * @example
     * ```typescript
     *  // Basic Flow
     *  const thirdwebInAppWallet = new InAppWalletSdk({clientId: "", chain: "Polygon"});
     *  try {
     *    // prompts user to enter the code they received
     *    const user = await thirdwebInAppWallet.auth.loginWithThirdwebEmailOtp({ email : "you@example.com" });
     *    // user is now logged in
     *  } catch (e) {
     *    // User closed the OTP modal or something else went wrong during the authentication process
     *    console.error(e)
     *  }
     * ```
     * @param args - args.email: We will send the email an OTP that needs to be entered in order for them to be logged in.
     * @returns `{{user: InitializedUser}}` An InitializedUser object. See {@link InAppWalletSdk.getUser} for more
     */ async loginWithIframe(args) {
        return this.BaseLogin.loginWithIframe(args);
    }
    async authenticateWithIframe(args) {
        return this.BaseLogin.authenticateWithIframe(args);
    }
    /**
     * @internal
     */ async loginWithCustomJwt(args) {
        return this.BaseLogin.loginWithCustomJwt(args);
    }
    async authenticateWithCustomJwt(args) {
        return this.BaseLogin.authenticateWithCustomJwt(args);
    }
    /**
     * @internal
     */ async loginWithCustomAuthEndpoint(args) {
        return this.BaseLogin.loginWithCustomAuthEndpoint(args);
    }
    async authenticateWithCustomAuthEndpoint(args) {
        return this.BaseLogin.authenticateWithCustomAuthEndpoint(args);
    }
    /**
     * A headless way to send the users at the passed email an OTP code.
     * You need to then call {@link Auth.loginWithEmailOtp} in order to complete the login process
     * @example
     * @param param0.email
     * ```typescript
     *  const thirdwebInAppWallet = new InAppWalletSdk({clientId: "", chain: "Polygon"});
     *  // sends user an OTP code
     * try {
     *    await thirdwebInAppWallet.auth.sendEmailLoginOtp({ email : "you@example.com" });
     * } catch(e) {
     *    // Error Sending user's email an OTP code
     *    console.error(e);
     * }
     *
     * // Then when your user is ready to verify their OTP
     * try {
     *    const user = await thirdwebInAppWallet.auth.verifyEmailLoginOtp({ email: "you@example.com", otp: "6-DIGIT_CODE_HERE" });
     * } catch(e) {
     *    // Error verifying the OTP code
     *    console.error(e)
     * }
     * ```
     * @param param0 - param0.email We will send the email an OTP that needs to be entered in order for them to be logged in.
     * @returns `{{ isNewUser: boolean }}` IsNewUser indicates if the user is a new user to your platform
     * @internal
     */ async sendEmailLoginOtp({ email }) {
        return this.BaseLogin.sendEmailLoginOtp({
            email
        });
    }
    /**
     * @internal
     */ async sendSmsLoginOtp({ phoneNumber }) {
        return this.BaseLogin.sendSmsLoginOtp({
            phoneNumber
        });
    }
    /**
     * Used to verify the otp that the user receives from thirdweb
     *
     * See {@link Auth.sendEmailLoginOtp} for how the headless call flow looks like. Simply swap out the calls to `loginWithThirdwebEmailOtp` with `verifyThirdwebEmailLoginOtp`
     * @param args - props.email We will send the email an OTP that needs to be entered in order for them to be logged in.
     * props.otp The code that the user received in their email
     * @returns `{{user: InitializedUser}}` An InitializedUser object containing the user's status, wallet, authDetails, and more
     * @internal
     */ async loginWithEmailOtp(args) {
        await this.preLogin();
        return this.BaseLogin.loginWithEmailOtp(args);
    }
    async authenticateWithEmailOtp(args) {
        return this.BaseLogin.authenticateWithEmailOtp(args);
    }
    /**
     * @internal
     */ async loginWithSmsOtp(args) {
        await this.preLogin();
        return this.BaseLogin.loginWithSmsOtp(args);
    }
    async authenticateWithSmsOtp(args) {
        return this.BaseLogin.authenticateWithSmsOtp(args);
    }
    /**
     * Logs any existing user out of their wallet.
     * @returns `{{success: boolean}}` true if a user is successfully logged out. false if there's no user currently logged in.
     * @internal
     */ async logout() {
        const isRemoveAuthCookie = await this.localStorage.removeAuthCookie();
        const isRemoveUserId = await this.localStorage.removeWalletUserId();
        return {
            success: isRemoveAuthCookie || isRemoveUserId
        };
    }
} //# sourceMappingURL=iframe-auth.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_POP_UP_SIZE",
    ()=>DEFAULT_POP_UP_SIZE
]);
const DEFAULT_POP_UP_SIZE = "width=350, height=500"; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/oauth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginWithOauth",
    ()=>loginWithOauth,
    "loginWithOauthRedirect",
    ()=>loginWithOauthRedirect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/getLoginPath.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/constants.js [app-client] (ecmascript)");
;
;
;
const closeWindow = ({ isWindowOpenedByFn, win, closeOpenedWindow })=>{
    if (isWindowOpenedByFn) {
        win?.close();
    } else {
        if (win && closeOpenedWindow) {
            closeOpenedWindow(win);
        } else if (win) {
            win.close();
        }
    }
};
async function loginWithOauthRedirect(options) {
    const loginUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginUrl"])({
        ...options,
        mode: options.mode || "redirect"
    });
    if (options.mode === "redirect") {
        window.location.href = loginUrl;
    } else {
        window.open(loginUrl);
    }
    // wait for 5 secs for the redirect to happen
    // that way it interrupts the rest of the execution that would normally keep connecting
    await new Promise((resolve)=>setTimeout(resolve, 5000));
}
const loginWithOauth = async (options)=>{
    let win = options.openedWindow;
    let isWindowOpenedByFn = false;
    if (!win) {
        win = window.open((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginUrl"])({
            ...options,
            mode: "popup"
        }), `Login to ${options.authOption}`, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_POP_UP_SIZE"]);
        isWindowOpenedByFn = true;
    }
    if (!win) {
        throw new Error("Something went wrong opening pop-up");
    }
    const result = await new Promise((resolve, reject)=>{
        // detect when the user closes the login window
        const pollTimer = window.setInterval(async ()=>{
            if (win.closed) {
                clearInterval(pollTimer);
                window.removeEventListener("message", messageListener);
                reject(new Error("User closed login window"));
            }
        }, 1000);
        const messageListener = async (event)=>{
            if (event.origin !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet")) {
                return;
            }
            if (typeof event.data !== "object") {
                reject(new Error("Invalid event data"));
                return;
            }
            switch(event.data.eventType){
                case "oauthSuccessResult":
                    {
                        window.removeEventListener("message", messageListener);
                        clearInterval(pollTimer);
                        closeWindow({
                            closeOpenedWindow: options.closeOpenedWindow,
                            isWindowOpenedByFn,
                            win
                        });
                        if (event.data.authResult) {
                            resolve(event.data.authResult);
                        }
                        break;
                    }
                case "oauthFailureResult":
                    {
                        window.removeEventListener("message", messageListener);
                        clearInterval(pollTimer);
                        closeWindow({
                            closeOpenedWindow: options.closeOpenedWindow,
                            isWindowOpenedByFn,
                            win
                        });
                        reject(new Error(event.data.errorString));
                        break;
                    }
                default:
                    {
                    // no-op, DO NOT THROW HERE
                    }
            }
        };
        window.addEventListener("message", messageListener);
    });
    return result;
}; //# sourceMappingURL=oauth.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/otp.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendOtp",
    ()=>sendOtp,
    "verifyOtp",
    ()=>verifyOtp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/getLoginPath.js [app-client] (ecmascript)");
;
;
const sendOtp = async (args)=>{
    const { client, ecosystem } = args;
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginUrl"])({
        authOption: args.strategy,
        client,
        ecosystem
    });
    const headers = {
        "Content-Type": "application/json",
        "x-client-id": client.clientId
    };
    if (ecosystem?.id) {
        headers["x-ecosystem-id"] = ecosystem.id;
    }
    if (ecosystem?.partnerId) {
        headers["x-ecosystem-partner-id"] = ecosystem.partnerId;
    }
    const body = (()=>{
        switch(args.strategy){
            case "email":
                return {
                    email: args.email
                };
            case "phone":
                return {
                    phone: args.phoneNumber
                };
        }
    })();
    const response = await fetch(url, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body),
        headers,
        method: "POST"
    });
    if (!response.ok) {
        throw new Error("Failed to send verification code");
    }
    return await response.json();
};
const verifyOtp = async (args)=>{
    const { client, ecosystem } = args;
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$getLoginPath$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoginCallbackUrl"])({
        authOption: args.strategy,
        client: args.client,
        ecosystem: args.ecosystem
    });
    const headers = {
        "Content-Type": "application/json",
        "x-client-id": client.clientId
    };
    if (ecosystem?.id) {
        headers["x-ecosystem-id"] = ecosystem.id;
    }
    if (ecosystem?.partnerId) {
        headers["x-ecosystem-partner-id"] = ecosystem.partnerId;
    }
    const body = (()=>{
        switch(args.strategy){
            case "email":
                return {
                    code: args.verificationCode,
                    email: args.email
                };
            case "phone":
                return {
                    code: args.verificationCode,
                    phone: args.phoneNumber
                };
        }
    })();
    const response = await fetch(url, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body),
        headers,
        method: "POST"
    });
    if (!response.ok) {
        throw new Error("Failed to verify verification code");
    }
    return await response.json();
}; //# sourceMappingURL=otp.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/iframe-wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IFrameWallet",
    ()=>IFrameWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
class IFrameWallet {
    /**
     * Not meant to be initialized directly. Call {@link initializeUser} to get an instance
     * @internal
     */ constructor({ client, ecosystem, querier, localStorage }){
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "walletManagerQuerier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localStorage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.ecosystem = ecosystem;
        this.walletManagerQuerier = querier;
        this.localStorage = localStorage;
    }
    /**
     * Used to set-up the user device in the case that they are using incognito
     * @returns `{walletAddress : string }` The user's wallet details
     * @internal
     */ async postWalletSetUp(authResult) {
        if (authResult.deviceShareStored) {
            await this.localStorage.saveDeviceShare(authResult.deviceShareStored, authResult.storedToken.authDetails.userWalletId);
        }
    }
    /**
     * Gets the various status states of the user
     * @example
     * ```typescript
     *  const userStatus = await Paper.getUserWalletStatus();
     *  switch (userStatus.status) {
     *  case UserWalletStatus.LOGGED_OUT: {
     *    // User is logged out, call one of the auth methods on Paper.auth to authenticate the user
     *    break;
     *  }
     *  case UserWalletStatus.LOGGED_IN_WALLET_UNINITIALIZED: {
     *    // User is logged in, but does not have a wallet associated with it
     *    // you also have access to the user's details
     *    userStatus.user.authDetails;
     *    break;
     *  }
     *  case UserWalletStatus.LOGGED_IN_NEW_DEVICE: {
     *    // User is logged in and created a wallet already, but is missing the device shard
     *    // You have access to:
     *    userStatus.user.authDetails;
     *    userStatus.user.walletAddress;
     *    break;
     *  }
     *  case UserWalletStatus.LOGGED_IN_WALLET_INITIALIZED: {
     *    // user is logged in and wallet is all set up.
     *    // You have access to:
     *    userStatus.user.authDetails;
     *    userStatus.user.walletAddress;
     *    userStatus.user.wallet;
     *    break;
     *  }
     *}
     *```
     * @returns `{GetUserWalletStatusFnReturnType}` an object to containing various information on the user statuses
     * @internal
     */ async getUserWalletStatus() {
        const userStatus = await this.walletManagerQuerier.call({
            params: undefined,
            procedureName: "getUserStatus"
        });
        if (userStatus.status === "Logged In, Wallet Initialized") {
            return {
                status: "Logged In, Wallet Initialized",
                ...userStatus.user,
                account: await this.getAccount()
            };
        }
        if (userStatus.status === "Logged In, New Device") {
            return {
                status: "Logged In, New Device",
                ...userStatus.user
            };
        }
        if (userStatus.status === "Logged In, Wallet Uninitialized") {
            return {
                status: "Logged In, Wallet Uninitialized",
                ...userStatus.user
            };
        }
        // Logged out
        return {
            status: userStatus.status
        };
    }
    /**
     * Returns an account that communicates with the iFrame for signing operations
     * @internal
     */ async getAccount() {
        const querier = this.walletManagerQuerier;
        const client = this.client;
        const partnerId = this.ecosystem?.partnerId;
        const { address } = await querier.call({
            params: undefined,
            procedureName: "getAddress"
        });
        const _signTransaction = async (tx)=>{
            // biome-ignore lint/suspicious/noExplicitAny: ethers tx transformation
            const transaction = {
                chainId: tx.chainId,
                data: tx.data,
                gasLimit: tx.gas,
                nonce: tx.nonce,
                to: tx.to ?? undefined,
                value: tx.value
            };
            if (tx.maxFeePerGas) {
                // ethers (in the iframe) rejects any type 0 transaction with unknown keys
                // TODO remove this once iframe is upgraded to v5
                transaction.accessList = tx.accessList;
                transaction.maxFeePerGas = tx.maxFeePerGas;
                transaction.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
                transaction.type = 2;
            } else {
                transaction.gasPrice = tx.gasPrice;
                transaction.type = 0;
            }
            const RPC_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
            const { signedTransaction } = await querier.call({
                params: {
                    chainId: tx.chainId,
                    partnerId,
                    rpcEndpoint: `https://${tx.chainId}.${RPC_URL}`,
                    transaction
                },
                procedureName: "signTransaction"
            });
            return signedTransaction;
        };
        return {
            address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
            async sendTransaction (tx) {
                const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(tx.chainId),
                    client
                });
                const signedTx = await _signTransaction(tx);
                const transactionHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_sendRawTransaction"])(rpcRequest, signedTx);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                    chainId: tx.chainId,
                    client,
                    contractAddress: tx.to ?? undefined,
                    gasPrice: tx.gasPrice,
                    transactionHash,
                    walletAddress: address,
                    walletType: "inApp"
                });
                return {
                    transactionHash
                };
            },
            async signMessage ({ message }) {
                // in-app wallets use ethers to sign messages, which always expects a string (or bytes maybe but string is safest)
                const messageDecoded = (()=>{
                    if (typeof message === "string") {
                        return message;
                    }
                    if (message.raw instanceof Uint8Array) {
                        return message.raw;
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToString"])(message.raw);
                })();
                const { signedMessage } = await querier.call({
                    params: {
                        chainId: 1,
                        // biome-ignore lint/suspicious/noExplicitAny: ethers tx transformation
                        message: messageDecoded,
                        partnerId
                    },
                    procedureName: "signMessage"
                });
                return signedMessage;
            },
            async signTransaction (tx) {
                if (!tx.chainId) {
                    throw new Error("chainId required in tx to sign");
                }
                return _signTransaction({
                    ...tx,
                    chainId: tx.chainId
                });
            },
            async signTypedData (_typedData) {
                const parsedTypedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTypedData"])(_typedData);
                // deleting EIP712 Domain as it results in ambiguous primary type on some cases
                // this happens when going from viem to ethers via the iframe
                if (parsedTypedData.types?.EIP712Domain) {
                    parsedTypedData.types.EIP712Domain = undefined;
                }
                const domain = parsedTypedData.domain;
                const chainId = domain?.chainId;
                const verifyingContract = domain?.verifyingContract ? {
                    verifyingContract: domain?.verifyingContract
                } : {};
                const domainData = {
                    ...verifyingContract,
                    name: domain?.name,
                    version: domain?.version
                };
                // chain id can't be included if it wasn't explicitly specified
                if (chainId) {
                    domainData.chainId = chainId;
                }
                const RPC_URL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebDomains"])().rpc;
                const { signedTypedData } = await querier.call({
                    params: {
                        chainId: Number.parseInt(BigInt(chainId || 1).toString()),
                        domain: domainData,
                        message: parsedTypedData.message,
                        partnerId,
                        rpcEndpoint: `https://${chainId}.${RPC_URL}`,
                        types: parsedTypedData.types
                    },
                    procedureName: "signTypedDataV4"
                });
                return signedTypedData;
            }
        };
    }
} //# sourceMappingURL=iframe-wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/web-connector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InAppWebConnector",
    ()=>InAppWebConnector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$inMemoryStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/inMemoryStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$get$2d$enclave$2d$user$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/actions/get-enclave-user-status.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$authEndpoint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/authEndpoint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$backend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/backend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$client$2d$scoped$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/client-scoped-storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$guest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/guest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/jwt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$linkAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/linkAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$passkeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/passkeys.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$siwe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/authentication/siwe.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$wallet$2f$enclave$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/enclave-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$utils$2f$iFrameCommunication$2f$InAppWalletIframeCommunicator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/utils/iFrameCommunication/InAppWalletIframeCommunicator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$iframe$2d$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/iframe-auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$oauth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/oauth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$otp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/otp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$iframe$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/iframe-wallet.js [app-client] (ecmascript)");
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
class InAppWebConnector {
    isClientIdLegacyPaper(clientId) {
        if (clientId.indexOf("-") > 0 && clientId.length === 36) {
            return true;
        }
        return false;
    }
    /**
     * @example
     * `const thirdwebInAppWallet = new InAppWalletSdk({ clientId: "", chain: "Goerli" });`
     * @internal
     */ constructor({ client, onAuthSuccess, ecosystem, passkeyDomain, storage }){
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "querier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "storage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "wallet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Used to manage the Auth state of the user.
         */ Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "passkeyDomain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (this.isClientIdLegacyPaper(client.clientId)) {
            throw new Error("You are using a legacy clientId. Please use the clientId found on the thirdweb dashboard settings page");
        }
        const baseUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("inAppWallet");
        this.client = client;
        this.ecosystem = ecosystem;
        this.passkeyDomain = passkeyDomain;
        this.storage = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$client$2d$scoped$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientScopedStorage"]({
            clientId: client.clientId,
            ecosystem: ecosystem,
            storage: storage ?? getDefaultStorage()
        });
        this.querier = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$utils$2f$iFrameCommunication$2f$InAppWalletIframeCommunicator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InAppWalletIframeCommunicator"]({
            baseUrl,
            clientId: client.clientId,
            ecosystem
        });
        this.auth = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$iframe$2d$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Auth"]({
            baseUrl,
            client,
            ecosystem,
            localStorage: this.storage,
            onAuthSuccess: async (authResult)=>{
                onAuthSuccess?.(authResult);
                if (authResult.storedToken.authDetails.walletType === "sharded") {
                    // If this is an existing sharded ecosystem wallet, we'll need to migrate
                    const result = await this.querier.call({
                        params: {
                            storedToken: authResult.storedToken
                        },
                        procedureName: "migrateFromShardToEnclave"
                    });
                    if (!result) {
                        console.warn("Failed to migrate from sharded to enclave wallet, continuing with sharded wallet");
                    }
                }
                this.wallet = await this.initializeWallet(authResult.storedToken.cookieString);
                if (!this.wallet) {
                    throw new Error("Failed to initialize wallet");
                }
                const deviceShareStored = "deviceShareStored" in authResult.walletDetails ? authResult.walletDetails.deviceShareStored : undefined;
                await this.wallet.postWalletSetUp({
                    deviceShareStored,
                    storedToken: authResult.storedToken
                });
                if (this.wallet instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$iframe$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IFrameWallet"]) {
                    await this.querier.call({
                        params: {
                            authCookie: authResult.storedToken.cookieString,
                            clientId: this.client.clientId,
                            // For enclave wallets we won't have a device share
                            deviceShareStored: "deviceShareStored" in authResult.walletDetails ? authResult.walletDetails.deviceShareStored : null,
                            ecosystemId: ecosystem?.id,
                            partnerId: ecosystem?.partnerId,
                            walletUserId: authResult.storedToken.authDetails.userWalletId
                        },
                        procedureName: "initIframe"
                    });
                }
                return {
                    user: {
                        account: await this.wallet.getAccount(),
                        authDetails: authResult.storedToken.authDetails,
                        status: "Logged In, Wallet Initialized",
                        walletAddress: authResult.walletDetails.walletAddress
                    }
                };
            },
            querier: this.querier
        });
    }
    async initializeWallet(authToken) {
        const storedAuthToken = await this.storage.getAuthCookie();
        if (!authToken && storedAuthToken === null) {
            throw new Error("No auth token provided and no stored auth token found to initialize the wallet");
        }
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$actions$2f$get$2d$enclave$2d$user$2d$status$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserStatus"])({
            authToken: authToken || storedAuthToken,
            client: this.client,
            ecosystem: this.ecosystem
        });
        if (!user) {
            throw new Error("Cannot initialize wallet, no user logged in");
        }
        if (user.wallets.length === 0) {
            throw new Error("Cannot initialize wallet, this user does not have a wallet generated yet");
        }
        if (user.wallets[0]?.type === "enclave") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$wallet$2f$enclave$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnclaveWallet"]({
                address: user.wallets[0].address,
                client: this.client,
                ecosystem: this.ecosystem,
                storage: this.storage
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$iframe$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IFrameWallet"]({
            client: this.client,
            ecosystem: this.ecosystem,
            localStorage: this.storage,
            querier: this.querier
        });
    }
    /**
     * Gets the user if they're logged in
     * @example
     * ```js
     *  const user = await thirdwebInAppWallet.getUser();
     *  switch (user.status) {
     *     case UserWalletStatus.LOGGED_OUT: {
     *       // User is logged out, call one of the auth methods on thirdwebInAppWallet.auth to authenticate the user
     *       break;
     *     }
     *     case UserWalletStatus.LOGGED_IN_WALLET_INITIALIZED: {
     *       // user is logged in and wallet is all set up.
     *       // You have access to:
     *       user.status;
     *       user.authDetails;
     *       user.walletAddress;
     *       user.wallet;
     *       break;
     *     }
     * }
     * ```
     * @returns GetUser - an object to containing various information on the user statuses
     */ async getUser() {
        // If we don't have a wallet yet we'll create one
        if (!this.wallet) {
            const localAuthToken = await this.storage.getAuthCookie();
            if (!localAuthToken) {
                return {
                    status: "Logged Out"
                };
            }
            this.wallet = await this.initializeWallet(localAuthToken);
        }
        if (!this.wallet) {
            throw new Error("Wallet not initialized");
        }
        return await this.wallet.getUserWalletStatus();
    }
    getAccount() {
        if (!this.wallet) {
            throw new Error("Wallet not initialized");
        }
        return this.wallet.getAccount();
    }
    async preAuthenticate(args) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$otp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtp"])({
            ...args,
            client: this.client,
            ecosystem: this.ecosystem
        });
    }
    async authenticateWithRedirect(strategy, mode, redirectUrl) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$oauth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginWithOauthRedirect"])({
            authOption: strategy,
            client: this.client,
            ecosystem: this.ecosystem,
            mode,
            redirectUrl
        });
    }
    async loginWithAuthToken(authResult, recoveryCode) {
        return this.auth.loginWithAuthToken(authResult, recoveryCode);
    }
    /**
     * Authenticates the user and returns the auth token, but does not instantiate their wallet
     */ async authenticate(args) {
        const strategy = args.strategy;
        switch(strategy){
            case "email":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$otp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtp"])({
                    ...args,
                    client: this.client,
                    ecosystem: this.ecosystem
                });
            case "phone":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$otp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtp"])({
                    ...args,
                    client: this.client,
                    ecosystem: this.ecosystem
                });
            case "auth_endpoint":
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$authEndpoint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authEndpoint"])({
                        client: this.client,
                        ecosystem: this.ecosystem,
                        payload: args.payload
                    });
                }
            case "jwt":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$jwt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customJwt"])({
                    client: this.client,
                    ecosystem: this.ecosystem,
                    jwt: args.jwt
                });
            case "passkey":
                {
                    return this.passkeyAuth(args);
                }
            case "iframe_email_verification":
                {
                    return this.auth.authenticateWithIframe({
                        email: args.email
                    });
                }
            case "iframe":
                {
                    return this.auth.authenticateWithModal();
                }
            case "apple":
            case "facebook":
            case "google":
            case "telegram":
            case "github":
            case "twitch":
            case "farcaster":
            case "line":
            case "x":
            case "tiktok":
            case "epic":
            case "steam":
            case "coinbase":
            case "discord":
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$oauth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginWithOauth"])({
                        authOption: strategy,
                        client: this.client,
                        closeOpenedWindow: args.closeOpenedWindow,
                        ecosystem: this.ecosystem,
                        openedWindow: args.openedWindow
                    });
                }
            case "guest":
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$guest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guestAuthenticate"])({
                        client: this.client,
                        ecosystem: this.ecosystem,
                        storage: this.storage
                    });
                }
            case "backend":
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$backend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["backendAuthenticate"])({
                        client: this.client,
                        ecosystem: this.ecosystem,
                        walletSecret: args.walletSecret
                    });
                }
            case "wallet":
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$siwe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siweAuthenticate"])({
                        client: this.client,
                        ecosystem: this.ecosystem,
                        wallet: args.wallet,
                        chain: args.chain
                    });
                }
        }
    }
    /**
     * Authenticates the user then instantiates their wallet using the resulting auth token
     */ async connect(args) {
        const strategy = args.strategy;
        switch(strategy){
            case "auth_endpoint":
            case "jwt":
                {
                    const authToken = await this.authenticate(args);
                    return await this.loginWithAuthToken(authToken, args.encryptionKey);
                }
            case "iframe_email_verification":
                {
                    return this.auth.loginWithIframe({
                        email: args.email
                    });
                }
            case "iframe":
                {
                    return this.auth.loginWithModal();
                }
            case "passkey":
                {
                    const authToken = await this.passkeyAuth(args);
                    return this.loginWithAuthToken(authToken);
                }
            case "backend":
            case "phone":
            case "email":
            case "wallet":
            case "apple":
            case "facebook":
            case "google":
            case "farcaster":
            case "telegram":
            case "github":
            case "line":
            case "x":
            case "tiktok":
            case "epic":
            case "guest":
            case "coinbase":
            case "twitch":
            case "steam":
            case "discord":
                {
                    const authToken = await this.authenticate(args);
                    return await this.auth.loginWithAuthToken(authToken);
                }
            default:
                assertUnreachable(strategy);
        }
    }
    async logout() {
        return await this.auth.logout();
    }
    async passkeyAuth(args) {
        const { PasskeyWebClient } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/passkeys.js [app-client] (ecmascript, async loader)");
        const { passkeyName, storeLastUsedPasskey = true } = args;
        const passkeyClient = new PasskeyWebClient();
        const storage = this.storage;
        if (args.type === "sign-up") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$passkeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerPasskey"])({
                client: this.client,
                ecosystem: this.ecosystem,
                passkeyClient,
                rp: {
                    id: this.passkeyDomain ?? window.location.hostname,
                    name: this.passkeyDomain ?? window.document.title
                },
                storage: storeLastUsedPasskey ? storage : undefined,
                username: passkeyName
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$passkeys$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginWithPasskey"])({
            client: this.client,
            ecosystem: this.ecosystem,
            passkeyClient,
            rp: {
                id: this.passkeyDomain ?? window.location.hostname,
                name: this.passkeyDomain ?? window.document.title
            },
            storage: storeLastUsedPasskey ? storage : undefined
        });
    }
    async linkProfile(args) {
        const { storedToken } = await this.authenticate(args);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$linkAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkAccount"])({
            client: args.client,
            ecosystem: args.ecosystem || this.ecosystem,
            storage: this.storage,
            tokenToLink: storedToken.cookieString
        });
    }
    async unlinkProfile(profile, allowAccountDeletion) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$linkAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unlinkAccount"])({
            allowAccountDeletion,
            client: this.client,
            ecosystem: this.ecosystem,
            profileToUnlink: profile,
            storage: this.storage
        });
    }
    async getProfiles() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$authentication$2f$linkAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLinkedProfilesInternal"])({
            client: this.client,
            ecosystem: this.ecosystem,
            storage: this.storage
        });
    }
}
function assertUnreachable(x, message) {
    throw new Error(message ?? `Invalid param: ${x}`);
}
function getDefaultStorage() {
    if (typeof window !== "undefined" && window.localStorage) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"];
    }
    // default to in-memory storage if we're not in the browser
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$inMemoryStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inMemoryStorage"];
} //# sourceMappingURL=web-connector.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_19991462._.js.map