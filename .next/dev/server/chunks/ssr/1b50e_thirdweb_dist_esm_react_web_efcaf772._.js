module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/providers/wallet-ui-states-provider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const WalletModalOpen = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(false);
const SetWalletModalOpen = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(()=>{});
const SelectionUIDataCtx = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
const SetSelectionUIDataCtx = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(()=>{});
const WalletUIStatesProvider = (props)=>{
    const [isWalletModalOpen, setIsWalletModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(props.isOpen);
    const [selectionUIData, setSelectionUIData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}); // allow any type of object
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(WalletModalOpen.Provider, {
        value: isWalletModalOpen,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SetWalletModalOpen.Provider, {
            value: setIsWalletModalOpen,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SelectionUIDataCtx.Provider, {
                value: selectionUIData,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SetSelectionUIDataCtx.Provider, {
                    value: setSelectionUIData,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomThemeProvider"], {
                        theme: props.theme,
                        children: props.children
                    })
                })
            })
        })
    });
};
const useIsWalletModalOpen = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(WalletModalOpen);
};
const useSetIsWalletModalOpen = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SetWalletModalOpen);
    if (context === undefined) {
        throw new Error("useSetWalletModalOpen must be used within a ThirdwebProvider");
    }
    return context;
};
function useSetSelectionData() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SetSelectionUIDataCtx);
}
function useSelectionData() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SelectionUIDataCtx);
} //# sourceMappingURL=wallet-ui-states-provider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/canFitWideModal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canFitWideModal",
    ()=>canFitWideModal
]);
;
function canFitWideModal() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return false;
} //# sourceMappingURL=canFitWideModal.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/cls.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/sortWallets.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sortWallets",
    ()=>sortWallets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$mipdStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-ssr] (ecmascript)");
;
function sortWallets(wallets, recommendedWallets) {
    const providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$injected$2f$mipdStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInstalledWalletProviders"])();
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/usePreloadWalletProviders.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePreloadWalletProviders",
    ()=>usePreloadWalletProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-ssr] (ecmascript)");
;
;
;
function usePreloadWalletProviders({ wallets }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueries"])({
        queries: wallets.filter((w)=>w.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COINBASE"] || w.id === "inApp" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w.id)).map((w)=>({
                queryFn: async ()=>{
                    switch(true){
                        case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COINBASE"] === w.id:
                            {
                                const { getCoinbaseWebProvider } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/coinbase/coinbase-web.js [app-ssr] (ecmascript, async loader)");
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
                },
                queryKey: [
                    "preload-wallet",
                    w.id
                ]
            }))
    });
} //# sourceMappingURL=usePreloadWalletProviders.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/utils/resolveMimeType.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveMimeType",
    ()=>resolveMimeType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$MediaRenderer$2f$mime$2f$mime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/MediaRenderer/mime/mime.js [app-ssr] (ecmascript)");
;
async function resolveMimeType(url) {
    if (!url) {
        return undefined;
    }
    const mimeType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$MediaRenderer$2f$mime$2f$mime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMimeTypeFromUrl"])(url);
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/adapters/WindowAdapter.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/wallets/useAutoConnect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoConnect",
    ()=>useAutoConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$create$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/create-wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$defaultWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/defaultWallets.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useAutoConnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useAutoConnect.js [app-ssr] (ecmascript)");
;
;
;
;
function useAutoConnect(props) {
    const wallets = props.wallets || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$defaultWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultWallets"])(props);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useAutoConnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAutoConnectCore"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["webLocalStorage"], {
        ...props,
        wallets
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$create$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createWallet"]);
} //# sourceMappingURL=useAutoConnect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/wallets/useUnlinkProfile.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUnlinkProfile",
    ()=>useUnlinkProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-ssr] (ecmascript)");
;
;
;
;
function useUnlinkProfile() {
    const wallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectedWallets"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async ({ client, profileToUnlink, allowAccountDeletion = false })=>{
            const ecosystemWallet = wallets.find((w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w));
            const ecosystem = ecosystemWallet ? {
                id: ecosystemWallet.id,
                partnerId: ecosystemWallet.getConfig()?.partnerId
            } : undefined;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unlinkProfile"])({
                allowAccountDeletion,
                client,
                ecosystem,
                profileToUnlink
            });
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    "profiles"
                ]
            });
        }
    });
} //# sourceMappingURL=useUnlinkProfile.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/wallets/useProfiles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProfiles",
    ()=>useProfiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/web/lib/auth/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-ssr] (ecmascript)");
;
;
;
;
function useProfiles(args) {
    const wallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectedWallets"])();
    const enabled = wallets.length > 0 && wallets.some((w)=>w.id === "inApp" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled,
        queryFn: async ()=>{
            const ecosystemWallet = wallets.find((w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(w));
            const ecosystem = ecosystemWallet ? {
                id: ecosystemWallet.id,
                partnerId: ecosystemWallet.getConfig()?.partnerId
            } : undefined;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$web$2f$lib$2f$auth$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProfiles"])({
                client: args.client,
                ecosystem
            });
        },
        queryKey: [
            "profiles",
            wallets.map((w)=>`${w.id}-${w.getAccount()?.address}`)
        ]
    });
} //# sourceMappingURL=useProfiles.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/hooks/x402/useFetchWithPayment.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchWithPayment",
    ()=>useFetchWithPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$x402$2f$useFetchWithPaymentCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/x402/useFetchWithPaymentCore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$RootElementContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/RootElementContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$useConnectModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/useConnectModal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$PaymentErrorModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/x402/PaymentErrorModal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$SignInRequiredModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/x402/SignInRequiredModal.js [app-ssr] (ecmascript)");
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
    const setRootEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$RootElementContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SetRootElementContext"]);
    const { connect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$useConnectModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectModal"])();
    const theme = options?.theme || "dark";
    const showModal = options?.uiEnabled !== false; // Default to true
    const showErrorModal = showModal ? (data)=>{
        setRootEl((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$PaymentErrorModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentErrorModal"], {
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
        setRootEl((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$x402$2f$SignInRequiredModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignInRequiredModal"], {
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
    const resolvedOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            ...options ?? {},
            storage: options?.storage ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["webLocalStorage"]
        }), [
        options
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$x402$2f$useFetchWithPaymentCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFetchWithPaymentCore"])(client, resolvedOptions, showErrorModal, showConnectModal);
} //# sourceMappingURL=useFetchWithPayment.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_react_web_efcaf772._.js.map