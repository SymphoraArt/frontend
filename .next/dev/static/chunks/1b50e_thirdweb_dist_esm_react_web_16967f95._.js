(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/providers/wallet-ui-states-provider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletUIStatesProvider",
    ()=>WalletUIStatesProvider,
    "useIsWalletModalOpen",
    ()=>useIsWalletModalOpen,
    "useSelectionData",
    ()=>useSelectionData,
    "useSetIsWalletModalOpen",
    ()=>useSetIsWalletModalOpen,
    "useSetSelectionData",
    ()=>useSetSelectionData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
"use client";
;
;
;
const WalletModalOpen = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
const SetWalletModalOpen = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(()=>{});
const SelectionUIDataCtx = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
const SetSelectionUIDataCtx = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(()=>{});
const WalletUIStatesProvider = (props)=>{
    const [isWalletModalOpen, setIsWalletModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(props.isOpen);
    const [selectionUIData, setSelectionUIData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // allow any type of object
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(WalletModalOpen.Provider, {
        value: isWalletModalOpen,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SetWalletModalOpen.Provider, {
            value: setIsWalletModalOpen,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectionUIDataCtx.Provider, {
                value: selectionUIData,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SetSelectionUIDataCtx.Provider, {
                    value: setSelectionUIData,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomThemeProvider"], {
                        theme: props.theme,
                        children: props.children
                    })
                })
            })
        })
    });
};
const useIsWalletModalOpen = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletModalOpen);
};
const useSetIsWalletModalOpen = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SetWalletModalOpen);
    if (context === undefined) {
        throw new Error("useSetWalletModalOpen must be used within a ThirdwebProvider");
    }
    return context;
};
function useSetSelectionData() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SetSelectionUIDataCtx);
}
function useSelectionData() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SelectionUIDataCtx);
} //# sourceMappingURL=wallet-ui-states-provider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/canFitWideModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canFitWideModal",
    ()=>canFitWideModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/constants.js [app-client] (ecmascript)");
;
function canFitWideModal() {
    if (typeof window !== "undefined") {
        return window.innerWidth >= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wideModalScreenThreshold"];
    }
    return false;
} //# sourceMappingURL=canFitWideModal.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/cls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 * Utility for merging class names
 *
 * @example
 * ```ts
 * cls("foo", "bar", true, false, "baz") // "foo bar baz"
 * cls('foo', someCondition && "bar") // "foo bar" or "foo"
 * ```
 */ __turbopack_context__.s([
    "cls",
    ()=>cls
]);
function cls(...classes) {
    return classes.filter((v)=>typeof v === "string").join(" ");
} //# sourceMappingURL=cls.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/sortWallets.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sortWallets",
    ()=>sortWallets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$mipdStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-client] (ecmascript)");
;
function sortWallets(wallets, recommendedWallets) {
    const providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$mipdStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInstalledWalletProviders"])();
    return wallets// show the installed wallets first
    .sort((a, b)=>{
        const aInstalled = providers.find((p)=>p.info.rdns === a.id);
        const bInstalled = providers.find((p)=>p.info.rdns === b.id);
        if (aInstalled && !bInstalled) {
            return -1;
        }
        if (!aInstalled && bInstalled) {
            return 1;
        }
        return 0;
    })// show the recommended wallets even before that
    .sort((a, b)=>{
        const aIsRecommended = recommendedWallets?.find((w)=>w.id === a.id);
        const bIsRecommended = recommendedWallets?.find((w)=>w.id === b.id);
        if (aIsRecommended && !bIsRecommended) {
            return -1;
        }
        if (!aIsRecommended && bIsRecommended) {
            return 1;
        }
        return 0;
    })// show in-app wallets first
    .sort((a, b)=>{
        const aIsInApp = a.id === "inApp" || a.id === "embedded";
        const bIsInApp = b.id === "inApp" || b.id === "embedded";
        if (aIsInApp && !bIsInApp) {
            return -1;
        }
        if (!aIsInApp && bIsInApp) {
            return 1;
        }
        return 0;
    });
} //# sourceMappingURL=sortWallets.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/usePreloadWalletProviders.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePreloadWalletProviders",
    ()=>usePreloadWalletProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQueries.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)");
