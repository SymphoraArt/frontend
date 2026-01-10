module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAbiItem",
    ()=>parseAbiItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/errors/abiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/runtime/signatures.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/runtime/structs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/runtime/utils.js [app-ssr] (ecmascript)");
;
;
;
;
function parseAbiItem(signature) {
    let abiItem;
    if (typeof signature === 'string') abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSignature"])(signature);
    else {
        const structs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseStructs"])(signature);
        const length = signature.length;
        for(let i = 0; i < length; i++){
            const signature_ = signature[i];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isStructSignature"])(signature_)) continue;
            abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSignature"])(signature_, structs);
            break;
        }
    }
    if (!abiItem) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidAbiItemError"]({
        signature
    });
    return abiItem;
} //# sourceMappingURL=parseAbiItem.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_call.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_call",
    ()=>eth_call
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
;
function encodeStateOverrides(overrides) {
    return Object.fromEntries(Object.entries(overrides).map(([address, override])=>{
        return [
            address,
            {
                balance: override.balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(override.balance) : undefined,
                code: override.code,
                nonce: override.nonce ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(override.nonce) : undefined,
                state: override.state,
                stateDiff: override.stateDiff
            }
        ];
    }));
}
async function eth_call(request, params) {
    const { blockNumber, blockTag, ...txRequest } = params;
    const blockNumberHex = blockNumber ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(blockNumber) : undefined;
    // default to "latest" if no block is provided
    const block = blockNumberHex || blockTag || "latest";
    return await request({
        method: "eth_call",
        params: params.stateOverrides ? [
            txRequest,
            block,
            encodeStateOverrides(params.stateOverrides)
        ] : [
            txRequest,
            block
        ]
    });
} //# sourceMappingURL=eth_call.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/byte-size.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "byteSize",
    ()=>byteSize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-ssr] (ecmascript)");
;
function byteSize(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) {
        return Math.ceil((value.length - 2) / 2);
    }
    return value.length;
} //# sourceMappingURL=byte-size.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeAbiParameters",
    ()=>encodeAbiParameters,
    "encodeAddress",
    ()=>encodeAddress,
    "prepareParam",
    ()=>prepareParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/byte-size.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
