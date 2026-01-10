module.exports = [
"[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/formatters.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
;
function n(e) {
    return e ? `${e.slice(0, 5)}…${e.slice(-4)}` : "";
}
function t({ wei: r, precision: n = 3 }) {
    return parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(r)).toFixed(n).replace(/0+$/, "").replace(/\.$/, "");
}
function i({ amount: e, decimals: n }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(BigInt(e), n);
}
function o({ lamports: e }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(e, 9);
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("copy", __iconNode);
;
 //# sourceMappingURL=copy.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
;
;
;
const c = ({ variant: o = "primary", size: e = "lg", children: a, success: l, ...d })=>{
    switch(o){
        case "secondary":
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(b, {
                size: e,
                ...d,
                children: a
            });
        case "error":
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(b, {
                $warn: !0,
                size: e,
                ...d,
                children: a
            });
        case "muted":
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(p, {
                size: e,
                ...d,
                children: a
            });
        default:
            /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(n, {
                size: e,
                success: l,
                ...d,
                children: a
            });
    }
}, i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "BaseButton",
    componentId: "sc-e537b447-0"
})([
    "display:flex;flex-direction:row;align-items:center;justify-content:center;user-select:none;&{width:auto;cursor:pointer;border-radius:",
    ";font-size:14px;font-style:normal;font-weight:500;line-height:22px;letter-spacing:-0.016px;}&&{height:",
    ";padding:0 ",
    ";}"
], ({ $size: r })=>"sm" === r ? "6px" : "var(--privy-border-radius-sm)", ({ $size: r })=>"sm" === r ? "28px" : "48px", ({ $size: r })=>"sm" === r ? "10px" : "16px"), n = ({ children: a, loading: l, disabled: c, success: i, size: n = "lg", loadingText: t = "Loading...", as: s, onClick: b, ...p })=>{
    let u = "a" === s, y = !(!l && !c); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(v, {
        as: s,
        disabled: u ? void 0 : y,
        "aria-disabled": u ? y : void 0,
        $success: i,
        $size: n,
        onClick: (r)=>{
            u && y ? r.preventDefault() : b?.(r);
        },
        ...p,
        children: l ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G"], {}),
                t ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        marginLeft: "8px"
                    },
                    children: t
                }) : null
            ]
        }) : a
    });
}, t = ({ children: o, loading: e, disabled: a, ...l })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(s, {
        disabled: a,
        ...l,
        children: e ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G"], {
            color: "var(--privy-color-foreground-accent)"
        }) : o
    });
let s = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledPrimaryButtonWithoutGray",
    componentId: "sc-e537b447-1"
})([
    "position:relative;&&{background-color:var(--privy-color-accent);color:var(--privy-color-foreground-accent);transition:background-color 200ms ease;}&:hover{background-color:var(--privy-color-accent-dark);}&:active{background-color:var(--privy-color-accent-dark);}&:disabled,&:hover:disabled,&:active:disabled{cursor:not-allowed;color:var(--privy-color-foreground-disabled);background-color:var(--privy-color-accent-dark);}"
]), v = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledPrimaryButton",
    componentId: "sc-e537b447-2"
})([
    "position:relative;&&{background-color:",
    ";color:var(--privy-color-foreground-accent);transition:background-color 200ms ease;}&:hover{background-color:",
    ";}&:active{background-color:",
    ";}&:focus{outline:none;box-shadow:0 0 0 3px #949df9;}&:disabled{background-color:var(--privy-color-background-2);border:1px solid var(--privy-color-border-default);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}&:hover:disabled,&:active:disabled{background-color:var(--privy-color-background-2);border:1px solid var(--privy-color-border-default);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}",
    ""
], (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent-dark)", (r)=>r.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])([
        "&&&,&&&:hover,&&&:active{background-color:var(--privy-color-background-2);border:1px solid var(--privy-color-border-default);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}"
    ]));
const b = ({ children: a, loading: l, disabled: c, size: i = "lg", loadingText: n = "Loading...", as: t, onClick: s, ...v })=>{
    let b = "a" === t, p = !(!l && !c); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
        as: t,
        disabled: b ? void 0 : p,
        "aria-disabled": b ? p : void 0,
        $size: i,
        onClick: (r)=>{
            b && p ? r.preventDefault() : s?.(r);
        },
        ...v,
        children: l ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G"], {}),
                n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
        as: t,
        disabled: b ? void 0 : p,
        "aria-disabled": b ? p : void 0,
        $size: i,
        onClick: (r)=>{
            b && p ? r.preventDefault() : s?.(r);
        },
        ...v,
        children: l ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G"], {}),
                n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        marginLeft: "8px"
                    },
                    children: n
                }) : null
            ]
        }) : a
    });
};
let u = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
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
], (r)=>r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive-hover)", (r)=>r.$warn ? "var(--privy-color-error-light)" : "var(--privy-color-info-bg-hover)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.$warn ? "var(--privy-color-border-error)" : "var(--privy-color-border-interactive)", (r)=>r.$warn ? "var(--privy-color-error-bg-hover)" : "var(--privy-color-info-bg)", (r)=>r.$warn ? "var(--privy-color-error-dark)" : "var(--privy-color-accent)", (r)=>r.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])([
        "&&&,&&&:hover,&&&:active{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}"
    ])), y = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(i).withConfig({
    displayName: "StyledMutedButton",
    componentId: "sc-e537b447-4"
})([
    "&&{border-width:1px;border-style:solid;border-color:var(--privy-color-border-default);background-color:transparent;color:var(--privy-color-text-muted);transition:border-color 200ms ease,color 200ms ease,background-color 200ms ease;}&:hover{border-color:var(--privy-color-border-default);background-color:var(--privy-color-info-bg-hover);color:var(--privy-color-foreground-2);}&:active{border-color:var(--privy-color-border-default);background-color:var(--privy-color-info-bg);color:var(--privy-color-foreground-2);}&:focus{outline:none;box-shadow:0 0 0 3px #949df9;}&:disabled{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}&:hover:disabled,&:active:disabled{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}",
    ""
], (r)=>r.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])([
        "&&&,&&&:hover,&&&:active{border-color:var(--privy-color-border-default);background-color:var(--privy-color-background-2);color:var(--privy-color-foreground-disabled);cursor:not-allowed;}"
    ]));
const g = ({ children: e, onClick: a, disabled: l, isSubmitting: c, ...i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(f, {
        $isSubmitting: c,
        onClick: a,
        disabled: l,
        ...i,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                children: e
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["G"], {})
            })
        ]
    });
