(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/ErrorBanner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBanner",
    ()=>ErrorBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/pay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useBridgeError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useBridgeError.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
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
function ErrorBanner({ error, onRetry, onCancel, client }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const { userMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useBridgeError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridgeError"])({
        error
    });
    const hasFiredErrorEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ErrorBanner.useEffect": ()=>{
            if (hasFiredErrorEvent.current) return;
            hasFiredErrorEvent.current = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                client,
                error: error.message,
                event: "ub:ui:error"
            });
        }
    }["ErrorBanner.useEffect"], [
        client,
        error.message
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        fullHeight: true,
        gap: "md",
        p: "md",
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            flex: "row",
            gap: "md",
            style: {
                alignItems: "flex-start"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    center: "both",
                    style: {
                        backgroundColor: theme.colors.tertiaryBg,
                        borderRadius: "50%",
                        flexShrink: 0,
                        height: "24px",
                        width: "24px"
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CrossCircledIcon"], {
                        color: theme.colors.danger,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].md,
                        width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].md
                    })
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "column",
                    fullHeight: true,
                    gap: "sm",
                    style: {
                        flex: 1
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            color: "primaryText",
                            size: "lg",
                            children: "Error"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "column",
                            gap: "sm",
                            style: {
                                minHeight: "100px"
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                flex: "column",
                                gap: "sm",
                                style: {
                                    flex: 1
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    color: "secondaryText",
                                    size: "sm",
                                    children: userMessage
                                })
                            })
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "row",
                            gap: "sm",
                            style: {
                                justifyContent: "flex-end"
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: onRetry,
                                    variant: "primary",
                                    children: "Try Again"
                                }),
                                onCancel && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: onCancel,
                                    variant: "secondary",
                                    children: "Cancel"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
} //# sourceMappingURL=ErrorBanner.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/active-wallet-details.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActiveWalletDetails",
    ()=>ActiveWalletDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$account$2f$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/account/provider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$wallet$2f$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/wallet/provider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Account$2f$avatar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/prebuilt/Account/avatar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Account$2f$blobbie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/prebuilt/Account/blobbie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Account$2f$name$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/prebuilt/Account/name.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Wallet$2f$icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/prebuilt/Wallet/icon.js [app-client] (ecmascript)");
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
function ActiveWalletDetails(props) {
    const wallet = props.activeWalletInfo.activeWallet;
    const account = props.activeWalletInfo.activeAccount;
    const accountBlobbie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Account$2f$blobbie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountBlobbie"], {
        style: {
            width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs}px`,
            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs}px`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
        }
    });
    const accountAvatarFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Wallet$2f$icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIcon"], {
        style: {
            width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs}px`,
            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs}px`
        },
        fallbackComponent: accountBlobbie,
        loadingComponent: accountBlobbie
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(WalletButton, {
        variant: "ghost-solid",
        style: {
            paddingInline: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xxs,
            paddingBlock: "2px"
        },
        onClick: props.onClick,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$account$2f$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountProvider"], {
            address: account.address,
            client: props.client,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$wallet$2f$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletProvider"], {
                id: wallet.id,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "row",
                    gap: "xxs",
                    center: "y",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Account$2f$avatar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountAvatar"], {
                            style: {
                                width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs}px`,
                                height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs}px`,
                                borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                                objectFit: "cover"
                            },
                            fallbackComponent: accountAvatarFallback,
                            loadingComponent: accountAvatarFallback
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].xs,
                                letterSpacing: "0.025em"
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$prebuilt$2f$Account$2f$name$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountName"], {
                                fallbackComponent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortenAddress"])(account.address)
                                }),
                                loadingComponent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortenAddress"])(account.address)
                                })
                            })
                        })
                    ]
                })
            })
        })
    });
}
const WalletButton = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"])(()=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return {
        color: theme.colors.secondaryText,
        transition: "color 200ms ease",
        "&:hover": {
            color: theme.colors.primaryText
        }
    };
}); //# sourceMappingURL=active-wallet-details.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/decimal-input.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecimalInput",
    ()=>DecimalInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$formElements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/formElements.js [app-client] (ecmascript)");
;
;
function DecimalInput(props) {
    const handleAmountChange = (inputValue)=>{
        let processedValue = inputValue;
        // Replace comma with period if it exists
        processedValue = processedValue.replace(",", ".");
        if (processedValue.startsWith(".")) {
            processedValue = `0${processedValue}`;
        }
        const numValue = Number(processedValue);
        if (Number.isNaN(numValue)) {
            return;
        }
        if (processedValue.length > 1 && processedValue.startsWith("0") && !processedValue.startsWith("0.")) {
            props.setValue(processedValue.slice(1));
        } else {
            props.setValue(processedValue);
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$formElements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
        ...props,
        inputMode: "decimal",
        onChange: (e)=>{
            handleAmountChange(e.target.value);
        },
        onClick: (e)=>{
            // put cursor at the end of the input
            if (props.value === "") {
                e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
            }
        },
        pattern: "^[0-9]*[.,]?[0-9]*$",
        placeholder: "0.0",
        type: "text",
        variant: "transparent"
    });
} //# sourceMappingURL=decimal-input.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanedChainName",
    ()=>cleanedChainName,
    "tokenAmountFormatter",
    ()=>tokenAmountFormatter
]);
function cleanedChainName(name) {
    return name.replace("Mainnet", "");
}
const tokenAmountFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 5,
    minimumFractionDigits: 2
}); //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/selected-token-button.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectedTokenButton",
    ()=>SelectedTokenButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Img.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Skeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/utils.js [app-client] (ecmascript)");
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
function SelectedTokenButton(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: "ghost-solid",
        hoverBg: "secondaryButtonBg",
        fullWidth: true,
        onClick: props.onSelectToken,
        gap: "sm",
        style: {
            borderBottom: `1px dashed ${theme.colors.borderColor}`,
            justifyContent: "space-between",
            paddingInline: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md,
            paddingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md,
            borderRadius: 0
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                gap: "sm",
                flex: "row",
                center: "y",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        relative: true,
                        color: "secondaryText",
                        children: [
                            props.selectedToken && !props.selectedToken.isError ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
                                src: props.selectedToken?.data === undefined ? undefined : props.selectedToken.data.iconUri || "",
                                client: props.client,
                                width: "40",
                                height: "40",
                                fallback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                    style: {
                                        background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                                        width: "40px",
                                        height: "40px"
                                    }
                                }),
                                style: {
                                    objectFit: "cover",
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                                }
                            }, props.selectedToken?.data?.iconUri) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                style: {
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                                    width: "40px",
                                    height: "40px"
                                }
                            }),
                            props.chain && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                bg: "modalBg",
                                style: {
                                    padding: "2px",
                                    position: "absolute",
                                    bottom: -2,
                                    right: -2,
                                    display: "flex",
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
                                    src: props.chain?.icon || "",
                                    client: props.client,
                                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                                    style: {
                                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                                    },
                                    fallback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        style: {
                                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                                            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                                            width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm}px`,
                                            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm}px`
                                        }
                                    })
                                })
                            })
                        ]
                    }),
                    props.selectedToken && !props.selectedToken.isError ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        style: {
                            gap: "3px"
                        },
                        children: [
                            props.selectedToken?.isFetching ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                width: "60px",
                                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "md",
                                color: "primaryText",
                                weight: 500,
                                children: props.selectedToken?.data?.symbol
                            }),
                            props.chain ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "xs",
                                color: "secondaryText",
                                style: {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanedChainName"])(props.chain.name)
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                width: "140px",
                                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].sm
                            })
                        ]
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        style: {
                            gap: "3px"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "md",
                                color: "primaryText",
                                weight: 500,
                                children: "Select Token"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "xs",
                                color: "secondaryText",
                                children: "Required"
                            })
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                color: "secondaryText",
                flex: "row",
                center: "both",
                borderColor: "borderColor",
                style: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                    borderWidth: 1,
                    borderStyle: "solid",
                    padding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm
                })
            })
        ]
    });
} //# sourceMappingURL=selected-token-button.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/token-balance.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTokenBalance",
    ()=>useTokenBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useWalletBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useWalletBalance.js [app-client] (ecmascript)");
;
;
;
;
function useTokenBalance(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useWalletBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletBalance"])({
        address: props.walletAddress,
        chain: props.chainId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(props.chainId) : undefined,
        client: props.client,
        tokenAddress: props.tokenAddress ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(props.tokenAddress) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"]) ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(props.tokenAddress) : undefined
    });
} //# sourceMappingURL=token-balance.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/token-query.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTokenQuery",
    ()=>useTokenQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/get-token.js [app-client] (ecmascript)");
;
;
;
function useTokenQuery(params) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: !!params.chainId,
        queryFn: {
            "useTokenQuery.useQuery": async ()=>{
                if (!params.chainId) {
                    throw new Error("Chain ID is required");
                }
                const tokenAddress = params.tokenAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"];
                const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])(params.client, tokenAddress, params.chainId).catch({
                    "useTokenQuery.useQuery": (err)=>{
                        err.message.includes("not supported") ? undefined : Promise.reject(err);
                    }
                }["useTokenQuery.useQuery"]);
                if (!token) {
                    return {
                        type: "unsupported_token"
                    };
                }
                return {
                    token: token,
                    type: "success"
                };
            }
        }["useTokenQuery.useQuery"],
        queryKey: [
            "bridge.getToken",
            params
        ],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
    });
} //# sourceMappingURL=token-query.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/WithHeader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WithHeader",
    ()=>WithHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ipfs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function WithHeader(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        children: [
            props.image && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tw-header-image",
                style: {
                    aspectRatio: "16/9",
                    backgroundColor: theme.colors.tertiaryBg,
                    backgroundImage: `url(${getUrl(props.client, props.image)})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md} 0 0`,
                    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xxs,
                    overflow: "hidden",
                    width: "100%"
                }
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                px: "md",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "md"
                    }),
                    (props.title || props.description) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            props.title && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                color: "primaryText",
                                size: "lg",
                                weight: 500,
                                trackingTight: true,
                                children: props.title
                            }),
                            props.description && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                                        y: "xxs"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        color: "secondaryText",
                                        size: "sm",
                                        multiline: true,
                                        children: props.description
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                                y: "md"
                            })
                        ]
                    }),
                    props.children
                ]
            })
        ]
    });
}
function getUrl(client, uri) {
    if (!uri.startsWith("ipfs://")) {
        return uri;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveScheme"])({
        client,
        uri
    });
} //# sourceMappingURL=WithHeader.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/hooks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveWalletInfo",
    ()=>useActiveWalletInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWalletChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWalletChain.js [app-client] (ecmascript)");
;
;
;
;
function useActiveWalletInfo(activeWalletOverride) {
    const activeAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveAccount"])();
    const activeWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveWallet"])();
    const activeChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWalletChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveWalletChain"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useActiveWalletInfo.useMemo": ()=>{
            const wallet = activeWalletOverride || activeWallet;
            const chain = activeWalletOverride?.getChain() || activeChain;
            const account = activeWalletOverride?.getAccount() || activeAccount;
            return wallet && chain && account ? {
                activeChain: chain,
                activeWallet: wallet,
                activeAccount: account
            } : undefined;
        }
    }["useActiveWalletInfo.useMemo"], [
        activeAccount,
        activeWallet,
        activeChain,
        activeWalletOverride
    ]);
} //# sourceMappingURL=hooks.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/SearchInput.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchInput",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$formElements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/formElements.js [app-client] (ecmascript)");
;
;
;
;
;
function SearchInput(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: {
            position: "relative"
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                color: "secondaryText",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MagnifyingGlassIcon"], {
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].md,
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].md,
                    style: {
                        position: "absolute",
                        left: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
                        top: "50%",
                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg,
                        transform: "translateY(-50%)"
                    }
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$formElements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                variant: "outline",
                placeholder: props.placeholder,
                value: props.value,
                sm: true,
                style: {
                    paddingLeft: "44px"
                },
                onChange: (e)=>props.onChange(e.target.value),
                autoFocus: props.autoFocus
            })
        ]
    });
} //# sourceMappingURL=SearchInput.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/SelectChainButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectChainButton",
    ()=>SelectChainButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Img.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