;
;
;
;
function encodeAbiParameters(params, values) {
    if (params.length !== values.length) {
        throw new Error("The number of parameters and values must match.");
    }
    // Prepare the parameters to determine dynamic types to encode.
    const preparedParams = prepareParams({
        params: params,
        values
    });
    const data = encodeParams(preparedParams);
    if (data.length === 0) {
        return "0x";
    }
    return data;
}
function prepareParams({ params, values }) {
    const preparedParams = [];
    for(let i = 0; i < params.length; i++){
        // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
        preparedParams.push(prepareParam({
            param: params[i],
            value: values[i]
        }));
    }
    return preparedParams;
}
function prepareParam({ param, value }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
        const [length, type] = arrayComponents;
        return encodeArray(value, {
            length,
            param: {
                ...param,
                type
            }
        });
    }
    if (param.type === "tuple") {
        return encodeTuple(value, {
            param: param
        });
    }
    if (param.type === "address") {
        return encodeAddress(value);
    }
    if (param.type === "bool") {
        return encodeBool(value);
    }
    if (param.type.startsWith("uint") || param.type.startsWith("int")) {
        const signed = param.type.startsWith("int");
        return encodeNumber(value, {
            signed
        });
    }
    if (param.type.startsWith("bytes")) {
        return encodeBytes(value, {
            param
        });
    }
    if (param.type === "string") {
        return encodeString(value);
    }
    throw new Error(`Unsupported parameter type: ${param.type}`);
}
function encodeParams(preparedParams) {
    // 1. Compute the size of the static part of the parameters.
    let staticSize = 0;
    for(let i = 0; i < preparedParams.length; i++){
        // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic) {
            staticSize += 32;
        } else {
            staticSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["byteSize"])(encoded);
        }
    }
    // 2. Split the parameters into static and dynamic parts.
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for(let i = 0; i < preparedParams.length; i++){
        // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic) {
            staticParams.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(staticSize + dynamicSize, {
                size: 32
            }));
            dynamicParams.push(encoded);
            dynamicSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["byteSize"])(encoded);
        } else {
            staticParams.push(encoded);
        }
    }
    // 3. Concatenate static and dynamic parts.
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...[
        ...staticParams,
        ...dynamicParams
    ]);
}
function encodeAddress(value) {
    // We allow empty strings for deployment transactions where there is no to address
    if (value !== "" && value !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(value)) {
        throw new Error(`Invalid address: ${value}`);
    }
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(value.toLowerCase())
    };
}
function encodeArray(value, { length, param }) {
    const dynamic = length === null;
    if (!Array.isArray(value)) {
        throw new Error("Invalid array value.");
    }
    if (!dynamic && value.length !== length) {
        throw new Error("Invalid array length.");
    }
    let dynamicChild = false;
    const preparedParams = [];
    for(let i = 0; i < value.length; i++){
        const preparedParam = prepareParam({
            param,
            value: value[i]
        });
        if (preparedParam.dynamic) {
            dynamicChild = true;
        }
        preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
        const data = encodeParams(preparedParams);
        if (dynamic) {
            const length_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(preparedParams.length, {
                size: 32
            });
            return {
                dynamic: true,
                encoded: preparedParams.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...[
                    length_,
                    data
                ]) : length_
            };
        }
        if (dynamicChild) {
            return {
                dynamic: true,
                encoded: data
            };
        }
    }
    return {
        dynamic: false,
        encoded: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...preparedParams.map(({ encoded })=>encoded))
    };
}
function encodeBytes(value, { param }) {
    const [, paramSize] = param.type.split("bytes");
    const bytesSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["byteSize"])(value);
    if (!paramSize) {
        let value_ = value;
        // If the size is not divisible by 32 bytes, pad the end
        // with empty bytes to the ceiling 32 bytes.
        if (bytesSize % 32 !== 0) {
            value_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(value_, {
                dir: "right",
                size: Math.ceil((value.length - 2) / 2 / 32) * 32
            });
        }
        return {
            dynamic: true,
            encoded: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...[
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(bytesSize, {
                    size: 32
                })),
                value_
            ])
        };
    }
    if (bytesSize !== Number.parseInt(paramSize)) {
        throw new Error(`Invalid bytes${paramSize} size: ${bytesSize}`);
    }
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(value, {
            dir: "right"
        })
    };
}
function encodeBool(value) {
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["boolToHex"])(value))
    };
}
function encodeNumber(value, { signed }) {
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(value, {
            signed,
            size: 32
        })
    };
}
function encodeString(value) {
    const hexValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(value);
    const partsLength = Math.ceil((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["byteSize"])(hexValue) / 32);
    const parts = [];
    for(let i = 0; i < partsLength; i++){
        parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](hexValue, i * 32, (i + 1) * 32), {
            dir: "right"
        }));
    }
    return {
        dynamic: true,
        encoded: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...[
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["byteSize"])(hexValue), {
                size: 32
            })),
            ...parts
        ])
    };
}
function encodeTuple(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for(let i = 0; i < param.components.length; i++){
        // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
        const param_ = param.components[i];
        const index = Array.isArray(value) ? i : param_.name;
        const preparedParam = prepareParam({
            param: param_,
            // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
            // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
            value: value[index]
        });
        preparedParams.push(preparedParam);
        if (preparedParam.dynamic) {
            dynamic = true;
        }
    }
    return {
        dynamic,
        encoded: dynamic ? encodeParams(preparedParams) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...preparedParams.map(({ encoded })=>encoded))
    };
}
function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches ? // biome-ignore lint/style/noNonNullAssertion: we know the value is not `undefined`.
    [
        matches[2] ? Number(matches[2]) : null,
        matches[1]
    ] : undefined;
} //# sourceMappingURL=encodeAbiParameters.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/prepare-method.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareMethod",
    ()=>prepareMethod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
