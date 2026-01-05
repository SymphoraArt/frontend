(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/session-request.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fulfillRequest",
    ()=>fulfillRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$send$2d$raw$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/send-raw-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$send$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/send-transaction.js [app-client] (ecmascript)");
// Due to some edge cases, we can't import these handlers dynamically
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/sign.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/sign-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/sign-typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
async function fulfillRequest(options) {
    const { wallet, walletConnectClient, thirdwebClient, event: { topic, id, params: { chainId: rawChainId, request } }, handlers } = options;
    const account = wallet.getAccount();
    if (!account) {
        throw new Error("No account connected to provided wallet");
    }
    let result;
    try {
        switch(request.method){
            case "personal_sign":
                {
                    if (handlers?.personal_sign) {
                        result = await handlers.personal_sign({
                            account,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSignRequest"])({
                            account,
                            params: request.params
                        });
                    }
                    break;
                }
            case "eth_sign":
                {
                    if (handlers?.eth_sign) {
                        result = await handlers.eth_sign({
                            account,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSignRequest"])({
                            account,
                            params: request.params
                        });
                    }
                    break;
                }
            case "eth_signTypedData":
                {
                    if (handlers?.eth_signTypedData) {
                        result = await handlers.eth_signTypedData({
                            account,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSignTypedDataRequest"])({
                            account,
                            params: request.params
                        });
                    }
                    break;
                }
            case "eth_signTypedData_v4":
                {
                    if (handlers?.eth_signTypedData_v4) {
                        result = await handlers.eth_signTypedData_v4({
                            account,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSignTypedDataRequest"])({
                            account,
                            params: request.params
                        });
                    }
                    break;
                }
            case "eth_signTransaction":
                {
                    if (handlers?.eth_signTransaction) {
                        result = await handlers.eth_signTransaction({
                            account,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$sign$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSignTransactionRequest"])({
                            account,
                            params: request.params
                        });
                    }
                    break;
                }
            case "eth_sendTransaction":
                {
                    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEip155ChainId"])(rawChainId);
                    if (handlers?.eth_sendTransaction) {
                        result = await handlers.eth_sendTransaction({
                            account,
                            chainId,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$send$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSendTransactionRequest"])({
                            account,
                            chainId,
                            params: request.params,
                            thirdwebClient
                        });
                    }
                    break;
                }
            case "eth_sendRawTransaction":
                {
                    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEip155ChainId"])(rawChainId);
                    if (handlers?.eth_sendRawTransaction) {
                        result = await handlers.eth_sendRawTransaction({
                            account,
                            chainId,
                            params: request.params
                        });
                    } else {
                        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$request$2d$handlers$2f$send$2d$raw$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSendRawTransactionRequest"])({
                            account,
                            chainId,
                            params: request.params
                        });
                    }
                    break;
                }
            case "wallet_addEthereumChain":
                {
                    if (handlers?.wallet_addEthereumChain) {
                        result = await handlers.wallet_addEthereumChain({
                            params: request.params,
                            wallet
                        });
                    } else {
                        throw new Error("Unsupported request method: wallet_addEthereumChain");
                    }
                    break;
                }
            case "wallet_switchEthereumChain":
                {
                    if (handlers?.wallet_switchEthereumChain) {
                        result = await handlers.wallet_switchEthereumChain({
                            params: request.params,
                            wallet
                        });
                    } else {
                        const { handleSwitchChain } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/switch-chain.js [app-client] (ecmascript, async loader)");
                        result = await handleSwitchChain({
                            params: request.params,
                            wallet
                        });
                    }
                    break;
                }
            default:
                {
                    const potentialHandler = handlers?.[request.method];
                    if (potentialHandler) {
                        result = await potentialHandler({
                            account,
                            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEip155ChainId"])(rawChainId),
                            params: request.params
                        });
                    } else {
                        throw new Error(`Unsupported request method: ${request.method}`);
                    }
                }
        }
    } catch (error) {
        result = {
            code: typeof error === "object" && error !== null && "code" in error ? error.code : 500,
            message: typeof error === "object" && error !== null && "message" in error ? error.message : "Unknown error"
        };
    }
    walletConnectClient.respond({
        response: {
            id,
            jsonrpc: "2.0",
            result
        },
        topic
    });
} //# sourceMappingURL=session-request.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_wallets_wallet-connect_receiver_session-request_457932da.js.map