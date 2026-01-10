(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function CheckCircleIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](CheckCircleIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/custom.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "custom",
    ()=>custom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$createTransport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/createTransport.js [app-client] (ecmascript)");
;
function custom(provider, config = {}) {
    const { key = 'custom', methods, name = 'Custom Provider', retryDelay } = config;
    return ({ retryCount: defaultRetryCount })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$createTransport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransport"])({
            key,
            methods,
            name,
            request: provider.request.bind(provider),
            retryCount: config.retryCount ?? defaultRetryCount,
            retryDelay,
            type: 'custom'
        });
} //# sourceMappingURL=custom.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/add-chain-to-default-chains.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToDefaultChains",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/default-supported-chains.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function t(t) {
    let n = t.filter((o)=>!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUPPORTED_CHAIN_IDS"].has(o.id));
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUPPORTED_CHAINS"].concat(n);
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "B",
    ()=>i,
    "C",
    ()=>n,
    "F",
    ()=>d,
    "H",
    ()=>o,
    "R",
    ()=>l,
    "S",
    ()=>p,
    "a",
    ()=>c,
    "b",
    ()=>r,
    "c",
    ()=>a,
    "d",
    ()=>s,
    "e",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "BottomPusherContainer",
    componentId: "sc-cb963810-0"
})([
    "display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;margin-top:auto;gap:16px;flex-grow:100;"
]), t = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CenteredItem",
    componentId: "sc-cb963810-1"
})([
    "display:flex;flex-direction:column;align-items:center;justify-content:center;flex-grow:1;width:100%;"
]), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "HorizontallyCenteredItem",
    componentId: "sc-cb963810-2"
})([
    "display:flex;flex-direction:column;align-items:center;width:100%;"
]), n = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(t).withConfig({
    displayName: "CenteredItemWithPadding",
    componentId: "sc-cb963810-3"
})([
    "padding:20px 0;"
]), a = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(t).withConfig({
    displayName: "CenteredItemWithGap",
    componentId: "sc-cb963810-4"
})([
    "gap:16px;"
]), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FlexContainer",
    componentId: "sc-cb963810-5"
})([
    "display:flex;flex-direction:column;width:100%;"
]), c = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FixedGappedContainer",
    componentId: "sc-cb963810-6"
})([
    "display:flex;flex-direction:column;gap:8px;"
]), p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledCalloutSection",
    componentId: "sc-cb963810-8"
})([
    "display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;text-align:left;gap:8px;padding:16px;margin-top:16px;margin-bottom:16px;width:100%;background:var(--privy-color-background-2);border-radius:var(--privy-border-radius-md);&& h4{color:var(--privy-color-foreground-3);font-size:14px;text-decoration:underline;font-weight:medium;}&& p{color:var(--privy-color-foreground-3);font-size:14px;}"
]), r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "RefactorSpacerTop",
    componentId: "sc-cb963810-9"
})([
    "height:16px;"
]), l = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "RefactorSpacerBottom",
    componentId: "sc-cb963810-10"
})([
    "height:12px;"
]), s = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ConfigurableSpacer",
    componentId: "sc-cb963810-12"
})([
    "height:",
    "px;"
], (e)=>e.height ?? "12");
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowLeftIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function ArrowLeftIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](ArrowLeftIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/QuestionMarkCircleIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function QuestionMarkCircleIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](QuestionMarkCircleIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function XMarkIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](XMarkIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "B",
    ()=>s,
    "M",
    ()=>y,
    "T",
    ()=>h,
    "a",
    ()=>v
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowLeftIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$QuestionMarkCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/QuestionMarkCircleIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function t(c) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 460 40",
        ...c,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            fill: c.color || "var(--privy-color-foreground)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M0 15.4v15.38h4.64V19.96h3.58c2.47 0 3.63-.01 3.77-.02 1-.08 1.49-.15 2.18-.3a9.45 9.45 0 0 0 4.6-2.37c1.66-1.57 2.64-3.87 2.81-6.56.02-.3.02-1.19 0-1.49-.1-1.77-.56-3.35-1.36-4.72A8.84 8.84 0 0 0 15.14.57c-.93-.3-1.75-.43-3.09-.54C11.9.02 10.2 0 5.93 0H0ZM10.85 4c1.85.05 3.1.45 4.16 1.3.22.17.54.49.69.68a5.97 5.97 0 0 1 1.19 3.13c.04.35.04 1.36 0 1.71-.08.68-.23 1.3-.44 1.85a4.8 4.8 0 0 1-1.09 1.68A5.63 5.63 0 0 1 12 15.92c-.6.08-.4.08-4.01.09H4.64V3.98h2.9c1.6 0 3.08 0 3.31.02ZM187.65 5.71v5.72h-.27l-.09-.14a15.9 15.9 0 0 0-1.21-1.73c-.43-.5-1-.95-1.7-1.36-.54-.3-1.05-.5-1.73-.63a8.98 8.98 0 0 0-1.7-.17 8.84 8.84 0 0 0-7.8 4.03 12.95 12.95 0 0 0-2.03 6.39c-.07.98-.06 2.15.02 3.13.2 2.47.87 4.53 2.02 6.25a8.98 8.98 0 0 0 10.22 3.65 6.5 6.5 0 0 0 2.8-1.93c.41-.51.84-1.1 1.1-1.55l.1-.17h.37v3.58h4.38V0h-4.48Zm-5.24 5.54c1.3.14 2.3.6 3.17 1.48.9.9 1.5 2.09 1.85 3.64.36 1.6.39 3.72.06 5.43a8.13 8.13 0 0 1-1.54 3.62 5.1 5.1 0 0 1-3.93 1.96 6.13 6.13 0 0 1-2.32-.31 5.87 5.87 0 0 1-3.33-3.5c-.39-1-.62-2.05-.72-3.32-.03-.32-.04-1.35-.02-1.73.08-1.56.4-2.91.96-4.05a6.2 6.2 0 0 1 1.06-1.58 5.08 5.08 0 0 1 3.6-1.66c.25-.02.9 0 1.16.02ZM210.07 15.39l.01 15.38h4.38l.01-3.57h.37l.09.15c.24.44.84 1.26 1.21 1.7a6.79 6.79 0 0 0 2.57 1.75 9.3 9.3 0 0 0 6.86-.49 9.28 9.28 0 0 0 4.05-4.07A13.05 13.05 0 0 0 231 21.6c.21-1.73.18-3.7-.09-5.32a13.03 13.03 0 0 0-1.5-4.3 9.1 9.1 0 0 0-3.75-3.63 9.15 9.15 0 0 0-4.43-.96 7.46 7.46 0 0 0-2.8.5A7.07 7.07 0 0 0 216 9.7c-.4.52-.82 1.12-1.1 1.59l-.07.14h-.27V0h-4.5Zm11.13-4.14c1.07.1 1.94.44 2.7 1.04a6.1 6.1 0 0 1 1.64 1.98c.43.84.78 2 .94 3.11.15 1.16.16 2.4.02 3.54a9.34 9.34 0 0 1-1.39 4.03 5.33 5.33 0 0 1-2.69 2.15c-.9.3-2.04.38-3.06.2a5.14 5.14 0 0 1-3.45-2.37 6.03 6.03 0 0 1-.45-.8c-.5-1.03-.8-2.2-.92-3.58-.04-.49-.06-.89-.05-1.53.01-.76.05-1.23.13-1.85.38-2.53 1.47-4.38 3.15-5.31a5.46 5.46 0 0 1 2.3-.63 10 10 0 0 1 1.13.02ZM69.05 2.17l-.01 2.77V7.7h-3.36v3.6h3.36v6.8l.01 7.15c.06 1.4.4 2.44 1.1 3.37a5.8 5.8 0 0 0 2.97 2.07c.91.3 1.83.42 2.9.38a8.71 8.71 0 0 0 2.66-.48l-.8-3.7-.38.06a4.96 4.96 0 0 1-2.43-.06c-.33-.1-.56-.25-.8-.49-.4-.41-.6-.88-.7-1.67-.02-.2-.02-.62-.03-6.82v-6.6h4.73V7.7h-4.73V2.16h-4.49ZM133.34 2.17V7.7h-3.39v3.6h3.38v6.9l.01 7.17a5.66 5.66 0 0 0 2.36 4.49c.85.6 2.03 1.03 3.26 1.17.85.1 2.03.05 2.81-.1.3-.06.75-.18 1-.26l.2-.06v-.05l-.81-3.67-.37.06a4.99 4.99 0 0 1-1.8.09c-.85-.13-1.32-.4-1.7-.97a2.63 2.63 0 0 1-.39-1.04c-.06-.4-.06 0-.06-7.1V11.3h4.7V7.7h-4.7l-.01-2.77V2.16h-4.49ZM293.41 2.36a14.56 14.56 0 0 0-13.7 16.07 14.59 14.59 0 0 0 21.86 11.08 14.5 14.5 0 0 0 7.11-14.07 14.61 14.61 0 0 0-6.53-10.73 14.49 14.49 0 0 0-8.74-2.35ZM350.8 2.36a10.17 10.17 0 0 0-7.56 4.2c-.16.2-.45.63-.58.83l-.05.1h-.47l-.01-4.36h-7.36v36.4h7.82V27.27h.49l.05.07a11.3 11.3 0 0 0 7.49 4.15 10.52 10.52 0 0 0 9.38-4.1c1.66-2.1 2.73-4.9 3.07-8.06.1-.87.13-1.4.13-2.37 0-.8 0-1.1-.07-1.76a15.95 15.95 0 0 0-3.23-8.72 12.8 12.8 0 0 0-1.85-1.84 10.49 10.49 0 0 0-7.26-2.28Zm-.94 6.05c1.27.15 2.33.65 3.2 1.5.98.96 1.67 2.31 2.03 4 .34 1.57.38 3.68.12 5.39a9.78 9.78 0 0 1-1.04 3.25c-.14.25-.44.69-.6.89a5.35 5.35 0 0 1-4.31 2.07 5.25 5.25 0 0 1-4.41-1.9 7.35 7.35 0 0 1-1.26-2.32 14.09 14.09 0 0 1-.62-4.83c.05-1.98.38-3.53 1.02-4.85a5.63 5.63 0 0 1 2.5-2.65c.66-.34 1.3-.5 2.14-.58.18-.02 1.04 0 1.23.03ZM363.63 3.1l-.01 3.2v3.16h1.43c1.26.01 1.44.02 1.54.04.42.09.66.28.79.62.08.23.08.08.08 2.96a911.57 911.57 0 0 1 .03 10.18v7.54h7.82v-7.4l.01-7.83c.03-.94.11-1.63.27-2.28.46-1.9 1.54-2.93 3.35-3.23.52-.08.2-.08 5-.08h4.4V3.08h-3.1c-3.48 0-3.91.01-4.67.1-1.83.2-3.04.79-3.96 1.88-.5.6-.9 1.32-1.26 2.26l-.06.17h-.46V3.09h-5.6c-4.46 0-5.6 0-5.6.02ZM390.8 16.95V30.8h3.87l3.86-.01V3.09h-7.73ZM400.6 3.1l-.01.4v.38l4.66 13.4 4.69 13.47.02.05h10.3l.03-.05 4.67-13.45 4.67-13.4V3.1h-7.43l-6.7 19.26h-.5l-3.28-9.5-3.31-9.64-.05-.12h-3.88l-3.88.01ZM430.98 3.1c-.01 0-.02.19-.02.4v.39l5.08 14.59c2.8 8.02 5.08 14.6 5.08 14.61.01.02-.22.02-4.8.02h-4.82v6.42h4.95c5.09 0 5.23 0 5.87-.06 3.15-.28 5.29-1.63 6.63-4.15.28-.55.44-.95.87-2.16L459 6.78l1-2.89v-.8h-7.43l-6.69 19.26h-.5l-3.27-9.46-3.31-9.64-.06-.16h-3.88l-3.88.01ZM36.57 7.36c-1.36.1-2.6.6-3.62 1.45a5.65 5.65 0 0 0-1.67 2.42l-.05.13H31V7.7h-4.35v23.08h4.5v-7.3c0-8 0-7.34.08-7.82a4.89 4.89 0 0 1 2.06-3.18c.83-.58 1.74-.89 2.87-.98a11.87 11.87 0 0 1 2.8.25H39v-4.3l-.21-.02c-.61-.07-1.74-.1-2.22-.07ZM51.08 7.41c-2.33.12-4.3.84-5.95 2.16a9.89 9.89 0 0 0-2.03 2.2 12.5 12.5 0 0 0-2 5.78 18.04 18.04 0 0 0 0 3.65 12.13 12.13 0 0 0 2.26 6.05 9.74 9.74 0 0 0 5 3.52c2.11.64 4.7.64 6.8 0a9.78 9.78 0 0 0 4.88-3.37c1.38-1.78 2.19-4 2.4-6.58.13-1.46.06-3.06-.18-4.42a11.24 11.24 0 0 0-3.58-6.6 10 10 0 0 0-5.75-2.35c-.56-.06-1.31-.07-1.85-.04Zm1.42 3.78c.88.1 1.62.34 2.28.75a6.13 6.13 0 0 1 1.99 2.15 10.31 10.31 0 0 1 1.2 5c.02 1.23-.12 2.44-.42 3.51a7.14 7.14 0 0 1-1.81 3.32c-.61.6-1.2.98-1.95 1.24a6 6 0 0 1-2 .3 5.7 5.7 0 0 1-2.72-.6 5 5 0 0 1-1.28-.94A7.1 7.1 0 0 1 46 22.73c-.57-1.99-.6-4.46-.08-6.5a7.24 7.24 0 0 1 2.03-3.67 5.13 5.13 0 0 1 3.35-1.4 11 11 0 0 1 1.2.03ZM92.05 7.4c-.96.06-1.56.15-2.3.33a9.62 9.62 0 0 0-6.09 4.66 13.5 13.5 0 0 0-1.71 7c0 .83 0 1.04.06 1.6.16 1.77.58 3.32 1.29 4.7A9.72 9.72 0 0 0 90.28 31c1.84.37 4.08.32 5.85-.13a9.07 9.07 0 0 0 5.02-3.1A7.64 7.64 0 0 0 102.5 25l-2.11-.39-2.11-.38-.08.13a4.72 4.72 0 0 1-2.35 2.55 6.3 6.3 0 0 1-2.23.58c-.29.03-1.13.03-1.44 0a6.35 6.35 0 0 1-3.02-1.04 5.93 5.93 0 0 1-2.02-2.43 8.44 8.44 0 0 1-.72-3.18v-.26h16.38v-.81c0-1.83-.06-2.76-.25-3.87-.2-1.22-.53-2.24-1.05-3.28a8.9 8.9 0 0 0-2.66-3.26 10.1 10.1 0 0 0-5.34-1.94 18.3 18.3 0 0 0-1.46-.03Zm1.3 3.75c1.2.13 2.19.55 3.05 1.3a5.8 5.8 0 0 1 1.78 2.96c.13.51.21 1.17.21 1.66v.15H86.43v-.12c.08-.97.3-1.78.72-2.61.5-1 1.2-1.8 2.14-2.42a5.32 5.32 0 0 1 2.9-.95c.2-.01.97 0 1.17.03ZM116.79 7.41c-2 .1-3.73.65-5.22 1.65a10.7 10.7 0 0 0-4.25 6.06 16.1 16.1 0 0 0-.5 5.8c.2 2.17.84 4.13 1.88 5.76.58.9 1.32 1.73 2.15 2.4a9.37 9.37 0 0 0 3.6 1.8 12.06 12.06 0 0 0 3.92.34 10.2 10.2 0 0 0 3.84-.95 8.31 8.31 0 0 0 4.76-6.75l.01-.04h-4.37l-.05.16a4.87 4.87 0 0 1-4.24 3.75c-.59.07-1.32.06-1.93-.05a5.47 5.47 0 0 1-3.5-2.27c-.56-.75-1-1.73-1.26-2.79a13.8 13.8 0 0 1-.16-5.24 7.77 7.77 0 0 1 2.1-4.3 5.48 5.48 0 0 1 2.15-1.3 6.4 6.4 0 0 1 3.89.1c.59.21 1.03.5 1.5.96a5.32 5.32 0 0 1 1.46 2.5l.04.15h4.37v-.06a8.22 8.22 0 0 0-5.31-6.94 10.98 10.98 0 0 0-4.88-.74ZM156.2 7.41a9.87 9.87 0 0 0-6 2.29 11.02 11.02 0 0 0-3.41 5.43c-.52 1.78-.68 3.9-.48 5.97.17 1.8.63 3.38 1.37 4.8a9.68 9.68 0 0 0 5.91 4.86c1.65.48 3.63.61 5.53.36 3.72-.49 6.55-2.62 7.56-5.69.12-.39.13-.42.1-.43-.02 0-4.13-.75-4.19-.75-.03 0-.04 0-.1.16-.18.42-.45.9-.72 1.22-.16.2-.49.53-.7.7-.67.54-1.5.9-2.43 1.08-.48.08-.83.11-1.41.11-.64 0-1.07-.04-1.6-.15a5.76 5.76 0 0 1-3.93-2.83 8 8 0 0 1-.99-3.79v-.16h16.38v-1.11l-.02-1.43c-.1-2.25-.53-4-1.35-5.59a9.24 9.24 0 0 0-6.18-4.75c-1.04-.26-2.2-.36-3.33-.3Zm1.45 3.74a5.35 5.35 0 0 1 3.66 1.94 6.1 6.1 0 0 1 1.38 4.01v.12h-11.97v-.06c0-.02 0-.14.02-.25a6.6 6.6 0 0 1 2.15-4.32 5.73 5.73 0 0 1 3.5-1.46c.25-.02 1 0 1.26.02ZM233.58 7.82l8.37 23.22a49.22 49.22 0 0 1-.67 1.9 5.36 5.36 0 0 1-1.14 1.8c-.41.4-.82.58-1.48.69-.27.04-1.03.03-1.35 0a8.05 8.05 0 0 1-1.1-.23l-1.08 3.67c0 .02.32.14.66.22.83.21 1.57.29 2.56.28.56-.01.8-.03 1.24-.1 2.71-.4 4.66-2.09 5.86-5.08l9.64-26.44c0-.02-4.82-.06-4.83-.05l-2.93 8.96-2.91 8.94h-.24l-.22-.65-2.91-8.95-2.7-8.3H233.53ZM293.05 35.8c-1.18.04-1.93.09-2.8.16-2.52.24-4.53.69-5.43 1.23-.7.41-.76.86-.2 1.28.88.66 3.29 1.19 6.36 1.4a48.55 48.55 0 0 0 5.75.05c3.47-.19 6.24-.78 7.11-1.5.22-.19.3-.34.3-.53 0-.1 0-.12-.04-.22-.35-.69-2.32-1.3-5.25-1.63a41.09 41.09 0 0 0-5.8-.24Zm0 0"
            })
        })
    });
}
let d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "TermsAndConditionsContainer",
    componentId: "sc-ff3bd734-0"
})([
    "margin-top:16px;font-size:13px;text-align:center;color:var(--privy-color-foreground-3);display:block;&& > a{color:var(--privy-color-accent);}"
]);
function h({ app: { legal: { privacyPolicyUrl: e, termsAndConditionsUrl: a, requireUsersAcceptTerms: i } }, alwaysShowImplicitConsent: r }) {
    let n = !(!e || !a);
    return i && !r || !a && !e ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(d, {}) : /*#__PURE__*/ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(d, {
        children: [
            "By logging in I agree to the",
            " ",
            a && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
                href: a,
                target: "_blank",
                children: n ? "Terms" : "Terms of Service"
            }),
            n && " & ",
            e && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
                href: e,
                target: "_blank",
                children: "Privacy Policy"
            })
        ]
    });
}
const s = ({ className: c })=>{
    let { appearance: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(v, {
        className: c,
        children: e.footerLogo ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(p, {
            href: "https://www.privy.io/",
            target: "_blank",
            id: "protected-by-privy",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(t, {
                color: "currentColor",
                height: 13,
                width: 150
            })
        })
    });
};
let p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "PrivyLink",
    componentId: "sc-ff3bd734-1"
})([
    "&&{padding:0;color:var(--privy-color-foreground-3);}"
]);
const v = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ModalFooter",
    componentId: "sc-ff3bd734-2"
})([
    "display:flex;align-items:center;justify-content:center;padding-top:8px;padding-bottom:12px;gap:8px;font-size:13px;&& a{padding:0.5rem 0;&:hover{text-decoration:none;}}@media all and (display-mode:standalone){padding-bottom:30px;}"
]), m = ({ backFn: c })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(x, {
            onClick: c,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                height: "16px",
                width: "16px",
                strokeWidth: 2
            })
        })
    }), f = ({ infoFn: c })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(u, {
            "aria-label": "info",
            onClick: c,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$QuestionMarkCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                height: "22px",
                width: "22px",
                strokeWidth: 2
            })
        })
    }), g = (c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(x, {
            "aria-label": "close modal",
            onClick: c.onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                height: "16px",
                width: "16px",
                strokeWidth: 2
            })
        })
    }), y = ({ backFn: e, infoFn: i, onClose: r, title: n, closeable: t = !0, className: d })=>{
    let { closePrivyModal: h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(w, {
        className: d,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(b, {
                children: [
                    e && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(m, {
                        backFn: e
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            height: 24
                        }
                    }),
                    i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(f, {
                        infoFn: i
                    })
                ]
            }),
            n && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Z, {
                id: "privy-dialog-title",
                children: n
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(C, {
                children: !s.render.standalone && t && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(g, {
                    onClose: r || (()=>h())
                })
            })
        ]
    });
};
let x = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "StyledButton",
    componentId: "sc-bc3cd0df-0"
})([
    "&&{cursor:pointer;display:flex;opacity:0.6;background-color:var(--privy-color-background-2);border-radius:var(--privy-border-radius-full);padding:4px;> svg{margin:auto;color:var(--privy-color-foreground);}:hover{opacity:1;}}"
]), u = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(x).withConfig({
    displayName: "TransparentStyledButton",
    componentId: "sc-bc3cd0df-1"
})([
    "&&{background-color:transparent;}"
]), w = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledHeader",
    componentId: "sc-bc3cd0df-2"
})([
    "padding:16px 0;display:flex;align-items:center;justify-content:space-between;h2{font-size:16px;line-height:24px;font-weight:600;color:var(--privy-color-foreground);}"
]), b = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "LeftActionContainer",
    componentId: "sc-bc3cd0df-3"
})([
    "flex:1;align-items:center;display:flex;gap:8px;"
]), C = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "RightActionContainer",
    componentId: "sc-bc3cd0df-4"
})([
    "flex:1;display:flex;justify-content:flex-end;"
]), Z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TitleContainer",
    componentId: "sc-bc3cd0df-5"
})([
    "overflow:hidden;white-space:nowrap;max-width:100%;text-overflow:ellipsis;text-align:center;color:var(--privy-color-foreground-2);"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenHeader-Biz1wq02.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>r,
    "S",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
;
const o = ({ title: n, description: o, children: r, ...c })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(l, {
        ...c,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                    children: n
                }),
                "string" == typeof o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    children: o
                }) : o,
                r
            ]
        })
    }), r = ({ title: i, description: n, icon: o, children: r, ...l })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(c, {
        ...l,
        children: [
            o || null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                children: i
            }),
            n && "string" == typeof n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                children: n
            }) : n,
            r
        ]
    });
let l = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledSection",
    componentId: "sc-523a75d6-1"
})([
    "display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;text-align:left;gap:8px;width:100%;margin-bottom:24px;&& h3{font-size:17px;color:var(--privy-color-foreground);}&& p{color:var(--privy-color-foreground-2);font-size:14px;}"
]), c = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(l).withConfig({
    displayName: "CenteredStyledSection",
    componentId: "sc-523a75d6-2"
})([
    "align-items:center;text-align:center;gap:16px;h3{margin-bottom:24px;}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/FundWalletMethodHeader-CS84Ots9.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/get-is-unified-wallet-gMDXpX6C.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-client] (ecmascript)");
;
;
;
function t({ title: t }) {
    let { currentScreen: i, navigateBack: r, navigate: d, data: o, setModalData: u } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M"], {
        title: t,
        backFn: "ManualTransferScreen" === i ? r : i === o?.funding?.methodScreen ? o.funding.comingFromSendTransactionScreen ? ()=>d("SendTransactionScreen") : void 0 : o?.funding?.methodScreen ? ()=>{
            let n = o.funding;
            n.usingDefaultFundingMethod && (n.usingDefaultFundingMethod = !1), u({
                funding: n,
                solanaFundingData: o?.solanaFundingData
            }), d(n.methodScreen);
        } : void 0
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-CJMgUOnw.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "N",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
;
const t = ({ size: n, centerIcon: t })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(r, {
        $size: n,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(o, {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(a, {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(d, {}),
                t ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(s, {
                    children: t
                }) : null
            ]
        })
    });
let r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "LoadingContainer",
    componentId: "sc-ebc93df8-0"
})([
    "--spinner-size:",
    ";display:inline-flex;justify-content:center;align-items:center;@media all and (display-mode:standalone){margin-bottom:30px;}"
], (e)=>e.$size ? e.$size : "96px"), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "SpinnerContainer",
    componentId: "sc-ebc93df8-1"
})([
    "position:relative;height:var(--spinner-size);width:var(--spinner-size);opacity:1;animation:fadein 200ms ease;"
]), s = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CenterIconContainer",
    componentId: "sc-ebc93df8-2"
})([
    "position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;svg,img{width:calc(var(--spinner-size) * 0.4);height:calc(var(--spinner-size) * 0.4);border-radius:var(--privy-border-radius-full);}"
]), a = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CircleFixed",
    componentId: "sc-ebc93df8-3"
})([
    "position:absolute;top:0;right:0;bottom:0;left:0;width:var(--spinner-size);height:var(--spinner-size);&&{border:4px solid var(--privy-color-border-default);border-radius:50%;}"
]), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CircleRotate",
    componentId: "sc-ebc93df8-4"
})([
    "position:absolute;top:0;right:0;bottom:0;left:0;width:var(--spinner-size);height:var(--spinner-size);animation:spin 1200ms linear infinite;&&{border:4px solid;border-color:var(--privy-color-icon-subtle) transparent transparent transparent;border-radius:50%;}@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetSolPrice-Cfm8o9C5.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "u",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-client] (ecmascript)");
;
;
const t = ({ enabled: t = !0 } = {})=>{
    let { showFiatPrices: i, getUsdPriceForSol: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), [c, l] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!0), [s, n] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(void 0), [d, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(void 0);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            if (i && t) try {
                l(!0);
                let r = await a();
                r ? f(r) : n(Error("Unable to fetch SOL price"));
            } catch (r) {
                n(r);
            } finally{
                l(!1);
            }
            else l(!1);
        })();
    }, []), {
        solPrice: d,
        isSolPriceLoading: c,
        solPriceError: s
    };
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetTokenPrice-CDPxMEO-.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "u",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$add$2d$chain$2d$to$2d$default$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/add-chain-to-default-chains.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetSolPrice$2d$Cfm8o9C5$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetSolPrice-Cfm8o9C5.mjs [app-client] (ecmascript)");
;
;
;
;
;
function c(c) {
    let { tokenPrice: a, isTokenPriceLoading: s, tokenPriceError: l } = ((t)=>{
        let { showFiatPrices: c, getUsdTokenPrice: a, chains: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), [l, P] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!0), [d, k] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(void 0), [m, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(void 0);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            t ||= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s"];
            let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$add$2d$chain$2d$to$2d$default$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToDefaultChains"])(s).find((r)=>r.id === Number(t));
            (async ()=>{
                if (c) {
                    if (!r) return P(!1), void k(Error(`Unable to fetch token price on chain id ${t}`));
                    try {
                        P(!0);
                        let e = await a(r);
                        e ? f(e) : k(Error(`Unable to fetch token price on chain id ${r.id}`));
                    } catch (r) {
                        k(r);
                    } finally{
                        P(!1);
                    }
                } else P(!1);
            })();
        }, [
            t
        ]), {
            tokenPrice: m,
            isTokenPriceLoading: l,
            tokenPriceError: d
        };
    })("solana" === c ? -1 : c), { solPrice: P, isSolPriceLoading: d, solPriceError: k } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetSolPrice$2d$Cfm8o9C5$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])({
        enabled: "solana" === c
    });
    return "solana" === c ? {
        tokenPrice: P,
        isTokenPriceLoading: d,
        tokenPriceError: k
    } : {
        tokenPrice: a,
        isTokenPriceLoading: s,
        tokenPriceError: l
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/analytics-mkkvFRju.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "O",
    ()=>t
]);
const t = "sdk_fiat_on_ramp_completed_with_status";
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/reservoir-kvLjIrEo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "R",
    ()=>h,
    "a",
    ()=>s,
    "b",
    ()=>r,
    "c",
    ()=>d,
    "d",
    ()=>n,
    "g",
    ()=>u,
    "t",
    ()=>o,
    "u",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-client] (ecmascript)");
;
;
const r = 792703809, s = "11111111111111111111111111111111", n = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
let i = "0x0000000000000000000000000000000000000000";
const o = ({ appId: t, originCurrency: e, destinationCurrency: a, ...r })=>({
        tradeType: "EXPECTED_OUTPUT",
        originCurrency: e ?? i,
        destinationCurrency: a ?? i,
        referrer: `privy|${t}`,
        ...r
    });
let c = "https://api.relay.link", l = "https://api.testnets.relay.link";
const u = async ({ input: t, isTestnet: e })=>{
    let a = await fetch((e ? l : c) + "/quote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(t)
    }), r = await a.json();
    if (!(a.ok || "string" == typeof r.message && r.message.startsWith("Invalid address"))) throw console.error("Relay error:", r), Error(r.message ?? "Error fetching quote from relay");
    return r;
}, d = (t)=>{
    let e = t.steps[0]?.items?.[0];
    if (e) return {
        from: e.data.from,
        to: e.data.to,
        value: Number(e.data.value),
        chainId: Number(e.data.chainId),
        data: e.data.data
    };
};
async function y({ transactionHash: t, isTestnet: e }) {
    let a = await fetch((e ? l : c) + "/requests/v2?hash=" + t), r = await a.json();
    if (!a.ok) {
        if ("message" in r && "string" == typeof r.message) throw Error(r.message);
        throw Error("Error fetching request from relay");
    }
    return r.requests.at(0)?.status ?? "pending";
}
function f({ transactionHash: e, isTestnet: a, bridgingStatus: r, setBridgingStatus: s, onSuccess: n, onFailure: i }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (e && r) {
            if ([
                "delayed",
                "waiting",
                "pending"
            ].includes(r)) {
                let t = setInterval(async ()=>{
                    try {
                        let t = await y({
                            transactionHash: e,
                            isTestnet: a
                        });
                        s(t);
                    } catch (t) {
                        console.error(t);
                    }
                }, 1e3);
                return ()=>clearInterval(t);
            }
            "success" === r ? n({
                transactionHash: e
            }) : [
                "refund",
                "failure"
            ].includes(r) && i({
                error: new h(e, a)
            });
        }
    }, [
        r,
        e,
        a
    ]);
}
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"] {
    constructor(t, e){
        super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.", void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"].TRANSACTION_FAILURE), this.relayLink = e ? `https://testnets.relay.link/transaction/${t}` : `https://relay.link/transaction/${t}`;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getChainName-DjpPdUSc.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>e
]);
function e(e) {
    switch(e){
        case "solana:mainnet":
            return "Solana";
        case "solana:devnet":
            return "Devnet";
        case "solana:testnet":
            return "Testnet";
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getFormattedUsdFromLamports-B6EqSEho.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "A",
    ()=>o,
    "D",
    ()=>t,
    "J",
    ()=>r,
    "L",
    ()=>s,
    "R",
    ()=>d,
    "S",
    ()=>a,
    "T",
    ()=>e,
    "a",
    ()=>n,
    "g",
    ()=>C
]);
const s = 1e9, a = "11111111111111111111111111111111", e = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", n = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb", o = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", d = [
    "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C",
    "CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"
], r = [
    "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
], t = {
    "solana:mainnet": {
        EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
            symbol: "USDC",
            decimals: 6,
            address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        },
        Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: {
            symbol: "USDT",
            decimals: 6,
            address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
        },
        So11111111111111111111111111111111111111112: {
            symbol: "SOL",
            decimals: 9,
            address: "So11111111111111111111111111111111111111112"
        }
    },
    "solana:devnet": {
        "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU": {
            symbol: "USDC",
            decimals: 6,
            address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
        },
        EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS: {
            symbol: "USDT",
            decimals: 6,
            address: "EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"
        },
        So11111111111111111111111111111111111111112: {
            symbol: "SOL",
            decimals: 9,
            address: "So11111111111111111111111111111111111111112"
        }
    },
    "solana:testnet": {}
};
function C(a, e) {
    let n = parseFloat(a.toString()) / s, o = b.format(e * n);
    return "$0.00" === o ? "<$0.01" : o;
}
let b = new Intl.NumberFormat(void 0, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
});
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/transaction-CnfuREWo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>n,
    "g",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getFormattedUsdFromLamports-B6EqSEho.mjs [app-client] (ecmascript)");
;
function t(e, t1 = 6, n = !1, r = !1) {
    let o = (parseFloat(e.toString()) / 1e9).toFixed(t1).replace(/0+$/, "").replace(/\.$/, ""), i = r ? "" : " SOL";
    return n ? `${o}${i}` : `${"0" === o ? "<0.001" : o}${i}`;
}
function n({ amount: n, fee: r, tokenPrice: o, isUsdc: i }) {
    let a = BigInt(Math.floor(parseFloat(n) * 10 ** (i ? 6 : 9))), s = i ? a : a + r;
    return {
        fundingAmountInBaseUnit: a,
        fundingAmountInUsd: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(a, o) : void 0,
        totalPriceInUsd: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(s, o) : void 0,
        totalPriceInNativeCurrency: t(s),
        feePriceInNativeCurrency: t(r),
        feePriceInUsd: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(r, o) : void 0
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getIsTokenUsdc.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SolanaUsdcAddressMap",
    ()=>F,
    "UsdcAddressMap",
    ()=>E,
    "getIsTokenUsdc",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrumSepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/arbitrumSepolia.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/arbitrum.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalancheFuji$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/avalancheFuji.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/avalanche.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$baseSepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/baseSepolia.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/base.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygonAmoy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/polygonAmoy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/polygon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimismSepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/optimismSepolia.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimism$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/optimism.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$sepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/sepolia.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/mainnet.mjs [app-client] (ecmascript)");
;
const E = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$sepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sepolia"].id]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimism$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimism"].id]: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimismSepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimismSepolia"].id]: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygon"].id]: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygonAmoy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygonAmoy"].id]: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$baseSepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalanche"].id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalancheFuji$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalancheFuji"].id]: "0x5425890298aed601595a70ab815c96711a31bc65",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"].id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrumSepolia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrumSepolia"].id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
}, F = {
    "mainnet-beta": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    devnet: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    testnet: ""
};
function r(d, e) {
    return d === E[e.id];
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/formatters.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatLamportsAmount",
    ()=>o,
    "formatTokenAmount",
    ()=>i,
    "formatWalletAddress",
    ()=>n,
    "formatWeiAmount",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
;
function n(e) {
    return e ? `${e.slice(0, 5)}…${e.slice(-4)}` : "";
}
function t({ wei: r, precision: n = 3 }) {
    return parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(r)).toFixed(n).replace(/0+$/, "").replace(/\.$/, "");
}
function i({ amount: e, decimals: n }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(BigInt(e), n);
}
function o({ lamports: e }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(e, 9);
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getErc20Balance-CaKjNAs9.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getPublicClient-A9RSftUZ.mjs [app-client] (ecmascript)");
;
;
const n = async ({ chain: n, address: s, appId: c, rpcConfig: i, erc20Address: o })=>{
    let p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
        chain: n,
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(n, i, c))
    });
    return {
        balance: await p.readContract({
            address: o,
            abi: r,
            functionName: "balanceOf",
            args: [
                s
            ]
        }).catch(()=>0n),
        chain: n
    };
};
let r = [
    {
        constant: !0,
        inputs: [
            {
                name: "_owner",
                type: "address"
            }
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "balance",
                type: "uint256"
            }
        ],
        payable: !1,
        stateMutability: "view",
        type: "function"
    }
];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "B",
    ()=>c,
    "E",
    ()=>g,
    "P",
    ()=>n,
    "S",
    ()=>b,
    "a",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-client] (ecmascript)");
;
;
;
const c = ({ variant: o = "primary", size: e = "lg", children: a, success: l, ...d })=>{
    switch(o){
        case "secondary":
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(b, {
                size: e,
                ...d,
                children: a
            });
        case "error":
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(b, {
                $warn: !0,
                size: e,
                ...d,
                children: a
            });
        case "muted":
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(p, {
                size: e,
                ...d,
                children: a
            });
        default:
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(n, {
                size: e,
                success: l,
                ...d,
                children: a
            });
    }
}, i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "BaseButton",
    componentId: "sc-e537b447-0"
})([
    "display:flex;flex-direction:row;align-items:center;justify-content:center;user-select:none;&{width:auto;cursor:pointer;border-radius:",
    ";font-size:14px;font-style:normal;font-weight:500;line-height:22px;letter-spacing:-0.016px;}&&{height:",
    ";padding:0 ",
    ";}"
], ({ $size: r })=>"sm" === r ? "6px" : "var(--privy-border-radius-sm)", ({ $size: r })=>"sm" === r ? "28px" : "48px", ({ $size: r })=>"sm" === r ? "10px" : "16px"), n = ({ children: a, loading: l, disabled: c, success: i, size: n = "lg", loadingText: t = "Loading...", as: s, onClick: b, ...p })=>{
    let u = "a" === s, y = !(!l && !c); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(v, {
        as: s,
        disabled: u ? void 0 : y,
        "aria-disabled": u ? y : void 0,
        $success: i,
        $size: n,
        onClick: (r)=>{
            u && y ? r.preventDefault() : b?.(r);
        },
        ...p,
        children: l ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"], {}),
                t ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        marginLeft: "8px"
                    },
                    children: t
                }) : null
            ]
        }) : a
    });
}, t = ({ children: o, loading: e, disabled: a, ...l })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(s, {
        disabled: a,
        ...l,
        children: e ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"], {
            color: "var(--privy-color-foreground-accent)"
        }) : o
    });
let s = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledPrimaryButtonWithoutGray",
    componentId: "sc-e537b447-1"
})([
    "position:relative;&&{background-color:var(--privy-color-accent);color:var(--privy-color-foreground-accent);transition:background-color 200ms ease;}&:hover{background-color:var(--privy-color-accent-dark);}&:active{background-color:var(--privy-color-accent-dark);}&:disabled,&:hover:disabled,&:active:disabled{cursor:not-allowed;color:var(--privy-color-foreground-disabled);background-color:var(--privy-color-accent-dark);}"
]), v = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledPrimaryButton",
    componentId: "sc-e537b447-2"
})([
    "position:relative;&&{background-color:",
    ";color:var(--privy-color-foreground-accent);transition:background-color 200ms ease;}&:hover{background-color:",
    ";}&:active{background-color:",
    ";}&:focus{outline:none;box-shadow:0 0 0 3px #949df9;}&:disabled{background-color:var(--privy-color-background-2);border:1px solid var(--privy-color-border-default);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}&:hover:disabled,&:active:disabled{background-color:var(--privy-color-background-2);border:1px solid var(--privy-color-border-default);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}",
    ""
], (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)", (r)=>r.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
        "&&&,&&&:hover,&&&:active{background-color:var(--privy-color-background-2);border:1px solid var(--privy-color-border-default);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}"
    ]));
const b = ({ children: a, loading: l, disabled: c, size: i = "lg", loadingText: n = "Loading...", as: t, onClick: s, ...v })=>{
    let b = "a" === t, p = !(!l && !c); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(u, {
        as: t,
        disabled: b ? void 0 : p,
        "aria-disabled": b ? p : void 0,
        $size: i,
        onClick: (r)=>{
            b && p ? r.preventDefault() : s?.(r);
        },
        ...v,
        children: l ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"], {}),
                n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        marginLeft: "8px"
                    },
                    children: n
                }) : null
            ]
        }) : a
    });
}, p = ({ children: a, loading: l, disabled: c, size: i = "lg", loadingText: n = "Loading...", as: t, onClick: s, ...v })=>{
    let b = "a" === t, p = !(!l && !c); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(y, {
        as: t,
        disabled: b ? void 0 : p,
        "aria-disabled": b ? p : void 0,
        $size: i,
        onClick: (r)=>{
            b && p ? r.preventDefault() : s?.(r);
        },
        ...v,
        children: l ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"], {}),
                n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        marginLeft: "8px"
                    },
                    children: n
                }) : null
            ]
        }) : a
    });
};
let u = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledSecondaryButton",
    componentId: "sc-e537b447-3"
})([
    "&&{border-width:1px;border-style:solid;border-color:",
    ";background-color:var(--privy-color-background);color:",
    ";transition:border-color 200ms ease,color 200ms ease,background-color 200ms ease;}&:hover{border-color:",
    ";background-color:",
    ";color:",
    ";}&:active{border-color:",
    ";background-color:",
    ";color:",
    ";}&:disabled{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}&:hover:disabled,&:active:disabled{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}",
    ""
], (r)=>r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive-hover)", (r)=>r.$warn ? "var(--privy-color-error-light)" : "var(--privy-color-info-bg-hover)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive)", (r)=>r.$warn ? "var(--privy-color-error-bg-hover)" : "var(--privy-color-info-bg)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
        "&&&,&&&:hover,&&&:active{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}"
    ])), y = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledMutedButton",
    componentId: "sc-e537b447-4"
})([
    "&&{border-width:1px;border-style:solid;border-color:var(--privy-color-border-default);background-color:transparent;color:var(--privy-color-text-muted);transition:border-color 200ms ease,color 200ms ease,background-color 200ms ease;}&:hover{border-color:var(--privy-color-border-default);background-color:var(--privy-color-info-bg-hover);color:var(--privy-color-foreground-2);}&:active{border-color:var(--privy-color-border-default);background-color:var(--privy-color-info-bg);color:var(--privy-color-foreground-2);}&:focus{outline:none;box-shadow:0 0 0 3px #949df9;}&:disabled{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}&:hover:disabled,&:active:disabled{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}",
    ""
], (r)=>r.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
        "&&&,&&&:hover,&&&:active{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}"
    ]));
const g = ({ children: e, onClick: a, disabled: l, isSubmitting: c, ...i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(f, {
        $isSubmitting: c,
        onClick: a,
        disabled: l,
        ...i,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                children: e
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["G"], {})
            })
        ]
    });
let f = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "StyledEmbeddedButton",
    componentId: "sc-e537b447-7"
})([
    "&&{color:var(--privy-color-accent);font-size:16px;font-style:normal;font-weight:500;line-height:24px;cursor:pointer;border-radius:0px var(--privy-border-radius-mdlg) var(--privy-border-radius-mdlg) 0px;border:none;transition:color 200ms ease;@media (min-width:441px){font-size:14px;}:hover{color:var(--privy-color-accent-dark);}&& > :first-child{opacity:",
    ";}&& > :last-child{position:absolute;display:flex;top:50%;left:50%;transform:translate3d(-50%,-50%,0);opacity:",
    ";}:disabled,:hover:disabled{color:var(--privy-color-foreground-disabled);cursor:not-allowed;}}"
], (r)=>r.$isSubmitting ? 0 : 1, (r)=>r.$isSubmitting ? 1 : 0);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Row-CG0lSY5Z.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "R",
    ()=>o,
    "a",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const e = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Rows",
    componentId: "sc-b764aab6-0"
})([
    "display:flex;flex-direction:column;gap:0.35rem;width:100%;"
]), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Row",
    componentId: "sc-b764aab6-1"
})([
    "display:flex;width:100%;justify-content:space-between;gap:0.5rem;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorMessage-Cx8GKGhL.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "E",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const e = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "ErrorMessage",
    componentId: "sc-fcb8cd50-0"
})([
    "text-align:left;font-size:0.75rem;font-weight:500;line-height:1.125rem;color:var(--privy-color-error);"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LoadingSkeleton-CHdaq3pb.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
let i = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"])([
    "from,to{background:var(--privy-color-foreground-4);color:var(--privy-color-foreground-4);}50%{background:var(--privy-color-foreground-accent);color:var(--privy-color-foreground-accent);}"
]);
const n = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
    "",
    ""
], (o)=>o.$isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
        "width:35%;animation:",
        " 2s linear infinite;border-radius:var(--privy-border-radius-sm);"
    ], i) : "");
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Value-B4M62ove.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L",
    ()=>r,
    "V",
    ()=>i,
    "a",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LoadingSkeleton-CHdaq3pb.mjs [app-client] (ecmascript)");
;
;
const r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "LabelSm",
    componentId: "sc-6c002d6-0"
})([
    "color:var(--privy-color-foreground-3);font-size:0.875rem;font-weight:400;line-height:1.375rem;"
]), a = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(r).withConfig({
    displayName: "LabelSmPrimary",
    componentId: "sc-6c002d6-1"
})([
    "color:var(--privy-color-accent);"
]), i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Value",
    componentId: "sc-72aa026-0"
})([
    "color:var(--privy-color-foreground);font-size:0.875rem;font-weight:500;line-height:1.375rem;word-break:break-all;text-align:right;",
    ""
], __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Subtitle-DkvfP2Ev.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const t = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Subtitle",
    componentId: "sc-7a11f796-0"
})([
    "margin-top:4px;color:var(--privy-color-foreground);text-align:center;font-size:0.875rem;font-weight:400;line-height:1.375rem;&& a{color:var(--privy-color-accent);}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Title-D0pfZff-.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "T",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Title",
    componentId: "sc-66de63c-0"
})([
    "color:var(--privy-color-foreground);font-size:1.125rem;font-weight:600;line-height:1.875rem;text-align:center;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/WalletIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function WalletIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](WalletIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Chip-Bsgj4Yc-.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LoadingSkeleton-CHdaq3pb.mjs [app-client] (ecmascript)");
;
;
;
const l = ({ children: o, color: i, isLoading: e, isPulsing: n, ...l })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(a, {
        $color: i,
        $isLoading: e,
        $isPulsing: n,
        ...l,
        children: o
    });
let a = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "StyledSpan",
    componentId: "sc-80725f4-0"
})([
    "padding:0.25rem;font-size:0.75rem;font-weight:500;line-height:1rem;border-radius:var(--privy-border-radius-xs);display:flex;align-items:center;",
    " ",
    ""
], (r)=>{
    let o, n;
    "green" === r.$color && (o = "var(--privy-color-success-dark)", n = "var(--privy-color-success-light)"), "red" === r.$color && (o = "var(--privy-color-error)", n = "var(--privy-color-error-light)"), "gray" === r.$color && (o = "var(--privy-color-foreground-2)", n = "var(--privy-color-background-2)");
    let l = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"])([
        "from,to{background-color:",
        ";}50%{background-color:rgba(",
        ",0.8);}"
    ], n, n); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
        "color:",
        ";background-color:",
        ";",
        ";"
    ], o, n, r.$isPulsing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
        "animation:",
        " 3s linear infinite;"
    ], l));
}, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"]);
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/GlobeAltIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function GlobeAltIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](GlobeAltIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/NetworkIcon-B48ilzF8.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "N",
    ()=>w
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/GlobeAltIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$zora$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/zora.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/polygon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimism$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/optimism.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/mainnet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$linea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/linea.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$celo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/celo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/base.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/avalanche.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/definitions/arbitrum.mjs [app-client] (ecmascript)");
;
;
;
const C = (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        id: "Layer_1",
        x: "0px",
        y: "0px",
        viewBox: "0 0 397.7 311.7",
        enableBackground: "new 0 0 397.7 311.7",
        xmlSpace: "preserve",
        ...t,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("linearGradient", {
                id: "SVGID_1_",
                gradientUnits: "userSpaceOnUse",
                x1: "360.8791",
                y1: "351.4553",
                x2: "141.213",
                y2: "-69.2936",
                gradientTransform: "matrix(1 0 0 -1 0 314)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                        offset: "0",
                        stopColor: "#00FFA3"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                        offset: "1",
                        stopColor: "#DC1FFF"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5  c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z",
                fill: "url(#SVGID_1_)"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("linearGradient", {
                id: "SVGID_2_",
                gradientUnits: "userSpaceOnUse",
                x1: "264.8291",
                y1: "401.6014",
                x2: "45.163",
                y2: "-19.1475",
                gradientTransform: "matrix(1 0 0 -1 0 314)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                        offset: "0",
                        stopColor: "#00FFA3"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                        offset: "1",
                        stopColor: "#DC1FFF"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5  c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z",
                fill: "url(#SVGID_2_)"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("linearGradient", {
                id: "SVGID_3_",
                gradientUnits: "userSpaceOnUse",
                x1: "312.5484",
                y1: "376.688",
                x2: "92.8822",
                y2: "-44.061",
                gradientTransform: "matrix(1 0 0 -1 0 314)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                        offset: "0",
                        stopColor: "#00FFA3"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                        offset: "1",
                        stopColor: "#DC1FFF"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4  c5.8,0,8.7-7,4.6-11.1L333.1,120.1z",
                fill: "url(#SVGID_3_)"
            })
        ]
    });
let a = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$arbitrum$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arbitrum"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            version: "1.1",
            id: "Layer_1",
            x: "0px",
            y: "0px",
            viewBox: "0 0 2500 2500",
            xmlSpace: "preserve",
            ...t,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                id: "Layer_x0020_1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                    id: "_2405588477232",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                            fill: "none",
                            width: "2500",
                            height: "2500"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                        fill: "#213147",
                                        d: "M226,760v980c0,63,33,120,88,152l849,490c54,31,121,31,175,0l849-490c54-31,88-89,88-152V760      c0-63-33-120-88-152l-849-490c-54-31-121-31-175,0L314,608c-54,31-87,89-87,152H226z"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                        fill: "#12AAFF",
                                                        d: "M1435,1440l-121,332c-3,9-3,19,0,29l208,571l241-139l-289-793C1467,1422,1442,1422,1435,1440z"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                        fill: "#12AAFF",
                                                        d: "M1678,882c-7-18-32-18-39,0l-121,332c-3,9-3,19,0,29l341,935l241-139L1678,883V882z"
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                            fill: "#9DCCED",
                                            d: "M1250,155c6,0,12,2,17,5l918,530c11,6,17,18,17,30v1060c0,12-7,24-17,30l-918,530c-5,3-11,5-17,5       s-12-2-17-5l-918-530c-11-6-17-18-17-30V719c0-12,7-24,17-30l918-530c5-3,11-5,17-5l0,0V155z M1250,0c-33,0-65,8-95,25L237,555       c-59,34-95,96-95,164v1060c0,68,36,130,95,164l918,530c29,17,62,25,95,25s65-8,95-25l918-530c59-34,95-96,95-164V719       c0-68-36-130-95-164L1344,25c-29-17-62-25-95-25l0,0H1250z"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polygon", {
                                        fill: "#213147",
                                        points: "642,2179 727,1947 897,2088 738,2234     "
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                fill: "#FFFFFF",
                                                d: "M1172,644H939c-17,0-33,11-39,27L401,2039l241,139l550-1507c5-14-5-28-19-28L1172,644z"
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                                fill: "#FFFFFF",
                                                d: "M1580,644h-233c-17,0-33,11-39,27L738,2233l241,139l620-1701c5-14-5-28-19-28V644z"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$avalanche$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["avalanche"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            width: "1503",
            height: "1504",
            viewBox: "0 0 1503 1504",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    x: "287",
                    y: "258",
                    width: "928",
                    height: "844",
                    fill: "white"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z",
                    fill: "#E84142"
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$base$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            width: "146",
            height: "146",
            viewBox: "0 0 146 146",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                    cx: "73",
                    cy: "73",
                    r: "73",
                    fill: "#0052FF"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M73.323 123.729C101.617 123.729 124.553 100.832 124.553 72.5875C124.553 44.343 101.617 21.4463 73.323 21.4463C46.4795 21.4463 24.4581 42.0558 22.271 68.2887H89.9859V76.8864H22.271C24.4581 103.119 46.4795 123.729 73.323 123.729Z",
                    fill: "white"
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$celo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["celo"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            fill: "none",
            height: "400",
            viewBox: "0 0 400 400",
            width: "400",
            xmlns: "http://www.w3.org/2000/svg",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "m0 0h400v400h-400z",
                    fill: "#fcff52"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "m300 100h-200v200h199.996v-69.813h-33.191c-11.442 25.468-37.194 43.206-66.665 43.206-40.63 0-73.533-33.187-73.533-73.533s32.903-73.249 73.533-73.249c30.043 0 55.795 18.313 67.24 44.349h32.62z",
                    fill: "#000"
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$linea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linea"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            width: "200",
            height: "208",
            viewBox: "0 0 200 208",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    width: "199.4",
                    height: "207.623",
                    fill: "#121212"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                    "clip-path": "url(#clip0_2303_643)",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                            d: "M132.369 155.99H49.7001V68.8854H68.6148V139.109H132.369V155.981V155.99Z",
                            fill: "white"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                            d: "M132.369 85.7575C141.687 85.7575 149.241 78.2036 149.241 68.8855C149.241 59.5673 141.687 52.0134 132.369 52.0134C123.05 52.0134 115.497 59.5673 115.497 68.8855C115.497 78.2036 123.05 85.7575 132.369 85.7575Z",
                            fill: "white"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                        id: "clip0_2303_643",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                            width: "99.5407",
                            height: "103.977",
                            fill: "white",
                            transform: "translate(49.7001 52.0134)"
                        })
                    })
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$mainnet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mainnet"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            version: "1.1",
            id: "Layer_1",
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            x: "0px",
            y: "0px",
            viewBox: "0 0 327.5 533.3",
            enableBackground: "new 0 0 327.5 533.3;",
            xmlSpace: "preserve",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: "#8492B2",
                    d: "M163.7,197.2V0L0,271.6L163.7,197.2z"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: "#62688F",
                    d: "M163.7,368.4V197.2L0,271.6L163.7,368.4z M163.7,197.2l163.7,74.4L163.7,0V197.2z"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: "#454A75",
                    d: "M163.7,197.2v171.2l163.7-96.8L163.7,197.2z"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: "#8492B2",
                    d: "M163.7,399.4L0,302.7l163.7,230.7V399.4z"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: "#62688F",
                    d: "M327.5,302.7l-163.8,96.7v134L327.5,302.7z"
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$optimism$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimism"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            width: "500",
            height: "500",
            viewBox: "0 0 500 500",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                    cx: "250",
                    cy: "250",
                    r: "250",
                    fill: "#FF0420"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M177.133 316.446C162.247 316.446 150.051 312.943 140.544 305.938C131.162 298.808 126.471 288.676 126.471 275.541C126.471 272.789 126.784 269.411 127.409 265.408C129.036 256.402 131.35 245.581 134.352 232.947C142.858 198.547 164.812 181.347 200.213 181.347C209.845 181.347 218.476 182.973 226.107 186.225C233.738 189.352 239.742 194.106 244.12 200.486C248.498 206.74 250.688 214.246 250.688 223.002C250.688 225.629 250.375 228.944 249.749 232.947C247.873 244.08 245.621 254.901 242.994 265.408C238.616 282.546 231.048 295.368 220.29 303.874C209.532 312.255 195.147 316.446 177.133 316.446ZM179.76 289.426C186.766 289.426 192.707 287.362 197.586 283.234C202.59 279.106 206.155 272.789 208.281 264.283C211.158 252.524 213.348 242.266 214.849 233.51C215.349 230.883 215.599 228.194 215.599 225.441C215.599 214.058 209.657 208.366 197.774 208.366C190.768 208.366 184.764 210.43 179.76 214.558C174.882 218.687 171.379 225.004 169.253 233.51C167.001 241.891 164.749 252.149 162.498 264.283C161.997 266.784 161.747 269.411 161.747 272.163C161.747 283.672 167.752 289.426 179.76 289.426Z",
                    fill: "white"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M259.303 314.57C257.927 314.57 256.863 314.132 256.113 313.256C255.487 312.255 255.3 311.13 255.55 309.879L281.444 187.914C281.694 186.538 282.382 185.412 283.508 184.536C284.634 183.661 285.822 183.223 287.073 183.223H336.985C350.87 183.223 362.003 186.1 370.384 191.854C378.891 197.609 383.144 205.927 383.144 216.81C383.144 219.937 382.769 223.19 382.018 226.567C378.891 240.953 372.574 251.586 363.067 258.466C353.685 265.346 340.8 268.786 324.413 268.786H299.082L290.451 309.879C290.2 311.255 289.512 312.38 288.387 313.256C287.261 314.132 286.072 314.57 284.822 314.57H259.303ZM325.727 242.892C330.98 242.892 335.546 241.453 339.424 238.576C343.427 235.699 346.054 231.571 347.305 226.192C347.68 224.065 347.868 222.189 347.868 220.563C347.868 216.935 346.805 214.183 344.678 212.307C342.551 210.305 338.924 209.305 333.795 209.305H311.278L304.148 242.892H325.727Z",
                    fill: "white"
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$polygon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygon"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            width: "360",
            height: "360",
            viewBox: "0 0 360 360",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    width: "360",
                    height: "360",
                    rx: "180",
                    fill: "#6C00F6"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: "M157.743 154.241L141.052 144.58L90.9766 173.561V231.519L141.052 260.5L191.13 231.519V141.359L218.948 125.26L246.77 141.359V173.561L218.948 189.66L202.257 180.002V205.759L218.948 215.42L269.024 186.439V128.481L218.948 99.5L168.873 128.481V218.641L141.052 234.74L113.233 218.641V186.439L141.052 170.34L157.743 179.998V154.241Z",
                    fill: "white"
                })
            ]
        }),
    [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$definitions$2f$zora$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zora"].id]: (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "30",
            height: "30",
            viewBox: "0 0 30 30",
            fill: "none",
            ...t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                    clipPath: "url(#clip0)",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                        clipPath: "url(#clip1)",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                            d: "M14.9188 29.8373C6.67944 29.8373 0.00012207 23.1581 0.00012207 14.9187C0.00012207 6.67931 6.67944 0 14.9188 0C23.1581 0 29.8373 6.67931 29.8373 14.9187C29.8373 23.1581 23.1581 29.8373 14.9188 29.8373Z",
                            fill: "url(#paint0)"
                        })
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("defs", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("radialGradient", {
                            id: "paint0",
                            cx: "0",
                            cy: "0",
                            r: "1",
                            gradientUnits: "userSpaceOnUse",
                            gradientTransform: "translate(21.6921 8.02215) rotate(180) scale(25.2008)",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                                    offset: "0.00682297",
                                    stopColor: "#F2CEFE"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                                    offset: "0.1913",
                                    stopColor: "#AFBAF1"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                                    offset: "0.4982",
                                    stopColor: "#4281D3"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                                    offset: "0.666667",
                                    stopColor: "#2E427D"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                                    offset: "0.822917",
                                    stopColor: "#230101"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("stop", {
                                    offset: "1",
                                    stopColor: "#8F6B40"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                            id: "clip0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                width: "30",
                                height: "30",
                                fill: "white"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                            id: "clip1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                width: "30",
                                height: "30",
                                fill: "white"
                            })
                        })
                    ]
                })
            ]
        })
};
const w = ({ chainId: i, ...e })=>{
    if ("solana" === i) /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(C, {
        ...e
    });
    let r = a[i]; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(r || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$GlobeAltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...e
    });
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/shared-CtYf3O54.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "B",
    ()=>d,
    "a",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const e = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])([
    "&&{border-width:1px;padding:0.5rem 1rem;}width:100%;text-align:left;border:solid 1px var(--privy-color-foreground-4);border-radius:var(--privy-border-radius-md);display:flex;justify-content:space-between;align-items:center;",
    ""
], (r)=>"error" === r.$state ? "\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      " : ""), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Box",
    componentId: "sc-7252360a-0"
})([
    "",
    ""
], e);
;
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/useLayoutEffect.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLayoutEffect",
    ()=>$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document !== 'undefined' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).useLayoutEffect : ()=>{};
;
 //# sourceMappingURL=useLayoutEffect.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOwnerDocument",
    ()=>$431fbd86ca7dc216$export$b204af158042fbac,
    "getOwnerWindow",
    ()=>$431fbd86ca7dc216$export$f21a1ffae260145a,
    "isShadowRoot",
    ()=>$431fbd86ca7dc216$export$af51f0f06c0f328a
]);
const $431fbd86ca7dc216$export$b204af158042fbac = (el)=>{
    var _el_ownerDocument;
    return (_el_ownerDocument = el === null || el === void 0 ? void 0 : el.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
};
const $431fbd86ca7dc216$export$f21a1ffae260145a = (el)=>{
    if (el && 'window' in el && el.window === el) return el;
    const doc = $431fbd86ca7dc216$export$b204af158042fbac(el);
    return doc.defaultView || window;
};
/**
 * Type guard that checks if a value is a Node. Verifies the presence and type of the nodeType property.
 */ function $431fbd86ca7dc216$var$isNode(value) {
    return value !== null && typeof value === 'object' && 'nodeType' in value && typeof value.nodeType === 'number';
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
    return $431fbd86ca7dc216$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && 'host' in node;
}
;
 //# sourceMappingURL=domHelpers.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/isElementVisible.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isElementVisible",
    ()=>$7d2416ea0959daaa$export$e989c0fffaa6b27a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
;
/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $7d2416ea0959daaa$var$supportsCheckVisibility = typeof Element !== 'undefined' && 'checkVisibility' in Element.prototype;
function $7d2416ea0959daaa$var$isStyleVisible(element) {
    const windowObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(element);
    if (!(element instanceof windowObject.HTMLElement) && !(element instanceof windowObject.SVGElement)) return false;
    let { display: display, visibility: visibility } = element.style;
    let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';
    if (isVisible) {
        const { getComputedStyle: getComputedStyle } = element.ownerDocument.defaultView;
        let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);
        isVisible = computedDisplay !== 'none' && computedVisibility !== 'hidden' && computedVisibility !== 'collapse';
    }
    return isVisible;
}
function $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) {
    return !element.hasAttribute('hidden') && // Ignore HiddenSelect when tree walking.
    !element.hasAttribute('data-react-aria-prevent-focus') && (element.nodeName === 'DETAILS' && childElement && childElement.nodeName !== 'SUMMARY' ? element.hasAttribute('open') : true);
}
function $7d2416ea0959daaa$export$e989c0fffaa6b27a(element, childElement) {
    if ($7d2416ea0959daaa$var$supportsCheckVisibility) return element.checkVisibility({
        visibilityProperty: true
    }) && !element.closest('[data-react-aria-prevent-focus]');
    return element.nodeName !== '#comment' && $7d2416ea0959daaa$var$isStyleVisible(element) && $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) && (!element.parentElement || $7d2416ea0959daaa$export$e989c0fffaa6b27a(element.parentElement, element));
}
;
 //# sourceMappingURL=isElementVisible.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/isFocusable.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFocusable",
    ()=>$b4b717babfbb907b$export$4c063cf1350e6fed,
    "isTabbable",
    ()=>$b4b717babfbb907b$export$bebd5a1431fec25d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isElementVisible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/isElementVisible.mjs [app-client] (ecmascript)");
;
/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $b4b717babfbb907b$var$focusableElements = [
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable^="false"])',
    'permission'
];
const $b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(':not([hidden]),') + ',[tabindex]:not([disabled]):not([hidden])';
$b4b717babfbb907b$var$focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
const $b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(':not([hidden]):not([tabindex="-1"]),');
function $b4b717babfbb907b$export$4c063cf1350e6fed(element) {
    return element.matches($b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isElementVisible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementVisible"])(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$export$bebd5a1431fec25d(element) {
    return element.matches($b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isElementVisible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementVisible"])(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$var$isInert(element) {
    let node = element;
    while(node != null){
        if (node instanceof node.ownerDocument.defaultView.HTMLElement && node.inert) return true;
        node = node.parentElement;
    }
    return false;
}
;
 //# sourceMappingURL=isFocusable.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "focusWithoutScrolling",
    ()=>$7215afc6de606d6b$export$de79e2c695e052f3
]);
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
    if ($7215afc6de606d6b$var$supportsPreventScroll()) element.focus({
        preventScroll: true
    });
    else {
        let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
        element.focus();
        $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
    }
}
let $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
    if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
        $7215afc6de606d6b$var$supportsPreventScrollCached = false;
        try {
            let focusElem = document.createElement('div');
            focusElem.focus({
                get preventScroll () {
                    $7215afc6de606d6b$var$supportsPreventScrollCached = true;
                    return true;
                }
            });
        } catch  {
        // Ignore
        }
    }
    return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
    let parent = element.parentNode;
    let scrollableElements = [];
    let rootScrollingElement = document.scrollingElement || document.documentElement;
    while(parent instanceof HTMLElement && parent !== rootScrollingElement){
        if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) scrollableElements.push({
            element: parent,
            scrollTop: parent.scrollTop,
            scrollLeft: parent.scrollLeft
        });
        parent = parent.parentNode;
    }
    if (rootScrollingElement instanceof HTMLElement) scrollableElements.push({
        element: rootScrollingElement,
        scrollTop: rootScrollingElement.scrollTop,
        scrollLeft: rootScrollingElement.scrollLeft
    });
    return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
    for (let { element: element, scrollTop: scrollTop, scrollLeft: scrollLeft } of scrollableElements){
        element.scrollTop = scrollTop;
        element.scrollLeft = scrollLeft;
    }
}
;
 //# sourceMappingURL=focusWithoutScrolling.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSyntheticEvent",
    ()=>$8a9cb279dc87e130$export$525bc4921d56d4a,
    "ignoreFocusEvent",
    ()=>$8a9cb279dc87e130$export$fda7da73ab5d4c48,
    "preventFocus",
    ()=>$8a9cb279dc87e130$export$cabe61c495ee3649,
    "setEventTarget",
    ()=>$8a9cb279dc87e130$export$c2b7abe5d61ec696,
    "useSyntheticBlurEvent",
    ()=>$8a9cb279dc87e130$export$715c682d09d639cc
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$useLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/useLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isFocusable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/isFocusable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$focusWithoutScrolling$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
    let event = nativeEvent;
    event.nativeEvent = nativeEvent;
    event.isDefaultPrevented = ()=>event.defaultPrevented;
    // cancelBubble is technically deprecated in the spec, but still supported in all browsers.
    event.isPropagationStopped = ()=>event.cancelBubble;
    event.persist = ()=>{};
    return event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
    Object.defineProperty(event, 'target', {
        value: target
    });
    Object.defineProperty(event, 'currentTarget', {
        value: target
    });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
    let stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isFocused: false,
        observer: null
    });
    // Clean up MutationObserver on unmount. See below.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$useLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        const state = stateRef.current;
        return ()=>{
            if (state.observer) {
                state.observer.disconnect();
                state.observer = null;
            }
        };
    }, []);
    // This function is called during a React onFocus event.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        // React does not fire onBlur when an element is disabled. https://github.com/facebook/react/issues/9142
        // Most browsers fire a native focusout event in this case, except for Firefox. In that case, we use a
        // MutationObserver to watch for the disabled attribute, and dispatch these events ourselves.
        // For browsers that do, focusout fires before the MutationObserver, so onBlur should not fire twice.
        if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
            stateRef.current.isFocused = true;
            let target = e.target;
            let onBlurHandler = (e)=>{
                stateRef.current.isFocused = false;
                if (target.disabled) {
                    // For backward compatibility, dispatch a (fake) React synthetic event.
                    let event = $8a9cb279dc87e130$export$525bc4921d56d4a(e);
                    onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
                }
                // We no longer need the MutationObserver once the target is blurred.
                if (stateRef.current.observer) {
                    stateRef.current.observer.disconnect();
                    stateRef.current.observer = null;
                }
            };
            target.addEventListener('focusout', onBlurHandler, {
                once: true
            });
            stateRef.current.observer = new MutationObserver(()=>{
                if (stateRef.current.isFocused && target.disabled) {
                    var _stateRef_current_observer;
                    (_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 ? void 0 : _stateRef_current_observer.disconnect();
                    let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
                    target.dispatchEvent(new FocusEvent('blur', {
                        relatedTarget: relatedTargetEl
                    }));
                    target.dispatchEvent(new FocusEvent('focusout', {
                        bubbles: true,
                        relatedTarget: relatedTargetEl
                    }));
                }
            });
            stateRef.current.observer.observe(target, {
                attributes: true,
                attributeFilter: [
                    'disabled'
                ]
            });
        }
    }, [
        onBlur
    ]);
}
let $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
function $8a9cb279dc87e130$export$cabe61c495ee3649(target) {
    // The browser will focus the nearest focusable ancestor of our target.
    while(target && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isFocusable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFocusable"])(target))target = target.parentElement;
    let window = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(target);
    let activeElement = window.document.activeElement;
    if (!activeElement || activeElement === target) return;
    $8a9cb279dc87e130$export$fda7da73ab5d4c48 = true;
    let isRefocusing = false;
    let onBlur = (e)=>{
        if (e.target === activeElement || isRefocusing) e.stopImmediatePropagation();
    };
    let onFocusOut = (e)=>{
        if (e.target === activeElement || isRefocusing) {
            e.stopImmediatePropagation();
            // If there was no focusable ancestor, we don't expect a focus event.
            // Re-focus the original active element here.
            if (!target && !isRefocusing) {
                isRefocusing = true;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$focusWithoutScrolling$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusWithoutScrolling"])(activeElement);
                cleanup();
            }
        }
    };
    let onFocus = (e)=>{
        if (e.target === target || isRefocusing) e.stopImmediatePropagation();
    };
    let onFocusIn = (e)=>{
        if (e.target === target || isRefocusing) {
            e.stopImmediatePropagation();
            if (!isRefocusing) {
                isRefocusing = true;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$focusWithoutScrolling$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusWithoutScrolling"])(activeElement);
                cleanup();
            }
        }
    };
    window.addEventListener('blur', onBlur, true);
    window.addEventListener('focusout', onFocusOut, true);
    window.addEventListener('focusin', onFocusIn, true);
    window.addEventListener('focus', onFocus, true);
    let cleanup = ()=>{
        cancelAnimationFrame(raf);
        window.removeEventListener('blur', onBlur, true);
        window.removeEventListener('focusout', onFocusOut, true);
        window.removeEventListener('focusin', onFocusIn, true);
        window.removeEventListener('focus', onFocus, true);
        $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
        isRefocusing = false;
    };
    let raf = requestAnimationFrame(cleanup);
    return cleanup;
}
;
 //# sourceMappingURL=utils.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/platform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAndroid",
    ()=>$c87311424ea30a05$export$a11b0059900ceec8,
    "isAppleDevice",
    ()=>$c87311424ea30a05$export$e1865c3bedcd822b,
    "isChrome",
    ()=>$c87311424ea30a05$export$6446a186d09e379e,
    "isFirefox",
    ()=>$c87311424ea30a05$export$b7d78993b74f766d,
    "isIOS",
    ()=>$c87311424ea30a05$export$fedb369cb70207f1,
    "isIPad",
    ()=>$c87311424ea30a05$export$7bef049ce92e4224,
    "isIPhone",
    ()=>$c87311424ea30a05$export$186c6964ca17d99,
    "isMac",
    ()=>$c87311424ea30a05$export$9ac100e40613ea10,
    "isWebKit",
    ()=>$c87311424ea30a05$export$78551043582a6a98
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $c87311424ea30a05$var$testUserAgent(re) {
    var _window_navigator_userAgentData;
    if (typeof window === 'undefined' || window.navigator == null) return false;
    let brands = (_window_navigator_userAgentData = window.navigator['userAgentData']) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands;
    return Array.isArray(brands) && brands.some((brand)=>re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re) {
    var _window_navigator_userAgentData;
    return typeof window !== 'undefined' && window.navigator != null ? re.test(((_window_navigator_userAgentData = window.navigator['userAgentData']) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : false;
}
function $c87311424ea30a05$var$cached(fn) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let res = null;
    return ()=>{
        if (res == null) res = fn();
        return res;
    };
}
const $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testPlatform(/^Mac/i);
});
const $c87311424ea30a05$export$186c6964ca17d99 = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
});
const $c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
const $c87311424ea30a05$export$fedb369cb70207f1 = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
});
const $c87311424ea30a05$export$e1865c3bedcd822b = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
});
const $c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
});
const $c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
});
const $c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testUserAgent(/Android/i);
});
const $c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
    return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
});
;
 //# sourceMappingURL=platform.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/openLink.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouterProvider",
    ()=>$ea8dcbcb9ea1b556$export$323e4fc2fa4753fb,
    "getSyntheticLinkProps",
    ()=>$ea8dcbcb9ea1b556$export$51437d503373d223,
    "handleLinkClick",
    ()=>$ea8dcbcb9ea1b556$export$13aea1a3cb5e3f1f,
    "openLink",
    ()=>$ea8dcbcb9ea1b556$export$95185d699e05d4d7,
    "shouldClientNavigate",
    ()=>$ea8dcbcb9ea1b556$export$efa8c9099e530235,
    "useLinkProps",
    ()=>$ea8dcbcb9ea1b556$export$7e924b3091a3bd18,
    "useRouter",
    ()=>$ea8dcbcb9ea1b556$export$9a302a45f65d0572,
    "useSyntheticLinkProps",
    ()=>$ea8dcbcb9ea1b556$export$bdc77b0c0a3a85d6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$focusWithoutScrolling$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/platform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $ea8dcbcb9ea1b556$var$RouterContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    isNative: true,
    open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
    useHref: (href)=>href
});
function $ea8dcbcb9ea1b556$export$323e4fc2fa4753fb(props) {
    let { children: children, navigate: navigate, useHref: useHref } = props;
    let ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            isNative: false,
            open: (target, modifiers, href, routerOptions)=>{
                $ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link)=>{
                    if ($ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers)) navigate(href, routerOptions);
                    else $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers);
                });
            },
            useHref: useHref || ((href)=>href)
        }), [
        navigate,
        useHref
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createElement($ea8dcbcb9ea1b556$var$RouterContext.Provider, {
        value: ctx
    }, children);
}
function $ea8dcbcb9ea1b556$export$9a302a45f65d0572() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])($ea8dcbcb9ea1b556$var$RouterContext);
}
function $ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers) {
    // Use getAttribute here instead of link.target. Firefox will default link.target to "_parent" when inside an iframe.
    let target = link.getAttribute('target');
    return (!target || target === '_self') && link.origin === location.origin && !link.hasAttribute('download') && !modifiers.metaKey && // open in new tab (mac)
    !modifiers.ctrlKey && // open in new tab (windows)
    !modifiers.altKey && // download
    !modifiers.shiftKey;
}
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
    var _window_event_type, _window_event;
    let { metaKey: metaKey, ctrlKey: ctrlKey, altKey: altKey, shiftKey: shiftKey } = modifiers;
    // Firefox does not recognize keyboard events as a user action by default, and the popup blocker
    // will prevent links with target="_blank" from opening. However, it does allow the event if the
    // Command/Control key is held, which opens the link in a background tab. This seems like the best we can do.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=257870 and https://bugzilla.mozilla.org/show_bug.cgi?id=746640.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirefox"])() && ((_window_event = window.event) === null || _window_event === void 0 ? void 0 : (_window_event_type = _window_event.type) === null || _window_event_type === void 0 ? void 0 : _window_event_type.startsWith('key')) && target.target === '_blank') {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMac"])()) metaKey = true;
        else ctrlKey = true;
    }
    // WebKit does not support firing click events with modifier keys, but does support keyboard events.
    // https://github.com/WebKit/WebKit/blob/c03d0ac6e6db178f90923a0a63080b5ca210d25f/Source/WebCore/html/HTMLAnchorElement.cpp#L184
    let event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebKit"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMac"])() && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIPad"])() && ("TURBOPACK compile-time value", "development") !== 'test' ? new KeyboardEvent('keydown', {
        keyIdentifier: 'Enter',
        metaKey: metaKey,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey
    }) : new MouseEvent('click', {
        metaKey: metaKey,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey,
        detail: 1,
        bubbles: true,
        cancelable: true
    });
    $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$focusWithoutScrolling$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusWithoutScrolling"])(target);
    target.dispatchEvent(event);
    $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
}
// https://github.com/parcel-bundler/parcel/issues/8724
$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
function $ea8dcbcb9ea1b556$var$getSyntheticLink(target, open) {
    if (target instanceof HTMLAnchorElement) open(target);
    else if (target.hasAttribute('data-href')) {
        let link = document.createElement('a');
        link.href = target.getAttribute('data-href');
        if (target.hasAttribute('data-target')) link.target = target.getAttribute('data-target');
        if (target.hasAttribute('data-rel')) link.rel = target.getAttribute('data-rel');
        if (target.hasAttribute('data-download')) link.download = target.getAttribute('data-download');
        if (target.hasAttribute('data-ping')) link.ping = target.getAttribute('data-ping');
        if (target.hasAttribute('data-referrer-policy')) link.referrerPolicy = target.getAttribute('data-referrer-policy');
        target.appendChild(link);
        open(link);
        target.removeChild(link);
    }
}
function $ea8dcbcb9ea1b556$var$openSyntheticLink(target, modifiers) {
    $ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link)=>$ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers));
}
function $ea8dcbcb9ea1b556$export$bdc77b0c0a3a85d6(props) {
    let router = $ea8dcbcb9ea1b556$export$9a302a45f65d0572();
    var _props_href;
    const href = router.useHref((_props_href = props.href) !== null && _props_href !== void 0 ? _props_href : '');
    return {
        'data-href': props.href ? href : undefined,
        'data-target': props.target,
        'data-rel': props.rel,
        'data-download': props.download,
        'data-ping': props.ping,
        'data-referrer-policy': props.referrerPolicy
    };
}
function $ea8dcbcb9ea1b556$export$51437d503373d223(props) {
    return {
        'data-href': props.href,
        'data-target': props.target,
        'data-rel': props.rel,
        'data-download': props.download,
        'data-ping': props.ping,
        'data-referrer-policy': props.referrerPolicy
    };
}
function $ea8dcbcb9ea1b556$export$7e924b3091a3bd18(props) {
    let router = $ea8dcbcb9ea1b556$export$9a302a45f65d0572();
    var _props_href;
    const href = router.useHref((_props_href = props === null || props === void 0 ? void 0 : props.href) !== null && _props_href !== void 0 ? _props_href : '');
    return {
        href: (props === null || props === void 0 ? void 0 : props.href) ? href : undefined,
        target: props === null || props === void 0 ? void 0 : props.target,
        rel: props === null || props === void 0 ? void 0 : props.rel,
        download: props === null || props === void 0 ? void 0 : props.download,
        ping: props === null || props === void 0 ? void 0 : props.ping,
        referrerPolicy: props === null || props === void 0 ? void 0 : props.referrerPolicy
    };
}
function $ea8dcbcb9ea1b556$export$13aea1a3cb5e3f1f(e, router, href, routerOptions) {
    // If a custom router is provided, prevent default and forward if this link should client navigate.
    if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && // If props are applied to a router Link component, it may have already prevented default.
    !e.isDefaultPrevented() && $ea8dcbcb9ea1b556$export$efa8c9099e530235(e.currentTarget, e) && href) {
        e.preventDefault();
        router.open(e.currentTarget, e, href, routerOptions);
    }
}
;
 //# sourceMappingURL=openLink.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/isVirtualEvent.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isVirtualClick",
    ()=>$6a7db85432448f7f$export$60278871457622de,
    "isVirtualPointerEvent",
    ()=>$6a7db85432448f7f$export$29bf1b5f2c56cf63
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/platform.mjs [app-client] (ecmascript)");
;
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $6a7db85432448f7f$export$60278871457622de(event) {
    // JAWS/NVDA with Firefox.
    if (event.pointerType === '' && event.isTrusted) return true;
    // Android TalkBack's detail value varies depending on the event listener providing the event so we have specific logic here instead
    // If pointerType is defined, event is from a click listener. For events from mousedown listener, detail === 0 is a sufficient check
    // to detect TalkBack virtual clicks.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"])() && event.pointerType) return event.type === 'click' && event.buttons === 1;
    return event.detail === 0 && !event.pointerType;
}
function $6a7db85432448f7f$export$29bf1b5f2c56cf63(event) {
    // If the pointer size is zero, then we assume it's from a screen reader.
    // Android TalkBack double tap will sometimes return a event with width and height of 1
    // and pointerType === 'mouse' so we need to check for a specific combination of event attributes.
    // Cannot use "event.pressure === 0" as the sole check due to Safari pointer events always returning pressure === 0
    // instead of .5, see https://bugs.webkit.org/show_bug.cgi?id=206216. event.pointerType === 'mouse' is to distingush
    // Talkback double tap from Windows Firefox touch screen press
    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"])() && event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse';
}
;
 //# sourceMappingURL=isVirtualEvent.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/ssr/dist/SSRProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SSRProvider",
    ()=>$b5e257d569688ac6$export$9f8ac96af4b1b2ae,
    "useIsSSR",
    ()=>$b5e257d569688ac6$export$535bd6ca7f90a273,
    "useSSRSafeId",
    ()=>$b5e257d569688ac6$export$619500959fc48b26
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We must avoid a circular dependency with @react-aria/utils, and this useLayoutEffect is
// guarded by a check that it only runs on the client side.
// eslint-disable-next-line rulesdir/useLayoutEffectRule
// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $b5e257d569688ac6$var$defaultContext = {
    prefix: String(Math.round(Math.random() * 10000000000)),
    current: 0
};
const $b5e257d569688ac6$var$SSRContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createContext($b5e257d569688ac6$var$defaultContext);
const $b5e257d569688ac6$var$IsSSRContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createContext(false);
// This is only used in React < 18.
function $b5e257d569688ac6$var$LegacySSRProvider(props) {
    let cur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])($b5e257d569688ac6$var$SSRContext);
    let counter = $b5e257d569688ac6$var$useCounter(cur === $b5e257d569688ac6$var$defaultContext);
    let [isSSR, setIsSSR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            // If this is the first SSRProvider, start with an empty string prefix, otherwise
            // append and increment the counter.
            prefix: cur === $b5e257d569688ac6$var$defaultContext ? '' : `${cur.prefix}-${counter}`,
            current: 0
        }), [
        cur,
        counter
    ]);
    // If on the client, and the component was initially server rendered,
    // then schedule a layout effect to update the component after hydration.
    if (typeof document !== 'undefined') // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        setIsSSR(false);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createElement($b5e257d569688ac6$var$SSRContext.Provider, {
        value: value
    }, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createElement($b5e257d569688ac6$var$IsSSRContext.Provider, {
        value: isSSR
    }, props.children));
}
let $b5e257d569688ac6$var$warnedAboutSSRProvider = false;
function $b5e257d569688ac6$export$9f8ac96af4b1b2ae(props) {
    if (typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])['useId'] === 'function') {
        if (("TURBOPACK compile-time value", "development") !== 'test' && ("TURBOPACK compile-time value", "development") !== 'production' && !$b5e257d569688ac6$var$warnedAboutSSRProvider) {
            console.warn('In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.');
            $b5e257d569688ac6$var$warnedAboutSSRProvider = true;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createElement((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).Fragment, null, props.children);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).createElement($b5e257d569688ac6$var$LegacySSRProvider, props);
}
let $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
let $b5e257d569688ac6$var$componentIds = new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
    let ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])($b5e257d569688ac6$var$SSRContext);
    let ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // eslint-disable-next-line rulesdir/pure-render
    if (ref.current === null && !isDisabled) {
        var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        // In strict mode, React renders components twice, and the ref will be reset to null on the second render.
        // This means our id counter will be incremented twice instead of once. This is a problem because on the
        // server, components are only rendered once and so ids generated on the server won't match the client.
        // In React 18, useId was introduced to solve this, but it is not available in older versions. So to solve this
        // we need to use some React internals to access the underlying Fiber instance, which is stable between renders.
        // This is exposed as ReactCurrentOwner in development, which is all we need since StrictMode only runs in development.
        // To ensure that we only increment the global counter once, we store the starting id for this component in
        // a weak map associated with the Fiber. On the second render, we reset the global counter to this value.
        // Since React runs the second render immediately after the first, this is safe.
        // @ts-ignore
        let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
        if (currentOwner) {
            let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
            if (prevComponentValue == null) $b5e257d569688ac6$var$componentIds.set(currentOwner, {
                id: ctx.current,
                state: currentOwner.memoizedState
            });
            else if (currentOwner.memoizedState !== prevComponentValue.state) {
                // On the second render, the memoizedState gets reset by React.
                // Reset the counter, and remove from the weak map so we don't
                // do this for subsequent useId calls.
                ctx.current = prevComponentValue.id;
                $b5e257d569688ac6$var$componentIds.delete(currentOwner);
            }
        }
        // eslint-disable-next-line rulesdir/pure-render
        ref.current = ++ctx.current;
    }
    // eslint-disable-next-line rulesdir/pure-render
    return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
    let ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])($b5e257d569688ac6$var$SSRContext);
    // If we are rendering in a non-DOM environment, and there's no SSRProvider,
    // provide a warning to hint to the developer to add one.
    if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM && ("TURBOPACK compile-time value", "development") !== 'production') console.warn('When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.');
    let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
    let prefix = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : `react-aria${ctx.prefix}`;
    return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
    let id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).useId();
    let [didSSR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])($b5e257d569688ac6$export$535bd6ca7f90a273());
    let prefix = didSSR || ("TURBOPACK compile-time value", "development") === 'test' ? 'react-aria' : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
    return defaultId || `${prefix}-${id}`;
}
const $b5e257d569688ac6$export$619500959fc48b26 = typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])['useId'] === 'function' ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
    return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
    return true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
    // noop
    return ()=>{};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
    // In React 18, we can use useSyncExternalStore to detect if we're server rendering or hydrating.
    if (typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])['useSyncExternalStore'] === 'function') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])['useSyncExternalStore']($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])($b5e257d569688ac6$var$IsSSRContext);
}
;
 //# sourceMappingURL=SSRProvider.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useFocusVisible.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addWindowFocusTracking",
    ()=>$507fabe10e71c6fb$export$2f1888112f558a7d,
    "getInteractionModality",
    ()=>$507fabe10e71c6fb$export$630ff653c5ada6a9,
    "getPointerType",
    ()=>$507fabe10e71c6fb$export$887a228355cf7d95,
    "hasSetupGlobalListeners",
    ()=>$507fabe10e71c6fb$export$d90243b58daecda7,
    "isFocusVisible",
    ()=>$507fabe10e71c6fb$export$b9b3dfddab17db27,
    "setInteractionModality",
    ()=>$507fabe10e71c6fb$export$8397ddfc504fdb9a,
    "useFocusVisible",
    ()=>$507fabe10e71c6fb$export$ffd9e5021c1fb2d6,
    "useFocusVisibleListener",
    ()=>$507fabe10e71c6fb$export$ec71b4b83ac08ec3,
    "useInteractionModality",
    ()=>$507fabe10e71c6fb$export$98e20ec92f614cfe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/platform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$openLink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/openLink.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isVirtualEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/isVirtualEvent.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$ssr$2f$dist$2f$SSRProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/ssr/dist/SSRProvider.mjs [app-client] (ecmascript)");
;
;
;
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions
let $507fabe10e71c6fb$var$currentModality = null;
let $507fabe10e71c6fb$var$currentPointerType = 'keyboard';
let $507fabe10e71c6fb$var$changeHandlers = new Set();
let $507fabe10e71c6fb$export$d90243b58daecda7 = new Map(); // We use a map here to support setting event listeners across multiple document objects.
let $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
let $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
// Only Tab or Esc keys will make focus visible on text input elements
const $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
    Tab: true,
    Escape: true
};
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
    for (let handler of $507fabe10e71c6fb$var$changeHandlers)handler(modality, e);
}
/**
 * Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus styles visible.
 */ function $507fabe10e71c6fb$var$isValidKey(e) {
    // Control and Shift keys trigger when navigating back to the tab with keyboard.
    return !(e.metaKey || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$platform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMac"])() && e.altKey || e.ctrlKey || e.key === 'Control' || e.key === 'Shift' || e.key === 'Meta');
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$openLink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openLink"]).isOpening && $507fabe10e71c6fb$var$isValidKey(e)) {
        $507fabe10e71c6fb$var$currentModality = 'keyboard';
        $507fabe10e71c6fb$var$currentPointerType = 'keyboard';
        $507fabe10e71c6fb$var$triggerChangeHandlers('keyboard', e);
    }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
    $507fabe10e71c6fb$var$currentModality = 'pointer';
    $507fabe10e71c6fb$var$currentPointerType = 'pointerType' in e ? e.pointerType : 'mouse';
    if (e.type === 'mousedown' || e.type === 'pointerdown') {
        $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
        $507fabe10e71c6fb$var$triggerChangeHandlers('pointer', e);
    }
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$openLink$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openLink"]).isOpening && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$isVirtualEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualClick"])(e)) {
        $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
        $507fabe10e71c6fb$var$currentModality = 'virtual';
        $507fabe10e71c6fb$var$currentPointerType = 'virtual';
    }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
    // Firefox fires two extra focus events when the user first clicks into an iframe:
    // first on the window, then on the document. We ignore these events so they don't
    // cause keyboard focus rings to appear.
    if (e.target === window || e.target === document || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ignoreFocusEvent"]) || !e.isTrusted) return;
    // If a focus event occurs without a preceding keyboard or pointer event, switch to virtual modality.
    // This occurs, for example, when navigating a form with the next/previous buttons on iOS.
    if (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently) {
        $507fabe10e71c6fb$var$currentModality = 'virtual';
        $507fabe10e71c6fb$var$currentPointerType = 'virtual';
        $507fabe10e71c6fb$var$triggerChangeHandlers('virtual', e);
    }
    $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
    $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
    if (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ignoreFocusEvent"]) return;
    // When the window is blurred, reset state. This is necessary when tabbing out of the window,
    // for example, since a subsequent focus event won't be fired.
    $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
    $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
/**
 * Setup global event listeners to control when keyboard focus style should be visible.
 */ function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
    if (typeof window === 'undefined' || typeof document === 'undefined' || $507fabe10e71c6fb$export$d90243b58daecda7.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(element))) return;
    const windowObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(element);
    const documentObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(element);
    // Programmatic focus() calls shouldn't affect the current input modality.
    // However, we need to detect other cases when a focus event occurs without
    // a preceding user event (e.g. screen reader focus). Overriding the focus
    // method on HTMLElement.prototype is a bit hacky, but works.
    let focus = windowObject.HTMLElement.prototype.focus;
    windowObject.HTMLElement.prototype.focus = function() {
        $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
        focus.apply(this, arguments);
    };
    documentObject.addEventListener('keydown', $507fabe10e71c6fb$var$handleKeyboardEvent, true);
    documentObject.addEventListener('keyup', $507fabe10e71c6fb$var$handleKeyboardEvent, true);
    documentObject.addEventListener('click', $507fabe10e71c6fb$var$handleClickEvent, true);
    // Register focus events on the window so they are sure to happen
    // before React's event listeners (registered on the document).
    windowObject.addEventListener('focus', $507fabe10e71c6fb$var$handleFocusEvent, true);
    windowObject.addEventListener('blur', $507fabe10e71c6fb$var$handleWindowBlur, false);
    if (typeof PointerEvent !== 'undefined') {
        documentObject.addEventListener('pointerdown', $507fabe10e71c6fb$var$handlePointerEvent, true);
        documentObject.addEventListener('pointermove', $507fabe10e71c6fb$var$handlePointerEvent, true);
        documentObject.addEventListener('pointerup', $507fabe10e71c6fb$var$handlePointerEvent, true);
    } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Add unmount handler
    windowObject.addEventListener('beforeunload', ()=>{
        $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
    }, {
        once: true
    });
    $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, {
        focus: focus
    });
}
const $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener)=>{
    const windowObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(element);
    const documentObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(element);
    if (loadListener) documentObject.removeEventListener('DOMContentLoaded', loadListener);
    if (!$507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject)) return;
    windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus;
    documentObject.removeEventListener('keydown', $507fabe10e71c6fb$var$handleKeyboardEvent, true);
    documentObject.removeEventListener('keyup', $507fabe10e71c6fb$var$handleKeyboardEvent, true);
    documentObject.removeEventListener('click', $507fabe10e71c6fb$var$handleClickEvent, true);
    windowObject.removeEventListener('focus', $507fabe10e71c6fb$var$handleFocusEvent, true);
    windowObject.removeEventListener('blur', $507fabe10e71c6fb$var$handleWindowBlur, false);
    if (typeof PointerEvent !== 'undefined') {
        documentObject.removeEventListener('pointerdown', $507fabe10e71c6fb$var$handlePointerEvent, true);
        documentObject.removeEventListener('pointermove', $507fabe10e71c6fb$var$handlePointerEvent, true);
        documentObject.removeEventListener('pointerup', $507fabe10e71c6fb$var$handlePointerEvent, true);
    } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject);
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
    const documentObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(element);
    let loadListener;
    if (documentObject.readyState !== 'loading') $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
    else {
        loadListener = ()=>{
            $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
        };
        documentObject.addEventListener('DOMContentLoaded', loadListener);
    }
    return ()=>$507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
// Server-side rendering does not have the document object defined
// eslint-disable-next-line no-restricted-globals
if (typeof document !== 'undefined') $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
    return $507fabe10e71c6fb$var$currentModality !== 'pointer';
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
    return $507fabe10e71c6fb$var$currentModality;
}
function $507fabe10e71c6fb$export$8397ddfc504fdb9a(modality) {
    $507fabe10e71c6fb$var$currentModality = modality;
    $507fabe10e71c6fb$var$currentPointerType = modality === 'pointer' ? 'mouse' : modality;
    $507fabe10e71c6fb$var$triggerChangeHandlers(modality, null);
}
function $507fabe10e71c6fb$export$887a228355cf7d95() {
    return $507fabe10e71c6fb$var$currentPointerType;
}
function $507fabe10e71c6fb$export$98e20ec92f614cfe() {
    $507fabe10e71c6fb$var$setupGlobalFocusEvents();
    let [modality, setModality] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])($507fabe10e71c6fb$var$currentModality);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let handler = ()=>{
            setModality($507fabe10e71c6fb$var$currentModality);
        };
        $507fabe10e71c6fb$var$changeHandlers.add(handler);
        return ()=>{
            $507fabe10e71c6fb$var$changeHandlers.delete(handler);
        };
    }, []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$ssr$2f$dist$2f$SSRProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsSSR"])() ? null : modality;
}
const $507fabe10e71c6fb$var$nonTextInputTypes = new Set([
    'checkbox',
    'radio',
    'range',
    'color',
    'file',
    'image',
    'button',
    'submit',
    'reset'
]);
/**
 * If this is attached to text input component, return if the event is a focus event (Tab/Escape keys pressed) so that
 * focus visible style can be properly set.
 */ function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e) {
    let document1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(e === null || e === void 0 ? void 0 : e.target);
    const IHTMLInputElement = typeof window !== 'undefined' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(e === null || e === void 0 ? void 0 : e.target).HTMLInputElement : HTMLInputElement;
    const IHTMLTextAreaElement = typeof window !== 'undefined' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(e === null || e === void 0 ? void 0 : e.target).HTMLTextAreaElement : HTMLTextAreaElement;
    const IHTMLElement = typeof window !== 'undefined' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(e === null || e === void 0 ? void 0 : e.target).HTMLElement : HTMLElement;
    const IKeyboardEvent = typeof window !== 'undefined' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerWindow"])(e === null || e === void 0 ? void 0 : e.target).KeyboardEvent : KeyboardEvent;
    // For keyboard events that occur on a non-input element that will move focus into input element (aka ArrowLeft going from Datepicker button to the main input group)
    // we need to rely on the user passing isTextInput into here. This way we can skip toggling focus visiblity for said input element
    isTextInput = isTextInput || document1.activeElement instanceof IHTMLInputElement && !$507fabe10e71c6fb$var$nonTextInputTypes.has(document1.activeElement.type) || document1.activeElement instanceof IHTMLTextAreaElement || document1.activeElement instanceof IHTMLElement && document1.activeElement.isContentEditable;
    return !(isTextInput && modality === 'keyboard' && e instanceof IKeyboardEvent && !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $507fabe10e71c6fb$export$ffd9e5021c1fb2d6(props = {}) {
    let { isTextInput: isTextInput, autoFocus: autoFocus } = props;
    let [isFocusVisibleState, setFocusVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(autoFocus || $507fabe10e71c6fb$export$b9b3dfddab17db27());
    $507fabe10e71c6fb$export$ec71b4b83ac08ec3((isFocusVisible)=>{
        setFocusVisible(isFocusVisible);
    }, [
        isTextInput
    ], {
        isTextInput: isTextInput
    });
    return {
        isFocusVisible: isFocusVisibleState
    };
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
    $507fabe10e71c6fb$var$setupGlobalFocusEvents();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let handler = (modality, e)=>{
            // We want to early return for any keyboard events that occur inside text inputs EXCEPT for Tab and Escape
            if (!$507fabe10e71c6fb$var$isKeyboardFocusEvent(!!(opts === null || opts === void 0 ? void 0 : opts.isTextInput), modality, e)) return;
            fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
        };
        $507fabe10e71c6fb$var$changeHandlers.add(handler);
        return ()=>{
            $507fabe10e71c6fb$var$changeHandlers.delete(handler);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
;
 //# sourceMappingURL=useFocusVisible.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-stately/flags/dist/import.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enableShadowDOM",
    ()=>$f4e2df6bd15f8569$export$12b151d9882e9985,
    "enableTableNestedRows",
    ()=>$f4e2df6bd15f8569$export$d9d8a0f82de49530,
    "shadowDOM",
    ()=>$f4e2df6bd15f8569$export$98658e8c59125e6a,
    "tableNestedRows",
    ()=>$f4e2df6bd15f8569$export$1b00cb14a96194e6
]);
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ let $f4e2df6bd15f8569$var$_tableNestedRows = false;
let $f4e2df6bd15f8569$var$_shadowDOM = false;
function $f4e2df6bd15f8569$export$d9d8a0f82de49530() {
    $f4e2df6bd15f8569$var$_tableNestedRows = true;
}
function $f4e2df6bd15f8569$export$1b00cb14a96194e6() {
    return $f4e2df6bd15f8569$var$_tableNestedRows;
}
function $f4e2df6bd15f8569$export$12b151d9882e9985() {
    $f4e2df6bd15f8569$var$_shadowDOM = true;
}
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
    return $f4e2df6bd15f8569$var$_shadowDOM;
}
;
 //# sourceMappingURL=module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/DOMFunctions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveElement",
    ()=>$d4ee10de306f2510$export$cd4e5573fbe2b576,
    "getEventTarget",
    ()=>$d4ee10de306f2510$export$e58f029f0fbfdb29,
    "nodeContains",
    ()=>$d4ee10de306f2510$export$4282f70798064fe0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$stately$2f$flags$2f$dist$2f$import$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-stately/flags/dist/import.mjs [app-client] (ecmascript)");
;
;
// Source: https://github.com/microsoft/tabster/blob/a89fc5d7e332d48f68d03b1ca6e344489d1c3898/src/Shadowdomize/DOMFunctions.ts#L16
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$stately$2f$flags$2f$dist$2f$import$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shadowDOM"])()) return otherNode && node ? node.contains(otherNode) : false;
    if (!node || !otherNode) return false;
    let currentNode = otherNode;
    while(currentNode !== null){
        if (currentNode === node) return true;
        if (currentNode.tagName === 'SLOT' && currentNode.assignedSlot) currentNode = currentNode.assignedSlot.parentNode;
        else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShadowRoot"])(currentNode)) currentNode = currentNode.host;
        else currentNode = currentNode.parentNode;
    }
    return false;
}
const $d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document)=>{
    var _activeElement_shadowRoot;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$stately$2f$flags$2f$dist$2f$import$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shadowDOM"])()) return doc.activeElement;
    let activeElement = doc.activeElement;
    while(activeElement && 'shadowRoot' in activeElement && ((_activeElement_shadowRoot = activeElement.shadowRoot) === null || _activeElement_shadowRoot === void 0 ? void 0 : _activeElement_shadowRoot.activeElement))activeElement = activeElement.shadowRoot.activeElement;
    return activeElement;
};
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$stately$2f$flags$2f$dist$2f$import$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shadowDOM"])() && event.target.shadowRoot) {
        if (event.composedPath) return event.composedPath()[0];
    }
    return event.target;
}
;
 //# sourceMappingURL=DOMFunctions.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useFocus.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocus",
    ()=>$a1ea59d68270f0dd$export$f8168d8dd8fd66e6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/DOMFunctions.mjs [app-client] (ecmascript)");
;
;
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
    let { isDisabled: isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange: onFocusChange } = props;
    const onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (e.target === e.currentTarget) {
            if (onBlurProp) onBlurProp(e);
            if (onFocusChange) onFocusChange(false);
            return true;
        }
    }, [
        onBlurProp,
        onFocusChange
    ]);
    const onSyntheticFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyntheticBlurEvent"])(onBlur);
    const onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        // Double check that document.activeElement actually matches e.target in case a previously chained
        // focus handler already moved focus somewhere else.
        const ownerDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(e.target);
        const activeElement = ownerDocument ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveElement"])(ownerDocument) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveElement"])();
        if (e.target === e.currentTarget && activeElement === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEventTarget"])(e.nativeEvent)) {
            if (onFocusProp) onFocusProp(e);
            if (onFocusChange) onFocusChange(true);
            onSyntheticFocus(e);
        }
    }, [
        onFocusChange,
        onFocusProp,
        onSyntheticFocus
    ]);
    return {
        focusProps: {
            onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : undefined,
            onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : undefined
        }
    };
}
;
 //# sourceMappingURL=useFocus.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/useGlobalListeners.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGlobalListeners",
    ()=>$03deb23ff14920c4$export$4eaf04e54aa8eed6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
    let globalListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    let addGlobalListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((eventTarget, type, listener, options)=>{
        // Make sure we remove the listener after it is called with the `once` option.
        let fn = (options === null || options === void 0 ? void 0 : options.once) ? (...args)=>{
            globalListeners.current.delete(listener);
            listener(...args);
        } : listener;
        globalListeners.current.set(listener, {
            type: type,
            eventTarget: eventTarget,
            fn: fn,
            options: options
        });
        eventTarget.addEventListener(type, fn, options);
    }, []);
    let removeGlobalListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((eventTarget, type, listener, options)=>{
        var _globalListeners_current_get;
        let fn = ((_globalListeners_current_get = globalListeners.current.get(listener)) === null || _globalListeners_current_get === void 0 ? void 0 : _globalListeners_current_get.fn) || listener;
        eventTarget.removeEventListener(type, fn, options);
        globalListeners.current.delete(listener);
    }, []);
    let removeAllGlobalListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        globalListeners.current.forEach((value, key)=>{
            removeGlobalListener(value.eventTarget, value.type, key, value.options);
        });
    }, [
        removeGlobalListener
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return removeAllGlobalListeners;
    }, [
        removeAllGlobalListeners
    ]);
    return {
        addGlobalListener: addGlobalListener,
        removeGlobalListener: removeGlobalListener,
        removeAllGlobalListeners: removeAllGlobalListeners
    };
}
;
 //# sourceMappingURL=useGlobalListeners.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useFocusWithin.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusWithin",
    ()=>$9ab94262bd0047c7$export$420e68273165f4ec
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$useGlobalListeners$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/useGlobalListeners.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/DOMFunctions.mjs [app-client] (ecmascript)");
;
;
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
    let { isDisabled: isDisabled, onBlurWithin: onBlurWithin, onFocusWithin: onFocusWithin, onFocusWithinChange: onFocusWithinChange } = props;
    let state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isFocusWithin: false
    });
    let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$useGlobalListeners$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalListeners"])();
    let onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        // Ignore events bubbling through portals.
        if (!e.currentTarget.contains(e.target)) return;
        // We don't want to trigger onBlurWithin and then immediately onFocusWithin again
        // when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where focus is moving).
        if (state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
            state.current.isFocusWithin = false;
            removeAllGlobalListeners();
            if (onBlurWithin) onBlurWithin(e);
            if (onFocusWithinChange) onFocusWithinChange(false);
        }
    }, [
        onBlurWithin,
        onFocusWithinChange,
        state,
        removeAllGlobalListeners
    ]);
    let onSyntheticFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyntheticBlurEvent"])(onBlur);
    let onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        // Ignore events bubbling through portals.
        if (!e.currentTarget.contains(e.target)) return;
        // Double check that document.activeElement actually matches e.target in case a previously chained
        // focus handler already moved focus somewhere else.
        const ownerDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(e.target);
        const activeElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveElement"])(ownerDocument);
        if (!state.current.isFocusWithin && activeElement === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEventTarget"])(e.nativeEvent)) {
            if (onFocusWithin) onFocusWithin(e);
            if (onFocusWithinChange) onFocusWithinChange(true);
            state.current.isFocusWithin = true;
            onSyntheticFocus(e);
            // Browsers don't fire blur events when elements are removed from the DOM.
            // However, if a focus event occurs outside the element we're tracking, we
            // can manually fire onBlur.
            let currentTarget = e.currentTarget;
            addGlobalListener(ownerDocument, 'focus', (e)=>{
                if (state.current.isFocusWithin && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeContains"])(currentTarget, e.target)) {
                    let nativeEvent = new ownerDocument.defaultView.FocusEvent('blur', {
                        relatedTarget: e.target
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setEventTarget"])(nativeEvent, currentTarget);
                    let event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSyntheticEvent"])(nativeEvent);
                    onBlur(event);
                }
            }, {
                capture: true
            });
        }
    }, [
        onFocusWithin,
        onFocusWithinChange,
        onSyntheticFocus,
        addGlobalListener,
        onBlur
    ]);
    if (isDisabled) return {
        focusWithinProps: {
            // These cannot be null, that would conflict in mergeProps
            onFocus: undefined,
            onBlur: undefined
        }
    };
    return {
        focusWithinProps: {
            onFocus: onFocus,
            onBlur: onBlur
        }
    };
}
;
 //# sourceMappingURL=useFocusWithin.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/focus/dist/useFocusRing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusRing",
    ()=>$f7dceffc5ad7768b$export$4e328f61c538687f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocusVisible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useFocusVisible.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useFocus.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocusWithin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useFocusWithin.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function $f7dceffc5ad7768b$export$4e328f61c538687f(props = {}) {
    let { autoFocus: autoFocus = false, isTextInput: isTextInput, within: within } = props;
    let state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isFocused: false,
        isFocusVisible: autoFocus || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocusVisible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFocusVisible"])()
    });
    let [isFocused, setFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let [isFocusVisibleState, setFocusVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(()=>state.current.isFocused && state.current.isFocusVisible);
    let updateState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []);
    let onFocusChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((isFocused)=>{
        state.current.isFocused = isFocused;
        setFocused(isFocused);
        updateState();
    }, [
        updateState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocusVisible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusVisibleListener"])((isFocusVisible)=>{
        state.current.isFocusVisible = isFocusVisible;
        updateState();
    }, [], {
        isTextInput: isTextInput
    });
    let { focusProps: focusProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocus"])({
        isDisabled: within,
        onFocusChange: onFocusChange
    });
    let { focusWithinProps: focusWithinProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useFocusWithin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusWithin"])({
        isDisabled: !within,
        onFocusWithinChange: onFocusChange
    });
    return {
        isFocused: isFocused,
        isFocusVisible: isFocusVisibleState,
        focusProps: within ? focusWithinProps : focusProps
    };
}
;
 //# sourceMappingURL=useFocusRing.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useHover.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHover",
    ()=>$6179b936705e76d3$export$ae780daf29e6d456
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$useGlobalListeners$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/useGlobalListeners.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/domHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/utils/dist/DOMFunctions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions
// iOS fires onPointerEnter twice: once with pointerType="touch" and again with pointerType="mouse".
// We want to ignore these emulated events so they do not trigger hover behavior.
// See https://bugs.webkit.org/show_bug.cgi?id=214609.
let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
let $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
    $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = true;
    // Clear globalIgnoreEmulatedMouseEvents after a short timeout. iOS fires onPointerEnter
    // with pointerType="mouse" immediately after onPointerUp and before onFocus. On other
    // devices that don't have this quirk, we don't want to ignore a mouse hover sometime in
    // the distant future because a user previously touched the element.
    setTimeout(()=>{
        $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
    }, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e) {
    if (e.pointerType === 'touch') $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
    if (typeof document === 'undefined') return;
    if ($6179b936705e76d3$var$hoverCount === 0) {
        if (typeof PointerEvent !== 'undefined') document.addEventListener('pointerup', $6179b936705e76d3$var$handleGlobalPointerEvent);
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    $6179b936705e76d3$var$hoverCount++;
    return ()=>{
        $6179b936705e76d3$var$hoverCount--;
        if ($6179b936705e76d3$var$hoverCount > 0) return;
        if (typeof PointerEvent !== 'undefined') document.removeEventListener('pointerup', $6179b936705e76d3$var$handleGlobalPointerEvent);
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
    let { onHoverStart: onHoverStart, onHoverChange: onHoverChange, onHoverEnd: onHoverEnd, isDisabled: isDisabled } = props;
    let [isHovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isHovered: false,
        ignoreEmulatedMouseEvents: false,
        pointerType: '',
        target: null
    }).current;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])($6179b936705e76d3$var$setupGlobalTouchEvents, []);
    let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$useGlobalListeners$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalListeners"])();
    let { hoverProps: hoverProps, triggerHoverEnd: triggerHoverEnd } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let triggerHoverStart = (event, pointerType)=>{
            state.pointerType = pointerType;
            if (isDisabled || pointerType === 'touch' || state.isHovered || !event.currentTarget.contains(event.target)) return;
            state.isHovered = true;
            let target = event.currentTarget;
            state.target = target;
            // When an element that is hovered over is removed, no pointerleave event is fired by the browser,
            // even though the originally hovered target may have shrunk in size so it is no longer hovered.
            // However, a pointerover event will be fired on the new target the mouse is over.
            // In Chrome this happens immediately. In Safari and Firefox, it happens upon moving the mouse one pixel.
            addGlobalListener((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$domHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(event.target), 'pointerover', (e)=>{
                if (state.isHovered && state.target && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$DOMFunctions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeContains"])(state.target, e.target)) triggerHoverEnd(e, e.pointerType);
            }, {
                capture: true
            });
            if (onHoverStart) onHoverStart({
                type: 'hoverstart',
                target: target,
                pointerType: pointerType
            });
            if (onHoverChange) onHoverChange(true);
            setHovered(true);
        };
        let triggerHoverEnd = (event, pointerType)=>{
            let target = state.target;
            state.pointerType = '';
            state.target = null;
            if (pointerType === 'touch' || !state.isHovered || !target) return;
            state.isHovered = false;
            removeAllGlobalListeners();
            if (onHoverEnd) onHoverEnd({
                type: 'hoverend',
                target: target,
                pointerType: pointerType
            });
            if (onHoverChange) onHoverChange(false);
            setHovered(false);
        };
        let hoverProps = {};
        if (typeof PointerEvent !== 'undefined') {
            hoverProps.onPointerEnter = (e)=>{
                if ($6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') return;
                triggerHoverStart(e, e.pointerType);
            };
            hoverProps.onPointerLeave = (e)=>{
                if (!isDisabled && e.currentTarget.contains(e.target)) triggerHoverEnd(e, e.pointerType);
            };
        } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return {
            hoverProps: hoverProps,
            triggerHoverEnd: triggerHoverEnd
        };
    }, [
        onHoverStart,
        onHoverChange,
        onHoverEnd,
        isDisabled,
        state,
        addGlobalListener,
        removeAllGlobalListeners
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Call the triggerHoverEnd as soon as isDisabled changes to true
        // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
        if (isDisabled) triggerHoverEnd({
            currentTarget: state.target
        }, state.pointerType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDisabled
    ]);
    return {
        hoverProps: hoverProps,
        isHovered: isHovered
    };
}
;
 //# sourceMappingURL=useHover.module.js.map
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-active-press.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActivePress",
    ()=>w
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-client] (ecmascript)");
;
;
;
;
function E(e) {
    let t = e.width / 2, n = e.height / 2;
    return {
        top: e.clientY - n,
        right: e.clientX + t,
        bottom: e.clientY + n,
        left: e.clientX - t
    };
}
function P(e, t) {
    return !(!e || !t || e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom);
}
function w({ disabled: e = !1 } = {}) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), [n, l] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisposables"])(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        t.current = null, l(!1), r.dispose();
    }), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((s)=>{
        if (r.dispose(), t.current === null) {
            t.current = s.currentTarget, l(!0);
            {
                let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(s.currentTarget);
                r.addEventListener(i, "pointerup", o, !1), r.addEventListener(i, "pointermove", (c)=>{
                    if (t.current) {
                        let p = E(c);
                        l(P(p, t.current.getBoundingClientRect()));
                    }
                }, !1), r.addEventListener(i, "pointercancel", o, !1);
            }
        }
    });
    return {
        pressed: n,
        pressProps: e ? {} : {
            onPointerDown: f,
            onPointerUp: o,
            onClick: o
        }
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-element-size.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useElementSize",
    ()=>w
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-client] (ecmascript)");
;
;
;
function h(i) {
    if (i === null) return {
        width: 0,
        height: 0
    };
    let { width: t, height: e } = i.getBoundingClientRect();
    return {
        width: t,
        height: e
    };
}
function w(i, t, e = !1) {
    let [r, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(()=>h(t));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!t || !i) return;
        let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposables"])();
        return n.requestAnimationFrame(function s() {
            n.requestAnimationFrame(s), f((u)=>{
                let o = h(t);
                return o.width === u.width && o.height === u.height ? u : o;
            });
        }), ()=>{
            n.dispose();
        };
    }, [
        t,
        i
    ]), e ? {
        width: `${r.width}px`,
        height: `${r.height}px`
    } : r;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/mouse.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MouseButton",
    ()=>g
]);
var g = ((f)=>(f[f.Left = 0] = "Left", f[f.Right = 2] = "Right", f))(g || {});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/bugs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDisabledReactIssue7711",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-client] (ecmascript)");
;
function s(l) {
    let e = l.parentElement, t = null;
    for(; e && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLFieldSetElement"](e);)__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLLegendElement"](e) && (t = e), e = e.parentElement;
    let i = (e == null ? void 0 : e.getAttribute("disabled")) === "";
    return i && r(t) ? !1 : i;
}
function r(l) {
    if (!l) return !1;
    let e = l.previousElementSibling;
    for(; e !== null;){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLLegendElement"](e)) return !1;
        e = e.previousElementSibling;
    }
    return !0;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-handle-toggle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHandleToggle",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$mouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/mouse.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$bugs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/bugs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-client] (ecmascript)");
;
;
;
;
function s(t) {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        r.current = e.pointerType, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$bugs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDisabledReactIssue7711"])(e.currentTarget) && e.pointerType === "mouse" && e.button === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$mouse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MouseButton"].Left && (e.preventDefault(), t(e));
    }), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        r.current !== "mouse" && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$bugs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDisabledReactIssue7711"])(e.currentTarget) || t(e));
    });
    return {
        onPointerDown: u,
        onClick: i
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-quick-release.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Action",
    ()=>S,
    "useQuickRelease",
    ()=>L
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-document-event.js [app-client] (ecmascript)");
;
;
;
var H = ((e)=>(e[e.Ignore = 0] = "Ignore", e[e.Select = 1] = "Select", e[e.Close = 2] = "Close", e))(H || {});
const S = {
    Ignore: {
        kind: 0
    },
    Select: (r)=>({
            kind: 1,
            target: r
        }),
    Close: {
        kind: 2
    }
}, M = 200, f = 5;
function L(r, { trigger: n, action: T, close: e, select: p }) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentEvent"])(r && n !== null, "pointerdown", (t)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"](t == null ? void 0 : t.target) && n != null && n.contains(t.target) && (i.current = t.x, u.current = t.y, l.current = t.timeStamp);
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentEvent"])(r && n !== null, "pointerup", (t)=>{
        var s, m;
        let c = l.current;
        if (c === null || (l.current = null, !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](t.target)) || Math.abs(t.x - ((s = i.current) != null ? s : t.x)) < f && Math.abs(t.y - ((m = u.current) != null ? m : t.y)) < f) return;
        let a = T(t);
        switch(a.kind){
            case 0:
                return;
            case 1:
                {
                    t.timeStamp - c > M && (p(a.target), e());
                    break;
                }
            case 2:
                {
                    e();
                    break;
                }
        }
    }, {
        capture: !0
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResolveButtonType",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function e(t, u) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        var n;
        if (t.type) return t.type;
        let r = (n = t.as) != null ? n : "button";
        if (typeof r == "string" && r.toLowerCase() === "button" || (u == null ? void 0 : u.tagName) === "BUTTON" && !u.hasAttribute("type")) return "button";
    }, [
        t.type,
        t.as,
        u
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/get-text-value.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTextValue",
    ()=>F
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-client] (ecmascript)");
;
let a = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o(e) {
    var l, n;
    let i = (l = e.innerText) != null ? l : "", t = e.cloneNode(!0);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"](t)) return i;
    let u = !1;
    for (let f of t.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))f.remove(), u = !0;
    let r = u ? (n = t.innerText) != null ? n : "" : i;
    return a.test(r) && (r = r.replace(a, "")), r;
}
function F(e) {
    let i = e.getAttribute("aria-label");
    if (typeof i == "string") return i.trim();
    let t = e.getAttribute("aria-labelledby");
    if (t) {
        let u = t.split(" ").map((r)=>{
            let l = document.getElementById(r);
            if (l) {
                let n = l.getAttribute("aria-label");
                return typeof n == "string" ? n.trim() : o(l).trim();
            }
            return null;
        }).filter(Boolean);
        if (u.length > 0) return u.join(", ");
    }
    return o(e).trim();
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-text-value.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTextValue",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$get$2d$text$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/get-text-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-client] (ecmascript)");
;
;
;
function s(c) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(""), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        let e = c.current;
        if (!e) return "";
        let u = e.innerText;
        if (t.current === u) return r.current;
        let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$get$2d$text$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextValue"])(e).trim().toLowerCase();
        return t.current = u, r.current = n, n;
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTrackedPointer",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function t(e) {
    return [
        e.screenX,
        e.screenY
    ];
}
function u() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([
        -1,
        -1
    ]);
    return {
        wasMoved (r) {
            let n = t(r);
            return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0);
        },
        update (r) {
            e.current = t(r);
        }
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-tree-walker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTreeWalker",
    ()=>F
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-client] (ecmascript)");
;
;
;
function F(c, { container: e, accept: t, walk: r }) {
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(r);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        o.current = t, l.current = r;
    }, [
        t,
        r
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!e || !c) return;
        let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOwnerDocument"])(e);
        if (!n) return;
        let f = o.current, p = l.current, i = Object.assign((m)=>f(m), {
            acceptNode: f
        }), u = n.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, i, !1);
        for(; u.nextNode();)p(u.currentNode);
    }, [
        e,
        c,
        o,
        l
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TYPEABLE_SELECTOR",
    ()=>TYPEABLE_SELECTOR,
    "activeElement",
    ()=>activeElement,
    "contains",
    ()=>contains,
    "getDocument",
    ()=>getDocument,
    "getPlatform",
    ()=>getPlatform,
    "getTarget",
    ()=>getTarget,
    "getUserAgent",
    ()=>getUserAgent,
    "isAndroid",
    ()=>isAndroid,
    "isEventTargetWithin",
    ()=>isEventTargetWithin,
    "isJSDOM",
    ()=>isJSDOM,
    "isMac",
    ()=>isMac,
    "isMouseLikePointerType",
    ()=>isMouseLikePointerType,
    "isReactEvent",
    ()=>isReactEvent,
    "isRootElement",
    ()=>isRootElement,
    "isSafari",
    ()=>isSafari,
    "isTypeableCombobox",
    ()=>isTypeableCombobox,
    "isTypeableElement",
    ()=>isTypeableElement,
    "isVirtualClick",
    ()=>isVirtualClick,
    "isVirtualPointerEvent",
    ()=>isVirtualPointerEvent,
    "stopEvent",
    ()=>stopEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
function activeElement(doc) {
    let activeElement = doc.activeElement;
    while(((_activeElement = activeElement) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null){
        var _activeElement;
        activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
}
function contains(parent, child) {
    if (!parent || !child) {
        return false;
    }
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    }
    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShadowRoot"])(rootNode)) {
        let next = child;
        while(next){
            if (parent === next) {
                return true;
            }
            // @ts-ignore
            next = next.parentNode || next.host;
        }
    }
    // Give up, the result is false
    return false;
}
// Avoid Chrome DevTools blue warning.
function getPlatform() {
    const uaData = navigator.userAgentData;
    if (uaData != null && uaData.platform) {
        return uaData.platform;
    }
    return navigator.platform;
}
function getUserAgent() {
    const uaData = navigator.userAgentData;
    if (uaData && Array.isArray(uaData.brands)) {
        return uaData.brands.map((_ref)=>{
            let { brand, version } = _ref;
            return brand + "/" + version;
        }).join(' ');
    }
    return navigator.userAgent;
}
// License: https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/utils/src/isVirtualEvent.ts
function isVirtualClick(event) {
    // FIXME: Firefox is now emitting a deprecation warning for `mozInputSource`.
    // Try to find a workaround for this. `react-aria` source still has the check.
    if (event.mozInputSource === 0 && event.isTrusted) {
        return true;
    }
    if (isAndroid() && event.pointerType) {
        return event.type === 'click' && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
    if (isJSDOM()) return false;
    return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' || // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
}
function isSafari() {
    // Chrome DevTools does not complain about navigator.vendor
    return /apple/i.test(navigator.vendor);
}
function isAndroid() {
    const re = /android/i;
    return re.test(getPlatform()) || re.test(getUserAgent());
}
function isMac() {
    return getPlatform().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints;
}
function isJSDOM() {
    return getUserAgent().includes('jsdom/');
}
function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = [
        'mouse',
        'pen'
    ];
    if (!strict) {
        values.push('', undefined);
    }
    return values.includes(pointerType);
}
function isReactEvent(event) {
    return 'nativeEvent' in event;
}
function isRootElement(element) {
    return element.matches('html,body');
}
function getDocument(node) {
    return (node == null ? void 0 : node.ownerDocument) || document;
}
function isEventTargetWithin(event, node) {
    if (node == null) {
        return false;
    }
    if ('composedPath' in event) {
        return event.composedPath().includes(node);
    }
    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const e = event;
    return e.target != null && node.contains(e.target);
}
function getTarget(event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }
    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
}
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.matches(TYPEABLE_SELECTOR);
}
function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
}
function isTypeableCombobox(element) {
    if (!element) return false;
    return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}
;
}),
"[project]/Desktop/frontend/node_modules/tabbable/dist/index.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "focusable",
    ()=>focusable,
    "getTabIndex",
    ()=>getTabIndex,
    "isFocusable",
    ()=>isFocusable,
    "isTabbable",
    ()=>isTabbable,
    "tabbable",
    ()=>tabbable
]);
/*!
* tabbable 6.4.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/ // NOTE: separate `:not()` selectors has broader browser support than the newer
//  `:not([inert], [inert] *)` (Feb 2023)
var candidateSelectors = [
    'input:not([inert]):not([inert] *)',
    'select:not([inert]):not([inert] *)',
    'textarea:not([inert]):not([inert] *)',
    'a[href]:not([inert]):not([inert] *)',
    'button:not([inert]):not([inert] *)',
    '[tabindex]:not(slot):not([inert]):not([inert] *)',
    'audio[controls]:not([inert]):not([inert] *)',
    'video[controls]:not([inert]):not([inert] *)',
    '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)',
    'details>summary:first-of-type:not([inert]):not([inert] *)',
    'details:not([inert]):not([inert] *)'
];
var candidateSelector = /* #__PURE__ */ candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
    var _element$getRootNode;
    return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
    return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
/**
 * Determines if a node is inert or in an inert ancestor.
 * @param {Node} [node]
 * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
 *  see if any of them are inert. If false, only `node` itself is considered.
 * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
 *  False if `node` is falsy.
 */ var _isInert = function isInert(node, lookUp) {
    var _node$getAttribute;
    if (lookUp === void 0) {
        lookUp = true;
    }
    // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
    //  JS API property; we have to check the attribute, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's an active element
    var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
    var inert = inertAtt === '' || inertAtt === 'true';
    // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
    //  if it weren't for `matches()` not being a function on shadow roots; the following
    //  code works for any kind of node
    var result = inert || lookUp && node && (// closest does not exist on shadow roots, so we fall back to a manual
    // lookup upward, in case it is not defined.
    typeof node.closest === 'function' ? node.closest('[inert]') : _isInert(node.parentNode));
    return result;
};
/**
 * Determines if a node's content is editable.
 * @param {Element} [node]
 * @returns True if it's content-editable; false if it's not or `node` is falsy.
 */ var isContentEditable = function isContentEditable(node) {
    var _node$getAttribute2;
    // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
    //  to use the attribute directly to check for this, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's a non-editable element
    var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
    return attValue === '' || attValue === 'true';
};
/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */ var getCandidates = function getCandidates(el, includeContainer, filter) {
    // even if `includeContainer=false`, we still have to check it for inertness because
    //  if it's inert (either by itself or via its parent), then all its children are inert
    if (_isInert(el)) {
        return [];
    }
    var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
    if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
    }
    candidates = candidates.filter(filter);
    return candidates;
};
/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */ /**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */ /**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */ /**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */ /**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */ var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
    var candidates = [];
    var elementsToCheck = Array.from(elements);
    while(elementsToCheck.length){
        var element = elementsToCheck.shift();
        if (_isInert(element, false)) {
            continue;
        }
        if (element.tagName === 'SLOT') {
            // add shadow dom slot scope (slot itself cannot be focusable)
            var assigned = element.assignedElements();
            var content = assigned.length ? assigned : element.children;
            var nestedCandidates = _getCandidatesIteratively(content, true, options);
            if (options.flatten) {
                candidates.push.apply(candidates, nestedCandidates);
            } else {
                candidates.push({
                    scopeParent: element,
                    candidates: nestedCandidates
                });
            }
        } else {
            // check candidate element
            var validCandidate = matches.call(element, candidateSelector);
            if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
                candidates.push(element);
            }
            // iterate over shadow content if possible
            var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
            typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
            // no inert look up because we're already drilling down and checking for inertness
            //  on the way down, so all containers to this root node should have already been
            //  vetted as non-inert
            var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
            if (shadowRoot && validShadowRoot) {
                // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
                //  shadow exists, so look at light dom children as fallback BUT create a scope for any
                //  child candidates found because they're likely slotted elements (elements that are
                //  children of the web component element (which has the shadow), in the light dom, but
                //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
                //  _after_ we return from this recursive call
                var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
                if (options.flatten) {
                    candidates.push.apply(candidates, _nestedCandidates);
                } else {
                    candidates.push({
                        scopeParent: element,
                        candidates: _nestedCandidates
                    });
                }
            } else {
                // there's not shadow so just dig into the element's (light dom) children
                //  __without__ giving the element special scope treatment
                elementsToCheck.unshift.apply(elementsToCheck, element.children);
            }
        }
    }
    return candidates;
};
/**
 * @private
 * Determines if the node has an explicitly specified `tabindex` attribute.
 * @param {HTMLElement} node
 * @returns {boolean} True if so; false if not.
 */ var hasTabIndex = function hasTabIndex(node) {
    return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
};
/**
 * Determine the tab index of a given node.
 * @param {HTMLElement} node
 * @returns {number} Tab order (negative, 0, or positive number).
 * @throws {Error} If `node` is falsy.
 */ var getTabIndex = function getTabIndex(node) {
    if (!node) {
        throw new Error('No node provided');
    }
    if (node.tabIndex < 0) {
        // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
        // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
        // yet they are still part of the regular tab order; in FF, they get a default
        // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
        // order, consider their tab index to be 0.
        // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
        // so if they don't have a tabindex attribute specifically set, assume it's 0.
        if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
            return 0;
        }
    }
    return node.tabIndex;
};
/**
 * Determine the tab index of a given node __for sort order purposes__.
 * @param {HTMLElement} node
 * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
 *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
 *  inserted into the correct sort position.
 * @returns {number} Tab order (negative, 0, or positive number).
 */ var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
    var tabIndex = getTabIndex(node);
    if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
        return 0;
    }
    return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
    return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
    return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
    return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
    var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === 'SUMMARY';
    });
    return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
    for(var i = 0; i < nodes.length; i++){
        if (nodes[i].checked && nodes[i].form === form) {
            return nodes[i];
        }
    }
};
var isTabbableRadio = function isTabbableRadio(node) {
    if (!node.name) {
        return true;
    }
    var radioScope = node.form || getRootNode(node);
    var queryRadios = function queryRadios(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
    };
    var radioSet;
    if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
        radioSet = queryRadios(window.CSS.escape(node.name));
    } else {
        try {
            radioSet = queryRadios(node.name);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
            return false;
        }
    }
    var checked = getCheckedRadio(radioSet, node.form);
    return !checked || checked === node;
};
var isRadio = function isRadio(node) {
    return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
    return isRadio(node) && !isTabbableRadio(node);
};
// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
    var _nodeRoot;
    // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
    //  (but NOT _the_ document; see second 'If' comment below for more).
    // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
    //  is attached, and the one we need to check if it's in the document or not (because the
    //  shadow, and all nodes it contains, is never considered in the document since shadows
    //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
    //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
    //  visibility, including all the nodes it contains). The host could be any normal node,
    //  or a custom element (i.e. web component). Either way, that's the one that is considered
    //  part of the document, not the shadow root, nor any of its children (i.e. the node being
    //  tested).
    // To further complicate things, we have to look all the way up until we find a shadow HOST
    //  that is attached (or find none) because the node might be in nested shadows...
    // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
    //  document (per the docs) and while it's a Document-type object, that document does not
    //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
    //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
    //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
    //  node is actually detached.
    // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
    //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
    //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
    //  `ownerDocument` will be `null`, hence the optional chaining on it.
    var nodeRoot = node && getRootNode(node);
    var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
    // in some cases, a detached node will return itself as the root instead of a document or
    //  shadow root object, in which case, we shouldn't try to look further up the host chain
    var attached = false;
    if (nodeRoot && nodeRoot !== node) {
        var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
        attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
        while(!attached && nodeRootHost){
            var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
            // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
            //  which means we need to get the host's host and check if that parent host is contained
            //  in (i.e. attached to) the document
            nodeRoot = getRootNode(nodeRootHost);
            nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
            attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
        }
    }
    return attached;
};
var isZeroArea = function isZeroArea(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
    var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
    if (displayCheck === 'full-native') {
        if ('checkVisibility' in node) {
            // Chrome >= 105, Edge >= 105, Firefox >= 106, Safari >= 17.4
            // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#browser_compatibility
            var visible = node.checkVisibility({
                // Checking opacity might be desirable for some use cases, but natively,
                // opacity zero elements _are_ focusable and tabbable.
                checkOpacity: false,
                opacityProperty: false,
                contentVisibilityAuto: true,
                visibilityProperty: true,
                // This is an alias for `visibilityProperty`. Contemporary browsers
                // support both. However, this alias has wider browser support (Chrome
                // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
                // we include it anyway.
                checkVisibilityCSS: true
            });
            return !visible;
        }
    // Fall through to manual visibility checks
    }
    // NOTE: visibility will be `undefined` if node is detached from the document
    //  (see notes about this further down), which means we will consider it visible
    //  (this is legacy behavior from a very long way back)
    // NOTE: we check this regardless of `displayCheck="none"` because this is a
    //  _visibility_ check, not a _display_ check
    if (getComputedStyle(node).visibility === 'hidden') {
        return true;
    }
    var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
    if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
        return true;
    }
    if (!displayCheck || displayCheck === 'full' || // full-native can run this branch when it falls through in case
    // Element#checkVisibility is unsupported
    displayCheck === 'full-native' || displayCheck === 'legacy-full') {
        if (typeof getShadowRoot === 'function') {
            // figure out if we should consider the node to be in an undisclosed shadow and use the
            //  'non-zero-area' fallback
            var originalNode = node;
            while(node){
                var parentElement = node.parentElement;
                var rootNode = getRootNode(node);
                if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
                ) {
                    // node has an undisclosed shadow which means we can only treat it as a black box, so we
                    //  fall back to a non-zero-area test
                    return isZeroArea(node);
                } else if (node.assignedSlot) {
                    // iterate up slot
                    node = node.assignedSlot;
                } else if (!parentElement && rootNode !== node.ownerDocument) {
                    // cross shadow boundary
                    node = rootNode.host;
                } else {
                    // iterate up normal dom
                    node = parentElement;
                }
            }
            node = originalNode;
        }
        // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
        //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
        //  it might be a falsy value, which means shadow DOM support is disabled
        // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
        //  now we can just test to see if it would normally be visible or not, provided it's
        //  attached to the main document.
        // NOTE: We must consider case where node is inside a shadow DOM and given directly to
        //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.
        if (isNodeAttached(node)) {
            // this works wherever the node is: if there's at least one client rect, it's
            //  somehow displayed; it also covers the CSS 'display: contents' case where the
            //  node itself is hidden in place of its contents; and there's no need to search
            //  up the hierarchy either
            return !node.getClientRects().length;
        }
        // Else, the node isn't attached to the document, which means the `getClientRects()`
        //  API will __always__ return zero rects (this can happen, for example, if React
        //  is used to render nodes onto a detached tree, as confirmed in this thread:
        //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
        //
        // It also means that even window.getComputedStyle(node).display will return `undefined`
        //  because styles are only computed for nodes that are in the document.
        //
        // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
        //  somehow. Though it was never stated officially, anyone who has ever used tabbable
        //  APIs on nodes in detached containers has actually implicitly used tabbable in what
        //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
        //  considering __everything__ to be visible because of the innability to determine styles.
        //
        // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
        //  nodes as visible with the 'none' fallback.__
        if (displayCheck !== 'legacy-full') {
            return true; // hidden
        }
    // else, fallback to 'none' mode and consider the node visible
    } else if (displayCheck === 'non-zero-area') {
        // NOTE: Even though this tests that the node's client rect is non-zero to determine
        //  whether it's displayed, and that a detached node will __always__ have a zero-area
        //  client rect, we don't special-case for whether the node is attached or not. In
        //  this mode, we do want to consider nodes that have a zero area to be hidden at all
        //  times, and that includes attached or not.
        return isZeroArea(node);
    }
    // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
    //  it's visible
    return false;
};
// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
        var parentNode = node.parentElement;
        // check if `node` is contained in a disabled <fieldset>
        while(parentNode){
            if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
                // look for the first <legend> among the children of the disabled <fieldset>
                for(var i = 0; i < parentNode.children.length; i++){
                    var child = parentNode.children.item(i);
                    // when the first <legend> (in document order) is found
                    if (child.tagName === 'LEGEND') {
                        // if its parent <fieldset> is not nested in another disabled <fieldset>,
                        // return whether `node` is a descendant of its first <legend>
                        return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
                    }
                }
                // the disabled <fieldset> containing `node` has no <legend>
                return true;
            }
            parentNode = parentNode.parentElement;
        }
    }
    // else, node's tabbable/focusable state should not be affected by a fieldset's
    //  enabled/disabled state
    return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
    if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
    }
    return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
    if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
        return false;
    }
    return true;
};
var isShadowRootTabbable = function isShadowRootTabbable(shadowHostNode) {
    var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
    if (isNaN(tabIndex) || tabIndex >= 0) {
        return true;
    }
    // If a custom element has an explicit negative tabindex,
    // browsers will not allow tab targeting said element's children.
    return false;
};
/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */ var _sortByOrder = function sortByOrder(candidates) {
    var regularTabbables = [];
    var orderedTabbables = [];
    candidates.forEach(function(item, i) {
        var isScope = !!item.scopeParent;
        var element = isScope ? item.scopeParent : item;
        var candidateTabindex = getSortOrderTabIndex(element, isScope);
        var elements = isScope ? _sortByOrder(item.candidates) : element;
        if (candidateTabindex === 0) {
            isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
        } else {
            orderedTabbables.push({
                documentOrder: i,
                tabIndex: candidateTabindex,
                item: item,
                isScope: isScope,
                content: elements
            });
        }
    });
    return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
        sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
        return acc;
    }, []).concat(regularTabbables);
};
var tabbable = function tabbable(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
        candidates = _getCandidatesIteratively([
            container
        ], options.includeContainer, {
            filter: isNodeMatchingSelectorTabbable.bind(null, options),
            flatten: false,
            getShadowRoot: options.getShadowRoot,
            shadowRootFilter: isShadowRootTabbable
        });
    } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
    }
    return _sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
        candidates = _getCandidatesIteratively([
            container
        ], options.includeContainer, {
            filter: isNodeMatchingSelectorFocusable.bind(null, options),
            flatten: true,
            getShadowRoot: options.getShadowRoot
        });
    } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
    }
    return candidates;
};
var isTabbable = function isTabbable(node, options) {
    options = options || {};
    if (!node) {
        throw new Error('No node provided');
    }
    if (matches.call(node, candidateSelector) === false) {
        return false;
    }
    return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */ candidateSelectors.concat('iframe:not([inert]):not([inert] *)').join(',');
var isFocusable = function isFocusable(node, options) {
    options = options || {};
    if (!node) {
        throw new Error('No node provided');
    }
    if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
    }
    return isNodeMatchingSelectorFocusable(options, node);
};
;
 //# sourceMappingURL=index.esm.js.map
}),
"[project]/Desktop/frontend/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Composite",
    ()=>Composite,
    "CompositeItem",
    ()=>CompositeItem,
    "FloatingArrow",
    ()=>FloatingArrow,
    "FloatingDelayGroup",
    ()=>FloatingDelayGroup,
    "FloatingFocusManager",
    ()=>FloatingFocusManager,
    "FloatingList",
    ()=>FloatingList,
    "FloatingNode",
    ()=>FloatingNode,
    "FloatingOverlay",
    ()=>FloatingOverlay,
    "FloatingPortal",
    ()=>FloatingPortal,
    "FloatingTree",
    ()=>FloatingTree,
    "inner",
    ()=>inner,
    "safePolygon",
    ()=>safePolygon,
    "useClick",
    ()=>useClick,
    "useClientPoint",
    ()=>useClientPoint,
    "useDelayGroup",
    ()=>useDelayGroup,
    "useDelayGroupContext",
    ()=>useDelayGroupContext,
    "useDismiss",
    ()=>useDismiss,
    "useFloating",
    ()=>useFloating,
    "useFloatingNodeId",
    ()=>useFloatingNodeId,
    "useFloatingParentNodeId",
    ()=>useFloatingParentNodeId,
    "useFloatingPortalNode",
    ()=>useFloatingPortalNode,
    "useFloatingRootContext",
    ()=>useFloatingRootContext,
    "useFloatingTree",
    ()=>useFloatingTree,
    "useFocus",
    ()=>useFocus,
    "useHover",
    ()=>useHover,
    "useId",
    ()=>useId,
    "useInnerOffset",
    ()=>useInnerOffset,
    "useInteractions",
    ()=>useInteractions,
    "useListItem",
    ()=>useListItem,
    "useListNavigation",
    ()=>useListNavigation,
    "useMergeRefs",
    ()=>useMergeRefs,
    "useRole",
    ()=>useRole,
    "useTransitionStatus",
    ()=>useTransitionStatus,
    "useTransitionStyles",
    ()=>useTransitionStyles,
    "useTypeahead",
    ()=>useTypeahead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/tabbable/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-client] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 * @see https://floating-ui.com/docs/react-utils#usemergerefs
 */ function useMergeRefs(refs) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useMergeRefs.useMemo": ()=>{
            if (refs.every({
                "useMergeRefs.useMemo": (ref)=>ref == null
            }["useMergeRefs.useMemo"])) {
                return null;
            }
            return ({
                "useMergeRefs.useMemo": (value)=>{
                    refs.forEach({
                        "useMergeRefs.useMemo": (ref)=>{
                            if (typeof ref === 'function') {
                                ref(value);
                            } else if (ref != null) {
                                ref.current = value;
                            }
                        }
                    }["useMergeRefs.useMemo"]);
                }
            })["useMergeRefs.useMemo"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useMergeRefs.useMemo"], refs);
}
// https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
const SafeReact = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
};
const useInsertionEffect = SafeReact.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || ((fn)=>fn());
function useEffectEvent(callback) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef({
        "useEffectEvent.useRef[ref]": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                throw new Error('Cannot call an event handler while rendering.');
            }
        }
    }["useEffectEvent.useRef[ref]"]);
    useSafeInsertionEffect({
        "useEffectEvent.useSafeInsertionEffect": ()=>{
            ref.current = callback;
        }
    }["useEffectEvent.useSafeInsertionEffect"]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useEffectEvent.useCallback": function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return ref.current == null ? void 0 : ref.current(...args);
        }
    }["useEffectEvent.useCallback"], []);
}
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
function isDifferentRow(index, cols, prevRow) {
    return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index) {
    return index < 0 || index >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
    return findNonDisabledIndex(listRef, {
        disabledIndices
    });
}
function getMaxIndex(listRef, disabledIndices) {
    return findNonDisabledIndex(listRef, {
        decrement: true,
        startingIndex: listRef.current.length,
        disabledIndices
    });
}
function findNonDisabledIndex(listRef, _temp) {
    let { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = _temp === void 0 ? {} : _temp;
    const list = listRef.current;
    let index = startingIndex;
    do {
        index += decrement ? -amount : amount;
    }while (index >= 0 && index <= list.length - 1 && isDisabled(list, index, disabledIndices))
    return index;
}
function getGridNavigatedIndex(elementsRef, _ref) {
    let { event, orientation, loop, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent: stop = false } = _ref;
    let nextIndex = prevIndex;
    if (event.key === ARROW_UP) {
        stop && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
        if (prevIndex === -1) {
            nextIndex = maxIndex;
        } else {
            nextIndex = findNonDisabledIndex(elementsRef, {
                startingIndex: nextIndex,
                amount: cols,
                decrement: true,
                disabledIndices
            });
            if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
                const col = prevIndex % cols;
                const maxCol = maxIndex % cols;
                const offset = maxIndex - (maxCol - col);
                if (maxCol === col) {
                    nextIndex = maxIndex;
                } else {
                    nextIndex = maxCol > col ? offset : offset - cols;
                }
            }
        }
        if (isIndexOutOfBounds(elementsRef, nextIndex)) {
            nextIndex = prevIndex;
        }
    }
    if (event.key === ARROW_DOWN) {
        stop && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
        if (prevIndex === -1) {
            nextIndex = minIndex;
        } else {
            nextIndex = findNonDisabledIndex(elementsRef, {
                startingIndex: prevIndex,
                amount: cols,
                disabledIndices
            });
            if (loop && prevIndex + cols > maxIndex) {
                nextIndex = findNonDisabledIndex(elementsRef, {
                    startingIndex: prevIndex % cols - cols,
                    amount: cols,
                    disabledIndices
                });
            }
        }
        if (isIndexOutOfBounds(elementsRef, nextIndex)) {
            nextIndex = prevIndex;
        }
    }
    // Remains on the same row/column.
    if (orientation === 'both') {
        const prevRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(prevIndex / cols);
        if (event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT)) {
            stop && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            if (prevIndex % cols !== cols - 1) {
                nextIndex = findNonDisabledIndex(elementsRef, {
                    startingIndex: prevIndex,
                    disabledIndices
                });
                if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledIndex(elementsRef, {
                        startingIndex: prevIndex - prevIndex % cols - 1,
                        disabledIndices
                    });
                }
            } else if (loop) {
                nextIndex = findNonDisabledIndex(elementsRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            }
            if (isDifferentRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        if (event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)) {
            stop && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            if (prevIndex % cols !== 0) {
                nextIndex = findNonDisabledIndex(elementsRef, {
                    startingIndex: prevIndex,
                    decrement: true,
                    disabledIndices
                });
                if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledIndex(elementsRef, {
                        startingIndex: prevIndex + (cols - prevIndex % cols),
                        decrement: true,
                        disabledIndices
                    });
                }
            } else if (loop) {
                nextIndex = findNonDisabledIndex(elementsRef, {
                    startingIndex: prevIndex + (cols - prevIndex % cols),
                    decrement: true,
                    disabledIndices
                });
            }
            if (isDifferentRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        const lastRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(maxIndex / cols) === prevRow;
        if (isIndexOutOfBounds(elementsRef, nextIndex)) {
            if (loop && lastRow) {
                nextIndex = event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT) ? maxIndex : findNonDisabledIndex(elementsRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            } else {
                nextIndex = prevIndex;
            }
        }
    }
    return nextIndex;
}
/** For each cell index, gets the item index that occupies that cell */ function buildCellMap(sizes, cols, dense) {
    const cellMap = [];
    let startIndex = 0;
    sizes.forEach((_ref2, index)=>{
        let { width, height } = _ref2;
        if (width > cols) {
            if ("TURBOPACK compile-time truthy", 1) {
                throw new Error("[Floating UI]: Invalid grid - item width at index " + index + " is greater than grid columns");
            }
        }
        let itemPlaced = false;
        if (dense) {
            startIndex = 0;
        }
        while(!itemPlaced){
            const targetCells = [];
            for(let i = 0; i < width; i++){
                for(let j = 0; j < height; j++){
                    targetCells.push(startIndex + i + j * cols);
                }
            }
            if (startIndex % cols + width <= cols && targetCells.every((cell)=>cellMap[cell] == null)) {
                targetCells.forEach((cell)=>{
                    cellMap[cell] = index;
                });
                itemPlaced = true;
            } else {
                startIndex++;
            }
        }
    });
    // convert into a non-sparse array
    return [
        ...cellMap
    ];
}
/** Gets cell index of an item's corner or -1 when index is -1. */ function getCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
    if (index === -1) return -1;
    const firstCellIndex = cellMap.indexOf(index);
    const sizeItem = sizes[index];
    switch(corner){
        case 'tl':
            return firstCellIndex;
        case 'tr':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + sizeItem.width - 1;
        case 'bl':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + (sizeItem.height - 1) * cols;
        case 'br':
            return cellMap.lastIndexOf(index);
    }
}
/** Gets all cell indices that correspond to the specified indices */ function getCellIndices(indices, cellMap) {
    return cellMap.flatMap((index, cellIndex)=>indices.includes(index) ? [
            cellIndex
        ] : []);
}
function isDisabled(list, index, disabledIndices) {
    if (disabledIndices) {
        return disabledIndices.includes(index);
    }
    const element = list[index];
    return element == null || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
var index = typeof document !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
function sortByDocumentPosition(a, b) {
    const position = a.compareDocumentPosition(b);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
    }
    return 0;
}
function areMapsEqual(map1, map2) {
    if (map1.size !== map2.size) {
        return false;
    }
    for (const [key, value] of map1.entries()){
        if (value !== map2.get(key)) {
            return false;
        }
    }
    return true;
}
const FloatingListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createContext({
    register: ()=>{},
    unregister: ()=>{},
    map: /*#__PURE__*/ new Map(),
    elementsRef: {
        current: []
    }
});
/**
 * Provides context for a list of items within the floating element.
 * @see https://floating-ui.com/docs/FloatingList
 */ function FloatingList(props) {
    const { children, elementsRef, labelsRef } = props;
    const [map, setMap] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        "FloatingList.useState": ()=>new Map()
    }["FloatingList.useState"]);
    const register = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "FloatingList.useCallback[register]": (node)=>{
            setMap({
                "FloatingList.useCallback[register]": (prevMap)=>new Map(prevMap).set(node, null)
            }["FloatingList.useCallback[register]"]);
        }
    }["FloatingList.useCallback[register]"], []);
    const unregister = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "FloatingList.useCallback[unregister]": (node)=>{
            setMap({
                "FloatingList.useCallback[unregister]": (prevMap)=>{
                    const map = new Map(prevMap);
                    map.delete(node);
                    return map;
                }
            }["FloatingList.useCallback[unregister]"]);
        }
    }["FloatingList.useCallback[unregister]"], []);
    index(()=>{
        const newMap = new Map(map);
        const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
        nodes.forEach((node, index)=>{
            newMap.set(node, index);
        });
        if (!areMapsEqual(map, newMap)) {
            setMap(newMap);
        }
    }, [
        map
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FloatingListContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
            "FloatingList.useMemo": ()=>({
                    register,
                    unregister,
                    map,
                    elementsRef,
                    labelsRef
                })
        }["FloatingList.useMemo"], [
            register,
            unregister,
            map,
            elementsRef,
            labelsRef
        ])
    }, children);
}
/**
 * Used to register a list item and its index (DOM position) in the
 * `FloatingList`.
 * @see https://floating-ui.com/docs/FloatingList#uselistitem
 */ function useListItem(props) {
    if (props === void 0) {
        props = {};
    }
    const { label } = props;
    const { register, unregister, map, elementsRef, labelsRef } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useContext(FloatingListContext);
    const [index$1, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const componentRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useListItem.useCallback[ref]": (node)=>{
            componentRef.current = node;
            if (index$1 !== null) {
                elementsRef.current[index$1] = node;
                if (labelsRef) {
                    var _node$textContent;
                    const isLabelDefined = label !== undefined;
                    labelsRef.current[index$1] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
                }
            }
        }
    }["useListItem.useCallback[ref]"], [
        index$1,
        elementsRef,
        labelsRef,
        label
    ]);
    index(()=>{
        const node = componentRef.current;
        if (node) {
            register(node);
            return ()=>{
                unregister(node);
            };
        }
    }, [
        register,
        unregister
    ]);
    index(()=>{
        const index = componentRef.current ? map.get(componentRef.current) : null;
        if (index != null) {
            setIndex(index);
        }
    }, [
        map
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useListItem.useMemo": ()=>({
                ref,
                index: index$1 == null ? -1 : index$1
            })
    }["useListItem.useMemo"], [
        index$1,
        ref
    ]);
}
function renderJsx(render, computedProps) {
    if (typeof render === 'function') {
        return render(computedProps);
    }
    if (render) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.cloneElement(render, computedProps);
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("div", computedProps);
}
const CompositeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createContext({
    activeIndex: 0,
    onNavigate: ()=>{}
});
const horizontalKeys = [
    ARROW_LEFT,
    ARROW_RIGHT
];
const verticalKeys = [
    ARROW_UP,
    ARROW_DOWN
];
const allKeys = [
    ...horizontalKeys,
    ...verticalKeys
];
/**
 * Creates a single tab stop whose items are navigated by arrow keys, which
 * provides list navigation outside of floating element contexts.
 *
 * This is useful to enable navigation of a list of items that aren’t part of a
 * floating element. A menubar is an example of a composite, with each reference
 * element being an item.
 * @see https://floating-ui.com/docs/Composite
 */ const Composite = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(function Composite(props, forwardedRef) {
    const { render, orientation = 'both', loop = true, rtl = false, cols = 1, disabledIndices, activeIndex: externalActiveIndex, onNavigate: externalSetActiveIndex, itemSizes, dense = false, ...domProps } = props;
    const [internalActiveIndex, internalSetActiveIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(0);
    const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
    const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
    const elementsRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef([]);
    const renderElementProps = render && typeof render !== 'function' ? render.props : {};
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "Composite.Composite.useMemo[contextValue]": ()=>({
                activeIndex,
                onNavigate
            })
    }["Composite.Composite.useMemo[contextValue]"], [
        activeIndex,
        onNavigate
    ]);
    const isGrid = cols > 1;
    function handleKeyDown(event) {
        if (!allKeys.includes(event.key)) return;
        let nextIndex = activeIndex;
        const minIndex = getMinIndex(elementsRef, disabledIndices);
        const maxIndex = getMaxIndex(elementsRef, disabledIndices);
        const horizontalEndKey = rtl ? ARROW_LEFT : ARROW_RIGHT;
        const horizontalStartKey = rtl ? ARROW_RIGHT : ARROW_LEFT;
        if (isGrid) {
            const sizes = itemSizes || Array.from({
                length: elementsRef.current.length
            }, ()=>({
                    width: 1,
                    height: 1
                }));
            // To calculate movements on the grid, we use hypothetical cell indices
            // as if every item was 1x1, then convert back to real indices.
            const cellMap = buildCellMap(sizes, cols, dense);
            const minGridIndex = cellMap.findIndex((index)=>index != null && !isDisabled(elementsRef.current, index, disabledIndices));
            // last enabled index
            const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex)=>index != null && !isDisabled(elementsRef.current, index, disabledIndices) ? cellIndex : foundIndex, -1);
            const maybeNextIndex = cellMap[getGridNavigatedIndex({
                current: cellMap.map((itemIndex)=>itemIndex ? elementsRef.current[itemIndex] : null)
            }, {
                event,
                orientation,
                loop,
                rtl,
                cols,
                // treat undefined (empty grid spaces) as disabled indices so we
                // don't end up in them
                disabledIndices: getCellIndices([
                    ...disabledIndices || elementsRef.current.map((_, index)=>isDisabled(elementsRef.current, index) ? index : undefined),
                    undefined
                ], cellMap),
                minIndex: minGridIndex,
                maxIndex: maxGridIndex,
                prevIndex: getCellIndexOfCorner(activeIndex > maxIndex ? minIndex : activeIndex, sizes, cellMap, cols, // use a corner matching the edge closest to the direction we're
                // moving in so we don't end up in the same item. Prefer
                // top/left over bottom/right.
                event.key === ARROW_DOWN ? 'bl' : event.key === horizontalEndKey ? 'tr' : 'tl')
            })];
            if (maybeNextIndex != null) {
                nextIndex = maybeNextIndex;
            }
        }
        const toEndKeys = {
            horizontal: [
                horizontalEndKey
            ],
            vertical: [
                ARROW_DOWN
            ],
            both: [
                horizontalEndKey,
                ARROW_DOWN
            ]
        }[orientation];
        const toStartKeys = {
            horizontal: [
                horizontalStartKey
            ],
            vertical: [
                ARROW_UP
            ],
            both: [
                horizontalStartKey,
                ARROW_UP
            ]
        }[orientation];
        const preventedKeys = isGrid ? allKeys : ({
            horizontal: horizontalKeys,
            vertical: verticalKeys,
            both: allKeys
        })[orientation];
        if (nextIndex === activeIndex && [
            ...toEndKeys,
            ...toStartKeys
        ].includes(event.key)) {
            if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
                nextIndex = minIndex;
            } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
                nextIndex = maxIndex;
            } else {
                nextIndex = findNonDisabledIndex(elementsRef, {
                    startingIndex: nextIndex,
                    decrement: toStartKeys.includes(event.key),
                    disabledIndices
                });
            }
        }
        if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
            var _elementsRef$current$;
            event.stopPropagation();
            if (preventedKeys.includes(event.key)) {
                event.preventDefault();
            }
            onNavigate(nextIndex);
            (_elementsRef$current$ = elementsRef.current[nextIndex]) == null || _elementsRef$current$.focus();
        }
    }
    const computedProps = {
        ...domProps,
        ...renderElementProps,
        ref: forwardedRef,
        'aria-orientation': orientation === 'both' ? undefined : orientation,
        onKeyDown (e) {
            domProps.onKeyDown == null || domProps.onKeyDown(e);
            renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
            handleKeyDown(e);
        }
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(CompositeContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FloatingList, {
        elementsRef: elementsRef
    }, renderJsx(render, computedProps)));
});
/**
 * @see https://floating-ui.com/docs/Composite
 */ const CompositeItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(function CompositeItem(props, forwardedRef) {
    const { render, ...domProps } = props;
    const renderElementProps = render && typeof render !== 'function' ? render.props : {};
    const { activeIndex, onNavigate } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useContext(CompositeContext);
    const { ref, index } = useListItem();
    const mergedRef = useMergeRefs([
        ref,
        forwardedRef,
        renderElementProps.ref
    ]);
    const isActive = activeIndex === index;
    const computedProps = {
        ...domProps,
        ...renderElementProps,
        ref: mergedRef,
        tabIndex: isActive ? 0 : -1,
        'data-active': isActive ? '' : undefined,
        onFocus (e) {
            domProps.onFocus == null || domProps.onFocus(e);
            renderElementProps.onFocus == null || renderElementProps.onFocus(e);
            onNavigate(index);
        }
    };
    return renderJsx(render, computedProps);
});
function _extends() {
    _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable";
    return _extends.apply(this, arguments);
}
let serverHandoffComplete = false;
let count = 0;
const genId = ()=>// on <React 18
    "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
function useFloatingId() {
    const [id, setId] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        "useFloatingId.useState": ()=>serverHandoffComplete ? genId() : undefined
    }["useFloatingId.useState"]);
    index(()=>{
        if (id == null) {
            setId(genId());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useFloatingId.useEffect": ()=>{
            serverHandoffComplete = true;
        }
    }["useFloatingId.useEffect"], []);
    return id;
}
const useReactId = SafeReact.useId;
/**
 * Uses React 18's built-in `useId()` when available, or falls back to a
 * slightly less performant (requiring a double render) implementation for
 * earlier React versions.
 * @see https://floating-ui.com/docs/react-utils#useid
 */ const useId = useReactId || useFloatingId;
let devMessageSet;
if ("TURBOPACK compile-time truthy", 1) {
    devMessageSet = /*#__PURE__*/ new Set();
}
function warn() {
    var _devMessageSet;
    for(var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++){
        messages[_key] = arguments[_key];
    }
    const message = "Floating UI: " + messages.join(' ');
    if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message))) {
        var _devMessageSet2;
        (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message);
        console.warn(message);
    }
}
function error() {
    var _devMessageSet3;
    for(var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
        messages[_key2] = arguments[_key2];
    }
    const message = "Floating UI: " + messages.join(' ');
    if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))) {
        var _devMessageSet4;
        (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
        console.error(message);
    }
}
/**
 * Renders a pointing arrow triangle.
 * @see https://floating-ui.com/docs/FloatingArrow
 */ const FloatingArrow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(function FloatingArrow(props, ref) {
    const { context: { placement, elements: { floating }, middlewareData: { arrow, shift } }, width = 14, height = 7, tipRadius = 0, strokeWidth = 0, staticOffset, stroke, d, style: { transform, ...restStyle } = {}, ...rest } = props;
    if ("TURBOPACK compile-time truthy", 1) {
        if (!ref) {
            warn('The `ref` prop is required for `FloatingArrow`.');
        }
    }
    const clipPathId = useId();
    const [isRTL, setIsRTL] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(false);
    // https://github.com/floating-ui/floating-ui/issues/2932
    index(()=>{
        if (!floating) return;
        const isRTL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(floating).direction === 'rtl';
        if (isRTL) {
            setIsRTL(true);
        }
    }, [
        floating
    ]);
    if (!floating) {
        return null;
    }
    const [side, alignment] = placement.split('-');
    const isVerticalSide = side === 'top' || side === 'bottom';
    let computedStaticOffset = staticOffset;
    if (isVerticalSide && shift != null && shift.x || !isVerticalSide && shift != null && shift.y) {
        computedStaticOffset = null;
    }
    // Strokes must be double the border width, this ensures the stroke's width
    // works as you'd expect.
    const computedStrokeWidth = strokeWidth * 2;
    const halfStrokeWidth = computedStrokeWidth / 2;
    const svgX = width / 2 * (tipRadius / -8 + 1);
    const svgY = height / 2 * tipRadius / 4;
    const isCustomShape = !!d;
    const yOffsetProp = computedStaticOffset && alignment === 'end' ? 'bottom' : 'top';
    let xOffsetProp = computedStaticOffset && alignment === 'end' ? 'right' : 'left';
    if (computedStaticOffset && isRTL) {
        xOffsetProp = alignment === 'end' ? 'left' : 'right';
    }
    const arrowX = (arrow == null ? void 0 : arrow.x) != null ? computedStaticOffset || arrow.x : '';
    const arrowY = (arrow == null ? void 0 : arrow.y) != null ? computedStaticOffset || arrow.y : '';
    const dValue = d || 'M0,0' + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + ' Z';
    const rotation = {
        top: isCustomShape ? 'rotate(180deg)' : '',
        left: isCustomShape ? 'rotate(90deg)' : 'rotate(-90deg)',
        bottom: isCustomShape ? '' : 'rotate(180deg)',
        right: isCustomShape ? 'rotate(-90deg)' : 'rotate(90deg)'
    }[side];
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("svg", _extends({}, rest, {
        "aria-hidden": true,
        ref: ref,
        width: isCustomShape ? width : width + computedStrokeWidth,
        height: width,
        viewBox: "0 0 " + width + " " + (height > width ? height : width),
        style: {
            position: 'absolute',
            pointerEvents: 'none',
            [xOffsetProp]: arrowX,
            [yOffsetProp]: arrowY,
            [side]: isVerticalSide || isCustomShape ? '100%' : "calc(100% - " + computedStrokeWidth / 2 + "px)",
            transform: [
                rotation,
                transform
            ].filter((t)=>!!t).join(' '),
            ...restStyle
        }
    }), computedStrokeWidth > 0 && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("path", {
        clipPath: "url(#" + clipPathId + ")",
        fill: "none",
        stroke: stroke,
        strokeWidth: computedStrokeWidth + (d ? 0 : 1),
        d: dValue
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("path", {
        stroke: computedStrokeWidth && !d ? rest.fill : 'none',
        d: dValue
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("clipPath", {
        id: clipPathId
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("rect", {
        x: -halfStrokeWidth,
        y: halfStrokeWidth * (isCustomShape ? -1 : 1),
        width: width + computedStrokeWidth,
        height: width
    })));
});
function createPubSub() {
    const map = new Map();
    return {
        emit (event, data) {
            var _map$get;
            (_map$get = map.get(event)) == null || _map$get.forEach((handler)=>handler(data));
        },
        on (event, listener) {
            map.set(event, [
                ...map.get(event) || [],
                listener
            ]);
        },
        off (event, listener) {
            var _map$get2;
            map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l)=>l !== listener)) || []);
        }
    };
}
const FloatingNodeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createContext(null);
const FloatingTreeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createContext(null);
/**
 * Returns the parent node id for nested floating elements, if available.
 * Returns `null` for top-level floating elements.
 */ const useFloatingParentNodeId = ()=>{
    var _React$useContext;
    return ((_React$useContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
/**
 * Returns the nearest floating tree context, if available.
 */ const useFloatingTree = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useContext(FloatingTreeContext);
/**
 * Registers a node into the `FloatingTree`, returning its id.
 * @see https://floating-ui.com/docs/FloatingTree
 */ function useFloatingNodeId(customParentId) {
    const id = useId();
    const tree = useFloatingTree();
    const reactParentId = useFloatingParentNodeId();
    const parentId = customParentId || reactParentId;
    index(()=>{
        const node = {
            id,
            parentId
        };
        tree == null || tree.addNode(node);
        return ()=>{
            tree == null || tree.removeNode(node);
        };
    }, [
        tree,
        id,
        parentId
    ]);
    return id;
}
/**
 * Provides parent node context for nested floating elements.
 * @see https://floating-ui.com/docs/FloatingTree
 */ function FloatingNode(props) {
    const { children, id } = props;
    const parentId = useFloatingParentNodeId();
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FloatingNodeContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
            "FloatingNode.useMemo": ()=>({
                    id,
                    parentId
                })
        }["FloatingNode.useMemo"], [
            id,
            parentId
        ])
    }, children);
}
/**
 * Provides context for nested floating elements when they are not children of
 * each other on the DOM.
 * This is not necessary in all cases, except when there must be explicit communication between parent and child floating elements. It is necessary for:
 * - The `bubbles` option in the `useDismiss()` Hook
 * - Nested virtual list navigation
 * - Nested floating elements that each open on hover
 * - Custom communication between parent and child floating elements
 * @see https://floating-ui.com/docs/FloatingTree
 */ function FloatingTree(props) {
    const { children } = props;
    const nodesRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef([]);
    const addNode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "FloatingTree.useCallback[addNode]": (node)=>{
            nodesRef.current = [
                ...nodesRef.current,
                node
            ];
        }
    }["FloatingTree.useCallback[addNode]"], []);
    const removeNode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "FloatingTree.useCallback[removeNode]": (node)=>{
            nodesRef.current = nodesRef.current.filter({
                "FloatingTree.useCallback[removeNode]": (n)=>n !== node
            }["FloatingTree.useCallback[removeNode]"]);
        }
    }["FloatingTree.useCallback[removeNode]"], []);
    const events = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        "FloatingTree.useState": ()=>createPubSub()
    }["FloatingTree.useState"])[0];
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FloatingTreeContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
            "FloatingTree.useMemo": ()=>({
                    nodesRef,
                    addNode,
                    removeNode,
                    events
                })
        }["FloatingTree.useMemo"], [
            addNode,
            removeNode,
            events
        ])
    }, children);
}
function createAttribute(name) {
    return "data-floating-ui-" + name;
}
function useLatestRef(value) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value);
    index(()=>{
        ref.current = value;
    });
    return ref;
}
const safePolygonIdentifier = /*#__PURE__*/ createAttribute('safe-polygon');
function getDelay(value, prop, pointerType) {
    if (pointerType && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType)) {
        return 0;
    }
    if (typeof value === 'number') {
        return value;
    }
    return value == null ? void 0 : value[prop];
}
/**
 * Opens the floating element while hovering over the reference element, like
 * CSS `:hover`.
 * @see https://floating-ui.com/docs/useHover
 */ function useHover(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { open, onOpenChange, dataRef, events, elements } = context;
    const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true } = props;
    const tree = useFloatingTree();
    const parentId = useFloatingParentNodeId();
    const handleCloseRef = useLatestRef(handleClose);
    const delayRef = useLatestRef(delay);
    const openRef = useLatestRef(open);
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef();
    const timeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(-1);
    const handlerRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef();
    const restTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(-1);
    const blockMouseMoveRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(true);
    const performedPointerEventsMutationRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const unbindMouseMoveRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef({
        "useHover.useRef[unbindMouseMoveRef]": ()=>{}
    }["useHover.useRef[unbindMouseMoveRef]"]);
    const restTimeoutPendingRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const isHoverOpen = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useHover.useCallback[isHoverOpen]": ()=>{
            var _dataRef$current$open;
            const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
            return (type == null ? void 0 : type.includes('mouse')) && type !== 'mousedown';
        }
    }["useHover.useCallback[isHoverOpen]"], [
        dataRef
    ]);
    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useHover.useEffect": ()=>{
            if (!enabled) return;
            function onOpenChange(_ref) {
                let { open } = _ref;
                if (!open) {
                    clearTimeout(timeoutRef.current);
                    clearTimeout(restTimeoutRef.current);
                    blockMouseMoveRef.current = true;
                    restTimeoutPendingRef.current = false;
                }
            }
            events.on('openchange', onOpenChange);
            return ({
                "useHover.useEffect": ()=>{
                    events.off('openchange', onOpenChange);
                }
            })["useHover.useEffect"];
        }
    }["useHover.useEffect"], [
        enabled,
        events
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useHover.useEffect": ()=>{
            if (!enabled) return;
            if (!handleCloseRef.current) return;
            if (!open) return;
            function onLeave(event) {
                if (isHoverOpen()) {
                    onOpenChange(false, event, 'hover');
                }
            }
            const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating).documentElement;
            html.addEventListener('mouseleave', onLeave);
            return ({
                "useHover.useEffect": ()=>{
                    html.removeEventListener('mouseleave', onLeave);
                }
            })["useHover.useEffect"];
        }
    }["useHover.useEffect"], [
        elements.floating,
        open,
        onOpenChange,
        enabled,
        handleCloseRef,
        isHoverOpen
    ]);
    const closeWithDelay = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useHover.useCallback[closeWithDelay]": function(event, runElseBranch, reason) {
            if (runElseBranch === void 0) {
                runElseBranch = true;
            }
            if (reason === void 0) {
                reason = 'hover';
            }
            const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
            if (closeDelay && !handlerRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout({
                    "useHover.useCallback[closeWithDelay]": ()=>onOpenChange(false, event, reason)
                }["useHover.useCallback[closeWithDelay]"], closeDelay);
            } else if (runElseBranch) {
                clearTimeout(timeoutRef.current);
                onOpenChange(false, event, reason);
            }
        }
    }["useHover.useCallback[closeWithDelay]"], [
        delayRef,
        onOpenChange
    ]);
    const cleanupMouseMoveHandler = useEffectEvent({
        "useHover.useEffectEvent[cleanupMouseMoveHandler]": ()=>{
            unbindMouseMoveRef.current();
            handlerRef.current = undefined;
        }
    }["useHover.useEffectEvent[cleanupMouseMoveHandler]"]);
    const clearPointerEvents = useEffectEvent({
        "useHover.useEffectEvent[clearPointerEvents]": ()=>{
            if (performedPointerEventsMutationRef.current) {
                const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating).body;
                body.style.pointerEvents = '';
                body.removeAttribute(safePolygonIdentifier);
                performedPointerEventsMutationRef.current = false;
            }
        }
    }["useHover.useEffectEvent[clearPointerEvents]"]);
    const isClickLikeOpenEvent = useEffectEvent({
        "useHover.useEffectEvent[isClickLikeOpenEvent]": ()=>{
            return dataRef.current.openEvent ? [
                'click',
                'mousedown'
            ].includes(dataRef.current.openEvent.type) : false;
        }
    }["useHover.useEffectEvent[isClickLikeOpenEvent]"]);
    // Registering the mouse events on the reference directly to bypass React's
    // delegation system. If the cursor was on a disabled element and then entered
    // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useHover.useEffect": ()=>{
            if (!enabled) return;
            function onMouseEnter(event) {
                clearTimeout(timeoutRef.current);
                blockMouseMoveRef.current = false;
                if (mouseOnly && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerTypeRef.current) || restMs > 0 && !getDelay(delayRef.current, 'open')) {
                    return;
                }
                const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
                if (openDelay) {
                    timeoutRef.current = window.setTimeout({
                        "useHover.useEffect.onMouseEnter": ()=>{
                            if (!openRef.current) {
                                onOpenChange(true, event, 'hover');
                            }
                        }
                    }["useHover.useEffect.onMouseEnter"], openDelay);
                } else if (!open) {
                    onOpenChange(true, event, 'hover');
                }
            }
            function onMouseLeave(event) {
                if (isClickLikeOpenEvent()) return;
                unbindMouseMoveRef.current();
                const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating);
                clearTimeout(restTimeoutRef.current);
                restTimeoutPendingRef.current = false;
                if (handleCloseRef.current && dataRef.current.floatingContext) {
                    // Prevent clearing `onScrollMouseLeave` timeout.
                    if (!open) {
                        clearTimeout(timeoutRef.current);
                    }
                    handlerRef.current = handleCloseRef.current({
                        ...dataRef.current.floatingContext,
                        tree,
                        x: event.clientX,
                        y: event.clientY,
                        onClose () {
                            clearPointerEvents();
                            cleanupMouseMoveHandler();
                            if (!isClickLikeOpenEvent()) {
                                closeWithDelay(event, true, 'safe-polygon');
                            }
                        }
                    });
                    const handler = handlerRef.current;
                    doc.addEventListener('mousemove', handler);
                    unbindMouseMoveRef.current = ({
                        "useHover.useEffect.onMouseLeave": ()=>{
                            doc.removeEventListener('mousemove', handler);
                        }
                    })["useHover.useEffect.onMouseLeave"];
                    return;
                }
                // Allow interactivity without `safePolygon` on touch devices. With a
                // pointer, a short close delay is an alternative, so it should work
                // consistently.
                const shouldClose = pointerTypeRef.current === 'touch' ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.floating, event.relatedTarget) : true;
                if (shouldClose) {
                    closeWithDelay(event);
                }
            }
            // Ensure the floating element closes after scrolling even if the pointer
            // did not move.
            // https://github.com/floating-ui/floating-ui/discussions/1692
            function onScrollMouseLeave(event) {
                if (isClickLikeOpenEvent()) return;
                if (!dataRef.current.floatingContext) return;
                handleCloseRef.current == null || handleCloseRef.current({
                    ...dataRef.current.floatingContext,
                    tree,
                    x: event.clientX,
                    y: event.clientY,
                    onClose () {
                        clearPointerEvents();
                        cleanupMouseMoveHandler();
                        if (!isClickLikeOpenEvent()) {
                            closeWithDelay(event);
                        }
                    }
                })(event);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elements.domReference)) {
                var _elements$floating;
                const ref = elements.domReference;
                open && ref.addEventListener('mouseleave', onScrollMouseLeave);
                (_elements$floating = elements.floating) == null || _elements$floating.addEventListener('mouseleave', onScrollMouseLeave);
                move && ref.addEventListener('mousemove', onMouseEnter, {
                    once: true
                });
                ref.addEventListener('mouseenter', onMouseEnter);
                ref.addEventListener('mouseleave', onMouseLeave);
                return ({
                    "useHover.useEffect": ()=>{
                        var _elements$floating2;
                        open && ref.removeEventListener('mouseleave', onScrollMouseLeave);
                        (_elements$floating2 = elements.floating) == null || _elements$floating2.removeEventListener('mouseleave', onScrollMouseLeave);
                        move && ref.removeEventListener('mousemove', onMouseEnter);
                        ref.removeEventListener('mouseenter', onMouseEnter);
                        ref.removeEventListener('mouseleave', onMouseLeave);
                    }
                })["useHover.useEffect"];
            }
        }
    }["useHover.useEffect"], [
        elements,
        enabled,
        context,
        mouseOnly,
        restMs,
        move,
        closeWithDelay,
        cleanupMouseMoveHandler,
        clearPointerEvents,
        onOpenChange,
        open,
        openRef,
        tree,
        delayRef,
        handleCloseRef,
        dataRef,
        isClickLikeOpenEvent
    ]);
    // Block pointer-events of every element other than the reference and floating
    // while the floating element is open and has a `handleClose` handler. Also
    // handles nested floating elements.
    // https://github.com/floating-ui/floating-ui/issues/1722
    index(()=>{
        var _handleCloseRef$curre;
        if (!enabled) return;
        if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
            performedPointerEventsMutationRef.current = true;
            const floatingEl = elements.floating;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elements.domReference) && floatingEl) {
                var _tree$nodesRef$curren;
                const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating).body;
                body.setAttribute(safePolygonIdentifier, '');
                const ref = elements.domReference;
                const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node)=>node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
                if (parentFloating) {
                    parentFloating.style.pointerEvents = '';
                }
                body.style.pointerEvents = 'none';
                ref.style.pointerEvents = 'auto';
                floatingEl.style.pointerEvents = 'auto';
                return ()=>{
                    body.style.pointerEvents = '';
                    ref.style.pointerEvents = '';
                    floatingEl.style.pointerEvents = '';
                };
            }
        }
    }, [
        enabled,
        open,
        parentId,
        elements,
        tree,
        handleCloseRef,
        isHoverOpen
    ]);
    index(()=>{
        if (!open) {
            pointerTypeRef.current = undefined;
            restTimeoutPendingRef.current = false;
            cleanupMouseMoveHandler();
            clearPointerEvents();
        }
    }, [
        open,
        cleanupMouseMoveHandler,
        clearPointerEvents
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useHover.useEffect": ()=>{
            return ({
                "useHover.useEffect": ()=>{
                    cleanupMouseMoveHandler();
                    clearTimeout(timeoutRef.current);
                    clearTimeout(restTimeoutRef.current);
                    clearPointerEvents();
                }
            })["useHover.useEffect"];
        }
    }["useHover.useEffect"], [
        enabled,
        elements.domReference,
        cleanupMouseMoveHandler,
        clearPointerEvents
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useHover.useMemo[reference]": ()=>{
            function setPointerRef(event) {
                pointerTypeRef.current = event.pointerType;
            }
            return {
                onPointerDown: setPointerRef,
                onPointerEnter: setPointerRef,
                onMouseMove (event) {
                    const { nativeEvent } = event;
                    function handleMouseMove() {
                        if (!blockMouseMoveRef.current && !openRef.current) {
                            onOpenChange(true, nativeEvent, 'hover');
                        }
                    }
                    if (mouseOnly && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerTypeRef.current)) {
                        return;
                    }
                    if (open || restMs === 0) {
                        return;
                    }
                    // Ignore insignificant movements to account for tremors.
                    if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
                        return;
                    }
                    clearTimeout(restTimeoutRef.current);
                    if (pointerTypeRef.current === 'touch') {
                        handleMouseMove();
                    } else {
                        restTimeoutPendingRef.current = true;
                        restTimeoutRef.current = window.setTimeout(handleMouseMove, restMs);
                    }
                }
            };
        }
    }["useHover.useMemo[reference]"], [
        mouseOnly,
        onOpenChange,
        open,
        openRef,
        restMs
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useHover.useMemo[floating]": ()=>({
                onMouseEnter () {
                    clearTimeout(timeoutRef.current);
                },
                onMouseLeave (event) {
                    if (!isClickLikeOpenEvent()) {
                        closeWithDelay(event.nativeEvent, false);
                    }
                }
            })
    }["useHover.useMemo[floating]"], [
        closeWithDelay,
        isClickLikeOpenEvent
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useHover.useMemo": ()=>enabled ? {
                reference,
                floating
            } : {}
    }["useHover.useMemo"], [
        enabled,
        reference,
        floating
    ]);
}
const NOOP = ()=>{};
const FloatingDelayGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createContext({
    delay: 0,
    initialDelay: 0,
    timeoutMs: 0,
    currentId: null,
    setCurrentId: NOOP,
    setState: NOOP,
    isInstantPhase: false
});
/**
 * @deprecated
 * Use the return value of `useDelayGroup()` instead.
 */ const useDelayGroupContext = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useContext(FloatingDelayGroupContext);
/**
 * Provides context for a group of floating elements that should share a
 * `delay`.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 */ function FloatingDelayGroup(props) {
    const { children, delay, timeoutMs = 0 } = props;
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useReducer({
        "FloatingDelayGroup.useReducer": (prev, next)=>({
                ...prev,
                ...next
            })
    }["FloatingDelayGroup.useReducer"], {
        delay,
        timeoutMs,
        initialDelay: delay,
        currentId: null,
        isInstantPhase: false
    });
    const initialCurrentIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const setCurrentId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "FloatingDelayGroup.useCallback[setCurrentId]": (currentId)=>{
            setState({
                currentId
            });
        }
    }["FloatingDelayGroup.useCallback[setCurrentId]"], []);
    index(()=>{
        if (state.currentId) {
            if (initialCurrentIdRef.current === null) {
                initialCurrentIdRef.current = state.currentId;
            } else if (!state.isInstantPhase) {
                setState({
                    isInstantPhase: true
                });
            }
        } else {
            if (state.isInstantPhase) {
                setState({
                    isInstantPhase: false
                });
            }
            initialCurrentIdRef.current = null;
        }
    }, [
        state.currentId,
        state.isInstantPhase
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FloatingDelayGroupContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
            "FloatingDelayGroup.useMemo": ()=>({
                    ...state,
                    setState,
                    setCurrentId
                })
        }["FloatingDelayGroup.useMemo"], [
            state,
            setCurrentId
        ])
    }, children);
}
/**
 * Enables grouping when called inside a component that's a child of a
 * `FloatingDelayGroup`.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 */ function useDelayGroup(context, options) {
    if (options === void 0) {
        options = {};
    }
    const { open, onOpenChange, floatingId } = context;
    const { id: optionId, enabled = true } = options;
    const id = optionId != null ? optionId : floatingId;
    const groupContext = useDelayGroupContext();
    const { currentId, setCurrentId, initialDelay, setState, timeoutMs } = groupContext;
    index(()=>{
        if (!enabled) return;
        if (!currentId) return;
        setState({
            delay: {
                open: 1,
                close: getDelay(initialDelay, 'close')
            }
        });
        if (currentId !== id) {
            onOpenChange(false);
        }
    }, [
        enabled,
        id,
        onOpenChange,
        setState,
        currentId,
        initialDelay
    ]);
    index(()=>{
        function unset() {
            onOpenChange(false);
            setState({
                delay: initialDelay,
                currentId: null
            });
        }
        if (!enabled) return;
        if (!currentId) return;
        if (!open && currentId === id) {
            if (timeoutMs) {
                const timeout = window.setTimeout(unset, timeoutMs);
                return ()=>{
                    clearTimeout(timeout);
                };
            }
            unset();
        }
    }, [
        enabled,
        open,
        setState,
        currentId,
        id,
        onOpenChange,
        initialDelay,
        timeoutMs
    ]);
    index(()=>{
        if (!enabled) return;
        if (setCurrentId === NOOP || !open) return;
        setCurrentId(id);
    }, [
        enabled,
        open,
        setCurrentId,
        id
    ]);
    return groupContext;
}
let rafId = 0;
function enqueueFocus(el, options) {
    if (options === void 0) {
        options = {};
    }
    const { preventScroll = false, cancelPrevious = true, sync = false } = options;
    cancelPrevious && cancelAnimationFrame(rafId);
    const exec = ()=>el == null ? void 0 : el.focus({
            preventScroll
        });
    if (sync) {
        exec();
    } else {
        rafId = requestAnimationFrame(exec);
    }
}
function getAncestors(nodes, id) {
    var _nodes$find;
    let allAncestors = [];
    let currentParentId = (_nodes$find = nodes.find((node)=>node.id === id)) == null ? void 0 : _nodes$find.parentId;
    while(currentParentId){
        const currentNode = nodes.find((node)=>node.id === currentParentId);
        currentParentId = currentNode == null ? void 0 : currentNode.parentId;
        if (currentNode) {
            allAncestors = allAncestors.concat(currentNode);
        }
    }
    return allAncestors;
}
function getChildren(nodes, id) {
    let allChildren = nodes.filter((node)=>{
        var _node$context;
        return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
    });
    let currentChildren = allChildren;
    while(currentChildren.length){
        currentChildren = nodes.filter((node)=>{
            var _currentChildren;
            return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n)=>{
                var _node$context2;
                return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
            });
        });
        allChildren = allChildren.concat(currentChildren);
    }
    return allChildren;
}
function getDeepestNode(nodes, id) {
    let deepestNodeId;
    let maxDepth = -1;
    function findDeepest(nodeId, depth) {
        if (depth > maxDepth) {
            deepestNodeId = nodeId;
            maxDepth = depth;
        }
        const children = getChildren(nodes, nodeId);
        children.forEach((child)=>{
            findDeepest(child.id, depth + 1);
        });
    }
    findDeepest(id, 0);
    return nodes.find((node)=>node.id === deepestNodeId);
}
// Modified to add conditional `aria-hidden` support:
// https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts
let counterMap = /*#__PURE__*/ new WeakMap();
let uncontrolledElementsSet = /*#__PURE__*/ new WeakSet();
let markerMap = {};
let lockCount$1 = 0;
const supportsInert = ()=>typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
const unwrapHost = (node)=>node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets)=>targets.map((target)=>{
        if (parent.contains(target)) {
            return target;
        }
        const correctedTarget = unwrapHost(target);
        if (parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        return null;
    }).filter((x)=>x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
    const markerName = 'data-floating-ui-inert';
    const controlAttribute = inert ? 'inert' : ariaHidden ? 'aria-hidden' : null;
    const avoidElements = correctElements(body, uncorrectedAvoidElements);
    const elementsToKeep = new Set();
    const elementsToStop = new Set(avoidElements);
    const hiddenElements = [];
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    const markerCounter = markerMap[markerName];
    avoidElements.forEach(keep);
    deep(body);
    elementsToKeep.clear();
    function keep(el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        el.parentNode && keep(el.parentNode);
    }
    function deep(parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        [].forEach.call(parent.children, (node)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(node) === 'script') return;
            if (elementsToKeep.has(node)) {
                deep(node);
            } else {
                const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
                const alreadyHidden = attr !== null && attr !== 'false';
                const counterValue = (counterMap.get(node) || 0) + 1;
                const markerValue = (markerCounter.get(node) || 0) + 1;
                counterMap.set(node, counterValue);
                markerCounter.set(node, markerValue);
                hiddenElements.push(node);
                if (counterValue === 1 && alreadyHidden) {
                    uncontrolledElementsSet.add(node);
                }
                if (markerValue === 1) {
                    node.setAttribute(markerName, '');
                }
                if (!alreadyHidden && controlAttribute) {
                    node.setAttribute(controlAttribute, 'true');
                }
            }
        });
    }
    lockCount$1++;
    return ()=>{
        hiddenElements.forEach((element)=>{
            const counterValue = (counterMap.get(element) || 0) - 1;
            const markerValue = (markerCounter.get(element) || 0) - 1;
            counterMap.set(element, counterValue);
            markerCounter.set(element, markerValue);
            if (!counterValue) {
                if (!uncontrolledElementsSet.has(element) && controlAttribute) {
                    element.removeAttribute(controlAttribute);
                }
                uncontrolledElementsSet.delete(element);
            }
            if (!markerValue) {
                element.removeAttribute(markerName);
            }
        });
        lockCount$1--;
        if (!lockCount$1) {
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledElementsSet = new WeakSet();
            markerMap = {};
        }
    };
}
function markOthers(avoidElements, ariaHidden, inert) {
    if (ariaHidden === void 0) {
        ariaHidden = false;
    }
    if (inert === void 0) {
        inert = false;
    }
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(avoidElements[0]).body;
    return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll('[aria-live]'))), body, ariaHidden, inert);
}
const getTabbableOptions = ()=>({
        getShadowRoot: true,
        displayCheck: // JSDOM does not support the `tabbable` library. To solve this we can
        // check if `ResizeObserver` is a real function (not polyfilled), which
        // determines if the current environment is JSDOM-like.
        typeof ResizeObserver === 'function' && ResizeObserver.toString().includes('[native code]') ? 'full' : 'none'
    });
function getTabbableIn(container, direction) {
    const allTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions());
    if (direction === 'prev') {
        allTabbable.reverse();
    }
    const activeIndex = allTabbable.indexOf((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(container)));
    const nextTabbableElements = allTabbable.slice(activeIndex + 1);
    return nextTabbableElements[0];
}
function getNextTabbable() {
    return getTabbableIn(document.body, 'next');
}
function getPreviousTabbable() {
    return getTabbableIn(document.body, 'prev');
}
function isOutsideEvent(event, container) {
    const containerElement = container || event.currentTarget;
    const relatedTarget = event.relatedTarget;
    return !relatedTarget || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(containerElement, relatedTarget);
}
function disableFocusInside(container) {
    const tabbableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions());
    tabbableElements.forEach((element)=>{
        element.dataset.tabindex = element.getAttribute('tabindex') || '';
        element.setAttribute('tabindex', '-1');
    });
}
function enableFocusInside(container) {
    const elements = container.querySelectorAll('[data-tabindex]');
    elements.forEach((element)=>{
        const tabindex = element.dataset.tabindex;
        delete element.dataset.tabindex;
        if (tabindex) {
            element.setAttribute('tabindex', tabindex);
        } else {
            element.removeAttribute('tabindex');
        }
    });
}
// See Diego Haz's Sandbox for making this logic work well on Safari/iOS:
// https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/FocusTrap.tsx
const HIDDEN_STYLES = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: '1px',
    top: 0,
    left: 0
};
let timeoutId;
function setActiveElementOnTab(event) {
    if (event.key === 'Tab') {
        event.target;
        clearTimeout(timeoutId);
    }
}
const FocusGuard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(function FocusGuard(props, ref) {
    const [role, setRole] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState();
    index(()=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafari"])()) {
            // Unlike other screen readers such as NVDA and JAWS, the virtual cursor
            // on VoiceOver does trigger the onFocus event, so we can use the focus
            // trap element. On Safari, only buttons trigger the onFocus event.
            // NB: "group" role in the Sandbox no longer appears to work, must be a
            // button role.
            setRole('button');
        }
        document.addEventListener('keydown', setActiveElementOnTab);
        return ()=>{
            document.removeEventListener('keydown', setActiveElementOnTab);
        };
    }, []);
    const restProps = {
        ref,
        tabIndex: 0,
        // Role is only for VoiceOver
        role,
        'aria-hidden': role ? undefined : true,
        [createAttribute('focus-guard')]: '',
        style: HIDDEN_STYLES
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("span", _extends({}, props, restProps));
});
const PortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createContext(null);
const attr = /*#__PURE__*/ createAttribute('portal');
/**
 * @see https://floating-ui.com/docs/FloatingPortal#usefloatingportalnode
 */ function useFloatingPortalNode(props) {
    if (props === void 0) {
        props = {};
    }
    const { id, root } = props;
    const uniqueId = useId();
    const portalContext = usePortalContext();
    const [portalNode, setPortalNode] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const portalNodeRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    index(()=>{
        return ()=>{
            portalNode == null || portalNode.remove();
            // Allow the subsequent layout effects to create a new node on updates.
            // The portal node will still be cleaned up on unmount.
            // https://github.com/floating-ui/floating-ui/issues/2454
            queueMicrotask(()=>{
                portalNodeRef.current = null;
            });
        };
    }, [
        portalNode
    ]);
    index(()=>{
        // Wait for the uniqueId to be generated before creating the portal node in
        // React <18 (using `useFloatingId` instead of the native `useId`).
        // https://github.com/floating-ui/floating-ui/issues/2778
        if (!uniqueId) return;
        if (portalNodeRef.current) return;
        const existingIdRoot = id ? document.getElementById(id) : null;
        if (!existingIdRoot) return;
        const subRoot = document.createElement('div');
        subRoot.id = uniqueId;
        subRoot.setAttribute(attr, '');
        existingIdRoot.appendChild(subRoot);
        portalNodeRef.current = subRoot;
        setPortalNode(subRoot);
    }, [
        id,
        uniqueId
    ]);
    index(()=>{
        // Wait for the root to exist before creating the portal node. The root must
        // be stored in state, not a ref, for this to work reactively.
        if (root === null) return;
        if (!uniqueId) return;
        if (portalNodeRef.current) return;
        let container = root || (portalContext == null ? void 0 : portalContext.portalNode);
        if (container && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(container)) container = container.current;
        container = container || document.body;
        let idWrapper = null;
        if (id) {
            idWrapper = document.createElement('div');
            idWrapper.id = id;
            container.appendChild(idWrapper);
        }
        const subRoot = document.createElement('div');
        subRoot.id = uniqueId;
        subRoot.setAttribute(attr, '');
        container = idWrapper || container;
        container.appendChild(subRoot);
        portalNodeRef.current = subRoot;
        setPortalNode(subRoot);
    }, [
        id,
        root,
        uniqueId,
        portalContext
    ]);
    return portalNode;
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 */ function FloatingPortal(props) {
    const { children, id, root, preserveTabOrder = true } = props;
    const portalNode = useFloatingPortalNode({
        id,
        root
    });
    const [focusManagerState, setFocusManagerState] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const beforeOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const afterOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const beforeInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const afterInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
    const open = focusManagerState == null ? void 0 : focusManagerState.open;
    const shouldRenderGuards = // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode);
    // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingPortal.useEffect": ()=>{
            if (!portalNode || !preserveTabOrder || modal) {
                return;
            }
            // Make sure elements inside the portal element are tabbable only when the
            // portal has already been focused, either by tabbing into a focus trap
            // element outside or using the mouse.
            function onFocus(event) {
                if (portalNode && isOutsideEvent(event)) {
                    const focusing = event.type === 'focusin';
                    const manageFocus = focusing ? enableFocusInside : disableFocusInside;
                    manageFocus(portalNode);
                }
            }
            // Listen to the event on the capture phase so they run before the focus
            // trap elements onFocus prop is called.
            portalNode.addEventListener('focusin', onFocus, true);
            portalNode.addEventListener('focusout', onFocus, true);
            return ({
                "FloatingPortal.useEffect": ()=>{
                    portalNode.removeEventListener('focusin', onFocus, true);
                    portalNode.removeEventListener('focusout', onFocus, true);
                }
            })["FloatingPortal.useEffect"];
        }
    }["FloatingPortal.useEffect"], [
        portalNode,
        preserveTabOrder,
        modal
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingPortal.useEffect": ()=>{
            if (!portalNode) return;
            if (open) return;
            enableFocusInside(portalNode);
        }
    }["FloatingPortal.useEffect"], [
        open,
        portalNode
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(PortalContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
            "FloatingPortal.useMemo": ()=>({
                    preserveTabOrder,
                    beforeOutsideRef,
                    afterOutsideRef,
                    beforeInsideRef,
                    afterInsideRef,
                    portalNode,
                    setFocusManagerState
                })
        }["FloatingPortal.useMemo"], [
            preserveTabOrder,
            portalNode
        ])
    }, shouldRenderGuards && portalNode && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FocusGuard, {
        "data-type": "outside",
        ref: beforeOutsideRef,
        onFocus: (event)=>{
            if (isOutsideEvent(event, portalNode)) {
                var _beforeInsideRef$curr;
                (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
            } else {
                const prevTabbable = getPreviousTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
                prevTabbable == null || prevTabbable.focus();
            }
        }
    }), shouldRenderGuards && portalNode && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("span", {
        "aria-owns": portalNode.id,
        style: HIDDEN_STYLES
    }), portalNode && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"](children, portalNode), shouldRenderGuards && portalNode && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FocusGuard, {
        "data-type": "outside",
        ref: afterOutsideRef,
        onFocus: (event)=>{
            if (isOutsideEvent(event, portalNode)) {
                var _afterInsideRef$curre;
                (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
            } else {
                const nextTabbable = getNextTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
                nextTabbable == null || nextTabbable.focus();
                (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent, 'focus-out'));
            }
        }
    }));
}
const usePortalContext = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useContext(PortalContext);
const FOCUSABLE_ATTRIBUTE = 'data-floating-ui-focusable';
function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
        return null;
    }
    // Try to find the element that has `{...getFloatingProps()}` spread on it.
    // This indicates the floating element is acting as a positioning wrapper, and
    // so focus should be managed on the child element with the event handlers and
    // aria props.
    return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE + "]") || floatingElement;
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function addPreviouslyFocusedElement(element) {
    previouslyFocusedElements = previouslyFocusedElements.filter((el)=>el.isConnected);
    let tabbableEl = element;
    if (!tabbableEl || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNodeName"])(tabbableEl) === 'body') return;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabbable"])(tabbableEl, getTabbableOptions())) {
        const tabbableChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(tabbableEl, getTabbableOptions())[0];
        if (tabbableChild) {
            tabbableEl = tabbableChild;
        }
    }
    previouslyFocusedElements.push(tabbableEl);
    if (previouslyFocusedElements.length > LIST_LIMIT) {
        previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
    }
}
function getPreviouslyFocusedElement() {
    return previouslyFocusedElements.slice().reverse().find((el)=>el.isConnected);
}
const VisuallyHiddenDismiss = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(function VisuallyHiddenDismiss(props, ref) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("button", _extends({}, props, {
        type: "button",
        ref: ref,
        tabIndex: -1,
        style: HIDDEN_STYLES
    }));
});
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 */ function FloatingFocusManager(props) {
    const { context, children, disabled = false, order = [
        'content'
    ], guards: _guards = true, initialFocus = 0, returnFocus = true, restoreFocus = false, modal = true, visuallyHiddenDismiss = false, closeOnFocusOut = true } = props;
    const { open, refs, nodeId, onOpenChange, events, dataRef, floatingId, elements: { domReference, floating } } = context;
    const ignoreInitialFocus = typeof initialFocus === 'number' && initialFocus < 0;
    // If the reference is a combobox and is typeable (e.g. input/textarea),
    // there are different focus semantics. The guards should not be rendered, but
    // aria-hidden should be applied to all nodes still. Further, the visually
    // hidden dismiss button should only appear at the end of the list, not the
    // start.
    const isUntrappedTypeableCombobox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(domReference) && ignoreInitialFocus;
    // Force the guards to be rendered if the `inert` attribute is not supported.
    const guards = supportsInert() ? _guards : true;
    const orderRef = useLatestRef(order);
    const initialFocusRef = useLatestRef(initialFocus);
    const returnFocusRef = useLatestRef(returnFocus);
    const tree = useFloatingTree();
    const portalContext = usePortalContext();
    const startDismissButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const endDismissButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const preventReturnFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const isPointerDownRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const tabbableIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(-1);
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = getFloatingFocusElement(floating);
    const getTabbableContent = useEffectEvent({
        "FloatingFocusManager.useEffectEvent[getTabbableContent]": function(container) {
            if (container === void 0) {
                container = floatingFocusElement;
            }
            return container ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions()) : [];
        }
    }["FloatingFocusManager.useEffectEvent[getTabbableContent]"]);
    const getTabbableElements = useEffectEvent({
        "FloatingFocusManager.useEffectEvent[getTabbableElements]": (container)=>{
            const content = getTabbableContent(container);
            return orderRef.current.map({
                "FloatingFocusManager.useEffectEvent[getTabbableElements]": (type)=>{
                    if (domReference && type === 'reference') {
                        return domReference;
                    }
                    if (floatingFocusElement && type === 'floating') {
                        return floatingFocusElement;
                    }
                    return content;
                }
            }["FloatingFocusManager.useEffectEvent[getTabbableElements]"]).filter(Boolean).flat();
        }
    }["FloatingFocusManager.useEffectEvent[getTabbableElements]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled) return;
            if (!modal) return;
            function onKeyDown(event) {
                if (event.key === 'Tab') {
                    // The focus guards have nothing to focus, so we need to stop the event.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    }
                    const els = getTabbableElements();
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                    if (orderRef.current[0] === 'reference' && target === domReference) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        if (event.shiftKey) {
                            enqueueFocus(els[els.length - 1]);
                        } else {
                            enqueueFocus(els[1]);
                        }
                    }
                    if (orderRef.current[1] === 'floating' && target === floatingFocusElement && event.shiftKey) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        enqueueFocus(els[0]);
                    }
                }
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
            doc.addEventListener('keydown', onKeyDown);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    doc.removeEventListener('keydown', onKeyDown);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        domReference,
        floatingFocusElement,
        modal,
        orderRef,
        isUntrappedTypeableCombobox,
        getTabbableContent,
        getTabbableElements
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled) return;
            if (!floating) return;
            function handleFocusIn(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                const tabbableContent = getTabbableContent();
                const tabbableIndex = tabbableContent.indexOf(target);
                if (tabbableIndex !== -1) {
                    tabbableIndexRef.current = tabbableIndex;
                }
            }
            floating.addEventListener('focusin', handleFocusIn);
            return ({
                "FloatingFocusManager.useEffect": ()=>{
                    floating.removeEventListener('focusin', handleFocusIn);
                }
            })["FloatingFocusManager.useEffect"];
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        floating,
        getTabbableContent
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingFocusManager.useEffect": ()=>{
            if (disabled) return;
            if (!closeOnFocusOut) return;
            // In Safari, buttons lose focus when pressing them.
            function handlePointerDown() {
                isPointerDownRef.current = true;
                setTimeout({
                    "FloatingFocusManager.useEffect.handlePointerDown": ()=>{
                        isPointerDownRef.current = false;
                    }
                }["FloatingFocusManager.useEffect.handlePointerDown"]);
            }
            function handleFocusOutside(event) {
                const relatedTarget = event.relatedTarget;
                queueMicrotask({
                    "FloatingFocusManager.useEffect.handleFocusOutside": ()=>{
                        const movedToUnrelatedNode = !((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(domReference, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(relatedTarget, floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute('focus-guard')) || tree && (getChildren(tree.nodesRef.current, nodeId).find({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (node)=>{
                                var _node$context, _node$context2;
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
                            }
                        }["FloatingFocusManager.useEffect.handleFocusOutside"]) || getAncestors(tree.nodesRef.current, nodeId).find({
                            "FloatingFocusManager.useEffect.handleFocusOutside": (node)=>{
                                var _node$context3, _node$context4;
                                return ((_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating) === relatedTarget || ((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.domReference) === relatedTarget;
                            }
                        }["FloatingFocusManager.useEffect.handleFocusOutside"])));
                        // Restore focus to the previous tabbable element index to prevent
                        // focus from being lost outside the floating tree.
                        if (restoreFocus && movedToUnrelatedNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement)) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement).body) {
                            // Let `FloatingPortal` effect knows that focus is still inside the
                            // floating tree.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
                                floatingFocusElement.focus();
                            }
                            const prevTabbableIndex = tabbableIndexRef.current;
                            const tabbableContent = getTabbableContent();
                            const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(nodeToFocus)) {
                                nodeToFocus.focus();
                            }
                        }
                        // Focus did not move inside the floating tree, and there are no tabbable
                        // portal guards to handle closing.
                        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
                        relatedTarget !== getPreviouslyFocusedElement()) {
                            preventReturnFocusRef.current = true;
                            onOpenChange(false, event, 'focus-out');
                        }
                    }
                }["FloatingFocusManager.useEffect.handleFocusOutside"]);
            }
            if (floating && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(domReference)) {
                domReference.addEventListener('focusout', handleFocusOutside);
                domReference.addEventListener('pointerdown', handlePointerDown);
                floating.addEventListener('focusout', handleFocusOutside);
                return ({
                    "FloatingFocusManager.useEffect": ()=>{
                        domReference.removeEventListener('focusout', handleFocusOutside);
                        domReference.removeEventListener('pointerdown', handlePointerDown);
                        floating.removeEventListener('focusout', handleFocusOutside);
                    }
                })["FloatingFocusManager.useEffect"];
            }
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        domReference,
        floating,
        floatingFocusElement,
        modal,
        nodeId,
        tree,
        portalContext,
        onOpenChange,
        closeOnFocusOut,
        restoreFocus,
        getTabbableContent,
        isUntrappedTypeableCombobox
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingFocusManager.useEffect": ()=>{
            var _portalContext$portal;
            if (disabled) return;
            // Don't hide portals nested within the parent portal.
            const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute('portal') + "]")) || []);
            if (floating) {
                const insideElements = [
                    floating,
                    ...portalNodes,
                    startDismissButtonRef.current,
                    endDismissButtonRef.current,
                    orderRef.current.includes('reference') || isUntrappedTypeableCombobox ? domReference : null
                ].filter({
                    "FloatingFocusManager.useEffect.insideElements": (x)=>x != null
                }["FloatingFocusManager.useEffect.insideElements"]);
                const cleanup = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, guards, !guards) : markOthers(insideElements);
                return ({
                    "FloatingFocusManager.useEffect": ()=>{
                        cleanup();
                    }
                })["FloatingFocusManager.useEffect"];
            }
        }
    }["FloatingFocusManager.useEffect"], [
        disabled,
        domReference,
        floating,
        modal,
        orderRef,
        portalContext,
        isUntrappedTypeableCombobox,
        guards
    ]);
    index(()=>{
        if (disabled || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) return;
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
        // Wait for any layout effect state setters to execute to set `tabIndex`.
        queueMicrotask(()=>{
            const focusableElements = getTabbableElements(floatingFocusElement);
            const initialFocusValue = initialFocusRef.current;
            const elToFocus = (typeof initialFocusValue === 'number' ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusElement;
            const focusAlreadyInsideFloatingEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, previouslyFocusedElement);
            if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
                enqueueFocus(elToFocus, {
                    preventScroll: elToFocus === floatingFocusElement
                });
            }
        });
    }, [
        disabled,
        open,
        floatingFocusElement,
        ignoreInitialFocus,
        getTabbableElements,
        initialFocusRef
    ]);
    index(()=>{
        if (disabled || !floatingFocusElement) return;
        let preventReturnFocusScroll = false;
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
        const contextData = dataRef.current;
        let openEvent = contextData.openEvent;
        addPreviouslyFocusedElement(previouslyFocusedElement);
        // Dismissing via outside press should always ignore `returnFocus` to
        // prevent unwanted scrolling.
        function onOpenChange(_ref) {
            let { open, reason, event, nested } = _ref;
            if (open) {
                openEvent = event;
            }
            if (reason === 'escape-key' && refs.domReference.current) {
                addPreviouslyFocusedElement(refs.domReference.current);
            }
            if (reason === 'hover' && event.type === 'mouseleave') {
                preventReturnFocusRef.current = true;
            }
            if (reason !== 'outside-press') return;
            if (nested) {
                preventReturnFocusRef.current = false;
                preventReturnFocusScroll = true;
            } else {
                preventReturnFocusRef.current = !((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualClick"])(event) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(event));
            }
        }
        events.on('openchange', onOpenChange);
        const fallbackEl = doc.createElement('span');
        fallbackEl.setAttribute('tabindex', '-1');
        fallbackEl.setAttribute('aria-hidden', 'true');
        Object.assign(fallbackEl.style, HIDDEN_STYLES);
        if (isInsidePortal && domReference) {
            domReference.insertAdjacentElement('afterend', fallbackEl);
        }
        function getReturnElement() {
            if (typeof returnFocusRef.current === 'boolean') {
                return getPreviouslyFocusedElement() || fallbackEl;
            }
            return returnFocusRef.current.current || fallbackEl;
        }
        return ()=>{
            events.off('openchange', onOpenChange);
            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(doc);
            const isFocusInsideFloatingTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, activeEl) || tree && getChildren(tree.nodesRef.current, nodeId).some((node)=>{
                var _node$context5;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.floating, activeEl);
            });
            const shouldFocusReference = isFocusInsideFloatingTree || openEvent && [
                'click',
                'mousedown'
            ].includes(openEvent.type);
            if (shouldFocusReference && refs.domReference.current) {
                addPreviouslyFocusedElement(refs.domReference.current);
            }
            const returnElement = getReturnElement();
            queueMicrotask(()=>{
                if (// eslint-disable-next-line react-hooks/exhaustive-deps
                returnFocusRef.current && !preventReturnFocusRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(returnElement) && (// If the focus moved somewhere else after mount, avoid returning focus
                // since it likely entered a different element which should be
                // respected: https://github.com/floating-ui/floating-ui/issues/2607
                returnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
                    returnElement.focus({
                        preventScroll: preventReturnFocusScroll
                    });
                }
                fallbackEl.remove();
            });
        };
    }, [
        disabled,
        floating,
        floatingFocusElement,
        returnFocusRef,
        dataRef,
        refs,
        events,
        tree,
        nodeId,
        isInsidePortal,
        domReference
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "FloatingFocusManager.useEffect": ()=>{
            // The `returnFocus` cleanup behavior is inside a microtask; ensure we
            // wait for it to complete before resetting the flag.
            queueMicrotask({
                "FloatingFocusManager.useEffect": ()=>{
                    preventReturnFocusRef.current = false;
                }
            }["FloatingFocusManager.useEffect"]);
        }
    }["FloatingFocusManager.useEffect"], [
        disabled
    ]);
    // Synchronize the `context` & `modal` value to the FloatingPortal context.
    // It will decide whether or not it needs to render its own guards.
    index(()=>{
        if (disabled) return;
        if (!portalContext) return;
        portalContext.setFocusManagerState({
            modal,
            closeOnFocusOut,
            open,
            onOpenChange,
            refs
        });
        return ()=>{
            portalContext.setFocusManagerState(null);
        };
    }, [
        disabled,
        portalContext,
        modal,
        open,
        onOpenChange,
        refs,
        closeOnFocusOut
    ]);
    index(()=>{
        if (disabled) return;
        if (!floatingFocusElement) return;
        if (typeof MutationObserver !== 'function') return;
        if (ignoreInitialFocus) return;
        const handleMutation = ()=>{
            const tabIndex = floatingFocusElement.getAttribute('tabindex');
            const tabbableContent = getTabbableContent();
            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(floating));
            const tabbableIndex = tabbableContent.indexOf(activeEl);
            if (tabbableIndex !== -1) {
                tabbableIndexRef.current = tabbableIndex;
            }
            if (orderRef.current.includes('floating') || activeEl !== refs.domReference.current && tabbableContent.length === 0) {
                if (tabIndex !== '0') {
                    floatingFocusElement.setAttribute('tabindex', '0');
                }
            } else if (tabIndex !== '-1') {
                floatingFocusElement.setAttribute('tabindex', '-1');
            }
        };
        handleMutation();
        const observer = new MutationObserver(handleMutation);
        observer.observe(floatingFocusElement, {
            childList: true,
            subtree: true,
            attributes: true
        });
        return ()=>{
            observer.disconnect();
        };
    }, [
        disabled,
        floating,
        floatingFocusElement,
        refs,
        orderRef,
        getTabbableContent,
        ignoreInitialFocus
    ]);
    function renderDismissButton(location) {
        if (disabled || !visuallyHiddenDismiss || !modal) {
            return null;
        }
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(VisuallyHiddenDismiss, {
            ref: location === 'start' ? startDismissButtonRef : endDismissButtonRef,
            onClick: (event)=>onOpenChange(false, event.nativeEvent)
        }, typeof visuallyHiddenDismiss === 'string' ? visuallyHiddenDismiss : 'Dismiss');
    }
    const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fragment, null, shouldRenderGuards && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FocusGuard, {
        "data-type": "inside",
        ref: portalContext == null ? void 0 : portalContext.beforeInsideRef,
        onFocus: (event)=>{
            if (modal) {
                const els = getTabbableElements();
                enqueueFocus(order[0] === 'reference' ? els[0] : els[els.length - 1]);
            } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
                preventReturnFocusRef.current = false;
                if (isOutsideEvent(event, portalContext.portalNode)) {
                    const nextTabbable = getNextTabbable() || domReference;
                    nextTabbable == null || nextTabbable.focus();
                } else {
                    var _portalContext$before;
                    (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
                }
            }
        }
    }), !isUntrappedTypeableCombobox && renderDismissButton('start'), children, renderDismissButton('end'), shouldRenderGuards && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement(FocusGuard, {
        "data-type": "inside",
        ref: portalContext == null ? void 0 : portalContext.afterInsideRef,
        onFocus: (event)=>{
            if (modal) {
                enqueueFocus(getTabbableElements()[0]);
            } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
                if (closeOnFocusOut) {
                    preventReturnFocusRef.current = true;
                }
                if (isOutsideEvent(event, portalContext.portalNode)) {
                    const prevTabbable = getPreviousTabbable() || domReference;
                    prevTabbable == null || prevTabbable.focus();
                } else {
                    var _portalContext$afterO;
                    (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
                }
            }
        }
    }));
}
let lockCount = 0;
function enableScrollLock() {
    const isIOS = /iP(hone|ad|od)|iOS/.test((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlatform"])());
    const bodyStyle = document.body.style;
    // RTL <body> scrollbar
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight';
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.scrollX;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.scrollY;
    bodyStyle.overflow = 'hidden';
    if (scrollbarWidth) {
        bodyStyle[paddingProp] = scrollbarWidth + "px";
    }
    // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.
    if (isIOS) {
        var _window$visualViewpor, _window$visualViewpor2;
        // iOS 12 does not support `visualViewport`.
        const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
        const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
        Object.assign(bodyStyle, {
            position: 'fixed',
            top: -(scrollY - Math.floor(offsetTop)) + "px",
            left: -(scrollX - Math.floor(offsetLeft)) + "px",
            right: '0'
        });
    }
    return ()=>{
        Object.assign(bodyStyle, {
            overflow: '',
            [paddingProp]: ''
        });
        if (isIOS) {
            Object.assign(bodyStyle, {
                position: '',
                top: '',
                left: '',
                right: ''
            });
            window.scrollTo(scrollX, scrollY);
        }
    };
}
let cleanup = ()=>{};
/**
 * Provides base styling for a fixed overlay element to dim content or block
 * pointer events behind a floating element.
 * It's a regular `<div>`, so it can be styled via any CSS solution you prefer.
 * @see https://floating-ui.com/docs/FloatingOverlay
 */ const FloatingOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(function FloatingOverlay(props, ref) {
    const { lockScroll = false, ...rest } = props;
    index(()=>{
        if (!lockScroll) return;
        lockCount++;
        if (lockCount === 1) {
            cleanup = enableScrollLock();
        }
        return ()=>{
            lockCount--;
            if (lockCount === 0) {
                cleanup();
            }
        };
    }, [
        lockScroll
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.createElement("div", _extends({
        ref: ref
    }, rest, {
        style: {
            position: 'fixed',
            overflow: 'auto',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...rest.style
        }
    }));
});
function isButtonTarget(event) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(event.target) && event.target.tagName === 'BUTTON';
}
function isSpaceIgnored(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableElement"])(element);
}
/**
 * Opens or closes the floating element when clicking the reference element.
 * @see https://floating-ui.com/docs/useClick
 */ function useClick(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { open, onOpenChange, dataRef, elements: { domReference } } = context;
    const { enabled = true, event: eventOption = 'click', toggle = true, ignoreMouse = false, keyboardHandlers = true, stickIfOpen = true } = props;
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef();
    const didKeyDownRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useClick.useMemo[reference]": ()=>({
                onPointerDown (event) {
                    pointerTypeRef.current = event.pointerType;
                },
                onMouseDown (event) {
                    const pointerType = pointerTypeRef.current;
                    // Ignore all buttons except for the "main" button.
                    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
                    if (event.button !== 0) return;
                    if (eventOption === 'click') return;
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) return;
                    if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === 'mousedown' : true)) {
                        onOpenChange(false, event.nativeEvent, 'click');
                    } else {
                        // Prevent stealing focus from the floating element
                        event.preventDefault();
                        onOpenChange(true, event.nativeEvent, 'click');
                    }
                },
                onClick (event) {
                    const pointerType = pointerTypeRef.current;
                    if (eventOption === 'mousedown' && pointerTypeRef.current) {
                        pointerTypeRef.current = undefined;
                        return;
                    }
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) return;
                    if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === 'click' : true)) {
                        onOpenChange(false, event.nativeEvent, 'click');
                    } else {
                        onOpenChange(true, event.nativeEvent, 'click');
                    }
                },
                onKeyDown (event) {
                    pointerTypeRef.current = undefined;
                    if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
                        return;
                    }
                    if (event.key === ' ' && !isSpaceIgnored(domReference)) {
                        // Prevent scrolling
                        event.preventDefault();
                        didKeyDownRef.current = true;
                    }
                    if (event.key === 'Enter') {
                        if (open && toggle) {
                            onOpenChange(false, event.nativeEvent, 'click');
                        } else {
                            onOpenChange(true, event.nativeEvent, 'click');
                        }
                    }
                },
                onKeyUp (event) {
                    if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
                        return;
                    }
                    if (event.key === ' ' && didKeyDownRef.current) {
                        didKeyDownRef.current = false;
                        if (open && toggle) {
                            onOpenChange(false, event.nativeEvent, 'click');
                        } else {
                            onOpenChange(true, event.nativeEvent, 'click');
                        }
                    }
                }
            })
    }["useClick.useMemo[reference]"], [
        dataRef,
        domReference,
        eventOption,
        ignoreMouse,
        keyboardHandlers,
        onOpenChange,
        open,
        stickIfOpen,
        toggle
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useClick.useMemo": ()=>enabled ? {
                reference
            } : {}
    }["useClick.useMemo"], [
        enabled,
        reference
    ]);
}
function createVirtualElement(domElement, data) {
    let offsetX = null;
    let offsetY = null;
    let isAutoUpdateEvent = false;
    return {
        contextElement: domElement || undefined,
        getBoundingClientRect () {
            var _data$dataRef$current;
            const domRect = (domElement == null ? void 0 : domElement.getBoundingClientRect()) || {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            const isXAxis = data.axis === 'x' || data.axis === 'both';
            const isYAxis = data.axis === 'y' || data.axis === 'both';
            const canTrackCursorOnAutoUpdate = [
                'mouseenter',
                'mousemove'
            ].includes(((_data$dataRef$current = data.dataRef.current.openEvent) == null ? void 0 : _data$dataRef$current.type) || '') && data.pointerType !== 'touch';
            let width = domRect.width;
            let height = domRect.height;
            let x = domRect.x;
            let y = domRect.y;
            if (offsetX == null && data.x && isXAxis) {
                offsetX = domRect.x - data.x;
            }
            if (offsetY == null && data.y && isYAxis) {
                offsetY = domRect.y - data.y;
            }
            x -= offsetX || 0;
            y -= offsetY || 0;
            width = 0;
            height = 0;
            if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
                width = data.axis === 'y' ? domRect.width : 0;
                height = data.axis === 'x' ? domRect.height : 0;
                x = isXAxis && data.x != null ? data.x : x;
                y = isYAxis && data.y != null ? data.y : y;
            } else if (isAutoUpdateEvent && !canTrackCursorOnAutoUpdate) {
                height = data.axis === 'x' ? domRect.height : height;
                width = data.axis === 'y' ? domRect.width : width;
            }
            isAutoUpdateEvent = true;
            return {
                width,
                height,
                x,
                y,
                top: y,
                right: x + width,
                bottom: y + height,
                left: x
            };
        }
    };
}
function isMouseBasedEvent(event) {
    return event != null && event.clientX != null;
}
/**
 * Positions the floating element relative to a client point (in the viewport),
 * such as the mouse position. By default, it follows the mouse cursor.
 * @see https://floating-ui.com/docs/useClientPoint
 */ function useClientPoint(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { open, dataRef, elements: { floating, domReference }, refs } = context;
    const { enabled = true, axis = 'both', x = null, y = null } = props;
    const initialRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const cleanupListenerRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const [pointerType, setPointerType] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState();
    const [reactive, setReactive] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState([]);
    const setReference = useEffectEvent({
        "useClientPoint.useEffectEvent[setReference]": (x, y)=>{
            if (initialRef.current) return;
            // Prevent setting if the open event was not a mouse-like one
            // (e.g. focus to open, then hover over the reference element).
            // Only apply if the event exists.
            if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) {
                return;
            }
            refs.setPositionReference(createVirtualElement(domReference, {
                x,
                y,
                axis,
                dataRef,
                pointerType
            }));
        }
    }["useClientPoint.useEffectEvent[setReference]"]);
    const handleReferenceEnterOrMove = useEffectEvent({
        "useClientPoint.useEffectEvent[handleReferenceEnterOrMove]": (event)=>{
            if (x != null || y != null) return;
            if (!open) {
                setReference(event.clientX, event.clientY);
            } else if (!cleanupListenerRef.current) {
                // If there's no cleanup, there's no listener, but we want to ensure
                // we add the listener if the cursor landed on the floating element and
                // then back on the reference (i.e. it's interactive).
                setReactive([]);
            }
        }
    }["useClientPoint.useEffectEvent[handleReferenceEnterOrMove]"]);
    // If the pointer is a mouse-like pointer, we want to continue following the
    // mouse even if the floating element is transitioning out. On touch
    // devices, this is undesirable because the floating element will move to
    // the dismissal touch point.
    const openCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType) ? floating : open;
    const addListener = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useClientPoint.useCallback[addListener]": ()=>{
            // Explicitly specified `x`/`y` coordinates shouldn't add a listener.
            if (!openCheck || !enabled || x != null || y != null) return;
            const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(floating);
            function handleMouseMove(event) {
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(floating, target)) {
                    setReference(event.clientX, event.clientY);
                } else {
                    win.removeEventListener('mousemove', handleMouseMove);
                    cleanupListenerRef.current = null;
                }
            }
            if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) {
                win.addEventListener('mousemove', handleMouseMove);
                const cleanup = {
                    "useClientPoint.useCallback[addListener].cleanup": ()=>{
                        win.removeEventListener('mousemove', handleMouseMove);
                        cleanupListenerRef.current = null;
                    }
                }["useClientPoint.useCallback[addListener].cleanup"];
                cleanupListenerRef.current = cleanup;
                return cleanup;
            }
            refs.setPositionReference(domReference);
        }
    }["useClientPoint.useCallback[addListener]"], [
        openCheck,
        enabled,
        x,
        y,
        floating,
        dataRef,
        refs,
        domReference,
        setReference
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useClientPoint.useEffect": ()=>{
            return addListener();
        }
    }["useClientPoint.useEffect"], [
        addListener,
        reactive
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useClientPoint.useEffect": ()=>{
            if (enabled && !floating) {
                initialRef.current = false;
            }
        }
    }["useClientPoint.useEffect"], [
        enabled,
        floating
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useClientPoint.useEffect": ()=>{
            if (!enabled && open) {
                initialRef.current = true;
            }
        }
    }["useClientPoint.useEffect"], [
        enabled,
        open
    ]);
    index(()=>{
        if (enabled && (x != null || y != null)) {
            initialRef.current = false;
            setReference(x, y);
        }
    }, [
        enabled,
        x,
        y,
        setReference
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useClientPoint.useMemo[reference]": ()=>{
            function setPointerTypeRef(_ref) {
                let { pointerType } = _ref;
                setPointerType(pointerType);
            }
            return {
                onPointerDown: setPointerTypeRef,
                onPointerEnter: setPointerTypeRef,
                onMouseMove: handleReferenceEnterOrMove,
                onMouseEnter: handleReferenceEnterOrMove
            };
        }
    }["useClientPoint.useMemo[reference]"], [
        handleReferenceEnterOrMove
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useClientPoint.useMemo": ()=>enabled ? {
                reference
            } : {}
    }["useClientPoint.useMemo"], [
        enabled,
        reference
    ]);
}
const bubbleHandlerKeys = {
    pointerdown: 'onPointerDown',
    mousedown: 'onMouseDown',
    click: 'onClick'
};
const captureHandlerKeys = {
    pointerdown: 'onPointerDownCapture',
    mousedown: 'onMouseDownCapture',
    click: 'onClickCapture'
};
const normalizeProp = (normalizable)=>{
    var _normalizable$escapeK, _normalizable$outside;
    return {
        escapeKey: typeof normalizable === 'boolean' ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
        outsidePress: typeof normalizable === 'boolean' ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
    };
};
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */ function useDismiss(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { open, onOpenChange, elements, dataRef } = context;
    const { enabled = true, escapeKey = true, outsidePress: unstable_outsidePress = true, outsidePressEvent = 'pointerdown', referencePress = false, referencePressEvent = 'pointerdown', ancestorScroll = false, bubbles, capture } = props;
    const tree = useFloatingTree();
    const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === 'function' ? unstable_outsidePress : ({
        "useDismiss.useEffectEvent[outsidePressFn]": ()=>false
    })["useDismiss.useEffectEvent[outsidePressFn]"]);
    const outsidePress = typeof unstable_outsidePress === 'function' ? outsidePressFn : unstable_outsidePress;
    const insideReactTreeRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const endedOrStartedInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
    const { escapeKey: escapeKeyCapture, outsidePress: outsidePressCapture } = normalizeProp(capture);
    const isComposingRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const closeOnEscapeKeyDown = useEffectEvent({
        "useDismiss.useEffectEvent[closeOnEscapeKeyDown]": (event)=>{
            var _dataRef$current$floa;
            if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
                return;
            }
            // Wait until IME is settled. Pressing `Escape` while composing should
            // close the compose menu, but not the floating element.
            if (isComposingRef.current) {
                return;
            }
            const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
            const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
            if (!escapeKeyBubbles) {
                event.stopPropagation();
                if (children.length > 0) {
                    let shouldDismiss = true;
                    children.forEach({
                        "useDismiss.useEffectEvent[closeOnEscapeKeyDown]": (child)=>{
                            var _child$context;
                            if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
                                shouldDismiss = false;
                                return;
                            }
                        }
                    }["useDismiss.useEffectEvent[closeOnEscapeKeyDown]"]);
                    if (!shouldDismiss) {
                        return;
                    }
                }
            }
            onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReactEvent"])(event) ? event.nativeEvent : event, 'escape-key');
        }
    }["useDismiss.useEffectEvent[closeOnEscapeKeyDown]"]);
    const closeOnEscapeKeyDownCapture = useEffectEvent({
        "useDismiss.useEffectEvent[closeOnEscapeKeyDownCapture]": (event)=>{
            var _getTarget2;
            const callback = {
                "useDismiss.useEffectEvent[closeOnEscapeKeyDownCapture].callback": ()=>{
                    var _getTarget;
                    closeOnEscapeKeyDown(event);
                    (_getTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event)) == null || _getTarget.removeEventListener('keydown', callback);
                }
            }["useDismiss.useEffectEvent[closeOnEscapeKeyDownCapture].callback"];
            (_getTarget2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event)) == null || _getTarget2.addEventListener('keydown', callback);
        }
    }["useDismiss.useEffectEvent[closeOnEscapeKeyDownCapture]"]);
    const closeOnPressOutside = useEffectEvent({
        "useDismiss.useEffectEvent[closeOnPressOutside]": (event)=>{
            var _dataRef$current$floa2;
            // Given developers can stop the propagation of the synthetic event,
            // we can only be confident with a positive value.
            const insideReactTree = insideReactTreeRef.current;
            insideReactTreeRef.current = false;
            // When click outside is lazy (`click` event), handle dragging.
            // Don't close if:
            // - The click started inside the floating element.
            // - The click ended inside the floating element.
            const endedOrStartedInside = endedOrStartedInsideRef.current;
            endedOrStartedInsideRef.current = false;
            if (outsidePressEvent === 'click' && endedOrStartedInside) {
                return;
            }
            if (insideReactTree) {
                return;
            }
            if (typeof outsidePress === 'function' && !outsidePress(event)) {
                return;
            }
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            const inertSelector = "[" + createAttribute('inert') + "]";
            const markers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating).querySelectorAll(inertSelector);
            let targetRootAncestor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target) ? target : null;
            while(targetRootAncestor && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(targetRootAncestor)){
                const nextParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getParentNode"])(targetRootAncestor);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(nextParent) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(nextParent)) {
                    break;
                }
                targetRootAncestor = nextParent;
            }
            // Check if the click occurred on a third-party element injected after the
            // floating element rendered.
            if (markers.length && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRootElement"])(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
            !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(target, elements.floating) && // If the target root element contains none of the markers, then the
            // element was injected after the floating element rendered.
            Array.from(markers).every({
                "useDismiss.useEffectEvent[closeOnPressOutside]": (marker)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(targetRootAncestor, marker)
            }["useDismiss.useEffectEvent[closeOnPressOutside]"])) {
                return;
            }
            // Check if the click occurred on the scrollbar
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(target) && floating) {
                // In Firefox, `target.scrollWidth > target.clientWidth` for inline
                // elements.
                const canScrollX = target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
                const canScrollY = target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
                let xCond = canScrollY && event.offsetX > target.clientWidth;
                // In some browsers it is possible to change the <body> (or window)
                // scrollbar to the left side, but is very rare and is difficult to
                // check for. Plus, for modal dialogs with backdrops, it is more
                // important that the backdrop is checked but not so much the window.
                if (canScrollY) {
                    const isRTL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComputedStyle"])(target).direction === 'rtl';
                    if (isRTL) {
                        xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
                    }
                }
                if (xCond || canScrollX && event.offsetY > target.clientHeight) {
                    return;
                }
            }
            const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
            const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some({
                "useDismiss.useEffectEvent[closeOnPressOutside]": (node)=>{
                    var _node$context;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
                }
            }["useDismiss.useEffectEvent[closeOnPressOutside]"]);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.domReference) || targetIsInsideChildren) {
                return;
            }
            const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
            if (children.length > 0) {
                let shouldDismiss = true;
                children.forEach({
                    "useDismiss.useEffectEvent[closeOnPressOutside]": (child)=>{
                        var _child$context2;
                        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
                            shouldDismiss = false;
                            return;
                        }
                    }
                }["useDismiss.useEffectEvent[closeOnPressOutside]"]);
                if (!shouldDismiss) {
                    return;
                }
            }
            onOpenChange(false, event, 'outside-press');
        }
    }["useDismiss.useEffectEvent[closeOnPressOutside]"]);
    const closeOnPressOutsideCapture = useEffectEvent({
        "useDismiss.useEffectEvent[closeOnPressOutsideCapture]": (event)=>{
            var _getTarget4;
            const callback = {
                "useDismiss.useEffectEvent[closeOnPressOutsideCapture].callback": ()=>{
                    var _getTarget3;
                    closeOnPressOutside(event);
                    (_getTarget3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
                }
            }["useDismiss.useEffectEvent[closeOnPressOutsideCapture].callback"];
            (_getTarget4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
        }
    }["useDismiss.useEffectEvent[closeOnPressOutsideCapture]"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useDismiss.useEffect": ()=>{
            if (!open || !enabled) {
                return;
            }
            dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
            dataRef.current.__outsidePressBubbles = outsidePressBubbles;
            let compositionTimeout = -1;
            function onScroll(event) {
                onOpenChange(false, event, 'ancestor-scroll');
            }
            function handleCompositionStart() {
                window.clearTimeout(compositionTimeout);
                isComposingRef.current = true;
            }
            function handleCompositionEnd() {
                // Safari fires `compositionend` before `keydown`, so we need to wait
                // until the next tick to set `isComposing` to `false`.
                // https://bugs.webkit.org/show_bug.cgi?id=165004
                compositionTimeout = window.setTimeout({
                    "useDismiss.useEffect.handleCompositionEnd": ()=>{
                        isComposingRef.current = false;
                    }
                }["useDismiss.useEffect.handleCompositionEnd"], // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
                // Only apply to WebKit for the test to remain 0ms.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebKit"])() ? 5 : 0);
            }
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating);
            if (escapeKey) {
                doc.addEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
                doc.addEventListener('compositionstart', handleCompositionStart);
                doc.addEventListener('compositionend', handleCompositionEnd);
            }
            outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
            let ancestors = [];
            if (ancestorScroll) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elements.domReference)) {
                    ancestors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(elements.domReference);
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elements.floating)) {
                    ancestors = ancestors.concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(elements.floating));
                }
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elements.reference) && elements.reference && elements.reference.contextElement) {
                    ancestors = ancestors.concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(elements.reference.contextElement));
                }
            }
            // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
            ancestors = ancestors.filter({
                "useDismiss.useEffect": (ancestor)=>{
                    var _doc$defaultView;
                    return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
                }
            }["useDismiss.useEffect"]);
            ancestors.forEach({
                "useDismiss.useEffect": (ancestor)=>{
                    ancestor.addEventListener('scroll', onScroll, {
                        passive: true
                    });
                }
            }["useDismiss.useEffect"]);
            return ({
                "useDismiss.useEffect": ()=>{
                    if (escapeKey) {
                        doc.removeEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
                        doc.removeEventListener('compositionstart', handleCompositionStart);
                        doc.removeEventListener('compositionend', handleCompositionEnd);
                    }
                    outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
                    ancestors.forEach({
                        "useDismiss.useEffect": (ancestor)=>{
                            ancestor.removeEventListener('scroll', onScroll);
                        }
                    }["useDismiss.useEffect"]);
                    window.clearTimeout(compositionTimeout);
                }
            })["useDismiss.useEffect"];
        }
    }["useDismiss.useEffect"], [
        dataRef,
        elements,
        escapeKey,
        outsidePress,
        outsidePressEvent,
        open,
        onOpenChange,
        ancestorScroll,
        enabled,
        escapeKeyBubbles,
        outsidePressBubbles,
        closeOnEscapeKeyDown,
        escapeKeyCapture,
        closeOnEscapeKeyDownCapture,
        closeOnPressOutside,
        outsidePressCapture,
        closeOnPressOutsideCapture
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useDismiss.useEffect": ()=>{
            insideReactTreeRef.current = false;
        }
    }["useDismiss.useEffect"], [
        outsidePress,
        outsidePressEvent
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useDismiss.useMemo[reference]": ()=>({
                onKeyDown: closeOnEscapeKeyDown,
                [bubbleHandlerKeys[referencePressEvent]]: ({
                    "useDismiss.useMemo[reference]": (event)=>{
                        if (referencePress) {
                            onOpenChange(false, event.nativeEvent, 'reference-press');
                        }
                    }
                })["useDismiss.useMemo[reference]"]
            })
    }["useDismiss.useMemo[reference]"], [
        closeOnEscapeKeyDown,
        onOpenChange,
        referencePress,
        referencePressEvent
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useDismiss.useMemo[floating]": ()=>({
                onKeyDown: closeOnEscapeKeyDown,
                onMouseDown () {
                    endedOrStartedInsideRef.current = true;
                },
                onMouseUp () {
                    endedOrStartedInsideRef.current = true;
                },
                [captureHandlerKeys[outsidePressEvent]]: ({
                    "useDismiss.useMemo[floating]": ()=>{
                        insideReactTreeRef.current = true;
                    }
                })["useDismiss.useMemo[floating]"]
            })
    }["useDismiss.useMemo[floating]"], [
        closeOnEscapeKeyDown,
        outsidePressEvent
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useDismiss.useMemo": ()=>enabled ? {
                reference,
                floating
            } : {}
    }["useDismiss.useMemo"], [
        enabled,
        reference,
        floating
    ]);
}
function useFloatingRootContext(options) {
    const { open = false, onOpenChange: onOpenChangeProp, elements: elementsProp } = options;
    const floatingId = useId();
    const dataRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef({});
    const [events] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        "useFloatingRootContext.useState": ()=>createPubSub()
    }["useFloatingRootContext.useState"]);
    const nested = useFloatingParentNodeId() != null;
    if ("TURBOPACK compile-time truthy", 1) {
        const optionDomReference = elementsProp.reference;
        if (optionDomReference && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(optionDomReference)) {
            error('Cannot pass a virtual element to the `elements.reference` option,', 'as it must be a real DOM element. Use `refs.setPositionReference()`', 'instead.');
        }
    }
    const [positionReference, setPositionReference] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(elementsProp.reference);
    const onOpenChange = useEffectEvent({
        "useFloatingRootContext.useEffectEvent[onOpenChange]": (open, event, reason)=>{
            dataRef.current.openEvent = open ? event : undefined;
            events.emit('openchange', {
                open,
                event,
                reason,
                nested
            });
            onOpenChangeProp == null || onOpenChangeProp(open, event, reason);
        }
    }["useFloatingRootContext.useEffectEvent[onOpenChange]"]);
    const refs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloatingRootContext.useMemo[refs]": ()=>({
                setPositionReference
            })
    }["useFloatingRootContext.useMemo[refs]"], []);
    const elements = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloatingRootContext.useMemo[elements]": ()=>({
                reference: positionReference || elementsProp.reference || null,
                floating: elementsProp.floating || null,
                domReference: elementsProp.reference
            })
    }["useFloatingRootContext.useMemo[elements]"], [
        positionReference,
        elementsProp.reference,
        elementsProp.floating
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloatingRootContext.useMemo": ()=>({
                dataRef,
                open,
                onOpenChange,
                elements,
                events,
                floatingId,
                refs
            })
    }["useFloatingRootContext.useMemo"], [
        open,
        onOpenChange,
        elements,
        events,
        floatingId,
        refs
    ]);
}
/**
 * Provides data to position a floating element and context to add interactions.
 * @see https://floating-ui.com/docs/useFloating
 */ function useFloating(options) {
    if (options === void 0) {
        options = {};
    }
    const { nodeId } = options;
    const internalRootContext = useFloatingRootContext({
        ...options,
        elements: {
            reference: null,
            floating: null,
            ...options.elements
        }
    });
    const rootContext = options.rootContext || internalRootContext;
    const computedElements = rootContext.elements;
    const [_domReference, setDomReference] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const [positionReference, _setPositionReference] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
    const domReference = optionDomReference || _domReference;
    const domReferenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const tree = useFloatingTree();
    index(()=>{
        if (domReference) {
            domReferenceRef.current = domReference;
        }
    }, [
        domReference
    ]);
    const position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"])({
        ...options,
        elements: {
            ...computedElements,
            ...positionReference && {
                reference: positionReference
            }
        }
    });
    const setPositionReference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useFloating.useCallback[setPositionReference]": (node)=>{
            const computedPositionReference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node) ? {
                getBoundingClientRect: ({
                    "useFloating.useCallback[setPositionReference]": ()=>node.getBoundingClientRect()
                })["useFloating.useCallback[setPositionReference]"],
                contextElement: node
            } : node;
            // Store the positionReference in state if the DOM reference is specified externally via the
            // `elements.reference` option. This ensures that it won't be overridden on future renders.
            _setPositionReference(computedPositionReference);
            position.refs.setReference(computedPositionReference);
        }
    }["useFloating.useCallback[setPositionReference]"], [
        position.refs
    ]);
    const setReference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useFloating.useCallback[setReference]": (node)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node) || node === null) {
                domReferenceRef.current = node;
                setDomReference(node);
            }
            // Backwards-compatibility for passing a virtual element to `reference`
            // after it has set the DOM reference.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
            // `null` to support `positionReference` + an unstable `reference`
            // callback ref.
            node !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node)) {
                position.refs.setReference(node);
            }
        }
    }["useFloating.useCallback[setReference]"], [
        position.refs
    ]);
    const refs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloating.useMemo[refs]": ()=>({
                ...position.refs,
                setReference,
                setPositionReference,
                domReference: domReferenceRef
            })
    }["useFloating.useMemo[refs]"], [
        position.refs,
        setReference,
        setPositionReference
    ]);
    const elements = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloating.useMemo[elements]": ()=>({
                ...position.elements,
                domReference: domReference
            })
    }["useFloating.useMemo[elements]"], [
        position.elements,
        domReference
    ]);
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloating.useMemo[context]": ()=>({
                ...position,
                ...rootContext,
                refs,
                elements,
                nodeId
            })
    }["useFloating.useMemo[context]"], [
        position,
        refs,
        elements,
        nodeId,
        rootContext
    ]);
    index(()=>{
        rootContext.dataRef.current.floatingContext = context;
        const node = tree == null ? void 0 : tree.nodesRef.current.find((node)=>node.id === nodeId);
        if (node) {
            node.context = context;
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFloating.useMemo": ()=>({
                ...position,
                context,
                refs,
                elements
            })
    }["useFloating.useMemo"], [
        position,
        refs,
        elements,
        context
    ]);
}
/**
 * Opens the floating element while the reference element has focus, like CSS
 * `:focus`.
 * @see https://floating-ui.com/docs/useFocus
 */ function useFocus(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { open, onOpenChange, events, dataRef, elements } = context;
    const { enabled = true, visibleOnly = true } = props;
    const blockFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const timeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef();
    const keyboardModalityRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(true);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useFocus.useEffect": ()=>{
            if (!enabled) return;
            const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindow"])(elements.domReference);
            // If the reference was focused and the user left the tab/window, and the
            // floating element was not open, the focus should be blocked when they
            // return to the tab/window.
            function onBlur() {
                if (!open && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(elements.domReference) && elements.domReference === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.domReference))) {
                    blockFocusRef.current = true;
                }
            }
            function onKeyDown() {
                keyboardModalityRef.current = true;
            }
            win.addEventListener('blur', onBlur);
            win.addEventListener('keydown', onKeyDown, true);
            return ({
                "useFocus.useEffect": ()=>{
                    win.removeEventListener('blur', onBlur);
                    win.removeEventListener('keydown', onKeyDown, true);
                }
            })["useFocus.useEffect"];
        }
    }["useFocus.useEffect"], [
        elements.domReference,
        open,
        enabled
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useFocus.useEffect": ()=>{
            if (!enabled) return;
            function onOpenChange(_ref) {
                let { reason } = _ref;
                if (reason === 'reference-press' || reason === 'escape-key') {
                    blockFocusRef.current = true;
                }
            }
            events.on('openchange', onOpenChange);
            return ({
                "useFocus.useEffect": ()=>{
                    events.off('openchange', onOpenChange);
                }
            })["useFocus.useEffect"];
        }
    }["useFocus.useEffect"], [
        events,
        enabled
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useFocus.useEffect": ()=>{
            return ({
                "useFocus.useEffect": ()=>{
                    clearTimeout(timeoutRef.current);
                }
            })["useFocus.useEffect"];
        }
    }["useFocus.useEffect"], []);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFocus.useMemo[reference]": ()=>({
                onPointerDown (event) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(event.nativeEvent)) return;
                    keyboardModalityRef.current = false;
                },
                onMouseLeave () {
                    blockFocusRef.current = false;
                },
                onFocus (event) {
                    if (blockFocusRef.current) return;
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
                    if (visibleOnly && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target)) {
                        try {
                            // Mac Safari unreliably matches `:focus-visible` on the reference
                            // if focus was outside the page initially - use the fallback
                            // instead.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafari"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMac"])()) throw Error();
                            if (!target.matches(':focus-visible')) return;
                        } catch (e) {
                            // Old browsers will throw an error when using `:focus-visible`.
                            if (!keyboardModalityRef.current && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableElement"])(target)) {
                                return;
                            }
                        }
                    }
                    onOpenChange(true, event.nativeEvent, 'focus');
                },
                onBlur (event) {
                    blockFocusRef.current = false;
                    const relatedTarget = event.relatedTarget;
                    const nativeEvent = event.nativeEvent;
                    // Hit the non-modal focus management portal guard. Focus will be
                    // moved into the floating element immediately after.
                    const movedToFocusGuard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(relatedTarget) && relatedTarget.hasAttribute(createAttribute('focus-guard')) && relatedTarget.getAttribute('data-type') === 'outside';
                    // Wait for the window blur listener to fire.
                    timeoutRef.current = window.setTimeout({
                        "useFocus.useMemo[reference]": ()=>{
                            var _dataRef$current$floa;
                            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(elements.domReference ? elements.domReference.ownerDocument : document);
                            // Focus left the page, keep it open.
                            if (!relatedTarget && activeEl === elements.domReference) return;
                            // When focusing the reference element (e.g. regular click), then
                            // clicking into the floating element, prevent it from hiding.
                            // Note: it must be focusable, e.g. `tabindex="-1"`.
                            // We can not rely on relatedTarget to point to the correct element
                            // as it will only point to the shadow host of the newly focused element
                            // and not the element that actually has received focus if it is located
                            // inside a shadow root.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.domReference, activeEl) || movedToFocusGuard) {
                                return;
                            }
                            onOpenChange(false, nativeEvent, 'focus');
                        }
                    }["useFocus.useMemo[reference]"]);
                }
            })
    }["useFocus.useMemo[reference]"], [
        dataRef,
        elements.domReference,
        onOpenChange,
        visibleOnly
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useFocus.useMemo": ()=>enabled ? {
                reference
            } : {}
    }["useFocus.useMemo"], [
        enabled,
        reference
    ]);
}
const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';
function mergeProps(userProps, propsList, elementKey) {
    const map = new Map();
    const isItem = elementKey === 'item';
    let domUserProps = userProps;
    if (isItem && userProps) {
        const { [ACTIVE_KEY]: _, [SELECTED_KEY]: __, ...validProps } = userProps;
        domUserProps = validProps;
    }
    return {
        ...elementKey === 'floating' && {
            tabIndex: -1,
            [FOCUSABLE_ATTRIBUTE]: ''
        },
        ...domUserProps,
        ...propsList.map((value)=>{
            const propsOrGetProps = value ? value[elementKey] : null;
            if (typeof propsOrGetProps === 'function') {
                return userProps ? propsOrGetProps(userProps) : null;
            }
            return propsOrGetProps;
        }).concat(userProps).reduce((acc, props)=>{
            if (!props) {
                return acc;
            }
            Object.entries(props).forEach((_ref)=>{
                let [key, value] = _ref;
                if (isItem && [
                    ACTIVE_KEY,
                    SELECTED_KEY
                ].includes(key)) {
                    return;
                }
                if (key.indexOf('on') === 0) {
                    if (!map.has(key)) {
                        map.set(key, []);
                    }
                    if (typeof value === 'function') {
                        var _map$get;
                        (_map$get = map.get(key)) == null || _map$get.push(value);
                        acc[key] = function() {
                            var _map$get2;
                            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                                args[_key] = arguments[_key];
                            }
                            return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn)=>fn(...args)).find((val)=>val !== undefined);
                        };
                    }
                } else {
                    acc[key] = value;
                }
            });
            return acc;
        }, {})
    };
}
/**
 * Merges an array of interaction hooks' props into prop getters, allowing
 * event handler functions to be composed together without overwriting one
 * another.
 * @see https://floating-ui.com/docs/useInteractions
 */ function useInteractions(propsList) {
    if (propsList === void 0) {
        propsList = [];
    }
    const referenceDeps = propsList.map((key)=>key == null ? void 0 : key.reference);
    const floatingDeps = propsList.map((key)=>key == null ? void 0 : key.floating);
    const itemDeps = propsList.map((key)=>key == null ? void 0 : key.item);
    const getReferenceProps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useInteractions.useCallback[getReferenceProps]": (userProps)=>mergeProps(userProps, propsList, 'reference')
    }["useInteractions.useCallback[getReferenceProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps);
    const getFloatingProps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useInteractions.useCallback[getFloatingProps]": (userProps)=>mergeProps(userProps, propsList, 'floating')
    }["useInteractions.useCallback[getFloatingProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps);
    const getItemProps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useInteractions.useCallback[getItemProps]": (userProps)=>mergeProps(userProps, propsList, 'item')
    }["useInteractions.useCallback[getItemProps]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useInteractions.useMemo": ()=>({
                getReferenceProps,
                getFloatingProps,
                getItemProps
            })
    }["useInteractions.useMemo"], [
        getReferenceProps,
        getFloatingProps,
        getItemProps
    ]);
}
let isPreventScrollSupported = false;
function doSwitch(orientation, vertical, horizontal) {
    switch(orientation){
        case 'vertical':
            return vertical;
        case 'horizontal':
            return horizontal;
        default:
            return vertical || horizontal;
    }
}
function isMainOrientationKey(key, orientation) {
    const vertical = key === ARROW_UP || key === ARROW_DOWN;
    const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
    return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
    const vertical = key === ARROW_DOWN;
    const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
    return doSwitch(orientation, vertical, horizontal) || key === 'Enter' || key === ' ' || key === '';
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
    const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
    const horizontal = key === ARROW_DOWN;
    return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl) {
    const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
    const horizontal = key === ARROW_UP;
    return doSwitch(orientation, vertical, horizontal);
}
/**
 * Adds arrow key-based navigation of a list of items, either using real DOM
 * focus or virtual focus.
 * @see https://floating-ui.com/docs/useListNavigation
 */ function useListNavigation(context, props) {
    const { open, onOpenChange, elements } = context;
    const { listRef, activeIndex, onNavigate: unstable_onNavigate = ()=>{}, enabled = true, selectedIndex = null, allowEscape = false, loop = false, nested = false, rtl = false, virtual = false, focusItemOnOpen = 'auto', focusItemOnHover = true, openOnArrowKeyDown = true, disabledIndices = undefined, orientation = 'vertical', cols = 1, scrollItemIntoView = true, virtualItemRef, itemSizes, dense = false } = props;
    if ("TURBOPACK compile-time truthy", 1) {
        if (allowEscape) {
            if (!loop) {
                warn('`useListNavigation` looping must be enabled to allow escaping.');
            }
            if (!virtual) {
                warn('`useListNavigation` must be virtual to allow escaping.');
            }
        }
        if (orientation === 'vertical' && cols > 1) {
            warn('In grid list navigation mode (`cols` > 1), the `orientation` should', 'be either "horizontal" or "both".');
        }
    }
    const floatingFocusElement = getFloatingFocusElement(elements.floating);
    const floatingFocusElementRef = useLatestRef(floatingFocusElement);
    const parentId = useFloatingParentNodeId();
    const tree = useFloatingTree();
    const onNavigate = useEffectEvent(unstable_onNavigate);
    const typeableComboboxReference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(elements.domReference);
    const focusItemOnOpenRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(focusItemOnOpen);
    const indexRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(selectedIndex != null ? selectedIndex : -1);
    const keyRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const isPointerModalityRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(true);
    const previousOnNavigateRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(onNavigate);
    const previousMountedRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(!!elements.floating);
    const previousOpenRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(open);
    const forceSyncFocus = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const forceScrollIntoViewRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const disabledIndicesRef = useLatestRef(disabledIndices);
    const latestOpenRef = useLatestRef(open);
    const scrollItemIntoViewRef = useLatestRef(scrollItemIntoView);
    const selectedIndexRef = useLatestRef(selectedIndex);
    const [activeId, setActiveId] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState();
    const [virtualId, setVirtualId] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState();
    const focusItem = useEffectEvent({
        "useListNavigation.useEffectEvent[focusItem]": function(listRef, indexRef, forceScrollIntoView) {
            if (forceScrollIntoView === void 0) {
                forceScrollIntoView = false;
            }
            function runFocus(item) {
                if (virtual) {
                    setActiveId(item.id);
                    tree == null || tree.events.emit('virtualfocus', item);
                    if (virtualItemRef) {
                        virtualItemRef.current = item;
                    }
                } else {
                    enqueueFocus(item, {
                        preventScroll: true,
                        // Mac Safari does not move the virtual cursor unless the focus call
                        // is sync. However, for the very first focus call, we need to wait
                        // for the position to be ready in order to prevent unwanted
                        // scrolling. This means the virtual cursor will not move to the first
                        // item when first opening the floating element, but will on
                        // subsequent calls. `preventScroll` is supported in modern Safari,
                        // so we can use that instead.
                        // iOS Safari must be async or the first item will not be focused.
                        sync: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMac"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafari"])() ? isPreventScrollSupported || forceSyncFocus.current : false
                    });
                }
            }
            const initialItem = listRef.current[indexRef.current];
            if (initialItem) {
                runFocus(initialItem);
            }
            requestAnimationFrame({
                "useListNavigation.useEffectEvent[focusItem]": ()=>{
                    const waitedItem = listRef.current[indexRef.current] || initialItem;
                    if (!waitedItem) return;
                    if (!initialItem) {
                        runFocus(waitedItem);
                    }
                    const scrollIntoViewOptions = scrollItemIntoViewRef.current;
                    const shouldScrollIntoView = scrollIntoViewOptions && item && (forceScrollIntoView || !isPointerModalityRef.current);
                    if (shouldScrollIntoView) {
                        // JSDOM doesn't support `.scrollIntoView()` but it's widely supported
                        // by all browsers.
                        waitedItem.scrollIntoView == null || waitedItem.scrollIntoView(typeof scrollIntoViewOptions === 'boolean' ? {
                            block: 'nearest',
                            inline: 'nearest'
                        } : scrollIntoViewOptions);
                    }
                }
            }["useListNavigation.useEffectEvent[focusItem]"]);
        }
    }["useListNavigation.useEffectEvent[focusItem]"]);
    index(()=>{
        document.createElement('div').focus({
            get preventScroll () {
                isPreventScrollSupported = true;
                return false;
            }
        });
    }, []);
    // Sync `selectedIndex` to be the `activeIndex` upon opening the floating
    // element. Also, reset `activeIndex` upon closing the floating element.
    index(()=>{
        if (!enabled) return;
        if (open && elements.floating) {
            if (focusItemOnOpenRef.current && selectedIndex != null) {
                // Regardless of the pointer modality, we want to ensure the selected
                // item comes into view when the floating element is opened.
                forceScrollIntoViewRef.current = true;
                indexRef.current = selectedIndex;
                onNavigate(selectedIndex);
            }
        } else if (previousMountedRef.current) {
            // Since the user can specify `onNavigate` conditionally
            // (onNavigate: open ? setActiveIndex : setSelectedIndex),
            // we store and call the previous function.
            indexRef.current = -1;
            previousOnNavigateRef.current(null);
        }
    }, [
        enabled,
        open,
        elements.floating,
        selectedIndex,
        onNavigate
    ]);
    // Sync `activeIndex` to be the focused item while the floating element is
    // open.
    index(()=>{
        if (!enabled) return;
        if (open && elements.floating) {
            if (activeIndex == null) {
                forceSyncFocus.current = false;
                if (selectedIndexRef.current != null) {
                    return;
                }
                // Reset while the floating element was open (e.g. the list changed).
                if (previousMountedRef.current) {
                    indexRef.current = -1;
                    focusItem(listRef, indexRef);
                }
                // Initial sync.
                if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
                    let runs = 0;
                    const waitForListPopulated = ()=>{
                        if (listRef.current[0] == null) {
                            // Avoid letting the browser paint if possible on the first try,
                            // otherwise use rAF. Don't try more than twice, since something
                            // is wrong otherwise.
                            if (runs < 2) {
                                const scheduler = runs ? requestAnimationFrame : queueMicrotask;
                                scheduler(waitForListPopulated);
                            }
                            runs++;
                        } else {
                            indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
                            keyRef.current = null;
                            onNavigate(indexRef.current);
                        }
                    };
                    waitForListPopulated();
                }
            } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
                indexRef.current = activeIndex;
                focusItem(listRef, indexRef, forceScrollIntoViewRef.current);
                forceScrollIntoViewRef.current = false;
            }
        }
    }, [
        enabled,
        open,
        elements.floating,
        activeIndex,
        selectedIndexRef,
        nested,
        listRef,
        orientation,
        rtl,
        onNavigate,
        focusItem,
        disabledIndicesRef
    ]);
    // Ensure the parent floating element has focus when a nested child closes
    // to allow arrow key navigation to work after the pointer leaves the child.
    index(()=>{
        var _nodes$find;
        if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) {
            return;
        }
        const nodes = tree.nodesRef.current;
        const parent = (_nodes$find = nodes.find((node)=>node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
        const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating));
        const treeContainsActiveEl = nodes.some((node)=>node.context && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(node.context.elements.floating, activeEl));
        if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
            parent.focus({
                preventScroll: true
            });
        }
    }, [
        enabled,
        elements.floating,
        tree,
        parentId,
        virtual
    ]);
    index(()=>{
        if (!enabled) return;
        if (!tree) return;
        if (!virtual) return;
        if (parentId) return;
        function handleVirtualFocus(item) {
            setVirtualId(item.id);
            if (virtualItemRef) {
                virtualItemRef.current = item;
            }
        }
        tree.events.on('virtualfocus', handleVirtualFocus);
        return ()=>{
            tree.events.off('virtualfocus', handleVirtualFocus);
        };
    }, [
        enabled,
        tree,
        virtual,
        parentId,
        virtualItemRef
    ]);
    index(()=>{
        previousOnNavigateRef.current = onNavigate;
        previousMountedRef.current = !!elements.floating;
    });
    index(()=>{
        if (!open) {
            keyRef.current = null;
        }
    }, [
        open
    ]);
    index(()=>{
        previousOpenRef.current = open;
    }, [
        open
    ]);
    const hasActiveIndex = activeIndex != null;
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useListNavigation.useMemo[item]": ()=>{
            function syncCurrentTarget(currentTarget) {
                if (!open) return;
                const index = listRef.current.indexOf(currentTarget);
                if (index !== -1) {
                    onNavigate(index);
                }
            }
            const props = {
                onFocus (_ref) {
                    let { currentTarget } = _ref;
                    syncCurrentTarget(currentTarget);
                },
                onClick: {
                    "useListNavigation.useMemo[item]": (_ref2)=>{
                        let { currentTarget } = _ref2;
                        return currentTarget.focus({
                            preventScroll: true
                        });
                    }
                }["useListNavigation.useMemo[item]"],
                // Safari
                ...focusItemOnHover && {
                    onMouseMove (_ref3) {
                        let { currentTarget } = _ref3;
                        syncCurrentTarget(currentTarget);
                    },
                    onPointerLeave (_ref4) {
                        let { pointerType } = _ref4;
                        if (!isPointerModalityRef.current || pointerType === 'touch') {
                            return;
                        }
                        indexRef.current = -1;
                        focusItem(listRef, indexRef);
                        onNavigate(null);
                        if (!virtual) {
                            enqueueFocus(floatingFocusElementRef.current, {
                                preventScroll: true
                            });
                        }
                    }
                }
            };
            return props;
        }
    }["useListNavigation.useMemo[item]"], [
        open,
        floatingFocusElementRef,
        focusItem,
        focusItemOnHover,
        listRef,
        onNavigate,
        virtual
    ]);
    const commonOnKeyDown = useEffectEvent({
        "useListNavigation.useEffectEvent[commonOnKeyDown]": (event)=>{
            isPointerModalityRef.current = false;
            forceSyncFocus.current = true;
            // When composing a character, Chrome fires ArrowDown twice. Firefox/Safari
            // don't appear to suffer from this. `event.isComposing` is avoided due to
            // Safari not supporting it properly (although it's not needed in the first
            // place for Safari, just avoiding any possible issues).
            if (event.which === 229) {
                return;
            }
            // If the floating element is animating out, ignore navigation. Otherwise,
            // the `activeIndex` gets set to 0 despite not being open so the next time
            // the user ArrowDowns, the first item won't be focused.
            if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
                return;
            }
            if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                onOpenChange(false, event.nativeEvent, 'list-navigation');
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(elements.domReference)) {
                    if (virtual) {
                        tree == null || tree.events.emit('virtualfocus', elements.domReference);
                    } else {
                        elements.domReference.focus();
                    }
                }
                return;
            }
            const currentIndex = indexRef.current;
            const minIndex = getMinIndex(listRef, disabledIndices);
            const maxIndex = getMaxIndex(listRef, disabledIndices);
            if (!typeableComboboxReference) {
                if (event.key === 'Home') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    indexRef.current = minIndex;
                    onNavigate(indexRef.current);
                }
                if (event.key === 'End') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                    indexRef.current = maxIndex;
                    onNavigate(indexRef.current);
                }
            }
            // Grid navigation.
            if (cols > 1) {
                const sizes = itemSizes || Array.from({
                    length: listRef.current.length
                }, {
                    "useListNavigation.useEffectEvent[commonOnKeyDown]": ()=>({
                            width: 1,
                            height: 1
                        })
                }["useListNavigation.useEffectEvent[commonOnKeyDown]"]);
                // To calculate movements on the grid, we use hypothetical cell indices
                // as if every item was 1x1, then convert back to real indices.
                const cellMap = buildCellMap(sizes, cols, dense);
                const minGridIndex = cellMap.findIndex({
                    "useListNavigation.useEffectEvent[commonOnKeyDown].minGridIndex": (index)=>index != null && !isDisabled(listRef.current, index, disabledIndices)
                }["useListNavigation.useEffectEvent[commonOnKeyDown].minGridIndex"]);
                // last enabled index
                const maxGridIndex = cellMap.reduce({
                    "useListNavigation.useEffectEvent[commonOnKeyDown].maxGridIndex": (foundIndex, index, cellIndex)=>index != null && !isDisabled(listRef.current, index, disabledIndices) ? cellIndex : foundIndex
                }["useListNavigation.useEffectEvent[commonOnKeyDown].maxGridIndex"], -1);
                const index = cellMap[getGridNavigatedIndex({
                    current: cellMap.map({
                        "useListNavigation.useEffectEvent[commonOnKeyDown]": (itemIndex)=>itemIndex != null ? listRef.current[itemIndex] : null
                    }["useListNavigation.useEffectEvent[commonOnKeyDown]"])
                }, {
                    event,
                    orientation,
                    loop,
                    rtl,
                    cols,
                    // treat undefined (empty grid spaces) as disabled indices so we
                    // don't end up in them
                    disabledIndices: getCellIndices([
                        ...disabledIndices || listRef.current.map({
                            "useListNavigation.useEffectEvent[commonOnKeyDown]": (_, index)=>isDisabled(listRef.current, index) ? index : undefined
                        }["useListNavigation.useEffectEvent[commonOnKeyDown]"]),
                        undefined
                    ], cellMap),
                    minIndex: minGridIndex,
                    maxIndex: maxGridIndex,
                    prevIndex: getCellIndexOfCorner(indexRef.current > maxIndex ? minIndex : indexRef.current, sizes, cellMap, cols, // use a corner matching the edge closest to the direction
                    // we're moving in so we don't end up in the same item. Prefer
                    // top/left over bottom/right.
                    event.key === ARROW_DOWN ? 'bl' : event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT) ? 'tr' : 'tl'),
                    stopEvent: true
                })];
                if (index != null) {
                    indexRef.current = index;
                    onNavigate(indexRef.current);
                }
                if (orientation === 'both') {
                    return;
                }
            }
            if (isMainOrientationKey(event.key, orientation)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                // Reset the index if no item is focused.
                if (open && !virtual && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])(event.currentTarget.ownerDocument) === event.currentTarget) {
                    indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
                    onNavigate(indexRef.current);
                    return;
                }
                if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
                    if (loop) {
                        indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
                            startingIndex: currentIndex,
                            disabledIndices
                        });
                    } else {
                        indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
                            startingIndex: currentIndex,
                            disabledIndices
                        }));
                    }
                } else {
                    if (loop) {
                        indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
                            startingIndex: currentIndex,
                            decrement: true,
                            disabledIndices
                        });
                    } else {
                        indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
                            startingIndex: currentIndex,
                            decrement: true,
                            disabledIndices
                        }));
                    }
                }
                if (isIndexOutOfBounds(listRef, indexRef.current)) {
                    onNavigate(null);
                } else {
                    onNavigate(indexRef.current);
                }
            }
        }
    }["useListNavigation.useEffectEvent[commonOnKeyDown]"]);
    const ariaActiveDescendantProp = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useListNavigation.useMemo[ariaActiveDescendantProp]": ()=>{
            return virtual && open && hasActiveIndex && {
                'aria-activedescendant': virtualId || activeId
            };
        }
    }["useListNavigation.useMemo[ariaActiveDescendantProp]"], [
        virtual,
        open,
        hasActiveIndex,
        virtualId,
        activeId
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useListNavigation.useMemo[floating]": ()=>{
            return {
                'aria-orientation': orientation === 'both' ? undefined : orientation,
                ...!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(elements.domReference) && ariaActiveDescendantProp,
                onKeyDown: commonOnKeyDown,
                onPointerMove () {
                    isPointerModalityRef.current = true;
                }
            };
        }
    }["useListNavigation.useMemo[floating]"], [
        ariaActiveDescendantProp,
        commonOnKeyDown,
        elements.domReference,
        orientation
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useListNavigation.useMemo[reference]": ()=>{
            function checkVirtualMouse(event) {
                if (focusItemOnOpen === 'auto' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualClick"])(event.nativeEvent)) {
                    focusItemOnOpenRef.current = true;
                }
            }
            function checkVirtualPointer(event) {
                // `pointerdown` fires first, reset the state then perform the checks.
                focusItemOnOpenRef.current = focusItemOnOpen;
                if (focusItemOnOpen === 'auto' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(event.nativeEvent)) {
                    focusItemOnOpenRef.current = true;
                }
            }
            return {
                ...ariaActiveDescendantProp,
                onKeyDown (event) {
                    isPointerModalityRef.current = false;
                    const isArrowKey = event.key.startsWith('Arrow');
                    const isHomeOrEndKey = [
                        'Home',
                        'End'
                    ].includes(event.key);
                    const isMoveKey = isArrowKey || isHomeOrEndKey;
                    const isCrossOpenKey = isCrossOrientationOpenKey(event.key, orientation, rtl);
                    const isCrossCloseKey = isCrossOrientationCloseKey(event.key, orientation, rtl);
                    const isMainKey = isMainOrientationKey(event.key, orientation);
                    const isNavigationKey = (nested ? isCrossOpenKey : isMainKey) || event.key === 'Enter' || event.key.trim() === '';
                    if (virtual && open) {
                        const rootNode = tree == null ? void 0 : tree.nodesRef.current.find({
                            "useListNavigation.useMemo[reference]": (node)=>node.parentId == null
                        }["useListNavigation.useMemo[reference]"]);
                        const deepestNode = tree && rootNode ? getDeepestNode(tree.nodesRef.current, rootNode.id) : null;
                        if (isMoveKey && deepestNode && virtualItemRef) {
                            const eventObject = new KeyboardEvent('keydown', {
                                key: event.key,
                                bubbles: true
                            });
                            if (isCrossOpenKey || isCrossCloseKey) {
                                var _deepestNode$context, _deepestNode$context2;
                                const isCurrentTarget = ((_deepestNode$context = deepestNode.context) == null ? void 0 : _deepestNode$context.elements.domReference) === event.currentTarget;
                                const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? listRef.current.find({
                                    "useListNavigation.useMemo[reference]": (item)=>(item == null ? void 0 : item.id) === activeId
                                }["useListNavigation.useMemo[reference]"]) : null;
                                if (dispatchItem) {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                                    dispatchItem.dispatchEvent(eventObject);
                                    setVirtualId(undefined);
                                }
                            }
                            if ((isMainKey || isHomeOrEndKey) && deepestNode.context) {
                                if (deepestNode.context.open && deepestNode.parentId && event.currentTarget !== deepestNode.context.elements.domReference) {
                                    var _deepestNode$context$;
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                                    (_deepestNode$context$ = deepestNode.context.elements.domReference) == null || _deepestNode$context$.dispatchEvent(eventObject);
                                    return;
                                }
                            }
                        }
                        return commonOnKeyDown(event);
                    }
                    // If a floating element should not open on arrow key down, avoid
                    // setting `activeIndex` while it's closed.
                    if (!open && !openOnArrowKeyDown && isArrowKey) {
                        return;
                    }
                    if (isNavigationKey) {
                        keyRef.current = nested && isMainKey ? null : event.key;
                    }
                    if (nested) {
                        if (isCrossOpenKey) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                            if (open) {
                                indexRef.current = getMinIndex(listRef, disabledIndicesRef.current);
                                onNavigate(indexRef.current);
                            } else {
                                onOpenChange(true, event.nativeEvent, 'list-navigation');
                            }
                        }
                        return;
                    }
                    if (isMainKey) {
                        if (selectedIndex != null) {
                            indexRef.current = selectedIndex;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                        if (!open && openOnArrowKeyDown) {
                            onOpenChange(true, event.nativeEvent, 'list-navigation');
                        } else {
                            commonOnKeyDown(event);
                        }
                        if (open) {
                            onNavigate(indexRef.current);
                        }
                    }
                },
                onFocus () {
                    if (open && !virtual) {
                        onNavigate(null);
                    }
                },
                onPointerDown: checkVirtualPointer,
                onMouseDown: checkVirtualMouse,
                onClick: checkVirtualMouse
            };
        }
    }["useListNavigation.useMemo[reference]"], [
        activeId,
        ariaActiveDescendantProp,
        commonOnKeyDown,
        disabledIndicesRef,
        focusItemOnOpen,
        listRef,
        nested,
        onNavigate,
        onOpenChange,
        open,
        openOnArrowKeyDown,
        orientation,
        rtl,
        selectedIndex,
        tree,
        virtual,
        virtualItemRef
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useListNavigation.useMemo": ()=>enabled ? {
                reference,
                floating,
                item
            } : {}
    }["useListNavigation.useMemo"], [
        enabled,
        reference,
        floating,
        item
    ]);
}
const componentRoleToAriaRoleMap = /*#__PURE__*/ new Map([
    [
        'select',
        'listbox'
    ],
    [
        'combobox',
        'listbox'
    ],
    [
        'label',
        false
    ]
]);
/**
 * Adds base screen reader props to the reference and floating elements for a
 * given floating element `role`.
 * @see https://floating-ui.com/docs/useRole
 */ function useRole(context, props) {
    var _componentRoleToAriaR;
    if (props === void 0) {
        props = {};
    }
    const { open, floatingId } = context;
    const { enabled = true, role = 'dialog' } = props;
    const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
    const referenceId = useId();
    const parentId = useFloatingParentNodeId();
    const isNested = parentId != null;
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useRole.useMemo[reference]": ()=>{
            if (ariaRole === 'tooltip' || role === 'label') {
                return {
                    ["aria-" + (role === 'label' ? 'labelledby' : 'describedby')]: open ? floatingId : undefined
                };
            }
            return {
                'aria-expanded': open ? 'true' : 'false',
                'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
                'aria-controls': open ? floatingId : undefined,
                ...ariaRole === 'listbox' && {
                    role: 'combobox'
                },
                ...ariaRole === 'menu' && {
                    id: referenceId
                },
                ...ariaRole === 'menu' && isNested && {
                    role: 'menuitem'
                },
                ...role === 'select' && {
                    'aria-autocomplete': 'none'
                },
                ...role === 'combobox' && {
                    'aria-autocomplete': 'list'
                }
            };
        }
    }["useRole.useMemo[reference]"], [
        ariaRole,
        floatingId,
        isNested,
        open,
        referenceId,
        role
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useRole.useMemo[floating]": ()=>{
            const floatingProps = {
                id: floatingId,
                ...ariaRole && {
                    role: ariaRole
                }
            };
            if (ariaRole === 'tooltip' || role === 'label') {
                return floatingProps;
            }
            return {
                ...floatingProps,
                ...ariaRole === 'menu' && {
                    'aria-labelledby': referenceId
                }
            };
        }
    }["useRole.useMemo[floating]"], [
        ariaRole,
        floatingId,
        referenceId,
        role
    ]);
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "useRole.useCallback[item]": (_ref)=>{
            let { active, selected } = _ref;
            const commonProps = {
                role: 'option',
                ...active && {
                    id: floatingId + "-option"
                }
            };
            // For `menu`, we are unable to tell if the item is a `menuitemradio`
            // or `menuitemcheckbox`. For backwards-compatibility reasons, also
            // avoid defaulting to `menuitem` as it may overwrite custom role props.
            switch(role){
                case 'select':
                    return {
                        ...commonProps,
                        'aria-selected': active && selected
                    };
                case 'combobox':
                    {
                        return {
                            ...commonProps,
                            ...active && {
                                'aria-selected': true
                            }
                        };
                    }
            }
            return {};
        }
    }["useRole.useCallback[item]"], [
        floatingId,
        role
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useRole.useMemo": ()=>enabled ? {
                reference,
                floating,
                item
            } : {}
    }["useRole.useMemo"], [
        enabled,
        reference,
        floating,
        item
    ]);
}
// Converts a JS style key like `backgroundColor` to a CSS transition-property
// like `background-color`.
const camelCaseToKebabCase = (str)=>str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs)=>(ofs ? '-' : '') + $.toLowerCase());
function execWithArgsOrReturn(valueOrFn, args) {
    return typeof valueOrFn === 'function' ? valueOrFn(args) : valueOrFn;
}
function useDelayUnmount(open, durationMs) {
    const [isMounted, setIsMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(open);
    if (open && !isMounted) {
        setIsMounted(true);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useDelayUnmount.useEffect": ()=>{
            if (!open && isMounted) {
                const timeout = setTimeout({
                    "useDelayUnmount.useEffect.timeout": ()=>setIsMounted(false)
                }["useDelayUnmount.useEffect.timeout"], durationMs);
                return ({
                    "useDelayUnmount.useEffect": ()=>clearTimeout(timeout)
                })["useDelayUnmount.useEffect"];
            }
        }
    }["useDelayUnmount.useEffect"], [
        open,
        isMounted,
        durationMs
    ]);
    return isMounted;
}
/**
 * Provides a status string to apply CSS transitions to a floating element,
 * correctly handling placement-aware transitions.
 * @see https://floating-ui.com/docs/useTransition#usetransitionstatus
 */ function useTransitionStatus(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { open, elements: { floating } } = context;
    const { duration = 250 } = props;
    const isNumberDuration = typeof duration === 'number';
    const closeDuration = (isNumberDuration ? duration : duration.close) || 0;
    const [status, setStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState('unmounted');
    const isMounted = useDelayUnmount(open, closeDuration);
    if (!isMounted && status === 'close') {
        setStatus('unmounted');
    }
    index(()=>{
        if (!floating) return;
        if (open) {
            setStatus('initial');
            const frame = requestAnimationFrame(()=>{
                setStatus('open');
            });
            return ()=>{
                cancelAnimationFrame(frame);
            };
        }
        setStatus('close');
    }, [
        open,
        floating
    ]);
    return {
        isMounted,
        status
    };
}
/**
 * Provides styles to apply CSS transitions to a floating element, correctly
 * handling placement-aware transitions. Wrapper around `useTransitionStatus`.
 * @see https://floating-ui.com/docs/useTransition#usetransitionstyles
 */ function useTransitionStyles(context, props) {
    if (props === void 0) {
        props = {};
    }
    const { initial: unstable_initial = {
        opacity: 0
    }, open: unstable_open, close: unstable_close, common: unstable_common, duration = 250 } = props;
    const placement = context.placement;
    const side = placement.split('-')[0];
    const fnArgs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useTransitionStyles.useMemo[fnArgs]": ()=>({
                side,
                placement
            })
    }["useTransitionStyles.useMemo[fnArgs]"], [
        side,
        placement
    ]);
    const isNumberDuration = typeof duration === 'number';
    const openDuration = (isNumberDuration ? duration : duration.open) || 0;
    const closeDuration = (isNumberDuration ? duration : duration.close) || 0;
    const [styles, setStyles] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        "useTransitionStyles.useState": ()=>({
                ...execWithArgsOrReturn(unstable_common, fnArgs),
                ...execWithArgsOrReturn(unstable_initial, fnArgs)
            })
    }["useTransitionStyles.useState"]);
    const { isMounted, status } = useTransitionStatus(context, {
        duration
    });
    const initialRef = useLatestRef(unstable_initial);
    const openRef = useLatestRef(unstable_open);
    const closeRef = useLatestRef(unstable_close);
    const commonRef = useLatestRef(unstable_common);
    index(()=>{
        const initialStyles = execWithArgsOrReturn(initialRef.current, fnArgs);
        const closeStyles = execWithArgsOrReturn(closeRef.current, fnArgs);
        const commonStyles = execWithArgsOrReturn(commonRef.current, fnArgs);
        const openStyles = execWithArgsOrReturn(openRef.current, fnArgs) || Object.keys(initialStyles).reduce((acc, key)=>{
            acc[key] = '';
            return acc;
        }, {});
        if (status === 'initial') {
            setStyles((styles)=>({
                    transitionProperty: styles.transitionProperty,
                    ...commonStyles,
                    ...initialStyles
                }));
        }
        if (status === 'open') {
            setStyles({
                transitionProperty: Object.keys(openStyles).map(camelCaseToKebabCase).join(','),
                transitionDuration: openDuration + "ms",
                ...commonStyles,
                ...openStyles
            });
        }
        if (status === 'close') {
            const styles = closeStyles || initialStyles;
            setStyles({
                transitionProperty: Object.keys(styles).map(camelCaseToKebabCase).join(','),
                transitionDuration: closeDuration + "ms",
                ...commonStyles,
                ...styles
            });
        }
    }, [
        closeDuration,
        closeRef,
        initialRef,
        openRef,
        commonRef,
        openDuration,
        status,
        fnArgs
    ]);
    return {
        isMounted,
        styles
    };
}
/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */ function useTypeahead(context, props) {
    var _ref;
    const { open, dataRef } = context;
    const { listRef, activeIndex, onMatch: unstable_onMatch, onTypingChange: unstable_onTypingChange, enabled = true, findMatch = null, resetMs = 750, ignoreKeys = [], selectedIndex = null } = props;
    const timeoutIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef();
    const stringRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef('');
    const prevIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef((_ref = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref : -1);
    const matchIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const onMatch = useEffectEvent(unstable_onMatch);
    const onTypingChange = useEffectEvent(unstable_onTypingChange);
    const findMatchRef = useLatestRef(findMatch);
    const ignoreKeysRef = useLatestRef(ignoreKeys);
    index(()=>{
        if (open) {
            clearTimeout(timeoutIdRef.current);
            matchIndexRef.current = null;
            stringRef.current = '';
        }
    }, [
        open
    ]);
    index(()=>{
        // Sync arrow key navigation but not typeahead navigation.
        if (open && stringRef.current === '') {
            var _ref2;
            prevIndexRef.current = (_ref2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref2 : -1;
        }
    }, [
        open,
        selectedIndex,
        activeIndex
    ]);
    const setTypingChange = useEffectEvent({
        "useTypeahead.useEffectEvent[setTypingChange]": (value)=>{
            if (value) {
                if (!dataRef.current.typing) {
                    dataRef.current.typing = value;
                    onTypingChange(value);
                }
            } else {
                if (dataRef.current.typing) {
                    dataRef.current.typing = value;
                    onTypingChange(value);
                }
            }
        }
    }["useTypeahead.useEffectEvent[setTypingChange]"]);
    const onKeyDown = useEffectEvent({
        "useTypeahead.useEffectEvent[onKeyDown]": (event)=>{
            function getMatchingIndex(list, orderedList, string) {
                const str = findMatchRef.current ? findMatchRef.current(orderedList, string) : orderedList.find({
                    "useTypeahead.useEffectEvent[onKeyDown].getMatchingIndex": (text)=>(text == null ? void 0 : text.toLocaleLowerCase().indexOf(string.toLocaleLowerCase())) === 0
                }["useTypeahead.useEffectEvent[onKeyDown].getMatchingIndex"]);
                return str ? list.indexOf(str) : -1;
            }
            const listContent = listRef.current;
            if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
                if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
                    setTypingChange(false);
                } else if (event.key === ' ') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                }
            }
            if (listContent == null || ignoreKeysRef.current.includes(event.key) || // Character key.
            event.key.length !== 1 || // Modifier key.
            event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            if (open && event.key !== ' ') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                setTypingChange(true);
            }
            // Bail out if the list contains a word like "llama" or "aaron". TODO:
            // allow it in this case, too.
            const allowRapidSuccessionOfFirstLetter = listContent.every({
                "useTypeahead.useEffectEvent[onKeyDown].allowRapidSuccessionOfFirstLetter": (text)=>{
                    var _text$, _text$2;
                    return text ? ((_text$ = text[0]) == null ? void 0 : _text$.toLocaleLowerCase()) !== ((_text$2 = text[1]) == null ? void 0 : _text$2.toLocaleLowerCase()) : true;
                }
            }["useTypeahead.useEffectEvent[onKeyDown].allowRapidSuccessionOfFirstLetter"]);
            // Allows the user to cycle through items that start with the same letter
            // in rapid succession.
            if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
                stringRef.current = '';
                prevIndexRef.current = matchIndexRef.current;
            }
            stringRef.current += event.key;
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = setTimeout({
                "useTypeahead.useEffectEvent[onKeyDown]": ()=>{
                    stringRef.current = '';
                    prevIndexRef.current = matchIndexRef.current;
                    setTypingChange(false);
                }
            }["useTypeahead.useEffectEvent[onKeyDown]"], resetMs);
            const prevIndex = prevIndexRef.current;
            const index = getMatchingIndex(listContent, [
                ...listContent.slice((prevIndex || 0) + 1),
                ...listContent.slice(0, (prevIndex || 0) + 1)
            ], stringRef.current);
            if (index !== -1) {
                onMatch(index);
                matchIndexRef.current = index;
            } else if (event.key !== ' ') {
                stringRef.current = '';
                setTypingChange(false);
            }
        }
    }["useTypeahead.useEffectEvent[onKeyDown]"]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useTypeahead.useMemo[reference]": ()=>({
                onKeyDown
            })
    }["useTypeahead.useMemo[reference]"], [
        onKeyDown
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useTypeahead.useMemo[floating]": ()=>{
            return {
                onKeyDown,
                onKeyUp (event) {
                    if (event.key === ' ') {
                        setTypingChange(false);
                    }
                }
            };
        }
    }["useTypeahead.useMemo[floating]"], [
        onKeyDown,
        setTypingChange
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useTypeahead.useMemo": ()=>enabled ? {
                reference,
                floating
            } : {}
    }["useTypeahead.useMemo"], [
        enabled,
        reference,
        floating
    ]);
}
function getArgsWithCustomFloatingHeight(state, height) {
    return {
        ...state,
        rects: {
            ...state.rects,
            floating: {
                ...state.rects.floating,
                height
            }
        }
    };
}
/**
 * Positions the floating element such that an inner element inside of it is
 * anchored to the reference element.
 * @see https://floating-ui.com/docs/inner
 */ const inner = (props)=>({
        name: 'inner',
        options: props,
        async fn (state) {
            const { listRef, overflowRef, onFallbackChange, offset: innerOffset = 0, index = 0, minItemsVisible = 4, referenceOverflowThreshold = 0, scrollRef, ...detectOverflowOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(props, state);
            const { rects, elements: { floating } } = state;
            const item = listRef.current[index];
            const scrollEl = (scrollRef == null ? void 0 : scrollRef.current) || floating;
            // Valid combinations:
            // 1. Floating element is the scrollRef and has a border (default)
            // 2. Floating element is not the scrollRef, floating element has a border
            // 3. Floating element is not the scrollRef, scrollRef has a border
            // Floating > {...getFloatingProps()} wrapper > scrollRef > items is not
            // allowed as VoiceOver doesn't work.
            const clientTop = floating.clientTop || scrollEl.clientTop;
            const floatingIsBordered = floating.clientTop !== 0;
            const scrollElIsBordered = scrollEl.clientTop !== 0;
            const floatingIsScrollEl = floating === scrollEl;
            if ("TURBOPACK compile-time truthy", 1) {
                if (!state.placement.startsWith('bottom')) {
                    warn('`placement` side must be "bottom" when using the `inner`', 'middleware.');
                }
            }
            if (!item) {
                return {};
            }
            const nextArgs = {
                ...state,
                ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])(-item.offsetTop - floating.clientTop - rects.reference.height / 2 - item.offsetHeight / 2 - innerOffset).fn(state)
            };
            const overflow = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectOverflow"])(getArgsWithCustomFloatingHeight(nextArgs, scrollEl.scrollHeight + clientTop + floating.clientTop), detectOverflowOptions);
            const refOverflow = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectOverflow"])(nextArgs, {
                ...detectOverflowOptions,
                elementContext: 'reference'
            });
            const diffY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(0, overflow.top);
            const nextY = nextArgs.y + diffY;
            const isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight;
            const rounder = isScrollable ? (v)=>v : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"];
            const maxHeight = rounder((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(0, scrollEl.scrollHeight + (floatingIsBordered && floatingIsScrollEl || scrollElIsBordered ? clientTop * 2 : 0) - diffY - (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["max"])(0, overflow.bottom)));
            scrollEl.style.maxHeight = maxHeight + "px";
            scrollEl.scrollTop = diffY;
            // There is not enough space, fallback to standard anchored positioning
            if (onFallbackChange) {
                const shouldFallback = scrollEl.offsetHeight < item.offsetHeight * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["min"])(minItemsVisible, listRef.current.length) - 1 || refOverflow.top >= -referenceOverflowThreshold || refOverflow.bottom >= -referenceOverflowThreshold;
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"](()=>onFallbackChange(shouldFallback));
            }
            if (overflowRef) {
                overflowRef.current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectOverflow"])(getArgsWithCustomFloatingHeight({
                    ...nextArgs,
                    y: nextY
                }, scrollEl.offsetHeight + clientTop + floating.clientTop), detectOverflowOptions);
            }
            return {
                y: nextY
            };
        }
    });
/**
 * Changes the `inner` middleware's `offset` upon a `wheel` event to
 * expand the floating element's height, revealing more list items.
 * @see https://floating-ui.com/docs/inner
 */ function useInnerOffset(context, props) {
    const { open, elements } = context;
    const { enabled = true, overflowRef, scrollRef, onChange: unstable_onChange } = props;
    const onChange = useEffectEvent(unstable_onChange);
    const controlledScrollingRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(false);
    const prevScrollTopRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    const initialOverflowRef = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useEffect({
        "useInnerOffset.useEffect": ()=>{
            if (!enabled) return;
            function onWheel(e) {
                if (e.ctrlKey || !el || overflowRef.current == null) {
                    return;
                }
                const dY = e.deltaY;
                const isAtTop = overflowRef.current.top >= -0.5;
                const isAtBottom = overflowRef.current.bottom >= -0.5;
                const remainingScroll = el.scrollHeight - el.clientHeight;
                const sign = dY < 0 ? -1 : 1;
                const method = dY < 0 ? 'max' : 'min';
                if (el.scrollHeight <= el.clientHeight) {
                    return;
                }
                if (!isAtTop && dY > 0 || !isAtBottom && dY < 0) {
                    e.preventDefault();
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"]({
                        "useInnerOffset.useEffect.onWheel": ()=>{
                            onChange({
                                "useInnerOffset.useEffect.onWheel": (d)=>d + Math[method](dY, remainingScroll * sign)
                            }["useInnerOffset.useEffect.onWheel"]);
                        }
                    }["useInnerOffset.useEffect.onWheel"]);
                } else if (/firefox/i.test((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserAgent"])())) {
                    // Needed to propagate scrolling during momentum scrolling phase once
                    // it gets limited by the boundary. UX improvement, not critical.
                    el.scrollTop += dY;
                }
            }
            const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
            if (open && el) {
                el.addEventListener('wheel', onWheel);
                // Wait for the position to be ready.
                requestAnimationFrame({
                    "useInnerOffset.useEffect": ()=>{
                        prevScrollTopRef.current = el.scrollTop;
                        if (overflowRef.current != null) {
                            initialOverflowRef.current = {
                                ...overflowRef.current
                            };
                        }
                    }
                }["useInnerOffset.useEffect"]);
                return ({
                    "useInnerOffset.useEffect": ()=>{
                        prevScrollTopRef.current = null;
                        initialOverflowRef.current = null;
                        el.removeEventListener('wheel', onWheel);
                    }
                })["useInnerOffset.useEffect"];
            }
        }
    }["useInnerOffset.useEffect"], [
        enabled,
        open,
        elements.floating,
        overflowRef,
        scrollRef,
        onChange
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useInnerOffset.useMemo[floating]": ()=>({
                onKeyDown () {
                    controlledScrollingRef.current = true;
                },
                onWheel () {
                    controlledScrollingRef.current = false;
                },
                onPointerMove () {
                    controlledScrollingRef.current = false;
                },
                onScroll () {
                    const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
                    if (!overflowRef.current || !el || !controlledScrollingRef.current) {
                        return;
                    }
                    if (prevScrollTopRef.current !== null) {
                        const scrollDiff = el.scrollTop - prevScrollTopRef.current;
                        if (overflowRef.current.bottom < -0.5 && scrollDiff < -1 || overflowRef.current.top < -0.5 && scrollDiff > 1) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"]({
                                "useInnerOffset.useMemo[floating]": ()=>onChange({
                                        "useInnerOffset.useMemo[floating]": (d)=>d + scrollDiff
                                    }["useInnerOffset.useMemo[floating]"])
                            }["useInnerOffset.useMemo[floating]"]);
                        }
                    }
                    // [Firefox] Wait for the height change to have been applied.
                    requestAnimationFrame({
                        "useInnerOffset.useMemo[floating]": ()=>{
                            prevScrollTopRef.current = el.scrollTop;
                        }
                    }["useInnerOffset.useMemo[floating]"]);
                }
            })
    }["useInnerOffset.useMemo[floating]"], [
        elements.floating,
        onChange,
        overflowRef,
        scrollRef
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useMemo({
        "useInnerOffset.useMemo": ()=>enabled ? {
                floating
            } : {}
    }["useInnerOffset.useMemo"], [
        enabled,
        floating
    ]);
}
function isPointInPolygon(point, polygon) {
    const [x, y] = point;
    let isInside = false;
    const length = polygon.length;
    for(let i = 0, j = length - 1; i < length; j = i++){
        const [xi, yi] = polygon[i] || [
            0,
            0
        ];
        const [xj, yj] = polygon[j] || [
            0,
            0
        ];
        const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) {
            isInside = !isInside;
        }
    }
    return isInside;
}
function isInside(point, rect) {
    return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
/**
 * Generates a safe polygon area that the user can traverse without closing the
 * floating element once leaving the reference element.
 * @see https://floating-ui.com/docs/useHover#safepolygon
 */ function safePolygon(options) {
    if (options === void 0) {
        options = {};
    }
    const { buffer = 0.5, blockPointerEvents = false, requireIntent = true } = options;
    let timeoutId;
    let hasLanded = false;
    let lastX = null;
    let lastY = null;
    let lastCursorTime = performance.now();
    function getCursorSpeed(x, y) {
        const currentTime = performance.now();
        const elapsedTime = currentTime - lastCursorTime;
        if (lastX === null || lastY === null || elapsedTime === 0) {
            lastX = x;
            lastY = y;
            lastCursorTime = currentTime;
            return null;
        }
        const deltaX = x - lastX;
        const deltaY = y - lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const speed = distance / elapsedTime; // px / ms
        lastX = x;
        lastY = y;
        lastCursorTime = currentTime;
        return speed;
    }
    const fn = (_ref)=>{
        let { x, y, placement, elements, onClose, nodeId, tree } = _ref;
        return function onMouseMove(event) {
            function close() {
                clearTimeout(timeoutId);
                onClose();
            }
            clearTimeout(timeoutId);
            if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
                return;
            }
            const { clientX, clientY } = event;
            const clientPoint = [
                clientX,
                clientY
            ];
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event);
            const isLeave = event.type === 'mouseleave';
            const isOverFloatingEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.floating, target);
            const isOverReferenceEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.domReference, target);
            const refRect = elements.domReference.getBoundingClientRect();
            const rect = elements.floating.getBoundingClientRect();
            const side = placement.split('-')[0];
            const cursorLeaveFromRight = x > rect.right - rect.width / 2;
            const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
            const isOverReferenceRect = isInside(clientPoint, refRect);
            const isFloatingWider = rect.width > refRect.width;
            const isFloatingTaller = rect.height > refRect.height;
            const left = (isFloatingWider ? refRect : rect).left;
            const right = (isFloatingWider ? refRect : rect).right;
            const top = (isFloatingTaller ? refRect : rect).top;
            const bottom = (isFloatingTaller ? refRect : rect).bottom;
            if (isOverFloatingEl) {
                hasLanded = true;
                if (!isLeave) {
                    return;
                }
            }
            if (isOverReferenceEl) {
                hasLanded = false;
            }
            if (isOverReferenceEl && !isLeave) {
                hasLanded = true;
                return;
            }
            // Prevent overlapping floating element from being stuck in an open-close
            // loop: https://github.com/floating-ui/floating-ui/issues/1910
            if (isLeave && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(event.relatedTarget) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(elements.floating, event.relatedTarget)) {
                return;
            }
            // If any nested child is open, abort.
            if (tree && getChildren(tree.nodesRef.current, nodeId).some((_ref2)=>{
                let { context } = _ref2;
                return context == null ? void 0 : context.open;
            })) {
                return;
            }
            // If the pointer is leaving from the opposite side, the "buffer" logic
            // creates a point where the floating element remains open, but should be
            // ignored.
            // A constant of 1 handles floating point rounding errors.
            if (side === 'top' && y >= refRect.bottom - 1 || side === 'bottom' && y <= refRect.top + 1 || side === 'left' && x >= refRect.right - 1 || side === 'right' && x <= refRect.left + 1) {
                return close();
            }
            // Ignore when the cursor is within the rectangular trough between the
            // two elements. Since the triangle is created from the cursor point,
            // which can start beyond the ref element's edge, traversing back and
            // forth from the ref to the floating element can cause it to close. This
            // ensures it always remains open in that case.
            let rectPoly = [];
            switch(side){
                case 'top':
                    rectPoly = [
                        [
                            left,
                            refRect.top + 1
                        ],
                        [
                            left,
                            rect.bottom - 1
                        ],
                        [
                            right,
                            rect.bottom - 1
                        ],
                        [
                            right,
                            refRect.top + 1
                        ]
                    ];
                    break;
                case 'bottom':
                    rectPoly = [
                        [
                            left,
                            rect.top + 1
                        ],
                        [
                            left,
                            refRect.bottom - 1
                        ],
                        [
                            right,
                            refRect.bottom - 1
                        ],
                        [
                            right,
                            rect.top + 1
                        ]
                    ];
                    break;
                case 'left':
                    rectPoly = [
                        [
                            rect.right - 1,
                            bottom
                        ],
                        [
                            rect.right - 1,
                            top
                        ],
                        [
                            refRect.left + 1,
                            top
                        ],
                        [
                            refRect.left + 1,
                            bottom
                        ]
                    ];
                    break;
                case 'right':
                    rectPoly = [
                        [
                            refRect.right - 1,
                            bottom
                        ],
                        [
                            refRect.right - 1,
                            top
                        ],
                        [
                            rect.left + 1,
                            top
                        ],
                        [
                            rect.left + 1,
                            bottom
                        ]
                    ];
                    break;
            }
            function getPolygon(_ref3) {
                let [x, y] = _ref3;
                switch(side){
                    case 'top':
                        {
                            const cursorPointOne = [
                                isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4,
                                y + buffer + 1
                            ];
                            const cursorPointTwo = [
                                isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4,
                                y + buffer + 1
                            ];
                            const commonPoints = [
                                [
                                    rect.left,
                                    cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top
                                ],
                                [
                                    rect.right,
                                    cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer
                                ]
                            ];
                            return [
                                cursorPointOne,
                                cursorPointTwo,
                                ...commonPoints
                            ];
                        }
                    case 'bottom':
                        {
                            const cursorPointOne = [
                                isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4,
                                y - buffer
                            ];
                            const cursorPointTwo = [
                                isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4,
                                y - buffer
                            ];
                            const commonPoints = [
                                [
                                    rect.left,
                                    cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom
                                ],
                                [
                                    rect.right,
                                    cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer
                                ]
                            ];
                            return [
                                cursorPointOne,
                                cursorPointTwo,
                                ...commonPoints
                            ];
                        }
                    case 'left':
                        {
                            const cursorPointOne = [
                                x + buffer + 1,
                                isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4
                            ];
                            const cursorPointTwo = [
                                x + buffer + 1,
                                isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4
                            ];
                            const commonPoints = [
                                [
                                    cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left,
                                    rect.top
                                ],
                                [
                                    cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer,
                                    rect.bottom
                                ]
                            ];
                            return [
                                ...commonPoints,
                                cursorPointOne,
                                cursorPointTwo
                            ];
                        }
                    case 'right':
                        {
                            const cursorPointOne = [
                                x - buffer,
                                isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4
                            ];
                            const cursorPointTwo = [
                                x - buffer,
                                isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4
                            ];
                            const commonPoints = [
                                [
                                    cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right,
                                    rect.top
                                ],
                                [
                                    cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer,
                                    rect.bottom
                                ]
                            ];
                            return [
                                cursorPointOne,
                                cursorPointTwo,
                                ...commonPoints
                            ];
                        }
                }
            }
            if (isPointInPolygon([
                clientX,
                clientY
            ], rectPoly)) {
                return;
            }
            if (hasLanded && !isOverReferenceRect) {
                return close();
            }
            if (!isLeave && requireIntent) {
                const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
                const cursorSpeedThreshold = 0.1;
                if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
                    return close();
                }
            }
            if (!isPointInPolygon([
                clientX,
                clientY
            ], getPolygon([
                x,
                y
            ]))) {
                close();
            } else if (!hasLanded && requireIntent) {
                timeoutId = window.setTimeout(close, 40);
            }
        };
    };
    fn.__options = {
        blockPointerEvents
    };
    return fn;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/floating.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingProvider",
    ()=>Ae,
    "useFloatingPanel",
    ()=>Re,
    "useFloatingPanelProps",
    ()=>Te,
    "useFloatingReference",
    ()=>Fe,
    "useFloatingReferenceProps",
    ()=>be,
    "useResolvedAnchor",
    ()=>ye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
let y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    styles: void 0,
    setReference: ()=>{},
    setFloating: ()=>{},
    getReferenceProps: ()=>({}),
    getFloatingProps: ()=>({}),
    slot: {}
});
y.displayName = "FloatingContext";
let $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
$.displayName = "PlacementContext";
function ye(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>e ? typeof e == "string" ? {
            to: e
        } : e : null, [
        e
    ]);
}
function Fe() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(y).setReference;
}
function be() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(y).getReferenceProps;
}
function Te() {
    let { getFloatingProps: e, slot: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(y);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((...n)=>Object.assign({}, e(...n), {
            "data-anchor": t.anchor
        }), [
        e,
        t
    ]);
}
function Re(e = null) {
    e === !1 && (e = null), typeof e == "string" && (e = {
        to: e
    });
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])($), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>e, [
        JSON.stringify(e, (l, o)=>{
            var u;
            return (u = o == null ? void 0 : o.outerHTML) != null ? u : o;
        })
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        t == null || t(n != null ? n : null);
    }, [
        t,
        n
    ]);
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(y);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            r.setFloating,
            e ? r.styles : {}
        ], [
        r.setFloating,
        e,
        r.styles
    ]);
}
let D = 4;
function Ae({ children: e, enabled: t = !0 }) {
    let [n, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), [l, o] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), [f, s] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    ce(f);
    let i = t && n !== null && f !== null, { to: F = "bottom", gap: E = 0, offset: A = 0, padding: c = 0, inner: h } = ge(n, f), [a, p = "center"] = F.split(" ");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        i && o(0);
    }, [
        i
    ]);
    let { refs: b, floatingStyles: S, context: g } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"])({
        open: i,
        placement: a === "selection" ? p === "center" ? "bottom" : `bottom-${p}` : p === "center" ? `${a}` : `${a}-${p}`,
        strategy: "absolute",
        transform: !1,
        middleware: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])({
                mainAxis: a === "selection" ? 0 : E,
                crossAxis: A
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])({
                padding: c
            }),
            a !== "selection" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])({
                padding: c
            }),
            a === "selection" && h ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["inner"])({
                ...h,
                padding: c,
                overflowRef: u,
                offset: l,
                minItemsVisible: D,
                referenceOverflowThreshold: c,
                onFallbackChange (P) {
                    var L, N;
                    if (!P) return;
                    let d = g.elements.floating;
                    if (!d) return;
                    let M = parseFloat(getComputedStyle(d).scrollPaddingBottom) || 0, I = Math.min(D, d.childElementCount), W = 0, B = 0;
                    for (let m of (N = (L = g.elements.floating) == null ? void 0 : L.childNodes) != null ? N : [])if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"](m)) {
                        let x = m.offsetTop, k = x + m.clientHeight + M, H = d.scrollTop, U = H + d.clientHeight;
                        if (x >= H && k <= U) I--;
                        else {
                            B = Math.max(0, Math.min(k, U) - Math.max(x, H)), W = m.clientHeight;
                            break;
                        }
                    }
                    I >= 1 && o((m)=>{
                        let x = W * I - B + M;
                        return m >= x ? m : x;
                    });
                }
            }) : null,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"])({
                padding: c,
                apply ({ availableWidth: P, availableHeight: d, elements: M }) {
                    Object.assign(M.floating.style, {
                        overflow: "auto",
                        maxWidth: `${P}px`,
                        maxHeight: `min(var(--anchor-max-height, 100vh), ${d}px)`
                    });
                }
            })
        ].filter(Boolean),
        whileElementsMounted: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"]
    }), [w = a, V = p] = g.placement.split("-");
    a === "selection" && (w = "selection");
    let G = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            anchor: [
                w,
                V
            ].filter(Boolean).join(" ")
        }), [
        w,
        V
    ]), K = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useInnerOffset"])(g, {
        overflowRef: u,
        onChange: o
    }), { getReferenceProps: Q, getFloatingProps: X } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useInteractions"])([
        K
    ]), Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((P)=>{
        s(P), b.setFloating(P);
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]($.Provider, {
        value: r
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](y.Provider, {
        value: {
            setFloating: Y,
            setReference: b.setReference,
            styles: S,
            getReferenceProps: Q,
            getFloatingProps: X,
            slot: G
        }
    }, e));
}
function ce(e) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!e) return;
        let t = new MutationObserver(()=>{
            let n = window.getComputedStyle(e).maxHeight, r = parseFloat(n);
            if (isNaN(r)) return;
            let l = parseInt(n);
            isNaN(l) || r !== l && (e.style.maxHeight = `${Math.ceil(r)}px`);
        });
        return t.observe(e, {
            attributes: !0,
            attributeFilter: [
                "style"
            ]
        }), ()=>{
            t.disconnect();
        };
    }, [
        e
    ]);
}
function ge(e, t) {
    var o, u, f;
    let n = O((o = e == null ? void 0 : e.gap) != null ? o : "var(--anchor-gap, 0)", t), r = O((u = e == null ? void 0 : e.offset) != null ? u : "var(--anchor-offset, 0)", t), l = O((f = e == null ? void 0 : e.padding) != null ? f : "var(--anchor-padding, 0)", t);
    return {
        ...e,
        gap: n,
        offset: r,
        padding: l
    };
}
function O(e, t, n = void 0) {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisposables"])(), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((s, i)=>{
        if (s == null) return [
            n,
            null
        ];
        if (typeof s == "number") return [
            s,
            null
        ];
        if (typeof s == "string") {
            if (!i) return [
                n,
                null
            ];
            let F = J(s, i);
            return [
                F,
                (E)=>{
                    let A = q(s);
                    {
                        let c = A.map((h)=>window.getComputedStyle(i).getPropertyValue(h));
                        r.requestAnimationFrame(function h() {
                            r.nextFrame(h);
                            let a = !1;
                            for (let [b, S] of A.entries()){
                                let g = window.getComputedStyle(i).getPropertyValue(S);
                                if (c[b] !== g) {
                                    c[b] = g, a = !0;
                                    break;
                                }
                            }
                            if (!a) return;
                            let p = J(s, i);
                            F !== p && (E(p), F = p);
                        });
                    }
                    return r.dispose;
                }
            ];
        }
        return [
            n,
            null
        ];
    }), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>l(e, t)[0], [
        e,
        t
    ]), [u = o, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        let [s, i] = l(e, t);
        if (f(s), !!i) return i(f);
    }, [
        e,
        t
    ]), u;
}
function q(e) {
    let t = /var\((.*)\)/.exec(e);
    if (t) {
        let n = t[1].indexOf(",");
        if (n === -1) return [
            t[1]
        ];
        let r = t[1].slice(0, n).trim(), l = t[1].slice(n + 1).trim();
        return l ? [
            r,
            ...q(l)
        ] : [
            r
        ];
    }
    return [];
}
function J(e, t) {
    let n = document.createElement("div");
    t.appendChild(n), n.style.setProperty("margin-top", "0px", "important"), n.style.setProperty("margin-top", e, "important");
    let r = parseFloat(window.getComputedStyle(n).marginTop) || 0;
    return t.removeChild(n), r;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/calculate-active-index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Focus",
    ()=>c,
    "calculateActiveIndex",
    ()=>f
]);
function u(l) {
    throw new Error("Unexpected object: " + l);
}
var c = ((i)=>(i[i.First = 0] = "First", i[i.Previous = 1] = "Previous", i[i.Next = 2] = "Next", i[i.Last = 3] = "Last", i[i.Specific = 4] = "Specific", i[i.Nothing = 5] = "Nothing", i))(c || {});
function f(l, n) {
    let t = n.resolveItems();
    if (t.length <= 0) return null;
    let r = n.resolveActiveIndex(), s = r != null ? r : -1;
    switch(l.focus){
        case 0:
            {
                for(let e = 0; e < t.length; ++e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 1:
            {
                s === -1 && (s = t.length);
                for(let e = s - 1; e >= 0; --e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 2:
            {
                for(let e = s + 1; e < t.length; ++e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 3:
            {
                for(let e = t.length - 1; e >= 0; --e)if (!n.resolveDisabled(t[e], e, t)) return e;
                return r;
            }
        case 4:
            {
                for(let e = 0; e < t.length; ++e)if (n.resolveId(t[e], e, t) === l.id) return e;
                return r;
            }
        case 5:
            return null;
        default:
            u(l);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/id.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IdProvider",
    ()=>f,
    "useProvidedId",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(void 0);
function u() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(e);
}
function f({ id: t, children: r }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(e.Provider, {
        value: t
    }, r);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/label/label.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Z,
    "useLabelContext",
    ()=>C,
    "useLabelledBy",
    ()=>N,
    "useLabels",
    ()=>V
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-slot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$disabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/disabled.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/id.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-client] (ecmascript)");
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
let L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
L.displayName = "LabelContext";
function C() {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(L);
    if (n === null) {
        let l = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
        throw Error.captureStackTrace && Error.captureStackTrace(l, C), l;
    }
    return n;
}
function N(n) {
    var a, e, o;
    let l = (e = (a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(L)) == null ? void 0 : a.value) != null ? e : void 0;
    return ((o = n == null ? void 0 : n.length) != null ? o : 0) > 0 ? [
        l,
        ...n
    ].filter(Boolean).join(" ") : l;
}
function V({ inherit: n = !1 } = {}) {
    let l = N(), [a, e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), o = n ? [
        l,
        ...a
    ].filter(Boolean) : a;
    return [
        o.length > 0 ? o.join(" ") : void 0,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>function(t) {
                let p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((i)=>(e((u)=>[
                            ...u,
                            i
                        ]), ()=>e((u)=>{
                            let d = u.slice(), f = d.indexOf(i);
                            return f !== -1 && d.splice(f, 1), d;
                        }))), b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
                        register: p,
                        slot: t.slot,
                        name: t.name,
                        props: t.props,
                        value: t.value
                    }), [
                    p,
                    t.slot,
                    t.name,
                    t.props,
                    t.value
                ]);
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(L.Provider, {
                    value: b
                }, t.children);
            }, [
            e
        ])
    ];
}
let G = "label";
function U(n, l) {
    var y;
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(), e = C(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProvidedId"])(), T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$disabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisabled"])(), { id: t = `headlessui-label-${a}`, htmlFor: p = o != null ? o : (y = e.props) == null ? void 0 : y.htmlFor, passive: b = !1, ...i } = n, u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncRefs"])(l);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>e.register(t), [
        t,
        e.register
    ]);
    let d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((s)=>{
        let g = s.currentTarget;
        if (!(s.target !== s.currentTarget && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInteractiveElement"](s.target)) && (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLLabelElement"](g) && s.preventDefault(), e.props && "onClick" in e.props && typeof e.props.onClick == "function" && e.props.onClick(s), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLLabelElement"](g))) {
            let r = document.getElementById(g.htmlFor);
            if (r) {
                let E = r.getAttribute("disabled");
                if (E === "true" || E === "") return;
                let x = r.getAttribute("aria-disabled");
                if (x === "true" || x === "") return;
                (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLInputElement"](r) && (r.type === "file" || r.type === "radio" || r.type === "checkbox") || r.role === "radio" || r.role === "checkbox" || r.role === "switch") && r.click(), r.focus({
                    preventScroll: !0
                });
            }
        }
    }), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlot"])({
        ...e.slot,
        disabled: T || !1
    }), c = {
        ref: u,
        ...e.props,
        id: t,
        htmlFor: p,
        onClick: d
    };
    return b && ("onClick" in c && (delete c.htmlFor, delete c.onClick), "onClick" in i && delete i.onClick), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: c,
        theirProps: i,
        slot: f,
        defaultTag: p ? G : "div",
        name: e.name || "Label"
    });
}
let j = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(U), Z = Object.assign(j, {});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/element-movement.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElementPositionState",
    ()=>c,
    "computeVisualPosition",
    ()=>a,
    "detectMovement",
    ()=>p
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-client] (ecmascript)");
;
const c = {
    Idle: {
        kind: "Idle"
    },
    Tracked: (e)=>({
            kind: "Tracked",
            position: e
        }),
    Moved: {
        kind: "Moved"
    }
};
function a(e) {
    let t = e.getBoundingClientRect();
    return `${t.x},${t.y}`;
}
function p(e, t, i) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposables"])();
    if (t.kind === "Tracked") {
        let o = function() {
            d !== a(e) && (n.dispose(), i());
        };
        var f = o;
        let { position: d } = t, s = new ResizeObserver(o);
        s.observe(e), n.add(()=>s.disconnect()), n.addEventListener(window, "scroll", o, {
            passive: !0
        }), n.addEventListener(window, "resize", o);
    }
    return ()=>n.dispose();
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu-machine.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionTypes",
    ()=>C,
    "ActivationTrigger",
    ()=>D,
    "MenuMachine",
    ()=>h,
    "MenuState",
    ()=>P
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machines/stack-machine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/calculate-active-index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/element-movement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/focus-management.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-client] (ecmascript)");
var y = Object.defineProperty;
var M = (e, i, t)=>i in e ? y(e, i, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[i] = t;
var S = (e, i, t)=>(M(e, typeof i != "symbol" ? i + "" : i, t), t);
;
;
;
;
;
;
var P = ((t)=>(t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(P || {}), D = ((t)=>(t[t.Pointer = 0] = "Pointer", t[t.Other = 1] = "Other", t))(D || {}), C = ((o)=>(o[o.OpenMenu = 0] = "OpenMenu", o[o.CloseMenu = 1] = "CloseMenu", o[o.GoToItem = 2] = "GoToItem", o[o.Search = 3] = "Search", o[o.ClearSearch = 4] = "ClearSearch", o[o.RegisterItems = 5] = "RegisterItems", o[o.UnregisterItems = 6] = "UnregisterItems", o[o.SetButtonElement = 7] = "SetButtonElement", o[o.SetItemsElement = 8] = "SetItemsElement", o[o.SortItems = 9] = "SortItems", o[o.MarkButtonAsMoved = 10] = "MarkButtonAsMoved", o))(C || {});
function x(e, i = (t)=>t) {
    let t = e.activeItemIndex !== null ? e.items[e.activeItemIndex] : null, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByDomNode"])(i(e.items.slice()), (s)=>s.dataRef.current.domRef.current), r = t ? n.indexOf(t) : null;
    return r === -1 && (r = null), {
        items: n,
        activeItemIndex: r
    };
}
let k = {
    [1] (e) {
        if (e.menuState === 1) return e;
        let i = e.buttonElement ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElementPositionState"].Tracked((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeVisualPosition"])(e.buttonElement)) : e.buttonPositionState;
        return {
            ...e,
            activeItemIndex: null,
            pendingFocus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing
            },
            menuState: 1,
            buttonPositionState: i
        };
    },
    [0] (e, i) {
        return e.menuState === 0 ? e : {
            ...e,
            __demoMode: !1,
            pendingFocus: i.focus,
            menuState: 0,
            buttonPositionState: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElementPositionState"].Idle
        };
    },
    [2]: (e, i)=>{
        var s, l, a, I, f;
        if (e.menuState === 1) return e;
        let t = {
            ...e,
            searchQuery: "",
            activationTrigger: (s = i.trigger) != null ? s : 1,
            __demoMode: !1
        };
        if (i.focus === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing) return {
            ...t,
            activeItemIndex: null
        };
        if (i.focus === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Specific) return {
            ...t,
            activeItemIndex: e.items.findIndex((d)=>d.id === i.id)
        };
        if (i.focus === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Previous) {
            let d = e.activeItemIndex;
            if (d !== null) {
                let o = e.items[d].dataRef.current.domRef, c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(i, {
                    resolveItems: ()=>e.items,
                    resolveActiveIndex: ()=>e.activeItemIndex,
                    resolveId: (u)=>u.id,
                    resolveDisabled: (u)=>u.dataRef.current.disabled
                });
                if (c !== null) {
                    let u = e.items[c].dataRef.current.domRef;
                    if (((l = o.current) == null ? void 0 : l.previousElementSibling) === u.current || ((a = u.current) == null ? void 0 : a.previousElementSibling) === null) return {
                        ...t,
                        activeItemIndex: c
                    };
                }
            }
        } else if (i.focus === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Next) {
            let d = e.activeItemIndex;
            if (d !== null) {
                let o = e.items[d].dataRef.current.domRef, c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(i, {
                    resolveItems: ()=>e.items,
                    resolveActiveIndex: ()=>e.activeItemIndex,
                    resolveId: (u)=>u.id,
                    resolveDisabled: (u)=>u.dataRef.current.disabled
                });
                if (c !== null) {
                    let u = e.items[c].dataRef.current.domRef;
                    if (((I = o.current) == null ? void 0 : I.nextElementSibling) === u.current || ((f = u.current) == null ? void 0 : f.nextElementSibling) === null) return {
                        ...t,
                        activeItemIndex: c
                    };
                }
            }
        }
        let n = x(e), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(i, {
            resolveItems: ()=>n.items,
            resolveActiveIndex: ()=>n.activeItemIndex,
            resolveId: (d)=>d.id,
            resolveDisabled: (d)=>d.dataRef.current.disabled
        });
        return {
            ...t,
            ...n,
            activeItemIndex: r
        };
    },
    [3]: (e, i)=>{
        let n = e.searchQuery !== "" ? 0 : 1, r = e.searchQuery + i.value.toLowerCase(), l = (e.activeItemIndex !== null ? e.items.slice(e.activeItemIndex + n).concat(e.items.slice(0, e.activeItemIndex + n)) : e.items).find((I)=>{
            var f;
            return ((f = I.dataRef.current.textValue) == null ? void 0 : f.startsWith(r)) && !I.dataRef.current.disabled;
        }), a = l ? e.items.indexOf(l) : -1;
        return a === -1 || a === e.activeItemIndex ? {
            ...e,
            searchQuery: r
        } : {
            ...e,
            searchQuery: r,
            activeItemIndex: a,
            activationTrigger: 1
        };
    },
    [4] (e) {
        return e.searchQuery === "" ? e : {
            ...e,
            searchQuery: "",
            searchActiveItemIndex: null
        };
    },
    [5]: (e, i)=>{
        let t = e.items.concat(i.items.map((r)=>r)), n = e.activeItemIndex;
        return e.pendingFocus.focus !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing && (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateActiveIndex"])(e.pendingFocus, {
            resolveItems: ()=>t,
            resolveActiveIndex: ()=>e.activeItemIndex,
            resolveId: (r)=>r.id,
            resolveDisabled: (r)=>r.dataRef.current.disabled
        })), {
            ...e,
            items: t,
            activeItemIndex: n,
            pendingFocus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing
            },
            pendingShouldSort: !0
        };
    },
    [6]: (e, i)=>{
        let t = e.items, n = [], r = new Set(i.items);
        for (let [s, l] of t.entries())if (r.has(l.id) && (n.push(s), r.delete(l.id), r.size === 0)) break;
        if (n.length > 0) {
            t = t.slice();
            for (let s of n.reverse())t.splice(s, 1);
        }
        return {
            ...e,
            items: t,
            activationTrigger: 1
        };
    },
    [7]: (e, i)=>e.buttonElement === i.element ? e : {
            ...e,
            buttonElement: i.element
        },
    [8]: (e, i)=>e.itemsElement === i.element ? e : {
            ...e,
            itemsElement: i.element
        },
    [9]: (e)=>e.pendingShouldSort ? {
            ...e,
            ...x(e),
            pendingShouldSort: !1
        } : e,
    [10] (e) {
        return e.buttonPositionState.kind !== "Tracked" ? e : {
            ...e,
            buttonPositionState: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElementPositionState"].Moved
        };
    }
};
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Machine"] {
    constructor(t){
        super(t);
        S(this, "actions", {
            registerItem: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                let t = [], n = new Set;
                return [
                    (r, s)=>{
                        n.has(s) || (n.add(s), t.push({
                            id: r,
                            dataRef: s
                        }));
                    },
                    ()=>(n.clear(), this.send({
                            type: 5,
                            items: t.splice(0)
                        }))
                ];
            }),
            unregisterItem: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                let t = [];
                return [
                    (n)=>t.push(n),
                    ()=>this.send({
                            type: 6,
                            items: t.splice(0)
                        })
                ];
            })
        });
        S(this, "selectors", {
            activeDescendantId (t) {
                var s;
                let n = t.activeItemIndex, r = t.items;
                return n === null || (s = r[n]) == null ? void 0 : s.id;
            },
            isActive (t, n) {
                var l;
                let r = t.activeItemIndex, s = t.items;
                return r !== null ? ((l = s[r]) == null ? void 0 : l.id) === n : !1;
            },
            shouldScrollIntoView (t, n) {
                return t.__demoMode || t.menuState !== 0 || t.activationTrigger === 0 ? !1 : this.isActive(t, n);
            },
            didButtonMove (t) {
                return t.buttonPositionState.kind === "Moved";
            }
        });
        this.on(5, ()=>{
            this.disposables.requestAnimationFrame(()=>{
                this.send({
                    type: 9
                });
            });
        });
        {
            let n = this.state.id, r = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stackMachines"].get(null);
            this.disposables.add(r.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].Push, (s)=>{
                !r.selectors.isTop(s, n) && this.state.menuState === 0 && this.send({
                    type: 1
                });
            })), this.on(0, ()=>r.actions.push(n)), this.on(1, ()=>r.actions.pop(n));
        }
        this.disposables.group((n)=>{
            this.on(1, (r)=>{
                r.buttonElement && (n.dispose(), n.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMovement"])(r.buttonElement, r.buttonPositionState, ()=>{
                    this.send({
                        type: 10
                    });
                })));
            });
        });
    }
    static new({ id: t, __demoMode: n = !1 }) {
        return new h({
            id: t,
            __demoMode: n,
            menuState: n ? 0 : 1,
            buttonElement: null,
            itemsElement: null,
            items: [],
            searchQuery: "",
            activeItemIndex: null,
            activationTrigger: 1,
            pendingShouldSort: !1,
            pendingFocus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing
            },
            buttonPositionState: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$element$2d$movement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElementPositionState"].Idle
        });
    }
    reduce(t, n) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["match"])(n.type, k, t, n);
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu-machine-glue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuContext",
    ()=>a,
    "useMenuMachine",
    ()=>s,
    "useMenuMachineContext",
    ()=>p
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$unmount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-unmount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu-machine.js [app-client] (ecmascript)");
;
;
;
const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function p(t) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(a);
    if (n === null) {
        let e = new Error(`<${t} /> is missing a parent <Menu /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(e, s), e;
    }
    return n;
}
function s({ id: t, __demoMode: n = !1 }) {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuMachine"].new({
            id: t,
            __demoMode: n
        }), []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$unmount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOnUnmount"])(()=>e.dispose()), e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Menu",
    ()=>lo,
    "MenuButton",
    ()=>ft,
    "MenuHeading",
    ()=>Et,
    "MenuItem",
    ()=>gt,
    "MenuItems",
    ()=>yt,
    "MenuSection",
    ()=>Pt,
    "MenuSeparator",
    ()=>Mt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/focus/dist/useFocusRing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@react-aria/interactions/dist/useHover.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$active$2d$press$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-active-press.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$element$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-element-size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$handle$2d$toggle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-handle-toggle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$inert$2d$others$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-inert-others.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$disappear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-disappear.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$outside$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-outside-click.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-owner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$quick$2d$release$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-quick-release.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$resolve$2d$button$2d$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$scroll$2d$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-slot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$text$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-text-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tracked$2d$pointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-transition.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tree$2d$walker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-tree-walker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/floating.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/open-closed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machines/stack-machine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/react-glue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/calculate-active-index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/focus-management.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/description/description.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/keyboard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/label/label.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/portal/portal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu-machine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu-machine-glue.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
let Ze = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"];
function et(m, y) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(), { __demoMode: a = !1, ...p } = m, s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuMachine"])({
        id: l,
        __demoMode: a
    }), [n, M, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(s, (d)=>[
            d.menuState,
            d.itemsElement,
            d.buttonElement
        ]), _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncRefs"])(y), o = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stackMachines"].get(null), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(o, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((d)=>o.selectors.isTop(d, l), [
        o,
        l
    ]));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$outside$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOutsideClick"])(F, [
        f,
        M
    ], (d, T)=>{
        var P;
        s.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFocusableElement"])(T, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusableMode"].Loose) || (d.preventDefault(), (P = s.state.buttonElement) == null || P.focus());
    });
    let I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        s.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        });
    }), b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlot"])({
        open: n === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open,
        close: I
    }), i = {
        ref: _
    }, g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingProvider"], null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuContext"].Provider, {
        value: s
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OpenClosedProvider"], {
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["match"])(n, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open]: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["State"].Open,
            [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Closed]: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["State"].Closed
        })
    }, g({
        ourProps: i,
        theirProps: p,
        slot: b,
        defaultTag: Ze,
        name: "Menu"
    }))));
}
let tt = "button";
function ot(m, y) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuMachineContext"])("Menu.Button"), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(), { id: p = `headlessui-menu-button-${a}`, disabled: s = !1, autoFocus: n = !1, ...M } = m, f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingReferenceProps"])(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncRefs"])(y, f, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingReference"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>l.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].SetButtonElement,
            element: t
        }))), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>{
        switch(t.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Space:
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Enter:
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].ArrowDown:
                t.preventDefault(), t.stopPropagation(), l.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].OpenMenu,
                    focus: {
                        focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].First
                    }
                });
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].ArrowUp:
                t.preventDefault(), t.stopPropagation(), l.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].OpenMenu,
                    focus: {
                        focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Last
                    }
                });
                break;
        }
    }), I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>{
        switch(t.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Space:
                t.preventDefault();
                break;
        }
    }), [b, i, g] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(l, (t)=>[
            t.menuState,
            t.buttonElement,
            t.itemsElement
        ]), d = b === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$quick$2d$release$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuickRelease"])(d, {
        trigger: i,
        action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((t)=>{
            if (i != null && i.contains(t.target)) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$quick$2d$release$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].Ignore;
            let S = t.target.closest('[role="menuitem"]:not([data-disabled])');
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"](S) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$quick$2d$release$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].Select(S) : g != null && g.contains(t.target) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$quick$2d$release$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].Ignore : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$quick$2d$release$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].Close;
        }, [
            i,
            g
        ]),
        close: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>l.send({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
            }), []),
        select: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((t)=>t.click(), [])
    });
    let T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$handle$2d$toggle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHandleToggle"])((t)=>{
        var S;
        s || (b === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open ? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>l.send({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
            })), (S = f.current) == null || S.focus({
            preventScroll: !0
        })) : (t.preventDefault(), l.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].OpenMenu,
            focus: {
                focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing
            },
            trigger: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivationTrigger"].Pointer
        })));
    }), { isFocusVisible: P, focusProps: L } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusRing"])({
        autoFocus: n
    }), { isHovered: O, hoverProps: v } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHover"])({
        isDisabled: s
    }), { pressed: D, pressProps: U } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$active$2d$press$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActivePress"])({
        disabled: s
    }), H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlot"])({
        open: b === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open,
        active: D || b === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open,
        disabled: s,
        hover: O,
        focus: P,
        autofocus: n
    }), G = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(_(), {
        ref: o,
        id: p,
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$resolve$2d$button$2d$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolveButtonType"])(m, f.current),
        "aria-haspopup": "menu",
        "aria-controls": g == null ? void 0 : g.id,
        "aria-expanded": b === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open,
        disabled: s || void 0,
        autoFocus: n,
        onKeyDown: F,
        onKeyUp: I
    }, T, L, v, U);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: G,
        theirProps: M,
        slot: H,
        defaultTag: tt,
        name: "Menu.Button"
    });
}
let nt = "div", rt = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderFeatures"].RenderStrategy | __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenderFeatures"].Static;
function at(m, y) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-menu-items-${l}`, anchor: p, portal: s = !1, modal: n = !0, transition: M = !1, ...f } = m, _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedAnchor"])(p), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuMachineContext"])("Menu.Items"), [F, I] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingPanel"])(_), b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$floating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFloatingPanelProps"])(), [i, g] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncRefs"])(y, _ ? F : null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((e)=>o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].SetItemsElement,
            element: e
        })), g), [T, P] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(o, (e)=>[
            e.menuState,
            e.buttonElement
        ]), L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDocument"])(P), O = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDocument"])(i);
    _ && (s = !0);
    let v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenClosed"])(), [D, U] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])(M, i, v !== null ? (v & __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["State"].Open) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["State"].Open : T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$disappear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOnDisappear"])(D, P, ()=>{
        o.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        });
    });
    let H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(o, (e)=>e.__demoMode), G = H ? !1 : n && T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$scroll$2d$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollLock"])(G, O);
    let w = H ? !1 : n && T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$inert$2d$others$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInertOthers"])(w, {
        allowed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>[
                P,
                i
            ], [
            P,
            i
        ])
    });
    let S = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(o, o.selectors.didButtonMove) ? !1 : D;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let e = i;
        e && T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isActiveElement"])(e) || e.focus({
            preventScroll: !0
        }));
    }, [
        T,
        i
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tree$2d$walker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTreeWalker"])(T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open, {
        container: i,
        accept (e) {
            return e.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : e.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
        },
        walk (e) {
            e.setAttribute("role", "none");
        }
    });
    let z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisposables"])(), le = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        var N, Y, Z;
        switch(z.dispose(), e.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Space:
                if (o.state.searchQuery !== "") return e.preventDefault(), e.stopPropagation(), o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].Search,
                    value: e.key
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Enter:
                if (e.preventDefault(), e.stopPropagation(), o.state.activeItemIndex !== null) {
                    let { dataRef: de } = o.state.items[o.state.activeItemIndex];
                    (Y = (N = de.current) == null ? void 0 : N.domRef.current) == null || Y.click();
                }
                o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restoreFocusIfNecessary"])(o.state.buttonElement);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].ArrowDown:
                return e.preventDefault(), e.stopPropagation(), o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Next
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].ArrowUp:
                return e.preventDefault(), e.stopPropagation(), o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Previous
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Home:
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].PageUp:
                return e.preventDefault(), e.stopPropagation(), o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].First
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].End:
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].PageDown:
                return e.preventDefault(), e.stopPropagation(), o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
                    focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Last
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Escape:
                e.preventDefault(), e.stopPropagation(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>o.send({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                    })), (Z = o.state.buttonElement) == null || Z.focus({
                    preventScroll: !0
                });
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Tab:
                e.preventDefault(), e.stopPropagation(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>o.send({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
                    })), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusFrom"])(o.state.buttonElement, e.shiftKey ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Previous : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Next);
                break;
            default:
                e.key.length === 1 && (o.send({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].Search,
                    value: e.key
                }), z.setTimeout(()=>o.send({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].ClearSearch
                    }), 350));
                break;
        }
    }), pe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        switch(e.key){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keys"].Space:
                e.preventDefault();
                break;
        }
    }), ie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlot"])({
        open: T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open
    }), ue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(_ ? b() : {}, {
        "aria-activedescendant": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(o, o.selectors.activeDescendantId),
        "aria-labelledby": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(o, (e)=>{
            var N;
            return (N = e.buttonElement) == null ? void 0 : N.id;
        }),
        id: a,
        onKeyDown: le,
        onKeyUp: pe,
        role: "menu",
        tabIndex: T === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuState"].Open ? 0 : void 0,
        ref: d,
        style: {
            ...f.style,
            ...I,
            "--button-width": (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$element$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElementSize"])(D, P, !0).width
        },
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionDataAttributes"])(U)
    }), me = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        enabled: s ? m.static || D : !1,
        ownerDocument: L
    }, me({
        ourProps: ue,
        theirProps: f,
        slot: ie,
        defaultTag: nt,
        features: rt,
        visible: S,
        name: "Menu.Items"
    }));
}
let st = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"];
function lt(m, y) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-menu-item-${l}`, disabled: p = !1, ...s } = m, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuMachineContext"])("Menu.Item"), M = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(n, (t)=>n.selectors.isActive(t, a)), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null), _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncRefs"])(y, f), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlice"])(n, (t)=>n.selectors.shouldScrollIntoView(t, a));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (o) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disposables"])().requestAnimationFrame(()=>{
            var t, S;
            (S = (t = f.current) == null ? void 0 : t.scrollIntoView) == null || S.call(t, {
                block: "nearest"
            });
        });
    }, [
        o,
        f
    ]);
    let F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$text$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTextValue"])(f), I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        disabled: p,
        domRef: f,
        get textValue () {
            return F();
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        I.current.disabled = p;
    }, [
        I,
        p
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>(n.actions.registerItem(a, I), ()=>n.actions.unregisterItem(a)), [
        I,
        a
    ]);
    let b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        });
    }), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>{
        if (p) return t.preventDefault();
        n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].CloseMenu
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restoreFocusIfNecessary"])(n.state.buttonElement);
    }), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        if (p) return n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing
        });
        n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Specific,
            id: a
        });
    }), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tracked$2d$pointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackedPointer"])(), T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>d.update(t)), P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>{
        d.wasMoved(t) && (p || M || n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Specific,
            id: a,
            trigger: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivationTrigger"].Pointer
        }));
    }), L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])((t)=>{
        d.wasMoved(t) && (p || M && n.state.activationTrigger === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivationTrigger"].Pointer && n.send({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2d$machine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionTypes"].GoToItem,
            focus: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$calculate$2d$active$2d$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Focus"].Nothing
        }));
    }), [O, v] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabels"])(), [D, U] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDescriptions"])(), H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSlot"])({
        active: M,
        focus: M,
        disabled: p,
        close: b
    }), G = {
        id: a,
        ref: _,
        role: "menuitem",
        tabIndex: p === !0 ? void 0 : -1,
        "aria-disabled": p === !0 ? !0 : void 0,
        "aria-labelledby": O,
        "aria-describedby": D,
        disabled: void 0,
        onClick: i,
        onFocus: g,
        onPointerEnter: T,
        onMouseEnter: T,
        onPointerMove: P,
        onMouseMove: P,
        onPointerLeave: L,
        onMouseLeave: L
    }, w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(v, null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(U, null, w({
        ourProps: G,
        theirProps: s,
        slot: H,
        defaultTag: st,
        name: "Menu.Item"
    })));
}
let pt = "div";
function it(m, y) {
    let [l, a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabels"])(), p = m, s = {
        ref: y,
        "aria-labelledby": l,
        role: "group"
    }, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(a, null, n({
        ourProps: s,
        theirProps: p,
        slot: {},
        defaultTag: pt,
        name: "Menu.Section"
    }));
}
let ut = "header";
function mt(m, y) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-menu-heading-${l}`, ...p } = m, s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$label$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>s.register(a), [
        a,
        s.register
    ]);
    let n = {
        id: a,
        ref: y,
        role: "presentation",
        ...s.props
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: n,
        theirProps: p,
        slot: {},
        defaultTag: ut,
        name: "Menu.Heading"
    });
}
let dt = "div";
function Tt(m, y) {
    let l = m, a = {
        ref: y,
        role: "separator"
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: a,
        theirProps: l,
        slot: {},
        defaultTag: dt,
        name: "Menu.Separator"
    });
}
let ct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(et), ft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(ot), yt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(at), gt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(lt), Pt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(it), Et = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(mt), Mt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Tt), lo = Object.assign(ct, {
    Button: ft,
    Items: yt,
    Item: gt,
    Section: Pt,
    Heading: Et,
    Separator: Mt
});
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function ChevronDownIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](ChevronDownIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/formatErc20TokenAmount-BuPk9xcy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "f",
    ()=>t
]);
let m = 2n ** 256n - 1n;
const t = ({ amount: t, decimals: a })=>t === m ? "Maximum" : Intl.NumberFormat(void 0, {
        maximumFractionDigits: a
    }).format(Number(t) / 10 ** a);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ethers-Bl5aM5Gz.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>o,
    "b",
    ()=>m,
    "c",
    ()=>n,
    "g",
    ()=>c,
    "p",
    ()=>i,
    "s",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatEther.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-client] (ecmascript)");
;
;
;
let a = new Intl.NumberFormat(void 0, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
}), s = (e)=>a.format(e);
const n = (e, r)=>{
    let t = s(r * parseFloat(e));
    return "$0.00" !== t ? t : "<$0.01";
}, o = (r, t)=>{
    let a = s(t * parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(r)));
    return "$0.00" === a ? "<$0.01" : a;
}, c = (e, r, t = 6, a = !1)=>`${i(e, t, a)} ${r}`, i = (r, t = 6, a = !1)=>{
    let s = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(r)).toFixed(t).replace(/0+$/, "").replace(/\.$/, "");
    return a ? s : `${"0" === s ? "<0.001" : s}`;
}, l = (e)=>e.reduce((e, r)=>e + r, 0n), m = (e, a)=>{
    let { chains: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), n = `https://etherscan.io/address/${a}`, o = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a5"])(e, s)}/address/${a}`;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        new URL(o);
    } catch  {
        return n;
    }
    return o;
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/styles-DY17fuAX.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "F",
    ()=>i,
    "I",
    ()=>o,
    "a",
    ()=>t,
    "b",
    ()=>e,
    "c",
    ()=>p,
    "d",
    ()=>r,
    "e",
    ()=>n,
    "f",
    ()=>s,
    "g",
    ()=>c,
    "h",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const n = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FundingMethodContainer",
    componentId: "sc-eaaa12a-0"
})([
    "display:flex;flex-direction:column;gap:12px;padding-top:24px;padding-bottom:24px;"
]), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "IconContainer",
    componentId: "sc-eaaa12a-1"
})([
    "width:24px;height:24px;display:flex;justify-content:center;align-items:center;svg{border-radius:var(--privy-border-radius-sm);}"
]), i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FundingQuantityWrapper",
    componentId: "sc-eaaa12a-2"
})([
    "display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:8px;"
]), t = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FundingQuantity",
    componentId: "sc-eaaa12a-3"
})([
    "display:flex;align-items:center;gap:4px;width:100%;padding:0 16px;border-width:1px !important;border-radius:12px;cursor:text;&:focus-within{border-color:var(--privy-color-accent);}"
]), e = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].input.withConfig({
    displayName: "FundingAmountInput",
    componentId: "sc-eaaa12a-5"
})([
    "background-color:var(--privy-color-background);width:100%;&:focus{outline:none !important;border:none !important;box-shadow:none !important;}&&{font-size:26px;}"
]), d = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(e).withConfig({
    displayName: "FundingAmountInputLarge",
    componentId: "sc-eaaa12a-6"
})([
    "&&{font-size:42px;}"
]), p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FundingCurrency",
    componentId: "sc-eaaa12a-8"
})([
    "font-size:18px;"
]), r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FundingDollars",
    componentId: "sc-eaaa12a-9"
})([
    "font-size:12px;color:var(--privy-color-foreground-3);height:20px;"
]), s = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "InfoButtonText",
    componentId: "sc-eaaa12a-13"
})([
    ""
]), c = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "InfoButtonLink",
    componentId: "sc-eaaa12a-14"
})([
    "&&{color:var(--privy-color-accent);}cursor:pointer;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/BridgeNetworkSelectionView-BXBCujiq.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "B",
    ()=>Z,
    "g",
    ()=>Q
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getIsTokenUsdc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/getIsTokenUsdc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/formatters.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getPublicClient-A9RSftUZ.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getErc20Balance$2d$CaKjNAs9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getErc20Balance-CaKjNAs9.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/FundWalletMethodHeader-CS84Ots9.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Row-CG0lSY5Z.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorMessage-Cx8GKGhL.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Value-B4M62ove.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Subtitle$2d$DkvfP2Ev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Subtitle-DkvfP2Ev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Title$2d$D0pfZff$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Title-D0pfZff-.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/WalletIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getChainName$2d$DjpPdUSc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getChainName-DjpPdUSc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Chip$2d$Bsgj4Yc$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Chip-Bsgj4Yc-.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$NetworkIcon$2d$B48ilzF8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/NetworkIcon-B48ilzF8.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/shared-CtYf3O54.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/menu/menu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$formatErc20TokenAmount$2d$BuPk9xcy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/formatErc20TokenAmount-BuPk9xcy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ethers-Bl5aM5Gz.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$styles$2d$DY17fuAX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/styles-DY17fuAX.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const Q = ({ chains: a, appId: t, address: s, rpcConfig: c, includeUsdc: m })=>Promise.all(a.map(async (a)=>{
        let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
            chain: a,
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(a, c, t))
        }), d = await l.getBalance({
            address: s
        }).catch(()=>0n), p = null, h = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$getIsTokenUsdc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UsdcAddressMap"][a.id];
        if (m && h) {
            let { balance: e } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getErc20Balance$2d$CaKjNAs9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])({
                address: s,
                chain: a,
                rpcConfig: c,
                appId: t,
                erc20Address: h
            });
            p = e;
        }
        return {
            balance: d,
            erc20Balance: p,
            erc20Address: h,
            chain: a
        };
    })), U = ({ balance: e, className: r, chain: o })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"], {
        className: r,
        $state: void 0,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(V, {
            balance: e,
            chain: o
        })
    }), V = ({ balance: e, chain: r })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(z, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(O, {
                        chainId: "object" == typeof r ? r.id : "solana"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V"], {
                        children: "object" == typeof r ? r.name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getChainName$2d$DjpPdUSc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(r)
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Chip$2d$Bsgj4Yc$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"], {
                isLoading: !1,
                isPulsing: !1,
                color: "gray",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(D, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {})
                    }),
                    e
                ]
            })
        ]
    });
let z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Container",
    componentId: "sc-63f80cee-0"
})([
    "display:flex;align-items:center;"
]), D = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "IconContainer",
    componentId: "sc-63f80cee-1"
})([
    "height:0.75rem;width:0.75rem;margin-right:0.2rem;"
]), O = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$NetworkIcon$2d$B48ilzF8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["N"]).withConfig({
    displayName: "StyledNetworkIcon",
    componentId: "sc-63f80cee-2"
})([
    "height:1.25rem;width:1.25rem;display:inline-block;margin-right:0.5rem;border-radius:4px;"
]);
const Y = ({ options: e, onSelect: r, selected: o, className: a })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"], {
        as: q,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuButton"], {
                as: X,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(V, {
                        balance: o.balance,
                        chain: o.chain
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(K, {
                        height: 16
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItems"], {
                as: G,
                className: a,
                children: e.map((e, o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItem"], {
                        as: J,
                        onClick: ()=>r(o),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(V, {
                            balance: e.balance,
                            chain: e.chain
                        })
                    }, o))
            })
        ]
    });
let q = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Wrapper",
    componentId: "sc-31c00f79-0"
})([
    "width:100%;position:relative;"
]), G = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Popover",
    componentId: "sc-31c00f79-1"
})([
    "width:100%;margin-top:0.5rem;position:absolute;background-color:var(--privy-color-background);border-radius:var(--privy-border-radius-md);overflow-x:hidden;overflow-y:auto;box-shadow:0px 1px 2px 0px rgba(16,24,40,0.05);max-height:11.75rem;&&{border:solid 1px var(--privy-color-foreground-4);}z-index:1;"
]), J = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "Button",
    componentId: "sc-31c00f79-2"
})([
    "width:100%;display:flex;justify-content:space-between;&&{padding:1rem;}:not(:last-child){border-bottom:solid 1px var(--privy-color-foreground-4);}:hover{background:var(--privy-color-background-2);}"
]), K = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).withConfig({
    displayName: "StyledChevronIcon",
    componentId: "sc-31c00f79-3"
})([
    "height:1rem;margin-left:0.5rem;"
]), X = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "StyledMenuButton",
    componentId: "sc-31c00f79-4"
})([
    "",
    " span{margin-left:auto;}",
    "{transition:rotate 100ms ease-in;}&[aria-expanded='true']{",
    "{rotate:-180deg;}}"
], __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"], K, K);
const Z = ({ displayName: e, errorMessage: r, configuredFundingChain: o, formattedBalance: n, fundingAmount: i, fundingCurrency: b, fundingAmountInUsd: w, options: j, selectedOption: I, isPreparing: k, isSubmitting: x, addressToFund: B, fundingWalletAddress: T, onSubmit: S, onSelect: A, onAmountChange: $, erc20ContractInfo: E })=>{
    let Q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Title$2d$D0pfZff$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"], {
                children: "Transfer from another network"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Subtitle$2d$DkvfP2Ev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"], {
                children: [
                    "You need more funds on the",
                    " ",
                    "object" == typeof o ? o.name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getChainName$2d$DjpPdUSc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(o),
                    " ",
                    "network. Bridge from another blockchain network."
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$styles$2d$DY17fuAX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["F"], {
                style: {
                    marginTop: "2rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$styles$2d$DY17fuAX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"], {
                        onClick: ()=>Q.current?.focus(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$styles$2d$DY17fuAX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"], {
                                ref: Q,
                                value: i,
                                onChange: (e)=>{
                                    let r = e.target.value;
                                    if (/^[0-9.]*$/.test(r) && r.split(".").length - 1 <= 1) {
                                        let e = /\.$/.test(r) ? "." : "", o = Number(r.replace(/\.$/, "") || "0");
                                        if (Number.isNaN(o)) return void $("0");
                                        $(o.toString() + e);
                                    }
                                }
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$styles$2d$DY17fuAX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"], {
                                children: b
                            })
                        ]
                    }),
                    w && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$styles$2d$DY17fuAX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["d"], {
                        children: w
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {
                style: {
                    marginTop: "1.5rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                        children: "From"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(T)
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Y, {
                selected: {
                    chain: I.chain,
                    balance: I.isErc20Quote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$formatErc20TokenAmount$2d$BuPk9xcy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["f"])({
                        amount: I.erc20Balance ?? 0n,
                        decimals: E?.decimals ?? 6
                    }) + ` ${E?.symbol || ""}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(I.balance, I.chain.nativeCurrency.symbol, 3, !0)
                },
                options: j.map(({ chain: e, balance: r, isErc20Quote: o, erc20Balance: a })=>({
                        chain: e,
                        balance: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$formatErc20TokenAmount$2d$BuPk9xcy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["f"])({
                            amount: a ?? 0n,
                            decimals: E?.decimals ?? 6
                        }) + ` ${E?.symbol || ""}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(r, e.nativeCurrency.symbol, 3, !0)
                    })),
                onSelect: A
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {
                style: {
                    marginTop: "1.5rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                        children: "To"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletAddress"])(B)
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(U, {
                chain: o,
                balance: n
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["E"], {
                style: {
                    marginTop: "1rem"
                },
                children: r
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"], {
                style: {
                    marginTop: "1rem"
                },
                loading: x || k,
                disabled: k || x,
                onClick: S,
                children: [
                    "Confirm with ",
                    e
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"], {})
        ]
    });
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/InjectedWalletIcon-DLcYOGDj.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/WalletIcon.js [app-client] (ecmascript)");
;
;
const i = ({ icon: i, name: o })=>"string" == typeof i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("img", {
        alt: `${o || "wallet"} logo`,
        src: i,
        style: {
            height: 24,
            width: 24,
            borderRadius: 4
        }
    }) : void 0 === i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        style: {
            height: 24,
            width: 24
        }
    }) : i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(i, {
        style: {
            height: 24,
            width: 24
        }
    }) : null;
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp,
    "mergeClasses",
    ()=>mergeClasses,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Icon
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Copy
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
            key: "17jyea"
        }
    ],
    [
        "path",
        {
            d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
            key: "zix9uf"
        }
    ]
];
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("copy", __iconNode);
;
 //# sourceMappingURL=copy.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Address-BUmpXgsy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "A",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
const d = ({ address: c, showCopyIcon: d, url: h, className: g })=>{
    let [u, y] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1);
    function C(e) {
        e.stopPropagation(), navigator.clipboard.writeText(c).then(()=>y(!0)).catch(console.error);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (u) {
            let e = setTimeout(()=>y(!1), 3e3);
            return ()=>clearTimeout(e);
        }
    }, [
        u
    ]), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(m, h ? {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(f, {
                title: c,
                className: g,
                href: `${h}/address/${c}`,
                target: "_blank",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["D"])(c)
            }),
            d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"], {
                onClick: C,
                size: "sm",
                style: {
                    gap: "0.375rem"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], u ? {
                    children: [
                        "Copied",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 16
                        })
                    ]
                } : {
                    children: [
                        "Copy",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            size: 16
                        })
                    ]
                })
            })
        ]
    } : {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(p, {
                title: c,
                className: g,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["D"])(c)
            }),
            d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"], {
                onClick: C,
                size: "sm",
                style: {
                    gap: "0.375rem",
                    fontSize: "14px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], u ? {
                    children: [
                        "Copied",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 14
                        })
                    ]
                } : {
                    children: [
                        "Copy",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            size: 14
                        })
                    ]
                })
            })
        ]
    });
};
let m = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "AddressContainer",
    componentId: "sc-3a987cc8-0"
})([
    "display:inline-flex;align-items:center;gap:0.5rem;"
]), p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "AddressText",
    componentId: "sc-3a987cc8-1"
})([
    "font-size:14px;font-weight:500;color:var(--privy-color-foreground);"
]), f = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "AddressLink",
    componentId: "sc-3a987cc8-2"
})([
    "font-size:14px;color:var(--privy-color-foreground);text-decoration:none;&:hover{text-decoration:underline;}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TransferOrBridgeLoadingScreen-BY7Eot6x.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "T",
    ()=>I
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenHeader$2d$Biz1wq02$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenHeader-Biz1wq02.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/FundWalletMethodHeader-CS84Ots9.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$InjectedWalletIcon$2d$DLcYOGDj$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/InjectedWalletIcon-DLcYOGDj.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CJMgUOnw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-CJMgUOnw.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Row-CG0lSY5Z.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Value-B4M62ove.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Address-BUmpXgsy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$NetworkIcon$2d$B48ilzF8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/NetworkIcon-B48ilzF8.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
const I = ({ walletClientType: o, displayName: I, addressToFund: w, chainId: y, chainName: N, isBridging: x, isErc20Flow: C, totalPriceInNativeCurrency: T, totalPriceInUsd: k, gasPriceInNativeCurrency: v, gasPriceInUsd: B })=>{
    let P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Q"])(o); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CJMgUOnw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["N"], {
                centerIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$InjectedWalletIcon$2d$DLcYOGDj$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"], {
                    icon: P?.image_url?.md,
                    name: o
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenHeader$2d$Biz1wq02$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"], {
                style: {
                    marginTop: "8px",
                    marginBottom: "12px"
                },
                title: `${x ? "Bridging" : "Confirming"} with ${I}`
            }),
            !x && !C && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                                children: "Total"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V"], {
                                children: k || T
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                                children: "To"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["A"], {
                                    address: w,
                                    showCopyIcon: !1
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                                children: "Network"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(u, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$NetworkIcon$2d$B48ilzF8$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["N"], {
                                            chainId: y,
                                            height: 16,
                                            width: 16
                                        }),
                                        " ",
                                        N
                                    ]
                                })
                            })
                        ]
                    }),
                    v && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["L"], {
                                children: "Estimated fee"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V"], {
                                children: B || v
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["d"], {
                height: 24
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"], {})
        ]
    });
};
let u = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "NetworkColumn",
    componentId: "sc-5bdbf842-0"
})([
    "display:flex;flex-direction:row;align-items:center;gap:4px;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/AwaitingEvmToSolBridgingScreen-C7mp2-Hy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AwaitingEvmToSolBridgingScreen",
    ()=>V,
    "default",
    ()=>V
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/custom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/decorators/public.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$add$2d$chain$2d$to$2d$default$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/add-chain-to-default-chains.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenHeader$2d$Biz1wq02$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenHeader-Biz1wq02.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/FundWalletMethodHeader-CS84Ots9.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CJMgUOnw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-CJMgUOnw.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/get-is-unified-wallet-gMDXpX6C.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetTokenPrice$2d$CDPxMEO$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetTokenPrice-CDPxMEO-.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$kObl6ZLS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useWallets-kObl6ZLS.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$analytics$2d$mkkvFRju$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/analytics-mkkvFRju.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/reservoir-kvLjIrEo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-NL2cPmJD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getChainName$2d$DjpPdUSc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getChainName-DjpPdUSc.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transaction$2d$CnfuREWo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/transaction-CnfuREWo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$BridgeNetworkSelectionView$2d$BXBCujiq$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/BridgeNetworkSelectionView-BXBCujiq.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getPublicClient-A9RSftUZ.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransferOrBridgeLoadingScreen$2d$BY7Eot6x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TransferOrBridgeLoadingScreen-BY7Eot6x.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tinycolor2$2f$esm$2f$tinycolor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/tinycolor2/esm/tinycolor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/react-device-detect/dist/lib.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$client$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/client/index.mjs [app-client] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const V = {
    component: ()=>{
        let V = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), { rpcConfig: G, appId: Q, closePrivyModal: z, createAnalyticsEvent: X } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), { navigate: Y, setModalData: J, data: K } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(), Z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), { wallets: ee } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWallets$2d$kObl6ZLS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])(), [te, ae] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), [ie, ne] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), [re, oe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), [se, de] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), [ce, me] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), [le, ue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), [pe, he] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), [ge, fe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!1), [ve, Ie] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(), [je, we] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
        if (!K?.funding || "solana" !== K.funding.chainType) throw Error("Invalid funding data");
        let { address: Te, chain: ye, connectedWallet: be } = K.funding, [Ce, Se] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(K.funding.amount), Ne = ("ethereum" === be?.type ? be : void 0) ?? ee[0], Ae = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Q"])(Ne?.walletClientType || "unknown"), xe = Ae?.name || "wallet", [Ee, ke] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            (async ()=>{
                if (!Ne) return;
                let e = await Ne.getEthereumProvider();
                ke((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletClient"])({
                    account: Ne.address,
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["custom"])(e)
                }).extend(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$decorators$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicActions"]));
            })().catch(console.error);
        }, [
            Ne
        ]);
        let [Fe, Be] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0n), Ue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transaction$2d$CnfuREWo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(Fe);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            let e = V.solanaRpcs[ye];
            e ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["w"])({
                rpc: e.rpc,
                address: Te
            }).then((e)=>Be(BigInt(e))).catch(console.error) : console.warn("Unable to load solana rpc, skipping balance");
        }, []);
        let [Le, Pe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(), { tokenPrice: Me } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetTokenPrice$2d$CDPxMEO$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])("solana"), { fundingAmountInBaseUnit: We, fundingAmountInUsd: qe } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transaction$2d$CnfuREWo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])({
            amount: Ce,
            fee: 0n,
            tokenPrice: Me,
            isUsdc: K.funding.isUSDC
        });
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            (async ()=>{
                if (!Ee || !Ne) return;
                let e = [
                    "solana:testnet",
                    "solana:devnet"
                ].includes(ye);
                e && console.warn("Solana testnets are not supported for bridging");
                let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$add$2d$chain$2d$to$2d$default$2d$chains$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToDefaultChains"])(Z.chains).filter(({ testnet: t })=>!!t === e), a = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$BridgeNetworkSelectionView$2d$BXBCujiq$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])({
                    chains: t,
                    address: Ne.address,
                    appId: Q,
                    rpcConfig: G
                })).filter((e)=>e.balance > 0n);
                if (a.length < 1) return void ae(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"](`Wallet ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["D"])(Ne.address)} does not have enough funds.`, void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"].INSUFFICIENT_BALANCE));
                a.sort((e, t)=>Number(t.balance - e.balance));
                let i = (await Promise.allSettled(a.map(async (e)=>({
                        ...e,
                        quote: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])({
                            isTestnet: !1,
                            input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])({
                                appId: Q,
                                amount: We.toString(),
                                user: Ne.address,
                                recipient: Te,
                                destinationChainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"],
                                destinationCurrency: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"],
                                originChainId: e.chain.id
                            })
                        })
                    })))).filter((e)=>"fulfilled" === e.status).map((e)=>e.value);
                if (i.length < 1) return void ae(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"](`Unable to fetch quotes for bridging. Wallet ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["D"])(Ne.address)} does not have enough funds.`, void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"].INSUFFICIENT_BALANCE));
                let n = i.map(({ quote: e, balance: t, chain: a })=>({
                        bridgeTx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(e),
                        balance: t,
                        chain: a,
                        isErc20Quote: !1
                    })).filter(({ bridgeTx: e })=>!!e);
                if (n.length > 1) return void oe(n);
                let r = n.at(0);
                r ? (ue(!0), Pe({
                    data: r.bridgeTx.data,
                    to: r.bridgeTx.to,
                    value: r.bridgeTx.value,
                    chain: r.chain
                })) : ae(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"](`Unable to select bridge option from quotes. Wallet ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["D"])(Ne.address)} does not have enough funds.`, void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"].INSUFFICIENT_BALANCE));
            })().catch(console.error);
        }, [
            Ee
        ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            (async ()=>{
                let e, t;
                if (!Ee || !Ne || ce || pe || !Le) return;
                me(!0);
                let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
                    chain: Le.chain,
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(Le.chain, G, Q))
                });
                try {
                    e = await a.prepareTransactionRequest({
                        account: Ne.address,
                        to: Le.to,
                        chain: Le.chain,
                        data: Le.data,
                        value: BigInt(Le.value ?? 0)
                    });
                } catch (e) {
                    console.error(e), re.length > 1 && ne(e.shortMessage ?? "Something went wrong");
                }
                if (e) {
                    me(!1), he(!0);
                    try {
                        await Ee.switchChain({
                            id: Le.chain.id
                        });
                    } catch (e) {
                        await Ee.addChain({
                            chain: Le.chain
                        }), await Ee.switchChain({
                            id: Le.chain.id
                        });
                    }
                    try {
                        t = await Ee.sendTransaction(e);
                    } catch (e) {
                        console.error(e), "TransactionExecutionError" === e.name && (re.length < 1 ? ae(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"](e.shortMessage, void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"].TRANSACTION_FAILURE)) : ne(e.shortMessage ?? "Something went wrong"));
                    }
                    if (t) return await Ee.waitForTransactionReceipt({
                        hash: t
                    }), le ? (we("pending"), void Ie(t)) : (he(!1), fe(!0), void X({
                        eventName: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$analytics$2d$mkkvFRju$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["O"],
                        payload: {
                            provider: "external",
                            status: "success",
                            txHash: t,
                            address: Ne.address,
                            chainId: Le.chain.id,
                            chainType: "ethereum",
                            value: Le.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(BigInt(Le.value), 18) : void 0,
                            token: "ETH",
                            destination: Te,
                            destinationClusterName: "mainnet-beta",
                            destinationChainType: "solana",
                            destinationValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(We, 9),
                            destinationToken: "SOL"
                        }
                    }));
                    he(!1);
                } else me(!1);
            })().catch(console.error);
        }, [
            Ee,
            Le
        ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])({
            transactionHash: ve,
            isTestnet: !1,
            bridgingStatus: je,
            setBridgingStatus: we,
            onSuccess ({ transactionHash: e }) {
                ue(!1), fe(!0), X({
                    eventName: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$analytics$2d$mkkvFRju$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["O"],
                    payload: {
                        provider: "external",
                        status: "success",
                        txHash: e,
                        address: Ne?.address,
                        chainId: Le?.chain.id,
                        chainType: "ethereum",
                        value: Le?.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(BigInt(Le.value), 18) : void 0,
                        token: "ETH",
                        destination: Te,
                        destinationClusterName: "mainnet-beta",
                        destinationChainType: "solana",
                        destinationValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(We, 9),
                        destinationToken: "SOL"
                    }
                });
            },
            onFailure ({ error: e }) {
                ue(!1), ae(e);
            }
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            te && (J({
                funding: K?.funding,
                solanaFundingData: K?.solanaFundingData,
                sendTransaction: K?.sendTransaction,
                errorModalData: {
                    error: te,
                    previousScreen: "TransferFromWalletScreen"
                }
            }), Y("ErrorScreen", !1));
        }, [
            te
        ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            if (!ge) return;
            let e = setTimeout(z, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"]);
            return ()=>clearTimeout(e);
        }, [
            ge
        ]), ge /*#__PURE__*/ ) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"], {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"], {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            color: "var(--privy-color-success)",
                            width: "64px",
                            height: "64px"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenHeader$2d$Biz1wq02$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"], {
                            title: "Success!",
                            description: `You’ve successfully added ${Ce} SOL to your ${Z.name} wallet. It may take a minute before the funds are available to use.`
                        })
                    ]
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["R"], {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"], {})
            ]
        });
        let De = re[se];
        return re.length > 1 && De ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$BridgeNetworkSelectionView$2d$BXBCujiq$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"], {
            displayName: xe,
            configuredFundingChain: ye,
            formattedBalance: Ue,
            fundingAmount: Ce,
            fundingCurrency: "SOL",
            fundingAmountInUsd: qe,
            options: re,
            selectedOption: De,
            isPreparing: ce,
            isSubmitting: pe,
            addressToFund: Te,
            fundingWalletAddress: Ne?.address || "",
            errorMessage: ie,
            onSubmit: ()=>{
                K.funding?.amount !== Ce ? (async function() {
                    if (Ne && De) try {
                        let e = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])({
                            isTestnet: !1,
                            input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])({
                                appId: Q,
                                amount: We.toString(),
                                user: Ne.address,
                                recipient: Te,
                                destinationChainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"],
                                destinationCurrency: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"],
                                originChainId: De.chain.id
                            })
                        }), t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(e);
                        if (!t) throw Error("Invalid transaction request");
                        ue(!0), Pe({
                            data: t.data,
                            to: t.to,
                            value: t.value,
                            chain: De.chain
                        });
                    } catch (e) {
                        console.error(e), ae(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"]("Unable to fetch quotes for bridging", e, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"].INSUFFICIENT_BALANCE));
                    }
                })().catch(console.error) : Pe({
                    to: De.bridgeTx.to,
                    data: De.bridgeTx.data,
                    value: De.bridgeTx.value,
                    chain: De.chain
                });
            },
            onSelect: (e)=>{
                e !== se && (ne(null), de(e));
            },
            onAmountChange: Se
        }) : pe && Ne ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransferOrBridgeLoadingScreen$2d$BY7Eot6x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"], {
            walletClientType: Ne?.walletClientType || "unknown",
            displayName: xe,
            addressToFund: Te,
            isBridging: le,
            isErc20Flow: !1,
            chainId: "solana",
            chainName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getChainName$2d$DjpPdUSc$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(ye),
            totalPriceInUsd: void 0,
            totalPriceInNativeCurrency: void 0,
            gasPriceInUsd: void 0,
            gasPriceInNativeCurrency: void 0
        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$FundWalletMethodHeader$2d$CS84Ots9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"], {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CJMgUOnw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["N"], {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        marginTop: "1rem"
                    }
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"], {})
            ]
        });
    }
};
;
}),
]);

//# sourceMappingURL=1b50e_90208ade._.js.map