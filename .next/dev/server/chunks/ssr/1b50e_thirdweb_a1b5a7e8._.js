module.exports = [
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concatHex",
    ()=>concatHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
;
function concatHex(values) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...values);
} //# sourceMappingURL=concat-hex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ERC_6492_MAGIC_VALUE",
    ()=>ERC_6492_MAGIC_VALUE
]);
const ERC_6492_MAGIC_VALUE = "0x6492649264926492649264926492649264926492649264926492649264926492"; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/serialize-erc6492-signature.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeErc6492Signature",
    ()=>serializeErc6492Signature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$concat$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/constants.js [app-ssr] (ecmascript)");
;
;
;
function serializeErc6492Signature({ address, data, signature }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$concat$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concatHex"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])([
            {
                type: "address"
            },
            {
                type: "bytes"
            },
            {
                type: "bytes"
            }
        ], [
            address,
            data,
            signature
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERC_6492_MAGIC_VALUE"]
    ]);
} //# sourceMappingURL=serialize-erc6492-signature.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/internal/abi.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @internal */ __turbopack_context__.s([
    "isSignatures",
    ()=>isSignatures
]);
function isSignatures(value) {
    for (const item of value){
        if (typeof item !== 'string') return false;
    }
    return true;
} //# sourceMappingURL=abi.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Abi.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "format",
    ()=>format,
    "from",
    ()=>from
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/formatAbi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/internal/abi.js [app-ssr] (ecmascript)");
;
;
function format(abi) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbi"](abi);
}
function from(abi) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSignatures"](abi)) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbi"](abi);
    return abi;
} //# sourceMappingURL=Abi.js.map
}),
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
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/internal/abiItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAmbiguousTypes",
    ()=>getAmbiguousTypes,
    "isArgOfType",
    ()=>isArgOfType,
    "normalizeSignature",
    ()=>normalizeSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-ssr] (ecmascript)");
;
;
function normalizeSignature(signature) {
    let active = true;
    let current = '';
    let level = 0;
    let result = '';
    let valid = false;
    for(let i = 0; i < signature.length; i++){
        const char = signature[i];
        // If the character is a separator, we want to reactivate.
        if ([
            '(',
            ')',
            ','
        ].includes(char)) active = true;
        // If the character is a "level" token, we want to increment/decrement.
        if (char === '(') level++;
        if (char === ')') level--;
        // If we aren't active, we don't want to mutate the result.
        if (!active) continue;
        // If level === 0, we are at the definition level.
        if (level === 0) {
            if (char === ' ' && [
                'event',
                'function',
                'error',
                ''
            ].includes(result)) result = '';
            else {
                result += char;
                // If we are at the end of the definition, we must be finished.
                if (char === ')') {
                    valid = true;
                    break;
                }
            }
            continue;
        }
        // Ignore spaces
        if (char === ' ') {
            // If the previous character is a separator, and the current section isn't empty, we want to deactivate.
            if (signature[i - 1] !== ',' && current !== ',' && current !== ',(') {
                current = '';
                active = false;
            }
            continue;
        }
        result += char;
        current += char;
    }
    if (!valid) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"]('Unable to normalize signature.');
    return result;
}
function isArgOfType(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch(abiParameterType){
        case 'address':
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](arg, {
                strict: false
            });
        case 'bool':
            return argType === 'boolean';
        case 'function':
            return argType === 'string';
        case 'string':
            return argType === 'string';
        default:
            {
                if (abiParameterType === 'tuple' && 'components' in abiParameter) return Object.values(abiParameter.components).every((component, index)=>{
                    return isArgOfType(Object.values(arg)[index], component);
                });
                // `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
                // https://regexr.com/6v8hp
                if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType)) return argType === 'number' || argType === 'bigint';
                // `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
                // https://regexr.com/6va55
                if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType)) return argType === 'string' || arg instanceof Uint8Array;
                // fixed-length (`<type>[M]`) and dynamic (`<type>[]`) arrays
                // https://regexr.com/6va6i
                if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
                    return Array.isArray(arg) && arg.every((x)=>isArgOfType(x, {
                            ...abiParameter,
                            // Pop off `[]` or `[M]` from end of type
                            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, '')
                        }));
                }
                return false;
            }
    }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
    for(const parameterIndex in sourceParameters){
        const sourceParameter = sourceParameters[parameterIndex];
        const targetParameter = targetParameters[parameterIndex];
        if (sourceParameter.type === 'tuple' && targetParameter.type === 'tuple' && 'components' in sourceParameter && 'components' in targetParameter) return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
        const types = [
            sourceParameter.type,
            targetParameter.type
        ];
        const ambiguous = (()=>{
            if (types.includes('address') && types.includes('bytes20')) return true;
            if (types.includes('address') && types.includes('string')) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](args[parameterIndex], {
                strict: false
            });
            if (types.includes('address') && types.includes('bytes')) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](args[parameterIndex], {
                strict: false
            });
            return false;
        })();
        if (ambiguous) return types;
    }
    return;
} //# sourceMappingURL=abiItem.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AmbiguityError",
    ()=>AmbiguityError,
    "InvalidSelectorSizeError",
    ()=>InvalidSelectorSizeError,
    "NotFoundError",
    ()=>NotFoundError,
    "format",
    ()=>format,
    "from",
    ()=>from,
    "fromAbi",
    ()=>fromAbi,
    "getSelector",
    ()=>getSelector,
    "getSignature",
    ()=>getSignature,
    "getSignatureHash",
    ()=>getSignatureHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/formatAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/internal/abiItem.js [app-ssr] (ecmascript)");