let f = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "StyledEmbeddedButton",
    componentId: "sc-e537b447-7"
})([
    "&&{color:var(--privy-color-accent);font-size:16px;font-style:normal;font-weight:500;line-height:24px;cursor:pointer;border-radius:0px var(--privy-border-radius-mdlg) var(--privy-border-radius-mdlg) 0px;border:none;transition:color 200ms ease;@media (min-width:441px){font-size:14px;}:hover{color:var(--privy-color-accent-dark);}&& > :first-child{opacity:",
    ";}&& > :last-child{position:absolute;display:flex;top:50%;left:50%;transform:translate3d(-50%,-50%,0);opacity:",
    ";}:disabled,:hover:disabled{color:var(--privy-color-foreground-disabled);cursor:not-allowed;}}"
], (r)=>r.$isSubmitting ? 0 : 1, (r)=>r.$isSubmitting ? 1 : 0);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Address-BUmpXgsy.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "A",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
const d = ({ address: c, showCopyIcon: d, url: h, className: g })=>{
    let [u, y] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1);
    function C(e) {
        e.stopPropagation(), navigator.clipboard.writeText(c).then(()=>y(!0)).catch(console.error);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (u) {
            let e = setTimeout(()=>y(!1), 3e3);
            return ()=>clearTimeout(e);
        }
    }, [
        u
    ]), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(m, h ? {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(f, {
                title: c,
                className: g,
                href: `${h}/address/${c}`,
                target: "_blank",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["D"])(c)
            }),
            d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
                onClick: C,
                size: "sm",
                style: {
                    gap: "0.375rem"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], u ? {
                    children: [
                        "Copied",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 16
                        })
                    ]
                } : {
                    children: [
                        "Copy",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            size: 16
                        })
                    ]
                })
            })
        ]
    } : {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(p, {
                title: c,
                className: g,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["D"])(c)
            }),
            d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
                onClick: C,
                size: "sm",
                style: {
                    gap: "0.375rem",
                    fontSize: "14px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], u ? {
                    children: [
                        "Copied",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 14
                        })
                    ]
                } : {
                    children: [
                        "Copy",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            size: 14
                        })
                    ]
                })
            })
        ]
    });
};
let m = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "AddressContainer",
    componentId: "sc-3a987cc8-0"
})([
    "display:inline-flex;align-items:center;gap:0.5rem;"
]), p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "AddressText",
    componentId: "sc-3a987cc8-1"
})([
    "font-size:14px;font-weight:500;color:var(--privy-color-foreground);"
]), f = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "AddressLink",
    componentId: "sc-3a987cc8-2"
})([
    "font-size:14px;color:var(--privy-color-foreground);text-decoration:none;&:hover{text-decoration:underline;}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/add-chain-to-default-chains.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToDefaultChains",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/default-supported-chains.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
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
    let n = t.filter((o)=>!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SUPPORTED_CHAIN_IDS"].has(o.id));
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$default$2d$supported$2d$chains$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SUPPORTED_CHAINS"].concat(n);
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetSolPrice-Cfm8o9C5.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "u",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
;
;
const t = ({ enabled: t = !0 } = {})=>{
    let { showFiatPrices: i, getUsdPriceForSol: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), [c, l] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!0), [s, n] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0), [d, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetTokenPrice-CDPxMEO-.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "u",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$add$2d$chain$2d$to$2d$default$2d$chains$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/chains/dist/esm/ethereum/add-chain-to-default-chains.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetSolPrice$2d$Cfm8o9C5$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetSolPrice-Cfm8o9C5.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
function c(c) {
    let { tokenPrice: a, isTokenPriceLoading: s, tokenPriceError: l } = ((t)=>{
        let { showFiatPrices: c, getUsdTokenPrice: a, chains: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), [l, P] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!0), [d, k] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0), [m, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            t ||= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["s"];
            let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$chains$2f$dist$2f$esm$2f$ethereum$2f$add$2d$chain$2d$to$2d$default$2d$chains$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addToDefaultChains"])(s).find((r)=>r.id === Number(t));
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
    })("solana" === c ? -1 : c), { solPrice: P, isSolPriceLoading: d, solPriceError: k } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetSolPrice$2d$Cfm8o9C5$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])({
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useWalletBalance-CkNw6kj0.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "u",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getPublicClient-A9RSftUZ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
;
;
;
;
function s({ rpcConfig: s, appId: l, address: m, chain: p }) {
    let { chains: d } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), [f, u] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0n), [h, g] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let r = p || d[0];
        if (r) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPublicClient"])({
            chain: p,
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(r, s, l))
        });
    }, [
        p,
        s,
        l
    ]), j = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!m || !b) return;
        g(!0);
        let r = await b.getBalance({
            address: m
        }).catch(console.error);
        return r ? (u(r), g(!1), r) : void 0;
    }, [
        b,
        m,
        u
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        j().catch(console.error);
    }, []), {
        balance: f,
        isLoading: h,
        reloadBalance: j
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getErc20TokenInfo-BFoeg5F6.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getPublicClient-A9RSftUZ.mjs [app-ssr] (ecmascript)");
;
;
const n = async ({ address: n, chain: s, rpcConfig: r, privyAppId: o })=>{
    try {
        let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPublicClient"])({
            chain: s,
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(s, r, o))
        }), [m, c] = await Promise.all([
            l.readContract({
                abi: i,
                address: n,
                functionName: "symbol"
            }),
            l.readContract({
                abi: i,
                address: n,
                functionName: "decimals"
            })
        ]);
        return {
            decimals: c,
            symbol: m
        };
    } catch (t) {
        return console.log(t), null;
    }
};
let i = [
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/formatErc20TokenAmount-BuPk9xcy.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ethers-Bl5aM5Gz.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
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
    let a = s(t * parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(r)));
    return "$0.00" === a ? "<$0.01" : a;
}, c = (e, r, t = 6, a = !1)=>`${i(e, t, a)} ${r}`, i = (r, t = 6, a = !1)=>{
    let s = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(r)).toFixed(t).replace(/0+$/, "").replace(/\.$/, "");
    return a ? s : `${"0" === s ? "<0.001" : s}`;
}, l = (e)=>e.reduce((e, r)=>e + r, 0n), m = (e, a)=>{
    let { chains: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), n = `https://etherscan.io/address/${a}`, o = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a5"])(e, s)}/address/${a}`;
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TriangleAlert
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
];
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("triangle-alert", __iconNode);
;
 //# sourceMappingURL=triangle-alert.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Phone
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
            key: "9njp5v"
        }
    ]
];
const Phone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("phone", __iconNode);
;
 //# sourceMappingURL=phone.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Phone",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Lock
]);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 10 0v4",
            key: "fwvmzm"
        }
    ]
];
const Lock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("lock", __iconNode);
;
 //# sourceMappingURL=lock.js.map
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/reservoir-kvLjIrEo.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"] {
    constructor(t, e){
        super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.", void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].TRANSACTION_FAILURE), this.relayLink = e ? `https://testnets.relay.link/transaction/${t}` : `https://relay.link/transaction/${t}`;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowLeftIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ArrowLeftIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ArrowLeftIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/QuestionMarkCircleIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function QuestionMarkCircleIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](QuestionMarkCircleIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function XMarkIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18 18 6M6 6l12 12"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](XMarkIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowLeftIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$QuestionMarkCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/QuestionMarkCircleIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function t(c) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 460 40",
        ...c,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("g", {
            fill: c.color || "var(--privy-color-foreground)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M0 15.4v15.38h4.64V19.96h3.58c2.47 0 3.63-.01 3.77-.02 1-.08 1.49-.15 2.18-.3a9.45 9.45 0 0 0 4.6-2.37c1.66-1.57 2.64-3.87 2.81-6.56.02-.3.02-1.19 0-1.49-.1-1.77-.56-3.35-1.36-4.72A8.84 8.84 0 0 0 15.14.57c-.93-.3-1.75-.43-3.09-.54C11.9.02 10.2 0 5.93 0H0ZM10.85 4c1.85.05 3.1.45 4.16 1.3.22.17.54.49.69.68a5.97 5.97 0 0 1 1.19 3.13c.04.35.04 1.36 0 1.71-.08.68-.23 1.3-.44 1.85a4.8 4.8 0 0 1-1.09 1.68A5.63 5.63 0 0 1 12 15.92c-.6.08-.4.08-4.01.09H4.64V3.98h2.9c1.6 0 3.08 0 3.31.02ZM187.65 5.71v5.72h-.27l-.09-.14a15.9 15.9 0 0 0-1.21-1.73c-.43-.5-1-.95-1.7-1.36-.54-.3-1.05-.5-1.73-.63a8.98 8.98 0 0 0-1.7-.17 8.84 8.84 0 0 0-7.8 4.03 12.95 12.95 0 0 0-2.03 6.39c-.07.98-.06 2.15.02 3.13.2 2.47.87 4.53 2.02 6.25a8.98 8.98 0 0 0 10.22 3.65 6.5 6.5 0 0 0 2.8-1.93c.41-.51.84-1.1 1.1-1.55l.1-.17h.37v3.58h4.38V0h-4.48Zm-5.24 5.54c1.3.14 2.3.6 3.17 1.48.9.9 1.5 2.09 1.85 3.64.36 1.6.39 3.72.06 5.43a8.13 8.13 0 0 1-1.54 3.62 5.1 5.1 0 0 1-3.93 1.96 6.13 6.13 0 0 1-2.32-.31 5.87 5.87 0 0 1-3.33-3.5c-.39-1-.62-2.05-.72-3.32-.03-.32-.04-1.35-.02-1.73.08-1.56.4-2.91.96-4.05a6.2 6.2 0 0 1 1.06-1.58 5.08 5.08 0 0 1 3.6-1.66c.25-.02.9 0 1.16.02ZM210.07 15.39l.01 15.38h4.38l.01-3.57h.37l.09.15c.24.44.84 1.26 1.21 1.7a6.79 6.79 0 0 0 2.57 1.75 9.3 9.3 0 0 0 6.86-.49 9.28 9.28 0 0 0 4.05-4.07A13.05 13.05 0 0 0 231 21.6c.21-1.73.18-3.7-.09-5.32a13.03 13.03 0 0 0-1.5-4.3 9.1 9.1 0 0 0-3.75-3.63 9.15 9.15 0 0 0-4.43-.96 7.46 7.46 0 0 0-2.8.5A7.07 7.07 0 0 0 216 9.7c-.4.52-.82 1.12-1.1 1.59l-.07.14h-.27V0h-4.5Zm11.13-4.14c1.07.1 1.94.44 2.7 1.04a6.1 6.1 0 0 1 1.64 1.98c.43.84.78 2 .94 3.11.15 1.16.16 2.4.02 3.54a9.34 9.34 0 0 1-1.39 4.03 5.33 5.33 0 0 1-2.69 2.15c-.9.3-2.04.38-3.06.2a5.14 5.14 0 0 1-3.45-2.37 6.03 6.03 0 0 1-.45-.8c-.5-1.03-.8-2.2-.92-3.58-.04-.49-.06-.89-.05-1.53.01-.76.05-1.23.13-1.85.38-2.53 1.47-4.38 3.15-5.31a5.46 5.46 0 0 1 2.3-.63 10 10 0 0 1 1.13.02ZM69.05 2.17l-.01 2.77V7.7h-3.36v3.6h3.36v6.8l.01 7.15c.06 1.4.4 2.44 1.1 3.37a5.8 5.8 0 0 0 2.97 2.07c.91.3 1.83.42 2.9.38a8.71 8.71 0 0 0 2.66-.48l-.8-3.7-.38.06a4.96 4.96 0 0 1-2.43-.06c-.33-.1-.56-.25-.8-.49-.4-.41-.6-.88-.7-1.67-.02-.2-.02-.62-.03-6.82v-6.6h4.73V7.7h-4.73V2.16h-4.49ZM133.34 2.17V7.7h-3.39v3.6h3.38v6.9l.01 7.17a5.66 5.66 0 0 0 2.36 4.49c.85.6 2.03 1.03 3.26 1.17.85.1 2.03.05 2.81-.1.3-.06.75-.18 1-.26l.2-.06v-.05l-.81-3.67-.37.06a4.99 4.99 0 0 1-1.8.09c-.85-.13-1.32-.4-1.7-.97a2.63 2.63 0 0 1-.39-1.04c-.06-.4-.06 0-.06-7.1V11.3h4.7V7.7h-4.7l-.01-2.77V2.16h-4.49ZM293.41 2.36a14.56 14.56 0 0 0-13.7 16.07 14.59 14.59 0 0 0 21.86 11.08 14.5 14.5 0 0 0 7.11-14.07 14.61 14.61 0 0 0-6.53-10.73 14.49 14.49 0 0 0-8.74-2.35ZM350.8 2.36a10.17 10.17 0 0 0-7.56 4.2c-.16.2-.45.63-.58.83l-.05.1h-.47l-.01-4.36h-7.36v36.4h7.82V27.27h.49l.05.07a11.3 11.3 0 0 0 7.49 4.15 10.52 10.52 0 0 0 9.38-4.1c1.66-2.1 2.73-4.9 3.07-8.06.1-.87.13-1.4.13-2.37 0-.8 0-1.1-.07-1.76a15.95 15.95 0 0 0-3.23-8.72 12.8 12.8 0 0 0-1.85-1.84 10.49 10.49 0 0 0-7.26-2.28Zm-.94 6.05c1.27.15 2.33.65 3.2 1.5.98.96 1.67 2.31 2.03 4 .34 1.57.38 3.68.12 5.39a9.78 9.78 0 0 1-1.04 3.25c-.14.25-.44.69-.6.89a5.35 5.35 0 0 1-4.31 2.07 5.25 5.25 0 0 1-4.41-1.9 7.35 7.35 0 0 1-1.26-2.32 14.09 14.09 0 0 1-.62-4.83c.05-1.98.38-3.53 1.02-4.85a5.63 5.63 0 0 1 2.5-2.65c.66-.34 1.3-.5 2.14-.58.18-.02 1.04 0 1.23.03ZM363.63 3.1l-.01 3.2v3.16h1.43c1.26.01 1.44.02 1.54.04.42.09.66.28.79.62.08.23.08.08.08 2.96a911.57 911.57 0 0 1 .03 10.18v7.54h7.82v-7.4l.01-7.83c.03-.94.11-1.63.27-2.28.46-1.9 1.54-2.93 3.35-3.23.52-.08.2-.08 5-.08h4.4V3.08h-3.1c-3.48 0-3.91.01-4.67.1-1.83.2-3.04.79-3.96 1.88-.5.6-.9 1.32-1.26 2.26l-.06.17h-.46V3.09h-5.6c-4.46 0-5.6 0-5.6.02ZM390.8 16.95V30.8h3.87l3.86-.01V3.09h-7.73ZM400.6 3.1l-.01.4v.38l4.66 13.4 4.69 13.47.02.05h10.3l.03-.05 4.67-13.45 4.67-13.4V3.1h-7.43l-6.7 19.26h-.5l-3.28-9.5-3.31-9.64-.05-.12h-3.88l-3.88.01ZM430.98 3.1c-.01 0-.02.19-.02.4v.39l5.08 14.59c2.8 8.02 5.08 14.6 5.08 14.61.01.02-.22.02-4.8.02h-4.82v6.42h4.95c5.09 0 5.23 0 5.87-.06 3.15-.28 5.29-1.63 6.63-4.15.28-.55.44-.95.87-2.16L459 6.78l1-2.89v-.8h-7.43l-6.69 19.26h-.5l-3.27-9.46-3.31-9.64-.06-.16h-3.88l-3.88.01ZM36.57 7.36c-1.36.1-2.6.6-3.62 1.45a5.65 5.65 0 0 0-1.67 2.42l-.05.13H31V7.7h-4.35v23.08h4.5v-7.3c0-8 0-7.34.08-7.82a4.89 4.89 0 0 1 2.06-3.18c.83-.58 1.74-.89 2.87-.98a11.87 11.87 0 0 1 2.8.25H39v-4.3l-.21-.02c-.61-.07-1.74-.1-2.22-.07ZM51.08 7.41c-2.33.12-4.3.84-5.95 2.16a9.89 9.89 0 0 0-2.03 2.2 12.5 12.5 0 0 0-2 5.78 18.04 18.04 0 0 0 0 3.65 12.13 12.13 0 0 0 2.26 6.05 9.74 9.74 0 0 0 5 3.52c2.11.64 4.7.64 6.8 0a9.78 9.78 0 0 0 4.88-3.37c1.38-1.78 2.19-4 2.4-6.58.13-1.46.06-3.06-.18-4.42a11.24 11.24 0 0 0-3.58-6.6 10 10 0 0 0-5.75-2.35c-.56-.06-1.31-.07-1.85-.04Zm1.42 3.78c.88.1 1.62.34 2.28.75a6.13 6.13 0 0 1 1.99 2.15 10.31 10.31 0 0 1 1.2 5c.02 1.23-.12 2.44-.42 3.51a7.14 7.14 0 0 1-1.81 3.32c-.61.6-1.2.98-1.95 1.24a6 6 0 0 1-2 .3 5.7 5.7 0 0 1-2.72-.6 5 5 0 0 1-1.28-.94A7.1 7.1 0 0 1 46 22.73c-.57-1.99-.6-4.46-.08-6.5a7.24 7.24 0 0 1 2.03-3.67 5.13 5.13 0 0 1 3.35-1.4 11 11 0 0 1 1.2.03ZM92.05 7.4c-.96.06-1.56.15-2.3.33a9.62 9.62 0 0 0-6.09 4.66 13.5 13.5 0 0 0-1.71 7c0 .83 0 1.04.06 1.6.16 1.77.58 3.32 1.29 4.7A9.72 9.72 0 0 0 90.28 31c1.84.37 4.08.32 5.85-.13a9.07 9.07 0 0 0 5.02-3.1A7.64 7.64 0 0 0 102.5 25l-2.11-.39-2.11-.38-.08.13a4.72 4.72 0 0 1-2.35 2.55 6.3 6.3 0 0 1-2.23.58c-.29.03-1.13.03-1.44 0a6.35 6.35 0 0 1-3.02-1.04 5.93 5.93 0 0 1-2.02-2.43 8.44 8.44 0 0 1-.72-3.18v-.26h16.38v-.81c0-1.83-.06-2.76-.25-3.87-.2-1.22-.53-2.24-1.05-3.28a8.9 8.9 0 0 0-2.66-3.26 10.1 10.1 0 0 0-5.34-1.94 18.3 18.3 0 0 0-1.46-.03Zm1.3 3.75c1.2.13 2.19.55 3.05 1.3a5.8 5.8 0 0 1 1.78 2.96c.13.51.21 1.17.21 1.66v.15H86.43v-.12c.08-.97.3-1.78.72-2.61.5-1 1.2-1.8 2.14-2.42a5.32 5.32 0 0 1 2.9-.95c.2-.01.97 0 1.17.03ZM116.79 7.41c-2 .1-3.73.65-5.22 1.65a10.7 10.7 0 0 0-4.25 6.06 16.1 16.1 0 0 0-.5 5.8c.2 2.17.84 4.13 1.88 5.76.58.9 1.32 1.73 2.15 2.4a9.37 9.37 0 0 0 3.6 1.8 12.06 12.06 0 0 0 3.92.34 10.2 10.2 0 0 0 3.84-.95 8.31 8.31 0 0 0 4.76-6.75l.01-.04h-4.37l-.05.16a4.87 4.87 0 0 1-4.24 3.75c-.59.07-1.32.06-1.93-.05a5.47 5.47 0 0 1-3.5-2.27c-.56-.75-1-1.73-1.26-2.79a13.8 13.8 0 0 1-.16-5.24 7.77 7.77 0 0 1 2.1-4.3 5.48 5.48 0 0 1 2.15-1.3 6.4 6.4 0 0 1 3.89.1c.59.21 1.03.5 1.5.96a5.32 5.32 0 0 1 1.46 2.5l.04.15h4.37v-.06a8.22 8.22 0 0 0-5.31-6.94 10.98 10.98 0 0 0-4.88-.74ZM156.2 7.41a9.87 9.87 0 0 0-6 2.29 11.02 11.02 0 0 0-3.41 5.43c-.52 1.78-.68 3.9-.48 5.97.17 1.8.63 3.38 1.37 4.8a9.68 9.68 0 0 0 5.91 4.86c1.65.48 3.63.61 5.53.36 3.72-.49 6.55-2.62 7.56-5.69.12-.39.13-.42.1-.43-.02 0-4.13-.75-4.19-.75-.03 0-.04 0-.1.16-.18.42-.45.9-.72 1.22-.16.2-.49.53-.7.7-.67.54-1.5.9-2.43 1.08-.48.08-.83.11-1.41.11-.64 0-1.07-.04-1.6-.15a5.76 5.76 0 0 1-3.93-2.83 8 8 0 0 1-.99-3.79v-.16h16.38v-1.11l-.02-1.43c-.1-2.25-.53-4-1.35-5.59a9.24 9.24 0 0 0-6.18-4.75c-1.04-.26-2.2-.36-3.33-.3Zm1.45 3.74a5.35 5.35 0 0 1 3.66 1.94 6.1 6.1 0 0 1 1.38 4.01v.12h-11.97v-.06c0-.02 0-.14.02-.25a6.6 6.6 0 0 1 2.15-4.32 5.73 5.73 0 0 1 3.5-1.46c.25-.02 1 0 1.26.02ZM233.58 7.82l8.37 23.22a49.22 49.22 0 0 1-.67 1.9 5.36 5.36 0 0 1-1.14 1.8c-.41.4-.82.58-1.48.69-.27.04-1.03.03-1.35 0a8.05 8.05 0 0 1-1.1-.23l-1.08 3.67c0 .02.32.14.66.22.83.21 1.57.29 2.56.28.56-.01.8-.03 1.24-.1 2.71-.4 4.66-2.09 5.86-5.08l9.64-26.44c0-.02-4.82-.06-4.83-.05l-2.93 8.96-2.91 8.94h-.24l-.22-.65-2.91-8.95-2.7-8.3H233.53ZM293.05 35.8c-1.18.04-1.93.09-2.8.16-2.52.24-4.53.69-5.43 1.23-.7.41-.76.86-.2 1.28.88.66 3.29 1.19 6.36 1.4a48.55 48.55 0 0 0 5.75.05c3.47-.19 6.24-.78 7.11-1.5.22-.19.3-.34.3-.53 0-.1 0-.12-.04-.22-.35-.69-2.32-1.3-5.25-1.63a41.09 41.09 0 0 0-5.8-.24Zm0 0"
            })
        })
    });
}
let d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "TermsAndConditionsContainer",
    componentId: "sc-ff3bd734-0"
})([
    "margin-top:16px;font-size:13px;text-align:center;color:var(--privy-color-foreground-3);display:block;&& > a{color:var(--privy-color-accent);}"
]);
function h({ app: { legal: { privacyPolicyUrl: e, termsAndConditionsUrl: a, requireUsersAcceptTerms: i } }, alwaysShowImplicitConsent: r }) {
    let n = !(!e || !a);
    return i && !r || !a && !e ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(d, {}) : /*#__PURE__*/ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(d, {
        children: [
            "By logging in I agree to the",
            " ",
            a && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
                href: a,
                target: "_blank",
                children: n ? "Terms" : "Terms of Service"
            }),
            n && " & ",
            e && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
                href: e,
                target: "_blank",
                children: "Privacy Policy"
            })
        ]
    });
}
const s = ({ className: c })=>{
    let { appearance: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(v, {
        className: c,
        children: e.footerLogo ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(p, {
            href: "https://www.privy.io/",
            target: "_blank",
            id: "protected-by-privy",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(t, {
                color: "currentColor",
                height: 13,
                width: 150
            })
        })
    });
};
let p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "PrivyLink",
    componentId: "sc-ff3bd734-1"
})([
    "&&{padding:0;color:var(--privy-color-foreground-3);}"
]);
const v = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ModalFooter",
    componentId: "sc-ff3bd734-2"
})([
    "display:flex;align-items:center;justify-content:center;padding-top:8px;padding-bottom:12px;gap:8px;font-size:13px;&& a{padding:0.5rem 0;&:hover{text-decoration:none;}}@media all and (display-mode:standalone){padding-bottom:30px;}"
]), m = ({ backFn: c })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(x, {
            onClick: c,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowLeftIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                height: "16px",
                width: "16px",
                strokeWidth: 2
            })
        })
    }), f = ({ infoFn: c })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
            "aria-label": "info",
            onClick: c,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$QuestionMarkCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                height: "22px",
                width: "22px",
                strokeWidth: 2
            })
        })
    }), g = (c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(x, {
            "aria-label": "close modal",
            onClick: c.onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                height: "16px",
                width: "16px",
                strokeWidth: 2
            })
        })
    }), y = ({ backFn: e, infoFn: i, onClose: r, title: n, closeable: t = !0, className: d })=>{
    let { closePrivyModal: h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(w, {
        className: d,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(b, {
                children: [
                    e && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(m, {
                        backFn: e
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        style: {
                            height: 24
                        }
                    }),
                    i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(f, {
                        infoFn: i
                    })
                ]
            }),
            n && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Z, {
                id: "privy-dialog-title",
                children: n
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(C, {
                children: !s.render.standalone && t && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(g, {
                    onClose: r || (()=>h())
                })
            })
        ]
    });
};
let x = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].button.withConfig({
    displayName: "StyledButton",
    componentId: "sc-bc3cd0df-0"
})([
    "&&{cursor:pointer;display:flex;opacity:0.6;background-color:var(--privy-color-background-2);border-radius:var(--privy-border-radius-full);padding:4px;> svg{margin:auto;color:var(--privy-color-foreground);}:hover{opacity:1;}}"
]), u = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(x).withConfig({
    displayName: "TransparentStyledButton",
    componentId: "sc-bc3cd0df-1"
})([
    "&&{background-color:transparent;}"
]), w = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledHeader",
    componentId: "sc-bc3cd0df-2"
})([
    "padding:16px 0;display:flex;align-items:center;justify-content:space-between;h2{font-size:16px;line-height:24px;font-weight:600;color:var(--privy-color-foreground);}"
]), b = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "LeftActionContainer",
    componentId: "sc-bc3cd0df-3"
})([
    "flex:1;align-items:center;display:flex;gap:8px;"
]), C = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "RightActionContainer",
    componentId: "sc-bc3cd0df-4"
})([
    "flex:1;display:flex;justify-content:flex-end;"
]), Z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TitleContainer",
    componentId: "sc-bc3cd0df-5"
})([
    "overflow:hidden;white-space:nowrap;max-width:100%;text-overflow:ellipsis;text-align:center;color:var(--privy-color-foreground-2);"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-CJMgUOnw.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "N",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
;
const t = ({ size: n, centerIcon: t })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(r, {
        $size: n,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(o, {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(a, {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(d, {}),
                t ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(s, {
                    children: t
                }) : null
            ]
        })
    });
let r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "LoadingContainer",
    componentId: "sc-ebc93df8-0"
})([
    "--spinner-size:",
    ";display:inline-flex;justify-content:center;align-items:center;@media all and (display-mode:standalone){margin-bottom:30px;}"
], (e)=>e.$size ? e.$size : "96px"), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "SpinnerContainer",
    componentId: "sc-ebc93df8-1"
})([
    "position:relative;height:var(--spinner-size);width:var(--spinner-size);opacity:1;animation:fadein 200ms ease;"
]), s = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CenterIconContainer",
    componentId: "sc-ebc93df8-2"
})([
    "position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;svg,img{width:calc(var(--spinner-size) * 0.4);height:calc(var(--spinner-size) * 0.4);border-radius:var(--privy-border-radius-full);}"
]), a = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CircleFixed",
    componentId: "sc-ebc93df8-3"
})([
    "position:absolute;top:0;right:0;bottom:0;left:0;width:var(--spinner-size);height:var(--spinner-size);&&{border:4px solid var(--privy-color-border-default);border-radius:50%;}"
]), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CircleRotate",
    componentId: "sc-ebc93df8-4"
})([
    "position:absolute;top:0;right:0;bottom:0;left:0;width:var(--spinner-size);height:var(--spinner-size);animation:spin 1200ms linear infinite;&&{border:4px solid;border-color:var(--privy-color-icon-subtle) transparent transparent transparent;border-radius:50%;}@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Screen-_0H_rCdH.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S",
    ()=>w
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CJMgUOnw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-CJMgUOnw.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
const l = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ScreenRoot",
    componentId: "sc-2e815abe-0"
})([
    "--screen-space:16px;--screen-space-lg:calc(var(--screen-space) * 1.5);position:relative;overflow:hidden;margin:0 calc(-1 * var(--screen-space));height:100%;border-radius:var(--privy-border-radius-lg);"
]), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ScreenRootInner",
    componentId: "sc-2e815abe-1"
})([
    "display:flex;flex-direction:column;gap:calc(var(--screen-space) * 1.5);width:100%;background:var(--privy-color-background);padding:0 var(--screen-space-lg) var(--screen-space);height:100%;border-radius:var(--privy-border-radius-lg);"
]), s = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "HeaderContainer",
    componentId: "sc-2e815abe-2"
})([
    "position:relative;display:flex;flex-direction:column;"
]), p = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["M"]).withConfig({
    displayName: "StyledModalHeader",
    componentId: "sc-2e815abe-3"
})([
    "margin:0 -8px;"
]), g = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "BodyContainer",
    componentId: "sc-2e815abe-4"
})([
    "flex:1 1 auto;display:flex;flex-direction:column;overflow-y:auto;padding:3px;margin:-3px;&::-webkit-scrollbar{display:none;}scrollbar-gutter:stable both-edges;scrollbar-width:none;-ms-overflow-style:none;",
    " background-repeat:no-repeat;background-size:100% 32px,100% 16px;background-attachment:local,scroll;"
], ({ $colorScheme: e })=>"light" === e ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;" : "dark" === e ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;" : void 0), h = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FooterContainer",
    componentId: "sc-2e815abe-5"
})([
    "display:flex;flex-direction:column;gap:var(--screen-space-lg);"
]);
let m = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CenteredHeader",
    componentId: "sc-2e815abe-6"
})([
    "text-align:center;display:flex;flex-direction:column;align-items:center;gap:var(--screen-space);"
]), v = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TitleContainer",
    componentId: "sc-2e815abe-7"
})([
    "display:flex;flex-direction:column;gap:4px;"
]), u = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].h3.withConfig({
    displayName: "HeaderTitle",
    componentId: "sc-2e815abe-8"
})([
    "&&{font-size:20px;line-height:32px;font-weight:500;color:var(--privy-color-foreground);margin:0;}"
]), f = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].p.withConfig({
    displayName: "HeaderSubtitle",
    componentId: "sc-2e815abe-9"
})([
    "&&{margin:0;font-size:16px;font-weight:300;line-height:24px;color:var(--privy-color-foreground);}"
]), y = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "IconContainer",
    componentId: "sc-2e815abe-10"
})([
    "background:",
    ";border-radius:50%;width:64px;height:64px;display:flex;align-items:center;justify-content:center;"
], ({ $variant: e })=>{
    switch(e){
        case "success":
            return "var(--privy-color-success-bg, #EAFCEF)";
        case "warning":
            return "var(--privy-color-warn, #FEF3C7)";
        case "error":
            return "var(--privy-color-error-bg, #FEE2E2)";
        case "loading":
        case "logo":
            return "transparent";
        default:
            return "var(--privy-color-background-2)";
    }
}), b = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "LogoContainer",
    componentId: "sc-2e815abe-11"
})([
    "display:flex;align-items:center;justify-content:center;margin-bottom:var(--screen-space);img,svg{max-height:90px;max-width:180px;}"
]), x = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "LoadingWithIconContainer",
    componentId: "sc-2e815abe-12"
})([
    "display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:82px;> div{position:relative;}> div > :first-child{position:relative;}> div > :last-child{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);}"
]);
const w = ({ children: r, ...i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(l, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(d, {
            ...i,
            children: r
        })
    });
let C = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ProgressBarContainer",
    componentId: "sc-2e815abe-13"
})([
    "position:absolute;top:0;left:calc(-1 * var(--screen-space-lg));width:calc(100% + calc(var(--screen-space-lg) * 2));height:4px;background:var(--privy-color-background-2);border-top-left-radius:inherit;border-top-right-radius:inherit;overflow:hidden;"
]), k = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"]).withConfig({
    displayName: "StyledBlobbyFooter",
    componentId: "sc-2e815abe-14"
})([
    "padding:0;&& a{padding:0;color:var(--privy-color-foreground-3);}"
]), I = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ProgressBarFill",
    componentId: "sc-2e815abe-15"
})([
    "height:100%;width:",
    "%;background:var(--privy-color-foreground-3);border-radius:2px;transition:width 300ms ease-in-out;"
], ({ pct: e })=>e), N = ({ step: r })=>r ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(C, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(I, {
            pct: Math.min(100, r.current / r.total * 100)
        })
    }) : null;
