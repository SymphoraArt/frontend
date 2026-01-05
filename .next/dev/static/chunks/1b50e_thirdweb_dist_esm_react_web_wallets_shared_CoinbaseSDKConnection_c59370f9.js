(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/wallets/shared/CoinbaseSDKConnection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$wallets$2f$shared$2f$ConnectingScreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/wallets/shared/ConnectingScreen.js [app-client] (ecmascript)");
;
;
;
/**
 * @internal
 */ function ExternalWalletConnectUI(props) {
    const { onBack, done, wallet, walletInfo, onGetStarted, locale } = props;
    const [errorConnecting, setErrorConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExternalWalletConnectUI.useCallback[connect]": ()=>{
            setErrorConnecting(false);
            wallet.connect({
                chain: props.chain,
                client: props.client
            }).then({
                "ExternalWalletConnectUI.useCallback[connect]": ()=>{
                    done();
                }
            }["ExternalWalletConnectUI.useCallback[connect]"]).catch({
                "ExternalWalletConnectUI.useCallback[connect]": (e)=>{
                    console.error(e);
                    setErrorConnecting(true);
                }
            }["ExternalWalletConnectUI.useCallback[connect]"]);
        }
    }["ExternalWalletConnectUI.useCallback[connect]"], [
        props.client,
        wallet,
        props.chain,
        done
    ]);
    const scanStarted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExternalWalletConnectUI.useEffect": ()=>{
            if (scanStarted.current) {
                return;
            }
            scanStarted.current = true;
            connect();
        }
    }["ExternalWalletConnectUI.useEffect"], [
        connect
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$wallets$2f$shared$2f$ConnectingScreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectingScreen"], {
        client: props.client,
        errorConnecting: errorConnecting,
        locale: {
            failed: locale.connectionScreen.failed,
            getStartedLink: locale.getStartedLink,
            inProgress: locale.connectionScreen.inProgress,
            instruction: locale.connectionScreen.instruction,
            tryAgain: locale.connectionScreen.retry
        },
        onBack: onBack,
        onGetStarted: onGetStarted,
        onRetry: connect,
        size: props.size,
        walletId: wallet.id,
        walletName: walletInfo.name
    });
}
const __TURBOPACK__default__export__ = ExternalWalletConnectUI;
 //# sourceMappingURL=CoinbaseSDKConnection.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_react_web_wallets_shared_CoinbaseSDKConnection_c59370f9.js.map