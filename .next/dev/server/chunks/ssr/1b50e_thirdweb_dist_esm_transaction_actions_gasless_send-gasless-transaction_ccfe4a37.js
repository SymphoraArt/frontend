module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/gasless/send-gasless-transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendGaslessTransaction",
    ()=>sendGaslessTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$transaction$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/transaction-store.js [app-ssr] (ecmascript)");
;
async function sendGaslessTransaction({ account, transaction, serializableTransaction, gasless }) {
    // TODO: handle special case for mutlicall transactions!
    // Steps:
    // 1. check if the method is `multicall` by comparing the 4bytes data with the `multicall` selector
    // 2. split the rest of the data into its "parts"
    // 3. solidityPack the parts with the part data + the `account.address`
    // see v4: `core/classes/transactions.ts>Transaction>prepareGasless:L551`
    if (serializableTransaction.value && serializableTransaction.value > 0n) {
        throw new Error("Gasless transactions cannot have a value");
    }
    // TODO: multiply gas by 2 for some reason(?) - we do in v4, *should* we?
    let result;
    // biconomy
    if (gasless.provider === "biconomy") {
        const { relayBiconomyTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/gasless/providers/biconomy.js [app-ssr] (ecmascript, async loader)");
        result = await relayBiconomyTransaction({
            account,
            gasless,
            serializableTransaction,
            transaction
        });
    }
    // openzeppelin
    if (gasless.provider === "openzeppelin") {
        const { relayOpenZeppelinTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/gasless/providers/openzeppelin.js [app-ssr] (ecmascript, async loader)");
        result = await relayOpenZeppelinTransaction({
            account,
            gasless,
            serializableTransaction,
            transaction
        });
    }
    if (gasless.provider === "engine") {
        const { relayEngineTransaction } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/gasless/providers/engine.js [app-ssr] (ecmascript, async loader)");
        result = await relayEngineTransaction({
            account,
            gasless,
            serializableTransaction,
            transaction
        });
    }
    if (!result) {
        throw new Error("Unsupported gasless provider");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$transaction$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addTransactionToStore"])({
        address: account.address,
        chainId: transaction.chain.id,
        transactionHash: result.transactionHash
    });
    return result;
} //# sourceMappingURL=send-gasless-transaction.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_transaction_actions_gasless_send-gasless-transaction_ccfe4a37.js.map