w.Header = ({ title: i, subtitle: o, icon: n, iconVariant: a, iconLoadingStatus: t, showBack: c, onBack: l, showInfo: d, onInfo: g, showClose: h, onClose: y, step: b, ...x })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(s, {
        ...x,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(p, {
                backFn: c ? l : void 0,
                infoFn: d ? g : void 0,
                onClose: h ? y : void 0,
                closeable: h
            }),
            (n || a || i || o) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(m, {
                children: [
                    n || a ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(w.Icon, {
                        icon: n,
                        variant: a,
                        loadingStatus: t
                    }) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(v, {
                        children: [
                            i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
                                children: i
                            }),
                            o && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(f, {
                                children: o
                            })
                        ]
                    })
                ]
            }),
            b && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(N, {
                step: b
            })
        ]
    }), (w.Body = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef(({ children: r, ...i }, o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(g, {
        ref: o,
        ...i,
        children: r
    }))).displayName = "Screen.Body", w.Footer = ({ children: r, ...i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(h, {
        id: "privy-content-footer-container",
        ...i,
        children: r
    }), w.Actions = ({ children: r, ...i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(E, {
        ...i,
        children: r
    }), w.HelpText = ({ children: r, ...i })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(S, {
        ...i,
        children: r
    }), w.Watermark = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(k, {}), w.Icon = ({ icon: o, variant: a = "subtle", loadingStatus: t })=>"logo" === a && o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(b, "string" == typeof o ? {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
            src: o,
            alt: ""
        })
    } : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(o) ? {
        children: o
    } : {
        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(o)
    }) : "loading" === a ? o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(x, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a4"], {
                    success: t?.success,
                    fail: t?.fail
                }),
                "string" == typeof o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        background: `url('${o}') 0 0 / contain`,
                        height: "38px",
                        width: "38px",
                        borderRadius: "6px",
                        margin: "auto",
                        backgroundSize: "contain"
                    }
                }) : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(o) ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cloneElement(o, {
                    style: {
                        width: "38px",
                        height: "38px"
                    }
                }) : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(o, {
                    style: {
                        width: "38px",
                        height: "38px"
                    }
                })
            ]
        })
    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
        $variant: a,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CJMgUOnw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["N"], {
            size: "64px"
        })
    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
        $variant: a,
        children: o && ("string" == typeof o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
            src: o,
            alt: "",
            style: {
                width: "32px",
                height: "32px",
                borderRadius: "6px"
            }
        }) : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(o) ? o : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(o, {
            width: 32,
            height: 32,
            stroke: (()=>{
                switch(a){
                    case "success":
                        return "var(--privy-color-icon-success)";
                    case "warning":
                        return "var(--privy-color-icon-warning)";
                    case "error":
                        return "var(--privy-color-icon-error)";
                    default:
                        return "var(--privy-color-icon-muted)";
                }
            })(),
            strokeWidth: 2
        }))
    });
let E = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ActionsContainer",
    componentId: "sc-2e815abe-16"
})([
    "width:100%;display:flex;flex-direction:column;gap:calc(var(--screen-space) / 2);"
]), S = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].p.withConfig({
    displayName: "HelpTextContainer",
    componentId: "sc-2e815abe-17"
})([
    "&&{margin:0;width:100%;text-align:center;color:var(--privy-color-foreground-3);font-size:14px;line-height:22px;& a{color:var(--privy-color-accent);}}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenLayout-CNho46nP.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Screen-_0H_rCdH.mjs [app-ssr] (ecmascript)");
;
;
;
const n = ({ primaryCta: n, secondaryCta: i, helpText: s, watermark: c = !0, children: d, ...m })=>{
    let o = n || i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            n && (()=>{
                let { label: r, ...e } = n, a = e.variant || "primary"; /*#__PURE__*/ 
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {
                    ...e,
                    variant: a,
                    style: {
                        width: "100%",
                        ...e.style
                    },
                    children: r
                });
            })(),
            i && (()=>{
                let { label: r, ...e } = i, a = e.variant || "secondary"; /*#__PURE__*/ 
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {
                    ...e,
                    variant: a,
                    style: {
                        width: "100%",
                        ...e.style
                    },
                    children: r
                });
            })()
        ]
    }) : null; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
        id: m.id,
        className: m.className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"].Header, {
                ...m
            }),
            d ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"].Body, {
                children: d
            }) : null,
            s || o || c ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"].Footer, {
                children: [
                    s ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"].HelpText, {
                        children: s
                    }) : null,
                    o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"].Actions, {
                        children: o
                    }) : null,
                    c ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Screen$2d$_0H_rCdH$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"].Watermark, {}) : null
                ]
            }) : null
        ]
    });
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorScreen-Yi-Rhs0v.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorScreen",
    ()=>f,
    "ErrorScreenView",
    ()=>y,
    "default",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-NL2cPmJD.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/get-is-unified-wallet-gMDXpX6C.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/reservoir-kvLjIrEo.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenLayout$2d$CNho46nP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenLayout-CNho46nP.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tinycolor2$2f$esm$2f$tinycolor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/tinycolor2/esm/tinycolor.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/react-device-detect/dist/lib.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/client/index.mjs [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const y = ({ error: n, allowlistConfig: s, onRetry: c, onCaptchaReset: T, onBack: y })=>{
    let f = ((n, s)=>{
        if (n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$reservoir$2d$kvLjIrEo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"]) return {
            title: "Transaction failed",
            detail: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        children: n.message
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                        children: [
                            " ",
                            "Check the",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(w, {
                                href: n.relayLink,
                                target: "_blank",
                                children: "refund status"
                            }),
                            "."
                        ]
                    })
                ]
            }),
            ctaText: "Try again",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
        };
        if (n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"]) switch(n.privyErrorCode){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].CLIENT_REQUEST_TIMEOUT:
                return {
                    title: "Timed out",
                    detail: n.message,
                    ctaText: "Try again",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].INSUFFICIENT_BALANCE:
                return {
                    title: "Insufficient balance",
                    detail: n.message,
                    ctaText: "Try again",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].TRANSACTION_FAILURE:
                return {
                    title: "Transaction failure",
                    detail: n.message,
                    ctaText: "Try again",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                };
            default:
                return {
                    title: "Something went wrong",
                    detail: "Try again later",
                    ctaText: "Try again",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                };
        }
        else {
            if (n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"] && "twilio_verification_failed" === n.type) return {
                title: "Something went wrong",
                detail: n.message,
                ctaText: "Try again",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"]
            };
            if (!(n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"])) return n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"] && n.status && [
                400,
                422
            ].includes(n.status) ? {
                title: "Something went wrong",
                detail: n.message,
                ctaText: "Try again",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
            } : {
                title: "Something went wrong",
                detail: "Try again later",
                ctaText: "Try again",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
            };
            switch(n.privyErrorCode){
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].INVALID_CAPTCHA:
                    return {
                        title: "Something went wrong",
                        detail: "Please try again.",
                        ctaText: "Try again",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].DISALLOWED_LOGIN_METHOD:
                    return {
                        title: "Not allowed",
                        detail: n.message,
                        ctaText: "Try another method",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].ALLOWLIST_REJECTED:
                    return {
                        title: s.errorTitle || "You don't have access to this app",
                        detail: s.errorDetail || "Have you been invited?",
                        ctaText: s.errorCtaText || "Try another account",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"]
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].CAPTCHA_FAILURE:
                    return {
                        title: "Something went wrong",
                        detail: "You did not pass CAPTCHA. Please try again.",
                        ctaText: "Try again",
                        icon: null
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].CAPTCHA_TIMEOUT:
                    return {
                        title: "Something went wrong",
                        detail: "Something went wrong! Please try again later.",
                        ctaText: "Try again",
                        icon: null
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].LINKED_TO_ANOTHER_USER:
                    return {
                        title: "Authentication failed",
                        detail: "This account has already been linked to another user.",
                        ctaText: "Try again",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].NOT_SUPPORTED:
                    return {
                        title: "This region is not supported",
                        detail: "SMS authentication from this region is not available",
                        ctaText: "Try another method",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    };
                case __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].TOO_MANY_REQUESTS:
                    return {
                        title: "Request failed",
                        detail: "Too many attempts.",
                        ctaText: "Try again later",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    };
                default:
                    return {
                        title: "Something went wrong",
                        detail: "Try again later",
                        ctaText: "Try again",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    };
            }
        }
    })(n, s); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenLayout$2d$CNho46nP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
        title: f.title,
        subtitle: f.detail,
        icon: f.icon,
        onBack: y,
        iconVariant: "error",
        primaryCta: {
            label: f.ctaText,
            onClick: ()=>{
                n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"] && (n.privyErrorCode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].INVALID_CAPTCHA && T?.(), n.privyErrorCode === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"].ALLOWLIST_REJECTED && s.errorCtaLink) ? window.location.href = s.errorCtaLink : c?.();
            },
            variant: "error"
        },
        watermark: !0
    });
}, f = {
    component: ()=>{
        let { navigate: e, data: r, lastScreen: i, currentScreen: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), { reset: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(), l = r?.errorModalData?.previousScreen || (i === a ? void 0 : i); /*#__PURE__*/ 
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
            error: r?.errorModalData?.error || Error(),
            allowlistConfig: o.allowlistConfig,
            onRetry: ()=>{
                e(l || "LandingScreen", !1);
            },
            onCaptchaReset: n
        });
    }
};
let w = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "Link",
    componentId: "sc-506514cb-0"
})([
    "color:var(--privy-color-accent) !important;font-weight:600;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/JsonTree-Bvd2C29R.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "D",
    ()=>n,
    "M",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
;
let o = ({ data: t })=>{
    let o = (t)=>"object" == typeof t && null !== t ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(a, {
            children: Object.entries(t).map(([e, t])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("li", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("strong", {
                            children: [
                                e,
                                ":"
                            ]
                        }),
                        " ",
                        o(t)
                    ]
                }, e))
        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
            children: String(t)
        }); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: o(t)
    });
};
const i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Message",
    componentId: "sc-70ec2a4f-0"
})([
    "margin-top:1.5rem;background-color:var(--privy-color-background-2);border-radius:var(--privy-border-radius-md);padding:12px;text-align:left;max-height:310px;overflow:scroll;white-space:pre-wrap;width:100%;font-size:0.875rem;font-weight:400;color:var(--privy-color-foreground);line-height:1.5;-ms-overflow-style:none;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"
]);
let a = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].ul.withConfig({
    displayName: "MessageList",
    componentId: "sc-70ec2a4f-1"
})([
    "margin-left:12px !important;white-space:nowrap;&:first-child{margin-left:0 !important;}strong{font-weight:500 !important;}"
]);
const n = ({ data: r, className: t })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(i, {
        className: t,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(o, {
            data: r
        })
    });
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/BoltIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function BoltIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](BoltIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/BoltIcon.js [app-ssr] (ecmascript) <export default as BoltIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BoltIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/BoltIcon.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowRightIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ArrowRightIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ArrowRightIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowRightIcon.js [app-ssr] (ecmascript) <export default as ArrowRightIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRightIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowRightIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowRightIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowRightIcon.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ChevronDownIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ChevronDownIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDownIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LoadingSkeleton-CHdaq3pb.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
let i = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"])([
    "from,to{background:var(--privy-color-foreground-4);color:var(--privy-color-foreground-4);}50%{background:var(--privy-color-foreground-accent);color:var(--privy-color-foreground-accent);}"
]);
const n = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])([
    "",
    ""
], (o)=>o.$isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])([
        "width:35%;animation:",
        " 2s linear infinite;border-radius:var(--privy-border-radius-sm);"
    ], i) : "");
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Value-B4M62ove.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L",
    ()=>r,
    "V",
    ()=>i,
    "a",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LoadingSkeleton-CHdaq3pb.mjs [app-ssr] (ecmascript)");
