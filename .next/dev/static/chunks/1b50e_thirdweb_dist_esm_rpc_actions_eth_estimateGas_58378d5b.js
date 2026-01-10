(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_estimateGas.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_estimateGas",
    ()=>eth_estimateGas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
async function eth_estimateGas(request, transactionRequest) {
    const estimateResult = await request({
        method: "eth_estimateGas",
        params: [
            transactionRequest
        ]
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(estimateResult);
} //# sourceMappingURL=eth_estimateGas.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_rpc_actions_eth_estimateGas_58378d5b.js.map