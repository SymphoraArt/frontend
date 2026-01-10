(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionCount.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_getTransactionCount",
    ()=>eth_getTransactionCount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
async function eth_getTransactionCount(request, params) {
    const count = await request({
        method: "eth_getTransactionCount",
        params: [
            params.address,
            // makes sense to default to `pending` here, since we're asking for a transaction count (nonce)
            params.blockNumber ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(params.blockNumber) : params.blockTag || "pending"
        ]
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToNumber"])(count);
} //# sourceMappingURL=eth_getTransactionCount.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_rpc_actions_eth_getTransactionCount_1a950c45.js.map