;
;
const r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "LabelSm",
    componentId: "sc-6c002d6-0"
})([
    "color:var(--privy-color-foreground-3);font-size:0.875rem;font-weight:400;line-height:1.375rem;"
]), a = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(r).withConfig({
    displayName: "LabelSmPrimary",
    componentId: "sc-6c002d6-1"
})([
    "color:var(--privy-color-accent);"
]), i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Value",
    componentId: "sc-72aa026-0"
})([
    "color:var(--privy-color-foreground);font-size:0.875rem;font-weight:500;line-height:1.375rem;word-break:break-all;text-align:right;",
    ""
], __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Row-CG0lSY5Z.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "R",
    ()=>o,
    "a",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const e = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Rows",
    componentId: "sc-b764aab6-0"
})([
    "display:flex;flex-direction:column;gap:0.35rem;width:100%;"
]), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Row",
    componentId: "sc-b764aab6-1"
})([
    "display:flex;width:100%;justify-content:space-between;gap:0.5rem;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorMessage-Cx8GKGhL.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "E",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const e = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "ErrorMessage",
    componentId: "sc-fcb8cd50-0"
})([
    "text-align:left;font-size:0.75rem;font-weight:500;line-height:1.125rem;color:var(--privy-color-error);"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LabelXs-BOisBtqT.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const e = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "LabelXs",
    componentId: "sc-4c43f9fd-0"
})([
    "color:var(--privy-color-foreground-3);font-size:0.75rem;font-weight:500;line-height:1.125rem;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Subtitle-DkvfP2Ev.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const t = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Subtitle",
    componentId: "sc-7a11f796-0"
})([
    "margin-top:4px;color:var(--privy-color-foreground);text-align:center;font-size:0.875rem;font-weight:400;line-height:1.375rem;&& a{color:var(--privy-color-accent);}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Title-D0pfZff-.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "T",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Title",
    componentId: "sc-66de63c-0"
})([
    "color:var(--privy-color-foreground);font-size:1.125rem;font-weight:600;line-height:1.875rem;text-align:center;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/shared-CtYf3O54.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "B",
    ()=>d,
    "a",
    ()=>e
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const e = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])([
    "&&{border-width:1px;padding:0.5rem 1rem;}width:100%;text-align:left;border:solid 1px var(--privy-color-foreground-4);border-radius:var(--privy-border-radius-md);display:flex;justify-content:space-between;align-items:center;",
    ""
], (r)=>"error" === r.$state ? "\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      " : ""), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Box",
    componentId: "sc-7252360a-0"
})([
    "",
    ""
], e);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/WalletInfoCard-COAfUoX0.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W",
    ()=>x
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorMessage-Cx8GKGhL.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LabelXs-BOisBtqT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Address-BUmpXgsy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/shared-CtYf3O54.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
let f = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"]).withConfig({
    displayName: "StyledBox",
    componentId: "sc-4010d8f3-0"
})([
    "&&{padding:0.75rem;height:56px;}"
]), h = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "WalletContent",
    componentId: "sc-4010d8f3-1"
})([
    "display:flex;align-items:center;justify-content:space-between;width:100%;"
]), g = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AddressContainer",
    componentId: "sc-4010d8f3-2"
})([
    "display:flex;flex-direction:column;gap:0;"
]), y = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "BalanceText",
    componentId: "sc-4010d8f3-3"
})([
    "font-size:12px;line-height:1rem;color:var(--privy-color-foreground-3);"
]), C = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"]).withConfig({
    displayName: "TitleLabel",
    componentId: "sc-4010d8f3-4"
})([
    "text-align:left;margin-bottom:0.5rem;"
]), u = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"]).withConfig({
    displayName: "StyledErrorMessage",
    componentId: "sc-4010d8f3-5"
})([
    "margin-top:0.25rem;"
]), w = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"]).withConfig({
    displayName: "CopyButton",
    componentId: "sc-4010d8f3-6"
})([
    "&&{gap:0.375rem;font-size:14px;}"
]);
const x = ({ errMsg: a, balance: d, address: m, className: l, title: p, showCopyButton: x = !1 })=>{
    let [v, N] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (v) {
            let e = setTimeout(()=>N(!1), 3e3);
            return ()=>clearTimeout(e);
        }
    }, [
        v
    ]), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            p && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(C, {
                children: p
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(f, {
                className: l,
                $state: a ? "error" : void 0,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(h, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(g, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                    address: m,
                                    showCopyIcon: !1
                                }),
                                void 0 !== d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
                                    children: d
                                })
                            ]
                        }),
                        x && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(w, {
                            onClick: function(e) {
                                e.stopPropagation(), navigator.clipboard.writeText(m).then(()=>N(!0)).catch(console.error);
                            },
                            size: "sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], v ? {
                                children: [
                                    "Copied",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 14
                                    })
                                ]
                            } : {
                                children: [
                                    "Copy",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                        size: 14
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            a && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
                children: a
            })
        ]
    });
};
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Checkbox-NmGCZeKL.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
;
const c = ({ className: i, checked: c, color: l = "var(--privy-color-accent)", ...p })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("label", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(d, {
            className: i,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(r, {
                    checked: c,
                    ...p
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(t, {
                    color: l,
                    checked: c,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(n, {
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                            points: "20 6 9 17 4 12"
                        })
                    })
                })
            ]
        })
    });
let d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CheckboxContainer",
    componentId: "sc-db51b935-1"
})([
    "display:inline-block;vertical-align:middle;"
]), n = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].svg.withConfig({
    displayName: "Icon",
    componentId: "sc-db51b935-2"
})([
    "fill:none;stroke:white;stroke-width:3px;"
]), r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].input.attrs({
    type: "checkbox"
}).withConfig({
    displayName: "HiddenCheckbox",
    componentId: "sc-db51b935-3"
})([
    "border:0;clip:rect(0 0 0 0);clippath:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px;"
]), t = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledCheckbox",
    componentId: "sc-db51b935-4"
})([
    "display:inline-block;width:18px;height:18px;transition:all 150ms;cursor:pointer;border-color:",
    ";border-radius:3px;background:",
    ";&&{border-width:1px;}",
    ":focus + &{box-shadow:0 0 0 1px ",
    ";}",
    "{visibility:",
    ";}"
], (o)=>o.color, (o)=>o.checked ? o.color : "var(--privy-color-background)", r, (o)=>o.color, n, (o)=>o.checked ? "visible" : "hidden");
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ExclamationCircleIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ExclamationCircleIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ExclamationCircleIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorBanner-BdiArMwu.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "E",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ExclamationCircleIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
;
;
const t = ({ children: i, theme: t })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(n, {
        $theme: t,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: "20px",
                height: "20px",
                color: "var(--privy-color-icon-error)",
                strokeWidth: 2,
                style: {
                    flexShrink: 0
                }
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(l, {
                $theme: t,
                children: i
            })
        ]
    });
let n = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Container",
    componentId: "sc-34910fd1-0"
})([
    "display:flex;gap:0.75rem;background-color:var(--privy-color-error-bg);align-items:flex-start;padding:1rem;border-radius:0.75rem;"
]), l = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Content",
    componentId: "sc-34910fd1-1"
})([
    "color:",
    ";font-size:1rem;font-weight:400;line-height:1.5;flex:1;text-align:left;"
], (r)=>"dark" === r.$theme ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)");
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ExclamationTriangleIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ExclamationTriangleIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ExclamationTriangleIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/WarningBanner-BDp-QC9i.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationTriangleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ExclamationTriangleIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
;
;
const t = ({ children: i, theme: t })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(n, {
        $theme: t,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationTriangleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                width: "20px",
                height: "20px",
                color: "var(--privy-color-icon-warning)",
                strokeWidth: 2,
                style: {
                    flexShrink: 0
                }
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(a, {
                $theme: t,
                children: i
            })
        ]
    });
let n = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Container",
    componentId: "sc-a77c2854-0"
})([
    "display:flex;gap:0.75rem;background-color:var(--privy-color-warn-bg);align-items:flex-start;padding:1rem;border-radius:0.75rem;"
]), a = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Content",
    componentId: "sc-a77c2854-1"
})([
    "color:",
    ";font-size:1rem;font-weight:400;line-height:1.5;flex:1;text-align:left;"
], (r)=>"dark" === r.$theme ? "var(--privy-color-foreground-2)" : "var(--privy-color-foreground)");
;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ClipboardDocumentCheckIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ClipboardDocumentCheckIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ClipboardDocumentCheckIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ClipboardDocumentIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ClipboardDocumentIcon({ title, titleId, ...props }, svgRef) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
    }));
}
const ForwardRef = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](ClipboardDocumentIcon);
const __TURBOPACK__default__export__ = ForwardRef;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TransactionErrorView-RLIeHdul.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S",
    ()=>Q,
    "T",
    ()=>re,
    "a",
    ()=>Y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/BoltIcon.js [app-ssr] (ecmascript) <export default as BoltIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowRightIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowRightIcon.js [app-ssr] (ecmascript) <export default as ArrowRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/formatters.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Value-B4M62ove.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Row-CG0lSY5Z.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorMessage-Cx8GKGhL.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LabelXs-BOisBtqT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Subtitle$2d$DkvfP2Ev$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Subtitle-DkvfP2Ev.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Title$2d$D0pfZff$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Title-D0pfZff-.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Address-BUmpXgsy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletInfoCard$2d$COAfUoX0$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/WalletInfoCard-COAfUoX0.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/LoadingSkeleton-CHdaq3pb.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/address/isAddress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/shared-CtYf3O54.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Checkbox$2d$NmGCZeKL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Checkbox-NmGCZeKL.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorBanner$2d$BdiArMwu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorBanner-BdiArMwu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WarningBanner$2d$BDp$2d$QC9i$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/WarningBanner-BDp-QC9i.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardDocumentCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ClipboardDocumentCheckIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardDocumentIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ClipboardDocumentIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ExclamationCircleIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const B = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"]).withConfig({
    displayName: "InteractiveLabel",
    componentId: "sc-b57d0824-0"
})([
    "cursor:pointer;display:inline-flex;gap:8px;align-items:center;color:var(--privy-color-accent);svg{fill:var(--privy-color-accent);}"
]);
var P = ({ iconUrl: r, value: i, symbol: o, usdValue: t, nftName: a, nftCount: l, decimals: d, $isLoading: c })=>{
    if (c) /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(R, {
        $isLoading: c
    });
    let s = i && t && d ? function(e, n, r) {
        let i = parseFloat(e), o = parseFloat(r);
        if (0 === i || 0 === o || Number.isNaN(i) || Number.isNaN(o)) return e;
        let t = Math.ceil(-Math.log10(.01 / (o / i))), a = Math.pow(10, t = Math.max(t = Math.min(t, n), 1)), l = +(Math.floor(i * a) / a).toFixed(t).replace(/\.?0+$/, "");
        return Intl.NumberFormat(void 0, {
            maximumFractionDigits: n
        }).format(l);
    }(i, d, t) : i; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(R, {
                $isLoading: c,
                children: [
                    r && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(z, {
                        src: r,
                        alt: "Token icon"
                    }),
                    l && l > 1 ? l + "x" : void 0,
                    " ",
                    a,
                    s,
                    " ",
                    o
                ]
            }),
            t && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(W, {
                $isLoading: c,
                children: [
                    "$",
                    t
                ]
            })
        ]
    });
};
let R = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Value",
    componentId: "sc-991db279-0"
})([
    "color:var(--privy-color-foreground);font-size:0.875rem;font-weight:500;line-height:1.375rem;word-break:break-all;text-align:right;display:flex;justify-content:flex-end;",
    ""
], __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"]);
const W = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Subvalue",
    componentId: "sc-991db279-1"
})([
    "color:var(--privy-color-foreground-2);font-size:12px;font-weight:400;line-height:18px;word-break:break-all;text-align:right;display:flex;justify-content:flex-end;",
    ""
], __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LoadingSkeleton$2d$CHdaq3pb$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"]);
let z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].img.withConfig({
    displayName: "TokenIcon",
    componentId: "sc-991db279-2"
})([
    "height:14px;width:14px;margin-right:4px;object-fit:contain;"
]);
const V = (i)=>{
    let { chain: o, transactionDetails: t, isTokenContractInfoLoading: a, symbol: l } = i, { action: d, functionName: c } = t; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$shared$2d$CtYf3O54$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"], {
            children: [
                "transaction" !== d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                            children: "Action"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                            children: c
                        })
                    ]
                }),
                "mint" === c && "args" in t && t.args.filter((e)=>e).map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: `Param ${i}`
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: "string" == typeof r && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(r) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                    address: r,
                                    url: o?.blockExplorers?.default?.url,
                                    showCopyIcon: !1
                                }) : r?.toString()
                            })
                        ]
                    }, i)),
                "setApprovalForAll" === c && t.operator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                            children: "Operator"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                address: t.operator,
                                url: o?.blockExplorers?.default?.url,
                                showCopyIcon: !1
                            })
                        })
                    ]
                }),
                "setApprovalForAll" === c && void 0 !== t.approved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                            children: "Set approval to"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                            children: t.approved ? "true" : "false"
                        })
                    ]
                }),
                "transfer" === c || "transferFrom" === c || "safeTransferFrom" === c || "approve" === c ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        "formattedAmount" in t && t.formattedAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Amount"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                    $isLoading: a,
                                    children: [
                                        t.formattedAmount,
                                        " ",
                                        l
                                    ]
                                })
                            ]
                        }),
                        "tokenId" in t && t.tokenId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Token ID"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                    children: t.tokenId.toString()
                                })
                            ]
                        })
                    ]
                }) : null,
                "safeBatchTransferFrom" === c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        "amounts" in t && t.amounts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Amounts"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                    children: t.amounts.join(", ")
                                })
                            ]
                        }),
                        "tokenIds" in t && t.tokenIds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Token IDs"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                    children: t.tokenIds.join(", ")
                                })
                            ]
                        })
                    ]
                }),
                "approve" === c && t.spender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                            children: "Spender"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                address: t.spender,
                                url: o?.blockExplorers?.default?.url,
                                showCopyIcon: !1
                            })
                        })
                    ]
                }),
                ("transferFrom" === c || "safeTransferFrom" === c || "safeBatchTransferFrom" === c) && t.transferFrom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                            children: "Transferring from"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                address: t.transferFrom,
                                url: o?.blockExplorers?.default?.url,
                                showCopyIcon: !1
                            })
                        })
                    ]
                }),
                ("transferFrom" === c || "safeTransferFrom" === c || "safeBatchTransferFrom" === c) && t.transferTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                            children: "Transferring to"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                address: t.transferTo,
                                url: o?.blockExplorers?.default?.url,
                                showCopyIcon: !1
                            })
                        })
                    ]
                })
            ]
        })
    });
}, H = ({ variant: i, setPreventMaliciousTransaction: o, colorScheme: t = "light", preventMaliciousTransaction: a })=>"warn" === i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(U, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WarningBanner$2d$BDp$2d$QC9i$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["W"], {
            theme: t,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    style: {
                        fontWeight: "500"
                    },
                    children: "Warning: Suspicious transaction"
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("br", {}),
                "This has been flagged as a potentially deceptive request. Approving could put your assets or funds at risk."
            ]
        })
    }) : "error" === i ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(U, {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorBanner$2d$BdiArMwu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], {
                    theme: t,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("strong", {
                                children: "This is a malicious transaction"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("br", {}),
                            "This transaction transfers tokens to a known malicious address. Proceeding may result in the loss of valuable assets."
                        ]
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(q, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Checkbox$2d$NmGCZeKL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["C"], {
                            color: "var(--privy-color-error)",
                            checked: !a,
                            readOnly: !0,
                            onClick: ()=>o(!a)
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            children: "I understand and want to proceed anyways."
                        })
                    ]
                })
            ]
        })
    }) : null;
