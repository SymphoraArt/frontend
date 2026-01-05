module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContractAddress",
    ()=>getContractAddress,
    "getUrl",
    ()=>getUrl
]);
const getContractAddress = (address)=>address;
const getUrl = (url)=>url; //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/request.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpRequestError",
    ()=>HttpRequestError,
    "RpcRequestError",
    ()=>RpcRequestError,
    "SocketClosedError",
    ()=>SocketClosedError,
    "TimeoutError",
    ()=>TimeoutError,
    "WebSocketRequestError",
    ()=>WebSocketRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/stringify.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/utils.js [app-ssr] (ecmascript)");
;
;
;
class HttpRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, headers, status, url }){
        super('HTTP request failed.', {
            cause,
            details,
            metaMessages: [
                status && `Status: ${status}`,
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                body && `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ].filter(Boolean),
            name: 'HttpRequestError'
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.body = body;
        this.headers = headers;
        this.status = status;
        this.url = url;
    }
}
class WebSocketRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, url }){
        super('WebSocket request failed.', {
            cause,
            details,
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                body && `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ].filter(Boolean),
            name: 'WebSocketRequestError'
        });
    }
}
class RpcRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, error, url }){
        super('RPC Request failed.', {
            cause: error,
            details: error.message,
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ],
            name: 'RpcRequestError'
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = error.code;
        this.data = error.data;
    }
}
class SocketClosedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ url } = {}){
        super('The socket has been closed.', {
            metaMessages: [
                url && `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUrl"])(url)}`
            ].filter(Boolean),
            name: 'SocketClosedError'
        });
    }
}
class TimeoutError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, url }){
        super('The request took too long to respond.', {
            details: 'The request timed out.',
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ],
            name: 'TimeoutError'
        });
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/rpc.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AtomicReadyWalletRejectedUpgradeError",
    ()=>AtomicReadyWalletRejectedUpgradeError,
    "AtomicityNotSupportedError",
    ()=>AtomicityNotSupportedError,
    "BundleTooLargeError",
    ()=>BundleTooLargeError,
    "ChainDisconnectedError",
    ()=>ChainDisconnectedError,
    "DuplicateIdError",
    ()=>DuplicateIdError,
    "InternalRpcError",
    ()=>InternalRpcError,
    "InvalidInputRpcError",
    ()=>InvalidInputRpcError,
    "InvalidParamsRpcError",
    ()=>InvalidParamsRpcError,
    "InvalidRequestRpcError",
    ()=>InvalidRequestRpcError,
    "JsonRpcVersionUnsupportedError",
    ()=>JsonRpcVersionUnsupportedError,
    "LimitExceededRpcError",
    ()=>LimitExceededRpcError,
    "MethodNotFoundRpcError",
    ()=>MethodNotFoundRpcError,
    "MethodNotSupportedRpcError",
    ()=>MethodNotSupportedRpcError,
    "ParseRpcError",
    ()=>ParseRpcError,
    "ProviderDisconnectedError",
    ()=>ProviderDisconnectedError,
    "ProviderRpcError",
    ()=>ProviderRpcError,
    "ResourceNotFoundRpcError",
    ()=>ResourceNotFoundRpcError,
    "ResourceUnavailableRpcError",
    ()=>ResourceUnavailableRpcError,
    "RpcError",
    ()=>RpcError,
    "SwitchChainError",
    ()=>SwitchChainError,
    "TransactionRejectedRpcError",
    ()=>TransactionRejectedRpcError,
    "UnauthorizedProviderError",
    ()=>UnauthorizedProviderError,
    "UnknownBundleIdError",
    ()=>UnknownBundleIdError,
    "UnknownRpcError",
    ()=>UnknownRpcError,
    "UnsupportedChainIdError",
    ()=>UnsupportedChainIdError,
    "UnsupportedNonOptionalCapabilityError",
    ()=>UnsupportedNonOptionalCapabilityError,
    "UnsupportedProviderMethodError",
    ()=>UnsupportedProviderMethodError,
    "UserRejectedRequestError",
    ()=>UserRejectedRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/request.js [app-ssr] (ecmascript)");
