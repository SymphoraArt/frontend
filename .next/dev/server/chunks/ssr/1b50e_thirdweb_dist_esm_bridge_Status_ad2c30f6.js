module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Status.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "status",
    ()=>status
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
async function status(options) {
    const { transactionHash, client, transactionId } = options;
    const chainId = "chainId" in options ? options.chainId : options.chain.id;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/status`);
    url.searchParams.set("transactionHash", transactionHash);
    url.searchParams.set("chainId", chainId.toString());
    if (transactionId) {
        url.searchParams.set("transactionId", transactionId);
    }
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
    const { data } = await response.json();
    if (data.status === "FAILED") {
        return {
            paymentId: data.paymentId,
            status: "FAILED",
            transactions: data.transactions
        };
    }
    if (data.status === "PENDING") {
        return {
            destinationChainId: data.destinationChainId,
            destinationToken: data.destinationToken,
            destinationTokenAddress: data.destinationTokenAddress,
            originAmount: BigInt(data.originAmount),
            originChainId: data.originChainId,
            originToken: data.originToken,
            originTokenAddress: data.originTokenAddress,
            paymentId: data.paymentId,
            purchaseData: data.purchaseData,
            receiver: data.receiver,
            sender: data.sender,
            status: "PENDING",
            transactions: data.transactions
        };
    }
    if (data.status === "NOT_FOUND") {
        return {
            paymentId: data.paymentId,
            status: "NOT_FOUND",
            transactions: []
        };
    }
    return {
        destinationAmount: BigInt(data.destinationAmount),
        destinationChainId: data.destinationChainId,
        destinationToken: data.destinationToken,
        destinationTokenAddress: data.destinationTokenAddress,
        originAmount: BigInt(data.originAmount),
        originChainId: data.originChainId,
        originToken: data.originToken,
        originTokenAddress: data.originTokenAddress,
        paymentId: data.paymentId,
        purchaseData: data.purchaseData,
        receiver: data.receiver,
        sender: data.sender,
        status: "COMPLETED",
        transactions: data.transactions
    };
} //# sourceMappingURL=Status.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_bridge_Status_ad2c30f6.js.map