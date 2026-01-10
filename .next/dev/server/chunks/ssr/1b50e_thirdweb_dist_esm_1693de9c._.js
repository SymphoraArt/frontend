module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-and-confirm-transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendAndConfirmTransaction",
    ()=>sendAndConfirmTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/wait-for-tx-receipt.js [app-ssr] (ecmascript)");
;
;
async function sendAndConfirmTransaction(options) {
    const submittedTx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendTransaction"])(options);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$wait$2d$for$2d$tx$2d$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waitForReceipt"])(submittedTx);
} //# sourceMappingURL=send-and-confirm-transaction.js.map
}),
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inAppWalletGetCallsStatus",
    ()=>inAppWalletGetCallsStatus,
    "inAppWalletSendCalls",
    ()=>inAppWalletSendCalls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionReceipt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$and$2d$confirm$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-and-confirm-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$batch$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-batch-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const bundlesToTransactions = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LruMap"](1000);
async function inAppWalletSendCalls(args) {
    const { account, calls } = args;
    const transactions = calls.map((call)=>({
            ...call,
            chain: args.chain
        }));
    const hashes = [];
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomBytesHex"])(65);
    bundlesToTransactions.set(id, hashes);
    if (account.sendBatchTransaction) {
        const receipt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$batch$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendBatchTransaction"])({
            account,
            transactions
        });
        hashes.push(receipt.transactionHash);
        bundlesToTransactions.set(id, hashes);
    } else {
        for (const tx of transactions){
            const receipt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$and$2d$confirm$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendAndConfirmTransaction"])({
                account,
                transaction: tx
            });
            hashes.push(receipt.transactionHash);
            bundlesToTransactions.set(id, hashes);
        }
    }
    return id;
}
async function inAppWalletGetCallsStatus(args) {
    const { chain, client, id } = args;
    const bundle = bundlesToTransactions.get(id);
    if (!bundle) {
        throw new Error("Failed to get calls status, unknown bundle id");
    }
    const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    let status = "success";
    const receipts = await Promise.all(bundle.map((hash)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_getTransactionReceipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eth_getTransactionReceipt"])(request, {
            hash
        }).then((receipt)=>({
                blockHash: receipt.blockHash,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed,
                logs: receipt.logs.map((l)=>({
                        address: l.address,
                        data: l.data,
                        topics: l.topics
                    })),
                status: receipt.status,
                transactionHash: receipt.transactionHash
            })).catch(()=>{
            status = "pending";
            return null; // Return null if there's an error to filter out later
        })));
    return {
        atomic: false,
        chainId: chain.id,
        id,
        receipts: receipts.filter((r)=>r !== null),
        status,
        statusCode: 200,
        version: "2.0.0"
    };
} //# sourceMappingURL=in-app-wallet-calls.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_1693de9c._.js.map