;
;
;
;
const prepareMethodCache = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LruMap"](4096);
function prepareMethod(method) {
    const key = typeof method === "string" ? method : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(method);
    if (prepareMethodCache.has(key)) {
        return prepareMethodCache.get(key);
    }
    const abiFn = typeof method === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])(method) : method;
    // encode the method signature
    const sig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFunctionSelector"])(abiFn);
    const ret = [
        sig,
        abiFn.inputs,
        abiFn.outputs
    ];
    prepareMethodCache.set(key, ret);
    return ret;
} //# sourceMappingURL=prepare-method.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base",
    ()=>base
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const base = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            apiUrl: "https://api.basescan.org/api",
            name: "Basescan",
            url: "https://basescan.org"
        }
    ],
    id: 8453,
    name: "Base",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH"
    }
}); //# sourceMappingURL=base.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base-sepolia.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseSepolia",
    ()=>baseSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const baseSepolia = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            apiUrl: "https://api-sepolia.basescan.org/api",
            name: "Basescan",
            url: "https://sepolia.basescan.org"
        }
    ],
    id: 84532,
    name: "Base Sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Sepolia Ether",
        symbol: "ETH"
    },
    testnet: true
}); //# sourceMappingURL=base-sepolia.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optimism",
    ()=>optimism
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const optimism = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            apiUrl: "https://api-optimistic.etherscan.io",
            name: "Optimism Explorer",
            url: "https://optimistic.etherscan.io"
        }
    ],
    id: 10,
    name: "OP Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH"
    }
}); //# sourceMappingURL=optimism.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism-sepolia.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optimismSepolia",
    ()=>optimismSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const optimismSepolia = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            apiUrl: "https://optimism-sepolia.blockscout.com/api",
            name: "Blockscout",
            url: "https://optimism-sepolia.blockscout.com"
        }
    ],
    id: 11155420,
    name: "OP Sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Sepolia Ether",
        symbol: "ETH"
    },
    testnet: true
}); //# sourceMappingURL=optimism-sepolia.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zora",
    ()=>zora
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const zora = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            apiUrl: "https://explorer.zora.energy/api",
            name: "Explorer",
            url: "https://explorer.zora.energy"
        }
    ],
    id: 7777777,
    name: "Zora",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH"
    }
}); //# sourceMappingURL=zora.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora-sepolia.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zoraSepolia",
    ()=>zoraSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const zoraSepolia = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            apiUrl: "https://sepolia.explorer.zora.energy/api",
            name: "Zora Sepolia Explorer",
            url: "https://sepolia.explorer.zora.energy/"
        }
    ],
    id: 999999999,
    name: "Zora Sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Zora Sepolia",
        symbol: "ETH"
    },
    testnet: true
}); //# sourceMappingURL=zora-sepolia.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isOpStackChain",
    ()=>isOpStackChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2d$sepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base-sepolia.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2d$sepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism-sepolia.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2d$sepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora-sepolia.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const opChains = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2d$sepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseSepolia"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optimism"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2d$sepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optimismSepolia"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zora"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2d$sepolia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zoraSepolia"].id,
    34443,
    919,
    42220,
    44787,
    204,
    5611
];
async function isOpStackChain(chain) {
    if (chain.id === 1337 || chain.id === 31337) {
        return false;
    }
    if (opChains.includes(chain.id)) {
        return true;
    }
    // fallback to checking the stack on rpc
    try {
        const { getChainMetadata } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript, async loader)");
        const chainMetadata = await getChainMetadata(chain);
        return chainMetadata.stackType === "optimism_bedrock";
    } catch  {
        // If the network check fails, assume it's not a OP chain
        return false;
    }
} //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas-cost.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "estimateGasCost",
    ()=>estimateGasCost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/fee-data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas.js [app-ssr] (ecmascript)");
