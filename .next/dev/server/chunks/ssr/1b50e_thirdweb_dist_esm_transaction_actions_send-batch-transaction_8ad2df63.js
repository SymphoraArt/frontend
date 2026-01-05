module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-batch-transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendBatchTransaction",
    ()=>sendBatchTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-ssr] (ecmascript)");
;
;
async function sendBatchTransaction(options) {
    const { account, transactions } = options;
    if (!account) {
        throw new Error("not connected");
    }
    if (transactions.length === 0) {
        throw new Error("No transactions to send");
    }
    const firstTx = transactions[0];
    if (!firstTx) {
        throw new Error("No transactions to send");
    }
    if (account.sendBatchTransaction) {
        const serializedTxs = await Promise.all(transactions.map(async (tx)=>{
            // no need to estimate gas for these, gas will be estimated on the entire batch
            const [data, to, accessList, value] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"])(tx),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(tx.to),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(tx.accessList),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(tx.value)
            ]);
            const serializedTx = {
                accessList,
                chainId: tx.chain.id,
                data,
                to,
                value
            };
            return serializedTx;
        }));
        const result = await account.sendBatchTransaction(serializedTxs);
        return {
            ...result,
            chain: firstTx.chain,
            client: firstTx.client
        };
    }
    throw new Error("Account doesn't implement sendBatchTransaction");
} //# sourceMappingURL=send-batch-transaction.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_transaction_actions_send-batch-transaction_8ad2df63.js.map