;
;
const unknownErrorCode = -1;
class RpcError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(cause, { code, docsPath, metaMessages, name, shortMessage }){
        super(shortMessage, {
            cause,
            docsPath,
            metaMessages: metaMessages || cause?.metaMessages,
            name: name || 'RpcError'
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name || cause.name;
        this.code = cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RpcRequestError"] ? cause.code : code ?? unknownErrorCode;
    }
}
class ProviderRpcError extends RpcError {
    constructor(cause, options){
        super(cause, options);
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = options.data;
    }
}
class ParseRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ParseRpcError.code,
            name: 'ParseRpcError',
            shortMessage: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
        });
    }
}
Object.defineProperty(ParseRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32700
});
class InvalidRequestRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidRequestRpcError.code,
            name: 'InvalidRequestRpcError',
            shortMessage: 'JSON is not a valid request object.'
        });
    }
}
Object.defineProperty(InvalidRequestRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32600
});
class MethodNotFoundRpcError extends RpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: MethodNotFoundRpcError.code,
            name: 'MethodNotFoundRpcError',
            shortMessage: `The method${method ? ` "${method}"` : ''} does not exist / is not available.`
        });
    }
}
Object.defineProperty(MethodNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32601
});
class InvalidParamsRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidParamsRpcError.code,
            name: 'InvalidParamsRpcError',
            shortMessage: [
                'Invalid parameters were provided to the RPC method.',
                'Double check you have provided the correct parameters.'
            ].join('\n')
        });
    }
}
Object.defineProperty(InvalidParamsRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
});
class InternalRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InternalRpcError.code,
            name: 'InternalRpcError',
            shortMessage: 'An internal error was received.'
        });
    }
}
Object.defineProperty(InternalRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32603
});
class InvalidInputRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: InvalidInputRpcError.code,
            name: 'InvalidInputRpcError',
            shortMessage: [
                'Missing or invalid parameters.',
                'Double check you have provided the correct parameters.'
            ].join('\n')
        });
    }
}
Object.defineProperty(InvalidInputRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32000
});
class ResourceNotFoundRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ResourceNotFoundRpcError.code,
            name: 'ResourceNotFoundRpcError',
            shortMessage: 'Requested resource not found.'
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ResourceNotFoundRpcError'
        });
    }
}
Object.defineProperty(ResourceNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32001
});
class ResourceUnavailableRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: ResourceUnavailableRpcError.code,
            name: 'ResourceUnavailableRpcError',
            shortMessage: 'Requested resource not available.'
        });
    }
}
Object.defineProperty(ResourceUnavailableRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32002
});
class TransactionRejectedRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: TransactionRejectedRpcError.code,
            name: 'TransactionRejectedRpcError',
            shortMessage: 'Transaction creation failed.'
        });
    }
}
Object.defineProperty(TransactionRejectedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32003
});
class MethodNotSupportedRpcError extends RpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: MethodNotSupportedRpcError.code,
            name: 'MethodNotSupportedRpcError',
            shortMessage: `Method${method ? ` "${method}"` : ''} is not supported.`
        });
    }
}
Object.defineProperty(MethodNotSupportedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32004
});
class LimitExceededRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            code: LimitExceededRpcError.code,
            name: 'LimitExceededRpcError',
            shortMessage: 'Request exceeds defined limit.'
        });
    }
}
Object.defineProperty(LimitExceededRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32005
});
class JsonRpcVersionUnsupportedError extends RpcError {
    constructor(cause){
        super(cause, {
            code: JsonRpcVersionUnsupportedError.code,
            name: 'JsonRpcVersionUnsupportedError',
            shortMessage: 'Version of JSON-RPC protocol is not supported.'
        });
    }
}
Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32006
});
class UserRejectedRequestError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UserRejectedRequestError.code,
            name: 'UserRejectedRequestError',
            shortMessage: 'User rejected the request.'
        });
    }
}
Object.defineProperty(UserRejectedRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4001
});
class UnauthorizedProviderError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnauthorizedProviderError.code,
            name: 'UnauthorizedProviderError',
            shortMessage: 'The requested method and/or account has not been authorized by the user.'
        });
    }
}
Object.defineProperty(UnauthorizedProviderError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4100
});
class UnsupportedProviderMethodError extends ProviderRpcError {
    constructor(cause, { method } = {}){
        super(cause, {
            code: UnsupportedProviderMethodError.code,
            name: 'UnsupportedProviderMethodError',
            shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ''}.`
        });
    }
}
Object.defineProperty(UnsupportedProviderMethodError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4200
});
class ProviderDisconnectedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ProviderDisconnectedError.code,
            name: 'ProviderDisconnectedError',
            shortMessage: 'The Provider is disconnected from all chains.'
        });
    }
}
Object.defineProperty(ProviderDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4900
});
class ChainDisconnectedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ChainDisconnectedError.code,
            name: 'ChainDisconnectedError',
            shortMessage: 'The Provider is not connected to the requested chain.'
        });
    }
}
Object.defineProperty(ChainDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4901
});
class SwitchChainError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: SwitchChainError.code,
            name: 'SwitchChainError',
            shortMessage: 'An error occurred when attempting to switch chain.'
        });
    }
}
Object.defineProperty(SwitchChainError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4902
});
class UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnsupportedNonOptionalCapabilityError.code,
            name: 'UnsupportedNonOptionalCapabilityError',
            shortMessage: 'This Wallet does not support a capability that was not marked as optional.'
        });
    }
}
Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5700
});
class UnsupportedChainIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnsupportedChainIdError.code,
            name: 'UnsupportedChainIdError',
            shortMessage: 'This Wallet does not support the requested chain ID.'
        });
    }
}
Object.defineProperty(UnsupportedChainIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5710
});
class DuplicateIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: DuplicateIdError.code,
            name: 'DuplicateIdError',
            shortMessage: 'There is already a bundle submitted with this ID.'
        });
    }
}
Object.defineProperty(DuplicateIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5720
});
class UnknownBundleIdError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: UnknownBundleIdError.code,
            name: 'UnknownBundleIdError',
            shortMessage: 'This bundle id is unknown / has not been submitted'
        });
    }
}
Object.defineProperty(UnknownBundleIdError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5730
});
class BundleTooLargeError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: BundleTooLargeError.code,
            name: 'BundleTooLargeError',
            shortMessage: 'The call bundle is too large for the Wallet to process.'
        });
    }
}
Object.defineProperty(BundleTooLargeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5740
});
class AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: AtomicReadyWalletRejectedUpgradeError.code,
            name: 'AtomicReadyWalletRejectedUpgradeError',
            shortMessage: 'The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.'
        });
    }
}
Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5750
});
class AtomicityNotSupportedError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: AtomicityNotSupportedError.code,
            name: 'AtomicityNotSupportedError',
            shortMessage: 'The wallet does not support atomic execution but the request requires it.'
        });
    }
}
Object.defineProperty(AtomicityNotSupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5760
});
class UnknownRpcError extends RpcError {
    constructor(cause){
        super(cause, {
            name: 'UnknownRpcError',
            shortMessage: 'An unknown RPC error occurred.'
        });
    }
} //# sourceMappingURL=rpc.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/url.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "formatExplorerAddressUrl",
    ()=>formatExplorerAddressUrl,
    "formatExplorerTxUrl",
    ()=>formatExplorerTxUrl,
    "formatNativeUrl",
    ()=>formatNativeUrl,
    "formatUniversalUrl",
    ()=>formatUniversalUrl,
    "formatWalletConnectUrl",
    ()=>formatWalletConnectUrl,
    "isHttpUrl",
    ()=>isHttpUrl
]);
function isHttpUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}
function formatUniversalUrl(appUrl, wcUri) {
    if (!isHttpUrl(appUrl)) {
        return formatNativeUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.endsWith("/")) {
        safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
        href: safeAppUrl,
        redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`
    };
}
function formatNativeUrl(appUrl, wcUri) {
    if (isHttpUrl(appUrl)) {
        return formatUniversalUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.includes("://")) {
        safeAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
        safeAppUrl = `${safeAppUrl}://`;
    }
    if (!safeAppUrl.endsWith("/")) {
        safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
        href: safeAppUrl,
        redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`
    };
}
function formatWalletConnectUrl(appUrl, wcUri) {
    return isHttpUrl(appUrl) ? formatUniversalUrl(appUrl, wcUri) : formatNativeUrl(appUrl, wcUri);
}
function formatExplorerTxUrl(explorerUrl, txHash) {
    return `${explorerUrl.endsWith("/") ? explorerUrl : `${explorerUrl}/`}tx/${txHash}`;
}
function formatExplorerAddressUrl(explorerUrl, address) {
    return `${explorerUrl.endsWith("/") ? explorerUrl : `${explorerUrl}/`}address/${address}`;
} //# sourceMappingURL=url.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWalletInfo",
    ()=>getWalletInfo
]);
// This file is auto-generated by the `scripts/wallets/generate.ts` script.
// Do not modify this file manually.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/is-ecosystem-wallet.js [app-ssr] (ecmascript)");
;
async function getWalletInfo(id, image) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$ecosystem$2f$is$2d$ecosystem$2d$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEcosystemWallet"])(id)) {
        const { getEcosystemWalletInfo } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-info.js [app-ssr] (ecmascript, async loader)");
        return image ? getEcosystemWalletInfo(id).then((info)=>info.image_id) : getEcosystemWalletInfo(id);
    }
    switch(id){
        case "smart":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/smart/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/smart/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "inApp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/inApp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/inApp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "walletConnect":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/walletConnect/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/walletConnect/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "embedded":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/embedded/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/embedded/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "adapter":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/adapter/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/custom/adapter/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.metamask":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.metamask/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.metamask/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.trustwallet.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trustwallet.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trustwallet.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zerion.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zerion.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zerion.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.okex.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.okex.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.okex.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.binance.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.binance.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.binance.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitget.web3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitget.web3/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitget.web3/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.safepal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safepal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safepal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.tokenpocket":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.tokenpocket/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.tokenpocket/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.uniswap":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.uniswap/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.uniswap/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bestwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bestwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bestwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ledger":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ledger/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ledger/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bybit":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bybit/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bybit/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.elrond.maiar.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.elrond.maiar.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.elrond.maiar.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.fireblocks":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fireblocks/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fireblocks/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.crypto.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crypto.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crypto.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitcoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitcoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitcoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bifrostwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bifrostwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bifrostwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "im.token":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/im.token/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/im.token/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.1inch.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.1inch.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.1inch.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.blockchain.login":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blockchain.login/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blockchain.login/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "global.safe":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/global.safe/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/global.safe/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitpay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "jp.co.rakuten-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/jp.co.rakuten-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/jp.co.rakuten-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.arculus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.arculus/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.arculus/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.ctrl":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.ctrl/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.ctrl/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.roninchain.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.roninchain.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.roninchain.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wemixplay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemixplay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemixplay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.haha":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.haha/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.haha/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.hashpack.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hashpack.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hashpack.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.rainbow":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.rainbow/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.rainbow/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "id.co.pintu":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.co.pintu/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.co.pintu/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.exodus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.exodus/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.exodus/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wigwam.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wigwam.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wigwam.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tangem":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tangem/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tangem/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ag.jup":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ag.jup/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ag.jup/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.blackfort":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.blackfort/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.blackfort/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ibvm":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ibvm/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ibvm/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bee":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bee/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bee/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kraken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kraken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kraken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.magiceden.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.magiceden.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.magiceden.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.hot-labs.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.hot-labs.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.hot-labs.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dcentwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dcentwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dcentwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.avacus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.avacus/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.avacus/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kucoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kucoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kucoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.keplr":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keplr/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keplr/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.mathwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mathwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mathwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.yowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.internetmoney":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.internetmoney/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.internetmoney/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.opera":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opera/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opera/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.backpack":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.backpack/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.backpack/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.robinhood.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.robinhood.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.robinhood.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.socios.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.socios.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.socios.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.chain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.chain/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.chain/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.core.extension":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.core.extension/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.core.extension/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.huddln":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.huddln/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.huddln/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.joeywallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.joeywallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.joeywallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "so.onekey.app.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/so.onekey.app.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/so.onekey.app.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.flowfoundation.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flowfoundation.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flowfoundation.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.wombat":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.wombat/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.wombat/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pk.modular":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pk.modular/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pk.modular/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.subwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.subwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.subwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.argent":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.argent/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.argent/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.kabila":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.kabila/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.kabila/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.mewwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mewwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mewwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.sabay.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sabay.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sabay.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.loopring.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.loopring.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.loopring.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.tokoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tokoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tokoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.klipwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.klipwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.klipwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.novawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.novawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.novawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.thorwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thorwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thorwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.zengo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zengo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zengo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.oasys-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.oasys-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.oasys-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.fastex.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fastex.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fastex.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.cvl":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.cvl/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.cvl/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitso":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitso/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitso/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.cypherhq":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cypherhq/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cypherhq/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.valoraapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.valoraapp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.valoraapp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.leapwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.leapwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.leapwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.everspace":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.everspace/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.everspace/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.atomicwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.atomicwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.atomicwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.coca":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.coca/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.coca/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.kriptomat":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kriptomat/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kriptomat/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "money.unstoppable":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.unstoppable/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.unstoppable/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.uniultra.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.uniultra.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.uniultra.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.oxalus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.oxalus/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.oxalus/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ullapay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ullapay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ullapay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tomi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tomi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tomi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.frontier.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.frontier.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.frontier.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coldwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coldwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coldwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.krystal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.krystal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.krystal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.over":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.over/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.over/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.creditcoin.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.creditcoin.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.creditcoin.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.gooddollar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.gooddollar/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.gooddollar/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.monarchwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.monarchwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.monarchwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "tech.okto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.okto/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.okto/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.alephium":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.alephium/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.alephium/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.mtpelerin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mtpelerin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mtpelerin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.burritowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.burritowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.burritowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.enjin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.enjin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.enjin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.veworld":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.veworld/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.veworld/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.family.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.family.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.family.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.localtrade.lab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.localtrade.lab/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.localtrade.lab/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ellipal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ellipal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ellipal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.xcapit":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.xcapit/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.xcapit/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.gemwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "dev.auroracloud":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/dev.auroracloud/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/dev.auroracloud/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.zeal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.zeal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.zeal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.compasswallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.compasswallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.compasswallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coin98":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coin98/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coin98/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.linen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.linen/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.linen/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coolbitx.cwsapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coolbitx.cwsapp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coolbitx.cwsapp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.nabox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nabox/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nabox/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.noone":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.noone/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.noone/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.walletnow":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.walletnow/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.walletnow/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.withpaper":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.withpaper/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.withpaper/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.haqq":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.haqq/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.haqq/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ricewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ricewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ricewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.openwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.openwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.openwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.okse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.okse/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.okse/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.koalawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.koalawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.koalawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.aktionariat":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.aktionariat/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.aktionariat/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cakewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cakewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cakewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.paybolt":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paybolt/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paybolt/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.plasma-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.plasma-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.plasma-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.purewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.purewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.purewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "my.mone":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/my.mone/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/my.mone/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.bytebank":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bytebank/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bytebank/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.yusetoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yusetoken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.yusetoken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.optowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.optowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.optowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ethermail":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethermail/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethermail/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.beewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.beewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.beewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.foxwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.foxwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.foxwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.pionewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pionewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pionewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "it.airgap":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/it.airgap/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/it.airgap/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.holdstation":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.holdstation/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.holdstation/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.thepulsewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thepulsewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thepulsewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.abra":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.abra/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.abra/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.keyring":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keyring/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keyring/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.premanft":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.premanft/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.premanft/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.miraiapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.miraiapp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.miraiapp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.timelesswallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.timelesswallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.timelesswallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "social.halo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.halo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.halo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.iopay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.iopay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.iopay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.bitizen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bitizen/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.bitizen/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.ultimate":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ultimate/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ultimate/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.fizzwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.fizzwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.fizzwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.nightly":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nightly/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nightly/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinomi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinomi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinomi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.stickey":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.stickey/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.stickey/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.uptn.dapp-web":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.uptn.dapp-web/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.uptn.dapp-web/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.pundi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.pundi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.pundi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.coinstats":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.coinstats/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.coinstats/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.nicegram":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nicegram/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.nicegram/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.harti":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.harti/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.harti/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "fi.pillar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.pillar/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.pillar/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.hbwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.hbwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.hbwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.dttd":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.dttd/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.dttd/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zelcore":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelcore/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelcore/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tellaw":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tellaw/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tellaw/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.trusteeglobal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trusteeglobal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.trusteeglobal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "is.callback":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/is.callback/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/is.callback/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.bladewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bladewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bladewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.summonersarena":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.summonersarena/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.summonersarena/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitpie":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpie/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitpie/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.ixo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.ixo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.ixo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.gateweb3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.gateweb3/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.gateweb3/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.unstoppabledomains":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unstoppabledomains/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unstoppabledomains/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.cosmostation":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cosmostation/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.cosmostation/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.sequence":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.sequence/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.sequence/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.ammer":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ammer/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ammer/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "us.binance":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/us.binance/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/us.binance/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.thetatoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thetatoken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.thetatoken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.freedom":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.freedom/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.freedom/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.muza":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.muza/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.muza/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.neopin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.neopin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.neopin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.neonwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neonwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neonwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.ryipay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ryipay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.ryipay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.saakuru.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saakuru.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saakuru.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.dota168":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dota168/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dota168/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.legacynetwork":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legacynetwork/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legacynetwork/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coininn":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coininn/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coininn/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.hyperpay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hyperpay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hyperpay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.safemoon":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safemoon/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.safemoon/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.easy":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.easy/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.easy/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.myabcwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.myabcwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.myabcwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.secuxtech":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.secuxtech/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.secuxtech/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.wallet3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallet3/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallet3/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.midoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.midoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.midoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "id.competence":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.competence/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.competence/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "llc.besc":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/llc.besc/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/llc.besc/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.onto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.onto/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.onto/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "baby.smart":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/baby.smart/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/baby.smart/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.klever":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.klever/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.klever/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.beexo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.beexo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.beexo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ivirse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ivirse/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ivirse/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.alphawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alphawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alphawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ch.dssecurity":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ch.dssecurity/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ch.dssecurity/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.concordium":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.concordium/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.concordium/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.gemspocket":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemspocket/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gemspocket/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zkape":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zkape/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zkape/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.unitywallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unitywallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.unitywallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.pitaka":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pitaka/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pitaka/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.saitamatoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saitamatoken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saitamatoken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.crossmint":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crossmint/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.crossmint/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.status":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.status/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.status/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.mugambo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mugambo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.mugambo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.shido":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.shido/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.shido/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.meld.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.meld.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.meld.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.authentrend":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.authentrend/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.authentrend/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.paliwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paliwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.paliwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.talken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.talken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.talken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.fintoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.fintoken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.fintoken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.fizen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.fizen/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.fizen/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "vc.uincubator.api":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/vc.uincubator.api/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/vc.uincubator.api/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.unagi.unawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.unagi.unawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.unagi.unawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ambire":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ambire/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ambire/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.armana.portal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.armana.portal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.armana.portal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.x9wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.x9wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.x9wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.kigo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kigo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kigo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kryptogo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kryptogo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kryptogo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.getcogni":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.getcogni/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.getcogni/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.wallacy":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallacy/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallacy/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "one.mixin.messenger":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/one.mixin.messenger/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/one.mixin.messenger/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.tucop":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.tucop/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.tucop/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kresus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kresus/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kresus/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.sinum":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.sinum/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.sinum/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.soulswap.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.soulswap.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.soulswap.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ballet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ballet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ballet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.shapeshift":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.shapeshift/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.shapeshift/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.nash":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nash/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nash/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "money.keychain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.keychain/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.keychain/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.getclave":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getclave/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getclave/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bettatrade":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bettatrade/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bettatrade/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.pockie":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pockie/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pockie/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "online.puzzle":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/online.puzzle/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/online.puzzle/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.voltage":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.voltage/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.voltage/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.mrhb":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.mrhb/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.mrhb/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.echooo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.echooo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.echooo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.trustasset":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trustasset/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trustasset/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.nonbank":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nonbank/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.nonbank/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.tradestrike":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tradestrike/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.tradestrike/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.dfinnwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.dfinnwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.dfinnwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.legionnetwork":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legionnetwork/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.legionnetwork/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ripio":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ripio/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ripio/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "inc.tomo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/inc.tomo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/inc.tomo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.komet.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.komet.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.komet.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.guardiianwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.guardiianwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.guardiianwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.rezor":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.rezor/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.rezor/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.utorg":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.utorg/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.utorg/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.zypto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zypto/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.zypto/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.fxwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fxwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.fxwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tastycrypto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tastycrypto/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tastycrypto/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "live.superex":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/live.superex/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/live.superex/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.alpha-u.wallet.web":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.alpha-u.wallet.web/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.alpha-u.wallet.web/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.trinity-tech":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trinity-tech/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.trinity-tech/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.universaleverything":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.universaleverything/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.universaleverything/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "gg.indi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/gg.indi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/gg.indi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.thirdweb":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.thirdweb/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.thirdweb/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.poolsmobility.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.poolsmobility.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.poolsmobility.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.roam.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.roam.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.roam.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.gamic":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.gamic/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.gamic/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.m1nty":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.m1nty/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.m1nty/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.buzz-up":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.buzz-up/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.buzz-up/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.catecoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.catecoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.catecoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.hootark":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hootark/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.hootark/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coincircle":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coincircle/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coincircle/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.copiosa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.copiosa/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.copiosa/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ttmwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ttmwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ttmwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.bharatbox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bharatbox/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bharatbox/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.dosi.vault":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.dosi.vault/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.dosi.vault/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.qubic.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.qubic.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.qubic.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.spatium":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.nufinetes":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nufinetes/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nufinetes/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.swopme":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.swopme/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.swopme/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "land.liker":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/land.liker/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/land.liker/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dolletwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dolletwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dolletwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.gayawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gayawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.gayawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.shinobi-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.shinobi-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.shinobi-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.azcoiner":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.azcoiner/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.azcoiner/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.passwallet.app":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.passwallet.app/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.passwallet.app/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.bonuz":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.bonuz/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.bonuz/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinex.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinex.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinex.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.xverse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.xverse/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.xverse/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinsdo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinsdo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinsdo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.flash-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flash-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.flash-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.nodle":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nodle/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.nodle/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.vgxfoundation":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.vgxfoundation/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.vgxfoundation/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.arianee":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.arianee/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.arianee/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.trustkeys":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.trustkeys/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.trustkeys/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ozonewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ozonewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ozonewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.konio":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.konio/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.konio/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.owallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.owallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.owallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.zelus":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelus/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.zelus/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.myrenegade":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.myrenegade/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.myrenegade/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.clingon":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.clingon/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.clingon/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.icewal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.icewal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.icewal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.maxwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.maxwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.maxwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.streakk":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.streakk/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.streakk/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.pandoshi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pandoshi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pandoshi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.porta":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.porta/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.porta/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.earthwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.earthwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.earthwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.up":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.up/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.up/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.spatium.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.spatium.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.adftechnology":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.adftechnology/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.adftechnology/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.opz":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opz/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.opz/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.wallypto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallypto/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.wallypto/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.reown":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.kelp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.kelp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.kelp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.xellar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.xellar/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.xellar/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.qoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.qoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.qoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.daffione":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.daffione/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.daffione/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.passpay":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.passpay/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.passpay/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bscecowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bscecowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bscecowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "fun.tobi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fun.tobi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fun.tobi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "technology.obvious":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.obvious/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.obvious/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.liberawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.liberawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.liberawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.caesiumlab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.caesiumlab/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.caesiumlab/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "trade.flooz.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/trade.flooz.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/trade.flooz.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.greengloryglobal":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.greengloryglobal/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.greengloryglobal/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kriptonio":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kriptonio/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kriptonio/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bitnovo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitnovo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bitnovo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.get-verso":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.get-verso/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.get-verso/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.kaxaa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kaxaa/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.kaxaa/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.pltwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pltwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.pltwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.apollox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.apollox/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.apollox/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.pierwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pierwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.pierwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.shefi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.shefi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.shefi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.orion":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.orion/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.orion/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "nl.greenhood.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/nl.greenhood.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/nl.greenhood.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.helixid":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.helixid/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.helixid/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.gridlock":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.gridlock/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.gridlock/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.keeper-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keeper-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.keeper-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.webauth":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.webauth/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.webauth/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wemix":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemix/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wemix/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.scramberry":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.scramberry/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.scramberry/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.bmawallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bmawallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.bmawallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.lifedefi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.lifedefi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.lifedefi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ready":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ready/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ready/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.amazewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.amazewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.amazewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "technology.jambo":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.jambo/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/technology.jambo/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.didwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.didwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.didwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "fi.dropmate":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.dropmate/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/fi.dropmate/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.edge":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.edge/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.edge/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.banksocial":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.banksocial/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.banksocial/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.obliowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.obliowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.obliowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.ecoinwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ecoinwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ecoinwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.3swallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.3swallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.3swallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ipmb":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ipmb/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ipmb/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.qubetics":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.qubetics/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.qubetics/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.hacken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.hacken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.hacken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.imem":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.imem/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.imem/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "me.astrox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.astrox/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/me.astrox/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.purechain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.purechain/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.purechain/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ethos":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethos/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ethos/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.prettygood.x":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.prettygood.x/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.prettygood.x/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.revelator.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.revelator.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.revelator.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.lif3":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lif3/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lif3/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.broearn":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.broearn/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.broearn/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.blocto":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.blocto/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.blocto/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.girin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.girin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.girin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.plena":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.plena/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.plena/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "zone.bitverse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/zone.bitverse/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/zone.bitverse/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.saify":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saify/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.saify/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.plutope":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.plutope/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.plutope/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.alicebob":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alicebob/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.alicebob/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.islamicoin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.islamicoin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.islamicoin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dokwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dokwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dokwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.paraswap":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.paraswap/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.paraswap/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.nestwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.nestwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.nestwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.w3wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.w3wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.w3wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cryptnox":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptnox/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptnox/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.hippowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hippowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.hippowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.dextrade":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dextrade/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.dextrade/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.ukiss":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ukiss/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.ukiss/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.bimwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bimwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.bimwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "cc.dropp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.dropp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/cc.dropp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.tofee":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.tofee/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.tofee/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.reown.docs":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.docs/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.docs/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.certhis":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.certhis/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.certhis/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.payperless":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.payperless/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.payperless/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.safecryptowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safecryptowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safecryptowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.tiduswallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tiduswallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.tiduswallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.herewallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.herewallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.herewallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.rktechworks":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.rktechworks/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.rktechworks/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.sinohope":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sinohope/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.sinohope/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "world.fncy":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.fncy/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/world.fncy/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "network.dgg":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.dgg/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/network.dgg/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.cyber.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.cyber.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.cyber.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pub.dg":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pub.dg/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pub.dg/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.reown.appkit-lab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.appkit-lab/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.reown.appkit-lab/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.moonstake":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.moonstake/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.moonstake/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.mpcvault.broswerplugin":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mpcvault.broswerplugin/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.mpcvault.broswerplugin/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.altme":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.altme/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.altme/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.clot":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.clot/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.clot/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.talkapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.talkapp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.talkapp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "social.gm2":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.gm2/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/social.gm2/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "digital.minerva":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/digital.minerva/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/digital.minerva/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "net.stasis":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.stasis/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/net.stasis/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cryptokara":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptokara/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cryptokara/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.peakdefi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.peakdefi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.peakdefi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.xucre":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xucre/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xucre/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.example.subdomain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.example.subdomain/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.example.subdomain/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.transi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.transi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.transi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "finance.panaroma":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.panaroma/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/finance.panaroma/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "ai.spotonchain.platform":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.spotonchain.platform/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/ai.spotonchain.platform/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.omni":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.omni/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.omni/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.humbl":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.humbl/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.humbl/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "id.plumaa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.plumaa/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/id.plumaa/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "co.filwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.filwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/co.filwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "money.snowball":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.snowball/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/money.snowball/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.ennowallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ennowallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.ennowallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.safematrix":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safematrix/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.safematrix/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.assure":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.assure/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.assure/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.neftipedia":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neftipedia/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.neftipedia/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.goldbit":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.goldbit/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.goldbit/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coingrig":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coingrig/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coingrig/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.xfun":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xfun/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xfun/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.antiersolutions":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.antiersolutions/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.antiersolutions/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.itoken":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.itoken/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.itoken/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.cardstack":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cardstack/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.cardstack/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.slavi":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.slavi/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.slavi/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "tech.defiantapp":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.defiantapp/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.defiantapp/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.xenea":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xenea/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.xenea/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.superhero.cordova":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.superhero.cordova/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.superhero.cordova/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.kgen":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kgen/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.kgen/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.r0ar":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.r0ar/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.r0ar/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.dailychain.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dailychain.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.dailychain.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.freighter":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.freighter/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.freighter/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "org.ab":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ab/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/org.ab/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.walletverse":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.walletverse/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.walletverse/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.berasig":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.berasig/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.berasig/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.phantom":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.phantom/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.phantom/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.coinbase.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinbase.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.coinbase.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.rabby":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.rabby/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.rabby/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "pro.hinkal.walletconnect":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.hinkal.walletconnect/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/pro.hinkal.walletconnect/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.brave.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.brave.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.brave.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.moongate.one":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.moongate.one/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.moongate.one/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "tech.levain":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.levain/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/tech.levain/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.enkrypt":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.enkrypt/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.enkrypt/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.scramble":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.scramble/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.scramble/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.finoa":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.finoa/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.finoa/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.walletconnect.com":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.walletconnect.com/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.walletconnect.com/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.blazpay.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blazpay.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blazpay.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.getjoin.prd":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getjoin.prd/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.getjoin.prd/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.talisman":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.talisman/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.talisman/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "eu.flashsoft.clear-wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/eu.flashsoft.clear-wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/eu.flashsoft.clear-wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "app.berasig":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.berasig/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/app.berasig/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.wallet.reown":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wallet.reown/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.wallet.reown/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.blanqlabs.wallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blanqlabs.wallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.blanqlabs.wallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "com.lootrush":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lootrush/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/com.lootrush/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.dawnwallet":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.dawnwallet/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.dawnwallet/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "xyz.abs":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.abs/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/xyz.abs/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "sh.frame":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/sh.frame/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/sh.frame/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        case "io.useglyph":
            {
                return image ? __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.useglyph/image.js [app-ssr] (ecmascript, async loader)").then((img)=>img.default) : __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/wallet/io.useglyph/index.js [app-ssr] (ecmascript, async loader)").then((w)=>w.wallet);
            }
        default:
            {
                throw new Error(`Wallet with id ${id} not found`);
            }
    }
} //# sourceMappingURL=getWalletInfo.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_PROJECT_ID",
    ()=>DEFAULT_PROJECT_ID,
    "NAMESPACE",
    ()=>NAMESPACE
]);
const DEFAULT_PROJECT_ID = "08c4b07e3ad25f1a27c14a4e8cecb6f0";
const NAMESPACE = "eip155"; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/controller.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoConnectWC",
    ()=>autoConnectWC,
    "connectWC",
    ()=>connectWC,
    "isWalletConnect",
    ()=>isWalletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/typedData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/rpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/walletStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/defaultDappMetadata.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/normalizeChainId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/constants.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
let cachedProvider = null;
const storageKeys = {
    lastUsedChainId: "tw.wc.lastUsedChainId",
    requestedChains: "tw.wc.requestedChains"
};
function isWalletConnect(wallet) {
    return wallet.id === "walletConnect";
}
async function connectWC(options, emitter, walletId, storage, sessionHandler) {
    const provider = await initProvider(options, walletId, sessionHandler);
    const wcOptions = options.walletConnect;
    let { onDisplayUri } = wcOptions || {};
    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletInfo"])(walletId);
    // use default sessionHandler unless onDisplayUri is explicitly provided
    if (!onDisplayUri && sessionHandler) {
        const deeplinkHandler = (uri)=>{
            const appUrl = walletInfo.mobile.native || walletInfo.mobile.universal;
            if (!appUrl) {
                // generic wc uri
                sessionHandler(uri);
                return;
            }
            const fullUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatWalletConnectUrl"])(appUrl, uri).redirect;
            sessionHandler(fullUrl);
        };
        onDisplayUri = deeplinkHandler;
    }
    if (onDisplayUri) {
        provider.events.addListener("display_uri", onDisplayUri);
    }
    let optionalChains = wcOptions?.optionalChains;
    let chainToRequest = options.chain;
    // ignore the given options chains - and set the safe supported chains
    if (walletId === "global.safe") {
        optionalChains = chainsToRequestForSafe.map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"]);
        if (chainToRequest && !optionalChains.includes(chainToRequest)) {
            chainToRequest = undefined;
        }
    }
    // For UniversalProvider, we still need chain configuration for session management
    const { chains: chainsToRequest, rpcMap } = getChainsToRequest({
        chain: chainToRequest,
        client: options.client,
        optionalChains: optionalChains
    });
    // For UniversalProvider, we need to connect with namespaces
    await provider.connect({
        ...wcOptions?.pairingTopic ? {
            pairingTopic: wcOptions?.pairingTopic
        } : {},
        optionalNamespaces: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAMESPACE"]]: {
                chains: chainsToRequest,
                events: [
                    "chainChanged",
                    "accountsChanged"
                ],
                methods: [
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData",
                    "eth_signTypedData_v4",
                    "wallet_switchEthereumChain",
                    "wallet_addEthereumChain"
                ],
                rpcMap
            }
        }
    });
    setRequestedChainsIds(chainsToRequest.map((x)=>Number(x.split(":")[1])), storage);
    const currentChainId = chainsToRequest[0]?.split(":")[1] || 1;
    const providerChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeChainId"])(currentChainId);
    const account = firstAccountOn(provider.session, `eip155:1`); // grab the address from mainnet if available
    const address = account;
    if (!address) {
        throw new Error("No accounts found on provider.");
    }
    const chain = options.chain && options.chain.id === providerChainId ? options.chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(providerChainId);
    if (options) {
        const savedParams = {
            chain: options.chain,
            optionalChains: options.walletConnect?.optionalChains,
            pairingTopic: options.walletConnect?.pairingTopic
        };
        if (storage) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveConnectParamsToStorage"])(storage, walletId, savedParams);
        }
    }
    if (onDisplayUri) {
        provider.events.removeListener("display_uri", onDisplayUri);
    }
    return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
async function ensureTargetChain(provider, chain, walletInfo) {
    if (!provider.session) {
        throw new Error("No session found on provider.");
    }
    const TARGET_CAIP = `eip155:${chain.id}`;
    const TARGET_HEX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(chain.id);
    // Fast path: already enabled
    if (hasChainEnabled(provider.session, TARGET_CAIP)) {
        provider.setDefaultChain(TARGET_CAIP);
        return;
    }
    // 1) Try switch
    try {
        await requestAndOpenWallet({
            provider,
            payload: {
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId: TARGET_HEX
                    }
                ]
            },
            chain: TARGET_CAIP,
            walletInfo
        });
        provider.setDefaultChain(TARGET_CAIP);
        return;
    } catch (err) {
        const code = err?.code ?? err?.data?.originalError?.code;
        // 4001 user rejected; stop
        if (code === 4001) throw new Error("User rejected chain switch");
    // fall through on 4902 or unknown -> try add
    }
    // 2) Add the chain via any chain we already have
    const routeChain = anyRoutableChain(provider.session);
    if (!routeChain) throw new Error("No routable chain to send wallet_addEthereumChain");
    try {
        await requestAndOpenWallet({
            provider,
            payload: {
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: TARGET_HEX,
                        chainName: chain.name,
                        nativeCurrency: chain.nativeCurrency,
                        rpcUrls: [
                            chain.rpc
                        ],
                        blockExplorerUrls: [
                            chain.blockExplorers?.[0]?.url ?? ""
                        ]
                    }
                ]
            },
            chain: routeChain,
            walletInfo
        });
    } catch (err) {
        const code = err?.code ?? err?.data?.originalError?.code;
        if (code === 4001) throw new Error("User rejected add chain");
        throw new Error(`Add chain failed: ${err?.message || String(err)}`);
    }
    // 3) Re-try switch after add
    await requestAndOpenWallet({
        provider,
        payload: {
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: TARGET_HEX
                }
            ]
        },
        chain: TARGET_CAIP,
        walletInfo
    });
    provider.setDefaultChain(TARGET_CAIP);
    // 4) Verify enablement
    if (!hasChainEnabled(provider.session, TARGET_CAIP)) {
        throw new Error("Target chain still not enabled by wallet");
    }
}
function getNS(session) {
    return session?.namespaces?.eip155;
}
function hasChainEnabled(session, caip) {
    const ns = getNS(session);
    return !!ns?.accounts?.some((a)=>a.startsWith(`${caip}:`));
}
function firstAccountOn(session, caip) {
    const ns = getNS(session);
    const hit = ns?.accounts?.find((a)=>a.startsWith(`${caip}:`)) || ns?.accounts[0];
    return hit ? hit.split(":")[2] ?? null : null;
}
function anyRoutableChain(session) {
    const ns = getNS(session);
    return ns?.accounts?.[0]?.split(":")?.slice(0, 2)?.join(":") ?? null; // e.g. "eip155:1"
}
async function autoConnectWC(options, emitter, walletId, storage, sessionHandler) {
    const savedConnectParams = storage ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSavedConnectParamsFromStorage"])(storage, walletId) : null;
    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletInfo"])(walletId);
    const provider = await initProvider(savedConnectParams ? {
        chain: savedConnectParams.chain,
        client: options.client,
        walletConnect: {
            optionalChains: savedConnectParams.optionalChains,
            pairingTopic: savedConnectParams.pairingTopic
        }
    } : {
        client: options.client,
        walletConnect: {}
    }, walletId, sessionHandler);
    if (!provider.session) {
        await provider.disconnect();
        throw new Error("No wallet connect session found on provider.");
    }
    // For UniversalProvider, get accounts from enable() method
    const namespaceAccounts = provider.session?.namespaces?.[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAMESPACE"]]?.accounts;
    const address = namespaceAccounts?.[0]?.split(":")[2];
    if (!address) {
        throw new Error("No accounts found on provider.");
    }
    // For UniversalProvider, get chainId from the session namespaces or use default
    const currentChainId = options.chain?.id || 1;
    const providerChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeChainId"])(currentChainId);
    const chain = options.chain && options.chain.id === providerChainId ? options.chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(providerChainId);
    return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
// Connection utils -----------------------------------------------------------------------------------------------
async function initProvider(options, walletId, sessionRequestHandler) {
    if (cachedProvider) {
        return cachedProvider;
    }
    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWalletInfo"])(walletId);
    const wcOptions = options.walletConnect;
    const { UniversalProvider } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-ssr] (ecmascript, async loader)");
    let optionalChains = wcOptions?.optionalChains;
    let chainToRequest = options.chain;
    // ignore the given options chains - and set the safe supported chains
    if (walletId === "global.safe") {
        optionalChains = chainsToRequestForSafe.map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"]);
        if (chainToRequest && !optionalChains.includes(chainToRequest)) {
            chainToRequest = undefined;
        }
    }
    const provider = await UniversalProvider.init({
        metadata: {
            description: wcOptions?.appMetadata?.description || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().description,
            icons: [
                wcOptions?.appMetadata?.logoUrl || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().logoUrl
            ],
            name: wcOptions?.appMetadata?.name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().name,
            url: wcOptions?.appMetadata?.url || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().url,
            redirect: {
                native: walletInfo.mobile.native || undefined,
                universal: walletInfo.mobile.universal || undefined
            }
        },
        projectId: wcOptions?.projectId || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PROJECT_ID"]
    });
    provider.events.setMaxListeners(Number.POSITIVE_INFINITY);
    if (walletId !== "walletConnect") {
        async function handleSessionRequest() {
            const walletLinkToOpen = provider.session?.peer?.metadata?.redirect?.native || walletInfo.mobile.native || walletInfo.mobile.universal;
            if (sessionRequestHandler && walletLinkToOpen) {
                // TODO: propagate error when this fails
                await sessionRequestHandler(walletLinkToOpen);
            }
        }
        // For UniversalProvider, use different event handling
        provider.on("session_request_sent", handleSessionRequest);
        provider.events.addListener("disconnect", ()=>{
            provider.off("session_request_sent", handleSessionRequest);
            cachedProvider = null;
        });
    }
    cachedProvider = provider;
    return provider;
}
function createAccount({ provider, address, client, chain, sessionRequestHandler, walletInfo }) {
    const account = {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(address),
        async sendTransaction (tx) {
            const transactionHash = await requestAndOpenWallet({
                provider,
                payload: {
                    method: "eth_sendTransaction",
                    params: [
                        {
                            data: tx.data,
                            from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(address),
                            gas: tx.gas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.gas) : undefined,
                            to: tx.to,
                            value: tx.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.value) : undefined
                        }
                    ]
                },
                chain: `eip155:${tx.chainId}`,
                walletInfo,
                sessionRequestHandler
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackTransaction"])({
                chainId: tx.chainId,
                client: client,
                contractAddress: tx.to ?? undefined,
                gasPrice: tx.gasPrice,
                transactionHash,
                walletAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(address),
                walletType: "walletConnect"
            });
            return {
                transactionHash
            };
        },
        async signMessage ({ message }) {
            const messageToSign = (()=>{
                if (typeof message === "string") {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(message.raw);
                }
                return message.raw;
            })();
            return requestAndOpenWallet({
                provider,
                payload: {
                    method: "personal_sign",
                    params: [
                        messageToSign,
                        this.address
                    ]
                },
                chain: `eip155:${chain.id}`,
                walletInfo,
                sessionRequestHandler
            });
        },
        async signTypedData (_data) {
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseTypedData"])(_data);
            const { domain, message, primaryType } = data;
            const types = {
                EIP712Domain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTypesForEIP712Domain"])({
                    domain
                }),
                ...data.types
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateTypedData"])({
                domain,
                message,
                primaryType,
                types
            });
            const typedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTypedData"])({
                domain: domain ?? {},
                message,
                primaryType,
                types
            });
            return await requestAndOpenWallet({
                provider,
                payload: {
                    method: "eth_signTypedData_v4",
                    params: [
                        this.address,
                        typedData
                    ]
                },
                chain: `eip155:${chain.id}`,
                walletInfo,
                sessionRequestHandler
            });
        }
    };
    return account;
}
async function requestAndOpenWallet(args) {
    const { provider, payload, chain, walletInfo, sessionRequestHandler } = args;
    const resultPromise = provider.request(payload, chain);
    const walletLinkToOpen = provider.session?.peer?.metadata?.redirect?.native || walletInfo.mobile.native || walletInfo.mobile.universal;
    if (sessionRequestHandler && walletLinkToOpen) {
        await sessionRequestHandler(walletLinkToOpen);
    }
    return resultPromise;
}
function onConnect(address, chain, provider, emitter, storage, client, walletInfo, sessionRequestHandler) {
    const account = createAccount({
        address,
        chain,
        client,
        provider,
        sessionRequestHandler,
        walletInfo
    });
    async function disconnect() {
        provider.removeListener("accountsChanged", onAccountsChanged);
        provider.removeListener("chainChanged", onChainChanged);
        provider.removeListener("disconnect", onDisconnect);
        await provider.disconnect();
        cachedProvider = null;
    }
    function onDisconnect() {
        setRequestedChainsIds([], storage);
        storage?.removeItem(storageKeys.lastUsedChainId);
        disconnect();
        emitter.emit("disconnect", undefined);
    }
    function onAccountsChanged(accounts) {
        if (accounts[0]) {
            const newAccount = createAccount({
                address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(accounts[0]),
                chain,
                client,
                provider,
                sessionRequestHandler,
                walletInfo
            });
            emitter.emit("accountChanged", newAccount);
            emitter.emit("accountsChanged", accounts);
        } else {
            onDisconnect();
        }
    }
    function onChainChanged(newChainId) {
        const newChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeChainId"])(newChainId));
        emitter.emit("chainChanged", newChain);
        storage?.setItem(storageKeys.lastUsedChainId, String(newChainId));
    }
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    provider.on("disconnect", onDisconnect);
    provider.on("session_delete", onDisconnect);
    return [
        account,
        chain,
        disconnect,
        (newChain)=>switchChainWC(provider, newChain, walletInfo)
    ];
}
async function switchChainWC(provider, chain, walletInfo) {
    try {
        await ensureTargetChain(provider, chain, walletInfo);
    } catch (error) {
        const message = typeof error === "string" ? error : error?.message;
        if (/user rejected request/i.test(message)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
    }
}
/**
 * Set the requested chains to the storage.
 * @internal
 */ function setRequestedChainsIds(chains, storage) {
    storage?.setItem(storageKeys.requestedChains, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(chains));
}
function getChainsToRequest(options) {
    const rpcMap = {};
    const chainIds = [];
    if (options.chain) {
        rpcMap[options.chain.id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcUrlForChain"])({
            chain: options.chain,
            client: options.client
        });
        chainIds.push(options.chain.id);
    }
    // limit optional chains to 10
    const optionalChains = (options?.optionalChains || []).slice(0, 10);
    for (const chain of optionalChains){
        rpcMap[chain.id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcUrlForChain"])({
            chain: chain,
            client: options.client
        });
        chainIds.push(chain.id);
    }
    // always include mainnet
    // many wallets only support a handful of chains, but mainnet is always supported
    // we will add additional chains in switchChain if needed
    if (!chainIds.includes(1)) {
        rpcMap[1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(1).rpc;
        chainIds.push(1);
    }
    return {
        chains: chainIds.map((x)=>`eip155:${x}`),
        rpcMap
    };
}
const chainsToRequestForSafe = [
    1,
    11155111,
    42161,
    43114,
    8453,
    1313161554,
    84532,
    56,
    42220,
    100,
    10,
    137,
    1101,
    324,
    534352
]; //# sourceMappingURL=controller.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_d57030fc._.js.map