function SelectChainButton(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: "outline",
        bg: "tertiaryBg",
        fullWidth: true,
        style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md,
            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm}`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg,
            minHeight: "48px"
        },
        gap: "sm",
        onClick: props.onClick,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
                src: props.selectedChain.icon,
                client: props.client,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                children: [
                    " ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanedChainName"])(props.selectedChain.name),
                    " "
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                style: {
                    marginLeft: "auto"
                }
            })
        ]
    });
} //# sourceMappingURL=SelectChainButton.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/use-bridge-chains.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBridgeChains",
    ()=>useBridgeChains
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Chains.js [app-client] (ecmascript)");
;
;
function useBridgeChains(client) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "bridge-chains"
        ],
        queryFn: {
            "useBridgeChains.useQuery": ()=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chains"])({
                    client
                });
            }
        }["useBridgeChains.useQuery"],
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
} //# sourceMappingURL=use-bridge-chains.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/select-chain.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectBridgeChain",
    ()=>SelectBridgeChain,
    "SelectBridgeChainUI",
    ()=>SelectBridgeChainUI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Img.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Skeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$SearchInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/SearchInput.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$bridge$2d$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/use-bridge-chains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/utils.js [app-client] (ecmascript)");
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
function SelectBridgeChain(props) {
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$bridge$2d$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridgeChains"])(props.client);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectBridgeChainUI, {
        ...props,
        isPending: chainQuery.isPending,
        onSelectChain: props.onSelectChain,
        chains: chainQuery.data ?? []
    });
}
function SelectBridgeChainUI(props) {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [initiallySelectedChain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(props.selectedChain);
    // put the initially selected chain first
    const sortedChains = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SelectBridgeChainUI.useMemo[sortedChains]": ()=>{
            if (initiallySelectedChain) {
                return [
                    initiallySelectedChain,
                    ...props.chains.filter({
                        "SelectBridgeChainUI.useMemo[sortedChains]": (chain)=>chain.chainId !== initiallySelectedChain.chainId
                    }["SelectBridgeChainUI.useMemo[sortedChains]"])
                ];
            }
            return props.chains;
        }
    }["SelectBridgeChainUI.useMemo[sortedChains]"], [
        props.chains,
        initiallySelectedChain
    ]);
    const filteredChains = sortedChains.filter((chain)=>{
        return chain.name.toLowerCase().includes(search.toLowerCase());
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        fullHeight: true,
        flex: "column",
        children: [
            props.isMobile && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        px: "md",
                        py: "md+",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalHeader"], {
                            onBack: props.onBack,
                            title: "Select Chain"
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {})
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                px: "md",
                style: {
                    paddingBottom: 0
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$SearchInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                    value: search,
                    onChange: setSearch,
                    placeholder: "Search Chain"
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "sm"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                expand: true,
                px: "md",
                gap: props.isMobile ? undefined : "xxs",
                flex: "column",
                style: {
                    maxHeight: props.isMobile ? "400px" : "none",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    paddingBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md
                },
                children: [
                    filteredChains.map((chain)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ChainButton, {
                            chain: chain,
                            client: props.client,
                            onClick: ()=>props.onSelectChain(chain),
                            isSelected: chain.chainId === props.selectedChain?.chainId,
                            isMobile: props.isMobile
                        }, chain.chainId)),
                    props.isPending && new Array(20).fill(0).map(()=>// biome-ignore lint/correctness/useJsxKeyInIterable: ok
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ChainButtonSkeleton, {})),
                    filteredChains.length === 0 && !props.isPending && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            color: "secondaryText",
                            size: "md",
                            center: true,
                            multiline: true,
                            children: [
                                "No chains found for \"",
                                search,
                                "\""
                            ]
                        })
                    })
                ]
            })
        ]
    });
}
function ChainButtonSkeleton() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm}`
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`,
                width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md,
                width: "160px"
            })
        ]
    });
}
function ChainButton(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const iconSizeValue = props.isMobile ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].md;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: props.isSelected ? "secondary" : "ghost-solid",
        fullWidth: true,
        style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: props.isMobile ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].sm,
            border: "1px solid transparent",
            padding: !props.isMobile ? `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs}` : undefined
        },
        onClick: props.onClick,
        gap: "sm",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
                src: props.chain.icon || "",
                client: props.client,
                width: iconSizeValue,
                height: iconSizeValue,
                style: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                },
                fallback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    color: "secondaryText",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        style: {
                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                            width: `${iconSizeValue}px`,
                            height: `${iconSizeValue}px`
                        }
                    })
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanedChainName"])(props.chain.name)
        ]
    });
} //# sourceMappingURL=select-chain.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/use-tokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTokenBalances",
    ()=>useTokenBalances,
    "useTokens",
    ()=>useTokens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
;
;
;
;
;
function useTokens(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "tokens",
            options
        ],
        enabled: !!options.chainId,
        retry: false,
        queryFn: {
            "useTokens.useQuery": ()=>{
                if (!options.chainId) {
                    throw new Error("Chain ID is required");
                }
                const isSearchAddress = options.search ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(options.search) : false;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokens"])({
                    chainId: options.chainId,
                    client: options.client,
                    offset: options.offset,
                    limit: options.limit,
                    includePrices: false,
                    query: options.search && !isSearchAddress ? options.search : undefined,
                    tokenAddress: options.search && isSearchAddress ? options.search : undefined
                });
            }
        }["useTokens.useQuery"]
    });
}
function useTokenBalances(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "bridge/v1/wallets",
            options
        ],
        enabled: !!options.chainId && !!options.walletAddress,
        queryFn: {
            "useTokenBalances.useQuery": async ()=>{
                if (!options.chainId || !options.walletAddress) {
                    throw new Error("invalid options");
                }
                const baseUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge");
                const isDev = baseUrl.includes("thirdweb-dev");
                const url = new URL(`https://api.${isDev ? "thirdweb-dev" : "thirdweb"}.com/v1/wallets/${options.walletAddress}/tokens`);
                url.searchParams.set("chainId", options.chainId.toString());
                url.searchParams.set("limit", options.limit.toString());
                url.searchParams.set("page", options.page.toString());
                url.searchParams.set("metadata", "true");
                url.searchParams.set("resolveMetadataLinks", "true");
                url.searchParams.set("includeSpam", "false");
                url.searchParams.set("includeNative", "true");
                url.searchParams.set("sortBy", "usd_value");
                url.searchParams.set("sortOrder", "desc");
                url.searchParams.set("includeWithoutPrice", "false"); // filter out tokens with no price
                const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(options.client);
                const response = await clientFetch(url.toString());
                if (!response.ok) {
                    throw new Error(`Failed to fetch token balances: ${response.statusText}`);
                }
                const json = await response.json();
                return json.result;
            }
        }["useTokenBalances.useQuery"],
        refetchOnMount: "always"
    });
} //# sourceMappingURL=use-tokens.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/select-token-ui.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectToken",
    ()=>SelectToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$CoinsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/icons/CoinsIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$WalletDotIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/icons/WalletDotIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Img.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Skeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$design$2d$system$2f$elements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/design-system/elements.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$hooks$2f$useDebouncedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/hooks/useDebouncedValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$hooks$2f$useisMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/hooks/useisMobile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$SearchInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/SearchInput.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$SelectChainButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/SelectChainButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$select$2d$chain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/select-chain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$bridge$2d$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/use-bridge-chains.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/use-tokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/utils.js [app-client] (ecmascript)");
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
function findChain(chains, activeChainId) {
    if (!activeChainId) {
        return undefined;
    }
    return chains.find((chain)=>chain.chainId === activeChainId);
}
const INITIAL_LIMIT = 100;
function SelectToken(props) {
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$bridge$2d$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridgeChains"])(props.client);
    const [search, _setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const debouncedSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$hooks$2f$useDebouncedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebouncedValue"])(search, 500);
    const [limit, setLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_LIMIT);
    const setSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SelectToken.useCallback[setSearch]": (search)=>{
            _setSearch(search);
            setLimit(INITIAL_LIMIT);
        }
    }["SelectToken.useCallback[setSearch]"], []);
    const [_selectedChain, setSelectedChain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const selectedChain = _selectedChain || (chainQuery.data ? findChain(chainQuery.data, props.selectedToken?.chainId) || findChain(chainQuery.data, props.activeWalletInfo?.activeChain.id) || findChain(chainQuery.data, 1) : undefined);
    // all tokens
    const tokensQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTokens"])({
        client: props.client,
        chainId: selectedChain?.chainId,
        search: debouncedSearch,
        limit,
        offset: 0
    });
    // owned tokens
    const ownedTokensQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTokenBalances"])({
        client: props.client,
        chainId: selectedChain?.chainId,
        limit,
        page: 1,
        walletAddress: props.activeWalletInfo?.activeAccount.address
    });
    const filteredOwnedTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SelectToken.useMemo[filteredOwnedTokens]": ()=>{
            return ownedTokensQuery.data?.tokens?.filter({
                "SelectToken.useMemo[filteredOwnedTokens]": (token)=>{
                    return token.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()) || token.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || token.token_address.toLowerCase().includes(debouncedSearch.toLowerCase());
                }
            }["SelectToken.useMemo[filteredOwnedTokens]"]);
        }
    }["SelectToken.useMemo[filteredOwnedTokens]"], [
        ownedTokensQuery.data?.tokens,
        debouncedSearch
    ]);
    const isFetching = tokensQuery.isFetching || ownedTokensQuery.isFetching;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SelectTokenUI, {
        ...props,
        ownedTokens: filteredOwnedTokens || [],
        allTokens: tokensQuery.data || [],
        isFetching: isFetching,
        selectedChain: selectedChain,
        setSelectedChain: setSelectedChain,
        search: search,
        setSearch: setSearch,
        selectedToken: props.selectedToken,
        setSelectedToken: props.setSelectedToken,
        showMore: tokensQuery.data?.length === limit ? ()=>{
            setLimit(limit + INITIAL_LIMIT);
        } : undefined
    });
}
function SelectTokenUI(props) {
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$hooks$2f$useisMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [screen, setScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("select-token");
    // show tokens with icons first
    const sortedOwnedTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SelectTokenUI.useMemo[sortedOwnedTokens]": ()=>{
            return props.ownedTokens.sort({
                "SelectTokenUI.useMemo[sortedOwnedTokens]": (a, b)=>{
                    if (a.icon_uri && !b.icon_uri) {
                        return -1;
                    }
                    if (!a.icon_uri && b.icon_uri) {
                        return 1;
                    }
                    return 0;
                }
            }["SelectTokenUI.useMemo[sortedOwnedTokens]"]);
        }
    }["SelectTokenUI.useMemo[sortedOwnedTokens]"], [
        props.ownedTokens
    ]);
    const otherTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SelectTokenUI.useMemo[otherTokens]": ()=>{
            const ownedTokenSet = new Set(sortedOwnedTokens.map({
                "SelectTokenUI.useMemo[otherTokens]": (t)=>`${t.token_address}-${t.chain_id}`.toLowerCase()
            }["SelectTokenUI.useMemo[otherTokens]"]));
            return props.allTokens.filter({
                "SelectTokenUI.useMemo[otherTokens]": (token)=>!ownedTokenSet.has(`${token.address}-${token.chainId}`.toLowerCase())
            }["SelectTokenUI.useMemo[otherTokens]"]);
        }
    }["SelectTokenUI.useMemo[otherTokens]"], [
        props.allTokens,
        sortedOwnedTokens
    ]);
    // show tokens with icons first
    const sortedOtherTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SelectTokenUI.useMemo[sortedOtherTokens]": ()=>{
            return otherTokens.sort({
                "SelectTokenUI.useMemo[sortedOtherTokens]": (a, b)=>{
                    if (a.iconUri && !b.iconUri) {
                        return -1;
                    }
                    if (!a.iconUri && b.iconUri) {
                        return 1;
                    }
                    return 0;
                }
            }["SelectTokenUI.useMemo[sortedOtherTokens]"]);
        }
    }["SelectTokenUI.useMemo[sortedOtherTokens]"], [
        otherTokens
    ]);
    // desktop
    if (!isMobile) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            style: {
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                height: "100%"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LeftContainer, {
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$select$2d$chain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectBridgeChain"], {
                        onBack: ()=>setScreen("select-token"),
                        client: props.client,
                        isMobile: false,
                        onSelectChain: (chain)=>{
                            props.setSelectedChain(chain);
                            setScreen("select-token");
                        },
                        selectedChain: props.selectedChain
                    })
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "column",
                    relative: true,
                    scrollY: true,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenSelectionScreen, {
                        onSelectToken: (token)=>{
                            props.setSelectedToken(token);
                            props.onClose();
                        },
                        isMobile: false,
                        selectedToken: props.selectedToken,
                        isFetching: props.isFetching,
                        ownedTokens: props.ownedTokens,
                        otherTokens: sortedOtherTokens,
                        showMore: props.showMore,
                        selectedChain: props.selectedChain,
                        onSelectChain: ()=>setScreen("select-chain"),
                        client: props.client,
                        search: props.search,
                        setSearch: props.setSearch
                    })
                })
            ]
        });
    }
    if (screen === "select-token") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenSelectionScreen, {
            onSelectToken: (token)=>{
                props.setSelectedToken(token);
                props.onClose();
            },
            selectedToken: props.selectedToken,
            isFetching: props.isFetching,
            ownedTokens: props.ownedTokens,
            otherTokens: sortedOtherTokens,
            showMore: props.showMore,
            selectedChain: props.selectedChain,
            isMobile: true,
            onSelectChain: ()=>setScreen("select-chain"),
            client: props.client,
            search: props.search,
            setSearch: props.setSearch
        });
    }
    if (screen === "select-chain") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$select$2d$chain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectBridgeChain"], {
            isMobile: true,
            onBack: ()=>setScreen("select-token"),
            client: props.client,
            onSelectChain: (chain)=>{
                props.setSelectedChain(chain);
                setScreen("select-token");
            },
            selectedChain: props.selectedChain
        });
    }
    return null;
}
function TokenButtonSkeleton() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs}`,
            height: "70px"
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`,
                width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].sm,
                        width: "100px"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md,
                        width: "200px"
                    })
                ]
            })
        ]
    });
}
function TokenButton(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const tokenBalanceInUnits = "balance" in props.token ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTokens"])(BigInt(props.token.balance), props.token.decimals) : undefined;
    const usdValue = "balance" in props.token ? props.token.price_data.price_usd * Number(tokenBalanceInUnits) : undefined;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: props.isSelected ? "secondary" : "ghost-solid",
        fullWidth: true,
        style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md,
            border: "1px solid transparent",
            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs}`,
            textAlign: "left",
            lineHeight: "1.5",
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg
        },
        gap: "sm",
        onClick: async ()=>{
            if ("balance" in props.token) {
                props.onSelect({
                    tokenAddress: props.token.token_address,
                    chainId: props.token.chain_id
                });
            } else {
                props.onSelect({
                    tokenAddress: props.token.address,
                    chainId: props.token.chainId
                });
            }
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
                src: ("balance" in props.token ? props.token.icon_uri : props.token.iconUri) || "",
                client: props.client,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg,
                style: {
                    flexShrink: 0,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                },
                fallback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    color: "secondaryText",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        style: {
                            background: `linear-gradient(45deg, white, ${theme.colors.accentText})`,
                            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                            width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`,
                            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`
                        }
                    })
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"]["3xs"],
                    flex: 1
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        style: {
                            justifyContent: "space-between",
                            width: "100%"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "md",
                                color: "primaryText",
                                weight: 500,
                                children: props.token.symbol
                            }),
                            "balance" in props.token && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "md",
                                color: "primaryText",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenAmountFormatter"].format(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTokens"])(BigInt(props.token.balance), props.token.decimals)))
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        style: {
                            justifyContent: "space-between",
                            width: "100%"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "xs",
                                color: "secondaryText",
                                style: {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: "200px"
                                },
                                children: props.token.name
                            }),
                            usdValue && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                flex: "row",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    size: "xs",
                                    color: "secondaryText",
                                    weight: 400,
                                    children: [
                                        "$",
                                        usdValue.toFixed(2)
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function TokenSelectionScreen(props) {
    const noTokensFound = !props.isFetching && props.otherTokens.length === 0 && props.ownedTokens.length === 0;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        fullHeight: true,
        flex: "column",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                px: "md",
                pt: "md+",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        size: "lg",
                        weight: 600,
                        color: "primaryText",
                        trackingTight: true,
                        children: "Select Token"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "3xs"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        size: "sm",
                        color: "secondaryText",
                        multiline: true,
                        style: {
                            textWrap: "pretty"
                        },
                        children: "Select a token from the list or use the search"
                    })
                ]
            }),
            !props.selectedChain && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "300px"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                    color: "secondaryText",
                    size: "xl"
                })
            }),
            props.selectedChain && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    props.isMobile ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        p: "md",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$SelectChainButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectChainButton"], {
                            onClick: props.onSelectChain,
                            selectedChain: props.selectedChain,
                            client: props.client
                        })
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "md"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        px: "md",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$SearchInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                            value: props.search,
                            onChange: props.setSearch,
                            placeholder: "Search by token or address",
                            autoFocus: !props.isMobile
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "xs"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        pb: "md",
                        px: "md",
                        expand: true,
                        gap: "xxs",
                        flex: "column",
                        style: {
                            minHeight: "300px",
                            maxHeight: props.isMobile ? "450px" : "none",
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            paddingBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md
                        },
                        children: [
                            props.isFetching && new Array(20).fill(0).map((_, i)=>// biome-ignore lint/suspicious/noArrayIndexKey: ok
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenButtonSkeleton, {}, i)),
                            !props.isFetching && props.ownedTokens.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                px: "xs",
                                py: "xs",
                                flex: "row",
                                gap: "xs",
                                center: "y",
                                color: "secondaryText",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$WalletDotIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletDotIcon"], {
                                        size: "14"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        size: "sm",
                                        color: "secondaryText",
                                        style: {
                                            overflow: "unset"
                                        },
                                        children: "Your Tokens"
                                    })
                                ]
                            }),
                            !props.isFetching && props.ownedTokens.map((token)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenButton, {
                                    token: token,
                                    client: props.client,
                                    onSelect: props.onSelectToken,
                                    isSelected: !!props.selectedToken && props.selectedToken.tokenAddress.toLowerCase() === token.token_address.toLowerCase() && token.chain_id === props.selectedToken.chainId
                                }, token.token_address)),
                            !props.isFetching && props.ownedTokens.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                px: "xs",
                                py: "xs",
                                flex: "row",
                                gap: "xs",
                                center: "y",
                                color: "secondaryText",
                                style: {
                                    marginTop: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$CoinsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoinsIcon"], {
                                        size: "14"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        size: "sm",
                                        color: "secondaryText",
                                        style: {
                                            overflow: "unset"
                                        },
                                        children: "Other Tokens"
                                    })
                                ]
                            }),
                            !props.isFetching && props.otherTokens.map((token)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenButton, {
                                    token: token,
                                    client: props.client,
                                    onSelect: props.onSelectToken,
                                    isSelected: !!props.selectedToken && props.selectedToken.tokenAddress.toLowerCase() === token.address.toLowerCase() && token.chainId === props.selectedToken.chainId
                                }, token.address)),
                            props.showMore && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                fullWidth: true,
                                onClick: ()=>{
                                    props.showMore?.();
                                },
                                children: "Load More"
                            }),
                            noTokensFound && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    size: "sm",
                                    color: "secondaryText",
                                    children: "No Tokens Found"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
const LeftContainer = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$design$2d$system$2f$elements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StyledDiv"])((_)=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noScrollBar"],
        borderRight: `1px solid ${theme.colors.separatorLine}`,
        position: "relative"
    };
}); //# sourceMappingURL=select-token-ui.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/FundWallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FundWallet",
    ()=>FundWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$ConnectButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/ConnectButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$Details$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/Details.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$WalletDotIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/icons/WalletDotIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$locale$2f$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/locale/en.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$PoweredByTW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/PoweredByTW.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/formatTokenBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$CopyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/CopyIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Modal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Skeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$hooks$2f$useisMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/hooks/useisMobile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$active$2d$wallet$2d$details$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/active-wallet-details.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$decimal$2d$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/decimal-input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$selected$2d$token$2d$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/selected-token-button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$token$2d$balance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/token-balance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$token$2d$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/token-query.js [app-client] (ecmascript)");
// import { TokenAndChain } from "./common/TokenAndChain.js";
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$WithHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/WithHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$select$2d$token$2d$ui$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/select-token-ui.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$bridge$2d$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/swap-widget/use-bridge-chains.js [app-client] (ecmascript)");
/** biome-ignore-all lint/a11y/useSemanticElements: FIXME */ "use client";
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
function FundWallet(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const activeWalletInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveWalletInfo"])();
    const receiver = props.receiverAddress ?? activeWalletInfo?.activeAccount?.address;
    const [detailsModalOpen, setDetailsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTokenSelectionOpen, setIsTokenSelectionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isReceiverDifferentFromActiveWallet = props.receiverAddress && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(props.receiverAddress) && (activeWalletInfo?.activeAccount?.address ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(props.receiverAddress) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(activeWalletInfo?.activeAccount?.address) : true);
    const tokenQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$token$2d$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTokenQuery"])({
        tokenAddress: props.selectedToken?.tokenAddress,
        chainId: props.selectedToken?.chainId,
        client: props.client
    });
    const destinationToken = tokenQuery.data?.type === "success" ? tokenQuery.data.token : undefined;
    const tokenBalanceQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$token$2d$balance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTokenBalance"])({
        chainId: props.selectedToken?.chainId,
        tokenAddress: props.selectedToken?.tokenAddress,
        client: props.client,
        walletAddress: activeWalletInfo?.activeAccount?.address
    });
    const actionLabel = isReceiverDifferentFromActiveWallet ? "Pay" : "Buy";
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$hooks$2f$useisMobile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    // if no receiver address is set - wallet must be connected because the user's wallet is the receiver
    const showConnectButton = !props.receiverAddress && !activeWalletInfo;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$WithHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WithHeader"], {
        client: props.client,
        title: props.metadata.title,
        description: props.metadata.description,
        image: props.metadata.image,
        children: [
            detailsModalOpen && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$Details$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailsModal"], {
                client: props.client,
                locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$locale$2f$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                detailsModal: {
                    hideBuyFunds: true
                },
                theme: props.theme,
                closeModal: ()=>{
                    setDetailsModalOpen(false);
                },
                onDisconnect: ()=>{
                    props.onDisconnect?.();
                },
                chains: [],
                connectOptions: props.connectOptions
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Modal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                hide: false,
                className: "tw-modal__buy-widget",
                size: isMobile ? "compact" : "wide",
                title: "Select Token",
                open: isTokenSelectionOpen,
                crossContainerStyles: {
                    right: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md,
                    top: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"]["md+"],
                    transform: "none"
                },
                setOpen: (v)=>setIsTokenSelectionOpen(v),
                autoFocusCrossIcon: false,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$select$2d$token$2d$ui$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectToken"], {
                    activeWalletInfo: activeWalletInfo,
                    onClose: ()=>setIsTokenSelectionOpen(false),
                    client: props.client,
                    selectedToken: props.selectedToken,
                    setSelectedToken: (token)=>{
                        props.setSelectedToken(token);
                        setIsTokenSelectionOpen(false);
                    }
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenSection, {
                        title: actionLabel,
                        presetOptions: props.presetOptions,
                        amountSelection: props.amountSelection,
                        setAmount: props.setAmountSelection,
                        activeWalletInfo: activeWalletInfo,
                        selectedToken: props.selectedToken ? {
                            data: tokenQuery.data?.type === "success" ? tokenQuery.data.token : undefined,
                            isFetching: tokenQuery.isFetching,
                            isError: tokenQuery.isError || tokenQuery.data?.type === "unsupported_token"
                        } : undefined,
                        balance: {
                            data: tokenBalanceQuery.data,
                            isFetching: tokenBalanceQuery.isFetching
                        },
                        client: props.client,
                        isConnected: !!activeWalletInfo,
                        onSelectToken: ()=>{
                            setIsTokenSelectionOpen(true);
                        },
                        onWalletClick: ()=>{
                            setDetailsModalOpen(true);
                        },
                        currency: props.currency
                    }),
                    receiver && isReceiverDifferentFromActiveWallet && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ArrowSection, {}),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ReceiverWalletSection, {
                                address: receiver,
                                client: props.client
                            })
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md"
            }),
            (tokenQuery.isError || tokenQuery.data?.type === "unsupported_token") && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                    padding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs,
                    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    size: "sm",
                    color: "danger",
                    center: true,
                    children: "Failed to fetch token details"
                })
            }),
            showConnectButton ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$ConnectButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectButton"], {
                client: props.client,
                connectButton: {
                    label: props.buttonLabel || actionLabel,
                    style: {
                        width: "100%",
                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                    }
                },
                theme: theme,
                ...props.connectOptions,
                autoConnect: false
            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                disabled: !receiver,
                fullWidth: true,
                onClick: ()=>{
                    if (!receiver || !destinationToken) {
                        return;
                    }
                    const fiatPricePerToken = destinationToken.prices[props.currency];
                    const { tokenValue } = getAmounts(props.amountSelection, fiatPricePerToken);
                    if (!tokenValue) {
                        return;
                    }
                    props.onContinue(String(tokenValue), destinationToken, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(receiver));
                },
                style: {
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                },
                variant: "primary",
                children: props.buttonLabel || actionLabel
            }),
            props.showThirdwebBranding ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "md"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$PoweredByTW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoweredByThirdweb"], {
                        link: "https://playground.thirdweb.com/payments/fund-wallet"
                    })
                ]
            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "xxs"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md"
            })
        ]
    });
}
function getAmounts(amountSelection, fiatPricePerToken) {
    const fiatValue = amountSelection.type === "usd" ? amountSelection.value : fiatPricePerToken ? fiatPricePerToken * Number(amountSelection.value) : undefined;
    const tokenValue = amountSelection.type === "token" ? amountSelection.value : fiatPricePerToken ? Number(amountSelection.value) / fiatPricePerToken : undefined;
    return {
        fiatValue,
        tokenValue
    };
}
function TokenSection(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const chainQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$swap$2d$widget$2f$use$2d$bridge$2d$chains$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridgeChains"])(props.client);
    const chain = chainQuery.data?.find((chain)=>chain.chainId === props.selectedToken?.data?.chainId);
    const fiatPricePerToken = props.selectedToken?.data?.prices[props.currency];
    const { fiatValue, tokenValue } = getAmounts(props.amountSelection, fiatPricePerToken);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(SectionContainer, {
        header: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "row",
                    center: "y",
                    gap: "3xs",
                    color: "secondaryText",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        size: "xs",
                        color: "primaryText",
                        style: {
                            letterSpacing: "0.07em",
                            textTransform: "uppercase"
                        },
                        children: props.title
                    })
                }),
                props.activeWalletInfo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$active$2d$wallet$2d$details$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActiveWalletDetails"], {
                    activeWalletInfo: props.activeWalletInfo,
                    client: props.client,
                    onClick: props.onWalletClick
                })
            ]
        }),
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$selected$2d$token$2d$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectedTokenButton"], {
                selectedToken: props.selectedToken,
                client: props.client,
                onSelectToken: props.onSelectToken,
                chain: chain
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                px: "md",
                py: "md",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$decimal$2d$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecimalInput"], {
                        value: tokenValue ? String(tokenValue) : "",
                        setValue: (value)=>{
                            props.setAmount({
                                type: "token",
                                value
                            });
                        },
                        style: {
                            border: "none",
                            boxShadow: "none",
                            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].xl,
                            fontWeight: 500,
                            paddingInline: 0,
                            paddingBlock: 0,
                            letterSpacing: "-0.025em"
                        }
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "xs"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "2px"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                size: "md",
                                color: "secondaryText",
                                style: {
                                    flexShrink: 0
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFiatSymbol"])(props.currency)
                            }),
                            props.selectedToken?.isFetching ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                width: "120px",
                                height: "20px",
                                style: {
                                    transform: "translateX(4px)"
                                }
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$decimal$2d$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecimalInput"], {
                                value: String(fiatValue || 0),
                                setValue: (value)=>{
                                    props.setAmount({
                                        type: "usd",
                                        value
                                    });
                                },
                                style: {
                                    border: "none",
                                    boxShadow: "none",
                                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].md,
                                    fontWeight: 400,
                                    color: theme.colors.secondaryText,
                                    paddingInline: 0,
                                    height: "20px",
                                    paddingBlock: 0
                                }
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "md"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        gap: "xxs",
                        children: props.presetOptions.map((amount)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: !props.selectedToken?.data,
                                onClick: ()=>props.setAmount({
                                        type: "usd",
                                        value: String(amount)
                                    }),
                                style: {
                                    backgroundColor: "transparent",
                                    color: theme.colors.secondaryText,
                                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].xs,
                                    fontWeight: 400,
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                                    gap: "0.5px",
                                    padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xxs} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm}`
                                },
                                variant: "outline",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFiatSymbol"])(props.currency)
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        children: amount
                                    })
                                ]
                            }, amount))
                    })
                ]
            }),
            props.isConnected && props.selectedToken && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                px: "md",
                py: "md",
                style: {
                    borderTop: `1px dashed ${theme.colors.borderColor}`,
                    justifyContent: "start"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "3px"
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            size: "xs",
                            color: "secondaryText",
                            children: "Current Balance"
                        }),
                        props.balance.data === undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontSize"].xs,
                            width: "100px"
                        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            size: "xs",
                            color: "primaryText",
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(props.balance.data.value, props.balance.data.decimals, 5),
                                " ",
                                props.balance.data.symbol
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
function ReceiverWalletSection(props) {
    const ensNameQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnsName"])({
        address: props.address,
        client: props.client
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SectionContainer, {
        header: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
            size: "xs",
            color: "primaryText",
            style: {
                letterSpacing: "0.07em",
                textTransform: "uppercase"
            },
            children: "To"
        }),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            px: "md",
            py: "md",
            flex: "row",
            center: "y",
            gap: "xs",
            color: "secondaryText",
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$WalletDotIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletDotIcon"], {
                    size: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs,
                    color: "secondaryText"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    size: "sm",
                    color: "primaryText",
                    children: ensNameQuery.data || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortenAddress"])(props.address)
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$CopyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                    text: props.address,
                    tip: "Copy address",
                    iconSize: 14
                })
            ]
        })
    });
}
function SectionContainer(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        style: {
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].xl,
            borderWidth: 1,
            borderStyle: "solid",
            position: "relative",
            overflow: "hidden"
        },
        borderColor: "borderColor",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                bg: "tertiaryBg",
                style: {
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    zIndex: 0
                }
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    px: "md",
                    py: "sm",
                    relative: true,
                    children: props.header
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                bg: "tertiaryBg",
                style: {
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].xl,
                    borderTop: `1px solid ${theme.colors.borderColor}`
                },
                children: props.children
            })
        ]
    });
}
function ArrowSection() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            display: "flex",
            justifyContent: "center",
            marginBlock: `-13px`,
            zIndex: 2,
            position: "relative"
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            p: "xs",
            center: "both",
            flex: "row",
            color: "primaryText",
            bg: "modalBg",
            borderColor: "borderColor",
            style: {
                borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                borderWidth: 1,
                borderStyle: "solid"
            },
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowDownIcon"], {
                width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"]["sm+"],
                height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"]["sm+"]
            })
        })
    });
} //# sourceMappingURL=FundWallet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/TokenAndChain.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChainIcon",
    ()=>ChainIcon,
    "TokenAndChain",
    ()=>TokenAndChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ipfs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useChainQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$walletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/utils/walletIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$nativeToken$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/nativeToken.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/ChainName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$fallbackChainIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/fallbackChainIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Img.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
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
function TokenAndChain({ token, client, size, style }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(token.chainId);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        center: "y",
        flex: "row",
        gap: "sm",
        style: {
            flexWrap: "nowrap",
            ...style
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                style: {
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][size],
                    position: "relative",
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][size]
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TokenIconWithFallback, {
                        client: client,
                        size: size,
                        token: token
                    }),
                    chain.id !== 1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        style: {
                            background: theme.colors.borderColor,
                            border: `1.5px solid ${theme.colors.modalBg}`,
                            borderRadius: "50%",
                            bottom: "-2px",
                            height: size === "lg" || size === "xl" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs,
                            position: "absolute",
                            right: "-2px",
                            width: size === "lg" || size === "xl" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xs
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ChainIcon, {
                            chain: chain,
                            client: client,
                            size: size === "xl" || size === "lg" ? "sm" : "xs"
                        })
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                gap: "4xs",
                style: {
                    minWidth: 0
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: size === "xl" ? "lg" : "sm",
                        style: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        weight: 500,
                        trackingTight: true,
                        children: token.name
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainName"], {
                        chain: chain,
                        client: client,
                        short: true,
                        size: size === "xl" ? "sm" : "xs"
                    })
                ]
            })
        ]
    });
}
function TokenIconWithFallback(props) {
    const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(props.token.chainId);
    const chainMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainMetadata"])(chain).data;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const tokenImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TokenIconWithFallback.useMemo[tokenImage]": ()=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$nativeToken$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNativeToken"])(props.token) || props.token.address === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"]) {
                if (chainMeta?.nativeCurrency.symbol === "ETH") {
                    return "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png"; // ETH icon
                }
                return chainMeta?.icon?.url;
            }
            return props.token.iconUri;
        }
    }["TokenIconWithFallback.useMemo[tokenImage]"], [
        props.token,
        chainMeta?.icon?.url,
        chainMeta?.nativeCurrency.symbol
    ]);
    return tokenImage ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
        client: props.client,
        fallbackImage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$utils$2f$walletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genericTokenIcon"],
        height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][props.size],
        src: tokenImage,
        style: {
            borderRadius: "50%"
        },
        width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][props.size]
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        style: {
            alignItems: "center",
            backgroundColor: theme.colors.secondaryButtonBg,
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: "50%",
            display: "flex",
            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][props.size]}px`,
            justifyContent: "center",
            padding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs,
            width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][props.size]}px`
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
            color: "secondaryText",
            size: props.size === "xl" ? "sm" : "xs",
            style: {
                fontWeight: 600
            },
            children: props.token.symbol.slice(0, 1)
        })
    });
}
const ChainIcon = (props)=>{
    const { url } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainIconUrl"])(props.chain);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        style: {
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            position: "relative"
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
            client: props.client,
            fallbackImage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$fallbackChainIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackChainIcon"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][props.size],
            src: getSrcChainIcon({
                chainIconUrl: url,
                client: props.client
            }),
            width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"][props.size]
        })
    });
};
const getSrcChainIcon = (props)=>{
    const url = props.chainIconUrl;
    if (!url) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$fallbackChainIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackChainIcon"];
    }
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveScheme"])({
            client: props.client,
            uri: url
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$fallbackChainIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackChainIcon"];
    }
}; //# sourceMappingURL=TokenAndChain.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/TokenBalanceRow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenBalanceRow",
    ()=>TokenBalanceRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$FiatValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/Buy/swap/FiatValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenAndChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/TokenAndChain.js [app-client] (ecmascript)");
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
function TokenBalanceRow({ client, token, amount, onClick, style, currency }) {
    const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(token.chainId);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(StyledButton, {
        onClick: ()=>onClick(token),
        style: {
            display: "flex",
            justifyContent: "space-between",
            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`,
            ...style
        },
        variant: "secondary",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenAndChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenAndChain"], {
                client: client,
                size: "lg",
                style: {
                    flex: 1,
                    maxWidth: "50%"
                },
                token: token
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                color: "secondaryText",
                flex: "row",
                gap: "4xs",
                style: {
                    flex: "1",
                    flexWrap: "nowrap",
                    justifyContent: "flex-end",
                    maxWidth: "50%",
                    minWidth: 0
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    color: "secondaryText",
                    flex: "column",
                    gap: "3xs",
                    style: {
                        alignItems: "flex-end",
                        minWidth: 0,
                        overflow: "hidden"
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            color: "primaryText",
                            size: "sm",
                            style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            },
                            children: `${Number(amount).toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                                minimumFractionDigits: 0
                            })} ${token.symbol}`
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$FiatValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiatValue"], {
                            currency: currency,
                            chain: chain,
                            client: client,
                            color: "secondaryText",
                            size: "sm",
                            token: token,
                            tokenAmount: amount
                        })
                    ]
                })
            })
        ]
    });
}
const StyledButton = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"])((props)=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg
        },
        background: "transparent",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
        justifyContent: "space-between",
        padding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
        paddingRight: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs,
        transition: "background 200ms ease, transform 150ms ease",
        ...props.style
    };
}); //# sourceMappingURL=TokenBalanceRow.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-details/PaymentOverview.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentOverview",
    ()=>PaymentOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useTransactionDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useTransactionDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$fiat$2f$currencies$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/Buy/fiat/currencies.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$FiatValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/Buy/swap/FiatValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$StepConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/Buy/swap/StepConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$WalletRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/Buy/swap/WalletRow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenBalanceRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/TokenBalanceRow.js [app-client] (ecmascript)");
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
function PaymentOverview(props) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const sender = props.sender || (props.paymentMethod.type === "wallet" ? props.paymentMethod.payerWallet.getAccount()?.address : undefined);
    const isDifferentRecipient = props.receiver.toLowerCase() !== sender?.toLowerCase();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                bg: "tertiaryBg",
                flex: "column",
                style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg
                },
                children: [
                    sender && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        gap: "sm",
                        px: "md",
                        py: "sm",
                        style: {
                            borderBottom: `1px solid ${theme.colors.borderColor}`
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$WalletRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletRow"], {
                            address: sender,
                            client: props.client,
                            iconSize: "lg",
                            textSize: "sm"
                        })
                    }),
                    props.paymentMethod.type === "wallet" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenBalanceRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenBalanceRow"], {
                        currency: props.currency,
                        amount: props.fromAmount,
                        client: props.client,
                        onClick: ()=>{},
                        style: {
                            background: "transparent",
                            border: "none",
                            borderRadius: 0
                        },
                        token: props.paymentMethod.originToken
                    }),
                    props.paymentMethod.type === "fiat" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        center: "y",
                        flex: "row",
                        gap: "sm",
                        px: "md",
                        py: "sm",
                        style: {
                            justifyContent: "space-between"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                center: "y",
                                flex: "row",
                                gap: "sm",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$fiat$2f$currencies$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFiatCurrencyIcon"])({
                                        currency: props.paymentMethod.currency,
                                        size: "lg"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        center: "y",
                                        flex: "column",
                                        gap: "3xs",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "primaryText",
                                                size: "sm",
                                                weight: 500,
                                                children: props.paymentMethod.currency
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "secondaryText",
                                                size: "xs",
                                                children: props.paymentMethod.onramp.charAt(0).toUpperCase() + props.paymentMethod.onramp.slice(1)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                color: "primaryText",
                                size: "sm",
                                children: props.fromAmount
                            })
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$StepConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepConnectorArrow"], {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                bg: "tertiaryBg",
                flex: "column",
                style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg
                },
                children: [
                    isDifferentRecipient && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        gap: "sm",
                        px: "md",
                        py: "sm",
                        style: {
                            borderBottom: `1px solid ${theme.colors.borderColor}`
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$WalletRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletRow"], {
                            address: props.receiver,
                            client: props.client,
                            iconSize: "lg",
                            textSize: "sm"
                        })
                    }),
                    props.modeInfo.mode === "direct_payment" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        center: "y",
                        flex: "row",
                        gap: "sm",
                        p: "md",
                        style: {
                            justifyContent: "space-between"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                center: "y",
                                flex: "column",
                                gap: "3xs",
                                style: {
                                    flex: 1
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        color: "primaryText",
                                        size: "sm",
                                        weight: 500,
                                        children: props.metadata.title || "Payment"
                                    }),
                                    props.metadata.description && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        color: "secondaryText",
                                        size: "xs",
                                        children: props.metadata.description
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                center: "y",
                                flex: "column",
                                gap: "3xs",
                                style: {
                                    alignItems: "flex-end"
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$FiatValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiatValue"], {
                                        currency: props.currency,
                                        chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(props.toToken.chainId),
                                        client: props.client,
                                        color: "primaryText",
                                        size: "sm",
                                        token: props.toToken,
                                        tokenAmount: props.modeInfo.paymentInfo.amount
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        color: "secondaryText",
                                        size: "xs",
                                        children: [
                                            props.modeInfo.paymentInfo.amount,
                                            " ",
                                            props.toToken.symbol
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    props.modeInfo.mode === "fund_wallet" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenBalanceRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenBalanceRow"], {
                        currency: props.currency,
                        amount: props.toAmount,
                        client: props.client,
                        onClick: ()=>{},
                        style: {
                            background: "transparent",
                            border: "none",
                            borderRadius: 0
                        },
                        token: props.toToken
                    }),
                    props.modeInfo.mode === "transaction" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(TransactionOverViewCompact, {
                        client: props.client,
                        paymentMethod: props.paymentMethod,
                        transaction: props.modeInfo.transaction,
                        metadata: props.metadata
                    })
                ]
            })
        ]
    });
}
const TransactionOverViewCompact = (props)=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const txInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useTransactionDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransactionDetails"])({
        client: props.client,
        transaction: props.transaction,
        wallet: props.paymentMethod.payerWallet
    });
    if (!txInfo.data) {
        // Skeleton loading state
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            center: "y",
            flex: "row",
            gap: "sm",
            p: "md",
            style: {
                justifyContent: "space-between"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    center: "y",
                    flex: "column",
                    gap: "3xs",
                    style: {
                        flex: 1
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                backgroundColor: theme.colors.skeletonBg,
                                borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs,
                                height: "16px",
                                width: "120px"
                            }
                        }),
                        props.metadata.description && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                backgroundColor: theme.colors.skeletonBg,
                                borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs,
                                height: "12px",
                                width: "80px"
                            }
                        })
                    ]
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    center: "y",
                    flex: "column",
                    gap: "3xs",
                    style: {
                        alignItems: "flex-end"
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            backgroundColor: theme.colors.skeletonBg,
                            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
                            height: "24px",
                            width: "100px"
                        }
                    })
                })
            ]
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        center: "y",
        flex: "row",
        gap: "sm",
        p: "md",
        style: {
            justifyContent: "space-between"
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "column",
                gap: "3xs",
                style: {
                    flex: 1
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        weight: 500,
                        children: props.metadata.title || "Transaction"
                    }),
                    props.metadata.description && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "secondaryText",
                        size: "xs",
                        children: props.metadata.description
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "column",
                gap: "3xs",
                style: {
                    alignItems: "flex-end"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    color: "secondaryText",
                    size: "xs",
                    style: {
                        backgroundColor: theme.colors.secondaryButtonBg,
                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm,
                        fontFamily: "monospace",
                        padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm}`,
                        textAlign: "right"
                    },
                    children: txInfo.data.functionInfo.functionName
                })
            })
        ]
    });
}; //# sourceMappingURL=PaymentOverview.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-details/PaymentDetails.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentDetails",
    ()=>PaymentDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/others/useChainQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/formatTokenBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$details$2f$PaymentOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-details/PaymentOverview.js [app-client] (ecmascript)");
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
;
;
function PaymentDetails({ metadata, confirmButtonLabel, client, paymentMethod, preparedQuote, onConfirm, onBack, onError, currency, modeInfo }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const handleConfirm = ()=>{
        try {
            onConfirm();
        } catch (error) {
            onError(error);
        }
    };
    const chainsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$others$2f$useChainQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainsQuery"])(preparedQuote.steps.flatMap({
        "PaymentDetails.useChainsQuery[chainsQuery]": (s)=>[
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(s.originToken.chainId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(s.destinationToken.chainId)
            ]
    }["PaymentDetails.useChainsQuery[chainsQuery]"]), 10);
    const chainsMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaymentDetails.chainsMetadata.useMemo": ()=>chainsQuery.map({
                "PaymentDetails.chainsMetadata.useMemo": (c)=>c.data
            }["PaymentDetails.chainsMetadata.useMemo"])
    }["PaymentDetails.chainsMetadata.useMemo"], [
        chainsQuery
    ]).filter((c)=>!!c);
    // Extract common data based on quote type
    const getDisplayData = ()=>{
        switch(preparedQuote.type){
            case "transfer":
                {
                    const token = paymentMethod.type === "wallet" ? paymentMethod.originToken : undefined;
                    if (!token) {
                        // can never happen
                        onError(new Error("Invalid payment method"));
                        return {
                            destinationAmount: "0",
                            destinationToken: undefined,
                            estimatedTime: 0,
                            originAmount: "0",
                            originToken: undefined
                        };
                    }
                    return {
                        destinationAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.destinationAmount, token.decimals),
                        destinationToken: token,
                        estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                        originAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.originAmount, token.decimals),
                        originToken: token
                    };
                }
            case "buy":
                {
                    const method = paymentMethod.type === "wallet" ? paymentMethod : undefined;
                    if (!method) {
                        // can never happen
                        onError(new Error("Invalid payment method"));
                        return {
                            destinationAmount: "0",
                            destinationToken: undefined,
                            estimatedTime: 0,
                            originAmount: "0",
                            originToken: undefined
                        };
                    }
                    return {
                        destinationAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.destinationAmount, preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken?.decimals ?? 18),
                        destinationToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken,
                        estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                        originAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.originAmount, method.originToken.decimals),
                        originToken: paymentMethod.type === "wallet" ? paymentMethod.originToken : undefined
                    };
                }
            case "sell":
                {
                    const method = paymentMethod.type === "wallet" ? paymentMethod : undefined;
                    if (!method) {
                        // can never happen
                        onError(new Error("Invalid payment method"));
                        return {
                            destinationAmount: "0",
                            destinationToken: undefined,
                            estimatedTime: 0,
                            originAmount: "0",
                            originToken: undefined
                        };
                    }
                    return {
                        destinationAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.destinationAmount, preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken?.decimals ?? 18),
                        destinationToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken,
                        estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                        originAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.originAmount, method.originToken.decimals),
                        originToken: paymentMethod.type === "wallet" ? paymentMethod.originToken : undefined
                    };
                }
            case "onramp":
                {
                    const method = paymentMethod.type === "fiat" ? paymentMethod : undefined;
                    if (!method) {
                        // can never happen
                        onError(new Error("Invalid payment method"));
                        return {
                            destinationAmount: "0",
                            destinationToken: undefined,
                            estimatedTime: 0,
                            originAmount: "0",
                            originToken: undefined
                        };
                    }
                    return {
                        destinationAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.destinationAmount, preparedQuote.destinationToken.decimals),
                        destinationToken: preparedQuote.destinationToken,
                        estimatedTime: undefined,
                        originAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyAmount"])(method.currency, Number(preparedQuote.currencyAmount)),
                        originToken: undefined
                    };
                }
            default:
                {
                    throw new Error(`Unsupported bridge prepare type: ${preparedQuote.type}`);
                }
        }
    };
    const displayData = getDisplayData();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        fullHeight: true,
        px: "md",
        pb: "md",
        pt: "md+",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalHeader"], {
                onBack: onBack,
                title: metadata.title || "Payment Details"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "lg"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        children: [
                            displayData.destinationToken && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$details$2f$PaymentOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentOverview"], {
                                currency: currency,
                                metadata: metadata,
                                modeInfo: modeInfo,
                                client: client,
                                fromAmount: displayData.originAmount,
                                paymentMethod: paymentMethod,
                                receiver: preparedQuote.intent.receiver,
                                sender: preparedQuote.intent.sender || paymentMethod.payerWallet?.getAccount()?.address,
                                toAmount: displayData.destinationAmount,
                                toToken: displayData.destinationToken
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                                y: "md"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                flex: "row",
                                gap: "sm",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        flex: "row",
                                        gap: "xs",
                                        style: {
                                            flex: 1,
                                            justifyContent: "center"
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "secondaryText",
                                                size: "sm",
                                                children: "Estimated Time"
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "primaryText",
                                                size: "sm",
                                                children: displayData.estimatedTime ? `~${Math.ceil(displayData.estimatedTime / 60000)} min` : "~2 min"
                                            })
                                        ]
                                    }),
                                    preparedQuote.steps.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        flex: "row",
                                        gap: "xs",
                                        style: {
                                            flex: 1,
                                            justifyContent: "center"
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "secondaryText",
                                                size: "sm",
                                                children: "Route Length"
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "primaryText",
                                                size: "sm",
                                                children: [
                                                    preparedQuote.steps.length,
                                                    " step",
                                                    preparedQuote.steps.length !== 1 ? "s" : ""
                                                ]
                                            })
                                        ]
                                    }) : null
                                ]
                            })
                        ]
                    }),
                    preparedQuote.steps.length > 1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                                y: "sm"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                flex: "column",
                                gap: "sm",
                                style: {
                                    backgroundColor: theme.colors.tertiaryBg,
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md,
                                    padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`
                                },
                                children: preparedQuote.steps.map((step, stepIndex)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        flex: "column",
                                        gap: "sm",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                            flex: "row",
                                            gap: "md",
                                            style: {
                                                alignItems: "center"
                                            },
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                                    center: "both",
                                                    flex: "row",
                                                    style: {
                                                        backgroundColor: theme.colors.accentButtonBg,
                                                        borderRadius: "50%",
                                                        color: theme.colors.accentButtonText,
                                                        flexShrink: 0,
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                        height: "24px",
                                                        width: "24px"
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                        color: "accentButtonText",
                                                        size: "xs",
                                                        children: stepIndex + 1
                                                    })
                                                }),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                                    center: "y",
                                                    flex: "row",
                                                    gap: "sm",
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                                        flex: "column",
                                                        gap: "3xs",
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                color: "primaryText",
                                                                size: "sm",
                                                                children: step.destinationToken.chainId !== step.originToken.chainId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        "Bridge",
                                                                        " ",
                                                                        step.originToken.symbol === step.destinationToken.symbol ? step.originToken.symbol : `${step.originToken.symbol} to ${step.destinationToken.symbol}`
                                                                    ]
                                                                }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        "Swap ",
                                                                        step.originToken.symbol,
                                                                        " to",
                                                                        " ",
                                                                        step.destinationToken.symbol
                                                                    ]
                                                                })
                                                            }),
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                                color: "secondaryText",
                                                                size: "xs",
                                                                children: step.originToken.chainId !== step.destinationToken.chainId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        chainsMetadata.find((c)=>c.chainId === step.originToken.chainId)?.name,
                                                                        " ",
                                                                        "to",
                                                                        " ",
                                                                        chainsMetadata.find((c)=>c.chainId === step.destinationToken.chainId)?.name
                                                                    ]
                                                                }) : chainsMetadata.find((c)=>c.chainId === step.originToken.chainId)?.name
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    }, `step-${stepIndex}-${step.originToken.address}-${step.destinationToken.address}`))
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "lg"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        gap: "sm",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            fullWidth: true,
                            onClick: handleConfirm,
                            variant: "accent",
                            children: confirmButtonLabel || "Confirm Payment"
                        })
                    })
                ]
            })
        ]
    });
} //# sourceMappingURL=PaymentDetails.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/FiatProviderSelection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FiatProviderSelection",
    ()=>FiatProviderSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$formatNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/formatNumber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$pay$2f$useBuyWithFiatQuotesForProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/pay/useBuyWithFiatQuotesForProviders.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/formatTokenBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Img.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
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
;
;
;
;
const PROVIDERS = [
    {
        description: "Fast and secure payments",
        iconUri: "https://i.ibb.co/LDJ3Rk2t/Frame-5.png",
        id: "coinbase",
        name: "Coinbase"
    },
    {
        description: "Trusted payment processing",
        iconUri: "https://i.ibb.co/CpgQC2Lf/images-3.png",
        id: "stripe",
        name: "Stripe"
    },
    {
        description: "Global payment solution",
        iconUri: "https://i.ibb.co/Xx2r882p/Transak-official-symbol-1.png",
        id: "transak",
        name: "Transak"
    }
];
function FiatProviderSelection({ onProviderSelected, client, toChainId, toTokenAddress, toAddress, toAmount, currency, country }) {
    // Fetch quotes for all providers
    const quoteQueries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$pay$2f$useBuyWithFiatQuotesForProviders$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuyWithFiatQuotesForProviders"])({
        amount: toAmount || "0",
        chainId: toChainId,
        client,
        currency: currency || "USD",
        receiver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(toAddress),
        tokenAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(toTokenAddress),
        country
    });
    const quotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FiatProviderSelection.useMemo[quotes]": ()=>{
            return quoteQueries.map({
                "FiatProviderSelection.useMemo[quotes]": (q)=>q.data
            }["FiatProviderSelection.useMemo[quotes]"]).filter({
                "FiatProviderSelection.useMemo[quotes]": (q)=>!!q
            }["FiatProviderSelection.useMemo[quotes]"]);
        }
    }["FiatProviderSelection.useMemo[quotes]"], [
        quoteQueries
    ]);
    const isPending = quoteQueries.some((q)=>q.isLoading);
    if (quoteQueries.every((q)=>q.isError)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            center: "both",
            flex: "column",
            style: {
                minHeight: "200px",
                flexGrow: 1
            },
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                color: "secondaryText",
                size: "sm",
                children: "No quotes available"
            })
        });
    }
    // TODO: add a "remember my choice" checkbox
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        gap: "xs",
        style: {
            flexGrow: 1
        },
        children: !isPending ? quotes.sort((a, b)=>a.currencyAmount - b.currencyAmount).map((quote)=>{
            const provider = PROVIDERS.find((p)=>p.id === quote.intent.onramp);
            if (!provider) {
                return null;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                fullWidth: true,
                onClick: ()=>onProviderSelected(provider.id),
                style: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg,
                    textAlign: "left",
                    padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`
                },
                variant: "secondary",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "row",
                    gap: "sm",
                    style: {
                        alignItems: "center",
                        width: "100%"
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Img$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Img"], {
                            alt: provider.name,
                            client: client,
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg,
                            src: provider.iconUri,
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg,
                            style: {
                                borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full
                            }
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "column",
                            gap: "3xs",
                            style: {
                                flex: 1
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                color: "primaryText",
                                size: "md",
                                weight: 500,
                                children: provider.name
                            })
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "column",
                            gap: "3xs",
                            style: {
                                alignItems: "flex-end"
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    color: "primaryText",
                                    size: "sm",
                                    style: {
                                        fontWeight: 500
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyAmount"])(currency || "USD", quote.currencyAmount)
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    color: "secondaryText",
                                    size: "xs",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$formatNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTokens"])(quote.destinationAmount, quote.destinationToken.decimals)), 4),
                                        " ",
                                        quote.destinationToken.symbol
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }, provider.id);
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            center: "both",
            flex: "column",
            style: {
                flexGrow: 1,
                paddingBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].lg
            },
            px: "md",
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                    color: "secondaryText",
                    size: "xl"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                    y: "lg"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    center: true,
                    color: "primaryText",
                    size: "lg",
                    weight: 600,
                    trackingTight: true,
                    children: "Searching Providers"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                    y: "xs"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    center: true,
                    color: "secondaryText",
                    size: "sm",
                    multiline: true,
                    style: {
                        textWrap: "pretty"
                    },
                    children: "Searching for the best providers for this payment"
                })
            ]
        })
    });
} //# sourceMappingURL=FiatProviderSelection.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/TokenSelection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenSelection",
    ()=>TokenSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/formatTokenBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Skeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenAndChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/common/TokenAndChain.js [app-client] (ecmascript)");
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
function PaymentMethodTokenRow({ paymentMethod, client, onPaymentMethodSelected, currency }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const hasEnoughBalance = paymentMethod.hasEnoughBalance;
    const currencyPrice = paymentMethod.originToken.prices[currency || "USD"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        disabled: !hasEnoughBalance,
        fullWidth: true,
        onClick: ()=>onPaymentMethodSelected(paymentMethod),
        style: {
            backgroundColor: theme.colors.tertiaryBg,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg,
            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`,
            textAlign: "left"
        },
        variant: "secondary",
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            flex: "row",
            gap: "md",
            style: {
                alignItems: "center",
                width: "100%"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$common$2f$TokenAndChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenAndChain"], {
                    client: client,
                    size: "lg",
                    style: {
                        maxWidth: "50%"
                    },
                    token: paymentMethod.originToken
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "column",
                    gap: "3xs",
                    style: {
                        alignItems: "flex-end",
                        flex: 1
                    },
                    children: [
                        currencyPrice && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            color: "primaryText",
                            size: "sm",
                            style: {
                                fontWeight: 500,
                                textWrap: "nowrap"
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrencyAmount"])(currency || "USD", Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(paymentMethod.balance, paymentMethod.originToken.decimals)) * currencyPrice)
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "row",
                            gap: "3xs",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                color: hasEnoughBalance ? "success" : "danger",
                                size: "xs",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(paymentMethod.balance, paymentMethod.originToken.decimals),
                                    " ",
                                    paymentMethod.originToken.symbol
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    }, `${paymentMethod.originToken.address}-${paymentMethod.originToken.chainId}`);
}
function TokenSelection({ paymentMethods, paymentMethodsLoading, client, onPaymentMethodSelected, onBack, destinationToken, destinationAmount, feePayer, currency }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    if (paymentMethodsLoading) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            flex: "column",
            gap: "xs",
            pb: "lg",
            style: {
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarWidth: "none"
            },
            children: new Array(10).fill(0).map((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    style: {
                        backgroundColor: theme.colors.tertiaryBg,
                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg,
                        padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        gap: "md",
                        style: {
                            alignItems: "center",
                            width: "100%"
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                center: "y",
                                flex: "row",
                                gap: "sm",
                                style: {
                                    maxWidth: "50%"
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        style: {
                                            backgroundColor: theme.colors.skeletonBg,
                                            borderRadius: "50%",
                                            height: "32px",
                                            width: "32px"
                                        }
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        flex: "column",
                                        gap: "3xs",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                height: "14px",
                                                width: "60px"
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                height: "12px",
                                                width: "40px"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                flex: "column",
                                gap: "3xs",
                                style: {
                                    alignItems: "flex-end",
                                    flex: 1
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        height: "16px",
                                        width: "80px"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        flex: "row",
                                        gap: "3xs",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                height: "12px",
                                                width: "50px"
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                height: "12px",
                                                width: "40px"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }, i))
        });
    }
    if (paymentMethods.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
            center: "both",
            flex: "column",
            style: {
                minHeight: "250px"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    center: true,
                    color: "primaryText",
                    size: "md",
                    children: "No available tokens found for this wallet"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                    y: "sm"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                    center: true,
                    color: "secondaryText",
                    size: "sm",
                    children: "Try connecting a different wallet or pay with card"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                    y: "lg"
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: onBack,
                    variant: "primary",
                    children: "Select another payment method"
                })
            ]
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        gap: "xs",
        pb: "lg",
        style: {
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarWidth: "none"
        },
        children: paymentMethods.filter((method)=>method.type === "wallet").map((method)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(PaymentMethodTokenRow, {
                client: client,
                destinationAmount: destinationAmount,
                destinationToken: destinationToken,
                feePayer: feePayer,
                onPaymentMethodSelected: onPaymentMethodSelected,
                paymentMethod: method,
                currency: currency
            }, `${method.originToken.address}-${method.originToken.chainId}`))
    });
} //# sourceMappingURL=TokenSelection.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/WalletFiatSelection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletFiatSelection",
    ()=>WalletFiatSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$CreditCardIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/icons/CreditCardIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$WalletRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/Buy/swap/WalletRow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
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
function WalletFiatSelection({ connectedWallets, client, onWalletSelected, onFiatSelected, onConnectWallet, paymentMethods = [
    "crypto",
    "card"
] }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        gap: "xs",
        children: [
            paymentMethods.includes("crypto") && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    connectedWallets.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        gap: "sm",
                        children: connectedWallets.map((wallet)=>{
                            const account = wallet.getAccount();
                            if (!account?.address) {
                                return null;
                            }
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                fullWidth: true,
                                onClick: ()=>onWalletSelected(wallet),
                                style: {
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md,
                                    justifyContent: "space-between",
                                    padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`
                                },
                                variant: "secondary",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$Buy$2f$swap$2f$WalletRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletRow"], {
                                    address: account?.address,
                                    client: client,
                                    iconSize: "lg",
                                    textSize: "sm"
                                })
                            }, `${wallet.id}-${account.address}`);
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        fullWidth: true,
                        onClick: onConnectWallet,
                        style: {
                            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md,
                            height: "auto",
                            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`,
                            textAlign: "left"
                        },
                        variant: "secondary",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "row",
                            gap: "md",
                            style: {
                                alignItems: "center",
                                width: "100%"
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                    style: {
                                        alignItems: "center",
                                        border: `1px dashed ${theme.colors.secondaryText}`,
                                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                                        display: "flex",
                                        height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`,
                                        justifyContent: "center",
                                        width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlusIcon"], {
                                        color: theme.colors.secondaryText,
                                        height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"]["sm+"],
                                        width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"]["sm+"]
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                    flex: "column",
                                    gap: "3xs",
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            color: "primaryText",
                                            size: "sm",
                                            children: "Connect a Wallet"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                            color: "secondaryText",
                                            size: "xs",
                                            children: "Pay with any web3 wallet"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            paymentMethods.includes("card") && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                fullWidth: true,
                onClick: onFiatSelected,
                style: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md,
                    height: "auto",
                    padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`,
                    textAlign: "left"
                },
                variant: "secondary",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "row",
                    gap: "md",
                    style: {
                        alignItems: "center",
                        width: "100%"
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$icons$2f$CreditCardIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreditCardIcon"], {
                            color: theme.colors.secondaryText,
                            size: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "column",
                            gap: "3xs",
                            style: {
                                flex: 1
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    color: "primaryText",
                                    size: "sm",
                                    children: "Pay with Card"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                    color: "secondaryText",
                                    size: "xs",
                                    children: "Onramp and pay in one step"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
} //# sourceMappingURL=WalletFiatSelection.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/PaymentSelection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentSelection",
    ()=>PaymentSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/pay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$usePaymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/usePaymentMethods.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useActiveWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/wallets/useConnectedWallets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$WalletSwitcherConnectionScreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/WalletSwitcherConnectionScreen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$FiatProviderSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/FiatProviderSelection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$TokenSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/TokenSelection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$WalletFiatSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/WalletFiatSelection.js [app-client] (ecmascript)");
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
;
;
;
;
function PaymentSelection({ destinationToken, client, destinationAmount, receiverAddress, onPaymentMethodSelected, onError, onBack, connectOptions, connectLocale, paymentMethods, supportedTokens, feePayer, currency, country }) {
    const connectedWallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useConnectedWallets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnectedWallets"])();
    const activeWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$wallets$2f$useActiveWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveWallet"])();
    const initialStep = paymentMethods.length === 1 && paymentMethods[0] === "card" ? {
        type: "fiatProviderSelection"
    } : {
        type: "walletSelection"
    };
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStep);
    const payerWallet = currentStep.type === "tokenSelection" ? currentStep.selectedWallet : activeWallet;
    const { data: suitableTokenPaymentMethods, isLoading: paymentMethodsLoading, error: paymentMethodsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$usePaymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaymentMethods"])({
        client,
        destinationAmount,
        destinationToken,
        payerWallet,
        supportedTokens
    });
    // Handle error from usePaymentMethods
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentSelection.useEffect": ()=>{
            if (paymentMethodsError) {
                onError(paymentMethodsError);
            }
        }
    }["PaymentSelection.useEffect"], [
        paymentMethodsError,
        onError
    ]);
    const handlePaymentMethodSelected = (paymentMethod)=>{
        try {
            onPaymentMethodSelected(paymentMethod);
        } catch (error) {
            onError(error);
        }
    };
    const handleWalletSelected = (wallet)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
            client,
            event: "ub:ui:token_selection"
        });
        setCurrentStep({
            selectedWallet: wallet,
            type: "tokenSelection"
        });
    };
    const handleConnectWallet = async ()=>{
        setCurrentStep({
            type: "walletConnection"
        });
    };
    const handleFiatSelected = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
            client,
            event: "ub:ui:fiat_provider_selection"
        });
        setCurrentStep({
            type: "fiatProviderSelection"
        });
    };
    const handleBackToWalletSelection = ()=>{
        setCurrentStep({
            type: "walletSelection"
        });
    };
    const handleOnrampProviderSelected = (provider)=>{
        const recipientAddress = receiverAddress || payerWallet?.getAccount()?.address;
        if (!recipientAddress) {
            onError(new Error("No recipient address available for fiat payment"));
            return;
        }
        const fiatPaymentMethod = {
            currency: currency || "USD",
            onramp: provider,
            payerWallet,
            type: "fiat"
        };
        handlePaymentMethodSelected(fiatPaymentMethod);
    };
    const getStepTitle = ()=>{
        switch(currentStep.type){
            case "walletSelection":
                return "Choose Payment Method";
            case "tokenSelection":
                return "Select Token";
            case "fiatProviderSelection":
                return "Select Payment Provider";
            case "walletConnection":
                return "Connect Wallet";
        }
    };
    const getBackHandler = ()=>{
        if (paymentMethods.length === 1 && paymentMethods[0] === "card") {
            return onBack;
        }
        switch(currentStep.type){
            case "walletSelection":
                return onBack;
            case "tokenSelection":
            case "fiatProviderSelection":
            case "walletConnection":
                return handleBackToWalletSelection;
        }
    };
    // Handle rendering WalletSwitcherConnectionScreen
    if (currentStep.type === "walletConnection") {
        const destinationChain = destinationToken ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(destinationToken.chainId) : undefined;
        const chains = destinationChain ? [
            destinationChain,
            ...connectOptions?.chains || []
        ] : connectOptions?.chains;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$WalletSwitcherConnectionScreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletSwitcherConnectionScreen"], {
            accountAbstraction: connectOptions?.accountAbstraction,
            appMetadata: connectOptions?.appMetadata,
            chain: destinationChain || connectOptions?.chain,
            chains: chains,
            client: client,
            connectLocale: connectLocale,
            hiddenWallets: [],
            isEmbed: false,
            onBack: handleBackToWalletSelection,
            onSelect: handleWalletSelected,
            recommendedWallets: connectOptions?.recommendedWallets,
            showAllWallets: connectOptions?.showAllWallets === undefined ? true : connectOptions?.showAllWallets,
            walletConnect: connectOptions?.walletConnect,
            wallets: connectOptions?.wallets?.filter((w)=>w.id !== "inApp")
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        px: "md",
        pt: "md+",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalHeader"], {
                onBack: getBackHandler(),
                title: getStepTitle()
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "lg"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                style: {
                    minHeight: "300px"
                },
                children: [
                    currentStep.type === "walletSelection" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$WalletFiatSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletFiatSelection"], {
                        client: client,
                        connectedWallets: connectedWallets,
                        onConnectWallet: handleConnectWallet,
                        onFiatSelected: handleFiatSelected,
                        onWalletSelected: handleWalletSelected,
                        paymentMethods: paymentMethods
                    }),
                    currentStep.type === "tokenSelection" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$TokenSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelection"], {
                        client: client,
                        destinationAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(destinationAmount, destinationToken.decimals),
                        destinationToken: destinationToken,
                        feePayer: feePayer,
                        onBack: handleBackToWalletSelection,
                        onPaymentMethodSelected: handlePaymentMethodSelected,
                        paymentMethods: suitableTokenPaymentMethods,
                        paymentMethodsLoading: paymentMethodsLoading,
                        currency: currency
                    }),
                    currentStep.type === "fiatProviderSelection" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$FiatProviderSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiatProviderSelection"], {
                        country: country,
                        client: client,
                        onProviderSelected: handleOnrampProviderSelected,
                        toAddress: receiverAddress || payerWallet?.getAccount()?.address || "",
                        toAmount: destinationAmount,
                        toChainId: destinationToken.chainId,
                        toTokenAddress: destinationToken.address,
                        currency: currency
                    })
                ]
            })
        ]
    });
} //# sourceMappingURL=PaymentSelection.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-success/PaymentReceipt.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentReceipt",
    ()=>PaymentReceipt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/screens/formatTokenBalance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/ChainName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$CopyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/CopyIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Skeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
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
;
;
;
function getPaymentId(preparedQuote, status) {
    if (preparedQuote.type === "onramp") {
        return preparedQuote.id;
    }
    return status.transactions[status.transactions.length - 1]?.transactionHash;
}
/**
 * Hook to fetch transaction info for a completed status
 */ function useTransactionInfo(status, preparedQuote) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        enabled: true,
        queryFn: {
            "useTransactionInfo.useQuery": async ()=>{
                const isOnramp = status.type === "onramp";
                if (isOnramp && preparedQuote.type === "onramp") {
                    // For onramp, create a display ID since OnrampStatus doesn't have paymentId
                    return {
                        amountPaid: `${preparedQuote.currencyAmount} ${preparedQuote.currency}`,
                        amountReceived: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(preparedQuote.destinationAmount, preparedQuote.destinationToken.decimals)} ${preparedQuote.destinationToken.symbol}`,
                        chain: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainMetadata"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(preparedQuote.destinationToken.chainId)),
                        destinationToken: preparedQuote.destinationToken,
                        id: preparedQuote.id,
                        label: "Onramp Payment",
                        type: "paymentId"
                    };
                } else if (status.type === "buy" || status.type === "sell" || status.type === "transfer") {
                    if (status.transactions.length > 0) {
                        // get the last transaction hash
                        const tx = status.transactions[status.transactions.length - 1];
                        if (tx) {
                            const [destinationChain, originChain] = await Promise.all([
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainMetadata"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(status.destinationToken.chainId)),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainMetadata"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(status.originToken.chainId))
                            ]);
                            return {
                                amountPaid: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(status.originAmount, status.originToken.decimals)} ${status.originToken.symbol}`,
                                amountReceived: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$screens$2f$formatTokenBalance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTokenAmount"])(status.destinationAmount, status.destinationToken.decimals)} ${status.destinationToken.symbol}`,
                                chain: destinationChain,
                                destinationChain,
                                destinationToken: status.destinationToken,
                                id: tx.transactionHash,
                                label: "Transaction",
                                originChain,
                                originToken: status.originToken,
                                type: "transactionHash"
                            };
                        }
                    }
                }
                return null;
            }
        }["useTransactionInfo.useQuery"],
        queryKey: [
            "transaction-info",
            status.type,
            getPaymentId(preparedQuote, status)
        ],
        staleTime: 5 * 60 * 1000
    });
}
/**
 * Component to display details for a completed transaction step
 */ function CompletedStepDetailCard({ status, preparedQuote }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const { data: txInfo, isPending } = useTransactionInfo(status, preparedQuote);
    if (isPending) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Skeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            height: "200px",
            style: {
                borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg
            }
        });
    }
    if (!txInfo) {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        gap: "sm",
        style: {
            backgroundColor: theme.colors.tertiaryBg,
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].lg,
            padding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "row",
                gap: "sm",
                py: "4xs",
                style: {
                    alignItems: "center",
                    justifyContent: "space-between"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        weight: 500,
                        children: txInfo.label
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        style: {
                            backgroundColor: theme.colors.modalBg,
                            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].full,
                            border: `1px solid ${theme.colors.borderColor}`,
                            padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"]["3xs"]} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xs}`
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            style: {
                                color: theme.colors.success,
                                fontSize: 10,
                                letterSpacing: "0.025em"
                            },
                            children: "COMPLETED"
                        })
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {}),
            txInfo.amountPaid && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "row",
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "secondaryText",
                        size: "sm",
                        children: "Amount Paid"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        children: txInfo.amountPaid
                    })
                ]
            }),
            txInfo.amountReceived && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "row",
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "secondaryText",
                        size: "sm",
                        children: "Amount Received"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        children: txInfo.amountReceived
                    })
                ]
            }),
            txInfo.originChain && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "row",
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "secondaryText",
                        size: "sm",
                        children: "Origin Chain"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shorterChainName"])(txInfo.originChain.name)
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "row",
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "secondaryText",
                        size: "sm",
                        children: "Destination Chain"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shorterChainName"])(txInfo.chain.name)
                    })
                ]
            }),
            txInfo.type === "paymentId" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "y",
                flex: "row",
                style: {
                    justifyContent: "space-between"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "secondaryText",
                        size: "sm",
                        children: "Payment ID"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        gap: "3xs",
                        center: "y",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$CopyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                text: txInfo.id,
                                iconSize: 12,
                                tip: "Copy Payment ID"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                color: "primaryText",
                                weight: 400,
                                size: "sm",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortenHex"])(txInfo.id)
                            })
                        ]
                    })
                ]
            }),
            status.transactions.map((tx)=>{
                const explorerLink = `https://thirdweb.com/${tx.chainId}/tx/${tx.transactionHash}`;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    center: "y",
                    flex: "row",
                    style: {
                        justifyContent: "space-between"
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            color: "secondaryText",
                            size: "sm",
                            children: "Transaction Hash"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                            flex: "row",
                            gap: "3xs",
                            center: "y",
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$CopyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyIcon"], {
                                    text: tx.transactionHash,
                                    iconSize: 12,
                                    tip: "Copy Transaction Hash"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                    href: explorerLink,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    color: "primaryText",
                                    hoverColor: "accentText",
                                    weight: 400,
                                    size: "sm",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortenHex"])(tx.transactionHash)
                                })
                            ]
                        })
                    ]
                }, tx.transactionHash);
            })
        ]
    }, txInfo.id);
}
function PaymentReceipt({ preparedQuote, completedStatuses, onBack, windowAdapter }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        fullHeight: true,
        px: "md",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md+"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalHeader"], {
                onBack: onBack,
                title: "Payment Receipt"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md+"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                gap: "lg",
                scrollY: true,
                style: {
                    maxHeight: "500px",
                    minHeight: "400px"
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                    flex: "column",
                    gap: "sm",
                    children: completedStatuses.map((status, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CompletedStepDetailCard, {
                            preparedQuote: preparedQuote,
                            status: status,
                            windowAdapter: windowAdapter
                        }, `${status.type}-${index}`))
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md+"
            })
        ]
    });
} //# sourceMappingURL=PaymentReceipt.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-success/SuccessScreen.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuccessScreen",
    ()=>SuccessScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/pay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$success$2f$PaymentReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-success/PaymentReceipt.js [app-client] (ecmascript)");
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
;
;
function SuccessScreen({ preparedQuote, completedStatuses, onDone, windowAdapter, client, hasPaymentId = false, showContinueWithTx, type }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    const [viewState, setViewState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("success");
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const hasFiredSuccessEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuccessScreen.useEffect": ()=>{
            if (hasFiredSuccessEvent.current) return;
            hasFiredSuccessEvent.current = true;
            if (preparedQuote.type === "buy" || preparedQuote.type === "sell") {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                    chainId: preparedQuote.intent.originChainId,
                    client: client,
                    event: "ub:ui:success_screen",
                    fromToken: preparedQuote.intent.originTokenAddress,
                    toChainId: preparedQuote.intent.destinationChainId,
                    toToken: preparedQuote.intent.destinationTokenAddress,
                    walletAddress: preparedQuote.intent.sender
                });
            }
            if (preparedQuote.type === "transfer") {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                    chainId: preparedQuote.intent.chainId,
                    client: client,
                    event: "ub:ui:success_screen",
                    fromToken: preparedQuote.intent.tokenAddress,
                    toChainId: preparedQuote.intent.chainId,
                    toToken: preparedQuote.intent.tokenAddress,
                    walletAddress: preparedQuote.intent.sender
                });
            }
            queryClient.invalidateQueries({
                queryKey: [
                    "bridge/v1/wallets"
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    "walletBalance"
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    "payment-methods"
                ]
            });
        }
    }["SuccessScreen.useEffect"], [
        client,
        preparedQuote,
        queryClient
    ]);
    if (viewState === "detail") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$success$2f$PaymentReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentReceipt"], {
            completedStatuses: completedStatuses,
            onBack: ()=>setViewState("success"),
            preparedQuote: preparedQuote,
            windowAdapter: windowAdapter
        });
    }
    const title = type === "swap-success" ? "Swap Successful" : "Payment Successful";
    const description = type === "swap-success" ? "Your token swap has been completed successfully." : "Your payment has been completed successfully.";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        fullHeight: true,
        px: "md",
        pb: "md",
        pt: "md+",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "3xl"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                center: "x",
                flex: "column",
                gap: "md",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        center: "both",
                        flex: "row",
                        style: {
                            animation: "successBounce 0.6s ease-out",
                            border: `2px solid ${theme.colors.success}`,
                            borderRadius: "50%",
                            height: "64px",
                            marginBottom: "16px",
                            width: "64px"
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                            color: theme.colors.success,
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xl,
                            style: {
                                animation: "checkAppear 0.3s ease-out 0.3s both"
                            },
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].xl
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                center: true,
                                color: "primaryText",
                                size: "xl",
                                weight: 600,
                                trackingTight: true,
                                style: {
                                    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].xxs
                                },
                                children: title
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                center: true,
                                color: "secondaryText",
                                size: "sm",
                                children: hasPaymentId ? "You can now close this page and return to the application." : showContinueWithTx ? "Click continue to execute your transaction." : description
                            })
                        ]
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "3xl"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                gap: "sm",
                style: {
                    width: "100%"
                },
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        fullWidth: true,
                        onClick: ()=>setViewState("detail"),
                        variant: "secondary",
                        children: "View Transaction Receipt"
                    }),
                    !hasPaymentId && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        fullWidth: true,
                        onClick: onDone,
                        variant: "accent",
                        children: showContinueWithTx ? "Continue" : "Done"
                    })
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("style", {
                children: `
          @keyframes successBounce {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes checkAppear {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `
            })
        ]
    });
} //# sourceMappingURL=SuccessScreen.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/QuoteLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteLoader",
    ()=>QuoteLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useBridgePrepare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useBridgePrepare.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function QuoteLoader({ destinationToken, paymentMethod, amount, sender, receiver, client, onQuoteReceived, onError, purchaseData, paymentLinkId, feePayer, mode: _mode }) {
    const request = getBridgeParams({
        amount,
        client,
        destinationToken,
        feePayer,
        paymentLinkId,
        paymentMethod,
        purchaseData,
        receiver,
        sender
    });
    const prepareQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useBridgePrepare$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBridgePrepare"])(request);
    // Handle successful quote
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuoteLoader.useEffect": ()=>{
            if (prepareQuery.data) {
                onQuoteReceived(prepareQuery.data, request);
            }
        }
    }["QuoteLoader.useEffect"], [
        prepareQuery.data,
        onQuoteReceived,
        request
    ]);
    // Handle errors
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuoteLoader.useEffect": ()=>{
            if (prepareQuery.error) {
                onError(prepareQuery.error);
            }
        }
    }["QuoteLoader.useEffect"], [
        prepareQuery.error,
        onError
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        center: "both",
        flex: "column",
        fullHeight: true,
        p: "lg",
        style: {
            minHeight: "350px"
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                color: "secondaryText",
                size: "xl"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "md"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                center: true,
                color: "primaryText",
                size: "lg",
                style: {
                    fontWeight: 600
                },
                children: "Finding the best route"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "sm"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                center: true,
                color: "secondaryText",
                size: "sm",
                children: "We're searching for the most efficient path for this payment."
            })
        ]
    });
}
function getBridgeParams(args) {
    const { paymentMethod, amount, destinationToken, receiver, client, sender } = args;
    switch(paymentMethod.type){
        case "fiat":
            return {
                amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(amount, destinationToken.decimals),
                chainId: destinationToken.chainId,
                client,
                currency: paymentMethod.currency,
                enabled: !!(destinationToken && amount && client),
                onramp: paymentMethod.onramp || "coinbase",
                paymentLinkId: args.paymentLinkId,
                purchaseData: args.purchaseData,
                receiver,
                sender,
                tokenAddress: destinationToken.address,
                type: "onramp"
            };
        case "wallet":
            // if the origin token is the same as the destination token, use transfer type
            if (paymentMethod.originToken.chainId === destinationToken.chainId && paymentMethod.originToken.address.toLowerCase() === destinationToken.address.toLowerCase()) {
                return {
                    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(amount, destinationToken.decimals),
                    chainId: destinationToken.chainId,
                    client,
                    enabled: !!(destinationToken && amount && client),
                    feePayer: args.feePayer || "sender",
                    paymentLinkId: args.paymentLinkId,
                    purchaseData: args.purchaseData,
                    receiver,
                    sender: sender || paymentMethod.payerWallet.getAccount()?.address || receiver,
                    tokenAddress: destinationToken.address,
                    type: "transfer"
                };
            }
            return {
                amount: paymentMethod.action === "buy" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(amount, destinationToken.decimals) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(amount, paymentMethod.originToken.decimals),
                client,
                destinationChainId: destinationToken.chainId,
                destinationTokenAddress: destinationToken.address,
                enabled: !!(destinationToken && amount && client),
                originChainId: paymentMethod.originToken.chainId,
                originTokenAddress: paymentMethod.originToken.address,
                paymentLinkId: args.paymentLinkId,
                purchaseData: args.purchaseData,
                receiver,
                sender: sender || paymentMethod.payerWallet.getAccount()?.address || receiver,
                type: paymentMethod.action
            };
    }
} //# sourceMappingURL=QuoteLoader.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/StepRunner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepRunner",
    ()=>StepRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useStepExecutor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/hooks/useStepExecutor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/basic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/buttons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/ChainName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spacer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/text.js [app-client] (ecmascript)");
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
;
;
function StepRunner({ title, request, wallet, client, windowAdapter, onComplete, onCancel, onBack, autoStart, preparedQuote }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCustomTheme"])();
    // Use the real step executor hook
    const { currentStep, progress, executionState, onrampStatus, steps, error, start, cancel, retry } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$hooks$2f$useStepExecutor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStepExecutor"])({
        autoStart,
        client,
        onComplete: {
            "StepRunner.useStepExecutor": (completedStatuses)=>{
                onComplete(completedStatuses);
            }
        }["StepRunner.useStepExecutor"],
        wallet,
        preparedQuote,
        windowAdapter
    });
    const handleCancel = ()=>{
        cancel();
        if (onCancel) {
            onCancel();
        }
    };
    const handleRetry = ()=>{
        retry();
    };
    const getStepStatus = (stepIndex)=>{
        if (!currentStep || !steps) {
            // Not started yet
            return stepIndex === 0 ? error ? "failed" : "pending" : "pending";
        }
        const currentStepIndex = steps.findIndex((step)=>step === currentStep);
        if (stepIndex < currentStepIndex) return "completed";
        if (stepIndex === currentStepIndex && executionState === "executing") return "executing";
        if (stepIndex === currentStepIndex && error) return "failed";
        if (stepIndex === currentStepIndex && executionState === "idle" && progress === 100) return "completed";
        return "pending";
    };
    const getStatusIcon = (status)=>{
        switch(status){
            case "completed":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                    color: theme.colors.accentButtonText,
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm
                });
            case "executing":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                    color: "accentButtonText",
                    size: "sm"
                });
            case "failed":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cross1Icon"], {
                    color: "white",
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm
                });
            default:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClockIcon"], {
                    color: theme.colors.primaryText,
                    height: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].sm
                });
        }
    };
    const getStepBackgroundColor = (status)=>{
        switch(status){
            case "completed":
                return theme.colors.tertiaryBg;
            case "executing":
                return theme.colors.tertiaryBg;
            case "failed":
                return theme.colors.tertiaryBg;
            default:
                return theme.colors.tertiaryBg;
        }
    };
    const getIconBackgroundColor = (status)=>{
        switch(status){
            case "completed":
                return theme.colors.success;
            case "executing":
                return theme.colors.accentButtonBg;
            case "failed":
                return theme.colors.danger;
            default:
                return theme.colors.borderColor;
        }
    };
    const getStepDescription = (step)=>{
        const { originToken, destinationToken } = step;
        // If tokens are the same, it's likely a bridge operation
        if (originToken.chainId !== destinationToken.chainId) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "row",
                gap: "3xs",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        color: "primaryText",
                        size: "sm",
                        children: [
                            "Bridge ",
                            originToken.symbol,
                            " to",
                            " "
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$ChainName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainName"], {
                        chain: getDestinationChain(request),
                        client: client,
                        color: "primaryText",
                        short: true,
                        size: "sm"
                    })
                ]
            });
        }
        // If different tokens on same chain, it's a swap
        if (originToken.symbol !== destinationToken.symbol) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                color: "primaryText",
                size: "sm",
                children: [
                    "Swap ",
                    originToken.symbol,
                    " to ",
                    destinationToken.symbol
                ]
            });
        }
        // Fallback to step number
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
            color: "primaryText",
            size: "sm",
            children: "Process transaction"
        });
    };
    const getStepStatusText = (status)=>{
        switch(status){
            case "executing":
                return "Processing...";
            case "completed":
                return "Completed";
            case "pending":
                return "Waiting...";
            case "failed":
                return "Failed";
            default:
                return "Unknown";
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
        flex: "column",
        fullHeight: true,
        px: "md",
        pb: "md",
        pt: "md+",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalHeader"], {
                onBack: onBack,
                title: title || "Processing Payment"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                y: "xl"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                flex: "column",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        gap: "sm",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                center: "y",
                                flex: "row",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        color: "secondaryText",
                                        size: "sm",
                                        style: {
                                            flex: 1
                                        },
                                        children: "Progress"
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                        color: "primaryText",
                                        size: "sm",
                                        children: [
                                            progress,
                                            "%"
                                        ]
                                    })
                                ]
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                style: {
                                    backgroundColor: theme.colors.tertiaryBg,
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: "4px",
                                    height: "8px",
                                    overflow: "hidden",
                                    width: "100%"
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                    style: {
                                        backgroundColor: error ? theme.colors.danger : theme.colors.accentButtonBg,
                                        height: "100%",
                                        transition: "width 0.3s ease",
                                        width: `${progress}%`
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {})
                                })
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "lg"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "column",
                        gap: "sm",
                        children: [
                            request.type === "onramp" && onrampStatus ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                flex: "row",
                                gap: "md",
                                style: {
                                    alignItems: "center",
                                    backgroundColor: getStepBackgroundColor(onrampStatus),
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md,
                                    padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        center: "both",
                                        flex: "row",
                                        style: {
                                            backgroundColor: getIconBackgroundColor(onrampStatus),
                                            borderRadius: "50%",
                                            color: theme.colors.primaryButtonText,
                                            flexShrink: 0,
                                            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`,
                                            width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`
                                        },
                                        children: getStatusIcon(onrampStatus)
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                        flex: "column",
                                        gap: "3xs",
                                        style: {
                                            flex: 1
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "primaryText",
                                                size: "sm",
                                                children: request.onramp.slice(0, 1).toUpperCase() + request.onramp.slice(1)
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                color: "secondaryText",
                                                size: "xs",
                                                children: getStepStatusText(onrampStatus)
                                            })
                                        ]
                                    })
                                ]
                            }) : null,
                            steps?.map((step, index)=>{
                                const status = getStepStatus(index);
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                    flex: "row",
                                    gap: "md",
                                    style: {
                                        alignItems: "center",
                                        backgroundColor: getStepBackgroundColor(status),
                                        border: `1px solid ${theme.colors.borderColor}`,
                                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].md,
                                        padding: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].sm} ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacing"].md}`
                                    },
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                            center: "both",
                                            flex: "row",
                                            style: {
                                                backgroundColor: getIconBackgroundColor(status),
                                                borderRadius: "50%",
                                                color: theme.colors.primaryButtonText,
                                                flexShrink: 0,
                                                height: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`,
                                                width: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSize"].lg}px`
                                            },
                                            children: getStatusIcon(status)
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                                            flex: "column",
                                            gap: "3xs",
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                getStepDescription(step),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                                                    color: "secondaryText",
                                                    size: "xs",
                                                    children: getStepStatusText(status)
                                                })
                                            ]
                                        })
                                    ]
                                }, `${step.originToken.chainId}-${step.destinationToken.chainId}-${index}`);
                            })
                        ]
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "md"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        center: true,
                        color: error ? "danger" : "secondaryText",
                        size: "xs",
                        multiline: true,
                        children: error ? error.message || "An error occurred. Please try again." : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                "Keep this window open until all",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("br", {}),
                                " transactions are complete."
                            ]
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$Spacer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spacer"], {
                        y: "lg"
                    }),
                    error ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$basic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"], {
                        flex: "row",
                        gap: "md",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            fullWidth: true,
                            onClick: handleRetry,
                            variant: "primary",
                            children: "Retry"
                        })
                    }) : executionState === "idle" && progress === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        fullWidth: true,
                        onClick: start,
                        variant: "accent",
                        children: "Start Transaction"
                    }) : executionState === "executing" || executionState === "auto-starting" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$buttons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        fullWidth: true,
                        onClick: handleCancel,
                        variant: "secondary",
                        children: "Cancel Transaction"
                    }) : null
                ]
            })
        ]
    });
}
function getDestinationChain(request) {
    switch(request.type){
        case "onramp":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(request.chainId);
        case "buy":
        case "sell":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(request.destinationChainId);
        case "transfer":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])(request.chainId);
        default:
            throw new Error("Invalid quote type");
    }
} //# sourceMappingURL=StepRunner.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/BuyWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuyWidget",
    ()=>BuyWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/pay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/core/design-system/CustomThemeProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$adapters$2f$WindowAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/adapters/WindowAdapter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$AutoConnect$2f$AutoConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/AutoConnect/AutoConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$locale$2f$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/locale/en.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$Modal$2f$ConnectEmbed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/ConnectWallet/Modal/ConnectEmbed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$DynamicHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/components/DynamicHeight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$ErrorBanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/ErrorBanner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$FundWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/FundWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$details$2f$PaymentDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-details/PaymentDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$PaymentSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-selection/PaymentSelection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$success$2f$SuccessScreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/payment-success/SuccessScreen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$QuoteLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/QuoteLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$StepRunner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/react/web/ui/Bridge/StepRunner.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