let U = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "BannerContainer",
    componentId: "sc-ab8a5a0b-0"
})([
    "margin-top:1.5rem;"
]), q = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CheckboxContainer",
    componentId: "sc-ab8a5a0b-1"
})([
    "display:flex;align-items:center;gap:0.5rem;margin-top:0.75rem;"
]);
const J = ({ transactionIndex: e, maxIndex: n })=>"number" != typeof e || 0 === n ? "" : ` (${e + 1} / ${n + 1})`, Q = ({ img: l, submitError: d, prepareError: p, onClose: k, action: C, title: N, subtitle: A, to: j, tokenAddress: E, network: M, missingFunds: $, fee: O, from: D, cta: F, disabled: L, chain: R, isSubmitting: W, isPreparing: z, isTokenPriceLoading: U, isTokenContractInfoLoading: q, isSponsored: Q, symbol: Y, balance: G, onClick: ne, transactionDetails: re, transactionIndex: ie, maxIndex: oe, onBack: te, chainName: ae, validation: le, hasScanDetails: de, setIsScanDetailsOpen: ce, preventMaliciousTransaction: se, setPreventMaliciousTransaction: he, tokensSent: me, tokensReceived: pe, isScanning: ue, isCancellable: fe, functionName: ge })=>{
    let { showTransactionDetails: ye, setShowTransactionDetails: be, hasMoreDetails: xe, isErc20Ish: ke } = ((e)=>{
        let [n, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), i = !0, o = !1;
        return (!e || e.isErc20Ish || "transaction" === e.action) && (i = !1), i && (o = Object.entries(e || {}).some(([e, n])=>n && ![
                "action",
                "isErc20Ish",
                "isNFTIsh"
            ].includes(e))), {
            showTransactionDetails: n,
            setShowTransactionDetails: r,
            hasMoreDetails: i && o,
            isErc20Ish: e?.isErc20Ish
        };
    })(re), we = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), ve = ke && q || z || U || ue; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["M"], {
                onClose: k,
                backFn: te
            }),
            l && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Z, {
                children: l
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Title$2d$D0pfZff$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["T"], {
                style: {
                    marginTop: l ? "1.5rem" : 0
                },
                children: [
                    N,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(J, {
                        maxIndex: oe,
                        transactionIndex: ie
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Subtitle$2d$DkvfP2Ev$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
                children: A
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"], {
                style: {
                    marginTop: "2rem"
                },
                children: [
                    (!!me[0] || ve) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            pe.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Send"
                            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "approve" === C ? "Approval amount" : "Amount"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: "flex flex-col",
                                children: me.map((n, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(P, {
                                        iconUrl: n.iconUrl,
                                        value: "setApprovalForAll" === ge ? "All" : n.value,
                                        usdValue: n.usdValue,
                                        symbol: n.symbol,
                                        nftName: n.nftName,
                                        nftCount: n.nftCount,
                                        decimals: n.decimals
                                    }, r))
                            })
                        ]
                    }),
                    pe.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Receive"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: "flex flex-col",
                                children: pe.map((n, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(P, {
                                        iconUrl: n.iconUrl,
                                        value: n.value,
                                        usdValue: n.usdValue,
                                        symbol: n.symbol,
                                        nftName: n.nftName,
                                        nftCount: n.nftCount,
                                        decimals: n.decimals
                                    }, r))
                            })
                        ]
                    }),
                    re && "spender" in re && re?.spender ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Spender"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                    address: re.spender,
                                    url: R?.blockExplorers?.default?.url
                                })
                            })
                        ]
                    }) : null,
                    j && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "To"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                    address: j,
                                    url: R?.blockExplorers?.default?.url,
                                    showCopyIcon: !0
                                })
                            })
                        ]
                    }),
                    E && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Token address"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                    address: E,
                                    url: R?.blockExplorers?.default?.url
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Network"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: M
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Estimated fee"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                $isLoading: z || U || void 0 === Q,
                                children: Q ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(_, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(ee, {
                                            children: [
                                                "Sponsored by ",
                                                we.name
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__["BoltIcon"], {
                                            height: 16,
                                            width: 16
                                        })
                                    ]
                                }) : O
                            })
                        ]
                    }),
                    xe && !de && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                className: "cursor-pointer",
                                onClick: ()=>be(!ye),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"], {
                                    className: "flex items-center gap-x-1",
                                    children: [
                                        "Details",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                            style: {
                                                width: "0.75rem",
                                                marginLeft: "0.25rem",
                                                transform: ye ? "rotate(180deg)" : void 0
                                            }
                                        })
                                    ]
                                })
                            }),
                            ye && re && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(V, {
                                action: C,
                                chain: R,
                                transactionDetails: re,
                                isTokenContractInfoLoading: q,
                                symbol: Y
                            })
                        ]
                    }),
                    de && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(B, {
                            onClick: ()=>ce(!0),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    className: "text-color-primary",
                                    children: "Details"
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowRightIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightIcon$3e$__["ArrowRightIcon"], {
                                    height: "14px",
                                    width: "14px",
                                    strokeWidth: "2"
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Y"], {}),
            d ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], {
                style: {
                    marginTop: "2rem"
                },
                children: d.message
            }) : p && 0 === ie ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], {
                style: {
                    marginTop: "2rem"
                },
                children: p.shortMessage ?? K
            }) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(H, {
                variant: le,
                preventMaliciousTransaction: se,
                setPreventMaliciousTransaction: he
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(X, {
                $useSmallMargins: !(!p && !d && "warn" !== le && "error" !== le),
                address: D,
                balance: G,
                errMsg: z || p || d || !$ ? void 0 : `Add funds on ${R?.name ?? ae} to complete transaction.`
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"], {
                style: {
                    marginTop: "1rem"
                },
                loading: W,
                disabled: L || z,
                onClick: ne,
                children: F
            }),
            fe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], {
                style: {
                    marginTop: "1rem"
                },
                onClick: k,
                isSubmitting: !1,
                children: "Not now"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {})
        ]
    });
}, Y = ({ img: o, title: l, subtitle: s, cta: p, instructions: g, network: C, blockExplorerUrl: N, isMissingFunds: A, submitError: j, parseError: E, total: M, swap: $, transactingWalletAddress: O, fee: D, balance: F, disabled: L, isSubmitting: P, isPreparing: R, isTokenPriceLoading: W, onClick: z, onClose: V, onBack: H, isSponsored: U })=>{
    let q = R || W, [J, Q] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["M"], {
                onClose: V,
                backFn: H
            }),
            o && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Z, {
                children: o
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Title$2d$D0pfZff$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["T"], {
                style: {
                    marginTop: o ? "1.5rem" : 0
                },
                children: l
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Subtitle$2d$DkvfP2Ev$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
                children: s
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"], {
                style: {
                    marginTop: "2rem",
                    marginBottom: ".5rem"
                },
                children: [
                    (M || q) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Amount"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                $isLoading: q,
                                children: M
                            })
                        ]
                    }),
                    $ && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Swap"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: $
                            })
                        ]
                    }),
                    C && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Network"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                children: C
                            })
                        ]
                    }),
                    (D || q || void 0 !== U) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                children: "Estimated fee"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                $isLoading: q,
                                children: U && !q ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(_, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(ee, {
                                            children: [
                                                "Sponsored by ",
                                                Y.name
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__["BoltIcon"], {
                                            height: 16,
                                            width: 16
                                        })
                                    ]
                                }) : D
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(B, {
                    onClick: ()=>Q((e)=>!e),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            children: "Advanced"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                            height: "16px",
                            width: "16px",
                            strokeWidth: "2",
                            style: {
                                transition: "all 300ms",
                                transform: J ? "rotate(180deg)" : void 0
                            }
                        })
                    ]
                })
            }),
            J && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: g.map((r, i)=>"sol-transfer" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Transfer ",
                                        r.withSeed ? "with seed" : ""
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Amount"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])({
                                                amount: r.value,
                                                decimals: r.token.decimals
                                            }),
                                            " ",
                                            r.token.symbol
                                        ]
                                    })
                                ]
                            }),
                            !!r.toAccount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Destination"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.toAccount,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "spl-transfer" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Transfer ",
                                        r.token.symbol
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Amount"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.value.toString()
                                    })
                                ]
                            }),
                            !!r.fromAta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Source"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.fromAta,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.toAta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Destination"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.toAta,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.token.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.token.address,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "ata-creation" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Create token account"
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Program ID"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.program,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.owner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Owner"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.owner,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "create-account" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Create account ",
                                        r.withSeed ? "with seed" : ""
                                    ]
                                })
                            }),
                            !!r.account && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Account"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.account,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Amount"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])({
                                                amount: r.value,
                                                decimals: 9
                                            }),
                                            " SOL"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, i) : "spl-init-account" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Initialize token account"
                                })
                            }),
                            !!r.account && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Account"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.account,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.mint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Mint"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mint,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.owner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Owner"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.owner,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "spl-close-account" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Close token account"
                                })
                            }),
                            !!r.source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Source"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.source,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.destination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Destination"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.destination,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            !!r.owner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Owner"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.owner,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "spl-sync-native" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: "Sync native"
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Program ID"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.program,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "raydium-swap-base-input" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Raydium swap",
                                        " ",
                                        r.tokenIn && r.tokenOut ? `${r.tokenIn.symbol} → ${r.tokenOut.symbol}` : ""
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Amount in"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.amountIn.toString()
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Minimum amount out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.minimumAmountOut.toString()
                                    })
                                ]
                            }),
                            r.mintIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token in"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintIn,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            r.mintOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintOut,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "raydium-swap-base-output" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Raydium swap",
                                        " ",
                                        r.tokenIn && r.tokenOut ? `${r.tokenIn.symbol} → ${r.tokenOut.symbol}` : ""
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Max amount in"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.maxAmountIn.toString()
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Amount out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.amountOut.toString()
                                    })
                                ]
                            }),
                            r.mintIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token in"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintIn,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            r.mintOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintOut,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "jupiter-swap-shared-accounts-route" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Jupiter swap",
                                        " ",
                                        r.tokenIn && r.tokenOut ? `${r.tokenIn.symbol} → ${r.tokenOut.symbol}` : ""
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "In amount"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.inAmount.toString()
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Quoted out amount"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.quotedOutAmount.toString()
                                    })
                                ]
                            }),
                            r.mintIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token in"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintIn,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            r.mintOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintOut,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : "jupiter-swap-exact-out-route" === r.type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$LabelXs$2d$BOisBtqT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                    children: [
                                        "Jupiter swap",
                                        " ",
                                        r.tokenIn && r.tokenOut ? `${r.tokenIn.symbol} → ${r.tokenOut.symbol}` : ""
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Quoted in amount"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.quotedInAmount.toString()
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Amount out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.outAmount.toString()
                                    })
                                ]
                            }),
                            r.mintIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token in"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintIn,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            r.mintOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Token out"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.mintOut,
                                            url: N
                                        })
                                    })
                                ]
                            })
                        ]
                    }, i) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(G, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Program ID"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                                            address: r.program,
                                            url: N
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L"], {
                                        children: "Data"
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Value$2d$B4M62ove$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V"], {
                                        children: r.discriminator
                                    })
                                ]
                            })
                        ]
                    }, i))
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Y"], {}),
            j ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], {
                style: {
                    marginTop: "2rem"
                },
                children: j.message
            }) : E ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorMessage$2d$Cx8GKGhL$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], {
                style: {
                    marginTop: "2rem"
                },
                children: K
            }) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(X, {
                $useSmallMargins: !(!E && !j),
                title: "",
                address: O,
                balance: F,
                errMsg: R || E || j || !A ? void 0 : "Add funds on Solana to complete transaction."
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"], {
                style: {
                    marginTop: "1rem"
                },
                loading: P,
                disabled: L || R,
                onClick: z,
                children: p
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {})
        ]
    });
};
let X = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletInfoCard$2d$COAfUoX0$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["W"]).withConfig({
    displayName: "StyledWalletInfoCard",
    componentId: "sc-cbe5ab37-0"
})([
    "",
    ""
], (e)=>e.$useSmallMargins ? "margin-top: 0.5rem;" : "margin-top: 2rem;"), G = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Row$2d$CG0lSY5Z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"]).withConfig({
    displayName: "InstructionRows",
    componentId: "sc-cbe5ab37-1"
})([
    "margin-top:0.5rem;border:1px solid var(--privy-color-foreground-4);border-radius:var(--privy-border-radius-sm);padding:0.5rem;"
]), K = "There was an error preparing your transaction. Your transaction request will likely fail.", Z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ImageContainer",
    componentId: "sc-cbe5ab37-2"
})([
    "display:flex;width:100%;justify-content:center;max-height:40px;> img{object-fit:contain;border-radius:var(--privy-border-radius-sm);}"
]), _ = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "SponsoredRow",
    componentId: "sc-cbe5ab37-3"
})([
    "display:inline-flex;align-items:center;gap:0.3rem;"
]), ee = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "SponsoredText",
    componentId: "sc-cbe5ab37-4"
})([
    "font-size:14px;font-weight:500;color:var(--privy-color-foreground);"
]);
let ne = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(ae, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(de, {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(le, {})
        ]
    });
