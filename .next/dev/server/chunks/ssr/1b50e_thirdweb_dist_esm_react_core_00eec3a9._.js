module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveWallet",
    ()=>useActiveWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
;
function useActiveWallet() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useActiveWallet");
    const store = manager.activeWalletStore;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(store.subscribe, store.getValue, store.getValue);
} //# sourceMappingURL=useActiveWallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/x402/useFetchWithPaymentCore.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchWithPaymentCore",
    ()=>useFetchWithPaymentCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$fetchWithPayment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/fetchWithPayment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function useFetchWithPaymentCore(client, options, showErrorModal, showConnectModal) {
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveWallet"])();
    const mutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async ({ input, init })=>{
            // Recursive function that handles fetch + 402 error + retry
            const executeFetch = async (currentWallet = wallet)=>{
                if (!currentWallet) {
                    // If a connect modal handler is provided, show the connect modal
                    if (showConnectModal) {
                        return new Promise((resolve, reject)=>{
                            showConnectModal({
                                onConnect: async (newWallet)=>{
                                    // After connection, retry the fetch with the newly connected wallet
                                    try {
                                        const result = await executeFetch(newWallet);
                                        resolve(result);
                                    } catch (error) {
                                        reject(error);
                                    }
                                },
                                onCancel: ()=>{
                                    reject(new Error("Wallet connection cancelled by user"));
                                }
                            });
                        });
                    }
                    // If no connect modal handler, throw an error
                    throw new Error("No wallet connected. Please connect your wallet to make paid API calls.");
                }
                const wrappedFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$fetchWithPayment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wrapFetchWithPayment"])(globalThis.fetch, client, currentWallet, {
                    maxValue: options?.maxValue,
                    paymentRequirementsSelector: options?.paymentRequirementsSelector,
                    storage: options?.storage
                });
                const response = await wrappedFetch(input, init);
                // Check if we got a 402 response (payment error)
                if (response.status === 402) {
                    try {
                        const errorBody = await response.json();
                        // If a modal handler is provided, show the modal and handle retry/cancel
                        if (showErrorModal) {
                            return new Promise((resolve, reject)=>{
                                showErrorModal({
                                    errorData: errorBody,
                                    onRetry: async ()=>{
                                        // Retry the entire fetch+error handling logic recursively
                                        // Pass currentWallet to avoid re-showing connect modal with stale wallet state
                                        try {
                                            const result = await executeFetch(currentWallet);
                                            resolve(result);
                                        } catch (error) {
                                            reject(error);
                                        }
                                    },
                                    onCancel: ()=>{
                                        reject(new Error("Payment cancelled by user"));
                                    }
                                });
                            });
                        }
                        // If no modal handler, throw the error with details
                        throw new Error(errorBody.errorMessage || `Payment failed: ${errorBody.error}`);
                    } catch (_parseError) {
                        // If we can't parse the error body, throw a generic error
                        throw new Error("Payment failed with status 402");
                    }
                }
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Payment failed with status ${response.status} ${response.statusText} - ${errorText || "Unknown error"}`);
                }
                const parseAs = options?.parseAs ?? "json";
                return parseResponse(response, parseAs);
            };
            // Start the fetch process
            return executeFetch();
        }
    });
    return {
        fetchWithPayment: async (input, init)=>{
            return mutation.mutateAsync({
                input,
                init
            });
        },
        ...mutation
    };
}
function parseResponse(response, parseAs) {
    if (parseAs === "json") {
        return response.json();
    } else if (parseAs === "text") {
        return response.text();
    } else if (parseAs === "raw") {
        return response;
    } else {
        throw new Error(`Invalid parseAs option: ${parseAs}`);
    }
} //# sourceMappingURL=useFetchWithPaymentCore.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "darkTheme",
    ()=>darkTheme,
    "darkThemeObj",
    ()=>darkThemeObj,
    "fontSize",
    ()=>fontSize,
    "iconSize",
    ()=>iconSize,
    "lightTheme",
    ()=>lightTheme,
    "lightThemeObj",
    ()=>lightThemeObj,
    "media",
    ()=>media,
    "radius",
    ()=>radius,
    "shadow",
    ()=>shadow,
    "spacing",
    ()=>spacing
]);
const darkThemeObj = {
    type: "dark",
    colors: {
        accentButtonBg: "hsl(221 83% 54%)",
        accentButtonText: "hsl(0 0% 100%)",
        accentText: "hsl(209.61deg 100% 65.31%)",
        borderColor: "hsl(0 0% 15%)",
        connectedButtonBg: "hsl(0 0% 3.92%)",
        connectedButtonBgHover: "hsl(0 0% 11%)",
        danger: "hsl(360 72% 55%)",
        inputAutofillBg: "hsl(0 0% 11%)",
        modalBg: "hsl(0 0% 3.92%)",
        primaryButtonBg: "hsl(0 0% 100%)",
        primaryButtonText: "hsl(0 0% 0%)",
        primaryText: "hsl(0 0% 98%)",
        scrollbarBg: "hsl(0 0% 11%)",
        secondaryButtonBg: "hsl(0 0% 9%)",
        modalOverlayBg: "rgba(0, 0, 0, 0.7)",
        secondaryButtonHoverBg: "hsl(0 0% 9%/80%)",
        secondaryButtonText: "hsl(0 0% 98%)",
        secondaryIconColor: "hsl(0 0% 63%)",
        secondaryIconHoverBg: "hsl(0 0% 11%)",
        secondaryIconHoverColor: "hsl(0 0% 98%)",
        secondaryText: "hsl(0 0% 63%)",
        selectedTextBg: "hsl(0 0% 100%)",
        selectedTextColor: "hsl(0 0% 0%)",
        separatorLine: "hsl(0 0% 15%)",
        skeletonBg: "hsl(0 0% 12%)",
        success: "hsl(142 75% 50%)",
        tertiaryBg: "hsl(0 0% 11%/50%)",
        tooltipBg: "hsl(0 0% 11%)",
        tooltipText: "hsl(0 0% 98%)"
    },
    fontFamily: "inherit"
};
const lightThemeObj = {
    type: "light",
    colors: {
        accentButtonBg: "hsl(221 83% 54%)",
        accentButtonText: "hsl(0 0% 100%)",
        accentText: "hsl(211.23deg 100% 44.47%)",
        borderColor: "hsl(0 0% 85%)",
        connectedButtonBg: "hsl(0 0% 100%)",
        connectedButtonBgHover: "hsl(0 0% 93%)",
        danger: "hsl(360 72% 60%)",
        inputAutofillBg: "hsl(0 0% 93%)",
        modalBg: "hsl(0 0% 100%)",
        primaryButtonBg: "hsl(0 0% 4%)",
        primaryButtonText: "hsl(0 0% 100%)",
        primaryText: "hsl(0 0% 4%)",
        scrollbarBg: "hsl(0 0% 93%)",
        secondaryButtonBg: "hsl(0 0% 93%)",
        modalOverlayBg: "rgba(0, 0, 0, 0.7)",
        secondaryButtonHoverBg: "hsl(0 0% 93%/80%)",
        secondaryButtonText: "hsl(0 0% 4%)",
        secondaryIconColor: "hsl(0 0% 40%)",
        secondaryIconHoverBg: "hsl(0 0% 93%)",
        secondaryIconHoverColor: "hsl(0 0% 4%)",
        secondaryText: "hsl(0 0% 40%)",
        selectedTextBg: "hsl(0 0% 4%)",
        selectedTextColor: "hsl(0 0% 100%)",
        separatorLine: "hsl(0 0% 85%)",
        skeletonBg: "hsl(0 0% 85%)",
        success: "hsl(142.09 70.56% 35.29%)",
        tertiaryBg: "hsl(0 0% 93%/70%)",
        tooltipBg: "hsl(0 0% 100%)",
        tooltipText: "hsl(0 0% 4%)"
    },
    fontFamily: "inherit"
};
const fontSize = {
    "3xl": "48px",
    lg: "20px",
    md: "16px",
    sm: "14px",
    xl: "24px",
    xs: "12px",
    xxl: "32px"
};
const spacing = {
    "3xl": "64px",
    "3xs": "4px",
    "4xs": "2px",
    lg: "24px",
    md: "16px",
    "md+": "20px",
    sm: "12px",
    xl: "32px",
    xs: "8px",
    xxl: "48px",
    xxs: "6px"
};
const radius = {
    lg: "12px",
    md: "8px",
    sm: "6px",
    xl: "20px",
    xs: "4px",
    xxl: "32px",
    full: "9999px"
};
const iconSize = {
    "3xl": "96",
    "4xl": "128",
    lg: "32",
    md: "24",
    "sm+": "20",
    sm: "16",
    xl: "48",
    xs: "12",
    xxl: "64"
};
const media = {
    mobile: "@media (max-width: 640px)"
};
const shadow = {
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
};
function lightTheme(overrides) {
    if (!overrides) {
        return lightThemeObj;
    }
    return applyThemeOverrides(lightThemeObj, overrides);
}
function darkTheme(overrides) {
    if (!overrides) {
        return darkThemeObj;
    }
    return applyThemeOverrides(darkThemeObj, overrides);
}
/**
 * @internal
 */ function applyThemeOverrides(baseTheme, themeOverrides) {
    const theme = {
        ...baseTheme
    };
    if (themeOverrides.colors) {
        theme.colors = {
            ...theme.colors,
            ...themeOverrides.colors
        };
    }
    if (themeOverrides.fontFamily) {
        theme.fontFamily = themeOverrides.fontFamily;
    }
    return theme;
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomThemeProvider",
    ()=>CustomThemeProvider,
    "parseTheme",
    ()=>parseTheme,
    "useCustomTheme",
    ()=>useCustomTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const CustomThemeCtx = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darkThemeObj"]);
function CustomThemeProvider(props) {
    const { theme, children } = props;
    const themeObj = parseTheme(theme);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CustomThemeCtx.Provider, {
        value: themeObj,
        children: children
    });
}
function parseTheme(theme) {
    if (!theme || !isValidTheme(theme)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darkThemeObj"];
    }
    let themeObj;
    if (typeof theme === "string") {
        themeObj = theme === "light" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lightThemeObj"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darkThemeObj"];
    } else {
        themeObj = theme;
    }
    return themeObj;
}
function isValidTheme(theme) {
    return theme === "dark" || theme === "light" || typeof theme === "object" && theme !== null && "colors" in theme;
}
function useCustomTheme() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CustomThemeCtx);
} //# sourceMappingURL=CustomThemeProvider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveAccount.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveAccount",
    ()=>useActiveAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
;
function useActiveAccount() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useActiveAccount");
    const store = manager.activeAccountStore;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(store.subscribe, store.getValue, store.getValue);
} //# sourceMappingURL=useActiveAccount.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/auth/useSiweAuth.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSiweAuth",
    ()=>useSiweAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
;
function useSiweAuth(activeWallet, activeAccount, authOptions) {
    const requiresAuth = !!authOptions;
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const isLoggedInQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: requiresAuth && !!activeAccount?.address,
        gcTime: 0,
        placeholderData: false,
        queryFn: ()=>{
            // these cases should never be hit but just in case...
            if (!authOptions || !activeAccount?.address) {
                return false;
            }
            return authOptions.isLoggedIn(activeAccount.address);
        },
        queryKey: [
            "siwe_auth",
            "isLoggedIn",
            activeAccount?.address
        ],
        refetchOnWindowFocus: false
    });
    const loginMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async ()=>{
            if (!authOptions) {
                throw new Error("No auth options provided");
            }
            if (!activeWallet) {
                throw new Error("No active wallet");
            }
            const chain = activeWallet.getChain();
            if (!chain) {
                throw new Error("No active chain");
            }
            if (!activeAccount) {
                throw new Error("No active account");
            }
            const [payload, { signLoginPayload }] = await Promise.all([
                authOptions.getLoginPayload({
                    address: activeAccount.address,
                    chainId: chain.id
                }),
                __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/sign-login-payload.js [app-ssr] (ecmascript, async loader)")
            ]);
            if (payload.chain_id && Number(payload.chain_id) !== chain.id) {
                await activeWallet.switchChain((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(Number(payload.chain_id)));
            }
            const signedPayload = await signLoginPayload({
                account: activeAccount,
                payload
            });
            return await authOptions.doLogin(signedPayload);
        },
        mutationKey: [
            "siwe_auth",
            "login",
            activeAccount?.address
        ],
        onSuccess: ()=>{
            return queryClient.invalidateQueries({
                queryKey: [
                    "siwe_auth",
                    "isLoggedIn"
                ]
            });
        }
    });
    const logoutMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async ()=>{
            if (!authOptions) {
                throw new Error("No auth options provided");
            }
            return await authOptions.doLogout();
        },
        mutationKey: [
            "siwe_auth",
            "logout",
            activeAccount?.address
        ],
        onSuccess: ()=>{
            return queryClient.invalidateQueries({
                queryKey: [
                    "siwe_auth",
                    "isLoggedIn"
                ]
            });
        }
    });
    return {
        // login
        doLogin: loginMutation.mutateAsync,
        // logout
        doLogout: logoutMutation.mutateAsync,
        isLoading: isLoggedInQuery.isFetching,
        // checking if logged in
        isLoggedIn: isLoggedInQuery.data,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        isPending: isLoggedInQuery.isPending,
        // is auth even enabled
        requiresAuth
    };
} //# sourceMappingURL=useSiweAuth.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConnectedWallets",
    ()=>useConnectedWallets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
;
function useConnectedWallets() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useConnectedWallets");
    const store = manager.connectedWallets;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(store.subscribe, store.getValue, store.getValue);
} //# sourceMappingURL=useConnectedWallets.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useAdminWallet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdminWallet",
    ()=>useAdminWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-ssr] (ecmascript)");
;
;
function useAdminWallet() {
    const activeWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveWallet"])();
    const connectedWallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectedWallets"])();
    const adminAccount = activeWallet?.getAdminAccount?.();
    if (!adminAccount) {
        // If the active wallet doesn't have an admin account, return the active wallet
        return activeWallet;
    }
    // If the active wallet has an admin account, find the admin wallet in connected wallets and return it
    return connectedWallets.find((wallet)=>wallet.getAccount()?.address?.toLowerCase() === adminAccount?.address?.toLowerCase());
} //# sourceMappingURL=useAdminWallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useDisconnect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDisconnect",
    ()=>useDisconnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
function useDisconnect() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useDisconnect");
    const disconnect = manager.disconnectWallet;
    return {
        disconnect
    };
} //# sourceMappingURL=useDisconnect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/wait.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "wait",
    ()=>wait
]);
const wait = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms)); //# sourceMappingURL=wait.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/storage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAST_AUTH_PROVIDER_STORAGE_KEY",
    ()=>LAST_AUTH_PROVIDER_STORAGE_KEY,
    "getLastAuthProvider",
    ()=>getLastAuthProvider,
    "setLastAuthProvider",
    ()=>setLastAuthProvider
]);
const LAST_AUTH_PROVIDER_STORAGE_KEY = "lastAuthProvider";
async function setLastAuthProvider(authProvider, storage) {
    await storage.setItem(LAST_AUTH_PROVIDER_STORAGE_KEY, authProvider);
}
async function getLastAuthProvider(storage) {
    return await storage.getItem(LAST_AUTH_PROVIDER_STORAGE_KEY);
} //# sourceMappingURL=storage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useWalletBalance.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletBalance",
    ()=>useWalletBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$getWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/getWalletBalance.js [app-ssr] (ecmascript)");
;
;
function useWalletBalance(options, queryOptions) {
    const { chain, address, tokenAddress, client } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        ...queryOptions,
        enabled: (queryOptions?.enabled === undefined || queryOptions.enabled) && !!chain && !!client && !!address,
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chain is required");
            }
            if (!client) {
                throw new Error("client is required");
            }
            if (!address) {
                throw new Error("address is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$getWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletBalance"])({
                address,
                chain,
                client,
                tokenAddress
            });
        },
        queryKey: [
            "walletBalance",
            chain?.id || -1,
            address || "0x0",
            {
                tokenAddress
            }
        ]
    });
} //# sourceMappingURL=useWalletBalance.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/social/useSocialProfiles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSocialProfiles",
    ()=>useSocialProfiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$social$2f$profiles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/social/profiles.js [app-ssr] (ecmascript)");
;
;
function useSocialProfiles(options) {
    const { client, address } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!address,
        queryFn: async ()=>{
            if (!address) {
                throw new Error("Address is required, should not have reached this point.");
            }
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$social$2f$profiles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSocialProfiles"])({
                address,
                client
            });
        },
        queryKey: [
            "social-profiles",
            address
        ],
        retry: false
    });
} //# sourceMappingURL=useSocialProfiles.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/wallet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConnectedWalletDetails",
    ()=>useConnectedWalletDetails,
    "useEnsAvatar",
    ()=>useEnsAvatar,
    "useEnsName",
    ()=>useEnsName,
    "useWalletImage",
    ()=>useWalletImage,
    "useWalletInfo",
    ()=>useWalletInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$ethereum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/ethereum.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$ens$2f$resolve$2d$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/ens/resolve-avatar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$ens$2f$resolve$2d$name$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/ens/resolve-name.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/avatar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useWalletBalance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$social$2f$useSocialProfiles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/social/useSocialProfiles.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
function useEnsName(options) {
    const { client, address } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!address,
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$ens$2f$resolve$2d$name$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveName"])({
                address: address || "",
                client,
                resolverChain: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$ethereum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ethereum"]
            }),
        queryKey: [
            "ens-name",
            address
        ]
    });
}
function useEnsAvatar(options) {
    const { client, ensName } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!ensName,
        queryFn: async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$ens$2f$resolve$2d$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAvatar"])({
                client,
                name: ensName || ""
            }),
        queryKey: [
            "ens-avatar",
            ensName
        ]
    });
}
function useConnectedWalletDetails(client, walletChain, activeAccount, displayBalanceToken) {
    const tokenAddress = walletChain && displayBalanceToken ? displayBalanceToken[Number(walletChain.id)] : undefined;
    const ensNameQuery = useEnsName({
        address: activeAccount?.address,
        client
    });
    const ensAvatarQuery = useEnsAvatar({
        client,
        ensName: ensNameQuery.data
    });
    const socialProfileQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$social$2f$useSocialProfiles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSocialProfiles"])({
        address: activeAccount?.address,
        client
    });
    const shortAddress = activeAccount?.address ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shortenAddress"])(activeAccount.address, 4) : "";
    const balanceQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletBalance"])({
        address: activeAccount?.address,
        chain: walletChain ? walletChain : undefined,
        client,
        tokenAddress
    });
    const addressOrENS = ensNameQuery.data || shortAddress;
    const pfpUnresolved = socialProfileQuery.data?.filter((p)=>p.avatar)[0]?.avatar;
    const { data: pfp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!pfpUnresolved,
        queryFn: async ()=>{
            if (!pfpUnresolved) {
                return undefined;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAvatarRecord"])({
                client,
                uri: pfpUnresolved
            });
        },
        queryKey: [
            "ens-avatar",
            pfpUnresolved
        ],
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    const name = socialProfileQuery.data?.filter((p)=>p.name)[0]?.name || addressOrENS;
    return {
        addressOrENS,
        balanceQuery,
        ensAvatarQuery,
        ensNameQuery,
        name,
        pfp,
        shortAddress,
        socialProfileQuery
    };
}
function useWalletInfo(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!id,
        queryFn: ()=>{
            if (!id) {
                throw new Error("Wallet id is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletInfo"])(id, false);
        },
        queryKey: [
            "wallet-info",
            id
        ],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false
    });
}
function useWalletImage(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!id,
        queryFn: async ()=>{
            if (!id) {
                throw new Error("Wallet id is required");
            }
            const { getInstalledWalletProviders } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-ssr] (ecmascript, async loader)");
            const mipdImage = getInstalledWalletProviders().find((x)=>x.info.rdns === id)?.info.icon;
            if (mipdImage) {
                return mipdImage;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletInfo"])(id, true);
        },
        queryKey: [
            "wallet-image",
            id
        ],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false
    });
} //# sourceMappingURL=wallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/wallet/provider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletProvider",
    ()=>WalletProvider,
    "WalletProviderContext",
    ()=>WalletProviderContext,
    "useWalletContext",
    ()=>useWalletContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const WalletProviderContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function WalletProvider(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(WalletProviderContext.Provider, {
        value: props,
        children: props.children
    });
}
function useWalletContext() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(WalletProviderContext);
    if (!ctx) {
        throw new Error("WalletProviderContext not found. Make sure you are using WalletIcon, WalletName, etc. inside a <WalletProvider /> component");
    }
    return ctx;
} //# sourceMappingURL=provider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/walletIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchWalletImage",
    ()=>fetchWalletImage,
    "genericTokenIcon",
    ()=>genericTokenIcon,
    "genericWalletIcon",
    ()=>genericWalletIcon,
    "getSocialIcon",
    ()=>getSocialIcon,
    "socialIcons",
    ()=>socialIcons,
    "useWalletIcon",
    ()=>useWalletIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$wallet$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/wallet/provider.js [app-ssr] (ecmascript)");
;
;
;
// TODO make the social icons usable in RN too
const googleIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MDUuNiIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxODYuNjkgMTkwLjUiIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE4NC41ODMgNzY1LjE3MSkiPjxwYXRoIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIgZD0iTS0xMDg5LjMzMy02ODcuMjM5djM2Ljg4OGg1MS4yNjJjLTIuMjUxIDExLjg2My05LjAwNiAyMS45MDgtMTkuMTM3IDI4LjY2MmwzMC45MTMgMjMuOTg2YzE4LjAxMS0xNi42MjUgMjguNDAyLTQxLjA0NCAyOC40MDItNzAuMDUyIDAtNi43NTQtLjYwNi0xMy4yNDktMS43MzItMTkuNDgzeiIgZmlsbD0iIzQyODVmNCIvPjxwYXRoIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIgZD0iTS0xMTQyLjcxNC02NTEuNzkxbC02Ljk3MiA1LjMzNy0yNC42NzkgMTkuMjIzaDBjMTUuNjczIDMxLjA4NiA0Ny43OTYgNTIuNTYxIDg1LjAzIDUyLjU2MSAyNS43MTcgMCA0Ny4yNzgtOC40ODYgNjMuMDM4LTIzLjAzM2wtMzAuOTEzLTIzLjk4NmMtOC40ODYgNS43MTUtMTkuMzEgOS4xNzktMzIuMTI1IDkuMTc5LTI0Ljc2NSAwLTQ1LjgwNi0xNi43MTItNTMuMzQtMzkuMjI2eiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIgZD0iTS0xMTc0LjM2NS03MTIuNjFjLTYuNDk0IDEyLjgxNS0xMC4yMTcgMjcuMjc2LTEwLjIxNyA0Mi42ODlzMy43MjMgMjkuODc0IDEwLjIxNyA0Mi42ODljMCAuMDg2IDMxLjY5My0yNC41OTIgMzEuNjkzLTI0LjU5Mi0xLjkwNS01LjcxNS0zLjAzMS0xMS43NzYtMy4wMzEtMTguMDk4czEuMTI2LTEyLjM4MyAzLjAzMS0xOC4wOTh6IiBmaWxsPSIjZmJiYzA1Ii8+PHBhdGggZD0iTS0xMDg5LjMzMy03MjcuMjQ0YzE0LjAyOCAwIDI2LjQ5NyA0Ljg0OSAzNi40NTUgMTQuMjAxbDI3LjI3Ni0yNy4yNzZjLTE2LjUzOS0xNS40MTMtMzguMDEzLTI0Ljg1Mi02My43MzEtMjQuODUyLTM3LjIzNCAwLTY5LjM1OSAyMS4zODgtODUuMDMyIDUyLjU2MWwzMS42OTIgMjQuNTkyYzcuNTMzLTIyLjUxNCAyOC41NzUtMzkuMjI2IDUzLjM0LTM5LjIyNnoiIGZpbGw9IiNlYTQzMzUiIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIvPjwvZz48L3N2Zz4=";
const facebookIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iRWJlbmUgMSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgaWQ9ImZhY2Vib29rLWxvZ28tMjAxOSI+PHBhdGggZmlsbD0iIzE4NzdmMiIgZD0iTTEwMjQsNTEyQzEwMjQsMjI5LjIzMDE2LDc5NC43Njk3OCwwLDUxMiwwUzAsMjI5LjIzMDE2LDAsNTEyYzAsMjU1LjU1NCwxODcuMjMxLDQ2Ny4zNzAxMiw0MzIsNTA1Ljc3Nzc3VjY2MEgzMDJWNTEySDQzMlYzOTkuMkM0MzIsMjcwLjg3OTgyLDUwOC40Mzg1NCwyMDAsNjI1LjM4OTIyLDIwMCw2ODEuNDA3NjUsMjAwLDc0MCwyMTAsNzQwLDIxMFYzMzZINjc1LjQzNzEzQzYxMS44MzUwOCwzMzYsNTkyLDM3NS40NjY2Nyw1OTIsNDE1Ljk1NzI4VjUxMkg3MzRMNzExLjMsNjYwSDU5MnYzNTcuNzc3NzdDODM2Ljc2OSw5NzkuMzcwMTIsMTAyNCw3NjcuNTU0LDEwMjQsNTEyWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03MTEuMyw2NjAsNzM0LDUxMkg1OTJWNDE1Ljk1NzI4QzU5MiwzNzUuNDY2NjcsNjExLjgzNTA4LDMzNiw2NzUuNDM3MTMsMzM2SDc0MFYyMTBzLTU4LjU5MjM1LTEwLTExNC42MTA3OC0xMEM1MDguNDM4NTQsMjAwLDQzMiwyNzAuODc5ODIsNDMyLDM5OS4yVjUxMkgzMDJWNjYwSDQzMnYzNTcuNzc3NzdhNTE3LjM5NjE5LDUxNy4zOTYxOSwwLDAsMCwxNjAsMFY2NjBaIj48L3BhdGg+PC9zdmc+";
const appleIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDM4IiBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9IjAgMCA0OTYuMjU1IDYwOC43MjgiIGlkPSJhcHBsZSI+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTI3My44MSA1Mi45NzNDMzEzLjgwNi4yNTcgMzY5LjQxIDAgMzY5LjQxIDBzOC4yNzEgNDkuNTYyLTMxLjQ2MyA5Ny4zMDZjLTQyLjQyNiA1MC45OC05MC42NDkgNDIuNjM4LTkwLjY0OSA0Mi42MzhzLTkuMDU1LTQwLjA5NCAyNi41MTItODYuOTcxek0yNTIuMzg1IDE3NC42NjJjMjAuNTc2IDAgNTguNzY0LTI4LjI4NCAxMDguNDcxLTI4LjI4NCA4NS41NjIgMCAxMTkuMjIyIDYwLjg4MyAxMTkuMjIyIDYwLjg4M3MtNjUuODMzIDMzLjY1OS02NS44MzMgMTE1LjMzMWMwIDkyLjEzMyA4Mi4wMSAxMjMuODg1IDgyLjAxIDEyMy44ODVzLTU3LjMyOCAxNjEuMzU3LTEzNC43NjIgMTYxLjM1N2MtMzUuNTY1IDAtNjMuMjE1LTIzLjk2Ny0xMDAuNjg4LTIzLjk2Ny0zOC4xODggMC03Ni4wODQgMjQuODYxLTEwMC43NjYgMjQuODYxQzg5LjMzIDYwOC43MyAwIDQ1NS42NjYgMCAzMzIuNjI4YzAtMTIxLjA1MiA3NS42MTItMTg0LjU1NCAxNDYuNTMzLTE4NC41NTQgNDYuMTA1IDAgODEuODgzIDI2LjU4OCAxMDUuODUyIDI2LjU4OHoiPjwvcGF0aD48L3N2Zz4=";
const discordIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBpZD0iZGlzY29yZCI+PHBhdGggZmlsbD0iIzY2NjVkMiIgZD0iTTg1LjIyLDI0Ljk1OGMtMTEuNDU5LTguNTc1LTIyLjQzOC04LjMzNC0yMi40MzgtOC4zMzRsLTEuMTIyLDEuMjgyCgkJCQljMTMuNjIzLDQuMDg3LDE5Ljk1NCwxMC4wOTcsMTkuOTU0LDEwLjA5N2MtMTkuNDkxLTEwLjczMS00NC4zMTctMTAuNjU0LTY0LjU5LDBjMCwwLDYuNTcxLTYuMzMxLDIwLjk5Ni0xMC40MThsLTAuODAxLTAuOTYyCgkJCQljMCwwLTEwLjg5OS0wLjI0LTIyLjQzOCw4LjMzNGMwLDAtMTEuNTQsMjAuNzU1LTExLjU0LDQ2LjMxOWMwLDAsNi43MzIsMTEuNTQsMjQuNDQyLDEyLjEwMWMwLDAsMi45NjUtMy41MjYsNS4zNjktNi41NzEKCQkJCWMtMTAuMTc3LTMuMDQ1LTE0LjAyNC05LjM3Ni0xNC4wMjQtOS4zNzZjNi4zOTQsNC4wMDEsMTIuODU5LDYuNTA1LDIwLjkxNiw4LjA5NGMxMy4xMDgsMi42OTgsMjkuNDEzLTAuMDc2LDQxLjU5MS04LjA5NAoJCQkJYzAsMC00LjAwNyw2LjQ5MS0xNC41MDUsOS40NTZjMi40MDQsMi45NjUsNS4yODksNi40MTEsNS4yODksNi40MTFjMTcuNzEtMC41NjEsMjQuNDQxLTEyLjEwMSwyNC40NDEtMTIuMDIKCQkJCUM5Ni43NTksNDUuNzEzLDg1LjIyLDI0Ljk1OCw4NS4yMiwyNC45NTh6IE0zNS4wNTUsNjMuODI0Yy00LjQ4OCwwLTguMTc0LTMuOTI3LTguMTc0LTguODE1CgkJCQljMC4zMjgtMTEuNzA3LDE2LjEwMi0xMS42NzEsMTYuMzQ4LDBDNDMuMjI5LDU5Ljg5NywzOS42MjIsNjMuODI0LDM1LjA1NSw2My44MjR6IE02NC4zMDQsNjMuODI0CgkJCQljLTQuNDg4LDAtOC4xNzQtMy45MjctOC4xNzQtOC44MTVjMC4zNi0xMS42ODQsMTUuOTM3LTExLjY4OSwxNi4zNDgsMEM3Mi40NzgsNTkuODk3LDY4Ljg3Miw2My44MjQsNjQuMzA0LDYzLjgyNHoiPjwvcGF0aD48L3N2Zz4=";
const coinbaseIconUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTU2IiBoZWlnaHQ9IjU1NiIgdmlld0JveD0iMCAwIDU1NiA1NTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNDhfNSkiPgo8cGF0aCBkPSJNMjc4IDBDNDMxLjUzMyAwIDU1NiAxMjQuNDY3IDU1NiAyNzhDNTU2IDQzMS41MzMgNDMxLjUzMyA1NTYgMjc4IDU1NkMxMjQuNDY3IDU1NiAwIDQzMS41MzMgMCAyNzhDMCAxMjQuNDY3IDEyNC40NjcgMCAyNzggMFoiIGZpbGw9IiMwMDUyRkYiLz4KPHBhdGggZD0iTTI3OC40ODIgMzc1LjE5QzIyNC40OSAzNzUuMTkgMTgwLjg2MiAzMzEuNDEgMTgwLjg2MiAyNzcuNUMxODAuODYyIDIyMy41OSAyMjQuNjEgMTc5LjgxIDI3OC40ODIgMTc5LjgxQzMyNi44MSAxNzkuODEgMzY2Ljk0MyAyMTUuMDI3IDM3NC42NTYgMjYxLjIxOEg0NzNDNDY0LjY4NCAxNjAuODc1IDM4MC44MDMgODIgMjc4LjM2MiA4MkMxNzAuNDk3IDgyIDgzIDE2OS41NTkgODMgMjc3LjVDODMgMzg1LjQ0MSAxNzAuNDk3IDQ3MyAyNzguMzYyIDQ3M0MzODAuODAzIDQ3MyA0NjQuNjg0IDM5NC4xMjUgNDczIDI5My43ODJIMzc0LjUzNkMzNjYuODIzIDMzOS45NzMgMzI2LjgxIDM3NS4xOSAyNzguNDgyIDM3NS4xOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTQ4XzUiPgo8cmVjdCB3aWR0aD0iNTU2IiBoZWlnaHQ9IjU1NiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
const lineIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiB2aWV3Qm94PSIwIDAgMzIwIDMyMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMwNmM3NTU7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMSU5FX0xPR08iIGRhdGEtbmFtZT0iTElORSBMT0dPIj48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiByeD0iNzIuMTQiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yNjYuNjYsMTQ0LjkyYzAtNDcuNzQtNDcuODYtODYuNTgtMTA2LjY5LTg2LjU4UzUzLjI4LDk3LjE4LDUzLjI4LDE0NC45MmMwLDQyLjgsMzgsNzguNjUsODkuMjIsODUuNDIsMy40OC43NSw4LjIxLDIuMjksOS40LDUuMjYsMS4wOCwyLjcuNzEsNi45My4zNSw5LjY1LDAsMC0xLjI1LDcuNTMtMS41Miw5LjEzLS40NywyLjctMi4xNSwxMC41NSw5LjI0LDUuNzZzNjEuNDQtMzYuMTgsODMuODItNjEuOTVoMEMyNTkuMjUsMTgxLjI0LDI2Ni42NiwxNjQsMjY2LjY2LDE0NC45MloiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMzEuMTYsMTcyLjQ5aC0zMGEyLDIsMCwwLDEtMi0ydjBoMFYxMjMuOTRoMHYwYTIsMiwwLDAsMSwyLTJoMzBhMiwyLDAsMCwxLDIsMnY3LjU3YTIsMiwwLDAsMS0yLDJIMjEwLjc5djcuODVoMjAuMzdhMiwyLDAsMCwxLDIsMlYxNTFhMiwyLDAsMCwxLTIsMkgyMTAuNzl2Ny44NmgyMC4zN2EyLDIsMCwwLDEsMiwydjcuNTZBMiwyLDAsMCwxLDIzMS4xNiwxNzIuNDlaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTIwLjI5LDE3Mi40OWEyLDIsMCwwLDAsMi0ydi03LjU2YTIsMiwwLDAsMC0yLTJIOTkuOTJ2LTM3YTIsMiwwLDAsMC0yLTJIOTAuMzJhMiwyLDAsMCwwLTIsMnY0Ni41M2gwdjBhMiwyLDAsMCwwLDIsMmgzMFoiLz48cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjEyOC43MyIgeT0iMTIxLjg1IiB3aWR0aD0iMTEuNjQiIGhlaWdodD0iNTAuNjQiIHJ4PSIyLjA0Ii8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTg5Ljg0LDEyMS44NWgtNy41NmEyLDIsMCwwLDAtMiwydjI3LjY2bC0yMS4zLTI4Ljc3YTEuMiwxLjIsMCwwLDAtLjE3LS4yMXYwbC0uMTItLjEyLDAsMC0uMTEtLjA5LS4wNiwwLS4xMS0uMDgtLjA2LDAtLjExLS4wNi0uMDcsMC0uMTEsMC0uMDcsMC0uMTIsMC0uMDgsMC0uMTIsMGgtLjA4bC0uMTEsMGgtNy43MWEyLDIsMCwwLDAtMiwydjQ2LjU2YTIsMiwwLDAsMCwyLDJoNy41N2EyLDIsMCwwLDAsMi0yVjE0Mi44MWwyMS4zMywyOC44YTIsMiwwLDAsMCwuNTIuNTJoMGwuMTIuMDguMDYsMCwuMS4wNS4xLDAsLjA3LDAsLjE0LDBoMGEyLjQyLDIuNDIsMCwwLDAsLjU0LjA3aDcuNTJhMiwyLDAsMCwwLDItMlYxMjMuODlBMiwyLDAsMCwwLDE4OS44NCwxMjEuODVaIi8+PC9nPjwvZz48L3N2Zz4=";
const farcasterIconUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiByeD0iMjAwIiBmaWxsPSIjODU1RENEIi8+CjxwYXRoIGQ9Ik0yNTcuNzc4IDE1NS41NTZINzQyLjIyMlY4NDQuNDQ0SDY3MS4xMTFWNTI4Ljg4OUg2NzAuNDE0QzY2Mi41NTQgNDQxLjY3NyA1ODkuMjU4IDM3My4zMzMgNTAwIDM3My4zMzNDNDEwLjc0MiAzNzMuMzMzIDMzNy40NDYgNDQxLjY3NyAzMjkuNTg2IDUyOC44ODlIMzI4Ljg4OVY4NDQuNDQ0SDI1Ny43NzhWMTU1LjU1NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMjguODg5IDI1My4zMzNMMTU3Ljc3OCAzNTEuMTExSDE4Mi4yMjJWNzQ2LjY2N0MxNjkuOTQ5IDc0Ni42NjcgMTYwIDc1Ni42MTYgMTYwIDc2OC44ODlWNzk1LjU1NkgxNTUuNTU2QzE0My4yODMgNzk1LjU1NiAxMzMuMzMzIDgwNS41MDUgMTMzLjMzMyA4MTcuNzc4Vjg0NC40NDRIMzgyLjIyMlY4MTcuNzc4QzM4Mi4yMjIgODA1LjUwNSAzNzIuMjczIDc5NS41NTYgMzYwIDc5NS41NTZIMzU1LjU1NlY3NjguODg5QzM1NS41NTYgNzU2LjYxNiAzNDUuNjA2IDc0Ni42NjcgMzMzLjMzMyA3NDYuNjY3SDMwNi42NjdWMjUzLjMzM0gxMjguODg5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTY3NS41NTYgNzQ2LjY2N0M2NjMuMjgzIDc0Ni42NjcgNjUzLjMzMyA3NTYuNjE2IDY1My4zMzMgNzY4Ljg4OVY3OTUuNTU2SDY0OC44ODlDNjM2LjYxNiA3OTUuNTU2IDYyNi42NjcgODA1LjUwNSA2MjYuNjY3IDgxNy43NzhWODQ0LjQ0NEg4NzUuNTU2VjgxNy43NzhDODc1LjU1NiA4MDUuNTA1IDg2NS42MDYgNzk1LjU1NiA4NTMuMzMzIDc5NS41NTZIODQ4Ljg4OVY3NjguODg5Qzg0OC44ODkgNzU2LjYxNiA4MzguOTQgNzQ2LjY2NyA4MjYuNjY3IDc0Ni42NjdWMzUxLjExMUg4NTEuMTExTDg4MCAyNTMuMzMzSDcwMi4yMjJWNzQ2LjY2N0g2NzUuNTU2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
const telegramIconUri = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAwMHB4IiBoZWlnaHQ9IjEwMDBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTMuMiAoNzI2NDMpIC0gaHR0cHM6Ly9za2V0Y2hhcHAuY29tIC0tPgogICAgPHRpdGxlPkFydGJvYXJkPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9Ijk5LjI1ODM0MDQlIiBpZD0ibGluZWFyR3JhZGllbnQtMSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyQUFCRUUiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyOUVEOSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJBcnRib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSIgY3g9IjUwMCIgY3k9IjUwMCIgcj0iNTAwIj48L2NpcmNsZT4KICAgICAgICA8cGF0aCBkPSJNMjI2LjMyODQxOSw0OTQuNzIyMDY5IEMzNzIuMDg4NTczLDQzMS4yMTY2ODUgNDY5LjI4NDgzOSwzODkuMzUwMDQ5IDUxNy45MTcyMTYsMzY5LjEyMjE2MSBDNjU2Ljc3MjUzNSwzMTEuMzY3NDMgNjg1LjYyNTQ4MSwzMDEuMzM0ODE1IDcwNC40MzE0MjcsMzAxLjAwMzUzMiBDNzA4LjU2NzYyMSwzMDAuOTMwNjcgNzE3LjgxNTgzOSwzMDEuOTU1NzQzIDcyMy44MDY0NDYsMzA2LjgxNjcwNyBDNzI4Ljg2NDc5NywzMTAuOTIxMjEgNzMwLjI1NjU1MiwzMTYuNDY1ODEgNzMwLjkyMjU1MSwzMjAuMzU3MzI5IEM3MzEuNTg4NTUxLDMyNC4yNDg4NDggNzMyLjQxNzg3OSwzMzMuMTEzODI4IDczMS43NTg2MjYsMzQwLjA0MDY2NiBDNzI0LjIzNDAwNyw0MTkuMTAyNDg2IDY5MS42NzUxMDQsNjEwLjk2NDY3NCA2NzUuMTEwOTgyLDY5OS41MTUyNjcgQzY2OC4xMDIwOCw3MzYuOTg0MzQyIDY1NC4zMDEzMzYsNzQ5LjU0NzUzMiA2NDAuOTQwNjE4LDc1MC43NzcwMDYgQzYxMS45MDQ2ODQsNzUzLjQ0ODkzOCA1ODkuODU2MTE1LDczMS41ODgwMzUgNTYxLjczMzM5Myw3MTMuMTUzMjM3IEM1MTcuNzI2ODg2LDY4NC4zMDY0MTYgNDkyLjg2NjAwOSw2NjYuMzQ5MTgxIDQ1MC4xNTAwNzQsNjM4LjIwMDAxMyBDNDAwLjc4NDQyLDYwNS42Njg3OCA0MzIuNzg2MTE5LDU4Ny43ODkwNDggNDYwLjkxOTQ2Miw1NTguNTY4NTYzIEM0NjguMjgyMDkxLDU1MC45MjE0MjMgNTk2LjIxNTA4LDQzNC41NTY0NzkgNTk4LjY5MTIyNyw0MjQuMDAwMzU1IEM1OTkuMDAwOTEsNDIyLjY4MDEzNSA1OTkuMjg4MzEyLDQxNy43NTg5ODEgNTk2LjM2NDc0LDQxNS4xNjA0MzEgQzU5My40NDExNjgsNDEyLjU2MTg4MSA1ODkuMTI2MjI5LDQxMy40NTA0ODQgNTg2LjAxMjQ0OCw0MTQuMTU3MTk4IEM1ODEuNTk4NzU4LDQxNS4xNTg5NDMgNTExLjI5Nzc5Myw0NjEuNjI1Mjc0IDM3NS4xMDk1NTMsNTUzLjU1NjE4OSBDMzU1LjE1NDg1OCw1NjcuMjU4NjIzIDMzNy4wODA1MTUsNTczLjkzNDkwOCAzMjAuODg2NTI0LDU3My41ODUwNDYgQzMwMy4wMzM5NDgsNTczLjE5OTM1MSAyNjguNjkyNzU0LDU2My40OTA5MjggMjQzLjE2MzYwNiw1NTUuMTkyNDA4IEMyMTEuODUxMDY3LDU0NS4wMTM5MzYgMTg2Ljk2NDQ4NCw1MzkuNjMyNTA0IDE4OS4xMzE1NDcsNTIyLjM0NjMwOSBDMTkwLjI2MDI4Nyw1MTMuMzQyNTg5IDIwMi42NTkyNDQsNTA0LjEzNDUwOSAyMjYuMzI4NDE5LDQ5NC43MjIwNjkgWiIgaWQ9IlBhdGgtMyIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=";
const twitchIconUri = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjQwMCAyODAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAwIDI4MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZmlsbDojOTE0NkZGO30KPC9zdHlsZT4KPHRpdGxlPkFzc2V0IDI8L3RpdGxlPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjIwMCwxMzAwIDE4MDAsMTcwMCAxNDAwLDE3MDAgMTA1MCwyMDUwIDEwNTAsMTcwMCA2MDAsMTcwMCA2MDAsMjAwIDIyMDAsMjAwIAkiLz4KCTxnPgoJCTxnIGlkPSJMYXllcl8xLTIiPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTAwLDBMMCw1MDB2MTgwMGg2MDB2NTAwbDUwMC01MDBoNDAwbDkwMC05MDBWMEg1MDB6IE0yMjAwLDEzMDBsLTQwMCw0MDBoLTQwMGwtMzUwLDM1MHYtMzUwSDYwMFYyMDBoMTYwMAoJCQkJVjEzMDB6Ii8+CgkJCTxyZWN0IHg9IjE3MDAiIHk9IjU1MCIgY2xhc3M9InN0MSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI2MDAiLz4KCQkJPHJlY3QgeD0iMTE1MCIgeT0iNTUwIiBjbGFzcz0ic3QxIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwMCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K";
const steamIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNjUgNjUiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI0IiIHg9Ii41IiB5PSIuNSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iQSIgeDI9IjUwJSIgeDE9IjUwJSIgeTI9IjEwMCUiIHkxPSIwJSI+PHN0b3Agc3RvcC1jb2xvcj0iIzExMWQyZSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMwNTE4MzkiIG9mZnNldD0iMjEuMiUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMGExYjQ4IiBvZmZzZXQ9IjQwLjclIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzEzMmU2MiIgb2Zmc2V0PSI1OC4xJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMxNDRiN2UiIG9mZnNldD0iNzMuOCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMTM2NDk3IiBvZmZzZXQ9Ijg3LjMlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzEzODdiOCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHN5bWJvbCBpZD0iQiI+PGc+PHBhdGggZD0iTTEuMzA1IDQxLjIwMkM1LjI1OSA1NC4zODYgMTcuNDg4IDY0IDMxLjk1OSA2NGMxNy42NzMgMCAzMi0xNC4zMjcgMzItMzJzLTE0LjMyNy0zMi0zMi0zMkMxNS4wMDEgMCAxLjEyNCAxMy4xOTMuMDI4IDI5Ljg3NGMyLjA3NCAzLjQ3NyAyLjg3OSA1LjYyOCAxLjI3NSAxMS4zMjh6IiBmaWxsPSJ1cmwoI0EpIi8+PHBhdGggZD0iTTMwLjMxIDIzLjk4NWwuMDAzLjE1OC03LjgzIDExLjM3NWMtMS4yNjgtLjA1OC0yLjU0LjE2NS0zLjc0OC42NjJhOC4xNCA4LjE0IDAgMCAwLTEuNDk4LjhMLjA0MiAyOS44OTNzLS4zOTggNi41NDYgMS4yNiAxMS40MjRsMTIuMTU2IDUuMDE2Yy42IDIuNzI4IDIuNDggNS4xMiA1LjI0MiA2LjI3YTguODggOC44OCAwIDAgMCAxMS42MDMtNC43ODIgOC44OSA4Ljg5IDAgMCAwIC42ODQtMy42NTZMNDIuMTggMzYuMTZsLjI3NS4wMDVjNi43MDUgMCAxMi4xNTUtNS40NjYgMTIuMTU1LTEyLjE4cy01LjQ0LTEyLjE2LTEyLjE1NS0xMi4xNzRjLTYuNzAyIDAtMTIuMTU1IDUuNDYtMTIuMTU1IDEyLjE3NHptLTEuODggMjMuMDVjLTEuNDU0IDMuNS01LjQ2NiA1LjE0Ny04Ljk1MyAzLjY5NGE2Ljg0IDYuODQgMCAwIDEtMy41MjQtMy4zNjJsMy45NTcgMS42NGE1LjA0IDUuMDQgMCAwIDAgNi41OTEtMi43MTkgNS4wNSA1LjA1IDAgMCAwLTIuNzE1LTYuNjAxbC00LjEtMS42OTVjMS41NzgtLjYgMy4zNzItLjYyIDUuMDUuMDc3IDEuNy43MDMgMyAyLjAyNyAzLjY5NiAzLjcycy42OTIgMy41Ni0uMDEgNS4yNDZNNDIuNDY2IDMyLjFhOC4xMiA4LjEyIDAgMCAxLTguMDk4LTguMTEzIDguMTIgOC4xMiAwIDAgMSA4LjA5OC04LjExMSA4LjEyIDguMTIgMCAwIDEgOC4xIDguMTExIDguMTIgOC4xMiAwIDAgMS04LjEgOC4xMTNtLTYuMDY4LTguMTI2YTYuMDkgNi4wOSAwIDAgMSA2LjA4LTYuMDk1YzMuMzU1IDAgNi4wODQgMi43MyA2LjA4NCA2LjA5NWE2LjA5IDYuMDkgMCAwIDEtNi4wODQgNi4wOTMgNi4wOSA2LjA5IDAgMCAxLTYuMDgxLTYuMDkzeiIvPjwvZz48L3N5bWJvbD48L3N2Zz4=";
const githubIconUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2IiBoZWlnaHQ9IjEwNiIgdmlld0JveD0iMCAwIDEwNiAxMDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUzIiBjeT0iNTMiIHI9IjUzIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyLjg1NCA0QzI1LjgzOSA0IDQgMjYgNCA1My4yMTdDNCA3NC45NzMgMTcuOTkzIDkzLjM4OSAzNy40MDUgOTkuOTA3QzM5LjgzMiAxMDAuMzk3IDQwLjcyMSA5OC44NDggNDAuNzIxIDk3LjU0NUM0MC43MjEgOTYuNDA0IDQwLjY0MSA5Mi40OTMgNDAuNjQxIDg4LjQxOEMyNy4wNTEgOTEuMzUyIDI0LjIyMSA4Mi41NTEgMjQuMjIxIDgyLjU1MUMyMi4wMzcgNzYuODQ3IDE4LjgwMSA3NS4zODEgMTguODAxIDc1LjM4MUMxNC4zNTMgNzIuMzY2IDE5LjEyNSA3Mi4zNjYgMTkuMTI1IDcyLjM2NkMyNC4wNTkgNzIuNjkyIDI2LjY0OCA3Ny40MTggMjYuNjQ4IDc3LjQxOEMzMS4wMTUgODQuOTE0IDM4LjA1MiA4Mi43OTYgNDAuODgzIDgxLjQ5MkM0MS4yODcgNzguMzE0IDQyLjU4MiA3Ni4xMTQgNDMuOTU3IDc0Ljg5MkMzMy4xMTggNzMuNzUxIDIxLjcxNCA2OS41MTQgMjEuNzE0IDUwLjYwOUMyMS43MTQgNDUuMjMxIDIzLjY1NCA0MC44MzEgMjYuNzI4IDM3LjQwOUMyNi4yNDMgMzYuMTg3IDI0LjU0NCAzMS4xMzQgMjcuMjE0IDI0LjM3MUMyNy4yMTQgMjQuMzcxIDMxLjMzOSAyMy4wNjcgNDAuNjQgMjkuNDIzQzQ0LjYyMjEgMjguMzQ1NyA0OC43Mjg4IDI3Ljc5NzYgNTIuODU0IDI3Ljc5M0M1Ni45NzkgMjcuNzkzIDYxLjE4NCAyOC4zNjQgNjUuMDY3IDI5LjQyM0M3NC4zNjkgMjMuMDY3IDc4LjQ5NCAyNC4zNzEgNzguNDk0IDI0LjM3MUM4MS4xNjQgMzEuMTM0IDc5LjQ2NCAzNi4xODcgNzguOTc5IDM3LjQwOUM4Mi4xMzQgNDAuODMxIDgzLjk5NCA0NS4yMzEgODMuOTk0IDUwLjYwOUM4My45OTQgNjkuNTE0IDcyLjU5IDczLjY2OSA2MS42NyA3NC44OTJDNjMuNDUgNzYuNDQgNjQuOTg2IDc5LjM3MyA2NC45ODYgODQuMDE4QzY0Ljk4NiA5MC42MTggNjQuOTA2IDk1LjkxNSA2NC45MDYgOTcuNTQ0QzY0LjkwNiA5OC44NDggNjUuNzk2IDEwMC4zOTcgNjguMjIyIDk5LjkwOEM4Ny42MzQgOTMuMzg4IDEwMS42MjcgNzQuOTczIDEwMS42MjcgNTMuMjE3QzEwMS43MDcgMjYgNzkuNzg4IDQgNTIuODU0IDRaIiBmaWxsPSIjMjQyOTJGIi8+Cjwvc3ZnPgo=";
const xIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiByeD0iMjQiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xNzcuMzE1IDE0NS4zMzVMMjQ1LjA2OCA2N0gyMjkuMDEzTDE3MC4xODIgMTM1LjAxN0wxMjMuMTk1IDY3SDY5TDE0MC4wNTUgMTY5Ljg1NEw2OSAyNTJIODUuMDU2M0wxNDcuMTgzIDE4MC4xNzJMMTk2LjgwNSAyNTJIMjUxTDE3Ny4zMTEgMTQ1LjMzNUgxNzcuMzE1Wk0xNTUuMzIzIDE3MC43NkwxNDguMTI0IDE2MC41MThMOTAuODQxNyA3OS4wMjJIMTE1LjUwM0wxNjEuNzMxIDE0NC43OTJMMTY4LjkzIDE1NS4wMzRMMjI5LjAyIDI0MC41MjVIMjA0LjM1OUwxNTUuMzIzIDE3MC43NjRWMTcwLjc2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
const tiktokIconUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDEyMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogIDxwYXRoIGQ9Ik02MzYgMTIwMWMtMjMuMDIgMC00Ni4wNDIgMC02OS42OTctLjQwOC05Ljc5NC0xLjEzNS0xOC45OTYtMS41MTgtMjguMTAxLTIuNjY1LTE2LjQyNC0yLjA2Ny0zMi45Ni0zLjc3NS00OS4xNC03LjEyNi0yMS42OTYtNC40OTQtNDMuMjM2LTkuOTA3LTY0LjU4OS0xNS44NDItMjQuMjYtNi43NDMtNDcuNjQ1LTE2LjAyLTcwLjU3Ny0yNi40OC0yNi4yMjYtMTEuOTYzLTUxLjkxMy0yNC45NjQtNzUuNzk4LTQxLjA5OC0xOC43NDYtMTIuNjYzLTM3LjA1Ny0yNi4wNC01NC44OTktMzkuOTQ4LTEzLjU1LTEwLjU2My0yNi43MjktMjEuNzkxLTM4Ljg2Ni0zMy45My0xNi4xOS0xNi4xOS0zMS42NTgtMzMuMTYyLTQ2LjU4Mi01MC41MzItMTAuOTY1LTEyLjc2Mi0yMS4yMS0yNi4yNjUtMzAuNTk3LTQwLjIzLTExLjM3OS0xNi45MjUtMjIuMTc4LTM0LjMyMS0zMi4wMS01Mi4xODUtMTAuMTM2LTE4LjQyLTE5LjYyOC0zNy4yOTUtMjcuOTE3LTU2LjYwOC0xMC43NDEtMjUuMDI1LTE5LjkzMS01MC43MjQtMjYuMjE0LTc3LjMwNy00LjU5Mi0xOS40MjctOS4yOTgtMzguODYzLTEyLjgxMy01OC40OTktMi42NjYtMTQuODkyLTMuNS0zMC4xMS01LjI3Mi00NS4xNjdDMi44MDQgNjUxLjkyMiAxLjY2NiA2NTAuOTg5IDEgNjUwYzAtLjQ0NCAwLS44ODkuMzk5LTEuODIuMTMzLTMuNzE4LS4xMzMtNi45NS0uMzk5LTEwLjE4IDAtMjQuMzU0IDAtNDguNzA4LjM5OS03My42ODUuMTMzLTMuODUzLS4xMzMtNy4wODQtLjM5OS0xMC4zMTUgMC0uNDQ0IDAtLjg4OS4zOTEtMS43OS43OTUtMS4xMzggMS40ODUtMS43ODkgMS41Ni0yLjUwMy43NC03LjE1NiAxLjI0Ni0xNC4zMzggMi4wOC0yMS40ODIgMS4yMjgtMTAuNSAyLjAyOS0yMS4xMDcgNC4xNjMtMzEuNDMgMy44MS0xOC40MjYgOC4zMDMtMzYuNzE3IDEyLjgyNy01NC45ODYgNy44ODUtMzEuODQgMTkuNDA0LTYyLjQ2NyAzMy4yMTMtOTIuMTExIDE1LjM3NS0zMy4wMDcgMzMuMzUzLTY0LjU4NCA1NC41MjMtOTQuMzg1IDE2LjM2NC0yMy4wMzYgMzQuMTc3LTQ0LjggNTMuMjE3LTY1LjU2NSA5LjczNS0xMC42MTcgMjAuNTg5LTIwLjIxMyAzMS4wMS0zMC4xOTUgMTcuMjMtMTYuNTA2IDM1Ljg4Mi0zMS4yNSA1NS4xNDItNDUuMzMgMjEuODk3LTE2LjAwOSA0NC42NDctMzAuNjc4IDY4LjczLTQzLjAxIDIwLjgyOC0xMC42NjggNDIuMTE4LTIwLjY2NSA2My45LTI5LjE3NyAyMS43NDUtOC40OTggNDQuMTcxLTE1LjQyNiA2Ni42MzYtMjEuODYzIDIzLjkyMS02Ljg1NCA0OC4zNTQtMTEuNzI4IDczLjE5LTE0LjE4IDEzLjgyNC0xLjM2NSAyNy42NTgtMi42NSA0MS40ODItNC4wMjQgMS0uMSAxLjk1OC0uNjM2IDIuOTM2LS45NjkgMjMuMDIgMCA0Ni4wNDIgMCA2OS42OTcuNDA4IDkuNzk3IDEuMTM1IDE5LjAwMyAxLjUxMyAyOC4xMTEgMi42NjYgMTYuMjY0IDIuMDYgMzIuNjM0IDMuNzg5IDQ4LjY1NyA3LjExMyAyMS44NiA0LjUzNiA0My41NzYgOS45MzYgNjUuMSAxNS44ODMgMjQuMjggNi43MSA0Ny42NDEgMTYuMDY5IDcwLjYwNyAyNi40NzQgMjUuOTc2IDExLjc3IDUxLjA4MiAyNS4xMTggNzUuMTUgNDAuMzYgMzIuMDkgMjAuMzI0IDYxLjk2NyA0My42MjYgODkuNTUgNjkuNjk4IDEzLjY5NSAxMi45NDUgMjYuNjIgMjYuNzk2IDM5LjAwNCA0MS4wMTIgMTIuNDkgMTQuMzM5IDI0LjAyNyAyOS41MjMgMzUuNzE1IDQ0LjU0NCAxNi4xNzQgMjAuNzg3IDI5LjczNCA0My4zMjQgNDIuMTc3IDY2LjQ0MiAxOS41ODkgMzYuMzk3IDM1LjU1NCA3NC40MTggNDcuMDc2IDExNC4xNTMgNC43NDEgMTYuMzUyIDguNTM4IDMzLjAxIDEyLjAzOSA0OS42OCAyLjkyNSAxMy45MyA1LjE2NCAyOC4wMzMgNy4wMjQgNDIuMTUgMS44MTUgMTMuNzY4IDIuNzUgMjcuNjUyIDQuMTI0IDQxLjQ4LjEgMS4wMDEuNjM2IDEuOTYuOTY5IDIuOTM3IDAgMjMuMDIgMCA0Ni4wNDItLjQwOCA2OS42OTctMS4xMzUgOS43OTctMS41MTMgMTkuMDAzLTIuNjY2IDI4LjExMS0yLjA2IDE2LjI2NC0zLjgxNyAzMi42MjYtNy4xMDcgNDguNjU5LTQuNDU4IDIxLjcyMS05LjYxMyA0My4zNDctMTUuNjE2IDY0LjY5MS03LjE2MyAyNS40NzItMTYuODc1IDUwLjExLTI4IDc0LjEyNy0xMS45NzggMjUuODU4LTI1LjQ3MyA1MC45MjYtNDAuOTE4IDc0Ljg5M2E1OTguNSA1OTguNSAwIDAgMS02Ny44OSA4Ni42OWMtMTIuOTMzIDEzLjcwNS0yNi43OTIgMjYuNjI0LTQxLjAwOCAzOS4wMDctMTQuMzQgMTIuNDkxLTI5LjUyMyAyNC4wMjgtNDQuNTQ1IDM1LjcxNi0yMC43ODYgMTYuMTc0LTQzLjMyMyAyOS43MzQtNjYuNDQyIDQyLjE3Ny0zNi4zOTcgMTkuNTg5LTc0LjQxOCAzNS41NTQtMTE0LjE1MyA0Ny4wNzYtMTYuMzUyIDQuNzQxLTMzLjAxIDguNTM4LTQ5LjY4IDEyLjAzOS0xMy45MyAyLjkyNS0yOC4wMzQgNS4xNjQtNDIuMTUgNy4wMjUtMTMuNzY4IDEuODE0LTI3LjY1MiAyLjc0OC00MS40OCA0LjEyMy0xLjAwMS4xLTEuOTYuNjM2LTIuOTM3Ljk2OW0xNzkuOTM0LTg1NS45NDhzLS4wMjQuMDg3LjA0LS42NDNjLTEuMjg4LTEuNjctMi42My0zLjMtMy44NTgtNS4wMTQtOS42ODgtMTMuNTE5LTE3Ljk2NS0yNy44Mi0yNC4xMTQtNDMuMzE3LTYuMzMzLTE1Ljk2LTEwLjY0OC0zMi4zOTctMTIuMDA0LTQ5LjU1Ni0uNTA0LTYuMzY3LTEtMTIuNzMzLTEuNTItMTkuMzczLTExLjc1IDAtMjMuNTIgMC0zNS40MzYtLjE4NSAwIDAtLjE4Ni0uMTQ2LS40NjMtLjg4NmwtMy40OTItMzIuODU2SDYwMHY2LjA4NWMwIDE3Ny4wNzktLjAxNyAzNTQuMTU3LjAyOSA1MzEuMjM2LjAwNCAxNS42MDItMy44OTMgMzAuMzE0LTEwLjQ3NiA0NC4xODQtMTEuNjY4IDI0LjU4LTI5LjkxIDQyLjgwNS01NC43NTMgNTQuMzMzLTIzLjU4NiAxMC45NDUtNDcuOTU4IDEzLjY1NC03My4xMzIgNy4xMTMtOC4wNC0yLjA4OS0xNS43ODgtNS4zMDYtMjQuMjY1LTguMjUzLS44LS42OTUtMS42LTEuMzktMi40MjItMi43OS0yNi4xNy00MC43MDctMjguNTk2LTgzLjExMS0yLjI0OC0xMjMuNDc3IDMwLjA1OS00Ni4wNTEgNzQuMjQ5LTYxLjIwOCAxMjcuODktNDcuODc4VjUxNS4zMDdjLTEzLjA1LS4zOTMtMjUuNzQyLS43NzYtMzguNTgtMS4zNDMgMCAwLS4xODctLjE0NS0uMDU4LTEuMDVWNDgxLjQ5Yy0xMS4zODYtLjUwNC0yMi41My0xLjYyMy0zMy42MzYtMS4zMzMtMTQuNDUuMzc2LTI5LjAzOC44NDUtNDMuMjY0IDMuMTQ3LTE3LjE4NiAyLjc4MS0zMy44ODcgNy44NzgtNTAuMTQyIDE0LjU0LTI3LjY5NCAxMS4zNS01Mi42MzkgMjYuODM3LTc0LjQzNCA0Ny4yNzctNy40ODUgNy4wMi0xNC40NzUgMTQuNjA0LTIxLjMwOSAyMi4yNzItMTEuMDY0IDEyLjQxNS0yMC4yMzcgMjYuMTg3LTI4LjI0MiA0MC43NjQtMTEuMzYgMjAuNjg1LTE5Ljk3IDQyLjQ4MS0yNC42NzggNjUuNTU1LTIuNzY1IDEzLjU0OC0zLjgyNyAyNy40NjktNS4xNzMgNDEuMjY5LS42MjcgNi40MzItLjQ0IDEyLjk5Ny0uMDM1IDE5LjQ2NS43NiAxMi4xMTUgMS4wMjkgMjQuMzY3IDMuMTQyIDM2LjI3IDQuODYyIDI3LjM3OCAxMy45ODMgNTMuMzc0IDI3LjggNzcuNjU4IDE0LjY0IDI1LjczIDMzLjAyNCA0OC4zNDMgNTUuNTI1IDY3LjU2MyAzLjkwMSAzLjMzMiA4LjMzMSA2LjA0NiAxMi40ODkgOS4wMzQgMCAwLS4wMTMtLjAyNy4wNC41Ni41OS40OSAxLjE3OC45ODEgMi4wNTggMi4xMTEgMi4yOSAxLjg0MiA0LjU4MSAzLjY4MyA3LjA5MiA2LjA4LjY0Mi40IDEuMjg0Ljc5OCAxLjg0MyAxLjIzIDAgMCAuMDEyLS4wODguMDcuNjAxIDEyLjc3NCAxMC41MjEgMjUuMDEgMjEuNzk0IDM4LjQ0MyAzMS4zOSAyMS4wOCAxNS4wNTYgNDQuNjMgMjUuNDM1IDY5LjUzIDMyLjYxIDE4LjQzIDUuMzEyIDM3LjMxMiA4LjM2MyA1Ni40MTUgOS4zMiAxOC40NzEuOTI3IDM2Ljg2Ny0uNTY4IDU1LjE0NS0zLjc5NSAyNy4wMS00Ljc3IDUyLjQ0OS0xMy43MDcgNzYuNDA0LTI3LjA1OSAyNi4xMDMtMTQuNTQ4IDQ4LjgyNS0zMy4xMjYgNjguMjk3LTU1LjgwNyAxMi44MjktMTQuOTQ0IDI0LjIxLTMwLjkxMyAzMi41MjUtNDguNzAyIDYuNTgtMTQuMDggMTIuMDEyLTI4Ljc2MiAxNy4wMy00My40OTEgNi45MDctMjAuMjY1IDkuODA1LTQxLjQ4IDkuOTAzLTYyLjczMS40MTctOTAuMTQzLjE3Ny0xODAuMjg4LjE3Ny0yNzAuNDMzdi02Ljc0NGM1Ni42NSAzOC45MiAxMTguMDM4IDU4Ljk2NiAxODUuNzQzIDU4Ljk4NXYtMTM0LjUyYy04LjU4Ni0uODc2LTE2LjkwNC0xLjY3Ni0yNS4yMDktMi41OTUtNC41MjQtLjUtOS4wMjUtMS4yMDMtMTQuMDgtMi4wMjUtLjIwNi0uMzE3LS40MTMtLjYzNS0uMjI2LTEuNzE5di0yNy43NDVjLTcuODE4LS44Mi0xNS43ODgtMS42Ni0yMy43NTktMi40ODktMTMuOTE4LTEuNDQ2LTI3LjQ0LTQuNzU4LTQwLjMwNi0xMC4xMDUtMTEuMDE3LTQuNTc4LTIxLjYwNS0xMC4xOS0zMi40NjYtMTUuNDc0IDAgMC0uMjM0LS4yLS42NjQtLjgyM2EyMSAyMSAwIDAgMS0yLjY4LS43MzJjLTEuMTczLTEuMjg4LTIuMzQ2LTIuNTc3LTMuNTMtNC40ODctLjY1OS0uNDM1LTEuMzE4LS44Ny0xLjg4OS0xLjMzIiBzdHlsZT0iLS1kYXJrcmVhZGVyLWlubGluZS1maWxsOnZhcigtLWRhcmtyZWFkZXItYmFja2dyb3VuZC0wMDAwMDAsICMwMDAwMDApOy0tZGFya3JlYWRlci1pbmxpbmUtc3Ryb2tlOm5vbmU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MSIgZGF0YS1pbmRleD0iMCIvPgogIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xIDU1NC40NTRjLjI2NiAyLjc3Ny41MzIgNi4wMDguMzk5IDkuMzkyQzEgNTYwLjk3IDEgNTU3Ljk0IDEgNTU0LjQ1NCIgc3R5bGU9Ii0tZGFya3JlYWRlci1pbmxpbmUtZmlsbDp2YXIoLS1kYXJrcmVhZGVyLXRleHQtZmZmZmZmLCAjZThlNmUzKTstLWRhcmtyZWFkZXItaW5saW5lLXN0cm9rZTpub25lO3Zpc2liaWxpdHk6dmlzaWJsZSIgZGF0YS1pbmRleD0iNSIvPgogIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xIDYzOC40NTRjLjI2NiAyLjc3Ny41MzIgNi4wMDguMzk5IDkuMzkyQzEgNjQ0Ljk3IDEgNjQxLjk0IDEgNjM4LjQ1NCIgc3R5bGU9Ii0tZGFya3JlYWRlci1pbmxpbmUtZmlsbDp2YXIoLS1kYXJrcmVhZGVyLXRleHQtZmZmZmZmLCAjZThlNmUzKTstLWRhcmtyZWFkZXItaW5saW5lLXN0cm9rZTpub25lO3Zpc2liaWxpdHk6dmlzaWJsZSIgZGF0YS1pbmRleD0iNiIvPgogIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik04MjQuNDYzIDM1Mi4yMjJzLjIzNC4yLjA1NC42MjljNC44OTggNS4zNjIgOS44NTcgMTAuNDI1IDE1LjA3NSAxNS4yMDYgMTUuMjUgMTMuOTcxIDMyLjY5NCAyNC41NTYgNTEuOTIzIDMxLjk2NCA5LjUxNCAzLjY2NiAxOS41MyA2LjAyOSAyOS4zMTkgOC45OC4yMDcuMzE5LjQxNC42MzcuODkzIDEuNTE3LjI3MiAzNS4xMzUuMjcyIDY5LjcwOC4yNzIgMTA0LjU3OS0zMy44NjYtLjA1Ni02Ni4yMDMtNS4wODctOTcuNzc1LTE1LjEyNC0zMS41MTYtMTAuMDItNjAuNzIyLTI0Ljc0NS04OC4yMjQtNDMuOTcyIDAgMS41NDYuMDAzIDIuMzY1IDAgMy4xODQtLjMzMyA5NC4yMzUtLjU3NiAxODguNDctMS4xMzEgMjgyLjcwMy0uMDYgMTAuMTIxLTEuMjA0IDIwLjM3My0zLjEyOCAzMC4zMTctMy41NTMgMTguMzU1LTkuMDQ5IDM2LjE1LTE2LjQ2IDUzLjQ0Mi0xMS4xMzkgMjUuOTkxLTI2LjI5IDQ5LjI4OS00NS41MTMgNjkuODAxLTkuMzMgOS45NTYtMTkuNTczIDE5LjMxLTMwLjUxOCAyNy40MzQtMTIuODk5IDkuNTc1LTI2LjU4OCAxOC4yOS00MC42OTQgMjUuOTg0YTE5MC4zIDE5MC4zIDAgMCAxLTU1LjMxIDE5LjgzOGMtMTUuODY4IDMuMDQxLTMyLjA0OCA0LjY4LTQ4LjE2NCA2LjExOC03LjgzNy42OTgtMTUuODk5LS4wMDgtMjMuNzYtLjkyNi0xMy45MzQtMS42MjctMjcuOTY3LTMuMTAyLTQxLjY0NC02LjA4NS0yMi42OS00Ljk0OC00NC4wNzEtMTMuNjQyLTY0LjExMi0yNS41My00LjY1OS0yLjc2My05LjY1My00Ljk2LTE0LjQ5My03LjQxOCAwIDAtLjAxMi4wODcuMjE0LS4yNjctLjYxMy0uNzEyLTEuNDUtMS4wNzEtMi4yOS0xLjQzLTIuMjktMS44NDItNC41OC0zLjY4My02Ljk2NS02LjIxLS43MzQtMS4xMjktMS4zNzYtMS41Ny0yLjAxNy0yLjAxMyAwIDAgLjAxMy4wMjcuMjAzLS4zMDYtLjk1NS0xLjkzOS0xLjk4Mi0zLjY0NC0zLjI2Mi01LjEzMi0xNC44NTEtMTcuMjc1LTI2LjU3Ni0zNi40NjgtMzUuOTQ0LTU3LjIyLTExLjc2NS0yNi4wNjYtMTkuMDc1LTUzLjM5NS0yMC42OC04MS43ODgtMS4wNS0xOC41OTQtLjAwOS0zNy40NzggMi4wMS01Ni4wMjQgMS45MzgtMTcuODE4IDcuMTE4LTM1LjEzMSAxMy42LTUxLjk4NSAxMS4yMDUtMjkuMTI2IDI3LjI3Ni01NS4yODUgNDguNDQtNzguMDY0IDEwLjA4NC0xMC44NTQgMjEuMzI1LTIwLjgxMiAzMi45NjgtMzAuMDAzIDE5LjUwNy0xNS4zOTkgNDEuMjMzLTI3LjA3MiA2NC42OTUtMzUuNTU0IDI1LjgyOC05LjMzNyA1Mi40MDMtMTQuMzAyIDc5LjgxMS0xNS4wNDggMCAwIC4xODYuMTQ1LjE3OS42OS0uMDA3IDM1LjQ1OS0uMDA3IDcwLjM3NC0uMDA3IDEwNS4yMjctOS4xNzQtMS42NDMtMTcuNzQ2LTMuODQ2LTI2LjQ0Mi00LjU4LTEzLjY3Ni0xLjE1NC0yNy4xNy43MjMtNDAuMzIgNC44NTUtMjcuODg4IDguNzY0LTQ5LjQwMSAyNS44My02NC4xMDYgNTAuODgtMTIuNzg5IDIxLjc4Ni0xNy42MzcgNDUuNDY5LTE0LjI3NyA3MC44MTUgMi4wNyAxNS42MTggNy4wMDggMzAuMDc2IDE1LjE4OSA0My4zOTQgMTAuNjYgMTcuMzUzIDI0Ljc1IDMxLjIzNiA0Mi45MyA0MC43MzQuOC42OTYgMS42IDEuMzkxIDIuNzEyIDIuNTU0IDcuNDU1IDEwLjUyMiAxNi4zMzYgMTguODE3IDI2LjUzNSAyNS42MzcgMjUuNDA2IDE2Ljk4OSA1My4zMjIgMjMuNTA5IDgzLjM5NiAxNy43OTMgMzAuNDQtNS43ODUgNTQuNDk3LTIyLjE4NyA3Mi4xOTMtNDcuNTE2IDExLjI3NS0xNi4xMzkgMTguODUxLTM0LjMyOCAxOC45MzgtNTMuOTgyLjcyOC0xNjQuMTg0Ljg5My0zMjguMzcgMS4yMi00OTIuNTU2LjAzLTE1LjE1OC4wMDQtMzAuMzE3LjAwNC00NS40NzZWMjI3YzIuNSAwIDQuNDU5LjAwMyA2LjQxNyAwbDkyLjQ0LS4xODJzLjE4NS4xNDYuMTc4LjYzOGMtLjAxMS45OS0uMTE4IDEuNTE1LS4wMDYgMS45ODYgNC41MjMgMTkuMDI3IDEwLjY0MiAzNy4zOCAyMC4zMzQgNTQuNTY3IDExLjg2OCAyMS4wNDggMjcuMzMgMzguOTA3IDQ1LjY3NiA1NC4zODUgMy4yMjUgMi43MiA3LjIyNyA0LjUyIDEwLjg3IDYuNzQ1IDAgMCAuMDI1LS4wODctLjIyOC4yMzYuNTQ5Ljc1OCAxLjM1MSAxLjE5MyAyLjE1MyAxLjYyOGEyMTMgMjEzIDAgMCAwIDQuMDUgNC4zNTdjMS4yMTUuNjE1IDEuODk3LjczOSAyLjU3OS44NjIiIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6dmFyKC0tZGFya3JlYWRlci1iYWNrZ3JvdW5kLWZmZmZmZiwgIzE4MWExYik7LS1kYXJrcmVhZGVyLWlubGluZS1zdHJva2U6bm9uZTtvcGFjaXR5OjEiIGRhdGEtaW5kZXg9IjciLz4KICA8cGF0aCBmaWxsPSIjRkUyQzU1IiBkPSJNMzUxLjEwMiA5MzUuMjA3YzQuODEgMi4xMTMgOS44MDUgNC4zMSAxNC40NjQgNy4wNzQgMjAuMDQgMTEuODg4IDQxLjQyMyAyMC41ODIgNjQuMTEyIDI1LjUzIDEzLjY3NyAyLjk4MyAyNy43MSA0LjQ1OCA0MS42NDUgNi4wODUgNy44Ni45MTggMTUuOTIyIDEuNjI0IDIzLjc1OS45MjYgMTYuMTE2LTEuNDM3IDMyLjI5Ni0zLjA3NyA0OC4xNjQtNi4xMThhMTkwLjMgMTkwLjMgMCAwIDAgNTUuMzEtMTkuODM4YzE0LjEwNi03LjY5NSAyNy43OTUtMTYuNDA5IDQwLjY5NC0yNS45ODQgMTAuOTQ1LTguMTI1IDIxLjE4Ny0xNy40NzggMzAuNTE4LTI3LjQzNCAxOS4yMjMtMjAuNTEyIDM0LjM3NC00My44MSA0NS41MTMtNjkuOCA3LjQxMS0xNy4yOTQgMTIuOTA3LTM1LjA4OCAxNi40Ni01My40NDMgMS45MjQtOS45NDQgMy4wNjgtMjAuMTk2IDMuMTI4LTMwLjMxNy41NTUtOTQuMjMzLjc5OC0xODguNDY4IDEuMTMtMjgyLjcwMy4wMDQtLjgyLjAwMS0xLjYzOC4wMDEtMy4xODQgMjcuNTAyIDE5LjIyNyA1Ni43MDggMzMuOTUzIDg4LjIyNCA0My45NzIgMzEuNTcyIDEwLjAzNyA2My45MSAxNS4wNjggOTcuNzc1IDE1LjEyNGwtLjAwMS0xMDQuNDc0YzQuNTEuMTU0IDkuMDEyLjg1NyAxMy41MzYgMS4zNTcgOC4zMDUuOTE5IDE2LjYyMyAxLjcxOSAyNS4yMDkgMi41OTZ2MTM0LjUxOWMtNjcuNzA1LS4wMi0xMjkuMDkzLTIwLjA2Ni0xODUuNzQzLTU4Ljk4NXY2Ljc0NGMwIDkwLjE0NS4yNCAxODAuMjktLjE3NyAyNzAuNDMzLS4wOTggMjEuMjUxLTIuOTk2IDQyLjQ2Ni05LjkwMiA2Mi43My01LjAyIDE0LjczLTEwLjQ1IDI5LjQxMi0xNy4wMzEgNDMuNDkyLTguMzE0IDE3Ljc4OS0xOS42OTYgMzMuNzU4LTMyLjUyNSA0OC43MDItMTkuNDcyIDIyLjY4LTQyLjE5NCA0MS4yNTktNjguMjk3IDU1LjgwNy0yMy45NTUgMTMuMzUyLTQ5LjM5NSAyMi4yOS03Ni40MDQgMjcuMDU5LTE4LjI3OCAzLjIyNy0zNi42NzQgNC43MjItNTUuMTQ1IDMuNzk2LTE5LjEwMy0uOTU4LTM3Ljk4NC00LjAwOS01Ni40MTUtOS4zMi0yNC45LTcuMTc2LTQ4LjQ1LTE3LjU1NS02OS41My0zMi42MTEtMTMuNDM0LTkuNTk2LTI1LjY3LTIwLjg2OS0zOC40NzItMzEuNzM1IiBzdHlsZT0iLS1kYXJrcmVhZGVyLWlubGluZS1maWxsOnZhcigtLWRhcmtyZWFkZXItYmFja2dyb3VuZC1mZTJjNTUsICNiMTAxMjMpOy0tZGFya3JlYWRlci1pbmxpbmUtc3Ryb2tlOm5vbmU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MSIgZGF0YS1pbmRleD0iOCIvPgogIDxwYXRoIGZpbGw9IiMyNUY0RUUiIGQ9Ik03MzguNzE4IDIyNi40NDhjLTMwLjY3NS40MzEtNjEuNDg4LjQ5Mi05Mi4zMDEuNTUxLTEuOTU4LjAwNC0zLjkxNi4wMDEtNi40MTcuMDAxdjUuMjg4YzAgMTUuMTU5LjAyNiAzMC4zMTgtLjAwNCA0NS40NzYtLjMyNyAxNjQuMTg2LS40OTIgMzI4LjM3Mi0xLjIyIDQ5Mi41NTYtLjA4NyAxOS42NTQtNy42NjMgMzcuODQzLTE4LjkzOCA1My45ODItMTcuNjk2IDI1LjMyOS00MS43NTMgNDEuNzMtNzIuMTkzIDQ3LjUxNi0zMC4wNzQgNS43MTYtNTcuOTktLjgwNC04My4zOTYtMTcuNzkzLTEwLjE5OS02LjgyLTE5LjA4LTE1LjExNS0yNi4yMzctMjUuNTE0IDcuODY4IDIuMzU2IDE1LjYxNiA1LjU3MyAyMy42NTYgNy42NjIgMjUuMTc0IDYuNTQxIDQ5LjU0NiAzLjgzMiA3My4xMzItNy4xMTMgMjQuODQzLTExLjUyOCA0My4wODUtMjkuNzUzIDU0Ljc1My01NC4zMzMgNi41ODMtMTMuODcgMTAuNDgtMjguNTgyIDEwLjQ3Ni00NC4xODQtLjA0Ni0xNzcuMDc5LS4wMjktMzU0LjE1Ny0uMDI5LTUzMS4yMzZ2LTYuMDg1aDEzNS4wODdjMS4xODIgMTEuMTE1IDIuMzM3IDIxLjk4NSAzLjYzIDMzLjIyNiIgc3R5bGU9Ii0tZGFya3JlYWRlci1pbmxpbmUtZmlsbDp2YXIoLS1kYXJrcmVhZGVyLWJhY2tncm91bmQtMjVmNGVlLCAjMDliM2IwKTstLWRhcmtyZWFkZXItaW5saW5lLXN0cm9rZTpub25lO29wYWNpdHk6MSIgZGF0YS1pbmRleD0iOSIvPgogIDxwYXRoIGZpbGw9IiMyNUY0RUUiIGQ9Ik01MjEuOTIgNTEzLjM2N2MtMjcuNDcyIDEuMTk4LTU0LjA0NyA2LjE2My03OS44NzUgMTUuNS0yMy40NjIgOC40ODItNDUuMTg4IDIwLjE1NS02NC42OTUgMzUuNTU0LTExLjY0MyA5LjE5MS0yMi44ODQgMTkuMTQ5LTMyLjk2OSAzMC4wMDMtMjEuMTYzIDIyLjc3OS0zNy4yMzQgNDguOTM4LTQ4LjQzOCA3OC4wNjQtNi40ODMgMTYuODU0LTExLjY2MyAzNC4xNjctMTMuNjAyIDUxLjk4NS0yLjAxOCAxOC41NDYtMy4wNTkgMzcuNDMtMi4wMDggNTYuMDI0IDEuNjA0IDI4LjM5MyA4LjkxNCA1NS43MjIgMjAuNjggODEuNzg4IDkuMzY3IDIwLjc1MiAyMS4wOTIgMzkuOTQ1IDM1Ljk0MyA1Ny4yMiAxLjI4IDEuNDg4IDIuMzA3IDMuMTkzIDMuMjc2IDUuMTM3LTQuMzYyLTIuNjYtOC43OTItNS4zNzQtMTIuNjkzLTguNzA2LTIyLjUwMS0xOS4yMi00MC44ODUtNDEuODMyLTU1LjUyNS02Ny41NjMtMTMuODE3LTI0LjI4NC0yMi45MzgtNTAuMjgtMjcuOC03Ny42NTgtMi4xMTMtMTEuOTAzLTIuMzgyLTI0LjE1NS0zLjE0Mi0zNi4yNy0uNDA2LTYuNDY4LS41OTItMTMuMDMzLjAzNS0xOS40NjUgMS4zNDYtMTMuOCAyLjQwOC0yNy43MjEgNS4xNzMtNDEuMjY5IDQuNzA5LTIzLjA3NCAxMy4zMTktNDQuODcgMjQuNjc4LTY1LjU1NSA4LjAwNS0xNC41NzcgMTcuMTc4LTI4LjM1IDI4LjI0Mi00MC43NjQgNi44MzQtNy42NjggMTMuODI0LTE1LjI1MyAyMS4zMDktMjIuMjcyIDIxLjc5NS0yMC40NCA0Ni43NC0zNS45MjcgNzQuNDM0LTQ3LjI3NyAxNi4yNTUtNi42NjIgMzIuOTU2LTExLjc1OSA1MC4xNDItMTQuNTQgMTQuMjI2LTIuMzAyIDI4LjgxMy0yLjc3IDQzLjI2NC0zLjE0NyAxMS4xMDctLjI5IDIyLjI1LjgyOSAzMy42MzYgMS4zMzMgMCAxMS4xNDUgMCAyMS4yODUtLjA2NCAzMS44NzgiIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6dmFyKC0tZGFya3JlYWRlci1iYWNrZ3JvdW5kLTI1ZjRlZSwgIzA5YjNiMCk7LS1kYXJrcmVhZGVyLWlubGluZS1zdHJva2U6dmFyKC0tZGFya3JlYWRlci10ZXh0LTBkOTlmZiwgIzIzYTNmZik7b3BhY2l0eToxIiBkYXRhLWluZGV4PSIxMCIvPgogIDxwYXRoIGZpbGw9IiNGRTJDNTUiIGQ9Ik00MzQuOTkyIDgyNS40ODJjLTE4LjE3LTkuMTQ2LTMyLjI2LTIzLjAyOS00Mi45Mi00MC4zODItOC4xOC0xMy4zMTgtMTMuMTItMjcuNzc2LTE1LjE5LTQzLjM5NC0zLjM1OS0yNS4zNDYgMS40OS00OS4wMjkgMTQuMjc4LTcwLjgxNSAxNC43MDUtMjUuMDUgMzYuMjE4LTQyLjExNiA2NC4xMDYtNTAuODggMTMuMTUtNC4xMzIgMjYuNjQ0LTYuMDA5IDQwLjMyLTQuODU1IDguNjk2LjczNCAxNy4yNjggMi45MzcgMjYuNDQyIDQuNTggMC0zNC44NTMgMC02OS43NjguMDgtMTA1LjEzNSAxMi43NzMtLjA3IDI1LjQ2Ni4zMTMgMzguNTE0LjcwNnYxMzguNDY4Yy01My42NC0xMy4zMy05Ny44MyAxLjgyNy0xMjcuODkgNDcuODc4LTI2LjM0NyA0MC4zNjYtMjMuOTIxIDgyLjc3IDIuMjYgMTIzLjgyOSIgc3R5bGU9Ii0tZGFya3JlYWRlci1pbmxpbmUtZmlsbDp2YXIoLS1kYXJrcmVhZGVyLWJhY2tncm91bmQtZmUyYzU1LCAjYjEwMTIzKTstLWRhcmtyZWFkZXItaW5saW5lLXN0cm9rZTpub25lO29wYWNpdHk6MSIgZGF0YS1pbmRleD0iMTEiLz4KICA8cGF0aCBmaWxsPSIjRkUyQzU1IiBkPSJNODE1Ljk0MiAzNDQuNzc0Yy0zLjY3Ni0xLjg2LTcuNjc4LTMuNjYtMTAuOTAzLTYuMzgtMTguMzQ1LTE1LjQ3OC0zMy44MDgtMzMuMzM3LTQ1LjY3Ni01NC4zODUtOS42OTItMTcuMTg3LTE1LjgxMS0zNS41NC0yMC4zMzQtNTQuNTY3LS4xMTItLjQ3MS0uMDA1LS45OTUuMDgtMS44OTQgMTEuODQ5LS4zOTkgMjMuNjE4LS4zOTkgMzUuMzY5LS4zOTkuNTIgNi42NCAxLjAxNiAxMy4wMDYgMS41MiAxOS4zNzMgMS4zNTYgMTcuMTYgNS42NyAzMy41OTUgMTIuMDA0IDQ5LjU1NiA2LjE1IDE1LjQ5OCAxNC40MjYgMjkuNzk4IDI0LjExNCA0My4zMTcgMS4yMjcgMS43MTMgMi41NyAzLjM0NCAzLjgyNiA1LjM3OSIgc3R5bGU9Ii0tZGFya3JlYWRlci1pbmxpbmUtZmlsbDp2YXIoLS1kYXJrcmVhZGVyLWJhY2tncm91bmQtZmUyYzU1LCAjYjEwMTIzKTstLWRhcmtyZWFkZXItaW5saW5lLXN0cm9rZTpub25lIiBkYXRhLWluZGV4PSIxMiIvPgogIDxwYXRoIGZpbGw9IiMyNUY0RUUiIGQ9Ik05MjEuMDMgNDA4LjYxOWMtOS45ODUtMi41Ny0yMC00LjkzMi0yOS41MTUtOC41OTgtMTkuMjMtNy40MDgtMzYuNjczLTE3Ljk5My01MS45MjMtMzEuOTY0LTUuMjE4LTQuNzgtMTAuMTc3LTkuODQ0LTE1LjAzMy0xNS4xNDEgMTEgNC43OTIgMjEuNTg3IDEwLjQwMyAzMi42MDQgMTQuOTgxIDEyLjg2NyA1LjM0NyAyNi4zODggOC42NiA0MC4zMDYgMTAuMTA1IDcuOTcxLjgyOCAxNS45NCAxLjY3IDIzLjc1OSAyLjQ5IDAgOS4wODYgMCAxOC40MTUtLjE5NyAyOC4xMjciIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6dmFyKC0tZGFya3JlYWRlci10ZXh0LTI1ZjRlZSwgIzM2ZjVlZik7LS1kYXJrcmVhZGVyLWlubGluZS1zdHJva2U6dmFyKC0tZGFya3JlYWRlci10ZXh0LTBkOTlmZiwgIzIzYTNmZik7b3BhY2l0eToxIiBkYXRhLWluZGV4PSIxMyIvPgogIDxwYXRoIGZpbGw9IiNGRTJDNTUiIGQ9Ik04MTcuODI5IDM0Ni42OTJhMy41IDMuNSAwIDAgMS0yLjE5Mi0xLjMwNWMuODY4LjEyNCAxLjUyNy41NTkgMi4xOTIgMS4zMDUiIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6dmFyKC0tZGFya3JlYWRlci10ZXh0LWZlMmM1NSwgI2ZlMzk1Zik7LS1kYXJrcmVhZGVyLWlubGluZS1zdHJva2U6bm9uZSIgZGF0YS1pbmRleD0iMTQiLz4KICA8cGF0aCBmaWxsPSIjMjVGNEVFIiBkPSJNMzQwLjA0MiA5MjUuMjM3Yy42MTQuMTQ4IDEuMjU2LjU5IDEuODQ1IDEuMzk5LS42NC0uMTI1LTEuMjMtLjYxNS0xLjg0NS0xLjQiIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6dmFyKC0tZGFya3JlYWRlci10ZXh0LTI1ZjRlZSwgIzM2ZjVlZik7LS1kYXJrcmVhZGVyLWlubGluZS1zdHJva2U6bm9uZTt2aXNpYmlsaXR5OnZpc2libGUiIGRhdGEtaW5kZXg9IjE1Ii8+CiAgPHBhdGggZmlsbD0iI0ZFMkM1NSIgZD0iTTM0OS4xMDggOTMzLjQ0M2EzLjY2IDMuNjYgMCAwIDEgMi4yMiAxLjEzOGMtLjgyNi0uMDYyLTEuNDY4LS40Ni0yLjIyLTEuMTM4IiBzdHlsZT0iLS1kYXJrcmVhZGVyLWlubGluZS1maWxsOnZhcigtLWRhcmtyZWFkZXItdGV4dC1mZTJjNTUsICNmZTM5NWYpOy0tZGFya3JlYWRlci1pbmxpbmUtc3Ryb2tlOm5vbmU7dmlzaWJpbGl0eTp2aXNpYmxlIiBkYXRhLWluZGV4PSIxNiIvPgogIDxwYXRoIGZpbGw9IiMyNUY0RUUiIGQ9Ik04MjQuMjQ4IDM1MS45MTFjLS40NjcuMTg4LTEuMTUuMDY0LTIuMDQtLjQwMi40Ny0uMTk4IDEuMTQ3LS4wNTMgMi4wNC40MDIiIHN0eWxlPSItLWRhcmtyZWFkZXItaW5saW5lLWZpbGw6dmFyKC0tZGFya3JlYWRlci10ZXh0LTI1ZjRlZSwgIzM2ZjVlZik7LS1kYXJrcmVhZGVyLWlubGluZS1zdHJva2U6bm9uZSIgZGF0YS1pbmRleD0iMTciLz4KPC9zdmc+Cg==";
const epicIconUri = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgPGNpcmNsZSBjeD0iNTEyIiBjeT0iNTEyIiByPSI1MTIiIHN0eWxlPSJmaWxsOiMzMTMxMzEiLz4KICAgPHBhdGggZD0iTTMzMS40IDI3NmMtMjkuMyAwLTQwLjEgMTAuOC00MC4xIDQwLjF2MzUzLjRjMCAzLjMuMSA2LjQuNCA5LjIuNyA2LjQuOCAxMi43IDYuOCAxOS43LjYuOCA2LjYgNS4yIDYuNiA1LjIgMy4yIDEuNiA1LjUgMi43IDkuMiA0LjNsMTc3LjggNzQuNWM5LjIgNC4yIDEzLjEgNS45IDE5LjggNS43aC4xYzYuOC4yIDEwLjYtMS41IDE5LjgtNS43bDE3Ny44LTc0LjVjMy43LTEuNSA1LjktMi42IDkuMi00LjMgMCAwIDYuMS00LjUgNi42LTUuMiA2LTcgNi0xMy4yIDYuOC0xOS43LjMtMi44LjQtNS45LjQtOS4yVjMxNmMwLTI5LjMtMTAuOC00MC00MC4xLTQwSDMzMS40em0yODUgNjYuM2gxNC41YzI0LjIgMCAzNiAxMS44IDM2IDM2LjJ2NDAuMWgtMjkuM3YtMzguNWMwLTcuOC0zLjYtMTEuNS0xMS4yLTExLjVoLTVjLTcuOCAwLTExLjUgMy42LTExLjUgMTEuNXYxMjRjMCA3LjggMy42IDExLjQgMTEuNSAxMS40aDUuNWM3LjUgMCAxMS4xLTMuNiAxMS4xLTExLjR2LTQ0LjRoMjkuNHY0NS43YzAgMjQuNC0xMiAzNi40LTM2LjMgMzYuNGgtMTQuOGMtMjQuMyAwLTM2LjMtMTIuMS0zNi4zLTM2LjRWMzc4LjhjLjEtMjQuNCAxMi4xLTM2LjUgMzYuNC0zNi41em0tMjYwIDEuNmg2Ni40djI3LjJoLTM2LjZ2NTUuNmgzNS4ydjI3LjJoLTM1LjJ2NTkuMmgzNy4xdjI3LjJoLTY2LjlWMzQzLjl6bTgxLjQgMGg0Ni45YzI0LjMgMCAzNi4zIDEyLjEgMzYuMyAzNi41djUyLjJjMCAyNC40LTEyIDM2LjUtMzYuMyAzNi41aC0xNi45djcxLjJoLTI5LjlsLS4xLTE5Ni40em05Ni42IDBoMjkuOHYxOTYuNGgtMjkuOFYzNDMuOXptLTY2LjggMjYuNXY3Mi4zSDQ4MGM3LjUgMCAxMS4xLTMuNiAxMS4xLTExLjV2LTQ5LjNjMC03LjktMy42LTExLjUtMTEuMS0xMS41aC0xMi40ek0zODUuNCA1ODdoNC40bDEgLjFoMS42bC44LjNoLjhsLjguMi44LjIuNy4xLjcuMi43LjEuOC4zLjYuMS42LjMuOC4yLjYuMy44LjMuNy4zLjYuNC44LjMuNi40LjguNC42LjQuNy40LjYuNS42LjQuNi41LjcuNS42LjYuNi41LS41LjYtLjYuNi0uNS42LS42LjYtLjUuNi0uNS42LS42LjYtLjUuNi0uNS42LS42LjYtLjUuNi0uNi42LS41LjYtLjUuNi0uNi42LS41LjctLjYuNi0uNS42LS42LS41LS42LS42LS42LS40LS43LS41LS42LS40LS43LS40LS42LS40LS43LS40LS42LS4zLS42LS4zLS42LS4yLS43LS4zLS44LS4yLS42LS4yLS44LS4yLS44LS4yLS44LS4xaC0uOWwtMS0uMmgtMS42bC0uOC4xaC0uOGwtLjguMi0uNy4yLS43LjItLjguMi0uNi4zLS44LjMtLjYuNC0uNi40LS42LjQtLjYuNS0uNi41LS42LjUtLjUuNi0uNi42LS40LjYtLjQuNi0uNS42LS4zLjctLjQuNi0uNC43LS4yLjctLjMuNy0uMi44LS4xLjgtLjIuNy0uMi45di44bC0uMS44djEuOWwuMS44LjEuNy4xLjguMi44LjIuNi4xLjguMi42LjMuNi4zLjguNC44LjMuNi40LjYuNS43LjUuNi40LjYuNi42LjUuNi42LjUuNi41LjYuNS43LjQuNi40LjcuMy44LjMuNi4zLjguMi44LjMuOC4xLjguMi44LjEgMSAuMWgyLjZsMS0uMWguOGwuOC0uMy44LS4xLjgtLjMuNy0uMS43LS4zLjYtLjMuOC0uMy41LS4zLjYtLjR2LTcuNGgtMTEuOHYtMTEuOWgyNi42djI2LjZsLS42LjUtLjYuNS0uNi40LS42LjUtLjYuNC0uNi41LS42LjQtLjcuNC0uOC40LS43LjQtLjYuNC0uOC4zLS42LjQtLjguMy0uOC4zLS44LjMtLjcuMy0uNy4yLS43LjMtLjguMi0uNy4yLS44LjMtLjcuMS0uOC4yLS44LjItLjguMS0uOC4xLS44LjEtLjguMS0xIC4xLS44LjEtLjkuMWgtNC4ybC0uNy42aC0uOGwtLjgtLjFoLS44bC0uOC0uMy0uOC0uMS0uOC0uMi0uOC0uMS0uNi0uMy0uOC0uMS0uOC0uMy0uNy0uMy0uNy0uMi0uOC0uMy0uNy0uMy0uOC0uMy0uNi0uMy0uOC0uNC0uNi0uNC0uOC0uNC0uNi0uNC0uNi0uNC0uNi0uNS0uNi0uNS0uNy0uNS0uNS0uNS0uNi0uNS0uNi0uNi0uNi0uNS0uNi0uNi0uNy0uNi0uNi0uNi0uNS0uNi0uNS0uNi0uNC0uNi0uNS0uNi0uNC0uNi0uNC0uNi0uNC0uNy0uNC0uNi0uMy0uNy0uMy0uNy0uMy0uNy0uMy0uNy0uMi0uNi0uMy0uNy0uMi0uNy0uMi0uNy0uMi0uOC0uMi0uNy0uMi0uOC0uMS0uNy0uMi0uOC0uMS0uNy0uMS0uOC0uMS0uOC0uMS0uOHYtNC40bC4yLS44di0uOWwuMi0uOHYtLjhsLjMtLjguMy0uOC4xLS44LjItLjcuMy0uOC4yLS43LjMtLjguMy0uNy4zLS43LjMtLjcuMy0uNy40LS43LjQtLjYuNC0uNi40LS42LjQtLjYuNS0uNy41LS42LjUtLjYuNi0uNi41LS42LjUtLjYuNi0uNi41LS42LjYtLjUuNi0uNi42LS41LjYtLjUuNi0uNC42LS41LjYtLjQuNy0uNC43LS40LjgtLjQuNi0uNC44LS4zLjctLjMuOC0uNC42LS4yLjgtLjMuNy0uMy43LS4yLjctLjIuOC0uMi43LS4yLjgtLjJoLjhsLjgtLjJoLjhsLjgtLjJoLjhsMS4zLTF6bTI1NS44LjJoNC40bDEgLjJoMS42bC44LjJoMWwuOC4zLjcuMS44LjIuOC4xLjcuMi44LjIuOC4zLjYuMS44LjMuOC4zLjYuMy44LjMuOC4zLjcuNC42LjMuOC40LjcuNC42LjQuNy41LjYuNC42LjUuNi41LjYuNS0uNS42LS40LjctLjUuNi0uNS42LS41LjctLjQuNi0uNS42LS41LjctLjQuNi0uNS42LS41LjYtLjUuNy0uNC43LS41LjYtLjYuNi0uNC42LS41LjctLjYtLjUtLjctLjQtLjYtLjQtLjYtLjUtLjctLjMtLjYtLjQtLjgtLjMtLjYtLjMtLjgtLjMtLjYtLjMtLjYtLjItLjctLjMtLjgtLjItLjgtLjMtLjgtLjItLjktLjItLjgtLjEtLjgtLjItLjgtLjEtLjgtLjEtLjctLjFoLTEuOGwtLjkuMS0uOC4yLS44LjEtLjYuMy0uNi4zLS43LjYtLjUuNy0uMy43djJsLjQuOS4zLjUuNi42LjguNC42LjQuOC4zLjguMyAxIC4zLjYuMi42LjIuOC4yLjYuMi44LjIuOS4yLjkuMi45LjMuOS4xLjguMy45LjIuOC4yLjguMi44LjIuOC4zLjguMi43LjIuOC4zLjguMy44LjQuOC4zLjguNC44LjQuNi40LjYuNC43LjUuNi40LjcuNi42LjYuNi42LjYuNi40LjYuNi44LjQuNi4zLjguNC42LjIuOC4zLjYuMS44LjIuOC4xLjguMS44LjEuOHYybC0uMS45LS4xLjgtLjEuOS0uMi44LS4yLjgtLjIuOC0uMi44LS4zLjctLjMuNi0uMy43LS40LjYtLjUuNi0uNC42LS40LjctLjYuNi0uNS42LS42LjUtLjYuNi0uNi41LS42LjUtLjYuNC0uNy41LS44LjQtLjYuMy0uOC40LS44LjMtLjguMy0uOC4zLS44LjItLjYuMi0uOC4yLS44LjItLjYuMS0uOC4yaC0uM2wtLjguMWgtLjhsLS44LjJoLTZsLS44LS4xLS44LS4xLS45LS4xLS44LS4yLS44LS4xLS44LS4xLS44LS4yLS45LS4yLS44LS4yLS44LS4yLS44LS4yLS44LS4yLS44LS4zLS44LS4zLS43LS4yLS44LS4yLS44LS4zLS42LS4zLS44LS4zLS42LS40LS44LS4zLS43LS40LS42LS40LS44LS40LS42LS40LS43LS40LS42LS41LS42LS41LS42LS41LS42LS41LS42LS41LS42LS42LjUtLjYuNi0uNi41LS42LjYtLjYuNS0uNi41LS42LjYtLjYuNS0uNi42LS42LjUtLjYuNi0uNi41LS42LjUtLjYuNi0uNi41LS42LjYtLjYuNi0uNi42LjUuOC41LjYuNS44LjUuNi40LjcuNS42LjQuNy4zLjYuNC43LjMuOC4zLjYuMy44LjIuNi4zLjguMi44LjMuOC4zLjguMS44LjIuOC4xaC45bC44LjNoNC40bC44LS4yLjgtLjIuNi0uMS42LS4yLjYtLjMuNy0uNS40LS42LjQtLjYuMi0uOHYtMS45bC0uMy0uOC0uNS0uNi0uNS0uNS0uNy0uNS0uNi0uMy0uOC0uMy0uOC0uMy0xLS40LS42LS4xLS42LS4yLS44LS4yLS42LS4yLS44LS4zLS44LS4xLS45LS4zLS44LS4xLS45LS4zLS44LS4xLS44LS4zLS44LS4xLS44LS4zLS44LS4yLS44LS4yLS43LS4zLS43LS4yLS43LS4zLS44LS4zLS45LS4zLS44LS4zLS44LS4zLS44LS40LS44LS40LS42LS40LS44LS40LS42LS41LS43LS40LS41LS41LS42LS42LS42LS42LS41LS42LS41LS42LS40LS42LS40LS42LS40LS43LS4zLS42LS4zLS42LS4yLS43LS4yLS42LS4yLS44LS4xLS43di0uOGwtLjItLjh2LTMuNWwuMS0uOC4xLS44LjEtLjYuMi0uOC4yLS42LjItLjguMy0uNi4zLS44LjMtLjYuNC0uOC40LS42LjYtLjYuNC0uNi42LS42LjYtLjYuNS0uNi43LS42LjUtLjQuNy0uNS42LS41LjYtLjQuOC0uNC42LS4zLjgtLjQuNi0uMy44LS4zLjgtLjMuOC0uMi42LS4yLjgtLjEuNi0uMi44LS4xLjgtLjIuOC0uMS44LS4xLjgtLjEuNi0uMXptLTE5Ny4xLjZoMTUuMWwuMy43LjMuNy4zLjcuMi44LjMuNy4zLjcuMy43LjMuNy4yLjcuNC44LjMuNy4zLjcuMi43LjMuNy40LjcuMy44LjMuNy4yLjcuMy43LjQuNy4yLjcuMy44LjIuOC4zLjYuNC44LjMuNi4zLjguMy44LjIuNi40LjguMy42LjMuOC4yLjYuMy44LjQuOC4zLjcuMi43LjIuNy4zLjcuNC43LjMuOC4zLjcuMi43LjMuNy4zLjcuMy43LjMuOC4zLjcuMy43LjQuNy4zLjcuMy43LjIuOC4zLjcuNC43LjMuNy4yLjcuMy43LjMuOC40LjguMi42LjMuOC4yLjYuMy44LjQuOC4zLjYuMi44LjMuNi4yLjguNC42LjMuOC4yLjguMy42LjMuOC40LjYuMy44LjIuOC4zLjYuMy44LjQuNkg0NjZsLS40LS43LS4yLS43LS4zLS43LS4zLS44LS4yLS43LS4zLS43LS4zLS43LS4zLS43LS4zLS43LS4zLS43LS4yLS43LS4zLS44LS4zLS43LS4zLS43LS4zLS43aC0yMy4ybC0uMy44LS4yLjYtLjMuOC0uNC44LS4yLjYtLjMuOC0uMy42LS4yLjgtLjMuNi0uMy44LS4zLjYtLjMuOC0uMy44LS4zLjYtLjIuOGgtMTYuNWwuMy0uOC4zLS43LjMtLjcuMy0uOC4yLS43LjQtLjcuMy0uNy4zLS43LjItLjcuMy0uOC40LS43LjMtLjcuMy0uNy4yLS43LjMtLjcuNC0uOC4zLS43LjMtLjcuMy0uNy4zLS43LjMtLjcuMy0uOC4zLS44LjMtLjYuMy0uOC40LS42LjMtLjguMi0uOC4yLS42LjMtLjguNC0uNi4zLS44LjMtLjYuMi0uOC4zLS44LjQtLjYuMi0uOC4zLS42LjMtLjguMy0uOC40LS42LjMtLjguMi0uNi4zLS44LjMtLjYuNC0uOC4zLS44LjMtLjcuMi0uNy4zLS43LjQtLjcuMy0uNy4yLS44LjMtLjcuMy0uNy40LS43LjMtLjcuMi0uNy4zLS44LjMtLjguMy0uNi4zLS44LjItLjYuMy0uOC4zLS44LjQtLjYuMy0uOC4zLS42LjItLjguMy0uNi40LS44LjMtLjguMy0uNi4zLS44LjMtLjYuNC0uOC4yLS44LjItLjYuMy0uOCAyLjgtLjZ6bTQ2LjguNGgxNi41bC41LjYuNC43LjUuNi40LjcuNC42LjQuNy40LjYuNS43LjQuNi40LjYuNC43LjQuNi42LjcuMy42LjQuNy41LjYuNS42LjMuNy41LjYuNC43LjMuNi42LjcuNC42LjQuNy40LjYuNC42LjUuNy40LjYuNC43LjQuNi40LjcuNS42LjQuNy40LjYuNS0uNi4zLS44LjUtLjYuNS0uOC40LS42LjMtLjguNi0uNi40LS44LjMtLjYuNS0uNi41LS44LjQtLjYuNC0uOC40LS42LjUtLjguNC0uNi40LS44LjQtLjYuNC0uNi41LS44LjQtLjYuNC0uOC41LS42LjQtLjguNC0uNi41LS42LjQtLjguNS0uNi40LS44LjQtLjYuNC0uOC41LS42LjQtLjguNC0uNkg1NTN2NTkuNWgtMTUuN3YtMzVsLS40LjYtLjUuOC0uNC42LS41LjYtLjQuOC0uNS42LS40LjYtLjUuOC0uNC42LS40LjYtLjYuNi0uNC44LS41LjYtLjQuNi0uNC44LS41LjYtLjQuNi0uNS44LS40LjYtLjUuNi0uNC44LS40LjYtLjUuNi0uNC44LS41LjYtLjUuNi0uNC42LS40LjgtLjUuNi0uNS42LS4zLjgtLjYuNi0uNC42LS41LjgtLjQuNmgtLjNsLS41LS43LS40LS42LS41LS43LS40LS42LS41LS43LS40LS42LS41LS43LS40LS42LS41LS43LS40LS42LS42LS43LS4zLS42LS41LS43LS41LS42LS40LS43LS41LS42LS40LS44LS41LS42LS40LS43LS41LS42LS40LS43LS41LS42LS40LS43LS41LS42LS40LS43LS41LS42LS40LS43LS41LS42LS40LS43LS41LS42LS40LS43LS42LS42LS4zLS43LS41LS42djM1LjFINDkxdi01OC45bC0uMS0uMnptNzQgMGg0Ni45djEzLjRoLTMxLjR2OS41aDI4LjJ2MTIuN2gtMjguMlY2MzRoMzEuOHYxMy41SDU2NXYtNTguOWwtLjEtLjR6bS0xMTMuNSAxOC4yLS4zLjgtLjMuNi0uMy44LS4zLjgtLjIuNy0uMy43LS4zLjgtLjMuOC0uMi42LS4zLjgtLjMuNi0uMy44LS4zLjgtLjMuNi0uMi44LS4zLjYtLjMuOC0uNiAxLjItLjIuNi0uMy44LS4zLjgtLjIuNi0uMy44aDEzLjdsLS4zLS44LS4zLS43LS4zLS44LS4zLS43LS4yLS43LS4zLS43LS4zLS44LS4zLS43LS4zLS43LS4zLS43LS4yLS43LS4zLS44LS4zLS43LS4zLS43LS4zLS43LS4yLS43LS4zLS44LS4zLS44LS4zLS42LS4zLS44LS4zLS44LS4yLS43LS44LTEuMXptLTI0LjUgMTExLjRoMTcxbC04Ny4zIDI4LjgtODMuNy0yOC44eiIgc3R5bGU9ImZpbGw6I2ZmZiIvPgo8L3N2Zz4=";
const emailIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjMzMzUgMi42NjY1SDIuNjY2ODNDMS45MzA0NSAyLjY2NjUgMS4zMzM1IDMuMjYzNDYgMS4zMzM1IDMuOTk5ODRWMTEuOTk5OEMxLjMzMzUgMTIuNzM2MiAxLjkzMDQ1IDEzLjMzMzIgMi42NjY4MyAxMy4zMzMySDEzLjMzMzVDMTQuMDY5OSAxMy4zMzMyIDE0LjY2NjggMTIuNzM2MiAxNC42NjY4IDExLjk5OThWMy45OTk4NEMxNC42NjY4IDMuMjYzNDYgMTQuMDY5OSAyLjY2NjUgMTMuMzMzNSAyLjY2NjVaIiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTQuNjY2OCA0LjY2NjVMOC42ODY4MyA4LjQ2NjVDOC40ODEwMSA4LjU5NTQ1IDguMjQzMDQgOC42NjM4NCA4LjAwMDE2IDguNjYzODRDNy43NTcyOCA4LjY2Mzg0IDcuNTE5MzEgOC41OTU0NSA3LjMxMzUgOC40NjY1TDEuMzMzNSA0LjY2NjUiIHN0cm9rZT0iIzMzODVGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
const phoneIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzU2MzlfNjMyKSI+CjxwYXRoIGQ9Ik0xNC42NjY5IDExLjI4MDJWMTMuMjgwMkMxNC42Njc3IDEzLjQ2NTkgMTQuNjI5NyAxMy42NDk3IDE0LjU1NTMgMTMuODE5OEMxNC40ODA5IDEzLjk4OTkgMTQuMzcxOCAxNC4xNDI2IDE0LjIzNSAxNC4yNjgxQzE0LjA5ODIgMTQuMzkzNyAxMy45MzY3IDE0LjQ4OTIgMTMuNzYwOCAxNC41NDg3QzEzLjU4NDkgMTQuNjA4MiAxMy4zOTg1IDE0LjYzMDMgMTMuMjEzNiAxNC42MTM2QzExLjE2MjIgMTQuMzkwNyA5LjE5MTYxIDEzLjY4OTcgNy40NjAyOCAxMi41NjY5QzUuODQ5NSAxMS41NDMzIDQuNDgzODQgMTAuMTc3NyAzLjQ2MDI4IDguNTY2ODlDMi4zMzM2IDYuODI3NyAxLjYzMjQ0IDQuODQ3NTYgMS40MTM2MSAyLjc4Njg5QzEuMzk2OTUgMi42MDI1NCAxLjQxODg2IDIuNDE2NzMgMS40Nzc5NSAyLjI0MTMxQzEuNTM3MDMgMi4wNjU4OSAxLjYzMTk5IDEuOTA0NjkgMS43NTY3OSAxLjc2Nzk3QzEuODgxNTkgMS42MzEyNiAyLjAzMzQ4IDEuNTIyMDMgMi4yMDI4MSAxLjQ0NzI0QzIuMzcyMTMgMS4zNzI0NSAyLjU1NTE3IDEuMzMzNzQgMi43NDAyOCAxLjMzMzU2SDQuNzQwMjhDNS4wNjM4MiAxLjMzMDM4IDUuMzc3NDggMS40NDQ5NSA1LjYyMjc5IDEuNjU1OTJDNS44NjgxIDEuODY2ODkgNi4wMjgzMyAyLjE1OTg2IDYuMDczNjEgMi40ODAyM0M2LjE1ODAzIDMuMTIwMjcgNi4zMTQ1OCAzLjc0ODcxIDYuNTQwMjggNC4zNTM1NkM2LjYyOTk4IDQuNTkyMTggNi42NDkzOSA0Ljg1MTUgNi41OTYyMiA1LjEwMDgxQzYuNTQzMDUgNS4zNTAxMiA2LjQxOTUyIDUuNTc4OTcgNi4yNDAyOCA1Ljc2MDIzTDUuMzkzNjEgNi42MDY4OUM2LjM0MjY1IDguMjc1OTIgNy43MjQ1OCA5LjY1Nzg2IDkuMzkzNjEgMTAuNjA2OUwxMC4yNDAzIDkuNzYwMjNDMTAuNDIxNSA5LjU4MDk5IDEwLjY1MDQgOS40NTc0NiAxMC44OTk3IDkuNDA0MjlDMTEuMTQ5IDkuMzUxMTIgMTEuNDA4MyA5LjM3MDUzIDExLjY0NjkgOS40NjAyM0MxMi4yNTE4IDkuNjg1OTMgMTIuODgwMiA5Ljg0MjQ4IDEzLjUyMDMgOS45MjY4OUMxMy44NDQxIDkuOTcyNTggMTQuMTM5OSAxMC4xMzU3IDE0LjM1MTMgMTAuMzg1MkMxNC41NjI3IDEwLjYzNDggMTQuNjc1MSAxMC45NTMzIDE0LjY2NjkgMTEuMjgwMloiIHN0cm9rZT0iIzMzODVGRiIgc3Ryb2tlLXdpZHRoPSIxLjMzMzMzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF81NjM5XzYzMiI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
const genericTokenIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzQwNDhfNDIzMSkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuNTg0IDQuODU1NjZDNy43MTA2OSA0Ljc4MjUyIDcuODU0MzkgNC43NDQwMiA4LjAwMDY3IDQuNzQ0MDJDOC4xNDY5NSA0Ljc0NDAyIDguMjkwNjUgNC43ODI1MiA4LjQxNzM0IDQuODU1NjZMMTAuNTE1MyA2LjA2NjY2QzEwLjY0MiA2LjEzOTggMTAuNzQ3MiA2LjI0NSAxMC44MjA0IDYuMzcxNjhDMTAuODkzNSA2LjQ5ODM1IDEwLjkzMiA2LjY0MjA1IDEwLjkzMiA2Ljc4ODMzVjkuMjExQzEwLjkzMiA5LjM1NzI3IDEwLjg5MzUgOS41MDA5NyAxMC44MjA0IDkuNjI3NjVDMTAuNzQ3MiA5Ljc1NDMzIDEwLjY0MiA5Ljg1OTUzIDEwLjUxNTMgOS45MzI2Nkw4LjQxNzM0IDExLjE0NEM4LjI5MDY1IDExLjIxNzEgOC4xNDY5NSAxMS4yNTU2IDguMDAwNjcgMTEuMjU1NkM3Ljg1NDM5IDExLjI1NTYgNy43MTA2OSAxMS4yMTcxIDcuNTg0IDExLjE0NEw1LjQ4NiA5LjkzMjY2QzUuMzU5MzIgOS44NTk1MyA1LjI1NDEzIDkuNzU0MzMgNS4xODA5OSA5LjYyNzY1QzUuMTA3ODUgOS41MDA5NyA1LjA2OTM0IDkuMzU3MjcgNS4wNjkzNCA5LjIxMVY2Ljc4ODY2QzUuMDY5MjggNi42NDIzMyA1LjEwNzc2IDYuNDk4NTYgNS4xODA5IDYuMzcxODJDNS4yNTQwNSA2LjI0NTA4IDUuMzU5MjcgNi4xMzk4MyA1LjQ4NiA2LjA2NjY2TDcuNTg0IDQuODU1NjZaTTguMDg0IDUuNDMzQzguMDU4NjcgNS40MTgzNyA4LjAyOTkzIDUuNDEwNjcgOC4wMDA2NyA1LjQxMDY3QzcuOTcxNDEgNS40MTA2NyA3Ljk0MjY3IDUuNDE4MzcgNy45MTczNCA1LjQzM0w1LjgxOTM0IDYuNjQ0MzNDNS43OTQgNi42NTg5NiA1Ljc3Mjk2IDYuNjggNS43NTgzMyA2LjcwNTMzQzUuNzQzNyA2LjczMDY3IDUuNzM2IDYuNzU5NDEgNS43MzYgNi43ODg2NlY5LjIxMTMzQzUuNzM2IDkuMjQwNTkgNS43NDM3IDkuMjY5MzMgNS43NTgzMyA5LjI5NDY2QzUuNzcyOTYgOS4zMiA1Ljc5NCA5LjM0MTA0IDUuODE5MzQgOS4zNTU2Nkw3LjkxNzM0IDEwLjU2NjdDNy45NDI2NyAxMC41ODEzIDcuOTcxNDEgMTAuNTg5IDguMDAwNjcgMTAuNTg5QzguMDI5OTMgMTAuNTg5IDguMDU4NjcgMTAuNTgxMyA4LjA4NCAxMC41NjY3TDEwLjE4MiA5LjM1NTMzQzEwLjIwNzMgOS4zNDA3IDEwLjIyODQgOS4zMTk2NiAxMC4yNDMgOS4yOTQzM0MxMC4yNTc2IDkuMjY4OTkgMTAuMjY1MyA5LjI0MDI1IDEwLjI2NTMgOS4yMTFWNi43ODg2NkMxMC4yNjUzIDYuNzU5NDEgMTAuMjU3NiA2LjczMDY3IDEwLjI0MyA2LjcwNTMzQzEwLjIyODQgNi42OCAxMC4yMDczIDYuNjU4OTYgMTAuMTgyIDYuNjQ0MzNMOC4wODQgNS40MzNaIiBmaWxsPSIjNUM1QzVDIi8+CjwvZz4KPGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjcuNjkyMzEiIHN0cm9rZT0iIzVDNUM1QyIgc3Ryb2tlLXdpZHRoPSIwLjYxNTM4NSIvPgo8Y2lyY2xlIGN4PSI3Ljk5OTU1IiBjeT0iOC4wMDAwNCIgcj0iNS44NDYxNSIgc3Ryb2tlPSIjNUM1QzVDIiBzdHJva2Utd2lkdGg9IjAuNjE1Mzg1Ii8+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzQwNDhfNDIzMSI+CjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
const guestIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDIxVjE5QzE5IDE3LjkzOTEgMTguNTc4NiAxNi45MjE3IDE3LjgyODQgMTYuMTcxNkMxNy4wNzgzIDE1LjQyMTQgMTYuMDYwOSAxNSAxNSAxNUg5QzcuOTM5MTMgMTUgNi45MjE3MiAxNS40MjE0IDYuMTcxNTcgMTYuMTcxNkM1LjQyMTQzIDE2LjkyMTcgNSAxNy45MzkxIDUgMTlWMjEiIHN0cm9rZT0iIzMzODVGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEyIDExQzE0LjIwOTEgMTEgMTYgOS4yMDkxNCAxNiA3QzE2IDQuNzkwODYgMTQuMjA5MSAzIDEyIDNDOS43OTA4NiAzIDggNC43OTA4NiA4IDdDOCA5LjIwOTE0IDkuNzkwODYgMTEgMTIgMTFaIiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
const genericWalletIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjY2NjcgNC42NjY2N1YyLjY2NjY3QzEyLjY2NjcgMi40ODk4NiAxMi41OTY0IDIuMzIwMjkgMTIuNDcxNCAyLjE5NTI2QzEyLjM0NjQgMi4wNzAyNCAxMi4xNzY4IDIgMTIgMkgzLjMzMzMzQzIuOTc5NzEgMiAyLjY0MDU3IDIuMTQwNDggMi4zOTA1MiAyLjM5MDUyQzIuMTQwNDggMi42NDA1NyAyIDIuOTc5NzEgMiAzLjMzMzMzQzIgMy42ODY5NiAyLjE0MDQ4IDQuMDI2MDkgMi4zOTA1MiA0LjI3NjE0QzIuNjQwNTcgNC41MjYxOSAyLjk3OTcxIDQuNjY2NjcgMy4zMzMzMyA0LjY2NjY3SDEzLjMzMzNDMTMuNTEwMSA0LjY2NjY3IDEzLjY3OTcgNC43MzY5IDEzLjgwNDcgNC44NjE5M0MxMy45Mjk4IDQuOTg2OTUgMTQgNS4xNTY1MiAxNCA1LjMzMzMzVjhNMTQgOEgxMkMxMS42NDY0IDggMTEuMzA3MiA4LjE0MDQ4IDExLjA1NzIgOC4zOTA1MkMxMC44MDcxIDguNjQwNTcgMTAuNjY2NyA4Ljk3OTcxIDEwLjY2NjcgOS4zMzMzM0MxMC42NjY3IDkuNjg2OTYgMTAuODA3MSAxMC4wMjYxIDExLjA1NzIgMTAuMjc2MUMxMS4zMDcyIDEwLjUyNjIgMTEuNjQ2NCAxMC42NjY3IDEyIDEwLjY2NjdIMTRDMTQuMTc2OCAxMC42NjY3IDE0LjM0NjQgMTAuNTk2NCAxNC40NzE0IDEwLjQ3MTRDMTQuNTk2NCAxMC4zNDY0IDE0LjY2NjcgMTAuMTc2OCAxNC42NjY3IDEwVjguNjY2NjdDMTQuNjY2NyA4LjQ4OTg2IDE0LjU5NjQgOC4zMjAyOSAxNC40NzE0IDguMTk1MjZDMTQuMzQ2NCA4LjA3MDI0IDE0LjE3NjggOCAxNCA4WiIgc3Ryb2tlPSIjMzM4NUZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIgMy4zMzM1VjEyLjY2NjhDMiAxMy4wMjA1IDIuMTQwNDggMTMuMzU5NiAyLjM5MDUyIDEzLjYwOTZDMi42NDA1NyAxMy44NTk3IDIuOTc5NzEgMTQuMDAwMiAzLjMzMzMzIDE0LjAwMDJIMTMuMzMzM0MxMy41MTAxIDE0LjAwMDIgMTMuNjc5NyAxMy45Mjk5IDEzLjgwNDcgMTMuODA0OUMxMy45Mjk4IDEzLjY3OTkgMTQgMTMuNTEwMyAxNCAxMy4zMzM1VjEwLjY2NjgiIHN0cm9rZT0iIzMzODVGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
const passkeyIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzU2MzlfMzIpIj4KPHBhdGggZD0iTTcuOTk5NTkgNi42NjY1QzcuNjQ1OTYgNi42NjY1IDcuMzA2ODMgNi44MDY5OCA3LjA1Njc4IDcuMDU3MDNDNi44MDY3MyA3LjMwNzA4IDYuNjY2MjUgNy42NDYyMiA2LjY2NjI1IDcuOTk5ODRDNi42NjYyNSA4LjY3OTg0IDYuNTk5NTkgOS42NzMxNyA2LjQ5MjkyIDEwLjY2NjUiIHN0cm9rZT0iIzMzODVGRiIgc3Ryb2tlLXdpZHRoPSIxLjI1NDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOS4zMzI5MyA4Ljc0NjU4QzkuMzMyOTMgMTAuMzMzMiA5LjMzMjkzIDEyLjk5OTkgOC42NjYyNiAxNC42NjY2IiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMS4yNTQ5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTExLjUyNzMgMTQuMDEzM0MxMS42MDczIDEzLjYxMzMgMTEuODE0IDEyLjQ4IDExLjg2MDcgMTIiIHN0cm9rZT0iIzMzODVGRiIgc3Ryb2tlLXdpZHRoPSIxLjI1NDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMS4zMzM5OCA4LjAwMDE2QzEuMzMzOTggNi42MDA5NSAxLjc3NDIzIDUuMjM3MiAyLjU5MjM3IDQuMTAyMDlDMy40MTA1MSAyLjk2Njk5IDQuNTY1MDUgMi4xMTgwOCA1Ljg5MjQ3IDEuNjc1NjFDNy4yMTk4OCAxLjIzMzE0IDguNjUyODYgMS4yMTk1NCA5Ljk4ODQ0IDEuNjM2NzRDMTEuMzI0IDIuMDUzOTQgMTIuNDk0NSAyLjg4MDc5IDEzLjMzNCA0LjAwMDE2IiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMS4yNTQ5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEuMzMzOTggMTAuNjY2NUgxLjMzOTE0IiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMS4yNTQ5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE0LjUzMjcgMTAuNjY2NUMxNC42NjYgOS4zMzMxNyAxNC42MiA3LjA5NzE3IDE0LjUzMjcgNi42NjY1IiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMS4yNTQ5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTMuMzMzOTggMTIuOTk5OEMzLjY2NzMyIDExLjk5OTggNC4wMDA2NSA5Ljk5OTg0IDQuMDAwNjUgNy45OTk4NEMzLjk5OTk4IDcuNTQ1NzUgNC4wNzY2MyA3LjA5NDg2IDQuMjI3MzIgNi42NjY1IiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMS4yNTQ5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuNzY3MDkgMTQuNjY2OEM1LjkwNzA5IDE0LjIyNjggNi4wNjcwOSAxMy43ODY4IDYuMTQ3MDkgMTMuMzMzNSIgc3Ryb2tlPSIjMzM4NUZGIiBzdHJva2Utd2lkdGg9IjEuMjU0OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik02IDQuNTMzNDZDNi42MDgyNyA0LjE4MjI4IDcuMjk4MjggMy45OTc0NSA4LjAwMDY0IDMuOTk3NTZDOC43MDMwMSAzLjk5NzY3IDkuMzkyOTYgNC4xODI3MiAxMC4wMDExIDQuNTM0MUMxMC42MDkzIDQuODg1NDggMTEuMTE0MiA1LjM5MDc5IDExLjQ2NTEgNS45OTkyM0MxMS44MTYgNi42MDc2NiAxMi4wMDA1IDcuMjk3NzYgMTIgOC4wMDAxMlY5LjMzMzQ2IiBzdHJva2U9IiMzMzg1RkYiIHN0cm9rZS13aWR0aD0iMS4yNTQ5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF81NjM5XzMyIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
const socialIcons = {
    apple: appleIconUri,
    coinbase: coinbaseIconUri,
    discord: discordIconUri,
    facebook: facebookIconUri,
    farcaster: farcasterIconUri,
    github: githubIconUri,
    google: googleIconUri,
    line: lineIconUri,
    steam: steamIconUri,
    telegram: telegramIconUri,
    twitch: twitchIconUri,
    x: xIcon,
    tiktok: tiktokIconUri,
    epic: epicIconUri
};
function getSocialIcon(provider) {
    switch(provider){
        case "google":
            return googleIconUri;
        case "coinbase":
            return coinbaseIconUri;
        case "apple":
            return appleIconUri;
        case "facebook":
            return facebookIconUri;
        case "phone":
            return phoneIcon;
        case "email":
            return emailIcon;
        case "passkey":
            return passkeyIcon;
        case "discord":
            return discordIconUri;
        case "line":
            return lineIconUri;
        case "x":
            return xIcon;
        case "tiktok":
            return tiktokIconUri;
        case "epic":
            return epicIconUri;
        case "farcaster":
            return farcasterIconUri;
        case "telegram":
            return telegramIconUri;
        case "twitch":
            return twitchIconUri;
        case "github":
            return githubIconUri;
        case "steam":
            return steamIconUri;
        case "guest":
            return guestIcon;
        default:
            return genericWalletIcon;
    }
}
function useWalletIcon(props) {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$wallet$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const imageQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryFn: async ()=>fetchWalletImage({
                id
            }),
        queryKey: [
            "walletIcon",
            id
        ],
        ...props.queryOptions
    });
    return imageQuery;
}
async function fetchWalletImage(props) {
    const { getInstalledWalletProviders } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/injected/mipdStore.js [app-ssr] (ecmascript, async loader)");
    const mipdImage = getInstalledWalletProviders().find((x)=>x.info.rdns === props.id)?.info.icon;
    if (mipdImage) {
        return mipdImage;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletInfo"])(props.id, true);
} //# sourceMappingURL=walletIcon.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useSetActiveWalletConnectionStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSetActiveWalletConnectionStatus",
    ()=>useSetActiveWalletConnectionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
function useSetActiveWalletConnectionStatus() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useSetActiveWalletConnectionStatus");
    return manager.activeWalletConnectionStatusStore.setValue;
} //# sourceMappingURL=useSetActiveWalletConnectionStatus.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConnect",
    ()=>useConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useSetActiveWalletConnectionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useSetActiveWalletConnectionStatus.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function useConnect(options) {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useConnect");
    const { connect } = manager;
    const setConnectionStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useSetActiveWalletConnectionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSetActiveWalletConnectionStatus"])();
    const [isConnecting, setIsConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleConnection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (walletOrFn)=>{
        // reset error state
        setError(null);
        setConnectionStatus("connecting");
        if (typeof walletOrFn !== "function") {
            const account = await connect(walletOrFn, options);
            setConnectionStatus("connected");
            return account;
        }
        setIsConnecting(true);
        try {
            const w = await walletOrFn();
            const account = await connect(w, options);
            setConnectionStatus("connected");
            return account;
        } catch (e) {
            console.error(e);
            setError(e);
            setConnectionStatus("disconnected");
        } finally{
            setIsConnecting(false);
        }
        return null;
    }, [
        connect,
        options,
        setConnectionStatus
    ]);
    const cancelConnection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsConnecting(false);
        setConnectionStatus("disconnected");
    }, [
        setConnectionStatus
    ]);
    return {
        connect: handleConnection,
        error,
        isConnecting,
        cancelConnection
    };
} //# sourceMappingURL=useConnect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useAutoConnect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoConnectCore",
    ()=>useAutoConnectCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$connection$2f$autoConnectCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/connection/autoConnectCore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$storage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/storage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnect.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function useAutoConnectCore(storage, props, createWalletFn) {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useAutoConnect");
    const { connect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnect"])({
        accountAbstraction: props.accountAbstraction,
        client: props.client
    });
    // trigger the auto connect on first mount only
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$connection$2f$autoConnectCore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["autoConnectCore"])({
                connectOverride: connect,
                createWalletFn,
                manager,
                props,
                setLastAuthProvider: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$storage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setLastAuthProvider"],
                storage
            }),
        queryKey: [
            "autoConnect",
            props.client.clientId
        ],
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    return query;
} //# sourceMappingURL=useAutoConnect.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useIsAutoConnecting.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsAutoConnecting",
    ()=>useIsAutoConnecting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
;
function useIsAutoConnecting() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useIsAutoConnecting");
    const store = manager.isAutoConnecting;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(store.subscribe, store.getValue, store.getValue);
} //# sourceMappingURL=useIsAutoConnecting.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/errors/mapBridgeError.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Maps raw ApiError instances from the Bridge SDK into UI-friendly domain errors.
 * Currently returns the same error; will evolve to provide better user-facing messages.
 *
 * @param e - The raw ApiError from the Bridge SDK
 * @returns The mapped ApiError (currently unchanged)
 */ __turbopack_context__.s([
    "isRetryable",
    ()=>isRetryable,
    "mapBridgeError",
    ()=>mapBridgeError
]);
function mapBridgeError(e) {
    // For now, return the same error
    // TODO: This will evolve to provide better user-facing error messages
    return e;
}
function isRetryable(code) {
    // Treat INTERNAL_SERVER_ERROR & UNKNOWN_ERROR as retryable
    return code === "INTERNAL_SERVER_ERROR" || code === "UNKNOWN_ERROR";
} //# sourceMappingURL=mapBridgeError.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useBridgeError.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBridgeError",
    ()=>useBridgeError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$errors$2f$mapBridgeError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/errors/mapBridgeError.js [app-ssr] (ecmascript)");
;
;
function useBridgeError(params) {
    const { error } = params;
    // No error case
    if (!error) {
        return {
            errorCode: null,
            isClientError: false,
            isRetryable: false,
            isServerError: false,
            mappedError: null,
            statusCode: null,
            userMessage: ""
        };
    }
    // Convert to ApiError if it's not already
    let apiError;
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]) {
        apiError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$errors$2f$mapBridgeError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBridgeError"])(error);
    } else {
        // Create ApiError from generic Error
        apiError = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: "UNKNOWN_ERROR",
            message: error.message || "An unknown error occurred",
            statusCode: 500
        });
    }
    const statusCode = apiError.statusCode || null;
    const isClientError = statusCode !== null && statusCode >= 400 && statusCode < 500;
    const isServerError = statusCode !== null && statusCode >= 500;
    // Generate user-friendly message based on error code
    const userMessage = getUserFriendlyMessage(apiError);
    return {
        errorCode: apiError.code,
        isClientError,
        isRetryable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$errors$2f$mapBridgeError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRetryable"])(apiError.code),
        isServerError,
        mappedError: apiError,
        statusCode,
        userMessage
    };
}
/**
 * Converts technical error codes to user-friendly messages
 */ function getUserFriendlyMessage(error) {
    switch(error.code){
        case "INVALID_INPUT":
            return "Invalid input provided. Please check your parameters and try again.";
        case "ROUTE_NOT_FOUND":
            return "No route found for this transaction. Please try a different token pair or amount.";
        case "AMOUNT_TOO_LOW":
            return "The amount is too low for this transaction. Please increase the amount.";
        case "AMOUNT_TOO_HIGH":
            return "The amount is too high for this transaction. Please decrease the amount.";
        case "INTERNAL_SERVER_ERROR":
            return "A temporary error occurred. Please try again in a moment.";
        default:
            // Fallback to the original error message if available
            return error.message || "An unexpected error occurred. Please try again.";
    }
} //# sourceMappingURL=useBridgeError.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/account/provider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountProvider",
    ()=>AccountProvider,
    "useAccountContext",
    ()=>useAccountContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AccountProviderContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AccountProvider(props) {
    if (!props.address) {
        throw new Error("AccountProvider: No address passed. Ensure an address is always provided to the AccountProvider");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(AccountProviderContext.Provider, {
        value: props,
        children: props.children
    });
}
function useAccountContext() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AccountProviderContext);
    if (!ctx) {
        throw new Error("AccountProviderContext not found. Make sure you are using AccountName, AccountAvatar, etc. inside an <AccountProvider /> component");
    }
    return ctx;
} //# sourceMappingURL=provider.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWalletConnectionStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveWalletConnectionStatus",
    ()=>useActiveWalletConnectionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
;
function useActiveWalletConnectionStatus() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useActiveWalletConnectionStatus");
    const store = manager.activeWalletConnectionStatusStore;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(store.subscribe, store.getValue, store.getValue);
} //# sourceMappingURL=useActiveWalletConnectionStatus.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/defaultTokens.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultTokens",
    ()=>defaultTokens,
    "getDefaultToken",
    ()=>getDefaultToken
]);
const wrappedEthIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAwIiBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzYyN0VFQSIvPjxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZmlsbC1vcGFjaXR5PSIuNjAyIiBkPSJNMTYuNDk4IDR2OC44N2w3LjQ5NyAzLjM1eiIvPjxwYXRoIGQ9Ik0xNi40OTggNEw5IDE2LjIybDcuNDk4LTMuMzV6Ii8+PHBhdGggZmlsbC1vcGFjaXR5PSIuNjAyIiBkPSJNMTYuNDk4IDIxLjk2OHY2LjAyN0wyNCAxNy42MTZ6Ii8+PHBhdGggZD0iTTE2LjQ5OCAyNy45OTV2LTYuMDI4TDkgMTcuNjE2eiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjIiIGQ9Ik0xNi40OTggMjAuNTczbDcuNDk3LTQuMzUzLTcuNDk3LTMuMzQ4eiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjYwMiIgZD0iTTkgMTYuMjJsNy40OTggNC4zNTN2LTcuNzAxeiIvPjwvZz48L2c+PC9zdmc+";
const tetherUsdIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzkuNDMgMjk1LjI3Ij48dGl0bGU+dGV0aGVyLXVzZHQtbG9nbzwvdGl0bGU+PHBhdGggZD0iTTYyLjE1LDEuNDVsLTYxLjg5LDEzMGEyLjUyLDIuNTIsMCwwLDAsLjU0LDIuOTRMMTY3Ljk1LDI5NC41NmEyLjU1LDIuNTUsMCwwLDAsMy41MywwTDMzOC42MywxMzQuNGEyLjUyLDIuNTIsMCwwLDAsLjU0LTIuOTRsLTYxLjg5LTEzMEEyLjUsMi41LDAsMCwwLDI3NSwwSDY0LjQ1YTIuNSwyLjUsMCwwLDAtMi4zLDEuNDVoMFoiIHN0eWxlPSJmaWxsOiM1MGFmOTU7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMTkxLjE5LDE0NC44djBjLTEuMi4wOS03LjQsMC40Ni0yMS4yMywwLjQ2LTExLDAtMTguODEtLjMzLTIxLjU1LTAuNDZ2MGMtNDIuNTEtMS44Ny03NC4yNC05LjI3LTc0LjI0LTE4LjEzczMxLjczLTE2LjI1LDc0LjI0LTE4LjE1djI4LjkxYzIuNzgsMC4yLDEwLjc0LjY3LDIxLjc0LDAuNjcsMTMuMiwwLDE5LjgxLS41NSwyMS0wLjY2di0yOC45YzQyLjQyLDEuODksNzQuMDgsOS4yOSw3NC4wOCwxOC4xM3MtMzEuNjUsMTYuMjQtNzQuMDgsMTguMTJoMFptMC0zOS4yNVY3OS42OGg1OS4yVjQwLjIzSDg5LjIxVjc5LjY4SDE0OC40djI1Ljg2Yy00OC4xMSwyLjIxLTg0LjI5LDExLjc0LTg0LjI5LDIzLjE2czM2LjE4LDIwLjk0LDg0LjI5LDIzLjE2djgyLjloNDIuNzhWMTUxLjgzYzQ4LTIuMjEsODQuMTItMTEuNzMsODQuMTItMjMuMTRzLTM2LjA5LTIwLjkzLTg0LjEyLTIzLjE1aDBabTAsMGgwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg==";
const usdcIcon = "data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9Ijg2OTc3Njg0LTEyZGItNDg1MC04ZjMwLTIzM2E3YzI2N2QxMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIj4KICA8cGF0aCBkPSJNMTAwMCAyMDAwYzU1NC4xNyAwIDEwMDAtNDQ1LjgzIDEwMDAtMTAwMFMxNTU0LjE3IDAgMTAwMCAwIDAgNDQ1LjgzIDAgMTAwMHM0NDUuODMgMTAwMCAxMDAwIDEwMDB6IiBmaWxsPSIjMjc3NWNhIi8+CiAgPHBhdGggZD0iTTEyNzUgMTE1OC4zM2MwLTE0NS44My04Ny41LTE5NS44My0yNjIuNS0yMTYuNjYtMTI1LTE2LjY3LTE1MC01MC0xNTAtMTA4LjM0czQxLjY3LTk1LjgzIDEyNS05NS44M2M3NSAwIDExNi42NyAyNSAxMzcuNSA4Ny41IDQuMTcgMTIuNSAxNi42NyAyMC44MyAyOS4xNyAyMC44M2g2Ni42NmMxNi42NyAwIDI5LjE3LTEyLjUgMjkuMTctMjkuMTZ2LTQuMTdjLTE2LjY3LTkxLjY3LTkxLjY3LTE2Mi41LTE4Ny41LTE3MC44M3YtMTAwYzAtMTYuNjctMTIuNS0yOS4xNy0zMy4zMy0zMy4zNGgtNjIuNWMtMTYuNjcgMC0yOS4xNyAxMi41LTMzLjM0IDMzLjM0djk1LjgzYy0xMjUgMTYuNjctMjA0LjE2IDEwMC0yMDQuMTYgMjA0LjE3IDAgMTM3LjUgODMuMzMgMTkxLjY2IDI1OC4zMyAyMTIuNSAxMTYuNjcgMjAuODMgMTU0LjE3IDQ1LjgzIDE1NC4xNyAxMTIuNXMtNTguMzQgMTEyLjUtMTM3LjUgMTEyLjVjLTEwOC4zNCAwLTE0NS44NC00NS44NC0xNTguMzQtMTA4LjM0LTQuMTYtMTYuNjYtMTYuNjYtMjUtMjkuMTYtMjVoLTcwLjg0Yy0xNi42NiAwLTI5LjE2IDEyLjUtMjkuMTYgMjkuMTd2NC4xN2MxNi42NiAxMDQuMTYgODMuMzMgMTc5LjE2IDIyMC44MyAyMDB2MTAwYzAgMTYuNjYgMTIuNSAyOS4xNiAzMy4zMyAzMy4zM2g2Mi41YzE2LjY3IDAgMjkuMTctMTIuNSAzMy4zNC0zMy4zM3YtMTAwYzEyNS0yMC44NCAyMDguMzMtMTA4LjM0IDIwOC4zMy0yMjAuODR6IiBmaWxsPSIjZmZmIi8+CiAgPHBhdGggZD0iTTc4Ny41IDE1OTUuODNjLTMyNS0xMTYuNjYtNDkxLjY3LTQ3OS4xNi0zNzAuODMtODAwIDYyLjUtMTc1IDIwMC0zMDguMzMgMzcwLjgzLTM3MC44MyAxNi42Ny04LjMzIDI1LTIwLjgzIDI1LTQxLjY3VjMyNWMwLTE2LjY3LTguMzMtMjkuMTctMjUtMzMuMzMtNC4xNyAwLTEyLjUgMC0xNi42NyA0LjE2LTM5NS44MyAxMjUtNjEyLjUgNTQ1Ljg0LTQ4Ny41IDk0MS42NyA3NSAyMzMuMzMgMjU0LjE3IDQxMi41IDQ4Ny41IDQ4Ny41IDE2LjY3IDguMzMgMzMuMzQgMCAzNy41LTE2LjY3IDQuMTctNC4xNiA0LjE3LTguMzMgNC4xNy0xNi42NnYtNTguMzRjMC0xMi41LTEyLjUtMjkuMTYtMjUtMzcuNXpNMTIyOS4xNyAyOTUuODNjLTE2LjY3LTguMzMtMzMuMzQgMC0zNy41IDE2LjY3LTQuMTcgNC4xNy00LjE3IDguMzMtNC4xNyAxNi42N3Y1OC4zM2MwIDE2LjY3IDEyLjUgMzMuMzMgMjUgNDEuNjcgMzI1IDExNi42NiA0OTEuNjcgNDc5LjE2IDM3MC44MyA4MDAtNjIuNSAxNzUtMjAwIDMwOC4zMy0zNzAuODMgMzcwLjgzLTE2LjY3IDguMzMtMjUgMjAuODMtMjUgNDEuNjdWMTcwMGMwIDE2LjY3IDguMzMgMjkuMTcgMjUgMzMuMzMgNC4xNyAwIDEyLjUgMCAxNi42Ny00LjE2IDM5NS44My0xMjUgNjEyLjUtNTQ1Ljg0IDQ4Ny41LTk0MS42Ny03NS0yMzcuNS0yNTguMzQtNDE2LjY3LTQ4Ny41LTQ5MS42N3oiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg==";
const wrappedBtcIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDkuMjYgMTA5LjI2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzVhNTU2NDt9LmNscy0ye2ZpbGw6I2YwOTI0Mjt9LmNscy0ze2ZpbGw6IzI4MjEzODt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPndyYXBwZWQtYml0Y29pbi13YnRjPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxnIGlkPSJQYWdlLTEiPjxnIGlkPSJ3YnRjX2NvbG91ciIgZGF0YS1uYW1lPSJ3YnRjIGNvbG91ciI+PHBhdGggaWQ9IlNoYXBlIiBjbGFzcz0iY2xzLTEiIGQ9Ik04OS4wOSwyMi45M2wtMywzYTQyLjQ3LDQyLjQ3LDAsMCwxLDAsNTcuMzJsMywzYTQ2Ljc2LDQ2Ljc2LDAsMCwwLDAtNjMuMzlaIi8+PHBhdGggaWQ9IlNoYXBlLTIiIGRhdGEtbmFtZT0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTTI2LDIzLjE5YTQyLjQ3LDQyLjQ3LDAsMCwxLDU3LjMyLDBsMy0zYTQ2Ljc2LDQ2Ljc2LDAsMCwwLTYzLjM5LDBaIi8+PHBhdGggaWQ9IlNoYXBlLTMiIGRhdGEtbmFtZT0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTTIzLjE5LDgzLjI4YTQyLjQ3LDQyLjQ3LDAsMCwxLDAtNTcuMjlsLTMtM2E0Ni43Niw0Ni43NiwwLDAsMCwwLDYzLjM5WiIvPjxwYXRoIGlkPSJTaGFwZS00IiBkYXRhLW5hbWU9IlNoYXBlIiBjbGFzcz0iY2xzLTEiIGQ9Ik04My4yOCw4Ni4wNWE0Mi40Nyw0Mi40NywwLDAsMS01Ny4zMiwwbC0zLDNhNDYuNzYsNDYuNzYsMCwwLDAsNjMuMzksMFoiLz48cGF0aCBpZD0iU2hhcGUtNSIgZGF0YS1uYW1lPSJTaGFwZSIgY2xhc3M9ImNscy0yIiBkPSJNNzMuNTcsNDQuNjJjLS42LTYuMjYtNi04LjM2LTEyLjgzLTlWMjdINTUuNDZ2OC40NmMtMS4zOSwwLTIuODEsMC00LjIyLDBWMjdINDZ2OC42OEgzNS4yOXY1LjY1czMuOS0uMDcsMy44NCwwYTIuNzMsMi43MywwLDAsMSwzLDIuMzJWNjcuNDFhMS44NSwxLjg1LDAsMCwxLS42NCwxLjI5LDEuODMsMS44MywwLDAsMS0xLjM2LjQ2Yy4wNy4wNi0zLjg0LDAtMy44NCwwbC0xLDYuMzFINDUuOXY4LjgyaDUuMjhWNzUuNkg1NS40djguNjVoNS4yOVY3NS41M2M4LjkyLS41NCwxNS4xNC0yLjc0LDE1LjkyLTExLjA5LjYzLTYuNzItMi41My05LjcyLTcuNTgtMTAuOTNDNzIuMSw1Miw3NCw0OS4yLDczLjU3LDQ0LjYyWk02Ni4xNyw2My40YzAsNi41Ni0xMS4yNCw1LjgxLTE0LjgyLDUuODFWNTcuNTdDNTQuOTMsNTcuNTgsNjYuMTcsNTYuNTUsNjYuMTcsNjMuNFpNNjMuNzIsNDdjMCw2LTkuMzgsNS4yNy0xMi4zNiw1LjI3VjQxLjY5QzU0LjM0LDQxLjY5LDYzLjcyLDQwLjc1LDYzLjcyLDQ3WiIvPjxwYXRoIGlkPSJTaGFwZS02IiBkYXRhLW5hbWU9IlNoYXBlIiBjbGFzcz0iY2xzLTMiIGQ9Ik01NC42MiwxMDkuMjZhNTQuNjMsNTQuNjMsMCwxLDEsNTQuNjQtNTQuNjRBNTQuNjMsNTQuNjMsMCwwLDEsNTQuNjIsMTA5LjI2Wm0wLTEwNUE1MC4zNCw1MC4zNCwwLDEsMCwxMDUsNTQuNjIsNTAuMzQsNTAuMzQsMCwwLDAsNTQuNjIsNC4yNloiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+";
const maticIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSI1MTIiIHI9IjUxMiIgZmlsbD0iIzgyNDdFNSIvPgo8cGF0aCBkPSJNNjgxLjQ2OSA0MDIuNDU2QzY2OS4xODkgMzk1LjMxMiA2NTMuMjI0IDM5NS4zMTIgNjM5LjcxNiA0MDIuNDU2TDU0My45MjggNDU3LjIyOEw0NzguODQyIDQ5Mi45NDlMMzgzLjA1NSA1NDcuNzIxQzM3MC43NzQgNTU0Ljg2NSAzNTQuODEgNTU0Ljg2NSAzNDEuMzAxIDU0Ny43MjFMMjY1LjE2MiA1MDQuODU2QzI1Mi44ODIgNDk3LjcxMiAyNDQuMjg2IDQ4NC42MTQgMjQ0LjI4NiA0NzAuMzI1VjM4NS43ODZDMjQ0LjI4NiAzNzEuNDk4IDI1MS42NTQgMzU4LjQgMjY1LjE2MiAzNTEuMjU2TDM0MC4wNzMgMzA5LjU4MUMzNTIuMzUzIDMwMi40MzcgMzY4LjMxOCAzMDIuNDM3IDM4MS44MjcgMzA5LjU4MUw0NTYuNzM3IDM1MS4yNTZDNDY5LjAxOCAzNTguNCA0NzcuNjE0IDM3MS40OTggNDc3LjYxNCAzODUuNzg2VjQ0MC41NThMNTQyLjcgNDAzLjY0NlYzNDguODc0QzU0Mi43IDMzNC41ODYgNTM1LjMzMiAzMjEuNDg4IDUyMS44MjQgMzE0LjM0NEwzODMuMDU1IDIzNS43NThDMzcwLjc3NCAyMjguNjE0IDM1NC44MSAyMjguNjE0IDM0MS4zMDEgMjM1Ljc1OEwyMDAuMDc2IDMxNC4zNDRDMTg2LjU2NyAzMjEuNDg4IDE3OS4xOTkgMzM0LjU4NiAxNzkuMTk5IDM0OC44NzRWNTA3LjIzN0MxNzkuMTk5IDUyMS41MjUgMTg2LjU2NyA1MzQuNjIzIDIwMC4wNzYgNTQxLjc2N0wzNDEuMzAxIDYyMC4zNTNDMzUzLjU4MiA2MjcuNDk4IDM2OS41NDYgNjI3LjQ5OCAzODMuMDU1IDYyMC4zNTNMNDc4Ljg0MiA1NjYuNzcyTDU0My45MjggNTI5Ljg2TDYzOS43MTYgNDc2LjI3OUM2NTEuOTk2IDQ2OS4xMzUgNjY3Ljk2MSA0NjkuMTM1IDY4MS40NjkgNDc2LjI3OUw3NTYuMzggNTE3Ljk1M0M3NjguNjYgNTI1LjA5OCA3NzcuMjU3IDUzOC4xOTUgNzc3LjI1NyA1NTIuNDg0VjYzNy4wMjNDNzc3LjI1NyA2NTEuMzEyIDc2OS44ODggNjY0LjQwOSA3NTYuMzggNjcxLjU1M0w2ODEuNDY5IDcxNC40MTlDNjY5LjE4OSA3MjEuNTYzIDY1My4yMjQgNzIxLjU2MyA2MzkuNzE2IDcxNC40MTlMNTY0LjgwNSA2NzIuNzQ0QzU1Mi41MjUgNjY1LjYgNTQzLjkyOCA2NTIuNTAyIDU0My45MjggNjM4LjIxNFY1ODMuNDQyTDQ3OC44NDIgNjIwLjM1M1Y2NzUuMTI1QzQ3OC44NDIgNjg5LjQxNCA0ODYuMjEgNzAyLjUxMiA0OTkuNzE5IDcwOS42NTZMNjQwLjk0NCA3ODguMjQyQzY1My4yMjQgNzk1LjM4NiA2NjkuMTg5IDc5NS4zODYgNjgyLjY5NyA3ODguMjQyTDgyMy45MjIgNzA5LjY1NkM4MzYuMjAzIDcwMi41MTIgODQ0Ljc5OSA2ODkuNDE0IDg0NC43OTkgNjc1LjEyNVY1MTYuNzYzQzg0NC43OTkgNTAyLjQ3NCA4MzcuNDMxIDQ4OS4zNzcgODIzLjkyMiA0ODIuMjMyTDY4MS40NjkgNDAyLjQ1NloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";
const binanceCoinIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGcgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0JBMkYiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTIuMTE2IDE0LjQwNEwxNiAxMC41MmwzLjg4NiAzLjg4NiAyLjI2LTIuMjZMMTYgNmwtNi4xNDQgNi4xNDQgMi4yNiAyLjI2ek02IDE2bDIuMjYtMi4yNkwxMC41MiAxNmwtMi4yNiAyLjI2TDYgMTZ6bTYuMTE2IDEuNTk2TDE2IDIxLjQ4bDMuODg2LTMuODg2IDIuMjYgMi4yNTlMMTYgMjZsLTYuMTQ0LTYuMTQ0LS4wMDMtLjAwMyAyLjI2My0yLjI1N3pNMjEuNDggMTZsMi4yNi0yLjI2TDI2IDE2bC0yLjI2IDIuMjZMMjEuNDggMTZ6bS0zLjE4OC0uMDAyaC4wMDJ2LjAwMkwxNiAxOC4yOTRsLTIuMjkxLTIuMjktLjAwNC0uMDA0LjAwNC0uMDAzLjQwMS0uNDAyLjE5NS0uMTk1TDE2IDEzLjcwNmwyLjI5MyAyLjI5M3oiLz48L2c+PC9zdmc+";
const BUSDIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzYuNDEgMzM3LjQyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2YwYjkwYjtzdHJva2U6I2YwYjkwYjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDE8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTY4LjIuNzFsNDEuNSw0Mi41TDEwNS4yLDE0Ny43MWwtNDEuNS00MS41WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIzMS4yLDYzLjcxbDQxLjUsNDIuNUwxMDUuMiwyNzMuNzFsLTQxLjUtNDEuNVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00Mi4yLDEyNi43MWw0MS41LDQyLjUtNDEuNSw0MS41TC43LDE2OS4yMVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yOTQuMiwxMjYuNzFsNDEuNSw0Mi41TDE2OC4yLDMzNi43MWwtNDEuNS00MS41WiIvPjwvZz48L2c+PC9zdmc+";
const fantomIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO2ZpbGwtcnVsZTpldmVub2RkO30uY2xzLTJ7ZmlsbDojMTNiNWVjO30uY2xzLTN7bWFzazp1cmwoI21hc2spO308L3N0eWxlPjxtYXNrIGlkPSJtYXNrIiB4PSIxMCIgeT0iNiIgd2lkdGg9IjkzLjEiIGhlaWdodD0iMjAiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxnIGlkPSJhIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMCw2aDkzLjFWMjZIMTBaIi8+PC9nPjwvbWFzaz48L2RlZnM+PHRpdGxlPmZhPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiLz48ZyBjbGFzcz0iY2xzLTMiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE3LjIsMTIuOWwzLjYtMi4xVjE1Wm0zLjYsOUwxNiwyNC43bC00LjgtMi44VjE3TDE2LDE5LjgsMjAuOCwxN1pNMTEuMiwxMC44bDMuNiwyLjFMMTEuMiwxNVptNS40LDMuMUwyMC4yLDE2bC0zLjYsMi4xWm0tMS4yLDQuMkwxMS44LDE2bDMuNi0yLjFabTQuOC04LjNMMTYsMTIuMiwxMS44LDkuOCwxNiw3LjNaTTEwLDkuNFYyMi41bDYsMy40LDYtMy40VjkuNEwxNiw2WiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==";
// TODO these should be moved to chain definitions
const DEFAULT_TOKENS = {
    "1": [
        {
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            icon: tetherUsdIcon,
            name: "Tether USD",
            symbol: "USDT"
        },
        {
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        },
        {
            address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            icon: wrappedBtcIcon,
            name: "Wrapped Bitcoin",
            symbol: "WBTC"
        },
        {
            address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
            icon: maticIcon,
            name: "Polygon",
            symbol: "WMATIC"
        }
    ],
    "10": [
        {
            address: "0x4200000000000000000000000000000000000006",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ],
    "56": [
        {
            address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            icon: binanceCoinIcon,
            name: "Wrapped Binance Chain Token",
            symbol: "WBNB"
        },
        {
            address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            icon: BUSDIcon,
            name: "Binance USD",
            symbol: "BUSD"
        }
    ],
    "97": [
        {
            address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            icon: binanceCoinIcon,
            name: "Wrapped Binance Chain Testnet Token",
            symbol: "WBNB"
        },
        {
            address: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
            icon: BUSDIcon,
            name: "Binance USD",
            symbol: "BUSD"
        }
    ],
    "137": [
        {
            address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        },
        {
            address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            icon: maticIcon,
            name: "Wrapped Matic",
            symbol: "WMATIC"
        },
        {
            address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            icon: tetherUsdIcon,
            name: "Tether USD",
            symbol: "USDT"
        },
        {
            address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
            icon: wrappedBtcIcon,
            name: "Wrapped BTC",
            symbol: "WBTC"
        }
    ],
    "250": [
        {
            address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
            icon: fantomIcon,
            name: "Wrapped Fantom",
            symbol: "WFTM"
        },
        {
            address: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        },
        {
            address: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
            icon: wrappedBtcIcon,
            name: "Wrapped Bitcoin",
            symbol: "WBTC"
        }
    ],
    "420": [
        {
            address: "0x4200000000000000000000000000000000000006",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        }
    ],
    "4002": [
        {
            address: "0xf1277d1Ed8AD466beddF92ef448A132661956621",
            icon: fantomIcon,
            name: "Wrapped Fantom",
            symbol: "WFTM"
        }
    ],
    // Base mainnet
    "8453": [
        {
            address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ],
    "42161": [
        {
            address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ],
    "43113": [
        {
            address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
            icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwMyIgaGVpZ2h0PSIxNTA0IiB2aWV3Qm94PSIwIDAgMTUwMyAxNTA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIyODciIHk9IjI1OCIgd2lkdGg9IjkyOCIgaGVpZ2h0PSI4NDQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUwMi41IDc1MkMxNTAyLjUgMTE2Ni43NyAxMTY2LjI3IDE1MDMgNzUxLjUgMTUwM0MzMzYuNzM0IDE1MDMgMC41IDExNjYuNzcgMC41IDc1MkMwLjUgMzM3LjIzNCAzMzYuNzM0IDEgNzUxLjUgMUMxMTY2LjI3IDEgMTUwMi41IDMzNy4yMzQgMTUwMi41IDc1MlpNNTM4LjY4OCAxMDUwLjg2SDM5Mi45NEMzNjIuMzE0IDEwNTAuODYgMzQ3LjE4NiAxMDUwLjg2IDMzNy45NjIgMTA0NC45NkMzMjcuOTk5IDEwMzguNSAzMjEuOTExIDEwMjcuOCAzMjEuMTczIDEwMTUuOTlDMzIwLjYxOSAxMDA1LjExIDMyOC4xODQgOTkxLjgyMiAzNDMuMzEyIDk2NS4yNTVMNzAzLjE4MiAzMzAuOTM1QzcxOC40OTUgMzAzLjk5OSA3MjYuMjQzIDI5MC41MzEgNzM2LjAyMSAyODUuNTVDNzQ2LjUzNyAyODAuMiA3NTkuMDgzIDI4MC4yIDc2OS41OTkgMjg1LjU1Qzc3OS4zNzcgMjkwLjUzMSA3ODcuMTI2IDMwMy45OTkgODAyLjQzOCAzMzAuOTM1TDg3Ni40MiA0NjAuMDc5TDg3Ni43OTcgNDYwLjczOEM4OTMuMzM2IDQ4OS42MzUgOTAxLjcyMyA1MDQuMjg5IDkwNS4zODUgNTE5LjY2OUM5MDkuNDQzIDUzNi40NTggOTA5LjQ0MyA1NTQuMTY5IDkwNS4zODUgNTcwLjk1OEM5MDEuNjk1IDU4Ni40NTUgODkzLjM5MyA2MDEuMjE1IDg3Ni42MDQgNjMwLjU0OUw2ODcuNTczIDk2NC43MDJMNjg3LjA4NCA5NjUuNTU4QzY3MC40MzYgOTk0LjY5MyA2NjEuOTk5IDEwMDkuNDYgNjUwLjMwNiAxMDIwLjZDNjM3LjU3NiAxMDMyLjc4IDYyMi4yNjMgMTA0MS42MyA2MDUuNDc0IDEwNDYuNjJDNTkwLjE2MSAxMDUwLjg2IDU3My4wMDQgMTA1MC44NiA1MzguNjg4IDEwNTAuODZaTTkwNi43NSAxMDUwLjg2SDExMTUuNTlDMTE0Ni40IDEwNTAuODYgMTE2MS45IDEwNTAuODYgMTE3MS4xMyAxMDQ0Ljc4QzExODEuMDkgMTAzOC4zMiAxMTg3LjM2IDEwMjcuNDMgMTE4Ny45MiAxMDE1LjYzQzExODguNDUgMTAwNS4xIDExODEuMDUgOTkyLjMzIDExNjYuNTUgOTY3LjMwN0MxMTY2LjA1IDk2Ni40NTUgMTE2NS41NSA5NjUuNTg4IDExNjUuMDQgOTY0LjcwNkwxMDYwLjQzIDc4NS43NUwxMDU5LjI0IDc4My43MzVDMTA0NC41NCA3NTguODc3IDEwMzcuMTIgNzQ2LjMyNCAxMDI3LjU5IDc0MS40NzJDMTAxNy4wOCA3MzYuMTIxIDEwMDQuNzEgNzM2LjEyMSA5OTQuMTk5IDc0MS40NzJDOTg0LjYwNSA3NDYuNDUzIDk3Ni44NTcgNzU5LjU1MiA5NjEuNTQ0IDc4NS45MzRMODU3LjMwNiA5NjQuODkxTDg1Ni45NDkgOTY1LjUwN0M4NDEuNjkgOTkxLjg0NyA4MzQuMDY0IDEwMDUuMDEgODM0LjYxNCAxMDE1LjgxQzgzNS4zNTIgMTAyNy42MiA4NDEuNDQgMTAzOC41IDg1MS40MDIgMTA0NC45NkM4NjAuNDQzIDEwNTAuODYgODc1Ljk0IDEwNTAuODYgOTA2Ljc1IDEwNTAuODZaIiBmaWxsPSIjRTg0MTQyIi8+Cjwvc3ZnPgo=",
            name: "Wrapped AVAX",
            symbol: "WAVAX"
        },
        {
            address: "0x5425890298aed601595a70AB815c96711a31Bc65",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ],
    "43114": [
        {
            address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwMyIgaGVpZ2h0PSIxNTA0IiB2aWV3Qm94PSIwIDAgMTUwMyAxNTA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIyODciIHk9IjI1OCIgd2lkdGg9IjkyOCIgaGVpZ2h0PSI4NDQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUwMi41IDc1MkMxNTAyLjUgMTE2Ni43NyAxMTY2LjI3IDE1MDMgNzUxLjUgMTUwM0MzMzYuNzM0IDE1MDMgMC41IDExNjYuNzcgMC41IDc1MkMwLjUgMzM3LjIzNCAzMzYuNzM0IDEgNzUxLjUgMUMxMTY2LjI3IDEgMTUwMi41IDMzNy4yMzQgMTUwMi41IDc1MlpNNTM4LjY4OCAxMDUwLjg2SDM5Mi45NEMzNjIuMzE0IDEwNTAuODYgMzQ3LjE4NiAxMDUwLjg2IDMzNy45NjIgMTA0NC45NkMzMjcuOTk5IDEwMzguNSAzMjEuOTExIDEwMjcuOCAzMjEuMTczIDEwMTUuOTlDMzIwLjYxOSAxMDA1LjExIDMyOC4xODQgOTkxLjgyMiAzNDMuMzEyIDk2NS4yNTVMNzAzLjE4MiAzMzAuOTM1QzcxOC40OTUgMzAzLjk5OSA3MjYuMjQzIDI5MC41MzEgNzM2LjAyMSAyODUuNTVDNzQ2LjUzNyAyODAuMiA3NTkuMDgzIDI4MC4yIDc2OS41OTkgMjg1LjU1Qzc3OS4zNzcgMjkwLjUzMSA3ODcuMTI2IDMwMy45OTkgODAyLjQzOCAzMzAuOTM1TDg3Ni40MiA0NjAuMDc5TDg3Ni43OTcgNDYwLjczOEM4OTMuMzM2IDQ4OS42MzUgOTAxLjcyMyA1MDQuMjg5IDkwNS4zODUgNTE5LjY2OUM5MDkuNDQzIDUzNi40NTggOTA5LjQ0MyA1NTQuMTY5IDkwNS4zODUgNTcwLjk1OEM5MDEuNjk1IDU4Ni40NTUgODkzLjM5MyA2MDEuMjE1IDg3Ni42MDQgNjMwLjU0OUw2ODcuNTczIDk2NC43MDJMNjg3LjA4NCA5NjUuNTU4QzY3MC40MzYgOTk0LjY5MyA2NjEuOTk5IDEwMDkuNDYgNjUwLjMwNiAxMDIwLjZDNjM3LjU3NiAxMDMyLjc4IDYyMi4yNjMgMTA0MS42MyA2MDUuNDc0IDEwNDYuNjJDNTkwLjE2MSAxMDUwLjg2IDU3My4wMDQgMTA1MC44NiA1MzguNjg4IDEwNTAuODZaTTkwNi43NSAxMDUwLjg2SDExMTUuNTlDMTE0Ni40IDEwNTAuODYgMTE2MS45IDEwNTAuODYgMTE3MS4xMyAxMDQ0Ljc4QzExODEuMDkgMTAzOC4zMiAxMTg3LjM2IDEwMjcuNDMgMTE4Ny45MiAxMDE1LjYzQzExODguNDUgMTAwNS4xIDExODEuMDUgOTkyLjMzIDExNjYuNTUgOTY3LjMwN0MxMTY2LjA1IDk2Ni40NTUgMTE2NS41NSA5NjUuNTg4IDExNjUuMDQgOTY0LjcwNkwxMDYwLjQzIDc4NS43NUwxMDU5LjI0IDc4My43MzVDMTA0NC41NCA3NTguODc3IDEwMzcuMTIgNzQ2LjMyNCAxMDI3LjU5IDc0MS40NzJDMTAxNy4wOCA3MzYuMTIxIDEwMDQuNzEgNzM2LjEyMSA5OTQuMTk5IDc0MS40NzJDOTg0LjYwNSA3NDYuNDUzIDk3Ni44NTcgNzU5LjU1MiA5NjEuNTQ0IDc4NS45MzRMODU3LjMwNiA5NjQuODkxTDg1Ni45NDkgOTY1LjUwN0M4NDEuNjkgOTkxLjg0NyA4MzQuMDY0IDEwMDUuMDEgODM0LjYxNCAxMDE1LjgxQzgzNS4zNTIgMTAyNy42MiA4NDEuNDQgMTAzOC41IDg1MS40MDIgMTA0NC45NkM4NjAuNDQzIDEwNTAuODYgODc1Ljk0IDEwNTAuODYgOTA2Ljc1IDEwNTAuODZaIiBmaWxsPSIjRTg0MTQyIi8+Cjwvc3ZnPgo=",
            name: "Wrapped AVAX",
            symbol: "WAVAX"
        },
        {
            address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
            icon: tetherUsdIcon,
            name: "Tether USD",
            symbol: "USDT"
        },
        {
            address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        },
        {
            address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
            icon: wrappedBtcIcon,
            name: "Wrapped BTC",
            symbol: "WBTC"
        }
    ],
    "80001": [
        {
            address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
            icon: maticIcon,
            name: "Wrapped Matic",
            symbol: "WMATIC"
        },
        {
            address: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
            icon: wrappedEthIcon,
            name: "Wrapped Ether",
            symbol: "WETH"
        },
        {
            address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        },
        {
            address: "0x3813e82e6f7098b9583FC0F33a962D02018B6803",
            icon: tetherUsdIcon,
            name: "Tether USD",
            symbol: "USDT"
        }
    ],
    // Base sepolia
    "84532": [
        {
            address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ],
    "421614": [
        {
            address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ],
    "11155111": [
        {
            address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
            icon: usdcIcon,
            name: "USD Coin",
            symbol: "USDC"
        }
    ]
};
const defaultTokens = DEFAULT_TOKENS;
function getDefaultToken(chain, symbol) {
    const tokens = defaultTokens[chain.id];
    return tokens?.find((t)=>t.symbol === symbol);
} //# sourceMappingURL=defaultTokens.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useChainQuery.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChainExplorers",
    ()=>useChainExplorers,
    "useChainFaucets",
    ()=>useChainFaucets,
    "useChainIconUrl",
    ()=>useChainIconUrl,
    "useChainMetadata",
    ()=>useChainMetadata,
    "useChainName",
    ()=>useChainName,
    "useChainSymbol",
    ()=>useChainSymbol,
    "useChainsQuery",
    ()=>useChainsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$p$2d$limit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/p-limit.js [app-ssr] (ecmascript)");
;
;
;
;
function useChainName(chain) {
    // only if we have a chain and no chain name!
    const isEnabled = !!chain && !chain.name;
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chain is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertApiChainToChain"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain));
        },
        ...getQueryOptions(chain),
        enabled: isEnabled,
        retry: false
    });
    return {
        isLoading: isEnabled && chainQuery.isLoading,
        name: chain?.name ?? chainQuery.data?.name
    };
}
function useChainIconUrl(chain) {
    // only if we have a chain and no chain icon url!
    const isEnabled = !!chain && !chain.icon?.url;
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        // only if we have a chain and no chain icon url!
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chain is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertApiChainToChain"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain));
        },
        ...getQueryOptions(chain),
        enabled: isEnabled,
        retry: false
    });
    return {
        isLoading: isEnabled && chainQuery.isLoading,
        url: chain?.icon?.url ?? chainQuery.data?.icon?.url
    };
}
function useChainFaucets(chain) {
    // only if we have a chain and it might be a testnet and no faucets and its not localhost
    const isEnabled = !!chain && "testnet" in chain && !chain.faucets?.length && chain.id !== 1337;
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chain is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain);
        },
        ...getQueryOptions(chain),
        enabled: isEnabled
    });
    return {
        faucets: chain?.faucets ?? chainQuery.data?.faucets ?? [],
        isLoading: isEnabled && chainQuery.isLoading
    };
}
function useChainSymbol(chain) {
    // only if we have a chain and no chain icon url!
    const isEnabled = !!chain && !chain.nativeCurrency?.symbol;
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chain is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain);
        },
        ...getQueryOptions(chain),
        enabled: isEnabled
    });
    return {
        isLoading: isEnabled && chainQuery.isLoading,
        symbol: chain?.nativeCurrency?.symbol ?? chainQuery.data?.nativeCurrency?.symbol
    };
}
function useChainExplorers(chain) {
    // only if we have a chain and it might be a testnet and no faucets and its not localhost
    const isEnabled = !!chain && !chain.blockExplorers?.length;
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chain is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain);
        },
        ...getQueryOptions(chain),
        enabled: isEnabled
    });
    const toChain = chainQuery.data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertApiChainToChain"])(chainQuery.data) : undefined;
    return {
        explorers: chain?.blockExplorers && chain?.blockExplorers?.length > 0 ? chain?.blockExplorers : toChain?.blockExplorers ?? [],
        isLoading: isEnabled && chainQuery.isLoading
    };
}
function getQueryOptions(chain) {
    return {
        enabled: !!chain,
        queryKey: [
            "chain",
            chain?.id
        ],
        staleTime: 1000 * 60 * 60
    };
}
function useChainMetadata(chain) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        ...getQueryOptions(chain),
        queryFn: async ()=>{
            if (!chain) {
                throw new Error("chainId is required");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain);
        }
    });
}
function useChainsQuery(chains, maxConcurrency) {
    const queryList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$p$2d$limit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pLimit"])(maxConcurrency);
        return chains.map((chain)=>{
            return {
                ...getQueryOptions(chain),
                queryFn: ()=>limit(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChainMetadata"])(chain))
            };
        });
    }, [
        chains,
        maxConcurrency
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueries"])({
        queries: queryList
    });
} //# sourceMappingURL=useChainQuery.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWalletChain.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveWalletChain",
    ()=>useActiveWalletChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
;
function useActiveWalletChain() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useActiveWalletChain");
    const store = manager.activeWalletChainStore;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(store.subscribe, store.getValue, store.getValue);
} //# sourceMappingURL=useActiveWalletChain.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useSwitchActiveWalletChain.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSwitchActiveWalletChain",
    ()=>useSwitchActiveWalletChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
function useSwitchActiveWalletChain() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useSwitchActiveWalletChain");
    return manager.switchActiveWalletChain;
} //# sourceMappingURL=useSwitchActiveWalletChain.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/account.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOR_OPTIONS",
    ()=>COLOR_OPTIONS,
    "formatAccountFiatBalance",
    ()=>formatAccountFiatBalance,
    "formatAccountTokenBalance",
    ()=>formatAccountTokenBalance,
    "loadAccountBalance",
    ()=>loadAccountBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$cryptoToFiat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/cryptoToFiat.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$formatNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/formatNumber.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$shortenLargeNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/shortenLargeNumber.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$getWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/getWalletBalance.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const COLOR_OPTIONS = [
    [
        "#fca5a5",
        "#b91c1c"
    ],
    [
        "#fdba74",
        "#c2410c"
    ],
    [
        "#fcd34d",
        "#b45309"
    ],
    [
        "#fde047",
        "#a16207"
    ],
    [
        "#a3e635",
        "#4d7c0f"
    ],
    [
        "#86efac",
        "#15803d"
    ],
    [
        "#67e8f9",
        "#0e7490"
    ],
    [
        "#7dd3fc",
        "#0369a1"
    ],
    [
        "#93c5fd",
        "#1d4ed8"
    ],
    [
        "#a5b4fc",
        "#4338ca"
    ],
    [
        "#c4b5fd",
        "#6d28d9"
    ],
    [
        "#d8b4fe",
        "#7e22ce"
    ],
    [
        "#f0abfc",
        "#a21caf"
    ],
    [
        "#f9a8d4",
        "#be185d"
    ],
    [
        "#fda4af",
        "#be123c"
    ]
];
async function loadAccountBalance(props) {
    const { chain, client, address, tokenAddress, showBalanceInFiat } = props;
    if (!chain) {
        throw new Error("chain is required");
    }
    if (tokenAddress && tokenAddress?.toLowerCase() === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"].toLowerCase()) {
        throw new Error(`Invalid tokenAddress - cannot be ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"]}`);
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(address)) {
        throw new Error("Invalid wallet address. Expected an EVM address");
    }
    if (tokenAddress && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(tokenAddress)) {
        throw new Error("Invalid tokenAddress. Expected an EVM contract address");
    }
    const tokenBalanceData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$getWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletBalance"])({
        address,
        chain,
        client,
        tokenAddress
    }).catch(()=>undefined);
    if (!tokenBalanceData) {
        throw new Error(`Failed to retrieve ${tokenAddress ? `token: ${tokenAddress}` : "native token"} balance for address: ${address} on chainId:${chain.id}`);
    }
    if (showBalanceInFiat) {
        const fiatData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$cryptoToFiat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertCryptoToFiat"])({
            chain,
            client,
            fromAmount: Number(tokenBalanceData.displayValue),
            fromTokenAddress: tokenAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"],
            to: showBalanceInFiat
        }).catch(()=>undefined);
        if (fiatData === undefined) {
            throw new Error(`Failed to resolve fiat value for ${tokenAddress ? `token: ${tokenAddress}` : "native token"} on chainId: ${chain.id}`);
        }
        const result = {
            balance: fiatData?.result,
            symbol: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFiatSymbol"])(showBalanceInFiat)
        };
        return result;
    }
    return {
        balance: Number(tokenBalanceData.displayValue),
        symbol: tokenBalanceData.symbol
    };
}
function formatAccountTokenBalance(props) {
    const formattedTokenBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$formatNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(props.balance, props.decimals);
    return `${formattedTokenBalance} ${props.symbol}`;
}
function formatAccountFiatBalance(props) {
    const num = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$formatNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(props.balance, props.decimals);
    // Need to keep them short to avoid UI overflow issues
    const formattedFiatBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$shortenLargeNumber$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shortenLargeNumber"])(num);
    return `${props.symbol}${formattedFiatBalance}`;
} //# sourceMappingURL=account.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useAddConnectedWallet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAddConnectedWallet",
    ()=>useAddConnectedWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/connection-manager.js [app-ssr] (ecmascript)");