;
;
;
;
;
async function estimateGasCost(options) {
    const { transaction } = options;
    const from = options.from ?? options.account?.address ?? undefined;
    const gasLimit = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.gas) || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateGas"])({
        from,
        transaction
    });
    const fees = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultGasOverrides"])(transaction.client, transaction.chain);
    const gasPrice = fees.maxFeePerGas || fees.gasPrice;
    if (gasPrice === undefined) {
        throw new Error(`Unable to determine gas price for chain ${transaction.chain.id}`);
    }
    let l1Fee;
    if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOpStackChain"])(transaction.chain)) {
        const { estimateL1Fee } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/estimate-l1-fee.js [app-ssr] (ecmascript, async loader)");
        l1Fee = await estimateL1Fee({
            transaction
        });
    } else {
        l1Fee = 0n;
    }
    const wei = gasLimit * gasPrice + l1Fee;
    return {
        ether: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toEther"])(wei),
        wei
    };
} //# sourceMappingURL=estimate-gas-cost.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTransactionGasCost",
    ()=>getTransactionGasCost,
    "isAbiFunction",
    ()=>isAbiFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/get-gas-price.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2d$cost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas-cost.js [app-ssr] (ecmascript)");
;
;
function isAbiFunction(item) {
    return !!(item && typeof item === "object" && "type" in item && item.type === "function");
}
async function getTransactionGasCost(tx, from) {
    try {
        const gasCost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2d$cost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateGasCost"])({
            from,
            transaction: tx
        });
        const bufferCost = gasCost.wei / 10n;
        // Note: get tx.value AFTER estimateGasCost
        // add 10% extra gas cost to the estimate to ensure user buys enough to cover the tx cost
        return gasCost.wei + bufferCost;
    } catch  {
        if (from) {
            // try again without passing from
            return await getTransactionGasCost(tx);
        }
        // fallback if both fail, use the tx value + 1M * gas price
        const gasPrice = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGasPrice"])({
            chain: tx.chain,
            client: tx.client
        });
        return 1000000n * gasPrice;
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readContract",
    ()=>readContract
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_call.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/prepare-method.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
async function readContract(options) {
    const { contract, method, params } = options;
    const resolvePreparedMethod = async ()=>{
        if (Array.isArray(method)) {
            return method;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAbiFunction"])(method)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareMethod"])(method);
        }
        if (typeof method === "function") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareMethod"])(await method(contract));
        }
        // if the method starts with the string `function ` we always will want to try to parse it
        if (typeof method === "string" && method.startsWith("function ")) {
            // @ts-expect-error - method *is* string in this case
            const abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])(method);
            if (abiItem.type === "function") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareMethod"])(abiItem);
            }
            throw new Error(`"method" passed is not of type "function"`);
        }
        // check if we have a "abi" on the contract
        if (contract.abi && contract.abi?.length > 0) {
            // extract the abiFunction from it
            const abiFunction = contract.abi?.find((item)=>item.type === "function" && item.name === method);
            // if we were able to find it -> return it
            if (abiFunction) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareMethod"])(abiFunction);
            }
        }
        throw new Error(`Could not resolve method "${method}".`);
    };
    // resolve in parallel
    const [resolvedPreparedMethod, resolvedParams] = await Promise.all([
        resolvePreparedMethod(),
        typeof params === "function" ? params() : params
    ]);
    let encodedData;
    // if we have no inputs, we know it's just the signature
    if (resolvedPreparedMethod[1].length === 0) {
        encodedData = resolvedPreparedMethod[0];
    } else {
        // we do a "manual" concat here to avoid the overhead of the "concatHex" function
        // we can do this because we know the specific formats of the values
        encodedData = resolvedPreparedMethod[0] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(resolvedPreparedMethod[1], // @ts-expect-error - TODO: fix this type issue
        resolvedParams).slice(2);
    }
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain: contract.chain,
        client: contract.client
    });
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eth_call"])(rpcRequest, {
        data: encodedData,
        from: options.from ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(options.from) : undefined,
        to: contract.address
    });
    // use the prepared method to decode the result
    const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(resolvedPreparedMethod[2], result);
    if (Array.isArray(decoded) && decoded.length === 1) {
        return decoded[0];
    }
    return decoded;
} //# sourceMappingURL=read-contract.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidStorageKeySizeError",
    ()=>InvalidStorageKeySizeError,
    "fromTupleList",
    ()=>fromTupleList,
    "toTupleList",
    ()=>toTupleList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