;
;
;
function usePreloadWalletProviders({ wallets }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueries"])({
        queries: wallets.filter({
            "usePreloadWalletProviders.useQueries": (w)=>w.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"] || w.id === "inApp" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w.id)
        }["usePreloadWalletProviders.useQueries"]).map({
            "usePreloadWalletProviders.useQueries": (w)=>({
                    queryFn: ({
                        "usePreloadWalletProviders.useQueries": async ()=>{
                            switch(true){
                                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COINBASE"] === w.id:
                                    {
                                        const { getCoinbaseWebProvider } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-web.js [app-client] (ecmascript, async loader)");
                                        await getCoinbaseWebProvider(w.getConfig());
                                        // return _something_
                                        return true;
                                    }
                                // potentially add more wallets here
                                default:
                                    {
                                        return false;
                                    }
                            }
                        }
                    })["usePreloadWalletProviders.useQueries"],
                    queryKey: [
                        "preload-wallet",
                        w.id
                    ]
                })
        }["usePreloadWalletProviders.useQueries"])
    });
} //# sourceMappingURL=usePreloadWalletProviders.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/resolveMimeType.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveMimeType",
    ()=>resolveMimeType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$MediaRenderer$2f$mime$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/MediaRenderer/mime/mime.js [app-client] (ecmascript)");
;
async function resolveMimeType(url) {
    if (!url) {
        return undefined;
    }
    const mimeType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$MediaRenderer$2f$mime$2f$mime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMimeTypeFromUrl"])(url);
    if (mimeType) {
        return mimeType;
    }
    const res = url.startsWith("blob:") ? await fetch(url) : await fetch(url, {
        method: "HEAD"
    });
    if (res.ok && res.headers.has("content-type")) {
        return res.headers.get("content-type") || undefined;
    }
    // we failed to resolve the mime type, return null
    return undefined;
} //# sourceMappingURL=resolveMimeType.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/adapters/WindowAdapter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Web implementation of WindowAdapter using the browser's window.open API.
 * Opens URLs in a new tab/window.
 */ __turbopack_context__.s([
    "WebWindowAdapter",
    ()=>WebWindowAdapter,
    "webWindowAdapter",
    ()=>webWindowAdapter
]);
class WebWindowAdapter {
    /**
     * Opens a URL in a new browser tab/window.
     *
     * @param url - The URL to open
     * @returns Promise that resolves when the operation is initiated
     */ async open(url) {
        // Use window.open to open URL in new tab
        window.open(url, "_blank", "noopener,noreferrer");
    }
}
const webWindowAdapter = new WebWindowAdapter(); //# sourceMappingURL=WindowAdapter.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/wallets/useAutoConnect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoConnect",
    ()=>useAutoConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$create$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/create-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$defaultWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/defaultWallets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useAutoConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useAutoConnect.js [app-client] (ecmascript)");
;
;
;
;
function useAutoConnect(props) {
    const wallets = props.wallets || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$defaultWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultWallets"])(props);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useAutoConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoConnectCore"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"], {
        ...props,
        wallets
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$create$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWallet"]);
} //# sourceMappingURL=useAutoConnect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/wallets/useUnlinkProfile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUnlinkProfile",
    ()=>useUnlinkProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-client] (ecmascript)");
;
;
;
;
function useUnlinkProfile() {
    const wallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnectedWallets"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUnlinkProfile.useMutation": async ({ client, profileToUnlink, allowAccountDeletion = false })=>{
                const ecosystemWallet = wallets.find({
                    "useUnlinkProfile.useMutation.ecosystemWallet": (w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w)
                }["useUnlinkProfile.useMutation.ecosystemWallet"]);
                const ecosystem = ecosystemWallet ? {
                    id: ecosystemWallet.id,
                    partnerId: ecosystemWallet.getConfig()?.partnerId
                } : undefined;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unlinkProfile"])({
                    allowAccountDeletion,
                    client,
                    ecosystem,
                    profileToUnlink
                });
            }
        }["useUnlinkProfile.useMutation"],
        onSuccess: {
            "useUnlinkProfile.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        "profiles"
                    ]
                });
            }
        }["useUnlinkProfile.useMutation"]
    });
} //# sourceMappingURL=useUnlinkProfile.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/wallets/useProfiles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProfiles",
    ()=>useProfiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-client] (ecmascript)");
