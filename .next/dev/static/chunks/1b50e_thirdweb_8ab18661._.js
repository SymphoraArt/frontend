(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidStorageKeySizeError",
    ()=>InvalidStorageKeySizeError,
    "fromTupleList",
    ()=>fromTupleList,
    "toTupleList",
    ()=>toTupleList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
;
;
;
;
function fromTupleList(accessList) {
    const list = [];
    for(let i = 0; i < accessList.length; i++){
        const [address, storageKeys] = accessList[i];
        if (address) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](address, {
            strict: false
        });
        list.push({
            address: address,
            storageKeys: storageKeys.map((key)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](key) ? key : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trimLeft"](key))
        });
    }
    return list;
}
function toTupleList(accessList) {
    if (!accessList || accessList.length === 0) return [];
    const tuple = [];
    for (const { address, storageKeys } of accessList){
        for(let j = 0; j < storageKeys.length; j++)if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"](storageKeys[j]) !== 32) throw new InvalidStorageKeySizeError({
            storageKey: storageKeys[j]
        });
        if (address) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](address, {
            strict: false
        });
        tuple.push([
            address,
            storageKeys
        ]);
    }
    return tuple;
}
class InvalidStorageKeySizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ storageKey }){
        super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"](storageKey)} bytes.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AccessList.InvalidStorageKeySizeError'
        });
    }
} //# sourceMappingURL=AccessList.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Value.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidDecimalNumberError",
    ()=>InvalidDecimalNumberError,
    "exponents",
    ()=>exponents,
    "format",
    ()=>format,
    "formatEther",
    ()=>formatEther,
    "formatGwei",
    ()=>formatGwei,
    "from",
    ()=>from,
    "fromEther",
    ()=>fromEther,
    "fromGwei",
    ()=>fromGwei
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-client] (ecmascript)");
;
const exponents = {
    wei: 0,
    gwei: 9,
    szabo: 12,
    finney: 15,
    ether: 18
};
function format(value, decimals = 0) {
    let display = value.toString();
    const negative = display.startsWith('-');
    if (negative) display = display.slice(1);
    display = display.padStart(decimals, '0');
    let [integer, fraction] = [
        display.slice(0, display.length - decimals),
        display.slice(display.length - decimals)
    ];
    fraction = fraction.replace(/(0+)$/, '');
    return `${negative ? '-' : ''}${integer || '0'}${fraction ? `.${fraction}` : ''}`;
}
function formatEther(wei, unit = 'wei') {
    return format(wei, exponents.ether - exponents[unit]);
}
function formatGwei(wei, unit = 'wei') {
    return format(wei, exponents.gwei - exponents[unit]);
}
function from(value, decimals = 0) {
    if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value)) throw new InvalidDecimalNumberError({
        value
    });
    let [integer = '', fraction = '0'] = value.split('.');
    const negative = integer.startsWith('-');
    if (negative) integer = integer.slice(1);
    // trim trailing zeros.
    fraction = fraction.replace(/(0+)$/, '');
    // round off if the fraction is larger than the number of decimals.
    if (decimals === 0) {
        if (Math.round(Number(`.${fraction}`)) === 1) integer = `${BigInt(integer) + 1n}`;
        fraction = '';
    } else if (fraction.length > decimals) {
        const [left, unit, right] = [
            fraction.slice(0, decimals - 1),
            fraction.slice(decimals - 1, decimals),
            fraction.slice(decimals)
        ];
        const rounded = Math.round(Number(`${unit}.${right}`));
        if (rounded > 9) fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0');
        else fraction = `${left}${rounded}`;
        if (fraction.length > decimals) {
            fraction = fraction.slice(1);
            integer = `${BigInt(integer) + 1n}`;
        }
        fraction = fraction.slice(0, decimals);
    } else {
        fraction = fraction.padEnd(decimals, '0');
    }
    return BigInt(`${negative ? '-' : ''}${integer}${fraction}`);
}
function fromEther(ether, unit = 'wei') {
    return from(ether, exponents.ether - exponents[unit]);
}
function fromGwei(gwei, unit = 'wei') {
    return from(gwei, exponents.gwei - exponents[unit]);
}
class InvalidDecimalNumberError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ value }){
        super(`Value \`${value}\` is not a valid decimal number.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Value.InvalidDecimalNumberError'
        });
    }
} //# sourceMappingURL=Value.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeeCapTooHighError",
    ()=>FeeCapTooHighError,
    "GasPriceTooHighError",
    ()=>GasPriceTooHighError,
    "InvalidChainIdError",
    ()=>InvalidChainIdError,
    "InvalidSerializedError",
    ()=>InvalidSerializedError,
    "TipAboveFeeCapError",
    ()=>TipAboveFeeCapError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Value.js [app-client] (ecmascript)");
;
;
class FeeCapTooHighError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ feeCap } = {}){
        super(`The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${feeCap ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatGwei"](feeCap)} gwei` : ''}) cannot be higher than the maximum allowed value (2^256-1).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.FeeCapTooHighError'
        });
    }
}
class GasPriceTooHighError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ gasPrice } = {}){
        super(`The gas price (\`gasPrice\`${gasPrice ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatGwei"](gasPrice)} gwei` : ''}) cannot be higher than the maximum allowed value (2^256-1).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.GasPriceTooHighError'
        });
    }
}
class InvalidChainIdError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ chainId }){
        super(typeof chainId !== 'undefined' ? `Chain ID "${chainId}" is invalid.` : 'Chain ID is invalid.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.InvalidChainIdError'
        });
    }
}
class InvalidSerializedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ attributes, serialized, type }){
        const missing = Object.entries(attributes).map(([key, value])=>typeof value === 'undefined' ? key : undefined).filter(Boolean);
        super(`Invalid serialized transaction of type "${type}" was provided.`, {
            metaMessages: [
                `Serialized Transaction: "${serialized}"`,
                missing.length > 0 ? `Missing Attributes: ${missing.join(', ')}` : ''
            ].filter(Boolean)
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.InvalidSerializedError'
        });
    }
}
class TipAboveFeeCapError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ maxPriorityFeePerGas, maxFeePerGas } = {}){
        super([
            `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatGwei"](maxPriorityFeePerGas)} gwei` : ''}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatGwei"](maxFeePerGas)} gwei` : ''}).`
        ].join('\n'));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.TipAboveFeeCapError'
        });
    }
} //# sourceMappingURL=TransactionEnvelope.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip1559.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assert",
    ()=>assert,
    "deserialize",
    ()=>deserialize,
    "from",
    ()=>from,
    "getSignPayload",
    ()=>getSignPayload,
    "hash",
    ()=>hash,
    "serialize",
    ()=>serialize,
    "serializedType",
    ()=>serializedType,
    "toRpc",
    ()=>toRpc,
    "type",
    ()=>type,
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const serializedType = '0x02';
const type = 'eip1559';
function assert(envelope) {
    const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = envelope;
    if (chainId <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
        chainId
    });
    if (to) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](to, {
        strict: false
    });
    if (maxFeePerGas && BigInt(maxFeePerGas) > 2n ** 256n - 1n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeeCapTooHighError"]({
        feeCap: maxFeePerGas
    });
    if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TipAboveFeeCapError"]({
        maxFeePerGas,
        maxPriorityFeePerGas
    });
}
function deserialize(serialized) {
    const transactionArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slice"](serialized, 1));
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, yParity, r, s] = transactionArray;
    if (!(transactionArray.length === 9 || transactionArray.length === 12)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
        attributes: {
            chainId,
            nonce,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gas,
            to,
            value,
            data,
            accessList,
            ...transactionArray.length > 9 ? {
                yParity,
                r,
                s
            } : {}
        },
        serialized,
        type
    });
    let transaction = {
        chainId: Number(chainId),
        type
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](maxFeePerGas) && maxFeePerGas !== '0x') transaction.maxFeePerGas = BigInt(maxFeePerGas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x') transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x') transaction.accessList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTupleList"](accessList);
    const signature = r && s && yParity ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTuple"]([
        yParity,
        r,
        s
    ]) : undefined;
    if (signature) transaction = {
        ...transaction,
        ...signature
    };
    assert(transaction);
    return transaction;
}
function from(envelope, options = {}) {
    const { signature } = options;
    const envelope_ = typeof envelope === 'string' ? deserialize(envelope) : envelope;
    assert(envelope_);
    return {
        ...envelope_,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"](signature) : {},
        type: 'eip1559'
    };
}
function getSignPayload(envelope) {
    return hash(envelope, {
        presign: true
    });
}
function hash(envelope, options = {}) {
    const { presign } = options;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"](serialize({
        ...envelope,
        ...presign ? {
            r: undefined,
            s: undefined,
            yParity: undefined,
            v: undefined
        } : {}
    }));
}
function serialize(envelope, options = {}) {
    const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, input } = envelope;
    assert(envelope);
    const accessTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTupleList"](accessList);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extract"](options.signature || envelope);
    const serialized = [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        maxPriorityFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](maxFeePerGas) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x',
        accessTupleList,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTuple"](signature) : []
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](serializedType, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromHex"](serialized));
}
function toRpc(envelope) {
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extract"](envelope);
    return {
        ...envelope,
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.chainId),
        data: envelope.data ?? envelope.input,
        type: '0x2',
        ...typeof envelope.gas === 'bigint' ? {
            gas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gas)
        } : {},
        ...typeof envelope.nonce === 'bigint' ? {
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.nonce)
        } : {},
        ...typeof envelope.value === 'bigint' ? {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.value)
        } : {},
        ...typeof envelope.maxFeePerGas === 'bigint' ? {
            maxFeePerGas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.maxFeePerGas)
        } : {},
        ...typeof envelope.maxPriorityFeePerGas === 'bigint' ? {
            maxPriorityFeePerGas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.maxPriorityFeePerGas)
        } : {},
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRpc"](signature) : {}
    };
}
function validate(envelope) {
    try {
        assert(envelope);
        return true;
    } catch  {
        return false;
    }
} //# sourceMappingURL=TransactionEnvelopeEip1559.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip2930.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assert",
    ()=>assert,
    "deserialize",
    ()=>deserialize,
    "from",
    ()=>from,
    "getSignPayload",
    ()=>getSignPayload,
    "hash",
    ()=>hash,
    "serialize",
    ()=>serialize,
    "serializedType",
    ()=>serializedType,
    "toRpc",
    ()=>toRpc,
    "type",
    ()=>type,
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const serializedType = '0x01';
const type = 'eip2930';
function assert(envelope) {
    const { chainId, gasPrice, to } = envelope;
    if (chainId <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
        chainId
    });
    if (to) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](to, {
        strict: false
    });
    if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GasPriceTooHighError"]({
        gasPrice
    });
}
function deserialize(serialized) {
    const transactionArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slice"](serialized, 1));
    const [chainId, nonce, gasPrice, gas, to, value, data, accessList, yParity, r, s] = transactionArray;
    if (!(transactionArray.length === 8 || transactionArray.length === 11)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
        attributes: {
            chainId,
            nonce,
            gasPrice,
            gas,
            to,
            value,
            data,
            accessList,
            ...transactionArray.length > 8 ? {
                yParity,
                r,
                s
            } : {}
        },
        serialized,
        type
    });
    let transaction = {
        chainId: Number(chainId),
        type
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](gasPrice) && gasPrice !== '0x') transaction.gasPrice = BigInt(gasPrice);
    if (accessList.length !== 0 && accessList !== '0x') transaction.accessList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTupleList"](accessList);
    const signature = r && s && yParity ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTuple"]([
        yParity,
        r,
        s
    ]) : undefined;
    if (signature) transaction = {
        ...transaction,
        ...signature
    };
    assert(transaction);
    return transaction;
}
function from(envelope, options = {}) {
    const { signature } = options;
    const envelope_ = typeof envelope === 'string' ? deserialize(envelope) : envelope;
    assert(envelope_);
    return {
        ...envelope_,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"](signature) : {},
        type: 'eip2930'
    };
}
function getSignPayload(envelope) {
    return hash(envelope, {
        presign: true
    });
}
function hash(envelope, options = {}) {
    const { presign } = options;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"](serialize({
        ...envelope,
        ...presign ? {
            r: undefined,
            s: undefined,
            yParity: undefined,
            v: undefined
        } : {}
    }));
}
function serialize(envelope, options = {}) {
    const { chainId, gas, data, input, nonce, to, value, accessList, gasPrice } = envelope;
    assert(envelope);
    const accessTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTupleList"](accessList);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extract"](options.signature || envelope);
    const serialized = [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        gasPrice ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](gasPrice) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x',
        accessTupleList,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTuple"](signature) : []
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"]('0x01', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromHex"](serialized));
}
function toRpc(envelope) {
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extract"](envelope);
    return {
        ...envelope,
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.chainId),
        data: envelope.data ?? envelope.input,
        ...typeof envelope.gas === 'bigint' ? {
            gas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gas)
        } : {},
        ...typeof envelope.nonce === 'bigint' ? {
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.nonce)
        } : {},
        ...typeof envelope.value === 'bigint' ? {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.value)
        } : {},
        ...typeof envelope.gasPrice === 'bigint' ? {
            gasPrice: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gasPrice)
        } : {},
        type: '0x1',
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRpc"](signature) : {}
    };
}
function validate(envelope) {
    try {
        assert(envelope);
        return true;
    } catch  {
        return false;
    }
} //# sourceMappingURL=TransactionEnvelopeEip2930.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip7702.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assert",
    ()=>assert,
    "deserialize",
    ()=>deserialize,
    "from",
    ()=>from,
    "getSignPayload",
    ()=>getSignPayload,
    "hash",
    ()=>hash,
    "serialize",
    ()=>serialize,
    "serializedType",
    ()=>serializedType,
    "type",
    ()=>type,
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Authorization.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip1559.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const serializedType = '0x04';
const type = 'eip7702';
function assert(envelope) {
    const { authorizationList } = envelope;
    if (authorizationList) {
        for (const authorization of authorizationList){
            const { address, chainId } = authorization;
            if (address) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](address, {
                strict: false
            });
            if (Number(chainId) < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
                chainId
            });
        }
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](envelope);
}
function deserialize(serialized) {
    const transactionArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slice"](serialized, 1));
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, authorizationList, yParity, r, s] = transactionArray;
    if (!(transactionArray.length === 10 || transactionArray.length === 13)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
        attributes: {
            chainId,
            nonce,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gas,
            to,
            value,
            data,
            accessList,
            authorizationList,
            ...transactionArray.length > 9 ? {
                yParity,
                r,
                s
            } : {}
        },
        serialized,
        type
    });
    let transaction = {
        chainId: Number(chainId),
        type
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](maxFeePerGas) && maxFeePerGas !== '0x') transaction.maxFeePerGas = BigInt(maxFeePerGas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x') transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x') transaction.accessList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTupleList"](accessList);
    if (authorizationList !== '0x') transaction.authorizationList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTupleList"](authorizationList);
    const signature = r && s && yParity ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromTuple"]([
        yParity,
        r,
        s
    ]) : undefined;
    if (signature) transaction = {
        ...transaction,
        ...signature
    };
    assert(transaction);
    return transaction;
}
function from(envelope, options = {}) {
    const { signature } = options;
    const envelope_ = typeof envelope === 'string' ? deserialize(envelope) : envelope;
    assert(envelope_);
    return {
        ...envelope_,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"](signature) : {},
        type: 'eip7702'
    };
}
function getSignPayload(envelope) {
    return hash(envelope, {
        presign: true
    });
}
function hash(envelope, options = {}) {
    const { presign } = options;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"](serialize({
        ...envelope,
        ...presign ? {
            r: undefined,
            s: undefined,
            yParity: undefined
        } : {}
    }));
}
function serialize(envelope, options = {}) {
    const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, input } = envelope;
    assert(envelope);
    const accessTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTupleList"](accessList);
    const authorizationTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTupleList"](authorizationList);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extract"](options.signature || envelope);
    const serialized = [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        maxPriorityFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](maxFeePerGas) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x',
        accessTupleList,
        authorizationTupleList,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toTuple"](signature) : []
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](serializedType, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromHex"](serialized));
}
function validate(envelope) {
    try {
        assert(envelope);
        return true;
    } catch  {
        return false;
    }
} //# sourceMappingURL=TransactionEnvelopeEip7702.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeLegacy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assert",
    ()=>assert,
    "deserialize",
    ()=>deserialize,
    "from",
    ()=>from,
    "getSignPayload",
    ()=>getSignPayload,
    "hash",
    ()=>hash,
    "serialize",
    ()=>serialize,
    "toRpc",
    ()=>toRpc,
    "type",
    ()=>type,
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-client] (ecmascript)");
;
;
;
;
;
;
const type = 'legacy';
function assert(envelope) {
    const { chainId, gasPrice, to } = envelope;
    if (to) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](to, {
        strict: false
    });
    if (typeof chainId !== 'undefined' && chainId <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
        chainId
    });
    if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GasPriceTooHighError"]({
        gasPrice
    });
}
function deserialize(serialized) {
    const tuple = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"](serialized);
    const [nonce, gasPrice, gas, to, value, data, chainIdOrV_, r, s] = tuple;
    if (!(tuple.length === 6 || tuple.length === 9)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
        attributes: {
            nonce,
            gasPrice,
            gas,
            to,
            value,
            data,
            ...tuple.length > 6 ? {
                v: chainIdOrV_,
                r,
                s
            } : {}
        },
        serialized,
        type
    });
    const transaction = {
        type
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](gasPrice) && gasPrice !== '0x') transaction.gasPrice = BigInt(gasPrice);
    if (tuple.length === 6) return transaction;
    const chainIdOrV = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"](chainIdOrV_) && chainIdOrV_ !== '0x' ? Number(chainIdOrV_) : 0;
    if (s === '0x' && r === '0x') {
        if (chainIdOrV > 0) transaction.chainId = Number(chainIdOrV);
        return transaction;
    }
    const v = chainIdOrV;
    const chainId = Math.floor((v - 35) / 2);
    if (chainId > 0) transaction.chainId = chainId;
    else if (v !== 27 && v !== 28) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidVError"]({
        value: v
    });
    transaction.yParity = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vToYParity"](v);
    transaction.v = v;
    transaction.s = s === '0x' ? 0n : BigInt(s);
    transaction.r = r === '0x' ? 0n : BigInt(r);
    assert(transaction);
    return transaction;
}
function from(envelope, options = {}) {
    const { signature } = options;
    const envelope_ = typeof envelope === 'string' ? deserialize(envelope) : envelope;
    assert(envelope_);
    const signature_ = (()=>{
        if (!signature) return {};
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["from"](signature);
        s.v = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yParityToV"](s.yParity);
        return s;
    })();
    return {
        ...envelope_,
        ...signature_,
        type: 'legacy'
    };
}
function getSignPayload(envelope) {
    return hash(envelope, {
        presign: true
    });
}
function hash(envelope, options = {}) {
    const { presign } = options;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"](serialize({
        ...envelope,
        ...presign ? {
            r: undefined,
            s: undefined,
            yParity: undefined,
            v: undefined
        } : {}
    }));
}
function serialize(envelope, options = {}) {
    const { chainId = 0, gas, data, input, nonce, to, value, gasPrice } = envelope;
    assert(envelope);
    let serialized = [
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        gasPrice ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](gasPrice) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x'
    ];
    const signature = (()=>{
        if (options.signature) return {
            r: options.signature.r,
            s: options.signature.s,
            v: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yParityToV"](options.signature.yParity)
        };
        if (typeof envelope.r === 'undefined' || typeof envelope.s === 'undefined') return undefined;
        return {
            r: envelope.r,
            s: envelope.s,
            v: envelope.v
        };
    })();
    if (signature) {
        const v = (()=>{
            // EIP-155 (inferred chainId)
            if (signature.v >= 35) {
                const inferredChainId = Math.floor((signature.v - 35) / 2);
                if (inferredChainId > 0) return signature.v;
                return 27 + (signature.v === 35 ? 0 : 1);
            }
            // EIP-155 (explicit chainId)
            if (chainId > 0) return chainId * 2 + 35 + signature.v - 27;
            // Pre-EIP-155 (no chainId)
            const v = 27 + (signature.v === 27 ? 0 : 1);
            if (signature.v !== v) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidVError"]({
                value: signature.v
            });
            return v;
        })();
        serialized = [
            ...serialized,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](v),
            signature.r === 0n ? '0x' : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trimLeft"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](signature.r)),
            signature.s === 0n ? '0x' : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trimLeft"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](signature.s))
        ];
    } else if (chainId > 0) serialized = [
        ...serialized,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        '0x',
        '0x'
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromHex"](serialized);
}
function toRpc(envelope) {
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extract"](envelope);
    return {
        ...envelope,
        chainId: typeof envelope.chainId === 'number' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.chainId) : undefined,
        data: envelope.data ?? envelope.input,
        type: '0x0',
        ...typeof envelope.gas === 'bigint' ? {
            gas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gas)
        } : {},
        ...typeof envelope.nonce === 'bigint' ? {
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.nonce)
        } : {},
        ...typeof envelope.value === 'bigint' ? {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.value)
        } : {},
        ...typeof envelope.gasPrice === 'bigint' ? {
            gasPrice: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gasPrice)
        } : {},
        ...signature ? {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRpc"](signature),
            v: signature.yParity === 0 ? '0x1b' : '0x1c'
        } : {}
    };
}
function validate(envelope) {
    try {
        assert(envelope);
        return true;
    } catch  {
        return false;
    }
} //# sourceMappingURL=TransactionEnvelopeLegacy.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/serialize-transaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeTransaction",
    ()=>serializeTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip1559.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip2930$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip2930.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip7702$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip7702.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeLegacy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeLegacy.js [app-client] (ecmascript)");