const re = ({ transactionError: i, chainId: o, onClose: t, onRetry: l, chainType: d, transactionHash: c })=>{
    let { chains: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), [m, u] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), { errorCode: f, errorMessage: g } = ((e, n)=>{
        if ("ethereum" === n) return {
            errorCode: e.details ?? e.message,
            errorMessage: e.shortMessage
        };
        let r = e.txSignature, i = e?.transactionMessage || "Something went wrong.";
        if (Array.isArray(e.logs)) {
            let n = e.logs.find((e)=>/insufficient (lamports|funds)/gi.test(e));
            n && (i = n);
        }
        return {
            transactionHash: r,
            errorMessage: i
        };
    })(i, d), y = (({ chains: e, chainId: n, chainType: r, transactionHash: i })=>"ethereum" === r ? e.find((e)=>e.id === n)?.blockExplorers?.default.url ?? "https://etherscan.io" : function(e, n) {
            return `https://explorer.solana.com/tx/${e}?chain=${n}`;
        }(i || "", n))({
        chains: s,
        chainId: o,
        chainType: d,
        transactionHash: c
    }); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["M"], {
                onClose: t
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(ie, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ne, {}),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(oe, {
                        children: f
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(te, {
                        children: "Please try again."
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(he, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(se, {
                                children: "Error message"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(pe, {
                                $clickable: !1,
                                children: g
                            })
                        ]
                    }),
                    c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(he, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(se, {
                                children: "Transaction hash"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(me, {
                                children: [
                                    "Copy this hash to view details about the transaction on a",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("u", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
                                            href: y,
                                            children: "block explorer"
                                        })
                                    }),
                                    "."
                                ]
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(pe, {
                                $clickable: !0,
                                onClick: async ()=>{
                                    await navigator.clipboard.writeText(c), u(!0);
                                },
                                children: [
                                    c,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ge, {
                                        clicked: m
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ce, {
                        onClick: ()=>l({
                                resetNonce: !!c
                            }),
                        children: "Retry transaction"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"], {})
        ]
    });
};
let ie = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TransactionErrorScreenContainer",
    componentId: "sc-d58f10e6-0"
})([
    "display:flex;flex-direction:column;align-items:center;justify-content:center;"
]), oe = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "ErrorCode",
    componentId: "sc-d58f10e6-1"
})([
    "color:var(--privy-color-foreground);text-align:center;font-size:1.125rem;font-weight:500;line-height:1.25rem;text-align:center;margin:10px;"
]), te = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "Subtitle",
    componentId: "sc-d58f10e6-2"
})([
    "margin-top:4px;margin-bottom:10px;color:var(--privy-color-foreground-3);text-align:center;font-size:0.875rem;font-style:normal;font-weight:400;line-height:20px;letter-spacing:-0.008px;"
]), ae = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CircleContainer",
    componentId: "sc-d58f10e6-3"
})([
    "position:relative;width:60px;height:60px;margin:10px;display:flex;justify-content:center;align-items:center;"
]), le = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]).withConfig({
    displayName: "StyledExclamationCircleIcon",
    componentId: "sc-d58f10e6-4"
})([
    "position:absolute;width:35px;height:35px;color:var(--privy-color-error);"
]), de = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledRedCircle",
    componentId: "sc-d58f10e6-5"
})([
    "position:absolute;width:60px;height:60px;border-radius:50%;background-color:var(--privy-color-error);opacity:0.1;"
]), ce = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"]).withConfig({
    displayName: "RetryButton",
    componentId: "sc-d58f10e6-6"
})([
    "&&{margin-top:24px;}transition:color 350ms ease,background-color 350ms ease;"
]), se = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "TextBoxTitle",
    componentId: "sc-d58f10e6-7"
})([
    "width:100%;text-align:left;font-size:0.825rem;color:var(--privy-color-foreground);padding:4px;"
]), he = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TextBoxContainer",
    componentId: "sc-d58f10e6-8"
})([
    "width:100%;margin:5px;display:flex;flex-direction:column;justify-content:center;align-items:center;"
]), me = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].text.withConfig({
    displayName: "HelperText",
    componentId: "sc-d58f10e6-9"
})([
    "position:relative;width:100%;padding:5px;font-size:0.8rem;color:var(--privy-color-foreground-3);text-align:left;word-wrap:break-word;"
]), pe = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "TextBox",
    componentId: "sc-d58f10e6-10"
})([
    "position:relative;width:100%;background-color:var(--privy-color-background-2);padding:8px 12px;border-radius:10px;margin-top:5px;font-size:14px;color:var(--privy-color-foreground-3);text-align:left;word-wrap:break-word;",
    ""
], (e)=>e.$clickable && "cursor: pointer;\n  transition: background-color 0.3s;\n  padding-right: 45px;\n\n  &:hover {\n    background-color: var(--privy-color-foreground-4);\n  }"), ue = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardDocumentIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]).withConfig({
    displayName: "StyledClipboardIcon",
    componentId: "sc-d58f10e6-11"
})([
    "position:absolute;top:13px;right:13px;width:24px;height:24px;"
]), fe = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardDocumentCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]).withConfig({
    displayName: "StyledClipboardCheckIcon",
    componentId: "sc-d58f10e6-12"
})([
    "position:absolute;top:13px;right:13px;width:24px;height:24px;"
]), ge = ({ clicked: n })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(n ? fe : ue, {});
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const i = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "BottomPusherContainer",
    componentId: "sc-cb963810-0"
})([
    "display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;margin-top:auto;gap:16px;flex-grow:100;"
]), t = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "CenteredItem",
    componentId: "sc-cb963810-1"
})([
    "display:flex;flex-direction:column;align-items:center;justify-content:center;flex-grow:1;width:100%;"
]), o = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "HorizontallyCenteredItem",
    componentId: "sc-cb963810-2"
})([
    "display:flex;flex-direction:column;align-items:center;width:100%;"
]), n = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(t).withConfig({
    displayName: "CenteredItemWithPadding",
    componentId: "sc-cb963810-3"
})([
    "padding:20px 0;"
]), a = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(t).withConfig({
    displayName: "CenteredItemWithGap",
    componentId: "sc-cb963810-4"
})([
    "gap:16px;"
]), d = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FlexContainer",
    componentId: "sc-cb963810-5"
})([
    "display:flex;flex-direction:column;width:100%;"
]), c = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "FixedGappedContainer",
    componentId: "sc-cb963810-6"
})([
    "display:flex;flex-direction:column;gap:8px;"
]), p = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledCalloutSection",
    componentId: "sc-cb963810-8"
})([
    "display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;text-align:left;gap:8px;padding:16px;margin-top:16px;margin-bottom:16px;width:100%;background:var(--privy-color-background-2);border-radius:var(--privy-border-radius-md);&& h4{color:var(--privy-color-foreground-3);font-size:14px;text-decoration:underline;font-weight:medium;}&& p{color:var(--privy-color-foreground-3);font-size:14px;}"
]), r = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "RefactorSpacerTop",
    componentId: "sc-cb963810-9"
})([
    "height:16px;"
]), l = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "RefactorSpacerBottom",
    componentId: "sc-cb963810-10"
})([
    "height:12px;"
]), s = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ConfigurableSpacer",
    componentId: "sc-cb963810-12"
})([
    "height:",
    "px;"
], (e)=>e.height ?? "12");
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenHeader-Biz1wq02.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>r,
    "S",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
;
const o = ({ title: n, description: o, children: r, ...c })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(l, {
        ...c,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                    children: n
                }),
                "string" == typeof o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    children: o
                }) : o,
                r
            ]
        })
    }), r = ({ title: i, description: n, icon: o, children: r, ...l })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(c, {
        ...l,
        children: [
            o || null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                children: i
            }),
            n && "string" == typeof n ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
                children: n
            }) : n,
            r
        ]
    });
let l = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledSection",
    componentId: "sc-523a75d6-1"
})([
    "display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;text-align:left;gap:8px;width:100%;margin-bottom:24px;&& h3{font-size:17px;color:var(--privy-color-foreground);}&& p{color:var(--privy-color-foreground-2);font-size:14px;}"
]), c = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(l).withConfig({
    displayName: "CenteredStyledSection",
    componentId: "sc-523a75d6-2"
})([
    "align-items:center;text-align:center;gap:16px;h3{margin-bottom:24px;}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getFormattedUsdFromLamports-B6EqSEho.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/transaction-CnfuREWo.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>n,
    "g",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getFormattedUsdFromLamports-B6EqSEho.mjs [app-ssr] (ecmascript)");
;
function t(e, t1 = 6, n = !1, r = !1) {
    let o = (parseFloat(e.toString()) / 1e9).toFixed(t1).replace(/0+$/, "").replace(/\.$/, ""), i = r ? "" : " SOL";
    return n ? `${o}${i}` : `${"0" === o ? "<0.001" : o}${i}`;
}
function n({ amount: n, fee: r, tokenPrice: o, isUsdc: i }) {
    let a = BigInt(Math.floor(parseFloat(n) * 10 ** (i ? 6 : 9))), s = i ? a : a + r;
    return {
        fundingAmountInBaseUnit: a,
        fundingAmountInUsd: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(a, o) : void 0,
        totalPriceInUsd: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(s, o) : void 0,
        totalPriceInNativeCurrency: t(s),
        feePriceInNativeCurrency: t(r),
        feePriceInUsd: o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(r, o) : void 0
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/WalletLink-Cj92ni3W.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "H",
    ()=>p,
    "P",
    ()=>h,
    "S",
    ()=>f,
    "W",
    ()=>k
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatUnits.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ethers-Bl5aM5Gz.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getFormattedUsdFromLamports-B6EqSEho.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transaction$2d$CnfuREWo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/transaction-CnfuREWo.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const p = ({ weiQuantities: t, tokenPrice: i, tokenSymbol: n })=>{
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["s"])(t), c = i ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(o, i) : void 0, l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(o, n); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
        children: c || l
    });
}, h = ({ weiQuantities: n, tokenPrice: o, tokenSymbol: c })=>{
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["s"])(n), d = o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(l, o) : void 0, m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(l, c); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
        children: d ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(g, {
                    children: "USD"
                }),
                "<$0.01" === d ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(x, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
                            children: "<"
                        }),
                        "$0.01"
                    ]
                }) : d
            ]
        }) : m
    });
}, f = ({ quantities: n, tokenPrice: r, tokenSymbol: a = "SOL", tokenDecimals: s = 9 })=>{
    let c = n.reduce((e, t)=>e + t, 0n), m = r && "SOL" === a && 9 === s ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getFormattedUsdFromLamports$2d$B6EqSEho$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(c, r) : void 0, p = "SOL" === a && 9 === s ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transaction$2d$CnfuREWo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(c) : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUnits"])(c, s)} ${a}`; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
        children: m ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: "<$0.01" === m ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(x, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
                        children: "<"
                    }),
                    "$0.01"
                ]
            }) : m
        }) : p
    });
};
let y = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "StyledPriceDisplay",
    componentId: "sc-3cd56c8a-0"
})([
    "font-size:14px;line-height:140%;display:flex;gap:4px;align-items:center;"
]), g = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "StyledPriceUnit",
    componentId: "sc-3cd56c8a-1"
})([
    "font-size:12px;line-height:12px;color:var(--privy-color-foreground-3);"
]), u = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "TinyLessThan",
    componentId: "sc-3cd56c8a-2"
})([
    "font-size:10px;"
]), x = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].span.withConfig({
    displayName: "FlexCenter",
    componentId: "sc-3cd56c8a-3"
})([
    "display:flex;align-items:center;"
]);
function S(e, t) {
    return `https://explorer.solana.com/account/${e}?chain=${t}`;
}
const k = (t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(w, {
        href: "ethereum" === t.chainType ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["b"])(t.chainId, t.walletAddress) : S(t.walletAddress, t.chainId),
        target: "_blank",
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["D"])(t.walletAddress)
    });
let w = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].a.withConfig({
    displayName: "StyledLink",
    componentId: "sc-dd6c0f9f-0"
})([
    "&:hover{text-decoration:underline;}"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TransactionDetails-BdW2lq_B.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "T",
    ()=>V
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletLink$2d$Cj92ni3W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/WalletLink-Cj92ni3W.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ethers-Bl5aM5Gz.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const m = ({ label: n, children: t, valueStyles: o })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(v, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                children: n
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(u, {
                style: {
                    ...o
                },
                children: t
            })
        ]
    });