"use client";
;
function useAddConnectedWallet() {
    const manager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$connection$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnectionManagerCtx"])("useAddConnectedWallet");
    return manager.addConnectedWallet;
} //# sourceMappingURL=useAddConnectedWallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/addresses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "shortenString",
    ()=>shortenString
]);
function shortenString(str, extraShort = true) {
    return `${str.substring(0, extraShort ? 4 : 6)}...${str.substring(str.length - (extraShort ? 3 : 4))}`;
} //# sourceMappingURL=addresses.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useSendToken.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSendToken",
    ()=>useSendToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$ens$2f$resolve$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/ens/resolve-address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$write$2f$transfer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/write/transfer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/wait-for-tx-receipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$isValidENSName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/isValidENSName.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$getWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/getWalletBalance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$invalidateWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/providers/invalidateWalletBalance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-ssr] (ecmascript)");
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
function useSendToken(client) {
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveWallet"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        async mutationFn (option) {
            const { tokenAddress, receiverAddress, amount } = option;
            const activeChain = wallet?.getChain();
            const account = wallet?.getAccount();
            // state validation
            if (!activeChain) {
                throw new Error("No active chain");
            }
            if (!account) {
                throw new Error("No active account");
            }
            // input validation
            if (!receiverAddress || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$isValidENSName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidENSName"])(receiverAddress) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(receiverAddress)) {
                throw new Error("Invalid receiver address");
            }
            if (!amount || Number.isNaN(Number(amount)) || Number(amount) < 0) {
                throw new Error("Invalid amount");
            }
            let to = receiverAddress;
            // resolve ENS if needed
            try {
                to = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$ens$2f$resolve$2d$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAddress"])({
                    client,
                    name: receiverAddress
                });
            } catch  {
                throw new Error("Failed to resolve address");
            }
            // native token transfer
            if (!tokenAddress) {
                const sendNativeTokenTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareTransaction"])({
                    chain: activeChain,
                    client,
                    to,
                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toWei"])(amount)
                });
                const gasEstimate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateGas"])({
                    account,
                    transaction: sendNativeTokenTx
                });
                const balance = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$getWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletBalance"])({
                    address: account.address,
                    chain: activeChain,
                    client
                });
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toWei"])(amount) + gasEstimate > balance.value) {
                    throw new Error("Insufficient balance for transfer amount and gas");
                }
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendTransaction"])({
                    account,
                    transaction: sendNativeTokenTx
                });
            } else {
                const contract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                    address: tokenAddress,
                    chain: activeChain,
                    client
                });
                const tx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$write$2f$transfer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transfer"])({
                    amount,
                    contract,
                    to
                });
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendTransaction"])({
                    account,
                    transaction: tx
                });
            }
        },
        onSettled: async (data, error)=>{
            if (error) {
                return;
            }
            if (data?.transactionHash) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waitForReceipt"])({
                    chain: data.chain,
                    client,
                    maxBlocksWaitTime: 10_000,
                    transactionHash: data.transactionHash
                });
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$providers$2f$invalidateWalletBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invalidateWalletBalance"])(queryClient);
        }
    });
} //# sourceMappingURL=useSendToken.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useTokenInfo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTokenInfo",
    ()=>useTokenInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