function BuyWidget(props) {
    const hasFiredRenderEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuyWidget.useEffect": ()=>{
            if (hasFiredRenderEvent.current) return;
            hasFiredRenderEvent.current = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                client: props.client,
                event: "ub:ui:buy_widget:render",
                toChainId: props.chain?.id,
                toToken: props.tokenAddress
            });
        }
    }["BuyWidget.useEffect"], [
        props.client,
        props.chain?.id,
        props.tokenAddress
    ]);
    // if branding is disabled for widget, disable it for connect options too
    const connectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BuyWidget.useMemo[connectOptions]": ()=>{
            if (props.showThirdwebBranding === false) {
                return {
                    ...props.connectOptions,
                    connectModal: {
                        ...props.connectOptions?.connectModal,
                        showThirdwebBranding: false
                    }
                };
            }
            return props.connectOptions;
        }
    }["BuyWidget.useMemo[connectOptions]"], [
        props.connectOptions,
        props.showThirdwebBranding
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(BridgeWidgetContainer, {
        theme: props.theme,
        className: props.className,
        style: props.style,
        children: [
            props.connectOptions?.autoConnect !== false && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$AutoConnect$2f$AutoConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutoConnect"], {
                client: props.client,
                wallets: props.connectOptions?.wallets,
                timeout: typeof props.connectOptions?.autoConnect === "object" ? props.connectOptions?.autoConnect?.timeout : undefined,
                appMetadata: props.connectOptions?.appMetadata,
                accountAbstraction: props.connectOptions?.accountAbstraction,
                chain: props.connectOptions?.chain
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(BridgeWidgetContent, {
                ...props,
                theme: props.theme || "dark",
                currency: props.currency || "USD",
                paymentMethods: props.paymentMethods || [
                    "crypto",
                    "card"
                ],
                presetOptions: props.presetOptions || [
                    5,
                    10,
                    20
                ],
                connectOptions: connectOptions,
                showThirdwebBranding: props.showThirdwebBranding === undefined ? true : props.showThirdwebBranding
            })
        ]
    });
}
function BridgeWidgetContent(props) {
    const [screen, setScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: "1:buy-ui"
    });
    const handleError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BridgeWidgetContent.useCallback[handleError]": (error, quote)=>{
            console.error(error);
            if (quote?.type === "buy" || quote?.type === "onramp") {
                props.onError?.(error, quote);
            } else {
                props.onError?.(error, undefined);
            }
            setScreen({
                id: "error",
                preparedQuote: quote,
                error
            });
        }
    }["BridgeWidgetContent.useCallback[handleError]"], [
        props.onError
    ]);
    const handleCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BridgeWidgetContent.useCallback[handleCancel]": (preparedQuote)=>{
            if (preparedQuote?.type === "buy" || preparedQuote?.type === "onramp") {
                props.onCancel?.(preparedQuote);
            } else {
                props.onCancel?.(undefined);
            }
        }
    }["BridgeWidgetContent.useCallback[handleCancel]"], [
        props.onCancel
    ]);
    const [amountSelection, setAmountSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: "token",
        value: props.amount ?? ""
    });
    const [selectedToken, setSelectedToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BridgeWidgetContent.useState": ()=>{
            if (!props.chain?.id) {
                return undefined;
            }
            return {
                chainId: props.chain.id,
                tokenAddress: props.tokenAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NATIVE_TOKEN_ADDRESS"]
            };
        }
    }["BridgeWidgetContent.useState"]);
    if (screen.id === "1:buy-ui") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$FundWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FundWallet"], {
            theme: props.theme,
            onDisconnect: props.onDisconnect,
            client: props.client,
            connectOptions: props.connectOptions,
            onContinue: (destinationAmount, destinationToken, receiverAddress)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                    client: props.client,
                    event: "payment_selection",
                    toChainId: destinationToken.chainId,
                    toToken: destinationToken.address
                });
                setScreen({
                    id: "2:methodSelection",
                    destinationAmount,
                    destinationToken,
                    receiverAddress
                });
            },
            presetOptions: props.presetOptions,
            receiverAddress: props.receiverAddress,
            showThirdwebBranding: props.showThirdwebBranding,
            metadata: {
                title: props.title,
                description: props.description,
                image: props.image
            },
            buttonLabel: props.buttonLabel,
            currency: props.currency,
            selectedToken: selectedToken,
            setSelectedToken: setSelectedToken,
            amountSelection: amountSelection,
            setAmountSelection: setAmountSelection
        });
    }
    if (screen.id === "2:methodSelection") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$selection$2f$PaymentSelection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentSelection"], {
            // from props
            client: props.client,
            connectLocale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$locale$2f$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            connectOptions: props.connectOptions,
            paymentMethods: props.paymentMethods,
            currency: props.currency,
            supportedTokens: props.supportedTokens,
            country: props.country,
            // others
            destinationToken: screen.destinationToken,
            destinationAmount: screen.destinationAmount,
            receiverAddress: screen.receiverAddress,
            feePayer: undefined,
            onBack: ()=>{
                setScreen({
                    id: "1:buy-ui"
                });
            },
            onError: (error)=>{
                handleError(error, undefined);
            },
            onPaymentMethodSelected: (paymentMethod)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                    chainId: paymentMethod.type === "wallet" ? paymentMethod.originToken.chainId : undefined,
                    client: props.client,
                    event: "ub:ui:loading_quote:fund_wallet",
                    fromToken: paymentMethod.type === "wallet" ? paymentMethod.originToken.address : undefined,
                    toChainId: screen.destinationToken.chainId,
                    toToken: screen.destinationToken.address
                });
                setScreen({
                    ...screen,
                    id: "3:load-quote",
                    paymentMethod
                });
            }
        });
    }
    if (screen.id === "3:load-quote") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$QuoteLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuoteLoader"], {
            // from props
            paymentLinkId: props.paymentLinkId,
            purchaseData: props.purchaseData,
            client: props.client,
            // others
            sender: undefined,
            mode: "fund_wallet",
            feePayer: undefined,
            amount: screen.destinationAmount,
            destinationToken: screen.destinationToken,
            onBack: ()=>{
                setScreen({
                    ...screen,
                    id: "2:methodSelection"
                });
            },
            onError: (error)=>{
                handleError(error, undefined);
            },
            onQuoteReceived: (preparedQuote, request)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$pay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPayEvent"])({
                    chainId: preparedQuote.type === "transfer" ? preparedQuote.intent.chainId : preparedQuote.type === "onramp" ? preparedQuote.intent.chainId : preparedQuote.intent.originChainId,
                    client: props.client,
                    event: "payment_details",
                    fromToken: preparedQuote.type === "transfer" ? preparedQuote.intent.tokenAddress : preparedQuote.type === "onramp" ? preparedQuote.intent.tokenAddress : preparedQuote.intent.originTokenAddress,
                    toChainId: preparedQuote.type === "transfer" ? preparedQuote.intent.chainId : preparedQuote.type === "onramp" ? preparedQuote.intent.chainId : preparedQuote.intent.destinationChainId,
                    toToken: preparedQuote.type === "transfer" ? preparedQuote.intent.tokenAddress : preparedQuote.type === "onramp" ? preparedQuote.intent.tokenAddress : preparedQuote.intent.destinationTokenAddress,
                    walletAddress: screen.paymentMethod.payerWallet?.getAccount()?.address,
                    walletType: screen.paymentMethod.payerWallet?.id
                });
                setScreen({
                    ...screen,
                    id: "4:preview",
                    preparedQuote,
                    request
                });
            },
            paymentMethod: screen.paymentMethod,
            receiver: screen.receiverAddress
        });
    }
    if (screen.id === "4:preview") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$details$2f$PaymentDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentDetails"], {
            // from props
            client: props.client,
            currency: props.currency,
            metadata: {
                title: props.title,
                description: props.description
            },
            // others
            confirmButtonLabel: undefined,
            onBack: ()=>{
                setScreen({
                    ...screen,
                    id: "2:methodSelection"
                });
            },
            onConfirm: ()=>{
                setScreen({
                    ...screen,
                    id: "5:execute"
                });
            },
            onError: (error)=>{
                handleError(error, screen.preparedQuote);
            },
            paymentMethod: screen.paymentMethod,
            preparedQuote: screen.preparedQuote,
            modeInfo: {
                mode: "fund_wallet"
            }
        });
    }
    if (screen.id === "5:execute") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$StepRunner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepRunner"], {
            // from props
            client: props.client,
            // others
            title: undefined,
            preparedQuote: screen.preparedQuote,
            autoStart: true,
            onBack: ()=>{
                setScreen({
                    ...screen,
                    id: "4:preview"
                });
            },
            onCancel: ()=>{
                handleCancel(screen.preparedQuote);
            },
            onComplete: (completedStatuses)=>{
                if (screen.preparedQuote.type === "buy" || screen.preparedQuote.type === "onramp") {
                    props.onSuccess?.({
                        quote: screen.preparedQuote,
                        statuses: completedStatuses
                    });
                }
                setScreen({
                    id: "6:success",
                    preparedQuote: screen.preparedQuote,
                    completedStatuses
                });
            },
            request: screen.request,
            wallet: screen.paymentMethod.payerWallet,
            windowAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$adapters$2f$WindowAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webWindowAdapter"]
        });
    }
    if (screen.id === "6:success") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$payment$2d$success$2f$SuccessScreen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuccessScreen"], {
            type: "payment-success",
            // from props
            client: props.client,
            hasPaymentId: !!props.paymentLinkId,
            completedStatuses: screen.completedStatuses,
            // others
            onDone: ()=>{
                setScreen({
                    id: "1:buy-ui"
                });
            },
            preparedQuote: screen.preparedQuote,
            showContinueWithTx: false,
            windowAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$adapters$2f$WindowAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webWindowAdapter"]
        });
    }
    if (screen.id === "error") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$Bridge$2f$ErrorBanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBanner"], {
            client: props.client,
            error: screen.error,
            onCancel: ()=>{
                setScreen({
                    id: "1:buy-ui"
                });
                handleCancel(screen.preparedQuote);
            },
            onRetry: ()=>{
                setScreen({
                    id: "1:buy-ui"
                });
            }
        });
    }
    return null;
}
/**
 * @internal
 */ function BridgeWidgetContainer(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$core$2f$design$2d$system$2f$CustomThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomThemeProvider"], {
        theme: props.theme || "dark",
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$ConnectWallet$2f$Modal$2f$ConnectEmbed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbedContainer"], {
            className: props.className,
            modalSize: "compact",
            style: props.style,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$react$2f$web$2f$ui$2f$components$2f$DynamicHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicHeight"], {
                children: props.children
            })
        })
    });
} //# sourceMappingURL=BuyWidget.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_react_web_ui_Bridge_085fdf92._.js.map