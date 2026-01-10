(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/common.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertInsightEnabled",
    ()=>assertInsightEnabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
async function assertInsightEnabled(chains) {
    const chainIds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInsightEnabledChainIds"])();
    const insightEnabled = chains.every((c)=>chainIds.includes(c.id));
    if (!insightEnabled) {
        throw new Error(`Insight is not available for chains ${chains.filter((c)=>!chainIds.includes(c.id)).map((c)=>c.id).join(", ")}`);
    }
} //# sourceMappingURL=common.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_insight_common_352be545.js.map