let v = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "StyledDetailsRow",
    componentId: "sc-4ebfdd45-0"
})([
    "display:flex;align-items:center;justify-content:space-between;width:100%;> :first-child{color:var(--privy-color-foreground-3);text-align:left;}> :last-child{color:var(--privy-color-foreground-2);text-align:right;}"
]), u = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ValueWrapper",
    componentId: "sc-4ebfdd45-1"
})([
    "font-size:14px;line-height:100%;display:flex;align-items:center;justify-content:center;border-radius:var(--privy-border-radius-full);background-color:var(--privy-color-background-2);padding:4px 8px;"
]);
const y = ({ gas: n, tokenPrice: t, tokenSymbol: r })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["F"], {
        style: {
            paddingBottom: "12px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(w, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(I, {
                        children: "Est. Fees"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletLink$2d$Cj92ni3W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"], {
                            weiQuantities: [
                                BigInt(n)
                            ],
                            tokenPrice: t,
                            tokenSymbol: r
                        })
                    })
                ]
            }),
            t && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(b, {
                children: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(BigInt(n), r)}`
            })
        ]
    }), x = ({ value: n, gas: t, tokenPrice: r, tokenSymbol: l })=>{
    let c = BigInt(n ?? 0) + BigInt(t); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["F"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(w, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(I, {
                        children: "Total (including fees)"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletLink$2d$Cj92ni3W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"], {
                            weiQuantities: [
                                BigInt(n || 0),
                                BigInt(t)
                            ],
                            tokenPrice: r,
                            tokenSymbol: l
                        })
                    })
                ]
            }),
            r && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(b, {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(c, l)
            })
        ]
    });
};
let w = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TransactionTotalRow",
    componentId: "sc-f8ef9b74-0"
})([
    "display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-top:4px;"
]), b = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ValueConversionRow",
    componentId: "sc-f8ef9b74-1"
})([
    "display:flex;flex-direction:row;height:12px;font-size:12px;line-height:12px;color:var(--privy-color-foreground-3);font-weight:400;"
]), I = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TotalText",
    componentId: "sc-f8ef9b74-2"
})([
    "font-size:14px;line-height:22.4px;font-weight:400;"
]);
const C = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(void 0), k = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(void 0), P = ({ defaultValue: e, children: n })=>{
    let [t, o] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(e || null); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(C.Provider, {
        value: {
            activePanel: t,
            togglePanel: (e)=>{
                o(t === e ? null : e);
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(j, {
            children: n
        })
    });
}, T = ({ value: e, children: n })=>{
    let { activePanel: t, togglePanel: o } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(C), r = t === e; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(k.Provider, {
        value: {
            onToggle: ()=>o(e),
            value: e
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(D, {
            isActive: r ? "true" : "false",
            "data-open": String(r),
            children: n
        })
    });
}, N = ({ children: t })=>{
    let { activePanel: o } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(C), { onToggle: r, value: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(k), d = o === l; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(B, {
                onClick: r,
                "data-open": String(d),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(z, {
                        children: t
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(R, {
                        isactive: d ? "true" : "false",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            height: "16px",
                            width: "16px",
                            strokeWidth: "2"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(W, {})
        ]
    });
}, A = ({ children: e })=>{
    let { activePanel: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(C), { value: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(k); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(F, {
        "data-open": String(n === t),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Q, {
            children: e
        })
    });
}, S = ({ children: e })=>{
    let { activePanel: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(C), { value: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(k); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Q, {
        children: "function" == typeof e ? e({
            isActive: n === t
        }) : e
    });
};
let j = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionRoot",
    componentId: "sc-d25f9267-0"
})([
    "display:flex;flex-direction:column;width:100%;gap:8px;"
]), B = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionTriggerContainer",
    componentId: "sc-d25f9267-1"
})([
    "display:flex;justify-content:space-between;align-items:center;width:100%;cursor:pointer;padding-bottom:8px;"
]), W = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionDivider",
    componentId: "sc-d25f9267-2"
})([
    "width:100%;&&{border-top:1px solid;border-color:var(--privy-color-foreground-4);}padding-bottom:12px;"
]), z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionTriggerContent",
    componentId: "sc-d25f9267-3"
})([
    "font-size:14px;font-weight:500;line-height:19.6px;width:100%;padding-right:8px;"
]), D = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionPanelContainer",
    componentId: "sc-d25f9267-4"
})([
    "display:flex;flex-direction:column;width:100%;overflow:hidden;padding:12px;&&{border:1px solid;border-color:var(--privy-color-foreground-4);border-radius:var(--privy-border-radius-md);}"
]), F = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionContentContainer",
    componentId: "sc-d25f9267-5"
})([
    "position:relative;overflow:hidden;transition:max-height 25ms ease-out;&[data-open='true']{max-height:700px;}&[data-open='false']{max-height:0;}"
]), Q = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "ContentWrapper",
    componentId: "sc-d25f9267-6"
})([
    "display:flex;flex-direction:column;gap:12px;flex:1 1 auto;min-height:1px;"
]), R = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "IconWrapper",
    componentId: "sc-d25f9267-7"
})([
    "transform:",
    ";"
], (e)=>"true" === e.isactive ? "rotate(180deg)" : "rotate(0deg)");
const V = ({ from: n, to: t, txn: o, transactionInfo: d, tokenPrice: a, gas: c, tokenSymbol: s })=>{
    let p = BigInt(o?.value || 0); /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(P, {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])().render.standalone ? {
            defaultValue: "details"
        } : {},
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(T, {
            value: "details",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(N, {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(L, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                children: d?.title || "Details"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(E, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletLink$2d$Cj92ni3W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["H"], {
                                    weiQuantities: [
                                        p
                                    ],
                                    tokenPrice: a,
                                    tokenSymbol: s
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(A, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(m, {
                            label: "From",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletLink$2d$Cj92ni3W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["W"], {
                                walletAddress: n,
                                chainId: o.chainId || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["s"],
                                chainType: "ethereum"
                            })
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(m, {
                            label: "To",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$WalletLink$2d$Cj92ni3W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["W"], {
                                walletAddress: t,
                                chainId: o.chainId || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["s"],
                                chainType: "ethereum"
                            })
                        }),
                        d && d.action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(m, {
                            label: "Action",
                            children: d.action
                        }),
                        c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(y, {
                            value: o.value,
                            gas: c,
                            tokenPrice: a,
                            tokenSymbol: s
                        })
                    ]
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(S, {
                    children: ({ isActive: e })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(x, {
                            value: o.value,
                            displayFee: e,
                            gas: c || "0x0",
                            tokenPrice: a,
                            tokenSymbol: s
                        })
                })
            ]
        })
    });
};
let L = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "AccordionTriggerContent",
    componentId: "sc-2eff9f5c-0"
})([
    "display:flex;flex-direction:row;justify-content:space-between;"
]), E = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "TotalText",
    componentId: "sc-2eff9f5c-1"
})([
    "flex-shrink:0;padding-left:8px;"
]);
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/transfer-CMPmjPsM.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "E",
    ()=>t
]);
const t = [
    {
        constant: !1,
        inputs: [
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_value",
                type: "uint256"
            }
        ],
        name: "transfer",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
];
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-DNmMGazz.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendTransactionScreen",
    ()=>bt,
    "default",
    ()=>bt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/createPublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/encoding/toHex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeFunctionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/abi/decodeFunctionData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/utils/unit/formatEther.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/utils/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/utils/formatters.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/js-sdk-core/dist/esm/embedded/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Address-BUmpXgsy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/context-DRLoVlsO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$prepareFundingModalData$2d$BVTcQcmw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/prepareFundingModalData-BVTcQcmw.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/internal-context-e-Eni5bG.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/get-is-unified-wallet-gMDXpX6C.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetTokenPrice$2d$CDPxMEO$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useGetTokenPrice-CDPxMEO-.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWalletBalance$2d$CkNw6kj0$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useWalletBalance-CkNw6kj0.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getErc20TokenInfo$2d$BFoeg5F6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getErc20TokenInfo-BFoeg5F6.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$formatErc20TokenAmount$2d$BuPk9xcy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/formatErc20TokenAmount-BuPk9xcy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ethers-Bl5aM5Gz.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/useActiveWallet-BeOB3HTh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/getPublicClient-A9RSftUZ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorScreen$2d$Yi$2d$Rhs0v$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ErrorScreen-Yi-Rhs0v.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ModalHeader-BTru6YQw.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$JsonTree$2d$Bvd2C29R$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/JsonTree-Bvd2C29R.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransactionErrorView$2d$RLIeHdul$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TransactionErrorView-RLIeHdul.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Button-BCV6mjvS.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/Layouts-Bmf8DxNP.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenHeader$2d$Biz1wq02$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/ScreenHeader-Biz1wq02.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransactionDetails$2d$BdW2lq_B$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TransactionDetails-BdW2lq_B.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transfer$2d$CMPmjPsM$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/transfer-CMPmjPsM.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/index-NL2cPmJD.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$tinycolor2$2f$esm$2f$tinycolor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/tinycolor2/esm/tinycolor.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/eventemitter3/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$react$2d$device$2d$detect$2f$dist$2f$lib$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/react-device-detect/dist/lib.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/x402/dist/esm/client/index.mjs [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
let Q = [
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
], z = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"].div.withConfig({
    displayName: "Container",
    componentId: "sc-31acb2bc-0"
})([
    "display:flex;flex-direction:column;min-height:72px;"
]);
var J = ({ onBack: n, details: a })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(z, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["M"], {
                backFn: n
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$JsonTree$2d$Bvd2C29R$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["D"], {
                data: a
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {})
        ]
    });
let K = ({ gasUsed: t, effectiveGasPrice: e })=>{
    if (t && e) try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"])(t * e);
    } catch (t) {
        return;
    }
};
const X = ({ txn: a, receipt: s, transactionInfo: i, onClose: o, tokenPrice: r, tokenSymbol: p, receiptHeader: l, receiptDescription: u })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["M"], {
                onClose: o
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ScreenHeader$2d$Biz1wq02$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
                title: l ?? "Transaction complete!",
                description: u ?? "You're all set."
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransactionDetails$2d$BdW2lq_B$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["T"], {
                tokenPrice: r,
                from: s.from,
                to: s.to,
                gas: K(s),
                txn: a,
                transactionInfo: i,
                tokenSymbol: p
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Y"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Y, {
                loading: !1,
                onClick: o,
                children: "All Done"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Layouts$2d$Bmf8DxNP$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["R"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ModalHeader$2d$BTru6YQw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"], {})
        ]
    });
let Y = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Button$2d$BCV6mjvS$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"]).withConfig({
    displayName: "SubmitButton",
    componentId: "sc-f70d0f7a-0"
})([
    "&&{margin-top:24px;}transition:color 350ms ease,background-color 350ms ease;"
]);
const Z = [
    {
        constant: !1,
        inputs: [
            {
                name: "_salt",
                type: "bytes32"
            },
            {
                name: "_initializer",
                type: "bytes"
            }
        ],
        name: "deployAccount",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], tt = [
    {
        name: "from",
        type: "address"
    },
    {
        name: "param2",
        type: "address"
    },
    {
        name: "param3",
        type: "bytes"
    },
    {
        name: "param4",
        type: "tuple",
        components: []
    },
    {
        type: "tuple",
        components: [
            {
                name: "param5",
                type: "address"
            },
            {
                name: "param6",
                type: "uint256"
            },
            {
                name: "param7",
                type: "uint256"
            },
            {
                name: "encodedInitData",
                type: "bytes"
            }
        ]
    }
], et = [
    {
        constant: !1,
        inputs: [
            {
                name: "spender",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], nt = [
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "quantity",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "quantity",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]"
            },
            {
                internalType: "uint256[]",
                name: "quantities",
                type: "uint256[]"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "mintBatch",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]"
            },
            {
                internalType: "uint256[]",
                name: "quantities",
                type: "uint256[]"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "mintBatch",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "quantity",
                type: "uint256"
            }
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "quantity",
                type: "uint256"
            }
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "string",
                name: "uri",
                type: "string"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "string",
                name: "uri",
                type: "string"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            },
            {
                internalType: "string",
                name: "uri",
                type: "string"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            },
            {
                internalType: "string",
                name: "uri",
                type: "string"
            }
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "batchMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "batchMint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    }
], at = [
    {
        constant: !1,
        inputs: [
            {
                name: "_from",
                type: "address"
            },
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_tokenId",
                type: "uint256"
            }
        ],
        name: "safeTransferFrom",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], st = [
    {
        constant: !1,
        inputs: [
            {
                name: "_operator",
                type: "address"
            },
            {
                name: "_approved",
                type: "bool"
            }
        ],
        name: "setApprovalForAll",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], it = [
    {
        constant: !1,
        inputs: [
            {
                name: "_from",
                type: "address"
            },
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_tokenId",
                type: "uint256"
            }
        ],
        name: "transferFrom",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], ot = [
    {
        constant: !1,
        inputs: [
            {
                name: "_from",
                type: "address"
            },
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_tokenIds",
                type: "uint256[]"
            },
            {
                name: "_amounts",
                type: "uint256[]"
            },
            {
                name: "_data",
                type: "bytes"
            }
        ],
        name: "safeBatchTransferFrom",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], rt = [
    {
        constant: !1,
        inputs: [
            {
                name: "_from",
                type: "address"
            },
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_tokenId",
                type: "uint256"
            },
            {
                name: "_amount",
                type: "uint256"
            },
            {
                name: "_data",
                type: "bytes"
            }
        ],
        name: "safeTransferFrom",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function"
    }
], pt = (t, e)=>{
    let n = lt(et, t);
    if (n) return {
        action: "approve",
        functionName: "approve",
        isErc20Ish: !0,
        isNFTIsh: !1,
        spender: n.args[0],
        amount: n.args[1]
    };
    let a = lt(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$transfer$2d$CMPmjPsM$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["E"], t);
    if (a) return {
        action: "transfer",
        functionName: "transfer",
        isErc20Ish: !0,
        isNFTIsh: !1,
        transferTo: a.args[0],
        amount: a.args[1]
    };
    if (!e) return {
        action: "transaction",
        functionName: "",
        isErc20Ish: !1,
        isNFTIsh: !1
    };
    let s = lt(Z, t);
    if (s && "string" == typeof s.args[1]) {
        let t = ut(s.args[1]);
        if (t && t[4].encodedInitData) return pt(t[4].encodedInitData, e);
    }
    let i = lt(st, t);
    if (i) return {
        action: "approve",
        functionName: "setApprovalForAll",
        isNFTIsh: !0,
        isErc20Ish: !1,
        operator: i.args[0],
        approved: i.args[1]
    };
    let o = lt(it, t);
    if (o) return {
        action: "transfer",
        functionName: "transferFrom",
        isNFTIsh: !0,
        isErc20Ish: !1,
        transferFrom: o.args[0],
        transferTo: o.args[1],
        tokenId: o.args[2]
    };
    let r = lt(at, t);
    if (r) return {
        action: "transfer",
        functionName: "safeTransferFrom",
        isNFTIsh: !0,
        isErc20Ish: !1,
        transferFrom: r.args[0],
        transferTo: r.args[1],
        tokenId: r.args[2]
    };
    let p = lt(rt, t);
    if (p) return {
        action: "transfer",
        functionName: "safeTransferFrom",
        isNFTIsh: !0,
        isErc20Ish: !1,
        transferFrom: p.args[0],
        transferTo: p.args[1],
        tokenId: p.args[2],
        amount: p.args[3]
    };
    let l = lt(ot, t);
    if (l) return {
        action: "batch transfer",
        functionName: "safeBatchTransferFrom",
        isNFTIsh: !0,
        isErc20Ish: !1,
        transferFrom: l.args[0],
        transferTo: l.args[1],
        tokenIds: l.args[2],
        amounts: l.args[3]
    };
    let u = lt(nt, t);
    return u ? {
        action: "mint",
        functionName: u.functionName,
        isNFTIsh: !0,
        isErc20Ish: !1,
        args: u.args
    } : {
        action: "transaction",
        isErc20Ish: !1,
        isNFTIsh: !1
    };
};
let lt = (t, e)=>{
    try {
        let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeFunctionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeFunctionData"])({
            abi: t,
            data: e
        });
        return {
            functionName: n.functionName,
            args: n.args || []
        };
    } catch (t) {
        return null;
    }
}, ut = (t)=>{
    try {
        if ("string" == typeof t) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(tt, `0x${t.slice(10)}`);
    } catch (t) {
        return null;
    }
}, mt = (t)=>`${parseFloat(t).toFixed(2)}`;
function ct(t, e) {
    let n = [], a = new Map;
    if (t) {
        for (let e of t)if (e.in[0]) {
            let t;
            t = "ERC721" === e.asset.type || "approve_for_all" === e.in[0].value ? {
                id: `nft:${e.asset.name}`,
                nftName: e.asset.name,
                nftCount: e.in.length
            } : {
                id: `token:${e.asset.type}:${e.asset.symbol}:${e.asset.name}`,
                iconUrl: e.asset.logo_url,
                value: e.in[0].value,
                symbol: e.asset.symbol,
                usdValue: e.in[0].usd_price ? mt(e.in[0].usd_price) : void 0,
                decimals: e.asset.decimals
            }, n.push(t);
        } else if (e.out[0]?.value) {
            let t;
            t = "ERC721" === e.asset.type || "approve_for_all" === e.out[0].value ? {
                id: `nft:${e.asset.name}`,
                nftName: e.asset.name
            } : {
                id: `token:${e.asset.type}:${e.asset.symbol}:${e.asset.name}`,
                iconUrl: e.asset.logo_url,
                value: e.out[0].value,
                symbol: e.asset.symbol,
                usdValue: e.out[0].usd_price ? mt(e.out[0].usd_price) : void 0,
                decimals: e.asset.decimals
            }, a.has(t.id) || a.set(t.id, t);
        }
    }
    for (let t of e)for (let e of Object.keys(t.spenders)){
        let n;
        n = "ERC721" === t.asset.type || "approve_for_all" === t.spenders[e]?.value ? {
            id: `nft:${t.asset.name}`,
            nftName: t.asset.name
        } : {
            id: `token:${t.asset.type}:${t.asset.symbol}:${t.asset.name}`,
            iconUrl: t.asset.logo_url,
            value: t.spenders[e]?.value,
            symbol: t.asset.symbol,
            usdValue: t.spenders[e]?.usd_price ? mt(t.spenders[e]?.usd_price) : void 0,
            decimals: t.asset.decimals
        }, a.has(n.id) || a.set(n.id, n);
    }
    return {
        assetsIn: n,
        assetsOut: Array.from(a.values())
    };
}
const dt = (t, e, n, s)=>{
    let [i, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), { walletProxy: p } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        i && r(null), (async ()=>{
            if (!p || !e) return null;
            let a = [], i = !0, o = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["p"])(t, n, e, s).catch((e)=>(e.message && e.message.includes("Insufficient balance for transaction") || e.message && e.message.includes("Insufficient funds for gas * price + value") || e.details && e.details.includes("insufficient funds") ? i = !1 : a.push(e), t));
            return {
                tx: o,
                totalGasEstimate: o.gas,
                hasFunds: i,
                errors: a
            };
        })().then(r);
    }, [
        t
    ]), i;
};
let yt = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$prepareFundingModalData$2d$BVTcQcmw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$prepareFundingModalData$2d$BVTcQcmw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"]("There was an issue preparing your transaction", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProviderErrors"].E32603_DEFAULT_INTERNAL_ERROR.eipCode)), ft = (t, e)=>t?.sendTransaction ? "transactionRequest" in t.sendTransaction ? t.sendTransaction.transactionRequest : t.sendTransaction.transactionRequests[e] : void 0;
const bt = {
    component: ()=>{
        let { data: l, onUserCloseViaDialogOrKeybindRef: u, setModalData: m, navigate: N } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(), { client: R, rpcConfig: D, chains: B, closePrivyModal: P, walletProxy: L, showFiatPrices: U } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), { user: W } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$get$2d$is$2d$unified$2d$wallet$2d$gMDXpX6C$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), V = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), [G, H] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0), [z, K] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0), [Y, Z] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(ft(l, G)), [tt, et] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), [nt, at] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(), [st, it] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), [ot, rt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), [lt, ut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), [mt, bt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), [Tt, ht] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0), [gt, It] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0), [vt, kt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), [jt, Et] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), [Ct, Mt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]), [Ft, wt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]), [_t, xt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("uninitiated"), [Nt, St] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(void 0);
        if (!Y || !l?.sendTransaction || !l?.sendTransaction) /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ErrorScreen$2d$Yi$2d$Rhs0v$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorScreenView"], {
            error: Error("Invalid transaction request"),
            allowlistConfig: V.allowlistConfig,
            onRetry: ()=>{
                l?.sendTransaction?.onFailure(yt), P({
                    shouldCallAuthOnSuccess: !1
                });
            }
        });
        let { transactingWalletAddress: At } = l.sendTransaction, Ot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>B.find((t)=>Number(t.id) === Number(Y.chainId)), [
            Y.chainId
        ]), Rt = Ot?.nativeCurrency.symbol ?? "ETH", Dt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>pt(Y.data, !!V.embeddedWallets.extendedCalldataDecoding), [
            Y.data
        ]), { action: Bt, isErc20Ish: Pt, isNFTIsh: $t, functionName: qt } = Dt, { toAddress: Lt, tokenAddress: Ut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
                toAddress: Dt.isErc20Ish ? Dt.transferTo : Y.to ?? void 0,
                tokenAddress: Dt.isErc20Ish ? Y.to : void 0
            }), [
            Dt
        ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            Y.to && Ot && Pt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getErc20TokenInfo$2d$BFoeg5F6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])({
                address: Y.to,
                chain: Ot,
                rpcConfig: V.rpcConfig,
                privyAppId: V.id
            }).then(et).catch(console.error);
        }, [
            Y.to,
            Ot
        ]);
        let { tokenPrice: Wt, isTokenPriceLoading: Vt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useGetTokenPrice$2d$CDPxMEO$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(Y.chainId), { balance: Gt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useWalletBalance$2d$CkNw6kj0$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])({
            rpcConfig: V.rpcConfig,
            appId: V.id,
            address: At,
            chain: Ot
        }), Ht = function({ rpcConfig: t, appId: e, address: n, chain: l, tokenInfo: u }) {
            let { chains: m } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$internal$2d$context$2d$e$2d$Eni5bG$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(), [c, f] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), [b, T] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
                let n = l || m[0];
                if (n) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPublicClient"])({
                    chain: l,
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$utils$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJsonRpcEndpointFromChain"])(n, t, e))
                });
            }, [
                l,
                t,
                e
            ]), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
                if (n && h && u.address) try {
                    return T(!0), await h.readContract({
                        address: u.address,
                        abi: Q,
                        functionName: "balanceOf",
                        args: [
                            n
                        ]
                    });
                } catch (t) {
                    console.error(t);
                } finally{
                    T(!1);
                }
            }, [
                h,
                n,
                u?.address,
                l
            ]);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
                g().then((t)=>null != t && f(t));
            }, [
                g
            ]), {
                balance: c,
                isLoading: b && null == c,
                formattedBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$utils$2f$formatters$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTokenAmount"])({
                    amount: c ?? BigInt(0),
                    decimals: u.decimals
                })
            };
        }({
            rpcConfig: V.rpcConfig,
            appId: V.id,
            address: At,
            tokenInfo: {
                address: Ut || "",
                decimals: tt?.decimals ?? 18
            },
            chain: Ot
        }), Qt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$getPublicClient$2d$A9RSftUZ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(Number(Y.chainId), B, D, {
                appId: V.id
            }), [
            Y.chainId,
            D
        ]), zt = dt(Y, At, Qt, l?.sendTransaction?.prepareTransactionRequest);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            Z(ft(l, G));
        }, [
            G
        ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            l.sendTransaction?.getIsSponsored ? l.sendTransaction.getIsSponsored().then(at).catch(console.error) : at(!1);
        }, [
            l.sendTransaction.getIsSponsored
        ]);
        let Jt = ()=>{
            if (!st) return ot ? l?.sendTransaction?.onSuccess({
                hash: ot
            }) : mt || zt?.errors[0] ? l?.sendTransaction?.onFailure(mt ?? zt?.errors[0] ?? yt) : l?.sendTransaction?.onFailure(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$prepareFundingModalData$2d$BVTcQcmw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["P"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$prepareFundingModalData$2d$BVTcQcmw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"]("The user rejected the request", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$js$2d$sdk$2d$core$2f$dist$2f$esm$2f$embedded$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProviderErrors"].E4001_USER_REJECTED_REQUEST.eipCode))), P({
                shouldCallAuthOnSuccess: !1
            });
        };
        u.current = Jt;
        let Kt = !!(l.funding && l.funding.supportedOptions.length > 0), Xt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(BigInt(zt?.totalGasEstimate ?? 0n), Rt), Yt = U && Wt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(BigInt(zt?.totalGasEstimate ?? 0n), Wt) : void 0, Zt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(Gt ?? 0n, Rt, void 0, !0), te = U && Wt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(Gt ?? 0n, Wt) : void 0, ee = tt && !Ht.isLoading && Pt && "approve" !== Bt ? `${Ht.formattedBalance} ${tt.symbol}` : void 0, ne = l.sendTransaction?.uiOptions?.transactionInfo?.title;
        ne || (ne = "approve" === Bt ? Pt ? "Confirm address" : "Confirm action" : `Approve ${Bt}`);
        let ae = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
            if (l.sendTransaction?.uiOptions?.description) return l.sendTransaction?.uiOptions?.description;
            if ("approve" === Bt && "setApprovalForAll" === qt && Dt.approved) {
                let a = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                    address: Dt.operator || "",
                    url: Ot?.blockExplorers?.default?.url
                }); /*#__PURE__*/ 
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        V.name,
                        " would like your permission for ",
                        a,
                        " to transfer tokens on your behalf."
                    ]
                });
            }
            if ("approve" === Bt && "setApprovalForAll" === qt && !Dt.approved) {
                let a = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$Address$2d$BUmpXgsy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["A"], {
                    address: Dt.operator || "",
                    url: Ot?.blockExplorers?.default?.url
                }); /*#__PURE__*/ 
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        V.name,
                        " would like your permission to revoke permissions of ",
                        a,
                        " from transferring tokens on your behalf."
                    ]
                });
            }
            return Pt && "approve" === Bt || Pt && "approve" === Bt ? `${V.name} would like your permission for ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$useActiveWallet$2d$BeOB3HTh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["D"])(Dt.spender)} to spend tokens on your behalf.` : `${V.name} wants your permission to approve the following transaction.`;
        }, [
            V.name,
            Pt,
            Dt,
            l.sendTransaction?.uiOptions.description,
            qt
        ]), se = l.sendTransaction?.uiOptions?.transactionInfo?.contractInfo?.imgUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
            src: l.sendTransaction.uiOptions.transactionInfo.contractInfo.imgUrl,
            alt: l.sendTransaction.uiOptions.transactionInfo.contractInfo.imgAltText
        }) : null, ie = !(!zt || zt.errors[0] || zt.hasFunds || !1 !== nt), oe = ie && Kt, re = oe ? "Add funds" : l.sendTransaction?.uiOptions?.buttonText || (G < z ? "Continue" : "Approve"), pe = (t)=>{
            if (!t) throw Error("Transaction scan failed");
            if ("Success" === t.validation.status && ("Benign" === t.validation.result_type ? It("safe") : "Warning" === t.validation.result_type ? It("warn") : "Malicious" === t.validation.result_type && (It("error"), Et(!0))), "Success" !== t.simulation.status) throw Error("Simulation failed");
            {
                ht(t.simulation.params);
                let { assetsIn: e, assetsOut: n } = ct(t.simulation.assets_diffs, t.simulation.exposures);
                if (0 === n.length && 0 === e.length) throw Error("No tokens found");
                Mt(n), wt(e);
            }
        };
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            l.sendTransaction?.scanTransaction && V.embeddedWallets.transactionScanning.enabled && "uninitiated" === _t && (xt("in progress"), l.sendTransaction.scanTransaction().then((t)=>{
                pe(t), xt("completed");
            }).catch(()=>xt("failed")));
        }, [
            !!l.sendTransaction?.scanTransaction
        ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            l.sendTransaction?.scanTransaction && "failed" !== _t || ((t, e, n)=>{
                if (K(((t)=>t?.sendTransaction ? "transactionRequest" in t.sendTransaction ? 0 : t.sendTransaction.transactionRequests.length - 1 : 0)(l)), e.isErc20Ish && e.amount && n) {
                    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$formatErc20TokenAmount$2d$BuPk9xcy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["f"])({
                        amount: e.amount,
                        decimals: n.decimals
                    });
                    St(t), Mt([
                        {
                            value: t,
                            symbol: n?.symbol,
                            decimals: n?.decimals
                        }
                    ]);
                } else if (t.value) {
                    let e = BigInt(t.value), n = Wt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(e, Wt) : void 0;
                    Mt(U && n ? [
                        {
                            value: n
                        }
                    ] : [
                        {
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$ethers$2d$Bl5aM5Gz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["p"])(e),
                            symbol: Rt,
                            decimals: 18,
                            usdValue: n
                        }
                    ]);
                } else Mt(U ? [
                    {
                        value: "$0"
                    }
                ] : [
                    {
                        value: "0",
                        symbol: Rt,
                        decimals: 18
                    }
                ]);
            })(zt?.tx ?? Y, Dt, tt);
        }, [
            Y,
            zt?.tx,
            Dt,
            tt,
            _t
        ]), lt /*#__PURE__*/ ) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(X, {
            txn: zt?.tx ?? Y,
            onClose: Jt,
            receipt: lt,
            transactionInfo: l.sendTransaction?.uiOptions.transactionInfo,
            tokenPrice: Wt,
            tokenSymbol: Rt,
            receiptHeader: l.sendTransaction?.uiOptions.successHeader,
            receiptDescription: l.sendTransaction?.uiOptions.successDescription
        });
        if (mt) /*#__PURE__*/ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransactionErrorView$2d$RLIeHdul$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["T"], {
            transactionError: mt,
            transactionHash: ot ?? void 0,
            chainType: "ethereum",
            chainId: zt?.tx.chainId ?? Y.chainId,
            onClose: Jt,
            onRetry: ({ resetNonce: t })=>{
                bt(null);
                let e = {
                    ...zt?.tx ?? Y
                };
                t && (e.nonce = void 0), Z(e);
            }
        });
        let le = 0 !== z && "number" == typeof G && 0 !== G ? ()=>{
            H(G - 1);
        } : void 0;
        return vt && Tt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(J, {
            details: Tt,
            onBack: ()=>kt(!1)
        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$TransactionErrorView$2d$RLIeHdul$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["S"], {
            transactionIndex: G,
            onBack: le,
            maxIndex: z,
            disabled: ie && !Kt || jt,
            isSubmitting: st,
            submitError: mt,
            isPreparing: !zt,
            isTokenPriceLoading: Vt,
            isTokenContractInfoLoading: !$t && !tt,
            prepareError: zt?.errors[0],
            symbol: tt?.symbol,
            chain: Ot,
            img: se,
            title: ne,
            subtitle: ae,
            txValue: Y.value,
            fee: Yt ?? Xt,
            isSponsored: nt,
            from: At ?? "",
            to: Lt,
            tokenAddress: Ut ?? void 0,
            network: V.chains.find((t)=>t.id === Y.chainId)?.name ?? "",
            transactionDetails: {
                ...Dt,
                formattedAmount: Nt
            },
            cta: re,
            missingFunds: ie,
            action: Bt,
            balance: ee ?? te ?? Zt,
            onClose: Jt,
            onClick: oe ? async ()=>{
                if (!At) return;
                if (!Kt) throw Error("Funding wallet is not enabled");
                let t = "FundingMethodSelectionScreen";
                m({
                    ...l,
                    funding: {
                        ...l.funding,
                        methodScreen: t,
                        chainType: "ethereum",
                        amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatEther$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatEther"])(BigInt(zt?.tx.value ?? 0) + BigInt(zt?.totalGasEstimate?.toString() ?? 0)),
                        chain: Ot
                    },
                    solanaFundingData: l?.solanaFundingData
                }), N(t);
            } : async ()=>{
                if (G < z) H(G + 1);
                else {
                    it(!0);
                    try {
                        let t = await R.getAccessToken();
                        if (st || !t || !L || !W) return;
                        let e = await l.sendTransaction.onConfirm({
                            transactionRequest: zt?.tx ?? Y
                        });
                        if (rt(e), l.sendTransaction?.signOnly) return await new Promise((t)=>setTimeout(t, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$context$2d$DRLoVlsO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["q"])), l?.sendTransaction?.onSuccess({
                            hash: e
                        }), P({
                            shouldCallAuthOnSuccess: !1
                        });
                        let n = await Qt.waitForTransactionReceipt({
                            hash: e
                        });
                        if ("reverted" === n.status) throw Error("Transaction failed");
                        ut(n);
                    } catch (t) {
                        console.warn({
                            transaction: zt?.tx ?? Y,
                            error: t
                        }), bt(t);
                    } finally{
                        it(!1);
                    }
                }
            },
            validation: gt,
            hasScanDetails: !!Tt,
            setIsScanDetailsOpen: kt,
            preventMaliciousTransaction: jt,
            setPreventMaliciousTransaction: Et,
            tokensSent: Ct,
            tokensReceived: Ft,
            isScanning: "in progress" === _t,
            isCancellable: l.sendTransaction?.uiOptions?.isCancellable ?? !1,
            functionName: qt
        });
    }
};
;
}),
];

//# sourceMappingURL=1b50e_24c50986._.js.map