;
;
;
;
;
;
function serializeTransaction(options) {
    const { transaction } = options;
    const type = getTransactionEnvelopeType(transaction);
    // This is to maintain compatibility with our old interface (including the signature in the transaction object)
    const signature = (()=>{
        if (options.signature) {
            if ("v" in options.signature && typeof options.signature.v !== "undefined") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromLegacy"]({
                    r: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.r),
                    s: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.s),
                    v: Number(options.signature.v)
                });
            }
            return {
                r: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.r),
                s: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.s),
                // We force the Signature type here because we filter for legacy type above
                yParity: options.signature.yParity
            };
        }
        if (typeof transaction.v === "undefined" && typeof transaction.yParity === "undefined") {
            return undefined;
        }
        if (transaction.r === undefined || transaction.s === undefined) {
            throw new Error("Invalid signature provided with transaction");
        }
        return {
            r: typeof transaction.r === "bigint" ? transaction.r : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](transaction.r),
            s: typeof transaction.s === "bigint" ? transaction.s : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"](transaction.s),
            yParity: typeof transaction.v !== "undefined" && typeof transaction.yParity === "undefined" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vToYParity"](Number(transaction.v)) : Number(transaction.yParity)
        };
    })();
    if (type === "eip1559") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    if (type === "legacy") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeLegacy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeLegacy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    if (type === "eip2930") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip2930$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip2930$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    if (type === "eip7702") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip7702$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip7702$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    throw new Error("Invalid transaction type");
}
/**
 * @internal
 */ function getTransactionEnvelopeType(transactionEnvelope) {
    if (typeof transactionEnvelope.type !== "undefined") {
        return transactionEnvelope.type;
    }
    if (typeof transactionEnvelope.authorizationList !== "undefined") {
        return "eip7702";
    }
    if (typeof transactionEnvelope.maxFeePerGas !== "undefined" || typeof transactionEnvelope.maxPriorityFeePerGas !== "undefined") {
        return "eip1559";
    }
    if (typeof transactionEnvelope.gasPrice !== "undefined") {
        if (typeof transactionEnvelope.accessList !== "undefined") {
            return "eip2930";
        }
        return "legacy";
    }
    throw new Error("Invalid transaction type");
} //# sourceMappingURL=serialize-transaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/estimate-l1-fee.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "estimateL1Fee",
    ()=>estimateL1Fee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$serialize$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/serialize-transaction.js [app-client] (ecmascript)");
;
;
;
;
const OPStackGasPriceOracleAddress = "0x420000000000000000000000000000000000000F";
async function estimateL1Fee(options) {
    const { transaction, gasPriceOracleAddress } = options;
    const oracleContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: gasPriceOracleAddress || OPStackGasPriceOracleAddress,
        chain: transaction.chain,
        client: transaction.client
    });
    //
    // biome-ignore lint/correctness/noUnusedVariables: purposefully remove gasPrice from the transaction
    const { gasPrice, ...serializableTx } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
        transaction
    });
    const serialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$serialize$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeTransaction"])({
        transaction: serializableTx
    });
    //serializeTransaction(transaction);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
        contract: oracleContract,
        method: "function getL1Fee(bytes memory _data) view returns (uint256)",
        params: [
            serialized
        ]
    });
} //# sourceMappingURL=estimate-l1-fee.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_8ab18661._.js.map