;
;
;
;
;
function format(abiItem) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbiItem"](abiItem);
}
function from(abiItem, options = {}) {
    const { prepare = true } = options;
    const item = (()=>{
        if (Array.isArray(abiItem)) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"](abiItem);
        if (typeof abiItem === 'string') return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"](abiItem);
        return abiItem;
    })();
    return {
        ...item,
        ...prepare ? {
            hash: getSignatureHash(item)
        } : {}
    };
}
function fromAbi(abi, name, options) {
    const { args = [], prepare = true } = options ?? {};
    const isSelector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"](name, {
        strict: false
    });
    const abiItems = abi.filter((abiItem)=>{
        if (isSelector) {
            if (abiItem.type === 'function' || abiItem.type === 'error') return getSelector(abiItem) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](name, 0, 4);
            if (abiItem.type === 'event') return getSignatureHash(abiItem) === name;
            return false;
        }
        return 'name' in abiItem && abiItem.name === name;
    });
    if (abiItems.length === 0) throw new NotFoundError({
        name: name
    });
    if (abiItems.length === 1) return {
        ...abiItems[0],
        ...prepare ? {
            hash: getSignatureHash(abiItems[0])
        } : {}
    };
    let matchedAbiItem = undefined;
    for (const abiItem of abiItems){
        if (!('inputs' in abiItem)) continue;
        if (!args || args.length === 0) {
            if (!abiItem.inputs || abiItem.inputs.length === 0) return {
                ...abiItem,
                ...prepare ? {
                    hash: getSignatureHash(abiItem)
                } : {}
            };
            continue;
        }
        if (!abiItem.inputs) continue;
        if (abiItem.inputs.length === 0) continue;
        if (abiItem.inputs.length !== args.length) continue;
        const matched = args.every((arg, index)=>{
            const abiParameter = 'inputs' in abiItem && abiItem.inputs[index];
            if (!abiParameter) return false;
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isArgOfType"](arg, abiParameter);
        });
        if (matched) {
            // Check for ambiguity against already matched parameters (e.g. `address` vs `bytes20`).
            if (matchedAbiItem && 'inputs' in matchedAbiItem && matchedAbiItem.inputs) {
                const ambiguousTypes = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAmbiguousTypes"](abiItem.inputs, matchedAbiItem.inputs, args);
                if (ambiguousTypes) throw new AmbiguityError({
                    abiItem,
                    type: ambiguousTypes[0]
                }, {
                    abiItem: matchedAbiItem,
                    type: ambiguousTypes[1]
                });
            }
            matchedAbiItem = abiItem;
        }
    }
    const abiItem = (()=>{
        if (matchedAbiItem) return matchedAbiItem;
        const [abiItem, ...overloads] = abiItems;
        return {
            ...abiItem,
            overloads
        };
    })();
    if (!abiItem) throw new NotFoundError({
        name: name
    });
    return {
        ...abiItem,
        ...prepare ? {
            hash: getSignatureHash(abiItem)
        } : {}
    };
}
function getSelector(abiItem) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](getSignatureHash(abiItem), 0, 4);
}
function getSignature(abiItem) {
    const signature = (()=>{
        if (typeof abiItem === 'string') return abiItem;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbiItem"](abiItem);
    })();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeSignature"](signature);
}
function getSignatureHash(abiItem) {
    if (typeof abiItem !== 'string' && 'hash' in abiItem && abiItem.hash) return abiItem.hash;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromString"](getSignature(abiItem)));
}
class AmbiguityError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(x, y){
        super('Found ambiguous types in overloaded ABI Items.', {
            metaMessages: [
                // TODO: abitype to add support for signature-formatted ABI items.
                `\`${x.type}\` in \`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeSignature"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbiItem"](x.abiItem))}\`, and`,
                `\`${y.type}\` in \`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$internal$2f$abiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeSignature"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbiItem"](y.abiItem))}\``,
                '',
                'These types encode differently and cannot be distinguished at runtime.',
                'Remove one of the ambiguous items in the ABI.'
            ]
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AbiItem.AmbiguityError'
        });
    }
}
class NotFoundError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ name, data, type = 'item' }){
        const selector = (()=>{
            if (name) return ` with name "${name}"`;
            if (data) return ` with data "${data}"`;
            return '';
        })();
        super(`ABI ${type}${selector} not found.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AbiItem.NotFoundError'
        });
    }
}
class InvalidSelectorSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ data }){
        super(`Selector size is invalid. Expected 4 bytes. Received ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["size"](data)} bytes ("${data}").`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AbiItem.InvalidSelectorSizeError'
        });
    }
} //# sourceMappingURL=AbiItem.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiConstructor.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode,
    "format",
    ()=>format,
    "from",
    ()=>from,
    "fromAbi",
    ()=>fromAbi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/formatAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
;
;
;
;
function decode(abiConstructor, options) {
    const { bytecode } = options;
    if (abiConstructor.inputs.length === 0) return undefined;
    const data = options.data.replace(bytecode, '0x');
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"](abiConstructor.inputs, data);
}
function encode(abiConstructor, options) {
    const { bytecode, args } = options;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](bytecode, abiConstructor.inputs?.length && args?.length ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"](abiConstructor.inputs, args) : '0x');
}
function format(abiConstructor) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbiItem"](abiConstructor);
}
function from(abiConstructor) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](abiConstructor);
}
function fromAbi(abi) {
    const item = abi.find((item)=>item.type === 'constructor');
    if (!item) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NotFoundError"]({
        name: 'constructor'
    });
    return item;
} //# sourceMappingURL=AbiConstructor.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiFunction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeData",
    ()=>decodeData,
    "decodeResult",
    ()=>decodeResult,
    "encodeData",
    ()=>encodeData,
    "encodeResult",
    ()=>encodeResult,
    "format",
    ()=>format,
    "from",
    ()=>from,
    "fromAbi",
    ()=>fromAbi,
    "getSelector",
    ()=>getSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/formatAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
;
;
;
;
function decodeData(abiFunction, data) {
    const { overloads } = abiFunction;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["size"](data) < 4) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvalidSelectorSizeError"]({
        data
    });
    if (abiFunction.inputs.length === 0) return undefined;
    const item = overloads ? fromAbi([
        abiFunction,
        ...overloads
    ], data) : abiFunction;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["size"](data) <= 4) return undefined;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"](item.inputs, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](data, 4));
}
function decodeResult(abiFunction, data, options = {}) {
    const values = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"](abiFunction.outputs, data, options);
    if (values && Object.keys(values).length === 0) return undefined;
    if (values && Object.keys(values).length === 1) {
        if (Array.isArray(values)) return values[0];
        return Object.values(values)[0];
    }
    return values;
}
function encodeData(abiFunction, ...args) {
    const { overloads } = abiFunction;
    const item = overloads ? fromAbi([
        abiFunction,
        ...overloads
    ], abiFunction.name, {
        args: args[0]
    }) : abiFunction;
    const selector = getSelector(item);
    const data = args.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"](item.inputs, args[0]) : undefined;
    return data ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](selector, data) : selector;
}
function encodeResult(abiFunction, output, options = {}) {
    const { as = 'Array' } = options;
    const values = (()=>{
        if (abiFunction.outputs.length === 1) return [
            output
        ];
        if (Array.isArray(output)) return output;
        if (as === 'Object') return Object.values(output);
        return [
            output
        ];
    })();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"](abiFunction.outputs, values);
}
function format(abiFunction) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$formatAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAbiItem"](abiFunction);
}
function from(abiFunction, options = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](abiFunction, options);
}
function fromAbi(abi, name, options) {
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromAbi"](abi, name, options);
    if (item.type !== 'function') throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NotFoundError"]({
        name,
        type: 'function'
    });
    return item;
}
function getSelector(abiItem) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelector"](abiItem);
} //# sourceMappingURL=AbiFunction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/erc6492/WrappedSignature.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidWrappedSignatureError",
    ()=>InvalidWrappedSignatureError,
    "assert",
    ()=>assert,
    "from",
    ()=>from,
    "fromHex",
    ()=>fromHex,
    "magicBytes",
    ()=>magicBytes,
    "toHex",
    ()=>toHex,
    "universalSignatureValidatorAbi",
    ()=>universalSignatureValidatorAbi,
    "universalSignatureValidatorBytecode",
    ()=>universalSignatureValidatorBytecode,
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
;
;
;
;
const magicBytes = '0x6492649264926492649264926492649264926492649264926492649264926492';
const universalSignatureValidatorBytecode = '0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572';
const universalSignatureValidatorAbi = [
    {
        inputs: [
            {
                name: '_signer',
                type: 'address'
            },
            {
                name: '_hash',
                type: 'bytes32'
            },
            {
                name: '_signature',
                type: 'bytes'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        inputs: [
            {
                name: '_signer',
                type: 'address'
            },
            {
                name: '_hash',
                type: 'bytes32'
            },
            {
                name: '_signature',
                type: 'bytes'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        name: 'isValidSig'
    }
];
function assert(wrapped) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slice"](wrapped, -32) !== magicBytes) throw new InvalidWrappedSignatureError(wrapped);
}
function from(wrapped) {
    if (typeof wrapped === 'string') return fromHex(wrapped);
    return wrapped;
}
function fromHex(wrapped) {
    assert(wrapped);
    const [to, data, signature_hex] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"]('address, bytes, bytes'), wrapped);
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromHex"](signature_hex);
    return {
        data,
        signature,
        to
    };
}
function toHex(value) {
    const { data, signature, to } = value;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"]('address, bytes, bytes'), [
        to,
        data,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"](signature)
    ]), magicBytes);
}
function validate(wrapped) {
    try {
        assert(wrapped);
        return true;
    } catch  {
        return false;
    }
}
class InvalidWrappedSignatureError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(wrapped){
        super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'WrappedSignature.InvalidWrappedSignatureError'
        });
    }
} //# sourceMappingURL=WrappedSignature.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/erc6492/WrappedSignature.js [app-ssr] (ecmascript) <export * as WrappedSignature>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WrappedSignature",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$erc6492$2f$WrappedSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$erc6492$2f$WrappedSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/erc6492/WrappedSignature.js [app-ssr] (ecmascript)");
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectMethod",
    ()=>detectMethod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-ssr] (ecmascript)");
;
function detectMethod(options) {
    const fnSelector = Array.isArray(options.method) ? options.method[0] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFunctionSelector"])(options.method);
    return options.availableSelectors.includes(fnSelector);
} //# sourceMappingURL=detectExtension.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc1271/__generated__/isValidSignature/read/isValidSignature.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "decodeIsValidSignatureResult",
    ()=>decodeIsValidSignatureResult,
    "encodeIsValidSignature",
    ()=>encodeIsValidSignature,
    "encodeIsValidSignatureParams",
    ()=>encodeIsValidSignatureParams,
    "isIsValidSignatureSupported",
    ()=>isIsValidSignatureSupported,
    "isValidSignature",
    ()=>isValidSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-ssr] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0x1626ba7e";
const FN_INPUTS = [
    {
        name: "hash",
        type: "bytes32"
    },
    {
        name: "signature",
        type: "bytes"
    }
];
const FN_OUTPUTS = [
    {
        type: "bytes4"
    }
];
function isIsValidSignatureSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeIsValidSignatureParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.hash,
        options.signature
    ]);
}
function encodeIsValidSignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeIsValidSignatureParams(options).slice(2);
}
function decodeIsValidSignatureResult(result) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(FN_OUTPUTS, result)[0];
}
async function isValidSignature(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readContract"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: [
            options.hash,
            options.signature
        ]
    });
} //# sourceMappingURL=isValidSignature.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/from-bytes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytesToBigInt",
    ()=>bytesToBigInt,
    "bytesToBool",
    ()=>bytesToBool,
    "bytesToNumber",
    ()=>bytesToNumber,
    "bytesToString",
    ()=>bytesToString,
    "fromBytes",
    ()=>fromBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
;
;
function fromBytes(bytes, toOrOpts) {
    const opts = typeof toOrOpts === "string" ? {
        to: toOrOpts
    } : toOrOpts;
    switch(opts.to){
        case "number":
            return bytesToNumber(bytes, opts);
        case "bigint":
            return bytesToBigInt(bytes, opts);
        case "boolean":
            return bytesToBool(bytes, opts);
        case "string":
            return bytesToString(bytes, opts);
        default:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(bytes, opts);
    }
}
function bytesToBigInt(bytes, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"](bytes, opts);
}
function bytesToBool(bytes_, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBoolean"](bytes_, opts);
}
function bytesToNumber(bytes, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toNumber"](bytes, opts);
}
function bytesToString(bytes_, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toString"](bytes_, opts);
} //# sourceMappingURL=from-bytes.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/verify-hash.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "verifyEip1271Signature",
    ()=>verifyEip1271Signature,
    "verifyHash",
    ()=>verifyHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Abi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Abi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiConstructor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiConstructor.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/AbiFunction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$erc6492$2f$WrappedSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__WrappedSignature$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/erc6492/WrappedSignature.js [app-ssr] (ecmascript) <export * as WrappedSignature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc1271$2f$_$5f$generated_$5f2f$isValidSignature$2f$read$2f$isValidSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc1271/__generated__/isValidSignature/read/isValidSignature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_call.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/any-evm/zksync/isZkSyncChain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$from$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/from-bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$serialize$2d$erc6492$2d$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/serialize-erc6492-signature.js [app-ssr] (ecmascript)");
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
;
const ZKSYNC_VALIDATOR_ADDRESS = "0xfB688330379976DA81eB64Fe4BF50d7401763B9C";
async function verifyHash({ hash, signature, address, client, chain, accountFactory }) {
    const signatureHex = (()=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHex"])(signature)) return signature;
        if (typeof signature === "object" && "r" in signature && "s" in signature) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toHex"](signature);
        if (signature instanceof Uint8Array) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$from$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromBytes"])(signature, "hex");
        // We should never hit this but TS doesn't know that
        throw new Error(`Invalid signature type for signature ${signature}: ${typeof signature}`);
    })();
    const isDeployed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isContractDeployed"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
        address,
        chain,
        client
    }));
    if (isDeployed) {
        const validEip1271 = await verifyEip1271Signature({
            contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                address,
                chain,
                client
            }),
            hash,
            signature: signatureHex
        }).catch((err)=>{
            console.error("Error verifying EIP-1271 signature", err);
            return false;
        });
        if (validEip1271) {
            return true;
        }
    }
    // contract not deployed, use erc6492 validator to verify signature
    const wrappedSignature = await (async ()=>{
        // If no factory is provided, we have to assume its already deployed or is an EOA
        // TODO: Figure out how to automatically tell if our default factory was used
        if (!accountFactory) return signatureHex;
        // If this sigature was already wrapped for ERC-6492, carry on
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$erc6492$2f$WrappedSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__WrappedSignature$3e$__["WrappedSignature"].validate(signatureHex)) return signatureHex;
        // Otherwise, serialize the signature for ERC-6492 validation
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$serialize$2d$erc6492$2d$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeErc6492Signature"])({
            address: accountFactory.address,
            data: accountFactory.verificationCalldata,
            signature: signatureHex
        });
    })();
    let verificationData;
    const zkSyncChain = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isZkSyncChain"])(chain);
    const abi = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Abi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["from"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$erc6492$2f$WrappedSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__WrappedSignature$3e$__["WrappedSignature"].universalSignatureValidatorAbi);
    if (zkSyncChain) {
        // zksync chains dont support deploying code with eth_call
        // need to call a deployed contract instead
        verificationData = {
            data: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeData"](__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromAbi"](abi, "isValidSig"), [
                address,
                hash,
                wrappedSignature
            ]),
            to: ZKSYNC_VALIDATOR_ADDRESS
        };
    } else {
        const validatorConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiConstructor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromAbi"](abi);
        verificationData = {
            data: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$AbiConstructor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"](validatorConstructor, {
                args: [
                    address,
                    hash,
                    wrappedSignature
                ],
                bytecode: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$erc6492$2f$WrappedSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__WrappedSignature$3e$__["WrappedSignature"].universalSignatureValidatorBytecode
            })
        };
    }
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eth_call"])(rpcRequest, verificationData);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBool"])(result);
    } catch  {
        // Some chains do not support the eth_call simulation and will fail, so we fall back to regular EIP1271 validation
        const validEip1271 = await verifyEip1271Signature({
            contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                address,
                chain,
                client
            }),
            hash,
            signature: signatureHex
        }).catch((err)=>{
            console.error("Error verifying EIP-1271 signature", err);
            return false;
        });
        if (validEip1271) {
            return true;
        }
        // TODO: Improve overall RPC error handling so we can tell if this was an actual verification failure or some other error
        // Verification failed somehow
        return false;
    }
}
const EIP_1271_MAGIC_VALUE = "0x1626ba7e";
async function verifyEip1271Signature({ hash, signature, contract }) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc1271$2f$_$5f$generated_$5f2f$isValidSignature$2f$read$2f$isValidSignature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidSignature"])({
            contract,
            hash,
            signature
        });
        return result === EIP_1271_MAGIC_VALUE;
    } catch (err) {
        console.error("Error verifying EIP-1271 signature", err);
        return false;
    }
} //# sourceMappingURL=verify-hash.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/hashMessage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashMessage",
    ()=>hashMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js [app-ssr] (ecmascript)");
;
;
;
const presignMessagePrefix = "\x19Ethereum Signed Message:\n";
function hashMessage(message, to_) {
    const messageBytes = (()=>{
        if (typeof message === "string") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringToBytes"])(message);
        }
        if (message.raw instanceof Uint8Array) {
            return message.raw;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBytes"])(message.raw);
    })();
    const prefixBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringToBytes"])(`${presignMessagePrefix}${messageBytes.length}`);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](prefixBytes, messageBytes), to_);
} //# sourceMappingURL=hashMessage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/hashTypedData.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashTypedData",
    ()=>hashTypedData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/TypedData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js [app-ssr] (ecmascript)");
;
;
;
;
;
function hashTypedData(parameters) {
    const { domain = {}, message, primaryType } = parameters;
    const types = {
        EIP712Domain: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEip712DomainTypes"](domain),
        ...parameters.types
    };
    // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
    // as we can't statically check this with TypeScript.
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validate"]({
        domain,
        message,
        primaryType,
        types
    });
    const parts = [
        "0x1901"
    ];
    if (domain) parts.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$TypedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashDomain"]({
        domain,
        types: types
    }));
    if (primaryType !== "EIP712Domain") {
        const hashedStruct = (()=>{
            const encoded = encodeData({
                data: message,
                primaryType,
                types: types
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(encoded);
        })();
        parts.push(hashedStruct);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"](...parts.map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromHex"](p))));
}
function encodeData({ data, primaryType, types }) {
    const encodedTypes = [
        {
            type: "bytes32"
        }
    ];
    const encodedValues = [
        hashType({
            primaryType,
            types
        })
    ];
    if (!types[primaryType]) throw new Error("Invalid types");
    for (const field of types[primaryType]){
        const [type, value] = encodeField({
            name: field.name,
            type: field.type,
            types,
            value: data[field.name]
        });
        encodedTypes.push(type);
        encodedValues.push(value);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(encodedTypes, encodedValues);
}
function hashType({ primaryType, types }) {
    const encodedHashType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(encodeType({
        primaryType,
        types
    }));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(encodedHashType);
}
function encodeType({ primaryType, types }) {
    let result = "";
    const unsortedDeps = findTypeDependencies({
        primaryType,
        types
    });
    unsortedDeps.delete(primaryType);
    const deps = [
        primaryType,
        ...Array.from(unsortedDeps).sort()
    ];
    for (const type of deps){
        if (!types[type]) throw new Error("Invalid types");
        result += `${type}(${types[type].map(({ name, type: t })=>`${t} ${name}`).join(",")})`;
    }
    return result;
}
function findTypeDependencies({ primaryType: primaryType_, types }, results = new Set()) {
    const match = primaryType_.match(/^\w*/u);
    const primaryType = match?.[0];
    if (results.has(primaryType) || types[primaryType] === undefined) {
        return results;
    }
    results.add(primaryType);
    for (const field of types[primaryType]){
        findTypeDependencies({
            primaryType: field.type,
            types
        }, results);
    }
    return results;
}
function encodeField({ types, name, type, value }) {
    if (types[type] !== undefined) {
        return [
            {
                type: "bytes32"
            },
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(encodeData({
                data: value,
                primaryType: type,
                types
            }))
        ];
    }
    if (type === "bytes") {
        const prepend = value.length % 2 ? "0" : "";
        value = `0x${prepend + value.slice(2)}`;
        return [
            {
                type: "bytes32"
            },
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(value)
        ];
    }
    if (type === "string") return [
        {
            type: "bytes32"
        },
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(value))
    ];
    if (type.lastIndexOf("]") === type.length - 1) {
        const parsedType = type.slice(0, type.lastIndexOf("["));
        const typeValuePairs = // biome-ignore lint/suspicious/noExplicitAny: Can't anticipate types of nested values
        value.map((item)=>encodeField({
                name,
                type: parsedType,
                types,
                value: item
            }));
        return [
            {
                type: "bytes32"
            },
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(typeValuePairs.map(([t])=>t), typeValuePairs.map(([, v])=>v)))
        ];
    }
    return [
        {
            type
        },
        value
    ];
} //# sourceMappingURL=hashTypedData.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareContractCall",
    ()=>prepareContractCall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/prepare-method.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function prepareContractCall(options) {
    const { contract, method, params, ...rest } = options;
    const preparedMethodPromise = ()=>(async ()=>{
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
        })();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareTransaction"])({
        ...rest,
        chain: contract.chain,
        client: contract.client,
        data: async ()=>{
            let preparedM;
            if (Array.isArray(method)) {
                preparedM = method;
            } else {
                preparedM = await preparedMethodPromise();
            }
            if (preparedM[1].length === 0) {
                // just return the fn sig directly -> no params
                return preparedM[0];
            }
            // we do a "manual" concat here to avoid the overhead of the "concatHex" function
            // we can do this because we know the specific formats of the values
            return preparedM[0] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(preparedM[1], // @ts-expect-error - TODO: fix this type issue
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(params ?? [])).slice(2);
        },
        // these always inferred from the contract
        to: contract.address
    }, {
        contract: contract,
        preparedMethod: preparedMethodPromise
    });
} //# sourceMappingURL=prepare-contract-call.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/calls.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "predictAddress",
    ()=>predictAddress,
    "predictSmartAccountAddress",
    ()=>predictSmartAccountAddress,
    "prepareBatchExecute",
    ()=>prepareBatchExecute,
    "prepareCreateAccount",
    ()=>prepareCreateAccount,
    "prepareExecute",
    ()=>prepareExecute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
async function predictSmartAccountAddress(args) {
    return predictAddress({
        accountSalt: args.accountSalt,
        adminAddress: args.adminAddress,
        factoryContract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
            address: args.factoryAddress ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ACCOUNT_FACTORY_V0_6"],
            chain: args.chain,
            client: args.client
        })
    });
}
async function predictAddress(args) {
    const { factoryContract, predictAddressOverride: predictAddress, adminAddress, accountSalt, accountAddress } = args;
    if (predictAddress) {
        return predictAddress(factoryContract, adminAddress);
    }
    if (accountAddress) {
        return accountAddress;
    }
    if (!adminAddress) {
        throw new Error("Account address is required to predict the smart wallet address.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const saltHex = accountSalt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHex"])(accountSalt) ? accountSalt : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(accountSalt ?? "");
        let result;
        let retries = 0;
        const maxRetries = 3;
        while(retries <= maxRetries){
            try {
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readContract"])({
                    contract: factoryContract,
                    method: "function getAddress(address, bytes) returns (address)",
                    params: [
                        adminAddress,
                        saltHex
                    ]
                });
                break;
            } catch (error) {
                if (retries === maxRetries) {
                    throw error;
                }
                // Exponential backoff: 2^(retries + 1) * 200ms (400ms, 800ms, 1600ms)
                const delay = 2 ** (retries + 1) * 200;
                await new Promise((resolve)=>setTimeout(resolve, delay));
                retries++;
            }
        }
        if (!result) {
            throw new Error(`No smart account address found for admin address ${adminAddress} and salt ${accountSalt}`);
        }
        return result;
    }, {
        cacheKey: `${args.factoryContract.chain.id}-${args.factoryContract.address}-${args.adminAddress}-${args.accountSalt}`,
        cacheTime: 1000 * 60 * 60 * 24
    });
}
function prepareCreateAccount(args) {
    const { adminAddress, factoryContract, createAccountOverride: createAccount, accountSalt } = args;
    if (createAccount) {
        return createAccount(factoryContract, adminAddress);
    }
    const saltHex = accountSalt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHex"])(accountSalt) ? accountSalt : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(accountSalt ?? "");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareContractCall"])({
        contract: factoryContract,
        method: "function createAccount(address, bytes) returns (address)",
        params: [
            adminAddress,
            saltHex
        ]
    });
}
function prepareExecute(args) {
    const { accountContract, transaction, executeOverride: execute } = args;
    if (execute) {
        return execute(accountContract, transaction);
    }
    let value = transaction.value || 0n;
    // special handling of hedera chains, decimals for native value is 8 instead of 18 when passed as contract params
    if (transaction.chainId === 295 || transaction.chainId === 296) {
        value = BigInt(value) / BigInt(10 ** 10);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareContractCall"])({
        contract: accountContract,
        // if gas is specified for the inner tx, use that and add 21k for the execute call on the account contract
        // this avoids another estimateGas call when bundling the userOp
        // and also allows for passing custom gas limits for the inner tx
        gas: transaction.gas ? transaction.gas + 21000n : undefined,
        method: "function execute(address, uint256, bytes)",
        params: [
            transaction.to || "",
            value,
            transaction.data || "0x"
        ]
    });
}
function prepareBatchExecute(args) {
    const { accountContract, transactions, executeBatchOverride: executeBatch } = args;
    if (executeBatch) {
        return executeBatch(accountContract, transactions);
    }
    let values = transactions.map((tx)=>tx.value || 0n);
    const chainId = transactions[0]?.chainId;
    // special handling of hedera chains, decimals for native value is 8 instead of 18 when passed as contract params
    if (chainId === 295 || chainId === 296) {
        values = values.map((value)=>BigInt(value) / BigInt(10 ** 10));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareContractCall"])({
        contract: accountContract,
        method: "function executeBatch(address[], uint256[], bytes[])",
        params: [
            transactions.map((tx)=>tx.to || ""),
            values,
            transactions.map((tx)=>tx.data || "0x")
        ]
    });
} //# sourceMappingURL=calls.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/signing.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "confirmContractDeployment",
    ()=>confirmContractDeployment,
    "deploySmartAccount",
    ()=>deploySmartAccount,
    "smartAccountSignMessage",
    ()=>smartAccountSignMessage,
    "smartAccountSignTypedData",
    ()=>smartAccountSignTypedData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$serialize$2d$erc6492$2d$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/serialize-erc6492-signature.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$verify$2d$hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/verify-hash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$hashMessage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/hashMessage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$hashTypedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/hashTypedData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/calls.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
async function smartAccountSignMessage({ accountContract, factoryContract, options, message }) {
    const originalMsgHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$hashMessage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashMessage"])(message);
    let sig;
    const wrappedMessageHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])([
        {
            type: "bytes32"
        }
    ], [
        originalMsgHash
    ]);
    sig = await options.personalAccount.signTypedData({
        domain: {
            chainId: options.chain.id,
            name: "Account",
            verifyingContract: accountContract.address,
            version: "1"
        },
        message: {
            message: wrappedMessageHash
        },
        primaryType: "AccountMessage",
        types: {
            AccountMessage: [
                {
                    name: "message",
                    type: "bytes"
                }
            ]
        }
    });
    const isDeployed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isContractDeployed"])(accountContract);
    if (isDeployed) {
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$verify$2d$hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyEip1271Signature"])({
            contract: accountContract,
            hash: originalMsgHash,
            signature: sig
        });
        if (isValid) {
            return sig;
        }
        throw new Error("Failed to verify signature");
    } else {
        const deployTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareCreateAccount"])({
            accountSalt: options.overrides?.accountSalt,
            adminAddress: options.personalAccount.address,
            createAccountOverride: options.overrides?.createAccount,
            factoryContract
        });
        if (!deployTx) {
            throw new Error("Create account override not provided");
        }
        const initCode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"])(deployTx);
        const erc6492Sig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$serialize$2d$erc6492$2d$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeErc6492Signature"])({
            address: factoryContract.address,
            data: initCode,
            signature: sig
        });
        return erc6492Sig;
    }
}
async function smartAccountSignTypedData({ accountContract, factoryContract, options, typedData }) {
    const isSelfVerifyingContract = typedData.domain?.verifyingContract?.toLowerCase() === accountContract.address?.toLowerCase();
    if (isSelfVerifyingContract) {
        // if the contract is self-verifying, we can just sign the message with the EOA (ie. adding a session key)
        return options.personalAccount.signTypedData(typedData);
    }
    const originalMsgHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$hashTypedData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashTypedData"])(typedData);
    let sig;
    const wrappedMessageHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAbiParameters"])([
        {
            type: "bytes32"
        }
    ], [
        originalMsgHash
    ]);
    sig = await options.personalAccount.signTypedData({
        domain: {
            chainId: options.chain.id,
            name: "Account",
            verifyingContract: accountContract.address,
            version: "1"
        },
        message: {
            message: wrappedMessageHash
        },
        primaryType: "AccountMessage",
        types: {
            AccountMessage: [
                {
                    name: "message",
                    type: "bytes"
                }
            ]
        }
    });
    const isDeployed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isContractDeployed"])(accountContract);
    if (isDeployed) {
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$verify$2d$hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyEip1271Signature"])({
            contract: accountContract,
            hash: originalMsgHash,
            signature: sig
        });
        if (isValid) {
            return sig;
        }
        throw new Error("Failed to verify signature");
    } else {
        const deployTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prepareCreateAccount"])({
            accountSalt: options.overrides?.accountSalt,
            adminAddress: options.personalAccount.address,
            createAccountOverride: options.overrides?.createAccount,
            factoryContract
        });
        if (!deployTx) {
            throw new Error("Create account override not provided");
        }
        const initCode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"])(deployTx);
        const erc6492Sig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$serialize$2d$erc6492$2d$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeErc6492Signature"])({
            address: factoryContract.address,
            data: initCode,
            signature: sig
        });
        return erc6492Sig;
    }
}
async function confirmContractDeployment(args) {
    const { accountContract } = args;
    const startTime = Date.now();
    const timeout = 60000; // wait 1 minute max
    const { isContractDeployed } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-ssr] (ecmascript, async loader)");
    let isDeployed = await isContractDeployed(accountContract);
    while(!isDeployed){
        if (Date.now() - startTime > timeout) {
            throw new Error("Timeout: Smart account deployment not confirmed after 1 minute");
        }
        await new Promise((resolve)=>setTimeout(resolve, 500));
        isDeployed = await isContractDeployed(accountContract);
    }
}
async function deploySmartAccount(args) {
    const { chain, client, smartAccount, accountContract } = args;
    const isDeployed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isContractDeployed"])(accountContract);
    if (isDeployed) {
        return;
    }
    const [{ sendTransaction }, { prepareTransaction }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-ssr] (ecmascript, async loader)")
    ]);
    const dummyTx = prepareTransaction({
        chain: chain,
        client: client,
        gas: 50000n,
        to: accountContract.address,
        value: 0n
    });
    const deployResult = await sendTransaction({
        account: smartAccount,
        transaction: dummyTx
    });
    await confirmContractDeployment({
        accountContract
    });
    return deployResult;
} //# sourceMappingURL=signing.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_a1b5a7e8._.js.map