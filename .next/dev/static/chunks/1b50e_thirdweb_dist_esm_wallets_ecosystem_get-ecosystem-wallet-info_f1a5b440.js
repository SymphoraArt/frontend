(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-info.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEcosystemWalletInfo",
    ()=>getEcosystemWalletInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$get$2d$ecosystem$2d$wallet$2d$auth$2d$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-auth-options.js [app-client] (ecmascript)");
;
async function getEcosystemWalletInfo(walletId) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$get$2d$ecosystem$2d$wallet$2d$auth$2d$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEcosystemInfo"])(walletId);
    return {
        app: {
            android: null,
            browser: null,
            chrome: null,
            edge: null,
            firefox: null,
            ios: null,
            linux: null,
            mac: null,
            opera: null,
            safari: null,
            windows: null
        },
        desktop: {
            native: null,
            universal: null
        },
        homepage: data.homepage || "",
        id: walletId,
        image_id: data.imageUrl || "",
        mobile: {
            native: null,
            universal: null
        },
        name: data.name,
        rdns: null
    };
} //# sourceMappingURL=get-ecosystem-wallet-info.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_wallets_ecosystem_get-ecosystem-wallet-info_f1a5b440.js.map