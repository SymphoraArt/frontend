(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/utils.js [app-client] (ecmascript)");
;
;
;
class HttpRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, headers, status, url }){
        super('HTTP request failed.', {
            cause,
            details,
            metaMessages: [
                status && `Status: ${status}`,
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                body && `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body)}`
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
class WebSocketRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, cause, details, url }){
        super('WebSocket request failed.', {
            cause,
            details,
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                body && `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ].filter(Boolean),
            name: 'WebSocketRequestError'
        });
    }
}
class RpcRequestError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, error, url }){
        super('RPC Request failed.', {
            cause: error,
            details: error.message,
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body)}`
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
class SocketClosedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ url } = {}){
        super('The socket has been closed.', {
            metaMessages: [
                url && `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)}`
            ].filter(Boolean),
            name: 'SocketClosedError'
        });
    }
}
class TimeoutError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ body, url }){
        super('The request took too long to respond.', {
            details: 'The request timed out.',
            metaMessages: [
                `URL: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUrl"])(url)}`,
                `Request body: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body)}`
            ],
            name: 'TimeoutError'
        });
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/request.js [app-client] (ecmascript)");
;
;
const unknownErrorCode = -1;
class RpcError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
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
        this.code = cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RpcRequestError"] ? cause.code : code ?? unknownErrorCode;
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/controller.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoConnectWC",
    ()=>autoConnectWC,
    "connectWC",
    ()=>connectWC,
    "isWalletConnect",
    ()=>isWalletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/typedData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/walletStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/__generated__/getWalletInfo.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/defaultDappMetadata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/utils/normalizeChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/constants.js [app-client] (ecmascript)");
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
    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletInfo"])(walletId);
    // use default sessionHandler unless onDisplayUri is explicitly provided
    if (!onDisplayUri && sessionHandler) {
        const deeplinkHandler = (uri)=>{
            const appUrl = walletInfo.mobile.native || walletInfo.mobile.universal;
            if (!appUrl) {
                // generic wc uri
                sessionHandler(uri);
                return;
            }
            const fullUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatWalletConnectUrl"])(appUrl, uri).redirect;
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
        optionalChains = chainsToRequestForSafe.map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"]);
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
            [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAMESPACE"]]: {
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
    const providerChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(currentChainId);
    const account = firstAccountOn(provider.session, `eip155:1`); // grab the address from mainnet if available
    const address = account;
    if (!address) {
        throw new Error("No accounts found on provider.");
    }
    const chain = options.chain && options.chain.id === providerChainId ? options.chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(providerChainId);
    if (options) {
        const savedParams = {
            chain: options.chain,
            optionalChains: options.walletConnect?.optionalChains,
            pairingTopic: options.walletConnect?.pairingTopic
        };
        if (storage) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveConnectParamsToStorage"])(storage, walletId, savedParams);
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
    const TARGET_HEX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(chain.id);
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
    const savedConnectParams = storage ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$walletStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSavedConnectParamsFromStorage"])(storage, walletId) : null;
    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletInfo"])(walletId);
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
    const namespaceAccounts = provider.session?.namespaces?.[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAMESPACE"]]?.accounts;
    const address = namespaceAccounts?.[0]?.split(":")[2];
    if (!address) {
        throw new Error("No accounts found on provider.");
    }
    // For UniversalProvider, get chainId from the session namespaces or use default
    const currentChainId = options.chain?.id || 1;
    const providerChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(currentChainId);
    const chain = options.chain && options.chain.id === providerChainId ? options.chain : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(providerChainId);
    return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
// Connection utils -----------------------------------------------------------------------------------------------
async function initProvider(options, walletId, sessionRequestHandler) {
    if (cachedProvider) {
        return cachedProvider;
    }
    const walletInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$_$5f$generated_$5f2f$getWalletInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletInfo"])(walletId);
    const wcOptions = options.walletConnect;
    const { UniversalProvider } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript, async loader)");
    let optionalChains = wcOptions?.optionalChains;
    let chainToRequest = options.chain;
    // ignore the given options chains - and set the safe supported chains
    if (walletId === "global.safe") {
        optionalChains = chainsToRequestForSafe.map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"]);
        if (chainToRequest && !optionalChains.includes(chainToRequest)) {
            chainToRequest = undefined;
        }
    }
    const provider = await UniversalProvider.init({
        metadata: {
            description: wcOptions?.appMetadata?.description || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().description,
            icons: [
                wcOptions?.appMetadata?.logoUrl || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().logoUrl
            ],
            name: wcOptions?.appMetadata?.name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().name,
            url: wcOptions?.appMetadata?.url || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$defaultDappMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAppMetadata"])().url,
            redirect: {
                native: walletInfo.mobile.native || undefined,
                universal: walletInfo.mobile.universal || undefined
            }
        },
        projectId: wcOptions?.projectId || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PROJECT_ID"]
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
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
        async sendTransaction (tx) {
            const transactionHash = await requestAndOpenWallet({
                provider,
                payload: {
                    method: "eth_sendTransaction",
                    params: [
                        {
                            data: tx.data,
                            from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
                            gas: tx.gas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.gas) : undefined,
                            to: tx.to,
                            value: tx.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tx.value) : undefined
                        }
                    ]
                },
                chain: `eip155:${tx.chainId}`,
                walletInfo,
                sessionRequestHandler
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                chainId: tx.chainId,
                client: client,
                contractAddress: tx.to ?? undefined,
                gasPrice: tx.gasPrice,
                transactionHash,
                walletAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
                walletType: "walletConnect"
            });
            return {
                transactionHash
            };
        },
        async signMessage ({ message }) {
            const messageToSign = (()=>{
                if (typeof message === "string") {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(message.raw);
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
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTypedData"])(_data);
            const { domain, message, primaryType } = data;
            const types = {
                EIP712Domain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTypesForEIP712Domain"])({
                    domain
                }),
                ...data.types
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateTypedData"])({
                domain,
                message,
                primaryType,
                types
            });
            const typedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$typedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeTypedData"])({
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
                address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(accounts[0]),
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
        const newChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$utils$2f$normalizeChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChainId"])(newChainId));
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
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRejectedRequestError"](error);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchChainError"](error);
    }
}
/**
 * Set the requested chains to the storage.
 * @internal
 */ function setRequestedChainsIds(chains, storage) {
    storage?.setItem(storageKeys.requestedChains, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(chains));
}
function getChainsToRequest(options) {
    const rpcMap = {};
    const chainIds = [];
    if (options.chain) {
        rpcMap[options.chain.id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcUrlForChain"])({
            chain: options.chain,
            client: options.client
        });
        chainIds.push(options.chain.id);
    }
    // limit optional chains to 10
    const optionalChains = (options?.optionalChains || []).slice(0, 10);
    for (const chain of optionalChains){
        rpcMap[chain.id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcUrlForChain"])({
            chain: chain,
            client: options.client
        });
        chainIds.push(chain.id);
    }
    // always include mainnet
    // many wallets only support a handful of chains, but mainnet is always supported
    // we will add additional chains in switchChain if needed
    if (!chainIds.includes(1)) {
        rpcMap[1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(1).rpc;
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
]);

//# sourceMappingURL=1b50e_thirdweb_b662cf90._.js.map