;
;
;
;
function useProfiles(args) {
    const wallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnectedWallets"])();
    const enabled = wallets.length > 0 && wallets.some((w)=>w.id === "inApp" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled,
        queryFn: {
            "useProfiles.useQuery": async ()=>{
                const ecosystemWallet = wallets.find({
                    "useProfiles.useQuery.ecosystemWallet": (w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w)
                }["useProfiles.useQuery.ecosystemWallet"]);
                const ecosystem = ecosystemWallet ? {
                    id: ecosystemWallet.id,
                    partnerId: ecosystemWallet.getConfig()?.partnerId
                } : undefined;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProfiles"])({
                    client: args.client,
                    ecosystem
                });
            }
        }["useProfiles.useQuery"],
        queryKey: [
            "profiles",
            wallets.map({
                "useProfiles.useQuery": (w)=>`${w.id}-${w.getAccount()?.address}`
            }["useProfiles.useQuery"])
        ]
    });
} //# sourceMappingURL=useProfiles.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/x402/useFetchWithPayment.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchWithPayment",
    ()=>useFetchWithPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$x402$2f$useFetchWithPaymentCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/x402/useFetchWithPaymentCore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$RootElementContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/RootElementContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$useConnectModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/useConnectModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$PaymentErrorModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/x402/PaymentErrorModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$SignInRequiredModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/x402/SignInRequiredModal.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function useFetchWithPayment(client, options) {
    const setRootEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$RootElementContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SetRootElementContext"]);
    const { connect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$useConnectModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnectModal"])();
    const theme = options?.theme || "dark";
    const showModal = options?.uiEnabled !== false; // Default to true
    const showErrorModal = showModal ? (data)=>{
        setRootEl((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$PaymentErrorModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentErrorModal"], {
            client: client,
            errorData: data.errorData,
            onCancel: ()=>{
                setRootEl(null);
                data.onCancel();
            },
            onRetry: ()=>{
                setRootEl(null);
                data.onRetry();
            },
            theme: theme,
            fundWalletOptions: options?.fundWalletOptions,
            paymentRequirementsSelector: options?.paymentRequirementsSelector
        }));
    } : undefined;
    const showConnectModal = showModal ? (data)=>{
        // First, show the SignInRequiredModal
        setRootEl((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$SignInRequiredModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignInRequiredModal"], {
            theme: theme,
            title: options?.signInRequiredModal?.title,
            description: options?.signInRequiredModal?.description,
            buttonLabel: options?.signInRequiredModal?.buttonLabel,
            onSignIn: async ()=>{
                // Close the SignInRequiredModal
                setRootEl(null);
                // Open the ConnectModal
                try {
                    const connectedWallet = await connect({
                        client,
                        theme,
                        ...options?.connectOptions
                    });
                    // On successful connection, trigger onConnect callback with the wallet
                    data.onConnect(connectedWallet);
                } catch (_error) {
                    // User cancelled the connection
                    data.onCancel();
                }
            },
            onCancel: ()=>{
                setRootEl(null);
                data.onCancel();
            }
        }));
    } : undefined;
    // Default to webLocalStorage for permit signature caching
    const resolvedOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useFetchWithPayment.useMemo[resolvedOptions]": ()=>({
                ...options ?? {},
                storage: options?.storage ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webLocalStorage"]
            })
    }["useFetchWithPayment.useMemo[resolvedOptions]"], [
        options
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$x402$2f$useFetchWithPaymentCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetchWithPaymentCore"])(client, resolvedOptions, showErrorModal, showConnectModal);
} //# sourceMappingURL=useFetchWithPayment.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_react_web_16967f95._.js.map