;
;
;
;
function fromTupleList(accessList) {
    const list = [];
    for(let i = 0; i < accessList.length; i++){
        const [address, storageKeys] = accessList[i];
        if (address) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](address, {
            strict: false
        });
        list.push({
            address: address,
            storageKeys: storageKeys.map((key)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](key) ? key : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trimLeft"](key))
        });
    }
    return list;
}
function toTupleList(accessList) {
    if (!accessList || accessList.length === 0) return [];
    const tuple = [];
    for (const { address, storageKeys } of accessList){
        for(let j = 0; j < storageKeys.length; j++)if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["size"](storageKeys[j]) !== 32) throw new InvalidStorageKeySizeError({
            storageKey: storageKeys[j]
        });
        if (address) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](address, {
            strict: false
        });
        tuple.push([
            address,
            storageKeys
        ]);
    }
    return tuple;
}
class InvalidStorageKeySizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ storageKey }){
        super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["size"](storageKey)} bytes.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AccessList.InvalidStorageKeySizeError'
        });
    }
} //# sourceMappingURL=AccessList.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Value.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-ssr] (ecmascript)");
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
class InvalidDecimalNumberError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Value.js [app-ssr] (ecmascript)");
;
;
class FeeCapTooHighError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ feeCap } = {}){
        super(`The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${feeCap ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatGwei"](feeCap)} gwei` : ''}) cannot be higher than the maximum allowed value (2^256-1).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.FeeCapTooHighError'
        });
    }
}
class GasPriceTooHighError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ gasPrice } = {}){
        super(`The gas price (\`gasPrice\`${gasPrice ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatGwei"](gasPrice)} gwei` : ''}) cannot be higher than the maximum allowed value (2^256-1).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.GasPriceTooHighError'
        });
    }
}
class InvalidChainIdError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
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
class InvalidSerializedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
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
class TipAboveFeeCapError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ maxPriorityFeePerGas, maxFeePerGas } = {}){
        super([
            `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatGwei"](maxPriorityFeePerGas)} gwei` : ''}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatGwei"](maxFeePerGas)} gwei` : ''}).`
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip1559.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-ssr] (ecmascript)");
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
    if (chainId <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
        chainId
    });
    if (to) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](to, {
        strict: false
    });
    if (maxFeePerGas && BigInt(maxFeePerGas) > 2n ** 256n - 1n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FeeCapTooHighError"]({
        feeCap: maxFeePerGas
    });
    if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TipAboveFeeCapError"]({
        maxFeePerGas,
        maxPriorityFeePerGas
    });
}
function deserialize(serialized) {
    const transactionArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](serialized, 1));
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, yParity, r, s] = transactionArray;
    if (!(transactionArray.length === 9 || transactionArray.length === 12)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](maxFeePerGas) && maxFeePerGas !== '0x') transaction.maxFeePerGas = BigInt(maxFeePerGas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x') transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x') transaction.accessList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTupleList"](accessList);
    const signature = r && s && yParity ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTuple"]([
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
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](signature) : {},
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"](serialize({
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
    const accessTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTupleList"](accessList);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extract"](options.signature || envelope);
    const serialized = [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        maxPriorityFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](maxFeePerGas) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x',
        accessTupleList,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTuple"](signature) : []
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](serializedType, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromHex"](serialized));
}
function toRpc(envelope) {
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extract"](envelope);
    return {
        ...envelope,
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.chainId),
        data: envelope.data ?? envelope.input,
        type: '0x2',
        ...typeof envelope.gas === 'bigint' ? {
            gas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gas)
        } : {},
        ...typeof envelope.nonce === 'bigint' ? {
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.nonce)
        } : {},
        ...typeof envelope.value === 'bigint' ? {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.value)
        } : {},
        ...typeof envelope.maxFeePerGas === 'bigint' ? {
            maxFeePerGas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.maxFeePerGas)
        } : {},
        ...typeof envelope.maxPriorityFeePerGas === 'bigint' ? {
            maxPriorityFeePerGas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.maxPriorityFeePerGas)
        } : {},
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toRpc"](signature) : {}
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip2930.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-ssr] (ecmascript)");
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
    if (chainId <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
        chainId
    });
    if (to) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](to, {
        strict: false
    });
    if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GasPriceTooHighError"]({
        gasPrice
    });
}
function deserialize(serialized) {
    const transactionArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](serialized, 1));
    const [chainId, nonce, gasPrice, gas, to, value, data, accessList, yParity, r, s] = transactionArray;
    if (!(transactionArray.length === 8 || transactionArray.length === 11)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](gasPrice) && gasPrice !== '0x') transaction.gasPrice = BigInt(gasPrice);
    if (accessList.length !== 0 && accessList !== '0x') transaction.accessList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTupleList"](accessList);
    const signature = r && s && yParity ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTuple"]([
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
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](signature) : {},
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"](serialize({
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
    const accessTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTupleList"](accessList);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extract"](options.signature || envelope);
    const serialized = [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        gasPrice ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](gasPrice) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x',
        accessTupleList,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTuple"](signature) : []
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"]('0x01', __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromHex"](serialized));
}
function toRpc(envelope) {
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extract"](envelope);
    return {
        ...envelope,
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.chainId),
        data: envelope.data ?? envelope.input,
        ...typeof envelope.gas === 'bigint' ? {
            gas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gas)
        } : {},
        ...typeof envelope.nonce === 'bigint' ? {
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.nonce)
        } : {},
        ...typeof envelope.value === 'bigint' ? {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.value)
        } : {},
        ...typeof envelope.gasPrice === 'bigint' ? {
            gasPrice: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gasPrice)
        } : {},
        type: '0x1',
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toRpc"](signature) : {}
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip7702.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AccessList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Authorization.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip1559.js [app-ssr] (ecmascript)");
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
            if (address) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](address, {
                strict: false
            });
            if (Number(chainId) < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
                chainId
            });
        }
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](envelope);
}
function deserialize(serialized) {
    const transactionArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](serialized, 1));
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, authorizationList, yParity, r, s] = transactionArray;
    if (!(transactionArray.length === 10 || transactionArray.length === 13)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](maxFeePerGas) && maxFeePerGas !== '0x') transaction.maxFeePerGas = BigInt(maxFeePerGas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x') transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x') transaction.accessList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTupleList"](accessList);
    if (authorizationList !== '0x') transaction.authorizationList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTupleList"](authorizationList);
    const signature = r && s && yParity ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromTuple"]([
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
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](signature) : {},
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"](serialize({
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
    const accessTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AccessList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTupleList"](accessList);
    const authorizationTupleList = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Authorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTupleList"](authorizationList);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extract"](options.signature || envelope);
    const serialized = [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        maxPriorityFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](maxFeePerGas) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x',
        accessTupleList,
        authorizationTupleList,
        ...signature ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTuple"](signature) : []
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](serializedType, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromHex"](serialized));
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeLegacy.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Rlp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelope.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const type = 'legacy';
function assert(envelope) {
    const { chainId, gasPrice, to } = envelope;
    if (to) __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](to, {
        strict: false
    });
    if (typeof chainId !== 'undefined' && chainId <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidChainIdError"]({
        chainId
    });
    if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GasPriceTooHighError"]({
        gasPrice
    });
}
function deserialize(serialized) {
    const tuple = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"](serialized);
    const [nonce, gasPrice, gas, to, value, data, chainIdOrV_, r, s] = tuple;
    if (!(tuple.length === 6 || tuple.length === 9)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidSerializedError"]({
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](to) && to !== '0x') transaction.to = to;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](gas) && gas !== '0x') transaction.gas = BigInt(gas);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](data) && data !== '0x') transaction.data = data;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](value) && value !== '0x') transaction.value = BigInt(value);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](gasPrice) && gasPrice !== '0x') transaction.gasPrice = BigInt(gasPrice);
    if (tuple.length === 6) return transaction;
    const chainIdOrV = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](chainIdOrV_) && chainIdOrV_ !== '0x' ? Number(chainIdOrV_) : 0;
    if (s === '0x' && r === '0x') {
        if (chainIdOrV > 0) transaction.chainId = Number(chainIdOrV);
        return transaction;
    }
    const v = chainIdOrV;
    const chainId = Math.floor((v - 35) / 2);
    if (chainId > 0) transaction.chainId = chainId;
    else if (v !== 27 && v !== 28) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidVError"]({
        value: v
    });
    transaction.yParity = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vToYParity"](v);
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
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](signature);
        s.v = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["yParityToV"](s.yParity);
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"](serialize({
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
        nonce ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](nonce) : '0x',
        gasPrice ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](gasPrice) : '0x',
        gas ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](gas) : '0x',
        to ?? '0x',
        value ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](value) : '0x',
        data ?? input ?? '0x'
    ];
    const signature = (()=>{
        if (options.signature) return {
            r: options.signature.r,
            s: options.signature.s,
            v: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["yParityToV"](options.signature.yParity)
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
            if (signature.v !== v) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidVError"]({
                value: signature.v
            });
            return v;
        })();
        serialized = [
            ...serialized,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](v),
            signature.r === 0n ? '0x' : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trimLeft"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](signature.r)),
            signature.s === 0n ? '0x' : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trimLeft"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](signature.s))
        ];
    } else if (chainId > 0) serialized = [
        ...serialized,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](chainId),
        '0x',
        '0x'
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Rlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromHex"](serialized);
}
function toRpc(envelope) {
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extract"](envelope);
    return {
        ...envelope,
        chainId: typeof envelope.chainId === 'number' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.chainId) : undefined,
        data: envelope.data ?? envelope.input,
        type: '0x0',
        ...typeof envelope.gas === 'bigint' ? {
            gas: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gas)
        } : {},
        ...typeof envelope.nonce === 'bigint' ? {
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.nonce)
        } : {},
        ...typeof envelope.value === 'bigint' ? {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.value)
        } : {},
        ...typeof envelope.gasPrice === 'bigint' ? {
            gasPrice: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromNumber"](envelope.gasPrice)
        } : {},
        ...signature ? {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toRpc"](signature),
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/serialize-transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeTransaction",
    ()=>serializeTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip1559.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip2930$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip2930.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip7702$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeEip7702.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeLegacy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TransactionEnvelopeLegacy.js [app-ssr] (ecmascript)");
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromLegacy"]({
                    r: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.r),
                    s: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.s),
                    v: Number(options.signature.v)
                });
            }
            return {
                r: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.r),
                s: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](options.signature.s),
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
            r: typeof transaction.r === "bigint" ? transaction.r : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](transaction.r),
            s: typeof transaction.s === "bigint" ? transaction.s : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](transaction.s),
            yParity: typeof transaction.v !== "undefined" && typeof transaction.yParity === "undefined" ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vToYParity"](Number(transaction.v)) : Number(transaction.yParity)
        };
    })();
    if (type === "eip1559") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip1559$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    if (type === "legacy") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeLegacy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeLegacy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    if (type === "eip2930") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip2930$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip2930$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
            signature
        });
    }
    if (type === "eip7702") {
        const typedTransaction = transaction;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip7702$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"](typedTransaction);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TransactionEnvelopeEip7702$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serialize"](typedTransaction, {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/estimate-l1-fee.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "estimateL1Fee",
    ()=>estimateL1Fee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$serialize$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/serialize-transaction.js [app-ssr] (ecmascript)");
;
;
;
;
const OPStackGasPriceOracleAddress = "0x420000000000000000000000000000000000000F";
async function estimateL1Fee(options) {
    const { transaction, gasPriceOracleAddress } = options;
    const oracleContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
        address: gasPriceOracleAddress || OPStackGasPriceOracleAddress,
        chain: transaction.chain,
        client: transaction.client
    });
    //
    // biome-ignore lint/correctness/noUnusedVariables: purposefully remove gasPrice from the transaction
    const { gasPrice, ...serializableTx } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
        transaction
    });
    const serialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$serialize$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeTransaction"])({
        transaction: serializableTx
    });
    //serializeTransaction(transaction);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readContract"])({
        contract: oracleContract,
        method: "function getL1Fee(bytes memory _data) view returns (uint256)",
        params: [
            serialized
        ]
    });
} //# sourceMappingURL=estimate-l1-fee.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_863bd0e1._.js.map