;
;
function useTokenInfo(options) {
    const { chain, tokenAddress, client } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!chain && !!client,
        queryFn: async ()=>{
            // erc20 case
            if (tokenAddress) {
                const { getCurrencyMetadata } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/read/getCurrencyMetadata.js [app-ssr] (ecmascript, async loader)");
                const result = await getCurrencyMetadata({
                    contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                        address: tokenAddress,
                        chain,
                        client
                    })
                });
                return result;
            }
            const { getChainDecimals, getChainNativeCurrencyName, getChainSymbol } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript, async loader)");
            const [nativeSymbol, nativeDecimals, nativeName] = await Promise.all([
                getChainSymbol(chain),
                getChainDecimals(chain),
                getChainNativeCurrencyName(chain)
            ]);
            const result = {
                decimals: nativeDecimals,
                name: nativeName,
                symbol: nativeSymbol
            };
            return result;
        },
        queryKey: [
            "tokenInfo",
            chain?.id || -1,
            {
                tokenAddress
            }
        ]
    });
} //# sourceMappingURL=useTokenInfo.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/contract/useWaitForReceipt.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWaitForReceipt",
    ()=>useWaitForReceipt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/wait-for-tx-receipt.js [app-ssr] (ecmascript)");
;
;
function useWaitForReceipt(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!options?.transactionHash && (options?.queryOptions?.enabled ?? true),
        queryFn: async ()=>{
            if (!options?.transactionHash) {
                throw new Error("No transaction hash or user op hash provided");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waitForReceipt"])(options);
        },
        queryKey: [
            "waitForReceipt",
            // TODO: here chain can be undefined so we go to a `-1` chain but this feels wrong
            options?.chain.id || -1,
            options?.transactionHash
        ],
        retry: false
    });
} //# sourceMappingURL=useWaitForReceipt.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useTransactionDetails.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTransactionDetails",
    ()=>useTransactionDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$get$2d$compiler$2d$metadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/get-compiler-metadata.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$read$2f$decimals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/read/decimals.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/get-token.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$is$2d$smart$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/is-smart-wallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/formatTokenBalance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useChainQuery.js [app-ssr] (ecmascript)");
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
function useTransactionDetails({ transaction, client, wallet }) {
    const chainMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChainMetadata"])(transaction.chain);
    const hasSponsoredTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$is$2d$smart$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasSponsoredTransactionsEnabled"])(wallet);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!transaction.to && !!chainMetadata.data,
        queryFn: async ()=>{
            const contract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                address: transaction.to,
                chain: transaction.chain,
                client
            });
            const [contractMetadata, value, erc20Value, transactionData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$get$2d$compiler$2d$metadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompilerMetadata"])(contract).catch(()=>null),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.value),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.erc20Value),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"])(transaction).catch(()=>"0x")
            ]);
            const [tokenInfo, gasCostWei] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])(client, erc20Value?.tokenAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"], transaction.chain.id),
                hasSponsoredTransactions ? 0n : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTransactionGasCost"])(transaction).catch(()=>null)
            ]);
            // Process function info from ABI if available
            let functionInfo = {
                description: undefined,
                functionName: "Contract Call",
                selector: "0x"
            };
            if (contractMetadata?.abi && transactionData.length >= 10) {
                try {
                    const selector = transactionData.slice(0, 10);
                    const abi = contractMetadata.abi;
                    // Find matching function in ABI
                    const abiItems = Array.isArray(abi) ? abi : [];
                    const functions = abiItems.filter((item)=>item && typeof item === "object" && "type" in item && item.type === "function").map((item)=>item);
                    const matchingFunction = functions.find((fn)=>{
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFunctionSelector"])(fn) === selector;
                    });
                    if (matchingFunction) {
                        functionInfo = {
                            description: undefined,
                            functionName: matchingFunction.name,
                            selector
                        };
                    }
                } catch  {
                // Keep default values
                }
            }
            const resolveDecimals = async ()=>{
                if (tokenInfo) {
                    return tokenInfo.decimals;
                }
                if (erc20Value) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$read$2f$decimals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decimals"])({
                        contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                            address: erc20Value.tokenAddress,
                            chain: transaction.chain,
                            client
                        })
                    });
                }
                return 18;
            };
            const decimal = await resolveDecimals();
            const costWei = erc20Value ? erc20Value.amountWei : value || 0n;
            const nativeTokenSymbol = chainMetadata.data?.nativeCurrency?.symbol || "ETH";
            const tokenSymbol = tokenInfo?.symbol || nativeTokenSymbol;
            const totalCostWei = erc20Value && erc20Value.tokenAddress.toLowerCase() !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"] ? erc20Value.amountWei : (value || 0n) + (gasCostWei || 0n);
            const totalCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTokens"])(totalCostWei, decimal);
            return {
                contractMetadata,
                costWei,
                functionInfo,
                gasCostDisplay: gasCostWei ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(gasCostWei, 18)} ${nativeTokenSymbol}` : null,
                gasCostWei,
                tokenInfo,
                totalCost,
                totalCostWei,
                txCostDisplay: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])(costWei, decimal)} ${tokenSymbol}`
            };
        },
        queryKey: [
            "transaction-details",
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(transaction),
            hasSponsoredTransactions
        ]
    });
} //# sourceMappingURL=useTransactionDetails.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/usePaymentMethods.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePaymentMethods",
    ()=>usePaymentMethods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function usePaymentMethods(options) {
    const { destinationToken, destinationAmount, client, payerWallet, supportedTokens } = options;
    const localWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveWallet"])(); // TODO (bridge): get all connected wallets
    const wallet = payerWallet || localWallet;
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!wallet,
        queryFn: async ()=>{
            const account = wallet?.getAccount();
            if (!wallet || !account) {
                throw new Error("No wallet connected");
            }
            const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/buy/quote/${account.address}`);
            url.searchParams.set("destinationChainId", destinationToken.chainId.toString());
            url.searchParams.set("destinationTokenAddress", destinationToken.address);
            url.searchParams.set("amount", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUnits"])(destinationAmount, destinationToken.decimals).toString());
            // dont include quotes to speed up the query
            url.searchParams.set("includeQuotes", "false");
            const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
            const response = await clientFetch(url.toString());
            if (!response.ok) {
                const errorJson = await response.json();
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                    code: errorJson.code || "UNKNOWN_ERROR",
                    correlationId: errorJson.correlationId || undefined,
                    message: errorJson.message || response.statusText,
                    statusCode: response.status
                });
            }
            const { data: allValidOriginTokens } = await response.json();
            // Sort by enough balance to pay THEN gross balance
            const validTokenQuotes = allValidOriginTokens.map((s)=>({
                    balance: BigInt(s.balance),
                    originToken: s.token,
                    payerWallet: wallet,
                    type: "wallet",
                    quote: s.quote
                }));
            const sortedValidTokenQuotes = validTokenQuotes.filter((s)=>!!s.originToken.prices.USD).sort((a, b)=>{
                return Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTokens"])(b.balance, b.originToken.decimals)) * (b.originToken.prices.USD || 1) - Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTokens"])(a.balance, a.originToken.decimals)) * (a.originToken.prices.USD || 1);
            });
            // Filter out quotes that are not included in the supportedTokens (if provided)
            const tokensToInclude = supportedTokens ? Object.keys(supportedTokens).flatMap((c)=>supportedTokens[Number(c)]?.map((t)=>({
                        chainId: Number(c),
                        address: t.address
                    })) ?? []) : [];
            const finalQuotes = supportedTokens ? sortedValidTokenQuotes.filter((q)=>tokensToInclude.find((t)=>t.chainId === q.originToken.chainId && t.address.toLowerCase() === q.originToken.address.toLowerCase())) : sortedValidTokenQuotes;
            const requiredUsdValue = (destinationToken.prices?.["USD"] ?? 0) * Number(destinationAmount);
            return finalQuotes.map((x)=>{
                const tokenUsdValue = (x.originToken.prices?.["USD"] ?? 0) * Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTokens"])(x.balance, x.originToken.decimals));
                const hasEnoughBalance = tokenUsdValue >= requiredUsdValue;
                return {
                    ...x,
                    action: "buy",
                    hasEnoughBalance
                };
            });
        },
        queryKey: [
            "payment-methods",
            destinationToken.chainId,
            destinationToken.address,
            destinationAmount,
            payerWallet?.getAccount()?.address,
            supportedTokens
        ],
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000
    });
    return {
        data: query.data || [],
        error: query.error,
        isError: query.isError,
        isLoading: query.isLoading,
        isSuccess: query.isSuccess,
        refetch: query.refetch
    };
} //# sourceMappingURL=usePaymentMethods.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/pay/useBuyWithFiatQuotesForProviders.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBuyWithFiatQuotesForProviders",
    ()=>useBuyWithFiatQuotesForProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/get-token.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-ssr] (ecmascript)");
;
;
;
;
function useBuyWithFiatQuotesForProviders(params, queryOptions) {
    const providers = [
        "coinbase",
        "stripe",
        "transak"
    ];
    const queries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueries"])({
        queries: providers.map((provider)=>({
                ...queryOptions,
                enabled: !!params,
                queryFn: async ()=>{
                    if (!params) {
                        throw new Error("No params provided");
                    }
                    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])(params.client, params.tokenAddress, params.chainId);
                    const amountWei = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toUnits"])(params.amount, token.decimals);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prepare"])({
                        amount: amountWei,
                        chainId: params.chainId,
                        client: params.client,
                        currency: params.currency || "USD",
                        onramp: provider,
                        receiver: params.receiver,
                        tokenAddress: params.tokenAddress,
                        country: params.country
                    });
                },
                queryKey: [
                    "onramp-prepare",
                    provider,
                    params
                ],
                retry: false
            }))
    });
    return queries;
} //# sourceMappingURL=useBuyWithFiatQuotesForProviders.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useBridgePrepare.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBridgePrepare",
    ()=>useBridgePrepare
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Buy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Buy$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Buy.js [app-ssr] (ecmascript) <export * as Buy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Sell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Sell$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Sell.js [app-ssr] (ecmascript) <export * as Sell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Transfer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Transfer$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Transfer.js [app-ssr] (ecmascript) <export * as Transfer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Onramp$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript) <export * as Onramp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$errors$2f$mapBridgeError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/errors/mapBridgeError.js [app-ssr] (ecmascript)");
;
;
;
;
;
function useBridgePrepare(params) {
    const { enabled = true, type, ...prepareParams } = params;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: enabled && !!prepareParams.client,
        gcTime: 5 * 60 * 1000,
        queryFn: async ()=>{
            switch(type){
                case "buy":
                    {
                        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Buy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Buy$3e$__["Buy"].prepare(prepareParams);
                        return {
                            type: "buy",
                            ...result
                        };
                    }
                case "sell":
                    {
                        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Sell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Sell$3e$__["Sell"].prepare(prepareParams);
                        return {
                            type: "sell",
                            ...result
                        };
                    }
                case "transfer":
                    {
                        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Transfer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Transfer$3e$__["Transfer"].prepare(prepareParams);
                        return {
                            type: "transfer",
                            ...result
                        };
                    }
                case "onramp":
                    {
                        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Onramp$3e$__["Onramp"].prepare(prepareParams);
                        return {
                            type: "onramp",
                            ...result
                        };
                    }
                default:
                    throw new Error(`Unsupported bridge prepare type: ${type}`);
            }
        },
        queryKey: [
            "bridge-prepare",
            type,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(prepareParams)
        ],
        retry: (failureCount, error)=>{
            // Handle both ApiError and generic Error instances
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]) {
                const bridgeError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$errors$2f$mapBridgeError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBridgeError"])(error);
                // Don't retry on client-side errors (4xx)
                if (bridgeError.statusCode && bridgeError.statusCode >= 400 && bridgeError.statusCode < 500) {
                    return false;
                }
            }
            // Retry up to 2 times for prepared quotes (they're more time-sensitive)
            return failureCount < 2;
        },
        retryDelay: (attemptIndex)=>Math.min(1000 * 2 ** attemptIndex, 10000),
        staleTime: 2 * 60 * 1000
    });
} //# sourceMappingURL=useBridgePrepare.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useStepExecutor.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStepExecutor",
    ()=>useStepExecutor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/pay.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/wait-for-tx-receipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$wait$2d$for$2d$calls$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/wait-for-calls-receipt.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Flatten RouteStep[] into a linear list of transactions preserving ordering & indices.
 */ function flattenRouteSteps(steps) {
    const out = [];
    steps.forEach((step, stepIdx)=>{
        step.transactions?.forEach((tx, _txIdx)=>{
            out.push({
                ...tx,
                _index: out.length,
                _stepIndex: stepIdx
            });
        });
    });
    return out;
}
function useStepExecutor(options) {
    const { wallet, windowAdapter, client, autoStart = false, onComplete, preparedQuote } = options;
    // Flatten all transactions upfront
    const flatTxs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>preparedQuote?.steps ? flattenRouteSteps(preparedQuote.steps) : [], [
        preparedQuote?.steps
    ]);
    // State management
    const [currentTxIndex, setCurrentTxIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [executionState, setExecutionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [completedTxs, setCompletedTxs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [onrampStatus, setOnrampStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(preparedQuote?.type === "onramp" ? "pending" : undefined);
    // Cancellation tracking
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Get current step based on current tx index
    const currentStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (typeof preparedQuote?.steps === "undefined") return undefined;
        if (currentTxIndex === undefined) {
            return undefined;
        }
        const tx = flatTxs[currentTxIndex];
        return tx ? preparedQuote.steps[tx._stepIndex] : undefined;
    }, [
        currentTxIndex,
        flatTxs,
        preparedQuote?.steps
    ]);
    // Calculate progress including onramp step
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (typeof preparedQuote?.type === "undefined") return 0;
        const totalSteps = flatTxs.length + (preparedQuote.type === "onramp" ? 1 : 0);
        if (totalSteps === 0) {
            return 0;
        }
        const completedSteps = completedTxs.size + (onrampStatus === "completed" ? 1 : 0);
        return Math.round(completedSteps / totalSteps * 100);
    }, [
        completedTxs.size,
        flatTxs.length,
        preparedQuote?.type,
        onrampStatus
    ]);
    // Exponential backoff polling utility
    const poller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (pollFn, abortSignal)=>{
        const delay = 2000; // 2 second poll interval
        while(!abortSignal.aborted){
            const result = await pollFn();
            if (result.completed) {
                return;
            }
            await new Promise((resolve)=>{
                const timeout = setTimeout(resolve, delay);
                abortSignal.addEventListener("abort", ()=>clearTimeout(timeout), {
                    once: true
                });
            });
        }
        throw new Error("Polling aborted");
    }, []);
    // Execute a single transaction
    const executeSingleTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tx, account, completedStatusResults, abortSignal)=>{
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        const { prepareTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-ssr] (ecmascript, async loader)");
        const { sendTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-ssr] (ecmascript, async loader)");
        // Prepare the transaction
        const preparedTx = prepareTransaction({
            chain: tx.chain,
            client: tx.client,
            data: tx.data,
            to: tx.to,
            value: tx.value,
            extraGas: 50000n
        });
        // Send the transaction
        const result = await sendTransaction({
            account,
            transaction: preparedTx
        });
        const hash = result.transactionHash;
        if (tx.action === "approval" || tx.action === "fee") {
            // don't poll status for approval transactions, just wait for confirmation
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waitForReceipt"])(result);
            await new Promise((resolve)=>setTimeout(resolve, 2000)); // Add an extra 2 second delay for RPC to catch up to new state
            return;
        }
        // Poll for completion
        const { status } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Status.js [app-ssr] (ecmascript, async loader)");
        await poller(async ()=>{
            const statusResult = await status({
                chainId: tx.chainId,
                client: tx.client,
                transactionHash: hash
            });
            if (statusResult.status === "COMPLETED") {
                // Add type field from preparedQuote for discriminated union
                const typedStatusResult = {
                    type: preparedQuote.type,
                    ...statusResult
                };
                completedStatusResults.push(typedStatusResult);
                return {
                    completed: true
                };
            }
            if (statusResult.status === "FAILED") {
                throw new Error("Payment failed");
            }
            return {
                completed: false
            };
        }, abortSignal);
    }, [
        poller,
        preparedQuote?.type
    ]);
    // Execute batch transactions
    const executeBatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (txs, account, completedStatusResults, abortSignal)=>{
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        if (!account.sendBatchTransaction) {
            throw new Error("Account does not support batch transactions");
        }
        const { prepareTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-ssr] (ecmascript, async loader)");
        const { sendBatchTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-batch-transaction.js [app-ssr] (ecmascript, async loader)");
        // Prepare and convert all transactions
        const serializableTxs = await Promise.all(txs.map(async (tx)=>{
            const preparedTx = prepareTransaction({
                chain: tx.chain,
                client: tx.client,
                data: tx.data,
                to: tx.to,
                value: tx.value,
                extraGas: 50000n
            });
            return preparedTx;
        }));
        // Send batch
        const result = await sendBatchTransaction({
            account,
            transactions: serializableTxs
        });
        // Batch transactions return a single receipt, we need to handle this differently
        // For now, we'll assume all transactions in the batch succeed together
        // Poll for the first transaction's completion (representative of the batch)
        if (txs.length === 0) {
            throw new Error("No transactions to batch");
        }
        const firstTx = txs[0];
        if (!firstTx) {
            throw new Error("Invalid batch transaction");
        }
        const { status } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Status.js [app-ssr] (ecmascript, async loader)");
        await poller(async ()=>{
            const statusResult = await status({
                chainId: firstTx.chainId,
                client: firstTx.client,
                transactionHash: result.transactionHash
            });
            if (statusResult.status === "COMPLETED") {
                // Add type field from preparedQuote for discriminated union
                const typedStatusResult = {
                    type: preparedQuote.type,
                    ...statusResult
                };
                completedStatusResults.push(typedStatusResult);
                return {
                    completed: true
                };
            }
            if (statusResult.status === "FAILED") {
                throw new Error("Payment failed");
            }
            return {
                completed: false
            };
        }, abortSignal);
    }, [
        poller,
        preparedQuote?.type
    ]);
    // Execute batch transactions
    const executeSendCalls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (txs, wallet, account, completedStatusResults, abortSignal)=>{
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        if (!account.sendCalls) {
            throw new Error("Account does not support eip5792 send calls");
        }
        const { prepareTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-ssr] (ecmascript, async loader)");
        const { sendCalls } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/eip5792/send-calls.js [app-ssr] (ecmascript, async loader)");
        if (txs.length === 0) {
            throw new Error("No transactions to batch");
        }
        const firstTx = txs[0];
        if (!firstTx) {
            throw new Error("Invalid batch transaction");
        }
        // Prepare and convert all transactions
        const serializableTxs = await Promise.all(txs.map(async (tx)=>{
            const preparedTx = prepareTransaction({
                chain: tx.chain,
                client: tx.client,
                data: tx.data,
                to: tx.to,
                value: tx.value,
                extraGas: 50000n
            });
            return preparedTx;
        }));
        // Send batch
        const result = await sendCalls({
            wallet,
            calls: serializableTxs
        });
        // get tx hash
        const callsStatus = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$eip5792$2f$wait$2d$for$2d$calls$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waitForCallsReceipt"])(result);
        if (callsStatus.status === "failure") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                code: "UNKNOWN_ERROR",
                message: "Transaction failed. Please try a different payment token or amount.",
                statusCode: 500
            });
        }
        const lastReceipt = callsStatus.receipts?.[callsStatus.receipts.length - 1];
        if (!lastReceipt) {
            throw new Error("No receipts found");
        }
        const { status } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Status.js [app-ssr] (ecmascript, async loader)");
        await poller(async ()=>{
            const statusResult = await status({
                chainId: firstTx.chainId,
                client: firstTx.client,
                transactionHash: lastReceipt.transactionHash
            });
            if (statusResult.status === "COMPLETED") {
                // Add type field from preparedQuote for discriminated union
                const typedStatusResult = {
                    type: preparedQuote.type,
                    ...statusResult
                };
                completedStatusResults.push(typedStatusResult);
                return {
                    completed: true
                };
            }
            if (statusResult.status === "FAILED") {
                throw new Error("Payment failed");
            }
            return {
                completed: false
            };
        }, abortSignal);
    }, [
        poller,
        preparedQuote?.type
    ]);
    // Execute onramp step
    const executeOnramp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (onrampQuote, completedStatusResults, abortSignal)=>{
        setOnrampStatus("executing");
        // Open the payment URL
        windowAdapter.open(onrampQuote.link);
        // Poll for completion using the session ID
        const { Onramp } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/index.js [app-ssr] (ecmascript, async loader)");
        await poller(async ()=>{
            const statusResult = await Onramp.status({
                client: client,
                id: onrampQuote.id
            });
            const status = statusResult.status;
            if (status === "COMPLETED") {
                /*
                 * The occasional race condition can happen where the onramp provider gives us completed status before the token balance has updated in our RPC.
                 * We add this pause so the simulation doesn't fail on the next step.
                 */ await new Promise((resolve)=>setTimeout(resolve, 2000));
                setOnrampStatus("completed");
                // Add type field for discriminated union
                const typedStatusResult = {
                    type: "onramp",
                    ...statusResult
                };
                completedStatusResults.push(typedStatusResult);
                return {
                    completed: true
                };
            } else if (status === "FAILED") {
                setOnrampStatus("failed");
            }
            return {
                completed: false
            };
        }, abortSignal);
    }, [
        poller,
        client,
        windowAdapter
    ]);
    // Main execution function
    const execute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        if (executionState !== "idle") {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackPayEvent"])({
            client,
            event: `ub:ui:execution:start`,
            toChainId: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken.chainId,
            toToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken.address,
            fromToken: preparedQuote.steps[0]?.originToken.address,
            chainId: preparedQuote.steps[0]?.destinationToken.chainId,
            amountWei: preparedQuote.steps[0]?.originAmount?.toString(),
            walletAddress: wallet?.getAccount()?.address,
            walletType: wallet?.id
        });
        setExecutionState("executing");
        setError(undefined);
        const completedStatusResults = [];
        // Create new abort controller
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        try {
            if (flatTxs.length > 0 && !wallet) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                    code: "INVALID_INPUT",
                    message: "No wallet provided to execute transactions",
                    statusCode: 400
                });
            }
            // Execute onramp first if configured and not already completed
            if (preparedQuote.type === "onramp" && onrampStatus === "pending") {
                await executeOnramp(preparedQuote, completedStatusResults, abortController.signal);
            }
            if (flatTxs.length > 0) {
                // Then execute transactions
                if (!wallet) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                        code: "INVALID_INPUT",
                        message: "No wallet provided to execute transactions",
                        statusCode: 400
                    });
                }
                const account = wallet.getAccount();
                if (!account) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                        code: "INVALID_INPUT",
                        message: "Wallet not connected",
                        statusCode: 400
                    });
                }
                // Start from where we left off, or from the beginning
                const startIndex = currentTxIndex ?? 0;
                for(let i = startIndex; i < flatTxs.length; i++){
                    if (abortController.signal.aborted) {
                        break;
                    }
                    const currentTx = flatTxs[i];
                    if (!currentTx) {
                        continue; // Skip invalid index
                    }
                    setCurrentTxIndex(i);
                    const currentStepData = preparedQuote.steps[currentTx._stepIndex];
                    if (!currentStepData) {
                        throw new Error(`Invalid step index: ${currentTx._stepIndex}`);
                    }
                    // switch chain if needed
                    if (currentTx.chainId !== wallet.getChain()?.id) {
                        await wallet.switchChain((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(currentTx.chainId));
                    }
                    // Check if we can batch transactions
                    const canSendCalls = await supportsAtomic(account, currentTx.chainId) && i < flatTxs.length - 1; // Not the last transaction;
                    const canBatch = account.sendBatchTransaction !== undefined && i < flatTxs.length - 1; // Not the last transaction
                    if (canBatch || canSendCalls) {
                        // Find consecutive transactions on the same chain
                        const batchTxs = [
                            currentTx
                        ];
                        let j = i + 1;
                        while(j < flatTxs.length){
                            const nextTx = flatTxs[j];
                            if (!nextTx || nextTx.chainId !== currentTx.chainId) {
                                break;
                            }
                            batchTxs.push(nextTx);
                            j++;
                        }
                        // Execute batch if we have multiple transactions
                        if (batchTxs.length > 1) {
                            // prefer batching if supported
                            if (canBatch) {
                                await executeBatch(batchTxs, account, completedStatusResults, abortController.signal);
                            } else if (canSendCalls) {
                                await executeSendCalls(batchTxs, wallet, account, completedStatusResults, abortController.signal);
                            } else {
                                // should never happen
                                throw new Error("No supported execution mode found");
                            }
                            // Mark all batched transactions as completed
                            for (const tx of batchTxs){
                                setCompletedTxs((prev)=>new Set(prev).add(tx._index));
                            }
                            // Skip ahead
                            i = j - 1;
                            continue;
                        }
                    }
                    // Execute single transaction
                    await executeSingleTx(currentTx, account, completedStatusResults, abortController.signal);
                    // Mark transaction as completed
                    setCompletedTxs((prev)=>new Set(prev).add(currentTx._index));
                }
            }
            // All done - check if we actually completed everything
            if (!abortController.signal.aborted) {
                setCurrentTxIndex(undefined);
                // Call completion callback with all completed status results
                if (onComplete) {
                    onComplete(completedStatusResults);
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                    client,
                    event: `ub:ui:execution:success`,
                    toChainId: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken.chainId,
                    toToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken.address,
                    fromToken: preparedQuote.steps[0]?.originToken.address,
                    chainId: preparedQuote.steps[0]?.destinationToken.chainId,
                    amountWei: preparedQuote.steps[0]?.originAmount?.toString(),
                    walletAddress: wallet?.getAccount()?.address,
                    walletType: wallet?.id
                });
            }
        } catch (err) {
            console.error("Error executing payment", err);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                client,
                error: err instanceof Error ? err.message : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(err),
                event: `ub:ui:execution:error`,
                toChainId: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken.chainId,
                toToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken.address,
                fromToken: preparedQuote.steps[0]?.originToken.address,
                chainId: preparedQuote.steps[0]?.destinationToken.chainId,
                amountWei: preparedQuote.steps[0]?.originAmount?.toString(),
                walletAddress: wallet?.getAccount()?.address,
                walletType: wallet?.id
            });
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]) {
                setError(err);
            } else {
                setError(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                    code: "UNKNOWN_ERROR",
                    message: err?.message || "An unknown error occurred",
                    statusCode: 500
                }));
            }
        } finally{
            setExecutionState("idle");
            abortControllerRef.current = null;
        }
    }, [
        executionState,
        wallet,
        currentTxIndex,
        flatTxs,
        executeSingleTx,
        executeBatch,
        executeSendCalls,
        onrampStatus,
        executeOnramp,
        onComplete,
        preparedQuote,
        client
    ]);
    // Start execution
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (executionState === "idle") {
            execute();
        }
    }, [
        execute,
        executionState
    ]);
    // Cancel execution
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setExecutionState("idle");
        if (onrampStatus === "executing") {
            setOnrampStatus("pending");
        }
    }, [
        onrampStatus
    ]);
    // Retry from failed transaction
    const retry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (error) {
            setError(undefined);
            execute();
        }
    }, [
        error,
        execute
    ]);
    const hasInitialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (autoStart && executionState === "idle" && currentTxIndex === undefined && !hasInitialized.current) {
            hasInitialized.current = true;
            setExecutionState("auto-starting");
            // add a delay to ensure the UI is ready
            setTimeout(()=>{
                start();
            }, 500);
        }
    }, [
        autoStart,
        executionState,
        currentTxIndex,
        start
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);
    return {
        cancel,
        currentStep,
        currentTxIndex,
        error,
        executionState,
        onrampStatus,
        progress,
        retry,
        start,
        steps: preparedQuote?.steps
    };
}
// Cache for supportsAtomic results, keyed by `${accountAddress}_${chainId}`
const supportsAtomicCache = new Map();
async function supportsAtomic(account, chainId) {
    const cacheKey = `${account.address}_${chainId}`;
    const cached = supportsAtomicCache.get(cacheKey);
    if (cached !== undefined) {
        return cached;
    }
    const capabilitiesFn = account.getCapabilities;
    if (!capabilitiesFn) {
        supportsAtomicCache.set(cacheKey, false);
        return false;
    }
    try {
        // 5s max timeout for capabilities fetch
        const capabilities = await Promise.race([
            capabilitiesFn({
                chainId
            }),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error("Timeout")), 5000))
        ]);
        const atomic = capabilities[chainId]?.atomic;
        const result = atomic?.status === "supported" || atomic?.status === "ready";
        supportsAtomicCache.set(cacheKey, result);
        return result;
    } catch (error) {
        // Timeout or error fetching capabilities, assume not supported, but dont cache the result
        return false;
    }
} //# sourceMappingURL=useStepExecutor.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_react_core_00eec3a9._.js.map